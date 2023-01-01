#!/bin/bash

# Identify static pages to copy jsx content into:
cd src/400_scene;
pages="$(find . | grep -E ".*/.*.tsx")"

# Copy JSX content into static pages:
for page in $pages
do
      
    echo "Linking Content: [ $page ]";
          
    HTML_NAME=$(echo $page | grep -Eo "^([a-zA-Z0-9_]+)/]");
    JSX_NAME=$(echo  $page | grep -Eo "^[a-zA-Z0-9_]+/([a-zA-Z0-9_]+)\.tsx");


    echo "HTML_NAME: $HTML_NAME";
    echo "JSX_NAME: $JSX_NAME";
    echo ".'* <3 .'* ";
    echo "";


    # # Copy [[JSX content] heading] into [[static page] heading]:
    # sed -i "s|<h1 data-jsx-h1></h1>|$(cat $JSX_NAME.tsx | grep -Eo "" )|" "../400_scene/$HTML_NAME/index.html;"

    # # Copy [[JSX content] main] into [[static page] main]:
    # sed -i "s|<div data-jsx-main></div>|$(cat $JSX_NAME.tsx | grep -Eo "" )|" "../400_scene/$HTML_NAME/index.html;"
  

done