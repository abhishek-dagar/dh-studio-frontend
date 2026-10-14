---
meta:
  title: Privacy · DH Studio
  description: What the DH Studio website and app collect and keep. No tracking on the site, nothing sent from the app, and every file it saves listed.
# Change this when the meaning changes, not for wording fixes.
updated: 2026-10-13
# Every fact below was checked against this app version. Recheck when the app changes what it stores or sends.
appVersion: 0.5.6
operator: OnlyDev India
contact: dagarabhishek584@gmail.com
files:
  - name: connections.json
    holds: Each saved connection's name, host, port, user and database
    encrypted: false
  - name: secrets.bin
    holds: Saved passwords and SSH key passphrases, sealed with AES 256 GCM
    encrypted: true
  - name: secrets.key
    holds: The key that opens secrets.bin
    encrypted: false
  - name: activity.json
    holds: Your last 500 queries
    encrypted: false
  - name: library.json
    holds: Your saved queries and snippets
    encrypted: false
  - name: workspace_state.json
    holds: Open tabs, the layout and the text in your editors
    encrypted: false
  - name: web view storage
    holds: Theme, font, and your recent and pinned connections
    encrypted: false
---

## The short version

- This website has no cookies, no analytics and no tracking.
- The DH Studio app sends nothing about you. It talks only to the databases you connect to, and checks GitHub for updates.
- Everything the app saves stays in one folder on your computer, and your passwords are encrypted.

## This website

This site is a set of static pages hosted by Vercel. To serve the pages and protect the site from abuse, Vercel receives the standard data every web request carries: your IP address, your browser's user agent, and the page you asked for. We add nothing to that. There are no cookies, analytics, ads or third party scripts, and the fonts come from this site, not from a font service.

The site remembers one thing: whether you picked the light or the dark theme. That choice sits in your browser's local storage and never leaves your browser.

When you download DH Studio or run the install command, the files come from GitHub, so GitHub sees those requests in the same way. [Vercel's privacy policy](https://vercel.com/legal/privacy-policy) and [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) explain what they do with request data.

## The DH Studio app

DH Studio has no telemetry, no analytics, no crash reports and no account. It connects only to the databases and SSH hosts you set up. The one other request it makes is an update check: when it starts, and every 6 hours while it stays open, it asks GitHub Releases whether a newer version exists. GitHub sees your IP address and that request. An update downloads only when you choose to install it.

Everything the app saves lives in its data folder on your computer:

{files}

Your saved passwords and SSH key passphrases are encrypted. That keeps them out of plain text files, and out of anything that copies or syncs other files. The key that opens them sits in the same folder, though, so anyone who can use your computer account can read them. Protect your account the way you would protect the passwords themselves.

Versions before 0.5.4 kept passwords in the system keychain. The first time a newer version starts, it moves those passwords into its own store and deletes the keychain copies.

## Removing your data

To remove everything DH Studio saved, quit the app and delete its folders:

- **macOS:** `~/Library/Application Support/com.dh-studio.dev`, and the web view storage in `~/Library/WebKit/com.dh-studio.dev`
- **Windows:** `%APPDATA%\com.dh-studio.dev`, and the web view storage in `%LOCALAPPDATA%\com.dh-studio.dev`
- **Linux:** `~/.local/share/com.dh-studio.dev`, which also holds the web view storage

Uninstalling the app may leave these folders behind, so delete them yourself if you want a clean slate.

## Changes to this notice

When what the site or the app collects changes, this page changes with it, and the date at the top moves. Small wording fixes don't move the date.

## Questions and requests

DH Studio and this website are run by {operator}.

**Your choices.** We don't collect anything about you, so there is nothing for us to export or delete. Your own data lives in the folders above, under your control. If you have a question or a request anyway, write to {contact}.
