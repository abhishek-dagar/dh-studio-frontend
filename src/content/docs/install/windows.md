---
title: Install on Windows
description: Download the DH Studio installer or MSI package for Windows, or install it with one PowerShell command, and get past SmartScreen once.
sidebarLabel: Windows
order: 2
appVersion: 0.5.6
updated: 2026-10-15
os: windows
requirements:
  - { label: System, value: 'Windows 10 or Windows 11, 64 bit (x64)' }
  - { label: WebView2, value: "Built into Windows 11 and recent Windows 10; the installer adds it when it's missing" }
  - { label: One command install, value: 'PowerShell 5.1 or newer' }
---

## Download the app

There are two files. The **Windows installer** (`.exe`) is the one most people want: it installs DH Studio for your account only, so it doesn't ask for administrator rights. The **MSI package** (`.msi`) is there for IT teams that deploy software with their own tools.

{downloads}

Run the file you downloaded and follow the steps. DH Studio then shows up in the Start menu.

## Or install it with one command

Open PowerShell (not the Command Prompt), paste this line and press Enter. It downloads the installer, checks it against the release checksums, installs DH Studio for your account and opens it.

{install-command}

Installed this way, Windows doesn't show the SmartScreen warning below.

## First launch

The builds aren't code signed yet, so the first time you run a downloaded installer, Microsoft Defender SmartScreen doesn't recognize it and stops it. You confirm once, and it runs normally after that.

{launch-tip}

## What you need

{requirements}

Once DH Studio is open, add your first connection: [SQLite](/docs/connect/sqlite/), [PostgreSQL](/docs/connect/postgresql/) or [MongoDB](/docs/connect/mongodb/).
