---
title: Install on Linux
description: Install DH Studio on Linux as an AppImage, a .deb or an .rpm, or with one command that picks the right package for your distribution.
sidebarLabel: Linux
order: 3
appVersion: 0.5.6
updated: 2026-10-15
os: linux
requirements:
  - { label: Processor, value: '64 bit x86 (x86_64); there is no ARM build yet' }
  - { label: System libraries, value: 'glibc and WebKitGTK 4.1 as new as Ubuntu 22.04 or newer' }
  - { label: AppImage, value: 'libfuse2 to run it' }
---

## Download the app

There are three files. Pick the one that fits your system:

- **Debian and Ubuntu** (`.deb`): installs with `apt`, which also pulls in the libraries DH Studio needs.
- **Fedora and RHEL** (`.rpm`): installs with `dnf`.
- **Linux AppImage** (`.AppImage`): one file that runs on most distributions without installing anything.

{downloads}

To install a `.deb`, run `sudo apt install ./` followed by the file name. For an `.rpm`, run `sudo dnf install ./` followed by the file name.

## Or install it with one command

This one line looks at your system and installs the right package: the `.deb` where `apt-get` is present, the `.rpm` where `dnf`, `yum` or `zypper` is, and the AppImage everywhere else. It checks the download against the release checksums, then opens DH Studio.

{install-command}

A `.deb` or `.rpm` needs root, so if you run the line without `sudo`, the script stops and shows both choices: the same line with `sudo`, or the AppImage installed for your user alone, with no `sudo`. That AppImage goes to `~/.local/bin/dh-studio.AppImage`.

## First launch

A downloaded AppImage isn't executable yet, so it won't open until you mark it as a program. You do this once.

{launch-tip}

If it still won't start, your system may be missing `libfuse2`, which AppImages need. Install it with `sudo apt install libfuse2` on Debian and Ubuntu, `sudo dnf install fuse-libs` on Fedora and RHEL, `sudo zypper install libfuse2` on openSUSE, or `sudo pacman -S fuse2` on Arch. The one command install checks for it and tells you when it's missing.

## What you need

{requirements}

Once DH Studio is open, add your first connection: [SQLite](/docs/connect/sqlite/), [PostgreSQL](/docs/connect/postgresql/) or [MongoDB](/docs/connect/mongodb/).
