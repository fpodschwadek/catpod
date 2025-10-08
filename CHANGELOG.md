# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.7] - 2025-10-06

### Changed

- Added upgrade installation for `community.mysql` collection to Dockerfile.

## [1.6.6] - 2025-05-05

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
