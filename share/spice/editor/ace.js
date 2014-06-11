if (function() {
    function o(e) {
        var i = function(e, t) {
            return r("", e, t);
        };
        var s = t;
        if (e) {
            if (!t[e]) {
                t[e] = {};
            }
            s = t[e];
        }
        if (!s.define || !s.define.packaged) {
            n.original = s.define, s.define = n, s.define.packaged = !0;
        }
        if (!s.require || !s.require.packaged) {
            r.original = s.require, s.require = i, s.require.packaged = !0;
        }
    }
    var e = "";
    var t = function() {
        return this;
    }();
    if (!e && "undefined" != typeof requirejs) {
        return;
    }
    var n = function(e, t, r) {
        if ("string" != typeof e) {
            if (n.original) {
                n.original.apply(window, arguments);
            } else {
                console.error("dropping module because define wasn't a string."), console.trace();
            }
            return;
        }
        if (2 == arguments.length) {
            r = t;
        }
        if (!n.modules) {
            n.modules = {}, n.payloads = {};
        }
        n.payloads[e] = r, n.modules[e] = null;
    };
    var r = function(e, t, n) {
        if ("[object Array]" === Object.prototype.toString.call(t)) {
            var i = [];
            for (var o = 0, u = t.length; u > o; ++o) {
                var a = s(e, t[o]);
                if (!a && r.original) {
                    return r.original.apply(window, arguments);
                }
                i.push(a);
            }
            if (n) {
                n.apply(null, i);
            }
        } else {
            if ("string" == typeof t) {
                var f = s(e, t);
                if (!f && r.original) {
                    return r.original.apply(window, arguments);
                }
                if (n) {
                    n();
                }
                return f;
            } else {
                if (r.original) {
                    return r.original.apply(window, arguments);
                }
            }
        }
    };
    var i = function(e, t) {
        if (-1 !== t.indexOf("!")) {
            var n = t.split("!");
            return i(e, n[0]) + "!" + i(e, n[1]);
        }
        if ("." == t.charAt(0)) {
            var r = e.split("/").slice(0, -1).join("/");
            t = r + "/" + t;
            while (-1 !== t.indexOf(".") && s != t) {
                var s = t;
                t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
            }
        }
        return t;
    };
    var s = function(e, t) {
        t = i(e, t);
        var s = n.modules[t];
        if (!s) {
            if (s = n.payloads[t], "function" == typeof s) {
                var o = {};
                var u = {
                    id: t,
                    uri: "",
                    exports: o,
                    packaged: !0
                };
                var a = function(e, n) {
                    return r(t, e, n);
                };
                var f = s(a, o, u);
                o = f || u.exports, n.modules[t] = o, delete n.payloads[t];
            }
            s = n.modules[t] = o || s;
        }
        return s;
    };
    o(e);
}(), define("ace/ace", [ "require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/multi_select", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/config" ], function(e, t, n) {
    e("./lib/fixoldbrowsers");
    var r = e("./lib/dom");
    var i = e("./lib/event");
    var s = e("./editor").Editor;
    var o = e("./edit_session").EditSession;
    var u = e("./undomanager").UndoManager;
    var a = e("./virtual_renderer").VirtualRenderer;
    var f = e("./multi_select").MultiSelect;
    e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./mode/folding/fold_mode"), 
    e("./theme/textmate"), t.config = e("./config"), t.require = e, t.edit = function(e) {
        if ("string" == typeof e) {
            var n = e;
            var e = document.getElementById(n);
            if (!e) {
                throw new Error("ace.edit can't find div #" + n);
            }
        }
        if (e.env && e.env.editor instanceof s) {
            return e.env.editor;
        }
        var o = t.createEditSession(r.getInnerText(e));
        e.innerHTML = "";
        var u = new s(new a(e));
        new f(u), u.setSession(o);
        var l = {
            document: o,
            editor: u,
            onResize: u.resize.bind(u, null)
        };
        return i.addListener(window, "resize", l.onResize), u.on("destroy", function() {
            i.removeListener(window, "resize", l.onResize);
        }), e.env = u.env = l, u;
    }, t.createEditSession = function(e, t) {
        var n = new o(e, t);
        return n.setUndoManager(new u()), n;
    }, t.EditSession = o, t.UndoManager = u;
}), define("ace/lib/fixoldbrowsers", [ "require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim" ], function(e, t, n) {
    e("./regexp"), e("./es5-shim");
}), define("ace/lib/regexp", [ "require", "exports", "module" ], function(e, t, n) {
    function o(e) {
        return (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : "");
    }
    function u(e, t, n) {
        if (Array.prototype.indexOf) {
            return e.indexOf(t, n);
        }
        for (var r = n || 0; r < e.length; r++) {
            if (e[r] === t) {
                return r;
            }
        }
        return -1;
    }
    var r = {
        exec: RegExp.prototype.exec,
        test: RegExp.prototype.test,
        match: String.prototype.match,
        replace: String.prototype.replace,
        split: String.prototype.split
    }, i = void 0 === r.exec.call(/()??/, "")[1], s = function() {
        var e = /^/g;
        return r.test.call(e, ""), !e.lastIndex;
    }();
    if (s && i) {
        return;
    }
    if (RegExp.prototype.exec = function(e) {
        var t = r.exec.apply(this, arguments), n, a;
        if ("string" == typeof e && t) {
            if (!i && t.length > 1 && u(t, "") > -1) {
                a = RegExp(this.source, r.replace.call(o(this), "g", "")), r.replace.call(e.slice(t.index), a, function() {
                    for (var e = 1; e < arguments.length - 2; e++) {
                        if (void 0 === arguments[e]) {
                            t[e] = void 0;
                        }
                    }
                });
            }
            if (this._xregexp && this._xregexp.captureNames) {
                for (var f = 1; f < t.length; f++) {
                    if (n = this._xregexp.captureNames[f - 1], n) {
                        t[n] = t[f];
                    }
                }
            }
            if (!s && this.global && !t[0].length && this.lastIndex > t.index) {
                this.lastIndex--;
            }
        }
        return t;
    }, !s) {
        RegExp.prototype.test = function(e) {
            var t = r.exec.call(this, e);
            if (t && this.global && !t[0].length && this.lastIndex > t.index) {
                this.lastIndex--;
            }
            return !!t;
        };
    }
}), define("ace/lib/es5-shim", [ "require", "exports", "module" ], function(e, t, n) {
    function r() {}
    function w(e) {
        try {
            return Object.defineProperty(e, "sentinel", {}), "sentinel" in e;
        } catch (t) {}
    }
    function H(e) {
        if (e = +e, e !== e) {
            e = 0;
        } else {
            if (0 !== e && e !== 1 / 0 && e !== -(1 / 0)) {
                e = (e > 0 || -1) * Math.floor(Math.abs(e));
            }
        }
        return e;
    }
    function B(e) {
        var t = typeof e;
        return null === e || "undefined" === t || "boolean" === t || "number" === t || "string" === t;
    }
    function j(e) {
        var t, n, r;
        if (B(e)) {
            return e;
        }
        if (n = e.valueOf, "function" == typeof n) {
            if (t = n.call(e), B(t)) {
                return t;
            }
        }
        if (r = e.toString, "function" == typeof r) {
            if (t = r.call(e), B(t)) {
                return t;
            }
        }
        throw new TypeError();
    }
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(t) {
            var n = this;
            if ("function" != typeof n) {
                throw new TypeError("Function.prototype.bind called on incompatible " + n);
            }
            var i = u.call(arguments, 1);
            var s = function() {
                if (this instanceof s) {
                    var e = n.apply(this, i.concat(u.call(arguments)));
                    if (Object(e) === e) {
                        return e;
                    }
                    return this;
                } else {
                    return n.apply(t, i.concat(u.call(arguments)));
                }
            };
            if (n.prototype) {
                r.prototype = n.prototype, s.prototype = new r(), r.prototype = null;
            }
            return s;
        };
    }
    var i = Function.prototype.call;
    var s = Array.prototype;
    var o = Object.prototype;
    var u = s.slice;
    var a = i.bind(o.toString);
    var f = i.bind(o.hasOwnProperty);
    var l;
    var c;
    var h;
    var p;
    var d;
    if (d = f(o, "__defineGetter__")) {
        l = i.bind(o.__defineGetter__), c = i.bind(o.__defineSetter__), h = i.bind(o.__lookupGetter__), 
        p = i.bind(o.__lookupSetter__);
    }
    if (2 != [ 1, 2 ].splice(0).length) {
        if (function() {
            function e(e) {
                var t = new Array(e + 2);
                return t[0] = t[1] = 0, t;
            }
            var t = [], n;
            if (t.splice.apply(t, e(20)), t.splice.apply(t, e(26)), n = t.length, t.splice(5, 0, "XXX"), 
            n + 1 == t.length, n + 1 == t.length) {
                return !0;
            }
        }()) {
            var v = Array.prototype.splice;
            Array.prototype.splice = function(e, t) {
                if (!arguments.length) {
                    return [];
                } else {
                    return v.apply(this, [ void 0 === e ? 0 : e, void 0 === t ? this.length - e : t ].concat(u.call(arguments, 2)));
                }
            };
        } else {
            Array.prototype.splice = function(e, t) {
                var n = this.length;
                if (e > 0) {
                    if (e > n) {
                        e = n;
                    }
                } else {
                    if (void 0 == e) {
                        e = 0;
                    } else {
                        if (0 > e) {
                            e = Math.max(n + e, 0);
                        }
                    }
                }
                if (!(n > e + t)) {
                    t = n - e;
                }
                var r = this.slice(e, e + t);
                var i = u.call(arguments, 2);
                var s = i.length;
                if (e === n) {
                    if (s) {
                        this.push.apply(this, i);
                    }
                } else {
                    var o = Math.min(t, n - e);
                    var a = e + o;
                    var f = a + s - o;
                    var l = n - a;
                    var c = n - o;
                    if (a > f) {
                        for (var h = 0; l > h; ++h) {
                            this[f + h] = this[a + h];
                        }
                    } else {
                        if (f > a) {
                            for (h = l; h--; ) {
                                this[f + h] = this[a + h];
                            }
                        }
                    }
                    if (s && e === c) {
                        this.length = c, this.push.apply(this, i);
                    } else {
                        for (this.length = c + s, h = 0; s > h; ++h) {
                            this[e + h] = i[h];
                        }
                    }
                }
                return r;
            };
        }
    }
    if (!Array.isArray) {
        Array.isArray = function(t) {
            return "[object Array]" == a(t);
        };
    }
    var m = Object("a"), g = "a" != m[0] || !(0 in m);
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(t) {
            var n = F(this), r = g && "[object String]" == a(this) ? this.split("") : n, i = arguments[1], s = -1, o = r.length >>> 0;
            if ("[object Function]" != a(t)) {
                throw new TypeError();
            }
            while (++s < o) {
                if (s in r) {
                    t.call(i, r[s], s, n);
                }
            }
        };
    }
    if (!Array.prototype.map) {
        Array.prototype.map = function(t) {
            var n = F(this), r = g && "[object String]" == a(this) ? this.split("") : n, i = r.length >>> 0, s = Array(i), o = arguments[1];
            if ("[object Function]" != a(t)) {
                throw new TypeError(t + " is not a function");
            }
            for (var u = 0; i > u; u++) {
                if (u in r) {
                    s[u] = t.call(o, r[u], u, n);
                }
            }
            return s;
        };
    }
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(t) {
            var n = F(this), r = g && "[object String]" == a(this) ? this.split("") : n, i = r.length >>> 0, s = [], o, u = arguments[1];
            if ("[object Function]" != a(t)) {
                throw new TypeError(t + " is not a function");
            }
            for (var f = 0; i > f; f++) {
                if (f in r) {
                    if (o = r[f], t.call(u, o, f, n)) {
                        s.push(o);
                    }
                }
            }
            return s;
        };
    }
    if (!Array.prototype.every) {
        Array.prototype.every = function(t) {
            var n = F(this), r = g && "[object String]" == a(this) ? this.split("") : n, i = r.length >>> 0, s = arguments[1];
            if ("[object Function]" != a(t)) {
                throw new TypeError(t + " is not a function");
            }
            for (var o = 0; i > o; o++) {
                if (o in r && !t.call(s, r[o], o, n)) {
                    return !1;
                }
            }
            return !0;
        };
    }
    if (!Array.prototype.some) {
        Array.prototype.some = function(t) {
            var n = F(this), r = g && "[object String]" == a(this) ? this.split("") : n, i = r.length >>> 0, s = arguments[1];
            if ("[object Function]" != a(t)) {
                throw new TypeError(t + " is not a function");
            }
            for (var o = 0; i > o; o++) {
                if (o in r && t.call(s, r[o], o, n)) {
                    return !0;
                }
            }
            return !1;
        };
    }
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(t) {
            var n = F(this), r = g && "[object String]" == a(this) ? this.split("") : n, i = r.length >>> 0;
            if ("[object Function]" != a(t)) {
                throw new TypeError(t + " is not a function");
            }
            if (!i && 1 == arguments.length) {
                throw new TypeError("reduce of empty array with no initial value");
            }
            var s = 0;
            var o;
            if (arguments.length >= 2) {
                o = arguments[1];
            } else {
                do {
                    if (s in r) {
                        o = r[s++];
                        break;
                    }
                    if (++s >= i) {
                        throw new TypeError("reduce of empty array with no initial value");
                    }
                } while (!0);
            }
            for (;i > s; s++) {
                if (s in r) {
                    o = t.call(void 0, o, r[s], s, n);
                }
            }
            return o;
        };
    }
    if (!Array.prototype.reduceRight) {
        Array.prototype.reduceRight = function(t) {
            var n = F(this), r = g && "[object String]" == a(this) ? this.split("") : n, i = r.length >>> 0;
            if ("[object Function]" != a(t)) {
                throw new TypeError(t + " is not a function");
            }
            if (!i && 1 == arguments.length) {
                throw new TypeError("reduceRight of empty array with no initial value");
            }
            var s, o = i - 1;
            if (arguments.length >= 2) {
                s = arguments[1];
            } else {
                do {
                    if (o in r) {
                        s = r[o--];
                        break;
                    }
                    if (--o < 0) {
                        throw new TypeError("reduceRight of empty array with no initial value");
                    }
                } while (!0);
            }
            do {
                if (o in this) {
                    s = t.call(void 0, s, r[o], o, n);
                }
            } while (o--);
            return s;
        };
    }
    if (!Array.prototype.indexOf || -1 != [ 0, 1 ].indexOf(1, 2)) {
        Array.prototype.indexOf = function(t) {
            var n = g && "[object String]" == a(this) ? this.split("") : F(this), r = n.length >>> 0;
            if (!r) {
                return -1;
            }
            var i = 0;
            if (arguments.length > 1) {
                i = H(arguments[1]);
            }
            for (i = i >= 0 ? i : Math.max(0, r + i); r > i; i++) {
                if (i in n && n[i] === t) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!Array.prototype.lastIndexOf || -1 != [ 0, 1 ].lastIndexOf(0, -3)) {
        Array.prototype.lastIndexOf = function(t) {
            var n = g && "[object String]" == a(this) ? this.split("") : F(this), r = n.length >>> 0;
            if (!r) {
                return -1;
            }
            var i = r - 1;
            if (arguments.length > 1) {
                i = Math.min(i, H(arguments[1]));
            }
            for (i = i >= 0 ? i : r - Math.abs(i); i >= 0; i--) {
                if (i in n && t === n[i]) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!Object.getPrototypeOf) {
        Object.getPrototypeOf = function(t) {
            return t.__proto__ || (t.constructor ? t.constructor.prototype : o);
        };
    }
    if (!Object.getOwnPropertyDescriptor) {
        var y = "Object.getOwnPropertyDescriptor called on a non-object: ";
        Object.getOwnPropertyDescriptor = function(t, n) {
            if ("object" != typeof t && "function" != typeof t || null === t) {
                throw new TypeError(y + t);
            }
            if (!f(t, n)) {
                return;
            }
            var r, i, s;
            if (r = {
                enumerable: !0,
                configurable: !0
            }, d) {
                var u = t.__proto__;
                t.__proto__ = o;
                var i = h(t, n);
                var s = p(t, n);
                if (t.__proto__ = u, i || s) {
                    if (i) {
                        r.get = i;
                    }
                    if (s) {
                        r.set = s;
                    }
                    return r;
                }
            }
            return r.value = t[n], r;
        };
    }
    if (!Object.getOwnPropertyNames) {
        Object.getOwnPropertyNames = function(t) {
            return Object.keys(t);
        };
    }
    if (!Object.create) {
        var b;
        if (null === Object.prototype.__proto__) {
            b = function() {
                return {
                    __proto__: null
                };
            };
        } else {
            b = function() {
                var e = {};
                for (var t in e) {
                    e[t] = null;
                }
                return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, 
                e;
            };
        }
        Object.create = function(t, n) {
            var r;
            if (null === t) {
                r = b();
            } else {
                if ("object" != typeof t) {
                    throw new TypeError("typeof prototype[" + typeof t + "] != 'object'");
                }
                var i = function() {};
                i.prototype = t, r = new i(), r.__proto__ = t;
            }
            if (void 0 !== n) {
                Object.defineProperties(r, n);
            }
            return r;
        };
    }
    if (Object.defineProperty) {
        var E = w({});
        var S = "undefined" == typeof document || w(document.createElement("div"));
        if (!E || !S) {
            var x = Object.defineProperty;
        }
    }
    if (!Object.defineProperty || x) {
        var T = "Property description must be an object: ";
        var N = "Object.defineProperty called on non-object: ";
        var C = "getters & setters can not be defined on this javascript engine";
        Object.defineProperty = function(t, n, r) {
            if ("object" != typeof t && "function" != typeof t || null === t) {
                throw new TypeError(N + t);
            }
            if ("object" != typeof r && "function" != typeof r || null === r) {
                throw new TypeError(T + r);
            }
            if (x) {
                try {
                    return x.call(Object, t, n, r);
                } catch (i) {}
            }
            if (f(r, "value")) {
                if (d && (h(t, n) || p(t, n))) {
                    var s = t.__proto__;
                    t.__proto__ = o, delete t[n], t[n] = r.value, t.__proto__ = s;
                } else {
                    t[n] = r.value;
                }
            } else {
                if (!d) {
                    throw new TypeError(C);
                }
                if (f(r, "get")) {
                    l(t, n, r.get);
                }
                if (f(r, "set")) {
                    c(t, n, r.set);
                }
            }
            return t;
        };
    }
    if (!Object.defineProperties) {
        Object.defineProperties = function(t, n) {
            for (var r in n) {
                if (f(n, r)) {
                    Object.defineProperty(t, r, n[r]);
                }
            }
            return t;
        };
    }
    if (!Object.seal) {
        Object.seal = function(t) {
            return t;
        };
    }
    if (!Object.freeze) {
        Object.freeze = function(t) {
            return t;
        };
    }
    try {
        Object.freeze(function() {});
    } catch (k) {
        Object.freeze = function(t) {
            return function(n) {
                if ("function" == typeof n) {
                    return n;
                } else {
                    return t(n);
                }
            };
        }(Object.freeze);
    }
    if (!Object.preventExtensions) {
        Object.preventExtensions = function(t) {
            return t;
        };
    }
    if (!Object.isSealed) {
        Object.isSealed = function(t) {
            return !1;
        };
    }
    if (!Object.isFrozen) {
        Object.isFrozen = function(t) {
            return !1;
        };
    }
    if (!Object.isExtensible) {
        Object.isExtensible = function(t) {
            if (Object(t) === t) {
                throw new TypeError();
            }
            var n = "";
            while (f(t, n)) {
                n += "?";
            }
            t[n] = !0;
            var r = f(t, n);
            return delete t[n], r;
        };
    }
    if (!Object.keys) {
        var L = !0, A = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], O = A.length;
        for (var M in {
            toString: null
        }) {
            L = !1;
        }
        Object.keys = function I(e) {
            if ("object" != typeof e && "function" != typeof e || null === e) {
                throw new TypeError("Object.keys called on a non-object");
            }
            var I = [];
            for (var t in e) {
                if (f(e, t)) {
                    I.push(t);
                }
            }
            if (L) {
                for (var n = 0, r = O; r > n; n++) {
                    var i = A[n];
                    if (f(e, i)) {
                        I.push(i);
                    }
                }
            }
            return I;
        };
    }
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        };
    }
    var _ = " \n\f\r   ᠎             　\u2028\u2029";
    if (!String.prototype.trim || _.trim()) {
        _ = "[" + _ + "]";
        var D = new RegExp("^" + _ + _ + "*"), P = new RegExp(_ + _ + "*$");
        String.prototype.trim = function() {
            return String(this).replace(D, "").replace(P, "");
        };
    }
    var F = function(e) {
        if (null == e) {
            throw new TypeError("can't convert " + e + " to object");
        }
        return Object(e);
    };
}), define("ace/lib/dom", [ "require", "exports", "module" ], function(e, t, n) {
    if ("undefined" == typeof document) {
        return;
    }
    var r = "http://www.w3.org/1999/xhtml";
    if (t.getDocumentHead = function(e) {
        if (!e) {
            e = document;
        }
        return e.head || e.getElementsByTagName("head")[0] || e.documentElement;
    }, t.createElement = function(e, t) {
        return document.createElementNS ? document.createElementNS(t || r, e) : document.createElement(e);
    }, t.hasCssClass = function(e, t) {
        var n = e.className.split(/\s+/g);
        return -1 !== n.indexOf(t);
    }, t.addCssClass = function(e, n) {
        if (!t.hasCssClass(e, n)) {
            e.className += " " + n;
        }
    }, t.removeCssClass = function(e, t) {
        var n = e.className.split(/\s+/g);
        while (!0) {
            var r = n.indexOf(t);
            if (-1 == r) {
                break;
            }
            n.splice(r, 1);
        }
        e.className = n.join(" ");
    }, t.toggleCssClass = function(e, t) {
        var n = e.className.split(/\s+/g), r = !0;
        while (!0) {
            var i = n.indexOf(t);
            if (-1 == i) {
                break;
            }
            r = !1, n.splice(i, 1);
        }
        if (r) {
            n.push(t);
        }
        return e.className = n.join(" "), r;
    }, t.setCssClass = function(e, n, r) {
        if (r) {
            t.addCssClass(e, n);
        } else {
            t.removeCssClass(e, n);
        }
    }, t.hasCssString = function(e, t) {
        var n = 0, r;
        if (t = t || document, t.createStyleSheet && (r = t.styleSheets)) {
            while (n < r.length) {
                if (r[n++].owningElement.id === e) {
                    return !0;
                }
            }
        } else {
            if (r = t.getElementsByTagName("style")) {
                while (n < r.length) {
                    if (r[n++].id === e) {
                        return !0;
                    }
                }
            }
        }
        return !1;
    }, t.importCssString = function(n, i, s) {
        if (s = s || document, i && t.hasCssString(i, s)) {
            return null;
        }
        var o;
        if (s.createStyleSheet) {
            if (o = s.createStyleSheet(), o.cssText = n, i) {
                o.owningElement.id = i;
            }
        } else {
            if (o = s.createElementNS ? s.createElementNS(r, "style") : s.createElement("style"), 
            o.appendChild(s.createTextNode(n)), i) {
                o.id = i;
            }
            t.getDocumentHead(s).appendChild(o);
        }
    }, t.importCssStylsheet = function(e, n) {
        if (n.createStyleSheet) {
            n.createStyleSheet(e);
        } else {
            var r = t.createElement("link");
            r.rel = "stylesheet", r.href = e, t.getDocumentHead(n).appendChild(r);
        }
    }, t.getInnerWidth = function(e) {
        return parseInt(t.computedStyle(e, "paddingLeft"), 10) + parseInt(t.computedStyle(e, "paddingRight"), 10) + e.clientWidth;
    }, t.getInnerHeight = function(e) {
        return parseInt(t.computedStyle(e, "paddingTop"), 10) + parseInt(t.computedStyle(e, "paddingBottom"), 10) + e.clientHeight;
    }, void 0 !== window.pageYOffset) {
        t.getPageScrollTop = function() {
            return window.pageYOffset;
        }, t.getPageScrollLeft = function() {
            return window.pageXOffset;
        };
    } else {
        t.getPageScrollTop = function() {
            return document.body.scrollTop;
        }, t.getPageScrollLeft = function() {
            return document.body.scrollLeft;
        };
    }
    if (window.getComputedStyle) {
        t.computedStyle = function(e, t) {
            if (t) {
                return (window.getComputedStyle(e, "") || {})[t] || "";
            }
            return window.getComputedStyle(e, "") || {};
        };
    } else {
        t.computedStyle = function(e, t) {
            if (t) {
                return e.currentStyle[t];
            }
            return e.currentStyle;
        };
    }
    if (t.scrollbarWidth = function(e) {
        var n = t.createElement("ace_inner");
        n.style.width = "100%", n.style.minWidth = "0px", n.style.height = "200px", n.style.display = "block";
        var r = t.createElement("ace_outer");
        var i = r.style;
        i.position = "absolute", i.left = "-10000px", i.overflow = "hidden", i.width = "200px", 
        i.minWidth = "0px", i.height = "150px", i.display = "block", r.appendChild(n);
        var s = e.documentElement;
        s.appendChild(r);
        var o = n.offsetWidth;
        i.overflow = "scroll";
        var u = n.offsetWidth;
        if (o == u) {
            u = r.clientWidth;
        }
        return s.removeChild(r), o - u;
    }, t.setInnerHtml = function(e, t) {
        var n = e.cloneNode(!1);
        return n.innerHTML = t, e.parentNode.replaceChild(n, e), n;
    }, "textContent" in document.documentElement) {
        t.setInnerText = function(e, t) {
            e.textContent = t;
        }, t.getInnerText = function(e) {
            return e.textContent;
        };
    } else {
        t.setInnerText = function(e, t) {
            e.innerText = t;
        }, t.getInnerText = function(e) {
            return e.innerText;
        };
    }
    t.getParentWindow = function(e) {
        return e.defaultView || e.parentWindow;
    };
}), define("ace/lib/event", [ "require", "exports", "module", "ace/lib/keys", "ace/lib/useragent", "ace/lib/dom" ], function(e, t, n) {
    function o(e, t, n) {
        var s = 0;
        if (i.isOpera && !("KeyboardEvent" in window) && i.isMac) {
            s = 0 | (t.metaKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.shiftKey ? 4 : 0) | (t.ctrlKey ? 8 : 0);
        } else {
            s = 0 | (t.ctrlKey ? 1 : 0) | (t.altKey ? 2 : 0) | (t.shiftKey ? 4 : 0) | (t.metaKey ? 8 : 0);
        }
        if (!i.isMac && u) {
            if (u[91] || u[92]) {
                s |= 8;
            }
            if (u.altGr) {
                if (3 != (3 & s)) {
                    u.altGr = 0;
                } else {
                    return;
                }
            }
            if (18 === n || 17 === n) {
                var o = t.location || t.keyLocation;
                if (17 === n && 1 === o) {
                    a = t.timeStamp;
                } else {
                    if (18 === n && 3 === s && 2 === o) {
                        var f = -a;
                        if (a = t.timeStamp, f += a, 3 > f) {
                            u.altGr = !0;
                        }
                    }
                }
            }
        }
        if (n in r.MODIFIER_KEYS) {
            switch (r.MODIFIER_KEYS[n]) {
              case "Alt":
                s = 2;
                break;

              case "Shift":
                s = 4;
                break;

              case "Ctrl":
                s = 1;
                break;

              default:
                s = 8;
            }
            n = 0;
        }
        if (8 & s && (91 === n || 93 === n)) {
            n = 0;
        }
        if (!s && 13 === n) {
            if (t.location || 3 === t.keyLocation) {
                if (e(t, s, -n), t.defaultPrevented) {
                    return;
                }
            }
        }
        if (!(s || n in r.FUNCTION_KEYS || n in r.PRINTABLE_KEYS)) {
            return !1;
        }
        return e(t, s, n);
    }
    var r = e("./keys");
    var i = e("./useragent");
    var s = e("./dom");
    t.addListener = function(e, t, n) {
        if (e.addEventListener) {
            return e.addEventListener(t, n, !1);
        }
        if (e.attachEvent) {
            var r = function() {
                n.call(e, window.event);
            };
            n._wrapper = r, e.attachEvent("on" + t, r);
        }
    }, t.removeListener = function(e, t, n) {
        if (e.removeEventListener) {
            return e.removeEventListener(t, n, !1);
        }
        if (e.detachEvent) {
            e.detachEvent("on" + t, n._wrapper || n);
        }
    }, t.stopEvent = function(e) {
        return t.stopPropagation(e), t.preventDefault(e), !1;
    }, t.stopPropagation = function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = !0;
        }
    }, t.preventDefault = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = !1;
        }
    }, t.getButton = function(e) {
        if ("dblclick" == e.type) {
            return 0;
        }
        if ("contextmenu" == e.type || e.ctrlKey && i.isMac) {
            return 2;
        }
        if (e.preventDefault) {
            return e.button;
        } else {
            return {
                1: 0,
                2: 2,
                4: 1
            }[e.button];
        }
    }, t.capture = function(e, n, r) {
        function i(e) {
            n && n(e), r && r(e), t.removeListener(document, "mousemove", n, !0), t.removeListener(document, "mouseup", i, !0), 
            t.removeListener(document, "dragstart", i, !0);
        }
        t.addListener(document, "mousemove", n, !0), t.addListener(document, "mouseup", i, !0), 
        t.addListener(document, "dragstart", i, !0);
    }, t.addMouseWheelListener = function(e, n) {
        if ("onmousewheel" in e) {
            var r = 8;
            t.addListener(e, "mousewheel", function(e) {
                if (void 0 !== e.wheelDeltaX) {
                    e.wheelX = -e.wheelDeltaX / r, e.wheelY = -e.wheelDeltaY / r;
                } else {
                    e.wheelX = 0, e.wheelY = -e.wheelDelta / r;
                }
                n(e);
            });
        } else {
            if ("onwheel" in e) {
                t.addListener(e, "wheel", function(e) {
                    e.wheelX = 5 * (e.deltaX || 0), e.wheelY = 5 * (e.deltaY || 0), n(e);
                });
            } else {
                t.addListener(e, "DOMMouseScroll", function(e) {
                    if (e.axis && e.axis == e.HORIZONTAL_AXIS) {
                        e.wheelX = 5 * (e.detail || 0), e.wheelY = 0;
                    } else {
                        e.wheelX = 0, e.wheelY = 5 * (e.detail || 0);
                    }
                    n(e);
                });
            }
        }
    }, t.addMultiMouseDownListener = function(e, n, r, s) {
        var o = 0;
        var u, a, f;
        var l = {
            2: "dblclick",
            3: "tripleclick",
            4: "quadclick"
        };
        if (t.addListener(e, "mousedown", function(e) {
            if (0 != t.getButton(e)) {
                o = 0;
            } else {
                if (e.detail > 1) {
                    if (o++, o > 4) {
                        o = 1;
                    }
                } else {
                    o = 1;
                }
            }
            if (i.isIE) {
                var n = Math.abs(e.clientX - u) > 5 || Math.abs(e.clientY - a) > 5;
                if (n) {
                    o = 1;
                }
                if (1 == o) {
                    u = e.clientX, a = e.clientY;
                }
            }
            if (r[s]("mousedown", e), o > 4) {
                o = 0;
            } else {
                if (o > 1) {
                    return r[s](l[o], e);
                }
            }
        }), i.isOldIE) {
            t.addListener(e, "dblclick", function(e) {
                if (o = 2, f) {
                    clearTimeout(f);
                }
                f = setTimeout(function() {
                    f = null;
                }, n[o - 1] || 600), r[s]("mousedown", e), r[s](l[o], e);
            });
        }
    };
    var u = null;
    var a = 0;
    if (t.addCommandKeyListener = function(e, n) {
        var r = t.addListener;
        if (i.isOldGecko || i.isOpera && !("KeyboardEvent" in window)) {
            var s = null;
            r(e, "keydown", function(e) {
                s = e.keyCode;
            }), r(e, "keypress", function(e) {
                return o(n, e, s);
            });
        } else {
            var a = null;
            if (r(e, "keydown", function(e) {
                u[e.keyCode] = !0;
                var t = o(n, e, e.keyCode);
                return a = e.defaultPrevented, t;
            }), r(e, "keypress", function(e) {
                if (a && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)) {
                    t.stopEvent(e), a = null;
                }
            }), r(e, "keyup", function(e) {
                u[e.keyCode] = null;
            }), !u) {
                u = Object.create(null), r(window, "focus", function(e) {
                    u = Object.create(null);
                });
            }
        }
    }, window.postMessage && !i.isOldIE) {
        var f = 1;
        t.nextTick = function(e, n) {
            n = n || window;
            var r = "zero-timeout-message-" + f;
            t.addListener(n, "message", function i(s) {
                if (s.data == r) {
                    t.stopPropagation(s), t.removeListener(n, "message", i), e();
                }
            }), n.postMessage(r, "*");
        };
    }
    if (t.nextFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame, 
    t.nextFrame) {
        t.nextFrame = t.nextFrame.bind(window);
    } else {
        t.nextFrame = function(e) {
            setTimeout(e, 17);
        };
    }
}), define("ace/lib/keys", [ "require", "exports", "module", "ace/lib/oop" ], function(e, t, n) {
    var r = e("./oop");
    var i = function() {
        var e = {
            MODIFIER_KEYS: {
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                224: "Meta"
            },
            KEY_MODS: {
                ctrl: 1,
                alt: 2,
                option: 2,
                shift: 4,
                meta: 8,
                command: 8,
                cmd: 8
            },
            FUNCTION_KEYS: {
                8: "Backspace",
                9: "Tab",
                13: "Return",
                19: "Pause",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "Print",
                45: "Insert",
                46: "Delete",
                96: "Numpad0",
                97: "Numpad1",
                98: "Numpad2",
                99: "Numpad3",
                100: "Numpad4",
                101: "Numpad5",
                102: "Numpad6",
                103: "Numpad7",
                104: "Numpad8",
                105: "Numpad9",
                "-13": "NumpadEnter",
                112: "F1",
                113: "F2",
                114: "F3",
                115: "F4",
                116: "F5",
                117: "F6",
                118: "F7",
                119: "F8",
                120: "F9",
                121: "F10",
                122: "F11",
                123: "F12",
                144: "Numlock",
                145: "Scrolllock"
            },
            PRINTABLE_KEYS: {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                61: "=",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                107: "+",
                109: "-",
                110: ".",
                188: ",",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'"
            }
        };
        for (var t in e.FUNCTION_KEYS) {
            var n = e.FUNCTION_KEYS[t].toLowerCase();
            e[n] = parseInt(t, 10);
        }
        return r.mixin(e, e.MODIFIER_KEYS), r.mixin(e, e.PRINTABLE_KEYS), r.mixin(e, e.FUNCTION_KEYS), 
        e.enter = e["return"], e.escape = e.esc, e.del = e["delete"], e[173] = "-", e;
    }();
    r.mixin(t, i), t.keyCodeToString = function(e) {
        return (i[e] || String.fromCharCode(e)).toLowerCase();
    };
}), define("ace/lib/oop", [ "require", "exports", "module" ], function(e, t, n) {
    t.inherits = function() {
        var e = function() {};
        return function(t, n) {
            e.prototype = n.prototype, t.super_ = n.prototype, t.prototype = new e(), t.prototype.constructor = t;
        };
    }(), t.mixin = function(e, t) {
        for (var n in t) {
            e[n] = t[n];
        }
        return e;
    }, t.implement = function(e, n) {
        t.mixin(e, n);
    };
}), define("ace/lib/useragent", [ "require", "exports", "module" ], function(e, t, n) {
    if (t.OS = {
        LINUX: "LINUX",
        MAC: "MAC",
        WINDOWS: "WINDOWS"
    }, t.getOS = function() {
        if (t.isMac) {
            return t.OS.MAC;
        } else {
            if (t.isLinux) {
                return t.OS.LINUX;
            } else {
                return t.OS.WINDOWS;
            }
        }
    }, "object" != typeof navigator) {
        return;
    }
    var r = (navigator.platform.match(/mac|win|linux/i) || [ "other" ])[0].toLowerCase();
    var i = navigator.userAgent;
    t.isWin = "win" == r, t.isMac = "mac" == r, t.isLinux = "linux" == r, t.isIE = ("Microsoft Internet Explorer" == navigator.appName || navigator.appName.indexOf("MSAppHost") >= 0) && parseFloat(navigator.userAgent.match(/MSIE ([0-9]+[\.0-9]+)/)[1]), 
    t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = window.controllers && "Gecko" === window.navigator.product, 
    t.isOldGecko = t.isGecko && parseInt((navigator.userAgent.match(/rv\:(\d+)/) || [])[1], 10) < 4, 
    t.isOpera = window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera), 
    t.isWebKit = parseFloat(i.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(i.split(" Chrome/")[1]) || void 0, 
    t.isAIR = i.indexOf("AdobeAIR") >= 0, t.isIPad = i.indexOf("iPad") >= 0, t.isTouchPad = i.indexOf("TouchPad") >= 0;
}), define("ace/editor", [ "require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config" ], function(e, t, n) {
    e("./lib/fixoldbrowsers");
    var r = e("./lib/oop");
    var i = e("./lib/dom");
    var s = e("./lib/lang");
    var o = e("./lib/useragent");
    var u = e("./keyboard/textinput").TextInput;
    var a = e("./mouse/mouse_handler").MouseHandler;
    var f = e("./mouse/fold_handler").FoldHandler;
    var l = e("./keyboard/keybinding").KeyBinding;
    var c = e("./edit_session").EditSession;
    var h = e("./search").Search;
    var p = e("./range").Range;
    var d = e("./lib/event_emitter").EventEmitter;
    var v = e("./commands/command_manager").CommandManager;
    var m = e("./commands/default_commands").commands;
    var g = e("./config");
    var y = function(e, t) {
        var n = e.getContainerElement();
        this.container = n, this.renderer = e, this.commands = new v(o.isMac ? "mac" : "win", m), 
        this.textInput = new u(e.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), 
        this.keyBinding = new l(this), this.$mouseHandler = new a(this), new f(this), this.$blockScrolling = 0, 
        this.$search = new h().set({
            wrap: !0
        }), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), 
        this.$initOperationListeners(), this._$emitInputEvent = s.delayedCall(function() {
            this._signal("input", {}), this.session.bgTokenizer && this.session.bgTokenizer.scheduleStart();
        }.bind(this)), this.on("change", function(e, t) {
            t._$emitInputEvent.schedule(31);
        }), this.setSession(t || new c("")), g.resetOptions(this), g._emit("editor", this);
    };
    (function() {
        r.implement(this, d), this.$initOperationListeners = function() {
            function e(e) {
                return e[e.length - 1];
            }
            this.selections = [], this.commands.on("exec", function(t) {
                this.startOperation(t);
                var n = t.command;
                if ("fileJump" == n.group) {
                    var r = this.prevOp;
                    if (!r || "fileJump" != r.command.group) {
                        this.lastFileJumpPos = e(this.selections);
                    }
                } else {
                    this.lastFileJumpPos = null;
                }
            }.bind(this), !0), this.commands.on("afterExec", function(e) {
                var t = e.command;
                if ("fileJump" == t.group) {
                    if (this.lastFileJumpPos && !this.curOp.selectionChanged) {
                        return void this.selection.fromJSON(this.lastFileJumpPos);
                    }
                }
                this.endOperation(e);
            }.bind(this), !0), this.$opResetTimer = s.delayedCall(this.endOperation.bind(this)), 
            this.on("change", function() {
                this.curOp || this.startOperation(), this.curOp.docChanged = !0;
            }.bind(this), !0), this.on("changeSelection", function() {
                this.curOp || this.startOperation(), this.curOp.selectionChanged = !0;
            }.bind(this), !0);
        }, this.curOp = null, this.prevOp = {}, this.startOperation = function(e) {
            if (this.curOp) {
                if (!e || this.curOp.command) {
                    return;
                }
                this.prevOp = this.curOp;
            }
            if (!e) {
                this.previousCommand = null, e = {};
            }
            this.$opResetTimer.schedule(), this.curOp = {
                command: e.command || {},
                args: e.args
            }, this.selections.push(this.selection.toJSON());
        }, this.endOperation = function() {
            if (this.curOp) {
                this.prevOp = this.curOp, this.curOp = null;
            }
        }, this.$historyTracker = function(e) {
            if (!this.$mergeUndoDeltas) {
                return;
            }
            var t = this.prevOp;
            var n = [ "backspace", "del", "insertstring" ];
            var r = t.command && e.command.name == t.command.name;
            if ("insertstring" == e.command.name) {
                var i = e.args;
                if (void 0 === this.mergeNextCommand) {
                    this.mergeNextCommand = !0;
                }
                r = r && this.mergeNextCommand && (!/\s/.test(i) || /\s/.test(t.args)), this.mergeNextCommand = !0;
            } else {
                r = r && -1 !== n.indexOf(e.command.name);
            }
            if ("always" != this.$mergeUndoDeltas && Date.now() - this.sequenceStartTime > 2e3) {
                r = !1;
            }
            if (r) {
                this.session.mergeUndoDeltas = !0;
            } else {
                if (-1 !== n.indexOf(e.command.name)) {
                    this.sequenceStartTime = Date.now();
                }
            }
        }, this.setKeyboardHandler = function(e) {
            if (!e) {
                this.keyBinding.setKeyboardHandler(null);
            } else {
                if ("string" == typeof e) {
                    this.$keybindingId = e;
                    var t = this;
                    g.loadModule([ "keybinding", e ], function(n) {
                        if (t.$keybindingId == e) {
                            t.keyBinding.setKeyboardHandler(n && n.handler);
                        }
                    });
                } else {
                    this.$keybindingId = null, this.keyBinding.setKeyboardHandler(e);
                }
            }
        }, this.getKeyboardHandler = function() {
            return this.keyBinding.getKeyboardHandler();
        }, this.setSession = function(e) {
            if (this.session == e) {
                return;
            }
            if (this.session) {
                var t = this.session;
                this.session.removeEventListener("change", this.$onDocumentChange), this.session.removeEventListener("changeMode", this.$onChangeMode), 
                this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.session.removeEventListener("changeTabSize", this.$onChangeTabSize), 
                this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode), 
                this.session.removeEventListener("onChangeFold", this.$onChangeFold), this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker), 
                this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker), 
                this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint), 
                this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation), 
                this.session.removeEventListener("changeOverwrite", this.$onCursorChange), this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange), 
                this.session.removeEventListener("changeScrollLeft", this.$onScrollLeftChange);
                var n = this.session.getSelection();
                n.removeEventListener("changeCursor", this.$onCursorChange), n.removeEventListener("changeSelection", this.$onSelectionChange);
            }
            this.session = e, this.$onDocumentChange = this.onDocumentChange.bind(this), e.addEventListener("change", this.$onDocumentChange), 
            this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), 
            e.addEventListener("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), 
            e.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), 
            e.addEventListener("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), 
            e.addEventListener("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), 
            e.addEventListener("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), 
            e.addEventListener("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), 
            this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), 
            this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), 
            this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), 
            this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), 
            this.session.addEventListener("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), 
            this.session.addEventListener("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), 
            this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), 
            this.selection.addEventListener("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), 
            this.selection.addEventListener("changeSelection", this.$onSelectionChange), this.onChangeMode(), 
            this.$blockScrolling += 1, this.onCursorChange(), this.$blockScrolling -= 1, this.onScrollTopChange(), 
            this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), 
            this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), 
            this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull(), 
            this._emit("changeSession", {
                session: e,
                oldSession: t
            });
        }, this.getSession = function() {
            return this.session;
        }, this.setValue = function(e, t) {
            if (this.session.doc.setValue(e), !t) {
                this.selectAll();
            } else {
                if (1 == t) {
                    this.navigateFileEnd();
                } else {
                    if (-1 == t) {
                        this.navigateFileStart();
                    }
                }
            }
            return e;
        }, this.getValue = function() {
            return this.session.getValue();
        }, this.getSelection = function() {
            return this.selection;
        }, this.resize = function(e) {
            this.renderer.onResize(e);
        }, this.setTheme = function(e) {
            this.renderer.setTheme(e);
        }, this.getTheme = function() {
            return this.renderer.getTheme();
        }, this.setStyle = function(e) {
            this.renderer.setStyle(e);
        }, this.unsetStyle = function(e) {
            this.renderer.unsetStyle(e);
        }, this.getFontSize = function() {
            return this.getOption("fontSize") || i.computedStyle(this.container, "fontSize");
        }, this.setFontSize = function(e) {
            this.setOption("fontSize", e);
        }, this.$highlightBrackets = function() {
            if (this.session.$bracketHighlight) {
                this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null;
            }
            if (this.$highlightPending) {
                return;
            }
            var e = this;
            this.$highlightPending = !0, setTimeout(function() {
                e.$highlightPending = !1;
                var t = e.session.findMatchingBracket(e.getCursorPosition());
                if (t) {
                    var n = new p(t.row, t.column, t.row, t.column + 1);
                } else {
                    if (e.session.$mode.getMatching) {
                        var n = e.session.$mode.getMatching(e.session);
                    }
                }
                if (n) {
                    e.session.$bracketHighlight = e.session.addMarker(n, "ace_bracket", "text");
                }
            }, 50);
        }, this.focus = function() {
            var e = this;
            setTimeout(function() {
                e.textInput.focus();
            }), this.textInput.focus();
        }, this.isFocused = function() {
            return this.textInput.isFocused();
        }, this.blur = function() {
            this.textInput.blur();
        }, this.onFocus = function() {
            if (this.$isFocused) {
                return;
            }
            this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), 
            this._emit("focus");
        }, this.onBlur = function() {
            if (!this.$isFocused) {
                return;
            }
            this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), 
            this._emit("blur");
        }, this.$cursorChange = function() {
            this.renderer.updateCursor();
        }, this.onDocumentChange = function(e) {
            var t = e.data;
            var n = t.range;
            var r;
            if (n.start.row == n.end.row && "insertLines" != t.action && "removeLines" != t.action) {
                r = n.end.row;
            } else {
                r = 1/0;
            }
            this.renderer.updateLines(n.start.row, r), this._emit("change", e), this.$cursorChange();
        }, this.onTokenizerUpdate = function(e) {
            var t = e.data;
            this.renderer.updateLines(t.first, t.last);
        }, this.onScrollTopChange = function() {
            this.renderer.scrollToY(this.session.getScrollTop());
        }, this.onScrollLeftChange = function() {
            this.renderer.scrollToX(this.session.getScrollLeft());
        }, this.onCursorChange = function() {
            if (this.$cursorChange(), !this.$blockScrolling) {
                this.renderer.scrollCursorIntoView();
            }
            this.$highlightBrackets(), this.$updateHighlightActiveLine(), this._emit("changeSelection");
        }, this.$updateHighlightActiveLine = function() {
            var e = this.getSession();
            var t;
            if (this.$highlightActiveLine) {
                if ("line" != this.$selectionStyle || !this.selection.isMultiLine()) {
                    t = this.getCursorPosition();
                }
                if (this.renderer.$maxLines && 1 === this.session.getLength()) {
                    t = !1;
                }
            }
            if (e.$highlightLineMarker && !t) {
                e.removeMarker(e.$highlightLineMarker.id), e.$highlightLineMarker = null;
            } else {
                if (!e.$highlightLineMarker && t) {
                    var n = new p(t.row, t.column, t.row, 1/0);
                    n.id = e.addMarker(n, "ace_active-line", "screenLine"), e.$highlightLineMarker = n;
                } else {
                    if (t) {
                        e.$highlightLineMarker.start.row = t.row, e.$highlightLineMarker.end.row = t.row, 
                        e.$highlightLineMarker.start.column = t.column, e._emit("changeBackMarker");
                    }
                }
            }
        }, this.onSelectionChange = function(e) {
            var t = this.session;
            if (t.$selectionMarker) {
                t.removeMarker(t.$selectionMarker);
            }
            if (t.$selectionMarker = null, !this.selection.isEmpty()) {
                var n = this.selection.getRange();
                var r = this.getSelectionStyle();
                t.$selectionMarker = t.addMarker(n, "ace_selection", r);
            } else {
                this.$updateHighlightActiveLine();
            }
            var i = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
            this.session.highlight(i), this._emit("changeSelection");
        }, this.$getSelectionHighLightRegexp = function() {
            var e = this.session;
            var t = this.getSelectionRange();
            if (t.isEmpty() || t.isMultiLine()) {
                return;
            }
            var n = t.start.column - 1;
            var r = t.end.column + 1;
            var i = e.getLine(t.start.row);
            var s = i.length;
            var o = i.substring(Math.max(n, 0), Math.min(r, s));
            if (n >= 0 && /^[\w\d]/.test(o) || s >= r && /[\w\d]$/.test(o)) {
                return;
            }
            if (o = i.substring(t.start.column, t.end.column), !/^[\w\d]+$/.test(o)) {
                return;
            }
            var u = this.$search.$assembleRegExp({
                wholeWord: !0,
                caseSensitive: !0,
                needle: o
            });
            return u;
        }, this.onChangeFrontMarker = function() {
            this.renderer.updateFrontMarkers();
        }, this.onChangeBackMarker = function() {
            this.renderer.updateBackMarkers();
        }, this.onChangeBreakpoint = function() {
            this.renderer.updateBreakpoints();
        }, this.onChangeAnnotation = function() {
            this.renderer.setAnnotations(this.session.getAnnotations());
        }, this.onChangeMode = function(e) {
            this.renderer.updateText(), this._emit("changeMode", e);
        }, this.onChangeWrapLimit = function() {
            this.renderer.updateFull();
        }, this.onChangeWrapMode = function() {
            this.renderer.onResize(!0);
        }, this.onChangeFold = function() {
            this.$updateHighlightActiveLine(), this.renderer.updateFull();
        }, this.getSelectedText = function() {
            return this.session.getTextRange(this.getSelectionRange());
        }, this.getCopyText = function() {
            var e = this.getSelectedText();
            return this._signal("copy", e), e;
        }, this.onCopy = function() {
            this.commands.exec("copy", this);
        }, this.onCut = function() {
            this.commands.exec("cut", this);
        }, this.onPaste = function(e) {
            if (this.$readOnly) {
                return;
            }
            this._emit("paste", e), this.insert(e);
        }, this.execCommand = function(e, t) {
            this.commands.exec(e, this, t);
        }, this.insert = function(e) {
            var t = this.session;
            var n = t.getMode();
            var r = this.getCursorPosition();
            if (this.getBehavioursEnabled()) {
                var i = n.transformAction(t.getState(r.row), "insertion", this, t, e);
                if (i) {
                    if (e !== i.text) {
                        this.session.mergeUndoDeltas = !1, this.$mergeNextCommand = !1;
                    }
                    e = i.text;
                }
            }
            if ("  " == e) {
                e = this.session.getTabString();
            }
            if (!this.selection.isEmpty()) {
                var s = this.getSelectionRange();
                r = this.session.remove(s), this.clearSelection();
            } else {
                if (this.session.getOverwrite()) {
                    var s = new p.fromPoints(r, r);
                    s.end.column += e.length, this.session.remove(s);
                }
            }
            if ("\n" == e || "\r\n" == e) {
                var o = t.getLine(r.row);
                if (r.column > o.search(/\S|$/)) {
                    var u = o.substr(r.column).search(/\S|$/);
                    t.doc.removeInLine(r.row, r.column, r.column + u);
                }
            }
            this.clearSelection();
            var a = r.column;
            var f = t.getState(r.row);
            var o = t.getLine(r.row);
            var l = n.checkOutdent(f, o, e);
            var c = t.insert(r, e);
            if (i && i.selection) {
                if (2 == i.selection.length) {
                    this.selection.setSelectionRange(new p(r.row, a + i.selection[0], r.row, a + i.selection[1]));
                } else {
                    this.selection.setSelectionRange(new p(r.row + i.selection[0], i.selection[1], r.row + i.selection[2], i.selection[3]));
                }
            }
            if (t.getDocument().isNewLine(e)) {
                var h = n.getNextLineIndent(f, o.slice(0, r.column), t.getTabString());
                t.insert({
                    row: r.row + 1,
                    column: 0
                }, h);
            }
            if (l) {
                n.autoOutdent(f, t, r.row);
            }
        }, this.onTextInput = function(e) {
            this.keyBinding.onTextInput(e);
        }, this.onCommandKey = function(e, t, n) {
            this.keyBinding.onCommandKey(e, t, n);
        }, this.setOverwrite = function(e) {
            this.session.setOverwrite(e);
        }, this.getOverwrite = function() {
            return this.session.getOverwrite();
        }, this.toggleOverwrite = function() {
            this.session.toggleOverwrite();
        }, this.setScrollSpeed = function(e) {
            this.setOption("scrollSpeed", e);
        }, this.getScrollSpeed = function() {
            return this.getOption("scrollSpeed");
        }, this.setDragDelay = function(e) {
            this.setOption("dragDelay", e);
        }, this.getDragDelay = function() {
            return this.getOption("dragDelay");
        }, this.setSelectionStyle = function(e) {
            this.setOption("selectionStyle", e);
        }, this.getSelectionStyle = function() {
            return this.getOption("selectionStyle");
        }, this.setHighlightActiveLine = function(e) {
            this.setOption("highlightActiveLine", e);
        }, this.getHighlightActiveLine = function() {
            return this.getOption("highlightActiveLine");
        }, this.setHighlightGutterLine = function(e) {
            this.setOption("highlightGutterLine", e);
        }, this.getHighlightGutterLine = function() {
            return this.getOption("highlightGutterLine");
        }, this.setHighlightSelectedWord = function(e) {
            this.setOption("highlightSelectedWord", e);
        }, this.getHighlightSelectedWord = function() {
            return this.$highlightSelectedWord;
        }, this.setAnimatedScroll = function(e) {
            this.renderer.setAnimatedScroll(e);
        }, this.getAnimatedScroll = function() {
            return this.renderer.getAnimatedScroll();
        }, this.setShowInvisibles = function(e) {
            this.renderer.setShowInvisibles(e);
        }, this.getShowInvisibles = function() {
            return this.renderer.getShowInvisibles();
        }, this.setDisplayIndentGuides = function(e) {
            this.renderer.setDisplayIndentGuides(e);
        }, this.getDisplayIndentGuides = function() {
            return this.renderer.getDisplayIndentGuides();
        }, this.setShowPrintMargin = function(e) {
            this.renderer.setShowPrintMargin(e);
        }, this.getShowPrintMargin = function() {
            return this.renderer.getShowPrintMargin();
        }, this.setPrintMarginColumn = function(e) {
            this.renderer.setPrintMarginColumn(e);
        }, this.getPrintMarginColumn = function() {
            return this.renderer.getPrintMarginColumn();
        }, this.setReadOnly = function(e) {
            this.setOption("readOnly", e);
        }, this.getReadOnly = function() {
            return this.getOption("readOnly");
        }, this.setBehavioursEnabled = function(e) {
            this.setOption("behavioursEnabled", e);
        }, this.getBehavioursEnabled = function() {
            return this.getOption("behavioursEnabled");
        }, this.setWrapBehavioursEnabled = function(e) {
            this.setOption("wrapBehavioursEnabled", e);
        }, this.getWrapBehavioursEnabled = function() {
            return this.getOption("wrapBehavioursEnabled");
        }, this.setShowFoldWidgets = function(e) {
            this.setOption("showFoldWidgets", e);
        }, this.getShowFoldWidgets = function() {
            return this.getOption("showFoldWidgets");
        }, this.setFadeFoldWidgets = function(e) {
            this.setOption("fadeFoldWidgets", e);
        }, this.getFadeFoldWidgets = function() {
            return this.getOption("fadeFoldWidgets");
        }, this.remove = function(e) {
            if (this.selection.isEmpty()) {
                if ("left" == e) {
                    this.selection.selectLeft();
                } else {
                    this.selection.selectRight();
                }
            }
            var t = this.getSelectionRange();
            if (this.getBehavioursEnabled()) {
                var n = this.session;
                var r = n.getState(t.start.row);
                var i = n.getMode().transformAction(r, "deletion", this, n, t);
                if (0 == t.end.column) {
                    var s = n.getTextRange(t);
                    if ("\n" == s[s.length - 1]) {
                        var o = n.getLine(t.end.row);
                        if (/^\s+$/.test(o)) {
                            t.end.column = o.length;
                        }
                    }
                }
                if (i) {
                    t = i;
                }
            }
            this.session.remove(t), this.clearSelection();
        }, this.removeWordRight = function() {
            if (this.selection.isEmpty()) {
                this.selection.selectWordRight();
            }
            this.session.remove(this.getSelectionRange()), this.clearSelection();
        }, this.removeWordLeft = function() {
            if (this.selection.isEmpty()) {
                this.selection.selectWordLeft();
            }
            this.session.remove(this.getSelectionRange()), this.clearSelection();
        }, this.removeToLineStart = function() {
            if (this.selection.isEmpty()) {
                this.selection.selectLineStart();
            }
            this.session.remove(this.getSelectionRange()), this.clearSelection();
        }, this.removeToLineEnd = function() {
            if (this.selection.isEmpty()) {
                this.selection.selectLineEnd();
            }
            var e = this.getSelectionRange();
            if (e.start.column == e.end.column && e.start.row == e.end.row) {
                e.end.column = 0, e.end.row++;
            }
            this.session.remove(e), this.clearSelection();
        }, this.splitLine = function() {
            if (!this.selection.isEmpty()) {
                this.session.remove(this.getSelectionRange()), this.clearSelection();
            }
            var e = this.getCursorPosition();
            this.insert("\n"), this.moveCursorToPosition(e);
        }, this.transposeLetters = function() {
            if (!this.selection.isEmpty()) {
                return;
            }
            var e = this.getCursorPosition();
            var t = e.column;
            if (0 === t) {
                return;
            }
            var n = this.session.getLine(e.row);
            var r, i;
            if (t < n.length) {
                r = n.charAt(t) + n.charAt(t - 1), i = new p(e.row, t - 1, e.row, t + 1);
            } else {
                r = n.charAt(t - 1) + n.charAt(t - 2), i = new p(e.row, t - 2, e.row, t);
            }
            this.session.replace(i, r);
        }, this.toLowerCase = function() {
            var e = this.getSelectionRange();
            if (this.selection.isEmpty()) {
                this.selection.selectWord();
            }
            var t = this.getSelectionRange();
            var n = this.session.getTextRange(t);
            this.session.replace(t, n.toLowerCase()), this.selection.setSelectionRange(e);
        }, this.toUpperCase = function() {
            var e = this.getSelectionRange();
            if (this.selection.isEmpty()) {
                this.selection.selectWord();
            }
            var t = this.getSelectionRange();
            var n = this.session.getTextRange(t);
            this.session.replace(t, n.toUpperCase()), this.selection.setSelectionRange(e);
        }, this.indent = function() {
            var e = this.session;
            var t = this.getSelectionRange();
            if (t.start.row < t.end.row) {
                var n = this.$getSelectedRows();
                return void e.indentRows(n.first, n.last, " ");
            } else {
                if (t.start.column < t.end.column) {
                    var r = e.getTextRange(t);
                    if (!/^\s+$/.test(r)) {
                        var n = this.$getSelectedRows();
                        return void e.indentRows(n.first, n.last, " ");
                    }
                }
            }
            var i = e.getLine(t.start.row);
            var o = t.start;
            var u = e.getTabSize();
            var a = e.documentToScreenColumn(o.row, o.column);
            if (this.session.getUseSoftTabs()) {
                var f = u - a % u;
                var l = s.stringRepeat(" ", f);
            } else {
                var f = a % u;
                while (" " == i[t.start.column] && f) {
                    t.start.column--, f--;
                }
                this.selection.setSelectionRange(t), l = "    ";
            }
            return this.insert(l);
        }, this.blockIndent = function() {
            var e = this.$getSelectedRows();
            this.session.indentRows(e.first, e.last, " ");
        }, this.blockOutdent = function() {
            var e = this.session.getSelection();
            this.session.outdentRows(e.getRange());
        }, this.sortLines = function() {
            var e = this.$getSelectedRows();
            var t = this.session;
            var n = [];
            for (i = e.first; i <= e.last; i++) {
                n.push(t.getLine(i));
            }
            n.sort(function(e, t) {
                if (e.toLowerCase() < t.toLowerCase()) {
                    return -1;
                }
                if (e.toLowerCase() > t.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            var r = new p(0, 0, 0, 0);
            for (var i = e.first; i <= e.last; i++) {
                var s = t.getLine(i);
                r.start.row = i, r.end.row = i, r.end.column = s.length, t.replace(r, n[i - e.first]);
            }
        }, this.toggleCommentLines = function() {
            var e = this.session.getState(this.getCursorPosition().row);
            var t = this.$getSelectedRows();
            this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last);
        }, this.toggleBlockComment = function() {
            var e = this.getCursorPosition();
            var t = this.session.getState(e.row);
            var n = this.getSelectionRange();
            this.session.getMode().toggleBlockComment(t, this.session, n, e);
        }, this.getNumberAt = function(e, t) {
            var n = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
            n.lastIndex = 0;
            var r = this.session.getLine(e);
            while (n.lastIndex < t) {
                var i = n.exec(r);
                if (i.index <= t && i.index + i[0].length >= t) {
                    var s = {
                        value: i[0],
                        start: i.index,
                        end: i.index + i[0].length
                    };
                    return s;
                }
            }
            return null;
        }, this.modifyNumber = function(e) {
            var t = this.selection.getCursor().row;
            var n = this.selection.getCursor().column;
            var r = new p(t, n - 1, t, n);
            var i = this.session.getTextRange(r);
            if (!isNaN(parseFloat(i)) && isFinite(i)) {
                var s = this.getNumberAt(t, n);
                if (s) {
                    var o = s.value.indexOf(".") >= 0 ? s.start + s.value.indexOf(".") + 1 : s.end;
                    var u = s.start + s.value.length - o;
                    var a = parseFloat(s.value);
                    if (a *= Math.pow(10, u), o !== s.end && o > n) {
                        e *= Math.pow(10, s.end - n - 1);
                    } else {
                        e *= Math.pow(10, s.end - n);
                    }
                    a += e, a /= Math.pow(10, u);
                    var f = a.toFixed(u);
                    var l = new p(t, s.start, t, s.end);
                    this.session.replace(l, f), this.moveCursorTo(t, Math.max(s.start + 1, n + f.length - s.value.length));
                }
            }
        }, this.removeLines = function() {
            var e = this.$getSelectedRows();
            var t;
            if (0 === e.first || e.last + 1 < this.session.getLength()) {
                t = new p(e.first, 0, e.last + 1, 0);
            } else {
                t = new p(e.first - 1, this.session.getLine(e.first - 1).length, e.last, this.session.getLine(e.last).length);
            }
            this.session.remove(t), this.clearSelection();
        }, this.duplicateSelection = function() {
            var e = this.selection;
            var t = this.session;
            var n = e.getRange();
            var r = e.isBackwards();
            if (n.isEmpty()) {
                var i = n.start.row;
                t.duplicateLines(i, i);
            } else {
                var s = r ? n.start : n.end;
                var o = t.insert(s, t.getTextRange(n), !1);
                n.start = s, n.end = o, e.setSelectionRange(n, r);
            }
        }, this.moveLinesDown = function() {
            this.$moveLines(function(e, t) {
                return this.session.moveLinesDown(e, t);
            });
        }, this.moveLinesUp = function() {
            this.$moveLines(function(e, t) {
                return this.session.moveLinesUp(e, t);
            });
        }, this.moveText = function(e, t, n) {
            return this.session.moveText(e, t, n);
        }, this.copyLinesUp = function() {
            this.$moveLines(function(e, t) {
                return this.session.duplicateLines(e, t), 0;
            });
        }, this.copyLinesDown = function() {
            this.$moveLines(function(e, t) {
                return this.session.duplicateLines(e, t);
            });
        }, this.$moveLines = function(e) {
            var t = this.selection;
            if (!t.inMultiSelectMode || this.inVirtualSelectionMode) {
                var n = t.toOrientedRange();
                var r = this.$getSelectedRows(n);
                var i = e.call(this, r.first, r.last);
                n.moveBy(i, 0), t.fromOrientedRange(n);
            } else {
                var s = t.rangeList.ranges;
                t.rangeList.detach(this.session);
                for (var o = s.length; o--; ) {
                    var u = o;
                    var r = s[o].collapseRows();
                    var a = r.end.row;
                    var f = r.start.row;
                    while (o--) {
                        var r = s[o].collapseRows();
                        if (f - r.end.row <= 1) {
                            f = r.end.row;
                        } else {
                            break;
                        }
                    }
                    o++;
                    var i = e.call(this, f, a);
                    while (u >= o) {
                        s[u].moveBy(i, 0), u--;
                    }
                }
                t.fromOrientedRange(t.ranges[0]), t.rangeList.attach(this.session);
            }
        }, this.$getSelectedRows = function() {
            var e = this.getSelectionRange().collapseRows();
            return {
                first: e.start.row,
                last: e.end.row
            };
        }, this.onCompositionStart = function(e) {
            this.renderer.showComposition(this.getCursorPosition());
        }, this.onCompositionUpdate = function(e) {
            this.renderer.setCompositionText(e);
        }, this.onCompositionEnd = function() {
            this.renderer.hideComposition();
        }, this.getFirstVisibleRow = function() {
            return this.renderer.getFirstVisibleRow();
        }, this.getLastVisibleRow = function() {
            return this.renderer.getLastVisibleRow();
        }, this.isRowVisible = function(e) {
            return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow();
        }, this.isRowFullyVisible = function(e) {
            return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow();
        }, this.$getVisibleRowCount = function() {
            return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1;
        }, this.$moveByPage = function(e, t) {
            var n = this.renderer;
            var r = this.renderer.layerConfig;
            var i = e * Math.floor(r.height / r.lineHeight);
            if (this.$blockScrolling++, 1 == t) {
                this.selection.$moveSelection(function() {
                    this.moveCursorBy(i, 0);
                });
            } else {
                if (0 == t) {
                    this.selection.moveCursorBy(i, 0), this.selection.clearSelection();
                }
            }
            this.$blockScrolling--;
            var s = n.scrollTop;
            if (n.scrollBy(0, i * r.lineHeight), null != t) {
                n.scrollCursorIntoView(null, .5);
            }
            n.animateScrolling(s);
        }, this.selectPageDown = function() {
            this.$moveByPage(1, !0);
        }, this.selectPageUp = function() {
            this.$moveByPage(-1, !0);
        }, this.gotoPageDown = function() {
            this.$moveByPage(1, !1);
        }, this.gotoPageUp = function() {
            this.$moveByPage(-1, !1);
        }, this.scrollPageDown = function() {
            this.$moveByPage(1);
        }, this.scrollPageUp = function() {
            this.$moveByPage(-1);
        }, this.scrollToRow = function(e) {
            this.renderer.scrollToRow(e);
        }, this.scrollToLine = function(e, t, n, r) {
            this.renderer.scrollToLine(e, t, n, r);
        }, this.centerSelection = function() {
            var e = this.getSelectionRange();
            var t = {
                row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2),
                column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2)
            };
            this.renderer.alignCursor(t, .5);
        }, this.getCursorPosition = function() {
            return this.selection.getCursor();
        }, this.getCursorPositionScreen = function() {
            return this.session.documentToScreenPosition(this.getCursorPosition());
        }, this.getSelectionRange = function() {
            return this.selection.getRange();
        }, this.selectAll = function() {
            this.$blockScrolling += 1, this.selection.selectAll(), this.$blockScrolling -= 1;
        }, this.clearSelection = function() {
            this.selection.clearSelection();
        }, this.moveCursorTo = function(e, t) {
            this.selection.moveCursorTo(e, t);
        }, this.moveCursorToPosition = function(e) {
            this.selection.moveCursorToPosition(e);
        }, this.jumpToMatching = function(e) {
            var t = this.getCursorPosition();
            var n = this.session.getBracketRange(t);
            if (!n) {
                if (n = this.find({
                    needle: /[{}()\[\]]/g,
                    preventScroll: !0,
                    start: {
                        row: t.row,
                        column: t.column - 1
                    }
                }), !n) {
                    return;
                }
                var r = n.start;
                if (r.row == t.row && Math.abs(r.column - t.column) < 2) {
                    n = this.session.getBracketRange(r);
                }
            }
            if (r = n && n.cursor || r, r) {
                if (e) {
                    if (n && n.isEqual(this.getSelectionRange())) {
                        this.clearSelection();
                    } else {
                        this.selection.selectTo(r.row, r.column);
                    }
                } else {
                    this.clearSelection(), this.moveCursorTo(r.row, r.column);
                }
            }
        }, this.gotoLine = function(e, t, n) {
            if (this.selection.clearSelection(), this.session.unfold({
                row: e - 1,
                column: t || 0
            }), this.$blockScrolling += 1, this.exitMultiSelectMode && this.exitMultiSelectMode(), 
            this.moveCursorTo(e - 1, t || 0), this.$blockScrolling -= 1, !this.isRowFullyVisible(e - 1)) {
                this.scrollToLine(e - 1, !0, n);
            }
        }, this.navigateTo = function(e, t) {
            this.clearSelection(), this.moveCursorTo(e, t);
        }, this.navigateUp = function(e) {
            if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
                var t = this.selection.anchor.getPosition();
                return this.moveCursorToPosition(t);
            }
            this.selection.clearSelection(), e = e || 1, this.selection.moveCursorBy(-e, 0);
        }, this.navigateDown = function(e) {
            if (this.selection.isMultiLine() && this.selection.isBackwards()) {
                var t = this.selection.anchor.getPosition();
                return this.moveCursorToPosition(t);
            }
            this.selection.clearSelection(), e = e || 1, this.selection.moveCursorBy(e, 0);
        }, this.navigateLeft = function(e) {
            if (!this.selection.isEmpty()) {
                var t = this.getSelectionRange().start;
                this.moveCursorToPosition(t);
            } else {
                e = e || 1;
                while (e--) {
                    this.selection.moveCursorLeft();
                }
            }
            this.clearSelection();
        }, this.navigateRight = function(e) {
            if (!this.selection.isEmpty()) {
                var t = this.getSelectionRange().end;
                this.moveCursorToPosition(t);
            } else {
                e = e || 1;
                while (e--) {
                    this.selection.moveCursorRight();
                }
            }
            this.clearSelection();
        }, this.navigateLineStart = function() {
            this.selection.moveCursorLineStart(), this.clearSelection();
        }, this.navigateLineEnd = function() {
            this.selection.moveCursorLineEnd(), this.clearSelection();
        }, this.navigateFileEnd = function() {
            var e = this.renderer.scrollTop;
            this.selection.moveCursorFileEnd(), this.clearSelection(), this.renderer.animateScrolling(e);
        }, this.navigateFileStart = function() {
            var e = this.renderer.scrollTop;
            this.selection.moveCursorFileStart(), this.clearSelection(), this.renderer.animateScrolling(e);
        }, this.navigateWordRight = function() {
            this.selection.moveCursorWordRight(), this.clearSelection();
        }, this.navigateWordLeft = function() {
            this.selection.moveCursorWordLeft(), this.clearSelection();
        }, this.replace = function(e, t) {
            if (t) {
                this.$search.set(t);
            }
            var n = this.$search.find(this.session);
            var r = 0;
            if (!n) {
                return r;
            }
            if (this.$tryReplace(n, e)) {
                r = 1;
            }
            if (null !== n) {
                this.selection.setSelectionRange(n), this.renderer.scrollSelectionIntoView(n.start, n.end);
            }
            return r;
        }, this.replaceAll = function(e, t) {
            if (t) {
                this.$search.set(t);
            }
            var n = this.$search.findAll(this.session);
            var r = 0;
            if (!n.length) {
                return r;
            }
            this.$blockScrolling += 1;
            var i = this.getSelectionRange();
            this.clearSelection(), this.selection.moveCursorTo(0, 0);
            for (var s = n.length - 1; s >= 0; --s) {
                if (this.$tryReplace(n[s], e)) {
                    r++;
                }
            }
            return this.selection.setSelectionRange(i), this.$blockScrolling -= 1, r;
        }, this.$tryReplace = function(e, t) {
            var n = this.session.getTextRange(e);
            if (t = this.$search.replace(n, t), null !== t) {
                return e.end = this.session.replace(e, t), e;
            } else {
                return null;
            }
        }, this.getLastSearchOptions = function() {
            return this.$search.getOptions();
        }, this.find = function(e, t, n) {
            if (!t) {
                t = {};
            }
            if ("string" == typeof e || e instanceof RegExp) {
                t.needle = e;
            } else {
                if ("object" == typeof e) {
                    r.mixin(t, e);
                }
            }
            var i = this.selection.getRange();
            if (null == t.needle) {
                if (e = this.session.getTextRange(i) || this.$search.$options.needle, !e) {
                    i = this.session.getWordRange(i.start.row, i.start.column), e = this.session.getTextRange(i);
                }
                this.$search.set({
                    needle: e
                });
            }
            if (this.$search.set(t), !t.start) {
                this.$search.set({
                    start: i
                });
            }
            var s = this.$search.find(this.session);
            if (t.preventScroll) {
                return s;
            }
            if (s) {
                return this.revealRange(s, n), s;
            }
            if (t.backwards) {
                i.start = i.end;
            } else {
                i.end = i.start;
            }
            this.selection.setRange(i);
        }, this.findNext = function(e, t) {
            this.find({
                skipCurrent: !0,
                backwards: !1
            }, e, t);
        }, this.findPrevious = function(e, t) {
            this.find(e, {
                skipCurrent: !0,
                backwards: !0
            }, t);
        }, this.revealRange = function(e, t) {
            this.$blockScrolling += 1, this.session.unfold(e), this.selection.setSelectionRange(e), 
            this.$blockScrolling -= 1;
            var n = this.renderer.scrollTop;
            if (this.renderer.scrollSelectionIntoView(e.start, e.end, .5), 0 != t) {
                this.renderer.animateScrolling(n);
            }
        }, this.undo = function() {
            this.$blockScrolling++, this.session.getUndoManager().undo(), this.$blockScrolling--, 
            this.renderer.scrollCursorIntoView(null, .5);
        }, this.redo = function() {
            this.$blockScrolling++, this.session.getUndoManager().redo(), this.$blockScrolling--, 
            this.renderer.scrollCursorIntoView(null, .5);
        }, this.destroy = function() {
            this.renderer.destroy(), this._emit("destroy", this);
        }, this.setAutoScrollEditorIntoView = function(e) {
            if (e === !1) {
                return;
            }
            var t;
            var n = this;
            var r = !1;
            if (!this.$scrollAnchor) {
                this.$scrollAnchor = document.createElement("div");
            }
            var i = this.$scrollAnchor;
            i.style.cssText = "position:absolute", this.container.insertBefore(i, this.container.firstChild);
            var s = this.on("changeSelection", function() {
                r = !0;
            });
            var o = this.renderer.on("beforeRender", function() {
                if (r) {
                    t = n.renderer.container.getBoundingClientRect();
                }
            });
            var u = this.renderer.on("afterRender", function() {
                if (r && t && n.isFocused()) {
                    var e = n.renderer;
                    var s = e.$cursorLayer.$pixelPos;
                    var o = e.layerConfig;
                    var u = s.top - o.offset;
                    if (s.top >= 0 && u + t.top < 0) {
                        r = !0;
                    } else {
                        if (s.top < o.height && s.top + t.top + o.lineHeight > window.innerHeight) {
                            r = !1;
                        } else {
                            r = null;
                        }
                    }
                    if (null != r) {
                        i.style.top = u + "px", i.style.left = s.left + "px", i.style.height = o.lineHeight + "px", 
                        i.scrollIntoView(r);
                    }
                    r = t = null;
                }
            });
            this.setAutoScrollEditorIntoView = function(e) {
                if (e === !0) {
                    return;
                }
                delete this.setAutoScrollEditorIntoView, this.removeEventListener("changeSelection", s), 
                this.renderer.removeEventListener("afterRender", u), this.renderer.removeEventListener("beforeRender", o);
            };
        }, this.$resetCursorStyle = function() {
            var e = this.$cursorStyle || "ace";
            var t = this.renderer.$cursorLayer;
            if (!t) {
                return;
            }
            t.setSmoothBlinking("smooth" == e), t.isBlinking = !this.$readOnly && "wide" != e;
        };
    }).call(y.prototype), g.defineOptions(y.prototype, "editor", {
        selectionStyle: {
            set: function(e) {
                this.onSelectionChange(), this._emit("changeSelectionStyle", {
                    data: e
                });
            },
            initialValue: "line"
        },
        highlightActiveLine: {
            set: function() {
                this.$updateHighlightActiveLine();
            },
            initialValue: !0
        },
        highlightSelectedWord: {
            set: function(e) {
                this.$onSelectionChange();
            },
            initialValue: !0
        },
        readOnly: {
            set: function(e) {
                this.textInput.setReadOnly(e), this.$resetCursorStyle();
            },
            initialValue: !1
        },
        cursorStyle: {
            set: function(e) {
                this.$resetCursorStyle();
            },
            values: [ "ace", "slim", "smooth", "wide" ],
            initialValue: "ace"
        },
        mergeUndoDeltas: {
            values: [ !1, !0, "always" ],
            initialValue: !0
        },
        behavioursEnabled: {
            initialValue: !0
        },
        wrapBehavioursEnabled: {
            initialValue: !0
        },
        hScrollBarAlwaysVisible: "renderer",
        vScrollBarAlwaysVisible: "renderer",
        highlightGutterLine: "renderer",
        animatedScroll: "renderer",
        showInvisibles: "renderer",
        showPrintMargin: "renderer",
        printMarginColumn: "renderer",
        printMargin: "renderer",
        fadeFoldWidgets: "renderer",
        showFoldWidgets: "renderer",
        showGutter: "renderer",
        displayIndentGuides: "renderer",
        fontSize: "renderer",
        fontFamily: "renderer",
        maxLines: "renderer",
        minLines: "renderer",
        scrollPastEnd: "renderer",
        fixedWidthGutter: "renderer",
        scrollSpeed: "$mouseHandler",
        dragDelay: "$mouseHandler",
        dragEnabled: "$mouseHandler",
        focusTimout: "$mouseHandler",
        firstLineNumber: "session",
        overwrite: "session",
        newLineMode: "session",
        useWorker: "session",
        useSoftTabs: "session",
        tabSize: "session",
        wrap: "session",
        foldStyle: "session"
    }), t.Editor = y;
}), define("ace/lib/lang", [ "require", "exports", "module" ], function(e, t, n) {
    t.stringReverse = function(e) {
        return e.split("").reverse().join("");
    }, t.stringRepeat = function(e, t) {
        var n = "";
        while (t > 0) {
            if (1 & t) {
                n += e;
            }
            if (t >>= 1) {
                e += e;
            }
        }
        return n;
    };
    var r = /^\s\s*/;
    var i = /\s\s*$/;
    t.stringTrimLeft = function(e) {
        return e.replace(r, "");
    }, t.stringTrimRight = function(e) {
        return e.replace(i, "");
    }, t.copyObject = function(e) {
        var t = {};
        for (var n in e) {
            t[n] = e[n];
        }
        return t;
    }, t.copyArray = function(e) {
        var t = [];
        for (var n = 0, r = e.length; r > n; n++) {
            if (e[n] && "object" == typeof e[n]) {
                t[n] = this.copyObject(e[n]);
            } else {
                t[n] = e[n];
            }
        }
        return t;
    }, t.deepCopy = function(e) {
        if ("object" != typeof e) {
            return e;
        }
        var t = e.constructor();
        for (var n in e) {
            if ("object" == typeof e[n]) {
                t[n] = this.deepCopy(e[n]);
            } else {
                t[n] = e[n];
            }
        }
        return t;
    }, t.arrayToMap = function(e) {
        var t = {};
        for (var n = 0; n < e.length; n++) {
            t[e[n]] = 1;
        }
        return t;
    }, t.createMap = function(e) {
        var t = Object.create(null);
        for (var n in e) {
            t[n] = e[n];
        }
        return t;
    }, t.arrayRemove = function(e, t) {
        for (var n = 0; n <= e.length; n++) {
            if (t === e[n]) {
                e.splice(n, 1);
            }
        }
    }, t.escapeRegExp = function(e) {
        return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
    }, t.escapeHTML = function(e) {
        return e.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
    }, t.getMatchOffsets = function(e, t) {
        var n = [];
        return e.replace(t, function(e) {
            n.push({
                offset: arguments[arguments.length - 2],
                length: e.length
            });
        }), n;
    }, t.deferredCall = function(e) {
        var t = null;
        var n = function() {
            t = null, e();
        };
        var r = function(e) {
            return r.cancel(), t = setTimeout(n, e || 0), r;
        };
        return r.schedule = r, r.call = function() {
            return this.cancel(), e(), r;
        }, r.cancel = function() {
            return clearTimeout(t), t = null, r;
        }, r;
    }, t.delayedCall = function(e, t) {
        var n = null;
        var r = function() {
            n = null, e();
        };
        var i = function(e) {
            n && clearTimeout(n), n = setTimeout(r, e || t);
        };
        return i.delay = i, i.schedule = function(e) {
            if (null == n) {
                n = setTimeout(r, e || 0);
            }
        }, i.call = function() {
            this.cancel(), e();
        }, i.cancel = function() {
            n && clearTimeout(n), n = null;
        }, i.isPending = function() {
            return n;
        }, i;
    };
}), define("ace/keyboard/textinput", [ "require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang" ], function(e, t, n) {
    var r = e("../lib/event");
    var i = e("../lib/useragent");
    var s = e("../lib/dom");
    var o = e("../lib/lang");
    var u = i.isChrome < 18;
    var a = function(e, t) {
        function b(e) {
            if (h) {
                return;
            }
            if (k) {
                t = 0, r = e ? 0 : n.value.length - 1;
            } else {
                var t = e ? 2 : 1;
                var r = 2;
            }
            try {
                n.setSelectionRange(t, r);
            } catch (i) {}
        }
        function w() {
            if (h) {
                return;
            }
            if (n.value = a, i.isWebKit) {
                y.schedule();
            }
        }
        function F() {
            setTimeout(function() {
                if (p) {
                    n.style.cssText = p, p = "";
                }
                if (null == t.renderer.$keepTextAreaAtCursor) {
                    t.renderer.$keepTextAreaAtCursor = !0, t.renderer.$moveTextAreaToCursor();
                }
            }, 0);
        }
        var n = s.createElement("textarea");
        if (n.className = "ace_text-input", i.isTouchPad) {
            n.setAttribute("x-palm-disable-auto-cap", !0);
        }
        n.wrap = "off", n.autocorrect = "off", n.autocapitalize = "off", n.spellcheck = !1, 
        n.style.opacity = "0", e.insertBefore(n, e.firstChild);
        var a = "";
        var f = !1;
        var l = !1;
        var c = !1;
        var h = !1;
        var p = "";
        var d = !0;
        try {
            var v = document.activeElement === n;
        } catch (m) {}
        r.addListener(n, "blur", function() {
            t.onBlur(), v = !1;
        }), r.addListener(n, "focus", function() {
            v = !0, t.onFocus(), b();
        }), this.focus = function() {
            n.focus();
        }, this.blur = function() {
            n.blur();
        }, this.isFocused = function() {
            return v;
        };
        var g = o.delayedCall(function() {
            v && b(d);
        });
        var y = o.delayedCall(function() {
            if (!h) {
                n.value = a, v && b();
            }
        });
        if (i.isWebKit || t.addEventListener("changeSelection", function() {
            if (t.selection.isEmpty() != d) {
                d = !d, g.schedule();
            }
        }), w(), v) {
            t.onFocus();
        }
        var E = function(e) {
            return 0 === e.selectionStart && e.selectionEnd === e.value.length;
        };
        if (!n.setSelectionRange && n.createTextRange) {
            n.setSelectionRange = function(e, t) {
                var n = this.createTextRange();
                n.collapse(!0), n.moveStart("character", e), n.moveEnd("character", t), n.select();
            }, E = function(e) {
                try {
                    var t = e.ownerDocument.selection.createRange();
                } catch (n) {}
                if (!t || t.parentElement() != e) {
                    return !1;
                }
                return t.text == e.value;
            };
        }
        if (i.isOldIE) {
            var S = !1;
            var x = function(e) {
                if (S) {
                    return;
                }
                var t = n.value;
                if (h || !t || t == a) {
                    return;
                }
                if (e && t == a[0]) {
                    return T.schedule();
                }
                A(t), S = !0, w(), S = !1;
            };
            var T = o.delayedCall(x);
            r.addListener(n, "propertychange", x);
            var N = {
                13: 1,
                27: 1
            };
            r.addListener(n, "keyup", function(e) {
                if (h && (!n.value || N[e.keyCode])) {
                    setTimeout(B, 0);
                }
                if ((n.value.charCodeAt(0) || 0) < 129) {
                    return T.call();
                }
                h ? H() : P();
            }), r.addListener(n, "keydown", function(e) {
                T.schedule(50);
            });
        }
        var C = function(e) {
            if (f) {
                f = !1;
            } else {
                if (l) {
                    l = !1;
                } else {
                    if (E(n)) {
                        t.selectAll(), b();
                    } else {
                        if (k) {
                            b(t.selection.isEmpty());
                        }
                    }
                }
            }
        };
        var k = null;
        this.setInputHandler = function(e) {
            k = e;
        }, this.getInputHandler = function() {
            return k;
        };
        var L = !1;
        var A = function(e) {
            if (k) {
                e = k(e), k = null;
            }
            if (c) {
                if (b(), e) {
                    t.onPaste(e);
                }
                c = !1;
            } else {
                if (e == a.charAt(0)) {
                    if (L) {
                        t.execCommand("del", {
                            source: "ace"
                        });
                    }
                } else {
                    if (e.substring(0, 2) == a) {
                        e = e.substr(2);
                    } else {
                        if (e.charAt(0) == a.charAt(0)) {
                            e = e.substr(1);
                        } else {
                            if (e.charAt(e.length - 1) == a.charAt(0)) {
                                e = e.slice(0, -1);
                            }
                        }
                    }
                    if (e.charAt(e.length - 1) == a.charAt(0)) {
                        e = e.slice(0, -1);
                    }
                    if (e) {
                        t.onTextInput(e);
                    }
                }
            }
            if (L) {
                L = !1;
            }
        };
        var O = function(e) {
            if (h) {
                return;
            }
            var t = n.value;
            A(t), w();
        };
        var M = function(e) {
            var i = t.getCopyText();
            if (!i) {
                return void r.preventDefault(e);
            }
            var s = e.clipboardData || window.clipboardData;
            if (s && !u) {
                var o = s.setData("Text", i);
                if (o) {
                    t.onCut(), r.preventDefault(e);
                }
            }
            if (!o) {
                f = !0, n.value = i, n.select(), setTimeout(function() {
                    f = !1, w(), b(), t.onCut();
                });
            }
        };
        var _ = function(e) {
            var i = t.getCopyText();
            if (!i) {
                return void r.preventDefault(e);
            }
            var s = e.clipboardData || window.clipboardData;
            if (s && !u) {
                var o = s.setData("Text", i);
                if (o) {
                    t.onCopy(), r.preventDefault(e);
                }
            }
            if (!o) {
                l = !0, n.value = i, n.select(), setTimeout(function() {
                    l = !1, w(), b(), t.onCopy();
                });
            }
        };
        var D = function(e) {
            var s = e.clipboardData || window.clipboardData;
            if (s) {
                var o = s.getData("Text");
                if (o) {
                    t.onPaste(o);
                }
                if (i.isIE) {
                    setTimeout(b);
                }
                r.preventDefault(e);
            } else {
                n.value = "", c = !0;
            }
        };
        if (r.addCommandKeyListener(n, t.onCommandKey.bind(t)), r.addListener(n, "select", C), 
        r.addListener(n, "input", O), r.addListener(n, "cut", M), r.addListener(n, "copy", _), 
        r.addListener(n, "paste", D), !("oncut" in n && "oncopy" in n && "onpaste" in n)) {
            r.addListener(e, "keydown", function(e) {
                if (i.isMac && !e.metaKey || !e.ctrlKey) {
                    return;
                }
                switch (e.keyCode) {
                  case 67:
                    _(e);
                    break;

                  case 86:
                    D(e);
                    break;

                  case 88:
                    M(e);
                }
            });
        }
        var P = function(e) {
            if (h) {
                return;
            }
            if (h = {}, t.onCompositionStart(), setTimeout(H, 0), t.on("mousedown", B), !t.selection.isEmpty()) {
                t.insert(""), t.session.markUndoGroup(), t.selection.clearSelection();
            }
            t.session.markUndoGroup();
        };
        var H = function() {
            if (!h) {
                return;
            }
            var e = n.value.replace(/\x01/g, "");
            if (h.lastValue === e) {
                return;
            }
            if (t.onCompositionUpdate(e), h.lastValue) {
                t.undo();
            }
            if (h.lastValue = e, h.lastValue) {
                var r = t.selection.getRange();
                t.insert(h.lastValue), t.session.markUndoGroup(), h.range = t.selection.getRange(), 
                t.selection.setRange(r), t.selection.clearSelection();
            }
        };
        var B = function(e) {
            var r = h;
            h = !1;
            var i = setTimeout(function() {
                i = null;
                var e = n.value.replace(/\x01/g, "");
                if (h) {
                    return;
                } else {
                    if (e == r.lastValue) {
                        w();
                    } else {
                        if (!r.lastValue && e) {
                            w(), A(e);
                        }
                    }
                }
            });
            if (k = function(n) {
                if (i) {
                    clearTimeout(i);
                }
                if (n = n.replace(/\x01/g, ""), n == r.lastValue) {
                    return "";
                }
                if (r.lastValue && i) {
                    t.undo();
                }
                return n;
            }, t.onCompositionEnd(), t.removeListener("mousedown", B), "compositionend" == e.type && r.range) {
                t.selection.setRange(r.range);
            }
        };
        var j = o.delayedCall(H, 50);
        if (r.addListener(n, "compositionstart", P), i.isGecko) {
            r.addListener(n, "text", function() {
                j.schedule();
            });
        } else {
            r.addListener(n, "keyup", function() {
                j.schedule();
            }), r.addListener(n, "keydown", function() {
                j.schedule();
            });
        }
        if (r.addListener(n, "compositionend", B), this.getElement = function() {
            return n;
        }, this.setReadOnly = function(e) {
            n.readOnly = e;
        }, this.onContextMenu = function(e) {
            if (L = !0, !p) {
                p = n.style.cssText;
            }
            n.style.cssText = "z-index:100000;" + (i.isIE ? "opacity:0.1;" : ""), b(t.selection.isEmpty()), 
            t._emit("nativecontextmenu", {
                target: t,
                domEvent: e
            });
            var o = t.container.getBoundingClientRect();
            var u = s.computedStyle(t.container);
            var a = o.top + (parseInt(u.borderTopWidth) || 0);
            var f = o.left + (parseInt(o.borderLeftWidth) || 0);
            var l = o.bottom - a - n.clientHeight;
            var c = function(e) {
                n.style.left = e.clientX - f - 2 + "px", n.style.top = Math.min(e.clientY - a - 2, l) + "px";
            };
            if (c(e), "mousedown" != e.type) {
                return;
            }
            if (t.renderer.$keepTextAreaAtCursor) {
                t.renderer.$keepTextAreaAtCursor = null;
            }
            if (i.isWin) {
                r.capture(t.container, c, F);
            }
        }, this.onContextMenuClose = F, !i.isGecko || i.isMac) {
            var I = function(e) {
                t.textInput.onContextMenu(e), F();
            };
            r.addListener(t.renderer.scroller, "contextmenu", I), r.addListener(n, "contextmenu", I);
        }
    };
    t.TextInput = a;
}), define("ace/mouse/mouse_handler", [ "require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/config" ], function(e, t, n) {
    var r = e("../lib/event");
    var i = e("../lib/useragent");
    var s = e("./default_handlers").DefaultHandlers;
    var o = e("./default_gutter_handler").GutterHandler;
    var u = e("./mouse_event").MouseEvent;
    var a = e("./dragdrop_handler").DragdropHandler;
    var f = e("../config");
    var l = function(e) {
        this.editor = e, new s(this), new o(this), new a(this);
        var t = e.renderer.getMouseEventTarget();
        if (r.addListener(t, "click", this.onMouseEvent.bind(this, "click")), r.addListener(t, "mousemove", this.onMouseMove.bind(this, "mousemove")), 
        r.addMultiMouseDownListener(t, [ 300, 300, 250 ], this, "onMouseEvent"), e.renderer.scrollBarV) {
            r.addMultiMouseDownListener(e.renderer.scrollBarV.inner, [ 300, 300, 250 ], this, "onMouseEvent"), 
            r.addMultiMouseDownListener(e.renderer.scrollBarH.inner, [ 300, 300, 250 ], this, "onMouseEvent");
        }
        r.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel"));
        var n = e.renderer.$gutter;
        r.addListener(n, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), 
        r.addListener(n, "click", this.onMouseEvent.bind(this, "gutterclick")), r.addListener(n, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), 
        r.addListener(n, "mousemove", this.onMouseEvent.bind(this, "guttermousemove")), 
        r.addListener(t, "mousedown", function(t) {
            e.focus();
        }), r.addListener(n, "mousedown", function(t) {
            return e.focus(), r.preventDefault(t);
        });
    };
    (function() {
        this.onMouseEvent = function(e, t) {
            this.editor._emit(e, new u(t, this.editor));
        }, this.onMouseMove = function(e, t) {
            var n = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
            if (!n || !n.length) {
                return;
            }
            this.editor._emit(e, new u(t, this.editor));
        }, this.onMouseWheel = function(e, t) {
            var n = new u(t, this.editor);
            n.speed = 2 * this.$scrollSpeed, n.wheelX = t.wheelX, n.wheelY = t.wheelY, this.editor._emit(e, n);
        }, this.setState = function(e) {
            this.state = e;
        }, this.captureMouse = function(e, t) {
            this.x = e.x, this.y = e.y, this.isMousePressed = !0;
            var n = this.editor.renderer;
            if (n.$keepTextAreaAtCursor) {
                n.$keepTextAreaAtCursor = null;
            }
            var s = this;
            var o = function(e) {
                s.x = e.clientX, s.y = e.clientY, t && t(e);
            };
            var u = function(e) {
                if (clearInterval(f), a(), s[s.state + "End"] && s[s.state + "End"](e), s.$clickSelection = null, 
                null == n.$keepTextAreaAtCursor) {
                    n.$keepTextAreaAtCursor = !0, n.$moveTextAreaToCursor();
                }
                s.isMousePressed = !1, s.onMouseEvent("mouseup", e);
            };
            var a = function() {
                s[s.state] && s[s.state]();
            };
            if (i.isOldIE && "dblclick" == e.domEvent.type) {
                return setTimeout(function() {
                    u(e);
                });
            }
            r.capture(this.editor.container, o, u);
            var f = setInterval(a, 20);
        };
    }).call(l.prototype), f.defineOptions(l.prototype, "mouseHandler", {
        scrollSpeed: {
            initialValue: 2
        },
        dragDelay: {
            initialValue: 150
        },
        dragEnabled: {
            initialValue: !0
        },
        focusTimout: {
            initialValue: 0
        }
    }), t.MouseHandler = l;
}), define("ace/mouse/default_handlers", [ "require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent" ], function(e, t, n) {
    function u(e) {
        e.$clickSelection = null;
        var t = e.editor;
        t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), 
        t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), 
        t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e));
        var n = [ "select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait" ];
        n.forEach(function(t) {
            e[t] = this[t];
        }, this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange");
    }
    function a(e, t, n, r) {
        return Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2));
    }
    function f(e, t) {
        if (e.start.row == e.end.row) {
            var n = 2 * t.column - e.start.column - e.end.column;
        } else {
            if (e.start.row == e.end.row - 1 && !e.start.column && !e.end.column) {
                var n = t.column - 4;
            } else {
                var n = 2 * t.row - e.start.row - e.end.row;
            }
        }
        if (0 > n) {
            return {
                cursor: e.start,
                anchor: e.end
            };
        } else {
            return {
                cursor: e.end,
                anchor: e.start
            };
        }
    }
    var r = e("../lib/dom");
    var i = e("../lib/event");
    var s = e("../lib/useragent");
    var o = 0;
    (function() {
        this.onMouseDown = function(e) {
            var t = e.inSelection();
            var n = e.getDocumentPosition();
            this.mousedownEvent = e;
            var r = this.editor;
            var i = e.getButton();
            if (0 !== i) {
                var s = r.getSelectionRange();
                var o = s.isEmpty();
                if (o) {
                    r.moveCursorToPosition(n), r.selection.clearSelection();
                }
                return void r.textInput.onContextMenu(e.domEvent);
            }
            if (t && !r.isFocused()) {
                if (r.focus(), this.$focusTimout && !this.$clickSelection && !r.inMultiSelectMode) {
                    return this.mousedownEvent.time = new Date().getTime(), this.setState("focusWait"), 
                    void this.captureMouse(e);
                }
            }
            if (!t || this.$clickSelection || e.getShiftKey() || r.inMultiSelectMode) {
                this.startSelect(n);
            } else {
                if (t) {
                    this.mousedownEvent.time = new Date().getTime(), this.startSelect(n);
                }
            }
            return this.captureMouse(e), e.preventDefault();
        }, this.startSelect = function(e) {
            e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
            var t = this.editor;
            if (setTimeout(function() {
                if (this.mousedownEvent.getShiftKey()) {
                    t.selection.selectToPosition(e);
                } else {
                    if (!this.$clickSelection) {
                        t.moveCursorToPosition(e), t.selection.clearSelection();
                    }
                }
            }.bind(this), 0), t.renderer.scroller.setCapture) {
                t.renderer.scroller.setCapture();
            }
            t.setStyle("ace_selecting"), this.setState("select");
        }, this.select = function() {
            var e, t = this.editor;
            var n = t.renderer.screenToTextCoordinates(this.x, this.y);
            if (this.$clickSelection) {
                var r = this.$clickSelection.comparePoint(n);
                if (-1 == r) {
                    e = this.$clickSelection.end;
                } else {
                    if (1 == r) {
                        e = this.$clickSelection.start;
                    } else {
                        var i = f(this.$clickSelection, n);
                        n = i.cursor, e = i.anchor;
                    }
                }
                t.selection.setSelectionAnchor(e.row, e.column);
            }
            t.selection.selectToPosition(n), t.renderer.scrollCursorIntoView();
        }, this.extendSelectionBy = function(e) {
            var t, n = this.editor;
            var r = n.renderer.screenToTextCoordinates(this.x, this.y);
            var i = n.selection[e](r.row, r.column);
            if (this.$clickSelection) {
                var s = this.$clickSelection.comparePoint(i.start);
                var o = this.$clickSelection.comparePoint(i.end);
                if (-1 == s && 0 >= o) {
                    if (t = this.$clickSelection.end, i.end.row != r.row || i.end.column != r.column) {
                        r = i.start;
                    }
                } else {
                    if (1 == o && s >= 0) {
                        if (t = this.$clickSelection.start, i.start.row != r.row || i.start.column != r.column) {
                            r = i.end;
                        }
                    } else {
                        if (-1 == s && 1 == o) {
                            r = i.end, t = i.start;
                        } else {
                            var u = f(this.$clickSelection, r);
                            r = u.cursor, t = u.anchor;
                        }
                    }
                }
                n.selection.setSelectionAnchor(t.row, t.column);
            }
            n.selection.selectToPosition(r), n.renderer.scrollCursorIntoView();
        }, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function() {
            if (this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture) {
                this.editor.renderer.scroller.releaseCapture();
            }
        }, this.focusWait = function() {
            var e = a(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
            var t = new Date().getTime();
            if (e > o || t - this.mousedownEvent.time > this.$focusTimout) {
                this.startSelect(this.mousedownEvent.getDocumentPosition());
            }
        }, this.onDoubleClick = function(e) {
            var t = e.getDocumentPosition();
            var n = this.editor;
            var r = n.session;
            var i = r.getBracketRange(t);
            if (i) {
                if (i.isEmpty()) {
                    i.start.column--, i.end.column++;
                }
                return this.$clickSelection = i, void this.setState("select");
            }
            this.$clickSelection = n.selection.getWordRange(t.row, t.column), this.setState("selectByWords");
        }, this.onTripleClick = function(e) {
            var t = e.getDocumentPosition();
            var n = this.editor;
            this.setState("selectByLines"), this.$clickSelection = n.selection.getLineRange(t.row);
        }, this.onQuadClick = function(e) {
            var t = this.editor;
            t.selectAll(), this.$clickSelection = t.getSelectionRange(), this.setState("selectAll");
        }, this.onMouseWheel = function(e) {
            if (e.getShiftKey() || e.getAccelKey()) {
                return;
            }
            var t = e.domEvent.timeStamp;
            var n = t - (this.$lastScrollTime || 0);
            var r = this.editor;
            var i = r.renderer.isScrollableBy(e.wheelX * e.speed, e.wheelY * e.speed);
            if (i || 200 > n) {
                return this.$lastScrollTime = t, r.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), 
                e.stop();
            }
        };
    }).call(u.prototype), t.DefaultHandlers = u;
}), define("ace/mouse/default_gutter_handler", [ "require", "exports", "module", "ace/lib/dom", "ace/lib/event" ], function(e, t, n) {
    function s(e) {
        function f() {
            u = r.createElement("div"), u.className = "ace_gutter-tooltip", u.style.display = "none", 
            t.container.appendChild(u);
        }
        function l() {
            if (!u) {
                f();
            }
            var e = o.getDocumentPosition().row;
            var r = n.$annotations[e];
            if (!r) {
                return c();
            }
            var i = t.session.getLength();
            if (e == i) {
                var s = t.renderer.pixelToScreenCoordinates(0, o.y).row;
                var l = o.$pos;
                if (s > t.session.documentToScreenRow(l.row, l.column)) {
                    return c();
                }
            }
            if (a == r) {
                return;
            }
            a = r.text.join("<br/>"), u.style.display = "block", u.innerHTML = a, t.on("mousewheel", c), 
            h(o);
        }
        function c() {
            if (s) {
                s = clearTimeout(s);
            }
            if (a) {
                u.style.display = "none", a = null, t.removeEventListener("mousewheel", c);
            }
        }
        function h(e) {
            var n = t.renderer.$gutter.getBoundingClientRect();
            if (u.style.left = e.x + 15 + "px", e.y + 3 * t.renderer.lineHeight + 15 < n.bottom) {
                u.style.bottom = "", u.style.top = e.y + 15 + "px";
            } else {
                u.style.top = "";
                var r = window.innerHeight || document.documentElement.clientHeight;
                u.style.bottom = r - e.y + 5 + "px";
            }
        }
        var t = e.editor;
        var n = t.renderer.$gutterLayer;
        e.editor.setDefaultHandler("guttermousedown", function(r) {
            if (!t.isFocused() || 0 != r.getButton()) {
                return;
            }
            var i = n.getRegion(r);
            if ("foldWidgets" == i) {
                return;
            }
            var s = r.getDocumentPosition().row;
            var o = t.session.selection;
            if (r.getShiftKey()) {
                o.selectTo(s, 0);
            } else {
                if (2 == r.domEvent.detail) {
                    return t.selectAll(), r.preventDefault();
                }
                e.$clickSelection = t.selection.getLineRange(s);
            }
            return e.setState("selectByLines"), e.captureMouse(r), r.preventDefault();
        });
        var s, o, u, a;
        e.editor.setDefaultHandler("guttermousemove", function(t) {
            var n = t.domEvent.target || t.domEvent.srcElement;
            if (r.hasCssClass(n, "ace_fold-widget")) {
                return c();
            }
            if (a) {
                h(t);
            }
            if (o = t, s) {
                return;
            }
            s = setTimeout(function() {
                if (s = null, o && !e.isMousePressed) {
                    l();
                } else {
                    c();
                }
            }, 50);
        }), i.addListener(t.renderer.$gutter, "mouseout", function(e) {
            if (o = null, !a || s) {
                return;
            }
            s = setTimeout(function() {
                s = null, c();
            }, 50);
        }), t.on("changeSession", c);
    }
    var r = e("../lib/dom");
    var i = e("../lib/event");
    t.GutterHandler = s;
}), define("ace/mouse/mouse_event", [ "require", "exports", "module", "ace/lib/event", "ace/lib/useragent" ], function(e, t, n) {
    var r = e("../lib/event");
    var i = e("../lib/useragent");
    var s = t.MouseEvent = function(e, t) {
        this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, 
        this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1;
    };
    (function() {
        this.stopPropagation = function() {
            r.stopPropagation(this.domEvent), this.propagationStopped = !0;
        }, this.preventDefault = function() {
            r.preventDefault(this.domEvent), this.defaultPrevented = !0;
        }, this.stop = function() {
            this.stopPropagation(), this.preventDefault();
        }, this.getDocumentPosition = function() {
            if (this.$pos) {
                return this.$pos;
            }
            return this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), 
            this.$pos;
        }, this.inSelection = function() {
            if (null !== this.$inSelection) {
                return this.$inSelection;
            }
            var e = this.editor;
            var t = e.getSelectionRange();
            if (t.isEmpty()) {
                this.$inSelection = !1;
            } else {
                var n = this.getDocumentPosition();
                this.$inSelection = t.contains(n.row, n.column);
            }
            return this.$inSelection;
        }, this.getButton = function() {
            return r.getButton(this.domEvent);
        }, this.getShiftKey = function() {
            return this.domEvent.shiftKey;
        }, this.getAccelKey = i.isMac ? function() {
            return this.domEvent.metaKey;
        } : function() {
            return this.domEvent.ctrlKey;
        };
    }).call(s.prototype);
}), define("ace/mouse/dragdrop_handler", [ "require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent" ], function(e, t, n) {
    function f(e) {
        function T(e, n) {
            var r = new Date().getTime();
            var i = !n || e.row != n.row;
            var s = !n || e.column != n.column;
            if (!S || i || s) {
                t.$blockScrolling += 1, t.moveCursorToPosition(e), t.$blockScrolling -= 1, S = r, 
                x = {
                    x: p,
                    y: d
                };
            } else {
                var o = l(x.x, x.y, p, d);
                if (o > a) {
                    S = null;
                } else {
                    if (r - S >= u) {
                        t.renderer.scrollCursorIntoView(), S = null;
                    }
                }
            }
        }
        function N(e, n) {
            var r = new Date().getTime();
            var i = t.renderer.layerConfig.lineHeight;
            var s = t.renderer.layerConfig.characterWidth;
            var u = t.renderer.scroller.getBoundingClientRect();
            var a = {
                x: {
                    left: p - u.left,
                    right: u.right - p
                },
                y: {
                    top: d - u.top,
                    bottom: u.bottom - d
                }
            };
            var f = Math.min(a.x.left, a.x.right);
            var l = Math.min(a.y.top, a.y.bottom);
            var c = {
                row: e.row,
                column: e.column
            };
            if (2 >= f / s) {
                c.column += a.x.left < a.x.right ? -3 : 2;
            }
            if (1 >= l / i) {
                c.row += a.y.top < a.y.bottom ? -1 : 1;
            }
            var h = e.row != c.row;
            var v = e.column != c.column;
            var m = !n || e.row != n.row;
            if (h || v && !m) {
                if (!E) {
                    E = r;
                } else {
                    if (r - E >= o) {
                        t.renderer.scrollCursorIntoView(c);
                    }
                }
            } else {
                E = null;
            }
        }
        function C() {
            var e = g;
            g = t.renderer.screenToTextCoordinates(p, d), T(g, e), N(g, e);
        }
        function k() {
            if (m = t.selection.toOrientedRange(), h = t.session.addMarker(m, "ace_selection", t.getSelectionStyle()), 
            t.clearSelection(), t.isFocused()) {
                t.renderer.$cursorLayer.setBlinking(!1);
            }
            clearInterval(v), v = setInterval(C, 20), y = 0, i.addListener(document, "mousemove", O);
        }
        function L() {
            if (clearInterval(v), t.session.removeMarker(h), h = null, t.$blockScrolling += 1, 
            t.selection.fromOrientedRange(m), t.$blockScrolling -= 1, t.isFocused() && !w) {
                t.renderer.$cursorLayer.setBlinking(!t.getReadOnly());
            }
            m = null, y = 0, E = null, S = null, i.removeListener(document, "mousemove", O);
        }
        function O() {
            if (null == A) {
                A = setTimeout(function() {
                    if (null != A && h) {
                        L();
                    }
                }, 20);
            }
        }
        function M(e) {
            var t = e.types;
            return !t || Array.prototype.some.call(t, function(e) {
                return "text/plain" == e || "Text" == e;
            });
        }
        function _(e) {
            var t = [ "copy", "copymove", "all", "uninitialized" ];
            var n = [ "move", "copymove", "linkmove", "all", "uninitialized" ];
            var r = s.isMac ? e.altKey : e.ctrlKey;
            var i = "uninitialized";
            try {
                i = e.dataTransfer.effectAllowed.toLowerCase();
            } catch (e) {}
            var o = "none";
            if (r && t.indexOf(i) >= 0) {
                o = "copy";
            } else {
                if (n.indexOf(i) >= 0) {
                    o = "move";
                } else {
                    if (t.indexOf(i) >= 0) {
                        o = "copy";
                    }
                }
            }
            return o;
        }
        var t = e.editor;
        var n = r.createElement("img");
        if (n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 
        s.isOpera) {
            n.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;";
        }
        var f = [ "dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag" ];
        f.forEach(function(t) {
            e[t] = this[t];
        }, this), t.addEventListener("mousedown", this.onMouseDown.bind(e));
        var c = t.container;
        var h, p, d;
        var v, m;
        var g, y = 0;
        var b;
        var w;
        var E;
        var S;
        var x;
        this.onDragStart = function(e) {
            if (this.cancelDrag || !c.draggable) {
                var r = this;
                return setTimeout(function() {
                    r.startSelect(), r.captureMouse(e);
                }, 0), e.preventDefault();
            }
            m = t.getSelectionRange();
            var i = e.dataTransfer;
            if (i.effectAllowed = t.getReadOnly() ? "copy" : "copyMove", s.isOpera) {
                t.container.appendChild(n), n._top = n.offsetTop;
            }
            if (i.setDragImage && i.setDragImage(n, 0, 0), s.isOpera) {
                t.container.removeChild(n);
            }
            i.clearData(), i.setData("Text", t.session.getTextRange()), w = !0, this.setState("drag");
        }, this.onDragEnd = function(e) {
            if (c.draggable = !1, w = !1, this.setState(null), !t.getReadOnly()) {
                var n = e.dataTransfer.dropEffect;
                if (!b && "move" == n) {
                    t.session.remove(t.getSelectionRange());
                }
                t.renderer.$cursorLayer.setBlinking(!0);
            }
            this.editor.unsetStyle("ace_dragging");
        }, this.onDragEnter = function(e) {
            if (t.getReadOnly() || !M(e.dataTransfer)) {
                return;
            }
            if (!h) {
                k();
            }
            return y++, e.dataTransfer.dropEffect = b = _(e), i.preventDefault(e);
        }, this.onDragOver = function(e) {
            if (t.getReadOnly() || !M(e.dataTransfer)) {
                return;
            }
            if (!h) {
                k(), y++;
            }
            if (null !== A) {
                A = null;
            }
            return p = e.clientX, d = e.clientY, e.dataTransfer.dropEffect = b = _(e), i.preventDefault(e);
        }, this.onDragLeave = function(e) {
            if (y--, 0 >= y && h) {
                return L(), b = null, i.preventDefault(e);
            }
        }, this.onDrop = function(e) {
            if (!h) {
                return;
            }
            var n = e.dataTransfer;
            if (w) {
                switch (b) {
                  case "move":
                    if (m.contains(g.row, g.column)) {
                        m = {
                            start: g,
                            end: g
                        };
                    } else {
                        m = t.moveText(m, g);
                    }
                    break;

                  case "copy":
                    m = t.moveText(m, g, !0);
                }
            } else {
                var r = n.getData("Text");
                m = {
                    start: g,
                    end: t.session.insert(g, r)
                }, t.focus(), b = null;
            }
            return L(), i.preventDefault(e);
        }, i.addListener(c, "dragstart", this.onDragStart.bind(e)), i.addListener(c, "dragend", this.onDragEnd.bind(e)), 
        i.addListener(c, "dragenter", this.onDragEnter.bind(e)), i.addListener(c, "dragover", this.onDragOver.bind(e)), 
        i.addListener(c, "dragleave", this.onDragLeave.bind(e)), i.addListener(c, "drop", this.onDrop.bind(e));
        var A = null;
    }
    function l(e, t, n, r) {
        return Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2));
    }
    var r = e("../lib/dom");
    var i = e("../lib/event");
    var s = e("../lib/useragent");
    var o = 200;
    var u = 200;
    var a = 5;
    (function() {
        this.dragWait = function() {
            var e = new Date().getTime() - this.mousedownEvent.time;
            if (e > this.editor.getDragDelay()) {
                this.startDrag();
            }
        }, this.dragWaitEnd = function() {
            var e = this.editor.container;
            e.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd();
        }, this.dragReadyEnd = function(e) {
            this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly()), this.editor.unsetStyle("ace_dragging"), 
            this.dragWaitEnd();
        }, this.startDrag = function() {
            this.cancelDrag = !1;
            var e = this.editor.container;
            e.draggable = !0, this.editor.renderer.$cursorLayer.setBlinking(!1), this.editor.setStyle("ace_dragging"), 
            this.setState("dragReady");
        }, this.onMouseDrag = function(e) {
            var t = this.editor.container;
            if (s.isIE && "dragReady" == this.state) {
                var n = l(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                if (n > 3) {
                    t.dragDrop();
                }
            }
            if ("dragWait" === this.state) {
                var n = l(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                if (n > 0) {
                    t.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition());
                }
            }
        }, this.onMouseDown = function(e) {
            if (!this.$dragEnabled) {
                return;
            }
            this.mousedownEvent = e;
            var t = this.editor;
            var n = e.inSelection();
            var r = e.getButton();
            var i = e.domEvent.detail || 1;
            if (1 === i && 0 === r && n) {
                this.mousedownEvent.time = new Date().getTime();
                var o = e.domEvent.target || e.domEvent.srcElement;
                if ("unselectable" in o) {
                    o.unselectable = "on";
                }
                if (t.getDragDelay()) {
                    if (s.isWebKit) {
                        self.cancelDrag = !0;
                        var u = t.container;
                        u.draggable = !0;
                    }
                    this.setState("dragWait");
                } else {
                    this.startDrag();
                }
                this.captureMouse(e, this.onMouseDrag.bind(this)), e.defaultPrevented = !0;
            }
        };
    }).call(f.prototype), t.DragdropHandler = f;
}), define("ace/config", [ "require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter" ], function(e, t, n) {
    "no use strict";
    function f(e) {
        return e.replace(/-(.)/g, function(e, t) {
            return t.toUpperCase();
        });
    }
    var r = e("./lib/lang");
    var i = e("./lib/oop");
    var s = e("./lib/net");
    var o = e("./lib/event_emitter").EventEmitter;
    var u = function() {
        return this;
    }();
    var a = {
        packaged: !1,
        workerPath: null,
        modePath: null,
        themePath: null,
        basePath: "",
        suffix: ".js",
        $moduleUrls: {}
    };
    t.get = function(e) {
        if (!a.hasOwnProperty(e)) {
            throw new Error("Unknown config key: " + e);
        }
        return a[e];
    }, t.set = function(e, t) {
        if (!a.hasOwnProperty(e)) {
            throw new Error("Unknown config key: " + e);
        }
        a[e] = t;
    }, t.all = function() {
        return r.copyObject(a);
    }, i.implement(t, o), t.moduleUrl = function(e, t) {
        if (a.$moduleUrls[e]) {
            return a.$moduleUrls[e];
        }
        var n = e.split("/");
        t = t || n[n.length - 2] || "";
        var r = "snippets" == t ? "/" : "-";
        var i = n[n.length - 1];
        if ("-" == r) {
            var s = new RegExp("^" + t + "[\\-_]|[\\-_]" + t + "$", "g");
            i = i.replace(s, "");
        }
        if ((!i || i == t) && n.length > 1) {
            i = n[n.length - 2];
        }
        var o = a[t + "Path"];
        if (null == o) {
            o = a.basePath;
        } else {
            if ("/" == r) {
                t = r = "";
            }
        }
        if (o && "/" != o.slice(-1)) {
            o += "/";
        }
        return o + t + r + i + this.get("suffix");
    }, t.setModuleUrl = function(e, t) {
        return a.$moduleUrls[e] = t;
    }, t.$loading = {}, t.loadModule = function(n, r) {
        var i, o;
        if (Array.isArray(n)) {
            o = n[0], n = n[1];
        }
        try {
            i = e(n);
        } catch (u) {}
        if (i && !t.$loading[n]) {
            return r && r(i);
        }
        if (!t.$loading[n]) {
            t.$loading[n] = [];
        }
        if (t.$loading[n].push(r), t.$loading[n].length > 1) {
            return;
        }
        var a = function() {
            e([ n ], function(e) {
                t._emit("load.module", {
                    name: n,
                    module: e
                });
                var r = t.$loading[n];
                t.$loading[n] = null, r.forEach(function(t) {
                    t && t(e);
                });
            });
        };
        if (!t.get("packaged")) {
            return a();
        }
        s.loadScript(t.moduleUrl(n, o), a);
    }, t.init = function() {
        if (a.packaged = e.packaged || n.packaged || u.define && define.packaged, !u.document) {
            return "";
        }
        var r = {};
        var i = "";
        var s = document.getElementsByTagName("script");
        for (var o = 0; o < s.length; o++) {
            var l = s[o];
            var c = l.src || l.getAttribute("src");
            if (!c) {
                continue;
            }
            var h = l.attributes;
            for (var p = 0, d = h.length; d > p; p++) {
                var v = h[p];
                if (0 === v.name.indexOf("data-ace-")) {
                    r[f(v.name.replace(/^data-ace-/, ""))] = v.value;
                }
            }
            var m = c.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
            if (m) {
                i = m[1];
            }
        }
        if (i) {
            r.base = r.base || i, r.packaged = !0;
        }
        r.basePath = r.base, r.workerPath = r.workerPath || r.base, r.modePath = r.modePath || r.base, 
        r.themePath = r.themePath || r.base, delete r.base;
        for (var g in r) {
            if ("undefined" != typeof r[g]) {
                t.set(g, r[g]);
            }
        }
    };
    var l = {
        setOptions: function(e) {
            Object.keys(e).forEach(function(t) {
                this.setOption(t, e[t]);
            }, this);
        },
        getOptions: function(e) {
            var t = {};
            if (!e) {
                e = Object.keys(this.$options);
            } else {
                if (!Array.isArray(e)) {
                    t = e, e = Object.keys(t);
                }
            }
            return e.forEach(function(e) {
                t[e] = this.getOption(e);
            }, this), t;
        },
        setOption: function(e, t) {
            if (this["$" + e] === t) {
                return;
            }
            var n = this.$options[e];
            if (!n) {
                if ("undefined" != typeof console && console.warn) {
                    console.warn('misspelled option "' + e + '"');
                }
                return void 0;
            }
            if (n.forwardTo) {
                return this[n.forwardTo] && this[n.forwardTo].setOption(e, t);
            }
            if (!n.handlesSet) {
                this["$" + e] = t;
            }
            if (n && n.set) {
                n.set.call(this, t);
            }
        },
        getOption: function(e) {
            var t = this.$options[e];
            if (!t) {
                if ("undefined" != typeof console && console.warn) {
                    console.warn('misspelled option "' + e + '"');
                }
                return void 0;
            }
            if (t.forwardTo) {
                return this[t.forwardTo] && this[t.forwardTo].getOption(e);
            }
            return t && t.get ? t.get.call(this) : this["$" + e];
        }
    };
    var c = {};
    t.defineOptions = function(e, t, n) {
        if (!e.$options) {
            c[t] = e.$options = {};
        }
        return Object.keys(n).forEach(function(t) {
            var r = n[t];
            if ("string" == typeof r) {
                r = {
                    forwardTo: r
                };
            }
            if (r.name || (r.name = t), e.$options[r.name] = r, "initialValue" in r) {
                e["$" + r.name] = r.initialValue;
            }
        }), i.implement(e, l), this;
    }, t.resetOptions = function(e) {
        Object.keys(e.$options).forEach(function(t) {
            var n = e.$options[t];
            if ("value" in n) {
                e.setOption(t, n.value);
            }
        });
    }, t.setDefaultValue = function(e, n, r) {
        var i = c[e] || (c[e] = {});
        if (i[n]) {
            if (i.forwardTo) {
                t.setDefaultValue(i.forwardTo, n, r);
            } else {
                i[n].value = r;
            }
        }
    }, t.setDefaultValues = function(e, n) {
        Object.keys(n).forEach(function(r) {
            t.setDefaultValue(e, r, n[r]);
        });
    };
}), define("ace/lib/net", [ "require", "exports", "module", "ace/lib/dom" ], function(e, t, n) {
    var r = e("./dom");
    t.get = function(e, t) {
        var n = new XMLHttpRequest();
        n.open("GET", e, !0), n.onreadystatechange = function() {
            if (4 === n.readyState) {
                t(n.responseText);
            }
        }, n.send(null);
    }, t.loadScript = function(e, t) {
        var n = r.getDocumentHead();
        var i = document.createElement("script");
        i.src = e, n.appendChild(i), i.onload = i.onreadystatechange = function(e, n) {
            if (n || !i.readyState || "loaded" == i.readyState || "complete" == i.readyState) {
                if (i = i.onload = i.onreadystatechange = null, !n) {
                    t();
                }
            }
        };
    };
}), define("ace/lib/event_emitter", [ "require", "exports", "module" ], function(e, t, n) {
    var r = {};
    var i = function() {
        this.propagationStopped = !0;
    };
    var s = function() {
        this.defaultPrevented = !0;
    };
    r._emit = r._dispatchEvent = function(e, t) {
        this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
        var n = this._eventRegistry[e] || [];
        var r = this._defaultHandlers[e];
        if (!n.length && !r) {
            return;
        }
        if ("object" != typeof t || !t) {
            t = {};
        }
        if (!t.type) {
            t.type = e;
        }
        if (!t.stopPropagation) {
            t.stopPropagation = i;
        }
        if (!t.preventDefault) {
            t.preventDefault = s;
        }
        n = n.slice();
        for (var o = 0; o < n.length; o++) {
            if (n[o](t, this), t.propagationStopped) {
                break;
            }
        }
        if (r && !t.defaultPrevented) {
            return r(t, this);
        }
    }, r._signal = function(e, t) {
        var n = (this._eventRegistry || {})[e];
        if (!n) {
            return;
        }
        n = n.slice();
        for (var r = 0; r < n.length; r++) {
            n[r](t, this);
        }
    }, r.once = function(e, t) {
        var n = this;
        t && this.addEventListener(e, function r() {
            n.removeEventListener(e, r), t.apply(null, arguments);
        });
    }, r.setDefaultHandler = function(e, t) {
        var n = this._defaultHandlers;
        if (!n) {
            n = this._defaultHandlers = {
                _disabled_: {}
            };
        }
        if (n[e]) {
            var r = n[e];
            var i = n._disabled_[e];
            if (!i) {
                n._disabled_[e] = i = [];
            }
            i.push(r);
            var s = i.indexOf(t);
            if (-1 != s) {
                i.splice(s, 1);
            }
        }
        n[e] = t;
    }, r.removeDefaultHandler = function(e, t) {
        var n = this._defaultHandlers;
        if (!n) {
            return;
        }
        var r = n._disabled_[e];
        if (n[e] == t) {
            var i = n[e];
            if (r) {
                this.setDefaultHandler(e, r.pop());
            }
        } else {
            if (r) {
                var s = r.indexOf(t);
                if (-1 != s) {
                    r.splice(s, 1);
                }
            }
        }
    }, r.on = r.addEventListener = function(e, t, n) {
        this._eventRegistry = this._eventRegistry || {};
        var r = this._eventRegistry[e];
        if (!r) {
            r = this._eventRegistry[e] = [];
        }
        if (-1 == r.indexOf(t)) {
            r[n ? "unshift" : "push"](t);
        }
        return t;
    }, r.off = r.removeListener = r.removeEventListener = function(e, t) {
        this._eventRegistry = this._eventRegistry || {};
        var n = this._eventRegistry[e];
        if (!n) {
            return;
        }
        var r = n.indexOf(t);
        if (-1 !== r) {
            n.splice(r, 1);
        }
    }, r.removeAllListeners = function(e) {
        if (this._eventRegistry) {
            this._eventRegistry[e] = [];
        }
    }, t.EventEmitter = r;
}), define("ace/mouse/fold_handler", [ "require", "exports", "module" ], function(e, t, n) {
    function r(e) {
        e.on("click", function(t) {
            var n = t.getDocumentPosition();
            var r = e.session;
            var i = r.getFoldAt(n.row, n.column, 1);
            if (i) {
                if (t.getAccelKey()) {
                    r.removeFold(i);
                } else {
                    r.expandFold(i);
                }
                t.stop();
            }
        }), e.on("gutterclick", function(t) {
            var n = e.renderer.$gutterLayer.getRegion(t);
            if ("foldWidgets" == n) {
                var r = t.getDocumentPosition().row;
                var i = e.session;
                if (i.foldWidgets && i.foldWidgets[r]) {
                    e.session.onFoldWidgetClick(r, t);
                }
                if (!e.isFocused()) {
                    e.focus();
                }
                t.stop();
            }
        }), e.on("gutterdblclick", function(t) {
            var n = e.renderer.$gutterLayer.getRegion(t);
            if ("foldWidgets" == n) {
                var r = t.getDocumentPosition().row;
                var i = e.session;
                var s = i.getParentFoldRangeData(r, !0);
                var o = s.range || s.firstRange;
                if (o) {
                    var r = o.start.row;
                    var u = i.getFoldAt(r, i.getLine(r).length, 1);
                    if (u) {
                        i.removeFold(u);
                    } else {
                        i.addFold("...", o), e.renderer.scrollCursorIntoView({
                            row: o.start.row,
                            column: 0
                        });
                    }
                }
                t.stop();
            }
        });
    }
    t.FoldHandler = r;
}), define("ace/keyboard/keybinding", [ "require", "exports", "module", "ace/lib/keys", "ace/lib/event" ], function(e, t, n) {
    var r = e("../lib/keys");
    var i = e("../lib/event");
    var s = function(e) {
        this.$editor = e, this.$data = {}, this.$handlers = [], this.setDefaultHandler(e.commands);
    };
    (function() {
        this.setDefaultHandler = function(e) {
            this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0), 
            this.$data = {
                editor: this.$editor
            };
        }, this.setKeyboardHandler = function(e) {
            var t = this.$handlers;
            if (t[t.length - 1] == e) {
                return;
            }
            while (t[t.length - 1] && t[t.length - 1] != this.$defaultHandler) {
                this.removeKeyboardHandler(t[t.length - 1]);
            }
            this.addKeyboardHandler(e, 1);
        }, this.addKeyboardHandler = function(e, t) {
            if (!e) {
                return;
            }
            var n = this.$handlers.indexOf(e);
            if (-1 != n) {
                this.$handlers.splice(n, 1);
            }
            if (void 0 == t) {
                this.$handlers.push(e);
            } else {
                this.$handlers.splice(t, 0, e);
            }
            if (-1 == n && e.attach) {
                e.attach(this.$editor);
            }
        }, this.removeKeyboardHandler = function(e) {
            var t = this.$handlers.indexOf(e);
            if (-1 == t) {
                return !1;
            }
            return this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0;
        }, this.getKeyboardHandler = function() {
            return this.$handlers[this.$handlers.length - 1];
        }, this.$callKeyboardHandlers = function(e, t, n, r) {
            var s;
            var o = !1;
            var u = this.$editor.commands;
            for (var a = this.$handlers.length; a--; ) {
                if (s = this.$handlers[a].handleKeyboard(this.$data, e, t, n, r), !s || !s.command) {
                    continue;
                }
                if ("null" == s.command) {
                    o = !0;
                } else {
                    o = u.exec(s.command, this.$editor, s.args, r);
                }
                if (o && r && -1 != e && 1 != s.passEvent && 1 != s.command.passEvent) {
                    i.stopEvent(r);
                }
                if (o) {
                    break;
                }
            }
            return o;
        }, this.onCommandKey = function(e, t, n) {
            var i = r.keyCodeToString(n);
            this.$callKeyboardHandlers(t, i, n, e);
        }, this.onTextInput = function(e) {
            var t = this.$callKeyboardHandlers(-1, e);
            if (!t) {
                this.$editor.commands.exec("insertstring", this.$editor, e);
            }
        };
    }).call(s.prototype), t.KeyBinding = s;
}), define("ace/edit_session", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match" ], function(e, t, n) {
    var r = e("./lib/oop");
    var i = e("./lib/lang");
    var s = e("./config");
    var o = e("./lib/event_emitter").EventEmitter;
    var u = e("./selection").Selection;
    var a = e("./mode/text").Mode;
    var f = e("./range").Range;
    var l = e("./document").Document;
    var c = e("./background_tokenizer").BackgroundTokenizer;
    var h = e("./search_highlight").SearchHighlight;
    var p = function(e, t) {
        if (this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, 
        this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.$foldData.toString = function() {
            return this.join("\n");
        }, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), 
        "object" != typeof e || !e.getLine) {
            e = new l(e);
        }
        this.setDocument(e), this.selection = new u(this), s.resetOptions(this), this.setMode(t), 
        s._emit("session", this);
    };
    (function() {
        function g(e) {
            if (4352 > e) {
                return !1;
            }
            return e >= 4352 && 4447 >= e || e >= 4515 && 4519 >= e || e >= 4602 && 4607 >= e || e >= 9001 && 9002 >= e || e >= 11904 && 11929 >= e || e >= 11931 && 12019 >= e || e >= 12032 && 12245 >= e || e >= 12272 && 12283 >= e || e >= 12288 && 12350 >= e || e >= 12353 && 12438 >= e || e >= 12441 && 12543 >= e || e >= 12549 && 12589 >= e || e >= 12593 && 12686 >= e || e >= 12688 && 12730 >= e || e >= 12736 && 12771 >= e || e >= 12784 && 12830 >= e || e >= 12832 && 12871 >= e || e >= 12880 && 13054 >= e || e >= 13056 && 19903 >= e || e >= 19968 && 42124 >= e || e >= 42128 && 42182 >= e || e >= 43360 && 43388 >= e || e >= 44032 && 55203 >= e || e >= 55216 && 55238 >= e || e >= 55243 && 55291 >= e || e >= 63744 && 64255 >= e || e >= 65040 && 65049 >= e || e >= 65072 && 65106 >= e || e >= 65108 && 65126 >= e || e >= 65128 && 65131 >= e || e >= 65281 && 65376 >= e || e >= 65504 && 65510 >= e;
        }
        r.implement(this, o), this.setDocument = function(e) {
            if (this.doc) {
                this.doc.removeListener("change", this.$onChange);
            }
            if (this.doc = e, e.on("change", this.$onChange), this.bgTokenizer) {
                this.bgTokenizer.setDocument(this.getDocument());
            }
            this.resetCaches();
        }, this.getDocument = function() {
            return this.doc;
        }, this.$resetRowCache = function(e) {
            if (!e) {
                return this.$docRowCache = [], void (this.$screenRowCache = []);
            }
            var t = this.$docRowCache.length;
            var n = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
            if (t > n) {
                this.$docRowCache.splice(n, t), this.$screenRowCache.splice(n, t);
            }
        }, this.$getRowCacheIndex = function(e, t) {
            var n = 0;
            var r = e.length - 1;
            while (r >= n) {
                var i = n + r >> 1;
                var s = e[i];
                if (t > s) {
                    n = i + 1;
                } else {
                    if (s > t) {
                        r = i - 1;
                    } else {
                        return i;
                    }
                }
            }
            return n - 1;
        }, this.resetCaches = function() {
            if (this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), 
            this.bgTokenizer) {
                this.bgTokenizer.start(0);
            }
        }, this.onChangeFold = function(e) {
            var t = e.data;
            this.$resetRowCache(t.start.row);
        }, this.onChange = function(e) {
            var t = e.data;
            this.$modified = !0, this.$resetRowCache(t.range.start.row);
            var n = this.$updateInternalDataOnChange(e);
            if (!this.$fromUndo && this.$undoManager && !t.ignore) {
                if (this.$deltasDoc.push(t), n && 0 != n.length) {
                    this.$deltasFold.push({
                        action: "removeFolds",
                        folds: n
                    });
                }
                this.$informUndoManager.schedule();
            }
            this.bgTokenizer.$updateOnChange(t), this._emit("change", e);
        }, this.setValue = function(e) {
            this.doc.setValue(e), this.selection.moveCursorTo(0, 0), this.selection.clearSelection(), 
            this.$resetRowCache(0), this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], 
            this.getUndoManager().reset();
        }, this.getValue = this.toString = function() {
            return this.doc.getValue();
        }, this.getSelection = function() {
            return this.selection;
        }, this.getState = function(e) {
            return this.bgTokenizer.getState(e);
        }, this.getTokens = function(e) {
            return this.bgTokenizer.getTokens(e);
        }, this.getTokenAt = function(e, t) {
            var n = this.bgTokenizer.getTokens(e);
            var r, i = 0;
            if (null == t) {
                s = n.length - 1, i = this.getLine(e).length;
            } else {
                for (var s = 0; s < n.length; s++) {
                    if (i += n[s].value.length, i >= t) {
                        break;
                    }
                }
            }
            if (r = n[s], !r) {
                return null;
            }
            return r.index = s, r.start = i - r.value.length, r;
        }, this.setUndoManager = function(e) {
            if (this.$undoManager = e, this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], 
            this.$informUndoManager) {
                this.$informUndoManager.cancel();
            }
            if (e) {
                var t = this;
                this.$syncInformUndoManager = function() {
                    if (t.$informUndoManager.cancel(), t.$deltasFold.length) {
                        t.$deltas.push({
                            group: "fold",
                            deltas: t.$deltasFold
                        }), t.$deltasFold = [];
                    }
                    if (t.$deltasDoc.length) {
                        t.$deltas.push({
                            group: "doc",
                            deltas: t.$deltasDoc
                        }), t.$deltasDoc = [];
                    }
                    if (t.$deltas.length > 0) {
                        e.execute({
                            action: "aceupdate",
                            args: [ t.$deltas, t ],
                            merge: t.mergeUndoDeltas
                        });
                    }
                    t.mergeUndoDeltas = !1, t.$deltas = [];
                }, this.$informUndoManager = i.delayedCall(this.$syncInformUndoManager);
            }
        }, this.markUndoGroup = function() {
            if (this.$syncInformUndoManager) {
                this.$syncInformUndoManager();
            }
        }, this.$defaultUndoManager = {
            undo: function() {},
            redo: function() {},
            reset: function() {}
        }, this.getUndoManager = function() {
            return this.$undoManager || this.$defaultUndoManager;
        }, this.getTabString = function() {
            if (this.getUseSoftTabs()) {
                return i.stringRepeat(" ", this.getTabSize());
            } else {
                return "  ";
            }
        }, this.setUseSoftTabs = function(e) {
            this.setOption("useSoftTabs", e);
        }, this.getUseSoftTabs = function() {
            return this.$useSoftTabs && !this.$mode.$indentWithTabs;
        }, this.setTabSize = function(e) {
            this.setOption("tabSize", e);
        }, this.getTabSize = function() {
            return this.$tabSize;
        }, this.isTabStop = function(e) {
            return this.$useSoftTabs && e.column % this.$tabSize == 0;
        }, this.$overwrite = !1, this.setOverwrite = function(e) {
            this.setOption("overwrite", e);
        }, this.getOverwrite = function() {
            return this.$overwrite;
        }, this.toggleOverwrite = function() {
            this.setOverwrite(!this.$overwrite);
        }, this.addGutterDecoration = function(e, t) {
            if (!this.$decorations[e]) {
                this.$decorations[e] = "";
            }
            this.$decorations[e] += " " + t, this._emit("changeBreakpoint", {});
        }, this.removeGutterDecoration = function(e, t) {
            this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._emit("changeBreakpoint", {});
        }, this.getBreakpoints = function() {
            return this.$breakpoints;
        }, this.setBreakpoints = function(e) {
            this.$breakpoints = [];
            for (var t = 0; t < e.length; t++) {
                this.$breakpoints[e[t]] = "ace_breakpoint";
            }
            this._emit("changeBreakpoint", {});
        }, this.clearBreakpoints = function() {
            this.$breakpoints = [], this._emit("changeBreakpoint", {});
        }, this.setBreakpoint = function(e, t) {
            if (void 0 === t) {
                t = "ace_breakpoint";
            }
            if (t) {
                this.$breakpoints[e] = t;
            } else {
                delete this.$breakpoints[e];
            }
            this._emit("changeBreakpoint", {});
        }, this.clearBreakpoint = function(e) {
            delete this.$breakpoints[e], this._emit("changeBreakpoint", {});
        }, this.addMarker = function(e, t, n, r) {
            var i = this.$markerId++;
            var s = {
                range: e,
                type: n || "line",
                renderer: "function" == typeof n ? n : null,
                clazz: t,
                inFront: !!r,
                id: i
            };
            if (r) {
                this.$frontMarkers[i] = s, this._emit("changeFrontMarker");
            } else {
                this.$backMarkers[i] = s, this._emit("changeBackMarker");
            }
            return i;
        }, this.addDynamicMarker = function(e, t) {
            if (!e.update) {
                return;
            }
            var n = this.$markerId++;
            if (e.id = n, e.inFront = !!t, t) {
                this.$frontMarkers[n] = e, this._emit("changeFrontMarker");
            } else {
                this.$backMarkers[n] = e, this._emit("changeBackMarker");
            }
            return e;
        }, this.removeMarker = function(e) {
            var t = this.$frontMarkers[e] || this.$backMarkers[e];
            if (!t) {
                return;
            }
            var n = t.inFront ? this.$frontMarkers : this.$backMarkers;
            if (t) {
                delete n[e], this._emit(t.inFront ? "changeFrontMarker" : "changeBackMarker");
            }
        }, this.getMarkers = function(e) {
            return e ? this.$frontMarkers : this.$backMarkers;
        }, this.highlight = function(e) {
            if (!this.$searchHighlight) {
                var t = new h(null, "ace_selected-word", "text");
                this.$searchHighlight = this.addDynamicMarker(t);
            }
            this.$searchHighlight.setRegexp(e);
        }, this.highlightLines = function(e, t, n, r) {
            if ("number" != typeof t) {
                n = t, t = e;
            }
            if (!n) {
                n = "ace_step";
            }
            var i = new f(e, 0, t, 1/0);
            return i.id = this.addMarker(i, n, "fullLine", r), i;
        }, this.setAnnotations = function(e) {
            this.$annotations = e, this._emit("changeAnnotation", {});
        }, this.getAnnotations = function() {
            return this.$annotations || [];
        }, this.clearAnnotations = function() {
            this.setAnnotations([]);
        }, this.$detectNewLine = function(e) {
            var t = e.match(/^.*?(\r?\n)/m);
            if (t) {
                this.$autoNewLine = t[1];
            } else {
                this.$autoNewLine = "\n";
            }
        }, this.getWordRange = function(e, t) {
            var n = this.getLine(e);
            var r = !1;
            if (t > 0) {
                r = !!n.charAt(t - 1).match(this.tokenRe);
            }
            if (!r) {
                r = !!n.charAt(t).match(this.tokenRe);
            }
            if (r) {
                var i = this.tokenRe;
            } else {
                if (/^\s+$/.test(n.slice(t - 1, t + 1))) {
                    var i = /\s/;
                } else {
                    var i = this.nonTokenRe;
                }
            }
            var s = t;
            if (s > 0) {
                do {
                    s--;
                } while (s >= 0 && n.charAt(s).match(i));
                s++;
            }
            var o = t;
            while (o < n.length && n.charAt(o).match(i)) {
                o++;
            }
            return new f(e, s, e, o);
        }, this.getAWordRange = function(e, t) {
            var n = this.getWordRange(e, t);
            var r = this.getLine(n.end.row);
            while (r.charAt(n.end.column).match(/[ \t]/)) {
                n.end.column += 1;
            }
            return n;
        }, this.setNewLineMode = function(e) {
            this.doc.setNewLineMode(e);
        }, this.getNewLineMode = function() {
            return this.doc.getNewLineMode();
        }, this.setUseWorker = function(e) {
            this.setOption("useWorker", e);
        }, this.getUseWorker = function() {
            return this.$useWorker;
        }, this.onReloadTokenizer = function(e) {
            var t = e.data;
            this.bgTokenizer.start(t.first), this._emit("tokenizerUpdate", e);
        }, this.$modes = {}, this.$mode = null, this.$modeId = null, this.setMode = function(e, t) {
            if (e && "object" == typeof e) {
                if (e.getTokenizer) {
                    return this.$onChangeMode(e);
                }
                var n = e;
                var r = n.path;
            } else {
                r = e || "ace/mode/text";
            }
            if (!this.$modes["ace/mode/text"]) {
                this.$modes["ace/mode/text"] = new a();
            }
            if (this.$modes[r] && !n) {
                return this.$onChangeMode(this.$modes[r]), void (t && t());
            }
            if (this.$modeId = r, s.loadModule([ "mode", r ], function(e) {
                if (this.$modeId !== r) {
                    return t && t();
                }
                if (this.$modes[r] && !n) {
                    return this.$onChangeMode(this.$modes[r]);
                }
                if (e && e.Mode) {
                    if (e = new e.Mode(n), !n) {
                        this.$modes[r] = e, e.$id = r;
                    }
                    this.$onChangeMode(e), t && t();
                }
            }.bind(this)), !this.$mode) {
                this.$onChangeMode(this.$modes["ace/mode/text"], !0);
            }
        }, this.$onChangeMode = function(e, t) {
            if (!t) {
                this.$modeId = e.$id;
            }
            if (this.$mode === e) {
                return;
            }
            if (this.$mode = e, this.$stopWorker(), this.$useWorker) {
                this.$startWorker();
            }
            var n = e.getTokenizer();
            if (void 0 !== n.addEventListener) {
                var r = this.onReloadTokenizer.bind(this);
                n.addEventListener("update", r);
            }
            if (!this.bgTokenizer) {
                this.bgTokenizer = new c(n);
                var i = this;
                this.bgTokenizer.addEventListener("update", function(e) {
                    i._emit("tokenizerUpdate", e);
                });
            } else {
                this.bgTokenizer.setTokenizer(n);
            }
            if (this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, 
            this.nonTokenRe = e.nonTokenRe, this.$options.wrapMethod.set.call(this, this.$wrapMethod), 
            !t) {
                this.$setFolding(e.foldingRules), this._emit("changeMode"), this.bgTokenizer.start(0);
            }
        }, this.$stopWorker = function() {
            if (this.$worker) {
                this.$worker.terminate();
            }
            this.$worker = null;
        }, this.$startWorker = function() {
            if ("undefined" != typeof Worker && !e.noWorker) {
                try {
                    this.$worker = this.$mode.createWorker(this);
                } catch (t) {
                    console.log("Could not load worker"), console.log(t), this.$worker = null;
                }
            } else {
                this.$worker = null;
            }
        }, this.getMode = function() {
            return this.$mode;
        }, this.$scrollTop = 0, this.setScrollTop = function(e) {
            if (this.$scrollTop === e || isNaN(e)) {
                return;
            }
            this.$scrollTop = e, this._signal("changeScrollTop", e);
        }, this.getScrollTop = function() {
            return this.$scrollTop;
        }, this.$scrollLeft = 0, this.setScrollLeft = function(e) {
            if (this.$scrollLeft === e || isNaN(e)) {
                return;
            }
            this.$scrollLeft = e, this._signal("changeScrollLeft", e);
        }, this.getScrollLeft = function() {
            return this.$scrollLeft;
        }, this.getScreenWidth = function() {
            return this.$computeWidth(), this.screenWidth;
        }, this.$computeWidth = function(e) {
            if (this.$modified || e) {
                if (this.$modified = !1, this.$useWrapMode) {
                    return this.screenWidth = this.$wrapLimit;
                }
                var t = this.doc.getAllLines();
                var n = this.$rowLengthCache;
                var r = 0;
                var i = 0;
                var s = this.$foldData[i];
                var o = s ? s.start.row : 1/0;
                var u = t.length;
                for (var a = 0; u > a; a++) {
                    if (a > o) {
                        if (a = s.end.row + 1, a >= u) {
                            break;
                        }
                        s = this.$foldData[i++], o = s ? s.start.row : 1/0;
                    }
                    if (null == n[a]) {
                        n[a] = this.$getStringScreenWidth(t[a])[0];
                    }
                    if (n[a] > r) {
                        r = n[a];
                    }
                }
                this.screenWidth = r;
            }
        }, this.getLine = function(e) {
            return this.doc.getLine(e);
        }, this.getLines = function(e, t) {
            return this.doc.getLines(e, t);
        }, this.getLength = function() {
            return this.doc.getLength();
        }, this.getTextRange = function(e) {
            return this.doc.getTextRange(e || this.selection.getRange());
        }, this.insert = function(e, t) {
            return this.doc.insert(e, t);
        }, this.remove = function(e) {
            return this.doc.remove(e);
        }, this.undoChanges = function(e, t) {
            if (!e.length) {
                return;
            }
            this.$fromUndo = !0;
            var n = null;
            for (var r = e.length - 1; -1 != r; r--) {
                var i = e[r];
                if ("doc" == i.group) {
                    this.doc.revertDeltas(i.deltas), n = this.$getUndoSelection(i.deltas, !0, n);
                } else {
                    i.deltas.forEach(function(e) {
                        this.addFolds(e.folds);
                    }, this);
                }
            }
            return this.$fromUndo = !1, n && this.$undoSelect && !t && this.selection.setSelectionRange(n), 
            n;
        }, this.redoChanges = function(e, t) {
            if (!e.length) {
                return;
            }
            this.$fromUndo = !0;
            var n = null;
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                if ("doc" == i.group) {
                    this.doc.applyDeltas(i.deltas), n = this.$getUndoSelection(i.deltas, !1, n);
                }
            }
            return this.$fromUndo = !1, n && this.$undoSelect && !t && this.selection.setSelectionRange(n), 
            n;
        }, this.setUndoSelect = function(e) {
            this.$undoSelect = e;
        }, this.$getUndoSelection = function(e, t, n) {
            function r(e) {
                var n = "insertText" === e.action || "insertLines" === e.action;
                return t ? !n : n;
            }
            var i = e[0];
            var s, o;
            var u = !1;
            if (r(i)) {
                s = f.fromPoints(i.range.start, i.range.end), u = !0;
            } else {
                s = f.fromPoints(i.range.start, i.range.start), u = !1;
            }
            for (var a = 1; a < e.length; a++) {
                if (i = e[a], r(i)) {
                    if (o = i.range.start, -1 == s.compare(o.row, o.column)) {
                        s.setStart(i.range.start);
                    }
                    if (o = i.range.end, 1 == s.compare(o.row, o.column)) {
                        s.setEnd(i.range.end);
                    }
                    u = !0;
                } else {
                    if (o = i.range.start, -1 == s.compare(o.row, o.column)) {
                        s = f.fromPoints(i.range.start, i.range.start);
                    }
                    u = !1;
                }
            }
            if (null != n) {
                if (0 == f.comparePoints(n.start, s.start)) {
                    n.start.column += s.end.column - s.start.column, n.end.column += s.end.column - s.start.column;
                }
                var l = n.compareRange(s);
                if (1 == l) {
                    s.setStart(n.start);
                } else {
                    if (-1 == l) {
                        s.setEnd(n.end);
                    }
                }
            }
            return s;
        }, this.replace = function(e, t) {
            return this.doc.replace(e, t);
        }, this.moveText = function(e, t, n) {
            var r = this.getTextRange(e);
            var i = this.getFoldsInRange(e);
            var s = f.fromPoints(t, t);
            if (!n) {
                this.remove(e);
                var o = e.start.row - e.end.row;
                var u = o ? -e.end.column : e.start.column - e.end.column;
                if (u) {
                    if (s.start.row == e.end.row && s.start.column > e.end.column) {
                        s.start.column += u;
                    }
                    if (s.end.row == e.end.row && s.end.column > e.end.column) {
                        s.end.column += u;
                    }
                }
                if (o && s.start.row >= e.end.row) {
                    s.start.row += o, s.end.row += o;
                }
            }
            if (s.end = this.insert(s.start, r), i.length) {
                var a = e.start;
                var l = s.start;
                var o = l.row - a.row;
                var u = l.column - a.column;
                this.addFolds(i.map(function(e) {
                    if (e = e.clone(), e.start.row == a.row) {
                        e.start.column += u;
                    }
                    if (e.end.row == a.row) {
                        e.end.column += u;
                    }
                    return e.start.row += o, e.end.row += o, e;
                }));
            }
            return s;
        }, this.indentRows = function(e, t, n) {
            n = n.replace(/\t/g, this.getTabString());
            for (var r = e; t >= r; r++) {
                this.insert({
                    row: r,
                    column: 0
                }, n);
            }
        }, this.outdentRows = function(e) {
            var t = e.collapseRows();
            var n = new f(0, 0, 0, 0);
            var r = this.getTabSize();
            for (var i = t.start.row; i <= t.end.row; ++i) {
                var s = this.getLine(i);
                n.start.row = i, n.end.row = i;
                for (var o = 0; r > o; ++o) {
                    if (" " != s.charAt(o)) {
                        break;
                    }
                }
                if (r > o && "    " == s.charAt(o)) {
                    n.start.column = o, n.end.column = o + 1;
                } else {
                    n.start.column = 0, n.end.column = o;
                }
                this.remove(n);
            }
        }, this.$moveLines = function(e, t, n) {
            if (e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t), 0 > n) {
                var r = this.getRowFoldStart(e + n);
                if (0 > r) {
                    return 0;
                }
                var i = r - e;
            } else {
                if (n > 0) {
                    var r = this.getRowFoldEnd(t + n);
                    if (r > this.doc.getLength() - 1) {
                        return 0;
                    }
                    var i = r - t;
                } else {
                    e = this.$clipRowToDocument(e), t = this.$clipRowToDocument(t);
                    var i = t - e + 1;
                }
            }
            var s = new f(e, 0, t, Number.MAX_VALUE);
            var o = this.getFoldsInRange(s).map(function(e) {
                return e = e.clone(), e.start.row += i, e.end.row += i, e;
            });
            var u = 0 == n ? this.doc.getLines(e, t) : this.doc.removeLines(e, t);
            return this.doc.insertLines(e + i, u), o.length && this.addFolds(o), i;
        }, this.moveLinesUp = function(e, t) {
            return this.$moveLines(e, t, -1);
        }, this.moveLinesDown = function(e, t) {
            return this.$moveLines(e, t, 1);
        }, this.duplicateLines = function(e, t) {
            return this.$moveLines(e, t, 0);
        }, this.$clipRowToDocument = function(e) {
            return Math.max(0, Math.min(e, this.doc.getLength() - 1));
        }, this.$clipColumnToRow = function(e, t) {
            if (0 > t) {
                return 0;
            }
            return Math.min(this.doc.getLine(e).length, t);
        }, this.$clipPositionToDocument = function(e, t) {
            if (t = Math.max(0, t), 0 > e) {
                e = 0, t = 0;
            } else {
                var n = this.doc.getLength();
                if (e >= n) {
                    e = n - 1, t = this.doc.getLine(n - 1).length;
                } else {
                    t = Math.min(this.doc.getLine(e).length, t);
                }
            }
            return {
                row: e,
                column: t
            };
        }, this.$clipRangeToDocument = function(e) {
            if (e.start.row < 0) {
                e.start.row = 0, e.start.column = 0;
            } else {
                e.start.column = this.$clipColumnToRow(e.start.row, e.start.column);
            }
            var t = this.doc.getLength() - 1;
            if (e.end.row > t) {
                e.end.row = t, e.end.column = this.doc.getLine(t).length;
            } else {
                e.end.column = this.$clipColumnToRow(e.end.row, e.end.column);
            }
            return e;
        }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {
            min: null,
            max: null
        }, this.setUseWrapMode = function(e) {
            if (e != this.$useWrapMode) {
                if (this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0), e) {
                    var t = this.getLength();
                    this.$wrapData = [];
                    for (var n = 0; t > n; n++) {
                        this.$wrapData.push([]);
                    }
                    this.$updateWrapData(0, t - 1);
                }
                this._emit("changeWrapMode");
            }
        }, this.getUseWrapMode = function() {
            return this.$useWrapMode;
        }, this.setWrapLimitRange = function(e, t) {
            if (this.$wrapLimitRange.min !== e || this.$wrapLimitRange.max !== t) {
                this.$wrapLimitRange = {
                    min: e,
                    max: t
                }, this.$modified = !0, this._emit("changeWrapMode");
            }
        }, this.adjustWrapLimit = function(e, t) {
            var n = this.$wrapLimitRange;
            if (n.max < 0) {
                n = {
                    min: t,
                    max: t
                };
            }
            var r = this.$constrainWrapLimit(e, n.min, n.max);
            if (r != this.$wrapLimit && r > 1) {
                if (this.$wrapLimit = r, this.$modified = !0, this.$useWrapMode) {
                    this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._emit("changeWrapLimit");
                }
                return !0;
            }
            return !1;
        }, this.$constrainWrapLimit = function(e, t, n) {
            if (t) {
                e = Math.max(t, e);
            }
            if (n) {
                e = Math.min(n, e);
            }
            return e;
        }, this.getWrapLimit = function() {
            return this.$wrapLimit;
        }, this.setWrapLimit = function(e) {
            this.setWrapLimitRange(e, e);
        }, this.getWrapLimitRange = function() {
            return {
                min: this.$wrapLimitRange.min,
                max: this.$wrapLimitRange.max
            };
        }, this.$updateInternalDataOnChange = function(e) {
            var t = this.$useWrapMode;
            var n;
            var r = e.data.action;
            var i = e.data.range.start.row;
            var s = e.data.range.end.row;
            var o = e.data.range.start;
            var u = e.data.range.end;
            var a = null;
            if (-1 != r.indexOf("Lines")) {
                if ("insertLines" == r) {
                    s = i + e.data.lines.length;
                } else {
                    s = i;
                }
                n = e.data.lines ? e.data.lines.length : s - i;
            } else {
                n = s - i;
            }
            if (this.$updating = !0, 0 != n) {
                if (-1 != r.indexOf("remove")) {
                    this[t ? "$wrapData" : "$rowLengthCache"].splice(i, n);
                    var f = this.$foldData;
                    a = this.getFoldsInRange(e.data.range), this.removeFolds(a);
                    var l = this.getFoldLine(u.row);
                    var c = 0;
                    if (l) {
                        l.addRemoveChars(u.row, u.column, o.column - u.column), l.shiftRow(-n);
                        var h = this.getFoldLine(i);
                        if (h && h !== l) {
                            h.merge(l), l = h;
                        }
                        c = f.indexOf(l) + 1;
                    }
                    for (c; c < f.length; c++) {
                        var l = f[c];
                        if (l.start.row >= u.row) {
                            l.shiftRow(-n);
                        }
                    }
                    s = i;
                } else {
                    var p;
                    if (t) {
                        p = [ i, 0 ];
                        for (var d = 0; n > d; d++) {
                            p.push([]);
                        }
                        this.$wrapData.splice.apply(this.$wrapData, p);
                    } else {
                        p = Array(n), p.unshift(i, 0), this.$rowLengthCache.splice.apply(this.$rowLengthCache, p);
                    }
                    var f = this.$foldData;
                    var l = this.getFoldLine(i);
                    var c = 0;
                    if (l) {
                        var v = l.range.compareInside(o.row, o.column);
                        if (0 == v) {
                            l = l.split(o.row, o.column), l.shiftRow(n), l.addRemoveChars(s, 0, u.column - o.column);
                        } else {
                            if (-1 == v) {
                                l.addRemoveChars(i, 0, u.column - o.column), l.shiftRow(n);
                            }
                        }
                        c = f.indexOf(l) + 1;
                    }
                    for (c; c < f.length; c++) {
                        var l = f[c];
                        if (l.start.row >= i) {
                            l.shiftRow(n);
                        }
                    }
                }
            } else {
                if (n = Math.abs(e.data.range.start.column - e.data.range.end.column), -1 != r.indexOf("remove")) {
                    a = this.getFoldsInRange(e.data.range), this.removeFolds(a), n = -n;
                }
                var l = this.getFoldLine(i);
                if (l) {
                    l.addRemoveChars(i, o.column, n);
                }
            }
            if (t && this.$wrapData.length != this.doc.getLength()) {
                console.error("doc.getLength() and $wrapData.length have to be the same!");
            }
            if (this.$updating = !1, t) {
                this.$updateWrapData(i, s);
            } else {
                this.$updateRowLengthCache(i, s);
            }
            return a;
        }, this.$updateRowLengthCache = function(e, t, n) {
            this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null;
        }, this.$updateWrapData = function(e, t) {
            var n = this.doc.getAllLines();
            var r = this.getTabSize();
            var i = this.$wrapData;
            var s = this.$wrapLimit;
            var o;
            var a;
            var f = e;
            t = Math.min(t, n.length - 1);
            while (t >= f) {
                if (a = this.getFoldLine(f, a), !a) {
                    o = this.$getDisplayTokens(n[f]), i[f] = this.$computeWrapSplits(o, s, r), f++;
                } else {
                    o = [], a.walk(function(e, t, r, i) {
                        var s;
                        if (null != e) {
                            s = this.$getDisplayTokens(e, o.length), s[0] = u;
                            for (var a = 1; a < s.length; a++) {
                                s[a] = l;
                            }
                        } else {
                            s = this.$getDisplayTokens(n[t].substring(i, r), o.length);
                        }
                        o = o.concat(s);
                    }.bind(this), a.end.row, n[a.end.row].length + 1), i[a.start.row] = this.$computeWrapSplits(o, s, r), 
                    f = a.end.row + 1;
                }
            }
        };
        var t = 1, n = 2, u = 3, l = 4, p = 9, d = 10, v = 11, m = 12;
        this.$computeWrapSplits = function(e, t) {
            function a(t) {
                var r = e.slice(i, t);
                var o = r.length;
                r.join("").replace(/12/g, function() {
                    o -= 1;
                }).replace(/2/g, function() {
                    o -= 1;
                }), s += o, n.push(s), i = t;
            }
            if (0 == e.length) {
                return [];
            }
            var n = [];
            var r = e.length;
            var i = 0, s = 0;
            var o = this.$wrapAsCode;
            while (r - i > t) {
                var f = i + t;
                if (e[f - 1] >= d && e[f] >= d) {
                    a(f);
                    continue;
                }
                if (e[f] == u || e[f] == l) {
                    for (f; f != i - 1; f--) {
                        if (e[f] == u) {
                            break;
                        }
                    }
                    if (f > i) {
                        a(f);
                        continue;
                    }
                    for (f = i + t, f; f < e.length; f++) {
                        if (e[f] != l) {
                            break;
                        }
                    }
                    if (f == e.length) {
                        break;
                    }
                    a(f);
                    continue;
                }
                var c = Math.max(f - (o ? 10 : t - (t >> 2)), i - 1);
                while (f > c && e[f] < u) {
                    f--;
                }
                if (o) {
                    while (f > c && e[f] < u) {
                        f--;
                    }
                    while (f > c && e[f] == p) {
                        f--;
                    }
                } else {
                    while (f > c && e[f] < d) {
                        f--;
                    }
                }
                if (f > c) {
                    a(++f);
                    continue;
                }
                f = i + t, a(f);
            }
            return n;
        }, this.$getDisplayTokens = function(e, r) {
            var i = [];
            var s;
            r = r || 0;
            for (var o = 0; o < e.length; o++) {
                var u = e.charCodeAt(o);
                if (9 == u) {
                    s = this.getScreenTabSize(i.length + r), i.push(v);
                    for (var a = 1; s > a; a++) {
                        i.push(m);
                    }
                } else {
                    if (32 == u) {
                        i.push(d);
                    } else {
                        if (u > 39 && 48 > u || u > 57 && 64 > u) {
                            i.push(p);
                        } else {
                            if (u >= 4352 && g(u)) {
                                i.push(t, n);
                            } else {
                                i.push(t);
                            }
                        }
                    }
                }
            }
            return i;
        }, this.$getStringScreenWidth = function(e, t, n) {
            if (0 == t) {
                return [ 0, 0 ];
            }
            if (null == t) {
                t = 1/0;
            }
            n = n || 0;
            var r, i;
            for (i = 0; i < e.length; i++) {
                if (r = e.charCodeAt(i), 9 == r) {
                    n += this.getScreenTabSize(n);
                } else {
                    if (r >= 4352 && g(r)) {
                        n += 2;
                    } else {
                        n += 1;
                    }
                }
                if (n > t) {
                    break;
                }
            }
            return [ n, i ];
        }, this.getRowLength = function(e) {
            if (!this.$useWrapMode || !this.$wrapData[e]) {
                return 1;
            } else {
                return this.$wrapData[e].length + 1;
            }
        }, this.getScreenLastRowColumn = function(e) {
            var t = this.screenToDocumentPosition(e, Number.MAX_VALUE);
            return this.documentToScreenColumn(t.row, t.column);
        }, this.getDocumentLastRowColumn = function(e, t) {
            var n = this.documentToScreenRow(e, t);
            return this.getScreenLastRowColumn(n);
        }, this.getDocumentLastRowColumnPosition = function(e, t) {
            var n = this.documentToScreenRow(e, t);
            return this.screenToDocumentPosition(n, Number.MAX_VALUE / 10);
        }, this.getRowSplitData = function(e) {
            if (!this.$useWrapMode) {
                return void 0;
            } else {
                return this.$wrapData[e];
            }
        }, this.getScreenTabSize = function(e) {
            return this.$tabSize - e % this.$tabSize;
        }, this.screenToDocumentRow = function(e, t) {
            return this.screenToDocumentPosition(e, t).row;
        }, this.screenToDocumentColumn = function(e, t) {
            return this.screenToDocumentPosition(e, t).column;
        }, this.screenToDocumentPosition = function(e, t) {
            if (0 > e) {
                return {
                    row: 0,
                    column: 0
                };
            }
            var n;
            var r = 0;
            var i = 0;
            var s;
            var o = 0;
            var u = 0;
            var a = this.$screenRowCache;
            var f = this.$getRowCacheIndex(a, e);
            var l = a.length;
            if (l && f >= 0) {
                var o = a[f];
                var r = this.$docRowCache[f];
                var c = e > a[l - 1];
            } else {
                var c = !l;
            }
            var h = this.getLength() - 1;
            var p = this.getNextFoldLine(r);
            var d = p ? p.start.row : 1/0;
            while (e >= o) {
                if (u = this.getRowLength(r), o + u - 1 >= e || r >= h) {
                    break;
                } else {
                    if (o += u, r++, r > d) {
                        r = p.end.row + 1, p = this.getNextFoldLine(r, p), d = p ? p.start.row : 1/0;
                    }
                }
                if (c) {
                    this.$docRowCache.push(r), this.$screenRowCache.push(o);
                }
            }
            if (p && p.start.row <= r) {
                n = this.getFoldDisplayLine(p), r = p.start.row;
            } else {
                if (e >= o + u || r > h) {
                    return {
                        row: h,
                        column: this.getLine(h).length
                    };
                } else {
                    n = this.getLine(r), p = null;
                }
            }
            if (this.$useWrapMode) {
                var v = this.$wrapData[r];
                if (v) {
                    if (s = v[e - o], e > o && v.length) {
                        i = v[e - o - 1] || v[v.length - 1], n = n.substring(i);
                    }
                }
            }
            if (i += this.$getStringScreenWidth(n, t)[1], this.$useWrapMode && i >= s) {
                i = s - 1;
            }
            if (p) {
                return p.idxToPosition(i);
            }
            return {
                row: r,
                column: i
            };
        }, this.documentToScreenPosition = function(e, t) {
            if ("undefined" == typeof t) {
                var n = this.$clipPositionToDocument(e.row, e.column);
            } else {
                n = this.$clipPositionToDocument(e, t);
            }
            e = n.row, t = n.column;
            var r = 0;
            var i = null;
            var s = null;
            if (s = this.getFoldAt(e, t, 1), s) {
                e = s.start.row, t = s.start.column;
            }
            var o, u = 0;
            var a = this.$docRowCache;
            var f = this.$getRowCacheIndex(a, e);
            var l = a.length;
            if (l && f >= 0) {
                var u = a[f];
                var r = this.$screenRowCache[f];
                var c = e > a[l - 1];
            } else {
                var c = !l;
            }
            var h = this.getNextFoldLine(u);
            var p = h ? h.start.row : 1/0;
            while (e > u) {
                if (u >= p) {
                    if (o = h.end.row + 1, o > e) {
                        break;
                    }
                    h = this.getNextFoldLine(o, h), p = h ? h.start.row : 1/0;
                } else {
                    o = u + 1;
                }
                if (r += this.getRowLength(u), u = o, c) {
                    this.$docRowCache.push(u), this.$screenRowCache.push(r);
                }
            }
            var d = "";
            if (h && u >= p) {
                d = this.getFoldDisplayLine(h, e, t), i = h.start.row;
            } else {
                d = this.getLine(e).substring(0, t), i = e;
            }
            if (this.$useWrapMode) {
                var v = this.$wrapData[i];
                var m = 0;
                while (d.length >= v[m]) {
                    r++, m++;
                }
                d = d.substring(v[m - 1] || 0, d.length);
            }
            return {
                row: r,
                column: this.$getStringScreenWidth(d)[0]
            };
        }, this.documentToScreenColumn = function(e, t) {
            return this.documentToScreenPosition(e, t).column;
        }, this.documentToScreenRow = function(e, t) {
            return this.documentToScreenPosition(e, t).row;
        }, this.getScreenLength = function() {
            var e = 0;
            var t = null;
            if (!this.$useWrapMode) {
                e = this.getLength();
                var n = this.$foldData;
                for (var r = 0; r < n.length; r++) {
                    t = n[r], e -= t.end.row - t.start.row;
                }
            } else {
                var i = this.$wrapData.length;
                var s = 0, r = 0;
                var t = this.$foldData[r++];
                var o = t ? t.start.row : 1/0;
                while (i > s) {
                    if (e += this.$wrapData[s].length + 1, s++, s > o) {
                        s = t.end.row + 1, t = this.$foldData[r++], o = t ? t.start.row : 1/0;
                    }
                }
            }
            return e;
        };
    }).call(p.prototype), e("./edit_session/folding").Folding.call(p.prototype), e("./edit_session/bracket_match").BracketMatch.call(p.prototype), 
    s.defineOptions(p.prototype, "session", {
        wrap: {
            set: function(e) {
                if (!e || "off" == e) {
                    e = !1;
                } else {
                    if ("free" == e) {
                        e = !0;
                    } else {
                        if ("printMargin" == e) {
                            e = -1;
                        } else {
                            if ("string" == typeof e) {
                                e = parseInt(e, 10) || !1;
                            }
                        }
                    }
                }
                if (this.$wrap == e) {
                    return;
                }
                if (!e) {
                    this.setUseWrapMode(!1);
                } else {
                    var t = "number" == typeof e ? e : null;
                    this.setWrapLimitRange(t, t), this.setUseWrapMode(!0);
                }
                this.$wrap = e;
            },
            get: function() {
                return this.getUseWrapMode() ? this.getWrapLimitRange().min || "free" : "off";
            },
            handlesSet: !0
        },
        wrapMethod: {
            set: function(e) {
                if ("auto" == e) {
                    this.$wrapAsCode = "text" != this.$mode.type;
                } else {
                    this.$wrapAsCode = "text" != e;
                }
            },
            initialValue: "auto"
        },
        firstLineNumber: {
            set: function() {
                this._emit("changeBreakpoint");
            },
            initialValue: 1
        },
        useWorker: {
            set: function(e) {
                if (this.$useWorker = e, this.$stopWorker(), e) {
                    this.$startWorker();
                }
            },
            initialValue: !0
        },
        useSoftTabs: {
            initialValue: !0
        },
        tabSize: {
            set: function(e) {
                if (isNaN(e) || this.$tabSize === e) {
                    return;
                }
                this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._emit("changeTabSize");
            },
            initialValue: 4,
            handlesSet: !0
        },
        overwrite: {
            set: function(e) {
                this._emit("changeOverwrite");
            },
            initialValue: !1
        },
        newLineMode: {
            set: function(e) {
                this.doc.setNewLineMode(e);
            },
            get: function() {
                return this.doc.getNewLineMode();
            },
            handlesSet: !0
        }
    }), t.EditSession = p;
}), define("ace/selection", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range" ], function(e, t, n) {
    var r = e("./lib/oop");
    var i = e("./lib/lang");
    var s = e("./lib/event_emitter").EventEmitter;
    var o = e("./range").Range;
    var u = function(e) {
        this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.lead = this.selectionLead = this.doc.createAnchor(0, 0), 
        this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
        var t = this;
        this.lead.on("change", function(e) {
            if (t._emit("changeCursor"), !t.$isEmpty) {
                t._emit("changeSelection");
            }
            if (!t.$keepDesiredColumnOnChange && e.old.column != e.value.column) {
                t.$desiredColumn = null;
            }
        }), this.selectionAnchor.on("change", function() {
            if (!t.$isEmpty) {
                t._emit("changeSelection");
            }
        });
    };
    (function() {
        r.implement(this, s), this.isEmpty = function() {
            return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column;
        }, this.isMultiLine = function() {
            if (this.isEmpty()) {
                return !1;
            }
            return this.getRange().isMultiLine();
        }, this.getCursor = function() {
            return this.lead.getPosition();
        }, this.setSelectionAnchor = function(e, t) {
            if (this.anchor.setPosition(e, t), this.$isEmpty) {
                this.$isEmpty = !1, this._emit("changeSelection");
            }
        }, this.getSelectionAnchor = function() {
            if (this.$isEmpty) {
                return this.getSelectionLead();
            } else {
                return this.anchor.getPosition();
            }
        }, this.getSelectionLead = function() {
            return this.lead.getPosition();
        }, this.shiftSelection = function(e) {
            if (this.$isEmpty) {
                return void this.moveCursorTo(this.lead.row, this.lead.column + e);
            }
            var t = this.getSelectionAnchor();
            var n = this.getSelectionLead();
            var r = this.isBackwards();
            if (!r || 0 !== t.column) {
                this.setSelectionAnchor(t.row, t.column + e);
            }
            if (r || 0 !== n.column) {
                this.$moveSelection(function() {
                    this.moveCursorTo(n.row, n.column + e);
                });
            }
        }, this.isBackwards = function() {
            var e = this.anchor;
            var t = this.lead;
            return e.row > t.row || e.row == t.row && e.column > t.column;
        }, this.getRange = function() {
            var e = this.anchor;
            var t = this.lead;
            if (this.isEmpty()) {
                return o.fromPoints(t, t);
            }
            if (this.isBackwards()) {
                return o.fromPoints(t, e);
            } else {
                return o.fromPoints(e, t);
            }
        }, this.clearSelection = function() {
            if (!this.$isEmpty) {
                this.$isEmpty = !0, this._emit("changeSelection");
            }
        }, this.selectAll = function() {
            var e = this.doc.getLength() - 1;
            this.setSelectionAnchor(0, 0), this.moveCursorTo(e, this.doc.getLine(e).length);
        }, this.setRange = this.setSelectionRange = function(e, t) {
            if (t) {
                this.setSelectionAnchor(e.end.row, e.end.column), this.selectTo(e.start.row, e.start.column);
            } else {
                this.setSelectionAnchor(e.start.row, e.start.column), this.selectTo(e.end.row, e.end.column);
            }
            if (this.getRange().isEmpty()) {
                this.$isEmpty = !0;
            }
            this.$desiredColumn = null;
        }, this.$moveSelection = function(e) {
            var t = this.lead;
            if (this.$isEmpty) {
                this.setSelectionAnchor(t.row, t.column);
            }
            e.call(this);
        }, this.selectTo = function(e, t) {
            this.$moveSelection(function() {
                this.moveCursorTo(e, t);
            });
        }, this.selectToPosition = function(e) {
            this.$moveSelection(function() {
                this.moveCursorToPosition(e);
            });
        }, this.selectUp = function() {
            this.$moveSelection(this.moveCursorUp);
        }, this.selectDown = function() {
            this.$moveSelection(this.moveCursorDown);
        }, this.selectRight = function() {
            this.$moveSelection(this.moveCursorRight);
        }, this.selectLeft = function() {
            this.$moveSelection(this.moveCursorLeft);
        }, this.selectLineStart = function() {
            this.$moveSelection(this.moveCursorLineStart);
        }, this.selectLineEnd = function() {
            this.$moveSelection(this.moveCursorLineEnd);
        }, this.selectFileEnd = function() {
            this.$moveSelection(this.moveCursorFileEnd);
        }, this.selectFileStart = function() {
            this.$moveSelection(this.moveCursorFileStart);
        }, this.selectWordRight = function() {
            this.$moveSelection(this.moveCursorWordRight);
        }, this.selectWordLeft = function() {
            this.$moveSelection(this.moveCursorWordLeft);
        }, this.getWordRange = function(e, t) {
            if ("undefined" == typeof t) {
                var n = e || this.lead;
                e = n.row, t = n.column;
            }
            return this.session.getWordRange(e, t);
        }, this.selectWord = function() {
            this.setSelectionRange(this.getWordRange());
        }, this.selectAWord = function() {
            var e = this.getCursor();
            var t = this.session.getAWordRange(e.row, e.column);
            this.setSelectionRange(t);
        }, this.getLineRange = function(e, t) {
            var n = "number" == typeof e ? e : this.lead.row;
            var r;
            var i = this.session.getFoldLine(n);
            if (i) {
                n = i.start.row, r = i.end.row;
            } else {
                r = n;
            }
            if (t === !0) {
                return new o(n, 0, r, this.session.getLine(r).length);
            } else {
                return new o(n, 0, r + 1, 0);
            }
        }, this.selectLine = function() {
            this.setSelectionRange(this.getLineRange());
        }, this.moveCursorUp = function() {
            this.moveCursorBy(-1, 0);
        }, this.moveCursorDown = function() {
            this.moveCursorBy(1, 0);
        }, this.moveCursorLeft = function() {
            var e = this.lead.getPosition(), t;
            if (t = this.session.getFoldAt(e.row, e.column, -1)) {
                this.moveCursorTo(t.start.row, t.start.column);
            } else {
                if (0 == e.column) {
                    if (e.row > 0) {
                        this.moveCursorTo(e.row - 1, this.doc.getLine(e.row - 1).length);
                    }
                } else {
                    var n = this.session.getTabSize();
                    if (this.session.isTabStop(e) && this.doc.getLine(e.row).slice(e.column - n, e.column).split(" ").length - 1 == n) {
                        this.moveCursorBy(0, -n);
                    } else {
                        this.moveCursorBy(0, -1);
                    }
                }
            }
        }, this.moveCursorRight = function() {
            var e = this.lead.getPosition(), t;
            if (t = this.session.getFoldAt(e.row, e.column, 1)) {
                this.moveCursorTo(t.end.row, t.end.column);
            } else {
                if (this.lead.column == this.doc.getLine(this.lead.row).length) {
                    if (this.lead.row < this.doc.getLength() - 1) {
                        this.moveCursorTo(this.lead.row + 1, 0);
                    }
                } else {
                    var n = this.session.getTabSize();
                    var e = this.lead;
                    if (this.session.isTabStop(e) && this.doc.getLine(e.row).slice(e.column, e.column + n).split(" ").length - 1 == n) {
                        this.moveCursorBy(0, n);
                    } else {
                        this.moveCursorBy(0, 1);
                    }
                }
            }
        }, this.moveCursorLineStart = function() {
            var e = this.lead.row;
            var t = this.lead.column;
            var n = this.session.documentToScreenRow(e, t);
            var r = this.session.screenToDocumentPosition(n, 0);
            var i = this.session.getDisplayLine(e, null, r.row, r.column);
            var s = i.match(/^\s*/);
            if (s[0].length != t && !this.session.$useEmacsStyleLineStart) {
                r.column += s[0].length;
            }
            this.moveCursorToPosition(r);
        }, this.moveCursorLineEnd = function() {
            var e = this.lead;
            var t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
            if (this.lead.column == t.column) {
                var n = this.session.getLine(t.row);
                if (t.column == n.length) {
                    var r = n.search(/\s+$/);
                    if (r > 0) {
                        t.column = r;
                    }
                }
            }
            this.moveCursorTo(t.row, t.column);
        }, this.moveCursorFileEnd = function() {
            var e = this.doc.getLength() - 1;
            var t = this.doc.getLine(e).length;
            this.moveCursorTo(e, t);
        }, this.moveCursorFileStart = function() {
            this.moveCursorTo(0, 0);
        }, this.moveCursorLongWordRight = function() {
            var e = this.lead.row;
            var t = this.lead.column;
            var n = this.doc.getLine(e);
            var r = n.substring(t);
            var i;
            this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
            var s = this.session.getFoldAt(e, t, 1);
            if (s) {
                return void this.moveCursorTo(s.end.row, s.end.column);
            }
            if (i = this.session.nonTokenRe.exec(r)) {
                t += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, r = n.substring(t);
            }
            if (t >= n.length) {
                if (this.moveCursorTo(e, n.length), this.moveCursorRight(), e < this.doc.getLength() - 1) {
                    this.moveCursorWordRight();
                }
                return;
            }
            if (i = this.session.tokenRe.exec(r)) {
                t += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0;
            }
            this.moveCursorTo(e, t);
        }, this.moveCursorLongWordLeft = function() {
            var e = this.lead.row;
            var t = this.lead.column;
            var n;
            if (n = this.session.getFoldAt(e, t, -1)) {
                return void this.moveCursorTo(n.start.row, n.start.column);
            }
            var r = this.session.getFoldStringAt(e, t, -1);
            if (null == r) {
                r = this.doc.getLine(e).substring(0, t);
            }
            var s = i.stringReverse(r);
            var o;
            if (this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, o = this.session.nonTokenRe.exec(s)) {
                t -= this.session.nonTokenRe.lastIndex, s = s.slice(this.session.nonTokenRe.lastIndex), 
                this.session.nonTokenRe.lastIndex = 0;
            }
            if (0 >= t) {
                if (this.moveCursorTo(e, 0), this.moveCursorLeft(), e > 0) {
                    this.moveCursorWordLeft();
                }
                return;
            }
            if (o = this.session.tokenRe.exec(s)) {
                t -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0;
            }
            this.moveCursorTo(e, t);
        }, this.$shortWordEndIndex = function(e) {
            var t, n = 0, r;
            var i = /\s/;
            var s = this.session.tokenRe;
            if (s.lastIndex = 0, t = this.session.tokenRe.exec(e)) {
                n = this.session.tokenRe.lastIndex;
            } else {
                while ((r = e[n]) && i.test(r)) {
                    n++;
                }
                if (1 > n) {
                    s.lastIndex = 0;
                    while ((r = e[n]) && !s.test(r)) {
                        if (s.lastIndex = 0, n++, i.test(r)) {
                            if (n > 2) {
                                n--;
                                break;
                            } else {
                                while ((r = e[n]) && i.test(r)) {
                                    n++;
                                }
                                if (n > 2) {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return s.lastIndex = 0, n;
        }, this.moveCursorShortWordRight = function() {
            var e = this.lead.row;
            var t = this.lead.column;
            var n = this.doc.getLine(e);
            var r = n.substring(t);
            var i = this.session.getFoldAt(e, t, 1);
            if (i) {
                return this.moveCursorTo(i.end.row, i.end.column);
            }
            if (t == n.length) {
                var s = this.doc.getLength();
                do {
                    e++, r = this.doc.getLine(e);
                } while (s > e && /^\s*$/.test(r));
                if (!/^\s+/.test(r)) {
                    r = "";
                }
                t = 0;
            }
            var o = this.$shortWordEndIndex(r);
            this.moveCursorTo(e, t + o);
        }, this.moveCursorShortWordLeft = function() {
            var e = this.lead.row;
            var t = this.lead.column;
            var n;
            if (n = this.session.getFoldAt(e, t, -1)) {
                return this.moveCursorTo(n.start.row, n.start.column);
            }
            var r = this.session.getLine(e).substring(0, t);
            if (0 == t) {
                do {
                    e--, r = this.doc.getLine(e);
                } while (e > 0 && /^\s*$/.test(r));
                if (t = r.length, !/\s+$/.test(r)) {
                    r = "";
                }
            }
            var s = i.stringReverse(r);
            var o = this.$shortWordEndIndex(s);
            return this.moveCursorTo(e, t - o);
        }, this.moveCursorWordRight = function() {
            if (this.session.$selectLongWords) {
                this.moveCursorLongWordRight();
            } else {
                this.moveCursorShortWordRight();
            }
        }, this.moveCursorWordLeft = function() {
            if (this.session.$selectLongWords) {
                this.moveCursorLongWordLeft();
            } else {
                this.moveCursorShortWordLeft();
            }
        }, this.moveCursorBy = function(e, t) {
            var n = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
            if (0 === t) {
                if (this.$desiredColumn) {
                    n.column = this.$desiredColumn;
                } else {
                    this.$desiredColumn = n.column;
                }
            }
            var r = this.session.screenToDocumentPosition(n.row + e, n.column);
            this.moveCursorTo(r.row, r.column + t, 0 === t);
        }, this.moveCursorToPosition = function(e) {
            this.moveCursorTo(e.row, e.column);
        }, this.moveCursorTo = function(e, t, n) {
            var r = this.session.getFoldAt(e, t, 1);
            if (r) {
                e = r.start.row, t = r.start.column;
            }
            if (this.$keepDesiredColumnOnChange = !0, this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, 
            !n) {
                this.$desiredColumn = null;
            }
        }, this.moveCursorToScreen = function(e, t, n) {
            var r = this.session.screenToDocumentPosition(e, t);
            this.moveCursorTo(r.row, r.column, n);
        }, this.detach = function() {
            this.lead.detach(), this.anchor.detach(), this.session = this.doc = null;
        }, this.fromOrientedRange = function(e) {
            this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn;
        }, this.toOrientedRange = function(e) {
            var t = this.getRange();
            if (e) {
                e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, 
                e.end.row = t.end.row;
            } else {
                e = t;
            }
            return e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, 
            e;
        }, this.toJSON = function() {
            if (this.rangeCount) {
                var e = this.ranges.map(function(e) {
                    var t = e.clone();
                    return t.isBackwards = e.cursor == e.start, t;
                });
            } else {
                var e = this.getRange();
                e.isBackwards = this.isBackwards();
            }
            return e;
        }, this.fromJSON = function(e) {
            if (void 0 == e.start) {
                if (this.rangeList) {
                    this.toSingleRange(e[0]);
                    for (var t = e.length; t--; ) {
                        var n = o.fromPoints(e[t].start, e[t].end);
                        if (e.isBackwards) {
                            n.cursor = n.start;
                        }
                        this.addRange(n, !0);
                    }
                    return;
                } else {
                    e = e[0];
                }
            }
            if (this.rangeList) {
                this.toSingleRange(e);
            }
            this.setSelectionRange(e, e.isBackwards);
        }, this.isEqual = function(e) {
            if ((e.length || this.rangeCount) && e.length != this.rangeCount) {
                return !1;
            }
            if (!e.length || !this.ranges) {
                return this.getRange().isEqual(e);
            }
            for (var t = this.ranges.length; t--; ) {
                if (!this.ranges[t].isEqual(e[t])) {
                    return !1;
                }
            }
            return !0;
        };
    }).call(u.prototype), t.Selection = u;
}), define("ace/range", [ "require", "exports", "module" ], function(e, t, n) {
    var r = function(e, t) {
        return e.row - t.row || e.column - t.column;
    };
    var i = function(e, t, n, r) {
        this.start = {
            row: e,
            column: t
        }, this.end = {
            row: n,
            column: r
        };
    };
    (function() {
        this.isEqual = function(e) {
            return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column;
        }, this.toString = function() {
            return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]";
        }, this.contains = function(e, t) {
            return 0 == this.compare(e, t);
        }, this.compareRange = function(e) {
            var t, n = e.end, r = e.start;
            if (t = this.compare(n.row, n.column), 1 == t) {
                if (t = this.compare(r.row, r.column), 1 == t) {
                    return 2;
                } else {
                    if (0 == t) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            } else {
                if (-1 == t) {
                    return -2;
                } else {
                    if (t = this.compare(r.row, r.column), -1 == t) {
                        return -1;
                    } else {
                        if (1 == t) {
                            return 42;
                        } else {
                            return 0;
                        }
                    }
                }
            }
        }, this.comparePoint = function(e) {
            return this.compare(e.row, e.column);
        }, this.containsRange = function(e) {
            return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end);
        }, this.intersects = function(e) {
            var t = this.compareRange(e);
            return -1 == t || 0 == t || 1 == t;
        }, this.isEnd = function(e, t) {
            return this.end.row == e && this.end.column == t;
        }, this.isStart = function(e, t) {
            return this.start.row == e && this.start.column == t;
        }, this.setStart = function(e, t) {
            if ("object" == typeof e) {
                this.start.column = e.column, this.start.row = e.row;
            } else {
                this.start.row = e, this.start.column = t;
            }
        }, this.setEnd = function(e, t) {
            if ("object" == typeof e) {
                this.end.column = e.column, this.end.row = e.row;
            } else {
                this.end.row = e, this.end.column = t;
            }
        }, this.inside = function(e, t) {
            if (0 == this.compare(e, t)) {
                if (this.isEnd(e, t) || this.isStart(e, t)) {
                    return !1;
                } else {
                    return !0;
                }
            }
            return !1;
        }, this.insideStart = function(e, t) {
            if (0 == this.compare(e, t)) {
                if (this.isEnd(e, t)) {
                    return !1;
                } else {
                    return !0;
                }
            }
            return !1;
        }, this.insideEnd = function(e, t) {
            if (0 == this.compare(e, t)) {
                if (this.isStart(e, t)) {
                    return !1;
                } else {
                    return !0;
                }
            }
            return !1;
        }, this.compare = function(e, t) {
            if (!this.isMultiLine()) {
                if (e === this.start.row) {
                    return t < this.start.column ? -1 : t > this.end.column ? 1 : 0;
                }
            }
            if (e < this.start.row) {
                return -1;
            }
            if (e > this.end.row) {
                return 1;
            }
            if (this.start.row === e) {
                return t >= this.start.column ? 0 : -1;
            }
            if (this.end.row === e) {
                return t <= this.end.column ? 0 : 1;
            }
            return 0;
        }, this.compareStart = function(e, t) {
            if (this.start.row == e && this.start.column == t) {
                return -1;
            } else {
                return this.compare(e, t);
            }
        }, this.compareEnd = function(e, t) {
            if (this.end.row == e && this.end.column == t) {
                return 1;
            } else {
                return this.compare(e, t);
            }
        }, this.compareInside = function(e, t) {
            if (this.end.row == e && this.end.column == t) {
                return 1;
            } else {
                if (this.start.row == e && this.start.column == t) {
                    return -1;
                } else {
                    return this.compare(e, t);
                }
            }
        }, this.clipRows = function(e, t) {
            if (this.end.row > t) {
                var n = {
                    row: t + 1,
                    column: 0
                };
            } else {
                if (this.end.row < e) {
                    var n = {
                        row: e,
                        column: 0
                    };
                }
            }
            if (this.start.row > t) {
                var r = {
                    row: t + 1,
                    column: 0
                };
            } else {
                if (this.start.row < e) {
                    var r = {
                        row: e,
                        column: 0
                    };
                }
            }
            return i.fromPoints(r || this.start, n || this.end);
        }, this.extend = function(e, t) {
            var n = this.compare(e, t);
            if (0 == n) {
                return this;
            } else {
                if (-1 == n) {
                    var r = {
                        row: e,
                        column: t
                    };
                } else {
                    var s = {
                        row: e,
                        column: t
                    };
                }
            }
            return i.fromPoints(r || this.start, s || this.end);
        }, this.isEmpty = function() {
            return this.start.row === this.end.row && this.start.column === this.end.column;
        }, this.isMultiLine = function() {
            return this.start.row !== this.end.row;
        }, this.clone = function() {
            return i.fromPoints(this.start, this.end);
        }, this.collapseRows = function() {
            if (0 == this.end.column) {
                return new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0);
            } else {
                return new i(this.start.row, 0, this.end.row, 0);
            }
        }, this.toScreenRange = function(e) {
            var t = e.documentToScreenPosition(this.start);
            var n = e.documentToScreenPosition(this.end);
            return new i(t.row, t.column, n.row, n.column);
        }, this.moveBy = function(e, t) {
            this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t;
        };
    }).call(i.prototype), i.fromPoints = function(e, t) {
        return new i(e.row, e.column, t.row, t.column);
    }, i.comparePoints = r, i.comparePoints = function(e, t) {
        return e.row - t.row || e.column - t.column;
    }, t.Range = i;
}), define("ace/mode/text", [ "require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range" ], function(e, t, n) {
    var r = e("../tokenizer").Tokenizer;
    var i = e("./text_highlight_rules").TextHighlightRules;
    var s = e("./behaviour").Behaviour;
    var o = e("../unicode");
    var u = e("../lib/lang");
    var a = e("../token_iterator").TokenIterator;
    var f = e("../range").Range;
    var l = function() {
        this.HighlightRules = i, this.$behaviour = new s();
    };
    (function() {
        this.tokenRe = new RegExp("^[" + o.packages.L + o.packages.Mn + o.packages.Mc + o.packages.Nd + o.packages.Pc + "\\$_]+", "g"), 
        this.nonTokenRe = new RegExp("^(?:[^" + o.packages.L + o.packages.Mn + o.packages.Mc + o.packages.Nd + o.packages.Pc + "\\$_]|s])+", "g"), 
        this.getTokenizer = function() {
            if (!this.$tokenizer) {
                this.$highlightRules = new this.HighlightRules(), this.$tokenizer = new r(this.$highlightRules.getRules());
            }
            return this.$tokenizer;
        }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function(e, t, n, r) {
            function w(e) {
                for (var t = n; r >= t; t++) {
                    e(i.getLine(t), t);
                }
            }
            var i = t.doc;
            var s = !0;
            var o = !0;
            var a = 1/0;
            var f = t.getTabSize();
            var l = !1;
            if (!this.lineCommentStart) {
                if (!this.blockComment) {
                    return !1;
                }
                var c = this.blockComment.start;
                var h = this.blockComment.end;
                var p = new RegExp("^(\\s*)(?:" + u.escapeRegExp(c) + ")");
                var d = new RegExp("(?:" + u.escapeRegExp(h) + ")\\s*$");
                var v = function(e, t) {
                    if (g(e, t)) {
                        return;
                    }
                    if (!s || /\S/.test(e)) {
                        i.insertInLine({
                            row: t,
                            column: e.length
                        }, h), i.insertInLine({
                            row: t,
                            column: a
                        }, c);
                    }
                };
                var m = function(e, t) {
                    var n;
                    if (n = e.match(d)) {
                        i.removeInLine(t, e.length - n[0].length, e.length);
                    }
                    if (n = e.match(p)) {
                        i.removeInLine(t, n[1].length, n[0].length);
                    }
                };
                var g = function(e, n) {
                    if (p.test(e)) {
                        return !0;
                    }
                    var r = t.getTokens(n);
                    for (var i = 0; i < r.length; i++) {
                        if ("comment" === r[i].type) {
                            return !0;
                        }
                    }
                };
            } else {
                if (Array.isArray(this.lineCommentStart)) {
                    var p = this.lineCommentStart.map(u.escapeRegExp).join("|");
                    var c = this.lineCommentStart[0];
                } else {
                    var p = u.escapeRegExp(this.lineCommentStart);
                    var c = this.lineCommentStart;
                }
                p = new RegExp("^(\\s*)(?:" + p + ") ?"), l = t.getUseSoftTabs();
                var m = function(e, t) {
                    var n = e.match(p);
                    if (!n) {
                        return;
                    }
                    var r = n[1].length, s = n[0].length;
                    if (!b(e, r, s) && " " == n[0][s - 1]) {
                        s--;
                    }
                    i.removeInLine(t, r, s);
                };
                var y = c + " ";
                var v = function(e, t) {
                    if (!s || /\S/.test(e)) {
                        if (b(e, a, a)) {
                            i.insertInLine({
                                row: t,
                                column: a
                            }, y);
                        } else {
                            i.insertInLine({
                                row: t,
                                column: a
                            }, c);
                        }
                    }
                };
                var g = function(e, t) {
                    return p.test(e);
                };
                var b = function(e, t, n) {
                    var r = 0;
                    while (t-- && " " == e.charAt(t)) {
                        r++;
                    }
                    if (r % f != 0) {
                        return !1;
                    }
                    var r = 0;
                    while (" " == e.charAt(n++)) {
                        r++;
                    }
                    if (f > 2) {
                        return r % f != f - 1;
                    } else {
                        return r % f == 0;
                    }
                    return !0;
                };
            }
            var E = 1/0;
            if (w(function(e, t) {
                var n = e.search(/\S/);
                if (-1 !== n) {
                    if (a > n) {
                        a = n;
                    }
                    if (o && !g(e, t)) {
                        o = !1;
                    }
                } else {
                    if (E > e.length) {
                        E = e.length;
                    }
                }
            }), 1/0 == a) {
                a = E, s = !1, o = !1;
            }
            if (l && a % f != 0) {
                a = Math.floor(a / f) * f;
            }
            w(o ? m : v);
        }, this.toggleBlockComment = function(e, t, n, r) {
            var i = this.blockComment;
            if (!i) {
                return;
            }
            if (!i.start && i[0]) {
                i = i[0];
            }
            var s = new a(t, r.row, r.column);
            var o = s.getCurrentToken();
            var u = t.selection;
            var l = t.selection.toOrientedRange();
            var c, h;
            if (o && /comment/.test(o.type)) {
                var p, d;
                while (o && /comment/.test(o.type)) {
                    var v = o.value.indexOf(i.start);
                    if (-1 != v) {
                        var m = s.getCurrentTokenRow();
                        var g = s.getCurrentTokenColumn() + v;
                        p = new f(m, g, m, g + i.start.length);
                        break;
                    }
                    o = s.stepBackward();
                }
                var s = new a(t, r.row, r.column);
                var o = s.getCurrentToken();
                while (o && /comment/.test(o.type)) {
                    var v = o.value.indexOf(i.end);
                    if (-1 != v) {
                        var m = s.getCurrentTokenRow();
                        var g = s.getCurrentTokenColumn() + v;
                        d = new f(m, g, m, g + i.end.length);
                        break;
                    }
                    o = s.stepForward();
                }
                if (d) {
                    t.remove(d);
                }
                if (p) {
                    t.remove(p), c = p.start.row, h = -i.start.length;
                }
            } else {
                h = i.start.length, c = n.start.row, t.insert(n.end, i.end), t.insert(n.start, i.start);
            }
            if (l.start.row == c) {
                l.start.column += h;
            }
            if (l.end.row == c) {
                l.end.column += h;
            }
            t.selection.fromOrientedRange(l);
        }, this.getNextLineIndent = function(e, t, n) {
            return this.$getIndent(t);
        }, this.checkOutdent = function(e, t, n) {
            return !1;
        }, this.autoOutdent = function(e, t, n) {}, this.$getIndent = function(e) {
            return e.match(/^\s*/)[0];
        }, this.createWorker = function(e) {
            return null;
        }, this.createModeDelegates = function(e) {
            this.$embeds = [], this.$modes = {};
            for (var t in e) {
                if (e[t]) {
                    this.$embeds.push(t), this.$modes[t] = new e[t]();
                }
            }
            var n = [ "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions" ];
            for (var t = 0; t < n.length; t++) {
                !function(e) {
                    var r = n[t];
                    var i = e[r];
                    e[n[t]] = function() {
                        return this.$delegator(r, arguments, i);
                    };
                }(this);
            }
        }, this.$delegator = function(e, t, n) {
            var r = t[0];
            if ("string" != typeof r) {
                r = r[0];
            }
            for (var i = 0; i < this.$embeds.length; i++) {
                if (!this.$modes[this.$embeds[i]]) {
                    continue;
                }
                var s = r.split(this.$embeds[i]);
                if (!s[0] && s[1]) {
                    t[0] = s[1];
                    var o = this.$modes[this.$embeds[i]];
                    return o[e].apply(o, t);
                }
            }
            var u = n.apply(this, t);
            return n ? u : void 0;
        }, this.transformAction = function(e, t, n, r, i) {
            if (this.$behaviour) {
                var s = this.$behaviour.getBehaviours();
                for (var o in s) {
                    if (s[o][t]) {
                        var u = s[o][t].apply(this, arguments);
                        if (u) {
                            return u;
                        }
                    }
                }
            }
        }, this.getKeywords = function(e) {
            if (!this.completionKeywords) {
                var t = this.$tokenizer.rules;
                var n = [];
                for (var r in t) {
                    var i = t[r];
                    for (var s = 0, o = i.length; o > s; s++) {
                        if ("string" == typeof i[s].token) {
                            if (/keyword|support|storage/.test(i[s].token)) {
                                n.push(i[s].regex);
                            }
                        } else {
                            if ("object" == typeof i[s].token) {
                                for (var u = 0, a = i[s].token.length; a > u; u++) {
                                    if (/keyword|support|storage/.test(i[s].token[u])) {
                                        var r = i[s].regex.match(/\(.+?\)/g)[u];
                                        n.push(r.substr(1, r.length - 2));
                                    }
                                }
                            }
                        }
                    }
                }
                this.completionKeywords = n;
            }
            if (!e) {
                return this.$keywordList;
            }
            return n.concat(this.$keywordList || []);
        }, this.$createKeywordList = function() {
            if (!this.$highlightRules) {
                this.getTokenizer();
            }
            return this.$keywordList = this.$highlightRules.$keywordList || [];
        }, this.getCompletions = function(e, t, n, r) {
            var i = this.$keywordList || this.$createKeywordList();
            return i.map(function(e) {
                return {
                    name: e,
                    value: e,
                    score: 0,
                    meta: "keyword"
                };
            });
        };
    }).call(l.prototype), t.Mode = l;
}), define("ace/tokenizer", [ "require", "exports", "module" ], function(e, t, n) {
    var r = 1e3;
    var i = function(e) {
        this.states = e, this.regExps = {}, this.matchMappings = {};
        for (var t in this.states) {
            var n = this.states[t];
            var r = [];
            var i = 0;
            var s = this.matchMappings[t] = {
                defaultToken: "text"
            };
            var o = "g";
            var u = [];
            for (var a = 0; a < n.length; a++) {
                var f = n[a];
                if (f.defaultToken) {
                    s.defaultToken = f.defaultToken;
                }
                if (f.caseInsensitive) {
                    o = "gi";
                }
                if (null == f.regex) {
                    continue;
                }
                if (f.regex instanceof RegExp) {
                    f.regex = f.regex.toString().slice(1, -1);
                }
                var l = f.regex;
                var c = new RegExp("(?:(" + l + ")|(.))").exec("a").length - 2;
                if (Array.isArray(f.token)) {
                    if (1 == f.token.length || 1 == c) {
                        f.token = f.token[0];
                    } else {
                        if (c - 1 != f.token.length) {
                            throw new Error("number of classes and regexp groups in '" + f.token + "'\n'" + f.regex + "' doesn't match\n" + (c - 1) + "!=" + f.token.length);
                        } else {
                            f.tokenArray = f.token, f.token = null, f.onMatch = this.$arrayTokens;
                        }
                    }
                } else {
                    if ("function" == typeof f.token && !f.onMatch) {
                        if (c > 1) {
                            f.onMatch = this.$applyToken;
                        } else {
                            f.onMatch = f.token;
                        }
                    }
                }
                if (c > 1) {
                    if (/\\\d/.test(f.regex)) {
                        l = f.regex.replace(/\\([0-9]+)/g, function(e, t) {
                            return "\\" + (parseInt(t, 10) + i + 1);
                        });
                    } else {
                        c = 1, l = this.removeCapturingGroups(f.regex);
                    }
                    if (!f.splitRegex && "string" != typeof f.token) {
                        u.push(f);
                    }
                }
                if (s[i] = a, i += c, r.push(l), !f.onMatch) {
                    f.onMatch = null;
                }
                f.__proto__ = null;
            }
            u.forEach(function(e) {
                e.splitRegex = this.createSplitterRegexp(e.regex, o);
            }, this), this.regExps[t] = new RegExp("(" + r.join(")|(") + ")|($)", o);
        }
    };
    (function() {
        this.$setMaxTokenCount = function(e) {
            r = 0 | e;
        }, this.$applyToken = function(e) {
            var t = this.splitRegex.exec(e).slice(1);
            var n = this.token.apply(this, t);
            if ("string" == typeof n) {
                return [ {
                    type: n,
                    value: e
                } ];
            }
            var r = [];
            for (var i = 0, s = n.length; s > i; i++) {
                if (t[i]) {
                    r[r.length] = {
                        type: n[i],
                        value: t[i]
                    };
                }
            }
            return r;
        }, this.$arrayTokens = function(e) {
            if (!e) {
                return [];
            }
            var t = this.splitRegex.exec(e);
            if (!t) {
                return "text";
            }
            var n = [];
            var r = this.tokenArray;
            for (var i = 0, s = r.length; s > i; i++) {
                if (t[i + 1]) {
                    n[n.length] = {
                        type: r[i],
                        value: t[i + 1]
                    };
                }
            }
            return n;
        }, this.removeCapturingGroups = function(e) {
            var t = e.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function(e, t) {
                return t ? "(?:" : e;
            });
            return t;
        }, this.createSplitterRegexp = function(e, t) {
            if (-1 != e.indexOf("(?=")) {
                var n = 0;
                var r = !1;
                var i = {};
                if (e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(e, t, s, o, u, a) {
                    if (r) {
                        r = "]" != u;
                    } else {
                        if (u) {
                            r = !0;
                        } else {
                            if (o) {
                                if (n == i.stack) {
                                    i.end = a + 1, i.stack = -1;
                                }
                                n--;
                            } else {
                                if (s) {
                                    if (n++, 1 != s.length) {
                                        i.stack = n, i.start = a;
                                    }
                                }
                            }
                        }
                    }
                    return e;
                }), null != i.end && /^\)*$/.test(e.substr(i.end))) {
                    e = e.substring(0, i.start) + e.substr(i.end);
                }
            }
            return new RegExp(e, (t || "").replace("g", ""));
        }, this.getLineTokens = function(e, t) {
            if (t && "string" != typeof t) {
                var n = t.slice(0);
                t = n[0];
            } else {
                var n = [];
            }
            var i = t || "start";
            var s = this.states[i];
            var o = this.matchMappings[i];
            var u = this.regExps[i];
            u.lastIndex = 0;
            var a, f = [];
            var l = 0;
            var c = {
                type: null,
                value: ""
            };
            while (a = u.exec(e)) {
                var h = o.defaultToken;
                var p = null;
                var d = a[0];
                var v = u.lastIndex;
                if (v - d.length > l) {
                    var m = e.substring(l, v - d.length);
                    if (c.type == h) {
                        c.value += m;
                    } else {
                        if (c.type) {
                            f.push(c);
                        }
                        c = {
                            type: h,
                            value: m
                        };
                    }
                }
                for (var g = 0; g < a.length - 2; g++) {
                    if (void 0 === a[g + 1]) {
                        continue;
                    }
                    if (p = s[o[g]], p.onMatch) {
                        h = p.onMatch(d, i, n);
                    } else {
                        h = p.token;
                    }
                    if (p.next) {
                        if ("string" == typeof p.next) {
                            i = p.next;
                        } else {
                            i = p.next(i, n);
                        }
                        if (s = this.states[i], !s) {
                            window.console && console.error && console.error(i, "doesn't exist"), i = "start", 
                            s = this.states[i];
                        }
                        o = this.matchMappings[i], l = v, u = this.regExps[i], u.lastIndex = v;
                    }
                    break;
                }
                if (d) {
                    if ("string" == typeof h) {
                        if ((!p || p.merge !== !1) && c.type === h) {
                            c.value += d;
                        } else {
                            if (c.type) {
                                f.push(c);
                            }
                            c = {
                                type: h,
                                value: d
                            };
                        }
                    } else {
                        if (h) {
                            if (c.type) {
                                f.push(c);
                            }
                            c = {
                                type: null,
                                value: ""
                            };
                            for (var g = 0; g < h.length; g++) {
                                f.push(h[g]);
                            }
                        }
                    }
                }
                if (l == e.length) {
                    break;
                }
                if (l = v, f.length > r) {
                    while (l < e.length) {
                        if (c.type) {
                            f.push(c);
                        }
                        c = {
                            value: e.substring(l, l += 2e3),
                            type: "overflow"
                        };
                    }
                    i = "start", n = [];
                    break;
                }
            }
            if (c.type) {
                f.push(c);
            }
            return {
                tokens: f,
                state: n.length ? n : i
            };
        };
    }).call(i.prototype), t.Tokenizer = i;
}), define("ace/mode/text_highlight_rules", [ "require", "exports", "module", "ace/lib/lang" ], function(e, t, n) {
    var r = e("../lib/lang");
    var i = function() {
        this.$rules = {
            start: [ {
                token: "empty_line",
                regex: "^$"
            }, {
                defaultToken: "text"
            } ]
        };
    };
    (function() {
        this.addRules = function(e, t) {
            if (!t) {
                for (var n in e) {
                    this.$rules[n] = e[n];
                }
                return;
            }
            for (var n in e) {
                var r = e[n];
                for (var i = 0; i < r.length; i++) {
                    var s = r[i];
                    if (s.next) {
                        if ("string" != typeof s.next) {
                            if (s.nextState && 0 !== s.nextState.indexOf(t)) {
                                s.nextState = t + s.nextState;
                            }
                        } else {
                            if (0 !== s.next.indexOf(t)) {
                                s.next = t + s.next;
                            }
                        }
                    }
                }
                this.$rules[t + n] = r;
            }
        }, this.getRules = function() {
            return this.$rules;
        }, this.embedRules = function(e, t, n, i, s) {
            var o = new e().getRules();
            if (i) {
                for (var u = 0; u < i.length; u++) {
                    i[u] = t + i[u];
                }
            } else {
                i = [];
                for (var a in o) {
                    i.push(t + a);
                }
            }
            if (this.addRules(o, t), n) {
                var f = Array.prototype[s ? "push" : "unshift"];
                for (var u = 0; u < i.length; u++) {
                    f.apply(this.$rules[i[u]], r.deepCopy(n));
                }
            }
            if (!this.$embeds) {
                this.$embeds = [];
            }
            this.$embeds.push(t);
        }, this.getEmbeds = function() {
            return this.$embeds;
        };
        var e = function(e, t) {
            if ("start" != e) {
                t.unshift(this.nextState, e);
            }
            return this.nextState;
        };
        var t = function(e, t) {
            if (t[0] !== e) {
                return "start";
            }
            return t.shift(), t.shift();
        };
        this.normalizeRules = function() {
            function i(s) {
                var o = r[s];
                o.processed = !0;
                for (var u = 0; u < o.length; u++) {
                    var a = o[u];
                    if (!a.regex && a.start) {
                        if (a.regex = a.start, !a.next) {
                            a.next = [];
                        }
                        a.next.push({
                            defaultToken: a.token
                        }, {
                            token: a.token + ".end",
                            regex: a.end || a.start,
                            next: "pop"
                        }), a.token = a.token + ".start", a.push = !0;
                    }
                    var f = a.next || a.push;
                    if (f && Array.isArray(f)) {
                        var l = a.stateName;
                        if (!l) {
                            if (l = a.token, "string" != typeof l) {
                                l = l[0] || "";
                            }
                            if (r[l]) {
                                l += n++;
                            }
                        }
                        r[l] = f, a.next = l, i(l);
                    } else {
                        if ("pop" == f) {
                            a.next = t;
                        }
                    }
                    if (a.push) {
                        a.nextState = a.next || a.push, a.next = e, delete a.push;
                    }
                    if (a.rules) {
                        for (var c in a.rules) {
                            if (r[c]) {
                                if (r[c].push) {
                                    r[c].push.apply(r[c], a.rules[c]);
                                }
                            } else {
                                r[c] = a.rules[c];
                            }
                        }
                    }
                    if (a.include || "string" == typeof a) {
                        var h = a.include || a;
                        var p = r[h];
                    } else {
                        if (Array.isArray(a)) {
                            p = a;
                        }
                    }
                    if (p) {
                        var d = [ u, 1 ].concat(p);
                        if (a.noEscape) {
                            d = d.filter(function(e) {
                                return !e.next;
                            });
                        }
                        o.splice.apply(o, d), u--, p = null;
                    }
                    if (a.keywordMap) {
                        a.token = this.createKeywordMapper(a.keywordMap, a.defaultToken || "text", a.caseInsensitive), 
                        delete a.defaultToken;
                    }
                }
            }
            var n = 0;
            var r = this.$rules;
            Object.keys(r).forEach(i, this);
        }, this.createKeywordMapper = function(e, t, n, r) {
            var i = Object.create(null);
            if (Object.keys(e).forEach(function(t) {
                var s = e[t];
                if (n) {
                    s = s.toLowerCase();
                }
                var o = s.split(r || "|");
                for (var u = o.length; u--; ) {
                    i[o[u]] = t;
                }
            }), Object.getPrototypeOf(i)) {
                i.__proto__ = null;
            }
            return this.$keywordList = Object.keys(i), e = null, n ? function(e) {
                return i[e.toLowerCase()] || t;
            } : function(e) {
                return i[e] || t;
            };
        }, this.getKeywords = function() {
            return this.$keywords;
        };
    }).call(i.prototype), t.TextHighlightRules = i;
}), define("ace/mode/behaviour", [ "require", "exports", "module" ], function(e, t, n) {
    var r = function() {
        this.$behaviours = {};
    };
    (function() {
        this.add = function(e, t, n) {
            switch (void 0) {
              case this.$behaviours:
                this.$behaviours = {};

              case this.$behaviours[e]:
                this.$behaviours[e] = {};
            }
            this.$behaviours[e][t] = n;
        }, this.addBehaviours = function(e) {
            for (var t in e) {
                for (var n in e[t]) {
                    this.add(t, n, e[t][n]);
                }
            }
        }, this.remove = function(e) {
            if (this.$behaviours && this.$behaviours[e]) {
                delete this.$behaviours[e];
            }
        }, this.inherit = function(e, t) {
            if ("function" == typeof e) {
                var n = new e().getBehaviours(t);
            } else {
                var n = e.getBehaviours(t);
            }
            this.addBehaviours(n);
        }, this.getBehaviours = function(e) {
            if (!e) {
                return this.$behaviours;
            } else {
                var t = {};
                for (var n = 0; n < e.length; n++) {
                    if (this.$behaviours[e[n]]) {
                        t[e[n]] = this.$behaviours[e[n]];
                    }
                }
                return t;
            }
        };
    }).call(r.prototype), t.Behaviour = r;
}), define("ace/unicode", [ "require", "exports", "module" ], function(e, t, n) {
    function r(e) {
        var n = /\w{4}/g;
        for (var r in e) {
            t.packages[r] = e[r].replace(n, "\\u$&");
        }
    }
    t.packages = {}, r({
        L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
        Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
        Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
        Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
        Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
        Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
        M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
        Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
        Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
        Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
        N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
        Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
        Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
        No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
        P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
        Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
        Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
        Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
        Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
        Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
        Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
        Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
        S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
        Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
        Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
        Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
        So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
        Z: "002000A01680180E2000-200A20282029202F205F3000",
        Zs: "002000A01680180E2000-200A202F205F3000",
        Zl: "2028",
        Zp: "2029",
        C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
        Cc: "0000-001F007F-009F",
        Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
        Co: "E000-F8FF",
        Cs: "D800-DFFF",
        Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
    });
}), define("ace/token_iterator", [ "require", "exports", "module" ], function(e, t, n) {
    var r = function(e, t, n) {
        this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
        var r = e.getTokenAt(t, n);
        this.$tokenIndex = r ? r.index : -1;
    };
    (function() {
        this.stepBackward = function() {
            this.$tokenIndex -= 1;
            while (this.$tokenIndex < 0) {
                if (this.$row -= 1, this.$row < 0) {
                    return this.$row = 0, null;
                }
                this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1;
            }
            return this.$rowTokens[this.$tokenIndex];
        }, this.stepForward = function() {
            this.$tokenIndex += 1;
            var e;
            while (this.$tokenIndex >= this.$rowTokens.length) {
                if (this.$row += 1, !e) {
                    e = this.$session.getLength();
                }
                if (this.$row >= e) {
                    return this.$row = e - 1, null;
                }
                this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0;
            }
            return this.$rowTokens[this.$tokenIndex];
        }, this.getCurrentToken = function() {
            return this.$rowTokens[this.$tokenIndex];
        }, this.getCurrentTokenRow = function() {
            return this.$row;
        }, this.getCurrentTokenColumn = function() {
            var e = this.$rowTokens;
            var t = this.$tokenIndex;
            var n = e[t].start;
            if (void 0 !== n) {
                return n;
            }
            n = 0;
            while (t > 0) {
                t -= 1, n += e[t].value.length;
            }
            return n;
        };
    }).call(r.prototype), t.TokenIterator = r;
}), define("ace/document", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/range", "ace/anchor" ], function(e, t, n) {
    var r = e("./lib/oop");
    var i = e("./lib/event_emitter").EventEmitter;
    var s = e("./range").Range;
    var o = e("./anchor").Anchor;
    var u = function(e) {
        if (this.$lines = [], 0 == e.length) {
            this.$lines = [ "" ];
        } else {
            if (Array.isArray(e)) {
                this._insertLines(0, e);
            } else {
                this.insert({
                    row: 0,
                    column: 0
                }, e);
            }
        }
    };
    (function() {
        if (r.implement(this, i), this.setValue = function(e) {
            var t = this.getLength();
            this.remove(new s(0, 0, t, this.getLine(t - 1).length)), this.insert({
                row: 0,
                column: 0
            }, e);
        }, this.getValue = function() {
            return this.getAllLines().join(this.getNewLineCharacter());
        }, this.createAnchor = function(e, t) {
            return new o(this, e, t);
        }, 0 == "aaa".split(/a/).length) {
            this.$split = function(e) {
                return e.replace(/\r\n|\r/g, "\n").split("\n");
            };
        } else {
            this.$split = function(e) {
                return e.split(/\r\n|\r|\n/);
            };
        }
        this.$detectNewLine = function(e) {
            var t = e.match(/^.*?(\r\n|\r|\n)/m);
            this.$autoNewLine = t ? t[1] : "\n";
        }, this.getNewLineCharacter = function() {
            switch (this.$newLineMode) {
              case "windows":
                return "\r\n";

              case "unix":
                return "\n";

              default:
                return this.$autoNewLine;
            }
        }, this.$autoNewLine = "\n", this.$newLineMode = "auto", this.setNewLineMode = function(e) {
            if (this.$newLineMode === e) {
                return;
            }
            this.$newLineMode = e;
        }, this.getNewLineMode = function() {
            return this.$newLineMode;
        }, this.isNewLine = function(e) {
            return "\r\n" == e || "\r" == e || "\n" == e;
        }, this.getLine = function(e) {
            return this.$lines[e] || "";
        }, this.getLines = function(e, t) {
            return this.$lines.slice(e, t + 1);
        }, this.getAllLines = function() {
            return this.getLines(0, this.getLength());
        }, this.getLength = function() {
            return this.$lines.length;
        }, this.getTextRange = function(e) {
            if (e.start.row == e.end.row) {
                return this.getLine(e.start.row).substring(e.start.column, e.end.column);
            }
            var t = this.getLines(e.start.row, e.end.row);
            t[0] = (t[0] || "").substring(e.start.column);
            var n = t.length - 1;
            if (e.end.row - e.start.row == n) {
                t[n] = t[n].substring(0, e.end.column);
            }
            return t.join(this.getNewLineCharacter());
        }, this.$clipPosition = function(e) {
            var t = this.getLength();
            if (e.row >= t) {
                e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length;
            } else {
                if (e.row < 0) {
                    e.row = 0;
                }
            }
            return e;
        }, this.insert = function(e, t) {
            if (!t || 0 === t.length) {
                return e;
            }
            if (e = this.$clipPosition(e), this.getLength() <= 1) {
                this.$detectNewLine(t);
            }
            var n = this.$split(t);
            var r = n.splice(0, 1)[0];
            var i = 0 == n.length ? null : n.splice(n.length - 1, 1)[0];
            if (e = this.insertInLine(e, r), null !== i) {
                e = this.insertNewLine(e), e = this._insertLines(e.row, n), e = this.insertInLine(e, i || "");
            }
            return e;
        }, this.insertLines = function(e, t) {
            if (e >= this.getLength()) {
                return this.insert({
                    row: e,
                    column: 0
                }, "\n" + t.join("\n"));
            }
            return this._insertLines(Math.max(e, 0), t);
        }, this._insertLines = function(e, t) {
            if (0 == t.length) {
                return {
                    row: e,
                    column: 0
                };
            }
            if (t.length > 65535) {
                var n = this._insertLines(e, t.slice(65535));
                t = t.slice(0, 65535);
            }
            var r = [ e, 0 ];
            r.push.apply(r, t), this.$lines.splice.apply(this.$lines, r);
            var i = new s(e, 0, e + t.length, 0);
            var o = {
                action: "insertLines",
                range: i,
                lines: t
            };
            return this._emit("change", {
                data: o
            }), n || i.end;
        }, this.insertNewLine = function(e) {
            e = this.$clipPosition(e);
            var t = this.$lines[e.row] || "";
            this.$lines[e.row] = t.substring(0, e.column), this.$lines.splice(e.row + 1, 0, t.substring(e.column, t.length));
            var n = {
                row: e.row + 1,
                column: 0
            };
            var r = {
                action: "insertText",
                range: s.fromPoints(e, n),
                text: this.getNewLineCharacter()
            };
            return this._emit("change", {
                data: r
            }), n;
        }, this.insertInLine = function(e, t) {
            if (0 == t.length) {
                return e;
            }
            var n = this.$lines[e.row] || "";
            this.$lines[e.row] = n.substring(0, e.column) + t + n.substring(e.column);
            var r = {
                row: e.row,
                column: e.column + t.length
            };
            var i = {
                action: "insertText",
                range: s.fromPoints(e, r),
                text: t
            };
            return this._emit("change", {
                data: i
            }), r;
        }, this.remove = function(e) {
            if (!e instanceof s) {
                e = s.fromPoints(e.start, e.end);
            }
            if (e.start = this.$clipPosition(e.start), e.end = this.$clipPosition(e.end), e.isEmpty()) {
                return e.start;
            }
            var t = e.start.row;
            var n = e.end.row;
            if (e.isMultiLine()) {
                var r = 0 == e.start.column ? t : t + 1;
                var i = n - 1;
                if (e.end.column > 0) {
                    this.removeInLine(n, 0, e.end.column);
                }
                if (i >= r) {
                    this._removeLines(r, i);
                }
                if (r != t) {
                    this.removeInLine(t, e.start.column, this.getLine(t).length), this.removeNewLine(e.start.row);
                }
            } else {
                this.removeInLine(t, e.start.column, e.end.column);
            }
            return e.start;
        }, this.removeInLine = function(e, t, n) {
            if (t == n) {
                return;
            }
            var r = new s(e, t, e, n);
            var i = this.getLine(e);
            var o = i.substring(t, n);
            var u = i.substring(0, t) + i.substring(n, i.length);
            this.$lines.splice(e, 1, u);
            var a = {
                action: "removeText",
                range: r,
                text: o
            };
            return this._emit("change", {
                data: a
            }), r.start;
        }, this.removeLines = function(e, t) {
            if (0 > e || t >= this.getLength()) {
                return this.remove(new s(e, 0, t + 1, 0));
            }
            return this._removeLines(e, t);
        }, this._removeLines = function(e, t) {
            var n = new s(e, 0, t + 1, 0);
            var r = this.$lines.splice(e, t - e + 1);
            var i = {
                action: "removeLines",
                range: n,
                nl: this.getNewLineCharacter(),
                lines: r
            };
            return this._emit("change", {
                data: i
            }), r;
        }, this.removeNewLine = function(e) {
            var t = this.getLine(e);
            var n = this.getLine(e + 1);
            var r = new s(e, t.length, e + 1, 0);
            var i = t + n;
            this.$lines.splice(e, 2, i);
            var o = {
                action: "removeText",
                range: r,
                text: this.getNewLineCharacter()
            };
            this._emit("change", {
                data: o
            });
        }, this.replace = function(e, t) {
            if (!e instanceof s) {
                e = s.fromPoints(e.start, e.end);
            }
            if (0 == t.length && e.isEmpty()) {
                return e.start;
            }
            if (t == this.getTextRange(e)) {
                return e.end;
            }
            if (this.remove(e), t) {
                var n = this.insert(e.start, t);
            } else {
                n = e.start;
            }
            return n;
        }, this.applyDeltas = function(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                var r = s.fromPoints(n.range.start, n.range.end);
                if ("insertLines" == n.action) {
                    this.insertLines(r.start.row, n.lines);
                } else {
                    if ("insertText" == n.action) {
                        this.insert(r.start, n.text);
                    } else {
                        if ("removeLines" == n.action) {
                            this._removeLines(r.start.row, r.end.row - 1);
                        } else {
                            if ("removeText" == n.action) {
                                this.remove(r);
                            }
                        }
                    }
                }
            }
        }, this.revertDeltas = function(e) {
            for (var t = e.length - 1; t >= 0; t--) {
                var n = e[t];
                var r = s.fromPoints(n.range.start, n.range.end);
                if ("insertLines" == n.action) {
                    this._removeLines(r.start.row, r.end.row - 1);
                } else {
                    if ("insertText" == n.action) {
                        this.remove(r);
                    } else {
                        if ("removeLines" == n.action) {
                            this._insertLines(r.start.row, n.lines);
                        } else {
                            if ("removeText" == n.action) {
                                this.insert(r.start, n.text);
                            }
                        }
                    }
                }
            }
        }, this.indexToPosition = function(e, t) {
            var n = this.$lines || this.getAllLines();
            var r = this.getNewLineCharacter().length;
            for (var i = t || 0, s = n.length; s > i; i++) {
                if (e -= n[i].length + r, 0 > e) {
                    return {
                        row: i,
                        column: e + n[i].length + r
                    };
                }
            }
            return {
                row: s - 1,
                column: n[s - 1].length
            };
        }, this.positionToIndex = function(e, t) {
            var n = this.$lines || this.getAllLines();
            var r = this.getNewLineCharacter().length;
            var i = 0;
            var s = Math.min(e.row, n.length);
            for (var o = t || 0; s > o; ++o) {
                i += n[o].length + r;
            }
            return i + e.column;
        };
    }).call(u.prototype), t.Document = u;
}), define("ace/anchor", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter" ], function(e, t, n) {
    var r = e("./lib/oop");
    var i = e("./lib/event_emitter").EventEmitter;
    var s = t.Anchor = function(e, t, n) {
        if (this.$onChange = this.onChange.bind(this), this.attach(e), "undefined" == typeof n) {
            this.setPosition(t.row, t.column);
        } else {
            this.setPosition(t, n);
        }
    };
    (function() {
        r.implement(this, i), this.getPosition = function() {
            return this.$clipPositionToDocument(this.row, this.column);
        }, this.getDocument = function() {
            return this.document;
        }, this.$insertRight = !1, this.onChange = function(e) {
            var t = e.data;
            var n = t.range;
            if (n.start.row == n.end.row && n.start.row != this.row) {
                return;
            }
            if (n.start.row > this.row) {
                return;
            }
            if (n.start.row == this.row && n.start.column > this.column) {
                return;
            }
            var r = this.row;
            var i = this.column;
            var s = n.start;
            var o = n.end;
            if ("insertText" === t.action) {
                if (s.row === r && s.column <= i) {
                    if (s.column === i && this.$insertRight) {
                        ;
                    } else {
                        if (s.row === o.row) {
                            i += o.column - s.column;
                        } else {
                            i -= s.column, r += o.row - s.row;
                        }
                    }
                } else {
                    if (s.row !== o.row && s.row < r) {
                        r += o.row - s.row;
                    }
                }
            } else {
                if ("insertLines" === t.action) {
                    if (s.row <= r) {
                        r += o.row - s.row;
                    }
                } else {
                    if ("removeText" === t.action) {
                        if (s.row === r && s.column < i) {
                            if (o.column >= i) {
                                i = s.column;
                            } else {
                                i = Math.max(0, i - (o.column - s.column));
                            }
                        } else {
                            if (s.row !== o.row && s.row < r) {
                                if (o.row === r) {
                                    i = Math.max(0, i - o.column) + s.column;
                                }
                                r -= o.row - s.row;
                            } else {
                                if (o.row === r) {
                                    r -= o.row - s.row, i = Math.max(0, i - o.column) + s.column;
                                }
                            }
                        }
                    } else {
                        if ("removeLines" == t.action) {
                            if (s.row <= r) {
                                if (o.row <= r) {
                                    r -= o.row - s.row;
                                } else {
                                    r = s.row, i = 0;
                                }
                            }
                        }
                    }
                }
            }
            this.setPosition(r, i, !0);
        }, this.setPosition = function(e, t, n) {
            var r;
            if (n) {
                r = {
                    row: e,
                    column: t
                };
            } else {
                r = this.$clipPositionToDocument(e, t);
            }
            if (this.row == r.row && this.column == r.column) {
                return;
            }
            var i = {
                row: this.row,
                column: this.column
            };
            this.row = r.row, this.column = r.column, this._emit("change", {
                old: i,
                value: r
            });
        }, this.detach = function() {
            this.document.removeEventListener("change", this.$onChange);
        }, this.attach = function(e) {
            this.document = e || this.document, this.document.on("change", this.$onChange);
        }, this.$clipPositionToDocument = function(e, t) {
            var n = {};
            if (e >= this.document.getLength()) {
                n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length;
            } else {
                if (0 > e) {
                    n.row = 0, n.column = 0;
                } else {
                    n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t));
                }
            }
            if (0 > t) {
                n.column = 0;
            }
            return n;
        };
    }).call(s.prototype);
}), define("ace/background_tokenizer", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter" ], function(e, t, n) {
    var r = e("./lib/oop");
    var i = e("./lib/event_emitter").EventEmitter;
    var s = function(e, t) {
        this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
        var n = this;
        this.$worker = function() {
            if (!n.running) {
                return;
            }
            var e = new Date();
            var t = n.currentLine;
            var r = -1;
            var i = n.doc;
            while (n.lines[t]) {
                t++;
            }
            var s = t;
            var o = i.getLength();
            var u = 0;
            n.running = !1;
            while (o > t) {
                n.$tokenizeRow(t), r = t;
                do {
                    t++;
                } while (n.lines[t]);
                if (u++, u % 5 == 0 && new Date() - e > 20) {
                    return n.running = setTimeout(n.$worker, 20), void (n.currentLine = t);
                }
            }
            if (n.currentLine = t, r >= s) {
                n.fireUpdateEvent(s, r);
            }
        };
    };
    (function() {
        r.implement(this, i), this.setTokenizer = function(e) {
            this.tokenizer = e, this.lines = [], this.states = [], this.start(0);
        }, this.setDocument = function(e) {
            this.doc = e, this.lines = [], this.states = [], this.stop();
        }, this.fireUpdateEvent = function(e, t) {
            var n = {
                first: e,
                last: t
            };
            this._emit("update", {
                data: n
            });
        }, this.start = function(e) {
            this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), 
            this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700);
        }, this.scheduleStart = function() {
            if (!this.running) {
                this.running = setTimeout(this.$worker, 700);
            }
        }, this.$updateOnChange = function(e) {
            var t = e.range;
            var n = t.start.row;
            var r = t.end.row - n;
            if (0 === r) {
                this.lines[n] = null;
            } else {
                if ("removeText" == e.action || "removeLines" == e.action) {
                    this.lines.splice(n, r + 1, null), this.states.splice(n, r + 1, null);
                } else {
                    var i = Array(r + 1);
                    i.unshift(n, 1), this.lines.splice.apply(this.lines, i), this.states.splice.apply(this.states, i);
                }
            }
            this.currentLine = Math.min(n, this.currentLine, this.doc.getLength()), this.stop();
        }, this.stop = function() {
            if (this.running) {
                clearTimeout(this.running);
            }
            this.running = !1;
        }, this.getTokens = function(e) {
            return this.lines[e] || this.$tokenizeRow(e);
        }, this.getState = function(e) {
            if (this.currentLine == e) {
                this.$tokenizeRow(e);
            }
            return this.states[e] || "start";
        }, this.$tokenizeRow = function(e) {
            var t = this.doc.getLine(e);
            var n = this.states[e - 1];
            var r = this.tokenizer.getLineTokens(t, n, e);
            if (this.states[e] + "" != r.state + "") {
                if (this.states[e] = r.state, this.lines[e + 1] = null, this.currentLine > e + 1) {
                    this.currentLine = e + 1;
                }
            } else {
                if (this.currentLine == e) {
                    this.currentLine = e + 1;
                }
            }
            return this.lines[e] = r.tokens;
        };
    }).call(s.prototype), t.BackgroundTokenizer = s;
}), define("ace/search_highlight", [ "require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range" ], function(e, t, n) {
    var r = e("./lib/lang");
    var i = e("./lib/oop");
    var s = e("./range").Range;
    var o = function(e, t, n) {
        this.setRegexp(e), this.clazz = t, this.type = n || "text";
    };
    (function() {
        this.MAX_RANGES = 500, this.setRegexp = function(e) {
            if (this.regExp + "" == e + "") {
                return;
            }
            this.regExp = e, this.cache = [];
        }, this.update = function(e, t, n, i) {
            if (!this.regExp) {
                return;
            }
            var o = i.firstRow, u = i.lastRow;
            for (var a = o; u >= a; a++) {
                var f = this.cache[a];
                if (null == f) {
                    if (f = r.getMatchOffsets(n.getLine(a), this.regExp), f.length > this.MAX_RANGES) {
                        f = f.slice(0, this.MAX_RANGES);
                    }
                    f = f.map(function(e) {
                        return new s(a, e.offset, a, e.offset + e.length);
                    }), this.cache[a] = f.length ? f : "";
                }
                for (var l = f.length; l--; ) {
                    t.drawSingleLineMarker(e, f[l].toScreenRange(n), this.clazz, i);
                }
            }
        };
    }).call(o.prototype), t.SearchHighlight = o;
}), define("ace/edit_session/folding", [ "require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator" ], function(e, t, n) {
    function u() {
        this.getFoldAt = function(e, t, n) {
            var r = this.getFoldLine(e);
            if (!r) {
                return null;
            }
            var i = r.folds;
            for (var s = 0; s < i.length; s++) {
                var o = i[s];
                if (o.range.contains(e, t)) {
                    if (1 == n && o.range.isEnd(e, t)) {
                        continue;
                    } else {
                        if (-1 == n && o.range.isStart(e, t)) {
                            continue;
                        }
                    }
                    return o;
                }
            }
        }, this.getFoldsInRange = function(e) {
            var t = e.start;
            var n = e.end;
            var r = this.$foldData;
            var i = [];
            t.column += 1, n.column -= 1;
            for (var s = 0; s < r.length; s++) {
                var o = r[s].range.compareRange(e);
                if (2 == o) {
                    continue;
                } else {
                    if (-2 == o) {
                        break;
                    }
                }
                var u = r[s].folds;
                for (var a = 0; a < u.length; a++) {
                    var f = u[a];
                    if (o = f.range.compareRange(e), -2 == o) {
                        break;
                    } else {
                        if (2 == o) {
                            continue;
                        } else {
                            if (42 == o) {
                                break;
                            }
                        }
                    }
                    i.push(f);
                }
            }
            return t.column -= 1, n.column += 1, i;
        }, this.getAllFolds = function() {
            function n(t) {
                e.push(t);
            }
            var e = [];
            var t = this.$foldData;
            for (var r = 0; r < t.length; r++) {
                for (var i = 0; i < t[r].folds.length; i++) {
                    n(t[r].folds[i]);
                }
            }
            return e;
        }, this.getFoldStringAt = function(e, t, n, r) {
            if (r = r || this.getFoldLine(e), !r) {
                return null;
            }
            var i = {
                end: {
                    column: 0
                }
            };
            var s, o;
            for (var u = 0; u < r.folds.length; u++) {
                o = r.folds[u];
                var a = o.range.compareEnd(e, t);
                if (-1 == a) {
                    s = this.getLine(o.start.row).substring(i.end.column, o.start.column);
                    break;
                } else {
                    if (0 === a) {
                        return null;
                    }
                }
                i = o;
            }
            if (!s) {
                s = this.getLine(o.start.row).substring(i.end.column);
            }
            if (-1 == n) {
                return s.substring(0, t - i.end.column);
            } else {
                if (1 == n) {
                    return s.substring(t - i.end.column);
                } else {
                    return s;
                }
            }
        }, this.getFoldLine = function(e, t) {
            var n = this.$foldData;
            var r = 0;
            if (t) {
                r = n.indexOf(t);
            }
            if (-1 == r) {
                r = 0;
            }
            for (r; r < n.length; r++) {
                var i = n[r];
                if (i.start.row <= e && i.end.row >= e) {
                    return i;
                } else {
                    if (i.end.row > e) {
                        return null;
                    }
                }
            }
            return null;
        }, this.getNextFoldLine = function(e, t) {
            var n = this.$foldData;
            var r = 0;
            if (t) {
                r = n.indexOf(t);
            }
            if (-1 == r) {
                r = 0;
            }
            for (r; r < n.length; r++) {
                var i = n[r];
                if (i.end.row >= e) {
                    return i;
                }
            }
            return null;
        }, this.getFoldedRowCount = function(e, t) {
            var n = this.$foldData, r = t - e + 1;
            for (var i = 0; i < n.length; i++) {
                var s = n[i], o = s.end.row, u = s.start.row;
                if (o >= t) {
                    if (t > u) {
                        if (u >= e) {
                            r -= t - u;
                        } else {
                            r = 0;
                        }
                    }
                    break;
                } else {
                    if (o >= e) {
                        if (u >= e) {
                            r -= o - u;
                        } else {
                            r -= o - e + 1;
                        }
                    }
                }
            }
            return r;
        }, this.$addFoldLine = function(e) {
            return this.$foldData.push(e), this.$foldData.sort(function(e, t) {
                return e.start.row - t.start.row;
            }), e;
        }, this.addFold = function(e, t) {
            var n = this.$foldData;
            var r = !1;
            var o;
            if (e instanceof s) {
                o = e;
            } else {
                o = new s(t, e), o.collapseChildren = t.collapseChildren;
            }
            this.$clipRangeToDocument(o.range);
            var u = o.start.row;
            var a = o.start.column;
            var f = o.end.row;
            var l = o.end.column;
            if (!(f > u || u == f && l - 2 >= a)) {
                throw new Error("The range has to be at least 2 characters width");
            }
            var c = this.getFoldAt(u, a, 1);
            var h = this.getFoldAt(f, l, -1);
            if (c && h == c) {
                return c.addSubFold(o);
            }
            if (c && !c.range.isStart(u, a) || h && !h.range.isEnd(f, l)) {
                throw new Error("A fold can't intersect already existing fold" + o.range + c.range);
            }
            var p = this.getFoldsInRange(o.range);
            if (p.length > 0) {
                this.removeFolds(p), p.forEach(function(e) {
                    o.addSubFold(e);
                });
            }
            for (var d = 0; d < n.length; d++) {
                var v = n[d];
                if (f == v.start.row) {
                    v.addFold(o), r = !0;
                    break;
                } else {
                    if (u == v.end.row) {
                        if (v.addFold(o), r = !0, !o.sameRow) {
                            var m = n[d + 1];
                            if (m && m.start.row == f) {
                                v.merge(m);
                                break;
                            }
                        }
                        break;
                    } else {
                        if (f <= v.start.row) {
                            break;
                        }
                    }
                }
            }
            if (!r) {
                v = this.$addFoldLine(new i(this.$foldData, o));
            }
            if (this.$useWrapMode) {
                this.$updateWrapData(v.start.row, v.start.row);
            } else {
                this.$updateRowLengthCache(v.start.row, v.start.row);
            }
            return this.$modified = !0, this._emit("changeFold", {
                data: o,
                action: "add"
            }), o;
        }, this.addFolds = function(e) {
            e.forEach(function(e) {
                this.addFold(e);
            }, this);
        }, this.removeFold = function(e) {
            var t = e.foldLine;
            var n = t.start.row;
            var r = t.end.row;
            var i = this.$foldData;
            var s = t.folds;
            if (1 == s.length) {
                i.splice(i.indexOf(t), 1);
            } else {
                if (t.range.isEnd(e.end.row, e.end.column)) {
                    s.pop(), t.end.row = s[s.length - 1].end.row, t.end.column = s[s.length - 1].end.column;
                } else {
                    if (t.range.isStart(e.start.row, e.start.column)) {
                        s.shift(), t.start.row = s[0].start.row, t.start.column = s[0].start.column;
                    } else {
                        if (e.sameRow) {
                            s.splice(s.indexOf(e), 1);
                        } else {
                            var o = t.split(e.start.row, e.start.column);
                            s = o.folds, s.shift(), o.start.row = s[0].start.row, o.start.column = s[0].start.column;
                        }
                    }
                }
            }
            if (!this.$updating) {
                if (this.$useWrapMode) {
                    this.$updateWrapData(n, r);
                } else {
                    this.$updateRowLengthCache(n, r);
                }
            }
            this.$modified = !0, this._emit("changeFold", {
                data: e,
                action: "remove"
            });
        }, this.removeFolds = function(e) {
            var t = [];
            for (var n = 0; n < e.length; n++) {
                t.push(e[n]);
            }
            t.forEach(function(e) {
                this.removeFold(e);
            }, this), this.$modified = !0;
        }, this.expandFold = function(e) {
            if (this.removeFold(e), e.subFolds.forEach(function(t) {
                e.restoreRange(t), this.addFold(t);
            }, this), e.collapseChildren > 0) {
                this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1);
            }
            e.subFolds = [];
        }, this.expandFolds = function(e) {
            e.forEach(function(e) {
                this.expandFold(e);
            }, this);
        }, this.unfold = function(e, t) {
            var n, i;
            if (null == e) {
                n = new r(0, 0, this.getLength(), 0), t = !0;
            } else {
                if ("number" == typeof e) {
                    n = new r(e, 0, e, this.getLine(e).length);
                } else {
                    if ("row" in e) {
                        n = r.fromPoints(e, e);
                    } else {
                        n = e;
                    }
                }
            }
            if (i = this.getFoldsInRange(n), t) {
                this.removeFolds(i);
            } else {
                while (i.length) {
                    this.expandFolds(i), i = this.getFoldsInRange(n);
                }
            }
        }, this.isRowFolded = function(e, t) {
            return !!this.getFoldLine(e, t);
        }, this.getRowFoldEnd = function(e, t) {
            var n = this.getFoldLine(e, t);
            return n ? n.end.row : e;
        }, this.getRowFoldStart = function(e, t) {
            var n = this.getFoldLine(e, t);
            return n ? n.start.row : e;
        }, this.getFoldDisplayLine = function(e, t, n, r, i) {
            if (null == r) {
                r = e.start.row, i = 0;
            }
            if (null == t) {
                t = e.end.row, n = this.getLine(t).length;
            }
            var s = this.doc;
            var o = "";
            return e.walk(function(e, t, n, u) {
                if (r > t) {
                    return;
                }
                if (t == r) {
                    if (i > n) {
                        return;
                    }
                    u = Math.max(i, u);
                }
                if (null != e) {
                    o += e;
                } else {
                    o += s.getLine(t).substring(u, n);
                }
            }, t, n), o;
        }, this.getDisplayLine = function(e, t, n, r) {
            var i = this.getFoldLine(e);
            if (!i) {
                var s;
                return s = this.doc.getLine(e), s.substring(r || 0, t || s.length);
            } else {
                return this.getFoldDisplayLine(i, e, t, n, r);
            }
        }, this.$cloneFoldData = function() {
            var e = [];
            return e = this.$foldData.map(function(t) {
                var n = t.folds.map(function(e) {
                    return e.clone();
                });
                return new i(e, n);
            }), e;
        }, this.toggleFold = function(e) {
            var t = this.selection;
            var n = t.getRange();
            var r;
            var i;
            if (n.isEmpty()) {
                var s = n.start;
                if (r = this.getFoldAt(s.row, s.column), r) {
                    return void this.expandFold(r);
                } else {
                    if (i = this.findMatchingBracket(s)) {
                        if (1 == n.comparePoint(i)) {
                            n.end = i;
                        } else {
                            n.start = i, n.start.column++, n.end.column--;
                        }
                    } else {
                        if (i = this.findMatchingBracket({
                            row: s.row,
                            column: s.column + 1
                        })) {
                            if (1 == n.comparePoint(i)) {
                                n.end = i;
                            } else {
                                n.start = i;
                            }
                            n.start.column++;
                        } else {
                            n = this.getCommentFoldRange(s.row, s.column) || n;
                        }
                    }
                }
            } else {
                var o = this.getFoldsInRange(n);
                if (e && o.length) {
                    return void this.expandFolds(o);
                } else {
                    if (1 == o.length) {
                        r = o[0];
                    }
                }
            }
            if (!r) {
                r = this.getFoldAt(n.start.row, n.start.column);
            }
            if (r && r.range.toString() == n.toString()) {
                return void this.expandFold(r);
            }
            var u = "...";
            if (!n.isMultiLine()) {
                if (u = this.getTextRange(n), u.length < 4) {
                    return;
                }
                u = u.trim().substring(0, 2) + "..";
            }
            this.addFold(u, n);
        }, this.getCommentFoldRange = function(e, t, n) {
            var i = new o(this, e, t);
            var s = i.getCurrentToken();
            if (s && /^comment|string/.test(s.type)) {
                var u = new r();
                var a = new RegExp(s.type.replace(/\..*/, "\\."));
                if (1 != n) {
                    do {
                        s = i.stepBackward();
                    } while (s && a.test(s.type));
                    i.stepForward();
                }
                if (u.start.row = i.getCurrentTokenRow(), u.start.column = i.getCurrentTokenColumn() + 2, 
                i = new o(this, e, t), -1 != n) {
                    do {
                        s = i.stepForward();
                    } while (s && a.test(s.type));
                    s = i.stepBackward();
                } else {
                    s = i.getCurrentToken();
                }
                return u.end.row = i.getCurrentTokenRow(), u.end.column = i.getCurrentTokenColumn() + s.value.length - 2, 
                u;
            }
        }, this.foldAll = function(e, t, n) {
            if (void 0 == n) {
                n = 1e5;
            }
            var r = this.foldWidgets;
            t = t || this.getLength(), e = e || 0;
            for (var i = e; t > i; i++) {
                if (null == r[i]) {
                    r[i] = this.getFoldWidget(i);
                }
                if ("start" != r[i]) {
                    continue;
                }
                var s = this.getFoldWidgetRange(i);
                var o = s.end.row;
                if (s && s.isMultiLine() && t >= o && s.start.row >= e) {
                    try {
                        var u = this.addFold("...", s);
                        u.collapseChildren = n, i = o;
                    } catch (a) {}
                }
            }
        }, this.$foldStyles = {
            manual: 1,
            markbegin: 1,
            markbeginend: 1
        }, this.$foldStyle = "markbegin", this.setFoldStyle = function(e) {
            if (!this.$foldStyles[e]) {
                throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
            }
            if (this.$foldStyle == e) {
                return;
            }
            if (this.$foldStyle = e, "manual" == e) {
                this.unfold();
            }
            var t = this.$foldMode;
            this.$setFolding(null), this.$setFolding(t);
        }, this.$setFolding = function(e) {
            if (this.$foldMode == e) {
                return;
            }
            if (this.$foldMode = e, this.removeListener("change", this.$updateFoldWidgets), 
            this._emit("changeAnnotation"), !e || "manual" == this.$foldStyle) {
                return void (this.foldWidgets = null);
            }
            this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), 
            this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), 
            this.on("change", this.$updateFoldWidgets);
        }, this.getParentFoldRangeData = function(e, t) {
            var n = this.foldWidgets;
            if (!n || t && n[e]) {
                return {};
            }
            var r = e - 1, i;
            while (r >= 0) {
                var s = n[r];
                if (null == s) {
                    s = n[r] = this.getFoldWidget(r);
                }
                if ("start" == s) {
                    var o = this.getFoldWidgetRange(r);
                    if (!i) {
                        i = o;
                    }
                    if (o && o.end.row >= e) {
                        break;
                    }
                }
                r--;
            }
            return {
                range: -1 !== r && o,
                firstRange: i
            };
        }, this.onFoldWidgetClick = function(e, t) {
            var n = this.getFoldWidget(e);
            var r = this.getLine(e);
            t = t.domEvent;
            var i = t.shiftKey;
            var s = t.ctrlKey || t.metaKey;
            var o = t.altKey;
            var u = "end" === n ? -1 : 1;
            var a = this.getFoldAt(e, -1 === u ? 0 : r.length, u);
            if (a) {
                if (i || s) {
                    this.removeFold(a);
                } else {
                    this.expandFold(a);
                }
                return;
            }
            var f = this.getFoldWidgetRange(e);
            if (f && !f.isMultiLine()) {
                if (a = this.getFoldAt(f.start.row, f.start.column, 1), a && f.isEqual(a.range)) {
                    return void this.removeFold(a);
                }
            }
            if (o) {
                var l = this.getParentFoldRangeData(e);
                if (l.range) {
                    var c = l.range.start.row + 1;
                    var h = l.range.end.row;
                }
                this.foldAll(c, h, s ? 1e4 : 0);
            } else {
                if (i) {
                    var h = f ? f.end.row : this.getLength();
                    this.foldAll(e + 1, f.end.row, s ? 1e4 : 0);
                } else {
                    if (f) {
                        if (s) {
                            f.collapseChildren = 1e4;
                        }
                        this.addFold("...", f);
                    }
                }
            }
            if (!f) {
                (t.target || t.srcElement).className += " ace_invalid";
            }
        }, this.updateFoldWidgets = function(e) {
            var t = e.data;
            var n = t.range;
            var r = n.start.row;
            var i = n.end.row - r;
            if (0 === i) {
                this.foldWidgets[r] = null;
            } else {
                if ("removeText" == t.action || "removeLines" == t.action) {
                    this.foldWidgets.splice(r, i + 1, null);
                } else {
                    var s = Array(i + 1);
                    s.unshift(r, 1), this.foldWidgets.splice.apply(this.foldWidgets, s);
                }
            }
        };
    }
    var r = e("../range").Range;
    var i = e("./fold_line").FoldLine;
    var s = e("./fold").Fold;
    var o = e("../token_iterator").TokenIterator;
    t.Folding = u;
}), define("ace/edit_session/fold_line", [ "require", "exports", "module", "ace/range" ], function(e, t, n) {
    function i(e, t) {
        if (this.foldData = e, Array.isArray(t)) {
            this.folds = t;
        } else {
            t = this.folds = [ t ];
        }
        var n = t[t.length - 1];
        this.range = new r(t[0].start.row, t[0].start.column, n.end.row, n.end.column), 
        this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function(e) {
            e.setFoldLine(this);
        }, this);
    }
    var r = e("../range").Range;
    (function() {
        this.shiftRow = function(e) {
            this.start.row += e, this.end.row += e, this.folds.forEach(function(t) {
                t.start.row += e, t.end.row += e;
            });
        }, this.addFold = function(e) {
            if (e.sameRow) {
                if (e.start.row < this.startRow || e.endRow > this.endRow) {
                    throw new Error("Can't add a fold to this FoldLine as it has no connection");
                }
                if (this.folds.push(e), this.folds.sort(function(e, t) {
                    return -e.range.compareEnd(t.start.row, t.start.column);
                }), this.range.compareEnd(e.start.row, e.start.column) > 0) {
                    this.end.row = e.end.row, this.end.column = e.end.column;
                } else {
                    if (this.range.compareStart(e.end.row, e.end.column) < 0) {
                        this.start.row = e.start.row, this.start.column = e.start.column;
                    }
                }
            } else {
                if (e.start.row == this.end.row) {
                    this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column;
                } else {
                    if (e.end.row == this.start.row) {
                        this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column;
                    } else {
                        throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
                    }
                }
            }
            e.foldLine = this;
        }, this.containsRow = function(e) {
            return e >= this.start.row && e <= this.end.row;
        }, this.walk = function(e, t, n) {
            var r = 0, i = this.folds, s, o, u, a = !0;
            if (null == t) {
                t = this.end.row, n = this.end.column;
            }
            for (var f = 0; f < i.length; f++) {
                if (s = i[f], o = s.range.compareStart(t, n), -1 == o) {
                    return void e(null, t, n, r, a);
                }
                if (u = e(null, s.start.row, s.start.column, r, a), u = !u && e(s.placeholder, s.start.row, s.start.column, r), 
                u || 0 == o) {
                    return;
                }
                a = !s.sameRow, r = s.end.column;
            }
            e(null, t, n, r, a);
        }, this.getNextFoldTo = function(e, t) {
            var n, r;
            for (var i = 0; i < this.folds.length; i++) {
                if (n = this.folds[i], r = n.range.compareEnd(e, t), -1 == r) {
                    return {
                        fold: n,
                        kind: "after"
                    };
                } else {
                    if (0 == r) {
                        return {
                            fold: n,
                            kind: "inside"
                        };
                    }
                }
            }
            return null;
        }, this.addRemoveChars = function(e, t, n) {
            var r = this.getNextFoldTo(e, t), i, s;
            if (r) {
                if (i = r.fold, "inside" == r.kind && i.start.column != t && i.start.row != e) {
                    window.console && window.console.log(e, t, i);
                } else {
                    if (i.start.row == e) {
                        s = this.folds;
                        var o = s.indexOf(i);
                        if (0 == o) {
                            this.start.column += n;
                        }
                        for (o; o < s.length; o++) {
                            if (i = s[o], i.start.column += n, !i.sameRow) {
                                return;
                            }
                            i.end.column += n;
                        }
                        this.end.column += n;
                    }
                }
            }
        }, this.split = function(e, t) {
            var n = this.getNextFoldTo(e, t).fold;
            var r = this.folds;
            var s = this.foldData;
            if (!n) {
                return null;
            }
            var o = r.indexOf(n);
            var u = r[o - 1];
            this.end.row = u.end.row, this.end.column = u.end.column, r = r.splice(o, r.length - o);
            var a = new i(s, r);
            return s.splice(s.indexOf(this) + 1, 0, a), a;
        }, this.merge = function(e) {
            var t = e.folds;
            for (var n = 0; n < t.length; n++) {
                this.addFold(t[n]);
            }
            var r = this.foldData;
            r.splice(r.indexOf(e), 1);
        }, this.toString = function() {
            var e = [ this.range.toString() + ": [" ];
            return this.folds.forEach(function(t) {
                e.push("  " + t.toString());
            }), e.push("]"), e.join("\n");
        }, this.idxToPosition = function(e) {
            var t = 0;
            var n;
            for (var r = 0; r < this.folds.length; r++) {
                var n = this.folds[r];
                if (e -= n.start.column - t, 0 > e) {
                    return {
                        row: n.start.row,
                        column: n.start.column + e
                    };
                }
                if (e -= n.placeholder.length, 0 > e) {
                    return n.start;
                }
                t = n.end.column;
            }
            return {
                row: this.end.row,
                column: this.end.column + e
            };
        };
    }).call(i.prototype), t.FoldLine = i;
}), define("ace/edit_session/fold", [ "require", "exports", "module", "ace/range", "ace/range_list", "ace/lib/oop" ], function(e, t, n) {
    function u(e, t) {
        if (e.row -= t.row, 0 == e.row) {
            e.column -= t.column;
        }
    }
    function a(e, t) {
        u(e.start, t), u(e.end, t);
    }
    function f(e, t) {
        if (0 == e.row) {
            e.column += t.column;
        }
        e.row += t.row;
    }
    function l(e, t) {
        f(e.start, t), f(e.end, t);
    }
    var r = e("../range").Range;
    var i = e("../range_list").RangeList;
    var s = e("../lib/oop");
    var o = t.Fold = function(e, t) {
        this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, 
        this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = [];
    };
    s.inherits(o, i), function() {
        this.toString = function() {
            return '"' + this.placeholder + '" ' + this.range.toString();
        }, this.setFoldLine = function(e) {
            this.foldLine = e, this.subFolds.forEach(function(t) {
                t.setFoldLine(e);
            });
        }, this.clone = function() {
            var e = this.range.clone();
            var t = new o(e, this.placeholder);
            return this.subFolds.forEach(function(e) {
                t.subFolds.push(e.clone());
            }), t.collapseChildren = this.collapseChildren, t;
        }, this.addSubFold = function(e) {
            if (this.range.isEqual(e)) {
                return;
            }
            if (!this.range.containsRange(e)) {
                throw new Error("A fold can't intersect already existing fold" + e.range + this.range);
            }
            a(e, this.start);
            var t = e.start.row, n = e.start.column;
            for (var r = 0, i = -1; r < this.subFolds.length; r++) {
                if (i = this.subFolds[r].range.compare(t, n), 1 != i) {
                    break;
                }
            }
            var s = this.subFolds[r];
            if (0 == i) {
                return s.addSubFold(e);
            }
            var t = e.range.end.row, n = e.range.end.column;
            for (var o = r, i = -1; o < this.subFolds.length; o++) {
                if (i = this.subFolds[o].range.compare(t, n), 1 != i) {
                    break;
                }
            }
            var u = this.subFolds[o];
            if (0 == i) {
                throw new Error("A fold can't intersect already existing fold" + e.range + this.range);
            }
            var f = this.subFolds.splice(r, o - r, e);
            return e.setFoldLine(this.foldLine), e;
        }, this.restoreRange = function(e) {
            return l(e, this.start);
        };
    }.call(o.prototype);
}), define("ace/range_list", [ "require", "exports", "module", "ace/range" ], function(e, t, n) {
    var r = e("./range").Range;
    var i = r.comparePoints;
    var s = function() {
        this.ranges = [];
    };
    (function() {
        this.comparePoints = i, this.pointIndex = function(e, t, n) {
            var r = this.ranges;
            for (var s = n || 0; s < r.length; s++) {
                var o = r[s];
                var u = i(e, o.end);
                if (u > 0) {
                    continue;
                }
                var a = i(e, o.start);
                if (0 === u) {
                    return t && 0 !== a ? -s - 2 : s;
                }
                if (a > 0 || 0 === a && !t) {
                    return s;
                }
                return -s - 1;
            }
            return -s - 1;
        }, this.add = function(e) {
            var t = !e.isEmpty();
            var n = this.pointIndex(e.start, t);
            if (0 > n) {
                n = -n - 1;
            }
            var r = this.pointIndex(e.end, t, n);
            if (0 > r) {
                r = -r - 1;
            } else {
                r++;
            }
            return this.ranges.splice(n, r - n, e);
        }, this.addList = function(e) {
            var t = [];
            for (var n = e.length; n--; ) {
                t.push.call(t, this.add(e[n]));
            }
            return t;
        }, this.substractPoint = function(e) {
            var t = this.pointIndex(e);
            if (t >= 0) {
                return this.ranges.splice(t, 1);
            }
        }, this.merge = function() {
            var e = [];
            var t = this.ranges;
            t = t.sort(function(e, t) {
                return i(e.start, t.start);
            });
            var n = t[0], r;
            for (var s = 1; s < t.length; s++) {
                r = n, n = t[s];
                var o = i(r.end, n.start);
                if (0 > o) {
                    continue;
                }
                if (0 == o && !r.isEmpty() && !n.isEmpty()) {
                    continue;
                }
                if (i(r.end, n.end) < 0) {
                    r.end.row = n.end.row, r.end.column = n.end.column;
                }
                t.splice(s, 1), e.push(n), n = r, s--;
            }
            return this.ranges = t, e;
        }, this.contains = function(e, t) {
            return this.pointIndex({
                row: e,
                column: t
            }) >= 0;
        }, this.containsPoint = function(e) {
            return this.pointIndex(e) >= 0;
        }, this.rangeAtPoint = function(e) {
            var t = this.pointIndex(e);
            if (t >= 0) {
                return this.ranges[t];
            }
        }, this.clipRows = function(e, t) {
            var n = this.ranges;
            if (n[0].start.row > t || n[n.length - 1].start.row < e) {
                return [];
            }
            var r = this.pointIndex({
                row: e,
                column: 0
            });
            if (0 > r) {
                r = -r - 1;
            }
            var i = this.pointIndex({
                row: t,
                column: 0
            }, r);
            if (0 > i) {
                i = -i - 1;
            }
            var s = [];
            for (var o = r; i > o; o++) {
                s.push(n[o]);
            }
            return s;
        }, this.removeAll = function() {
            return this.ranges.splice(0, this.ranges.length);
        }, this.attach = function(e) {
            if (this.session) {
                this.detach();
            }
            this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange);
        }, this.detach = function() {
            if (!this.session) {
                return;
            }
            this.session.removeListener("change", this.onChange), this.session = null;
        }, this.$onChange = function(e) {
            var t = e.data.range;
            if ("i" == e.data.action[0]) {
                var n = t.start;
                var r = t.end;
            } else {
                var r = t.start;
                var n = t.end;
            }
            var i = n.row;
            var s = r.row;
            var o = s - i;
            var u = -n.column + r.column;
            var a = this.ranges;
            for (var f = 0, l = a.length; l > f; f++) {
                var c = a[f];
                if (c.end.row < i) {
                    continue;
                }
                if (c.start.row > i) {
                    break;
                }
                if (c.start.row == i && c.start.column >= n.column) {
                    if (c.start.column == n.column && this.$insertRight) {
                        ;
                    } else {
                        c.start.column += u, c.start.row += o;
                    }
                }
                if (c.end.row == i && c.end.column >= n.column) {
                    if (c.end.column == n.column && this.$insertRight) {
                        continue;
                    }
                    if (c.end.column == n.column && u > 0 && l - 1 > f) {
                        if (c.end.column > c.start.column && c.end.column == a[f + 1].start.column) {
                            c.end.column -= u;
                        }
                    }
                    c.end.column += u, c.end.row += o;
                }
            }
            if (0 != o && l > f) {
                for (;l > f; f++) {
                    var c = a[f];
                    c.start.row += o, c.end.row += o;
                }
            }
        };
    }).call(s.prototype), t.RangeList = s;
}), define("ace/edit_session/bracket_match", [ "require", "exports", "module", "ace/token_iterator", "ace/range" ], function(e, t, n) {
    function s() {
        this.findMatchingBracket = function(e, t) {
            if (0 == e.column) {
                return null;
            }
            var n = t || this.getLine(e.row).charAt(e.column - 1);
            if ("" == n) {
                return null;
            }
            var r = n.match(/([\(\[\{])|([\)\]\}])/);
            if (!r) {
                return null;
            }
            if (r[1]) {
                return this.$findClosingBracket(r[1], e);
            } else {
                return this.$findOpeningBracket(r[2], e);
            }
        }, this.getBracketRange = function(e) {
            var t = this.getLine(e.row);
            var n = !0, r;
            var s = t.charAt(e.column - 1);
            var o = s && s.match(/([\(\[\{])|([\)\]\}])/);
            if (!o) {
                s = t.charAt(e.column), e = {
                    row: e.row,
                    column: e.column + 1
                }, o = s && s.match(/([\(\[\{])|([\)\]\}])/), n = !1;
            }
            if (!o) {
                return null;
            }
            if (o[1]) {
                var u = this.$findClosingBracket(o[1], e);
                if (!u) {
                    return null;
                }
                if (r = i.fromPoints(e, u), !n) {
                    r.end.column++, r.start.column--;
                }
                r.cursor = r.end;
            } else {
                var u = this.$findOpeningBracket(o[2], e);
                if (!u) {
                    return null;
                }
                if (r = i.fromPoints(u, e), !n) {
                    r.start.column++, r.end.column--;
                }
                r.cursor = r.start;
            }
            return r;
        }, this.$brackets = {
            ")": "(",
            "(": ")",
            "]": "[",
            "[": "]",
            "{": "}",
            "}": "{"
        }, this.$findOpeningBracket = function(e, t, n) {
            var i = this.$brackets[e];
            var s = 1;
            var o = new r(this, t.row, t.column);
            var u = o.getCurrentToken();
            if (!u) {
                u = o.stepForward();
            }
            if (!u) {
                return;
            }
            if (!n) {
                n = new RegExp("(\\.?" + u.type.replace(".", "\\.").replace("rparen", ".paren") + ")+");
            }
            var a = t.column - o.getCurrentTokenColumn() - 2;
            var f = u.value;
            while (!0) {
                while (a >= 0) {
                    var l = f.charAt(a);
                    if (l == i) {
                        if (s -= 1, 0 == s) {
                            return {
                                row: o.getCurrentTokenRow(),
                                column: a + o.getCurrentTokenColumn()
                            };
                        }
                    } else {
                        if (l == e) {
                            s += 1;
                        }
                    }
                    a -= 1;
                }
                do {
                    u = o.stepBackward();
                } while (u && !n.test(u.type));
                if (null == u) {
                    break;
                }
                f = u.value, a = f.length - 1;
            }
            return null;
        }, this.$findClosingBracket = function(e, t, n) {
            var i = this.$brackets[e];
            var s = 1;
            var o = new r(this, t.row, t.column);
            var u = o.getCurrentToken();
            if (!u) {
                u = o.stepForward();
            }
            if (!u) {
                return;
            }
            if (!n) {
                n = new RegExp("(\\.?" + u.type.replace(".", "\\.").replace("lparen", ".paren") + ")+");
            }
            var a = t.column - o.getCurrentTokenColumn();
            while (!0) {
                var f = u.value;
                var l = f.length;
                while (l > a) {
                    var c = f.charAt(a);
                    if (c == i) {
                        if (s -= 1, 0 == s) {
                            return {
                                row: o.getCurrentTokenRow(),
                                column: a + o.getCurrentTokenColumn()
                            };
                        }
                    } else {
                        if (c == e) {
                            s += 1;
                        }
                    }
                    a += 1;
                }
                do {
                    u = o.stepForward();
                } while (u && !n.test(u.type));
                if (null == u) {
                    break;
                }
                a = 0;
            }
            return null;
        };
    }
    var r = e("../token_iterator").TokenIterator;
    var i = e("../range").Range;
    t.BracketMatch = s;
}), define("ace/search", [ "require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range" ], function(e, t, n) {
    var r = e("./lib/lang");
    var i = e("./lib/oop");
    var s = e("./range").Range;
    var o = function() {
        this.$options = {};
    };
    (function() {
        this.set = function(e) {
            return i.mixin(this.$options, e), this;
        }, this.getOptions = function() {
            return r.copyObject(this.$options);
        }, this.setOptions = function(e) {
            this.$options = e;
        }, this.find = function(e) {
            var t = this.$matchIterator(e, this.$options);
            if (!t) {
                return !1;
            }
            var n = null;
            return t.forEach(function(e, t, r) {
                if (!e.start) {
                    var i = e.offset + (r || 0);
                    n = new s(t, i, t, i + e.length);
                } else {
                    n = e;
                }
                return !0;
            }), n;
        }, this.findAll = function(e) {
            var t = this.$options;
            if (!t.needle) {
                return [];
            }
            this.$assembleRegExp(t);
            var n = t.range;
            var i = n ? e.getLines(n.start.row, n.end.row) : e.doc.getAllLines();
            var o = [];
            var u = t.re;
            if (t.$isMultiLine) {
                var a = u.length;
                var f = i.length - a;
                for (var l = u.offset || 0; f >= l; l++) {
                    for (var c = 0; a > c; c++) {
                        if (-1 == i[l + c].search(u[c])) {
                            break;
                        }
                    }
                    var h = i[l];
                    var p = i[l + a - 1];
                    var d = h.match(u[0])[0].length;
                    var v = p.match(u[a - 1])[0].length;
                    o.push(new s(l, h.length - d, l + a - 1, v));
                }
            } else {
                for (var m = 0; m < i.length; m++) {
                    var g = r.getMatchOffsets(i[m], u);
                    for (var c = 0; c < g.length; c++) {
                        var y = g[c];
                        o.push(new s(m, y.offset, m, y.offset + y.length));
                    }
                }
            }
            if (n) {
                var b = n.start.column;
                var w = n.start.column;
                var m = 0, c = o.length - 1;
                while (c > m && o[m].start.column < b && o[m].start.row == n.start.row) {
                    m++;
                }
                while (c > m && o[c].end.column > w && o[c].end.row == n.end.row) {
                    c--;
                }
                for (o = o.slice(m, c + 1), m = 0, c = o.length; c > m; m++) {
                    o[m].start.row += n.start.row, o[m].end.row += n.start.row;
                }
            }
            return o;
        }, this.replace = function(e, t) {
            var n = this.$options;
            var r = this.$assembleRegExp(n);
            if (n.$isMultiLine) {
                return t;
            }
            if (!r) {
                return;
            }
            var i = r.exec(e);
            if (!i || i[0].length != e.length) {
                return null;
            }
            if (t = e.replace(r, t), n.preserveCase) {
                t = t.split("");
                for (var s = Math.min(e.length, e.length); s--; ) {
                    var o = e[s];
                    if (o && o.toLowerCase() != o) {
                        t[s] = t[s].toUpperCase();
                    } else {
                        t[s] = t[s].toLowerCase();
                    }
                }
                t = t.join("");
            }
            return t;
        }, this.$matchIterator = function(e, t) {
            var n = this.$assembleRegExp(t);
            if (!n) {
                return !1;
            }
            var i = this, o, u = t.backwards;
            if (t.$isMultiLine) {
                var a = n.length;
                var f = function(t, r, i) {
                    var u = t.search(n[0]);
                    if (-1 == u) {
                        return;
                    }
                    for (var f = 1; a > f; f++) {
                        if (t = e.getLine(r + f), -1 == t.search(n[f])) {
                            return;
                        }
                    }
                    var l = t.match(n[a - 1])[0].length;
                    var c = new s(r, u, r + a - 1, l);
                    if (1 == n.offset) {
                        c.start.row--, c.start.column = Number.MAX_VALUE;
                    } else {
                        if (i) {
                            c.start.column += i;
                        }
                    }
                    if (o(c)) {
                        return !0;
                    }
                };
            } else {
                if (u) {
                    var f = function(e, t, i) {
                        var s = r.getMatchOffsets(e, n);
                        for (var u = s.length - 1; u >= 0; u--) {
                            if (o(s[u], t, i)) {
                                return !0;
                            }
                        }
                    };
                } else {
                    var f = function(e, t, i) {
                        var s = r.getMatchOffsets(e, n);
                        for (var u = 0; u < s.length; u++) {
                            if (o(s[u], t, i)) {
                                return !0;
                            }
                        }
                    };
                }
            }
            return {
                forEach: function(n) {
                    o = n, i.$lineIterator(e, t).forEach(f);
                }
            };
        }, this.$assembleRegExp = function(e, t) {
            if (e.needle instanceof RegExp) {
                return e.re = e.needle;
            }
            var n = e.needle;
            if (!e.needle) {
                return e.re = !1;
            }
            if (!e.regExp) {
                n = r.escapeRegExp(n);
            }
            if (e.wholeWord) {
                n = "\\b" + n + "\\b";
            }
            var i = e.caseSensitive ? "g" : "gi";
            if (e.$isMultiLine = !t && /[\n\r]/.test(n), e.$isMultiLine) {
                return e.re = this.$assembleMultilineRegExp(n, i);
            }
            try {
                var s = new RegExp(n, i);
            } catch (o) {
                s = !1;
            }
            return e.re = s;
        }, this.$assembleMultilineRegExp = function(e, t) {
            var n = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n");
            var r = [];
            for (var i = 0; i < n.length; i++) {
                try {
                    r.push(new RegExp(n[i], t));
                } catch (s) {
                    return !1;
                }
            }
            if ("" == n[0]) {
                r.shift(), r.offset = 1;
            } else {
                r.offset = 0;
            }
            return r;
        }, this.$lineIterator = function(e, t) {
            var n = 1 == t.backwards;
            var r = 0 != t.skipCurrent;
            var i = t.range;
            var s = t.start;
            if (!s) {
                s = i ? i[n ? "end" : "start"] : e.selection.getRange();
            }
            if (s.start) {
                s = s[r != n ? "end" : "start"];
            }
            var o = i ? i.start.row : 0;
            var u = i ? i.end.row : e.getLength() - 1;
            var a = n ? function(n) {
                var r = s.row;
                var i = e.getLine(r).substring(0, s.column);
                if (n(i, r)) {
                    return;
                }
                for (r--; r >= o; r--) {
                    if (n(e.getLine(r), r)) {
                        return;
                    }
                }
                if (0 == t.wrap) {
                    return;
                }
                for (r = u, o = s.row; r >= o; r--) {
                    if (n(e.getLine(r), r)) {
                        return;
                    }
                }
            } : function(n) {
                var r = s.row;
                var i = e.getLine(r).substr(s.column);
                if (n(i, r, s.column)) {
                    return;
                }
                for (r += 1; u >= r; r++) {
                    if (n(e.getLine(r), r)) {
                        return;
                    }
                }
                if (0 == t.wrap) {
                    return;
                }
                for (r = o, u = s.row; u >= r; r++) {
                    if (n(e.getLine(r), r)) {
                        return;
                    }
                }
            };
            return {
                forEach: a
            };
        };
    }).call(o.prototype), t.Search = o;
}), define("ace/commands/command_manager", [ "require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter" ], function(e, t, n) {
    var r = e("../lib/oop");
    var i = e("../keyboard/hash_handler").HashHandler;
    var s = e("../lib/event_emitter").EventEmitter;
    var o = function(e, t) {
        i.call(this, t, e), this.byName = this.commands, this.setDefaultHandler("exec", function(e) {
            return e.command.exec(e.editor, e.args || {});
        });
    };
    r.inherits(o, i), function() {
        r.implement(this, s), this.exec = function(e, t, n) {
            if ("string" == typeof e) {
                e = this.commands[e];
            }
            if (!e) {
                return !1;
            }
            if (t && t.$readOnly && !e.readOnly) {
                return !1;
            }
            var r = {
                editor: t,
                command: e,
                args: n
            };
            var i = this._emit("exec", r);
            return this._signal("afterExec", r), i === !1 ? !1 : !0;
        }, this.toggleRecording = function(e) {
            if (this.$inReplay) {
                return;
            }
            if (e && e._emit("changeStatus"), this.recording) {
                if (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), 
                !this.macro.length) {
                    this.macro = this.oldMacro;
                }
                return this.recording = !1;
            }
            if (!this.$addCommandToMacro) {
                this.$addCommandToMacro = function(e) {
                    this.macro.push([ e.command, e.args ]);
                }.bind(this);
            }
            return this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), 
            this.recording = !0;
        }, this.replay = function(e) {
            if (this.$inReplay || !this.macro) {
                return;
            }
            if (this.recording) {
                return this.toggleRecording(e);
            }
            try {
                this.$inReplay = !0, this.macro.forEach(function(t) {
                    if ("string" == typeof t) {
                        this.exec(t, e);
                    } else {
                        this.exec(t[0], e, t[1]);
                    }
                }, this);
            } finally {
                this.$inReplay = !1;
            }
        }, this.trimMacro = function(e) {
            return e.map(function(e) {
                if ("string" != typeof e[0]) {
                    e[0] = e[0].name;
                }
                if (!e[1]) {
                    e = e[0];
                }
                return e;
            });
        };
    }.call(o.prototype), t.CommandManager = o;
}), define("ace/keyboard/hash_handler", [ "require", "exports", "module", "ace/lib/keys", "ace/lib/useragent" ], function(e, t, n) {
    function s(e, t) {
        if (this.platform = t || (i.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, 
        this.__defineGetter__ && this.__defineSetter__ && "undefined" != typeof console && console.error) {
            var n = !1;
            var r = function() {
                if (!n) {
                    n = !0, console.error("commmandKeyBinding has too many m's. use commandKeyBinding");
                }
            };
            this.__defineGetter__("commmandKeyBinding", function() {
                return r(), this.commandKeyBinding;
            }), this.__defineSetter__("commmandKeyBinding", function(e) {
                return r(), this.commandKeyBinding = e;
            });
        } else {
            this.commmandKeyBinding = this.commandKeyBinding;
        }
        this.addCommands(e);
    }
    var r = e("../lib/keys");
    var i = e("../lib/useragent");
    (function() {
        this.addCommand = function(e) {
            if (this.commands[e.name]) {
                this.removeCommand(e);
            }
            if (this.commands[e.name] = e, e.bindKey) {
                this._buildKeyHash(e);
            }
        }, this.removeCommand = function(e) {
            var t = "string" == typeof e ? e : e.name;
            e = this.commands[t], delete this.commands[t];
            var n = this.commandKeyBinding;
            for (var r in n) {
                for (var i in n[r]) {
                    if (n[r][i] == e) {
                        delete n[r][i];
                    }
                }
            }
        }, this.bindKey = function(e, t) {
            if (!e) {
                return;
            }
            if ("function" == typeof t) {
                return void this.addCommand({
                    exec: t,
                    bindKey: e,
                    name: t.name || e
                });
            }
            var n = this.commandKeyBinding;
            e.split("|").forEach(function(e) {
                var r = this.parseKeys(e, t);
                var i = r.hashId;
                (n[i] || (n[i] = {}))[r.key] = t;
            }, this);
        }, this.addCommands = function(e) {
            e && Object.keys(e).forEach(function(t) {
                var n = e[t];
                if (!n) {
                    return;
                }
                if ("string" == typeof n) {
                    return this.bindKey(n, t);
                }
                if ("function" == typeof n) {
                    n = {
                        exec: n
                    };
                }
                if (!n.name) {
                    n.name = t;
                }
                this.addCommand(n);
            }, this);
        }, this.removeCommands = function(e) {
            Object.keys(e).forEach(function(t) {
                this.removeCommand(e[t]);
            }, this);
        }, this.bindKeys = function(e) {
            Object.keys(e).forEach(function(t) {
                this.bindKey(t, e[t]);
            }, this);
        }, this._buildKeyHash = function(e) {
            var t = e.bindKey;
            if (!t) {
                return;
            }
            var n = "string" == typeof t ? t : t[this.platform];
            this.bindKey(n, e);
        }, this.parseKeys = function(e) {
            if (-1 != e.indexOf(" ")) {
                e = e.split(/\s+/).pop();
            }
            var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(e) {
                return e;
            });
            var n = t.pop();
            var i = r[n];
            if (r.FUNCTION_KEYS[i]) {
                n = r.FUNCTION_KEYS[i].toLowerCase();
            } else {
                if (!t.length) {
                    return {
                        key: n,
                        hashId: -1
                    };
                } else {
                    if (1 == t.length && "shift" == t[0]) {
                        return {
                            key: n.toUpperCase(),
                            hashId: -1
                        };
                    }
                }
            }
            var s = 0;
            for (var o = t.length; o--; ) {
                var u = r.KEY_MODS[t[o]];
                if (null == u) {
                    if ("undefined" != typeof console) {
                        console.error("invalid modifier " + t[o] + " in " + e);
                    }
                    return !1;
                }
                s |= u;
            }
            return {
                key: n,
                hashId: s
            };
        }, this.findKeyCommand = function(t, n) {
            var r = this.commandKeyBinding;
            return r[t] && r[t][n];
        }, this.handleKeyboard = function(e, t, n, r) {
            return {
                command: this.findKeyCommand(t, n)
            };
        };
    }).call(s.prototype), t.HashHandler = s;
}), define("ace/commands/default_commands", [ "require", "exports", "module", "ace/lib/lang", "ace/config" ], function(e, t, n) {
    function s(e, t) {
        return {
            win: e,
            mac: t
        };
    }
    var r = e("../lib/lang");
    var i = e("../config");
    t.commands = [ {
        name: "showSettingsMenu",
        bindKey: s("Ctrl-,", "Command-,"),
        exec: function(e) {
            i.loadModule("ace/ext/settings_menu", function(t) {
                t.init(e), e.showSettingsMenu();
            });
        },
        readOnly: !0
    }, {
        name: "selectall",
        bindKey: s("Ctrl-A", "Command-A"),
        exec: function(e) {
            e.selectAll();
        },
        readOnly: !0
    }, {
        name: "centerselection",
        bindKey: s(null, "Ctrl-L"),
        exec: function(e) {
            e.centerSelection();
        },
        readOnly: !0
    }, {
        name: "gotoline",
        bindKey: s("Ctrl-L", "Command-L"),
        exec: function(e) {
            var t = parseInt(prompt("Enter line number:"), 10);
            if (!isNaN(t)) {
                e.gotoLine(t);
            }
        },
        readOnly: !0
    }, {
        name: "fold",
        bindKey: s("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
        exec: function(e) {
            e.session.toggleFold(!1);
        },
        readOnly: !0
    }, {
        name: "unfold",
        bindKey: s("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
        exec: function(e) {
            e.session.toggleFold(!0);
        },
        readOnly: !0
    }, {
        name: "foldall",
        bindKey: s("Alt-0", "Command-Option-0"),
        exec: function(e) {
            e.session.foldAll();
        },
        readOnly: !0
    }, {
        name: "unfoldall",
        bindKey: s("Alt-Shift-0", "Command-Option-Shift-0"),
        exec: function(e) {
            e.session.unfold();
        },
        readOnly: !0
    }, {
        name: "findnext",
        bindKey: s("Ctrl-K", "Command-G"),
        exec: function(e) {
            e.findNext();
        },
        readOnly: !0
    }, {
        name: "findprevious",
        bindKey: s("Ctrl-Shift-K", "Command-Shift-G"),
        exec: function(e) {
            e.findPrevious();
        },
        readOnly: !0
    }, {
        name: "find",
        bindKey: s("Ctrl-F", "Command-F"),
        exec: function(e) {
            i.loadModule("ace/ext/searchbox", function(t) {
                t.Search(e);
            });
        },
        readOnly: !0
    }, {
        name: "overwrite",
        bindKey: "Insert",
        exec: function(e) {
            e.toggleOverwrite();
        },
        readOnly: !0
    }, {
        name: "selecttostart",
        bindKey: s("Ctrl-Shift-Home", "Command-Shift-Up"),
        exec: function(e) {
            e.getSelection().selectFileStart();
        },
        multiSelectAction: "forEach",
        readOnly: !0,
        group: "fileJump"
    }, {
        name: "gotostart",
        bindKey: s("Ctrl-Home", "Command-Home|Command-Up"),
        exec: function(e) {
            e.navigateFileStart();
        },
        multiSelectAction: "forEach",
        readOnly: !0,
        group: "fileJump"
    }, {
        name: "selectup",
        bindKey: s("Shift-Up", "Shift-Up"),
        exec: function(e) {
            e.getSelection().selectUp();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "golineup",
        bindKey: s("Up", "Up|Ctrl-P"),
        exec: function(e, t) {
            e.navigateUp(t.times);
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selecttoend",
        bindKey: s("Ctrl-Shift-End", "Command-Shift-Down"),
        exec: function(e) {
            e.getSelection().selectFileEnd();
        },
        multiSelectAction: "forEach",
        readOnly: !0,
        group: "fileJump"
    }, {
        name: "gotoend",
        bindKey: s("Ctrl-End", "Command-End|Command-Down"),
        exec: function(e) {
            e.navigateFileEnd();
        },
        multiSelectAction: "forEach",
        readOnly: !0,
        group: "fileJump"
    }, {
        name: "selectdown",
        bindKey: s("Shift-Down", "Shift-Down"),
        exec: function(e) {
            e.getSelection().selectDown();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "golinedown",
        bindKey: s("Down", "Down|Ctrl-N"),
        exec: function(e, t) {
            e.navigateDown(t.times);
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selectwordleft",
        bindKey: s("Ctrl-Shift-Left", "Option-Shift-Left"),
        exec: function(e) {
            e.getSelection().selectWordLeft();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "gotowordleft",
        bindKey: s("Ctrl-Left", "Option-Left"),
        exec: function(e) {
            e.navigateWordLeft();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selecttolinestart",
        bindKey: s("Alt-Shift-Left", "Command-Shift-Left"),
        exec: function(e) {
            e.getSelection().selectLineStart();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "gotolinestart",
        bindKey: s("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
        exec: function(e) {
            e.navigateLineStart();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selectleft",
        bindKey: s("Shift-Left", "Shift-Left"),
        exec: function(e) {
            e.getSelection().selectLeft();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "gotoleft",
        bindKey: s("Left", "Left|Ctrl-B"),
        exec: function(e, t) {
            e.navigateLeft(t.times);
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selectwordright",
        bindKey: s("Ctrl-Shift-Right", "Option-Shift-Right"),
        exec: function(e) {
            e.getSelection().selectWordRight();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "gotowordright",
        bindKey: s("Ctrl-Right", "Option-Right"),
        exec: function(e) {
            e.navigateWordRight();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selecttolineend",
        bindKey: s("Alt-Shift-Right", "Command-Shift-Right"),
        exec: function(e) {
            e.getSelection().selectLineEnd();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "gotolineend",
        bindKey: s("Alt-Right|End", "Command-Right|End|Ctrl-E"),
        exec: function(e) {
            e.navigateLineEnd();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selectright",
        bindKey: s("Shift-Right", "Shift-Right"),
        exec: function(e) {
            e.getSelection().selectRight();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "gotoright",
        bindKey: s("Right", "Right|Ctrl-F"),
        exec: function(e, t) {
            e.navigateRight(t.times);
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selectpagedown",
        bindKey: "Shift-PageDown",
        exec: function(e) {
            e.selectPageDown();
        },
        readOnly: !0
    }, {
        name: "pagedown",
        bindKey: s(null, "Option-PageDown"),
        exec: function(e) {
            e.scrollPageDown();
        },
        readOnly: !0
    }, {
        name: "gotopagedown",
        bindKey: s("PageDown", "PageDown|Ctrl-V"),
        exec: function(e) {
            e.gotoPageDown();
        },
        readOnly: !0
    }, {
        name: "selectpageup",
        bindKey: "Shift-PageUp",
        exec: function(e) {
            e.selectPageUp();
        },
        readOnly: !0
    }, {
        name: "pageup",
        bindKey: s(null, "Option-PageUp"),
        exec: function(e) {
            e.scrollPageUp();
        },
        readOnly: !0
    }, {
        name: "gotopageup",
        bindKey: "PageUp",
        exec: function(e) {
            e.gotoPageUp();
        },
        readOnly: !0
    }, {
        name: "scrollup",
        bindKey: s("Ctrl-Up", null),
        exec: function(e) {
            e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight);
        },
        readOnly: !0
    }, {
        name: "scrolldown",
        bindKey: s("Ctrl-Down", null),
        exec: function(e) {
            e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight);
        },
        readOnly: !0
    }, {
        name: "selectlinestart",
        bindKey: "Shift-Home",
        exec: function(e) {
            e.getSelection().selectLineStart();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selectlineend",
        bindKey: "Shift-End",
        exec: function(e) {
            e.getSelection().selectLineEnd();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "togglerecording",
        bindKey: s("Ctrl-Alt-E", "Command-Option-E"),
        exec: function(e) {
            e.commands.toggleRecording(e);
        },
        readOnly: !0
    }, {
        name: "replaymacro",
        bindKey: s("Ctrl-Shift-E", "Command-Shift-E"),
        exec: function(e) {
            e.commands.replay(e);
        },
        readOnly: !0
    }, {
        name: "jumptomatching",
        bindKey: s("Ctrl-P", "Ctrl-Shift-P"),
        exec: function(e) {
            e.jumpToMatching();
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "selecttomatching",
        bindKey: s("Ctrl-Shift-P", null),
        exec: function(e) {
            e.jumpToMatching(!0);
        },
        multiSelectAction: "forEach",
        readOnly: !0
    }, {
        name: "cut",
        exec: function(e) {
            var t = e.getSelectionRange();
            if (e._emit("cut", t), !e.selection.isEmpty()) {
                e.session.remove(t), e.clearSelection();
            }
        },
        multiSelectAction: "forEach"
    }, {
        name: "removeline",
        bindKey: s("Ctrl-D", "Command-D"),
        exec: function(e) {
            e.removeLines();
        },
        multiSelectAction: "forEachLine"
    }, {
        name: "duplicateSelection",
        bindKey: s("Ctrl-Shift-D", "Command-Shift-D"),
        exec: function(e) {
            e.duplicateSelection();
        },
        multiSelectAction: "forEach"
    }, {
        name: "sortlines",
        bindKey: s("Ctrl-Alt-S", "Command-Alt-S"),
        exec: function(e) {
            e.sortLines();
        },
        multiSelectAction: "forEachLine"
    }, {
        name: "togglecomment",
        bindKey: s("Ctrl-/", "Command-/"),
        exec: function(e) {
            e.toggleCommentLines();
        },
        multiSelectAction: "forEachLine"
    }, {
        name: "toggleBlockComment",
        bindKey: s("Ctrl-Shift-/", "Command-Shift-/"),
        exec: function(e) {
            e.toggleBlockComment();
        },
        multiSelectAction: "forEach"
    }, {
        name: "modifyNumberUp",
        bindKey: s("Ctrl-Shift-Up", "Alt-Shift-Up"),
        exec: function(e) {
            e.modifyNumber(1);
        },
        multiSelectAction: "forEach"
    }, {
        name: "modifyNumberDown",
        bindKey: s("Ctrl-Shift-Down", "Alt-Shift-Down"),
        exec: function(e) {
            e.modifyNumber(-1);
        },
        multiSelectAction: "forEach"
    }, {
        name: "replace",
        bindKey: s("Ctrl-H", "Command-Option-F"),
        exec: function(e) {
            i.loadModule("ace/ext/searchbox", function(t) {
                t.Search(e, !0);
            });
        }
    }, {
        name: "undo",
        bindKey: s("Ctrl-Z", "Command-Z"),
        exec: function(e) {
            e.undo();
        }
    }, {
        name: "redo",
        bindKey: s("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
        exec: function(e) {
            e.redo();
        }
    }, {
        name: "copylinesup",
        bindKey: s("Alt-Shift-Up", "Command-Option-Up"),
        exec: function(e) {
            e.copyLinesUp();
        }
    }, {
        name: "movelinesup",
        bindKey: s("Alt-Up", "Option-Up"),
        exec: function(e) {
            e.moveLinesUp();
        }
    }, {
        name: "copylinesdown",
        bindKey: s("Alt-Shift-Down", "Command-Option-Down"),
        exec: function(e) {
            e.copyLinesDown();
        }
    }, {
        name: "movelinesdown",
        bindKey: s("Alt-Down", "Option-Down"),
        exec: function(e) {
            e.moveLinesDown();
        }
    }, {
        name: "del",
        bindKey: s("Delete", "Delete|Ctrl-D|Shift-Delete"),
        exec: function(e) {
            e.remove("right");
        },
        multiSelectAction: "forEach"
    }, {
        name: "backspace",
        bindKey: s("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
        exec: function(e) {
            e.remove("left");
        },
        multiSelectAction: "forEach"
    }, {
        name: "cut_or_delete",
        bindKey: s("Shift-Delete", null),
        exec: function(e) {
            if (e.selection.isEmpty()) {
                e.remove("left");
            } else {
                return !1;
            }
        },
        multiSelectAction: "forEach"
    }, {
        name: "removetolinestart",
        bindKey: s("Alt-Backspace", "Command-Backspace"),
        exec: function(e) {
            e.removeToLineStart();
        },
        multiSelectAction: "forEach"
    }, {
        name: "removetolineend",
        bindKey: s("Alt-Delete", "Ctrl-K"),
        exec: function(e) {
            e.removeToLineEnd();
        },
        multiSelectAction: "forEach"
    }, {
        name: "removewordleft",
        bindKey: s("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
        exec: function(e) {
            e.removeWordLeft();
        },
        multiSelectAction: "forEach"
    }, {
        name: "removewordright",
        bindKey: s("Ctrl-Delete", "Alt-Delete"),
        exec: function(e) {
            e.removeWordRight();
        },
        multiSelectAction: "forEach"
    }, {
        name: "outdent",
        bindKey: s("Shift-Tab", "Shift-Tab"),
        exec: function(e) {
            e.blockOutdent();
        },
        multiSelectAction: "forEach"
    }, {
        name: "indent",
        bindKey: s("Tab", "Tab"),
        exec: function(e) {
            e.indent();
        },
        multiSelectAction: "forEach"
    }, {
        name: "blockoutdent",
        bindKey: s("Ctrl-[", "Ctrl-["),
        exec: function(e) {
            e.blockOutdent();
        },
        multiSelectAction: "forEachLine"
    }, {
        name: "blockindent",
        bindKey: s("Ctrl-]", "Ctrl-]"),
        exec: function(e) {
            e.blockIndent();
        },
        multiSelectAction: "forEachLine"
    }, {
        name: "insertstring",
        exec: function(e, t) {
            e.insert(t);
        },
        multiSelectAction: "forEach"
    }, {
        name: "inserttext",
        exec: function(e, t) {
            e.insert(r.stringRepeat(t.text || "", t.times || 1));
        },
        multiSelectAction: "forEach"
    }, {
        name: "splitline",
        bindKey: s(null, "Ctrl-O"),
        exec: function(e) {
            e.splitLine();
        },
        multiSelectAction: "forEach"
    }, {
        name: "transposeletters",
        bindKey: s("Ctrl-T", "Ctrl-T"),
        exec: function(e) {
            e.transposeLetters();
        },
        multiSelectAction: function(e) {
            e.transposeSelections(1);
        }
    }, {
        name: "touppercase",
        bindKey: s("Ctrl-U", "Ctrl-U"),
        exec: function(e) {
            e.toUpperCase();
        },
        multiSelectAction: "forEach"
    }, {
        name: "tolowercase",
        bindKey: s("Ctrl-Shift-U", "Ctrl-Shift-U"),
        exec: function(e) {
            e.toLowerCase();
        },
        multiSelectAction: "forEach"
    } ];
}), define("ace/undomanager", [ "require", "exports", "module" ], function(e, t, n) {
    var r = function() {
        this.reset();
    };
    (function() {
        this.execute = function(e) {
            var t = e.args[0];
            if (this.$doc = e.args[1], e.merge && this.hasUndo()) {
                t = this.$undoStack.pop().concat(t);
            }
            if (this.$undoStack.push(t), this.$redoStack = [], this.dirtyCounter < 0) {
                this.dirtyCounter = 0/0;
            }
            this.dirtyCounter++;
        }, this.undo = function(e) {
            var t = this.$undoStack.pop();
            var n = null;
            if (t) {
                n = this.$doc.undoChanges(t, e), this.$redoStack.push(t), this.dirtyCounter--;
            }
            return n;
        }, this.redo = function(e) {
            var t = this.$redoStack.pop();
            var n = null;
            if (t) {
                n = this.$doc.redoChanges(t, e), this.$undoStack.push(t), this.dirtyCounter++;
            }
            return n;
        }, this.reset = function() {
            this.$undoStack = [], this.$redoStack = [], this.dirtyCounter = 0;
        }, this.hasUndo = function() {
            return this.$undoStack.length > 0;
        }, this.hasRedo = function() {
            return this.$redoStack.length > 0;
        }, this.markClean = function() {
            this.dirtyCounter = 0;
        }, this.isClean = function() {
            return 0 === this.dirtyCounter;
        };
    }).call(r.prototype), t.UndoManager = r;
}), define("ace/virtual_renderer", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/useragent", "ace/config", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/renderloop", "ace/lib/event_emitter" ], function(e, t, n) {
    var r = e("./lib/oop");
    var i = e("./lib/dom");
    var s = e("./lib/useragent");
    var o = e("./config");
    var u = e("./layer/gutter").Gutter;
    var a = e("./layer/marker").Marker;
    var f = e("./layer/text").Text;
    var l = e("./layer/cursor").Cursor;
    var c = e("./scrollbar").ScrollBarH;
    var h = e("./scrollbar").ScrollBarV;
    var p = e("./renderloop").RenderLoop;
    var d = e("./lib/event_emitter").EventEmitter;
    var v = ".ace_editor {position: relative;overflow: hidden;font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;font-size: 12px;line-height: normal;color: black;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;}.ace_content {position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: text;}.ace_dragging, .ace_dragging * {cursor: move !important;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: '';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTQ4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTU4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBMjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBMzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgXxbAAAAJbSURBVHjapFNNaBNBFH4zs5vdZLP5sQmNpT82QY209heh1ioWisaDRcSKF0WKJ0GQnrzrxasHsR6EnlrwD0TagxJabaVEpFYxLWlLSS822tr87m66ccfd2GKyVhA6MMybgfe97/vmPUQphd0sZjto9XIn9OOsvlu2nkqRzVU+6vvlzPf8W6bk8dxQ0NPbxAALgCgg2JkaQuhzQau/El0zbmUA7U0Es8v2CiYmKQJHGO1QICCLoqilMhkmurDAyapKgqItezi/USRdJqEYY4D5jCy03ht2yMkkvL91jTTX10qzyyu2hruPRN7jgbH+EOsXcMLgYiThEgAMhABW85oqy1DXdRIdvP1AHJ2acQXvDIrVHcdQNrEKNYSVMSZGMjEzIIAwDXIo+6G/FxcGnzkC3T2oMhLjre49sBB+RRcHLqdafK6sYdE/GGBwU1VpFNj0aN8pJbe+BkZyevUrvLl6Xmm0W9IuTc0DxrDNAJd5oEvI/KRsNC3bQyNjPO9yQ1YHcfj2QvfQc/5TUhJTBc2iM0U7AWDQtc1nJHvD/cfO2s7jaGkiTEfa/Ep8coLu7zmNmh8+dc5lZDuUeFAGUNA/OY6JVaypQ0vjr7XYjUvJM37vt+j1vuTK5DgVfVUoTjVe+y3/LxMxY2GgU+CSLy4cpfsYorRXuXIOi0Vt40h67uZFTdIo6nLaZcwUJWAzwNS0tBnqqKzQDnjdG/iPyZxo46HaKUpbvYkj8qYRTZsBhge+JHhZyh0x9b95JqjVJkT084kZIPwu/mPWqPgfQ5jXh2+92Ay7HedfAgwA6KDWafb4w3cAAAAASUVORK5CYII=\");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUM2OEZDQTg4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2OEZDQTk4RTU0MTFFMUEzM0VFRTM2RUY1M0RBMjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBQzY4RkNBNjhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBQzY4RkNBNzhFNTQxMUUxQTMzRUVFMzZFRjUzREEyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgd7PfIAAAGmSURBVHjaYvr//z8DJZiJgUIANoCRkREb9gLiSVAaQx4OQM7AAkwd7XU2/v++/rOttdYGEB9dASEvOMydGKfH8Gv/p4XTkvRBfLxeQAP+1cUhXopyvzhP7P/IoSj7g7Mw09cNKO6J1QQ0L4gICPIv/veg/8W+JdFvQNLHVsW9/nmn9zk7B+cCkDwhL7gt6knSZnx9/LuCEOcvkIAMP+cvto9nfqyZmmUAksfnBUtbM60gX/3/kgyv3/xSFOL5DZT+L8vP+Yfh5cvfPvp/xUHyQHXGyAYwgpwBjZYFT3Y1OEl/OfCH4ffv3wzc4iwMvNIsDJ+f/mH4+vIPAxsb631WW0Yln6ZpQLXdMK/DXGDflh+sIv37EivD5x//Gb7+YWT4y86sl7BCCkSD+Z++/1dkvsFRl+HnD1Rvje4F8whjMXmGj58YGf5zsDMwcnAwfPvKcml62DsQDeaDxN+/Y0qwlpEHqrdB94IRNIDUgfgfKJChGK4OikEW3gTiXUB950ASLFAF54AC94A0G9QAfOnmF9DCDzABFqS08IHYDIScdijOjQABBgC+/9awBH96jwAAAABJRU5ErkJggg==\");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url(\"data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAEFBQVJSUl5eXmRkZGtra39/f4WFhYmJiZGRkaampry8vMPDw8zMzNXV1dzc3OTk5Orq6vDw8P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABQALAAAAAAQABAAAAUuICWOZGmeaBml5XGwFCQSBGyXRSAwtqQIiRuiwIM5BoYVbEFIyGCQoeJGrVptIQA7\");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTk5MTVGREIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTk5MTVGRUIxNDkxMUUxOTc5Q0FFREQyMTNGMjBFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFOTkxNUZCQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFOTkxNUZDQjE0OTExRTE5NzlDQUVERDIxM0YyMEVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SIDkjAAAAJ1JREFUeNpi/P//PwMlgImBQkB7A6qrq/+DMC55FkIGKCoq4pVnpFkgTp069f/+/fv/r1u37r+tre1/kg0A+ptn9uzZYLaRkRHpLvjw4cNXWVlZhufPnzOcO3eOdAO0tbVPAjHDmzdvGA4fPsxIsgGSkpJmv379Ynj37h2DjIyMCMkG3LhxQ/T27dsMampqDHZ2dq/pH41DxwCAAAMAFdc68dUsFZgAAAAASUVORK5CYII=\");}.ace_scrollbar {position: absolute;overflow-x: hidden;overflow-y: auto;right: 0;top: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-h {position: absolute;overflow-x: auto;overflow-y: hidden;right: 0;left: 0;bottom: 0;z-index: 6;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;text-indent: -1em;}.ace_text-input.ace_composition {background: #f8f8f8;color: #111;z-index: 1000;opacity: 1;text-indent: 0;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;white-space: nowrap;height: 100%;width: 100%;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;/* setting pointer-events: auto; on node under the mouse, which changesduring scroll, will break mouse wheel scrolling in Safari */pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;}.ace_text-layer {font: inherit !important;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;border-left: 2px solid}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0px;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {-moz-transition: opacity 0.18s;-webkit-transition: opacity 0.18s;-o-transition: opacity 0.18s;-ms-transition: opacity 0.18s;transition: opacity 0.18s;}.ace_cursor[style*=\"opacity: 0\"]{-ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";}.ace_editor.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_line {white-space: nowrap;}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_line .ace_fold {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%3AIDAT8%11c%FC%FF%FF%7F%18%03%1A%60%01%F2%3F%A0%891%80%04%FF%11-%F8%17%9BJ%E2%05%B1ZD%81v%26t%E7%80%F8%A3%82h%A12%1A%20%A3%01%02%0F%01%BA%25%06%00%19%C0%0D%AEF%D5%3ES%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;-moz-border-radius: 2px;-webkit-border-radius: 2px;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%09%08%06%00%00%00%D4%E8%C7%0C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%B5IDAT(%15%A5%91%3D%0E%02!%10%85ac%E1%05%D6%CE%D6%C6%CE%D2%E8%ED%CD%DE%C0%C6%D6N.%E0V%F8%3D%9Ca%891XH%C2%BE%D9y%3F%90!%E6%9C%C3%BFk%E5%011%C6-%F5%C8N%04%DF%BD%FF%89%DFt%83DN%60%3E%F3%AB%A0%DE%1A%5Dg%BE%10Q%97%1B%40%9C%A8o%10%8F%5E%828%B4%1B%60%87%F6%02%26%85%1Ch%1E%C1%2B%5Bk%FF%86%EE%B7j%09%9A%DA%9B%ACe%A3%F9%EC%DA!9%B4%D5%A6%81%86%86%98%CC%3C%5B%40%FA%81%B3%E9%CB%23%94%C16Azo%05%D4%E1%C1%95a%3B%8A'%A0%E8%CC%17%22%85%1D%BA%00%A2%FA%DC%0A%94%D1%D1%8D%8B%3A%84%17B%C7%60%1A%25Z%FC%8D%00%00%00%00IEND%AEB%60%82\"),url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%007%08%06%00%00%00%C4%DD%80C%00%00%03%1EiCCPICC%20Profile%00%00x%01%85T%DFk%D3P%14%FE%DAe%9D%B0%E1%8B%3Ag%11%09%3Eh%91ndStC%9C%B6kW%BA%CDZ%EA6%B7!H%9B%A6m%5C%9A%C6%24%ED~%B0%07%D9%8Bo%3A%C5w%F1%07%3E%F9%07%0C%D9%83o%7B%92%0D%C6%14a%F8%AC%88%22L%F6%22%B3%9E%9B4M'S%03%B9%F7%BB%DF%F9%EE9'%E7%E4%5E%A0%F9qZ%D3%14%2F%0F%14USO%C5%C2%FC%C4%E4%14%DF%F2%01%5E%1CC%2B%FChM%8B%86%16J%26G%40%0F%D3%B2y%EF%B3%F3%0E%1E%C6lt%EEo%DF%AB%FEc%D5%9A%95%0C%11%F0%1C%20%BE%945%C4%22%E1Y%A0i%5C%D4t%13%E0%D6%89%EF%9D15%C2%CDLsX%A7%04%09%1Fg8oc%81%E1%8C%8D%23%96f45%40%9A%09%C2%07%C5B%3AK%B8%408%98i%E0%F3%0D%D8%CE%81%14%E4'%26%A9%92.%8B%3C%ABER%2F%E5dE%B2%0C%F6%F0%1Fs%83%F2_%B0%A8%94%E9%9B%AD%E7%10%8Dm%9A%19N%D1%7C%8A%DE%1F9%7Dp%8C%E6%00%D5%C1%3F_%18%BDA%B8%9DpX6%E3%A35~B%CD%24%AE%11%26%BD%E7%EEti%98%EDe%9A%97Y)%12%25%1C%24%BCbT%AE3li%E6%0B%03%89%9A%E6%D3%ED%F4P%92%B0%9F4%BF43Y%F3%E3%EDP%95%04%EB1%C5%F5%F6KF%F4%BA%BD%D7%DB%91%93%07%E35%3E%A7)%D6%7F%40%FE%BD%F7%F5r%8A%E5y%92%F0%EB%B4%1E%8D%D5%F4%5B%92%3AV%DB%DB%E4%CD%A6%23%C3%C4wQ%3F%03HB%82%8E%1Cd(%E0%91B%0Ca%9Ac%C4%AA%F8L%16%19%22J%A4%D2itTy%B28%D6%3B(%93%96%ED%1CGx%C9_%0E%B8%5E%16%F5%5B%B2%B8%F6%E0%FB%9E%DD%25%D7%8E%BC%15%85%C5%B7%A3%D8Q%ED%B5%81%E9%BA%B2%13%9A%1B%7Fua%A5%A3n%E17%B9%E5%9B%1Bm%AB%0B%08Q%FE%8A%E5%B1H%5Ee%CAO%82Q%D7u6%E6%90S%97%FCu%0B%CF2%94%EE%25v%12X%0C%BA%AC%F0%5E%F8*l%0AO%85%17%C2%97%BF%D4%C8%CE%DE%AD%11%CB%80q%2C%3E%AB%9ES%CD%C6%EC%25%D2L%D2%EBd%B8%BF%8A%F5B%C6%18%F9%901CZ%9D%BE%24M%9C%8A9%F2%DAP%0B'%06w%82%EB%E6%E2%5C%2F%D7%07%9E%BB%CC%5D%E1%FA%B9%08%AD.r%23%8E%C2%17%F5E%7C!%F0%BE3%BE%3E_%B7o%88a%A7%DB%BE%D3d%EB%A31Z%EB%BB%D3%91%BA%A2%B1z%94%8F%DB'%F6%3D%8E%AA%13%19%B2%B1%BE%B1~V%08%2B%B4%A2cjJ%B3tO%00%03%25mN%97%F3%05%93%EF%11%84%0B%7C%88%AE-%89%8F%ABbW%90O%2B%0Ao%99%0C%5E%97%0CI%AFH%D9.%B0%3B%8F%ED%03%B6S%D6%5D%E6i_s9%F3*p%E9%1B%FD%C3%EB.7U%06%5E%19%C0%D1s.%17%A03u%E4%09%B0%7C%5E%2C%EB%15%DB%1F%3C%9E%B7%80%91%3B%DBc%AD%3Dma%BA%8B%3EV%AB%DBt.%5B%1E%01%BB%0F%AB%D5%9F%CF%AA%D5%DD%E7%E4%7F%0Bx%A3%FC%06%A9%23%0A%D6%C2%A1_2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%003IDAT8%11c%FC%FF%FF%7F%3E%03%1A%60%01%F2%3F%A3%891%80%04%FFQ%26%F8w%C0%B43%A1%DB%0C%E2%8F%0A%A2%85%CAh%80%8C%06%08%3C%04%E8%96%18%00%A3S%0D%CD%CF%D8%C1%9D%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat, repeat-x;background-position: center center, top left;}.ace_gutter-tooltip {background-color: #FFF;background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;display: inline-block;max-width: 500px;padding: 4px;position: fixed;z-index: 999999;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: default;white-space: pre-line;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAe%8A%B1%0D%000%0C%C2%F2%2CK%96%BC%D0%8F9%81%88H%E9%D0%0E%96%C0%10%92%3E%02%80%5E%82%E4%A9*-%EEsw%C8%CC%11%EE%96w%D8%DC%E9*Eh%0C%151(%00%00%00%00IEND%AEB%60%82\");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%05%00%00%00%05%08%06%00%00%00%8Do%26%E5%00%00%004IDATx%DAm%C7%C1%09%000%08C%D1%8C%ECE%C8E(%8E%EC%02)%1EZJ%F1%C1'%04%07I%E1%E5%EE%CAL%F5%A2%99%99%22%E2%D6%1FU%B5%FE0%D9x%A7%26Wz5%0E%D5%00%00%00%00IEND%AEB%60%82\");}.ace_fold-widget.ace_closed {background-image: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%03%00%00%00%06%08%06%00%00%00%06%E5%24%0C%00%00%009IDATx%DA5%CA%C1%09%000%08%03%C0%AC*(%3E%04%C1%0D%BA%B1%23%A4Uh%E0%20%81%C0%CC%F8%82%81%AA%A2%AArGfr%88%08%11%11%1C%DD%7D%E0%EE%5B%F6%F6%CB%B8%05Q%2F%E9tai%D9%00%00%00%00IEND%AEB%60%82\");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}/*** Dark version for fold widgets*/.ace_dark .ace_fold-widget {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC\");}.ace_dark .ace_fold-widget.ace_end {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget.ace_closed {background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==\");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {-moz-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);-webkit-box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {-moz-transition: opacity 0.4s ease 0.05s;-webkit-transition: opacity 0.4s ease 0.05s;-o-transition: opacity 0.4s ease 0.05s;-ms-transition: opacity 0.4s ease 0.05s;transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {-moz-transition: opacity 0.05s ease 0.05s;-webkit-transition: opacity 0.05s ease 0.05s;-o-transition: opacity 0.05s ease 0.05s;-ms-transition: opacity 0.05s ease 0.05s;transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}";
    i.importCssString(v, "ace_editor");
    var m = function(e, t) {
        var n = this;
        this.container = e || i.createElement("div"), this.$keepTextAreaAtCursor = !0, i.addCssClass(this.container, "ace_editor"), 
        this.setTheme(t), this.$gutter = i.createElement("div"), this.$gutter.className = "ace_gutter", 
        this.container.appendChild(this.$gutter), this.scroller = i.createElement("div"), 
        this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), 
        this.content = i.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), 
        this.$gutterLayer = new u(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), 
        this.$markerBack = new a(this.content);
        var r = this.$textLayer = new f(this.content);
        this.canvas = r.element, this.$markerFront = new a(this.content), this.$cursorLayer = new l(this.content), 
        this.$horizScroll = !1, this.$vScroll = !1, this.scrollBar = this.scrollBarV = new h(this.container, this), 
        this.scrollBarH = new c(this.container, this), this.scrollBarV.addEventListener("scroll", function(e) {
            if (!n.$scrollAnimation) {
                n.session.setScrollTop(e.data - n.scrollMargin.top);
            }
        }), this.scrollBarH.addEventListener("scroll", function(e) {
            if (!n.$scrollAnimation) {
                n.session.setScrollLeft(e.data - n.scrollMargin.left);
            }
        }), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = {
            row: 0,
            column: 0
        }, this.$textLayer.addEventListener("changeCharacterSize", function() {
            n.updateCharacterSize(), n.onResize(!0), n._signal("changeCharacterSize");
        }), this.$size = {
            width: 0,
            height: 0,
            scrollerHeight: 0,
            scrollerWidth: 0
        }, this.layerConfig = {
            width: 1,
            padding: 0,
            firstRow: 0,
            firstRowScreen: 0,
            lastRow: 0,
            lineHeight: 0,
            characterWidth: 0,
            minHeight: 1,
            maxHeight: 1,
            offset: 0,
            height: 1
        }, this.scrollMargin = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            v: 0,
            h: 0
        }, this.$loop = new p(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), 
        this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), 
        o.resetOptions(this), o._emit("renderer", this);
    };
    (function() {
        this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, 
        this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, 
        this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, 
        r.implement(this, d), this.updateCharacterSize = function() {
            if (this.$textLayer.allowBoldFonts != this.$allowBoldFonts) {
                this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts);
            }
            this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), 
            this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), 
            this.$updatePrintMargin();
        }, this.setSession = function(e) {
            this.session = e, this.scroller.className = "ace_scroller", this.$cursorLayer.setSession(e), 
            this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), 
            this.$textLayer.setSession(e), this.$loop.schedule(this.CHANGE_FULL);
        }, this.updateLines = function(e, t) {
            if (void 0 === t) {
                t = 1/0;
            }
            if (!this.$changedLines) {
                this.$changedLines = {
                    firstRow: e,
                    lastRow: t
                };
            } else {
                if (this.$changedLines.firstRow > e) {
                    this.$changedLines.firstRow = e;
                }
                if (this.$changedLines.lastRow < t) {
                    this.$changedLines.lastRow = t;
                }
            }
            if (this.$changedLines.firstRow > this.layerConfig.lastRow || this.$changedLines.lastRow < this.layerConfig.firstRow) {
                return;
            }
            this.$loop.schedule(this.CHANGE_LINES);
        }, this.onChangeTabSize = function() {
            this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize();
        }, this.updateText = function() {
            this.$loop.schedule(this.CHANGE_TEXT);
        }, this.updateFull = function(e) {
            if (e) {
                this.$renderChanges(this.CHANGE_FULL, !0);
            } else {
                this.$loop.schedule(this.CHANGE_FULL);
            }
        }, this.updateFontSize = function() {
            this.$textLayer.checkForSizeChanges();
        }, this.$changes = 0, this.onResize = function(e, t, n, r) {
            if (this.resizing > 2) {
                return;
            } else {
                if (this.resizing > 0) {
                    this.resizing++;
                } else {
                    this.resizing = e ? 1 : 0;
                }
            }
            var i = this.container;
            if (!r) {
                r = i.clientHeight || i.scrollHeight;
            }
            if (!n) {
                n = i.clientWidth || i.scrollWidth;
            }
            var s = this.$updateCachedSize(e, t, n, r);
            if (!this.$size.scrollerHeight || !n && !r) {
                return this.resizing = 0;
            }
            if (e) {
                this.$gutterLayer.$padding = null;
            }
            if (e) {
                this.$renderChanges(s, !0);
            } else {
                this.$loop.schedule(s | this.$changes);
            }
            if (this.resizing) {
                this.resizing = 0;
            }
        }, this.$updateCachedSize = function(e, t, n, r) {
            var i = 0;
            var s = this.$size;
            var o = {
                width: s.width,
                height: s.height,
                scrollerHeight: s.scrollerHeight,
                scrollerWidth: s.scrollerWidth
            };
            if (r && (e || s.height != r)) {
                if (s.height = r, i = this.CHANGE_SIZE, s.scrollerHeight = s.height, this.$horizScroll) {
                    s.scrollerHeight -= this.scrollBarH.getHeight();
                }
                if (this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", this.session) {
                    this.session.setScrollTop(this.getScrollTop()), i |= this.CHANGE_SCROLL;
                }
            }
            if (n && (e || s.width != n)) {
                if (i = this.CHANGE_SIZE, s.width = n, null == t) {
                    t = this.$showGutter ? this.$gutter.offsetWidth : 0;
                }
                if (this.gutterWidth = t, this.scrollBarH.element.style.left = this.scroller.style.left = t + "px", 
                s.scrollerWidth = Math.max(0, n - t - this.scrollBarV.getWidth()), this.scrollBarH.element.style.right = this.scroller.style.right = this.scrollBarV.getWidth() + "px", 
                this.scroller.style.bottom = this.scrollBarH.getHeight() + "px", this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e) {
                    i |= this.CHANGE_FULL;
                }
            }
            if (i) {
                this._signal("resize", o);
            }
            return i;
        }, this.onGutterResize = function() {
            var e = this.$showGutter ? this.$gutter.offsetWidth : 0;
            if (e != this.gutterWidth) {
                this.$changes |= this.$updateCachedSize(!0, e, this.$size.width, this.$size.height);
            }
            if (this.session.getUseWrapMode() && this.adjustWrapLimit()) {
                this.$loop.schedule(this.CHANGE_FULL);
            } else {
                this.$computeLayerConfig(), this.$loop.schedule(this.CHANGE_MARKER);
            }
        }, this.adjustWrapLimit = function() {
            var e = this.$size.scrollerWidth - 2 * this.$padding;
            var t = Math.floor(e / this.characterWidth);
            return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn);
        }, this.setAnimatedScroll = function(e) {
            this.setOption("animatedScroll", e);
        }, this.getAnimatedScroll = function() {
            return this.$animatedScroll;
        }, this.setShowInvisibles = function(e) {
            this.setOption("showInvisibles", e);
        }, this.getShowInvisibles = function() {
            return this.getOption("showInvisibles");
        }, this.getDisplayIndentGuides = function() {
            return this.getOption("displayIndentGuides");
        }, this.setDisplayIndentGuides = function(e) {
            this.setOption("displayIndentGuides", e);
        }, this.setShowPrintMargin = function(e) {
            this.setOption("showPrintMargin", e);
        }, this.getShowPrintMargin = function() {
            return this.getOption("showPrintMargin");
        }, this.setPrintMarginColumn = function(e) {
            this.setOption("printMarginColumn", e);
        }, this.getPrintMarginColumn = function() {
            return this.getOption("printMarginColumn");
        }, this.getShowGutter = function() {
            return this.getOption("showGutter");
        }, this.setShowGutter = function(e) {
            return this.setOption("showGutter", e);
        }, this.getFadeFoldWidgets = function() {
            return this.getOption("fadeFoldWidgets");
        }, this.setFadeFoldWidgets = function(e) {
            this.setOption("fadeFoldWidgets", e);
        }, this.setHighlightGutterLine = function(e) {
            this.setOption("highlightGutterLine", e);
        }, this.getHighlightGutterLine = function() {
            return this.getOption("highlightGutterLine");
        }, this.$updateGutterLineHighlight = function() {
            var e = this.$cursorLayer.$pixelPos;
            var t = this.layerConfig.lineHeight;
            if (this.session.getUseWrapMode()) {
                var n = this.session.selection.getCursor();
                n.column = 0, e = this.$cursorLayer.getPixelPosition(n, !0), t *= this.session.getRowLength(n.row);
            }
            this.$gutterLineHighlight.style.top = e.top - this.layerConfig.offset + "px", this.$gutterLineHighlight.style.height = t + "px";
        }, this.$updatePrintMargin = function() {
            if (!this.$showPrintMargin && !this.$printMarginEl) {
                return;
            }
            if (!this.$printMarginEl) {
                var e = i.createElement("div");
                e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = i.createElement("div"), 
                this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), 
                this.content.insertBefore(e, this.content.firstChild);
            }
            var t = this.$printMarginEl.style;
            if (t.left = this.characterWidth * this.$printMarginColumn + this.$padding + "px", 
            t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap) {
                this.adjustWrapLimit();
            }
        }, this.getContainerElement = function() {
            return this.container;
        }, this.getMouseEventTarget = function() {
            return this.content;
        }, this.getTextAreaContainer = function() {
            return this.container;
        }, this.$moveTextAreaToCursor = function() {
            if (!this.$keepTextAreaAtCursor) {
                return;
            }
            var e = this.layerConfig;
            var t = this.$cursorLayer.$pixelPos.top;
            var n = this.$cursorLayer.$pixelPos.left;
            t -= e.offset;
            var r = this.lineHeight;
            if (0 > t || t > e.height - r) {
                return;
            }
            var i = this.characterWidth;
            if (this.$composition) {
                var s = this.textarea.value.replace(/^\x01+/, "");
                i *= this.session.$getStringScreenWidth(s)[0] + 2, r += 2, t -= 1;
            }
            if (n -= this.scrollLeft, n > this.$size.scrollerWidth - i) {
                n = this.$size.scrollerWidth - i;
            }
            n -= this.scrollBar.width, this.textarea.style.height = r + "px", this.textarea.style.width = i + "px", 
            this.textarea.style.right = Math.max(0, this.$size.scrollerWidth - n - i) + "px", 
            this.textarea.style.bottom = Math.max(0, this.$size.height - t - r) + "px";
        }, this.getFirstVisibleRow = function() {
            return this.layerConfig.firstRow;
        }, this.getFirstFullyVisibleRow = function() {
            return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1);
        }, this.getLastFullyVisibleRow = function() {
            var e = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
            return this.layerConfig.firstRow - 1 + e;
        }, this.getLastVisibleRow = function() {
            return this.layerConfig.lastRow;
        }, this.$padding = null, this.setPadding = function(e) {
            this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), 
            this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), 
            this.$updatePrintMargin();
        }, this.setScrollMargin = function(e, t, n, r) {
            var i = this.scrollMargin;
            i.top = 0 | e, i.bottom = 0 | t, i.right = 0 | r, i.left = 0 | n, i.v = i.top + i.bottom, 
            i.h = i.left + i.right, this.updateFull();
        }, this.getHScrollBarAlwaysVisible = function() {
            return this.$hScrollBarAlwaysVisible;
        }, this.setHScrollBarAlwaysVisible = function(e) {
            this.setOption("hScrollBarAlwaysVisible", e);
        }, this.getVScrollBarAlwaysVisible = function() {
            return this.$hScrollBarAlwaysVisible;
        }, this.setVScrollBarAlwaysVisible = function(e) {
            this.setOption("vScrollBarAlwaysVisible", e);
        }, this.$updateScrollBarV = function() {
            this.scrollBarV.setInnerHeight(this.layerConfig.maxHeight + this.scrollMargin.v), 
            this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top);
        }, this.$updateScrollBarH = function() {
            this.scrollBarH.setInnerWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), 
            this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left);
        }, this.$renderChanges = function(e, t) {
            if (this.$changes) {
                e |= this.$changes, this.$changes = 0;
            }
            if (!this.session || !this.container.offsetWidth || !e && !t) {
                return void (this.$changes |= e);
            }
            if (!this.$size.width) {
                return this.$changes |= e, this.onResize(!0);
            }
            if (!this.lineHeight) {
                this.$textLayer.checkForSizeChanges();
            }
            if (this._signal("beforeRender"), e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL || e & this.CHANGE_H_SCROLL) {
                e |= this.$computeLayerConfig();
            }
            if (e & this.CHANGE_H_SCROLL) {
                this.$updateScrollBarH(), this.content.style.marginLeft = -this.scrollLeft + "px", 
                this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left";
            }
            if (e & this.CHANGE_FULL) {
                if (this.$updateScrollBarV(), this.$updateScrollBarH(), this.$textLayer.update(this.layerConfig), 
                this.$showGutter) {
                    this.$gutterLayer.update(this.layerConfig);
                }
                return this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), 
                this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight(), 
                void this._signal("afterRender");
            }
            if (e & this.CHANGE_SCROLL) {
                if (this.$updateScrollBarV(), e & this.CHANGE_TEXT || e & this.CHANGE_LINES) {
                    this.$textLayer.update(this.layerConfig);
                } else {
                    this.$textLayer.scrollLines(this.layerConfig);
                }
                if (this.$showGutter) {
                    this.$gutterLayer.update(this.layerConfig);
                }
                return this.$markerBack.update(this.layerConfig), this.$markerFront.update(this.layerConfig), 
                this.$cursorLayer.update(this.layerConfig), this.$highlightGutterLine && this.$updateGutterLineHighlight(), 
                this.$moveTextAreaToCursor(), void this._signal("afterRender");
            }
            if (e & this.CHANGE_TEXT) {
                if (this.$textLayer.update(this.layerConfig), this.$showGutter) {
                    this.$gutterLayer.update(this.layerConfig);
                }
            } else {
                if (e & this.CHANGE_LINES) {
                    if (this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) {
                        this.$gutterLayer.update(this.layerConfig);
                    }
                } else {
                    if (e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER) {
                        if (this.$showGutter) {
                            this.$gutterLayer.update(this.layerConfig);
                        }
                    }
                }
            }
            if (e & this.CHANGE_CURSOR) {
                this.$cursorLayer.update(this.layerConfig), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight();
            }
            if (e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT)) {
                this.$markerFront.update(this.layerConfig);
            }
            if (e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK)) {
                this.$markerBack.update(this.layerConfig);
            }
            if (e & this.CHANGE_SIZE || e & this.CHANGE_LINES) {
                this.$updateScrollBarV(), this.$updateScrollBarH();
            }
            this._signal("afterRender");
        }, this.$autosize = function(e, t) {
            var e = this.session.getScreenLength() * this.lineHeight;
            var n = this.$maxLines * this.lineHeight;
            var r = Math.max((this.$minLines || 1) * this.lineHeight, Math.min(n, e));
            var i = e > n;
            if (r != this.desiredHeight || this.$size.height != this.desiredHeight || i != this.$vScroll) {
                if (i != this.$vScroll) {
                    this.$vScroll = i, this.scrollBarV.setVisible(i);
                }
                var s = this.container.clientWidth;
                this.container.style.height = r + "px", this.$updateCachedSize(!0, this.$gutterWidth, s, r), 
                this.desiredHeight = r;
            }
        }, this.$computeLayerConfig = function() {
            if (this.$maxLines && this.lineHeight > 1) {
                this.$autosize();
            }
            var e = this.session;
            var t = this.$size.height <= 2 * this.lineHeight;
            var n = this.session.getScreenLength();
            var r = n * this.lineHeight;
            var i = this.scrollTop % this.lineHeight;
            var s = this.$size.scrollerHeight + this.lineHeight;
            var o = this.$getLongestLine();
            var u = !t && (this.$hScrollBarAlwaysVisible || this.$size.scrollerWidth - o - 2 * this.$padding < 0);
            var a = this.$horizScroll !== u;
            if (a) {
                this.$horizScroll = u, this.scrollBarH.setVisible(u);
            }
            if (!this.$maxLines && this.$scrollPastEnd) {
                if (this.scrollTop > r - this.$size.scrollerHeight) {
                    r += Math.min((this.$size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd, this.scrollTop - r + this.$size.scrollerHeight);
                }
            }
            var f = !t && (this.$vScrollBarAlwaysVisible || this.$size.scrollerHeight - r < 0);
            var l = this.$vScroll !== f;
            if (l) {
                this.$vScroll = f, this.scrollBarV.setVisible(f);
            }
            this.session.setScrollTop(Math.max(-this.scrollMargin.top, Math.min(this.scrollTop, r - this.$size.scrollerHeight + this.scrollMargin.v))), 
            this.session.setScrollLeft(Math.max(-this.scrollMargin.left, Math.min(this.scrollLeft, o + 2 * this.$padding - this.$size.scrollerWidth + this.scrollMargin.h)));
            var c = Math.ceil(s / this.lineHeight) - 1;
            var h = Math.max(0, Math.round((this.scrollTop - i) / this.lineHeight));
            var p = h + c;
            var d, v;
            var m = this.lineHeight;
            h = e.screenToDocumentRow(h, 0);
            var g = e.getFoldLine(h);
            if (g) {
                h = g.start.row;
            }
            d = e.documentToScreenRow(h, 0), v = e.getRowLength(h) * m, p = Math.min(e.screenToDocumentRow(p, 0), e.getLength() - 1), 
            s = this.$size.scrollerHeight + e.getRowLength(p) * m + v, i = this.scrollTop - d * m;
            var y = 0;
            if (a || l) {
                if (y = this.$updateCachedSize(!0, this.gutterWidth, this.$size.width, this.$size.height), 
                this._signal("scrollbarVisibilityChanged"), l) {
                    o = this.$getLongestLine();
                }
            }
            return this.layerConfig = {
                width: o,
                padding: this.$padding,
                firstRow: h,
                firstRowScreen: d,
                lastRow: p,
                lineHeight: m,
                characterWidth: this.characterWidth,
                minHeight: s,
                maxHeight: r,
                offset: i,
                height: this.$size.scrollerHeight
            }, this.$gutterLayer.element.style.marginTop = -i + "px", this.content.style.marginTop = -i + "px", 
            this.content.style.width = o + 2 * this.$padding + "px", this.content.style.height = s + "px", 
            y;
        }, this.$updateLines = function() {
            var e = this.$changedLines.firstRow;
            var t = this.$changedLines.lastRow;
            this.$changedLines = null;
            var n = this.layerConfig;
            if (e > n.lastRow + 1) {
                return;
            }
            if (t < n.firstRow) {
                return;
            }
            if (1/0 === t) {
                if (this.$showGutter) {
                    this.$gutterLayer.update(n);
                }
                return void this.$textLayer.update(n);
            }
            return this.$textLayer.updateLines(n, e, t), !0;
        }, this.$getLongestLine = function() {
            var e = this.session.getScreenWidth();
            if (this.showInvisibles && !this.session.$useWrapMode) {
                e += 1;
            }
            return Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth));
        }, this.updateFrontMarkers = function() {
            this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT);
        }, this.updateBackMarkers = function() {
            this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK);
        }, this.addGutterDecoration = function(e, t) {
            this.$gutterLayer.addGutterDecoration(e, t);
        }, this.removeGutterDecoration = function(e, t) {
            this.$gutterLayer.removeGutterDecoration(e, t);
        }, this.updateBreakpoints = function(e) {
            this.$loop.schedule(this.CHANGE_GUTTER);
        }, this.setAnnotations = function(e) {
            this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER);
        }, this.updateCursor = function() {
            this.$loop.schedule(this.CHANGE_CURSOR);
        }, this.hideCursor = function() {
            this.$cursorLayer.hideCursor();
        }, this.showCursor = function() {
            this.$cursorLayer.showCursor();
        }, this.scrollSelectionIntoView = function(e, t, n) {
            this.scrollCursorIntoView(e, n), this.scrollCursorIntoView(t, n);
        }, this.scrollCursorIntoView = function(e, t) {
            if (0 === this.$size.scrollerHeight) {
                return;
            }
            var n = this.$cursorLayer.getPixelPosition(e);
            var r = n.left;
            var i = n.top;
            var s = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
            if (s > i) {
                if (t) {
                    i -= t * this.$size.scrollerHeight;
                }
                if (0 == i) {
                    i = -this.scrollMargin.top;
                } else {
                    if (0 == i) {
                        i = +this.scrollMargin.bottom;
                    }
                }
                this.session.setScrollTop(i);
            } else {
                if (s + this.$size.scrollerHeight < i + this.lineHeight) {
                    if (t) {
                        i += t * this.$size.scrollerHeight;
                    }
                    this.session.setScrollTop(i + this.lineHeight - this.$size.scrollerHeight);
                }
            }
            var o = this.scrollLeft;
            if (o > r) {
                if (r < this.$padding + 2 * this.layerConfig.characterWidth) {
                    r = -this.scrollMargin.left;
                }
                this.session.setScrollLeft(r);
            } else {
                if (o + this.$size.scrollerWidth < r + this.characterWidth) {
                    this.session.setScrollLeft(Math.round(r + this.characterWidth - this.$size.scrollerWidth));
                } else {
                    if (o <= this.$padding && r - o < this.characterWidth) {
                        this.session.setScrollLeft(0);
                    }
                }
            }
        }, this.getScrollTop = function() {
            return this.session.getScrollTop();
        }, this.getScrollLeft = function() {
            return this.session.getScrollLeft();
        }, this.getScrollTopRow = function() {
            return this.scrollTop / this.lineHeight;
        }, this.getScrollBottomRow = function() {
            return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1);
        }, this.scrollToRow = function(e) {
            this.session.setScrollTop(e * this.lineHeight);
        }, this.alignCursor = function(e, t) {
            if ("number" == typeof e) {
                e = {
                    row: e,
                    column: 0
                };
            }
            var n = this.$cursorLayer.getPixelPosition(e);
            var r = this.$size.scrollerHeight - this.lineHeight;
            var i = n.top - r * (t || 0);
            return this.session.setScrollTop(i), i;
        }, this.STEPS = 8, this.$calcSteps = function(e, t) {
            var n = 0;
            var r = this.STEPS;
            var i = [];
            var s = function(e, t, n) {
                return n * (Math.pow(e - 1, 3) + 1) + t;
            };
            for (n = 0; r > n; ++n) {
                i.push(s(n / this.STEPS, e, t - e));
            }
            return i;
        }, this.scrollToLine = function(e, t, n, r) {
            var i = this.$cursorLayer.getPixelPosition({
                row: e,
                column: 0
            });
            var s = i.top;
            if (t) {
                s -= this.$size.scrollerHeight / 2;
            }
            var o = this.scrollTop;
            if (this.session.setScrollTop(s), n !== !1) {
                this.animateScrolling(o, r);
            }
        }, this.animateScrolling = function(e, t) {
            var n = this.scrollTop;
            if (!this.$animatedScroll) {
                return;
            }
            var r = this;
            if (e == n) {
                return;
            }
            if (this.$scrollAnimation) {
                var i = this.$scrollAnimation.steps;
                if (i.length) {
                    if (e = i[0], e == n) {
                        return;
                    }
                }
            }
            var s = r.$calcSteps(e, n);
            this.$scrollAnimation = {
                from: e,
                to: n,
                steps: s
            }, clearInterval(this.$timer), r.session.setScrollTop(s.shift()), this.$timer = setInterval(function() {
                if (s.length) {
                    r.session.setScrollTop(s.shift()), r.session.$scrollTop = n;
                } else {
                    if (null != n) {
                        r.session.$scrollTop = -1, r.session.setScrollTop(n), n = null;
                    } else {
                        r.$timer = clearInterval(r.$timer), r.$scrollAnimation = null, t && t();
                    }
                }
            }, 10);
        }, this.scrollToY = function(e) {
            if (this.scrollTop !== e) {
                this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e;
            }
        }, this.scrollToX = function(e) {
            if (this.scrollLeft !== e) {
                this.scrollLeft = e;
            }
            this.$loop.schedule(this.CHANGE_H_SCROLL);
        }, this.scrollTo = function(e, t) {
            this.session.setScrollTop(t), this.session.setScrollLeft(t);
        }, this.scrollBy = function(e, t) {
            t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e);
        }, this.isScrollableBy = function(e, t) {
            if (0 > t && this.session.getScrollTop() >= 1 - this.scrollMargin.top) {
                return !0;
            }
            if (t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight - (this.$size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd < -1 + this.scrollMargin.bottom) {
                return !0;
            }
            if (0 > e && this.session.getScrollLeft() >= 1 - this.scrollMargin.left) {
                return !0;
            }
            if (e > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right) {
                return !0;
            }
        }, this.pixelToScreenCoordinates = function(e, t) {
            var n = this.scroller.getBoundingClientRect();
            var r = (e + this.scrollLeft - n.left - this.$padding) / this.characterWidth;
            var i = Math.floor((t + this.scrollTop - n.top) / this.lineHeight);
            var s = Math.round(r);
            return {
                row: i,
                column: s,
                side: r - s > 0 ? 1 : -1
            };
        }, this.screenToTextCoordinates = function(e, t) {
            var n = this.scroller.getBoundingClientRect();
            var r = Math.round((e + this.scrollLeft - n.left - this.$padding) / this.characterWidth);
            var i = Math.floor((t + this.scrollTop - n.top) / this.lineHeight);
            return this.session.screenToDocumentPosition(i, Math.max(r, 0));
        }, this.textToScreenCoordinates = function(e, t) {
            var n = this.scroller.getBoundingClientRect();
            var r = this.session.documentToScreenPosition(e, t);
            var i = this.$padding + Math.round(r.column * this.characterWidth);
            var s = r.row * this.lineHeight;
            return {
                pageX: n.left + i - this.scrollLeft,
                pageY: n.top + s - this.scrollTop
            };
        }, this.visualizeFocus = function() {
            i.addCssClass(this.container, "ace_focus");
        }, this.visualizeBlur = function() {
            i.removeCssClass(this.container, "ace_focus");
        }, this.showComposition = function(e) {
            if (!this.$composition) {
                this.$composition = {
                    keepTextAreaAtCursor: this.$keepTextAreaAtCursor,
                    cssText: this.textarea.style.cssText
                };
            }
            this.$keepTextAreaAtCursor = !0, i.addCssClass(this.textarea, "ace_composition"), 
            this.textarea.style.cssText = "", this.$moveTextAreaToCursor();
        }, this.setCompositionText = function(e) {
            this.$moveTextAreaToCursor();
        }, this.hideComposition = function() {
            if (!this.$composition) {
                return;
            }
            i.removeCssClass(this.textarea, "ace_composition"), this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor, 
            this.textarea.style.cssText = this.$composition.cssText, this.$composition = null;
        }, this.setTheme = function(e, t) {
            function s(r) {
                if (n.$themeValue != e) {
                    return t && t();
                }
                if (!r.cssClass) {
                    return;
                }
                if (i.importCssString(r.cssText, r.cssClass, n.container.ownerDocument), n.theme) {
                    i.removeCssClass(n.container, n.theme.cssClass);
                }
                n.$theme = r.cssClass, n.theme = r, i.addCssClass(n.container, r.cssClass), i.setCssClass(n.container, "ace_dark", r.isDark);
                var s = "padding" in r ? r.padding : 4;
                if (n.$padding && s != n.$padding) {
                    n.setPadding(s);
                }
                if (n.$size) {
                    n.$size.width = 0, n.onResize();
                }
                n._dispatchEvent("themeLoaded", {
                    theme: r
                }), t && t();
            }
            var n = this;
            if (this.$themeValue = e, n._dispatchEvent("themeChange", {
                theme: e
            }), !e || "string" == typeof e) {
                var r = e || "ace/theme/textmate";
                o.loadModule([ "theme", r ], s);
            } else {
                s(e);
            }
        }, this.getTheme = function() {
            return this.$themeValue;
        }, this.setStyle = function(e, t) {
            i.setCssClass(this.container, e, 0 != t);
        }, this.unsetStyle = function(e) {
            i.removeCssClass(this.container, e);
        }, this.setMouseCursor = function(e) {
            this.content.style.cursor = e;
        }, this.destroy = function() {
            this.$textLayer.destroy(), this.$cursorLayer.destroy();
        };
    }).call(m.prototype), o.defineOptions(m.prototype, "renderer", {
        animatedScroll: {
            initialValue: !1
        },
        showInvisibles: {
            set: function(e) {
                if (this.$textLayer.setShowInvisibles(e)) {
                    this.$loop.schedule(this.CHANGE_TEXT);
                }
            },
            initialValue: !1
        },
        showPrintMargin: {
            set: function() {
                this.$updatePrintMargin();
            },
            initialValue: !0
        },
        printMarginColumn: {
            set: function() {
                this.$updatePrintMargin();
            },
            initialValue: 80
        },
        printMargin: {
            set: function(e) {
                if ("number" == typeof e) {
                    this.$printMarginColumn = e;
                }
                this.$showPrintMargin = !!e, this.$updatePrintMargin();
            },
            get: function() {
                return this.$showPrintMargin && this.$printMarginColumn;
            }
        },
        showGutter: {
            set: function(e) {
                this.$gutter.style.display = e ? "block" : "none", this.onGutterResize();
            },
            initialValue: !0
        },
        fadeFoldWidgets: {
            set: function(e) {
                i.setCssClass(this.$gutter, "ace_fade-fold-widgets", e);
            },
            initialValue: !1
        },
        showFoldWidgets: {
            set: function(e) {
                this.$gutterLayer.setShowFoldWidgets(e);
            },
            initialValue: !0
        },
        displayIndentGuides: {
            set: function(e) {
                if (this.$textLayer.setDisplayIndentGuides(e)) {
                    this.$loop.schedule(this.CHANGE_TEXT);
                }
            },
            initialValue: !0
        },
        highlightGutterLine: {
            set: function(e) {
                if (!this.$gutterLineHighlight) {
                    return this.$gutterLineHighlight = i.createElement("div"), this.$gutterLineHighlight.className = "ace_gutter-active-line", 
                    void this.$gutter.appendChild(this.$gutterLineHighlight);
                }
                if (this.$gutterLineHighlight.style.display = e ? "" : "none", this.$cursorLayer.$pixelPos) {
                    this.$updateGutterLineHighlight();
                }
            },
            initialValue: !1,
            value: !0
        },
        hScrollBarAlwaysVisible: {
            set: function(e) {
                if (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) {
                    this.$loop.schedule(this.CHANGE_SCROLL);
                }
            },
            initialValue: !1
        },
        vScrollBarAlwaysVisible: {
            set: function(e) {
                if (!this.$vScrollBarAlwaysVisible || !this.$vScroll) {
                    this.$loop.schedule(this.CHANGE_SCROLL);
                }
            },
            initialValue: !1
        },
        fontSize: {
            set: function(e) {
                if ("number" == typeof e) {
                    e += "px";
                }
                this.container.style.fontSize = e, this.updateFontSize();
            },
            initialValue: 12
        },
        fontFamily: {
            set: function(e) {
                this.container.style.fontFamily = e, this.updateFontSize();
            }
        },
        maxLines: {
            set: function(e) {
                this.updateFull();
            }
        },
        minLines: {
            set: function(e) {
                this.updateFull();
            }
        },
        scrollPastEnd: {
            set: function(e) {
                if (e = +e || 0, this.$scrollPastEnd == e) {
                    return;
                }
                this.$scrollPastEnd = e, this.$loop.schedule(this.CHANGE_SCROLL);
            },
            initialValue: 0,
            handlesSet: !0
        },
        fixedWidthGutter: {
            set: function(e) {
                this.$gutterLayer.$fixedWidth = !!e, this.$loop.schedule(this.CHANGE_GUTTER);
            }
        }
    }), t.VirtualRenderer = m;
}), define("ace/layer/gutter", [ "require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter" ], function(e, t, n) {
    var r = e("../lib/dom");
    var i = e("../lib/oop");
    var s = e("../lib/lang");
    var o = e("../lib/event_emitter").EventEmitter;
    var u = function(e) {
        this.element = r.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", 
        e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, 
        this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), 
        this.$cells = [];
    };
    (function() {
        i.implement(this, o), this.setSession = function(e) {
            if (this.session) {
                this.session.removeEventListener("change", this.$updateAnnotations);
            }
            this.session = e, e.on("change", this.$updateAnnotations);
        }, this.addGutterDecoration = function(e, t) {
            if (window.console) {
                console.warn && console.warn("deprecated use session.addGutterDecoration");
            }
            this.session.addGutterDecoration(e, t);
        }, this.removeGutterDecoration = function(e, t) {
            if (window.console) {
                console.warn && console.warn("deprecated use session.removeGutterDecoration");
            }
            this.session.removeGutterDecoration(e, t);
        }, this.setAnnotations = function(e) {
            this.$annotations = [];
            var t, n;
            for (var r = 0; r < e.length; r++) {
                var i = e[r];
                var n = i.row;
                var t = this.$annotations[n];
                if (!t) {
                    t = this.$annotations[n] = {
                        text: []
                    };
                }
                var o = i.text;
                if (o = o ? s.escapeHTML(o) : i.html || "", -1 === t.text.indexOf(o)) {
                    t.text.push(o);
                }
                var u = i.type;
                if ("error" == u) {
                    t.className = " ace_error";
                } else {
                    if ("warning" == u && " ace_error" != t.className) {
                        t.className = " ace_warning";
                    } else {
                        if ("info" == u && !t.className) {
                            t.className = " ace_info";
                        }
                    }
                }
            }
        }, this.$updateAnnotations = function(e) {
            if (!this.$annotations.length) {
                return;
            }
            var t = e.data;
            var n = t.range;
            var r = n.start.row;
            var i = n.end.row - r;
            if (0 === i) {
                ;
            } else {
                if ("removeText" == t.action || "removeLines" == t.action) {
                    this.$annotations.splice(r, i + 1, null);
                } else {
                    var s = Array(i + 1);
                    s.unshift(r, 1), this.$annotations.splice.apply(this.$annotations, s);
                }
            }
        }, this.update = function(e) {
            var t = e.firstRow;
            var n = e.lastRow;
            var i = this.session.getNextFoldLine(t);
            var s = i ? i.start.row : 1/0;
            var o = this.$showFoldWidgets && this.session.foldWidgets;
            var u = this.session.$breakpoints;
            var a = this.session.$decorations;
            var f = this.session.$firstLineNumber;
            var l = 0;
            var c = null;
            var h = -1;
            var p = t;
            while (!0) {
                if (p > s) {
                    p = i.end.row + 1, i = this.session.getNextFoldLine(p, i), s = i ? i.start.row : 1/0;
                }
                if (p > n) {
                    while (this.$cells.length > h + 1) {
                        c = this.$cells.pop(), this.element.removeChild(c.element);
                    }
                    break;
                }
                if (c = this.$cells[++h], !c) {
                    c = {
                        element: null,
                        textNode: null,
                        foldWidget: null
                    }, c.element = r.createElement("div"), c.textNode = document.createTextNode(""), 
                    c.element.appendChild(c.textNode), this.element.appendChild(c.element), this.$cells[h] = c;
                }
                var d = "ace_gutter-cell ";
                if (u[p]) {
                    d += u[p];
                }
                if (a[p]) {
                    d += a[p];
                }
                if (this.$annotations[p]) {
                    d += this.$annotations[p].className;
                }
                if (c.element.className != d) {
                    c.element.className = d;
                }
                var v = this.session.getRowLength(p) * e.lineHeight + "px";
                if (v != c.element.style.height) {
                    c.element.style.height = v;
                }
                var m = l = p + f;
                if (m != c.textNode.data) {
                    c.textNode.data = m;
                }
                if (o) {
                    var g = o[p];
                    if (null == g) {
                        g = o[p] = this.session.getFoldWidget(p);
                    }
                }
                if (g) {
                    if (!c.foldWidget) {
                        c.foldWidget = r.createElement("span"), c.element.appendChild(c.foldWidget);
                    }
                    var d = "ace_fold-widget ace_" + g;
                    if ("start" == g && p == s && p < i.end.row) {
                        d += " ace_closed";
                    } else {
                        d += " ace_open";
                    }
                    if (c.foldWidget.className != d) {
                        c.foldWidget.className = d;
                    }
                    var v = e.lineHeight + "px";
                    if (c.foldWidget.style.height != v) {
                        c.foldWidget.style.height = v;
                    }
                } else {
                    if (null != c.foldWidget) {
                        c.element.removeChild(c.foldWidget), c.foldWidget = null;
                    }
                }
                p++;
            }
            if (this.element.style.height = e.minHeight + "px", this.$fixedWidth || this.session.$useWrapMode) {
                l = this.session.getLength();
            }
            var y = l.toString().length * e.characterWidth;
            var b = this.$padding || this.$computePadding();
            if (y += b.left + b.right, y !== this.gutterWidth && !isNaN(y)) {
                this.gutterWidth = y, this.element.style.width = Math.ceil(this.gutterWidth) + "px", 
                this._emit("changeGutterWidth", y);
            }
        }, this.$fixedWidth = !1, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function(e) {
            if (e) {
                r.addCssClass(this.element, "ace_folding-enabled");
            } else {
                r.removeCssClass(this.element, "ace_folding-enabled");
            }
            this.$showFoldWidgets = e, this.$padding = null;
        }, this.getShowFoldWidgets = function() {
            return this.$showFoldWidgets;
        }, this.$computePadding = function() {
            if (!this.element.firstChild) {
                return {
                    left: 0,
                    right: 0
                };
            }
            var e = r.computedStyle(this.element.firstChild);
            return this.$padding = {}, this.$padding.left = parseInt(e.paddingLeft) + 1 || 0, 
            this.$padding.right = parseInt(e.paddingRight) || 0, this.$padding;
        }, this.getRegion = function(e) {
            var t = this.$padding || this.$computePadding();
            var n = this.element.getBoundingClientRect();
            if (e.x < t.left + n.left) {
                return "markers";
            }
            if (this.$showFoldWidgets && e.x > n.right - t.right) {
                return "foldWidgets";
            }
        };
    }).call(u.prototype), t.Gutter = u;
}), define("ace/layer/marker", [ "require", "exports", "module", "ace/range", "ace/lib/dom" ], function(e, t, n) {
    var r = e("../range").Range;
    var i = e("../lib/dom");
    var s = function(e) {
        this.element = i.createElement("div"), this.element.className = "ace_layer ace_marker-layer", 
        e.appendChild(this.element);
    };
    (function() {
        this.$padding = 0, this.setPadding = function(e) {
            this.$padding = e;
        }, this.setSession = function(e) {
            this.session = e;
        }, this.setMarkers = function(e) {
            this.markers = e;
        }, this.update = function(e) {
            var e = e || this.config;
            if (!e) {
                return;
            }
            this.config = e;
            var t = [];
            for (var n in this.markers) {
                var r = this.markers[n];
                if (!r.range) {
                    r.update(t, this, this.session, e);
                    continue;
                }
                var s = r.range.clipRows(e.firstRow, e.lastRow);
                if (s.isEmpty()) {
                    continue;
                }
                if (s = s.toScreenRange(this.session), r.renderer) {
                    var o = this.$getTop(s.start.row, e);
                    var u = this.$padding + s.start.column * e.characterWidth;
                    r.renderer(t, s, u, o, e);
                } else {
                    if ("fullLine" == r.type) {
                        this.drawFullLineMarker(t, s, r.clazz, e);
                    } else {
                        if ("screenLine" == r.type) {
                            this.drawScreenLineMarker(t, s, r.clazz, e);
                        } else {
                            if (s.isMultiLine()) {
                                if ("text" == r.type) {
                                    this.drawTextMarker(t, s, r.clazz, e);
                                } else {
                                    this.drawMultiLineMarker(t, s, r.clazz, e);
                                }
                            } else {
                                this.drawSingleLineMarker(t, s, r.clazz + " ace_start", e);
                            }
                        }
                    }
                }
            }
            this.element = i.setInnerHtml(this.element, t.join(""));
        }, this.$getTop = function(e, t) {
            return (e - t.firstRowScreen) * t.lineHeight;
        }, this.drawTextMarker = function(e, t, n, i, s) {
            var o = t.start.row;
            var u = new r(o, t.start.column, o, this.session.getScreenLastRowColumn(o));
            for (this.drawSingleLineMarker(e, u, n + " ace_start", i, 1, s), o = t.end.row, 
            u = new r(o, 0, o, t.end.column), this.drawSingleLineMarker(e, u, n, i, 0, s), o = t.start.row + 1; o < t.end.row; o++) {
                u.start.row = o, u.end.row = o, u.end.column = this.session.getScreenLastRowColumn(o), 
                this.drawSingleLineMarker(e, u, n, i, 1, s);
            }
        }, this.drawMultiLineMarker = function(e, t, n, r, i) {
            var s = this.$padding;
            var o = r.lineHeight;
            var u = this.$getTop(t.start.row, r);
            var a = s + t.start.column * r.characterWidth;
            i = i || "", e.push("<div class='", n, " ace_start' style='", "height:", o, "px;", "right:0;", "top:", u, "px;", "left:", a, "px;", i, "'></div>"), 
            u = this.$getTop(t.end.row, r);
            var f = t.end.column * r.characterWidth;
            if (e.push("<div class='", n, "' style='", "height:", o, "px;", "width:", f, "px;", "top:", u, "px;", "left:", s, "px;", i, "'></div>"), 
            o = (t.end.row - t.start.row - 1) * r.lineHeight, 0 > o) {
                return;
            }
            u = this.$getTop(t.start.row + 1, r), e.push("<div class='", n, "' style='", "height:", o, "px;", "right:0;", "top:", u, "px;", "left:", s, "px;", i, "'></div>");
        }, this.drawSingleLineMarker = function(e, t, n, r, i, s) {
            var o = r.lineHeight;
            var u = (t.end.column + (i || 0) - t.start.column) * r.characterWidth;
            var a = this.$getTop(t.start.row, r);
            var f = this.$padding + t.start.column * r.characterWidth;
            e.push("<div class='", n, "' style='", "height:", o, "px;", "width:", u, "px;", "top:", a, "px;", "left:", f, "px;", s || "", "'></div>");
        }, this.drawFullLineMarker = function(e, t, n, r, i) {
            var s = this.$getTop(t.start.row, r);
            var o = r.lineHeight;
            if (t.start.row != t.end.row) {
                o += this.$getTop(t.end.row, r) - s;
            }
            e.push("<div class='", n, "' style='", "height:", o, "px;", "top:", s, "px;", "left:0;right:0;", i || "", "'></div>");
        }, this.drawScreenLineMarker = function(e, t, n, r, i) {
            var s = this.$getTop(t.start.row, r);
            var o = r.lineHeight;
            e.push("<div class='", n, "' style='", "height:", o, "px;", "top:", s, "px;", "left:0;right:0;", i || "", "'></div>");
        };
    }).call(s.prototype), t.Marker = s;
}), define("ace/layer/text", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter" ], function(e, t, n) {
    var r = e("../lib/oop");
    var i = e("../lib/dom");
    var s = e("../lib/lang");
    var o = e("../lib/useragent");
    var u = e("../lib/event_emitter").EventEmitter;
    var a = function(e) {
        this.element = i.createElement("div"), this.element.className = "ace_layer ace_text-layer", 
        e.appendChild(this.element), this.$characterSize = {
            width: 0,
            height: 0
        }, this.checkForSizeChanges(), this.$pollSizeChanges();
    };
    (function() {
        r.implement(this, u), this.EOF_CHAR = "¶", this.EOL_CHAR = "¬", this.TAB_CHAR = "→", 
        this.SPACE_CHAR = "·", this.$padding = 0, this.setPadding = function(e) {
            this.$padding = e, this.element.style.padding = "0 " + e + "px";
        }, this.getLineHeight = function() {
            return this.$characterSize.height || 0;
        }, this.getCharacterWidth = function() {
            return this.$characterSize.width || 0;
        }, this.checkForSizeChanges = function() {
            var e = this.$measureSizes();
            if (e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
                this.$measureNode.style.fontWeight = "bold";
                var t = this.$measureSizes();
                this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.allowBoldFonts = t && t.width === e.width && t.height === e.height, 
                this._emit("changeCharacterSize", {
                    data: e
                });
            }
        }, this.$pollSizeChanges = function() {
            var e = this;
            this.$pollSizeChangesTimer = setInterval(function() {
                e.checkForSizeChanges();
            }, 500);
        }, this.$fontStyles = {
            fontFamily: 1,
            fontSize: 1,
            fontWeight: 1,
            fontStyle: 1,
            lineHeight: 1
        }, this.$measureSizes = o.isIE || o.isOldGecko ? function() {
            var e = 1e3;
            if (!this.$measureNode) {
                var t = this.$measureNode = i.createElement("div");
                var n = t.style;
                if (n.width = n.height = "auto", n.left = n.top = 40 * -e + "px", n.visibility = "hidden", 
                n.position = "fixed", n.overflow = "visible", n.whiteSpace = "nowrap", t.innerHTML = s.stringRepeat("Xy", e), 
                this.element.ownerDocument.body) {
                    this.element.ownerDocument.body.appendChild(t);
                } else {
                    var r = this.element.parentNode;
                    while (!i.hasCssClass(r, "ace_editor")) {
                        r = r.parentNode;
                    }
                    r.appendChild(t);
                }
            }
            if (!this.element.offsetWidth) {
                return null;
            }
            var n = this.$measureNode.style;
            var o = i.computedStyle(this.element);
            for (var u in this.$fontStyles) {
                n[u] = o[u];
            }
            var a = {
                height: this.$measureNode.offsetHeight,
                width: this.$measureNode.offsetWidth / (2 * e)
            };
            if (0 == a.width || 0 == a.height) {
                return null;
            }
            return a;
        } : function() {
            if (!this.$measureNode) {
                var e = this.$measureNode = i.createElement("div");
                var t = e.style;
                t.width = t.height = "auto", t.left = t.top = "-100px", t.visibility = "hidden", 
                t.position = "fixed", t.overflow = "visible", t.whiteSpace = "nowrap", e.innerHTML = s.stringRepeat("X", 100);
                var n = this.element.parentNode;
                while (n && !i.hasCssClass(n, "ace_editor")) {
                    n = n.parentNode;
                }
                if (!n) {
                    return this.$measureNode = null;
                }
                n.appendChild(e);
            }
            var r = this.$measureNode.getBoundingClientRect();
            var o = {
                height: r.height,
                width: r.width / 100
            };
            if (0 == o.width || 0 == o.height) {
                return null;
            }
            return o;
        }, this.setSession = function(e) {
            this.session = e, this.$computeTabString();
        }, this.showInvisibles = !1, this.setShowInvisibles = function(e) {
            if (this.showInvisibles == e) {
                return !1;
            }
            return this.showInvisibles = e, this.$computeTabString(), !0;
        }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function(e) {
            if (this.displayIndentGuides == e) {
                return !1;
            }
            return this.displayIndentGuides = e, this.$computeTabString(), !0;
        }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function() {
            var e = this.session.getTabSize();
            this.tabSize = e;
            var t = this.$tabStrings = [ 0 ];
            for (var n = 1; e + 1 > n; n++) {
                if (this.showInvisibles) {
                    t.push("<span class='ace_invisible'>" + this.TAB_CHAR + s.stringRepeat(" ", n - 1) + "</span>");
                } else {
                    t.push(s.stringRepeat(" ", n));
                }
            }
            if (this.displayIndentGuides) {
                this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                var r = "ace_indent-guide";
                if (this.showInvisibles) {
                    r += " ace_invisible";
                    var i = s.stringRepeat(this.SPACE_CHAR, this.tabSize);
                    var o = this.TAB_CHAR + s.stringRepeat(" ", this.tabSize - 1);
                } else {
                    var i = s.stringRepeat(" ", this.tabSize);
                    var o = i;
                }
                this.$tabStrings[" "] = "<span class='" + r + "'>" + i + "</span>", this.$tabStrings["    "] = "<span class='" + r + "'>" + o + "</span>";
            }
        }, this.updateLines = function(e, t, n) {
            if (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) {
                this.scrollLines(e);
            }
            this.config = e;
            var r = Math.max(t, e.firstRow);
            var s = Math.min(n, e.lastRow);
            var o = this.element.childNodes;
            var u = 0;
            for (var a = e.firstRow; r > a; a++) {
                var f = this.session.getFoldLine(a);
                if (f) {
                    if (f.containsRow(r)) {
                        r = f.start.row;
                        break;
                    } else {
                        a = f.end.row;
                    }
                }
                u++;
            }
            var a = r;
            var f = this.session.getNextFoldLine(a);
            var l = f ? f.start.row : 1/0;
            while (!0) {
                if (a > l) {
                    a = f.end.row + 1, f = this.session.getNextFoldLine(a, f), l = f ? f.start.row : 1/0;
                }
                if (a > s) {
                    break;
                }
                var c = o[u++];
                if (c) {
                    var h = [];
                    this.$renderLine(h, a, !this.$useLineGroups(), a == l ? f : !1), i.setInnerHtml(c, h.join(""));
                }
                a++;
            }
        }, this.scrollLines = function(e) {
            var t = this.config;
            if (this.config = e, !t || t.lastRow < e.firstRow) {
                return this.update(e);
            }
            if (e.lastRow < t.firstRow) {
                return this.update(e);
            }
            var n = this.element;
            if (t.firstRow < e.firstRow) {
                for (var r = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); r > 0; r--) {
                    n.removeChild(n.firstChild);
                }
            }
            if (t.lastRow > e.lastRow) {
                for (var r = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); r > 0; r--) {
                    n.removeChild(n.lastChild);
                }
            }
            if (e.firstRow < t.firstRow) {
                var i = this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1);
                if (n.firstChild) {
                    n.insertBefore(i, n.firstChild);
                } else {
                    n.appendChild(i);
                }
            }
            if (e.lastRow > t.lastRow) {
                var i = this.$renderLinesFragment(e, t.lastRow + 1, e.lastRow);
                n.appendChild(i);
            }
        }, this.$renderLinesFragment = function(e, t, n) {
            var r = this.element.ownerDocument.createDocumentFragment();
            var s = t;
            var o = this.session.getNextFoldLine(s);
            var u = o ? o.start.row : 1/0;
            while (!0) {
                if (s > u) {
                    s = o.end.row + 1, o = this.session.getNextFoldLine(s, o), u = o ? o.start.row : 1/0;
                }
                if (s > n) {
                    break;
                }
                var a = i.createElement("div");
                var f = [];
                if (this.$renderLine(f, s, !1, s == u ? o : !1), a.innerHTML = f.join(""), this.$useLineGroups()) {
                    a.className = "ace_line_group", r.appendChild(a);
                } else {
                    var l = a.childNodes;
                    while (l.length) {
                        r.appendChild(l[0]);
                    }
                }
                s++;
            }
            return r;
        }, this.update = function(e) {
            this.config = e;
            var t = [];
            var n = e.firstRow, r = e.lastRow;
            var s = n;
            var o = this.session.getNextFoldLine(s);
            var u = o ? o.start.row : 1/0;
            while (!0) {
                if (s > u) {
                    s = o.end.row + 1, o = this.session.getNextFoldLine(s, o), u = o ? o.start.row : 1/0;
                }
                if (s > r) {
                    break;
                }
                if (this.$useLineGroups()) {
                    t.push("<div class='ace_line_group'>");
                }
                if (this.$renderLine(t, s, !1, s == u ? o : !1), this.$useLineGroups()) {
                    t.push("</div>");
                }
                s++;
            }
            this.element = i.setInnerHtml(this.element, t.join(""));
        }, this.$textToken = {
            text: !0,
            rparen: !0,
            lparen: !0
        }, this.$renderToken = function(e, t, n, r) {
            var i = this;
            var o = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g;
            var u = function(e, n, r, o, u) {
                if (n) {
                    return i.showInvisibles ? "<span class='ace_invisible'>" + s.stringRepeat(i.SPACE_CHAR, e.length) + "</span>" : s.stringRepeat(" ", e.length);
                } else {
                    if ("&" == e) {
                        return "&#38;";
                    } else {
                        if ("<" == e) {
                            return "&#60;";
                        } else {
                            if ("    " == e) {
                                var a = i.session.getScreenTabSize(t + o);
                                return t += a - 1, i.$tabStrings[a];
                            } else {
                                if ("　" == e) {
                                    var f = i.showInvisibles ? "ace_cjk ace_invisible" : "ace_cjk";
                                    var l = i.showInvisibles ? i.SPACE_CHAR : "";
                                    return t += 1, "<span class='" + f + "' style='width:" + 2 * i.config.characterWidth + "px'>" + l + "</span>";
                                } else {
                                    if (r) {
                                        return "<span class='ace_invisible ace_invalid'>" + i.SPACE_CHAR + "</span>";
                                    } else {
                                        return t += 1, "<span class='ace_cjk' style='width:" + 2 * i.config.characterWidth + "px'>" + e + "</span>";
                                    }
                                }
                            }
                        }
                    }
                }
            };
            var a = r.replace(o, u);
            if (!this.$textToken[n.type]) {
                var f = "ace_" + n.type.replace(/\./g, " ace_");
                var l = "";
                if ("fold" == n.type) {
                    l = " style='width:" + n.value.length * this.config.characterWidth + "px;' ";
                }
                e.push("<span class='", f, "'", l, ">", a, "</span>");
            } else {
                e.push(a);
            }
            return t + r.length;
        }, this.renderIndentGuide = function(e, t, n) {
            var r = t.search(this.$indentGuideRe);
            if (0 >= r || r >= n) {
                return t;
            }
            if (" " == t[0]) {
                return r -= r % this.tabSize, e.push(s.stringRepeat(this.$tabStrings[" "], r / this.tabSize)), 
                t.substr(r);
            } else {
                if ("    " == t[0]) {
                    return e.push(s.stringRepeat(this.$tabStrings[" "], r)), t.substr(r);
                }
            }
            return t;
        }, this.$renderWrappedLine = function(e, t, n, r) {
            var i = 0;
            var s = 0;
            var o = n[0];
            var u = 0;
            for (var a = 0; a < t.length; a++) {
                var f = t[a];
                var l = f.value;
                if (0 == a && this.displayIndentGuides) {
                    if (i = l.length, l = this.renderIndentGuide(e, l, o), !l) {
                        continue;
                    }
                    i -= l.length;
                }
                if (i + l.length < o) {
                    u = this.$renderToken(e, u, f, l), i += l.length;
                } else {
                    while (i + l.length >= o) {
                        if (u = this.$renderToken(e, u, f, l.substring(0, o - i)), l = l.substring(o - i), 
                        i = o, !r) {
                            e.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>");
                        }
                        s++, u = 0, o = n[s] || Number.MAX_VALUE;
                    }
                    if (0 != l.length) {
                        i += l.length, u = this.$renderToken(e, u, f, l);
                    }
                }
            }
        }, this.$renderSimpleLine = function(e, t) {
            var n = 0;
            var r = t[0];
            var i = r.value;
            if (this.displayIndentGuides) {
                i = this.renderIndentGuide(e, i);
            }
            if (i) {
                n = this.$renderToken(e, n, r, i);
            }
            for (var s = 1; s < t.length; s++) {
                r = t[s], i = r.value, n = this.$renderToken(e, n, r, i);
            }
        }, this.$renderLine = function(e, t, n, r) {
            if (!r && 0 != r) {
                r = this.session.getFoldLine(t);
            }
            if (r) {
                var i = this.$getFoldLineTokens(t, r);
            } else {
                var i = this.session.getTokens(t);
            }
            if (!n) {
                e.push("<div class='ace_line' style='height:", this.config.lineHeight, "px'>");
            }
            if (i.length) {
                var s = this.session.getRowSplitData(t);
                if (s && s.length) {
                    this.$renderWrappedLine(e, i, s, n);
                } else {
                    this.$renderSimpleLine(e, i);
                }
            }
            if (this.showInvisibles) {
                if (r) {
                    t = r.end.row;
                }
                e.push("<span class='ace_invisible'>", t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>");
            }
            if (!n) {
                e.push("</div>");
            }
        }, this.$getFoldLineTokens = function(e, t) {
            function i(e, t, n) {
                var i = 0, s = 0;
                while (s + e[i].value.length < t) {
                    if (s += e[i].value.length, i++, i == e.length) {
                        return;
                    }
                }
                if (s != t) {
                    var o = e[i].value.substring(t - s);
                    if (o.length > n - t) {
                        o = o.substring(0, n - t);
                    }
                    r.push({
                        type: e[i].type,
                        value: o
                    }), s = t + o.length, i += 1;
                }
                while (n > s && i < e.length) {
                    var o = e[i].value;
                    if (o.length + s > n) {
                        r.push({
                            type: e[i].type,
                            value: o.substring(0, n - s)
                        });
                    } else {
                        r.push(e[i]);
                    }
                    s += o.length, i += 1;
                }
            }
            var n = this.session;
            var r = [];
            var s = n.getTokens(e);
            return t.walk(function(e, t, o, u, a) {
                if (null != e) {
                    r.push({
                        type: "fold",
                        value: e
                    });
                } else {
                    if (a) {
                        s = n.getTokens(t);
                    }
                    if (s.length) {
                        i(s, u, o);
                    }
                }
            }, t.end.row, this.session.getLine(t.end.row).length), r;
        }, this.$useLineGroups = function() {
            return this.session.getUseWrapMode();
        }, this.destroy = function() {
            if (clearInterval(this.$pollSizeChangesTimer), this.$measureNode) {
                this.$measureNode.parentNode.removeChild(this.$measureNode);
            }
            delete this.$measureNode;
        };
    }).call(a.prototype), t.Text = a;
}), define("ace/layer/cursor", [ "require", "exports", "module", "ace/lib/dom" ], function(e, t, n) {
    var r = e("../lib/dom");
    var i = function(e) {
        this.element = r.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", 
        e.appendChild(this.element), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, 
        this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), r.addCssClass(this.element, "ace_hidden-cursors");
    };
    (function() {
        this.$padding = 0, this.setPadding = function(e) {
            this.$padding = e;
        }, this.setSession = function(e) {
            this.session = e;
        }, this.setBlinking = function(e) {
            if (e != this.isBlinking) {
                this.isBlinking = e, this.restartTimer();
            }
        }, this.setBlinkInterval = function(e) {
            if (e != this.blinkInterval) {
                this.blinkInterval = e, this.restartTimer();
            }
        }, this.setSmoothBlinking = function(e) {
            if (e != this.smoothBlinking) {
                if (this.smoothBlinking = e, e) {
                    r.addCssClass(this.element, "ace_smooth-blinking");
                } else {
                    r.removeCssClass(this.element, "ace_smooth-blinking");
                }
                this.restartTimer();
            }
        }, this.addCursor = function() {
            var e = r.createElement("div");
            return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), 
            e;
        }, this.removeCursor = function() {
            if (this.cursors.length > 1) {
                var e = this.cursors.pop();
                return e.parentNode.removeChild(e), e;
            }
        }, this.hideCursor = function() {
            this.isVisible = !1, r.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer();
        }, this.showCursor = function() {
            this.isVisible = !0, r.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer();
        }, this.restartTimer = function() {
            if (clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.smoothBlinking) {
                r.removeCssClass(this.element, "ace_smooth-blinking");
            }
            for (var e = this.cursors.length; e--; ) {
                this.cursors[e].style.opacity = "";
            }
            if (!this.isBlinking || !this.blinkInterval || !this.isVisible) {
                return;
            }
            if (this.smoothBlinking) {
                setTimeout(function() {
                    r.addCssClass(this.element, "ace_smooth-blinking");
                }.bind(this));
            }
            var t = function() {
                this.timeoutId = setTimeout(function() {
                    for (var e = this.cursors.length; e--; ) {
                        this.cursors[e].style.opacity = 0;
                    }
                }.bind(this), .6 * this.blinkInterval);
            }.bind(this);
            this.intervalId = setInterval(function() {
                for (var e = this.cursors.length; e--; ) {
                    this.cursors[e].style.opacity = "";
                }
                t();
            }.bind(this), this.blinkInterval), t();
        }, this.getPixelPosition = function(e, t) {
            if (!this.config || !this.session) {
                return {
                    left: 0,
                    top: 0
                };
            }
            if (!e) {
                e = this.session.selection.getCursor();
            }
            var n = this.session.documentToScreenPosition(e);
            var r = this.$padding + n.column * this.config.characterWidth;
            var i = (n.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
            return {
                left: r,
                top: i
            };
        }, this.update = function(e) {
            this.config = e;
            var t = this.session.$selectionMarkers;
            var n = 0, r = 0;
            if (void 0 === t || 0 === t.length) {
                t = [ {
                    cursor: null
                } ];
            }
            for (var n = 0, i = t.length; i > n; n++) {
                var s = this.getPixelPosition(t[n].cursor, !0);
                if ((s.top > e.height + e.offset || s.top < -e.offset) && n > 1) {
                    continue;
                }
                var o = (this.cursors[r++] || this.addCursor()).style;
                o.left = s.left + "px", o.top = s.top + "px", o.width = e.characterWidth + "px", 
                o.height = e.lineHeight + "px";
            }
            while (this.cursors.length > r) {
                this.removeCursor();
            }
            var u = this.session.getOverwrite();
            this.$setOverwrite(u), this.$pixelPos = s, this.restartTimer();
        }, this.$setOverwrite = function(e) {
            if (e != this.overwrite) {
                if (this.overwrite = e, e) {
                    r.addCssClass(this.element, "ace_overwrite-cursors");
                } else {
                    r.removeCssClass(this.element, "ace_overwrite-cursors");
                }
            }
        }, this.destroy = function() {
            clearInterval(this.intervalId), clearTimeout(this.timeoutId);
        };
    }).call(i.prototype), t.Cursor = i;
}), define("ace/scrollbar", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter" ], function(e, t, n) {
    var r = e("./lib/oop");
    var i = e("./lib/dom");
    var s = e("./lib/event");
    var o = e("./lib/event_emitter").EventEmitter;
    var u = function(e, t) {
        this.element = i.createElement("div"), this.element.className = "ace_scrollbar", 
        this.inner = i.createElement("div"), this.inner.className = "ace_scrollbar-inner", 
        this.element.appendChild(this.inner), e.appendChild(this.element), t.$scrollbarWidth = this.width = i.scrollbarWidth(e.ownerDocument), 
        t.$scrollbarWidth = this.width = i.scrollbarWidth(e.ownerDocument), this.fullWidth = this.width, 
        this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px", 
        this.setVisible(!1), this.element.style.overflowY = "scroll", s.addListener(this.element, "scroll", this.onScrollV.bind(this)), 
        s.addListener(this.element, "mousedown", s.preventDefault);
    };
    var a = function(e, t) {
        this.element = i.createElement("div"), this.element.className = "ace_scrollbar-h", 
        this.inner = i.createElement("div"), this.inner.className = "ace_scrollbar-inner", 
        this.element.appendChild(this.inner), e.appendChild(this.element), this.height = t.$scrollbarWidth, 
        this.fullHeight = this.height, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px", 
        this.setVisible(!1), this.element.style.overflowX = "scroll", s.addListener(this.element, "scroll", this.onScrollH.bind(this)), 
        s.addListener(this.element, "mousedown", s.preventDefault);
    };
    (function() {
        r.implement(this, o), this.setVisible = function(e) {
            if (e) {
                if (this.element.style.display = "", this.fullWidth) {
                    this.width = this.fullWidth;
                }
                if (this.fullHeight) {
                    this.height = this.fullHeight;
                }
            } else {
                this.element.style.display = "none", this.height = this.width = 0;
            }
        }, this.onScrollV = function() {
            if (!this.skipEvent) {
                this.scrollTop = this.element.scrollTop, this._emit("scroll", {
                    data: this.scrollTop
                });
            }
            this.skipEvent = !1;
        }, this.onScrollH = function() {
            if (!this.skipEvent) {
                this.scrollLeft = this.element.scrollLeft, this._emit("scroll", {
                    data: this.scrollLeft
                });
            }
            this.skipEvent = !1;
        }, this.getWidth = function() {
            return this.width;
        }, this.getHeight = function() {
            return this.height;
        }, this.setHeight = function(e) {
            this.element.style.height = e + "px";
        }, this.setWidth = function(e) {
            this.element.style.width = e + "px";
        }, this.setInnerHeight = function(e) {
            this.inner.style.height = e + "px";
        }, this.setInnerWidth = function(e) {
            this.inner.style.width = e + "px";
        }, this.setScrollTop = function(e) {
            if (this.scrollTop != e) {
                this.skipEvent = !0, this.scrollTop = this.element.scrollTop = e;
            }
        }, this.setScrollLeft = function(e) {
            if (this.scrollLeft != e) {
                this.skipEvent = !0, this.scrollLeft = this.element.scrollLeft = e;
            }
        };
    }).call(u.prototype), a.prototype = u.prototype, t.ScrollBar = u, t.ScrollBarV = u, 
    t.ScrollBarH = a;
}), define("ace/renderloop", [ "require", "exports", "module", "ace/lib/event" ], function(e, t, n) {
    var r = e("./lib/event");
    var i = function(e, t) {
        this.onRender = e, this.pending = !1, this.changes = 0, this.window = t || window;
    };
    (function() {
        this.schedule = function(e) {
            if (this.changes = this.changes | e, !this.pending) {
                this.pending = !0;
                var t = this;
                r.nextFrame(function() {
                    t.pending = !1;
                    var e;
                    while (e = t.changes) {
                        t.changes = 0, t.onRender(e);
                    }
                }, this.window);
            }
        };
    }).call(i.prototype), t.RenderLoop = i;
}), define("ace/multi_select", [ "require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config" ], function(e, t, n) {
    function h(e, t, n) {
        return c.$options.wrap = !0, c.$options.needle = t, c.$options.backwards = -1 == n, 
        c.find(e);
    }
    function v(e, t) {
        return e.row == t.row && e.column == t.column;
    }
    function m(e) {
        if (e.$multiselectOnSessionChange) {
            return;
        }
        e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), 
        e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), 
        e.$multiselectOnSessionChange = t.onSessionChange.bind(e), e.$multiselectOnSessionChange(e), 
        e.on("changeSession", e.$multiselectOnSessionChange), e.on("mousedown", o), e.commands.addCommands(f.defaultCommands), 
        g(e);
    }
    function g(e) {
        function r(t) {
            if (n) {
                e.renderer.setMouseCursor(""), n = !1;
            }
        }
        var t = e.textInput.getElement();
        var n = !1;
        u.addListener(t, "keydown", function(t) {
            if (18 == t.keyCode && !(t.ctrlKey || t.shiftKey || t.metaKey)) {
                if (!n) {
                    e.renderer.setMouseCursor("crosshair"), n = !0;
                }
            } else {
                if (n) {
                    r();
                }
            }
        }), u.addListener(t, "keyup", r), u.addListener(t, "blur", r);
    }
    var r = e("./range_list").RangeList;
    var i = e("./range").Range;
    var s = e("./selection").Selection;
    var o = e("./mouse/multi_select_handler").onMouseDown;
    var u = e("./lib/event");
    var a = e("./lib/lang");
    var f = e("./commands/multi_select_commands");
    t.commands = f.defaultCommands.concat(f.multiSelectCommands);
    var l = e("./search").Search;
    var c = new l();
    var p = e("./edit_session").EditSession;
    (function() {
        this.getSelectionMarkers = function() {
            return this.$selectionMarkers;
        };
    }).call(p.prototype), function() {
        this.ranges = null, this.rangeList = null, this.addRange = function(e, t) {
            if (!e) {
                return;
            }
            if (!this.inMultiSelectMode && 0 == this.rangeCount) {
                var n = this.toOrientedRange();
                if (this.rangeList.add(n), this.rangeList.add(e), 2 != this.rangeList.ranges.length) {
                    return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
                }
                this.rangeList.removeAll(), this.rangeList.add(n), this.$onAddRange(n);
            }
            if (!e.cursor) {
                e.cursor = e.end;
            }
            var r = this.rangeList.add(e);
            if (this.$onAddRange(e), r.length) {
                this.$onRemoveRange(r);
            }
            if (this.rangeCount > 1 && !this.inMultiSelectMode) {
                this._emit("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, 
                this.rangeList.attach(this.session);
            }
            return t || this.fromOrientedRange(e);
        }, this.toSingleRange = function(e) {
            e = e || this.ranges[0];
            var t = this.rangeList.removeAll();
            if (t.length) {
                this.$onRemoveRange(t);
            }
            e && this.fromOrientedRange(e);
        }, this.substractPoint = function(e) {
            var t = this.rangeList.substractPoint(e);
            if (t) {
                return this.$onRemoveRange(t), t[0];
            }
        }, this.mergeOverlappingRanges = function() {
            var e = this.rangeList.merge();
            if (e.length) {
                this.$onRemoveRange(e);
            } else {
                if (this.ranges[0]) {
                    this.fromOrientedRange(this.ranges[0]);
                }
            }
        }, this.$onAddRange = function(e) {
            this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._emit("addRange", {
                range: e
            });
        }, this.$onRemoveRange = function(e) {
            if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
                var t = this.rangeList.ranges.pop();
                e.push(t), this.rangeCount = 0;
            }
            for (var n = e.length; n--; ) {
                var r = this.ranges.indexOf(e[n]);
                this.ranges.splice(r, 1);
            }
            if (this._emit("removeRange", {
                ranges: e
            }), 0 == this.rangeCount && this.inMultiSelectMode) {
                this.inMultiSelectMode = !1, this._emit("singleSelect"), this.session.$undoSelect = !0, 
                this.rangeList.detach(this.session);
            }
            if (t = t || this.ranges[0], t && !t.isEqual(this.getRange())) {
                this.fromOrientedRange(t);
            }
        }, this.$initRangeList = function() {
            if (this.rangeList) {
                return;
            }
            this.rangeList = new r(), this.ranges = [], this.rangeCount = 0;
        }, this.getAllRanges = function() {
            return this.rangeCount ? this.rangeList.ranges.concat() : [ this.getRange() ];
        }, this.splitIntoLines = function() {
            if (this.rangeCount > 1) {
                var e = this.rangeList.ranges;
                var t = e[e.length - 1];
                var n = i.fromPoints(e[0].start, t.end);
                this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start);
            } else {
                var n = this.getRange();
                var r = this.isBackwards();
                var s = n.start.row;
                var o = n.end.row;
                if (s == o) {
                    if (r) {
                        var u = n.end, a = n.start;
                    } else {
                        var u = n.start, a = n.end;
                    }
                    return this.addRange(i.fromPoints(a, a)), void this.addRange(i.fromPoints(u, u));
                }
                var f = [];
                var l = this.getLineRange(s, !0);
                l.start.column = n.start.column, f.push(l);
                for (var c = s + 1; o > c; c++) {
                    f.push(this.getLineRange(c, !0));
                }
                l = this.getLineRange(o, !0), l.end.column = n.end.column, f.push(l), f.forEach(this.addRange, this);
            }
        }, this.toggleBlockSelection = function() {
            if (this.rangeCount > 1) {
                var e = this.rangeList.ranges;
                var t = e[e.length - 1];
                var n = i.fromPoints(e[0].start, t.end);
                this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start);
            } else {
                var r = this.session.documentToScreenPosition(this.selectionLead);
                var s = this.session.documentToScreenPosition(this.selectionAnchor);
                var o = this.rectangularRangeBlock(r, s);
                o.forEach(this.addRange, this);
            }
        }, this.rectangularRangeBlock = function(e, t, n) {
            var r = [];
            var s = e.column < t.column;
            if (s) {
                var o = e.column;
                var u = t.column;
            } else {
                var o = t.column;
                var u = e.column;
            }
            var a = e.row < t.row;
            if (a) {
                var f = e.row;
                var l = t.row;
            } else {
                var f = t.row;
                var l = e.row;
            }
            if (0 > o) {
                o = 0;
            }
            if (0 > f) {
                f = 0;
            }
            if (f == l) {
                n = !0;
            }
            for (var c = f; l >= c; c++) {
                var h = i.fromPoints(this.session.screenToDocumentPosition(c, o), this.session.screenToDocumentPosition(c, u));
                if (h.isEmpty()) {
                    if (p && v(h.end, p)) {
                        break;
                    }
                    var p = h.end;
                }
                h.cursor = s ? h.start : h.end, r.push(h);
            }
            if (a) {
                r.reverse();
            }
            if (!n) {
                var d = r.length - 1;
                while (r[d].isEmpty() && d > 0) {
                    d--;
                }
                if (d > 0) {
                    var m = 0;
                    while (r[m].isEmpty()) {
                        m++;
                    }
                }
                for (var g = d; g >= m; g--) {
                    if (r[g].isEmpty()) {
                        r.splice(g, 1);
                    }
                }
            }
            return r;
        };
    }.call(s.prototype);
    var d = e("./editor").Editor;
    (function() {
        this.updateSelectionMarkers = function() {
            this.renderer.updateCursor(), this.renderer.updateBackMarkers();
        }, this.addSelectionMarker = function(e) {
            if (!e.cursor) {
                e.cursor = e.end;
            }
            var t = this.getSelectionStyle();
            return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), 
            this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e;
        }, this.removeSelectionMarker = function(e) {
            if (!e.marker) {
                return;
            }
            this.session.removeMarker(e.marker);
            var t = this.session.$selectionMarkers.indexOf(e);
            if (-1 != t) {
                this.session.$selectionMarkers.splice(t, 1);
            }
            this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
        }, this.removeSelectionMarkers = function(e) {
            var t = this.session.$selectionMarkers;
            for (var n = e.length; n--; ) {
                var r = e[n];
                if (!r.marker) {
                    continue;
                }
                this.session.removeMarker(r.marker);
                var i = t.indexOf(r);
                if (-1 != i) {
                    t.splice(i, 1);
                }
            }
            this.session.selectionMarkerCount = t.length;
        }, this.$onAddRange = function(e) {
            this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
        }, this.$onRemoveRange = function(e) {
            this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
        }, this.$onMultiSelect = function(e) {
            if (this.inMultiSelectMode) {
                return;
            }
            this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(f.keyboardHandler), 
            this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), 
            this.renderer.updateBackMarkers();
        }, this.$onSingleSelect = function(e) {
            if (this.session.multiSelect.inVirtualMode) {
                return;
            }
            this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(f.keyboardHandler), 
            this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), 
            this.renderer.updateBackMarkers();
        }, this.$onMultiSelectExec = function(e) {
            var t = e.command;
            var n = e.editor;
            if (!n.multiSelect) {
                return;
            }
            if (!t.multiSelectAction) {
                var r = t.exec(n, e.args || {});
                n.multiSelect.addRange(n.multiSelect.toOrientedRange()), n.multiSelect.mergeOverlappingRanges();
            } else {
                if ("forEach" == t.multiSelectAction) {
                    r = n.forEachSelection(t, e.args);
                } else {
                    if ("forEachLine" == t.multiSelectAction) {
                        r = n.forEachSelection(t, e.args, !0);
                    } else {
                        if ("single" == t.multiSelectAction) {
                            n.exitMultiSelectMode(), r = t.exec(n, e.args || {});
                        } else {
                            r = t.multiSelectAction(n, e.args || {});
                        }
                    }
                }
            }
            return r;
        }, this.forEachSelection = function(e, t, n) {
            if (this.inVirtualSelectionMode) {
                return;
            }
            var r = this.session;
            var i = this.selection;
            var o = i.rangeList;
            var u;
            var a = i._eventRegistry;
            i._eventRegistry = {};
            var f = new s(r);
            this.inVirtualSelectionMode = !0;
            for (var l = o.ranges.length; l--; ) {
                if (n) {
                    while (l > 0 && o.ranges[l].start.row == o.ranges[l - 1].end.row) {
                        l--;
                    }
                }
                f.fromOrientedRange(o.ranges[l]), this.selection = r.selection = f;
                var c = e.exec(this, t || {});
                if (void 0 == !u) {
                    u = c;
                }
                f.toOrientedRange(o.ranges[l]);
            }
            f.detach(), this.selection = r.selection = i, this.inVirtualSelectionMode = !1, 
            i._eventRegistry = a, i.mergeOverlappingRanges();
            var h = this.renderer.$scrollAnimation;
            if (this.onCursorChange(), this.onSelectionChange(), h && h.from == h.to) {
                this.renderer.animateScrolling(h.from);
            }
            return u;
        }, this.exitMultiSelectMode = function() {
            if (!this.inMultiSelectMode || this.inVirtualSelectionMode) {
                return;
            }
            this.multiSelect.toSingleRange();
        }, this.getSelectedText = function() {
            var e = "";
            if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                var t = this.multiSelect.rangeList.ranges;
                var n = [];
                for (var r = 0; r < t.length; r++) {
                    n.push(this.session.getTextRange(t[r]));
                }
                var i = this.session.getDocument().getNewLineCharacter();
                if (e = n.join(i), e.length == (n.length - 1) * i.length) {
                    e = "";
                }
            } else {
                if (!this.selection.isEmpty()) {
                    e = this.session.getTextRange(this.getSelectionRange());
                }
            }
            return e;
        }, this.onPaste = function(e) {
            if (this.$readOnly) {
                return;
            }
            if (this._signal("paste", e), !this.inMultiSelectMode || this.inVirtualSelectionMode) {
                return this.insert(e);
            }
            var t = e.split(/\r\n|\r|\n/);
            var n = this.selection.rangeList.ranges;
            if (t.length > n.length || t.length < 2 || !t[1]) {
                return this.commands.exec("insertstring", this, e);
            }
            for (var r = n.length; r--; ) {
                var i = n[r];
                if (!i.isEmpty()) {
                    this.session.remove(i);
                }
                this.session.insert(i.start, t[r]);
            }
        }, this.findAll = function(e, t, n) {
            t = t || {}, t.needle = e || t.needle, this.$search.set(t);
            var r = this.$search.findAll(this.session);
            if (!r.length) {
                return 0;
            }
            this.$blockScrolling += 1;
            var i = this.multiSelect;
            if (!n) {
                i.toSingleRange(r[0]);
            }
            for (var s = r.length; s--; ) {
                i.addRange(r[s], !0);
            }
            return this.$blockScrolling -= 1, r.length;
        }, this.selectMoreLines = function(e, t) {
            var n = this.selection.toOrientedRange();
            var r = n.cursor == n.end;
            var s = this.session.documentToScreenPosition(n.cursor);
            if (this.selection.$desiredColumn) {
                s.column = this.selection.$desiredColumn;
            }
            var o = this.session.screenToDocumentPosition(s.row + e, s.column);
            if (!n.isEmpty()) {
                var u = this.session.documentToScreenPosition(r ? n.end : n.start);
                var a = this.session.screenToDocumentPosition(u.row + e, u.column);
            } else {
                var a = o;
            }
            if (r) {
                var f = i.fromPoints(o, a);
                f.cursor = f.start;
            } else {
                var f = i.fromPoints(a, o);
                f.cursor = f.end;
            }
            if (f.desiredColumn = s.column, !this.selection.inMultiSelectMode) {
                this.selection.addRange(n);
            } else {
                if (t) {
                    var l = n.cursor;
                }
            }
            if (this.selection.addRange(f), l) {
                this.selection.substractPoint(l);
            }
        }, this.transposeSelections = function(e) {
            var t = this.session;
            var n = t.multiSelect;
            var r = n.ranges;
            for (var i = r.length; i--; ) {
                var s = r[i];
                if (s.isEmpty()) {
                    var o = t.getWordRange(s.start.row, s.start.column);
                    s.start.row = o.start.row, s.start.column = o.start.column, s.end.row = o.end.row, 
                    s.end.column = o.end.column;
                }
            }
            n.mergeOverlappingRanges();
            var u = [];
            for (var i = r.length; i--; ) {
                var s = r[i];
                u.unshift(t.getTextRange(s));
            }
            if (0 > e) {
                u.unshift(u.pop());
            } else {
                u.push(u.shift());
            }
            for (var i = r.length; i--; ) {
                var s = r[i];
                var o = s.clone();
                t.replace(s, u[i]), s.start.row = o.start.row, s.start.column = o.start.column;
            }
        }, this.selectMore = function(e, t) {
            var n = this.session;
            var r = n.multiSelect;
            var i = r.toOrientedRange();
            if (i.isEmpty()) {
                var i = n.getWordRange(i.start.row, i.start.column);
                return i.cursor = -1 == e ? i.start : i.end, void this.multiSelect.addRange(i);
            }
            var s = n.getTextRange(i);
            var o = h(n, s, e);
            if (o) {
                o.cursor = -1 == e ? o.start : o.end, this.multiSelect.addRange(o);
            }
            if (t) {
                this.multiSelect.substractPoint(i.cursor);
            }
        }, this.alignCursors = function() {
            var e = this.session;
            var t = e.multiSelect;
            var n = t.ranges;
            if (!n.length) {
                var r = this.selection.getRange();
                var s = r.start.row, o = r.end.row;
                var u = this.session.doc.removeLines(s, o);
                u = this.$reAlignText(u), this.session.doc.insertLines(s, u), r.start.column = 0, 
                r.end.column = u[u.length - 1].length, this.selection.setRange(r);
            } else {
                var f = -1;
                var l = n.filter(function(e) {
                    if (e.cursor.row == f) {
                        return !0;
                    }
                    f = e.cursor.row;
                });
                t.$onRemoveRange(l);
                var c = 0;
                var h = 1/0;
                var p = n.map(function(t) {
                    var n = t.cursor;
                    var r = e.getLine(n.row);
                    var i = r.substr(n.column).search(/\S/g);
                    if (-1 == i) {
                        i = 0;
                    }
                    if (n.column > c) {
                        c = n.column;
                    }
                    if (h > i) {
                        h = i;
                    }
                    return i;
                });
                n.forEach(function(t, n) {
                    var r = t.cursor;
                    var s = c - r.column;
                    var o = p[n] - h;
                    if (s > o) {
                        e.insert(r, a.stringRepeat(" ", s - o));
                    } else {
                        e.remove(new i(r.row, r.column, r.row, r.column - s + o));
                    }
                    t.start.column = t.end.column = c, t.start.row = t.end.row = r.row, t.cursor = t.end;
                }), t.fromOrientedRange(n[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
            }
        }, this.$reAlignText = function(e) {
            function o(e) {
                return a.stringRepeat(" ", e);
            }
            function u(e) {
                return !e[2] ? e[0] : o(r) + e[2] + o(i - e[2].length + s) + e[4].replace(/^([=:])\s+/, "$1 ");
            }
            function f(e) {
                return !e[2] ? e[0] : o(r + i - e[2].length) + e[2] + o(s, " ") + e[4].replace(/^([=:])\s+/, "$1 ");
            }
            function l(e) {
                return !e[2] ? e[0] : o(r) + e[2] + o(s) + e[4].replace(/^([=:])\s+/, "$1 ");
            }
            var t = !0, n = !0;
            var r, i, s;
            return e.map(function(e) {
                var o = e.match(/(\s*)(.*?)(\s*)([=:].*)/);
                if (!o) {
                    return [ e ];
                }
                if (null == r) {
                    return r = o[1].length, i = o[2].length, s = o[3].length, o;
                }
                if (r + i + s != o[1].length + o[2].length + o[3].length) {
                    n = !1;
                }
                if (r != o[1].length) {
                    t = !1;
                }
                if (r > o[1].length) {
                    r = o[1].length;
                }
                if (i < o[2].length) {
                    i = o[2].length;
                }
                if (s > o[3].length) {
                    s = o[3].length;
                }
                return o;
            }).map(t ? n ? f : u : l);
        };
    }).call(d.prototype), t.onSessionChange = function(e) {
        var t = e.session;
        if (!t.multiSelect) {
            t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection;
        }
        this.multiSelect = t.multiSelect;
        var n = e.oldSession;
        if (n) {
            n.multiSelect.removeEventListener("addRange", this.$onAddRange), n.multiSelect.removeEventListener("removeRange", this.$onRemoveRange), 
            n.multiSelect.removeEventListener("multiSelect", this.$onMultiSelect), n.multiSelect.removeEventListener("singleSelect", this.$onSingleSelect);
        }
        if (t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), 
        t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), 
        this.inMultiSelectMode != t.selection.inMultiSelectMode) {
            if (t.selection.inMultiSelectMode) {
                this.$onMultiSelect();
            } else {
                this.$onSingleSelect();
            }
        }
    }, t.MultiSelect = m, e("./config").defineOptions(d.prototype, "editor", {
        enableMultiselect: {
            set: function(e) {
                if (m(this), e) {
                    this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", o);
                } else {
                    this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", o);
                }
            },
            value: !0
        }
    });
}), define("ace/mouse/multi_select_handler", [ "require", "exports", "module", "ace/lib/event" ], function(e, t, n) {
    function i(e, t) {
        return e.row == t.row && e.column == t.column;
    }
    function s(e) {
        var t = e.domEvent;
        var n = t.altKey;
        var s = t.shiftKey;
        var o = e.getAccelKey();
        var u = e.getButton();
        if (e.editor.inMultiSelectMode && 2 == u) {
            return void e.editor.textInput.onContextMenu(e.domEvent);
        }
        if (!o && !n) {
            if (0 == u && e.editor.inMultiSelectMode) {
                e.editor.exitMultiSelectMode();
            }
            return;
        }
        var a = e.editor;
        var f = a.selection;
        var l = a.inMultiSelectMode;
        var c = e.getDocumentPosition();
        var h = f.getCursor();
        var p = e.inSelection() || f.isEmpty() && i(c, h);
        var d = e.x, v = e.y;
        var m = function(e) {
            d = e.clientX, v = e.clientY;
        };
        var g = function() {
            var e = a.renderer.pixelToScreenCoordinates(d, v);
            var t = y.screenToDocumentPosition(e.row, e.column);
            if (i(w, e) && i(t, f.selectionLead)) {
                return;
            }
            w = e, a.selection.moveCursorToPosition(t), a.selection.clearSelection(), a.renderer.scrollCursorIntoView(), 
            a.removeSelectionMarkers(x), x = f.rectangularRangeBlock(w, b), x.forEach(a.addSelectionMarker, a), 
            a.updateSelectionMarkers();
        };
        var y = a.session;
        var b = a.renderer.pixelToScreenCoordinates(d, v);
        var w = b;
        if (o && !s && !n && 0 == u) {
            if (!l && p) {
                return;
            }
            if (!l) {
                var E = f.toOrientedRange();
                a.addSelectionMarker(E);
            }
            var S = f.rangeList.rangeAtPoint(c);
            a.once("mouseup", function() {
                var e = f.toOrientedRange();
                if (S && e.isEmpty() && i(S.cursor, e.cursor)) {
                    f.substractPoint(e.cursor);
                } else {
                    if (E) {
                        a.removeSelectionMarker(E), f.addRange(E);
                    }
                    f.addRange(e);
                }
            });
        } else {
            if (n && 0 == u) {
                if (e.stop(), l && !o) {
                    f.toSingleRange();
                } else {
                    if (!l && o) {
                        f.addRange();
                    }
                }
                var x = [];
                if (s) {
                    b = y.documentToScreenPosition(f.lead), g();
                } else {
                    f.moveCursorToPosition(c), f.clearSelection();
                }
                var T = function(e) {
                    clearInterval(C), a.removeSelectionMarkers(x);
                    for (var t = 0; t < x.length; t++) {
                        f.addRange(x[t]);
                    }
                };
                var N = g;
                r.capture(a.container, m, T);
                var C = setInterval(function() {
                    N();
                }, 20);
                return e.preventDefault();
            }
        }
    }
    var r = e("../lib/event");
    t.onMouseDown = s;
}), define("ace/commands/multi_select_commands", [ "require", "exports", "module", "ace/keyboard/hash_handler" ], function(e, t, n) {
    t.defaultCommands = [ {
        name: "addCursorAbove",
        exec: function(e) {
            e.selectMoreLines(-1);
        },
        bindKey: {
            win: "Ctrl-Alt-Up",
            mac: "Ctrl-Alt-Up"
        },
        readonly: !0
    }, {
        name: "addCursorBelow",
        exec: function(e) {
            e.selectMoreLines(1);
        },
        bindKey: {
            win: "Ctrl-Alt-Down",
            mac: "Ctrl-Alt-Down"
        },
        readonly: !0
    }, {
        name: "addCursorAboveSkipCurrent",
        exec: function(e) {
            e.selectMoreLines(-1, !0);
        },
        bindKey: {
            win: "Ctrl-Alt-Shift-Up",
            mac: "Ctrl-Alt-Shift-Up"
        },
        readonly: !0
    }, {
        name: "addCursorBelowSkipCurrent",
        exec: function(e) {
            e.selectMoreLines(1, !0);
        },
        bindKey: {
            win: "Ctrl-Alt-Shift-Down",
            mac: "Ctrl-Alt-Shift-Down"
        },
        readonly: !0
    }, {
        name: "selectMoreBefore",
        exec: function(e) {
            e.selectMore(-1);
        },
        bindKey: {
            win: "Ctrl-Alt-Left",
            mac: "Ctrl-Alt-Left"
        },
        readonly: !0
    }, {
        name: "selectMoreAfter",
        exec: function(e) {
            e.selectMore(1);
        },
        bindKey: {
            win: "Ctrl-Alt-Right",
            mac: "Ctrl-Alt-Right"
        },
        readonly: !0
    }, {
        name: "selectNextBefore",
        exec: function(e) {
            e.selectMore(-1, !0);
        },
        bindKey: {
            win: "Ctrl-Alt-Shift-Left",
            mac: "Ctrl-Alt-Shift-Left"
        },
        readonly: !0
    }, {
        name: "selectNextAfter",
        exec: function(e) {
            e.selectMore(1, !0);
        },
        bindKey: {
            win: "Ctrl-Alt-Shift-Right",
            mac: "Ctrl-Alt-Shift-Right"
        },
        readonly: !0
    }, {
        name: "splitIntoLines",
        exec: function(e) {
            e.multiSelect.splitIntoLines();
        },
        bindKey: {
            win: "Ctrl-Alt-L",
            mac: "Ctrl-Alt-L"
        },
        readonly: !0
    }, {
        name: "alignCursors",
        exec: function(e) {
            e.alignCursors();
        },
        bindKey: {
            win: "Ctrl-Alt-A",
            mac: "Ctrl-Alt-A"
        }
    } ], t.multiSelectCommands = [ {
        name: "singleSelection",
        bindKey: "esc",
        exec: function(e) {
            e.exitMultiSelectMode();
        },
        readonly: !0,
        isAvailable: function(e) {
            return e && e.inMultiSelectMode;
        }
    } ];
    var r = e("../keyboard/hash_handler").HashHandler;
    t.keyboardHandler = new r(t.multiSelectCommands);
}), define("ace/worker/worker_client", [ "require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/config" ], function(e, t, n) {
    var r = e("../lib/oop");
    var i = e("../lib/event_emitter").EventEmitter;
    var s = e("../config");
    var o = function(t, n, r) {
        if (this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), 
        this.onMessage = this.onMessage.bind(this), this.onError = this.onError.bind(this), 
        e.nameToUrl && !e.toUrl) {
            e.toUrl = e.nameToUrl;
        }
        var i;
        if (s.get("packaged") || !e.toUrl) {
            i = s.moduleUrl(n, "worker");
        } else {
            var o = this.$normalizePath;
            i = o(e.toUrl("ace/worker/worker.js", null, "_"));
            var u = {};
            t.forEach(function(t) {
                u[t] = o(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""));
            });
        }
        this.$worker = new Worker(i), this.$worker.postMessage({
            init: !0,
            tlns: u,
            module: n,
            classname: r
        }), this.callbackId = 1, this.callbacks = {}, this.$worker.onerror = this.onError, 
        this.$worker.onmessage = this.onMessage;
    };
    (function() {
        r.implement(this, i), this.onError = function(e) {
            throw window.console && console.log && console.log(e), e;
        }, this.onMessage = function(e) {
            var t = e.data;
            switch (t.type) {
              case "log":
                window.console && console.log && console.log.apply(console, t.data);
                break;

              case "event":
                this._emit(t.name, {
                    data: t.data
                });
                break;

              case "call":
                var n = this.callbacks[t.id];
                if (n) {
                    n(t.data), delete this.callbacks[t.id];
                }
            }
        }, this.$normalizePath = function(e) {
            if (!location.host) {
                return e;
            }
            return e = e.replace(/^[a-z]+:\/\/[^\/]+/, ""), e = location.protocol + "//" + location.host + ("/" == e.charAt(0) ? "" : location.pathname.replace(/\/[^\/]*$/, "")) + "/" + e.replace(/^[\/]+/, ""), 
            e;
        }, this.terminate = function() {
            this._emit("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, 
            this.$doc.removeEventListener("change", this.changeListener), this.$doc = null;
        }, this.send = function(e, t) {
            this.$worker.postMessage({
                command: e,
                args: t
            });
        }, this.call = function(e, t, n) {
            if (n) {
                var r = this.callbackId++;
                this.callbacks[r] = n, t.push(r);
            }
            this.send(e, t);
        }, this.emit = function(e, t) {
            try {
                this.$worker.postMessage({
                    event: e,
                    data: {
                        data: t.data
                    }
                });
            } catch (n) {}
        }, this.attachToDocument = function(e) {
            if (this.$doc) {
                this.terminate();
            }
            this.$doc = e, this.call("setValue", [ e.getValue() ]), e.on("change", this.changeListener);
        }, this.changeListener = function(e) {
            if (!this.deltaQueue) {
                this.deltaQueue = [ e.data ], setTimeout(this.$sendDeltaQueue, 1);
            } else {
                this.deltaQueue.push(e.data);
            }
        }, this.$sendDeltaQueue = function() {
            var e = this.deltaQueue;
            if (!e) {
                return;
            }
            if (this.deltaQueue = null, e.length > 20 && e.length > this.$doc.getLength() >> 1) {
                this.call("setValue", [ this.$doc.getValue() ]);
            } else {
                this.emit("change", {
                    data: e
                });
            }
        };
    }).call(o.prototype);
    var u = function(e, t, n) {
        this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), 
        this.callbackId = 1, this.callbacks = {}, this.messageBuffer = [];
        var r = null;
        var o = Object.create(i);
        var u = this;
        this.$worker = {}, this.$worker.terminate = function() {}, this.$worker.postMessage = function(e) {
            u.messageBuffer.push(e), r && setTimeout(a);
        };
        var a = function() {
            var e = u.messageBuffer.shift();
            if (e.command) {
                r[e.command].apply(r, e.args);
            } else {
                if (e.event) {
                    o._emit(e.event, e.data);
                }
            }
        };
        o.postMessage = function(e) {
            u.onMessage({
                data: e
            });
        }, o.callback = function(e, t) {
            this.postMessage({
                type: "call",
                id: t,
                data: e
            });
        }, o.emit = function(e, t) {
            this.postMessage({
                type: "event",
                name: e,
                data: t
            });
        }, s.loadModule([ "worker", t ], function(e) {
            r = new e[n](o);
            while (u.messageBuffer.length) {
                a();
            }
        });
    };
    u.prototype = o.prototype, t.UIWorkerClient = u, t.WorkerClient = o;
}), define("ace/placeholder", [ "require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop" ], function(e, t, n) {
    var r = e("./range").Range;
    var i = e("./lib/event_emitter").EventEmitter;
    var s = e("./lib/oop");
    var o = function(e, t, n, r, i, s) {
        var o = this;
        this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = i, 
        this.othersClass = s, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), 
        this.$others = r, this.$onCursorChange = function() {
            setTimeout(function() {
                o.onCursorChange();
            });
        }, this.$pos = n;
        var u = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || {
            length: -1
        };
        this.$undoStackDepth = u.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange);
    };
    (function() {
        s.implement(this, i), this.setup = function() {
            var e = this;
            var t = this.doc;
            var n = this.session;
            var i = this.$pos;
            this.pos = t.createAnchor(i.row, i.column), this.markerId = n.addMarker(new r(i.row, i.column, i.row, i.column + this.length), this.mainClass, null, !1), 
            this.pos.on("change", function(t) {
                n.removeMarker(e.markerId), e.markerId = n.addMarker(new r(t.value.row, t.value.column, t.value.row, t.value.column + e.length), e.mainClass, null, !1);
            }), this.others = [], this.$others.forEach(function(n) {
                var r = t.createAnchor(n.row, n.column);
                e.others.push(r);
            }), n.setUndoSelect(!1);
        }, this.showOtherMarkers = function() {
            if (this.othersActive) {
                return;
            }
            var e = this.session;
            var t = this;
            this.othersActive = !0, this.others.forEach(function(n) {
                n.markerId = e.addMarker(new r(n.row, n.column, n.row, n.column + t.length), t.othersClass, null, !1), 
                n.on("change", function(i) {
                    e.removeMarker(n.markerId), n.markerId = e.addMarker(new r(i.value.row, i.value.column, i.value.row, i.value.column + t.length), t.othersClass, null, !1);
                });
            });
        }, this.hideOtherMarkers = function() {
            if (!this.othersActive) {
                return;
            }
            this.othersActive = !1;
            for (var e = 0; e < this.others.length; e++) {
                this.session.removeMarker(this.others[e].markerId);
            }
        }, this.onUpdate = function(e) {
            var t = e.data;
            var n = t.range;
            if (n.start.row !== n.end.row) {
                return;
            }
            if (n.start.row !== this.pos.row) {
                return;
            }
            if (this.$updating) {
                return;
            }
            this.$updating = !0;
            var i = "insertText" === t.action ? n.end.column - n.start.column : n.start.column - n.end.column;
            if (n.start.column >= this.pos.column && n.start.column <= this.pos.column + this.length + 1) {
                var s = n.start.column - this.pos.column;
                if (this.length += i, !this.session.$fromUndo) {
                    if ("insertText" === t.action) {
                        for (var o = this.others.length - 1; o >= 0; o--) {
                            var u = this.others[o];
                            var a = {
                                row: u.row,
                                column: u.column + s
                            };
                            if (u.row === n.start.row && n.start.column < u.column) {
                                a.column += i;
                            }
                            this.doc.insert(a, t.text);
                        }
                    } else {
                        if ("removeText" === t.action) {
                            for (var o = this.others.length - 1; o >= 0; o--) {
                                var u = this.others[o];
                                var a = {
                                    row: u.row,
                                    column: u.column + s
                                };
                                if (u.row === n.start.row && n.start.column < u.column) {
                                    a.column += i;
                                }
                                this.doc.remove(new r(a.row, a.column, a.row, a.column - i));
                            }
                        }
                    }
                    if (n.start.column === this.pos.column && "insertText" === t.action) {
                        setTimeout(function() {
                            this.pos.setPosition(this.pos.row, this.pos.column - i);
                            for (var e = 0; e < this.others.length; e++) {
                                var t = this.others[e];
                                var r = {
                                    row: t.row,
                                    column: t.column - i
                                };
                                if (t.row === n.start.row && n.start.column < t.column) {
                                    r.column += i;
                                }
                                t.setPosition(r.row, r.column);
                            }
                        }.bind(this), 0);
                    } else {
                        if (n.start.column === this.pos.column && "removeText" === t.action) {
                            setTimeout(function() {
                                for (var e = 0; e < this.others.length; e++) {
                                    var t = this.others[e];
                                    if (t.row === n.start.row && n.start.column < t.column) {
                                        t.setPosition(t.row, t.column - i);
                                    }
                                }
                            }.bind(this), 0);
                        }
                    }
                }
                this.pos._emit("change", {
                    value: this.pos
                });
                for (var o = 0; o < this.others.length; o++) {
                    this.others[o]._emit("change", {
                        value: this.others[o]
                    });
                }
            }
            this.$updating = !1;
        }, this.onCursorChange = function(e) {
            if (this.$updating) {
                return;
            }
            var t = this.session.selection.getCursor();
            if (t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length) {
                this.showOtherMarkers(), this._emit("cursorEnter", e);
            } else {
                this.hideOtherMarkers(), this._emit("cursorLeave", e);
            }
        }, this.detach = function() {
            this.session.removeMarker(this.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), 
            this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), 
            this.pos.detach();
            for (var e = 0; e < this.others.length; e++) {
                this.others[e].detach();
            }
            this.session.setUndoSelect(!0);
        }, this.cancel = function() {
            if (-1 === this.$undoStackDepth) {
                throw Error("Canceling placeholders only supported with undo manager attached to session.");
            }
            var e = this.session.getUndoManager();
            var t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth;
            for (var n = 0; t > n; n++) {
                e.undo(!0);
            }
        };
    }).call(o.prototype), t.PlaceHolder = o;
}), define("ace/mode/folding/fold_mode", [ "require", "exports", "module", "ace/range" ], function(e, t, n) {
    var r = e("../../range").Range;
    var i = t.FoldMode = function() {};
    (function() {
        this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function(e, t, n) {
            var r = e.getLine(n);
            if (this.foldingStartMarker.test(r)) {
                return "start";
            }
            if ("markbeginend" == t && this.foldingStopMarker && this.foldingStopMarker.test(r)) {
                return "end";
            }
            return "";
        }, this.getFoldWidgetRange = function(e, t, n) {
            return null;
        }, this.indentationBlock = function(e, t, n) {
            var i = /\S/;
            var s = e.getLine(t);
            var o = s.search(i);
            if (-1 == o) {
                return;
            }
            var u = n || s.length;
            var a = e.getLength();
            var f = t;
            var l = t;
            while (++t < a) {
                var c = e.getLine(t).search(i);
                if (-1 == c) {
                    continue;
                }
                if (o >= c) {
                    break;
                }
                l = t;
            }
            if (l > f) {
                var h = e.getLine(l).length;
                return new r(f, u, l, h);
            }
        }, this.openingBracketBlock = function(e, t, n, i, s) {
            var o = {
                row: n,
                column: i + 1
            };
            var u = e.$findClosingBracket(t, o, s);
            if (!u) {
                return;
            }
            var a = e.foldWidgets[u.row];
            if (null == a) {
                a = this.getFoldWidget(e, u.row);
            }
            if ("start" == a && u.row > o.row) {
                u.row--, u.column = e.getLine(u.row).length;
            }
            return r.fromPoints(o, u);
        }, this.closingBracketBlock = function(e, t, n, i, s) {
            var o = {
                row: n,
                column: i
            };
            var u = e.$findOpeningBracket(t, o);
            if (!u) {
                return;
            }
            return u.column++, o.column--, r.fromPoints(u, o);
        };
    }).call(i.prototype);
}), define("ace/theme/textmate", [ "require", "exports", "module", "ace/lib/dom" ], function(e, t, n) {
    t.isDark = !1, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;border-radius: 2px;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}';
    var r = e("../lib/dom");
    r.importCssString(t.cssText, t.cssClass);
}), function() {
    window.require([ "ace/ace" ], function(e) {
        if (e && e.config.init(), !window.ace) {
            window.ace = {};
        }
        for (var t in e) {
            if (e.hasOwnProperty(t)) {
                ace[t] = e[t];
            }
        }
    });
}(), window.aceScriptLoaded) {
    window.aceScriptLoaded();
}