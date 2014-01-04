interface String {
    format(...args: any[]): string;
    isEqual(str: string, caseInsensitive?: boolean): any;
    startsWith(str: string, caseInsensitive?: boolean): any;
    endsWith(str: string, caseInsensitive?: boolean): any;
}
interface Location {
    origin: string;
}
declare module LionSoftJs {
    /**
    Current root folder of the LionSoft.Js-{version}.js
    */
    var rootFolder: string;
    /**
    Current version of the framework library.
    */
    var version: string;
    /**
    Cross-browser gets of the XMLHttpRequest object
    */
    function getXmlHttp(): any;
    /**
    Gets the base path of the current executing script.
    */
    function getBasePath(): string;
    /**
    Dynamic loads of the js-files via HttpRequest.
    After this call module has been loaded and ready for using. (Unfortunately you won't be able to debug this module).
    Prevents double loading of the module.
    --
    Using:
    >   1.  LionSoftJs.require("dot.net.string.js") - load script file from the script folder.
    >   2.  LionSoftJs.require("/scripts/myScript1.js", ..., "/scripts/myScriptN.js") - load script filess from the site root folder.
    >   3.  LionSoftJs.require("http://mysite/app/scripts/myScript1.js") - load script file from the absolute address.
    
    */
    function require(...scripts: string[]): boolean;
    /**
    Loads of the js-file via inserting <script> tag into DOM.
    Callback function will be called when module is ready to using. (But you will be able to debug this module).
    Prevents double loading of the module.
    --
    Using:
    >   1.  LionSoftJs.load("dot.net.string.js") - load script file from the script folder.
    >   2.  LionSoftJs.load("/scripts/dot.net.string.js", function() { ... }) - load script file from the site root folder.
    */
    function load(script: string, callback?: Function): void;
}