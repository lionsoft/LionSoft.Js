/**
Returns true if the object is not undefined and is not null.
*/
function isAssigned(obj) {
    return obj !== undefined && obj !== null;
}

var LionSoftJs;
(function (LionSoftJs) {
    'use strict';

    /**
    Gets the folder of the LionSoft.Js-{version}.js script with trailing separator, eg. http[s]://server.name[:port][/appFolder]/Scripts/LionSoft.Js/
    */
    LionSoftJs.scriptFolder;

    /**
    Gets the application folder with trailing separator, eg. http[s]://server.name[:port][/appFolder]/
    
    Note: Script file must be placed to the default folder ~/Scripts/LionSoft.Js.
    Searching is processed in three steps:
    1. If LionSoftJs.scriptFolder is %appFolder%/Scripts/LionSoft.Js
    2. or if LionSoftJs.scriptFolder is %appFolder%/Scripts/<other>
    3. or if LionSoftJs.scriptFolder is %appFolder%/LionSoft.Js
    otherwise appFolder will be equal window.location.origin
    */
    LionSoftJs.appFolder;

    /**
    Current version of the framework library.
    */
    LionSoftJs.version;

    /**
    Gets cookie value.
    */
    function getCookie(name, defValue) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : defValue;
    }
    LionSoftJs.getCookie = getCookie;

    /**
    Sets cookie value and its options.
    --
    Using:
    >   LionSoftJs.setCookie("myCookie", value, {expires: 10, path: "/", }) - set site cookie for 10 seconds
    */
    function setCookie(name, value, options) {
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
    LionSoftJs.setCookie = setCookie;

    /**
    Removes the cookie.
    */
    function deleteCookie(name) {
        setCookie(name, "", { expires: -1 });
    }
    LionSoftJs.deleteCookie = deleteCookie;

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

        path[path.length - 1] = undefined;

        // path.length--;
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

        var onLoad = function (readyState) {
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
        scriptElement.onreadystatechange = function () {
            return onLoad(scriptElement.readyState);
        };
        scriptElement.onload = function () {
            return onLoad("complete");
        };

        // Adding the script tag after the current <script> section
        var scripts = document.getElementsByTagName("script"), currentScriptElement = scripts[scripts.length - 1];

        // Fire the loading
        currentScriptElement.parentNode.appendChild(scriptElement);
        return res;
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

    var DefferedObject = (function () {
        function DefferedObject() {
        }
        DefferedObject.prototype.invoke = function () {
            var _this = this;
            if (this._action != undefined) {
                var res = this._action();
                if (res == undefined || res["then"] == undefined)
                    this._defObj.invoke();
                else {
                    res["then"](function () {
                        return _this._defObj.invoke();
                    });
                }
            }
            this._invoked = true;
        };

        DefferedObject.prototype.then = function (action) {
            this._action = action;
            this._defObj = new DefferedObject();
            var res = this._defObj;
            if (this._invoked)
                this.invoke();
            return res;
        };
        return DefferedObject;
    })();

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

    //    path.length--;
    LionSoftJs.scriptFolder = path.join('/');

    // Set window.location.origin
    if (!window.location.origin)
        window.location.origin = window.location.protocol + "//" + window.location.host;

    /* Loading LionSoft.Js framework modules */
    require(LionSoftJs.scriptFolder + "js.net-{version}/js.net.string.js");
    require(LionSoftJs.scriptFolder + "js.net-{version}/string.format-1.0.js");
    require(LionSoftJs.scriptFolder + "js.net-{version}/js.net.AsConvert.js");
    require(LionSoftJs.scriptFolder + "js.net-{version}/js.net.array.js");

    // Set window.location.appFolder
    var idx = LionSoftJs.scriptFolder.EndsWith("/Scripts/LionSoft.Js/", true) ? LionSoftJs.scriptFolder.toLowerCase().lastIndexOf("/scripts/lionsoft.js/") : -1;
    if (idx == -1)
        idx = LionSoftJs.scriptFolder.toLowerCase().indexOf("/scripts/");
    if (idx == -1)
        idx = LionSoftJs.scriptFolder.EndsWith("/LionSoft.Js/") ? LionSoftJs.scriptFolder.toLowerCase().lastIndexOf("/lionsoft.js/") : -1;
    if (idx == -1) {
        window.location.appFolder = window.location.origin + "/";
    } else {
        window.location.appFolder = LionSoftJs.scriptFolder.slice(0, idx) + "/";
    }

    LionSoftJs.appFolder = window.location.appFolder;

    require(LionSoftJs.scriptFolder + "js.net-{version}/js.net.path.js");
})(LionSoftJs || (LionSoftJs = {}));
//# sourceMappingURL=LionSoft.Js-0.1.1.js.map
