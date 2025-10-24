#!/usr/bin/env bash

jscodeshift --verbose=0 --no-dry --parser=tsx -t code-folding.js ../../recharts/www/src/docs/exampleComponents/
