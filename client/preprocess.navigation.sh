#!/bin/bash


# Check what pages exist:
cd src/0400_scene;
pages="$(find . | grep -E ".*/.*.tsx")"

# Generate navigation items:
TEMP_NAV="../0200_component/flat/navigation-surface/NavigationSurface.tsx.list"
rm    "$TEMP_NAV"
touch "$TEMP_NAV"

for page in $pages
do
   
    HTML_NAME=$(echo $page | grep -Eo "([a-zA-Z0-9_]+)" | head -n 1);
    echo "<LinkSurface>" >> "$TEMP_NAV";
    echo "$HTML_NAME" >> "$TEMP_NAV";
    echo "<LinkSurface>" >> "$TEMP_NAV";
done

# backup original NavigationSurface:


