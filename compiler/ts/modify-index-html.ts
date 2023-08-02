import * as fs from "fs";   

export function modifyIndexHtml(): void {
    // read ../content/head.html into a string:
    const head = fs.readFileSync('../content/head.html', 'utf8');

    // read ../client/build/index.html:
    const index = fs.readFileSync('../client/build/index.html', 'utf8');

    // get names of static assets from asset-manifest.json:
    const assetManifest = JSON.parse(fs.readFileSync('../client/build/asset-manifest.json', 'utf8')).files;

    // replace <!-- head --> with the contents of ../content/head.html:
    let modifiedIndex = index.replace('<title id="head"></title>', head);


    modifiedIndex = modifiedIndex.replace(/<script defer="defer" src="\/static\/js\/main\.[a-z0-9]+\.js"><\/script>/, '');

    modifiedIndex = modifiedIndex.replace('<div id="js_async"></div>', '<script src="' + assetManifest['main.js'] + '" ></script>');

    // write the modified index.html:
    fs.writeFileSync('../client/build/index.html', modifiedIndex, 'utf8');
}