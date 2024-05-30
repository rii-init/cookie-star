import { renderPage } from './render-page';
import { validateCommand } from './validation';

const params = process.argv.slice(2);



const [mode, input_root, input, output] = params;

console.log("generator/ts/index.ts: mode: ", mode);
console.log("process.cwd()  ", process.cwd());
console.log("input: ", input);
console.log("output: ", output);
console.log(" ");

if (mode === 'render-page') {
    
    validateCommand(params, 4, 'Usage: node generator/index.ts render-pages <input_root> <input> <output>')
    renderPage(input_root, input, output);

}
