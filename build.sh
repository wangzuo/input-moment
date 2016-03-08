#!/bin/sh

# Build for dist
rm -rf dist
node_modules/.bin/webpack -p
node_modules/.bin/lessc --clean-css src/less/input-moment.less dist/input-moment.css

# Build for es5 import
rm -rf lib
babel src --out-dir lib
