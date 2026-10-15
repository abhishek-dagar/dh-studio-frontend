---
title: Connect to Amazon DocumentDB
description: Connect DH Studio to an Amazon DocumentDB cluster with TLS and the Amazon CA bundle, directly or through an SSH tunnel.
sidebarLabel: Amazon DocumentDB
order: 4
appVersion: 0.5.6
updated: 2026-10-15
screenshot: true
screenshotAlt: DH Studio's New Connection card, where Amazon DocumentDB sits beside SQLite, PostgreSQL and MongoDB as a database type.
---

## Start a connection

DocumentDB has its own type in DH Studio. It uses the MongoDB form, with DocumentDB's rules already applied.

1. Open the **New Connection** card. It's the first thing DH Studio shows, and the house icon at the top of the left bar brings it back.
2. Choose **Amazon DocumentDB**, then **Next**.
3. Fill in the Connection tab, or paste the cluster's `mongodb://` URL into **URL** and choose **Fill the form from this URL**.
4. On the TLS/SSL tab, pick Amazon's CA bundle.
5. Choose **Test** to check it, then **Connect**.

{screenshot}

## What's different from MongoDB

- **TLS is on** from the start, as DocumentDB requires.
- **Replica set** sits on the Connection tab and starts as `rs0`, the name DocumentDB clusters use.
- **Disable retryable writes** starts ticked on the Advanced tab, because DocumentDB doesn't support retryable writes.
- Only `mongodb://` URLs work. DocumentDB has no `mongodb+srv://` address, so that option isn't offered.
- **Client certificate** is off: DocumentDB signs in with a password, not a client certificate.

## The Connection tab

| Field | What it does |
| --- | --- |
| Name | What the connection is called in the sidebar. Leave it empty and DH Studio makes one up. |
| Host | Your cluster endpoint. The box next to it is the port, `27017`. |
| User and Password | The cluster's user. The eye button shows the password. |
| Remember password | On by default. The password is saved on this computer, encrypted. |
| Database | The database to open. |
| Auth source | The database your user is defined in, `admin` to start with. |
| Replica set | `rs0` unless you changed it. |

## The TLS/SSL tab

Set **CA certificate** to AWS's `global-bundle.pem`, which you can download from the AWS documentation for DocumentDB. Without it, DH Studio can't check that it's talking to your cluster.

## Reaching a cluster in a VPC

DocumentDB clusters only accept connections from inside their VPC. From your own computer, go through an EC2 instance in that VPC with the **SSH Tunnel** tab: see [Connect through an SSH tunnel](/docs/connect/ssh-tunnel/). The **Safety** tab works as it does for [every connection](/docs/connect/sqlite/#the-safety-tab).
