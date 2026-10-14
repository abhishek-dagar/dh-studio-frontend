---
order: 2
title: Write SQL with a real editor
tab: SQL editor
home: true
image: ../../assets/screenshots/sql-editor.png
imageLight: ../../assets/screenshots/sql-editor-light.png
alt: A query tab in the SQL editor holding three statements, a select, an update and a select with a subquery, each with a run button in the gutter
cards:
  - { kind: autocomplete, x: '-4%', y: '48%', width: '25%' }
  - { kind: queryResult, x: '62%', y: '82%', width: '34%' }
engines:
  sqlite: { level: full }
  postgresql: { level: full }
  mongodb: { level: full, note: as the query console }
  documentdb: { level: full, note: as the query console }
capabilities:
  - title: Syntax colors
    text: Keywords, strings and numbers are colored as you type, so a long query stays readable.
  - title: Autocomplete
    text: Table and column names from your database are suggested as you type.
  - title: Run one statement or all
    text: Each statement gets a run button in the gutter, so you can run just the one you need.
  - title: Results under the query
    text: The result set opens right below the editor, so the query and its answer stay together.
  - title: Many query tabs
    text: Keep as many query tabs open as you like, each with its own SQL and results.
pageCard: { kind: autocomplete, x: '-4%', y: '48%', width: '25%' }
---
Syntax colors, autocomplete for your tables and columns, and results right under the query. Keep as many query tabs open as you like.
