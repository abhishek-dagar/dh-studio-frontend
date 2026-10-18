---
title: Connect through an SSH tunnel
description: Reach a PostgreSQL, MongoDB or DocumentDB server through a bastion or jump host, signing in with a password or a private key.
sidebarLabel: SSH tunnel
order: 5
appVersion: 0.5.6
updated: 2026-10-16
screenshot: true
screenshotAlt: DH Studio's new connection form for PostgreSQL on the SSH Tunnel tab, with Use an SSH tunnel ticked, SSH host bastion.example.com, port 22, user app, authentication set to key and the private key ~/.ssh/id_ed25519.
---

## When you need one

Many servers only accept connections from inside their own network. An SSH tunnel lets DH Studio sign in to a machine you can reach (a bastion or jump host) and connect to the database from there.

The **SSH Tunnel** tab is on the PostgreSQL, MongoDB and Amazon DocumentDB forms. SQLite opens a file on your computer, so it has none.

## Set it up

1. Fill in the Connection tab as the bastion sees the database. If the database runs on the bastion itself, the host is `localhost`.
2. Open the **SSH Tunnel** tab and tick **Use an SSH tunnel**.
3. Fill in the fields below, then choose **Test**.

{screenshot}

| Field | What it does |
| --- | --- |
| SSH host | The bastion or jump host. The box next to it is the SSH port, `22` if you leave it empty. |
| SSH user | Your account on the bastion. |
| Authentication | **Password** or **Private key**. |
| SSH password | Your password on the bastion, when you sign in with a password. |
| Private key | The key file, for example `~/.ssh/id_ed25519`, when you sign in with a key. |
| Passphrase | Only if the key is encrypted. |
| Pinned host key | Optional. Paste the bastion's fingerprint (`SHA256:...`) and DH Studio refuses a connection whose key doesn't match. Leave it blank to trust the server's key on each connect. |

Saved SSH passwords and key passphrases go into DH Studio's encrypted store, next to your database passwords. See [Where your data lives](/docs/app/data/).

## MongoDB SRV addresses

A tunnel can't be combined with `mongodb+srv://`. Turn off **Use mongodb+srv://** on the Connection tab and list the replica set members in Host instead, as `host1:port,host2:port`.

## Turning it off

Untick **Use an SSH tunnel** and the connection goes straight to the host again.
