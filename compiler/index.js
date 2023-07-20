"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const params = process.argv.slice(2);
if (params.length < 2) {
    console.log('Usage: node compiler/index.ts <input> <output>');
    process.exit(1);
}
const [input, output] = params;
// init markdown-it:
var markdownItAttrs = require('markdown-it-attrs');
var md = require('markdown-it')({
    html: true,
    breaks: true, // Convert '\n' in paragraphs into <br>
});
// init markdown-it-attrs:
md.use(markdownItAttrs);
// render the page:
const page = fs.readFileSync(input, 'utf8');
const html = md.render(page);
// write the output:
console.log("io", input, "->", output);
fs.writeFileSync(output, html, 'utf8');
