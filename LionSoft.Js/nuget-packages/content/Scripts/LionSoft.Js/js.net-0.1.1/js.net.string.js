(function() {
    'use strict';
    

    if (typeof String.prototype.isEqual != 'function') {
        String.prototype.isEqual = function(str, caseInsensitive) {
            if (caseInsensitive) {
                return this.toLocaleLowerCase() == str.toLocaleLowerCase();
            } else {
                return this == str;
            }
        };
    }

    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function(str, caseInsensitive) {
            return this.slice(0, str.length).isEqual(str, caseInsensitive);
        };
    }

    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function(str, caseInsensitive) {
            return this.slice(0, -str.length).isEqual(str, caseInsensitive);
        };
    }
}());

