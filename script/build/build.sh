#!/bin/bash

echo "Building ultr7a.com";





echo "Creating directory structure...";
source "./step/1.create__directory-structure.sh";

echo "Creating style-sheet bundle...";
source "./step/2.create__style-sheet_bundle.sh"

echo "Copying files to web surface..."
source "./step/3.copy__files_to_web-surface.sh"

echo "Adding components to templates..."
source "./step/4.add__components-to-templates.sh"

echo "-------------------------------";



echo "Building API server";

echo "-------------------------------";

echo "Done."