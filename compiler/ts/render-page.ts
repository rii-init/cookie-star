import * as fs from 'fs';

export function renderPage (inputPath: string, outputPath: string): void {
    // init markdown-it:
    var markdownItAttrs = require('markdown-it-attrs');
    var md              = require('markdown-it')({
        html:         true,        // Enable HTML tags in source
        breaks:       true,        // Convert '\n' in paragraphs into <br>
    });

    // init markdown-it-attrs:
    md.use(markdownItAttrs);

    // render the page:
    const page = fs.readFileSync(inputPath, 'utf8');
    let html = md.render(page);

    // read ../../content/head.html into a string:
    const headContent = fs.readFileSync('../content/head.html', 'utf8');
    // get names of static assets from asset-manifest.json:
    const assetManifest = JSON.parse(fs.readFileSync('../client/build/asset-manifest.json', 'utf8')).files;

    html = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        headContent +
        "<link rel=\"stylesheet\" href=\"" + assetManifest['main.css'] + "\">\n" +
        "</head>\n" +
        "<body>\n" +
        html +
        '<div id="root"></div>\n' +
        "<script src=\"" + assetManifest['main.js'] + "\"></script>\n" +
        "</body>\n" +
        "</html>";


    // write the output:
    fs.writeFileSync(outputPath+"/index.html", html, 'utf8');
}