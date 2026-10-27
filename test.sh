#!/bin/bash
#
# Local test runner for CATPOD container.
# Builds the image and runs the same tests as the CI workflow.
#
# Usage:
#   ./test.sh              # build and run all tests
#   ./test.sh --no-build   # skip build, use existing catpod-test image

set -euo pipefail

IMAGE="catpod-test"
PASSED=0
FAILED=0
WARNINGS=0

# ── Helpers ──────────────────────────────────────────────────────────

pass() {
  echo "  ✅ $1"
  PASSED=$((PASSED + 1))
}

fail() {
  echo "  ❌ $1"
  FAILED=$((FAILED + 1))
}

warn() {
  echo "  ⚠️  $1"
  WARNINGS=$((WARNINGS + 1))
}

run_test() {
  echo ""
  echo "── $1 ──"
}

# ── Build ────────────────────────────────────────────────────────────

if [ "${1:-}" != "--no-build" ]; then
  echo "Building image..."
  docker build -t "$IMAGE" .
  echo ""
fi

# ── Tests ────────────────────────────────────────────────────────────

run_test "Verify binaries exist"

CONTAINER_ID=$(docker run -d --entrypoint /bin/ash "$IMAGE" -c "sleep 30")

for FILE in /usr/bin/ansible-galaxy /usr/bin/ansible-vault /usr/bin/ansible-playbook; do
  if docker exec "$CONTAINER_ID" [ -f "$FILE" ]; then
    pass "$FILE exists"
  else
    fail "$FILE not found"
  fi
done

docker stop "$CONTAINER_ID" > /dev/null
docker rm "$CONTAINER_ID" > /dev/null

# ─────────────────────────────────────────────────────────────────────

run_test "Playbooks run as non-root user"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Go through the real entrypoint, which starts as root and switches to catpod.
OUTPUT=$(docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$SCRIPT_DIR/test-user.yml:/tmp/test-user.yml" \
  "$IMAGE" /tmp/test-user.yml 2>&1)

if echo "$OUTPUT" | grep -q "uid=10999(catpod)"; then
  pass "Running as catpod (UID 10999)"
else
  fail "Expected uid=10999(catpod), got: $OUTPUT"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "Ansible configuration"

OUTPUT=$(docker run --rm --entrypoint /bin/ash "$IMAGE" -c "ansible-config dump --only-changed")

for EXPECTED in DEFAULT_FORKS DEFAULT_GATHERING ANSIBLE_PIPELINING; do
  if echo "$OUTPUT" | grep -q "$EXPECTED"; then
    pass "$EXPECTED is set"
  else
    fail "$EXPECTED not found in active config"
  fi
done

# ─────────────────────────────────────────────────────────────────────

run_test "Playbook mode"

docker rm -f hello-world 2>/dev/null || true

# No --group-add: the entrypoint grants socket access automatically.
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$SCRIPT_DIR/test.yml:/tmp/test.yml" \
  "$IMAGE" /tmp/test.yml

if docker ps -a --format '{{.Names}}' | grep -q "^hello-world$"; then
  pass "Playbook created the hello-world container"
else
  fail "hello-world container not found"
fi

docker rm -f hello-world 2>/dev/null || true

# ─────────────────────────────────────────────────────────────────────

run_test "Vault mode"

OUTPUT=$(echo 'testpassword' | docker run --rm -i "$IMAGE" \
  vault encrypt_string 'secretvalue' --name 'myvar' --vault-password-file /dev/stdin)

if echo "$OUTPUT" | grep -q '\$ANSIBLE_VAULT'; then
  pass "Vault encryption produced valid output"
else
  fail "Expected \$ANSIBLE_VAULT in output"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "Galaxy mode"

OUTPUT=$(docker run --rm "$IMAGE" galaxy collection list)

for COLLECTION in community.docker community.mysql; do
  if echo "$OUTPUT" | grep -q "$COLLECTION"; then
    pass "Collection $COLLECTION is installed"
  else
    fail "Collection $COLLECTION not found"
  fi
done

# ─────────────────────────────────────────────────────────────────────

run_test "Socket warning when not mounted"

STDERR=$(docker run --rm "$IMAGE" --version 2>&1 >/dev/null || true)

if echo "$STDERR" | grep -q "Docker socket not found"; then
  pass "Socket-not-mounted warning displayed"
else
  fail "Expected 'Docker socket not found' warning on stderr"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "Socket permission error with overridden user"

# With --user, the entrypoint cannot grant socket access, so the check must fire.
STDERR=$(docker run --rm \
  --user 10999 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  "$IMAGE" --version 2>&1 || true)

if echo "$STDERR" | grep -q "Cannot access Docker socket"; then
  pass "Socket permission error displayed"
else
  warn "Permission error not triggered (socket may be world-accessible)"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "CATPOD_INVENTORY_GROUP substitution"

# Run with the real entrypoint so the sed substitution executes.
# --version makes ansible-playbook exit quickly.
docker rm -f catpod-test-group 2>/dev/null || true

docker run \
  -e CATPOD_INVENTORY_GROUP=myproject \
  --name catpod-test-group \
  "$IMAGE" --version > /dev/null 2>&1 || true

# Extract the file from the stopped container
OUTPUT=$(docker cp catpod-test-group:/etc/ansible/docker.yml - | tar -xO)

docker rm catpod-test-group > /dev/null

if echo "$OUTPUT" | grep -q "myproject"; then
  pass "Inventory group substituted to 'myproject'"
else
  fail "Expected 'myproject' in docker.yml"
fi

if echo "$OUTPUT" | grep -q "kittens"; then
  fail "Default group name 'kittens' still present"
else
  pass "Default group name 'kittens' replaced"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "CATPOD_INVENTORY_GROUP rejects invalid names"

STDERR=$(docker run --rm \
  -e 'CATPOD_INVENTORY_GROUP=bad/name' \
  "$IMAGE" --version 2>&1 || true)

if echo "$STDERR" | grep -q "may only contain letters, digits and underscores"; then
  pass "Invalid group name rejected"
else
  fail "Expected invalid CATPOD_INVENTORY_GROUP to be rejected"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "Exit codes are passed through"

EXIT=0
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$SCRIPT_DIR/test-user.yml:/tmp/test-user.yml" \
  "$IMAGE" /tmp/test-user.yml > /dev/null 2>&1 || EXIT=$?

if [ "$EXIT" -eq 0 ]; then
  pass "Successful playbook exits with 0"
else
  fail "Successful playbook exited with $EXIT"
fi

EXIT=0
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$SCRIPT_DIR/test-fail.yml:/tmp/test-fail.yml" \
  "$IMAGE" /tmp/test-fail.yml > /dev/null 2>&1 || EXIT=$?

if [ "$EXIT" -ne 0 ]; then
  pass "Failing playbook exits with $EXIT"
else
  fail "Failing playbook exited with 0"
fi

EXIT=0
docker run --rm "$IMAGE" vault view /nonexistent > /dev/null 2>&1 || EXIT=$?

if [ "$EXIT" -ne 0 ]; then
  pass "Failing vault command exits with $EXIT"
else
  fail "Failing vault command exited with 0"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "docker stop terminates promptly"

docker rm -f catpod-test-stop 2>/dev/null || true

docker run -d \
  --name catpod-test-stop \
  -v "$SCRIPT_DIR/test-sleep.yml:/tmp/test-sleep.yml" \
  "$IMAGE" /tmp/test-sleep.yml > /dev/null

# Wait until the long-running task has started.
for _ in $(seq 30); do
  docker logs catpod-test-stop 2>&1 | grep -q "TASK \[Sleep" && break
  sleep 1
done

START=$(date +%s)
docker stop catpod-test-stop > /dev/null
DURATION=$(( $(date +%s) - START ))
docker rm catpod-test-stop > /dev/null

# Without signal forwarding, Docker waits its full 10 s timeout before killing.
if [ "$DURATION" -lt 5 ]; then
  pass "Container stopped after ${DURATION}s"
else
  fail "Container took ${DURATION}s to stop (signals not forwarded?)"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "No sensitive group-owned files"

# catpod joins whatever group owns the host's Docker socket, so no file in
# the image may be accessible through another group (see entrypoint.sh).
OUTPUT=$(docker run --rm --entrypoint /bin/ash "$IMAGE" -c \
  'find / -xdev ! -group 0 ! -group 10999 ! -path /etc/shadow ! -path /etc/shadow- 2>/dev/null')

if [ -z "$OUTPUT" ]; then
  pass "Only /etc/shadow is owned by another group"
else
  fail "Unexpected group-owned files: $OUTPUT"
fi

# Hashes start with "$" (e.g. "$6$..."); locked or disabled accounts have "!" or "*".
OUTPUT=$(docker run --rm --entrypoint /bin/ash "$IMAGE" -c \
  'cut -d: -f1,2 /etc/shadow | grep -F ":\$" | cut -d: -f1')

if [ -z "$OUTPUT" ]; then
  pass "/etc/shadow contains no password hashes"
else
  fail "Password hashes in /etc/shadow for: $OUTPUT"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "Runs with the documented hardening options"

# Must match "Optional Hardening" in docs/how-to-use.md and the README.
HARDENING="--cap-drop ALL --cap-add CHOWN --cap-add SETUID --cap-add SETGID --cap-add KILL --security-opt no-new-privileges"

# shellcheck disable=SC2086 # word splitting of $HARDENING is intended
OUTPUT=$(docker run --rm $HARDENING \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$SCRIPT_DIR/test-user.yml:/tmp/test-user.yml" \
  "$IMAGE" /tmp/test-user.yml 2>&1)

if echo "$OUTPUT" | grep -q "uid=10999(catpod)"; then
  pass "Playbook runs as catpod"
else
  fail "Playbook failed with hardening options: $OUTPUT"
fi

docker rm -f catpod-test-hardened 2>/dev/null || true

# shellcheck disable=SC2086
docker run -d $HARDENING \
  --name catpod-test-hardened \
  -v "$SCRIPT_DIR/test-sleep.yml:/tmp/test-sleep.yml" \
  "$IMAGE" /tmp/test-sleep.yml > /dev/null

for _ in $(seq 30); do
  docker logs catpod-test-hardened 2>&1 | grep -q "TASK \[Sleep" && break
  sleep 1
done

docker stop catpod-test-hardened > /dev/null
EXIT=$(docker inspect catpod-test-hardened --format '{{.State.ExitCode}}')
docker rm catpod-test-hardened > /dev/null

# 143 = terminated by SIGTERM; tini exits with 1 if it can't forward signals.
if [ "$EXIT" -eq 143 ]; then
  pass "docker stop forwards SIGTERM (exit 143)"
else
  fail "docker stop exited with $EXIT (signal forwarding failed?)"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "Docker Compose works"

docker rm -f $(docker ps -aq --filter label=com.docker.compose.project=catpod-test-compose) 2>/dev/null || true

EXIT=0
OUTPUT=$(docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$SCRIPT_DIR/test-compose.yml:/tmp/test-compose.yml" \
  "$IMAGE" /tmp/test-compose.yml 2>&1) || EXIT=$?

if [ "$EXIT" -eq 0 ]; then
  pass "Compose $(echo "$OUTPUT" | grep -o 'compose_version.stdout: [0-9.]*' | grep -o '[0-9.]*$') started and removed a project via Ansible"
else
  fail "Compose playbook failed: $OUTPUT"
fi

if [ -z "$(docker ps -aq --filter label=com.docker.compose.project=catpod-test-compose)" ]; then
  pass "No Compose containers left behind"
else
  fail "Compose containers left behind"
fi

# ─────────────────────────────────────────────────────────────────────

run_test "Root-only Docker socket is relayed"

# A socket 'catpod' can use through its group needs no relay.
OUTPUT=$(docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$SCRIPT_DIR/test-socket.yml:/tmp/test-socket.yml" \
  "$IMAGE" /tmp/test-socket.yml --tags env 2>&1)

if echo "$OUTPUT" | grep -qF "DOCKER_HOST=[]"; then
  pass "No relay for a group-accessible socket"
else
  fail "Unexpected DOCKER_HOST for a group-accessible socket: $OUTPUT"
fi

# Simulate Docker Desktop on macOS, where the socket in containers belongs
# to root:root with mode 0755: a helper container running as root offers the
# real socket with these permissions in a temporary directory. The socket is
# then mounted just like the real one. The helper uses socat's -t 86400 for
# the same reason as the entrypoint, so it doesn't cut off output itself.
ROOT_SOCK_DIR=$(mktemp -d)
ROOT_SOCK="$ROOT_SOCK_DIR/docker.sock"
docker rm -f catpod-test-rootsock 2>/dev/null || true

docker run -d \
  --name catpod-test-rootsock \
  --entrypoint socat \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$ROOT_SOCK_DIR:/sock" \
  "$IMAGE" -t 86400 UNIX-LISTEN:/sock/docker.sock,fork,mode=755 UNIX-CONNECT:/var/run/docker.sock > /dev/null

for _ in $(seq 30); do
  [ -S "$ROOT_SOCK" ] && break
  sleep 1
done

EXIT=0
OUTPUT=$(docker run --rm \
  -v "$ROOT_SOCK:/var/run/docker.sock" \
  -v "$SCRIPT_DIR/test-socket.yml:/tmp/test-socket.yml" \
  "$IMAGE" /tmp/test-socket.yml -e "test_image=$IMAGE" 2>&1) || EXIT=$?

if [ "$EXIT" -eq 0 ]; then
  pass "Playbook uses a root-only socket"
else
  fail "Playbook failed with a root-only socket: $OUTPUT"
fi

if echo "$OUTPUT" | grep -q "uid=10999(catpod)" && ! echo "$OUTPUT" | grep -q "(root)"; then
  pass "Runs as catpod, without the root group"
else
  fail "Expected catpod without the root group: $(echo "$OUTPUT" | grep 'uid=')"
fi

if echo "$OUTPUT" | grep -qF "DOCKER_HOST=[unix:///run/catpod/docker.sock]"; then
  pass "DOCKER_HOST points to the relay"
else
  fail "DOCKER_HOST does not point to the relay"
fi

if echo "$OUTPUT" | grep -q "after-eof"; then
  pass "Output after the end of stdin is passed on"
else
  fail "Output after the end of stdin was cut off"
fi

EXIT=0
OUTPUT=$(docker run --rm \
  -v "$ROOT_SOCK:/var/run/docker.sock" \
  -v "$SCRIPT_DIR/test-compose.yml:/tmp/test-compose.yml" \
  "$IMAGE" /tmp/test-compose.yml 2>&1) || EXIT=$?

if [ "$EXIT" -eq 0 ]; then
  pass "Docker Compose works through the relay"
else
  fail "Compose playbook failed through the relay: $OUTPUT"
fi

# shellcheck disable=SC2086 # word splitting of $HARDENING is intended
OUTPUT=$(docker run --rm $HARDENING \
  -v "$ROOT_SOCK:/var/run/docker.sock" \
  -v "$SCRIPT_DIR/test-socket.yml:/tmp/test-socket.yml" \
  "$IMAGE" /tmp/test-socket.yml -e "test_image=$IMAGE" 2>&1) || true

if echo "$OUTPUT" | grep -q "uid=10999(catpod)" && echo "$OUTPUT" | grep -q "after-eof"; then
  pass "Relay works with the documented hardening options"
else
  fail "Relay failed with hardening options: $OUTPUT"
fi

docker rm -f catpod-test-relay-stop 2>/dev/null || true

# shellcheck disable=SC2086
docker run -d $HARDENING \
  --name catpod-test-relay-stop \
  -v "$ROOT_SOCK:/var/run/docker.sock" \
  -v "$SCRIPT_DIR/test-sleep.yml:/tmp/test-sleep.yml" \
  "$IMAGE" /tmp/test-sleep.yml > /dev/null

for _ in $(seq 30); do
  docker logs catpod-test-relay-stop 2>&1 | grep -q "TASK \[Sleep" && break
  sleep 1
done

docker stop catpod-test-relay-stop > /dev/null
EXIT=$(docker inspect catpod-test-relay-stop --format '{{.State.ExitCode}}')
docker rm catpod-test-relay-stop > /dev/null

if [ "$EXIT" -eq 143 ]; then
  pass "docker stop forwards SIGTERM with the relay running (exit 143)"
else
  fail "docker stop exited with $EXIT with the relay running"
fi

# Without root, there's no relay, and the error explains why.
STDERR=$(docker run --rm \
  --user 10999 \
  -v "$ROOT_SOCK:/var/run/docker.sock" \
  "$IMAGE" --version 2>&1 || true)

if echo "$STDERR" | grep -q "only works without --user"; then
  pass "Root-only socket error with overridden user"
else
  fail "Expected root-only socket hint with --user: $STDERR"
fi

# A DOCKER_HOST set by the user is respected: no relay, no socket checks.
OUTPUT=$(docker run --rm \
  -e DOCKER_HOST=tcp://127.0.0.1:1 \
  -v "$ROOT_SOCK:/var/run/docker.sock" \
  -v "$SCRIPT_DIR/test-socket.yml:/tmp/test-socket.yml" \
  "$IMAGE" /tmp/test-socket.yml --tags env 2>&1)

if echo "$OUTPUT" | grep -qF "DOCKER_HOST=[tcp://127.0.0.1:1]" \
  && ! echo "$OUTPUT" | grep -q -e "Cannot access Docker socket" -e "Docker socket not found"; then
  pass "User-defined DOCKER_HOST is left alone"
else
  fail "User-defined DOCKER_HOST was not respected: $OUTPUT"
fi

docker rm -f catpod-test-rootsock > /dev/null
rm -rf "$ROOT_SOCK_DIR"

# ── Summary ──────────────────────────────────────────────────────────

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Results: $PASSED passed, $FAILED failed, $WARNINGS warnings"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$FAILED" -gt 0 ]; then
  exit 1
fi
