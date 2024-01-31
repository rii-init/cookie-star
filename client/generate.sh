

cd ../generator

if [ ! -f generator ] || [ ! -f ts/index.js ]; then
    ./build.sh
fi

./generator # create-sitemap

cd ../client
npm run build

cd ../generator
./generator render-pages

cd ../client