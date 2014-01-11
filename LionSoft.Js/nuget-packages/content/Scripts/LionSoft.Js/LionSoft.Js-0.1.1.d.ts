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
    Returns a value indicating whether the specified string object occurs within this string.
    */
    Contains(subString: string, caseInsensitive?: boolean): boolean;
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
    ExpandPath(basePath?: string, separator?: string): any;
    /**
    Converts string to boolean.
    */
    AsBool(defValue?: boolean): boolean;
    /**
    Returns the index of the first match of the regexp in the string. -1 if there is no match.
    */
    RegexIndexOf(regex: any, startPos?: number): number;
    /**
    Returns the index of the last match of the regexp in the string. -1 if there is no match.
    */
    RegexLastIndexOf(regex: any, startPos?: number): number;
    /**
    Converts JSON string to an object. Returns defValue for invalid or empty JSON string.
    The JSON string can be not braketed with { and  }.
    */
    ToJson(defValue: any): any;
}
interface Number {
    AsBool(): number;
}
interface Array {
    /**
    Make the copy of the source array.
    */
    clone(): any;
}
interface Location {
    /**
    Gets the site host address w/o trailing separator, eg. http[s]://server.name[:port]
    */
    origin: string;
    /**
    Value is the same as LionSoftJs.appFolder
    */
    appFolder: string;
}
interface IDefferedObject {
    then(action: () => any): IDefferedObject;
}
/**
Returns true if the object is not undefined and is not null.
*/
declare function isAssigned(obj: any): boolean;
declare module LionSoftJs {
    /**
    Gets the folder of the LionSoft.Js-{version}.js script with trailing separator, eg. http[s]://server.name[:port][/appFolder]/Scripts/LionSoft.Js/
    */
    var scriptFolder: string;
    /**
    Gets the application folder with trailing separator, eg. http[s]://server.name[:port][/appFolder]/
    
    Note: Script file must be placed to the default folder ~/Scripts/LionSoft.Js.
    Searching is processed in three steps:
    1. If LionSoftJs.scriptFolder is %appFolder%/Scripts/LionSoft.Js
    2. or if LionSoftJs.scriptFolder is %appFolder%/Scripts/<other>
    3. or if LionSoftJs.scriptFolder is %appFolder%/LionSoft.Js
    otherwise appFolder will be equal window.location.origin
    */
    var appFolder: string;
    /**
    Current version of the framework library.
    */
    var version: string;
    /**
    Gets cookie value.
    */
    function getCookie(name: any, defValue?: any): any;
    /**
    Sets cookie value and its options.
    --
    Using:
    >   LionSoftJs.setCookie("myCookie", value, {expires: 10, path: "/", }) - set site cookie for 10 seconds
    */
    function setCookie(name: string, value: any, options?: any): void;
    /**
    Removes the cookie.
    */
    function deleteCookie(name: any): void;
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
    function load(script: string, callback?: Function): IDefferedObject;
}
