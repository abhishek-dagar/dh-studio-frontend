---
title: Install on macOS
description: Download DH Studio for Apple silicon or Intel Macs, or install it with one Terminal command, and get past the first launch warning.
sidebarLabel: macOS
order: 1
appVersion: 0.5.6
updated: 2026-10-15
os: macos
requirements:
  - { label: System, value: 'macOS 10.13 High Sierra or later' }
  - { label: Processor, value: 'Apple silicon or Intel, each with its own build' }
---

## Download the app

There are two builds: one for Macs with Apple silicon (M1 and newer) and one for Macs with an Intel processor. To check yours, open the Apple menu and choose **About This Mac**. A line that starts with **Chip** means Apple silicon; a line that starts with **Processor** means Intel.

{downloads}

Open the `.dmg` file and drag **DH Studio** into the **Applications** folder. Then open it from Applications or Launchpad.

## Or install it with one command

If you're happy in Terminal, this one line does the whole job. It picks the right build for your Mac, places DH Studio in `/Applications` and opens it.

{install-command}

Installed this way, the app skips the first launch warning below. If your account can't write to `/Applications`, the script stops and shows the same command with `sudo` added.

## First launch

The builds aren't code signed yet, so the first time you open a downloaded copy, macOS can't vouch for it and refuses to open it. You confirm once, and it opens normally after that.

{launch-tip}

## What you need

{requirements}

Once DH Studio is open, add your first connection: [SQLite](/docs/connect/sqlite/), [PostgreSQL](/docs/connect/postgresql/) or [MongoDB](/docs/connect/mongodb/).
