
echo "Linking static files...";

pages="$(find . | grep -E "dist/.*/index.htm")"


# Modify Main Page:
      
# Get    Element of Main JS Bundle: 
main_js=$(cat build/index.html | grep -E -o  '<script.*src="(.*main.*)"></script>')
## Remove Element of Main JS Bundle from <head>:
sed -i  "s|<script defer=\"\" src=\"$main_js\"></script>||" build/index.html;
## Add    Element of Main JS Bundle to   <body>:
sed -i  "s|<script js_async></script>|<script src=\"$main_js\"></script>|"  build/index.html;

# Get    Element of Main CSS Bundle:
main_css=$(cat build/index.html | grep -E -o  '<link href="(.*main.*\.css)" rel="stylesheet">')
## Remove Element of Main CSS Bundle from <head>:
sed -i  "s|<link href=\"$main_css\"||" build/index.html;
## Add    Element of Main CSS Bundle to   <body>:
sed -i  "s|<link css_async rel=\"stylesheet\">|<link href=\"$main_css\" rel=\"stylesheet\">|"                  build/index.html;


for page in $pages
do
      echo "Linking page: [ $page ]";
      

      # link JS bundle:
      sed -i "s|/static/js/main.js|$(cat build/index.html | grep -E -o '/static/js/main.*\.js')|"  "$page";

      # Link CSS bundle:
      sed -i "s|/static/css/main.css|$(cat build/index.html | grep -E -o '/static/css/main.*\.css')|"  "$page";

done


