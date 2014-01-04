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





}());