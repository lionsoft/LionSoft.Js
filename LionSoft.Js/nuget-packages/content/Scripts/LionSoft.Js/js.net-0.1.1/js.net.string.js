(function() {
    'use strict';

    //////////////////////////// private section /////////////////////////////////
    RegExp.escape = function(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    function trim(s, charlist) {
        return trimRight(trimLeft(s, charlist), charlist);
    }

    function trimLeft(s, charlist) {
        if (charlist === undefined)
            charlist = ' ';
        // converts array object to string
        if (charlist instanceof Array)
            charlist = charlist.join('');
        return s.replace(new RegExp("^[" + RegExp.escape(charlist) + "]+"), "");
    }

    function trimRight(s, charlist) {
        if (charlist === undefined)
            charlist = ' ';
        // converts array object to string
        if (charlist instanceof Array)
            charlist = charlist.join('');
        return s.replace(new RegExp("[" + RegExp.escape(charlist) + "]+$"), "");
    }
    ///////////////////////////////////////////////////////////////////////////////////

    if (typeof String.prototype.IsEqual != 'function') {
        String.prototype.IsEqual = function (str, caseInsensitive) {
            if (caseInsensitive) {
                return this.toLocaleLowerCase() == str.toLocaleLowerCase();
            } else {
                return this == str;
            }
        };
    }

    if (typeof String.prototype.StartsWith != 'function') {
        String.prototype.StartsWith = function (str, caseInsensitive) {
            if (str === "") return true;
            return this.slice(0, str.length).IsEqual(str, caseInsensitive);
        };
    }

    if (typeof String.prototype.EndsWith != 'function') {
        String.prototype.EndsWith = function (str, caseInsensitive) {
            if (str === "") return true;
            return (this.slice(0, -str.length) + str).IsEqual(this, caseInsensitive);
        };
    }

    if (typeof String.prototype.Trim != 'function') {
        String.prototype.Trim = function (chars) {
            return trim(this, chars);
        };
    }

    if (typeof String.prototype.TrimStart != 'function') {
        String.prototype.TrimStart = function (chars) {
            return trimLeft(this, chars);
        };
    }
    if (typeof String.prototype.TrimLeft != 'function') {
        String.prototype.TrimLeft = function (chars) {
            return trimLeft(this, chars);
        };
    }

    if (typeof String.prototype.TrimEnd != 'function') {
        String.prototype.TrimEnd = function (chars) {
            return trimRight(this, chars);
        };
    }
    if (typeof String.prototype.TrimRight != 'function') {
        String.prototype.TrimRight = function (chars) {
            return trimRight(this, chars);
        };
    }

    if (typeof String.prototype.Contains != 'function') {
        String.prototype.Contains = function (subString, caseInsensitive) {
            if (caseInsensitive)
                return this.toLowerCase().indexOf(subString.toLowerCase()) >= 0;
            else
                return this.indexOf(subString) >= 0;
        };
    }

    if (typeof String.prototype.RegexIndexOf != 'function') {
        String.prototype.RegexIndexOf = function (regex, startPos) {
            var indexOf = this.substring(startPos || 0).search(regex);
            return (indexOf >= 0) ? (indexOf + (startPos || 0)) : indexOf;
        };
    }

    if (typeof String.prototype.RegexLastIndexOf != 'function') {
        String.prototype.RegexLastIndexOf = function(regex, startPos)
        {
            regex = (regex.global) ? regex : new RegExp(regex.source || regex, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
            if (typeof (startPos) == "undefined") {
                startPos = this.length;
            } else if (startPos < 0) {
                startPos = 0;
            }
            var stringToWorkWith = this.substring(0, startPos + 1);
            var lastIndexOf = -1;
            var nextStop = 0;
            var result;
            while ((result = regex.exec(stringToWorkWith)) != null) {
                lastIndexOf = result.index;
                regex.lastIndex = ++nextStop;
            }
            return lastIndexOf;
        };
    }

    if (typeof String.prototype.ToJson != 'function') {
        String.prototype.ToJson = function (defValue) {
            try {
                //return JSON.parse(this);
                var jsonString = trim(this);
                if (jsonString == "") return defValue;
                if (jsonString[0] != "{" && jsonString[jsonString.length - 1] != "}"
                    && jsonString[0] != "[" && jsonString[jsonString.length - 1] != "]") {
                    jsonString = "{" + jsonString + "}";
                }
                return eval("(" + jsonString + ")");

            } catch (e) {
                return defValue;
            }
        };
    }

}());