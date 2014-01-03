(function() {
    'use strict';

    if (typeof String.prototype.ExtractDirectory != 'function') {
        String.prototype.ExtractDirectory = function (separator) {
            separator = separator || '/';
            var path = this.split(separator);
            path.length--;
            path = path.join(separator);
            return path;
        };
    }

    if (typeof String.prototype.ExtractFileName != 'function') {
        String.prototype.ExtractFileName = function (separator) {
            separator = separator || '/';
            var path = this.split(separator);
            path = path[path.length - 1];
            return path;
        };
    }

    if (typeof String.prototype.ExpandPath != 'function') {
        String.prototype.ExpandPath = function (basePath, separator) {
            separator = separator || '/';
            var path = this;
            if (!basePath) {
                if (path.StartsWith(separator)) {
                    basePath = window.location.origin;
                } else {
                    basePath = window.location.href;
                    if (!basePath.EndsWith('/'))
                        basePath = basePath.ExtractDirectory();
                }
            }
            if (!basePath.EndsWith(separator))
                basePath = basePath + separator;
            if (path.StartsWith(separator))
                path = path.substr(1, path.length - 1);
            return basePath + path;
        };
    }
}());

