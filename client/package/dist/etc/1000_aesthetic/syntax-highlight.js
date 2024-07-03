import { getRGB } from "./getRGB";
export class SyntaxHighlight {
    static get Point() {
        return getRGB(this._Point);
    }
    static get Circle() {
        return getRGB(this._Circle);
    }
    static get Sequence() {
        return getRGB(this._Sequence);
    }
    static get Prism() {
        return getRGB(this._Prism);
    }
    static get Structure() {
        return getRGB(this._Structure);
    }
    static get Tree() {
        return getRGB(this._Tree);
    }
    static get Manifold() {
        return getRGB(this._Manifold);
    }
    static get Function() {
        return getRGB(this._Function);
    }
    static get Procedure() {
        return getRGB(this._Procedure);
    }
    static get Class() {
        return getRGB(this._Class);
    }
}
SyntaxHighlight._Point = "#000000";
SyntaxHighlight._Circle = "#ffffff";
SyntaxHighlight._Sequence = "#3080ff";
SyntaxHighlight._Prism = "#30c0ff";
SyntaxHighlight._Structure = "#30bf10";
SyntaxHighlight._Tree = "#96cf11";
SyntaxHighlight._Manifold = "#ffbc20";
SyntaxHighlight._Function = "#ff20fa";
SyntaxHighlight._Procedure = "#ffc0fa";
SyntaxHighlight._Class = "#ca90ff";
//# sourceMappingURL=syntax-highlight.js.map