---
order: 5
title: Build a query without typing it
tab: Query builder
home: true
image: ../../assets/screenshots/query-builder.png
imageLight: ../../assets/screenshots/query-builder-light.png
alt: The query builder canvas with three queries built as cards, a select, an update with a where group, and a select with a subquery
cards:
  - { kind: join, x: '76%', y: '38%', width: '28%' }
  - { kind: cardOutput, x: '30%', y: '81%', width: '42%' }
engines:
  sqlite: { level: full }
  postgresql: { level: full }
  mongodb: { level: none, note: use the aggregation builder }
  documentdb: { level: none, note: use the aggregation builder }
capabilities:
  - title: Pick tables and columns
    text: Add tables to the canvas and tick the columns you want back.
  - title: Join without typing
    text: Join tables on their keys from a card, and see each join as you build it.
  - title: Filter with where groups
    text: Group conditions into where clauses for selects and updates.
  - title: Take the SQL with you
    text: The builder shows the SQL it writes, so you can open it in the editor and keep going.
pageCard: { kind: join, x: '76%', y: '38%', width: '28%' }
---
Pick tables, join them and choose the columns you want. The builder shows the SQL it writes, so you can take it to the editor.
