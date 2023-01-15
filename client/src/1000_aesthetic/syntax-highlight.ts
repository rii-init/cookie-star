import { getRGB } from "./getRGB";

export class SyntaxHighlight {
    public static _Point     = "#000000";
    public static _Circle    = "#ffffff";
    public static _Sequence  = "#3080ff";
    public static _Prism     = "#30c0ff";
    public static _Structure = "#30bf10";
    public static _Tree      = "#96cf11";
    public static _Manifold  = "#ffbc20";
    public static _Function  = "#ff20fa";
    public static _Procedure = "#ffc0fa";
    public static _Class     = "#ca90ff";


    public static get Point() {
        return getRGB(this._Point)
    } 
    public static get Circle() {
        return getRGB(this._Circle)
    } 
    public static get Sequence() {
        return getRGB(this._Sequence)
    } 
    public static get Prism() {
        return getRGB(this._Prism)
    } 
    public static get Structure() {
        return getRGB(this._Structure)
    }
    public static get Tree() {
        return getRGB(this._Tree)
    } 
    public static get Manifold() {
        return getRGB(this._Manifold)
    } 
    public static get Function() {
        return getRGB(this._Function)
    }
    public static get Procedure() {
        return getRGB(this._Procedure)
    } 
    public static get Class() {
        return getRGB(this._Class)
    } 
} 