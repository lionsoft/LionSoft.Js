interface String {
    /**
    */
    format(...args: any[]): string;

    /**
        Checks the current string with the passed one whether they are equals. 
    */
    IsEqual(str: string, caseInsensitive?: boolean);

    /**
        Determines whether the beginning of this string instance matches the specified string. 
    */
    StartsWith(str: string, caseInsensitive?: boolean);

    /**
        Determines whether the end of this string instance matches the specified string. 
    */
    EndsWith(str: string, caseInsensitive?: boolean);

    /**
        Removes all leading and trailing occurrences of a set of characters specified in a string or an array from the current string.
    */
    Trim(trimChars?: string);

    /**
        Removes all leading occurrences of a set of characters specified in a string or an array from the current string. 
    */
    TrimLeft(trimChars?: string);

    /**
        Removes all leading occurrences of a set of characters specified in a string or an array from the current string. 
    */
    TrimStart(trimChars?: string);

    /**
        Removes all trailing occurrences of a set of characters specified in a string or an array from the current string. 
    */
    TrimRight(trimChars?: string);

    /**
        Removes all trailing occurrences of a set of characters specified in a string or an array from the current string. 
    */
    TrimEnd(trimChars?: string);

    /**
        Returns a value indicating whether the specified string object occurs within this string.
    */
    Contains(subString: string, caseInsensitive?: boolean): boolean;

    /**
        Extracts directory path part from the full file path. 
    */
    ExtractDirectory(separator?: string);

    /**
        Extracts file name path part from the full file path. 
    */
    ExtractFileName(separator?: string);

    /**
        Expand filename with the passed base path.

        If the base path is empty the filename will be expanded from site root origin (if filename starts with '/') 
        or from current page folder (if filename doesn't start with '/').
    */
    ExpandPath(basePath?: string, separator?: string);

    /**
        Converts string to boolean.
    */
    AsBool(defValue?: boolean): boolean;

    /**
        Returns the index of the first match of the regexp in the string. -1 if there is no match.
    */
    RegexIndexOf(regex, startPos?: number): number;

    /**
        Returns the index of the last match of the regexp in the string. -1 if there is no match.
    */
    RegexLastIndexOf(regex, startPos?: number): number;

    /**
        Converts JSON string to an object. Returns defValue for invalid or empty JSON string.
        The JSON string can be not braketed with { and  }.
    */
    ToJson(defValue);
}

interface Number {
    AsBool(): number;
}

interface Array {
    /**
        Make the copy of the source array. 
    */
    clone();
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
function isAssigned(obj) {
    return obj !== undefined && obj !== null;
}

module LionSoftJs {
    'use strict';  
    /**
       Gets the folder of the LionSoft.Js-{version}.js script with trailing separator, eg. http[s]://server.name[:port][/appFolder]/Scripts/LionSoft.Js/
    */
    export var scriptFolder: string;

    /**
        Gets the application folder with trailing separator, eg. http[s]://server.name[:port][/appFolder]/

        Note: Script file must be placed to the default folder ~/Scripts/LionSoft.Js.
        Searching is processed in three steps:
        1. If LionSoftJs.scriptFolder is %appFolder%/Scripts/LionSoft.Js
        2. or if LionSoftJs.scriptFolder is %appFolder%/Scripts/<other>
        3. or if LionSoftJs.scriptFolder is %appFolder%/LionSoft.Js
        otherwise appFolder will be equal window.location.origin
    */
    export var appFolder: string;

    /**
        Current version of the framework library.
    */
    export var version: string;

    /**
       Gets cookie value.
    */
    export function getCookie(name, defValue?) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
        return matches ? decodeURIComponent(matches[1]) : defValue;
    }

    /**
       Sets cookie value and its options.
        --
        Using:
        >   LionSoftJs.setCookie("myCookie", value, {expires: 10, path: "/", }) - set site cookie for 10 seconds
    */
    export function setCookie(name: string, value: any, options?: any) {
        options = options || {};
        options.path = options.path || "/";

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    /**
       Removes the cookie.
    */
    export function deleteCookie(name) {
        setCookie(name, "", { expires: -1 });
    }

    /**
        Cross-browser gets of the XMLHttpRequest object
    */
    export function getXmlHttp() {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e1) {
                xmlhttp = false;
            }
        }
        // ReSharper disable once InconsistentNaming
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }

    /**
       Gets the base path of the current executing script.
    */
    export function getBasePath(): string {
        var scripts = document.getElementsByTagName("script"),
            src = scripts[scripts.length - 1].src,
            path = src.split('/');

        var rootFile = path[path.length - 1];
        var arr = rootFile.split('-');
        if (arr.length < 2) {
            version = "";
        } else {
            version = arr[arr.length - 1];
            version = version.substring(0, version.length - 3); // remove .js extension
        }

        path[path.length - 1] = undefined;
       // path.length--;
        return path.join('/');
    }

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
    export function require(...scripts: string[]): boolean {
        var res = true;
        var xhr = getXmlHttp();
        if (xhr) {
            for (var i = 0; i < scripts.length; i++) {
                var script = updateScriptPath(scripts[i]);

                if (loadedJs.indexOf(script) != -1) continue;
                loadedJs.push(script);

                xhr.open("GET", script + "?_" + (new Date()).getTime(), false);
                xhr.send();
                if (xhr.status == 200) {
                    try {
                        eval(xhr.responseText);
                    } catch (e) {
                        console.log("LionSoftJs.require(): Fail on evaluation script '" + script + "'. Error: " + e.message);
                        res = false;
                    }
                } else {
                    var status = xhr.status == 404 ? "Resource not found." : "Error status: " + xhr.status;
                    console.log("LionSoftJs.require(): Fail on loading script '" + script + "'. " + status);
                    res = false;
                }
            }
        } else {
            console.log("LionSoftJs.require(): Fail on creating XMLHttpRequest");
            res = false;
        }
        return res;
    }

    /**
        Loads of the js-file via inserting <script> tag into DOM.
        Callback function will be called when module is ready to using. (But you will be able to debug this module).
        Prevents double loading of the module.
        --
        Using:
        >   1.  LionSoftJs.load("dot.net.string.js") - load script file from the script folder.
        >   2.  LionSoftJs.load("/scripts/dot.net.string.js", function() { ... }) - load script file from the site root folder.
    */
    export function load(script: string, callback?: Function): IDefferedObject {
        var res = new DefferedObject();
        script = updateScriptPath(script);
        if (loadingJs.indexOf(script) != -1 || loadedJs.indexOf(script) != -1) {
            res.invoke();
            return res;
        }
        loadingJs.push(script);

        var scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.src = script;

        var onLoad = (readyState: string)=> {
            if (readyState == "complete") {
                loadedJs.push(script);
                scriptElement.onreadystatechange = null;
                scriptElement.onload = null;
                if (callback != null)
                    callback();
                res.invoke();
            }
        };


        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        scriptElement.onreadystatechange = ()=> onLoad(scriptElement.readyState);
        scriptElement.onload = ()=> onLoad("complete");

        // Adding the script tag after the current <script> section
        var scripts = document.getElementsByTagName("script"),
            currentScriptElement = scripts[scripts.length - 1];

        // Fire the loading
        currentScriptElement.parentNode.appendChild(scriptElement);
        return res;
    }

    function updateScriptPath(script: string): string {
        if (script.slice(0, 1) != "/" && script.slice(0, 7).toLowerCase() != "http://" && script.slice(0, 8).toLowerCase() != "https://" && script.slice(0, 6).toLowerCase() != "ftp://") {
            script = getBasePath() + script;
        }
        if (script.slice(0, 1) == "/") {
            script = window.location.origin + script;
        }

        if (version == "") {
            script = script.replace('-{version}-', "").replace('-{version}', "").replace('{version}-', "").replace('{version}', "");

        } else {
            script = script.replace('{version}', version);
        }
        return script;
    }

    class DefferedObject implements IDefferedObject {

        _defObj: DefferedObject;
        _invoked: boolean;
        _action: () => DefferedObject;

        public invoke() {
            if (this._action != undefined) {
                var res = this._action();
                if (res == undefined || res["then"] == undefined)
                    this._defObj.invoke();
                else {
                    res["then"](() => this._defObj.invoke());
                }
            }
            this._invoked = true;
        }

        then(action: () => any): IDefferedObject {
            this._action = action;
            this._defObj = new DefferedObject();
            var res = this._defObj;
            if (this._invoked) this.invoke();
            return res;
        }

    }


    // List of the loaded scripts
    var loadedJs = [];
    var loadingJs = [];


    // Getting current version
    var scripts = document.getElementsByTagName("script"),
        src = scripts[scripts.length - 1].src,
        path = src.split('/');

    var rootFile = path[path.length - 1];
    var arr = rootFile.split('-');
    if (arr.length < 2) {
        version = "";
    } else {
        version = arr[arr.length - 1];
        version = version.substring(0, version.length - 3); // remove .js extension
    }

    path[path.length - 1] = "";
//    path.length--;
    scriptFolder = path.join('/');

    // Set window.location.origin
    if (!window.location.origin)
        window.location.origin = window.location.protocol + "//" + window.location.host;
    
   
    /* Loading LionSoft.Js framework modules */
    require(scriptFolder + "js.net-{version}/js.net.string.js");
    require(scriptFolder + "js.net-{version}/string.format-1.0.js");
    require(scriptFolder + "js.net-{version}/js.net.AsConvert.js");
    require(scriptFolder + "js.net-{version}/js.net.array.js");

    // Set window.location.appFolder
    var idx = scriptFolder.EndsWith("/Scripts/LionSoft.Js/", true) ? scriptFolder.toLowerCase().lastIndexOf("/scripts/lionsoft.js/") : -1;
    if (idx == -1) idx = scriptFolder.toLowerCase().indexOf("/scripts/");
    if (idx == -1) idx = scriptFolder.EndsWith("/LionSoft.Js/") ? scriptFolder.toLowerCase().lastIndexOf("/lionsoft.js/") : -1;
    if (idx == -1) {
        window.location.appFolder = window.location.origin + "/";
    } else {
        window.location.appFolder = scriptFolder.slice(0, idx) + "/";
    }

    appFolder = window.location.appFolder;

    require(scriptFolder + "js.net-{version}/js.net.path.js");
}
