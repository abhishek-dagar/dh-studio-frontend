---
order: 9
title: Passwords stay encrypted on your computer
tab: Saved passwords
home: true
image: ../../assets/screenshots/connection-form.png
imageLight: ../../assets/screenshots/connection-form-light.png
alt: The new connection dialog offering SQLite, PostgreSQL, MongoDB and Amazon DocumentDB, with PostgreSQL selected
cards:
  - { kind: connectionFields, x: '-4%', y: '30%', width: '30%' }
  - { kind: connectionTest, x: '70%', y: '0%', width: '30%' }
  - { kind: keychain, x: '48%', y: '85%', width: '31%' }
engines:
  sqlite: { level: none, note: 'a file, no password' }
  postgresql: { level: full }
  mongodb: { level: full }
  documentdb: { level: full }
capabilities:
  - title: Encrypted on your computer
    text: Connection passwords are saved encrypted in DH Studio's own store, never in a plain file.
  - title: Connect again in one click
    text: Open a saved connection without typing its password again.
  - title: Test before you save
    text: Check that a new connection works before you save it.
pageCard: { kind: keychain, x: '48%', y: '85%', width: '31%' }
---
Connection passwords are saved encrypted on your computer, never in a plain file. Connect again without typing them.
