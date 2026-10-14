---
order: 4
title: Design a schema you can see
tab: Schema designer
home: true
image: ../../assets/screenshots/schema-designer.png
imageLight: ../../assets/screenshots/schema-designer-light.png
alt: The relation diagram of a PostgreSQL schema, each table drawn as a box of its columns and types, linked by its foreign keys
cards:
  - { kind: findTable, x: '38%', y: '-3%', width: '27%' }
  - { kind: relation, x: '76%', y: '30%', width: '28%' }
  - { kind: column, x: '18%', y: '81%', width: '25%' }
engines:
  sqlite: { level: full }
  postgresql: { level: full }
  mongodb: { level: none, note: no fixed schema }
  documentdb: { level: none, note: no fixed schema }
capabilities:
  - title: See every relation
    text: Each table is drawn as a box of its columns and types, linked to the tables it references.
  - title: Find a table fast
    text: Jump to any table on the diagram by name instead of scrolling around a large schema.
  - title: Change a column
    text: Add a column, or change its type or default, right on the diagram.
  - title: The SQL is written for you
    text: DH Studio writes the change for your schema, so you never type the statement yourself.
pageCard: { kind: column, x: '18%', y: '81%', width: '25%' }
---
See your tables and how they connect. Add a column, change its type or default, and DH Studio writes the change for you.
