



cd ../generator

if [ ! -f generator ] || [ ! -f ts/index.js ]; then
    ./build.sh
fi

if [ -n "$DEVELOPMENT_MODE" ]; then
    export GENERATOR_MODE="development"
else
    export GENERATOR_MODE="production"
fi

./generator # create-sitemap

cd ../client
npm run build

cd ../generator
./generator render-pages 

cd ../client