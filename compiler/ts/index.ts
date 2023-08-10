import { renderPage } from './render-page';
import { modifyIndexHtml } from './modify-index-html';
import { usage_string, validateCommand } from './validation';

const params = process.argv.slice(2);



const [mode, input, output] = params;



if (mode === 'render-page') {
    
    validateCommand(params, 2, 'Usage: node compiler/index.ts <input> <output>')
    renderPage(input, output);

} else if (mode === 'modify-index.html') {
    
    modifyIndexHtml();

} else {
    
    validateCommand(params, 0, usage_string)
}

