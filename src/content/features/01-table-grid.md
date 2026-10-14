---
order: 1
title: Browse tables like a spreadsheet
tab: Table grid
home: true
image: ../../assets/screenshots/table-grid.png
imageLight: ../../assets/screenshots/table-grid-light.png
alt: The Activity table of a PostgreSQL database open in a spreadsheet style grid, with the schema tree on the left and a filter bar above the rows
cards:
  - { kind: review, x: '75%', y: '20%', width: '29%' }
  - { kind: rowMenu, x: '-4%', y: '50%', width: '21%' }
  - { kind: filter, x: '38%', y: '84%', width: '27%' }
engines:
  sqlite: { level: full }
  postgresql: { level: full }
  mongodb: { level: full, note: documents as rows }
  documentdb: { level: full, note: documents as rows }
capabilities:
  - title: Scroll every row
    text: Open a table and page through all of its rows in a grid that stays quick on large tables.
  - title: Filter and sort
    text: Narrow the rows with a filter bar and sort by any column, without writing a query.
  - title: Edit cells in place
    text: Change a value right in the grid, add a row or delete one, like a spreadsheet.
  - title: Review before saving
    text: Your edits wait in a review list, so you can check every change before it is written.
pageCard: { kind: filter, x: '38%', y: '84%', width: '27%' }
---
Open a table and scroll through every row. Filter, sort and edit cells in place, then review your changes before they are saved.
