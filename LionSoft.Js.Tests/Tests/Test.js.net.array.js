/// <reference path="~/Scripts/qunit.js" />
/// <reference path="../LionSoft.Js/LionSoft.Js-0.1.1.js"/>
/// <reference path="~/LionSoft.Js/js.net-0.1.1/js.net.string.js"/>
/// <reference path="~/LionSoft.Js/js.net-0.1.1/js.net.array.js"/>

module("js.net.array Tests");

test('clone()', function () {
    var arr1 = [1, 2, 3];
    var arr2 = arr1.clone();
    deepEqual(arr1, arr2, '1. Cloned array is the same as source array');
    notEqual(arr1, arr2, '2. Cloned array is not equal to source array');
    arr2[1] = 1;
    notDeepEqual(arr1, arr2, '3. Cloned array after change is not ethe same as source array');
});
