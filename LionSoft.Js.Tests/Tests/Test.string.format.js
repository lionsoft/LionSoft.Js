/// <reference path="~/Scripts/qunit.js" />
/// <reference path="../LionSoft.Js/LionSoft.Js-0.1.1.js"/>
/// <reference path="~/LionSoft.Js/js.net-0.1.1/js.net.string.js"/>
/// <reference path="~/LionSoft.Js/js.net-0.1.1/string.format-1.0.js"/>

module("js.net.string.format Tests");

test('format()', function () {
    equals("test {0} {1} {2}".format(1, 2, 3), "test 1 2 3", '"test {0} {1} {2}".format(1, 2, 3) - simple format');
});
