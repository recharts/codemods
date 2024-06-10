#!/usr/bin/env bash

jscodeshift --verbose=0 --no-dry --parser=tsx -t array-to-objects.js ../../recharts/test/