---
order: 3
title: Query MongoDB in its own language
tab: Query console
image: ../../assets/screenshots/no-sql-editor.png
imageLight: ../../assets/screenshots/no-sql-editor-light.png
alt: The query console for the ProjectPilot database holding a find on managers and two updateMany calls on tasks, each with a run button in the gutter
engines:
  sqlite: { level: none, note: SQL in the SQL editor }
  postgresql: { level: none, note: SQL in the SQL editor }
  mongodb: { level: full }
  documentdb: { level: full }
capabilities:
  - title: Shell syntax
    text: Write db.collection.find, updateMany and the rest the way the MongoDB shell reads them.
  - title: Run one statement or all
    text: Each statement gets a run button in the gutter, so you can run just the one you need.
  - title: ObjectId values
    text: ObjectId(...) and $oid both work, so ids paste straight from a document.
  - title: Save and reopen
    text: Save a console to a file or bookmark it, and open it again later.
pageCard: { kind: shellResult, x: '40%', y: '50%', width: '32%' }
---
Write find, update and aggregate calls the way the MongoDB shell reads them, with a run button beside each statement.
