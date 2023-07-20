import * as fs from 'fs';

const params = process.argv.slice(2);

if (params.length < 2) {
    console.log('Usage: node compiler/index.ts <input> <output>');
    process.exit(1);
}

const [input, output] = params;


// init markdown-it:
var markdownItAttrs = require('markdown-it-attrs');
var md              = require('markdown-it')({
    html:         true,        // Enable HTML tags in source
    breaks:       true,        // Convert '\n' in paragraphs into <br>
});

// init markdown-it-attrs:
md.use(markdownItAttrs);


// render the page:
const page = fs.readFileSync(input, 'utf8');
const html = md.render(page);

// write the output:
console.log("io", input, "->", output);
fs.writeFileSync(output, html, 'utf8');