---
title: Where your data lives
description: The folder where DH Studio keeps saved connections, encrypted passwords, query history and open tabs on macOS, Windows and Linux.
sidebarLabel: Where your data lives
order: 2
appVersion: 0.5.6
updated: 2026-10-16
screenshot: true
screenshotAlt: A macOS Finder window in list view on the com.dh-studio.dev folder, showing the files DH Studio keeps there.
---

## The data folder

DH Studio keeps everything it saves in one folder on your computer. Nothing goes to a server or an account.

- **macOS:** `~/Library/Application Support/com.dh-studio.dev`
- **Windows:** `%APPDATA%\com.dh-studio.dev`
- **Linux:** `~/.local/share/com.dh-studio.dev`

{screenshot}

## What's in it

{data-files}

Your saved passwords and SSH key passphrases are encrypted. The key that opens them sits in the same folder, so anyone who can use your computer account can read them. Protect your account the way you would protect the passwords themselves.

## Moving to a new computer

Quit DH Studio on both computers, then copy the whole folder across to the same place. Copy it as one piece: `secrets.bin` can only be opened with the `secrets.key` that sits next to it.

## Starting fresh

To remove everything DH Studio saved, quit the app and delete the folder. Uninstalling the app may leave it behind. The [privacy notice](/privacy/) lists every place DH Studio stores something, including the web view storage that holds your theme and recent connections.
