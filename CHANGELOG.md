# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.2] - 2025-04-26

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
