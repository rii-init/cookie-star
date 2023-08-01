cd ../compiler
./compiler # create-sitemap

cd ../client
npm run build

cd ../compiler
./compiler render-pages

cd ../client