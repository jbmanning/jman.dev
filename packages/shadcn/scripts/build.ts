import {$} from "zx";

// Clean
await $`rm -rf dist && mkdir dist`

// build:ts
await Promise.allSettled([
  // ts
  $`tsc && resolve-tspaths`,
  // css
  $`postcss src/**/*.css -o dist/index.css`
])
