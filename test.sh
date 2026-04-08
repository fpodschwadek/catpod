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

for FILE in /usr/local/bin/ansible-galaxy /usr/local/bin/ansible-vault /usr/local/bin/ansible-playbook; do
  if docker exec "$CONTAINER_ID" [ -f "$FILE" ]; then
    pass "$FILE exists"
  else
    fail "$FILE not found"
  fi
done

docker stop "$CONTAINER_ID" > /dev/null
docker rm "$CONTAINER_ID" > /dev/null

# ─────────────────────────────────────────────────────────────────────

run_test "Runs as non-root user"

OUTPUT=$(docker run --rm --entrypoint /bin/ash "$IMAGE" -c "id")

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

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$SCRIPT_DIR/test.yml:/tmp/test.yml" \
  --group-add "$(stat -c '%g' /var/run/docker.sock)" \
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

run_test "Socket permission error without --group-add"

STDERR=$(docker run --rm \
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

# ── Summary ──────────────────────────────────────────────────────────

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Results: $PASSED passed, $FAILED failed, $WARNINGS warnings"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$FAILED" -gt 0 ]; then
  exit 1
fi
