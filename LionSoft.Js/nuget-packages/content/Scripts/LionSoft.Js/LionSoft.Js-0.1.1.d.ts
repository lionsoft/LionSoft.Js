interface String {
    /**
    */
    format(...args: any[]): string;
    /**
    Checks the current string with the passed one whether they are equals.
    */
    IsEqual(str: string, caseInsensitive?: boolean): any;
    /**
    Determines whether the beginning of this string instance matches the specified string.
    */
    StartsWith(str: string, caseInsensitive?: boolean): any;
    /**
    Determines whether the end of this string instance matches the specified string.
    */
    EndsWith(str: string, caseInsensitive?: boolean): any;
    /**
    Removes all leading and trailing occurrences of a set of characters specified in a string or an array from the current string.
    */
    Trim(trimChars?: string): any;
    /**
    Removes all leading occurrences of a set of characters specified in a string or an array from the current string.
    */
    TrimLeft(trimChars?: string): any;
    /**
    Removes all leading occurrences of a set of characters specified in a string or an array from the current string.
    */
    TrimStart(trimChars?: string): any;
    /**
    Removes all trailing occurrences of a set of characters specified in a string or an array from the current string.
    */
    TrimRight(trimChars?: string): any;
    /**
    Removes all trailing occurrences of a set of characters specified in a string or an array from the current string.
    */
    TrimEnd(trimChars?: string): any;
    /**
    Extracts directory path part from the full file path.
    */
    ExtractDirectory(separator?: string): any;
    /**
    Extracts file name path part from the full file path.
    */
    ExtractFileName(separator?: string): any;
    /**
    Expand filename with the passed base path.
    
    If the base path is empty the filename will be expanded from site root origin (if filename starts with '/')
    or from current page folder (if filename doesn't start with '/').
    */
    ExpnadPath(basePath?: string, separator?: string): any;
}
interface Array {
    /**
    Make the copy of the source array.
    */
    clone(): any;
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
