#!/bin/bash
# Replace [JSX elements with no 2D Analog] 
#                       |
#                       with 
#                       |
#                  [something functionally equivalent].

function progressiveEnhancement() {
    echo "progressive enhance of $1"

    sed -i 's|<TextH1|<h1|'    $1
    sed -i 's|</TextH1|</h1|'  $1

    sed -i 's|<TextH2|<h2|'    $1
    sed -i 's|</TextH2|</h2|'  $1

    sed -i 's|<TextH3|<h3|'    $1
    sed -i 's|</TextH3|</h3|'  $1

    sed -i 's|<TextH4|<h4|'    $1
    sed -i 's|</TextH4|</h4|'  $1

    sed -i 's|<TextSpan|<span|'    $1
    sed -i 's|</TextSpan|</span|'  $1

    sed -i 's|<TextP|<p|'    $1
    sed -i 's|</TextP|</p|'  $1

    sed -i 's|<group|<div class="group"|' $1
    sed -i 's|</group|</div|'             $1

    sed -i 's|<Sequence|<ul|'       $1
    sed -i 's|</Sequence|</ul|'     $1
    
    sed -i 's|<LabelSurface|<li|'   $1
    sed -i 's|</LabelSurface|</li|' $1

    sed -i 's|<DemoVolume|<article class="demo-volume"|' $1
    sed -i 's|</DemoVolume|</article|'                   $1

    sed -i 's|<TableOfContentsSurface>|<aside><ul>|'   $1
    sed -i 's|</TableOfContentsSurface>|</ul></aside>|' $1

    sed -i 's|<fallbackImage |<img |'  $1

    sed -i 's|<ParagraphSurface|<p class="paragraphSurface" |'   $1
    sed -i 's|</ParagraphSurface|</p class="paragraphSurface" |' $1
}

# Identify pages to make responsive:
pages="$(find . | grep -E "build/.*/index.html")"
echo "** Creating [[static site] HTML components] **"

progressiveEnhancement "build/index.html"

for page in $pages
do
      progressiveEnhancement $page  
done

 
