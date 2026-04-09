# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.1] - 2026-04-09

### Changed

- Restored cleanup of `/root/.cache/pip/` and `/var/cache/apk/` in Dockerfile, which were inadvertently removed in v1.8.0, causing ~165 MB of build cache to be baked into the image.
- Added `--no-cache-dir` flag to `pip3 install` to prevent pip from writing download cache in the first place.
- Added cleanup of unused Python standard library modules (`ensurepip`, `idlelib`, `turtle`, `test`, `tkinter`) to further reduce image size.

## [1.8.0] - 2026-04-08

> Progress isn't made by early risers. It's made by lazy men trying to find easier ways to do something.

### Added

- Added CI tests for all three entrypoint command modes: playbook execution, vault encryption, and galaxy collection listing.
- Added CI tests for Docker socket diagnostics: missing socket warning and permission error.
- Added CI test for `CATPOD_INVENTORY_GROUP` environment variable substitution.
- Added CI test verifying the container runs as non-root user `catpod` (UID 10999).
- Added CI test verifying key Ansible configuration settings (`DEFAULT_FORKS`, `DEFAULT_GATHERING`, `ANSIBLE_PIPELINING`).
- Expanded CI path filter to also trigger on changes to `catpod.yml`, `docker.yml`, and `entrypoint.sh`.

### Changed

- Combined separate `pip3 install` commands into a single invocation for faster dependency resolution during image builds.
- Combined separate `ansible-galaxy collection install` commands into a single invocation to avoid redundant metadata fetches.
- Removed unused BuildKit cache mounts for `/var/cache/apk` and `/root/.cache/pip` from Dockerfile, as they provided no benefit for the project's infrequent build pattern.
- Removed redundant `pip install --upgrade pip` step from Dockerfile.
- Disabled `profile_tasks` and `timer` callbacks by default in `ansible.cfg` to reduce per-task overhead. They can be enabled per-run via `-e ANSIBLE_CALLBACKS_ENABLED=profile_tasks,timer`.
- Trimmed inventory plugin list in `ansible.cfg` to only the required plugins (`yaml`, `community.docker.docker_containers`), reducing unnecessary plugin loading on every Ansible startup.
- Replaced `docker info` with a file permission check in `entrypoint.sh` for faster Docker socket accessibility detection at container startup.
- Replaced bash-style `[[ ]]` test with POSIX-compatible `[ ]` in `entrypoint.sh` to match the `#!/bin/ash` shebang.
- Stripped `ansible.cfg` down to only active settings, removing ~1000 lines of commented-out defaults.

### Removed

- Removed `python-memcached` from pip dependencies, as it is no longer used since the switch to `jsonfile` fact caching in v1.7.0.

## [1.7.0] - 2025-10-22

> With few ambitions, most people allowed efficient machines to perform everyday tasks for them.

### Added

- Enabled Ansible pipelining for 300-500% performance improvement in playbook execution.
- Added performance profiling callbacks (`profile_tasks`, `timer`) for task execution visibility.
- Implemented BuildKit cache mounts for `/var/cache/apk` and `/root/.cache/pip` in Dockerfile for faster rebuilds.
- Added GitHub Actions cache support to Docker build workflows for 70-90% faster CI/CD builds.
- Introduced comprehensive cleanup steps in Dockerfile to reduce image size by 50-100MB.

### Changed

- Increased Ansible fork count from 5 to 20 for improved parallel task execution (4-20x faster for multi-container deployments).
- Switched fact caching from `community.general.memcached` to `jsonfile` for persistent caching without external dependencies.
- Reduced multi-platform Docker builds from 7 to 2 architectures (linux/amd64, linux/arm64) for 50-70% faster release builds.
- Migrated Docker image build workflow to `docker/build-push-action@v6` with layer caching support.
- Replaced semicolons with `&&` in Dockerfile RUN commands for better error propagation.
- Removed `NODE_OPTIONS=--openssl-legacy-provider` workaround from documentation build process.

### Fixed

- Set task timeout to 3600 seconds (1 hour) to prevent infinite task hangs.
- Updated [vite](https://github.com/vitejs/vite) from 7.0.7 to 7.0.8 to address security vulnerability GHSA-93m4-6634-74q7 (moderate severity path traversal issue allowing server.fs.deny bypass on Windows).

## [1.6.8] - 2025-10-06

> Generalities are intellectually necessary evils.

### Changed

- Bumped base image version for Dockerfile to `python:3.14-alpine`.

## [1.6.7] - 2025-10-06

> Stories written before space travel but about space travel

### Changed

- Added upgrade installation for `community.mysql` collection to Dockerfile.

## [1.6.6] - 2025-05-05

> I'll be captain one day

### Changed

- Reverted back from 1.6.2 change to standard Alpine package for `docker-cli-compose` to avoid potential incompatibilities faces when installing from official source.

## [1.6.5] - 2025-05-01

### Fixed

- Bumped [vite](https://github.com/vitejs/vite/tree/HEAD/packages/vite) from 6.2.6 to 6.2.7.

## [1.6.4] - 2025-04-28

> The more they overthink the plumbing, the easier it is to stop up the drain.

### Fixed

- Assigned ownership of folder `/ect/ansible` and files therein to user `catpod`, otherwise things don't work.
- Switched to `wget` for installation of Docker Compose in Dockerfile, otherwise things fail silently and nothing gets installed because there's no `curl`.

## [1.6.2] - 2025-04-26

> What in the name of Sir Isaac H. Newton happened here?

### Changed

- Installed Docker Compose from official source to avoid Golang vulnerabilities in Alpine ports.

## [1.6.0] - 2025-04-26

> It's like in chess: First, you strategically position your pieces and when the timing is right you strike.

### Added

- Added non-root user `catpod` (999:999) to Docker image.

## [1.5.1] - 2025-04-26

> Of course, he's programmed that way to make it easier for us to talk to him.

### Added

- Documentation (not complete yet) at https://fpodschwadek.github.io/catpod/.

### Changes

- Dockerfile pip installation changed to global, overriding any breaking system packages concerns. We're in a container, after all.
- Improved Docker image test GitHub workflow.
- Improved Docker image push GitHub workflow.

## [1.5.0]

> The war itself was long over, almost forgotten, for it had destroyed everyone who knew or cared about the reasons it had happened.

### Changes

- Base Dockerfile changed to `python:3.13-alpine`, all Python-related installs renewed in Docker image.
