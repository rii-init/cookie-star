
function get_bundle_src() {
      echo "$(cat build/index.html | grep -E -o "/static/$1/main.*\.$1")"
}

# Identify pages to static link:
pages="$(find . | grep -E "build/.*/index.htm")"


# Move Minimal CSS Bundle:
mv build/minimal.css build/static/css/minimal.css; 


# # Modify Main Page:      
# Get    Element of Main JS Bundle: 
main_js=$(cat build/index.html | grep -E -o  '<script.*src="(.*main.*)"></script>')
## Remove Element of Main JS Bundle from <head>:
sed -i  "s|<script defer=\"defer\" src=\"$main_js\"></script>||" build/index.html;
## Add    Element of Main JS Bundle to   <body>:
sed -i  "s|<js_async/>|<script src=\"$main_js\"></script>|"  build/index.html;

# Get    Element of Main CSS Bundle:
main_css=$(cat build/index.html | grep -E -o  '<link href="(.*main.*\.css)" rel="stylesheet">')
## Remove Element of Main CSS Bundle from <head>:
sed -i  "s|<link href=\"$main_css\" rel=\"stylesheet\">||" build/index.html;
## Add    Element of Main CSS Bundle to   <body>:
sed -i  "s|<css_async/>|<link href=\"$main_css\" rel=\"stylesheet\">|"                  build/index.html;

for page in $pages
do
      
      echo "Linking page: [ $page ]";
      
      # link JS bundle:
      sed -i "s|/static/js/main.js|$(get_bundle_src js)|"     "$page";
      # Link CSS bundle:
      sed -i "s|/static/css/main.css|$(get_bundle_src css)|"  "$page";

done
