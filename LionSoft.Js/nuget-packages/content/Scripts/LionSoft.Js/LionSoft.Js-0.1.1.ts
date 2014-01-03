interface String {
    format(...args: any[]): string;
    isEqual(str: string, caseInsensitive?: boolean);
    startsWith(str: string, caseInsensitive?: boolean);
    endsWith(str: string, caseInsensitive?: boolean);
}

interface Location {
    origin: string;
}

module LionSoftJs {
    'use strict';
    /**
       Current root folder of the LionSoft.Js-{version}.js
    */
    export var rootFolder: string;

    /**
        Current version of the framework library.
    */
    export var version: string;

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
        Dynamic loads of the js-files via HttpRequest.
        After this call module has been loaded and ready for using. (Unfortunately you won't be able to debug this module).
        Prevents double loading of the module.
        --
        Using:
        >   1.  jsLion.require("dot.net.string.js") - load script from the dot.net-{version}.js folder.
        >   2.  jsLion.require("/scripts/myScript1.js", ..., "/scripts/myScriptN.js") - load scripts from the site root folder.
        >   3.  jsLion.require("http://mysite/app/scripts/myScript1.js") - load scripts from the absolute address.

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
                        console.log("JsLion.require(): Fail on evaluation script '" + script + "'. Error: " + e.message);
                        res = false;
                    }
                } else {
                    var status = xhr.status == 404 ? "Resource not found." : "Error status: " + xhr.status;
                    console.log("JsLion.require(): Fail on loading script '" + script + "'. " + status);
                    res = false;
                }
            }
        } else {
            console.log("JsLion.require(): Fail on creating XMLHttpRequest");
            res = false;
        }
        return res;
    }

    /**
        Loads of the js-files via inserting <script> tag into DOM.
        Callback function will be called when module is ready to using. (But you will be able to debug this module).
        Prevents double loading of the module.
        --
        Using:
        >   1.  jsLion.load("dot.net.string.js") - load script from the dot.net-{version}.js folder.
        >   2.  jsLion.load("/scripts/dot.net.string.js", function() { ... }) - load script from the site root folder.
    */
    export function load(script: string, callback?: Function) {
        script = updateScriptPath(script);
        if (loadingJs.indexOf(script) != -1 || loadedJs.indexOf(script) != -1) return;
        loadingJs.push(script);

        var scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.src = script;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        scriptElement.onreadystatechange = () => {
            loadedJs.push(script);
            scriptElement.onreadystatechange = null;
            scriptElement.onload = null;
            if (callback != null)
                callback();
        };
        scriptElement.onload = scriptElement.onreadystatechange;

        // Adding the script tag after the current <script> section
        var scripts = document.getElementsByTagName("script"),
            currentScriptElement = scripts[scripts.length - 1];

        // Fire the loading
        currentScriptElement.parentNode.appendChild(scriptElement);


    }

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

        path[path.length - 1] = "";
        return path.join('/');
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

    rootFolder = path.join('/');

    // Set window.location.origin
    if (!window.location.origin)
        window.location.origin = window.location.protocol + "//" + window.location.host;

    /* Loading LionSoft.Js framework modules */
    require("js.net-{version}/js.net.string.js");
    require("js.net-{version}/string.format-1.0.js");
    require("js.net-{version}/js.net.array.js");
    require("js.net-{version}/js.net.path.js");
}
