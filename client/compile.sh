#!/bin/bash

# This script converts source markdown files to html files 
# and links cache-busted generated bundles to the html files.

cd ../compiler
./compiler
cd ../client
./linker.resource.sh