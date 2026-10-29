---
title: Updating DH Studio
description: How DH Studio checks for new versions, downloads an update only when you choose, and restarts into it without losing unsaved work.
sidebarLabel: Updating
order: 3
appVersion: 0.5.6
updated: 2026-10-16
screenshot: true
screenshotAlt: DH Studio's Update available dialog saying version 0.5.6 (you have 0.5.5) is available, with that release's notes and the Later and Update buttons.
---

## How it checks

DH Studio asks GitHub Releases whether a newer version exists when it starts, and again every 6 hours while it stays open. A failed check, for example when you're offline, changes nothing; it simply tries again next time.

When a new version is out, the title bar shows **Update available** with the version number. To check yourself at any time, open the **Help** menu and choose **Check for Updates…**. If you already have the latest version, it says **You're up to date**.

## Install an update

1. Choose **Update available** in the title bar. The window shows what's new in that release.
2. Choose **Update**. The download starts and shows its progress. You can choose **Later** and keep working; the download carries on.
3. When it's done, choose **Restart now**. DH Studio installs the update and opens again on the new version.

{screenshot}

Nothing downloads until you choose **Update**, and nothing installs until you choose **Restart now**.

If you have changes that aren't saved yet, **Restart now** first asks **Restart with unsaved changes?** and lists them. Choose **Restart anyway** only if you can lose them; otherwise close the window, save your work and restart from the title bar when you're ready.

## Is it safe?

Every update is signed, and DH Studio checks the signature before it installs anything. That holds even though the installers themselves aren't code signed yet, so an update can't be swapped for something else on the way.

## Updating with the install command

If you installed DH Studio with the [one command install](/docs/install/macos/#or-install-it-with-one-command), running the same command again updates it to the latest version too.
