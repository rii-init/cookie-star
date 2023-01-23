#!/bin/bash
CLIENT_PATH="$PWD";

bottom_bread="$(cat template/sandwich/bottom.html)";

cd src/0400_scene;

# Identify static pages to copy jsx content into:
pages="$(find . | grep -E ".*/.*.tsx")"

# Copy JSX content into static pages:
for page in $pages
do
    
    echo "Linking Content: [ $page ]";
    echo "🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈"

    HTML_NAME=$(echo $page | grep -Eo "([a-zA-Z0-9_]+)" | head -n 1);
    JSX_NAME=$(echo $page  | grep -Eo "([a-zA-Z0-9_]+)" | tail -n 2 | head -n 1);

    echo "-------------------------------"
    echo "HTML_NAME: $HTML_NAME";
    echo "JSX_NAME:  $JSX_NAME";

    # Get JSX content:
    heading_text="$(cat "$HTML_NAME/$JSX_NAME.tsx" | grep -Eo "<h1>.*</h1>" )" 
    main_text="$(awk '/<main>/,/<\/main>/' "$HTML_NAME/$JSX_NAME.tsx" )"
    
    HTML_PATH="$CLIENT_PATH/build/$HTML_NAME/index.html";

    if [ "home" == "$HTML_NAME" ]; then
        HTML_PATH="$CLIENT_PATH/build/index.html";
    fi
    
    sed -i "s|<h1 data-jsx-h1></h1>|$heading_text|" "$HTML_PATH"
    
    echo "$main_text" >> "$HTML_PATH.tmp";
    node "$CLIENT_PATH/linker.content.jsx" "$HTML_PATH.tmp" "$HTML_PATH";
    
    sed -i "s|className|class|"                            "$HTML_PATH";
    
    # clean up:
    rm "$HTML_PATH.tmp";
done

cd ../../;

# # 🐶🐱🐰🦊🐨🐯🦁🐧🐦🐤🐥🦆🦢🦅🦉🦚🦎🐬🐟🐠🦈🐚🦀🦐
