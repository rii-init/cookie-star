#!/bin/bash
CLIENT_PATH="$PWD";
cd src/400_scene;

# Identify static pages to copy jsx content into:
pages="$(find . | grep -E ".*/.*.tsx")"

# Copy JSX content into static pages:
for page in $pages
do
    
    echo "Linking Content: [ $page ]";
    echo "🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈🐈"

    HTML_NAME=$(echo $page | grep -Eo "([a-zA-Z0-9_]+)" | head -n 1);
    JSX_NAME=$(echo $page  | grep -Eo "([a-zA-Z0-9_]+)" | tail -n 2 | head -n 1);

    # Get JSX content:
    heading_text="$(cat "$HTML_NAME/$JSX_NAME.tsx" | grep -Eo "<h1>.*</h1>" )" 
    main_text="$(awk '/<main>/,/<\/main>/' "$HTML_NAME/$JSX_NAME.tsx" )"    

    # # Copy [[JSX content] heading] into [[static page] heading]:
    # # Copy [[JSX content] main]    into [[static page] main]:
    
    HTML_PATH="$CLIENT_PATH/public/$HTML_NAME/index.html";

    if [ "home" == "$HTML_NAME" ]; then
        HTML_PATH="$CLIENT_PATH/public/index.html";
    fi

    
    echo "HTML_PATH == $HTML_PATH";

    sed -i "s|<h1 data-jsx-h1></h1>|$heading_text|"  "$HTML_PATH"

    echo "MAIN_TEXT == $main_text";
    #echo "$main_text" > "MAIN_TEXT_FILE"

   

    #sed -i "s|<div data-jsx-main></div>|$main_text|" "$HTML_PATH"
    
done

# # 🐶🐱🐰🦊🐨🐯🦁🐧🐦🐤🐥🦆🦢🦅🦉🦚🦎🐬🐟🐠🦈🐚🦀🦐