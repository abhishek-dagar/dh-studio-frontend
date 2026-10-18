---
title: Connect to MongoDB
description: Connect DH Studio to MongoDB with a mongodb:// or mongodb+srv:// URL, or by hand, including auth source, TLS and replica sets.
sidebarLabel: MongoDB
order: 3
appVersion: 0.5.6
updated: 2026-10-16
screenshot: true
screenshotAlt: DH Studio's new connection form for MongoDB on the Connection tab, filled in with the name Shop, host db.example.com, port 27017, user app, a hidden password and the database shop.
---

## Start a connection

1. Open the **New Connection** card. It's the first thing DH Studio shows, and the house icon at the top of the left bar brings it back.
2. Choose **MongoDB**, then **Next**.
3. Fill in the Connection tab, or paste a URL (below).
4. Choose **Test** to check it, then **Connect**.

**Test** shows `Connection successful.` or the server's error. **Save** adds the connection to your Saved list in the sidebar, and **Connect** connects.

## Fill the form from a URL

Paste a `mongodb://` or `mongodb+srv://` URL into **URL** and choose **Fill the form from this URL** (the link button), or press Enter. Atlas and most hosted services give you a `mongodb+srv://` one.

The URL fills the hosts, port, user, password and database. It also reads these query options: `authSource`, `replicaSet`, `tls=true`, `tlsCAFile`, `tlsCertificateKeyFile` and `retryWrites=false`.

## The Connection tab

{screenshot}

| Field | What it does |
| --- | --- |
| Name | What the connection is called in the sidebar. Leave it empty and DH Studio makes one up. |
| Host | One host, or several as `host1:port,host2:port` for a replica set. The box next to it is the port, `27017` to start with. |
| Use mongodb+srv:// | Looks the servers up through DNS, as Atlas does. The port box hides, because DNS supplies the ports, and TLS turns on. |
| User and Password | Your database user. The eye button shows the password. |
| Remember password | On by default. The password is saved on this computer, encrypted. Turn it off and DH Studio asks for it each time you connect. |
| Database | The database to open. |
| Auth source | The database your user is defined in, `admin` to start with. |

## The TLS/SSL tab

| Field | What it does |
| --- | --- |
| Require TLS | Encrypts the connection. Always on with `mongodb+srv://`. |
| CA certificate | Only for a server with a self signed or private certificate authority. |
| Client certificate | Optional, for mutual TLS. One PEM file holding both the certificate and its key. |

## The other tabs

- **Safety**: Read only, an Environment label (None, Production, Staging, Development or your own), and Confirm before writes, which is always on for Production. See [Connect to SQLite](/docs/connect/sqlite/#the-safety-tab) for what each does.
- **SSH Tunnel**: reach a server that's only open to a bastion or jump host. A tunnel can't be combined with `mongodb+srv://`, so turn that off and list the replica set members in Host instead. See [Connect through an SSH tunnel](/docs/connect/ssh-tunnel/).
- **Advanced**: **Max pool** and **Min pool** for the connection pool, **Connect timeout** in seconds, **Server selection** (the seconds to keep looking for a usable server), **Idle timeout** in seconds, **Disable retryable writes**, and **Replica set** (for example `rs0`; leave it blank for plain MongoDB).
