---
order: 7
title: See what changed between two tables
tab: Compare tables
home: true
image: ../../assets/screenshots/compare-table.png
imageLight: ../../assets/screenshots/compare-table-light.png
alt: The compare view with the User table on the left and User_copy on the right, listing the foreign keys only one side has and the rows that differ, matched on the id column
cards:
  - { kind: compare, x: '-4%', y: '66%', width: '30%' }
engines:
  sqlite: { level: full }
  postgresql: { level: full }
  mongodb: { level: none, note: tables only }
  documentdb: { level: none, note: tables only }
capabilities:
  - title: Structure differences
    text: Columns and foreign keys that were added, changed or removed, with a count of each.
  - title: Data differences
    text: Rows matched on a key column you pick, with a column picker and a where filter.
  - title: Sync the right side
    text: Sync structure and Sync data make the right table match the left.
  - title: Export the differences
    text: Save the list of differences to share or keep.
pageCard: { kind: compare, x: '-4%', y: '66%', width: '30%' }
---
Pick two tables and see how their structure and data differ, then make the right one match the left.
