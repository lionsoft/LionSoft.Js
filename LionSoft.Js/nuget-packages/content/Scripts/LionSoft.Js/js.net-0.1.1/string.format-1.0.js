/*******************************************************
 * String.Format 1.0 - JScript ������ C# String.Format
 *
 * Copyright (c) 2010, Dema (Dema.ru)
 * http://dema.ru/string.format/
 * http://habrahabr.ru/post/83185/
 * �������� LGPL ��� ������ �������������
 *
 *******************************************************/

// ������������� ��������������
(function (st) {
    // ���������� ��� ����� ��������������, ���������� ����� �������� �����
    // ������������ ���: var str = "������ ������� {0}, ������������� �������������� {1:������}".format(some1, some2);
    st.format = function () {
        if (arguments.length == 0) return this;
        // RegExp ��� ������ �����
        var placeholder = /\{(\d+)(?:,([-+]?\d+))?(?:\:([^(^}]+)(?:\(((?:\\\)|[^)])+)\)){0,1}){0,1}\}/g;
        var args = arguments;
        // ����� �������� ����, ����������� � ��������� ������ �����
        return this.replace(placeholder, function (m, num, len, f, params) {
            m = args[Number(num)];  // ����� �������� �� ������
            f = formatters[f];      // �������� ���������� ������� ��������������
            return fl(f == null ? m : f(m, pp((params || '').replace(/\\\)/g, ')').replace(/\\,/g, '\0').split(','), args)), len);
        });
    };
    // ���������� �������������� "��� � C#": var str = String.Format(format, arg0[, arg1[, arg2 ...]]);
    String.Format = function (format) {
        return arguments.length <= 1 ? format : st.format.apply(format, Array.prototype.slice.call(arguments, 1));
    };
    // �������� ������
    // name    - ���, ������� ����� �������������� � ��������������
    // func    - ������� ��������������, ��������� 2 ���������: �������� � ��������� ��� ��������������
    // replace - ��� ������ ��� ������������������� �������������� ����� �������� true
    st.format.add = function (name, func, replace) {
        if (formatters[name] != null && replace != true) throw 'Format ' + name + ' exist, use replace=true for replace';
        formatters[name] = func;
    };
    // ������������� ���������� ��������������
    // param - ������ � ����������� � ���� { ������: ��������� }, ��� "���������" ������� �� ������� � ����� ���� ���
    // ������� ���������, ��� � �������� ���� { ��������: ��������, ... }. ��. �������� �������� ��� ����������� �������.
    String.Format.init =
    st.format.init = function (param) {
        var f;
        for (var n in param) {
            f = formatters[n];
            if (f != null && f.init != null) f.init(param[n]);
        }
    };
    // �������� ������� �������������� �� �����
    st.format.get = function (name) {
        return formatters[name];
    };
    ///////// PRIVATE /////////
    // RegExp ��� ������ ������ �� ��������� � ��������������
    var paramph = /^\{(\d+)\}$/;
    // ����� ��������������
    var formatters = {};
    // ������ ��� ���������� ������ ����������� ��������
    var sp = '    ';
    // ����� ����� � ���������� �������������� � ������ �� �� ��������
    function pp(params, args) {
        var r;
        for (var i = 0; i < params.length; i++) {
            if ((r = paramph.exec(params[i])) != null)
                params[i] = args[Number(r[1])];             // �������� - �����
            else
                params[i] = params[i].replace(/\0/g, ',');  // �������� - �� �����
        }
        return params;
    }
    // ���������� ��������� �� ������� �������
    function fl(s, len) {
        len = Number(len);
        if (isNaN(len)) return s;
        s = '' + s;
        var nl = Math.abs(len) - s.length;
        if (nl <= 0) return s;
        while (sp.length < nl) sp += sp;
        return len < 0 ? (s + sp.substring(0, nl)) : (sp.substring(0, nl) + s);
    }
    ///////// ����� PUBLIC /////////
    // ������������ �������������� ��������.
    //   ������ �������� - ����������� (��������������)
    //   ������ �������� - ��� ������� ��� ���������� � ������� �������� (��������������)
    //   ������ � �����  - �������������� ��������� ������� ������� ��������
    st.format.add('arr', function arr(va, params) {
        if (va == null) return 'null';
        var v = [];                                 // ���������
        var j = params.shift() || '';                   // �����������
        var f = formatters[params.shift()];         // ������ ��������
        if (f == null)
            v = va;                                 // ��� ������� �������� - ���������� �������� ������
        else
            for (var i = 0; i < va.length; i++) v.push(f(va[i], params));   // ��������� ������ � ������� ��������
        return v.join(j);                                               // ������� ���������
    });
})(String.prototype);

// ����� ���������� ��� �������������� �����:
//   :n                 - ����� ����� ��� ����, ���� ������ ������ ���� 1.032434e+34, �� ��� ����� ��� ������������� e+xx
//   :n(x,y)            - ����� � ����������� ����� ����� �� x ��������, ������� ����� �� y ��������, ������� ����� ���������� �� ���������� �������
//   :nb(b)             - ����� ����� � ��������� ���������� (��� ������ �������� ������ � �.�.)
//   :nf(loc,n1,n2,...) - ����� ��. ��������� ��� ����� � ������ �����
// ��������� ��������������:
//   dseparator         - ����������� ����� � ������� �����
//   nan                - �����, ��������� ��� ������� ��������������� �� �����, ������������ ��� ���� �������� ����� - n, nb, nf
// ������������� ��������������:
//   String.prototype.format.init({ n: { dseparator: '.', nan: 'NaN' } });
(function (format) {
    // ������������ ��������������
    // ������� �������������� ����� � ������ ����������� ������ �� � ����� �������
    format.add('n', function n(v, params) {
        if ((v = numformat.exec(v)) == null) return defaults.nan;   // �������� ������ ������ �����
        var e = Number(v[4]);                   // ������� (���� ������)
        return isNaN(e) ?
                    ''.concat(v[1], addz(null, v[2], params[0]), addz(defaults.dseparator, v[3], params[1])) :  // ��� ������� - �����������, ��� ����
                    shift(v[1], v[2], v[3], e, params[0], params[1]);                           // �������������� � ������ �������
    });
    // ������� �������������� ����� � ����� ������� (�� 2-�� �� ....)
    format.add('nb', function nb(v, params) {
        v = Number(v);
        if (isNaN(v)) return defaults.nan;
        var b = Number(params[0]);
        return addz(null, v.toString(isNaN(b) ? 16 : b), Number(params[1]));
    });
    // ������� ������ ��. ��������� ��� ����� � ������ �����
    format.add('nf', function (v, params) {
        v = Number(v);
        if (isNaN(v)) return defaults.nan;
        var f = nforms[params[0].toLowerCase()];
        return f == null ? params[0] + '?' : f(v, params);
    });
    // ����������� ������� ���������� ����� ��� ������ ������
    format.get('nf').add = function (lname, func) {
        nforms[lname.toLowerCase()] = func;
    };
    // ������ ��������� ��������� ���������� ��������������
    format.get('n').init = init;
    ///////// PRIVATE /////////
    // RegExp ��� �����
    var numformat = /^([+-]?)(\d+)(?:\.(\d+))?(?:\s*e([+-]\d+))?$/i;
    // ������ ��� ���������� ������ ����������� �����
    var zz = '0000000000';
    // ��������� ��������������:
    // dseparator - ����������� ����� � ������� �����
    // nan        - �����, ��������� ��� ������� ��������������� �� �����
    var defaults = { dseparator: '.', nan: 'NaN' };
    // ������ ������� ���������� ������ ���� (�����, �����, ������ � �.�.)
    var nforms = {
        en: function (v, params) {
            return params[v == 1 ? 1 : 2];
        },
        ru: function (v, params) {
            var v10 = v % 10;
            var v100 = v % 100;
            return params[v10 == 1 && v100 != 11 ? 1 : v10 >= 2 && v10 <= 4 && (v100 < 10 || v100 >= 20) ? 2 : 3];
        }
    };
    // ������� ��������� ���������� ��������������
    function init(param) {
        defaults.dseparator = param.dseparator || '.';
        defaults.nan = param.nan || 'NaN';
    }
    // ����������� � ������ ����������� ��������
    function addz(pre, v, l) {
        if (isNaN(l = Number(l == '' ? undefined : l))) return (v == null || v == '') ? '' : ((pre || '') + v); // ��� ����������� - ������ ������ ��, ��� ����
        if ((v = v || '').length >= l) return pre == null ? v : (pre + v.substr(0, l));     // �������� ������ ������� - ����� ����� ���������, ������� �����
        return pre == null ? (getz(l - v.length) + v) : (pre + v + getz(l - v.length));             // �������� ������ ������� - ��������� ������ � ��������������� �������
    }
    // �������� ������ ���������� �����
    function getz(l) {
        while (zz.length < l) zz += zz;
        return zz.substring(0, l);
    }
    // �������������� �� ������� �� ������ ���-�� ��������
    function shift(s, i, f, e, li, lf) {
        var m;
        if (e > 0)          // ������� �� ������� � �����
        {
            m = addz('', f, e);
            i += m;
            f = f.substr(m.length);
        } else if (e < 0)   // ������� �� ����� � �������
        {
            m = i.length - (-e);
            f = (m > 0 ? i.substring(m, i.length) : (getz(-m) + i)) + f;
            i = (m > 0 ? i.substring(0, -e - 1) : '0');
        }
        // ��� ��� e==0 - � ������ ���� �� �����!
        return ''.concat(s, addz(null, i, li), addz(defaults.dseparator, f, lf));
    }
})(String.prototype.format);

// ����� ���������� ��� �������������� ��� � �������:
//   :df         - ������������ ������ �������������� � ������
//   :df(������) - ������������ ��������� ������, ��� ����� ���������:
//                 yyyy ��� yy - ���
//                 M ��� MM    - �����   (���� ��� 2 �����)
//                 d ��� dd    - ����    (���� ��� 2 �����)
//                 H ��� HH    - ����    (���� ��� 2 �����)
//                 m ��� mm    - ������  (���� ��� 2 �����)
//                 s ��� ss    - ������� (���� ��� 2 �����)
//                 f           - ������������ (���������� ���� f - ������ ���������� ������)
//   :d          - �������� ������ ��� :df(dd.MM.yyyy)
//   :dt         - �������� ������ ��� :df(dd.MM.yyyy HH:mm:ss)
//   :dt(nosec)  - �������� ������ ��� :df(dd.MM.yyyy HH:mm)
//   :t          - �������� ������ ��� :df(HH:mm:ss)
//   :t(nosec)   - �������� ������ ��� :df(HH:mm)
//   :ts         - ����� ����� � ���� ������ 100 ��. 5 ���. 24 ���. 48 ���. 79 ��, ������� �������� �� ���������, ���������:
//          (msec) - �� ����������� (��-���������)
//           (sec) - �� ������
//           (min) - �� �����
//             (h) - �� �����
// ������������� ��������������:
//   ��� �������������� ���� � ������� � ������ ����� ������� �������� ������:
//     String.prototype.format.init({ df: { nad: 'NaD', d: 'dd.MM.yyyy', dts: 'dd.MM.yyyy HH:mm:ss', dt: 'dd.MM.yyyy HH:mm', t: 'HH:mm', ts: 'HH:mm:ss' } });
//   ��� �������������� ������� �������� ����� ������� �����:
//     String.prototype.format.init({ ts: { d: '��.', h: '���.', m: '���.', s: '���.', ms: '��' } });
(function (format) {
    // �������������� ����+������� � ������.
    format.add('df', df);
    // ���������� �������� ������ ��� ��������� ��������
    format.add('d', function (v, p) { return df(v, intf.d); });
    format.add('dt', function (v, p) { return df(v, p[0] == 'nosec' ? intf.dt : intf.dts); });
    format.add('t', function (v, p) { return df(v, p[0] == 'nosec' ? intf.t : intf.ts); });
    // ������ ��������� ��������� ���������� ��������������
    format.get('df').init = dfinit;

    // �������������� ������� ��������:
    // �������� � �������� Date ��� ����� ������ - ����������� ����,
    // ������� ������ ���� 1��. 2���. 3���. 4���. 5��, ��������, ������ ���� ������������
    // :ts(min|sec|msec) - �� ��� ������������: min - �� ����� (���+����+������), sec - �� ������, msec - �� �� (��-���������)
    format.add('ts', function ts(v, params) {
        if (v == null) return 'null';
        if (v == 0) return '0';
        var s = [];                         // ���������
        var round = params[0];                  // �������� ������
        // ����� ������������... ����� ���������� � ���������...?
        v = tss(v, 1000, s, tsdefault.ms, w = (round == '' || round == 'msec'));
        v = tss(v, 60, s, tsdefault.s, w = (w || round == 'sec'));
        v = tss(v, 60, s, tsdefault.m, w = (w || round == 'min'));
        v = tss(v, 24, s, tsdefault.h, true);
        if (v != 0) s.unshift(v, tsdefault.d);                      // �� �������� ������� ���, ���� ��� ����
        return s.join(' ');                                     // ���������!
    });
    // ������ ��������� ��������� ���������� ��������������
    format.get('ts').init = tsinit;

    ///////// PRIVATE /////////
    // ��� ������� �������������� ����+�����
    var c = {};
    // ����� ������ ��� ���������� ������ ����������� �����
    var zz = '0000';
    // ����� ������������ �������
    var intf = { nad: 'NaD', d: ['dd.MM.yyyy'], dts: ['dd.MM.yyyy HH:mm:ss'], dt: ['dd.MM.yyyy HH:mm'], t: ['HH:mm'], ts: ['HH:mm:ss'] };
    // ������ ��� �������������� ������� ��������
    var tsdefault = { d: '��.', h: '���.', m: '���.', s: '���.', ms: '��' };
    // RegExp ������ ����� �������������� ����+�������
    var fpre = /yyyy|yy|m{1,2}|d{1,2}|H{1,2}|M{1,2}|s{1,2}|f{1,4}/g;
    // ��� ���������� ����� ��������������
    var fp = {
        y: 'v.getFullYear()',
        M: 'v.getMonth()+1',
        d: 'v.getDate()',
        H: 'v.getHours()',
        m: 'v.getMinutes()',
        s: 'v.getSeconds()',
        f: 'v.getMilliseconds()'
    };
    // ������� ������������� �������������� ����+�������
    function dfinit(param) {
        intf.nad = param.nad || 'NaD';
        intf.d[0] = param.d || 'dd.MM.yyyy';
        intf.dts[0] = param.dts || 'dd.MM.yyyy HH:mm:ss';
        intf.dt[0] = param.dt || 'dd.MM.yyyy HH:mm';
        intf.t[0] = param.t || 'HH:mm';
        intf.ts[0] = param.ts || 'HH:mm:ss';
    }
    // ������� ������������� �������������� ������� ��������
    function tsinit(param) {
        tsdefault.d = param.d || '��.';
        tsdefault.h = param.h || '���.';
        tsdefault.m = param.m || '���.';
        tsdefault.s = param.s || '���.';
        tsdefault.ms = param.ms || '��';
    }
    // ������� ��������������
    function df(v, p) {
        if (v == null) return 'null';
        if (!(v instanceof Date)) return intf.nad;
        p = p.join(',');                // ������ �������� ���� ��������!
        if (p == '') return v;                                  // ��� ������� - ������ ������
        var f = c[p];                       // �������� �������� ������� �� ����...
        if (f == null)                                          // ...�����-� - ����� �������������!
        {   // ������ �������� ������� ��������������
            f = 'return \'\'.concat(\'' +
                                  (p
                                    .replace(/'/g, '\\\'')
                                    .replace(fpre, function (m) {
                                        var mc = m.charAt(0);
                                        return mc == 'y' ?
                                                ''.concat('\', ', fp[mc], ', \'') :
                                                ''.concat('\', a(', fp[mc], ', ', m.length, '), \'');
                                    })
                                  ) +
                                  '\');';
            f = new Function('v', 'a', f);// ����������, ��� �������
            c[p] = f;                       // �������� � ���
        }
        return f(v, addz);                                  // ��������������!
    }
    // ���������� ������� ���������� �����
    function addz(v, l) {
        return zz.substring(0, l - ('' + v).length) + v;
    }
    // ��� ��������� ������ ������� ��������
    function tss(dt, div, buf, msn, write) {
        if (dt == 0) return 0;                      // ���� - �����
        var i = dt % div;       // ������� �� �������
        if (i != 0 && write) buf.unshift(i, msn);   // �������, ���� �����
        return Math.floor(dt / div);            // ������ ���������������� �����
    }
})(String.prototype.format);
