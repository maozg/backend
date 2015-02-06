(function(a, b) {
    function c(a) {
        var b = bo[a] = {};
        return $.each(a.split(bb), function(a, c) {
            b[c] = !0
        }), b
    }
    function d(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(bq, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : bp.test(d) ? $.parseJSON(d) : d
                } catch (f) {
                }
                $.data(a, c, d)
            } else
                d = b
        }
        return d
    }
    function e(a) {
        var b;
        for (b in a) {
            if (b === "data" && $.isEmptyObject(a[b]))
                continue;
            if (b !== "toJSON")
                return !1
        }
        return !0
    }
    function f() {
        return !1
    }
    function g() {
        return !0
    }
    function h(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }
    function i(a, b) {
        do
            a = a[b];
        while (a && a.nodeType !== 1);
        return a
    }
    function j(a, b, c) {
        b = b || 0;
        if ($.isFunction(b))
            return $.grep(a, function(a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            });
        if (b.nodeType)
            return $.grep(a, function(a, d) {
                return a === b === c
            });
        if (typeof b == "string") {
            var d = $.grep(a, function(a) {
                return a.nodeType === 1
            });
            if (bK.test(b))
                return $.filter(b, d, !c);
            b = $.filter(b, d)
        }
        return $.grep(a, function(a, d) {
            return $.inArray(a, b) >= 0 === c
        })
    }
    function k(a) {
        var b = bN.split("|"), c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length)
                c.createElement(b.pop());
        return c
    }
    function l(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
    }
    function m(a, b) {
        if (b.nodeType !== 1 || !$.hasData(a))
            return;
        var c, d, e, f = $._data(a), g = $._data(b, f), h = f.events;
        if (h) {
            delete g.handle, g.events = {};
            for (c in h)
                for (d = 0, e = h[c].length; d < e; d++)
                    $.event.add(b, c, h[c][d])
        }
        g.data && (g.data = $.extend({}, g.data))
    }
    function n(a, b) {
        var c;
        if (b.nodeType !== 1)
            return;
        b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML), $.support.html5Clone && a.innerHTML && !$.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && bX.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text), b.removeAttribute($.expando)
    }
    function o(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }
    function p(a) {
        bX.test(a.type) && (a.defaultChecked = a.checked)
    }
    function q(a, b) {
        if (b in a)
            return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = cq.length;
        while (e--) {
            b = cq[e] + c;
            if (b in a)
                return b
        }
        return d
    }
    function r(a, b) {
        return a = b || a, $.css(a, "display") === "none" || !$.contains(a.ownerDocument, a)
    }
    function s(a, b) {
        var c, d, e = [], f = 0, g = a.length;
        for (; f < g; f++) {
            c = a[f];
            if (!c.style)
                continue;
            e[f] = $._data(c, "olddisplay"), b ? (!e[f] && c.style.display === "none" && (c.style.display = ""), c.style.display === "" && r(c) && (e[f] = $._data(c, "olddisplay", w(c.nodeName)))) : (d = cc(c, "display"), !e[f] && d !== "none" && $._data(c, "olddisplay", d))
        }
        for (f = 0; f < g; f++) {
            c = a[f];
            if (!c.style)
                continue;
            if (!b || c.style.display === "none" || c.style.display === "")
                c.style.display = b ? e[f] || "" : "none"
        }
        return a
    }
    function t(a, b, c) {
        var d = cj.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function u(a, b, c, d) {
        var e = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0, f = 0;
        for (; e < 4; e += 2)
            c === "margin" && (f += $.css(a, c + cp[e], !0)), d ? (c === "content" && (f -= parseFloat(cc(a, "padding" + cp[e])) || 0), c !== "margin" && (f -= parseFloat(cc(a, "border" + cp[e] + "Width")) || 0)) : (f += parseFloat(cc(a, "padding" + cp[e])) || 0, c !== "padding" && (f += parseFloat(cc(a, "border" + cp[e] + "Width")) || 0));
        return f
    }
    function v(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = !0, f = $.support.boxSizing && $.css(a, "boxSizing") === "border-box";
        if (d <= 0) {
            d = cc(a, b);
            if (d < 0 || d == null)
                d = a.style[b];
            if (ck.test(d))
                return d;
            e = f && ($.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0
        }
        return d + u(a, b, c || (f ? "border" : "content"), e) + "px"
    }
    function w(a) {
        if (cm[a])
            return cm[a];
        var b = $("<" + a + ">").appendTo(P.body), c = b.css("display");
        b.remove();
        if (c === "none" || c === "") {
            cd = P.body.appendChild(cd || $.extend(P.createElement("iframe"), {frameBorder: 0,width: 0,height: 0}));
            if (!ce || !cd.createElement)
                ce = (cd.contentWindow || cd.contentDocument).document, ce.write("<!doctype html><html><body>"), ce.close();
            b = ce.body.appendChild(ce.createElement(a)), c = cc(b, "display"), P.body.removeChild(cd)
        }
        return cm[a] = c, c
    }
    function x(a, b, c, d) {
        var e;
        if ($.isArray(b))
            $.each(b, function(b, e) {
                c || ct.test(a) ? d(a, e) : x(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
            });
        else if (!c && $.type(b) === "object")
            for (e in b)
                x(a + "[" + e + "]", b[e], c, d);
        else
            d(a, b)
    }
    function y(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            var d, e, f, g = b.toLowerCase().split(bb), h = 0, i = g.length;
            if ($.isFunction(c))
                for (; h < i; h++)
                    d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c)
        }
    }
    function z(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === cJ;
        for (; j < k && (l || !h); j++)
            h = i[j](c, d, e), typeof h == "string" && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = z(a, c, d, e, h, g)));
        return (l || !h) && !g["*"] && (h = z(a, c, d, e, "*", g)), h
    }
    function A(a, c) {
        var d, e, f = $.ajaxSettings.flatOptions || {};
        for (d in c)
            c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        e && $.extend(!0, a, e)
    }
    function B(a, c, d) {
        var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
        for (f in k)
            f in d && (c[k[f]] = d[f]);
        while (j[0] === "*")
            j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
        if (e)
            for (f in i)
                if (i[f] && i[f].test(e)) {
                    j.unshift(f);
                    break
                }
        if (j[0] in d)
            g = j[0];
        else {
            for (f in d) {
                if (!j[0] || a.converters[f + " " + j[0]]) {
                    g = f;
                    break
                }
                h || (h = f)
            }
            g = g || h
        }
        if (g)
            return g !== j[0] && j.unshift(g), d[g]
    }
    function C(a, b) {
        var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0;
        a.dataFilter && (b = a.dataFilter(b, a.dataType));
        if (g[1])
            for (c in a.converters)
                i[c.toLowerCase()] = a.converters[c];
        for (; e = g[++j]; )
            if (e !== "*") {
                if (h !== "*" && h !== e) {
                    c = i[h + " " + e] || i["* " + e];
                    if (!c)
                        for (d in i) {
                            f = d.split(" ");
                            if (f[1] === e) {
                                c = i[h + " " + f[0]] || i["* " + f[0]];
                                if (c) {
                                    c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
                                    break
                                }
                            }
                        }
                    if (c !== !0)
                        if (c && a["throws"])
                            b = c(b);
                        else
                            try {
                                b = c(b)
                            } catch (k) {
                                return {state: "parsererror",error: c ? k : "No conversion from " + h + " to " + e}
                            }
                }
                h = e
            }
        return {state: "success",data: b}
    }
    function D() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }
    function E() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }
    function F() {
        return setTimeout(function() {
            cU = b
        }, 0), cU = $.now()
    }
    function G(a, b) {
        $.each(b, function(b, c) {
            var d = (c$[b] || []).concat(c$["*"]), e = 0, f = d.length;
            for (; e < f; e++)
                if (d[e].call(a, b, c))
                    return
        })
    }
    function H(a, b, c) {
        var d, e = 0, f = 0, g = cZ.length, h = $.Deferred().always(function() {
            delete i.elem
        }), i = function() {
            var b = cU || F(), c = Math.max(0, j.startTime + j.duration - b), d = 1 - (c / j.duration || 0), e = 0, f = j.tweens.length;
            for (; e < f; e++)
                j.tweens[e].run(d);
            return h.notifyWith(a, [j, d, c]), d < 1 && f ? c : (h.resolveWith(a, [j]), !1)
        }, j = h.promise({elem: a,props: $.extend({}, b),opts: $.extend(!0, {specialEasing: {}}, c),originalProperties: b,originalOptions: c,startTime: cU || F(),duration: c.duration,tweens: [],createTween: function(b, c, d) {
                var e = $.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(e), e
            },stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                for (; c < d; c++)
                    j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
            }}), k = j.props;
        I(k, j.opts.specialEasing);
        for (; e < g; e++) {
            d = cZ[e].call(j, a, k, j.opts);
            if (d)
                return d
        }
        return G(j, k), $.isFunction(j.opts.start) && j.opts.start.call(a, j), $.fx.timer($.extend(i, {anim: j,queue: j.opts.queue,elem: a})), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    function I(a, b) {
        var c, d, e, f, g;
        for (c in a) {
            d = $.camelCase(c), e = b[d], f = a[c], $.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = $.cssHooks[d];
            if (g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f)
                    c in a || (a[c] = f[c], b[c] = e)
            } else
                b[d] = e
        }
    }
    function J(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = a.style, n = {}, o = [], p = a.nodeType && r(a);
        c.queue || (j = $._queueHooks(a, "fx"), j.unqueued == null && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function() {
            j.unqueued || k()
        }), j.unqueued++, l.always(function() {
            l.always(function() {
                j.unqueued--, $.queue(a, "fx").length || j.empty.fire()
            })
        })), a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], $.css(a, "display") === "inline" && $.css(a, "float") === "none" && (!$.support.inlineBlockNeedsLayout || w(a.nodeName) === "inline" ? m.display = "inline-block" : m.zoom = 1)), c.overflow && (m.overflow = "hidden", $.support.shrinkWrapBlocks || l.done(function() {
            m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2]
        }));
        for (d in b) {
            f = b[d];
            if (cW.exec(f)) {
                delete b[d];
                if (f === (p ? "hide" : "show"))
                    continue;
                o.push(d)
            }
        }
        g = o.length;
        if (g) {
            h = $._data(a, "fxshow") || $._data(a, "fxshow", {}), p ? $(a).show() : l.done(function() {
                $(a).hide()
            }), l.done(function() {
                var b;
                $.removeData(a, "fxshow", !0);
                for (b in n)
                    $.style(a, b, n[b])
            });
            for (d = 0; d < g; d++)
                e = o[d], i = l.createTween(e, p ? h[e] : 0), n[e] = h[e] || $.style(a, e), e in h || (h[e] = i.start, p && (i.end = i.start, i.start = e === "width" || e === "height" ? 1 : 0))
        }
    }
    function K(a, b, c, d, e) {
        return new K.prototype.init(a, b, c, d, e)
    }
    function L(a, b) {
        var c, d = {height: a}, e = 0;
        for (; e < 4; e += 2 - b)
            c = cp[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }
    function M(a) {
        return $.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }
    var N, O, P = a.document, Q = a.location, R = a.navigator, S = a.jQuery, T = a.$, U = Array.prototype.push, V = Array.prototype.slice, W = Array.prototype.indexOf, X = Object.prototype.toString, Y = Object.prototype.hasOwnProperty, Z = String.prototype.trim, $ = function(a, b) {
        return new $.fn.init(a, b, N)
    }, _ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, ba = /\S/, bb = /\s+/, bc = ba.test("Â ") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g, bd = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, be = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, bf = /^[\],:{}\s]*$/, bg = /(?:^|:|,)(?:\s*\[)+/g, bh = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, bi = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, bj = /^-ms-/, bk = /-([\da-z])/gi, bl = function(a, b) {
        return (b + "").toUpperCase()
    }, bm = function() {
        P.addEventListener ? (P.removeEventListener("DOMContentLoaded", bm, !1), $.ready()) : P.readyState === "complete" && (P.detachEvent("onreadystatechange", bm), $.ready())
    }, bn = {};
    $.fn = $.prototype = {constructor: $,init: function(a, c, d) {
            var e, f, g, h;
            if (!a)
                return this;
            if (a.nodeType)
                return this.context = this[0] = a, this.length = 1, this;
            if (typeof a == "string") {
                a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? e = [null, a, null] : e = bd.exec(a);
                if (e && (e[1] || !c)) {
                    if (e[1])
                        return c = c instanceof $ ? c[0] : c, h = c && c.nodeType ? c.ownerDocument || c : P, a = $.parseHTML(e[1], h, !0), be.test(e[1]) && $.isPlainObject(c) && this.attr.call(a, c, !0), $.merge(this, a);
                    f = P.getElementById(e[2]);
                    if (f && f.parentNode) {
                        if (f.id !== e[2])
                            return d.find(a);
                        this.length = 1, this[0] = f
                    }
                    return this.context = P, this.selector = a, this
                }
                return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
            }
            return $.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), $.makeArray(a, this))
        },selector: "",jquery: "1.8.0",length: 0,size: function() {
            return this.length
        },toArray: function() {
            return V.call(this)
        },get: function(a) {
            return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
        },pushStack: function(a, b, c) {
            var d = $.merge(this.constructor(), a);
            return d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
        },each: function(a, b) {
            return $.each(this, a, b)
        },ready: function(a) {
            return $.ready.promise().done(a), this
        },eq: function(a) {
            return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1)
        },first: function() {
            return this.eq(0)
        },last: function() {
            return this.eq(-1)
        },slice: function() {
            return this.pushStack(V.apply(this, arguments), "slice", V.call(arguments).join(","))
        },map: function(a) {
            return this.pushStack($.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },end: function() {
            return this.prevObject || this.constructor(null)
        },push: U,sort: [].sort,splice: [].splice}, $.fn.init.prototype = $.fn, $.extend = $.fn.extend = function() {
        var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
        typeof h == "boolean" && (k = h, h = arguments[1] || {}, i = 2), typeof h != "object" && !$.isFunction(h) && (h = {}), j === i && (h = this, --i);
        for (; i < j; i++)
            if ((a = arguments[i]) != null)
                for (c in a) {
                    d = h[c], e = a[c];
                    if (h === e)
                        continue;
                    k && e && ($.isPlainObject(e) || (f = $.isArray(e))) ? (f ? (f = !1, g = d && $.isArray(d) ? d : []) : g = d && $.isPlainObject(d) ? d : {}, h[c] = $.extend(k, g, e)) : e !== b && (h[c] = e)
                }
        return h
    }, $.extend({noConflict: function(b) {
            return a.$ === $ && (a.$ = T), b && a.jQuery === $ && (a.jQuery = S), $
        },isReady: !1,readyWait: 1,holdReady: function(a) {
            a ? $.readyWait++ : $.ready(!0)
        },ready: function(a) {
            if (a === !0 ? --$.readyWait : $.isReady)
                return;
            if (!P.body)
                return setTimeout($.ready, 1);
            $.isReady = !0;
            if (a !== !0 && --$.readyWait > 0)
                return;
            O.resolveWith(P, [$]), $.fn.trigger && $(P).trigger("ready").off("ready")
        },isFunction: function(a) {
            return $.type(a) === "function"
        },isArray: Array.isArray || function(a) {
            return $.type(a) === "array"
        },isWindow: function(a) {
            return a != null && a == a.window
        },isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },type: function(a) {
            return a == null ? String(a) : bn[X.call(a)] || "object"
        },isPlainObject: function(a) {
            if (!a || $.type(a) !== "object" || a.nodeType || $.isWindow(a))
                return !1;
            try {
                if (a.constructor && !Y.call(a, "constructor") && !Y.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (c) {
                return !1
            }
            var d;
            for (d in a)
                ;
            return d === b || Y.call(a, d)
        },isEmptyObject: function(a) {
            var b;
            for (b in a)
                return !1;
            return !0
        },error: function(a) {
            throw new Error(a)
        },parseHTML: function(a, b, c) {
            var d;
            return !a || typeof a != "string" ? null : (typeof b == "boolean" && (c = b, b = 0), b = b || P, (d = be.exec(a)) ? [b.createElement(d[1])] : (d = $.buildFragment([a], b, c ? null : []), $.merge([], (d.cacheable ? $.clone(d.fragment) : d.fragment).childNodes)))
        },parseJSON: function(b) {
            if (!b || typeof b != "string")
                return null;
            b = $.trim(b);
            if (a.JSON && a.JSON.parse)
                return a.JSON.parse(b);
            if (bf.test(b.replace(bh, "@").replace(bi, "]").replace(bg, "")))
                return (new Function("return " + b))();
            $.error("Invalid JSON: " + b)
        },parseXML: function(c) {
            var d, e;
            if (!c || typeof c != "string")
                return null;
            try {
                a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch (f) {
                d = b
            }
            return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && $.error("Invalid XML: " + c), d
        },noop: function() {
        },globalEval: function(b) {
            b && ba.test(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            })(b)
        },camelCase: function(a) {
            return a.replace(bj, "ms-").replace(bk, bl)
        },nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        },each: function(a, c, d) {
            var e, f = 0, g = a.length, h = g === b || $.isFunction(a);
            if (d) {
                if (h) {
                    for (e in a)
                        if (c.apply(a[e], d) === !1)
                            break
                } else
                    for (; f < g; )
                        if (c.apply(a[f++], d) === !1)
                            break
            } else if (h) {
                for (e in a)
                    if (c.call(a[e], e, a[e]) === !1)
                        break
            } else
                for (; f < g; )
                    if (c.call(a[f], f, a[f++]) === !1)
                        break;
            return a
        },trim: Z ? function(a) {
            return a == null ? "" : Z.call(a)
        } : function(a) {
            return a == null ? "" : a.toString().replace(bc, "")
        },makeArray: function(a, b) {
            var c, d = b || [];
            return a != null && (c = $.type(a), a.length == null || c === "string" || c === "function" || c === "regexp" || $.isWindow(a) ? U.call(d, a) : $.merge(d, a)), d
        },inArray: function(a, b, c) {
            var d;
            if (b) {
                if (W)
                    return W.call(b, a, c);
                d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                for (; c < d; c++)
                    if (c in b && b[c] === a)
                        return c
            }
            return -1
        },merge: function(a, c) {
            var d = c.length, e = a.length, f = 0;
            if (typeof d == "number")
                for (; f < d; f++)
                    a[e++] = c[f];
            else
                while (c[f] !== b)
                    a[e++] = c[f++];
            return a.length = e, a
        },grep: function(a, b, c) {
            var d, e = [], f = 0, g = a.length;
            c = !!c;
            for (; f < g; f++)
                d = !!b(a[f], f), c !== d && e.push(a[f]);
            return e
        },map: function(a, c, d) {
            var e, f, g = [], h = 0, i = a.length, j = a instanceof $ || i !== b && typeof i == "number" && (i > 0 && a[0] && a[i - 1] || i === 0 || $.isArray(a));
            if (j)
                for (; h < i; h++)
                    e = c(a[h], h, d), e != null && (g[g.length] = e);
            else
                for (f in a)
                    e = c(a[f], f, d), e != null && (g[g.length] = e);
            return g.concat.apply([], g)
        },guid: 1,proxy: function(a, c) {
            var d, e, f;
            return typeof c == "string" && (d = a[c], c = a, a = d), $.isFunction(a) ? (e = V.call(arguments, 2), f = function() {
                return a.apply(c, e.concat(V.call(arguments)))
            }, f.guid = a.guid = a.guid || f.guid || $.guid++, f) : b
        },access: function(a, c, d, e, f, g, h) {
            var i, j = d == null, k = 0, l = a.length;
            if (d && typeof d == "object") {
                for (k in d)
                    $.access(a, c, k, d[k], 1, g, e);
                f = 1
            } else if (e !== b) {
                i = h === b && $.isFunction(e), j && (i ? (i = c, c = function(a, b, c) {
                    return i.call($(a), c)
                }) : (c.call(a, e), c = null));
                if (c)
                    for (; k < l; k++)
                        c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
                f = 1
            }
            return f ? a : j ? c.call(a) : l ? c(a[0], d) : g
        },now: function() {
            return (new Date).getTime()
        }}), $.ready.promise = function(b) {
        if (!O) {
            O = $.Deferred();
            if (P.readyState === "complete" || P.readyState !== "loading" && P.addEventListener)
                setTimeout($.ready, 1);
            else if (P.addEventListener)
                P.addEventListener("DOMContentLoaded", bm, !1), a.addEventListener("load", $.ready, !1);
            else {
                P.attachEvent("onreadystatechange", bm), a.attachEvent("onload", $.ready);
                var c = !1;
                try {
                    c = a.frameElement == null && P.documentElement
                } catch (d) {
                }
                c && c.doScroll && function e() {
                    if (!$.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (a) {
                            return setTimeout(e, 50)
                        }
                        $.ready()
                    }
                }()
            }
        }
        return O.promise(b)
    }, $.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
        bn["[object " + b + "]"] = b.toLowerCase()
    }), N = $(P);
    var bo = {};
    $.Callbacks = function(a) {
        a = typeof a == "string" ? bo[a] || c(a) : $.extend({}, a);
        var d, e, f, g, h, i, j = [], k = !a.once && [], l = function(b) {
            d = a.memory && b, e = !0, i = g || 0, g = 0, h = j.length, f = !0;
            for (; j && i < h; i++)
                if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                    d = !1;
                    break
                }
            f = !1, j && (k ? k.length && l(k.shift()) : d ? j = [] : m.disable())
        }, m = {add: function() {
                if (j) {
                    var b = j.length;
                    (function c(b) {
                        $.each(b, function(b, d) {
                            $.isFunction(d) && (!a.unique || !m.has(d)) ? j.push(d) : d && d.length && c(d)
                        })
                    })(arguments), f ? h = j.length : d && (g = b, l(d))
                }
                return this
            },remove: function() {
                return j && $.each(arguments, function(a, b) {
                    var c;
                    while ((c = $.inArray(b, j, c)) > -1)
                        j.splice(c, 1), f && (c <= h && h--, c <= i && i--)
                }), this
            },has: function(a) {
                return $.inArray(a, j) > -1
            },empty: function() {
                return j = [], this
            },disable: function() {
                return j = k = d = b, this
            },disabled: function() {
                return !j
            },lock: function() {
                return k = b, d || m.disable(), this
            },locked: function() {
                return !k
            },fireWith: function(a, b) {
                return b = b || [], b = [a, b.slice ? b.slice() : b], j && (!e || k) && (f ? k.push(b) : l(b)), this
            },fire: function() {
                return m.fireWith(this, arguments), this
            },fired: function() {
                return !!e
            }};
        return m
    }, $.extend({Deferred: function(a) {
            var b = [["resolve", "done", $.Callbacks("once memory"), "resolved"], ["reject", "fail", $.Callbacks("once memory"), "rejected"], ["notify", "progress", $.Callbacks("memory")]], c = "pending", d = {state: function() {
                    return c
                },always: function() {
                    return e.done(arguments).fail(arguments), this
                },then: function() {
                    var a = arguments;
                    return $.Deferred(function(c) {
                        $.each(b, function(b, d) {
                            var f = d[0], g = a[b];
                            e[d[1]]($.isFunction(g) ? function() {
                                var a = g.apply(this, arguments);
                                a && $.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a])
                            } : c[f])
                        }), a = null
                    }).promise()
                },promise: function(a) {
                    return typeof a == "object" ? $.extend(a, d) : d
                }}, e = {};
            return d.pipe = d.then, $.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[a ^ 1][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },when: function(a) {
            var b = 0, c = V.call(arguments), d = c.length, e = d !== 1 || a && $.isFunction(a.promise) ? d : 0, f = e === 1 ? a : $.Deferred(), g = function(a, b, c) {
                return function(d) {
                    b[a] = this, c[a] = arguments.length > 1 ? V.call(arguments) : d, c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c)
                }
            }, h, i, j;
            if (d > 1) {
                h = new Array(d), i = new Array(d), j = new Array(d);
                for (; b < d; b++)
                    c[b] && $.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e
            }
            return e || f.resolveWith(j, c), f.promise()
        }}), $.support = function() {
        var b, c, d, e, f, g, h, i, j, k, l, m = P.createElement("div");
        m.setAttribute("className", "t"), m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = m.getElementsByTagName("*"), d = m.getElementsByTagName("a")[0], d.style.cssText = "top:1px;float:left;opacity:.5";
        if (!c || !c.length || !d)
            return {};
        e = P.createElement("select"), f = e.appendChild(P.createElement("option")), g = m.getElementsByTagName("input")[0], b = {leadingWhitespace: m.firstChild.nodeType === 3,tbody: !m.getElementsByTagName("tbody").length,htmlSerialize: !!m.getElementsByTagName("link").length,style: /top/.test(d.getAttribute("style")),hrefNormalized: d.getAttribute("href") === "/a",opacity: /^0.5/.test(d.style.opacity),cssFloat: !!d.style.cssFloat,checkOn: g.value === "on",optSelected: f.selected,getSetAttribute: m.className !== "t",enctype: !!P.createElement("form").enctype,html5Clone: P.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",boxModel: P.compatMode === "CSS1Compat",submitBubbles: !0,changeBubbles: !0,focusinBubbles: !1,deleteExpando: !0,noCloneEvent: !0,inlineBlockNeedsLayout: !1,shrinkWrapBlocks: !1,reliableMarginRight: !0,boxSizingReliable: !0,pixelPosition: !1}, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
        try {
            delete m.test
        } catch (n) {
            b.deleteExpando = !1
        }
        !m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", l = function() {
            b.noCloneEvent = !1
        }), m.cloneNode(!0).fireEvent("onclick"), m.detachEvent("onclick", l)), g = P.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), b.radioValue = g.value === "t", g.setAttribute("checked", "checked"), g.setAttribute("name", "t"), m.appendChild(g), h = P.createDocumentFragment(), h.appendChild(m.lastChild), b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, h.removeChild(g), h.appendChild(m);
        if (m.attachEvent)
            for (j in {submit: !0,change: !0,focusin: !0})
                i = "on" + j, k = i in m, k || (m.setAttribute(i, "return;"), k = typeof m[i] == "function"), b[j + "Bubbles"] = k;
        return $(function() {
            var c, d, e, f, g = "padding:0;margin:0;border:0;display:block;overflow:hidden;", h = P.getElementsByTagName("body")[0];
            if (!h)
                return;
            c = P.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", h.insertBefore(c, h.firstChild), d = P.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = d.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", k = e[0].offsetHeight === 0, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = k && e[0].offsetHeight === 0, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = d.offsetWidth === 4, b.doesNotIncludeMarginInBodyOffset = h.offsetTop !== 1, a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%", b.boxSizingReliable = (a.getComputedStyle(d, null) || {width: "4px"}).width === "4px", f = P.createElement("div"), f.style.cssText = d.style.cssText = g, f.style.marginRight = f.style.width = "0", d.style.width = "1px", d.appendChild(f), b.reliableMarginRight = !parseFloat((a.getComputedStyle(f, null) || {}).marginRight)), typeof d.style.zoom != "undefined" && (d.innerHTML = "", d.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = d.offsetWidth === 3, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = d.offsetWidth !== 3, c.style.zoom = 1), h.removeChild(c), c = d = e = f = null
        }), h.removeChild(m), c = d = e = f = g = h = m = null, b
    }();
    var bp = /^(?:\{.*\}|\[.*\])$/, bq = /([A-Z])/g;
    $.extend({cache: {},deletedIds: [],uuid: 0,expando: "jQuery" + ($.fn.jquery + Math.random()).replace(/\D/g, ""),noData: {embed: !0,object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet: !0},hasData: function(a) {
            return a = a.nodeType ? $.cache[a[$.expando]] : a[$.expando], !!a && !e(a)
        },data: function(a, c, d, e) {
            if (!$.acceptData(a))
                return;
            var f, g, h = $.expando, i = typeof c == "string", j = a.nodeType, k = j ? $.cache : a, l = j ? a[h] : a[h] && h;
            if ((!l || !k[l] || !e && !k[l].data) && i && d === b)
                return;
            l || (j ? a[h] = l = $.deletedIds.pop() || ++$.uuid : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = $.noop));
            if (typeof c == "object" || typeof c == "function")
                e ? k[l] = $.extend(k[l], c) : k[l].data = $.extend(k[l].data, c);
            return f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[$.camelCase(c)] = d), i ? (g = f[c], g == null && (g = f[$.camelCase(c)])) : g = f, g
        },removeData: function(a, b, c) {
            if (!$.acceptData(a))
                return;
            var d, f, g, h = a.nodeType, i = h ? $.cache : a, j = h ? a[$.expando] : $.expando;
            if (!i[j])
                return;
            if (b) {
                d = c ? i[j] : i[j].data;
                if (d) {
                    $.isArray(b) || (b in d ? b = [b] : (b = $.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                    for (f = 0, g = b.length; f < g; f++)
                        delete d[b[f]];
                    if (!(c ? e : $.isEmptyObject)(d))
                        return
                }
            }
            if (!c) {
                delete i[j].data;
                if (!e(i[j]))
                    return
            }
            h ? $.cleanData([a], !0) : $.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null
        },_data: function(a, b, c) {
            return $.data(a, b, c, !0)
        },acceptData: function(a) {
            var b = a.nodeName && $.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b
        }}), $.fn.extend({data: function(a, c) {
            var e, f, g, h, i, j = this[0], k = 0, l = null;
            if (a === b) {
                if (this.length) {
                    l = $.data(j);
                    if (j.nodeType === 1 && !$._data(j, "parsedAttrs")) {
                        g = j.attributes;
                        for (i = g.length; k < i; k++)
                            h = g[k].name, h.indexOf("data-") === 0 && (h = $.camelCase(h.substring(5)), d(j, h, l[h]));
                        $._data(j, "parsedAttrs", !0)
                    }
                }
                return l
            }
            return typeof a == "object" ? this.each(function() {
                $.data(this, a)
            }) : (e = a.split(".", 2), e[1] = e[1] ? "." + e[1] : "", f = e[1] + "!", $.access(this, function(c) {
                if (c === b)
                    return l = this.triggerHandler("getData" + f, [e[0]]), l === b && j && (l = $.data(j, a), l = d(j, a, l)), l === b && e[1] ? this.data(e[0]) : l;
                e[1] = c, this.each(function() {
                    var b = $(this);
                    b.triggerHandler("setData" + f, e), $.data(this, a, c), b.triggerHandler("changeData" + f, e)
                })
            }, null, c, arguments.length > 1, null, !1))
        },removeData: function(a) {
            return this.each(function() {
                $.removeData(this, a)
            })
        }}), $.extend({queue: function(a, b, c) {
            var d;
            if (a)
                return b = (b || "fx") + "queue", d = $._data(a, b), c && (!d || $.isArray(c) ? d = $._data(a, b, $.makeArray(c)) : d.push(c)), d || []
        },dequeue: function(a, b) {
            b = b || "fx";
            var c = $.queue(a, b), d = c.shift(), e = $._queueHooks(a, b), f = function() {
                $.dequeue(a, b)
            };
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), delete e.stop, d.call(a, f, e)), !c.length && e && e.empty.fire()
        },_queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return $._data(a, c) || $._data(a, c, {empty: $.Callbacks("once memory").add(function() {
                    $.removeData(a, b + "queue", !0), $.removeData(a, c, !0)
                })})
        }}), $.fn.extend({queue: function(a, c) {
            var d = 2;
            return typeof a != "string" && (c = a, a = "fx", d--), arguments.length < d ? $.queue(this[0], a) : c === b ? this : this.each(function() {
                var b = $.queue(this, a, c);
                $._queueHooks(this, a), a === "fx" && b[0] !== "inprogress" && $.dequeue(this, a)
            })
        },dequeue: function(a) {
            return this.each(function() {
                $.dequeue(this, a)
            })
        },delay: function(a, b) {
            return a = $.fx ? $.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },promise: function(a, c) {
            var d, e = 1, f = $.Deferred(), g = this, h = this.length, i = function() {
                --e || f.resolveWith(g, [g])
            };
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            while (h--)
                (d = $._data(g[h], a + "queueHooks")) && d.empty && (e++, d.empty.add(i));
            return i(), f.promise(c)
        }});
    var br, bs, bt, bu = /[\t\r\n]/g, bv = /\r/g, bw = /^(?:button|input)$/i, bx = /^(?:button|input|object|select|textarea)$/i, by = /^a(?:rea|)$/i, bz = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, bA = $.support.getSetAttribute;
    $.fn.extend({attr: function(a, b) {
            return $.access(this, $.attr, a, b, arguments.length > 1)
        },removeAttr: function(a) {
            return this.each(function() {
                $.removeAttr(this, a)
            })
        },prop: function(a, b) {
            return $.access(this, $.prop, a, b, arguments.length > 1)
        },removeProp: function(a) {
            return a = $.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {
                }
            })
        },addClass: function(a) {
            var b, c, d, e, f, g, h;
            if ($.isFunction(a))
                return this.each(function(b) {
                    $(this).addClass(a.call(this, b, this.className))
                });
            if (a && typeof a == "string") {
                b = a.split(bb);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)
                        if (!e.className && b.length === 1)
                            e.className = a;
                        else {
                            f = " " + e.className + " ";
                            for (g = 0, h = b.length; g < h; g++)
                                ~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
                            e.className = $.trim(f)
                        }
                }
            }
            return this
        },removeClass: function(a) {
            var c, d, e, f, g, h, i;
            if ($.isFunction(a))
                return this.each(function(b) {
                    $(this).removeClass(a.call(this, b, this.className))
                });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(bb);
                for (h = 0, i = this.length; h < i; h++) {
                    e = this[h];
                    if (e.nodeType === 1 && e.className) {
                        d = (" " + e.className + " ").replace(bu, " ");
                        for (f = 0, g = c.length; f < g; f++)
                            while (d.indexOf(" " + c[f] + " ") > -1)
                                d = d.replace(" " + c[f] + " ", " ");
                        e.className = a ? $.trim(d) : ""
                    }
                }
            }
            return this
        },toggleClass: function(a, b) {
            var c = typeof a, d = typeof b == "boolean";
            return $.isFunction(a) ? this.each(function(c) {
                $(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function() {
                if (c === "string") {
                    var e, f = 0, g = $(this), h = b, i = a.split(bb);
                    while (e = i[f++])
                        h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean")
                    this.className && $._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : $._data(this, "__className__") || ""
            })
        },hasClass: function(a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++)
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(bu, " ").indexOf(b) > -1)
                    return !0;
            return !1
        },val: function(a) {
            var c, d, e, f = this[0];
            if (!arguments.length) {
                if (f)
                    return c = $.valHooks[f.type] || $.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, typeof d == "string" ? d.replace(bv, "") : d == null ? "" : d);
                return
            }
            return e = $.isFunction(a), this.each(function(d) {
                var f, g = $(this);
                if (this.nodeType !== 1)
                    return;
                e ? f = a.call(this, d, g.val()) : f = a, f == null ? f = "" : typeof f == "number" ? f += "" : $.isArray(f) && (f = $.map(f, function(a) {
                    return a == null ? "" : a + ""
                })), c = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()];
                if (!c || !("set" in c) || c.set(this, f, "value") === b)
                    this.value = f
            })
        }}), $.extend({valHooks: {option: {get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }},select: {get: function(a) {
                    var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = a.type === "select-one";
                    if (f < 0)
                        return null;
                    c = i ? f : 0, d = i ? f + 1 : h.length;
                    for (; c < d; c++) {
                        e = h[c];
                        if (e.selected && ($.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !$.nodeName(e.parentNode, "optgroup"))) {
                            b = $(e).val();
                            if (i)
                                return b;
                            g.push(b)
                        }
                    }
                    return i && !g.length && h.length ? $(h[f]).val() : g
                },set: function(a, b) {
                    var c = $.makeArray(b);
                    return $(a).find("option").each(function() {
                        this.selected = $.inArray($(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1), c
                }}},attrFn: {},attr: function(a, c, d, e) {
            var f, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2)
                return;
            if (e && $.isFunction($.fn[c]))
                return $(a)[c](d);
            if (typeof a.getAttribute == "undefined")
                return $.prop(a, c, d);
            h = i !== 1 || !$.isXMLDoc(a), h && (c = c.toLowerCase(), g = $.attrHooks[c] || (bz.test(c) ? bs : br));
            if (d !== b) {
                if (d === null) {
                    $.removeAttr(a, c);
                    return
                }
                return g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d)
            }
            return g && "get" in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c), f === null ? b : f)
        },removeAttr: function(a, b) {
            var c, d, e, f, g = 0;
            if (b && a.nodeType === 1) {
                d = b.split(bb);
                for (; g < d.length; g++)
                    e = d[g], e && (c = $.propFix[e] || e, f = bz.test(e), f || $.attr(a, e, ""), a.removeAttribute(bA ? e : c), f && c in a && (a[c] = !1))
            }
        },attrHooks: {type: {set: function(a, b) {
                    if (bw.test(a.nodeName) && a.parentNode)
                        $.error("type property can't be changed");
                    else if (!$.support.radioValue && b === "radio" && $.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }},value: {get: function(a, b) {
                    return br && $.nodeName(a, "button") ? br.get(a, b) : b in a ? a.value : null
                },set: function(a, b, c) {
                    if (br && $.nodeName(a, "button"))
                        return br.set(a, b, c);
                    a.value = b
                }}},propFix: {tabindex: "tabIndex",readonly: "readOnly","for": "htmlFor","class": "className",maxlength: "maxLength",cellspacing: "cellSpacing",cellpadding: "cellPadding",rowspan: "rowSpan",colspan: "colSpan",usemap: "useMap",frameborder: "frameBorder",contenteditable: "contentEditable"},prop: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            if (!a || h === 3 || h === 8 || h === 2)
                return;
            return g = h !== 1 || !$.isXMLDoc(a), g && (c = $.propFix[c] || c, f = $.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c]
        },propHooks: {tabIndex: {get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : bx.test(a.nodeName) || by.test(a.nodeName) && a.href ? 0 : b
                }}}}), bs = {get: function(a, c) {
            var d, e = $.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },set: function(a, b, c) {
            var d;
            return b === !1 ? $.removeAttr(a, c) : (d = $.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
        }}, bA || (bt = {name: !0,id: !0,coords: !0}, br = $.valHooks.button = {get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (bt[c] ? d.value !== "" : d.specified) ? d.value : b
        },set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || (d = P.createAttribute(c), a.setAttributeNode(d)), d.value = b + ""
        }}, $.each(["width", "height"], function(a, b) {
        $.attrHooks[b] = $.extend($.attrHooks[b], {set: function(a, c) {
                if (c === "")
                    return a.setAttribute(b, "auto"), c
            }})
    }), $.attrHooks.contenteditable = {get: br.get,set: function(a, b, c) {
            b === "" && (b = "false"), br.set(a, b, c)
        }}), $.support.hrefNormalized || $.each(["href", "src", "width", "height"], function(a, c) {
        $.attrHooks[c] = $.extend($.attrHooks[c], {get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }})
    }), $.support.style || ($.attrHooks.style = {get: function(a) {
            return a.style.cssText.toLowerCase() || b
        },set: function(a, b) {
            return a.style.cssText = "" + b
        }}), $.support.optSelected || ($.propHooks.selected = $.extend($.propHooks.selected, {get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }})), $.support.enctype || ($.propFix.enctype = "encoding"), $.support.checkOn || $.each(["radio", "checkbox"], function() {
        $.valHooks[this] = {get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }}
    }), $.each(["radio", "checkbox"], function() {
        $.valHooks[this] = $.extend($.valHooks[this], {set: function(a, b) {
                if ($.isArray(b))
                    return a.checked = $.inArray($(a).val(), b) >= 0
            }})
    });
    var bB = /^(?:textarea|input|select)$/i, bC = /^([^\.]*|)(?:\.(.+)|)$/, bD = /(?:^|\s)hover(\.\S+|)\b/, bE = /^key/, bF = /^(?:mouse|contextmenu)|click/, bG = /^(?:focusinfocus|focusoutblur)$/, bH = function(a) {
        return $.event.special.hover ? a : a.replace(bD, "mouseenter$1 mouseleave$1")
    };
    $.event = {add: function(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q;
            if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = $._data(a)))
                return;
            d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = $.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function(a) {
                return typeof $ != "undefined" && (!a || $.event.triggered !== a.type) ? $.event.dispatch.apply(h.elem, arguments) : b
            }, h.elem = a), c = $.trim(bH(c)).split(" ");
            for (j = 0; j < c.length; j++) {
                k = bC.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), q = $.event.special[l] || {}, l = (f ? q.delegateType : q.bindType) || l, q = $.event.special[l] || {}, n = $.extend({type: l,origType: k[1],data: e,handler: d,guid: d.guid,selector: f,namespace: m.join(".")}, o), p = i[l];
                if (!p) {
                    p = i[l] = [], p.delegateCount = 0;
                    if (!q.setup || q.setup.call(a, e, m, h) === !1)
                        a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h)
                }
                q.add && (q.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? p.splice(p.delegateCount++, 0, n) : p.push(n), $.event.global[l] = !0
            }
            a = null
        },global: {},remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = $.hasData(a) && $._data(a);
            if (!q || !(m = q.events))
                return;
            b = $.trim(bH(b || "")).split(" ");
            for (f = 0; f < b.length; f++) {
                g = bC.exec(b[f]) || [], h = i = g[1], j = g[2];
                if (!h) {
                    for (h in m)
                        $.event.remove(a, h + b[f], c, d, !0);
                    continue
                }
                n = $.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (l = 0; l < o.length; l++)
                    p = o[l], (e || i === p.origType) && (!c || c.guid === p.guid) && (!j || j.test(p.namespace)) && (!d || d === p.selector || d === "**" && p.selector) && (o.splice(l--, 1), p.selector && o.delegateCount--, n.remove && n.remove.call(a, p));
                o.length === 0 && k !== o.length && ((!n.teardown || n.teardown.call(a, j, q.handle) === !1) && $.removeEvent(a, h, q.handle), delete m[h])
            }
            $.isEmptyObject(m) && (delete q.handle, $.removeData(a, "events", !0))
        },customEvent: {getData: !0,setData: !0,changeData: !0},trigger: function(c, d, e, f) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var g, h, i, j, k, l, m, n, o, p, q = c.type || c, r = [];
                if (bG.test(q + $.event.triggered))
                    return;
                q.indexOf("!") >= 0 && (q = q.slice(0, -1), h = !0), q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort());
                if ((!e || $.event.customEvent[q]) && !$.event.global[q])
                    return;
                c = typeof c == "object" ? c[$.expando] ? c : new $.Event(q, c) : new $.Event(q), c.type = q, c.isTrigger = !0, c.exclusive = h, c.namespace = r.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = q.indexOf(":") < 0 ? "on" + q : "";
                if (!e) {
                    g = $.cache;
                    for (i in g)
                        g[i].events && g[i].events[q] && $.event.trigger(c, d, g[i].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? $.makeArray(d) : [], d.unshift(c), m = $.event.special[q] || {};
                if (m.trigger && m.trigger.apply(e, d) === !1)
                    return;
                o = [[e, m.bindType || q]];
                if (!f && !m.noBubble && !$.isWindow(e)) {
                    p = m.delegateType || q, j = bG.test(p + q) ? e : e.parentNode;
                    for (k = e; j; j = j.parentNode)
                        o.push([j, p]), k = j;
                    k === (e.ownerDocument || P) && o.push([k.defaultView || k.parentWindow || a, p])
                }
                for (i = 0; i < o.length && !c.isPropagationStopped(); i++)
                    j = o[i][0], c.type = o[i][1], n = ($._data(j, "events") || {})[c.type] && $._data(j, "handle"), n && n.apply(j, d), n = l && j[l], n && $.acceptData(j) && n.apply(j, d) === !1 && c.preventDefault();
                return c.type = q, !f && !c.isDefaultPrevented() && (!m._default || m._default.apply(e.ownerDocument, d) === !1) && (q !== "click" || !$.nodeName(e, "a")) && $.acceptData(e) && l && e[q] && (q !== "focus" && q !== "blur" || c.target.offsetWidth !== 0) && !$.isWindow(e) && (k = e[l], k && (e[l] = null), $.event.triggered = q, e[q](), $.event.triggered = b, k && (e[l] = k)), c.result
            }
            return
        },dispatch: function(c) {
            c = $.event.fix(c || a.event);
            var d, e, f, g, h, i, j, k, l, m, n, o = ($._data(this, "events") || {})[c.type] || [], p = o.delegateCount, q = [].slice.call(arguments), r = !c.exclusive && !c.namespace, s = $.event.special[c.type] || {}, t = [];
            q[0] = c, c.delegateTarget = this;
            if (s.preDispatch && s.preDispatch.call(this, c) === !1)
                return;
            if (p && (!c.button || c.type !== "click")) {
                g = $(this), g.context = this;
                for (f = c.target; f != this; f = f.parentNode || this)
                    if (f.disabled !== !0 || c.type !== "click") {
                        i = {}, k = [], g[0] = f;
                        for (d = 0; d < p; d++)
                            l = o[d], m = l.selector, i[m] === b && (i[m] = g.is(m)), i[m] && k.push(l);
                        k.length && t.push({elem: f,matches: k})
                    }
            }
            o.length > p && t.push({elem: this,matches: o.slice(p)});
            for (d = 0; d < t.length && !c.isPropagationStopped(); d++) {
                j = t[d], c.currentTarget = j.elem;
                for (e = 0; e < j.matches.length && !c.isImmediatePropagationStopped(); e++) {
                    l = j.matches[e];
                    if (r || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace))
                        c.data = l.data, c.handleObj = l, h = (($.event.special[l.origType] || {}).handle || l.handler).apply(j.elem, q), h !== b && (c.result = h, h === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            return s.postDispatch && s.postDispatch.call(this, c), c.result
        },props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks: {},keyHooks: {props: "char charCode key keyCode".split(" "),filter: function(a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a
            }},mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter: function(a, c) {
                var d, e, f, g = c.button, h = c.fromElement;
                return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || P, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), a
            }},fix: function(a) {
            if (a[$.expando])
                return a;
            var b, c, d = a, e = $.event.fixHooks[a.type] || {}, f = e.props ? this.props.concat(e.props) : this.props;
            a = $.Event(d);
            for (b = f.length; b; )
                c = f[--b], a[c] = d[c];
            return a.target || (a.target = d.srcElement || P), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, e.filter ? e.filter(a, d) : a
        },special: {ready: {setup: $.bindReady},load: {noBubble: !0},focus: {delegateType: "focusin"},blur: {delegateType: "focusout"},beforeunload: {setup: function(a, b, c) {
                    $.isWindow(this) && (this.onbeforeunload = c)
                },teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }}},simulate: function(a, b, c, d) {
            var e = $.extend(new $.Event, c, {type: a,isSimulated: !0,originalEvent: {}});
            d ? $.event.trigger(e, null, b) : $.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }}, $.event.handle = $.event.dispatch, $.removeEvent = P.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null), a.detachEvent(d, c))
    }, $.Event = function(a, b) {
        if (this instanceof $.Event)
            a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? g : f) : this.type = a, b && $.extend(this, b), this.timeStamp = a && a.timeStamp || $.now(), this[$.expando] = !0;
        else
            return new $.Event(a, b)
    }, $.Event.prototype = {preventDefault: function() {
            this.isDefaultPrevented = g;
            var a = this.originalEvent;
            if (!a)
                return;
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },stopPropagation: function() {
            this.isPropagationStopped = g;
            var a = this.originalEvent;
            if (!a)
                return;
            a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
        },stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = g, this.stopPropagation()
        },isDefaultPrevented: f,isPropagationStopped: f,isImmediatePropagationStopped: f}, $.each({mouseenter: "mouseover",mouseleave: "mouseout"}, function(a, b) {
        $.event.special[a] = {delegateType: b,bindType: b,handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj, g = f.selector;
                if (!e || e !== d && !$.contains(d, e))
                    a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b;
                return c
            }}
    }), $.support.submitBubbles || ($.event.special.submit = {setup: function() {
            if ($.nodeName(this, "form"))
                return !1;
            $.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target, d = $.nodeName(c, "input") || $.nodeName(c, "button") ? c.form : b;
                d && !$._data(d, "_submit_attached") && ($.event.add(d, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }), $._data(d, "_submit_attached", !0))
            })
        },postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && $.event.simulate("submit", this.parentNode, a, !0))
        },teardown: function() {
            if ($.nodeName(this, "form"))
                return !1;
            $.event.remove(this, "._submit")
        }}), $.support.changeBubbles || ($.event.special.change = {setup: function() {
            if (bB.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio")
                    $.event.add(this, "propertychange._change", function(a) {
                        a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }), $.event.add(this, "click._change", function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1), $.event.simulate("change", this, a, !0)
                    });
                return !1
            }
            $.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                bB.test(b.nodeName) && !$._data(b, "_change_attached") && ($.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && $.event.simulate("change", this.parentNode, a, !0)
                }), $._data(b, "_change_attached", !0))
            })
        },handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")
                return a.handleObj.handler.apply(this, arguments)
        },teardown: function() {
            return $.event.remove(this, "._change"), bB.test(this.nodeName)
        }}), $.support.focusinBubbles || $.each({focus: "focusin",blur: "focusout"}, function(a, b) {
        var c = 0, d = function(a) {
            $.event.simulate(b, a.target, $.event.fix(a), !0)
        };
        $.event.special[b] = {setup: function() {
                c++ === 0 && P.addEventListener(a, d, !0)
            },teardown: function() {
                --c === 0 && P.removeEventListener(a, d, !0)
            }}
    }), $.fn.extend({on: function(a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = d || c, c = b);
                for (i in a)
                    this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1)
                e = f;
            else if (!e)
                return this;
            return g === 1 && (h = e, e = function(a) {
                return $().off(a), h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = $.guid++)), this.each(function() {
                $.event.add(this, a, e, d, c)
            })
        },one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },off: function(a, c, d) {
            var e, g;
            if (a && a.preventDefault && a.handleObj)
                return e = a.handleObj, $(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if (typeof a == "object") {
                for (g in a)
                    this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function")
                d = c, c = b;
            return d === !1 && (d = f), this.each(function() {
                $.event.remove(this, a, d, c)
            })
        },bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },unbind: function(a, b) {
            return this.off(a, null, b)
        },live: function(a, b, c) {
            return $(this.context).on(a, this.selector, b, c), this
        },die: function(a, b) {
            return $(this.context).off(a, this.selector || "**", b), this
        },delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a || "**", c)
        },trigger: function(a, b) {
            return this.each(function() {
                $.event.trigger(a, b, this)
            })
        },triggerHandler: function(a, b) {
            if (this[0])
                return $.event.trigger(a, b, this[0], !0)
        },toggle: function(a) {
            var b = arguments, c = a.guid || $.guid++, d = 0, e = function(c) {
                var e = ($._data(this, "lastToggle" + a.guid) || 0) % d;
                return $._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
            };
            e.guid = c;
            while (d < b.length)
                b[d++].guid = c;
            return this.click(e)
        },hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }}), $.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        $.fn[b] = function(a, c) {
            return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, bE.test(b) && ($.event.fixHooks[b] = $.event.keyHooks), bF.test(b) && ($.event.fixHooks[b] = $.event.mouseHooks)
    }), function(a, b) {
        function c(a, b, c, d) {
            var e = 0, f = b.length;
            for (; e < f; e++)
                bf(a, b[e], c, d)
        }
        function d(a, b, d, e, f, g) {
            var h, i = bg.setFilters[b.toLowerCase()];
            return i || bf.error(b), (a || !(h = f)) && c(a || "*", e, h = [], f), h.length > 0 ? i(h, d, g) : []
        }
        function e(a, e, f, g, h) {
            var i, j, k, l, m, n, o, p, q = 0, r = h.length, s = S.POS, t = new RegExp("^" + s.source + "(?!" + y + ")", "i"), u = function() {
                var a = 1, c = arguments.length - 2;
                for (; a < c; a++)
                    arguments[a] === b && (i[a] = b)
            };
            for (; q < r; q++) {
                s.exec(""), a = h[q], l = [], k = 0, m = g;
                while (i = s.exec(a)) {
                    p = s.lastIndex = i.index + i[0].length;
                    if (p > k) {
                        o = a.slice(k, i.index), k = p, n = [e], I.test(o) && (m && (n = m), m = g);
                        if (j = O.test(o))
                            o = o.slice(0, -5).replace(I, "$&*");
                        i.length > 1 && i[0].replace(t, u), m = d(o, i[1], i[2], n, m, j)
                    }
                }
                m ? (l = l.concat(m), (o = a.slice(k)) && o !== ")" ? I.test(o) ? c(o, l, f, g) : bf(o, e, f, g ? g.concat(m) : m) : w.apply(f, l)) : bf(a, e, f, g)
            }
            return r === 1 ? f : bf.uniqueSort(f)
        }
        function f(a, b, c) {
            var d, e, f, g = [], h = 0, i = K.exec(a), j = !i.pop() && !i.pop(), k = j && a.match(J) || [""], l = bg.preFilter, m = bg.filter, n = !c && b !== p;
            for (; (e = k[h]) != null && j; h++) {
                g.push(d = []), n && (e = " " + e);
                while (e) {
                    j = !1;
                    if (i = I.exec(e))
                        e = e.slice(i[0].length), j = d.push({part: i.pop().replace(H, " "),captures: i});
                    for (f in m)
                        (i = S[f].exec(e)) && (!l[f] || (i = l[f](i, b, c))) && (e = e.slice(i.shift().length), j = d.push({part: f,captures: i}));
                    if (!j)
                        break
                }
            }
            return j || bf.error(a), g
        }
        function g(a, b, c) {
            var d = b.dir, e = u++;
            return a || (a = function(a) {
                return a === c
            }), b.first ? function(b, c) {
                while (b = b[d])
                    if (b.nodeType === 1)
                        return a(b, c) && b
            } : function(b, c) {
                var f, g = e + "." + l, h = g + "." + k;
                while (b = b[d])
                    if (b.nodeType === 1) {
                        if ((f = b[x]) === h)
                            return b.sizset;
                        if (typeof f == "string" && f.indexOf(g) === 0) {
                            if (b.sizset)
                                return b
                        } else {
                            b[x] = h;
                            if (a(b, c))
                                return b.sizset = !0, b;
                            b.sizset = !1
                        }
                    }
            }
        }
        function h(a, b) {
            return a ? function(c, d) {
                var e = b(c, d);
                return e && a(e === !0 ? c : e, d)
            } : b
        }
        function i(a, b, c) {
            var d, e, f = 0;
            for (; d = a[f]; f++)
                bg.relative[d.part] ? e = g(e, bg.relative[d.part], b) : (d.captures.push(b, c), e = h(e, bg.filter[d.part].apply(null, d.captures)));
            return e
        }
        function j(a) {
            return function(b, c) {
                var d, e = 0;
                for (; d = a[e]; e++)
                    if (d(b, c))
                        return !0;
                return !1
            }
        }
        var k, l, m, n, o, p = a.document, q = p.documentElement, r = "undefined", s = !1, t = !0, u = 0, v = [].slice, w = [].push, x = ("sizcache" + Math.random()).replace(".", ""), y = "[\\x20\\t\\r\\n\\f]", z = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", A = z.replace("w", "w#"), B = "([*^$|!~]?=)", C = "\\[" + y + "*(" + z + ")" + y + "*(?:" + B + y + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + A + ")|)|)" + y + "*\\]", D = ":(" + z + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)", E = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", F = y + "*([\\x20\\t\\r\\n\\f>+~])" + y + "*", G = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + C + "|" + D.replace(2, 7) + "|[^\\\\(),])+", H = new RegExp("^" + y + "+|((?:^|[^\\\\])(?:\\\\.)*)" + y + "+$", "g"), I = new RegExp("^" + F), J = new RegExp(G + "?(?=" + y + "*,|$)", "g"), K = new RegExp("^(?:(?!,)(?:(?:^|,)" + y + "*" + G + ")*?|" + y + "*(.*?))(\\)|$)"), L = new RegExp(G.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + F, "g"), M = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, N = /[\x20\t\r\n\f]*[+~]/, O = /:not\($/, P = /h\d/i, Q = /input|select|textarea|button/i, R = /\\(?!\\)/g, S = {ID: new RegExp("^#(" + z + ")"),CLASS: new RegExp("^\\.(" + z + ")"),NAME: new RegExp("^\\[name=['\"]?(" + z + ")['\"]?\\]"),TAG: new RegExp("^(" + z.replace("[-", "[-\\*") + ")"),ATTR: new RegExp("^" + C),PSEUDO: new RegExp("^" + D),CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + y + "*(even|odd|(([+-]|)(\\d*)n|)" + y + "*(?:([+-]|)" + y + "*(\\d+)|))" + y + "*\\)|)", "i"),POS: new RegExp(E, "ig"),needsContext: new RegExp("^" + y + "*[>+~]|" + E, "i")}, T = {}, U = [], V = {}, W = [], X = function(a) {
            return a.sizzleFilter = !0, a
        }, Y = function(a) {
            return function(b) {
                return b.nodeName.toLowerCase() === "input" && b.type === a
            }
        }, Z = function(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return (c === "input" || c === "button") && b.type === a
            }
        }, _ = function(a) {
            var b = !1, c = p.createElement("div");
            try {
                b = a(c)
            } catch (d) {
            }
            return c = null, b
        }, ba = _(function(a) {
            a.innerHTML = "<select></select>";
            var b = typeof a.lastChild.getAttribute("multiple");
            return b !== "boolean" && b !== "string"
        }), bb = _(function(a) {
            a.id = x + 0, a.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", q.insertBefore(a, q.firstChild);
            var b = p.getElementsByName && p.getElementsByName(x).length === 2 + p.getElementsByName(x + 0).length;
            return o = !p.getElementById(x), q.removeChild(a), b
        }), bc = _(function(a) {
            return a.appendChild(p.createComment("")), a.getElementsByTagName("*").length === 0
        }), bd = _(function(a) {
            return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== r && a.firstChild.getAttribute("href") === "#"
        }), be = _(function(a) {
            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !a.getElementsByClassName || a.getElementsByClassName("e").length === 0 ? !1 : (a.lastChild.className = "e", a.getElementsByClassName("e").length !== 1)
        }), bf = function(a, b, c, d) {
            c = c || [], b = b || p;
            var e, f, g, h, i = b.nodeType;
            if (i !== 1 && i !== 9)
                return [];
            if (!a || typeof a != "string")
                return c;
            g = bi(b);
            if (!g && !d)
                if (e = M.exec(a))
                    if (h = e[1]) {
                        if (i === 9) {
                            f = b.getElementById(h);
                            if (!f || !f.parentNode)
                                return c;
                            if (f.id === h)
                                return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && bj(b, f) && f.id === h)
                            return c.push(f), c
                    } else {
                        if (e[2])
                            return w.apply(c, v.call(b.getElementsByTagName(a), 0)), c;
                        if ((h = e[3]) && be && b.getElementsByClassName)
                            return w.apply(c, v.call(b.getElementsByClassName(h), 0)), c
                    }
            return bm(a, b, c, d, g)
        }, bg = bf.selectors = {cacheLength: 50,match: S,order: ["ID", "TAG"],attrHandle: {},createPseudo: X,find: {ID: o ? function(a, b, c) {
                    if (typeof b.getElementById !== r && !c) {
                        var d = b.getElementById(a);
                        return d && d.parentNode ? [d] : []
                    }
                } : function(a, c, d) {
                    if (typeof c.getElementById !== r && !d) {
                        var e = c.getElementById(a);
                        return e ? e.id === a || typeof e.getAttributeNode !== r && e.getAttributeNode("id").value === a ? [e] : b : []
                    }
                },TAG: bc ? function(a, b) {
                    if (typeof b.getElementsByTagName !== r)
                        return b.getElementsByTagName(a)
                } : function(a, b) {
                    var c = b.getElementsByTagName(a);
                    if (a === "*") {
                        var d, e = [], f = 0;
                        for (; d = c[f]; f++)
                            d.nodeType === 1 && e.push(d);
                        return e
                    }
                    return c
                }},relative: {">": {dir: "parentNode",first: !0}," ": {dir: "parentNode"},"+": {dir: "previousSibling",first: !0},"~": {dir: "previousSibling"}},preFilter: {ATTR: function(a) {
                    return a[1] = a[1].replace(R, ""), a[3] = (a[4] || a[5] || "").replace(R, ""), a[2] === "~=" && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), a[1] === "nth" ? (a[2] || bf.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")), a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && bf.error(a[0]), a
                },PSEUDO: function(a) {
                    var b, c = a[4];
                    return S.CHILD.test(a[0]) ? null : (c && (b = K.exec(c)) && b.pop() && (a[0] = a[0].slice(0, b[0].length - c.length - 1), c = b[0].slice(0, -1)), a.splice(2, 3, c || a[3]), a)
                }},filter: {ID: o ? function(a) {
                    return a = a.replace(R, ""), function(b) {
                        return b.getAttribute("id") === a
                    }
                } : function(a) {
                    return a = a.replace(R, ""), function(b) {
                        var c = typeof b.getAttributeNode !== r && b.getAttributeNode("id");
                        return c && c.value === a
                    }
                },TAG: function(a) {
                    return a === "*" ? function() {
                        return !0
                    } : (a = a.replace(R, "").toLowerCase(), function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a
                    })
                },CLASS: function(a) {
                    var b = T[a];
                    return b || (b = T[a] = new RegExp("(^|" + y + ")" + a + "(" + y + "|$)"), U.push(a), U.length > bg.cacheLength && delete T[U.shift()]), function(a) {
                        return b.test(a.className || typeof a.getAttribute !== r && a.getAttribute("class") || "")
                    }
                },ATTR: function(a, b, c) {
                    return b ? function(d) {
                        var e = bf.attr(d, a), f = e + "";
                        if (e == null)
                            return b === "!=";
                        switch (b) {
                            case "=":
                                return f === c;
                            case "!=":
                                return f !== c;
                            case "^=":
                                return c && f.indexOf(c) === 0;
                            case "*=":
                                return c && f.indexOf(c) > -1;
                            case "$=":
                                return c && f.substr(f.length - c.length) === c;
                            case "~=":
                                return (" " + f + " ").indexOf(c) > -1;
                            case "|=":
                                return f === c || f.substr(0, c.length + 1) === c + "-"
                        }
                    } : function(b) {
                        return bf.attr(b, a) != null
                    }
                },CHILD: function(a, b, c, d) {
                    if (a === "nth") {
                        var e = u++;
                        return function(a) {
                            var b, f, g = 0, h = a;
                            if (c === 1 && d === 0)
                                return !0;
                            b = a.parentNode;
                            if (b && (b[x] !== e || !a.sizset)) {
                                for (h = b.firstChild; h; h = h.nextSibling)
                                    if (h.nodeType === 1) {
                                        h.sizset = ++g;
                                        if (h === a)
                                            break
                                    }
                                b[x] = e
                            }
                            return f = a.sizset - d, c === 0 ? f === 0 : f % c === 0 && f / c >= 0
                        }
                    }
                    return function(b) {
                        var c = b;
                        switch (a) {
                            case "only":
                            case "first":
                                while (c = c.previousSibling)
                                    if (c.nodeType === 1)
                                        return !1;
                                if (a === "first")
                                    return !0;
                                c = b;
                            case "last":
                                while (c = c.nextSibling)
                                    if (c.nodeType === 1)
                                        return !1;
                                return !0
                        }
                    }
                },PSEUDO: function(a, b, c, d) {
                    var e = bg.pseudos[a] || bg.pseudos[a.toLowerCase()];
                    return e || bf.error("unsupported pseudo: " + a), e.sizzleFilter ? e(b, c, d) : e
                }},pseudos: {not: X(function(a, b, c) {
                    var d = bl(a.replace(H, "$1"), b, c);
                    return function(a) {
                        return !d(a)
                    }
                }),enabled: function(a) {
                    return a.disabled === !1
                },disabled: function(a) {
                    return a.disabled === !0
                },checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && !!a.checked || b === "option" && !!a.selected
                },selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },parent: function(a) {
                    return !bg.pseudos.empty(a)
                },empty: function(a) {
                    var b;
                    a = a.firstChild;
                    while (a) {
                        if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4)
                            return !1;
                        a = a.nextSibling
                    }
                    return !0
                },contains: X(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || bk(b)).indexOf(a) > -1
                    }
                }),has: X(function(a) {
                    return function(b) {
                        return bf(a, b).length > 0
                    }
                }),header: function(a) {
                    return P.test(a.nodeName)
                },text: function(a) {
                    var b, c;
                    return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b)
                },radio: Y("radio"),checkbox: Y("checkbox"),file: Y("file"),password: Y("password"),image: Y("image"),submit: Z("submit"),reset: Z("reset"),button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && a.type === "button" || b === "button"
                },input: function(a) {
                    return Q.test(a.nodeName)
                },focus: function(a) {
                    var b = a.ownerDocument;
                    return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && (!!a.type || !!a.href)
                },active: function(a) {
                    return a === a.ownerDocument.activeElement
                }},setFilters: {first: function(a, b, c) {
                    return c ? a.slice(1) : [a[0]]
                },last: function(a, b, c) {
                    var d = a.pop();
                    return c ? a : [d]
                },even: function(a, b, c) {
                    var d = [], e = c ? 1 : 0, f = a.length;
                    for (; e < f; e = e + 2)
                        d.push(a[e]);
                    return d
                },odd: function(a, b, c) {
                    var d = [], e = c ? 0 : 1, f = a.length;
                    for (; e < f; e = e + 2)
                        d.push(a[e]);
                    return d
                },lt: function(a, b, c) {
                    return c ? a.slice(+b) : a.slice(0, +b)
                },gt: function(a, b, c) {
                    return c ? a.slice(0, +b + 1) : a.slice(+b + 1)
                },eq: function(a, b, c) {
                    var d = a.splice(+b, 1);
                    return c ? a : d
                }}};
        bg.setFilters.nth = bg.setFilters.eq, bg.filters = bg.pseudos, bd || (bg.attrHandle = {href: function(a) {
                return a.getAttribute("href", 2)
            },type: function(a) {
                return a.getAttribute("type")
            }}), bb && (bg.order.push("NAME"), bg.find.NAME = function(a, b) {
            if (typeof b.getElementsByName !== r)
                return b.getElementsByName(a)
        }), be && (bg.order.splice(1, 0, "CLASS"), bg.find.CLASS = function(a, b, c) {
            if (typeof b.getElementsByClassName !== r && !c)
                return b.getElementsByClassName(a)
        });
        try {
            v.call(q.childNodes, 0)[0].nodeType
        } catch (bh) {
            v = function(a) {
                var b, c = [];
                for (; b = this[a]; a++)
                    c.push(b);
                return c
            }
        }
        var bi = bf.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        }, bj = bf.contains = q.compareDocumentPosition ? function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : q.contains ? function(a, b) {
            var c = a.nodeType === 9 ? a.documentElement : a, d = b.parentNode;
            return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d))
        } : function(a, b) {
            while (b = b.parentNode)
                if (b === a)
                    return !0;
            return !1
        }, bk = bf.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (e === 1 || e === 9 || e === 11) {
                    if (typeof a.textContent == "string")
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        c += bk(a)
                } else if (e === 3 || e === 4)
                    return a.nodeValue
            } else
                for (; b = a[d]; d++)
                    c += bk(b);
            return c
        };
        bf.attr = function(a, b) {
            var c, d = bi(a);
            return d || (b = b.toLowerCase()), bg.attrHandle[b] ? bg.attrHandle[b](a) : ba || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null)
        }, bf.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, [0, 0].sort(function() {
            return t = 0
        }), q.compareDocumentPosition ? m = function(a, b) {
            return a === b ? (s = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
        } : (m = function(a, b) {
            if (a === b)
                return s = !0, 0;
            if (a.sourceIndex && b.sourceIndex)
                return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, h = b.parentNode, i = g;
            if (g === h)
                return n(a, b);
            if (!g)
                return -1;
            if (!h)
                return 1;
            while (i)
                e.unshift(i), i = i.parentNode;
            i = h;
            while (i)
                f.unshift(i), i = i.parentNode;
            c = e.length, d = f.length;
            for (var j = 0; j < c && j < d; j++)
                if (e[j] !== f[j])
                    return n(e[j], f[j]);
            return j === c ? n(a, f[j], -1) : n(e[j], b, 1)
        }, n = function(a, b, c) {
            if (a === b)
                return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b)
                    return -1;
                d = d.nextSibling
            }
            return 1
        }), bf.uniqueSort = function(a) {
            var b, c = 1;
            if (m) {
                s = t, a.sort(m);
                if (s)
                    for (; b = a[c]; c++)
                        b === a[c - 1] && a.splice(c--, 1)
            }
            return a
        };
        var bl = bf.compile = function(a, b, c) {
            var d, e, g, h = V[a];
            if (h && h.context === b)
                return h;
            e = f(a, b, c);
            for (g = 0; d = e[g]; g++)
                e[g] = i(d, b, c);
            return h = V[a] = j(e), h.context = b, h.runs = h.dirruns = 0, W.push(a), W.length > bg.cacheLength && delete V[W.shift()], h
        };
        bf.matches = function(a, b) {
            return bf(a, null, null, b)
        }, bf.matchesSelector = function(a, b) {
            return bf(b, null, null, [a]).length > 0
        };
        var bm = function(a, b, c, d, f) {
            a = a.replace(H, "$1");
            var g, h, i, j, m, n, o, p, q, r = a.match(J), s = a.match(L), t = b.nodeType;
            if (S.POS.test(a))
                return e(a, b, c, d, r);
            if (d)
                g = v.call(d, 0);
            else if (r && r.length === 1) {
                if (s.length > 1 && t === 9 && !f && (r = S.ID.exec(s[0]))) {
                    b = bg.find.ID(r[1], b, f)[0];
                    if (!b)
                        return c;
                    a = a.slice(s.shift().length)
                }
                p = (r = N.exec(s[0])) && !r.index && b.parentNode || b, q = s.pop(), n = q.split(":not")[0];
                for (i = 0, j = bg.order.length; i < j; i++) {
                    o = bg.order[i];
                    if (r = S[o].exec(n)) {
                        g = bg.find[o]((r[1] || "").replace(R, ""), p, f);
                        if (g == null)
                            continue;
                        n === q && (a = a.slice(0, a.length - q.length) + n.replace(S[o], ""), a || w.apply(c, v.call(g, 0)));
                        break
                    }
                }
            }
            if (a) {
                h = bl(a, b, f), l = h.dirruns++, g == null && (g = bg.find.TAG("*", N.test(a) && b.parentNode || b));
                for (i = 0; m = g[i]; i++)
                    k = h.runs++, h(m, b) && c.push(m)
            }
            return c
        };
        p.querySelectorAll && function() {
            var a, b = bm, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [], f = [":active"], g = q.matchesSelector || q.mozMatchesSelector || q.webkitMatchesSelector || q.oMatchesSelector || q.msMatchesSelector;
            _(function(a) {
                a.innerHTML = "<select><option selected></option></select>", a.querySelectorAll("[selected]").length || e.push("\\[" + y + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || e.push(":checked")
            }), _(function(a) {
                a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + y + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'>", a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled")
            }), e = e.length && new RegExp(e.join("|")), bm = function(a, d, f, g, h) {
                if (!g && !h && (!e || !e.test(a)))
                    if (d.nodeType === 9)
                        try {
                            return w.apply(f, v.call(d.querySelectorAll(a), 0)), f
                        } catch (i) {
                        }
                    else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
                        var j = d.getAttribute("id"), k = j || x, l = N.test(a) && d.parentNode || d;
                        j ? k = k.replace(c, "\\$&") : d.setAttribute("id", k);
                        try {
                            return w.apply(f, v.call(l.querySelectorAll(a.replace(J, "[id='" + k + "'] $&")), 0)), f
                        } catch (i) {
                        }finally {
                            j || d.removeAttribute("id")
                        }
                    }
                return b(a, d, f, g, h)
            }, g && (_(function(b) {
                a = g.call(b, "div");
                try {
                    g.call(b, "[test!='']:sizzle"), f.push(bg.match.PSEUDO)
                } catch (c) {
                }
            }), f = new RegExp(f.join("|")), bf.matchesSelector = function(b, c) {
                c = c.replace(d, "='$1']");
                if (!bi(b) && !f.test(c) && (!e || !e.test(c)))
                    try {
                        var h = g.call(b, c);
                        if (h || a || b.document && b.document.nodeType !== 11)
                            return h
                    } catch (i) {
                    }
                return bf(c, null, null, [b]).length > 0
            })
        }(), bf.attr = $.attr, $.find = bf, $.expr = bf.selectors, $.expr[":"] = $.expr.pseudos, $.unique = bf.uniqueSort, $.text = bf.getText, $.isXMLDoc = bf.isXML, $.contains = bf.contains
    }(a);
    var bI = /Until$/, bJ = /^(?:parents|prev(?:Until|All))/, bK = /^.[^:#\[\.,]*$/, bL = $.expr.match.needsContext, bM = {children: !0,contents: !0,next: !0,prev: !0};
    $.fn.extend({find: function(a) {
            var b, c, d, e, f, g, h = this;
            if (typeof a != "string")
                return $(a).filter(function() {
                    for (b = 0, c = h.length; b < c; b++)
                        if ($.contains(h[b], this))
                            return !0
                });
            g = this.pushStack("", "find", a);
            for (b = 0, c = this.length; b < c; b++) {
                d = g.length, $.find(a, this[b], g);
                if (b > 0)
                    for (e = d; e < g.length; e++)
                        for (f = 0; f < d; f++)
                            if (g[f] === g[e]) {
                                g.splice(e--, 1);
                                break
                            }
            }
            return g
        },has: function(a) {
            var b, c = $(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; b < d; b++)
                    if ($.contains(this, c[b]))
                        return !0
            })
        },not: function(a) {
            return this.pushStack(j(this, a, !1), "not", a)
        },filter: function(a) {
            return this.pushStack(j(this, a, !0), "filter", a)
        },is: function(a) {
            return !!a && (typeof a == "string" ? bL.test(a) ? $(a, this.context).index(this[0]) >= 0 : $.filter(a, this).length > 0 : this.filter(a).length > 0)
        },closest: function(a, b) {
            var c, d = 0, e = this.length, f = [], g = bL.test(a) || typeof a != "string" ? $(a, b || this.context) : 0;
            for (; d < e; d++) {
                c = this[d];
                while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
                    if (g ? g.index(c) > -1 : $.find.matchesSelector(c, a)) {
                        f.push(c);
                        break
                    }
                    c = c.parentNode
                }
            }
            return f = f.length > 1 ? $.unique(f) : f, this.pushStack(f, "closest", a)
        },index: function(a) {
            return a ? typeof a == "string" ? $.inArray(this[0], $(a)) : $.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },add: function(a, b) {
            var c = typeof a == "string" ? $(a, b) : $.makeArray(a && a.nodeType ? [a] : a), d = $.merge(this.get(), c);
            return this.pushStack(h(c[0]) || h(d[0]) ? d : $.unique(d))
        },addBack: function(a) {
            return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
        }}), $.fn.andSelf = $.fn.addBack, $.each({parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },parents: function(a) {
            return $.dir(a, "parentNode")
        },parentsUntil: function(a, b, c) {
            return $.dir(a, "parentNode", c)
        },next: function(a) {
            return i(a, "nextSibling")
        },prev: function(a) {
            return i(a, "previousSibling")
        },nextAll: function(a) {
            return $.dir(a, "nextSibling")
        },prevAll: function(a) {
            return $.dir(a, "previousSibling")
        },nextUntil: function(a, b, c) {
            return $.dir(a, "nextSibling", c)
        },prevUntil: function(a, b, c) {
            return $.dir(a, "previousSibling", c)
        },siblings: function(a) {
            return $.sibling((a.parentNode || {}).firstChild, a)
        },children: function(a) {
            return $.sibling(a.firstChild)
        },contents: function(a) {
            return $.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : $.merge([], a.childNodes)
        }}, function(a, b) {
        $.fn[a] = function(c, d) {
            var e = $.map(this, b, c);
            return bI.test(a) || (d = c), d && typeof d == "string" && (e = $.filter(d, e)), e = this.length > 1 && !bM[a] ? $.unique(e) : e, this.length > 1 && bJ.test(a) && (e = e.reverse()), this.pushStack(e, a, V.call(arguments).join(","))
        }
    }), $.extend({filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"), b.length === 1 ? $.find.matchesSelector(b[0], a) ? [b[0]] : [] : $.find.matches(a, b)
        },dir: function(a, c, d) {
            var e = [], f = a[c];
            while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !$(f).is(d)))
                f.nodeType === 1 && e.push(f), f = f[c];
            return e
        },sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling)
                a.nodeType === 1 && a !== b && c.push(a);
            return c
        }});
    var bN = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", bO = / jQuery\d+="(?:null|\d+)"/g, bP = /^\s+/, bQ = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bR = /<([\w:]+)/, bS = /<tbody/i, bT = /<|&#?\w+;/, bU = /<(?:script|style|link)/i, bV = /<(?:script|object|embed|option|style)/i, bW = new RegExp("<(?:" + bN + ")[\\s/>]", "i"), bX = /^(?:checkbox|radio)$/, bY = /checked\s*(?:[^=]|=\s*.checked.)/i, bZ = /\/(java|ecma)script/i, b$ = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, b_ = {option: [1, "<select multiple='multiple'>", "</select>"],legend: [1, "<fieldset>", "</fieldset>"],thead: [1, "<table>", "</table>"],tr: [2, "<table><tbody>", "</tbody></table>"],td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],area: [1, "<map>", "</map>"],_default: [0, "", ""]}, ca = k(P), cb = ca.appendChild(P.createElement("div"));
    b_.optgroup = b_.option, b_.tbody = b_.tfoot = b_.colgroup = b_.caption = b_.thead, b_.th = b_.td, $.support.htmlSerialize || (b_._default = [1, "X<div>", "</div>"]), $.fn.extend({text: function(a) {
            return $.access(this, function(a) {
                return a === b ? $.text(this) : this.empty().append((this[0] && this[0].ownerDocument || P).createTextNode(a))
            }, null, a, arguments.length)
        },wrapAll: function(a) {
            if ($.isFunction(a))
                return this.each(function(b) {
                    $(this).wrapAll(a.call(this, b))
                });
            if (this[0]) {
                var b = $(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1)
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },wrapInner: function(a) {
            return $.isFunction(a) ? this.each(function(b) {
                $(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = $(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },wrap: function(a) {
            var b = $.isFunction(a);
            return this.each(function(c) {
                $(this).wrapAll(b ? a.call(this, c) : a)
            })
        },unwrap: function() {
            return this.parent().each(function() {
                $.nodeName(this, "body") || $(this).replaceWith(this.childNodes)
            }).end()
        },append: function() {
            return this.domManip(arguments, !0, function(a) {
                (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a)
            })
        },prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild)
            })
        },before: function() {
            if (!h(this[0]))
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this)
                });
            if (arguments.length) {
                var a = $.clean(arguments);
                return this.pushStack($.merge(a, this), "before", this.selector)
            }
        },after: function() {
            if (!h(this[0]))
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                });
            if (arguments.length) {
                var a = $.clean(arguments);
                return this.pushStack($.merge(this, a), "after", this.selector)
            }
        },remove: function(a, b) {
            var c, d = 0;
            for (; (c = this[d]) != null; d++)
                if (!a || $.filter(a, [c]).length)
                    !b && c.nodeType === 1 && ($.cleanData(c.getElementsByTagName("*")), $.cleanData([c])), c.parentNode && c.parentNode.removeChild(c);
            return this
        },empty: function() {
            var a, b = 0;
            for (; (a = this[b]) != null; b++) {
                a.nodeType === 1 && $.cleanData(a.getElementsByTagName("*"));
                while (a.firstChild)
                    a.removeChild(a.firstChild)
            }
            return this
        },clone: function(a, b) {
            return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                return $.clone(this, a, b)
            })
        },html: function(a) {
            return $.access(this, function(a) {
                var c = this[0] || {}, d = 0, e = this.length;
                if (a === b)
                    return c.nodeType === 1 ? c.innerHTML.replace(bO, "") : b;
                if (typeof a == "string" && !bU.test(a) && ($.support.htmlSerialize || !bW.test(a)) && ($.support.leadingWhitespace || !bP.test(a)) && !b_[(bR.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(bQ, "<$1></$2>");
                    try {
                        for (; d < e; d++)
                            c = this[d] || {}, c.nodeType === 1 && ($.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                        c = 0
                    } catch (f) {
                    }
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        },replaceWith: function(a) {
            return h(this[0]) ? this.length ? this.pushStack($($.isFunction(a) ? a() : a), "replaceWith", a) : this : $.isFunction(a) ? this.each(function(b) {
                var c = $(this), d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : (typeof a != "string" && (a = $(a).detach()), this.each(function() {
                var b = this.nextSibling, c = this.parentNode;
                $(this).remove(), b ? $(b).before(a) : $(c).append(a)
            }))
        },detach: function(a) {
            return this.remove(a, !0)
        },domManip: function(a, c, d) {
            a = [].concat.apply([], a);
            var e, f, g, h, i = 0, j = a[0], k = [], m = this.length;
            if (!$.support.checkClone && m > 1 && typeof j == "string" && bY.test(j))
                return this.each(function() {
                    $(this).domManip(a, c, d)
                });
            if ($.isFunction(j))
                return this.each(function(e) {
                    var f = $(this);
                    a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
                });
            if (this[0]) {
                e = $.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, g.childNodes.length === 1 && (g = f);
                if (f) {
                    c = c && $.nodeName(f, "tr");
                    for (h = e.cacheable || m - 1; i < m; i++)
                        d.call(c && $.nodeName(this[i], "table") ? l(this[i], "tbody") : this[i], i === h ? g : $.clone(g, !0, !0))
                }
                g = f = null, k.length && $.each(k, function(a, b) {
                    b.src ? $.ajax ? $.ajax({url: b.src,type: "GET",dataType: "script",async: !1,global: !1,"throws": !0}) : $.error("no ajax") : $.globalEval((b.text || b.textContent || b.innerHTML || "").replace(b$, "")), b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }}), $.buildFragment = function(a, c, d) {
        var e, f, g, h = a[0];
        return c = c || P, c = (c[0] || c).ownerDocument || c[0] || c, typeof c.createDocumentFragment == "undefined" && (c = P), a.length === 1 && typeof h == "string" && h.length < 512 && c === P && h.charAt(0) === "<" && !bV.test(h) && ($.support.checkClone || !bY.test(h)) && ($.support.html5Clone || !bW.test(h)) && (f = !0, e = $.fragments[h], g = e !== b), e || (e = c.createDocumentFragment(), $.clean(a, c, e, d), f && ($.fragments[h] = g && e)), {fragment: e,cacheable: f}
    }, $.fragments = {}, $.each({appendTo: "append",prependTo: "prepend",insertBefore: "before",insertAfter: "after",replaceAll: "replaceWith"}, function(a, b) {
        $.fn[a] = function(c) {
            var d, e = 0, f = [], g = $(c), h = g.length, i = this.length === 1 && this[0].parentNode;
            if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1)
                return g[b](this[0]), this;
            for (; e < h; e++)
                d = (e > 0 ? this.clone(!0) : this).get(), $(g[e])[b](d), f = f.concat(d);
            return this.pushStack(f, a, g.selector)
        }
    }), $.extend({clone: function(a, b, c) {
            var d, e, f, g;
            $.support.html5Clone || $.isXMLDoc(a) || !bW.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (cb.innerHTML = a.outerHTML, cb.removeChild(g = cb.firstChild));
            if ((!$.support.noCloneEvent || !$.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !$.isXMLDoc(a)) {
                n(a, g), d = o(a), e = o(g);
                for (f = 0; d[f]; ++f)
                    e[f] && n(d[f], e[f])
            }
            if (b) {
                m(a, g);
                if (c) {
                    d = o(a), e = o(g);
                    for (f = 0; d[f]; ++f)
                        m(d[f], e[f])
                }
            }
            return d = e = null, g
        },clean: function(a, b, c, d) {
            var e, f, g, h, i, j, l, m, n, o, q, r, s = 0, t = [];
            if (!b || typeof b.createDocumentFragment == "undefined")
                b = P;
            for (f = b === P && ca; (g = a[s]) != null; s++) {
                typeof g == "number" && (g += "");
                if (!g)
                    continue;
                if (typeof g == "string")
                    if (!bT.test(g))
                        g = b.createTextNode(g);
                    else {
                        f = f || k(b), l = l || f.appendChild(b.createElement("div")), g = g.replace(bQ, "<$1></$2>"), h = (bR.exec(g) || ["", ""])[1].toLowerCase(), i = b_[h] || b_._default, j = i[0], l.innerHTML = i[1] + g + i[2];
                        while (j--)
                            l = l.lastChild;
                        if (!$.support.tbody) {
                            m = bS.test(g), n = h === "table" && !m ? l.firstChild && l.firstChild.childNodes : i[1] === "<table>" && !m ? l.childNodes : [];
                            for (e = n.length - 1; e >= 0; --e)
                                $.nodeName(n[e], "tbody") && !n[e].childNodes.length && n[e].parentNode.removeChild(n[e])
                        }
                        !$.support.leadingWhitespace && bP.test(g) && l.insertBefore(b.createTextNode(bP.exec(g)[0]), l.firstChild), g = l.childNodes, l = f.lastChild
                    }
                g.nodeType ? t.push(g) : t = $.merge(t, g)
            }
            l && (f.removeChild(l), g = l = f = null);
            if (!$.support.appendChecked)
                for (s = 0; (g = t[s]) != null; s++)
                    $.nodeName(g, "input") ? p(g) : typeof g.getElementsByTagName != "undefined" && $.grep(g.getElementsByTagName("input"), p);
            if (c) {
                q = function(a) {
                    if (!a.type || bZ.test(a.type))
                        return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a)
                };
                for (s = 0; (g = t[s]) != null; s++)
                    if (!$.nodeName(g, "script") || !q(g))
                        c.appendChild(g), typeof g.getElementsByTagName != "undefined" && (r = $.grep($.merge([], g.getElementsByTagName("script")), q), t.splice.apply(t, [s + 1, 0].concat(r)), s += r.length)
            }
            return t
        },cleanData: function(a, b) {
            var c, d, e, f, g = 0, h = $.expando, i = $.cache, j = $.support.deleteExpando, k = $.event.special;
            for (; (e = a[g]) != null; g++)
                if (b || $.acceptData(e)) {
                    d = e[h], c = d && i[d];
                    if (c) {
                        if (c.events)
                            for (f in c.events)
                                k[f] ? $.event.remove(e, f) : $.removeEvent(e, f, c.handle);
                        i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, $.deletedIds.push(d))
                    }
                }
        }}), function() {
        var a, b;
        $.uaMatch = function(a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {browser: b[1] || "",version: b[2] || "0"}
        }, a = $.uaMatch(R.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.webkit && (b.safari = !0), $.browser = b, $.sub = function() {
            function a(b, c) {
                return new a.fn.init(b, c)
            }
            $.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function c(c, d) {
                return d && d instanceof $ && !(d instanceof a) && (d = a(d)), $.fn.init.call(this, c, d, b)
            }, a.fn.init.prototype = a.fn;
            var b = a(P);
            return a
        }
    }();
    var cc, cd, ce, cf = /alpha\([^)]*\)/i, cg = /opacity=([^)]*)/, ch = /^(top|right|bottom|left)$/, ci = /^margin/, cj = new RegExp("^(" + _ + ")(.*)$", "i"), ck = new RegExp("^(" + _ + ")(?!px)[a-z%]+$", "i"), cl = new RegExp("^([-+])=(" + _ + ")", "i"), cm = {}, cn = {position: "absolute",visibility: "hidden",display: "block"}, co = {letterSpacing: 0,fontWeight: 400,lineHeight: 1}, cp = ["Top", "Right", "Bottom", "Left"], cq = ["Webkit", "O", "Moz", "ms"], cr = $.fn.toggle;
    $.fn.extend({css: function(a, c) {
            return $.access(this, function(a, c, d) {
                return d !== b ? $.style(a, c, d) : $.css(a, c)
            }, a, c, arguments.length > 1)
        },show: function() {
            return s(this, !0)
        },hide: function() {
            return s(this)
        },toggle: function(a, b) {
            var c = typeof a == "boolean";
            return $.isFunction(a) && $.isFunction(b) ? cr.apply(this, arguments) : this.each(function() {
                (c ? a : r(this)) ? $(this).show() : $(this).hide()
            })
        }}), $.extend({cssHooks: {opacity: {get: function(a, b) {
                    if (b) {
                        var c = cc(a, "opacity");
                        return c === "" ? "1" : c
                    }
                }}},cssNumber: {fillOpacity: !0,fontWeight: !0,lineHeight: !0,opacity: !0,orphans: !0,widows: !0,zIndex: !0,zoom: !0},cssProps: {"float": $.support.cssFloat ? "cssFloat" : "styleFloat"},style: function(a, c, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)
                return;
            var f, g, h, i = $.camelCase(c), j = a.style;
            c = $.cssProps[i] || ($.cssProps[i] = q(j, i)), h = $.cssHooks[c] || $.cssHooks[i];
            if (d === b)
                return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
            g = typeof d, g === "string" && (f = cl.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat($.css(a, c)), g = "number");
            if (d == null || g === "number" && isNaN(d))
                return;
            g === "number" && !$.cssNumber[i] && (d += "px");
            if (!h || !("set" in h) || (d = h.set(a, d, e)) !== b)
                try {
                    j[c] = d
                } catch (k) {
                }
        },css: function(a, c, d, e) {
            var f, g, h, i = $.camelCase(c);
            return c = $.cssProps[i] || ($.cssProps[i] = q(a.style, i)), h = $.cssHooks[c] || $.cssHooks[i], h && "get" in h && (f = h.get(a, !0, e)), f === b && (f = cc(a, c)), f === "normal" && c in co && (f = co[c]), d || e !== b ? (g = parseFloat(f), d || $.isNumeric(g) ? g || 0 : f) : f
        },swap: function(a, b, c) {
            var d, e, f = {};
            for (e in b)
                f[e] = a.style[e], a.style[e] = b[e];
            d = c.call(a);
            for (e in b)
                a.style[e] = f[e];
            return d
        }}), a.getComputedStyle ? cc = function(a, b) {
        var c, d, e, f, g = getComputedStyle(a, null), h = a.style;
        return g && (c = g[b], c === "" && !$.contains(a.ownerDocument.documentElement, a) && (c = $.style(a, b)), ck.test(c) && ci.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = c, c = g.width, h.width = d, h.minWidth = e, h.maxWidth = f)), c
    } : P.documentElement.currentStyle && (cc = function(a, b) {
        var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
        return e == null && f && f[b] && (e = f[b]), ck.test(e) && !ch.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), e === "" ? "auto" : e
    }), $.each(["height", "width"], function(a, b) {
        $.cssHooks[b] = {get: function(a, c, d) {
                if (c)
                    return a.offsetWidth !== 0 || cc(a, "display") !== "none" ? v(a, b, d) : $.swap(a, cn, function() {
                        return v(a, b, d)
                    })
            },set: function(a, c, d) {
                return t(a, c, d ? u(a, b, d, $.support.boxSizing && $.css(a, "boxSizing") === "border-box") : 0)
            }}
    }), $.support.opacity || ($.cssHooks.opacity = {get: function(a, b) {
            return cg.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = $.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && $.trim(f.replace(cf, "")) === "" && c.removeAttribute) {
                c.removeAttribute("filter");
                if (d && !d.filter)
                    return
            }
            c.filter = cf.test(f) ? f.replace(cf, e) : f + " " + e
        }}), $(function() {
        $.support.reliableMarginRight || ($.cssHooks.marginRight = {get: function(a, b) {
                return $.swap(a, {display: "inline-block"}, function() {
                    if (b)
                        return cc(a, "marginRight")
                })
            }}), !$.support.pixelPosition && $.fn.position && $.each(["top", "left"], function(a, b) {
            $.cssHooks[b] = {get: function(a, c) {
                    if (c) {
                        var d = cc(a, b);
                        return ck.test(d) ? $(a).position()[b] + "px" : d
                    }
                }}
        })
    }), $.expr && $.expr.filters && ($.expr.filters.hidden = function(a) {
        return a.offsetWidth === 0 && a.offsetHeight === 0 || !$.support.reliableHiddenOffsets && (a.style && a.style.display || cc(a, "display")) === "none"
    }, $.expr.filters.visible = function(a) {
        return !$.expr.filters.hidden(a)
    }), $.each({margin: "",padding: "",border: "Width"}, function(a, b) {
        $.cssHooks[a + b] = {expand: function(c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
                for (d = 0; d < 4; d++)
                    f[a + cp[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }}, ci.test(a) || ($.cssHooks[a + b].set = t)
    });
    var cs = /%20/g, ct = /\[\]$/, cu = /\r?\n/g, cv = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, cw = /^(?:select|textarea)/i;
    $.fn.extend({serialize: function() {
            return $.param(this.serializeArray())
        },serializeArray: function() {
            return this.map(function() {
                return this.elements ? $.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || cw.test(this.nodeName) || cv.test(this.type))
            }).map(function(a, b) {
                var c = $(this).val();
                return c == null ? null : $.isArray(c) ? $.map(c, function(a, c) {
                    return {name: b.name,value: a.replace(cu, "\r\n")}
                }) : {name: b.name,value: c.replace(cu, "\r\n")}
            }).get()
        }}), $.param = function(a, c) {
        var d, e = [], f = function(a, b) {
            b = $.isFunction(b) ? b() : b == null ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        c === b && (c = $.ajaxSettings && $.ajaxSettings.traditional);
        if ($.isArray(a) || a.jquery && !$.isPlainObject(a))
            $.each(a, function() {
                f(this.name, this.value)
            });
        else
            for (d in a)
                x(d, a[d], c, f);
        return e.join("&").replace(cs, "+")
    };
    var cx, cy, cz = /#.*$/, cA = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, cB = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, cC = /^(?:GET|HEAD)$/, cD = /^\/\//, cE = /\?/, cF = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, cG = /([?&])_=[^&]*/, cH = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, cI = $.fn.load, cJ = {}, cK = {}, cL = ["*/"] + ["*"];
    try {
        cx = Q.href
    } catch (cM) {
        cx = P.createElement("a"), cx.href = "", cx = cx.href
    }
    cy = cH.exec(cx.toLowerCase()) || [], $.fn.load = function(a, c, d) {
        if (typeof a != "string" && cI)
            return cI.apply(this, arguments);
        if (!this.length)
            return this;
        var e, f, g, h = this, i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), $.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (f = "POST"), $.ajax({url: a,type: f,dataType: "html",data: c,complete: function(a, b) {
                d && h.each(d, g || [a.responseText, b, a])
            }}).done(function(a) {
            g = arguments, h.html(e ? $("<div>").append(a.replace(cF, "")).find(e) : a)
        }), this
    }, $.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        $.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), $.each(["get", "post"], function(a, c) {
        $[c] = function(a, d, e, f) {
            return $.isFunction(d) && (f = f || e, e = d, d = b), $.ajax({type: c,url: a,data: d,success: e,dataType: f})
        }
    }), $.extend({getScript: function(a, c) {
            return $.get(a, b, c, "script")
        },getJSON: function(a, b, c) {
            return $.get(a, b, c, "json")
        },ajaxSetup: function(a, b) {
            return b ? A(a, $.ajaxSettings) : (b = a, a = $.ajaxSettings), A(a, b), a
        },ajaxSettings: {url: cx,isLocal: cB.test(cy[1]),global: !0,type: "GET",contentType: "application/x-www-form-urlencoded; charset=UTF-8",processData: !0,async: !0,accepts: {xml: "application/xml, text/xml",html: "text/html",text: "text/plain",json: "application/json, text/javascript","*": cL},contents: {xml: /xml/,html: /html/,json: /json/},responseFields: {xml: "responseXML",text: "responseText"},converters: {"* text": a.String,"text html": !0,"text json": $.parseJSON,"text xml": $.parseXML},flatOptions: {context: !0,url: !0}},ajaxPrefilter: y(cJ),ajaxTransport: y(cK),ajax: function(a, c) {
            function d(a, c, d, g) {
                var j, l, s, t, v, x = c;
                if (u === 2)
                    return;
                u = 2, i && clearTimeout(i), h = b, f = g || "", w.readyState = a > 0 ? 4 : 0, d && (t = B(m, w, d));
                if (a >= 200 && a < 300 || a === 304)
                    m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && ($.lastModified[e] = v), v = w.getResponseHeader("Etag"), v && ($.etag[e] = v)), a === 304 ? (x = "notmodified", j = !0) : (j = C(m, t), x = j.state, l = j.data, s = j.error, j = !s);
                else {
                    s = x;
                    if (!x || a)
                        x = "error", a < 0 && (a = 0)
                }
                w.status = a, w.statusText = "" + (c || x), j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, k && o.trigger("ajax" + (j ? "Success" : "Error"), [w, m, j ? l : s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --$.active || $.event.trigger("ajaxStop"))
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var e, f, g, h, i, j, k, l, m = $.ajaxSetup({}, c), n = m.context || m, o = n !== m && (n.nodeType || n instanceof $) ? $(n) : $.event, p = $.Deferred(), q = $.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {readyState: 0,setRequestHeader: function(a, b) {
                    if (!u) {
                        var c = a.toLowerCase();
                        a = t[c] = t[c] || a, s[a] = b
                    }
                    return this
                },getAllResponseHeaders: function() {
                    return u === 2 ? f : null
                },getResponseHeader: function(a) {
                    var c;
                    if (u === 2) {
                        if (!g) {
                            g = {};
                            while (c = cA.exec(f))
                                g[c[1].toLowerCase()] = c[2]
                        }
                        c = g[a.toLowerCase()]
                    }
                    return c === b ? null : c
                },overrideMimeType: function(a) {
                    return u || (m.mimeType = a), this
                },abort: function(a) {
                    return a = a || v, h && h.abort(a), d(0, a), this
                }};
            p.promise(w), w.success = w.done, w.error = w.fail, w.complete = q.add, w.statusCode = function(a) {
                if (a) {
                    var b;
                    if (u < 2)
                        for (b in a)
                            r[b] = [r[b], a[b]];
                    else
                        b = a[w.status], w.always(b)
                }
                return this
            }, m.url = ((a || m.url) + "").replace(cz, "").replace(cD, cy[1] + "//"), m.dataTypes = $.trim(m.dataType || "*").toLowerCase().split(bb), m.crossDomain == null && (j = cH.exec(m.url.toLowerCase()), m.crossDomain = !(!j || j[1] == cy[1] && j[2] == cy[2] && (j[3] || (j[1] === "http:" ? 80 : 443)) == (cy[3] || (cy[1] === "http:" ? 80 : 443)))), m.data && m.processData && typeof m.data != "string" && (m.data = $.param(m.data, m.traditional)), z(cJ, m, c, w);
            if (u === 2)
                return w;
            k = m.global, m.type = m.type.toUpperCase(), m.hasContent = !cC.test(m.type), k && $.active++ === 0 && $.event.trigger("ajaxStart");
            if (!m.hasContent) {
                m.data && (m.url += (cE.test(m.url) ? "&" : "?") + m.data, delete m.data), e = m.url;
                if (m.cache === !1) {
                    var x = $.now(), y = m.url.replace(cG, "$1_=" + x);
                    m.url = y + (y === m.url ? (cE.test(m.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), m.ifModified && (e = e || m.url, $.lastModified[e] && w.setRequestHeader("If-Modified-Since", $.lastModified[e]), $.etag[e] && w.setRequestHeader("If-None-Match", $.etag[e])), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + (m.dataTypes[0] !== "*" ? ", " + cL + "; q=0.01" : "") : m.accepts["*"]);
            for (l in m.headers)
                w.setRequestHeader(l, m.headers[l]);
            if (!m.beforeSend || m.beforeSend.call(n, w, m) !== !1 && u !== 2) {
                v = "abort";
                for (l in {success: 1,error: 1,complete: 1})
                    w[l](m[l]);
                h = z(cK, m, c, w);
                if (!h)
                    d(-1, "No Transport");
                else {
                    w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function() {
                        w.abort("timeout")
                    }, m.timeout));
                    try {
                        u = 1, h.send(s, d)
                    } catch (A) {
                        if (u < 2)
                            d(-1, A);
                        else
                            throw A
                    }
                }
                return w
            }
            return w.abort()
        },active: 0,lastModified: {},etag: {}});
    var cN = [], cO = /\?/, cP = /(=)\?(?=&|$)|\?\?/, cQ = $.now();
    $.ajaxSetup({jsonp: "callback",jsonpCallback: function() {
            var a = cN.pop() || $.expando + "_" + cQ++;
            return this[a] = !0, a
        }}), $.ajaxPrefilter("json jsonp", function(c, d, e) {
        var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && cP.test(j), m = k && !l && typeof i == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && cP.test(i);
        if (c.dataTypes[0] === "jsonp" || l || m)
            return f = c.jsonpCallback = $.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(cP, "$1" + f) : m ? c.data = i.replace(cP, "$1" + f) : k && (c.url += (cO.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
                return h || $.error(f + " was not called"), h[0]
            }, c.dataTypes[0] = "json", a[f] = function() {
                h = arguments
            }, e.always(function() {
                a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, cN.push(f)), h && $.isFunction(g) && g(h[0]), h = g = b
            }), "script"
    }), $.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents: {script: /javascript|ecmascript/},converters: {"text script": function(a) {
                return $.globalEval(a), a
            }}}), $.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), $.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var c, d = P.head || P.getElementsByTagName("head")[0] || P.documentElement;
            return {send: function(e, f) {
                    c = P.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function(a, e) {
                        if (e || !c.readyState || /loaded|complete/.test(c.readyState))
                            c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success")
                    }, d.insertBefore(c, d.firstChild)
                },abort: function() {
                    c && c.onload(0, 1)
                }}
        }
    });
    var cR, cS = a.ActiveXObject ? function() {
        for (var a in cR)
            cR[a](0, 1)
    } : !1, cT = 0;
    $.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && D() || E()
    } : D, function(a) {
        $.extend($.support, {ajax: !!a,cors: !!a && "withCredentials" in a})
    }($.ajaxSettings.xhr()), $.support.ajax && $.ajaxTransport(function(c) {
        if (!c.crossDomain || $.support.cors) {
            var d;
            return {send: function(e, f) {
                    var g, h, i = c.xhr();
                    c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async);
                    if (c.xhrFields)
                        for (h in c.xhrFields)
                            i[h] = c.xhrFields[h];
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e)
                            i.setRequestHeader(h, e[h])
                    } catch (j) {
                    }
                    i.send(c.hasContent && c.data || null), d = function(a, e) {
                        var h, j, k, l, m;
                        try {
                            if (d && (e || i.readyState === 4)) {
                                d = b, g && (i.onreadystatechange = $.noop, cS && delete cR[g]);
                                if (e)
                                    i.readyState !== 4 && i.abort();
                                else {
                                    h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m);
                                    try {
                                        l.text = i.responseText
                                    } catch (a) {
                                    }
                                    try {
                                        j = i.statusText
                                    } catch (n) {
                                        j = ""
                                    }
                                    !h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204)
                                }
                            }
                        } catch (o) {
                            e || f(-1, o)
                        }
                        l && f(h, j, l, k)
                    }, c.async ? i.readyState === 4 ? setTimeout(d, 0) : (g = ++cT, cS && (cR || (cR = {}, $(a).unload(cS)), cR[g] = d), i.onreadystatechange = d) : d()
                },abort: function() {
                    d && d(0, 1)
                }}
        }
    });
    var cU, cV, cW = /^(?:toggle|show|hide)$/, cX = new RegExp("^(?:([-+])=|)(" + _ + ")([a-z%]*)$", "i"), cY = /queueHooks$/, cZ = [J], c$ = {"*": [function(a, b) {
                var c, d, e, f = this.createTween(a, b), g = cX.exec(b), h = f.cur(), i = +h || 0, j = 1;
                if (g) {
                    c = +g[2], d = g[3] || ($.cssNumber[a] ? "" : "px");
                    if (d !== "px" && i) {
                        i = $.css(f.elem, a, !0) || c || 1;
                        do
                            e = j = j || ".5", i = i / j, $.style(f.elem, a, i + d), j = f.cur() / h;
                        while (j !== 1 && j !== e)
                    }
                    f.unit = d, f.start = i, f.end = g[1] ? i + (g[1] + 1) * c : c
                }
                return f
            }]};
    $.Animation = $.extend(H, {tweener: function(a, b) {
            $.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            var c, d = 0, e = a.length;
            for (; d < e; d++)
                c = a[d], c$[c] = c$[c] || [], c$[c].unshift(b)
        },prefilter: function(a, b) {
            b ? cZ.unshift(a) : cZ.push(a)
        }}), $.Tween = K, K.prototype = {constructor: K,init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || ($.cssNumber[c] ? "" : "px")
        },cur: function() {
            var a = K.propHooks[this.prop];
            return a && a.get ? a.get(this) : K.propHooks._default.get(this)
        },run: function(a) {
            var b, c = K.propHooks[this.prop];
            return this.pos = b = $.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration), this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this
        }}, K.prototype.init.prototype = K.prototype, K.propHooks = {_default: {get: function(a) {
                var b;
                return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = $.css(a.elem, a.prop, !1, ""), !b || b === "auto" ? 0 : b) : a.elem[a.prop]
            },set: function(a) {
                $.fx.step[a.prop] ? $.fx.step[a.prop](a) : a.elem.style && (a.elem.style[$.cssProps[a.prop]] != null || $.cssHooks[a.prop]) ? $.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }}}, K.propHooks.scrollTop = K.propHooks.scrollLeft = {set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }}, $.each(["toggle", "show", "hide"], function(a, b) {
        var c = $.fn[b];
        $.fn[b] = function(d, e, f) {
            return d == null || typeof d == "boolean" || !a && $.isFunction(d) && $.isFunction(e) ? c.apply(this, arguments) : this.animate(L(b, !0), d, e, f)
        }
    }), $.fn.extend({fadeTo: function(a, b, c, d) {
            return this.filter(r).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        },animate: function(a, b, c, d) {
            var e = $.isEmptyObject(a), f = $.speed(b, c, d), g = function() {
                var b = H(this, $.extend({}, a), f);
                e && b.stop(!0)
            };
            return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },stop: function(a, c, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop, b(d)
            };
            return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                var b = !0, c = a != null && a + "queueHooks", f = $.timers, g = $._data(this);
                if (c)
                    g[c] && g[c].stop && e(g[c]);
                else
                    for (c in g)
                        g[c] && g[c].stop && cY.test(c) && e(g[c]);
                for (c = f.length; c--; )
                    f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1));
                (b || !d) && $.dequeue(this, a)
            })
        }}), $.each({slideDown: L("show"),slideUp: L("hide"),slideToggle: L("toggle"),fadeIn: {opacity: "show"},fadeOut: {opacity: "hide"},fadeToggle: {opacity: "toggle"}}, function(a, b) {
        $.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), $.speed = function(a, b, c) {
        var d = a && typeof a == "object" ? $.extend({}, a) : {complete: c || !c && b || $.isFunction(a) && a,duration: a,easing: c && b || b && !$.isFunction(b) && b};
        d.duration = $.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in $.fx.speeds ? $.fx.speeds[d.duration] : $.fx.speeds._default;
        if (d.queue == null || d.queue === !0)
            d.queue = "fx";
        return d.old = d.complete, d.complete = function() {
            $.isFunction(d.old) && d.old.call(this), d.queue && $.dequeue(this, d.queue)
        }, d
    }, $.easing = {linear: function(a) {
            return a
        },swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }}, $.timers = [], $.fx = K.prototype.init, $.fx.tick = function() {
        var a, b = $.timers, c = 0;
        for (; c < b.length; c++)
            a = b[c], !a() && b[c] === a && b.splice(c--, 1);
        b.length || $.fx.stop()
    }, $.fx.timer = function(a) {
        a() && $.timers.push(a) && !cV && (cV = setInterval($.fx.tick, $.fx.interval))
    }, $.fx.interval = 13, $.fx.stop = function() {
        clearInterval(cV), cV = null
    }, $.fx.speeds = {slow: 600,fast: 200,_default: 400}, $.fx.step = {}, $.expr && $.expr.filters && ($.expr.filters.animated = function(a) {
        return $.grep($.timers, function(b) {
            return a === b.elem
        }).length
    });
    var c_ = /^(?:body|html)$/i;
    $.fn.offset = function(a) {
        if (arguments.length)
            return a === b ? this : this.each(function(b) {
                $.offset.setOffset(this, a, b)
            });
        var c, d, e, f, g, h, i, j, k, l, m = this[0], n = m && m.ownerDocument;
        if (!n)
            return;
        return (e = n.body) === m ? $.offset.bodyOffset(m) : (d = n.documentElement, $.contains(d, m) ? (c = m.getBoundingClientRect(), f = M(n), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, i = f.pageYOffset || d.scrollTop, j = f.pageXOffset || d.scrollLeft, k = c.top + i - g, l = c.left + j - h, {top: k,left: l}) : {top: 0,left: 0})
    }, $.offset = {bodyOffset: function(a) {
            var b = a.offsetTop, c = a.offsetLeft;
            return $.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat($.css(a, "marginTop")) || 0, c += parseFloat($.css(a, "marginLeft")) || 0), {top: b,left: c}
        },setOffset: function(a, b, c) {
            var d = $.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = $(a), f = e.offset(), g = $.css(a, "top"), h = $.css(a, "left"), i = (d === "absolute" || d === "fixed") && $.inArray("auto", [g, h]) > -1, j = {}, k = {}, l, m;
            i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), $.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j)
        }}, $.fn.extend({position: function() {
            if (!this[0])
                return;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = c_.test(b[0].nodeName) ? {top: 0,left: 0} : b.offset();
            return c.top -= parseFloat($.css(a, "marginTop")) || 0, c.left -= parseFloat($.css(a, "marginLeft")) || 0, d.top += parseFloat($.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat($.css(b[0], "borderLeftWidth")) || 0, {top: c.top - d.top,left: c.left - d.left}
        },offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || P.body;
                while (a && !c_.test(a.nodeName) && $.css(a, "position") === "static")
                    a = a.offsetParent;
                return a || P.body
            })
        }}), $.each({scrollLeft: "pageXOffset",scrollTop: "pageYOffset"}, function(a, c) {
        var d = /Y/.test(c);
        $.fn[a] = function(e) {
            return $.access(this, function(a, e, f) {
                var g = M(a);
                if (f === b)
                    return g ? c in g ? g[c] : g.document.documentElement[e] : a[e];
                g ? g.scrollTo(d ? $(g).scrollLeft() : f, d ? f : $(g).scrollTop()) : a[e] = f
            }, a, e, arguments.length, null)
        }
    }), $.each({Height: "height",Width: "width"}, function(a, c) {
        $.each({padding: "inner" + a,content: c,"": "outer" + a}, function(d, e) {
            $.fn[e] = function(e, f) {
                var g = arguments.length && (d || typeof e != "boolean"), h = d || (e === !0 || f === !0 ? "margin" : "border");
                return $.access(this, function(c, d, e) {
                    var f;
                    return $.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? $.css(c, d, e, h) : $.style(c, d, e, h)
                }, c, g ? e : b, g)
            }
        })
    }), a.jQuery = a.$ = $, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return $
    })
})(window), function(a) {
    function b(a) {
        var b = ["Moz", "Webkit", "O", "ms"], c = a.charAt(0).toUpperCase() + a.substr(1);
        if (a in k.style)
            return a;
        for (a = 0; a < b.length; ++a) {
            var d = b[a] + c;
            if (d in k.style)
                return d
        }
    }
    function c(a) {
        return "string" == typeof a && this.parse(a), this
    }
    function d(a, b, c) {
        !0 === b ? a.queue(c) : b ? a.queue(b, c) : c()
    }
    function e(b) {
        var c = [];
        return a.each(b, function(b) {
            b = a.camelCase(b), b = a.transit.propertyMap[b] || b, b = h(b), -1 === a.inArray(b, c) && c.push(b)
        }), c
    }
    function f(b, c, d, f) {
        b = e(b), a.cssEase[d] && (d = a.cssEase[d]);
        var g = "" + j(c) + " " + d;
        0 < parseInt(f, 10) && (g += " " + j(f));
        var h = [];
        return a.each(b, function(a, b) {
            h.push(b + " " + g)
        }), h.join(", ")
    }
    function g(b, d) {
        d || (a.cssNumber[b] = !0), a.transit.propertyMap[b] = l.transform, a.cssHooks[b] = {get: function(d) {
                return (a(d).css("transit:transform") || new c).get(b)
            },set: function(d, e) {
                var f = a(d).css("transit:transform") || new c;
                f.setFromString(b, e), a(d).css({transform: f})
            }}
    }
    function h(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase()
        })
    }
    function i(a, b) {
        return "string" == typeof a && !a.match(/^[\-0-9\.]+$/) ? a : "" + a + b
    }
    function j(b) {
        return a.fx.speeds[b] && (b = a.fx.speeds[b]), i(b, "ms")
    }
    a.transit = {version: "0.1.3",propertyMap: {marginLeft: "margin",marginRight: "margin",marginBottom: "margin",marginTop: "margin",paddingLeft: "padding",paddingRight: "padding",paddingBottom: "padding",paddingTop: "padding"},enabled: !0,useTransitionEnd: !1};
    var k = document.createElement("div"), l = {}, m = -1 < navigator.userAgent.toLowerCase().indexOf("chrome");
    l.transition = b("transition"), l.transitionDelay = b("transitionDelay"), l.transform = b("transform"), l.transformOrigin = b("transformOrigin"), k.style[l.transform] = "", k.style[l.transform] = "rotateY(90deg)", l.transform3d = "" !== k.style[l.transform], a.extend(a.support, l);
    var n = l.transitionEnd = {MozTransition: "transitionend",OTransition: "oTransitionEnd",WebkitTransition: "webkitTransitionEnd",msTransition: "MSTransitionEnd"}[l.transition] || null, k = null;
    a.cssEase = {_default: "ease","in": "ease-in",out: "ease-out","in-out": "ease-in-out",snap: "cubic-bezier(0,1,.5,1)"}, a.cssHooks.transform = {get: function(b) {
            return a(b).data("transform")
        },set: function(b, d) {
            var e = d;
            e instanceof c || (e = new c(e)), b.style[l.transform] = "WebkitTransform" === l.transform && !m ? e.toString(!0) : e.toString(), a(b).data("transform", e)
        }}, a.cssHooks.transformOrigin = {get: function(a) {
            return a.style[l.transformOrigin]
        },set: function(a, b) {
            a.style[l.transformOrigin] = b
        }}, a.cssHooks.transition = {get: function(a) {
            return a.style[l.transition]
        },set: function(a, b) {
            a.style[l.transition] = b
        }}, g("scale"), g("translate"), g("rotate"), g("rotateX"), g("rotateY"), g("rotate3d"), g("perspective"), g("skewX"), g("skewY"), g("x", !0), g("y", !0), c.prototype = {setFromString: function(a, b) {
            var d = "string" == typeof b ? b.split(",") : b.constructor === Array ? b : [b];
            d.unshift(a), c.prototype.set.apply(this, d)
        },set: function(a) {
            var b = Array.prototype.slice.apply(arguments, [1]);
            this.setter[a] ? this.setter[a].apply(this, b) : this[a] = b.join(",")
        },get: function(a) {
            return this.getter[a] ? this.getter[a].apply(this) : this[a] || 0
        },setter: {rotate: function(a) {
                this.rotate = i(a, "deg")
            },rotateX: function(a) {
                this.rotateX = i(a, "deg")
            },rotateY: function(a) {
                this.rotateY = i(a, "deg")
            },scale: function(a, b) {
                void 0 === b && (b = a), this.scale = a + "," + b
            },skewX: function(a) {
                this.skewX = i(a, "deg")
            },skewY: function(a) {
                this.skewY = i(a, "deg")
            },perspective: function(a) {
                this.perspective = i(a, "px")
            },x: function(a) {
                this.set("translate", a, null)
            },y: function(a) {
                this.set("translate", null, a)
            },translate: function(a, b) {
                void 0 === this._translateX && (this._translateX = 0), void 0 === this._translateY && (this._translateY = 0), null !== a && (this._translateX = i(a, "px")), null !== b && (this._translateY = i(b, "px")), this.translate = this._translateX + "," + this._translateY
            }},getter: {x: function() {
                return this._translateX || 0
            },y: function() {
                return this._translateY || 0
            },scale: function() {
                var a = (this.scale || "1,1").split(",");
                return a[0] && (a[0] = parseFloat(a[0])), a[1] && (a[1] = parseFloat(a[1])), a[0] === a[1] ? a[0] : a
            },rotate3d: function() {
                for (var a = (this.rotate3d || "0,0,0,0deg").split(","), b = 0; 3 >= b; ++b)
                    a[b] && (a[b] = parseFloat(a[b]));
                return a[3] && (a[3] = i(a[3], "deg")), a
            }},parse: function(a) {
            var b = this;
            a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(a, c, d) {
                b.setFromString(c, d)
            })
        },toString: function(a) {
            var b = [], c;
            for (c in this)
                this.hasOwnProperty(c) && (l.transform3d || "rotateX" !== c && "rotateY" !== c && "perspective" !== c && "transformOrigin" !== c) && "_" !== c[0] && (a && "scale" === c ? b.push(c + "3d(" + this[c] + ",1)") : a && "translate" === c ? b.push(c + "3d(" + this[c] + ",0)") : b.push(c + "(" + this[c] + ")"));
            return b.join(" ")
        }}, a.fn.transition = a.fn.transit = function(b, c, e, g) {
        var h = this, i = 0, k = !0;
        "function" == typeof c && (g = c, c = void 0), "function" == typeof e && (g = e, e = void 0), "undefined" != typeof b.easing && (e = b.easing, delete b.easing), "undefined" != typeof b.duration && (c = b.duration, delete b.duration), "undefined" != typeof b.complete && (g = b.complete, delete b.complete), "undefined" != typeof b.queue && (k = b.queue, delete b.queue), "undefined" != typeof b.delay && (i = b.delay, delete b.delay), "undefined" == typeof c && (c = a.fx.speeds._default), "undefined" == typeof e && (e = a.cssEase._default);
        var c = j(c), m = f(b, c, e, i), r = a.transit.enabled && l.transition ? parseInt(c, 10) + parseInt(i, 10) : 0;
        if (0 === r)
            return d(h, k, function(a) {
                h.css(b), g && g.apply(h), a && a()
            }), h;
        var s = {}, t = function(c) {
            var d = !1, e = function() {
                d && h.unbind(n, e), r > 0 && h.each(function() {
                    this.style[l.transition] = s[this] || null
                }), typeof g == "function" && g.apply(h), typeof c == "function" && c()
            };
            r > 0 && n && a.transit.useTransitionEnd ? (d = !0, h.bind(n, e)) : window.setTimeout(e, r), h.each(function() {
                r > 0 && (this.style[l.transition] = m), a(this).css(b)
            })
        };
        return d(h, k, function(a) {
            var b = 0;
            l.transition === "MozTransition" && b < 25 && (b = 25), window.setTimeout(function() {
                t(a)
            }, b)
        }), this
    }, a.transit.getTransitionValue = f
}(jQuery), function() {
    var a, b, c;
    c = $(window), a = $("#dragbody"), b = null, window.log = function() {
        if (window.console)
            return window.console.log.apply(window.console, arguments)
    }, window.drawBackgroundOverlay = function() {
        var d, e;
        b || (b = $(".shadow"));
        if (!b[0].getContext)
            return;
        return d = b[0].getContext("2d"), b.css({width: Math.max(a.outerWidth(), c.width()),height: Math.max(a.outerHeight(), c.height())}), d.clearRect(0, 0, c.width(), c.height()), e = d.createRadialGradient(150, 50, 0, 150, 50, 200), e.addColorStop(0, "rgba(0,0,0,0)"), e.addColorStop(.3, "rgba(0,0,0,0.1)"), e.addColorStop(.6, "rgba(0,0,0,0.25)"), e.addColorStop(1, "rgba(0,0,0,0.6)"), d.fillStyle = e, d.fillRect(0, 0, c.width(), c.height())
    }, $(function() {
        return $("#dragbody").addClass("loaded"), drawBackgroundOverlay(), c.resize(drawBackgroundOverlay)
    })
}.call(this), function(a) {
    "use strict";
    var b = a.HTMLCanvasElement && a.HTMLCanvasElement.prototype, c = a.Blob && function() {
        try {
            return Boolean(new Blob)
        } catch (a) {
            return !1
        }
    }(), d = c && a.Uint8Array && function() {
        try {
            return (new Blob([new Uint8Array(100)])).size === 100
        } catch (a) {
            return !1
        }
    }(), e = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder, f = (c || e) && a.atob && a.ArrayBuffer && a.Uint8Array && function(a) {
        var b, f, g, h, i, j;
        a.split(",")[0].indexOf("base64") >= 0 ? b = atob(a.split(",")[1]) : b = decodeURIComponent(a.split(",")[1]), f = new ArrayBuffer(b.length), g = new Uint8Array(f);
        for (h = 0; h < b.length; h += 1)
            g[h] = b.charCodeAt(h);
        return i = a.split(",")[0].split(":")[1].split(";")[0], c ? new Blob([d ? g : f], {type: i}) : (j = new e, j.append(f), j.getBlob(i))
    };
    a.HTMLCanvasElement && !b.toBlob && (b.mozGetAsFile ? b.toBlob = function(a, c, d) {
        d && b.toDataURL && f ? a(f(this.toDataURL(c, d))) : a(this.mozGetAsFile("blob", c))
    } : b.toDataURL && f && (b.toBlob = function(a, b, c) {
        a(f(this.toDataURL(b, c)))
    })), typeof define == "function" && define.amd ? define(function() {
        return f
    }) : a.dataURLtoBlob = f
}(this), !function(a, b, c) {
    function d(a, c) {
        var d = b.createElement(a || "div"), e;
        for (e in c)
            d[e] = c[e];
        return d
    }
    function e(a) {
        for (var b = 1, c = arguments.length; b < c; b++)
            a.appendChild(arguments[b]);
        return a
    }
    function f(a, b, c, d) {
        var e = ["opacity", b, ~~(a * 100), c, d].join("-"), f = .01 + c / d * 100, g = Math.max(1 - (1 - a) / b * (100 - f), a), h = m.substring(0, m.indexOf("Animation")).toLowerCase(), i = h && "-" + h + "-" || "";
        return l[e] || (n.insertRule("@" + i + "keyframes " + e + "{" + "0%{opacity:" + g + "}" + f + "%{opacity:" + a + "}" + (f + .01) + "%{opacity:1}" + (f + b) % 100 + "%{opacity:" + a + "}" + "100%{opacity:" + g + "}" + "}", n.cssRules.length), l[e] = 1), e
    }
    function g(a, b) {
        var d = a.style, e, f;
        if (d[b] !== c)
            return b;
        b = b.charAt(0).toUpperCase() + b.slice(1);
        for (f = 0; f < k.length; f++) {
            e = k[f] + b;
            if (d[e] !== c)
                return e
        }
    }
    function h(a, b) {
        for (var c in b)
            a.style[g(a, c) || c] = b[c];
        return a
    }
    function i(a) {
        for (var b = 1; b < arguments.length; b++) {
            var d = arguments[b];
            for (var e in d)
                a[e] === c && (a[e] = d[e])
        }
        return a
    }
    function j(a) {
        var b = {x: a.offsetLeft,y: a.offsetTop};
        while (a = a.offsetParent)
            b.x += a.offsetLeft, b.y += a.offsetTop;
        return b
    }
    var k = ["webkit", "Moz", "ms", "O"], l = {}, m, n = function() {
        var a = d("style", {type: "text/css"});
        return e(b.getElementsByTagName("head")[0], a), a.sheet || a.styleSheet
    }(), o = {lines: 12,length: 7,width: 5,radius: 10,rotate: 0,corners: 1,color: "#000",speed: 1,trail: 100,opacity: .25,fps: 20,zIndex: 2e9,className: "spinner",top: "auto",left: "auto",position: "relative"}, p = function q(a) {
        if (!this.spin)
            return new q(a);
        this.opts = i(a || {}, q.defaults, o)
    };
    p.defaults = {}, i(p.prototype, {spin: function(a) {
            this.stop();
            var b = this, c = b.opts, e = b.el = h(d(0, {className: c.className}), {position: c.position,width: 0,zIndex: c.zIndex}), f = c.radius + c.length + c.width, g, i;
            a && (a.insertBefore(e, a.firstChild || null), i = j(a), g = j(e), h(e, {left: (c.left == "auto" ? i.x - g.x + (a.offsetWidth >> 1) : parseInt(c.left, 10) + f) + "px",top: (c.top == "auto" ? i.y - g.y + (a.offsetHeight >> 1) : parseInt(c.top, 10) + f) + "px"})), e.setAttribute("aria-role", "progressbar"), b.lines(e, b.opts);
            if (!m) {
                var k = 0, l = c.fps, n = l / c.speed, o = (1 - c.opacity) / (n * c.trail / 100), p = n / c.lines;
                (function q() {
                    k++;
                    for (var a = c.lines; a; a--) {
                        var d = Math.max(1 - (k + a * p) % n * o, c.opacity);
                        b.opacity(e, c.lines - a, d, c)
                    }
                    b.timeout = b.el && setTimeout(q, ~~(1e3 / l))
                })()
            }
            return b
        },stop: function() {
            var a = this.el;
            return a && (clearTimeout(this.timeout), a.parentNode && a.parentNode.removeChild(a), this.el = c), this
        },lines: function(a, b) {
            function c(a, c) {
                return h(d(), {position: "absolute",width: b.length + b.width + "px",height: b.width + "px",background: a,boxShadow: c,transformOrigin: "left",transform: "rotate(" + ~~(360 / b.lines * g + b.rotate) + "deg) translate(" + b.radius + "px" + ",0)",borderRadius: (b.corners * b.width >> 1) + "px"})
            }
            var g = 0, i;
            for (; g < b.lines; g++)
                i = h(d(), {position: "absolute",top: 1 + ~(b.width / 2) + "px",transform: b.hwaccel ? "translate3d(0,0,0)" : "",opacity: b.opacity,animation: m && f(b.opacity, b.trail, g, b.lines) + " " + 1 / b.speed + "s linear infinite"}), b.shadow && e(i, h(c("#000", "0 0 4px #000"), {top: "2px"})), e(a, e(i, c(b.color, "0 0 1px rgba(0,0,0,.1)")));
            return a
        },opacity: function(a, b, c) {
            b < a.childNodes.length && (a.childNodes[b].style.opacity = c)
        }}), function() {
        function a(a, b) {
            return d("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', b)
        }
        var b = h(d("group"), {behavior: "url(#default#VML)"});
        !g(b, "transform") && b.adj ? (n.addRule(".spin-vml", "behavior:url(#default#VML)"), p.prototype.lines = function(b, c) {
            function d() {
                return h(a("group", {coordsize: i + " " + i,coordorigin: -g + " " + -g}), {width: i,height: i})
            }
            function f(b, f, i) {
                e(k, e(h(d(), {rotation: 360 / c.lines * b + "deg",left: ~~f}), e(h(a("roundrect", {arcsize: c.corners}), {width: g,height: c.width,left: c.radius,top: -c.width >> 1,filter: i}), a("fill", {color: c.color,opacity: c.opacity}), a("stroke", {opacity: 0}))))
            }
            var g = c.length + c.width, i = 2 * g, j = -(c.width + c.length) * 2 + "px", k = h(d(), {position: "absolute",top: j,left: j}), l;
            if (c.shadow)
                for (l = 1; l <= c.lines; l++)
                    f(l, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (l = 1; l <= c.lines; l++)
                f(l);
            return e(b, k)
        }, p.prototype.opacity = function(a, b, c, d) {
            var e = a.firstChild;
            d = d.shadow && d.lines || 0, e && b + d < e.childNodes.length && (e = e.childNodes[b + d], e = e && e.firstChild, e = e && e.firstChild, e && (e.opacity = c))
        }) : m = g(b, "animation")
    }(), typeof define == "function" && define.amd ? define(function() {
        return p
    }) : a.Spinner = p
}(window, document), function() {
    var a;
    a = {}, window.moduleLoader = {addModule: function(b, c) {
            return a[b] = c
        },loadAll: function(b) {
            var c, d, e;
            e = [];
            for (d in a)
                c = a[d], e.push(this.load(d, b));
            return e
        },load: function(b, c) {
            return c[b] = a[b](c), delete a[b]
        }}
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l;
        return f = "", b = null, c = $(a), e = {}, h = function(a, b, c, d) {
            var e;
            return e = ["_trackEvent", "" + f + " - " + a, b], c && e.push(c), d && e.push(parseInt(d, 10)), _gaq.push(e)
        }, k = function() {
            return b.on("click", "a[data-track]", function(a) {
                var b;
                b = $(this), h("Outbound Link", "Click", b.data("track"));
                if (b.attr("target") !== "__blank" && !a.ctrlKey && !a.metaKey)
                    return a.preventDefault(), setTimeout(function() {
                        return window.location = b.attr("href")
                    }, 150)
            })
        }, j = function() {
            return c.on({filetoolarge: function(a, b) {
                    var c;
                    return c = b.size / 1024, h("Image Inserted", d(b.action), "Too Large", c)
                },imageinserted: function(a, b) {
                    var c;
                    return c = b.size / 1024, h("Image Inserted", d(b.action), "Successfully", c)
                }})
        }, l = function() {
            return c.on("imageuploaded", function() {
                return h("Image Uploaded", "N/A")
            })
        }, i = function() {
            return $(window).on("error", function(a) {
                if (!e[a.originalEvent.message])
                    return e[a.originalEvent.message] = !0, h("Error", a.originalEvent.message, "" + a.originalEvent.filename + " :" + a.originalEvent.lineno)
            })
        }, d = function(a) {
            return a.paste ? "Copy and Paste" : a.drop ? "Drag and Drop" : a.webcam ? "Webcam" : a.extension ? "Extension" : "Unknown Action"
        }, g = {init: function() {
                if (!window._gaq)
                    return;
                return b = $(document), f = $("#dragbody").data("page"), k(), j(), l(), i()
            }}
    }, window.moduleLoader.addModule("analytics", a)
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e, f, g;
        return g = {initializing: 0,insertingImage: 1,takingPhoto: 2,editingImage: 3,uploadingImage: 4,generatingLink: 5}, d = $(a), b = null, c = null, f = function(e, h) {
            var i, j;
            h == null && (h = {});
            switch (e) {
                case g.initializing:
                    return a.socketConnection.init(), a.modalWindow.init(), a.webcam.init(), a.extensionHandler.init(), d.on("filetoolarge", function(b) {
                        return a.modalWindow.show("error", {content: "The file size of the image you are trying to\t\t\t\t\t\t\t\t  insert exceeds the current limit of\t\t\t\t\t\t\t\t  " + a.fileHandler.getFileSizeLimit() / 1048576 + " MB.\t\t\t\t\t\t\t\t  <br><br>Please try another image.",showCancel: !0})
                    }), f(++e);
                case g.insertingImage:
                    return a.dragAndDrop.init(), a.copyAndPaste.init(), a.webcam.stop(), $(".splash").show(), a.webcam.showButton(), d.on("imageinserted.stateevents", function(b, e) {
                        return d.off(".stateevents"), c.off("cancel"), a.modalWindow.hide(), f(g.editingImage, {image: e.image})
                    }), d.on("noimagefound.stateevents", function(b, c) {
                        var d;
                        return d = "No image found", c.paste ? d = "No image data was found in your clipboard,\t\t\t\t\t\t\t\t\tcopy an image first (or take a screenshot)." : c.drop && (d = "The object you dragged in is not an image file."), a.modalWindow.show("error", {content: d,showCancel: !0})
                    }), d.on("webcaminitiated.stateevents", function(a, b) {
                        return d.off(".stateevents"), c.off("cancel"), f(g.takingPhoto, b)
                    }), d.on("webcamunavailable.stateevents", function(b) {
                        return a.modalWindow.show("error", {content: "You do not seem to have a webcam available (or\t\t\t\t\t\t\t\t  you denied the request to access it).",showCancel: !0})
                    }), c.on("cancel", function() {
                        return a.modalWindow.hide()
                    });
                case g.takingPhoto:
                    return a.webcam.start(), a.dragAndDrop.hide(), a.copyAndPaste.hide(), d.on("webcamwindowshow.stateevents", function(b) {
                        return $(".splash").hide(), a.webcam.hideButton()
                    }), d.on("imageinserted.stateevents", function(b, e) {
                        return d.off(".stateevents"), c.off("cancel"), a.webcam.hide(function() {
                            return f(g.editingImage, {image: e.image,previousState: g.takingPhoto})
                        })
                    }), d.on("cancel", function(b) {
                        return d.off(".stateevents"), a.webcam.hide(function() {
                            return f(g.insertingImage)
                        })
                    });
                case g.editingImage:
                    return $(".welcome").transition({top: -50,opacity: 0}, function() {
                        return $(this).remove()
                    }), h.backtracked || (a.fileHandler.preuploadFile(), a.dragAndDrop.hide(), a.copyAndPaste.hide(), $(".splash").hide(), a.webcam.hideButton(), a.imageEditor.init(h.image)), b.on("cancel.stateevents", function(c) {
                        return b.off(".stateevents"), a.fileHandler.clearFile(), a.fileHandler.abortPreupload(), a.imageEditor.hide(function() {
                            return f(h.previousState || g.insertingImage)
                        })
                    }), b.on("confirm.stateevents", function(c) {
                        return b.off(".stateevents"), a.imageEditor.uploadImage(function(a) {
                            return f(++e, {upload: a})
                        })
                    });
                case g.uploadingImage:
                    return i = null, h.upload.inProgress ? a.modalWindow.show("upload-progress", {showCancel: !0,showConfirm: !0,confirmText: "Upload More",showLink: !0,linkText: "Go to image"}, function(b) {
                        var d, g;
                        return d = a.fileHandler.getCurrentUploadLoaded(), i = function(a) {
                            var c;
                            return h.upload.preuploading ? c = Math.floor((a.loaded - d) / (a.total - d) * 100) : c = Math.floor(a.loaded / a.total * 100), b.find(".progress-bar").css({width: "" + c + "%"}).end().find(".progress-number").text(("" + c).length < 2 ? "0" + c : c)
                        }, g = function() {
                            return b.find(".modal-window").removeClass("default").addClass("generating"), c.off("cancel"), h.upload.preuploading ? h.upload.xhr.addEventListener("load", function() {
                                return a.imageEditor.uploadImage(function(a) {
                                    return f(++e, $.extend(a, {jQueryXHR: !0,modal: b}))
                                })
                            }) : f(++e, {xhr: h.upload.xhr,modal: b})
                        }, a.fileHandler.getCurrentUploadRatio() === 1 ? g() : (h.upload.xhr.upload.addEventListener("progress", i), h.upload.xhr.upload.addEventListener("load", g))
                    }) : a.modalWindow.show("upload-link", {showConfirm: !0,confirmText: "Upload more",showLink: !0,linkText: "Go to image"}, function(a) {
                        return f(++e, {xhr: h.upload.xhr,modal: a,preuploaded: !0})
                    }), c.on("cancel.stateevents", function() {
                        return c.off(".stateevents"), h.upload.xhr && !h.upload.preuploading && h.upload.xhr.abort(), h.upload.xhr.upload.removeEventListener("progress", i), a.modalWindow.hide(), f(g.editingImage, {backtracked: !0})
                    });
                case g.generatingLink:
                    return d.trigger("imageuploaded"), h.preuploaded ? h.xhr.success(function(a) {
                        return h.modal.find(".modal-window").removeClass("default generating").addClass("done"), h.modal.find(".image-link").val(a.url).end().find(".link.button").attr("href", a.url)
                    }) : (j = function(a) {
                        return h.modal.find(".modal-window").removeClass("generating").addClass("done"), setTimeout(function() {
                            return h.modal.find(".upload-bar").hide().end().find(".image-link").show().addClass("appear"), h.modal.find(".cancel").transition({opacity: 0}, 500, function() {
                                return $(this).css("display", "none"), h.modal.find(".confirm, .link.button").css("display", "inline-block").transition({opacity: 1}, 500)
                            }), setTimeout(function() {
                                return h.modal.find(".image-link").val(a).end().find(".link.button").attr("href", a)
                            }, 500)
                        }, 500)
                    }, h.jQueryXHR ? h.xhr.success(function(a) {
                        return j(a.url)
                    }) : h.xhr.addEventListener("load", function(a) {
                        var b;
                        b = {};
                        try {
                            b = JSON.parse(a.target.response)
                        } catch (a) {
                            log(a.target.response)
                        }
                        return j(b.url ? b.url : "Something went wrong")
                    })), c.on("confirm.stateevents", function() {
                        return c.off(".stateevents"), a.modalWindow.hide(), a.imageEditor.hide(function() {
                            return f(g.insertingImage, {backtracked: !0})
                        })
                    })
            }
        }, e = {start: function() {
                return b = $(a.imageEditor), c = $(a.modalWindow), f(0)
            }}
    }, window.moduleLoader.addModule("appFlow", a)
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e, f, g;
        return e = $("<div>").addClass("pastearea").attr("contenteditable", ""), g = function() {
            return $.browser.mozilla
        }(), c = function(b) {
            var c, e, f, h;
            if (g)
                return setTimeout(d, 1);
            e = b.originalEvent.clipboardData.items;
            if (!e) {
                $("html").addClass("no-copyandpaste");
                return
            }
            for (f = 0, h = e.length; f < h; f++) {
                c = e[f];
                if (/image/.test(c.type)) {
                    a.fileHandler.readFile(c.getAsFile(), {paste: !0});
                    return
                }
            }
            return $(a).trigger("noimagefound", {paste: !0})
        }, d = function() {
            var b;
            b = e[0].childNodes[0], e.html("");
            if (b && b.tagName === "IMG") {
                if (/^data:image/i.test(b.src)) {
                    a.fileHandler.readData(b.src, {paste: !0});
                    return
                }
                if (/^http(s?):\/\//i.test(b.src)) {
                    a.fileHandler.readExternalImage(b.src, {paste: !0});
                    return
                }
            }
            return $(a).trigger("noimagefound", {paste: !0})
        }, b = function() {
            return e.focus()
        }, f = {isSupported: function() {
                return "onpaste" in document
            },init: function() {
                if (!this.isSupported()) {
                    $("html").addClass("no-copyandpaste");
                    return
                }
                return g && (e.appendTo("body").focus(), $(document).on("click", b)), $(window).on("paste", c)
            },hide: function() {
                return e.remove(), $(window).off("paste", c), $(document).off("click", b)
            }}
    }, window.moduleLoader.addModule("copyAndPaste", a)
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e, f, g, h;
        return b = $("#dragbody"), c = $("<div>").addClass("drop-area"), g = function(a) {
            return b.addClass("dragging")
        }, e = function(a) {
            return b.removeClass("dragging")
        }, f = function(a) {
            return a.stopPropagation(), a.preventDefault(), a.originalEvent.dataTransfer.dropEffect = "copy"
        }, d = function(c) {
            var d, e, f, g, h, i, j;
            c.preventDefault(), c.stopPropagation(), b.removeClass("dragging");
            j = c.originalEvent.dataTransfer.files;
            for (h = 0, i = j.length; h < i; h++) {
                d = j[h];
                if (/image/.test(d.type)) {
                	if(window.RECENT_UPLOADS.length <6)
                		a.fileHandler.readFile(d, {drop: !0});
                    return
                }
            }
            if (f = c.originalEvent.dataTransfer.getData("text/html")) {
                e = !1, $(f).each(function() {
                    var b;
                    this.tagName === "IMG" && this.src ? b = this : b = $(this).find("img")[0];
                    if (b) {
                        if (/^data:image/i.test(b.src))
                            return a.fileHandler.readData(b.src, {drop: !0}), e = !0, !1;
                        if (/^http(s?):\/\//i.test(b.src))
                            return a.fileHandler.readExternalImage(b.src, {drop: !0}), e = !0, !1
                    }
                });
                if (e)
                    return
            }
            if (g = c.originalEvent.dataTransfer.getData("text/plain")) {
                if (/^data:image/i.test(g)) {
                    a.fileHandler.readData(g, {drop: !0});
                    return
                }
                if (/^http(s?):\/\//i.test(g)) {
                    a.fileHandler.readExternalImage(g, {drop: !0});
                    return
                }
            }
            return $(a).trigger("noimagefound", {drop: !0})
        }, h = {isSupported: function() {
                return !!Modernizr.draganddrop && !!a.fileHandler.isSupported()
            },init: function() {
                if (!this.isSupported()) {
                    $("html").addClass("no-draganddrop-pb");
                    return
                }
                return b.prepend(c), c.on({"dragenter.dragevent": g,"dragleave.dragevent": e,"dragover.dragevent": f,"drop.dragevent": d})
            },hide: function() {
                return c.off(".dragevent"), c.detach()
            }}
    }, window.moduleLoader.addModule("dragAndDrop", a)
}.call(this), function() {
    var a;
    a = function(a) {
        return {init: function() {
                return $(window).on("extensionimageloaded", function(b, c) {
                    if (!c.imageData)
                        return;
                    return a.fileHandler.readData(c.imageData, {extension: !0})
                })
            }}
    }, window.moduleLoader.addModule("extensionHandler", a)
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e, f, g, h, i, j;
        return b = 10485760, h = null, e = null, f = 0, g = 0, c = function(c, d) {
            return c.size > b ? ($(a).trigger("filetoolarge", {size: c.size,action: d}), !1) : !0
        }, j = function(a, b) {
            var c, d, e;
            return d = function(a) {
                return f = a.loaded, g = a.loaded / a.total
            }, c = function(a) {
                return log("Error: ", a)
            }, e = new XMLHttpRequest, e.upload.addEventListener("progress", d), e.addEventListener("error", c), e.open("POST", a), e.send(b), e
        }, d = function(b, c) {
            var d, f;
            return b ? (d = document.createElement("canvas"), d.toBlob ? (d.width = b.width, d.height = b.height, f = d.getContext("2d"), f.drawImage(a.imageEditor.getImage(), -b.x, -b.y), d.toBlob(c)) : c(e, !0)) : c(e)
        }, i = {isSupported: function() {
                return !!(window.FileReader || window.URL || window.webkitURL)
            },getCurrentUploadLoaded: function() {
                return f
            },getCurrentUploadRatio: function() {
                return g
            },getFileSizeLimit: function() {
                return b
            },readFile: function(b, d) {
                var f, g, h;
                e = b;
                if (c(e, d)) {
                    if (h = window.URL || window.webkitURL) {
                        g = h.createObjectURL(b);
                        var newimg = $("<div style='width:100px;height:120px;position:relative;display:inline-block'><img src='"+g+"' class='product_img' style='opacity: 1;' /><span class='delete_img_btn' style='position:absolute;top:72px;left:5px' id='removeImage'>删除</span></div>");
                        var img = $("#images>div:last");
                        
                        img.before(newimg);
                        $(".delete_img_btn").click(function(){
	                    	 var index = $(this).parent().prevAll().length;
	                    	 window.RECENT_UPLOADS.splice(index , 1);
	                    	 $(this).parent().remove();
	                    	});
                        //$("#images").append(newimg);
                        uploadBlobImage(b);
                        if(window.RECENT_UPLOADS.length == 6){
                        	img.hide();
                        }

                        if (typeof g == "string") {
                        	//$(a).trigger("imageinserted",{image:g,action:d,size:e.size});
                            return
                        }
                    }
                    if (window.FileReader)
                        return f = new FileReader, f.onload = function(b) {
                            return $(a).trigger("imageinserted", {image: b.target.result,action: d,size: e.size})
                        }, f.readAsDataURL(b)
                }
            },readVideo: function(b) {
                var d;
                return d = document.createElement("canvas"), d.width = b.videoWidth, d.height = b.videoHeight, d.getContext("2d").drawImage(b, 0, 0), d.toBlob(function(b) {
                    e = b;
                    if (c(e, "webcam"))
                        return $(a).trigger("imageinserted", {image: d.toDataURL("image/png"),action: {webcam: !0},size: e.size})
                })
            },readData: function(b, d) {
                e = dataURLtoBlob(b);
                if (c(e, d))
                    return $(a).trigger("imageinserted", {image: b,action: d,size: e.size})
            },readExternalImage: function(b, d) {
                var f, g;
                return g = "/imageproxy/" + encodeURIComponent(b), f = new Image, f.onload = function() {
                    var b, h;
                    return b = document.createElement("canvas"), b.toBlob ? (b.width = f.width, b.height = f.height, h = b.getContext("2d"), h.drawImage(f, 0, 0), b.toBlob(function(b) {
                        e = b;
                        if (c(e, d))
                            return $(a).trigger("imageinserted", {image: g,action: d,size: e.size})
                    })) : $(a).trigger("noimagefound", d)
                }, f.onerror = function(b) {
                    return $(a).trigger("noimagefound", d)
                }, f.src = g
            },preuploadFile: function() {
                var b, c;
                return c = a.socketConnection.getID(), $(a.socketConnection).off("idReceive"), c ? (b = new FormData, b.append("id", a.socketConnection.getID()), b.append("file", e), h = j("/preupload", b)) : $(a.socketConnection).on("idReceive", i.preuploadFile)
            },abortPreupload: function() {
                if (h)
                    return h.abort(), $(a.socketConnection).off("idReceive"), h = null
            },clearFile: function() {
                return $.post("/clearfile", {id: a.socketConnection.getID()})
            },uploadFile: function(b, c) {
                var g, i, k, l = this;
                return h ? h.readyState === 4 ? (g = {id: a.socketConnection.getID()}, b && (g.cropImage = !0, g.crop = b), h = null, k = $.post("/upload", g).error(function(a) {
                    return log(a)
                }), c({xhr: k,inProgress: !1})) : b ? (i = e.size - f, d(b, function(a) {
                    return a.size * 1.1 < i ? (e = a, h.abort(), h = null, l.uploadFile(null, c)) : c({xhr: h,inProgress: !0,preuploading: !0})
                })) : c({xhr: h,inProgress: !0,preuploading: !0}) : ($(a.socketConnection).off("idReceive"), d(b, function(a, d) {
                    var e, f, g;
                    e = new FormData, e.append("file", a);
                    if (d) {
                        e.append("cropImage", !0);
                        for (f in b)
                            g = b[f], e.append("crop[" + f + "]", g)
                    }
                    return c({xhr: j("/upload", e),inProgress: !0})
                }))
            }}
    }, window.moduleLoader.addModule("fileHandler", a)
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R;
        return k = .8, j = .8, o = 600, n = 600, l = 25, m = "jstemplates/imageeditor.tmpl", y = null, B = !1, A = !1, v = null, N = null, s = null, L = {x: !1,y: !1}, w = {x: 0,y: 0}, z = {x: 0,y: 0}, E = {x: 0,y: 0}, t = function() {
            var a, b, d, f, g, h, i, j, k;
            return j = 0, k = 0, i = 0, b = 0, g = null, a = null, d = !1, h = function() {
                g.x = j, g.y = k, g.width = i, g.height = b, g.width < 0 && (g.width *= -1, g.x -= g.width), g.height < 0 && (g.height *= -1, g.y -= g.height), g.x < 0 && (g.width += g.x, g.x = 0), g.x + g.width > y.width && (g.width = y.width - g.x), g.y < 0 && (g.height += g.y, g.y = 0), g.y + g.height > y.height && (g.height = y.height - g.y), a.css({left: g.x,top: g.y,width: g.width,height: g.height,"background-position": "" + -g.x + "px " + -g.y + "px"});
                if (g.width < 5 || g.height < 5) {
                    if (d)
                        return e.removeClass("cropped"), d = !1, clearTimeout(s), s = setTimeout(function() {
                            return R(d)
                        }, 200)
                } else if (!d)
                    return e.addClass("cropped"), d = !0, clearTimeout(s), s = setTimeout(function() {
                        return R(d)
                    }, 200)
            }, f = {getCropCoordinates: function() {
                    return d ? g : null
                },reset: function() {
                    return g = {x: 0,y: 0,width: 0,height: 0}, d = !1
                },init: function(d, e) {
                    return a = c.find(".crop-selection"), j = d, k = e, i = 0, b = 0, h()
                },resize: function(a, c) {
                    return i = a - j, b = c - k, h()
                }}
        }(), e = null, d = null, f = null, c = null, g = {x: {bar: null,track: null,handle: null},y: {bar: null,track: null,handle: null}}, h = null, i = $(window), b = $(document), r = function(a, b, c) {
            return Modernizr.csstransforms3d ? "translate3d(" + a + "px, " + b + "px, " + c + "px)" : "translate(" + a + "px, " + b + "px)"
        }, p = function() {
            return i.on("resize.imageeditorevent", function() {
                return P(), Q(), H(0, 0)
            }), b.on("click.imageeditorevent", ".image-editor .confirm", function() {
                return $(O).trigger("confirm")
            }).on("click.imageeditorevent", ".image-editor .cancel", function() {
                return $(O).trigger("cancel")
            }).on("mousewheel.imageeditorevent" + ("onmousewheel" in document ? "" : " DOMMouseScroll.imageeditorevent"), ".image-container", K).on("mousedown.imageeditorevent", ".image-container .image", D).on("mousedown.imageeditorevent", ".image-editor .y-scroll-bar, .image-editor .x-scroll-bar", F).on("mouseup.imageeditorevent", function() {
                B && (B = !1);
                if (A)
                    return A = !1, clearInterval(N)
            }).on("mousemove.imageeditorevent", function(a) {
                B && x(a);
                if (A)
                    return u(a)
            })
        }, G = function() {
            return b.off(".imageeditorevent"), i.off(".imageeditorevent")
        }, q = function(a) {
            var b;
            e = $(a), d = e.find(".image-container"), c = d.find(".image"), f = d.find(".instructions");
            for (b in g)
                g[b].bar = e.find("." + b + "-scroll-bar"), g[b].track = g[b].bar.find(".track"), g[b].handle = g[b].track.find(".handle");
            return h = e.find(".confirm")
        }, R = function(a) {
            var b;
            b = a ? 180 : 100;
            if (h.data("cropped") === a)
                return;
            return h.data("cropped", a), h.find("span").stop().transition({opacity: 0}, 150, function() {
                return $(this).text($(this).data("" + (a ? "cropped" : "regular") + "-text")).css("width", "" + (b - 40) + "px"), h.transition({width: b + "px"}, function() {
                    return $(this).find("span").stop().transition({opacity: 1}, 150)
                })
            })
        }, P = function() {
            var a;
            return a = i.height() / 2 - e.outerHeight() / 2 - 50, e.outerHeight() > i.height() && (a = 0), e.css({top: a})
        }, Q = function() {
            var a, b, c, f, h, l;
            return c = k * Math.max(i.width(), o), b = j * Math.max(i.height(), n), l = Math.min(c, y.width), a = Math.min(b, y.height), e.css({width: l,height: a}), d.width() < y.width ? (L.x = !0, e.addClass("scroll-x"), f = a - g.x.bar.outerHeight(), f < b ? (e.css("height", a + g.x.bar.outerHeight()), d.css("height", a)) : d.css("height", a - (f - b)), g.x.handle.css("width", d.width() / y.width * g.x.track.width())) : (e.removeClass("scroll-x"), d.css("height", ""), L.x = !1), d.height() < y.height ? (L.y = !0, e.addClass("scroll-y"), h = l - g.y.bar.outerWidth(), h < c ? (e.css("width", l + g.y.bar.outerWidth()), d.css("width", l)) : d.css("width", l - (h - c)), g.y.handle.css("height", d.height() / y.height * g.y.track.height())) : (e.removeClass("scroll-y"), d.css("width", ""), L.y = !1)
        }, F = function(a) {
            var b, c, d;
            if (a.button === !0)
                return;
            b = $(a.currentTarget);
            if (b.hasClass("y-scroll-bar")) {
                if (g.y.handle.offset().top <= (c = a.clientY + i.scrollTop()) && c <= g.y.handle.offset().top + g.y.handle.height())
                    return v = "y", w.y = a.clientY + i.scrollTop() - g.y.handle.offset().top, B = !0;
                if (a.clientY + i.scrollTop() > g.y.bar.offset().top + g.y.bar.height())
                    return;
                return a.clientY + i.scrollTop() < g.y.handle.offset().top ? H(0, l * 4) : H(0, -l * 4)
            }
            if (b.hasClass("x-scroll-bar")) {
                if (g.x.handle.offset().left <= (d = a.clientX + i.scrollLeft()) && d <= g.x.handle.offset().left + g.x.handle.width())
                    return v = "x", w.x = a.clientX + i.scrollLeft() - g.x.handle.offset().left, B = !0;
                if (a.clientX + i.scrollLeft() > g.x.bar.offset().left + g.x.bar.width())
                    return;
                return a.clientX + i.scrollLeft() < g.x.handle.offset().left ? H(l, 0) : H(-l, 0)
            }
        }, K = function(a) {
            var b, c, d;
            return a.preventDefault(), b = a.originalEvent.wheelDeltaX || 0, c = a.originalEvent.wheelDeltaY, c === void 0 && (c = a.originalEvent.wheelDelta || 0), a.type === "DOMMouseScroll" && (d = -a.originalEvent.detail / Math.abs(a.originalEvent.detail), a.originalEvent.axis === a.originalEvent.HORIZONTAL_AXIS ? b = d * 100 : c = d * 100), a.originalEvent.shiftKey && (b || (b = c), c = 0), H(b / 2, c / 2)
        }, x = function(a) {
            var b, c;
            if (v === "x")
                return b = (a.clientX + i.scrollLeft() - w.x - g.x.track.offset().left) / g.x.track.width() * y.width, I(b, void 0);
            if (v === "y")
                return c = (a.clientY + i.scrollTop() - w.y - g.y.track.offset().top) / g.y.track.height() * y.height, I(void 0, c)
        }, H = function(a, b) {
            var c, d;
            return L.x || (a = 0), L.y || (b = 0), c = -(z.x + a), d = -(z.y + b), I(c, d)
        }, I = function(a, b) {
            var e;
            return a === void 0 && (a = -z.x), b === void 0 && (b = -z.y), a = Math.max(0, Math.min(a, c.width() - d.width())), b = Math.max(0, Math.min(b, c.height() - d.height())), a = Math.round(a), b = Math.round(b), z.x = -a, z.y = -b, c.css("transform", r(-a, -b, 0)), e = Math.round(b / (c.height() - d.height()) * (g.y.track.height() - g.y.handle.height())), g.y.handle.css("transform", r(0, e, 0)), e = Math.round(a / (c.width() - d.width()) * (g.x.track.width() - g.x.handle.width())), g.x.handle.css("transform", r(e, 0, 0))
        }, D = function(a) {
            return A = !0, E.x = a.clientX + i.scrollLeft(), E.y = a.clientY + i.scrollTop(), t.init(E.x - c.offset().left, E.y - c.offset().top), N = setInterval(M, 1e3 / 60)
        }, u = function(a) {
            return E.x = a.clientX + i.scrollLeft(), E.y = a.clientY + i.scrollTop(), t.resize(E.x - c.offset().left, E.y - c.offset().top)
        }, M = function() {
            var a;
            return a = {x: 0,y: 0}, E.x < d.offset().left ? a.x = 1 * J(d.offset().left - E.x) : E.x > d.offset().left + d.width() && (a.x = -1 * J(E.x - d.offset().left - d.width())), E.y < d.offset().top ? a.y = 1 * J(d.offset().top - E.y) : E.y > d.offset().top + d.height() && (a.y = -1 * J(E.y - d.offset().top - d.height())), H(l * a.x, l * a.y), t.resize(E.x - c.offset().left, E.y - c.offset().top)
        }, J = function(a) {
            return 0 < a && a < 10 ? .1 : a < 100 ? a / 100 : 1
        }, C = function(b) {
            return y = new Image, y.src = b, y.onload = function() {
                return a.template.compile(m, {url: b}, function(a) {
                    return q(a), (y.width < 200 || y.height < 100) && f.hide(), e.appendTo("#dragbody"), c.css({width: y.width,height: y.height}), Q(), P()
                })
            }
        }, O = {init: function(b) {
                return a.template.load(m), C(b), B = !1, L.x = !1, L.y = !1, w.x = 0, w.y = 0, z.x = 0, z.y = 0, t.reset(), p()
            },hide: function(a) {
                return G(), e.transition({opacity: 0,scale: .95}, 500, function() {
                    e.remove();
                    if (a)
                        return a()
                })
            },uploadImage: function(b) {
                return a.fileHandler.uploadFile(t.getCropCoordinates(), b)
            },getImage: function() {
                return y
            }}
    }, window.moduleLoader.addModule("imageEditor", a)
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e, f, g, h, i;
        return f = "jstemplates/modalwindow.tmpl", i = {title: "",content: "",showCancel: !1,showClose: !1,showConfirm: !1,showLink: !1,confirmText: "OK",cancelText: "Cancel",closeText: "Close",linkText: ""}, b = $(document), e = $(window), c = null, d = null, h = function() {
            var a;
            return a = Math.max(50, e.outerHeight() / 2 - d.outerHeight() / 2), d.css({top: a})
        }, g = {init: function() {
                return a.template.load(f)
            },show: function(j, k, l) {
                var m = this;
                return c != null && g.hide(), a.template.compile(f, $.extend({modalType: j}, i, k), function(a) {
                    c = $(a), d = c.find(".modal-window"), $("#dragbody").append(c), h(), e.on("resize.modalwindowevents", h), b.on("click.modalwindowevents", ".modal-window .cancel", function() {
                        return $(g).trigger("cancel")
                    }).on("click.modalwindowevents", ".modal-window .confirm", function() {
                        return $(g).trigger("confirm")
                    }).on("click.modalwindowevents", ".modal-window .close", function() {
                        return g.hide()
                    }), k.showClose && b.on("click.modalwindowevents", function() {
                        return g.hide()
                    }).on("click.modalwindowevents", ".modal-window", function(a) {
                        return a.stopPropagation()
                    });
                    if (l)
                        return l(c)
                })
            },hide: function() {
                var a;
                if (!d)
                    return;
                return d.transition({opacity: 0,scale: .85}, 300), a = c, a.transition({opacity: 0}, 500, function() {
                    return a.remove(), a = null
                }), b.off(".modalwindowevents"), e.off(".modalwindowevents")
            }}
    }, window.moduleLoader.addModule("modalWindow", a)
}.call(this), function() {
    var a, b;
    a = !1, b = function(b) {
        var c;
        return c = {isSupported: function() {
                return !!window.WebSocket
            },getID: function() {
                return a
            },init: function() {
                var b;
                if (this.isSupported())
                    return;
                return b = new WebSocket("ws://" + window.location.hostname + ":" + 3000), b.onmessage = function(b) {
                    var d;
                    try {
                        d = JSON.parse(b.data)
                    } catch (e) {
                        d = b.data
                    }
                    return !a && d.id ? (a = d.id, $(c).trigger("idReceive")) : log(b.data)
                }
            }}
    }, window.moduleLoader.addModule("socketConnection", b)
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e;
        return b = {}, d = {}, c = function(a, b) {
            return (new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');"))(b)
        }, e = {load: function(a) {
                return d[a] ? d[a] : d[a] = $.get(a).success(function(c) {
                    return b[a] = c, delete d[a]
                }).error(function(a) {
                    return log("Error: ", a)
                })
            },compile: function(a, d, e) {
                var f;
                return f = /^(\w|\/)*\.tmpl$/.test(a), f ? b[a] ? e(c(b[a], d)) : this.load(a).success(function(a) {
                    return e(c(a, d))
                }) : e(c(a, d)), !0
            }}
    }, window.moduleLoader.addModule("template", a)
}.call(this), function() {
    var a;
    a = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m;
        return f = "jstemplates/webcamwindow.tmpl", m = null, k = null, e = null, b = null, c = null, d = $(a), navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, window.URL = window.URL || window.webkitURL, h = function() {
            return navigator.getUserMedia({video: !0,audio: !1}, function(a) {
                return k = a, d.trigger("webcaminitiated")
            }, function(a) {
                return d.trigger("webcamunavailable")
            })
        }, l = function() {
            return m.mozSrcObject === null ? m.mozSrcObject = k : window.URL ? m.src = window.URL.createObjectURL(k) : m.src = k, $(m).one("canplay", function(a) {
                return g(), m.play()
            })
        }, g = function() {
            return d.trigger("webcamwindowshow", {webcamWindow: e}), $("#dragbody").append(e), j(), $(window).on("resize", j), b.on("click", function() {
                return d.trigger("cancel")
            }), c.on("click", function() {
                return a.fileHandler.readVideo(m)
            })
        }, j = function() {
            return e.css({top: $(window).outerHeight() / 2 - e.outerHeight() / 2 - 50,left: $(window).outerWidth() / 2 - e.outerWidth() / 2})
        }, i = {isSupported: function() {
                return !!navigator.getUserMedia && window.dataURLtoBlob
            },showButton: function() {
                if (!this.isSupported())
                    return;
                return $(".webcam-button").show().css("opacity", 0).transition({opacity: 1}, 500)
            },hideButton: function() {
                return $(".webcam-button").hide()
            },hide: function(a) {
                return e.transition({opacity: 0,scale: .95}, 500, function() {
                    return e.remove(), typeof a == "function" ? a() : void 0
                })
            },stop: function() {
                return k != null ? typeof k.stop == "function" ? k.stop() : void 0 : void 0
            },start: function() {
                return a.template.compile(f, {}, function(a) {
                    return e = $(a), b = e.find(".cancel"), c = e.find(".confirm"), m = e.find("video")[0], l()
                })
            },init: function() {
                if (!this.isSupported())
                    return;
                return a.template.load(f), $(".webcam-button").click(h)
            }}
    }, window.moduleLoader.addModule("webcam", a)
}.call(this), function() {
    var a, b, c, d;
    window.log = function() {
        if (window.console)
            return window.console.log.apply(window.console, arguments)
    }, d = {}, window.moduleLoader.loadAll(d), b = function() {
        return d.template.compile("jstemplates/about.tmpl", {}, function(a) {
            return $(document).on("click", ".show-about", function(b) {
                return b.preventDefault(), d.modalWindow.show("text", {content: a,showClose: !0}, function(a) {
                    var b;
                    return b = a
                })
            })
        })
    }, c = function() {
        if (!window.RECENT_UPLOADS.length)
            return;
        return d.template.compile("jstemplates/uploads.tmpl", {images: window.RECENT_UPLOADS}, function(a) {
            return $(".show-uploads").addClass("show"), $(document).on("click", ".show-uploads", function(b) {
                return b.preventDefault(), d.modalWindow.show("uploads", {content: a,showClose: !0})
            })
        })
    }, a = function() {
        if ($(".welcome").length > 0)
            return $(".welcome").css("display", "block").delay(1500).transition({top: 0,opacity: 1})
    }, $(function() {
        return d.analytics.init(), d.appFlow.start(), b(), c(), a()
    })
}.call(this)
