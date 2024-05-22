#!/bin/bash

# Default values for the arguments
INPUT_PATH=""
OUTPUT_PATH=""

# Function to display usage instructions
print_usage() {
    echo "Usage: npm run generate -- --in ../your/content --out ../your/static/html+assets"
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

# Validate required arguments
if [ -z "$INPUT_PATH" ] || [ -z "$OUTPUT_PATH" ]; then
    echo "Error: Missing required arguments"
    print_usage
    exit 1
fi


# Move out of client directory and into generator directory
cd ../generator

# Build generator if necessary
if [ ! -f generator ] || [ ! -f ts/index.js ]; then
    ./build.sh
fi

# Set GENERATOR_MODE based on DEVELOPMENT_MODE
if [ -n "$DEVELOPMENT_MODE" ]; then
    export GENERATOR_MODE="development"
else
    export GENERATOR_MODE="production"
fi

# Run the generator with input and output paths
./generator --in "$INPUT_PATH" --out "$OUTPUT_PATH"

# Move back to client directory and run build
cd ../client
npm run build

# Move back to generator directory to render pages
cd ../generator
./generator render-pages --in "$INPUT_PATH" --out "$OUTPUT_PATH"

# Move back to client directory
cd ../client