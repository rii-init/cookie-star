#!/bin/bash

# get input path and output path
INPUT_PATH=""
OUTPUT_PATH=""

# parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --in)
            INPUT_PATH="$2"
            shift 2
            ;;
        --out)
            OUTPUT_PATH="$2"
            shift 2
            ;;
        *)
            echo "Unknown parameter passed: $1"
            print_usage
            exit 1
            ;;
    esac
done

# set default if no arguments are passed
if [ $# -eq 0 ]; then
    INPUT_PATH="../content"
    OUTPUT_PATH="../dist"
fi

cd ../generator
./generator --in "$INPUT_PATH" --out "$OUTPUT_PATH" --mode render-pages

cd ../client