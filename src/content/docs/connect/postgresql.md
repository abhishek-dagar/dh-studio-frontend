---
title: Connect to PostgreSQL
description: Connect DH Studio to a PostgreSQL server with a URL or by hand, and set up SSL, client certificates and connection pool limits.
sidebarLabel: PostgreSQL
order: 2
appVersion: 0.5.6
updated: 2026-10-15
screenshot: true
screenshotAlt: DH Studio's New Connection card with PostgreSQL selected among SQLite, MongoDB and Amazon DocumentDB, and a Next button.
---

## Start a connection

1. Open the **New Connection** card. It's the first thing DH Studio shows, and the house icon at the top of the left bar brings it back.
2. Choose **PostgreSQL**, then **Next**.
3. Fill in the Connection tab, or paste a URL (below).
4. Choose **Test** to check it, then **Connect**.

{screenshot}

**Test** shows `Connection successful.` or the server's error. **Save** adds the connection to your Saved list in the sidebar, and **Connect** connects.

## Fill the form from a URL

If you have a connection string, paste it into **URL** and choose **Fill the form from this URL** (the link button), or press Enter. It takes `postgres://` and `postgresql://` URLs, like `postgres://user:pass@host:5432/db`.

The URL fills the host, port, user, password and database. It also reads `sslmode`, `sslrootcert`, `sslcert` and `sslkey` from the query string into the TLS/SSL tab. A MongoDB URL is refused with a note to go back and pick MongoDB.

## The Connection tab

| Field | What it does |
| --- | --- |
| Name | What the connection is called in the sidebar. Leave it empty and DH Studio makes one up. |
| Host | The server's address, `localhost` to start with. The box next to it is the port, `5432` to start with. |
| User | The database role you sign in as, `postgres` to start with. |
| Password | That role's password. The eye button shows it. |
| Remember password | On by default. The password is saved on this computer, encrypted. Turn it off and DH Studio asks for it each time you connect. |
| Database | Optional. Leave it empty to connect to `postgres`. |

## The TLS/SSL tab

| Field | What it does |
| --- | --- |
| SSL mode | `disable`, `prefer` (the default), `require`, `verify-ca` or `verify-full`. |
| CA certificate | Used by `verify-ca` and `verify-full`. Only needed for a server with a self signed or private certificate authority. |
| Client certificate | Optional, for mutual TLS. Needs `require` or stricter. |
| Client key | The key for the client certificate. Needs `require` or stricter. |

For a managed database, `require` is usually enough. Use `verify-full` when you want DH Studio to check the server's certificate and name too.

## The other tabs

- **Safety**: Read only, an Environment label (None, Production, Staging, Development or your own), and Confirm before writes, which is always on for Production. See [Connect to SQLite](/docs/connect/sqlite/#the-safety-tab) for what each does.
- **SSH Tunnel**: reach a server that's only open to a bastion or jump host. See [Connect through an SSH tunnel](/docs/connect/ssh-tunnel/).
- **Advanced**: pool limits most connections never need. **Max pool** and **Min pool** set how many connections DH Studio keeps open. **Acquire timeout** is the seconds to wait for a pooled connection, **Idle timeout** the seconds before an idle connection closes, and **Max lifetime** the seconds before a connection is recycled.
