#!/bin/bash

# Build the binary
go build

# build the typescript page renderer
cd ts
tsc

cd ..
