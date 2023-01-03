
# Move Minimal CSS Bundle:
# mv build/minimal.css build/static/css/minimal.css; 


# # Modify Main Page:      
echo "Linking RESOURCES:"

# Get    Element of Main JS Bundle: 
main_js=$(cat build/index.html | grep -Eo "main\.[0-9A-Za-z]+\.js");
echo "Linking: Main Page: main_js== $main_js";

# Get    Element of Main CSS Bundle:
main_css=$(cat build/index.html | grep -Eo  "main\.[0-9A-Za-z]+\.css");
echo "Linking: Main Page: main_css== $main_css";


## Remove Element of Main JS Bundle from <head>:
sed -i  "s|<script defer=\"defer\" src=\"/static/js/$main_js\"></script>||" build/index.html;
## Add    Element of Main JS Bundle to   <body>:
sed -i  "s|<js_async/>|<script src=\"/static/js/$main_js\"></script>|"  build/index.html;


## Remove Element of Main CSS Bundle from <head>:
sed -i  "s|<link href=\"/static/css/$main_css\" rel=\"stylesheet\">||" build/index.html;
## Add    Element of Main CSS Bundle to   <body>:
sed -i  "s|<css_async/>|<link href=\"/static/css/$main_css\" rel=\"stylesheet\">|"                  build/index.html;

# Identify pages to static link:
pages="$(find . | grep -E "build/.*/index.htm")"

echo "Linking RESOURCES:"
for page in $pages
do
      
      echo "Linking page: [ $page ]";
      
      #Link JS bundle:
      sed -i "s|<js_async/>|<script src=\"/static/js/$main_js\"></script>|" $page

      #Link CSS bundle:
      sed -i "s|<css_async/>|<link href=\"/static/css/$main_css\" rel=\"stylesheet\">|"  "$page";

done
