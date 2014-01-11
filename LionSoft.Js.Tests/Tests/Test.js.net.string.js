/// <reference path="~/Scripts/qunit.js" /> - 
/// <reference path="../LionSoft.Js/LionSoft.Js-0.1.1.js"/>
/// <reference path="~/LionSoft.Js/js.net-0.1.1/js.net.string.js"/>

module("js.net.string Tests");

test('TrimLeft()/TrimStart()', function () {
    equals("test ".TrimLeft(), "test ", "1. TrimLeft(): no Trim");
    equals("   test ".TrimLeft(), "test ", "2. TrimLeft(): Trim spaces");
    equals("/test/".TrimLeft('/'), "test/", "3. TrimLeft(): Trim extra chars");
    equals(" /test/ ".TrimLeft('/'), " /test/ ", "4. TrimLeft(): no Trim extra chars");
    equals("\\ /,/test/ ".TrimLeft(['/', ' ', '\\']), ",/test/ ", "5. TrimLeft(): Trim extra chars passed as array");
    equals("  ".TrimLeft(), "", "6. TrimLeft(): Trim spaces");
    equals("".TrimLeft(), "", "7. TrimLeft(): Trim empty string");

    equals("test ".TrimStart(), "test ", "8. TrimStart(): no Trim");
    equals("   test ".TrimStart(), "test ", "9. TrimStart(): Trim spaces");
    equals("/test/".TrimStart('/'), "test/", "10. TrimStart(): Trim extra chars");
    equals(" /test/ ".TrimStart('/'), " /test/ ", "11. TrimStart(): no Trim extra chars");
    equals("\\ /,/test/ ".TrimStart(['/', ' ', '\\']), ",/test/ ", "12. TrimStart(): Trim extra chars passed as array");
    equals("  ".TrimStart(), "", "13. TrimStart(): Trim spaces");
    equals("".TrimStart(), "", "14. TrimStart(): Trim empty string");
});

test('TrimRight()/TrimEnd()', function () {
    equals("  test".TrimRight(), "  test", "1. TrimRight(): no Trim");
    equals("  test   ".TrimRight(), "  test", "2. TrimRight(): Trim spaces");
    equals("/test/".TrimRight('/'), "/test", "3. TrimRight(): Trim extra chars");
    equals(" /test/ ".TrimRight('/'), " /test/ ", "4. TrimRight(): no Trim extra chars");
    equals(" /test/,\\ //".TrimRight(['/', ' ', '\\']), " /test/,", "5. TrimRight(): Trim extra chars passed as array");
    equals("  ".TrimRight(), "", "6. TrimRight(): Trim spaces");
    equals("".TrimRight(), "", "7. TrimRight(): Trim empty string");

    equals("  test".TrimEnd(), "  test", "8. TrimEnd(): no Trim");
    equals("  test   ".TrimEnd(), "  test", "9. TrimEnd(): Trim spaces");
    equals("/test/".TrimEnd('/'), "/test", "10. TrimEnd(): Trim extra chars");
    equals(" /test/ ".TrimEnd('/'), " /test/ ", "11. TrimEnd(): no Trim extra chars");
    equals(" /test/,\\ //".TrimEnd(['/', ' ', '\\']), " /test/,", "12. TrimEnd(): Trim extra chars passed as array");
    equals("  ".TrimEnd(), "", "13. TrimEnd(): Trim spaces");
    equals("".TrimEnd(), "", "14. TrimEnd(): Trim empty string");
});

test('Trim()', function () {
    equals("  test   ".Trim(), "test", "1. Trim(): Trim spaces");
    equals("/test/".Trim('/'), "test", "2. Trim(): Trim extra chars");
    equals(" /test/,\\ //".Trim(['/', ' ', '\\']), "test/,", "3. Trim(): Trim extra chars passed as array");
    equals("  ".Trim(), "", "4. Trim(): Trim spaces");
    equals("".Trim(), "", "5. Trim(): Trim empty string");
});

test('IsEqual()', function () {
    equals("Teзt".IsEqual("Teзt"), true, '1. Success case-sensitive checking (default param)');
    equals("Teзt".IsEqual("Teзt", false), true, '2. Success case-sensitive checking');
    equals("Teзt".IsEqual("teЗt", true), true, '3. Success case-insensitive checking');

    equals("Teзt".IsEqual("TeЗt"), false, '4. Failed case-sensitive checking (default param)');
    equals("Teзt".IsEqual("TEзt", false), false, '5. Failed case-sensitive checking');
    equals("Teзt".IsEqual("tIзt", true), false, '6. Failed case-insensitive checking');

    equals("Teзt".IsEqual("Teзt ", true), false, '7. Failed case-insensitive checking vary length strings');
    equals("Teз ".IsEqual("Teз", true), false, '8. Failed case-insensitive checking vary length strings');
    equals("".IsEqual(""), true, '9. Success empty strings');
});

test('StartsWith()', function () {
    equals("TeзtString".StartsWith("Teзt"), true, '1. Success case-sensitive checking (default param)');
    equals("TeзtString".StartsWith("Teзt", false), true, '2. Success case-sensitive checking');
    equals("TeзtString".StartsWith("teЗt", true), true, '3. Success case-insensitive checking');

    equals("TeзtString".StartsWith("TeЗt"), false, '4. Failed case-sensitive checking (default param)');
    equals("TeзtString".StartsWith("TEзt", false), false, '5. Failed case-sensitive checking');
    equals("TeзtString".StartsWith("tIзt", true), false, '6. Failed case-insensitive checking');

    equals("".StartsWith(""), true, '7. Success empty strings');
    equals("test".StartsWith(""), true, '8. Success with empty string');
    equals("".StartsWith("tIзt"), false, '9. Failed of empty string');
});

test('EndsWith()', function () {
    equals("StringTeзt".EndsWith("Teзt"), true, '1. Success case-sensitive checking (default param)');
    equals("StringTeзt".EndsWith("Teзt", false), true, '2. Success case-sensitive checking');
    equals("StringTeзt".EndsWith("teЗt", true), true, '3. Success case-insensitive checking');

    equals("StringTeзt".EndsWith("TeЗt"), false, '4. Failed case-sensitive checking (default param)');
    equals("StringTeзt".EndsWith("TEзt", false), false, '5. Failed case-sensitive checking');
    equals("StringTeзt".EndsWith("tIзt", true), false, '6. Failed case-insensitive checking');

    equals("".EndsWith(""), true, '7. Success empty strings');
    equals("test".EndsWith(""), true, '8. Success with empty string');
    equals("".EndsWith("tIзt"), false, '9. Failed of empty string');
});

test('Contains()', function () {
    equals("StringTeзt".Contains("Teз"), true, '1. Success case-sensitive checking (default param)');
    equals("StringTeзt".Contains("Teз", false), true, '2. Success case-sensitive checking');
    equals("StringTeзt".Contains("teЗ", true), true, '3. Success case-insensitive checking');

    equals("StringTeзt".Contains("TeЗ"), false, '4. Failed case-sensitive checking (default param)');
    equals("StringTeзt".Contains("TEз", false), false, '5. Failed case-sensitive checking');
    equals("StringTeзt".Contains("tIз", true), false, '6. Failed case-insensitive checking');

    equals("".EndsWith(""), true, '7. Success empty strings');
    equals("test".EndsWith(""), true, '8. Success with empty string');
    equals("".EndsWith("tIзt"), false, '9. Failed of empty string');
});

test('RegexIndexOf()', function () {
    equals("StringTeзtTeз".RegexIndexOf("Teз"), 6, '1. Success - Case sensitive substring');
    equals("StringTeзtTeз".RegexIndexOf(/teЗ/i), 6, '2. Success - Case insensitive substring');
    equals("StringTeзtTeз".RegexIndexOf(/teЗ/i, 7), 10, '3. Success - Case insensitive substring + start index');

    equals("StringTeзtTeз".RegexIndexOf(/teЗ/i, 12), -1, '4. Fail - Case insensitive substring + start index');
    equals("StringTeзtTeз".RegexIndexOf(/teЗ/), -1, '5. Fail - Case sensitive substring');

    equals("".RegexIndexOf(""), 0, '6. Success empty strings');
    equals("test".RegexIndexOf(""), 0, '7. Success with empty string');
    equals("".RegexIndexOf("tIзt"), -1, '8. Failed of empty string');
});

test('RegexLastIndexOf()', function () {
    equals("StringTeзtTeз".RegexLastIndexOf("Teз"), 10, '1. Success - Case sensitive substring');
    equals("StringTeзtTeз".RegexLastIndexOf(/teЗ/i), 10, '2. Success - Case insensitive substring');
    equals("StringTeзtTeз".RegexLastIndexOf(/teЗ/i, 9), 6, '3. Success - Case insensitive substring + start index');

    equals("StringTeзtTeз".RegexLastIndexOf(/teЗ/i, 5), -1, '4. Fail - Case insensitive substring + start index');
    equals("StringTeзtTeз".RegexLastIndexOf(/teЗ/), -1, '5. Fail - Case sensitive substring');

    equals("".RegexLastIndexOf(""), 0, '6. Success empty strings');
    equals("test".RegexLastIndexOf(""), 4, '7. Success with empty string');
    equals("".RegexLastIndexOf("tIзt"), -1, '8. Failed of empty string');
});

test('ToJson()', function () {
    deepEqual('  {  "test1": 11,  "test2": "english", "test3": true } '.ToJson(), { test1: 11, test2: 'english', test3: true }, '0. ');
    deepEqual("  {  test1: 11,  test2: \"русские буквы\", test3: true } ".ToJson(), { test1: 11, test2: 'русские буквы', test3: true }, '1. ');
    deepEqual(("  {  \r\n" +
        "test1: 11,  \r\n" +
        "test2: \"русские буквы\", \r\n" +
        "test3: true \r\n" +
        "} ").ToJson(), { test1: 11, test2: 'русские буквы', test3: true }, '2. ');
    deepEqual("    test1: 11,  test2: \"русские буквы\", test3: true  ".ToJson(), { test1: 11, test2: 'русские буквы', test3: true }, '3. ');
    deepEqual(("    \r\n" +
        "test1: 11,  \r\n" +
        "test2: \"русские буквы\", \r\n" +
        "test3: true \r\n" +
        " ").ToJson(), { test1: 11, test2: 'русские буквы', test3: true }, '4. ');
    deepEqual("    test1: 11,  test2: \"русские буквы\", test3: true } ".ToJson(), undefined, '5. ');
    deepEqual("    test1: 11,  test2: \"русские буквы\", test3: true } ".ToJson({ fail: 1 }), { fail: 1 }, '6. ');
    deepEqual("".ToJson(), undefined, '7. ');
    deepEqual("".ToJson({ fail: 1 }), { fail: 1 }, '8. ');
    deepEqual("[1, 2]".ToJson(), [1, 2], '9. ');
    deepEqual("[111, {x:222, 'y':'ddd'}]".ToJson(), [111, { x: 222, y: 'ddd' }], '9. ');
});
