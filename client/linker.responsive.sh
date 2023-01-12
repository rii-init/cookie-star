#!/bin/bash
# Replace [JSX elements with no 2D Analog] 
#                       |
#                       with 
#                       |
#                  [something functionally equivalent].

function progressiveEnhancement() {
    echo "progressive enhance of $1"
    sed -i 's|<Sequence|<ul|'       $1
    sed -i 's|</Sequence|</ul|'     $1
    sed -i 's|<LabelSurface|<li|'   $1
    sed -i 's|</LabelSurface|</li|' $1
}

# Identify pages to make responsive:
pages="$(find . | grep -E "build/.*/index.html")"
echo "** Creating [[static site] HTML components] **"

progressiveEnhancement "build/index.html"

for page in $pages
do
      progressiveEnhancement $page  
done

 
