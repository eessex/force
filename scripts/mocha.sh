#! /bin/bash

set -ex

#trap "exit" INT

nyc --no-cache mocha \
  -c \
  --require test.config.js \
  --require mocha.config.js \
  --timeout 30000 \
   $@
