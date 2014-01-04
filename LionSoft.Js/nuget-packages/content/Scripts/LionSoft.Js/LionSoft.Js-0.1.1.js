var LionSoftJs;
(function (LionSoftJs) {
    'use strict';

    /**
    Current root folder of the LionSoft.Js-{version}.js
    */
    LionSoftJs.rootFolder;

    /**
    Current version of the framework library.
    */
    LionSoftJs.version;

    /**
    Cross-browser gets of the XMLHttpRequest object
    */
    function getXmlHttp() {
        var xmlhttp;
        try  {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try  {
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
    LionSoftJs.getXmlHttp = getXmlHttp;

    /**
    Gets the base path of the current executing script.
    */
    function getBasePath() {
        var scripts = document.getElementsByTagName("script"), src = scripts[scripts.length - 1].src, path = src.split('/');

        var rootFile = path[path.length - 1];
        var arr = rootFile.split('-');
        if (arr.length < 2) {
            LionSoftJs.version = "";
        } else {
            LionSoftJs.version = arr[arr.length - 1];
            LionSoftJs.version = LionSoftJs.version.substring(0, LionSoftJs.version.length - 3); // remove .js extension
        }

        path[path.length - 1] = "";
        return path.join('/');
    }
    LionSoftJs.getBasePath = getBasePath;

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
    function require() {
        var scripts = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            scripts[_i] = arguments[_i + 0];
        }
        var res = true;
        var xhr = getXmlHttp();
        if (xhr) {
            for (var i = 0; i < scripts.length; i++) {
                var script = updateScriptPath(scripts[i]);

                if (loadedJs.indexOf(script) != -1)
                    continue;
                loadedJs.push(script);

                xhr.open("GET", script + "?_" + (new Date()).getTime(), false);
                xhr.send();
                if (xhr.status == 200) {
                    try  {
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
    LionSoftJs.require = require;

    /**
    Loads of the js-file via inserting <script> tag into DOM.
    Callback function will be called when module is ready to using. (But you will be able to debug this module).
    Prevents double loading of the module.
    --
    Using:
    >   1.  LionSoftJs.load("dot.net.string.js") - load script file from the script folder.
    >   2.  LionSoftJs.load("/scripts/dot.net.string.js", function() { ... }) - load script file from the site root folder.
    */
    function load(script, callback) {
        script = updateScriptPath(script);
        if (loadingJs.indexOf(script) != -1 || loadedJs.indexOf(script) != -1)
            return;
        loadingJs.push(script);

        var scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.src = script;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        scriptElement.onreadystatechange = function () {
            loadedJs.push(script);
            scriptElement.onreadystatechange = null;
            scriptElement.onload = null;
            if (callback != null)
                callback();
        };
        scriptElement.onload = scriptElement.onreadystatechange;

        // Adding the script tag after the current <script> section
        var scripts = document.getElementsByTagName("script"), currentScriptElement = scripts[scripts.length - 1];

        // Fire the loading
        currentScriptElement.parentNode.appendChild(scriptElement);
    }
    LionSoftJs.load = load;

    function updateScriptPath(script) {
        if (script.slice(0, 1) != "/" && script.slice(0, 7).toLowerCase() != "http://" && script.slice(0, 8).toLowerCase() != "https://" && script.slice(0, 6).toLowerCase() != "ftp://") {
            script = getBasePath() + script;
        }
        if (script.slice(0, 1) == "/") {
            script = window.location.origin + script;
        }

        if (LionSoftJs.version == "") {
            script = script.replace('-{version}-', "").replace('-{version}', "").replace('{version}-', "").replace('{version}', "");
        } else {
            script = script.replace('{version}', LionSoftJs.version);
        }
        return script;
    }

    // List of the loaded scripts
    var loadedJs = [];
    var loadingJs = [];

    // Getting current version
    var scripts = document.getElementsByTagName("script"), src = scripts[scripts.length - 1].src, path = src.split('/');

    var rootFile = path[path.length - 1];
    var arr = rootFile.split('-');
    if (arr.length < 2) {
        LionSoftJs.version = "";
    } else {
        LionSoftJs.version = arr[arr.length - 1];
        LionSoftJs.version = LionSoftJs.version.substring(0, LionSoftJs.version.length - 3); // remove .js extension
    }

    path[path.length - 1] = "";

    LionSoftJs.rootFolder = path.join('/');

    // Set window.location.origin
    if (!window.location.origin)
        window.location.origin = window.location.protocol + "//" + window.location.host;

    /* Loading LionSoft.Js framework modules */
    require("js.net-{version}/js.net.string.js");
    require("js.net-{version}/string.format-1.0.js");
    require("js.net-{version}/js.net.array.js");
    require("js.net-{version}/js.net.path.js");
})(LionSoftJs || (LionSoftJs = {}));
//# sourceMappingURL=LionSoft.Js-0.1.1.js.map
