---
title: Connect to SQLite
description: Open a SQLite database file in DH Studio, name the connection, and choose how careful the app should be before it writes.
sidebarLabel: SQLite
order: 1
appVersion: 0.5.6
updated: 2026-10-16
screenshot: true
screenshotAlt: DH Studio's new connection form for SQLite on the Connection tab, named Shop (local), with the file /Users/you/data/shop.db chosen and an Open button.
---

## Open the file

A SQLite database is a single file on your computer, so there's no server, user or password to set up.

1. Open the **New Connection** card. It's the first thing DH Studio shows, and the house icon at the top of the left bar brings it back.
2. Choose **SQLite**, then **Next**.
3. Next to **File**, choose **Browse…** and pick your database. The picker shows files ending in `.db`, `.sqlite` or `.sqlite3`.
4. Choose **Open**.

The quickest way skips the form entirely: double click a `.db`, `.sqlite` or `.sqlite3` file, and DH Studio opens it.

## The Connection tab

{screenshot}

| Field | What it does |
| --- | --- |
| Name | What the connection is called in the sidebar. Leave it empty and it takes the file's name. |
| Type | SQLite. The pencil button takes you back to pick another type. |
| File | The database file. Shows `No file chosen` until you pick one. |

**Save** adds the connection to your Saved list in the sidebar. **Open** opens the database.

## The Safety tab

These settings help you avoid changing a database by accident.

| Field | What it does |
| --- | --- |
| Read only | DH Studio refuses every write on this connection. |
| Environment | A label and colour you see while connected: None, Production, Staging, Development, or Custom… with your own name and colour. |
| Confirm before writes | Asks before every change to this connection's data or schema. Always on for Production. |

Read only is a safety net inside DH Studio. For a hard guarantee, open a copy of the file, or one your account can only read.
