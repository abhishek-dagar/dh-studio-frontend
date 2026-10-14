---
order: 6
title: Build a pipeline one stage at a time
tab: Aggregation builder
image: ../../assets/screenshots/aggregate-builder.png
imageLight: ../../assets/screenshots/aggregate-builder-light.png
alt: The aggregation builder on the managers collection with three stages, $match, $project and $addFields, and the first stage's output in a grid below
engines:
  sqlite: { level: none, note: use the query builder }
  postgresql: { level: none, note: use the query builder }
  mongodb: { level: full }
  documentdb: { level: full }
capabilities:
  - title: Stages as cards
    text: Add, reorder and remove stages, and fill each one in with a form or as JSON.
  - title: Output after any stage
    text: Preview up to 20 documents after a stage, as a grid or as JSON.
  - title: Explain the plan
    text: See how MongoDB will run the pipeline before you trust it with real data.
  - title: Copy or export
    text: Copy the pipeline as code, or export its result.
pageCard: { kind: pipelineStage, x: '71%', y: '32%', width: '26%' }
---
Add stages such as $match, $project and $addFields as cards, and check each stage's output before you run the whole pipeline.
