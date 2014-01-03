(function() {
    'use strict';

    if (typeof Array.prototype.clone != 'function') {
        Array.prototype.clone = function() {
            return this.slice(0);
        };
    }

}());

