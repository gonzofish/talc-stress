# Talc Stress Test

This project does a stress test on Talc.

## Methodology

1. Generating 10_000 markdown files with content from a Loreum Ipsum generator.
  - Words per sentence randomize between 4-16
  - Sentences per paragraph randomize between 4-8
  - Paragraphs per file randomize between 3-20
2. Run talc over the generated markdown files
  - Have two page types: index.html & post.html
  - Each page imports a header & footer partial
  - index.html also imports the pagelist partial
  - Date format is also specified in talc.config.js

Performance is measure using Node's `perf_hooks` implementation of the performance API. At each step we `mark` the time and the performance API calculates the time between two marks when we ask for a `measure`.

## Results

- [2020-05-23]: 21-25 seconds
