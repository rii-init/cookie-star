#!/bin/bash

# Yes, this had to be its own script TwT
# It's really not that bad i swear

# Get the --in and --out parameters:
INPUT_PATH=""
OUTPUT_PATH=""

# Function to display usage instructions
print_usage() {
    echo "Usage: npm start -- --in ../content --out ../dist"
}


# Parse command-line arguments
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


if [ $# -eq 0 ]; then
    INPUT_PATH="../content"
    OUTPUT_PATH="../dist"
fi


# Validate required arguments
if [ -z "$INPUT_PATH" ] || [ -z "$OUTPUT_PATH" ]; then
    echo "Error: Missing required arguments (INPUT_PATH=$INPUT_PATH, OUTPUT_PATH=$OUTPUT_PATH)"
    print_usage
    exit 1
fi


DEVELOPMENT_MODE=true 

./generate.sh --in "$INPUT_PATH" --out "$OUTPUT_PATH" 


export DIST_PATH=$OUTPUT_PATH

webpack serve --open --config webpack.conf.js --mode development
