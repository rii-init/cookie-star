pages=$(find . | grep -E "public/.*/index.htm")


while read page; do
    sed -i "s|/static/js/main.js|$(cat build/index.html | grep -E -o '/static/js/main.*\.js')|"  "$page"
done <"$pages"
