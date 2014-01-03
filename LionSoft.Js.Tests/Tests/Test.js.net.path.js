/// <reference path="~/Scripts/qunit.js" />
/// <reference path="../LionSoft.Js/LionSoft.Js-0.1.1.js"/>
/// <reference path="~/LionSoft.Js/js.net-0.1.1/js.net.string.js"/>
/// <reference path="~/LionSoft.Js/js.net-0.1.1/js.net.path.js"/>

module("js.net.path Tests");

test('ExtractDirectory()', function() {
    equals("http://test.site/directory/file.html".ExtractDirectory(), "http://test.site/directory", '1. Simple extracting');
    equals("file.html".ExtractDirectory(), "", '2. No directrory');
    equals("/file.html".ExtractDirectory(), "", '3. Empty directrory');
    equals("http://test.site/directory/".ExtractDirectory(), "http://test.site/directory", '4. Empty file name');
    equals("c:\\temp\\file.html".ExtractDirectory('\\'), "c:\\temp", '5. Another separator');
});

test('ExtractFileName()', function () {
    equals("http://test.site/directory/file.html".ExtractFileName(), "file.html", '1. Simple extracting');
    equals("file.html".ExtractFileName(), "file.html", '2. No directrory');
    equals("/file.html".ExtractFileName(), "file.html", '3. Empty directrory');
    equals("http://test.site/directory/".ExtractFileName(), "", '4. Empty file name');
    equals("c:\\temp\\file.html".ExtractFileName('\\'), "file.html", '5. Another separator');
});

test('ExpandPath()', function () {
    var siteOrigin = window.location.protocol + "//" + window.location.host;
    var currentHref = window.location.href;
    if (currentHref.EndsWith(".html", true)) {
        currentHref = currentHref.ExtractDirectory();
    }
    equals("/test".ExpandPath(), siteOrigin.TrimEnd('/') + "/test", '"/test".ExpandPath() - Success expand path from the site origin');
    equals("test".ExpandPath(), currentHref.TrimEnd('/') + "/test", '"test".ExpandPath() - Success expand path from the current location (doesn\'t work in Resharper tests)');
    equals("test".ExpandPath("http://base.path/"), "http://base.path/test", '"test".ExpandPath("http://base.path/") - Success expand path from the base path with separator on the end');
    equals("test".ExpandPath("http://base.path"), "http://base.path/test", '"test".ExpandPath("http://base.path") - Success expand path from the base path w/o separator on the end');
    equals("/test".ExpandPath("http://base.path/"), "http://base.path/test", '"/test".ExpandPath("http://base.path/") - Success expand path from the base path with separator on the end');
    equals("/test".ExpandPath("http://base.path"), "http://base.path/test", '"/test".ExpandPath("http://base.path") - Success expand path from the base path w/o separator on the end');
});
