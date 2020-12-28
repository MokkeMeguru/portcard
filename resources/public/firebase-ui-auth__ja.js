/*! Terms: https://developers.google.com/terms */
(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var k;
  function aa(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  var ba =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    ca =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          };
  function da(a) {
    a = [
      "object" == typeof globalThis && globalThis,
      a,
      "object" == typeof window && window,
      "object" == typeof self && self,
      "object" == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
  }
  var ea = da(this);
  function fa(a, b) {
    if (b)
      a: {
        var c = ea;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d &&
          null != b &&
          ca(c, a, { configurable: !0, writable: !0, value: b });
      }
  }
  var ha;
  if ("function" == typeof Object.setPrototypeOf) ha = Object.setPrototypeOf;
  else {
    var ja;
    a: {
      var ka = { Sf: !0 },
        la = {};
      try {
        la.__proto__ = ka;
        ja = la.Sf;
        break a;
      } catch (a) {}
      ja = !1;
    }
    ha = ja
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var ma = ha;
  function p(a, b) {
    a.prototype = ba(b.prototype);
    a.prototype.constructor = a;
    if (ma) ma(a, b);
    else
      for (var c in b)
        if ("prototype" != c)
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d);
          } else a[c] = b[c];
    a.Z = b.prototype;
  }
  fa("Symbol", function (a) {
    function b(e) {
      if (this instanceof b) throw new TypeError("Symbol is not a constructor");
      return new c("jscomp_symbol_" + (e || "") + "_" + d++, e);
    }
    function c(e, f) {
      this.Cf = e;
      ca(this, "description", { configurable: !0, writable: !0, value: f });
    }
    if (a) return a;
    c.prototype.toString = function () {
      return this.Cf;
    };
    var d = 0;
    return b;
  });
  fa("Symbol.iterator", function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (
      var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
          " "
        ),
        c = 0;
      c < b.length;
      c++
    ) {
      var d = ea[b[c]];
      "function" === typeof d &&
        "function" != typeof d.prototype[a] &&
        ca(d.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return na(aa(this));
          },
        });
    }
    return a;
  });
  function na(a) {
    a = { next: a };
    a[Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  function pa(a, b) {
    a instanceof String && (a += "");
    var c = 0,
      d = !1,
      e = {
        next: function () {
          if (!d && c < a.length) {
            var f = c++;
            return { value: b(f, a[f]), done: !1 };
          }
          d = !0;
          return { done: !0, value: void 0 };
        },
      };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  }
  fa("Array.prototype.values", function (a) {
    return a
      ? a
      : function () {
          return pa(this, function (b, c) {
            return c;
          });
        };
  });
  fa("Array.prototype.keys", function (a) {
    return a
      ? a
      : function () {
          return pa(this, function (b) {
            return b;
          });
        };
  });
  fa("Object.is", function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
        };
  });
  fa("Array.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          var d = this;
          d instanceof String && (d = String(d));
          var e = d.length;
          c = c || 0;
          for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0;
          }
          return !1;
        };
  });
  fa("String.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          if (null == this)
            throw new TypeError(
              "The 'this' value for String.prototype.includes must not be null or undefined"
            );
          if (b instanceof RegExp)
            throw new TypeError(
              "First argument to String.prototype.includes must not be a regular expression"
            );
          return -1 !== (this + "").indexOf(b, c || 0);
        };
  });
  fa("Array.prototype.entries", function (a) {
    return a
      ? a
      : function () {
          return pa(this, function (b, c) {
            return [b, c];
          });
        };
  });
  var q = this || self,
    qa = /^[\w+/_-]+[=]{0,2}$/,
    ra = null;
  function sa(a) {
    return (a = a.querySelector && a.querySelector("script[nonce]")) &&
      (a = a.nonce || a.getAttribute("nonce")) &&
      qa.test(a)
      ? a
      : "";
  }
  function ta() {}
  function ua(a) {
    a.Ka = void 0;
    a.xd = function () {
      return a.Ka ? a.Ka : (a.Ka = new a());
    };
  }
  function va(a) {
    var b = typeof a;
    return "object" != b ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
  }
  function wa(a) {
    var b = va(a);
    return "array" == b || ("object" == b && "number" == typeof a.length);
  }
  function t(a) {
    var b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  function xa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ya(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b, e);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function u(a, b, c) {
    u =
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf("native code")
        ? xa
        : ya;
    return u.apply(null, arguments);
  }
  function za(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }
  function v(a, b) {
    for (var c in b) a[c] = b[c];
  }
  function w(a, b) {
    a = a.split(".");
    var c = q;
    a[0] in c ||
      "undefined" == typeof c.execScript ||
      c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift()); )
      a.length || void 0 === b
        ? (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {}))
        : (c[d] = b);
  }
  function x(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Z = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.Xh = function (d, e, f) {
      for (
        var g = Array(arguments.length - 2), h = 2;
        h < arguments.length;
        h++
      )
        g[h - 2] = arguments[h];
      return b.prototype[e].apply(d, g);
    };
  }
  function Aa(a) {
    return a;
  }
  function Ba(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, Ba);
    else {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  }
  x(Ba, Error);
  Ba.prototype.name = "CustomError";
  var Ca;
  function Da(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++)
      c += a[e] + (e < b.length ? b[e] : "%s");
    Ba.call(this, c + a[d]);
  }
  x(Da, Ba);
  Da.prototype.name = "AssertionError";
  function Ea(a, b) {
    throw new Da(
      "Failure" + (a ? ": " + a : ""),
      Array.prototype.slice.call(arguments, 1)
    );
  }
  var Fa = Array.prototype.indexOf
      ? function (a, b) {
          return Array.prototype.indexOf.call(a, b, void 0);
        }
      : function (a, b) {
          if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length
              ? -1
              : a.indexOf(b, 0);
          for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    Ga = Array.prototype.forEach
      ? function (a, b, c) {
          Array.prototype.forEach.call(a, b, c);
        }
      : function (a, b, c) {
          for (
            var d = a.length,
              e = "string" === typeof a ? a.split("") : a,
              f = 0;
            f < d;
            f++
          )
            f in e && b.call(c, e[f], f, a);
        };
  function Ha(a, b) {
    for (
      var c = "string" === typeof a ? a.split("") : a, d = a.length - 1;
      0 <= d;
      --d
    )
      d in c && b.call(void 0, c[d], d, a);
  }
  var Ia = Array.prototype.filter
      ? function (a, b) {
          return Array.prototype.filter.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = [],
              e = 0,
              f = "string" === typeof a ? a.split("") : a,
              g = 0;
            g < c;
            g++
          )
            if (g in f) {
              var h = f[g];
              b.call(void 0, h, g, a) && (d[e++] = h);
            }
          return d;
        },
    Ja = Array.prototype.map
      ? function (a, b) {
          return Array.prototype.map.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = Array(c),
              e = "string" === typeof a ? a.split("") : a,
              f = 0;
            f < c;
            f++
          )
            f in e && (d[f] = b.call(void 0, e[f], f, a));
          return d;
        },
    Ka = Array.prototype.some
      ? function (a, b) {
          return Array.prototype.some.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length,
              d = "string" === typeof a ? a.split("") : a,
              e = 0;
            e < c;
            e++
          )
            if (e in d && b.call(void 0, d[e], e, a)) return !0;
          return !1;
        };
  function La(a, b) {
    return 0 <= Fa(a, b);
  }
  function Ma(a, b) {
    b = Fa(a, b);
    var c;
    (c = 0 <= b) && Na(a, b);
    return c;
  }
  function Na(a, b) {
    return 1 == Array.prototype.splice.call(a, b, 1).length;
  }
  function Oa(a, b) {
    a: {
      for (
        var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
        e < c;
        e++
      )
        if (e in d && b.call(void 0, d[e], e, a)) {
          b = e;
          break a;
        }
      b = -1;
    }
    0 <= b && Na(a, b);
  }
  function Pa(a, b) {
    var c = 0;
    Ha(a, function (d, e) {
      b.call(void 0, d, e, a) && Na(a, e) && c++;
    });
  }
  function Qa(a) {
    return Array.prototype.concat.apply([], arguments);
  }
  function Ra(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    return [];
  }
  function Sa(a, b, c, d) {
    return Array.prototype.splice.apply(a, Ta(arguments, 1));
  }
  function Ta(a, b, c) {
    return 2 >= arguments.length
      ? Array.prototype.slice.call(a, b)
      : Array.prototype.slice.call(a, b, c);
  }
  function Va(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a);
  }
  function Wa(a, b) {
    for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
    return !1;
  }
  function Xa(a) {
    var b = {},
      c;
    for (c in a) b[c] = a[c];
    return b;
  }
  var Ya = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
    " "
  );
  function Za(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (var f = 0; f < Ya.length; f++)
        (c = Ya[f]),
          Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  var $a;
  function ab() {
    if (void 0 === $a) {
      var a = null,
        b = q.trustedTypes;
      if (b && b.createPolicy)
        try {
          a = b.createPolicy("goog#html", {
            createHTML: Aa,
            createScript: Aa,
            createScriptURL: Aa,
          });
        } catch (c) {
          q.console && q.console.error(c.message);
        }
      $a = a;
    }
    return $a;
  }
  function bb(a, b) {
    this.$d = (a === cb && b) || "";
    this.Rf = db;
  }
  bb.prototype.Ra = !0;
  bb.prototype.Ja = function () {
    return this.$d;
  };
  bb.prototype.toString = function () {
    return "Const{" + this.$d + "}";
  };
  function eb(a) {
    if (a instanceof bb && a.constructor === bb && a.Rf === db) return a.$d;
    Ea("expected object of type Const, got '" + a + "'");
    return "type_error:Const";
  }
  var db = {},
    cb = {};
  function fb(a, b) {
    this.Qd = b === gb ? a : "";
  }
  k = fb.prototype;
  k.Ra = !0;
  k.Ja = function () {
    return this.Qd.toString();
  };
  k.Fd = !0;
  k.Ac = function () {
    return 1;
  };
  k.toString = function () {
    return "TrustedResourceUrl{" + this.Qd + "}";
  };
  function hb(a) {
    if (a instanceof fb && a.constructor === fb) return a.Qd;
    Ea(
      "expected object of type TrustedResourceUrl, got '" +
        a +
        "' of type " +
        va(a)
    );
    return "type_error:TrustedResourceUrl";
  }
  function ib() {
    var a = eb(jb),
      b = ab();
    a = b ? b.createScriptURL(a) : a;
    return new fb(a, gb);
  }
  var gb = {};
  var kb = String.prototype.trim
    ? function (a) {
        return a.trim();
      }
    : function (a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
      };
  function lb(a, b) {
    if (b)
      a = a
        .replace(mb, "&amp;")
        .replace(nb, "&lt;")
        .replace(ob, "&gt;")
        .replace(pb, "&quot;")
        .replace(qb, "&#39;")
        .replace(rb, "&#0;");
    else {
      if (!sb.test(a)) return a;
      -1 != a.indexOf("&") && (a = a.replace(mb, "&amp;"));
      -1 != a.indexOf("<") && (a = a.replace(nb, "&lt;"));
      -1 != a.indexOf(">") && (a = a.replace(ob, "&gt;"));
      -1 != a.indexOf('"') && (a = a.replace(pb, "&quot;"));
      -1 != a.indexOf("'") && (a = a.replace(qb, "&#39;"));
      -1 != a.indexOf("\x00") && (a = a.replace(rb, "&#0;"));
    }
    return a;
  }
  var mb = /&/g,
    nb = /</g,
    ob = />/g,
    pb = /"/g,
    qb = /'/g,
    rb = /\x00/g,
    sb = /[\x00&<>"']/;
  function tb(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function ub(a, b) {
    this.Pd = b === vb ? a : "";
  }
  k = ub.prototype;
  k.Ra = !0;
  k.Ja = function () {
    return this.Pd.toString();
  };
  k.Fd = !0;
  k.Ac = function () {
    return 1;
  };
  k.toString = function () {
    return "SafeUrl{" + this.Pd + "}";
  };
  function wb(a) {
    if (a instanceof ub && a.constructor === ub) return a.Pd;
    Ea("expected object of type SafeUrl, got '" + a + "' of type " + va(a));
    return "type_error:SafeUrl";
  }
  var xb = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font\/\w+|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video\/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i,
    yb = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
    Ab = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
  function Bb(a) {
    if (a instanceof ub) return a;
    a = "object" == typeof a && a.Ra ? a.Ja() : String(a);
    if (Ab.test(a)) a = Cb(a);
    else {
      a = String(a);
      a = a.replace(/(%0A|%0D)/g, "");
      var b = a.match(yb);
      a = b && xb.test(b[1]) ? Cb(a) : null;
    }
    return a;
  }
  function Db(a) {
    if (a instanceof ub) return a;
    a = "object" == typeof a && a.Ra ? a.Ja() : String(a);
    Ab.test(a) || (a = "about:invalid#zClosurez");
    return Cb(a);
  }
  var vb = {};
  function Cb(a) {
    return new ub(a, vb);
  }
  var Eb = Cb("about:invalid#zClosurez");
  function Fb(a, b) {
    this.Od = b === Gb ? a : "";
  }
  Fb.prototype.Ra = !0;
  Fb.prototype.Ja = function () {
    return this.Od;
  };
  Fb.prototype.toString = function () {
    return "SafeStyle{" + this.Od + "}";
  };
  var Gb = {};
  var Hb = {};
  function Ib(a, b) {
    this.Nd = b === Hb ? a : "";
    this.Ra = !0;
  }
  Ib.prototype.Ja = function () {
    return this.Nd;
  };
  Ib.prototype.toString = function () {
    return "SafeStyleSheet{" + this.Nd + "}";
  };
  var Jb;
  a: {
    var Kb = q.navigator;
    if (Kb) {
      var Lb = Kb.userAgent;
      if (Lb) {
        Jb = Lb;
        break a;
      }
    }
    Jb = "";
  }
  function y(a) {
    return -1 != Jb.indexOf(a);
  }
  function Mb() {
    return (y("Chrome") || y("CriOS")) && !y("Edge");
  }
  function Nb(a, b, c) {
    this.Md = c === Ob ? a : "";
    this.og = b;
  }
  k = Nb.prototype;
  k.Fd = !0;
  k.Ac = function () {
    return this.og;
  };
  k.Ra = !0;
  k.Ja = function () {
    return this.Md.toString();
  };
  k.toString = function () {
    return "SafeHtml{" + this.Md + "}";
  };
  function Pb(a) {
    if (a instanceof Nb && a.constructor === Nb) return a.Md;
    Ea("expected object of type SafeHtml, got '" + a + "' of type " + va(a));
    return "type_error:SafeHtml";
  }
  function Qb(a) {
    if (a instanceof Nb) return a;
    var b = "object" == typeof a,
      c = null;
    b && a.Fd && (c = a.Ac());
    return Rb(lb(b && a.Ra ? a.Ja() : String(a)), c);
  }
  var Ob = {};
  function Rb(a, b) {
    var c = ab();
    a = c ? c.createHTML(a) : a;
    return new Nb(a, b, Ob);
  }
  var Sb = new Nb((q.trustedTypes && q.trustedTypes.emptyHTML) || "", 0, Ob);
  function Tb(a, b) {
    var c = Ub(a);
    c &&
      "undefined" != typeof c[b] &&
      ((a &&
        (a instanceof c[b] ||
          !(a instanceof c.Location || a instanceof c.Element))) ||
        Ea(
          "Argument is not a %s (or a non-Element, non-Location mock); got: %s",
          b,
          Vb(a)
        ));
  }
  function Vb(a) {
    if (t(a))
      try {
        return (
          a.constructor.displayName ||
          a.constructor.name ||
          Object.prototype.toString.call(a)
        );
      } catch (b) {
        return "<object could not be stringified>";
      }
    else return void 0 === a ? "undefined" : null === a ? "null" : typeof a;
  }
  function Ub(a) {
    try {
      var b = a && a.ownerDocument,
        c = b && (b.defaultView || b.parentWindow);
      c = c || q;
      if (c.Element && c.Location) return c;
    } catch (d) {}
    return null;
  }
  var Wb = (function (a) {
    var b = !1,
      c;
    return function () {
      b || ((c = a()), (b = !0));
      return c;
    };
  })(function () {
    if ("undefined" === typeof document) return !1;
    var a = document.createElement("div"),
      b = document.createElement("div");
    b.appendChild(document.createElement("div"));
    a.appendChild(b);
    if (!a.firstChild) return !1;
    b = a.firstChild.firstChild;
    a.innerHTML = Pb(Sb);
    return !b.parentElement;
  });
  function Xb(a, b) {
    Tb(a, "HTMLScriptElement");
    a.src = hb(b);
    (b = a.ownerDocument && a.ownerDocument.defaultView) && b != q
      ? (b = sa(b.document))
      : (null === ra && (ra = sa(q.document)), (b = ra));
    b && a.setAttribute("nonce", b);
  }
  function Yb(a, b) {
    var c = Ub(a);
    c &&
      (!a || (!(a instanceof c.Location) && a instanceof c.Element)) &&
      Ea("Argument is not a Location (or a non-Element mock); got: %s", Vb(a));
    b = b instanceof ub ? b : Db(b);
    a.assign(wb(b));
  }
  function Zb(a, b, c, d) {
    a = a instanceof ub ? a : Db(a);
    b = b || q;
    c = c instanceof bb ? eb(c) : c || "";
    return b.open(wb(a), c, d, void 0);
  }
  function $b(a) {
    return (a = lb(a, void 0));
  }
  var ac =
    "StopIteration" in q
      ? q.StopIteration
      : { message: "StopIteration", stack: "" };
  function bc() {}
  bc.prototype.next = function () {
    throw ac;
  };
  bc.prototype.cb = function () {
    return this;
  };
  function cc(a) {
    if (a instanceof bc) return a;
    if ("function" == typeof a.cb) return a.cb(!1);
    if (wa(a)) {
      var b = 0,
        c = new bc();
      c.next = function () {
        for (;;) {
          if (b >= a.length) throw ac;
          if (b in a) return a[b++];
          b++;
        }
      };
      return c;
    }
    throw Error("Not implemented");
  }
  function dc(a, b) {
    if (wa(a))
      try {
        Ga(a, b, void 0);
      } catch (c) {
        if (c !== ac) throw c;
      }
    else {
      a = cc(a);
      try {
        for (;;) b.call(void 0, a.next(), void 0, a);
      } catch (c) {
        if (c !== ac) throw c;
      }
    }
  }
  function ec(a) {
    if (wa(a)) return Ra(a);
    a = cc(a);
    var b = [];
    dc(a, function (c) {
      b.push(c);
    });
    return b;
  }
  function fc(a, b) {
    this.Aa = {};
    this.H = [];
    this.oc = this.K = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error("Uneven number of arguments");
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else a && this.addAll(a);
  }
  k = fc.prototype;
  k.ra = function () {
    gc(this);
    for (var a = [], b = 0; b < this.H.length; b++) a.push(this.Aa[this.H[b]]);
    return a;
  };
  k.Ha = function () {
    gc(this);
    return this.H.concat();
  };
  k.Wa = function (a) {
    return hc(this.Aa, a);
  };
  k.Zb = function () {
    return 0 == this.K;
  };
  k.clear = function () {
    this.Aa = {};
    this.oc = this.K = this.H.length = 0;
  };
  k.remove = function (a) {
    return hc(this.Aa, a)
      ? (delete this.Aa[a],
        this.K--,
        this.oc++,
        this.H.length > 2 * this.K && gc(this),
        !0)
      : !1;
  };
  function gc(a) {
    if (a.K != a.H.length) {
      for (var b = 0, c = 0; b < a.H.length; ) {
        var d = a.H[b];
        hc(a.Aa, d) && (a.H[c++] = d);
        b++;
      }
      a.H.length = c;
    }
    if (a.K != a.H.length) {
      var e = {};
      for (c = b = 0; b < a.H.length; )
        (d = a.H[b]), hc(e, d) || ((a.H[c++] = d), (e[d] = 1)), b++;
      a.H.length = c;
    }
  }
  k.get = function (a, b) {
    return hc(this.Aa, a) ? this.Aa[a] : b;
  };
  k.set = function (a, b) {
    hc(this.Aa, a) || (this.K++, this.H.push(a), this.oc++);
    this.Aa[a] = b;
  };
  k.addAll = function (a) {
    if (a instanceof fc)
      for (var b = a.Ha(), c = 0; c < b.length; c++)
        this.set(b[c], a.get(b[c]));
    else for (b in a) this.set(b, a[b]);
  };
  k.forEach = function (a, b) {
    for (var c = this.Ha(), d = 0; d < c.length; d++) {
      var e = c[d],
        f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  k.clone = function () {
    return new fc(this);
  };
  k.cb = function (a) {
    gc(this);
    var b = 0,
      c = this.oc,
      d = this,
      e = new bc();
    e.next = function () {
      if (c != d.oc)
        throw Error("The map has changed since the iterator was created");
      if (b >= d.H.length) throw ac;
      var f = d.H[b++];
      return a ? f : d.Aa[f];
    };
    return e;
  };
  function hc(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function ic(a) {
    if (a.ra && "function" == typeof a.ra) return a.ra();
    if ("string" === typeof a) return a.split("");
    if (wa(a)) {
      for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
      return b;
    }
    b = [];
    c = 0;
    for (d in a) b[c++] = a[d];
    return b;
  }
  function jc(a) {
    if (a.Ha && "function" == typeof a.Ha) return a.Ha();
    if (!a.ra || "function" != typeof a.ra) {
      if (wa(a) || "string" === typeof a) {
        var b = [];
        a = a.length;
        for (var c = 0; c < a; c++) b.push(c);
        return b;
      }
      b = [];
      c = 0;
      for (var d in a) b[c++] = d;
      return b;
    }
  }
  function kc(a, b, c) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
    else if (wa(a) || "string" === typeof a) Ga(a, b, c);
    else
      for (var d = jc(a), e = ic(a), f = e.length, g = 0; g < f; g++)
        b.call(c, e[g], d && d[g], a);
  }
  var lc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
  function mc(a, b) {
    if (a) {
      a = a.split("&");
      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("="),
          e = null;
        if (0 <= d) {
          var f = a[c].substring(0, d);
          e = a[c].substring(d + 1);
        } else f = a[c];
        b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
      }
    }
  }
  function nc(a, b, c, d) {
    for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d; ) {
      var f = a.charCodeAt(b - 1);
      if (38 == f || 63 == f)
        if (((f = a.charCodeAt(b + e)), !f || 61 == f || 38 == f || 35 == f))
          return b;
      b += e + 1;
    }
    return -1;
  }
  var oc = /#|$/;
  function pc(a, b) {
    var c = a.search(oc),
      d = nc(a, 0, b, c);
    if (0 > d) return null;
    var e = a.indexOf("&", d);
    if (0 > e || e > c) e = c;
    d += b.length + 1;
    return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "));
  }
  var qc = /[?&]($|#)/;
  function rc(a, b) {
    this.pa = this.sb = this.bb = "";
    this.Fb = null;
    this.ib = this.ma = "";
    this.sa = this.Ng = !1;
    if (a instanceof rc) {
      this.sa = void 0 !== b ? b : a.sa;
      sc(this, a.bb);
      var c = a.sb;
      tc(this);
      this.sb = c;
      c = a.pa;
      tc(this);
      this.pa = c;
      uc(this, a.Fb);
      c = a.ma;
      tc(this);
      this.ma = c;
      vc(this, a.U.clone());
      a = a.ib;
      tc(this);
      this.ib = a;
    } else
      a && (c = String(a).match(lc))
        ? ((this.sa = !!b),
          sc(this, c[1] || "", !0),
          (a = c[2] || ""),
          tc(this),
          (this.sb = wc(a)),
          (a = c[3] || ""),
          tc(this),
          (this.pa = wc(a, !0)),
          uc(this, c[4]),
          (a = c[5] || ""),
          tc(this),
          (this.ma = wc(a, !0)),
          vc(this, c[6] || "", !0),
          (a = c[7] || ""),
          tc(this),
          (this.ib = wc(a)))
        : ((this.sa = !!b), (this.U = new xc(null, this.sa)));
  }
  k = rc.prototype;
  k.toString = function () {
    var a = [],
      b = this.bb;
    b && a.push(yc(b, zc, !0), ":");
    var c = this.pa;
    if (c || "file" == b)
      a.push("//"),
        (b = this.sb) && a.push(yc(b, zc, !0), "@"),
        a.push(
          encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
        ),
        (c = this.Fb),
        null != c && a.push(":", String(c));
    if ((c = this.ma))
      this.pa && "/" != c.charAt(0) && a.push("/"),
        a.push(yc(c, "/" == c.charAt(0) ? Ac : Bc, !0));
    (c = this.U.toString()) && a.push("?", c);
    (c = this.ib) && a.push("#", yc(c, Cc));
    return a.join("");
  };
  k.resolve = function (a) {
    var b = this.clone(),
      c = !!a.bb;
    c ? sc(b, a.bb) : (c = !!a.sb);
    if (c) {
      var d = a.sb;
      tc(b);
      b.sb = d;
    } else c = !!a.pa;
    c ? ((d = a.pa), tc(b), (b.pa = d)) : (c = null != a.Fb);
    d = a.ma;
    if (c) uc(b, a.Fb);
    else if ((c = !!a.ma)) {
      if ("/" != d.charAt(0))
        if (this.pa && !this.ma) d = "/" + d;
        else {
          var e = b.ma.lastIndexOf("/");
          -1 != e && (d = b.ma.substr(0, e + 1) + d);
        }
      e = d;
      if (".." == e || "." == e) d = "";
      else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
        d = 0 == e.lastIndexOf("/", 0);
        e = e.split("/");
        for (var f = [], g = 0; g < e.length; ) {
          var h = e[g++];
          "." == h
            ? d && g == e.length && f.push("")
            : ".." == h
            ? ((1 < f.length || (1 == f.length && "" != f[0])) && f.pop(),
              d && g == e.length && f.push(""))
            : (f.push(h), (d = !0));
        }
        d = f.join("/");
      } else d = e;
    }
    c ? (tc(b), (b.ma = d)) : (c = "" !== a.U.toString());
    c ? vc(b, a.U.clone()) : (c = !!a.ib);
    c && ((a = a.ib), tc(b), (b.ib = a));
    return b;
  };
  k.clone = function () {
    return new rc(this);
  };
  function sc(a, b, c) {
    tc(a);
    a.bb = c ? wc(b, !0) : b;
    a.bb && (a.bb = a.bb.replace(/:$/, ""));
  }
  function uc(a, b) {
    tc(a);
    if (b) {
      b = Number(b);
      if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
      a.Fb = b;
    } else a.Fb = null;
  }
  function vc(a, b, c) {
    tc(a);
    b instanceof xc
      ? ((a.U = b), a.U.Vd(a.sa))
      : (c || (b = yc(b, Dc)), (a.U = new xc(b, a.sa)));
  }
  k.getQuery = function () {
    return this.U.toString();
  };
  function Ec(a, b, c) {
    tc(a);
    a.U.set(b, c);
  }
  k.removeParameter = function (a) {
    tc(this);
    this.U.remove(a);
    return this;
  };
  function tc(a) {
    if (a.Ng) throw Error("Tried to modify a read-only Uri");
  }
  k.Vd = function (a) {
    this.sa = a;
    this.U && this.U.Vd(a);
  };
  function Fc(a) {
    return a instanceof rc ? a.clone() : new rc(a, void 0);
  }
  function wc(a, b) {
    return a
      ? b
        ? decodeURI(a.replace(/%25/g, "%2525"))
        : decodeURIComponent(a)
      : "";
  }
  function yc(a, b, c) {
    return "string" === typeof a
      ? ((a = encodeURI(a).replace(b, Gc)),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a)
      : null;
  }
  function Gc(a) {
    a = a.charCodeAt(0);
    return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
  }
  var zc = /[#\/\?@]/g,
    Bc = /[#\?:]/g,
    Ac = /[#\?]/g,
    Dc = /[#\?@]/g,
    Cc = /#/g;
  function xc(a, b) {
    this.K = this.N = null;
    this.la = a || null;
    this.sa = !!b;
  }
  function Hc(a) {
    a.N ||
      ((a.N = new fc()),
      (a.K = 0),
      a.la &&
        mc(a.la, function (b, c) {
          a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
        }));
  }
  k = xc.prototype;
  k.add = function (a, b) {
    Hc(this);
    this.la = null;
    a = Ic(this, a);
    var c = this.N.get(a);
    c || this.N.set(a, (c = []));
    c.push(b);
    this.K += 1;
    return this;
  };
  k.remove = function (a) {
    Hc(this);
    a = Ic(this, a);
    return this.N.Wa(a)
      ? ((this.la = null), (this.K -= this.N.get(a).length), this.N.remove(a))
      : !1;
  };
  k.clear = function () {
    this.N = this.la = null;
    this.K = 0;
  };
  k.Zb = function () {
    Hc(this);
    return 0 == this.K;
  };
  k.Wa = function (a) {
    Hc(this);
    a = Ic(this, a);
    return this.N.Wa(a);
  };
  k.forEach = function (a, b) {
    Hc(this);
    this.N.forEach(function (c, d) {
      Ga(
        c,
        function (e) {
          a.call(b, e, d, this);
        },
        this
      );
    }, this);
  };
  k.Ha = function () {
    Hc(this);
    for (var a = this.N.ra(), b = this.N.Ha(), c = [], d = 0; d < b.length; d++)
      for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c;
  };
  k.ra = function (a) {
    Hc(this);
    var b = [];
    if ("string" === typeof a)
      this.Wa(a) && (b = Qa(b, this.N.get(Ic(this, a))));
    else {
      a = this.N.ra();
      for (var c = 0; c < a.length; c++) b = Qa(b, a[c]);
    }
    return b;
  };
  k.set = function (a, b) {
    Hc(this);
    this.la = null;
    a = Ic(this, a);
    this.Wa(a) && (this.K -= this.N.get(a).length);
    this.N.set(a, [b]);
    this.K += 1;
    return this;
  };
  k.get = function (a, b) {
    if (!a) return b;
    a = this.ra(a);
    return 0 < a.length ? String(a[0]) : b;
  };
  k.toString = function () {
    if (this.la) return this.la;
    if (!this.N) return "";
    for (var a = [], b = this.N.Ha(), c = 0; c < b.length; c++) {
      var d = b[c],
        e = encodeURIComponent(String(d));
      d = this.ra(d);
      for (var f = 0; f < d.length; f++) {
        var g = e;
        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g);
      }
    }
    return (this.la = a.join("&"));
  };
  k.clone = function () {
    var a = new xc();
    a.la = this.la;
    this.N && ((a.N = this.N.clone()), (a.K = this.K));
    return a;
  };
  function Ic(a, b) {
    b = String(b);
    a.sa && (b = b.toLowerCase());
    return b;
  }
  k.Vd = function (a) {
    a &&
      !this.sa &&
      (Hc(this),
      (this.la = null),
      this.N.forEach(function (b, c) {
        var d = c.toLowerCase();
        c != d &&
          (this.remove(c),
          this.remove(d),
          0 < b.length &&
            ((this.la = null),
            this.N.set(Ic(this, d), Ra(b)),
            (this.K += b.length)));
      }, this));
    this.sa = a;
  };
  k.extend = function (a) {
    for (var b = 0; b < arguments.length; b++)
      kc(
        arguments[b],
        function (c, d) {
          this.add(d, c);
        },
        this
      );
  };
  var Jc = { hi: !0 },
    Kc = { ji: !0 },
    Lc = { ii: !0 },
    Mc = { gi: !0 };
  function Nc() {
    throw Error("Do not instantiate directly");
  }
  Nc.prototype.Pb = null;
  Nc.prototype.toString = function () {
    return this.content;
  };
  function Oc() {
    Nc.call(this);
  }
  x(Oc, Nc);
  Oc.prototype.gb = Jc;
  function Pc() {
    Nc.call(this);
  }
  x(Pc, Nc);
  Pc.prototype.gb = Kc;
  Pc.prototype.Pb = 1;
  function Qc(a, b) {
    return null != a && a.gb === b;
  }
  function Rc(a) {
    Rc[" "](a);
    return a;
  }
  Rc[" "] = ta;
  function Sc(a, b) {
    var c = Tc;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : (c[a] = b(a));
  }
  var Uc = y("Opera"),
    A = y("Trident") || y("MSIE"),
    Vc = y("Edge"),
    Wc = Vc || A,
    Xc =
      y("Gecko") &&
      !(-1 != Jb.toLowerCase().indexOf("webkit") && !y("Edge")) &&
      !(y("Trident") || y("MSIE")) &&
      !y("Edge"),
    Yc = -1 != Jb.toLowerCase().indexOf("webkit") && !y("Edge"),
    Zc = Yc && y("Mobile"),
    $c = y("Macintosh");
  function ad() {
    var a = q.document;
    return a ? a.documentMode : void 0;
  }
  var bd;
  a: {
    var cd = "",
      dd = (function () {
        var a = Jb;
        if (Xc) return /rv:([^\);]+)(\)|;)/.exec(a);
        if (Vc) return /Edge\/([\d\.]+)/.exec(a);
        if (A) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (Yc) return /WebKit\/(\S+)/.exec(a);
        if (Uc) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    dd && (cd = dd ? dd[1] : "");
    if (A) {
      var ed = ad();
      if (null != ed && ed > parseFloat(cd)) {
        bd = String(ed);
        break a;
      }
    }
    bd = cd;
  }
  var fd = bd,
    Tc = {};
  function gd(a) {
    return Sc(a, function () {
      for (
        var b = 0,
          c = kb(String(fd)).split("."),
          d = kb(String(a)).split("."),
          e = Math.max(c.length, d.length),
          f = 0;
        0 == b && f < e;
        f++
      ) {
        var g = c[f] || "",
          h = d[f] || "";
        do {
          g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
          h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
          if (0 == g[0].length && 0 == h[0].length) break;
          b =
            tb(
              0 == g[1].length ? 0 : parseInt(g[1], 10),
              0 == h[1].length ? 0 : parseInt(h[1], 10)
            ) ||
            tb(0 == g[2].length, 0 == h[2].length) ||
            tb(g[2], h[2]);
          g = g[3];
          h = h[3];
        } while (0 == b);
      }
      return 0 <= b;
    });
  }
  var hd;
  if (q.document && A) {
    var id = ad();
    hd = id ? id : parseInt(fd, 10) || void 0;
  } else hd = void 0;
  var jd = hd;
  var kd =
    Object.freeze ||
    function (a) {
      return a;
    };
  function ld(a) {
    if (null != a)
      switch (a.Pb) {
        case 1:
          return 1;
        case -1:
          return -1;
        case 0:
          return 0;
      }
    return null;
  }
  function B(a) {
    return Qc(a, Jc)
      ? a
      : a instanceof Nb
      ? C(Pb(a).toString(), a.Ac())
      : C($b(String(String(a))), ld(a));
  }
  var C = (function (a) {
      function b(c) {
        this.content = c;
      }
      b.prototype = a.prototype;
      return function (c, d) {
        c = new b(String(c));
        void 0 !== d && (c.Pb = d);
        return c;
      };
    })(Oc),
    md = (function (a) {
      function b(c) {
        this.content = c;
      }
      b.prototype = a.prototype;
      return function (c) {
        return new b(String(c));
      };
    })(Pc);
  function nd(a, b) {
    return a && b && a.Mg && b.Mg
      ? a.gb !== b.gb
        ? !1
        : a.toString() === b.toString()
      : a instanceof Nc && b instanceof Nc
      ? a.gb != b.gb
        ? !1
        : a.toString() == b.toString()
      : a == b;
  }
  function od(a) {
    return a instanceof Nc ? !!a.content : !!a;
  }
  var pd = (function (a) {
    function b(c) {
      this.content = c;
    }
    b.prototype = a.prototype;
    return function (c, d) {
      c = String(c);
      if (!c) return "";
      c = new b(c);
      void 0 !== d && (c.Pb = d);
      return c;
    };
  })(Oc);
  function qd(a) {
    return a.replace(/<\//g, "<\\/").replace(/\]\]>/g, "]]\\>");
  }
  function rd(a) {
    return Qc(a, Jc)
      ? String(String(a.content).replace(sd, "").replace(td, "&lt;")).replace(
          ud,
          vd
        )
      : $b(String(a));
  }
  function wd(a) {
    Qc(a, Kc) || Qc(a, Lc)
      ? (a = xd(a))
      : a instanceof ub
      ? (a = xd(wb(a)))
      : a instanceof fb
      ? (a = xd(hb(a).toString()))
      : ((a = String(a)),
        yd.test(a)
          ? (a = a.replace(zd, Ad))
          : (Ea("Bad value `%s` for |filterNormalizeUri", [a]),
            (a = "about:invalid#zSoyz")));
    return a;
  }
  function Bd(a) {
    Qc(a, Kc) || Qc(a, Lc)
      ? (a = xd(a))
      : a instanceof ub
      ? (a = xd(wb(a)))
      : a instanceof fb
      ? (a = xd(hb(a).toString()))
      : ((a = String(a)),
        Cd.test(a)
          ? (a = a.replace(zd, Ad))
          : (Ea("Bad value `%s` for |filterNormalizeMediaUri", [a]),
            (a = "about:invalid#zSoyz")));
    return a;
  }
  function Dd(a) {
    Qc(a, Mc)
      ? (a = qd(a.content))
      : null == a
      ? (a = "")
      : a instanceof Fb
      ? (a instanceof Fb && a.constructor === Fb
          ? (a = a.Od)
          : (Ea(
              "expected object of type SafeStyle, got '" +
                a +
                "' of type " +
                va(a)
            ),
            (a = "type_error:SafeStyle")),
        (a = qd(a)))
      : a instanceof Ib
      ? (a instanceof Ib && a.constructor === Ib
          ? (a = a.Nd)
          : (Ea(
              "expected object of type SafeStyleSheet, got '" +
                a +
                "' of type " +
                va(a)
            ),
            (a = "type_error:SafeStyleSheet")),
        (a = qd(a)))
      : ((a = String(a)),
        Ed.test(a) ||
          (Ea("Bad value `%s` for |filterCssValue", [a]), (a = "zSoyz")));
    return a;
  }
  function D(a, b, c, d) {
    a ||
      ((a =
        c instanceof Function
          ? c.displayName || c.name || "unknown type name"
          : c instanceof Object
          ? c.constructor.displayName ||
            c.constructor.name ||
            Object.prototype.toString.call(c)
          : null === c
          ? "null"
          : typeof c),
      Ea("expected param " + b + " of type " + d + (", but got " + a) + "."));
    return c;
  }
  var Fd = {
    "\x00": "&#0;",
    "\t": "&#9;",
    "\n": "&#10;",
    "\x0B": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "-": "&#45;",
    "/": "&#47;",
    "<": "&lt;",
    "=": "&#61;",
    ">": "&gt;",
    "`": "&#96;",
    "\u0085": "&#133;",
    "\u00a0": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;",
  };
  function vd(a) {
    return Fd[a];
  }
  var Gd = {
    "\x00": "%00",
    "\u0001": "%01",
    "\u0002": "%02",
    "\u0003": "%03",
    "\u0004": "%04",
    "\u0005": "%05",
    "\u0006": "%06",
    "\u0007": "%07",
    "\b": "%08",
    "\t": "%09",
    "\n": "%0A",
    "\x0B": "%0B",
    "\f": "%0C",
    "\r": "%0D",
    "\u000e": "%0E",
    "\u000f": "%0F",
    "\u0010": "%10",
    "\u0011": "%11",
    "\u0012": "%12",
    "\u0013": "%13",
    "\u0014": "%14",
    "\u0015": "%15",
    "\u0016": "%16",
    "\u0017": "%17",
    "\u0018": "%18",
    "\u0019": "%19",
    "\u001a": "%1A",
    "\u001b": "%1B",
    "\u001c": "%1C",
    "\u001d": "%1D",
    "\u001e": "%1E",
    "\u001f": "%1F",
    " ": "%20",
    '"': "%22",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "<": "%3C",
    ">": "%3E",
    "\\": "%5C",
    "{": "%7B",
    "}": "%7D",
    "\u007f": "%7F",
    "\u0085": "%C2%85",
    "\u00a0": "%C2%A0",
    "\u2028": "%E2%80%A8",
    "\u2029": "%E2%80%A9",
    "\uff01": "%EF%BC%81",
    "\uff03": "%EF%BC%83",
    "\uff04": "%EF%BC%84",
    "\uff06": "%EF%BC%86",
    "\uff07": "%EF%BC%87",
    "\uff08": "%EF%BC%88",
    "\uff09": "%EF%BC%89",
    "\uff0a": "%EF%BC%8A",
    "\uff0b": "%EF%BC%8B",
    "\uff0c": "%EF%BC%8C",
    "\uff0f": "%EF%BC%8F",
    "\uff1a": "%EF%BC%9A",
    "\uff1b": "%EF%BC%9B",
    "\uff1d": "%EF%BC%9D",
    "\uff1f": "%EF%BC%9F",
    "\uff20": "%EF%BC%A0",
    "\uff3b": "%EF%BC%BB",
    "\uff3d": "%EF%BC%BD",
  };
  function Ad(a) {
    return Gd[a];
  }
  var ud = /[\x00\x22\x27\x3c\x3e]/g,
    zd = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,
    Ed = /^(?!-*(?:expression|(?:moz-)?binding))(?:(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|(?:rgb|hsl)a?\([0-9.%,\u0020]+\)|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,4}|%)?|!important)(?:\s*[,\u0020]\s*|$))*$/i,
    yd = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,
    Cd = /^[^&:\/?#]*(?:[\/?#]|$)|^https?:|^data:image\/[a-z0-9+]+;base64,[a-z0-9+\/]+=*$|^blob:/i;
  function xd(a) {
    return String(a).replace(zd, Ad);
  }
  var sd = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    td = /</g;
  function Hd(a) {
    this.ka = void 0;
    this.W = {};
    if (a) {
      var b = jc(a);
      a = ic(a);
      for (var c = 0; c < b.length; c++) this.set(b[c], a[c]);
    }
  }
  k = Hd.prototype;
  k.set = function (a, b) {
    Id(this, a, b, !1);
  };
  k.add = function (a, b) {
    Id(this, a, b, !0);
  };
  function Id(a, b, c, d) {
    for (var e = 0; e < b.length; e++) {
      var f = b.charAt(e);
      a.W[f] || (a.W[f] = new Hd());
      a = a.W[f];
    }
    if (d && void 0 !== a.ka)
      throw Error('The collection already contains the key "' + b + '"');
    a.ka = c;
  }
  k.get = function (a) {
    a: {
      for (var b = this, c = 0; c < a.length; c++)
        if (((b = b.W[a.charAt(c)]), !b)) {
          a = void 0;
          break a;
        }
      a = b;
    }
    return a ? a.ka : void 0;
  };
  k.ra = function () {
    var a = [];
    Jd(this, a);
    return a;
  };
  function Jd(a, b) {
    void 0 !== a.ka && b.push(a.ka);
    for (var c in a.W) Jd(a.W[c], b);
  }
  k.Ha = function (a) {
    var b = [];
    if (a) {
      for (var c = this, d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        if (!c.W[e]) return [];
        c = c.W[e];
      }
      Kd(c, a, b);
    } else Kd(this, "", b);
    return b;
  };
  function Kd(a, b, c) {
    void 0 !== a.ka && c.push(b);
    for (var d in a.W) Kd(a.W[d], b + d, c);
  }
  k.Wa = function (a) {
    return void 0 !== this.get(a);
  };
  k.clear = function () {
    this.W = {};
    this.ka = void 0;
  };
  k.remove = function (a) {
    for (var b = this, c = [], d = 0; d < a.length; d++) {
      var e = a.charAt(d);
      if (!b.W[e])
        throw Error('The collection does not have the key "' + a + '"');
      c.push([b, e]);
      b = b.W[e];
    }
    a = b.ka;
    for (delete b.ka; 0 < c.length; )
      if (((e = c.pop()), (b = e[0]), (e = e[1]), b.W[e].Zb())) delete b.W[e];
      else break;
    return a;
  };
  k.clone = function () {
    return new Hd(this);
  };
  k.Zb = function () {
    var a;
    if ((a = void 0 === this.ka))
      a: {
        for (var b in this.W) {
          a = !1;
          break a;
        }
        a = !0;
      }
    return a;
  };
  function Ld(a) {
    this.Qa = a;
    this.ae = new Hd();
    for (a = 0; a < this.Qa.length; a++) {
      var b = this.ae.get("+" + this.Qa[a].a);
      b ? b.push(this.Qa[a]) : this.ae.add("+" + this.Qa[a].a, [this.Qa[a]]);
    }
  }
  Ld.prototype.search = function (a) {
    var b = this.ae,
      c = {},
      d = 0;
    void 0 !== b.ka && (c[d] = b.ka);
    for (; d < a.length; d++) {
      var e = a.charAt(d);
      if (!(e in b.W)) break;
      b = b.W[e];
      void 0 !== b.ka && (c[d] = b.ka);
    }
    for (var f in c) if (c.hasOwnProperty(f)) return c[f];
    return [];
  };
  function Md(a) {
    for (var b = 0; b < Nd.length; b++) if (Nd[b].b === a) return Nd[b];
    return null;
  }
  function Od(a) {
    a = a.toUpperCase();
    for (var b = [], c = 0; c < Nd.length; c++) Nd[c].c === a && b.push(Nd[c]);
    return b;
  }
  function Pd(a) {
    if (0 < a.length && "+" == a.charAt(0)) {
      a = a.substring(1);
      for (var b = [], c = 0; c < Nd.length; c++) Nd[c].a == a && b.push(Nd[c]);
      a = b;
    } else a = Od(a);
    return a;
  }
  function Qd(a) {
    a.sort(function (b, c) {
      return b.name.localeCompare(c.name, "ja");
    });
  }
  var Nd = [
    {
      name: "\u30a2\u30d5\u30ac\u30cb\u30b9\u30bf\u30f3",
      b: "93-AF-0",
      a: "93",
      c: "AF",
    },
    {
      name: "\u30aa\u30fc\u30e9\u30f3\u30c9\u8af8\u5cf6",
      b: "358-AX-0",
      a: "358",
      c: "AX",
    },
    {
      name: "\u30a2\u30eb\u30d0\u30cb\u30a2",
      b: "355-AL-0",
      a: "355",
      c: "AL",
    },
    {
      name: "\u30a2\u30eb\u30b8\u30a7\u30ea\u30a2",
      b: "213-DZ-0",
      a: "213",
      c: "DZ",
    },
    {
      name: "\u30a2\u30e1\u30ea\u30ab\u9818\u30b5\u30e2\u30a2",
      b: "1-AS-0",
      a: "1",
      c: "AS",
    },
    { name: "\u30a2\u30f3\u30c9\u30e9", b: "376-AD-0", a: "376", c: "AD" },
    { name: "\u30a2\u30f3\u30b4\u30e9", b: "244-AO-0", a: "244", c: "AO" },
    { name: "\u30a2\u30f3\u30ae\u30e9", b: "1-AI-0", a: "1", c: "AI" },
    {
      name:
        "\u30a2\u30f3\u30c6\u30a3\u30b0\u30a2 \u30d0\u30fc\u30d6\u30fc\u30c0",
      b: "1-AG-0",
      a: "1",
      c: "AG",
    },
    {
      name: "\u30a2\u30eb\u30bc\u30f3\u30c1\u30f3",
      b: "54-AR-0",
      a: "54",
      c: "AR",
    },
    {
      name: "\u30a2\u30eb\u30e1\u30cb\u30a2",
      b: "374-AM-0",
      a: "374",
      c: "AM",
    },
    { name: "\u30a2\u30eb\u30d0", b: "297-AW-0", a: "297", c: "AW" },
    {
      name: "\u30a2\u30bb\u30f3\u30b7\u30e7\u30f3\u5cf6",
      b: "247-AC-0",
      a: "247",
      c: "AC",
    },
    {
      name: "\u30aa\u30fc\u30b9\u30c8\u30e9\u30ea\u30a2",
      b: "61-AU-0",
      a: "61",
      c: "AU",
    },
    {
      name: "\u30aa\u30fc\u30b9\u30c8\u30ea\u30a2",
      b: "43-AT-0",
      a: "43",
      c: "AT",
    },
    {
      name: "\u30a2\u30bc\u30eb\u30d0\u30a4\u30b8\u30e3\u30f3",
      b: "994-AZ-0",
      a: "994",
      c: "AZ",
    },
    { name: "\u30d0\u30cf\u30de", b: "1-BS-0", a: "1", c: "BS" },
    {
      name: "\u30d0\u30fc\u30ec\u30fc\u30f3",
      b: "973-BH-0",
      a: "973",
      c: "BH",
    },
    {
      name: "\u30d0\u30f3\u30b0\u30e9\u30c7\u30b7\u30e5",
      b: "880-BD-0",
      a: "880",
      c: "BD",
    },
    { name: "\u30d0\u30eb\u30d0\u30c9\u30b9", b: "1-BB-0", a: "1", c: "BB" },
    {
      name: "\u30d9\u30e9\u30eb\u30fc\u30b7",
      b: "375-BY-0",
      a: "375",
      c: "BY",
    },
    { name: "\u30d9\u30eb\u30ae\u30fc", b: "32-BE-0", a: "32", c: "BE" },
    { name: "\u30d9\u30ea\u30fc\u30ba", b: "501-BZ-0", a: "501", c: "BZ" },
    { name: "\u30d9\u30ca\u30f3", b: "229-BJ-0", a: "229", c: "BJ" },
    { name: "\u30d0\u30df\u30e5\u30fc\u30c0", b: "1-BM-0", a: "1", c: "BM" },
    { name: "\u30d6\u30fc\u30bf\u30f3", b: "975-BT-0", a: "975", c: "BT" },
    { name: "\u30dc\u30ea\u30d3\u30a2", b: "591-BO-0", a: "591", c: "BO" },
    {
      name:
        "\u30dc\u30b9\u30cb\u30a2 \u30d8\u30eb\u30c4\u30a7\u30b4\u30d3\u30ca",
      b: "387-BA-0",
      a: "387",
      c: "BA",
    },
    { name: "\u30dc\u30c4\u30ef\u30ca", b: "267-BW-0", a: "267", c: "BW" },
    { name: "\u30d6\u30e9\u30b8\u30eb", b: "55-BR-0", a: "55", c: "BR" },
    {
      name: "\u82f1\u9818\u30a4\u30f3\u30c9\u6d0b\u5730\u57df",
      b: "246-IO-0",
      a: "246",
      c: "IO",
    },
    {
      name: "\u82f1\u9818\u30d0\u30fc\u30b8\u30f3\u8af8\u5cf6",
      b: "1-VG-0",
      a: "1",
      c: "VG",
    },
    { name: "\u30d6\u30eb\u30cd\u30a4", b: "673-BN-0", a: "673", c: "BN" },
    {
      name: "\u30d6\u30eb\u30ac\u30ea\u30a2",
      b: "359-BG-0",
      a: "359",
      c: "BG",
    },
    {
      name: "\u30d6\u30eb\u30ad\u30ca\u30d5\u30a1\u30bd",
      b: "226-BF-0",
      a: "226",
      c: "BF",
    },
    { name: "\u30d6\u30eb\u30f3\u30b8", b: "257-BI-0", a: "257", c: "BI" },
    {
      name: "\u30ab\u30f3\u30dc\u30b8\u30a2",
      b: "855-KH-0",
      a: "855",
      c: "KH",
    },
    {
      name: "\u30ab\u30e1\u30eb\u30fc\u30f3",
      b: "237-CM-0",
      a: "237",
      c: "CM",
    },
    { name: "\u30ab\u30ca\u30c0", b: "1-CA-0", a: "1", c: "CA" },
    {
      name: "\u30ab\u30dc\u30d9\u30eb\u30c7",
      b: "238-CV-0",
      a: "238",
      c: "CV",
    },
    {
      name: "\u30aa\u30e9\u30f3\u30c0\u9818\u30ab\u30ea\u30d6",
      b: "599-BQ-0",
      a: "599",
      c: "BQ",
    },
    {
      name: "\u30b1\u30a4\u30de\u30f3\u8af8\u5cf6",
      b: "1-KY-0",
      a: "1",
      c: "KY",
    },
    {
      name: "\u4e2d\u592e\u30a2\u30d5\u30ea\u30ab\u5171\u548c\u56fd",
      b: "236-CF-0",
      a: "236",
      c: "CF",
    },
    { name: "\u30c1\u30e3\u30c9", b: "235-TD-0", a: "235", c: "TD" },
    { name: "\u30c1\u30ea", b: "56-CL-0", a: "56", c: "CL" },
    { name: "\u4e2d\u56fd", b: "86-CN-0", a: "86", c: "CN" },
    {
      name: "\u30af\u30ea\u30b9\u30de\u30b9\u5cf6",
      b: "61-CX-0",
      a: "61",
      c: "CX",
    },
    {
      name:
        "\u30b3\u30b3\u30b9\uff08\u30ad\u30fc\u30ea\u30f3\u30b0\uff09\u8af8\u5cf6",
      b: "61-CC-0",
      a: "61",
      c: "CC",
    },
    { name: "\u30b3\u30ed\u30f3\u30d3\u30a2", b: "57-CO-0", a: "57", c: "CO" },
    { name: "\u30b3\u30e2\u30ed", b: "269-KM-0", a: "269", c: "KM" },
    {
      name: "\u30b3\u30f3\u30b4\u6c11\u4e3b\u5171\u548c\u56fd",
      b: "243-CD-0",
      a: "243",
      c: "CD",
    },
    {
      name: "\u30b3\u30f3\u30b4\u5171\u548c\u56fd",
      b: "242-CG-0",
      a: "242",
      c: "CG",
    },
    {
      name: "\u30af\u30c3\u30af\u8af8\u5cf6",
      b: "682-CK-0",
      a: "682",
      c: "CK",
    },
    {
      name: "\u30b3\u30b9\u30bf\u30ea\u30ab",
      b: "506-CR-0",
      a: "506",
      c: "CR",
    },
    {
      name: "\u30b3\u30fc\u30c9\u30b8\u30dc\u30ef\u30fc\u30eb",
      b: "225-CI-0",
      a: "225",
      c: "CI",
    },
    {
      name: "\u30af\u30ed\u30a2\u30c1\u30a2",
      b: "385-HR-0",
      a: "385",
      c: "HR",
    },
    { name: "\u30ad\u30e5\u30fc\u30d0", b: "53-CU-0", a: "53", c: "CU" },
    {
      name: "\u30ad\u30e5\u30e9\u30bd\u30fc",
      b: "599-CW-0",
      a: "599",
      c: "CW",
    },
    { name: "\u30ad\u30d7\u30ed\u30b9", b: "357-CY-0", a: "357", c: "CY" },
    {
      name: "\u30c1\u30a7\u30b3\u5171\u548c\u56fd",
      b: "420-CZ-0",
      a: "420",
      c: "CZ",
    },
    { name: "\u30c7\u30f3\u30de\u30fc\u30af", b: "45-DK-0", a: "45", c: "DK" },
    { name: "\u30b8\u30d6\u30c1", b: "253-DJ-0", a: "253", c: "DJ" },
    { name: "\u30c9\u30df\u30cb\u30ab\u56fd", b: "1-DM-0", a: "1", c: "DM" },
    {
      name: "\u30c9\u30df\u30cb\u30ab\u5171\u548c\u56fd",
      b: "1-DO-0",
      a: "1",
      c: "DO",
    },
    {
      name: "\u6771\u30c6\u30a3\u30e2\u30fc\u30eb",
      b: "670-TL-0",
      a: "670",
      c: "TL",
    },
    {
      name: "\u30a8\u30af\u30a2\u30c9\u30eb",
      b: "593-EC-0",
      a: "593",
      c: "EC",
    },
    { name: "\u30a8\u30b8\u30d7\u30c8", b: "20-EG-0", a: "20", c: "EG" },
    {
      name: "\u30a8\u30eb\u30b5\u30eb\u30d0\u30c9\u30eb",
      b: "503-SV-0",
      a: "503",
      c: "SV",
    },
    {
      name: "\u8d64\u9053\u30ae\u30cb\u30a2",
      b: "240-GQ-0",
      a: "240",
      c: "GQ",
    },
    {
      name: "\u30a8\u30ea\u30c8\u30ea\u30a2",
      b: "291-ER-0",
      a: "291",
      c: "ER",
    },
    {
      name: "\u30a8\u30b9\u30c8\u30cb\u30a2",
      b: "372-EE-0",
      a: "372",
      c: "EE",
    },
    {
      name: "\u30a8\u30c1\u30aa\u30d4\u30a2",
      b: "251-ET-0",
      a: "251",
      c: "ET",
    },
    {
      name:
        "\u30d5\u30a9\u30fc\u30af\u30e9\u30f3\u30c9\u8af8\u5cf6\uff08\u30de\u30eb\u30d3\u30ca\u30b9\u8af8\u5cf6\uff09",
      b: "500-FK-0",
      a: "500",
      c: "FK",
    },
    {
      name: "\u30d5\u30a7\u30ed\u30fc\u8af8\u5cf6",
      b: "298-FO-0",
      a: "298",
      c: "FO",
    },
    { name: "\u30d5\u30a3\u30b8\u30fc", b: "679-FJ-0", a: "679", c: "FJ" },
    {
      name: "\u30d5\u30a3\u30f3\u30e9\u30f3\u30c9",
      b: "358-FI-0",
      a: "358",
      c: "FI",
    },
    { name: "\u30d5\u30e9\u30f3\u30b9", b: "33-FR-0", a: "33", c: "FR" },
    {
      name: "\u4ecf\u9818\u30ae\u30a2\u30ca",
      b: "594-GF-0",
      a: "594",
      c: "GF",
    },
    {
      name: "\u4ecf\u9818\u30dd\u30ea\u30cd\u30b7\u30a2",
      b: "689-PF-0",
      a: "689",
      c: "PF",
    },
    { name: "\u30ac\u30dc\u30f3", b: "241-GA-0", a: "241", c: "GA" },
    { name: "\u30ac\u30f3\u30d3\u30a2", b: "220-GM-0", a: "220", c: "GM" },
    {
      name: "\u30b8\u30e7\u30fc\u30b8\u30a2",
      b: "995-GE-0",
      a: "995",
      c: "GE",
    },
    { name: "\u30c9\u30a4\u30c4", b: "49-DE-0", a: "49", c: "DE" },
    { name: "\u30ac\u30fc\u30ca", b: "233-GH-0", a: "233", c: "GH" },
    {
      name: "\u30b8\u30d6\u30e9\u30eb\u30bf\u30eb",
      b: "350-GI-0",
      a: "350",
      c: "GI",
    },
    { name: "\u30ae\u30ea\u30b7\u30e3", b: "30-GR-0", a: "30", c: "GR" },
    {
      name: "\u30b0\u30ea\u30fc\u30f3\u30e9\u30f3\u30c9",
      b: "299-GL-0",
      a: "299",
      c: "GL",
    },
    { name: "\u30b0\u30ec\u30ca\u30c0", b: "1-GD-0", a: "1", c: "GD" },
    {
      name: "\u30b0\u30a2\u30c9\u30eb\u30fc\u30d7",
      b: "590-GP-0",
      a: "590",
      c: "GP",
    },
    { name: "\u30b0\u30a2\u30e0", b: "1-GU-0", a: "1", c: "GU" },
    {
      name: "\u30b0\u30a1\u30c6\u30de\u30e9",
      b: "502-GT-0",
      a: "502",
      c: "GT",
    },
    { name: "\u30ac\u30fc\u30f3\u30b8\u30fc", b: "44-GG-0", a: "44", c: "GG" },
    {
      name: "\u30ae\u30cb\u30a2 \u30b3\u30ca\u30af\u30ea",
      b: "224-GN-0",
      a: "224",
      c: "GN",
    },
    {
      name: "\u30ae\u30cb\u30a2\u30d3\u30b5\u30a6",
      b: "245-GW-0",
      a: "245",
      c: "GW",
    },
    { name: "\u30ac\u30a4\u30a2\u30ca", b: "592-GY-0", a: "592", c: "GY" },
    { name: "\u30cf\u30a4\u30c1", b: "509-HT-0", a: "509", c: "HT" },
    {
      name:
        "\u30cf\u30fc\u30c9\u5cf6\u304a\u3088\u3073\u30de\u30af\u30c9\u30ca\u30eb\u30c9\u8af8\u5cf6",
      b: "672-HM-0",
      a: "672",
      c: "HM",
    },
    {
      name: "\u30db\u30f3\u30b8\u30e5\u30e9\u30b9",
      b: "504-HN-0",
      a: "504",
      c: "HN",
    },
    { name: "\u9999\u6e2f", b: "852-HK-0", a: "852", c: "HK" },
    { name: "\u30cf\u30f3\u30ac\u30ea\u30fc", b: "36-HU-0", a: "36", c: "HU" },
    {
      name: "\u30a2\u30a4\u30b9\u30e9\u30f3\u30c9",
      b: "354-IS-0",
      a: "354",
      c: "IS",
    },
    { name: "\u30a4\u30f3\u30c9", b: "91-IN-0", a: "91", c: "IN" },
    {
      name: "\u30a4\u30f3\u30c9\u30cd\u30b7\u30a2",
      b: "62-ID-0",
      a: "62",
      c: "ID",
    },
    { name: "\u30a4\u30e9\u30f3", b: "98-IR-0", a: "98", c: "IR" },
    { name: "\u30a4\u30e9\u30af", b: "964-IQ-0", a: "964", c: "IQ" },
    {
      name: "\u30a2\u30a4\u30eb\u30e9\u30f3\u30c9",
      b: "353-IE-0",
      a: "353",
      c: "IE",
    },
    { name: "\u30de\u30f3\u5cf6", b: "44-IM-0", a: "44", c: "IM" },
    {
      name: "\u30a4\u30b9\u30e9\u30a8\u30eb",
      b: "972-IL-0",
      a: "972",
      c: "IL",
    },
    { name: "\u30a4\u30bf\u30ea\u30a2", b: "39-IT-0", a: "39", c: "IT" },
    { name: "\u30b8\u30e3\u30de\u30a4\u30ab", b: "1-JM-0", a: "1", c: "JM" },
    { name: "\u65e5\u672c", b: "81-JP-0", a: "81", c: "JP" },
    { name: "\u30b8\u30e3\u30fc\u30b8\u30fc", b: "44-JE-0", a: "44", c: "JE" },
    { name: "\u30e8\u30eb\u30c0\u30f3", b: "962-JO-0", a: "962", c: "JO" },
    {
      name: "\u30ab\u30b6\u30d5\u30b9\u30bf\u30f3",
      b: "7-KZ-0",
      a: "7",
      c: "KZ",
    },
    { name: "\u30b1\u30cb\u30a2", b: "254-KE-0", a: "254", c: "KE" },
    { name: "\u30ad\u30ea\u30d0\u30b9", b: "686-KI-0", a: "686", c: "KI" },
    { name: "\u30b3\u30bd\u30dc", b: "377-XK-0", a: "377", c: "XK" },
    { name: "\u30b3\u30bd\u30dc", b: "381-XK-0", a: "381", c: "XK" },
    { name: "\u30b3\u30bd\u30dc", b: "386-XK-0", a: "386", c: "XK" },
    {
      name: "\u30af\u30a6\u30a7\u30fc\u30c8",
      b: "965-KW-0",
      a: "965",
      c: "KW",
    },
    {
      name: "\u30ad\u30eb\u30ae\u30b9\u30bf\u30f3",
      b: "996-KG-0",
      a: "996",
      c: "KG",
    },
    { name: "\u30e9\u30aa\u30b9", b: "856-LA-0", a: "856", c: "LA" },
    { name: "\u30e9\u30c8\u30d3\u30a2", b: "371-LV-0", a: "371", c: "LV" },
    { name: "\u30ec\u30d0\u30ce\u30f3", b: "961-LB-0", a: "961", c: "LB" },
    { name: "\u30ec\u30bd\u30c8", b: "266-LS-0", a: "266", c: "LS" },
    { name: "\u30ea\u30d9\u30ea\u30a2", b: "231-LR-0", a: "231", c: "LR" },
    { name: "\u30ea\u30d3\u30a2", b: "218-LY-0", a: "218", c: "LY" },
    {
      name: "\u30ea\u30d2\u30c6\u30f3\u30b7\u30e5\u30bf\u30a4\u30f3",
      b: "423-LI-0",
      a: "423",
      c: "LI",
    },
    {
      name: "\u30ea\u30c8\u30a2\u30cb\u30a2",
      b: "370-LT-0",
      a: "370",
      c: "LT",
    },
    {
      name: "\u30eb\u30af\u30bb\u30f3\u30d6\u30eb\u30b0",
      b: "352-LU-0",
      a: "352",
      c: "LU",
    },
    { name: "\u30de\u30ab\u30aa", b: "853-MO-0", a: "853", c: "MO" },
    {
      name: "\u30de\u30b1\u30c9\u30cb\u30a2",
      b: "389-MK-0",
      a: "389",
      c: "MK",
    },
    {
      name: "\u30de\u30c0\u30ac\u30b9\u30ab\u30eb",
      b: "261-MG-0",
      a: "261",
      c: "MG",
    },
    { name: "\u30de\u30e9\u30a6\u30a4", b: "265-MW-0", a: "265", c: "MW" },
    { name: "\u30de\u30ec\u30fc\u30b7\u30a2", b: "60-MY-0", a: "60", c: "MY" },
    {
      name: "\u30e2\u30eb\u30c7\u30a3\u30d6",
      b: "960-MV-0",
      a: "960",
      c: "MV",
    },
    { name: "\u30de\u30ea", b: "223-ML-0", a: "223", c: "ML" },
    { name: "\u30de\u30eb\u30bf", b: "356-MT-0", a: "356", c: "MT" },
    {
      name: "\u30de\u30fc\u30b7\u30e3\u30eb\u8af8\u5cf6",
      b: "692-MH-0",
      a: "692",
      c: "MH",
    },
    {
      name: "\u30de\u30eb\u30c1\u30cb\u30fc\u30af",
      b: "596-MQ-0",
      a: "596",
      c: "MQ",
    },
    {
      name: "\u30e2\u30fc\u30ea\u30bf\u30cb\u30a2",
      b: "222-MR-0",
      a: "222",
      c: "MR",
    },
    {
      name: "\u30e2\u30fc\u30ea\u30b7\u30e3\u30b9",
      b: "230-MU-0",
      a: "230",
      c: "MU",
    },
    {
      name: "\u30de\u30a4\u30e8\u30c3\u30c8\u5cf6",
      b: "262-YT-0",
      a: "262",
      c: "YT",
    },
    { name: "\u30e1\u30ad\u30b7\u30b3", b: "52-MX-0", a: "52", c: "MX" },
    {
      name: "\u30df\u30af\u30ed\u30cd\u30b7\u30a2",
      b: "691-FM-0",
      a: "691",
      c: "FM",
    },
    { name: "\u30e2\u30eb\u30c9\u30d0", b: "373-MD-0", a: "373", c: "MD" },
    { name: "\u30e2\u30ca\u30b3", b: "377-MC-0", a: "377", c: "MC" },
    { name: "\u30e2\u30f3\u30b4\u30eb", b: "976-MN-0", a: "976", c: "MN" },
    {
      name: "\u30e2\u30f3\u30c6\u30cd\u30b0\u30ed",
      b: "382-ME-0",
      a: "382",
      c: "ME",
    },
    {
      name: "\u30e2\u30f3\u30c8\u30bb\u30e9\u30c8\u5cf6",
      b: "1-MS-0",
      a: "1",
      c: "MS",
    },
    { name: "\u30e2\u30ed\u30c3\u30b3", b: "212-MA-0", a: "212", c: "MA" },
    {
      name: "\u30e2\u30b6\u30f3\u30d3\u30fc\u30af",
      b: "258-MZ-0",
      a: "258",
      c: "MZ",
    },
    { name: "\u30df\u30e3\u30f3\u30de\u30fc", b: "95-MM-0", a: "95", c: "MM" },
    { name: "\u30ca\u30df\u30d3\u30a2", b: "264-NA-0", a: "264", c: "NA" },
    { name: "\u30ca\u30a6\u30eb", b: "674-NR-0", a: "674", c: "NR" },
    { name: "\u30cd\u30d1\u30fc\u30eb", b: "977-NP-0", a: "977", c: "NP" },
    { name: "\u30aa\u30e9\u30f3\u30c0", b: "31-NL-0", a: "31", c: "NL" },
    {
      name: "\u30cb\u30e5\u30fc\u30ab\u30ec\u30c9\u30cb\u30a2",
      b: "687-NC-0",
      a: "687",
      c: "NC",
    },
    {
      name: "\u30cb\u30e5\u30fc\u30b8\u30fc\u30e9\u30f3\u30c9",
      b: "64-NZ-0",
      a: "64",
      c: "NZ",
    },
    {
      name: "\u30cb\u30ab\u30e9\u30b0\u30a2",
      b: "505-NI-0",
      a: "505",
      c: "NI",
    },
    {
      name: "\u30cb\u30b8\u30a7\u30fc\u30eb",
      b: "227-NE-0",
      a: "227",
      c: "NE",
    },
    {
      name: "\u30ca\u30a4\u30b8\u30a7\u30ea\u30a2",
      b: "234-NG-0",
      a: "234",
      c: "NG",
    },
    { name: "\u30cb\u30a6\u30a8", b: "683-NU-0", a: "683", c: "NU" },
    {
      name: "\u30ce\u30fc\u30d5\u30a9\u30fc\u30af\u5cf6",
      b: "672-NF-0",
      a: "672",
      c: "NF",
    },
    { name: "\u5317\u671d\u9bae", b: "850-KP-0", a: "850", c: "KP" },
    {
      name: "\u5317\u30de\u30ea\u30a2\u30ca\u8af8\u5cf6",
      b: "1-MP-0",
      a: "1",
      c: "MP",
    },
    { name: "\u30ce\u30eb\u30a6\u30a7\u30fc", b: "47-NO-0", a: "47", c: "NO" },
    { name: "\u30aa\u30de\u30fc\u30f3", b: "968-OM-0", a: "968", c: "OM" },
    { name: "\u30d1\u30ad\u30b9\u30bf\u30f3", b: "92-PK-0", a: "92", c: "PK" },
    { name: "\u30d1\u30e9\u30aa", b: "680-PW-0", a: "680", c: "PW" },
    {
      name: "\u30d1\u30ec\u30b9\u30c1\u30ca\u81ea\u6cbb\u653f\u5e9c",
      b: "970-PS-0",
      a: "970",
      c: "PS",
    },
    { name: "\u30d1\u30ca\u30de", b: "507-PA-0", a: "507", c: "PA" },
    {
      name: "\u30d1\u30d7\u30a2\u30cb\u30e5\u30fc\u30ae\u30cb\u30a2",
      b: "675-PG-0",
      a: "675",
      c: "PG",
    },
    {
      name: "\u30d1\u30e9\u30b0\u30a2\u30a4",
      b: "595-PY-0",
      a: "595",
      c: "PY",
    },
    { name: "\u30da\u30eb\u30fc", b: "51-PE-0", a: "51", c: "PE" },
    { name: "\u30d5\u30a3\u30ea\u30d4\u30f3", b: "63-PH-0", a: "63", c: "PH" },
    { name: "\u30dd\u30fc\u30e9\u30f3\u30c9", b: "48-PL-0", a: "48", c: "PL" },
    {
      name: "\u30dd\u30eb\u30c8\u30ac\u30eb",
      b: "351-PT-0",
      a: "351",
      c: "PT",
    },
    {
      name: "\u30d7\u30a8\u30eb\u30c8\u30ea\u30b3",
      b: "1-PR-0",
      a: "1",
      c: "PR",
    },
    { name: "\u30ab\u30bf\u30fc\u30eb", b: "974-QA-0", a: "974", c: "QA" },
    {
      name: "\u30ec\u30e6\u30cb\u30aa\u30f3",
      b: "262-RE-0",
      a: "262",
      c: "RE",
    },
    { name: "\u30eb\u30fc\u30de\u30cb\u30a2", b: "40-RO-0", a: "40", c: "RO" },
    { name: "\u30ed\u30b7\u30a2", b: "7-RU-0", a: "7", c: "RU" },
    { name: "\u30eb\u30ef\u30f3\u30c0", b: "250-RW-0", a: "250", c: "RW" },
    {
      name: "\u30b5\u30f3 \u30d0\u30eb\u30c6\u30eb\u30df\u30fc\u5cf6",
      b: "590-BL-0",
      a: "590",
      c: "BL",
    },
    {
      name: "\u30bb\u30f3\u30c8\u30d8\u30ec\u30ca",
      b: "290-SH-0",
      a: "290",
      c: "SH",
    },
    {
      name: "\u30bb\u30f3\u30c8\u30ad\u30c3\u30c4\u30cd\u30a4\u30d3\u30b9",
      b: "1-KN-0",
      a: "1",
      c: "KN",
    },
    {
      name: "\u30bb\u30f3\u30c8\u30eb\u30b7\u30a2",
      b: "1-LC-0",
      a: "1",
      c: "LC",
    },
    {
      name: "\u30bb\u30f3\u30c8\u30de\u30fc\u30c1\u30f3\u5cf6",
      b: "590-MF-0",
      a: "590",
      c: "MF",
    },
    {
      name:
        "\u200e\u200f\u200e\u200e\u200e\u200e\u200e\u200e\u200f\u200e\u200e\u200f\u200e\u200f\u200e\u200e\u200e\u200e\u200e\u200f\u200e\u200f\u200e\u200e\u200e\u200f\u200f\u200f\u200f\u200f\u200e\u200f\u200f\u200f\u200f\u200f\u200f\u200f\u200e\u200f\u200f\u200f\u200e\u200f\u200e\u200e\u200e\u200f\u200f\u200e\u200f\u200e\u200f\u200f\u200e\u200f\u200f\u200f\u200f\u200e\u200f\u200f\u200e\u200f\u200e\u200e\u200e\u200f\u200e\u200f\u200f\u200e\u200e\u200f\u200e\u200f\u200f\u200e\u200e\u200f\u200f\u200e\u200e\u200e\u200e\u200f\u200e\u200e\u200f\u200f\u200f\u200e\u200f\u200e\u30b5\u30f3\u30d4\u30a8\u30fc\u30eb \u30df\u30af\u30ed\u30f3\u200e\u200f\u200e\u200e\u200f\u200e",
      b: "508-PM-0",
      a: "508",
      c: "PM",
    },
    {
      name: "\u30bb\u30f3\u30c8\u30f4\u30a3\u30f3\u30bb\u30f3\u30c8",
      b: "1-VC-0",
      a: "1",
      c: "VC",
    },
    { name: "\u30b5\u30e2\u30a2", b: "685-WS-0", a: "685", c: "WS" },
    {
      name: "\u30b5\u30f3\u30de\u30ea\u30ce",
      b: "378-SM-0",
      a: "378",
      c: "SM",
    },
    {
      name: "\u30b5\u30f3\u30c8\u30e1 \u30d7\u30ea\u30f3\u30b7\u30da",
      b: "239-ST-0",
      a: "239",
      c: "ST",
    },
    {
      name: "\u30b5\u30a6\u30b8\u30a2\u30e9\u30d3\u30a2",
      b: "966-SA-0",
      a: "966",
      c: "SA",
    },
    { name: "\u30bb\u30cd\u30ac\u30eb", b: "221-SN-0", a: "221", c: "SN" },
    { name: "\u30bb\u30eb\u30d3\u30a2", b: "381-RS-0", a: "381", c: "RS" },
    {
      name: "\u30bb\u30fc\u30b7\u30a7\u30eb",
      b: "248-SC-0",
      a: "248",
      c: "SC",
    },
    {
      name: "\u30b7\u30a8\u30e9\u30ec\u30aa\u30cd",
      b: "232-SL-0",
      a: "232",
      c: "SL",
    },
    {
      name: "\u30b7\u30f3\u30ac\u30dd\u30fc\u30eb",
      b: "65-SG-0",
      a: "65",
      c: "SG",
    },
    {
      name: "\u30b7\u30f3\u30c8 \u30de\u30fc\u30eb\u30c6\u30f3\u5cf6",
      b: "1-SX-0",
      a: "1",
      c: "SX",
    },
    {
      name: "\u30b9\u30ed\u30d0\u30ad\u30a2",
      b: "421-SK-0",
      a: "421",
      c: "SK",
    },
    {
      name: "\u30b9\u30ed\u30d9\u30cb\u30a2",
      b: "386-SI-0",
      a: "386",
      c: "SI",
    },
    {
      name: "\u30bd\u30ed\u30e2\u30f3\u8af8\u5cf6",
      b: "677-SB-0",
      a: "677",
      c: "SB",
    },
    { name: "\u30bd\u30de\u30ea\u30a2", b: "252-SO-0", a: "252", c: "SO" },
    { name: "\u5357\u30a2\u30d5\u30ea\u30ab", b: "27-ZA-0", a: "27", c: "ZA" },
    {
      name:
        "\u5357\u30b8\u30e7\u30fc\u30b8\u30a2\u8af8\u5cf6\u304a\u3088\u3073\u5357\u30b5\u30f3\u30c9\u30a6\u30a3\u30c3\u30c1\u8af8\u5cf6",
      b: "500-GS-0",
      a: "500",
      c: "GS",
    },
    { name: "\u97d3\u56fd", b: "82-KR-0", a: "82", c: "KR" },
    {
      name: "\u5357\u30b9\u30fc\u30c0\u30f3",
      b: "211-SS-0",
      a: "211",
      c: "SS",
    },
    { name: "\u30b9\u30da\u30a4\u30f3", b: "34-ES-0", a: "34", c: "ES" },
    { name: "\u30b9\u30ea\u30e9\u30f3\u30ab", b: "94-LK-0", a: "94", c: "LK" },
    { name: "\u30b9\u30fc\u30c0\u30f3", b: "249-SD-0", a: "249", c: "SD" },
    { name: "\u30b9\u30ea\u30ca\u30e0", b: "597-SR-0", a: "597", c: "SR" },
    {
      name:
        "\u30b9\u30d0\u30fc\u30eb\u30d0\u30eb\u8af8\u5cf6\u304a\u3088\u3073\u30e4\u30f3\u30de\u30a4\u30a8\u30f3\u5cf6",
      b: "47-SJ-0",
      a: "47",
      c: "SJ",
    },
    {
      name: "\u30b9\u30ef\u30b8\u30e9\u30f3\u30c9",
      b: "268-SZ-0",
      a: "268",
      c: "SZ",
    },
    {
      name: "\u30b9\u30a6\u30a7\u30fc\u30c7\u30f3",
      b: "46-SE-0",
      a: "46",
      c: "SE",
    },
    { name: "\u30b9\u30a4\u30b9", b: "41-CH-0", a: "41", c: "CH" },
    { name: "\u30b7\u30ea\u30a2", b: "963-SY-0", a: "963", c: "SY" },
    { name: "\u53f0\u6e7e", b: "886-TW-0", a: "886", c: "TW" },
    {
      name: "\u30bf\u30b8\u30ad\u30b9\u30bf\u30f3",
      b: "992-TJ-0",
      a: "992",
      c: "TJ",
    },
    {
      name: "\u30bf\u30f3\u30b6\u30cb\u30a2",
      b: "255-TZ-0",
      a: "255",
      c: "TZ",
    },
    { name: "\u30bf\u30a4", b: "66-TH-0", a: "66", c: "TH" },
    { name: "\u30c8\u30fc\u30b4", b: "228-TG-0", a: "228", c: "TG" },
    { name: "\u30c8\u30b1\u30e9\u30a6", b: "690-TK-0", a: "690", c: "TK" },
    { name: "\u30c8\u30f3\u30ac", b: "676-TO-0", a: "676", c: "TO" },
    {
      name: "\u30c8\u30ea\u30cb\u30c0\u30fc\u30c9 \u30c8\u30d0\u30b4",
      b: "1-TT-0",
      a: "1",
      c: "TT",
    },
    {
      name: "\u30c1\u30e5\u30cb\u30b8\u30a2",
      b: "216-TN-0",
      a: "216",
      c: "TN",
    },
    { name: "\u30c8\u30eb\u30b3", b: "90-TR-0", a: "90", c: "TR" },
    {
      name: "\u30c8\u30eb\u30af\u30e1\u30cb\u30b9\u30bf\u30f3",
      b: "993-TM-0",
      a: "993",
      c: "TM",
    },
    {
      name: "\u30bf\u30fc\u30af\u30b9 \u30ab\u30a4\u30b3\u30b9\u8af8\u5cf6",
      b: "1-TC-0",
      a: "1",
      c: "TC",
    },
    { name: "\u30c4\u30d0\u30eb", b: "688-TV-0", a: "688", c: "TV" },
    {
      name: "\u7c73\u9818\u30d0\u30fc\u30b8\u30f3\u8af8\u5cf6",
      b: "1-VI-0",
      a: "1",
      c: "VI",
    },
    { name: "\u30a6\u30ac\u30f3\u30c0", b: "256-UG-0", a: "256", c: "UG" },
    {
      name: "\u30a6\u30af\u30e9\u30a4\u30ca",
      b: "380-UA-0",
      a: "380",
      c: "UA",
    },
    {
      name: "\u30a2\u30e9\u30d6\u9996\u9577\u56fd\u9023\u90a6",
      b: "971-AE-0",
      a: "971",
      c: "AE",
    },
    { name: "\u82f1\u56fd", b: "44-GB-0", a: "44", c: "GB" },
    { name: "\u7c73\u56fd", b: "1-US-0", a: "1", c: "US" },
    {
      name: "\u30a6\u30eb\u30b0\u30a2\u30a4",
      b: "598-UY-0",
      a: "598",
      c: "UY",
    },
    {
      name: "\u30a6\u30ba\u30d9\u30ad\u30b9\u30bf\u30f3",
      b: "998-UZ-0",
      a: "998",
      c: "UZ",
    },
    { name: "\u30d0\u30cc\u30a2\u30c4", b: "678-VU-0", a: "678", c: "VU" },
    {
      name: "\u30d0\u30c1\u30ab\u30f3\u5e02\u56fd",
      b: "379-VA-0",
      a: "379",
      c: "VA",
    },
    { name: "\u30d9\u30cd\u30ba\u30a8\u30e9", b: "58-VE-0", a: "58", c: "VE" },
    { name: "\u30d9\u30c8\u30ca\u30e0", b: "84-VN-0", a: "84", c: "VN" },
    {
      name: "\u30a6\u30a9\u30ea\u30b9 \u30d5\u30c4\u30ca\u8af8\u5cf6",
      b: "681-WF-0",
      a: "681",
      c: "WF",
    },
    { name: "\u897f\u30b5\u30cf\u30e9", b: "212-EH-0", a: "212", c: "EH" },
    { name: "\u30a4\u30a8\u30e1\u30f3", b: "967-YE-0", a: "967", c: "YE" },
    { name: "\u30b6\u30f3\u30d3\u30a2", b: "260-ZM-0", a: "260", c: "ZM" },
    {
      name: "\u30b8\u30f3\u30d0\u30d6\u30a8",
      b: "263-ZW-0",
      a: "263",
      c: "ZW",
    },
  ];
  Qd(Nd);
  var Rd = new Ld(Nd);
  function Sd(a) {
    return "string" == typeof a.className
      ? a.className
      : (a.getAttribute && a.getAttribute("class")) || "";
  }
  function Td(a, b) {
    "string" == typeof a.className
      ? (a.className = b)
      : a.setAttribute && a.setAttribute("class", b);
  }
  function Ud(a, b) {
    return a.classList
      ? a.classList.contains(b)
      : La(a.classList ? a.classList : Sd(a).match(/\S+/g) || [], b);
  }
  function Vd(a, b) {
    if (a.classList) a.classList.add(b);
    else if (!Ud(a, b)) {
      var c = Sd(a);
      Td(a, c + (0 < c.length ? " " + b : b));
    }
  }
  function Wd(a, b) {
    a.classList
      ? a.classList.remove(b)
      : Ud(a, b) &&
        Td(
          a,
          Ia(a.classList ? a.classList : Sd(a).match(/\S+/g) || [], function (
            c
          ) {
            return c != b;
          }).join(" ")
        );
  }
  try {
    new self.OffscreenCanvas(0, 0).getContext("2d");
  } catch (a) {}
  var Xd = !A || 9 <= Number(jd);
  function Yd(a, b) {
    this.x = void 0 !== a ? a : 0;
    this.y = void 0 !== b ? b : 0;
  }
  k = Yd.prototype;
  k.clone = function () {
    return new Yd(this.x, this.y);
  };
  k.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
  };
  k.ceil = function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  };
  k.floor = function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  };
  k.round = function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };
  k.translate = function (a, b) {
    a instanceof Yd
      ? ((this.x += a.x), (this.y += a.y))
      : ((this.x += Number(a)), "number" === typeof b && (this.y += b));
    return this;
  };
  k.scale = function (a, b) {
    this.x *= a;
    this.y *= "number" === typeof b ? b : a;
    return this;
  };
  function Zd(a, b) {
    this.width = a;
    this.height = b;
  }
  k = Zd.prototype;
  k.clone = function () {
    return new Zd(this.width, this.height);
  };
  k.toString = function () {
    return "(" + this.width + " x " + this.height + ")";
  };
  k.aspectRatio = function () {
    return this.width / this.height;
  };
  k.Zb = function () {
    return !(this.width * this.height);
  };
  k.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  k.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  k.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  k.scale = function (a, b) {
    this.width *= a;
    this.height *= "number" === typeof b ? b : a;
    return this;
  };
  function $d(a) {
    return a ? new ae(be(a)) : Ca || (Ca = new ae());
  }
  function ce(a, b) {
    var c = b || document;
    return c.querySelectorAll && c.querySelector
      ? c.querySelectorAll("." + a)
      : de(document, a, b);
  }
  function ee(a, b) {
    var c = b || document;
    if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
    else {
      c = document;
      var d = b || c;
      a =
        d.querySelectorAll && d.querySelector && a
          ? d.querySelector(a ? "." + a : "")
          : de(c, a, b)[0] || null;
    }
    return a || null;
  }
  function de(a, b, c) {
    var d;
    a = c || a;
    if (a.querySelectorAll && a.querySelector && b)
      return a.querySelectorAll(b ? "." + b : "");
    if (b && a.getElementsByClassName) {
      var e = a.getElementsByClassName(b);
      return e;
    }
    e = a.getElementsByTagName("*");
    if (b) {
      var f = {};
      for (c = d = 0; (a = e[c]); c++) {
        var g = a.className;
        "function" == typeof g.split && La(g.split(/\s+/), b) && (f[d++] = a);
      }
      f.length = d;
      return f;
    }
    return e;
  }
  function fe(a, b) {
    Va(b, function (c, d) {
      c && "object" == typeof c && c.Ra && (c = c.Ja());
      "style" == d
        ? (a.style.cssText = c)
        : "class" == d
        ? (a.className = c)
        : "for" == d
        ? (a.htmlFor = c)
        : ge.hasOwnProperty(d)
        ? a.setAttribute(ge[d], c)
        : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0)
        ? a.setAttribute(d, c)
        : (a[d] = c);
    });
  }
  var ge = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width",
  };
  function he(a) {
    return a.scrollingElement
      ? a.scrollingElement
      : Yc || "CSS1Compat" != a.compatMode
      ? a.body || a.documentElement
      : a.documentElement;
  }
  function ie(a, b, c, d) {
    function e(h) {
      h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h);
    }
    for (; d < c.length; d++) {
      var f = c[d];
      if (!wa(f) || (t(f) && 0 < f.nodeType)) e(f);
      else {
        a: {
          if (f && "number" == typeof f.length) {
            if (t(f)) {
              var g = "function" == typeof f.item || "string" == typeof f.item;
              break a;
            }
            if ("function" === typeof f) {
              g = "function" == typeof f.item;
              break a;
            }
          }
          g = !1;
        }
        Ga(g ? Ra(f) : f, e);
      }
    }
  }
  function je(a, b) {
    b = String(b);
    "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
    return a.createElement(b);
  }
  function ke(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null;
  }
  function be(a) {
    return 9 == a.nodeType ? a : a.ownerDocument || a.document;
  }
  function le(a, b) {
    if ("textContent" in a) a.textContent = b;
    else if (3 == a.nodeType) a.data = String(b);
    else if (a.firstChild && 3 == a.firstChild.nodeType) {
      for (; a.lastChild != a.firstChild; ) a.removeChild(a.lastChild);
      a.firstChild.data = String(b);
    } else {
      for (var c; (c = a.firstChild); ) a.removeChild(c);
      a.appendChild(be(a).createTextNode(String(b)));
    }
  }
  function me(a, b) {
    return b
      ? ne(a, function (c) {
          return (
            !b ||
            ("string" === typeof c.className && La(c.className.split(/\s+/), b))
          );
        })
      : null;
  }
  function ne(a, b) {
    for (var c = 0; a; ) {
      if (b(a)) return a;
      a = a.parentNode;
      c++;
    }
    return null;
  }
  function ae(a) {
    this.ea = a || q.document || document;
  }
  k = ae.prototype;
  k.zb = $d;
  k.fa = function () {};
  k.getElementsByTagName = function (a, b) {
    return (b || this.ea).getElementsByTagName(String(a));
  };
  k.Bc = function (a, b) {
    return ce(a, b || this.ea);
  };
  k.s = function (a, b) {
    return ee(a, b || this.ea);
  };
  k.td = function (a, b, c) {
    var d = this.ea,
      e = arguments,
      f = String(e[0]),
      g = e[1];
    if (!Xd && g && (g.name || g.type)) {
      f = ["<", f];
      g.name && f.push(' name="', $b(g.name), '"');
      if (g.type) {
        f.push(' type="', $b(g.type), '"');
        var h = {};
        Za(h, g);
        delete h.type;
        g = h;
      }
      f.push(">");
      f = f.join("");
    }
    f = je(d, f);
    g &&
      ("string" === typeof g
        ? (f.className = g)
        : Array.isArray(g)
        ? (f.className = g.join(" "))
        : fe(f, g));
    2 < e.length && ie(d, f, e, 2);
  };
  k.createElement = function (a) {
    return je(this.ea, a);
  };
  k.createTextNode = function (a) {
    return this.ea.createTextNode(String(a));
  };
  k.getWindow = function () {
    var a = this.ea;
    return a.parentWindow || a.defaultView;
  };
  k.appendChild = function (a, b) {
    a.appendChild(b);
  };
  k.append = function (a, b) {
    ie(be(a), a, arguments, 1);
  };
  k.canHaveChildren = function (a) {
    if (1 != a.nodeType) return !1;
    switch (a.tagName) {
      case "APPLET":
      case "AREA":
      case "BASE":
      case "BR":
      case "COL":
      case "COMMAND":
      case "EMBED":
      case "FRAME":
      case "HR":
      case "IMG":
      case "INPUT":
      case "IFRAME":
      case "ISINDEX":
      case "KEYGEN":
      case "LINK":
      case "NOFRAMES":
      case "NOSCRIPT":
      case "META":
      case "OBJECT":
      case "PARAM":
      case "SCRIPT":
      case "SOURCE":
      case "STYLE":
      case "TRACK":
      case "WBR":
        return !1;
    }
    return !0;
  };
  k.removeNode = ke;
  k.contains = function (a, b) {
    if (!a || !b) return !1;
    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition)
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b; ) b = b.parentNode;
    return b == a;
  };
  function oe(a, b, c) {
    b || (b = {});
    c = c || window;
    var d =
      a instanceof ub
        ? a
        : Bb("undefined" != typeof a.href ? a.href : String(a)) || Eb;
    a = b.target || a.target;
    var e = [];
    for (f in b)
      switch (f) {
        case "width":
        case "height":
        case "top":
        case "left":
          e.push(f + "=" + b[f]);
          break;
        case "target":
        case "noopener":
        case "noreferrer":
          break;
        default:
          e.push(f + "=" + (b[f] ? 1 : 0));
      }
    var f = e.join(",");
    ((y("iPhone") && !y("iPod") && !y("iPad")) || y("iPad") || y("iPod")) &&
    c.navigator &&
    c.navigator.standalone &&
    a &&
    "_self" != a
      ? ((f = je(document, "A")),
        Tb(f, "HTMLAnchorElement"),
        (d = d instanceof ub ? d : Db(d)),
        (f.href = wb(d)),
        f.setAttribute("target", a),
        b.noreferrer && f.setAttribute("rel", "noreferrer"),
        (b = document.createEvent("MouseEvent")),
        b.initMouseEvent("click", !0, !0, c, 1),
        f.dispatchEvent(b),
        (c = {}))
      : b.noreferrer
      ? ((c = Zb("", c, a, f)),
        (b = wb(d)),
        c &&
          (Wc &&
            -1 != b.indexOf(";") &&
            (b = "'" + b.replace(/'/g, "%27") + "'"),
          (c.opener = null),
          (b =
            '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' +
            $b(b) +
            '">'),
          (b = Rb(b, null)),
          (d = c.document) && d.write && (d.write(Pb(b)), d.close())))
      : (c = Zb(d, c, a, f)) && b.noopener && (c.opener = null);
    return c;
  }
  function E(a) {
    var b = a.type;
    if ("string" === typeof b)
      switch (b.toLowerCase()) {
        case "checkbox":
        case "radio":
          return a.checked ? a.value : null;
        case "select-one":
          return (b = a.selectedIndex), 0 <= b ? a.options[b].value : null;
        case "select-multiple":
          b = [];
          for (var c, d = 0; (c = a.options[d]); d++)
            c.selected && b.push(c.value);
          return b.length ? b : null;
      }
    return null != a.value ? a.value : null;
  }
  function pe(a, b) {
    var c = a.type;
    switch ("string" === typeof c && c.toLowerCase()) {
      case "checkbox":
      case "radio":
        a.checked = b;
        break;
      case "select-one":
        a.selectedIndex = -1;
        if ("string" === typeof b)
          for (var d = 0; (c = a.options[d]); d++)
            if (c.value == b) {
              c.selected = !0;
              break;
            }
        break;
      case "select-multiple":
        "string" === typeof b && (b = [b]);
        for (d = 0; (c = a.options[d]); d++)
          if (((c.selected = !1), b))
            for (var e, f = 0; (e = b[f]); f++)
              c.value == e && (c.selected = !0);
        break;
      default:
        a.value = null != b ? b : "";
    }
  }
  var qe = !A || 9 <= Number(jd),
    re = A && !gd("9"),
    se = (function () {
      if (!q.addEventListener || !Object.defineProperty) return !1;
      var a = !1,
        b = Object.defineProperty({}, "passive", {
          get: function () {
            a = !0;
          },
        });
      try {
        q.addEventListener("test", ta, b), q.removeEventListener("test", ta, b);
      } catch (c) {}
      return a;
    })();
  function te() {
    this.xb = this.xb;
    this.ob = this.ob;
  }
  te.prototype.xb = !1;
  te.prototype.isDisposed = function () {
    return this.xb;
  };
  te.prototype.h = function () {
    this.xb || ((this.xb = !0), this.g());
  };
  function ue(a, b) {
    a.xb ? b() : (a.ob || (a.ob = []), a.ob.push(b));
  }
  te.prototype.g = function () {
    if (this.ob) for (; this.ob.length; ) this.ob.shift()();
  };
  function ve(a) {
    a && "function" == typeof a.h && a.h();
  }
  function we(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.pb = !1;
  }
  we.prototype.stopPropagation = function () {
    this.pb = !0;
  };
  we.prototype.preventDefault = function () {
    this.defaultPrevented = !0;
  };
  function xe(a, b) {
    we.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.Ga = null;
    a && this.init(a, b);
  }
  x(xe, we);
  var ye = kd({ 2: "touch", 3: "pen", 4: "mouse" });
  xe.prototype.init = function (a, b) {
    var c = (this.type = a.type),
      d =
        a.changedTouches && a.changedTouches.length
          ? a.changedTouches[0]
          : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    if ((b = a.relatedTarget)) {
      if (Xc) {
        a: {
          try {
            Rc(b.nodeName);
            var e = !0;
            break a;
          } catch (f) {}
          e = !1;
        }
        e || (b = null);
      }
    } else
      "mouseover" == c
        ? (b = a.fromElement)
        : "mouseout" == c && (b = a.toElement);
    this.relatedTarget = b;
    d
      ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
        (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
        (this.screenX = d.screenX || 0),
        (this.screenY = d.screenY || 0))
      : ((this.offsetX = Yc || void 0 !== a.offsetX ? a.offsetX : a.layerX),
        (this.offsetY = Yc || void 0 !== a.offsetY ? a.offsetY : a.layerY),
        (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
        (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
        (this.screenX = a.screenX || 0),
        (this.screenY = a.screenY || 0));
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType =
      "string" === typeof a.pointerType
        ? a.pointerType
        : ye[a.pointerType] || "";
    this.state = a.state;
    this.Ga = a;
    a.defaultPrevented && this.preventDefault();
  };
  xe.prototype.stopPropagation = function () {
    xe.Z.stopPropagation.call(this);
    this.Ga.stopPropagation
      ? this.Ga.stopPropagation()
      : (this.Ga.cancelBubble = !0);
  };
  xe.prototype.preventDefault = function () {
    xe.Z.preventDefault.call(this);
    var a = this.Ga;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), re))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  var ze = "closure_listenable_" + ((1e6 * Math.random()) | 0);
  function Ae(a) {
    return !(!a || !a[ze]);
  }
  var Be = 0;
  function Ce(a, b, c, d, e) {
    this.listener = a;
    this.Tc = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.Ic = e;
    this.key = ++Be;
    this.Gb = this.tc = !1;
  }
  function De(a) {
    a.Gb = !0;
    a.listener = null;
    a.Tc = null;
    a.src = null;
    a.Ic = null;
  }
  function Ee(a) {
    this.src = a;
    this.aa = {};
    this.nc = 0;
  }
  k = Ee.prototype;
  k.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.aa[f];
    a || ((a = this.aa[f] = []), this.nc++);
    var g = Fe(a, b, d, e);
    -1 < g
      ? ((b = a[g]), c || (b.tc = !1))
      : ((b = new Ce(b, this.src, f, !!d, e)), (b.tc = c), a.push(b));
    return b;
  };
  k.remove = function (a, b, c, d) {
    a = a.toString();
    if (!(a in this.aa)) return !1;
    var e = this.aa[a];
    b = Fe(e, b, c, d);
    return -1 < b
      ? (De(e[b]),
        Na(e, b),
        0 == e.length && (delete this.aa[a], this.nc--),
        !0)
      : !1;
  };
  function Ge(a, b) {
    var c = b.type;
    c in a.aa &&
      Ma(a.aa[c], b) &&
      (De(b), 0 == a.aa[c].length && (delete a.aa[c], a.nc--));
  }
  k.Uc = function (a) {
    a = a && a.toString();
    var b = 0,
      c;
    for (c in this.aa)
      if (!a || c == a) {
        for (var d = this.aa[c], e = 0; e < d.length; e++) ++b, De(d[e]);
        delete this.aa[c];
        this.nc--;
      }
  };
  k.Sb = function (a, b, c, d) {
    a = this.aa[a.toString()];
    var e = -1;
    a && (e = Fe(a, b, c, d));
    return -1 < e ? a[e] : null;
  };
  k.hasListener = function (a, b) {
    var c = void 0 !== a,
      d = c ? a.toString() : "",
      e = void 0 !== b;
    return Wa(this.aa, function (f) {
      for (var g = 0; g < f.length; ++g)
        if (!((c && f[g].type != d) || (e && f[g].capture != b))) return !0;
      return !1;
    });
  };
  function Fe(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.Gb && f.listener == b && f.capture == !!c && f.Ic == d) return e;
    }
    return -1;
  }
  var He = "closure_lm_" + ((1e6 * Math.random()) | 0),
    Ie = {},
    Je = 0;
  function Ke(a, b, c, d, e) {
    if (d && d.once) return Le(a, b, c, d, e);
    if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) Ke(a, b[f], c, d, e);
      return null;
    }
    c = Me(c);
    return Ae(a)
      ? a.listen(b, c, t(d) ? !!d.capture : !!d, e)
      : Oe(a, b, c, !1, d, e);
  }
  function Oe(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = t(e) ? !!e.capture : !!e,
      h = Pe(a);
    h || (a[He] = h = new Ee(a));
    c = h.add(b, c, d, g, f);
    if (c.Tc) return c;
    d = Qe();
    c.Tc = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener)
      se || (e = g),
        void 0 === e && (e = !1),
        a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(Re(b.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    Je++;
    return c;
  }
  function Qe() {
    var a = Se,
      b = qe
        ? function (c) {
            return a.call(b.src, b.listener, c);
          }
        : function (c) {
            c = a.call(b.src, b.listener, c);
            if (!c) return c;
          };
    return b;
  }
  function Le(a, b, c, d, e) {
    if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) Le(a, b[f], c, d, e);
      return null;
    }
    c = Me(c);
    return Ae(a)
      ? a.Ue(b, c, t(d) ? !!d.capture : !!d, e)
      : Oe(a, b, c, !0, d, e);
  }
  function Te(a, b, c, d, e) {
    if (Array.isArray(b))
      for (var f = 0; f < b.length; f++) Te(a, b[f], c, d, e);
    else
      (d = t(d) ? !!d.capture : !!d),
        (c = Me(c)),
        Ae(a)
          ? a.be(b, c, d, e)
          : a && (a = Pe(a)) && (b = a.Sb(b, c, d, e)) && Ue(b);
  }
  function Ue(a) {
    if ("number" !== typeof a && a && !a.Gb) {
      var b = a.src;
      if (Ae(b)) Ge(b.Fa, a);
      else {
        var c = a.type,
          d = a.Tc;
        b.removeEventListener
          ? b.removeEventListener(c, d, a.capture)
          : b.detachEvent
          ? b.detachEvent(Re(c), d)
          : b.addListener && b.removeListener && b.removeListener(d);
        Je--;
        (c = Pe(b))
          ? (Ge(c, a), 0 == c.nc && ((c.src = null), (b[He] = null)))
          : De(a);
      }
    }
  }
  function Re(a) {
    return a in Ie ? Ie[a] : (Ie[a] = "on" + a);
  }
  function Ve(a, b, c, d) {
    var e = !0;
    if ((a = Pe(a)))
      if ((b = a.aa[b.toString()]))
        for (b = b.concat(), a = 0; a < b.length; a++) {
          var f = b[a];
          f && f.capture == c && !f.Gb && ((f = We(f, d)), (e = e && !1 !== f));
        }
    return e;
  }
  function We(a, b) {
    var c = a.listener,
      d = a.Ic || a.src;
    a.tc && Ue(a);
    return c.call(d, b);
  }
  function Se(a, b) {
    if (a.Gb) return !0;
    if (!qe) {
      if (!b)
        a: {
          b = ["window", "event"];
          for (var c = q, d = 0; d < b.length; d++)
            if (((c = c[b[d]]), null == c)) {
              b = null;
              break a;
            }
          b = c;
        }
      d = b;
      b = new xe(d, this);
      c = !0;
      if (!(0 > d.keyCode || void 0 != d.returnValue)) {
        a: {
          var e = !1;
          if (0 == d.keyCode)
            try {
              d.keyCode = -1;
              break a;
            } catch (g) {
              e = !0;
            }
          if (e || void 0 == d.returnValue) d.returnValue = !0;
        }
        d = [];
        for (e = b.currentTarget; e; e = e.parentNode) d.push(e);
        a = a.type;
        for (e = d.length - 1; !b.pb && 0 <= e; e--) {
          b.currentTarget = d[e];
          var f = Ve(d[e], a, !0, b);
          c = c && f;
        }
        for (e = 0; !b.pb && e < d.length; e++)
          (b.currentTarget = d[e]), (f = Ve(d[e], a, !1, b)), (c = c && f);
      }
      return c;
    }
    return We(a, new xe(b, this));
  }
  function Pe(a) {
    a = a[He];
    return a instanceof Ee ? a : null;
  }
  var Xe = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
  function Me(a) {
    if ("function" === typeof a) return a;
    a[Xe] ||
      (a[Xe] = function (b) {
        return a.handleEvent(b);
      });
    return a[Xe];
  }
  function Ye() {
    te.call(this);
    this.Fa = new Ee(this);
    this.Tf = this;
    this.Sc = null;
  }
  x(Ye, te);
  Ye.prototype[ze] = !0;
  k = Ye.prototype;
  k.Xd = function (a) {
    this.Sc = a;
  };
  k.addEventListener = function (a, b, c, d) {
    Ke(this, a, b, c, d);
  };
  k.removeEventListener = function (a, b, c, d) {
    Te(this, a, b, c, d);
  };
  k.dispatchEvent = function (a) {
    var b,
      c = this.Sc;
    if (c) for (b = []; c; c = c.Sc) b.push(c);
    c = this.Tf;
    var d = a.type || a;
    if ("string" === typeof a) a = new we(a, c);
    else if (a instanceof we) a.target = a.target || c;
    else {
      var e = a;
      a = new we(d, c);
      Za(a, e);
    }
    e = !0;
    if (b)
      for (var f = b.length - 1; !a.pb && 0 <= f; f--) {
        var g = (a.currentTarget = b[f]);
        e = Ze(g, d, !0, a) && e;
      }
    a.pb ||
      ((g = a.currentTarget = c),
      (e = Ze(g, d, !0, a) && e),
      a.pb || (e = Ze(g, d, !1, a) && e));
    if (b)
      for (f = 0; !a.pb && f < b.length; f++)
        (g = a.currentTarget = b[f]), (e = Ze(g, d, !1, a) && e);
    return e;
  };
  k.g = function () {
    Ye.Z.g.call(this);
    this.Fa && this.Fa.Uc(void 0);
    this.Sc = null;
  };
  k.listen = function (a, b, c, d) {
    return this.Fa.add(String(a), b, !1, c, d);
  };
  k.Ue = function (a, b, c, d) {
    return this.Fa.add(String(a), b, !0, c, d);
  };
  k.be = function (a, b, c, d) {
    this.Fa.remove(String(a), b, c, d);
  };
  function Ze(a, b, c, d) {
    b = a.Fa.aa[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.Gb && g.capture == c) {
        var h = g.listener,
          m = g.Ic || g.src;
        g.tc && Ge(a.Fa, g);
        e = !1 !== h.call(m, d) && e;
      }
    }
    return e && !d.defaultPrevented;
  }
  k.Sb = function (a, b, c, d) {
    return this.Fa.Sb(String(a), b, c, d);
  };
  k.hasListener = function (a, b) {
    return this.Fa.hasListener(void 0 !== a ? String(a) : void 0, b);
  };
  function $e(a) {
    if (
      (a.altKey && !a.ctrlKey) ||
      a.metaKey ||
      (112 <= a.keyCode && 123 >= a.keyCode)
    )
      return !1;
    if (af(a.keyCode)) return !0;
    switch (a.keyCode) {
      case 18:
      case 20:
      case 93:
      case 17:
      case 40:
      case 35:
      case 27:
      case 36:
      case 45:
      case 37:
      case 224:
      case 91:
      case 144:
      case 12:
      case 34:
      case 33:
      case 19:
      case 255:
      case 44:
      case 39:
      case 145:
      case 16:
      case 38:
      case 252:
      case 224:
      case 92:
        return !1;
      case 0:
        return !Xc;
      default:
        return 166 > a.keyCode || 183 < a.keyCode;
    }
  }
  function bf(a, b, c, d, e, f) {
    if (Yc && !gd("525")) return !0;
    if ($c && e) return af(a);
    if (e && !d) return !1;
    if (!Xc) {
      "number" === typeof b && (b = cf(b));
      var g = 17 == b || 18 == b || ($c && 91 == b);
      if (((!c || $c) && g) || ($c && 16 == b && (d || f))) return !1;
    }
    if ((Yc || Vc) && d && c)
      switch (a) {
        case 220:
        case 219:
        case 221:
        case 192:
        case 186:
        case 189:
        case 187:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
          return !1;
      }
    if (A && d && b == a) return !1;
    switch (a) {
      case 13:
        return Xc ? (f || e ? !1 : !(c && d)) : !0;
      case 27:
        return !(Yc || Vc || Xc);
    }
    return Xc && (d || e || f) ? !1 : af(a);
  }
  function af(a) {
    if (
      (48 <= a && 57 >= a) ||
      (96 <= a && 106 >= a) ||
      (65 <= a && 90 >= a) ||
      ((Yc || Vc) && 0 == a)
    )
      return !0;
    switch (a) {
      case 32:
      case 43:
      case 63:
      case 64:
      case 107:
      case 109:
      case 110:
      case 111:
      case 186:
      case 59:
      case 189:
      case 187:
      case 61:
      case 188:
      case 190:
      case 191:
      case 192:
      case 222:
      case 219:
      case 220:
      case 221:
      case 163:
      case 58:
        return !0;
      case 173:
        return Xc;
      default:
        return !1;
    }
  }
  function cf(a) {
    if (Xc) a = df(a);
    else if ($c && Yc)
      switch (a) {
        case 93:
          a = 91;
      }
    return a;
  }
  function df(a) {
    switch (a) {
      case 61:
        return 187;
      case 59:
        return 186;
      case 173:
        return 189;
      case 224:
        return 91;
      case 0:
        return 224;
      default:
        return a;
    }
  }
  function ef(a) {
    Ye.call(this);
    this.f = a;
    Ke(a, "keydown", this.Fc, !1, this);
    Ke(a, "click", this.Ke, !1, this);
  }
  x(ef, Ye);
  ef.prototype.Fc = function (a) {
    (13 == a.keyCode || (Yc && 3 == a.keyCode)) && ff(this, a);
  };
  ef.prototype.Ke = function (a) {
    ff(this, a);
  };
  function ff(a, b) {
    var c = new gf(b);
    if (a.dispatchEvent(c)) {
      c = new hf(b);
      try {
        a.dispatchEvent(c);
      } finally {
        b.stopPropagation();
      }
    }
  }
  ef.prototype.g = function () {
    ef.Z.g.call(this);
    Te(this.f, "keydown", this.Fc, !1, this);
    Te(this.f, "click", this.Ke, !1, this);
    delete this.f;
  };
  function hf(a) {
    xe.call(this, a.Ga);
    this.type = "action";
  }
  x(hf, xe);
  function gf(a) {
    xe.call(this, a.Ga);
    this.type = "beforeaction";
  }
  x(gf, xe);
  function jf(a) {
    Ye.call(this);
    this.f = a;
    a = A ? "focusout" : "blur";
    this.Pg = Ke(this.f, A ? "focusin" : "focus", this, !A);
    this.Qg = Ke(this.f, a, this, !A);
  }
  x(jf, Ye);
  jf.prototype.handleEvent = function (a) {
    var b = new xe(a.Ga);
    b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
    this.dispatchEvent(b);
  };
  jf.prototype.g = function () {
    jf.Z.g.call(this);
    Ue(this.Pg);
    Ue(this.Qg);
    delete this.f;
  };
  function kf(a) {
    te.call(this);
    this.Ed = a;
    this.H = {};
  }
  x(kf, te);
  var lf = [];
  k = kf.prototype;
  k.listen = function (a, b, c, d) {
    Array.isArray(b) || (b && (lf[0] = b.toString()), (b = lf));
    for (var e = 0; e < b.length; e++) {
      var f = Ke(a, b[e], c || this.handleEvent, d || !1, this.Ed || this);
      if (!f) break;
      this.H[f.key] = f;
    }
    return this;
  };
  k.Ue = function (a, b, c, d) {
    return mf(this, a, b, c, d);
  };
  function mf(a, b, c, d, e, f) {
    if (Array.isArray(c))
      for (var g = 0; g < c.length; g++) mf(a, b, c[g], d, e, f);
    else {
      b = Le(b, c, d || a.handleEvent, e, f || a.Ed || a);
      if (!b) return a;
      a.H[b.key] = b;
    }
    return a;
  }
  k.be = function (a, b, c, d, e) {
    if (Array.isArray(b))
      for (var f = 0; f < b.length; f++) this.be(a, b[f], c, d, e);
    else
      (c = c || this.handleEvent),
        (d = t(d) ? !!d.capture : !!d),
        (e = e || this.Ed || this),
        (c = Me(c)),
        (d = !!d),
        (b = Ae(a)
          ? a.Sb(b, c, d, e)
          : a
          ? (a = Pe(a))
            ? a.Sb(b, c, d, e)
            : null
          : null),
        b && (Ue(b), delete this.H[b.key]);
  };
  k.Uc = function () {
    Va(
      this.H,
      function (a, b) {
        this.H.hasOwnProperty(b) && Ue(a);
      },
      this
    );
    this.H = {};
  };
  k.g = function () {
    kf.Z.g.call(this);
    this.Uc();
  };
  k.handleEvent = function () {
    throw Error("EventHandler.handleEvent not implemented");
  };
  function nf(a, b) {
    this.Og = 100;
    this.kg = a;
    this.ih = b;
    this.Pc = 0;
    this.Jc = null;
  }
  nf.prototype.get = function () {
    if (0 < this.Pc) {
      this.Pc--;
      var a = this.Jc;
      this.Jc = a.next;
      a.next = null;
    } else a = this.kg();
    return a;
  };
  nf.prototype.put = function (a) {
    this.ih(a);
    this.Pc < this.Og && (this.Pc++, (a.next = this.Jc), (this.Jc = a));
  };
  function of(a) {
    q.setTimeout(function () {
      throw a;
    }, 0);
  }
  var pf;
  function qf() {
    var a = q.MessageChannel;
    "undefined" === typeof a &&
      "undefined" !== typeof window &&
      window.postMessage &&
      window.addEventListener &&
      !y("Presto") &&
      (a = function () {
        var e = je(document, "IFRAME");
        e.style.display = "none";
        document.documentElement.appendChild(e);
        var f = e.contentWindow;
        e = f.document;
        e.open();
        e.close();
        var g = "callImmediate" + Math.random(),
          h =
            "file:" == f.location.protocol
              ? "*"
              : f.location.protocol + "//" + f.location.host;
        e = u(function (m) {
          if (("*" == h || m.origin == h) && m.data == g)
            this.port1.onmessage();
        }, this);
        f.addEventListener("message", e, !1);
        this.port1 = {};
        this.port2 = {
          postMessage: function () {
            f.postMessage(g, h);
          },
        };
      });
    if ("undefined" !== typeof a && !y("Trident") && !y("MSIE")) {
      var b = new a(),
        c = {},
        d = c;
      b.port1.onmessage = function () {
        if (void 0 !== c.next) {
          c = c.next;
          var e = c.re;
          c.re = null;
          e();
        }
      };
      return function (e) {
        d.next = { re: e };
        d = d.next;
        b.port2.postMessage(0);
      };
    }
    return function (e) {
      q.setTimeout(e, 0);
    };
  }
  function rf() {
    this.bd = this.Mb = null;
  }
  var tf = new nf(
    function () {
      return new sf();
    },
    function (a) {
      a.reset();
    }
  );
  rf.prototype.add = function (a, b) {
    var c = tf.get();
    c.set(a, b);
    this.bd ? (this.bd.next = c) : (this.Mb = c);
    this.bd = c;
  };
  rf.prototype.remove = function () {
    var a = null;
    this.Mb &&
      ((a = this.Mb),
      (this.Mb = this.Mb.next),
      this.Mb || (this.bd = null),
      (a.next = null));
    return a;
  };
  function sf() {
    this.next = this.scope = this.wd = null;
  }
  sf.prototype.set = function (a, b) {
    this.wd = a;
    this.scope = b;
    this.next = null;
  };
  sf.prototype.reset = function () {
    this.next = this.scope = this.wd = null;
  };
  function uf(a, b) {
    vf || wf();
    xf || (vf(), (xf = !0));
    yf.add(a, b);
  }
  var vf;
  function wf() {
    if (q.Promise && q.Promise.resolve) {
      var a = q.Promise.resolve(void 0);
      vf = function () {
        a.then(zf);
      };
    } else
      vf = function () {
        var b = zf;
        "function" !== typeof q.setImmediate ||
        (q.Window &&
          q.Window.prototype &&
          !y("Edge") &&
          q.Window.prototype.setImmediate == q.setImmediate)
          ? (pf || (pf = qf()), pf(b))
          : q.setImmediate(b);
      };
  }
  var xf = !1,
    yf = new rf();
  function zf() {
    for (var a; (a = yf.remove()); ) {
      try {
        a.wd.call(a.scope);
      } catch (b) {
        of(b);
      }
      tf.put(a);
    }
    xf = !1;
  }
  function Af(a) {
    if (!a) return !1;
    try {
      return !!a.$goog_Thenable;
    } catch (b) {
      return !1;
    }
  }
  function F(a) {
    this.J = 0;
    this.Sa = void 0;
    this.ub = this.Va = this.S = null;
    this.Dc = this.vd = !1;
    if (a != ta)
      try {
        var b = this;
        a.call(
          void 0,
          function (c) {
            Bf(b, 2, c);
          },
          function (c) {
            if (!(c instanceof Cf))
              try {
                if (c instanceof Error) throw c;
                throw Error("Promise rejected.");
              } catch (d) {}
            Bf(b, 3, c);
          }
        );
      } catch (c) {
        Bf(this, 3, c);
      }
  }
  function Df() {
    this.next = this.context = this.Eb = this.dc = this.child = null;
    this.Nb = !1;
  }
  Df.prototype.reset = function () {
    this.context = this.Eb = this.dc = this.child = null;
    this.Nb = !1;
  };
  var Ef = new nf(
    function () {
      return new Df();
    },
    function (a) {
      a.reset();
    }
  );
  function Ff(a, b, c) {
    var d = Ef.get();
    d.dc = a;
    d.Eb = b;
    d.context = c;
    return d;
  }
  function G(a) {
    if (a instanceof F) return a;
    var b = new F(ta);
    Bf(b, 2, a);
    return b;
  }
  function Gf(a) {
    return new F(function (b, c) {
      c(a);
    });
  }
  F.prototype.then = function (a, b, c) {
    return Hf(
      this,
      "function" === typeof a ? a : null,
      "function" === typeof b ? b : null,
      c
    );
  };
  F.prototype.$goog_Thenable = !0;
  k = F.prototype;
  k.Ch = function (a, b) {
    a = Ff(a, a, b);
    a.Nb = !0;
    If(this, a);
    return this;
  };
  k.lc = function (a, b) {
    return Hf(this, null, a, b);
  };
  k.cancel = function (a) {
    if (0 == this.J) {
      var b = new Cf(a);
      uf(function () {
        Jf(this, b);
      }, this);
    }
  };
  function Jf(a, b) {
    if (0 == a.J)
      if (a.S) {
        var c = a.S;
        if (c.Va) {
          for (
            var d = 0, e = null, f = null, g = c.Va;
            g && (g.Nb || (d++, g.child == a && (e = g), !(e && 1 < d)));
            g = g.next
          )
            e || (f = g);
          e &&
            (0 == c.J && 1 == d
              ? Jf(c, b)
              : (f
                  ? ((d = f),
                    d.next == c.ub && (c.ub = d),
                    (d.next = d.next.next))
                  : Kf(c),
                Lf(c, e, 3, b)));
        }
        a.S = null;
      } else Bf(a, 3, b);
  }
  function If(a, b) {
    a.Va || (2 != a.J && 3 != a.J) || Mf(a);
    a.ub ? (a.ub.next = b) : (a.Va = b);
    a.ub = b;
  }
  function Hf(a, b, c, d) {
    var e = Ff(null, null, null);
    e.child = new F(function (f, g) {
      e.dc = b
        ? function (h) {
            try {
              var m = b.call(d, h);
              f(m);
            } catch (n) {
              g(n);
            }
          }
        : f;
      e.Eb = c
        ? function (h) {
            try {
              var m = c.call(d, h);
              void 0 === m && h instanceof Cf ? g(h) : f(m);
            } catch (n) {
              g(n);
            }
          }
        : g;
    });
    e.child.S = a;
    If(a, e);
    return e.child;
  }
  k.Fh = function (a) {
    this.J = 0;
    Bf(this, 2, a);
  };
  k.Gh = function (a) {
    this.J = 0;
    Bf(this, 3, a);
  };
  function Bf(a, b, c) {
    if (0 == a.J) {
      a === c &&
        ((b = 3), (c = new TypeError("Promise cannot resolve to itself")));
      a.J = 1;
      a: {
        var d = c,
          e = a.Fh,
          f = a.Gh;
        if (d instanceof F) {
          If(d, Ff(e || ta, f || null, a));
          var g = !0;
        } else if (Af(d)) d.then(e, f, a), (g = !0);
        else {
          if (t(d))
            try {
              var h = d.then;
              if ("function" === typeof h) {
                Nf(d, h, e, f, a);
                g = !0;
                break a;
              }
            } catch (m) {
              f.call(a, m);
              g = !0;
              break a;
            }
          g = !1;
        }
      }
      g ||
        ((a.Sa = c),
        (a.J = b),
        (a.S = null),
        Mf(a),
        3 != b || c instanceof Cf || Of(a, c));
    }
  }
  function Nf(a, b, c, d, e) {
    function f(m) {
      h || ((h = !0), d.call(e, m));
    }
    function g(m) {
      h || ((h = !0), c.call(e, m));
    }
    var h = !1;
    try {
      b.call(a, g, f);
    } catch (m) {
      f(m);
    }
  }
  function Mf(a) {
    a.vd || ((a.vd = !0), uf(a.ug, a));
  }
  function Kf(a) {
    var b = null;
    a.Va && ((b = a.Va), (a.Va = b.next), (b.next = null));
    a.Va || (a.ub = null);
    return b;
  }
  k.ug = function () {
    for (var a; (a = Kf(this)); ) Lf(this, a, this.J, this.Sa);
    this.vd = !1;
  };
  function Lf(a, b, c, d) {
    if (3 == c && b.Eb && !b.Nb) for (; a && a.Dc; a = a.S) a.Dc = !1;
    if (b.child) (b.child.S = null), Pf(b, c, d);
    else
      try {
        b.Nb ? b.dc.call(b.context) : Pf(b, c, d);
      } catch (e) {
        Qf.call(null, e);
      }
    Ef.put(b);
  }
  function Pf(a, b, c) {
    2 == b ? a.dc.call(a.context, c) : a.Eb && a.Eb.call(a.context, c);
  }
  function Of(a, b) {
    a.Dc = !0;
    uf(function () {
      a.Dc && Qf.call(null, b);
    });
  }
  var Qf = of;
  function Cf(a) {
    Ba.call(this, a);
  }
  x(Cf, Ba);
  Cf.prototype.name = "cancel";
  function Rf(a, b) {
    Ye.call(this);
    this.Lc = a || 1;
    this.mc = b || q;
    this.oe = u(this.Eh, this);
    this.Se = Date.now();
  }
  x(Rf, Ye);
  k = Rf.prototype;
  k.enabled = !1;
  k.$ = null;
  k.setInterval = function (a) {
    this.Lc = a;
    this.$ && this.enabled
      ? (this.stop(), this.start())
      : this.$ && this.stop();
  };
  k.Eh = function () {
    if (this.enabled) {
      var a = Date.now() - this.Se;
      0 < a && a < 0.8 * this.Lc
        ? (this.$ = this.mc.setTimeout(this.oe, this.Lc - a))
        : (this.$ && (this.mc.clearTimeout(this.$), (this.$ = null)),
          this.dispatchEvent("tick"),
          this.enabled && (this.stop(), this.start()));
    }
  };
  k.start = function () {
    this.enabled = !0;
    this.$ ||
      ((this.$ = this.mc.setTimeout(this.oe, this.Lc)), (this.Se = Date.now()));
  };
  k.stop = function () {
    this.enabled = !1;
    this.$ && (this.mc.clearTimeout(this.$), (this.$ = null));
  };
  k.g = function () {
    Rf.Z.g.call(this);
    this.stop();
    delete this.mc;
  };
  function Sf(a, b) {
    if ("function" === typeof a) b && (a = u(a, b));
    else if (a && "function" == typeof a.handleEvent) a = u(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(0) ? -1 : q.setTimeout(a, 0);
  }
  function Tf(a) {
    Ye.call(this);
    this.$ = null;
    this.f = a;
    a = A || Vc || (Yc && !gd("531") && "TEXTAREA" == a.tagName);
    this.Fe = new kf(this);
    this.Fe.listen(
      this.f,
      a ? ["keydown", "paste", "cut", "drop", "input"] : "input",
      this
    );
  }
  x(Tf, Ye);
  Tf.prototype.handleEvent = function (a) {
    if ("input" == a.type)
      (A && gd(10) && 0 == a.keyCode && 0 == a.charCode) ||
        (Uf(this), this.dispatchEvent(Vf(a)));
    else if ("keydown" != a.type || $e(a)) {
      var b = "keydown" == a.type ? this.f.value : null;
      A && 229 == a.keyCode && (b = null);
      var c = Vf(a);
      Uf(this);
      this.$ = Sf(function () {
        this.$ = null;
        this.f.value != b && this.dispatchEvent(c);
      }, this);
    }
  };
  function Uf(a) {
    null != a.$ && (q.clearTimeout(a.$), (a.$ = null));
  }
  function Vf(a) {
    a = new xe(a.Ga);
    a.type = "input";
    return a;
  }
  Tf.prototype.g = function () {
    Tf.Z.g.call(this);
    this.Fe.h();
    Uf(this);
    delete this.f;
  };
  function Wf(a, b) {
    Ye.call(this);
    a &&
      (this.Nc && this.detach(),
      (this.f = a),
      (this.Mc = Ke(this.f, "keypress", this, b)),
      (this.Jd = Ke(this.f, "keydown", this.Fc, b, this)),
      (this.Nc = Ke(this.f, "keyup", this.Dg, b, this)));
  }
  x(Wf, Ye);
  k = Wf.prototype;
  k.f = null;
  k.Mc = null;
  k.Jd = null;
  k.Nc = null;
  k.ia = -1;
  k.La = -1;
  k.kd = !1;
  var Xf = {
      3: 13,
      12: 144,
      63232: 38,
      63233: 40,
      63234: 37,
      63235: 39,
      63236: 112,
      63237: 113,
      63238: 114,
      63239: 115,
      63240: 116,
      63241: 117,
      63242: 118,
      63243: 119,
      63244: 120,
      63245: 121,
      63246: 122,
      63247: 123,
      63248: 44,
      63272: 46,
      63273: 36,
      63275: 35,
      63276: 33,
      63277: 34,
      63289: 144,
      63302: 45,
    },
    Yf = {
      Up: 38,
      Down: 40,
      Left: 37,
      Right: 39,
      Enter: 13,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      "U+007F": 46,
      Home: 36,
      End: 35,
      PageUp: 33,
      PageDown: 34,
      Insert: 45,
    },
    Zf = !Yc || gd("525"),
    $f = $c && Xc;
  k = Wf.prototype;
  k.Fc = function (a) {
    if (Yc || Vc)
      if (
        (17 == this.ia && !a.ctrlKey) ||
        (18 == this.ia && !a.altKey) ||
        ($c && 91 == this.ia && !a.metaKey)
      )
        this.La = this.ia = -1;
    -1 == this.ia &&
      (a.ctrlKey && 17 != a.keyCode
        ? (this.ia = 17)
        : a.altKey && 18 != a.keyCode
        ? (this.ia = 18)
        : a.metaKey && 91 != a.keyCode && (this.ia = 91));
    Zf && !bf(a.keyCode, this.ia, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey)
      ? this.handleEvent(a)
      : ((this.La = cf(a.keyCode)), $f && (this.kd = a.altKey));
  };
  k.Dg = function (a) {
    this.La = this.ia = -1;
    this.kd = a.altKey;
  };
  k.handleEvent = function (a) {
    var b = a.Ga,
      c = b.altKey;
    if (A && "keypress" == a.type) {
      var d = this.La;
      var e = 13 != d && 27 != d ? b.keyCode : 0;
    } else
      (Yc || Vc) && "keypress" == a.type
        ? ((d = this.La),
          (e = 0 <= b.charCode && 63232 > b.charCode && af(d) ? b.charCode : 0))
        : Uc && !Yc
        ? ((d = this.La), (e = af(d) ? b.keyCode : 0))
        : ("keypress" == a.type
            ? ($f && (c = this.kd),
              b.keyCode == b.charCode
                ? 32 > b.keyCode
                  ? ((d = b.keyCode), (e = 0))
                  : ((d = this.La), (e = b.charCode))
                : ((d = b.keyCode || this.La), (e = b.charCode || 0)))
            : ((d = b.keyCode || this.La), (e = b.charCode || 0)),
          $c && 63 == e && 224 == d && (d = 191));
    var f = (d = cf(d));
    d
      ? 63232 <= d && d in Xf
        ? (f = Xf[d])
        : 25 == d && a.shiftKey && (f = 9)
      : b.keyIdentifier && b.keyIdentifier in Yf && (f = Yf[b.keyIdentifier]);
    (Xc &&
      Zf &&
      "keypress" == a.type &&
      !bf(f, this.ia, a.shiftKey, a.ctrlKey, c, a.metaKey)) ||
      ((a = f == this.ia),
      (this.ia = f),
      (b = new ag(f, e, a, b)),
      (b.altKey = c),
      this.dispatchEvent(b));
  };
  k.fa = function () {
    return this.f;
  };
  k.detach = function () {
    this.Mc &&
      (Ue(this.Mc),
      Ue(this.Jd),
      Ue(this.Nc),
      (this.Nc = this.Jd = this.Mc = null));
    this.f = null;
    this.La = this.ia = -1;
  };
  k.g = function () {
    Wf.Z.g.call(this);
    this.detach();
  };
  function ag(a, b, c, d) {
    xe.call(this, d);
    this.type = "key";
    this.keyCode = a;
    this.charCode = b;
    this.repeat = c;
  }
  x(ag, xe);
  function bg(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d;
  }
  k = bg.prototype;
  k.clone = function () {
    return new bg(this.top, this.right, this.bottom, this.left);
  };
  k.toString = function () {
    return (
      "(" +
      this.top +
      "t, " +
      this.right +
      "r, " +
      this.bottom +
      "b, " +
      this.left +
      "l)"
    );
  };
  k.contains = function (a) {
    return this && a
      ? a instanceof bg
        ? a.left >= this.left &&
          a.right <= this.right &&
          a.top >= this.top &&
          a.bottom <= this.bottom
        : a.x >= this.left &&
          a.x <= this.right &&
          a.y >= this.top &&
          a.y <= this.bottom
      : !1;
  };
  k.expand = function (a, b, c, d) {
    t(a)
      ? ((this.top -= a.top),
        (this.right += a.right),
        (this.bottom += a.bottom),
        (this.left -= a.left))
      : ((this.top -= a),
        (this.right += Number(b)),
        (this.bottom += Number(c)),
        (this.left -= Number(d)));
    return this;
  };
  k.ceil = function () {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this;
  };
  k.floor = function () {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this;
  };
  k.round = function () {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this;
  };
  k.translate = function (a, b) {
    a instanceof Yd
      ? ((this.left += a.x),
        (this.right += a.x),
        (this.top += a.y),
        (this.bottom += a.y))
      : ((this.left += a),
        (this.right += a),
        "number" === typeof b && ((this.top += b), (this.bottom += b)));
    return this;
  };
  k.scale = function (a, b) {
    b = "number" === typeof b ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= b;
    this.bottom *= b;
    return this;
  };
  function cg(a, b) {
    var c = be(a);
    return c.defaultView &&
      c.defaultView.getComputedStyle &&
      (a = c.defaultView.getComputedStyle(a, null))
      ? a[b] || a.getPropertyValue(b) || ""
      : "";
  }
  function dg(a) {
    try {
      return a.getBoundingClientRect();
    } catch (b) {
      return { left: 0, top: 0, right: 0, bottom: 0 };
    }
  }
  function eg(a, b) {
    b = b || he(document);
    var c = b || he(document);
    var d = fg(a),
      e = fg(c);
    if (!A || 9 <= Number(jd)) {
      g = cg(c, "borderLeftWidth");
      var f = cg(c, "borderRightWidth");
      h = cg(c, "borderTopWidth");
      m = cg(c, "borderBottomWidth");
      f = new bg(parseFloat(h), parseFloat(f), parseFloat(m), parseFloat(g));
    } else {
      var g = gg(c, "borderLeft");
      f = gg(c, "borderRight");
      var h = gg(c, "borderTop"),
        m = gg(c, "borderBottom");
      f = new bg(h, f, m, g);
    }
    c == he(document)
      ? ((g = d.x - c.scrollLeft),
        (d = d.y - c.scrollTop),
        !A || 10 <= Number(jd) || ((g += f.left), (d += f.top)))
      : ((g = d.x - e.x - f.left), (d = d.y - e.y - f.top));
    e = a.offsetWidth;
    f = a.offsetHeight;
    h = Yc && !e && !f;
    (void 0 === e || h) && a.getBoundingClientRect
      ? ((a = dg(a)), (a = new Zd(a.right - a.left, a.bottom - a.top)))
      : (a = new Zd(e, f));
    e = c.clientHeight - a.height;
    f = c.scrollLeft;
    h = c.scrollTop;
    f += Math.min(g, Math.max(g - (c.clientWidth - a.width), 0));
    h += Math.min(d, Math.max(d - e, 0));
    c = new Yd(f, h);
    b.scrollLeft = c.x;
    b.scrollTop = c.y;
  }
  function fg(a) {
    var b = be(a),
      c = new Yd(0, 0);
    var d = b ? be(b) : document;
    d =
      !A || 9 <= Number(jd) || "CSS1Compat" == $d(d).ea.compatMode
        ? d.documentElement
        : d.body;
    if (a == d) return c;
    a = dg(a);
    d = $d(b).ea;
    b = he(d);
    d = d.parentWindow || d.defaultView;
    b =
      A && gd("10") && d.pageYOffset != b.scrollTop
        ? new Yd(b.scrollLeft, b.scrollTop)
        : new Yd(d.pageXOffset || b.scrollLeft, d.pageYOffset || b.scrollTop);
    c.x = a.left + b.x;
    c.y = a.top + b.y;
    return c;
  }
  var hg = { thin: 2, medium: 4, thick: 6 };
  function gg(a, b) {
    if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))
      return 0;
    var c = a.currentStyle ? a.currentStyle[b + "Width"] : null;
    if (c in hg) a = hg[c];
    else if (/^\d+px?$/.test(c)) a = parseInt(c, 10);
    else {
      b = a.style.left;
      var d = a.runtimeStyle.left;
      a.runtimeStyle.left = a.currentStyle.left;
      a.style.left = c;
      c = a.style.pixelLeft;
      a.style.left = b;
      a.runtimeStyle.left = d;
      a = +c;
    }
    return a;
  }
  function ig() {}
  ua(ig);
  ig.prototype.Wg = 0;
  ig.prototype.Gg = "";
  function jg(a) {
    Ye.call(this);
    this.Qb = a || $d();
    this.lb = null;
    this.mb = !1;
    this.f = null;
    this.Za = void 0;
    this.vc = this.vb = this.S = null;
    this.Jh = !1;
  }
  x(jg, Ye);
  k = jg.prototype;
  k.Fg = ig.xd();
  k.getId = function () {
    var a;
    (a = this.lb) ||
      ((a = this.Fg), (a = this.lb = a.Gg + ":" + (a.Wg++).toString(36)));
    return a;
  };
  k.fa = function () {
    return this.f;
  };
  k.Bc = function (a) {
    return this.f ? this.Qb.Bc(a, this.f) : [];
  };
  k.s = function (a) {
    return this.f ? this.Qb.s(a, this.f) : null;
  };
  function kg(a) {
    a.Za || (a.Za = new kf(a));
    return a.Za;
  }
  k.getParent = function () {
    return this.S;
  };
  k.Xd = function (a) {
    if (this.S && this.S != a) throw Error("Method not supported");
    jg.Z.Xd.call(this, a);
  };
  k.zb = function () {
    return this.Qb;
  };
  k.td = function () {
    this.f = this.Qb.createElement("DIV");
  };
  k.render = function (a) {
    if (this.mb) throw Error("Component already rendered");
    this.f || this.td();
    a ? a.insertBefore(this.f, null) : this.Qb.ea.body.appendChild(this.f);
    (this.S && !this.S.mb) || this.j();
  };
  k.j = function () {
    this.mb = !0;
    lg(this, function (a) {
      !a.mb && a.fa() && a.j();
    });
  };
  k.Rb = function () {
    lg(this, function (a) {
      a.mb && a.Rb();
    });
    this.Za && this.Za.Uc();
    this.mb = !1;
  };
  k.g = function () {
    this.mb && this.Rb();
    this.Za && (this.Za.h(), delete this.Za);
    lg(this, function (a) {
      a.h();
    });
    !this.Jh && this.f && ke(this.f);
    this.S = this.f = this.vc = this.vb = null;
    jg.Z.g.call(this);
  };
  k.hasChildren = function () {
    return !!this.vb && 0 != this.vb.length;
  };
  function lg(a, b) {
    a.vb && Ga(a.vb, b, void 0);
  }
  k.removeChild = function (a, b) {
    if (a) {
      var c = "string" === typeof a ? a : a.getId();
      this.vc && c
        ? ((a = this.vc), (a = (null !== a && c in a ? a[c] : void 0) || null))
        : (a = null);
      if (c && a) {
        var d = this.vc;
        c in d && delete d[c];
        Ma(this.vb, a);
        b && (a.Rb(), a.f && ke(a.f));
        b = a;
        if (null == b) throw Error("Unable to set parent component");
        b.S = null;
        jg.Z.Xd.call(b, null);
      }
    }
    if (!a) throw Error("Child is not in parent component");
    return a;
  };
  function H(a, b) {
    var c = me(a, "firebaseui-textfield");
    b
      ? (Wd(a, "firebaseui-input-invalid"),
        Vd(a, "firebaseui-input"),
        c && Wd(c, "firebaseui-textfield-invalid"))
      : (Wd(a, "firebaseui-input"),
        Vd(a, "firebaseui-input-invalid"),
        c && Vd(c, "firebaseui-textfield-invalid"));
  }
  function mg(a, b, c) {
    b = new Tf(b);
    ue(a, za(ve, b));
    kg(a).listen(b, "input", c);
  }
  function ng(a, b, c) {
    b = new Wf(b);
    ue(a, za(ve, b));
    kg(a).listen(b, "key", function (d) {
      13 == d.keyCode && (d.stopPropagation(), d.preventDefault(), c(d));
    });
  }
  function og(a, b, c) {
    b = new jf(b);
    ue(a, za(ve, b));
    kg(a).listen(b, "focusin", c);
  }
  function pg(a, b, c) {
    b = new jf(b);
    ue(a, za(ve, b));
    kg(a).listen(b, "focusout", c);
  }
  function I(a, b, c) {
    b = new ef(b);
    ue(a, za(ve, b));
    kg(a).listen(b, "action", function (d) {
      d.stopPropagation();
      d.preventDefault();
      c(d);
    });
  }
  function qg(a) {
    Vd(a, "firebaseui-hidden");
  }
  function rg(a, b) {
    b && le(a, b);
    Wd(a, "firebaseui-hidden");
  }
  function sg(a) {
    return !Ud(a, "firebaseui-hidden") && "none" != a.style.display;
  }
  function tg(a) {
    ug(a, "upgradeElement");
  }
  function vg(a) {
    ug(a, "downgradeElements");
  }
  var wg = [
    "mdl-js-textfield",
    "mdl-js-progress",
    "mdl-js-spinner",
    "mdl-js-button",
  ];
  function ug(a, b) {
    a &&
      window.componentHandler &&
      window.componentHandler[b] &&
      Ga(wg, function (c) {
        if (Ud(a, c)) window.componentHandler[b](a);
        Ga(ce(c, a), function (d) {
          window.componentHandler[b](d);
        });
      });
  }
  function xg(a, b, c) {
    yg.call(this);
    document.body.appendChild(a);
    a.showModal || window.dialogPolyfill.registerDialog(a);
    a.showModal();
    tg(a);
    b &&
      I(this, a, function (f) {
        var g = a.getBoundingClientRect();
        (f.clientX < g.left ||
          g.left + g.width < f.clientX ||
          f.clientY < g.top ||
          g.top + g.height < f.clientY) &&
          yg.call(this);
      });
    if (!c) {
      var d = this.fa().parentElement || this.fa().parentNode;
      if (d) {
        var e = this;
        this.kc = function () {
          if (a.open) {
            var f = a.getBoundingClientRect().height,
              g = d.getBoundingClientRect().height,
              h =
                d.getBoundingClientRect().top -
                document.body.getBoundingClientRect().top,
              m =
                d.getBoundingClientRect().left -
                document.body.getBoundingClientRect().left,
              n = a.getBoundingClientRect().width,
              l = d.getBoundingClientRect().width;
            a.style.top = (h + (g - f) / 2).toString() + "px";
            f = m + (l - n) / 2;
            a.style.left = f.toString() + "px";
            a.style.right =
              (document.body.getBoundingClientRect().width - f - n).toString() +
              "px";
          } else window.removeEventListener("resize", e.kc);
        };
        this.kc();
        window.addEventListener("resize", this.kc, !1);
      }
    }
  }
  function yg() {
    var a = zg.call(this);
    a &&
      (vg(a),
      a.open && a.close(),
      ke(a),
      this.kc && window.removeEventListener("resize", this.kc));
  }
  function zg() {
    return ee("firebaseui-id-dialog");
  }
  function Ag(a, b, c, d) {
    a = a(b || Bg, c);
    d = (d || $d()).createElement("DIV");
    if (t(a))
      if (a instanceof Nc) {
        if (a.gb !== Jc) throw Error("Sanitized content was not of kind HTML.");
        a = Rb(a.toString(), a.Pb || null);
      } else
        Ea("Soy template output is unsafe for use as HTML: " + a),
          (a = Qb("zSoyz"));
    else a = Qb(String(a));
    a.Ja().match(Cg);
    if (Wb()) for (; d.lastChild; ) d.removeChild(d.lastChild);
    d.innerHTML = Pb(a);
    1 == d.childNodes.length &&
      ((a = d.firstChild), 1 == a.nodeType && (d = a));
    return d;
  }
  var Cg = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i,
    Bg = {};
  function Dg() {
    return "\u78ba\u8a8d\u3057\u3066\u3044\u307e\u3059...";
  }
  function Eg() {
    return "\u6709\u52b9\u306a\u96fb\u8a71\u756a\u53f7\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044";
  }
  function Gg() {
    return "\u30b3\u30fc\u30c9\u304c\u9593\u9055\u3063\u3066\u3044\u307e\u3059\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002";
  }
  function Hg() {
    return "\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044";
  }
  function Ig() {
    return "\u6307\u5b9a\u3055\u308c\u305f\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306b\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u518d\u8a2d\u5b9a\u30b3\u30fc\u30c9\u3092\u9001\u4fe1\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f";
  }
  function Jg() {
    return "\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002";
  }
  function Kg() {
    return "\u3053\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306f\u3059\u3067\u306b\u5b58\u5728\u3057\u307e\u3059\u304c\u3001\u30ed\u30b0\u30a4\u30f3\u3059\u308b\u65b9\u6cd5\u304c\u3042\u308a\u307e\u305b\u3093\u3002\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u518d\u8a2d\u5b9a\u3057\u3066\u5fa9\u5143\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
  }
  function Lg(a) {
    a = a || {};
    var b = "";
    a = D(
      null == a.code || "string" === typeof a.code,
      "code",
      a.code,
      "null|string|undefined"
    );
    switch (t(a) ? a.toString() : a) {
      case "invalid-argument":
        b +=
          "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u304c\u7121\u52b9\u306a\u5f15\u6570\u3092\u6307\u5b9a\u3057\u307e\u3057\u305f\u3002";
        break;
      case "invalid-configuration":
        b +=
          "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u304c\u7121\u52b9\u306a\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306e\u69cb\u6210\u3092\u6307\u5b9a\u3057\u307e\u3057\u305f\u3002";
        break;
      case "failed-precondition":
        b +=
          "\u73fe\u5728\u306e\u30b7\u30b9\u30c6\u30e0\u72b6\u614b\u3067\u306f\u30ea\u30af\u30a8\u30b9\u30c8\u3092\u5b9f\u884c\u3067\u304d\u307e\u305b\u3093\u3002";
        break;
      case "out-of-range":
        b +=
          "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u304c\u7121\u52b9\u306a\u7bc4\u56f2\u3092\u6307\u5b9a\u3057\u307e\u3057\u305f\u3002";
        break;
      case "unauthenticated":
        b +=
          "OAuth \u30c8\u30fc\u30af\u30f3\u304c\u306a\u3044\u3001\u3082\u3057\u304f\u306f\u7121\u52b9\u3001\u671f\u9650\u5207\u308c\u306e\u305f\u3081\u306b\u30ea\u30af\u30a8\u30b9\u30c8\u304c\u8a8d\u8a3c\u3055\u308c\u307e\u305b\u3093\u3067\u3057\u305f\u3002";
        break;
      case "permission-denied":
        b +=
          "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u306b\u5341\u5206\u306a\u6a29\u9650\u304c\u3042\u308a\u307e\u305b\u3093\u3002";
        break;
      case "not-found":
        b +=
          "\u6307\u5b9a\u3055\u308c\u305f\u30ea\u30bd\u30fc\u30b9\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002";
        break;
      case "aborted":
        b +=
          "\u540c\u6642\u5b9f\u884c\u306e\u7af6\u5408\uff08\u8aad\u307f\u53d6\u308a - \u5909\u66f4 - \u66f8\u304d\u8fbc\u307f\u306e\u7af6\u5408\u306a\u3069\uff09\u3002";
        break;
      case "already-exists":
        b +=
          "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u304c\u4f5c\u6210\u3057\u3088\u3046\u3068\u3057\u305f\u30ea\u30bd\u30fc\u30b9\u306f\u3059\u3067\u306b\u5b58\u5728\u3057\u307e\u3059\u3002";
        break;
      case "resource-exhausted":
        b +=
          "\u30ea\u30bd\u30fc\u30b9\u5272\u308a\u5f53\u3066\u304c\u4e0d\u8db3\u3057\u3066\u3044\u308b\u304b\u3001\u30ec\u30fc\u30c8\u5236\u9650\u306b\u9054\u3057\u3066\u3044\u307e\u3059\u3002";
        break;
      case "cancelled":
        b +=
          "\u30ea\u30af\u30a8\u30b9\u30c8\u306f\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u306b\u3088\u3063\u3066\u30ad\u30e3\u30f3\u30bb\u30eb\u3055\u308c\u307e\u3057\u305f\u3002";
        break;
      case "data-loss":
        b +=
          "\u5fa9\u5143\u3067\u304d\u306a\u3044\u30c7\u30fc\u30bf\u640d\u5931\u307e\u305f\u306f\u30c7\u30fc\u30bf\u7834\u640d\u3067\u3059\u3002";
        break;
      case "unknown":
        b +=
          "\u4e0d\u660e\u306a\u30b5\u30fc\u30d0\u30fc\u30a8\u30e9\u30fc\u3067\u3059\u3002";
        break;
      case "internal":
        b +=
          "\u5185\u90e8\u30b5\u30fc\u30d0\u30fc\u30a8\u30e9\u30fc\u3067\u3059\u3002";
        break;
      case "not-implemented":
        b +=
          "API \u30e1\u30bd\u30c3\u30c9\u306f\u30b5\u30fc\u30d0\u30fc\u306b\u3088\u3063\u3066\u5b9f\u88c5\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002";
        break;
      case "unavailable":
        b +=
          "\u30b5\u30fc\u30d3\u30b9\u3092\u5229\u7528\u3067\u304d\u307e\u305b\u3093\u3002";
        break;
      case "deadline-exceeded":
        b +=
          "\u30ea\u30af\u30a8\u30b9\u30c8\u671f\u9650\u3092\u8d85\u3048\u307e\u3057\u305f\u3002";
        break;
      case "auth/user-disabled":
        b +=
          "\u30e6\u30fc\u30b6\u30fc \u30a2\u30ab\u30a6\u30f3\u30c8\u304c\u7ba1\u7406\u8005\u306b\u3088\u3063\u3066\u7121\u52b9\u306b\u3055\u308c\u3066\u3044\u307e\u3059\u3002";
        break;
      case "auth/timeout":
        b +=
          "\u30aa\u30da\u30ec\u30fc\u30b7\u30e7\u30f3\u304c\u30bf\u30a4\u30e0\u30a2\u30a6\u30c8\u3057\u307e\u3057\u305f\u3002";
        break;
      case "auth/too-many-requests":
        b +=
          "\u4e0d\u5be9\u306a\u30a2\u30af\u30c6\u30a3\u30d3\u30c6\u30a3\u304c\u691c\u51fa\u3055\u308c\u305f\u305f\u3081\u3001\u3053\u306e\u30c7\u30d0\u30a4\u30b9\u304b\u3089\u306e\u30ea\u30af\u30a8\u30b9\u30c8\u306f\u3059\u3079\u3066\u30d6\u30ed\u30c3\u30af\u3055\u308c\u307e\u3057\u305f\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u3082\u3046\u4e00\u5ea6\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
        break;
      case "auth/quota-exceeded":
        b +=
          "\u3053\u306e\u30aa\u30da\u30ec\u30fc\u30b7\u30e7\u30f3\u306e\u5272\u308a\u5f53\u3066\u3092\u8d85\u904e\u3057\u3066\u3044\u307e\u3059\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u3082\u3046\u4e00\u5ea6\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
        break;
      case "auth/network-request-failed":
        b +=
          "\u30cd\u30c3\u30c8\u30ef\u30fc\u30af \u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u3082\u3046\u4e00\u5ea6\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
        break;
      case "restart-process":
        b +=
          "\u30ea\u30af\u30a8\u30b9\u30c8\u306e\u8a8d\u8a3c\u6642\u306b\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u3053\u306e\u30da\u30fc\u30b8\u306b\u30ea\u30c0\u30a4\u30ec\u30af\u30c8\u3057\u305f URL \u306b\u518d\u5ea6\u30a2\u30af\u30bb\u30b9\u3057\u3001\u8a8d\u8a3c\u30d7\u30ed\u30bb\u30b9\u3092\u3082\u3046\u4e00\u5ea6\u884c\u3063\u3066\u304f\u3060\u3055\u3044\u3002";
        break;
      case "no-matching-tenant-for-email":
        b +=
          "\u6307\u5b9a\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u5229\u7528\u53ef\u80fd\u306a\u30ed\u30b0\u30a4\u30f3 \u30d7\u30ed\u30d0\u30a4\u30c0\u306f\u3042\u308a\u307e\u305b\u3093\u3002\u5225\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3067\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002";
    }
    return b;
  }
  function Mg() {
    return "\u3053\u306e\u64cd\u4f5c\u3092\u884c\u3046\u306b\u306f\u518d\u5ea6\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u304f\u3060\u3055\u3044";
  }
  var Ng = /^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;
  function Og() {
    return this.s("firebaseui-id-email");
  }
  function Pg() {
    return this.s("firebaseui-id-email-error");
  }
  function Qg(a) {
    var b = Og.call(this),
      c = Pg.call(this);
    mg(this, b, function () {
      sg(c) && (H(b, !0), qg(c));
    });
    a &&
      ng(this, b, function () {
        a();
      });
  }
  function Rg() {
    return kb(E(Og.call(this)) || "");
  }
  function Sg() {
    var a = Og.call(this);
    var b = Pg.call(this);
    var c = E(a) || "";
    c
      ? Ng.test(c)
        ? (H(a, !0), qg(b), (b = !0))
        : (H(a, !1),
          rg(
            b,
            "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u304c\u6b63\u3057\u304f\u3042\u308a\u307e\u305b\u3093".toString()
          ),
          (b = !1))
      : (H(a, !1),
        rg(
          b,
          "\u7d9a\u884c\u3059\u308b\u306b\u306f\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044".toString()
        ),
        (b = !1));
    return b ? kb(E(a)) : null;
  }
  function J() {
    return this.s("firebaseui-id-submit");
  }
  function K() {
    return this.s("firebaseui-id-secondary-link");
  }
  function Tg(a, b) {
    I(this, J.call(this), function (d) {
      a(d);
    });
    var c = K.call(this);
    c &&
      b &&
      I(this, c, function (d) {
        b(d);
      });
  }
  var Ug =
    !A &&
    !(
      y("Safari") &&
      !(
        Mb() ||
        y("Coast") ||
        y("Opera") ||
        y("Edge") ||
        y("Edg/") ||
        y("OPR") ||
        y("Firefox") ||
        y("FxiOS") ||
        y("Silk") ||
        y("Android")
      )
    );
  function Vg(a, b) {
    if (/-[a-z]/.test(b)) return null;
    if (Ug && a.dataset) {
      if (
        !(
          !y("Android") ||
          Mb() ||
          y("Firefox") ||
          y("FxiOS") ||
          y("Opera") ||
          y("Silk") ||
          b in a.dataset
        )
      )
        return null;
      a = a.dataset[b];
      return void 0 === a ? null : a;
    }
    return a.getAttribute(
      "data-" +
        String(b)
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()
    );
  }
  function Wg(a) {
    a = a || {};
    var b = D(
        null == a.email || "string" === typeof a.email,
        "email",
        a.email,
        "null|string|undefined"
      ),
      c = D(
        null == a.disabled || "boolean" === typeof a.disabled,
        "disabled",
        a.disabled,
        "boolean|null|undefined"
      ),
      d =
        '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="email">';
    d = D(
      null == a.se || "boolean" === typeof a.se,
      "changeEmail",
      a.se,
      "boolean|null|undefined"
    )
      ? d +
        "\u65b0\u3057\u3044\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044"
      : d + "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9";
    d +=
      '</label><input type="email" name="email" autocomplete="username" class="mdl-textfield__input firebaseui-input firebaseui-id-email" value="' +
      rd(null != b ? b : "") +
      '"' +
      (c ? " disabled" : "") +
      '></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-email-error"></p></div>';
    return C(d);
  }
  function Xg(a) {
    a = a || {};
    a = D(
      null == a.label || "string" === typeof a.label,
      "label",
      a.label,
      "null|string|undefined"
    );
    var b =
      '<button type="submit" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">';
    b = a ? b + B(a) : b + "\u6b21\u3078";
    return C(b + "</button>");
  }
  function Yg() {
    var a = "" + Xg({ label: "\u30ed\u30b0\u30a4\u30f3" });
    return C(a);
  }
  function Zg() {
    var a = "" + Xg({ label: "\u4fdd\u5b58" });
    return C(a);
  }
  function $g() {
    var a = "" + Xg({ label: "\u7d9a\u884c" });
    return C(a);
  }
  function ah(a) {
    a = a || {};
    a = D(
      null == a.label || "string" === typeof a.label,
      "label",
      a.label,
      "null|string|undefined"
    );
    var b =
      '<div class="firebaseui-new-password-component"><div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="newPassword">';
    b = a ? b + B(a) : b + "\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u8a2d\u5b9a";
    return C(
      b +
        '</label><input type="password" name="newPassword" autocomplete="new-password" class="mdl-textfield__input firebaseui-input firebaseui-id-new-password"></div><a href="javascript:void(0)" class="firebaseui-input-floating-button firebaseui-id-password-toggle firebaseui-input-toggle-on firebaseui-input-toggle-blur"></a><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-new-password-error"></p></div></div>'
    );
  }
  function bh() {
    var a = {};
    var b =
      '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="password">';
    b = D(
      null == a.current || "boolean" === typeof a.current,
      "current",
      a.current,
      "boolean|null|undefined"
    )
      ? b + "\u73fe\u5728\u306e\u30d1\u30b9\u30ef\u30fc\u30c9"
      : b + "\u30d1\u30b9\u30ef\u30fc\u30c9";
    return C(
      b +
        '</label><input type="password" name="password" autocomplete="current-password" class="mdl-textfield__input firebaseui-input firebaseui-id-password"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-password-error"></p></div>'
    );
  }
  function ch() {
    return C(
      '<a class="firebaseui-link firebaseui-id-secondary-link" href="javascript:void(0)">\u30ed\u30b0\u30a4\u30f3\u3067\u304d\u306a\u3044\u5834\u5408</a>'
    );
  }
  function dh(a) {
    a = a || {};
    a = D(
      null == a.label || "string" === typeof a.label,
      "label",
      a.label,
      "null|string|undefined"
    );
    var b =
      '<button class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary">';
    b = a ? b + B(a) : b + "\u30ad\u30e3\u30f3\u30bb\u30eb";
    return C(b + "</button>");
  }
  function eh(a) {
    var b = a.O,
      c = "";
    od(a.P) &&
      od(b) &&
      (c +=
        '<ul class="firebaseui-tos-list firebaseui-tos"><li class="firebaseui-inline-list-item"><a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">\u5229\u7528\u898f\u7d04</a></li><li class="firebaseui-inline-list-item"><a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc \u30dd\u30ea\u30b7\u30fc</a></li></ul>');
    return C(c);
  }
  function fh(a) {
    var b = a.O,
      c = "";
    od(a.P) &&
      od(b) &&
      (c +=
        '<p class="firebaseui-tos firebaseui-tospp-full-message">\u7d9a\u884c\u3059\u308b\u3068\u3001<a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">\u5229\u7528\u898f\u7d04</a>\u3068<a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc \u30dd\u30ea\u30b7\u30fc</a>\u306b\u540c\u610f\u3057\u305f\u3053\u3068\u306b\u306a\u308a\u307e\u3059\u3002</p>');
    return C(c);
  }
  function gh(a) {
    a = D("string" === typeof a.message, "message", a.message, "string");
    a =
      '<div class="firebaseui-info-bar firebaseui-id-info-bar"><p class="firebaseui-info-bar-message">' +
      B(a) +
      '&nbsp;&nbsp;<a href="javascript:void(0)" class="firebaseui-link firebaseui-id-dismiss-info-bar">';
    return C(a + "\u9589\u3058\u308b</a></p></div>");
  }
  function hh(a) {
    var b = a.content;
    b = D(
      "string" === typeof b || b instanceof Oc || b instanceof Nb,
      "content",
      a.content,
      "!goog.html.SafeHtml|!goog.soy.data.SanitizedHtml|!soydata.$$EMPTY_STRING_|string"
    );
    a = D(
      null == a.sd || "string" === typeof a.sd,
      "classes",
      a.sd,
      "null|string|undefined"
    );
    return C(
      '<dialog class="mdl-dialog firebaseui-dialog firebaseui-id-dialog' +
        (a ? " " + rd(a) : "") +
        '">' +
        B(b) +
        "</dialog>"
    );
  }
  function ih(a) {
    var b = D("string" === typeof a.Wb, "iconClass", a.Wb, "string");
    a = D("string" === typeof a.message, "message", a.message, "string");
    return C(
      hh({
        content: pd(
          '<div class="firebaseui-dialog-icon-wrapper"><div class="' +
            rd(b) +
            ' firebaseui-dialog-icon"></div></div><div class="firebaseui-progress-dialog-message">' +
            B(a) +
            "</div>"
        ),
      })
    );
  }
  function jh(a) {
    a = D(
      Array.isArray(a.items),
      "items",
      a.items,
      "!Array<{id: string, iconClass: string, label: string,}>"
    );
    for (
      var b = '<div class="firebaseui-list-box-actions">', c = a.length, d = 0;
      d < c;
      d++
    ) {
      var e = a[d];
      b +=
        '<button type="button" data-listboxid="' +
        rd(e.id) +
        '" class="mdl-button firebaseui-id-list-box-dialog-button firebaseui-list-box-dialog-button">' +
        (e.Wb
          ? '<div class="firebaseui-list-box-icon-wrapper"><div class="firebaseui-list-box-icon ' +
            rd(e.Wb) +
            '"></div></div>'
          : "") +
        '<div class="firebaseui-list-box-label-wrapper">' +
        B(e.label) +
        "</div></button>";
    }
    a =
      "" + hh({ sd: "firebaseui-list-box-dialog", content: pd(b + "</div>") });
    return C(a);
  }
  function kh(a) {
    a = a || {};
    a = D(
      null == a.$c || "boolean" === typeof a.$c,
      "useSpinner",
      a.$c,
      "boolean|null|undefined"
    );
    return C(
      a
        ? '<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-busy-indicator firebaseui-id-busy-indicator"></div>'
        : '<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate firebaseui-busy-indicator firebaseui-id-busy-indicator"></div>'
    );
  }
  function lh(a, b) {
    a = a || {};
    a = D(
      null == a.F || t(a.F),
      "providerConfig",
      a.F,
      "null|undefined|{providerId: (null|string|undefined), providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}"
    );
    b = b.ng;
    return a.ja
      ? "" + a.ja
      : b[a.providerId]
      ? "" + b[a.providerId]
      : od(a.providerId) && 0 == ("" + a.providerId).indexOf("saml.")
      ? "" + ("" + a.providerId).substring(5)
      : od(a.providerId) && 0 == ("" + a.providerId).indexOf("oidc.")
      ? "" + ("" + a.providerId).substring(5)
      : "" + a.providerId;
  }
  function mh() {
    ke(nh.call(this));
  }
  function nh() {
    return this.s("firebaseui-id-info-bar");
  }
  function oh() {
    return this.s("firebaseui-id-dismiss-info-bar");
  }
  function ph(a, b, c) {
    var d = this;
    a = Ag(jh, { items: a }, null, this.zb());
    xg.call(this, a, !0, !0);
    c && (c = qh(a, c)) && (c.focus(), eg(c, a));
    I(this, a, function (e) {
      if (
        (e =
          (e = me(e.target, "firebaseui-id-list-box-dialog-button")) &&
          Vg(e, "listboxid"))
      )
        yg.call(d), b(e);
    });
  }
  function qh(a, b) {
    a = (a || document).getElementsByTagName("BUTTON");
    for (var c = 0; c < a.length; c++)
      if (Vg(a[c], "listboxid") === b) return a[c];
    return null;
  }
  function rh() {
    return this.s("firebaseui-id-name");
  }
  function sh() {
    return this.s("firebaseui-id-name-error");
  }
  function th() {
    return this.s("firebaseui-id-new-password");
  }
  function uh() {
    return this.s("firebaseui-id-password-toggle");
  }
  function vh() {
    this.Id = !this.Id;
    var a = uh.call(this),
      b = th.call(this);
    this.Id
      ? ((b.type = "text"),
        Vd(a, "firebaseui-input-toggle-off"),
        Wd(a, "firebaseui-input-toggle-on"))
      : ((b.type = "password"),
        Vd(a, "firebaseui-input-toggle-on"),
        Wd(a, "firebaseui-input-toggle-off"));
    b.focus();
  }
  function wh() {
    return this.s("firebaseui-id-new-password-error");
  }
  function xh() {
    this.Id = !1;
    var a = th.call(this);
    a.type = "password";
    var b = wh.call(this);
    mg(this, a, function () {
      sg(b) && (H(a, !0), qg(b));
    });
    var c = uh.call(this);
    Vd(c, "firebaseui-input-toggle-on");
    Wd(c, "firebaseui-input-toggle-off");
    og(this, a, function () {
      Vd(c, "firebaseui-input-toggle-focus");
      Wd(c, "firebaseui-input-toggle-blur");
    });
    pg(this, a, function () {
      Vd(c, "firebaseui-input-toggle-blur");
      Wd(c, "firebaseui-input-toggle-focus");
    });
    I(this, c, u(vh, this));
  }
  function yh() {
    var a = th.call(this);
    var b = wh.call(this);
    E(a)
      ? (H(a, !0), qg(b), (b = !0))
      : (H(a, !1), rg(b, Hg().toString()), (b = !1));
    return b ? E(a) : null;
  }
  function zh() {
    return this.s("firebaseui-id-password");
  }
  function Ah() {
    return this.s("firebaseui-id-password-error");
  }
  function Bh() {
    var a = zh.call(this),
      b = Ah.call(this);
    mg(this, a, function () {
      sg(b) && (H(a, !0), qg(b));
    });
  }
  function Ch() {
    var a = zh.call(this);
    var b = Ah.call(this);
    E(a)
      ? (H(a, !0), qg(b), (b = !0))
      : (H(a, !1), rg(b, Hg().toString()), (b = !1));
    return b ? E(a) : null;
  }
  function Dh() {
    return this.s("firebaseui-id-phone-confirmation-code");
  }
  function Eh() {
    return this.s("firebaseui-id-phone-confirmation-code-error");
  }
  function Fh(a, b) {
    this.wc = a;
    this.Ma = b;
  }
  function Gh(a) {
    a = kb(a);
    var b = Rd.search(a);
    return 0 < b.length
      ? new Fh(
          "1" == b[0].a ? "1-US-0" : b[0].b,
          kb(a.substr(b[0].a.length + 1))
        )
      : null;
  }
  function Hh(a) {
    var b = Md(a.wc);
    if (!b) throw Error("Country ID " + a.wc + " not found.");
    return "+" + b.a + a.Ma;
  }
  function Ih() {
    return this.s("firebaseui-id-phone-number");
  }
  function Jh() {
    return this.s("firebaseui-id-country-selector");
  }
  function Kh() {
    return this.s("firebaseui-id-phone-number-error");
  }
  function Lh(a, b) {
    var c = a.Qa,
      d = Mh("1-US-0", c);
    b = b && Mh(b, c) ? b : d ? "1-US-0" : 0 < c.length ? c[0].b : null;
    if (!b) throw Error("No available default country");
    Nh.call(this, b, a);
  }
  function Mh(a, b) {
    a = Md(a);
    return !(!a || !La(b, a));
  }
  function Oh(a) {
    return Ja(a, function (b) {
      return {
        id: b.b,
        Wb: "firebaseui-flag " + Ph(b),
        label: b.name + " \u200e+" + b.a,
      };
    });
  }
  function Ph(a) {
    return "firebaseui-flag-" + a.c;
  }
  function Qh(a) {
    var b = this;
    ph.call(
      this,
      Oh(a.Qa),
      function (c) {
        Nh.call(b, c, a, !0);
        b.jb().focus();
      },
      this.jc
    );
  }
  function Nh(a, b, c) {
    var d = Md(a);
    d &&
      (c &&
        ((c = kb(E(Ih.call(this)) || "")),
        (b = b.search(c)),
        b.length &&
          b[0].a != d.a &&
          ((c = "+" + d.a + c.substr(b[0].a.length + 1)),
          pe(Ih.call(this), c))),
      (b = Md(this.jc)),
      (this.jc = a),
      (a = this.s("firebaseui-id-country-selector-flag")),
      b && Wd(a, Ph(b)),
      Vd(a, Ph(d)),
      le(this.s("firebaseui-id-country-selector-code"), "\u200e+" + d.a));
  }
  function Rh() {
    return this.s("firebaseui-id-resend-countdown");
  }
  var Sh = {},
    Th = 0;
  function Uh(a, b) {
    if (!a) throw Error("Event target element must be provided!");
    a = Vh(a);
    if (Sh[a] && Sh[a].length)
      for (var c = 0; c < Sh[a].length; c++) Sh[a][c].dispatchEvent(b);
  }
  function Wh(a) {
    var b = Vh(a.fa());
    Sh[b] &&
      Sh[b].length &&
      (Oa(Sh[b], function (c) {
        return c == a;
      }),
      Sh[b].length || delete Sh[b]);
  }
  function Vh(a) {
    "undefined" === typeof a.Be && ((a.Be = Th), Th++);
    return a.Be;
  }
  function Xh(a) {
    if (!a) throw Error("Event target element must be provided!");
    Ye.call(this);
    this.qg = a;
  }
  p(Xh, Ye);
  Xh.prototype.fa = function () {
    return this.qg;
  };
  Xh.prototype.register = function () {
    var a = Vh(this.fa());
    Sh[a] ? La(Sh[a], this) || Sh[a].push(this) : (Sh[a] = [this]);
  };
  Xh.prototype.unregister = function () {
    Wh(this);
  };
  var Yh = {
    mg: {
      "google.com":
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
      "github.com":
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg",
      "facebook.com":
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg",
      "twitter.com":
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg",
      password:
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg",
      phone:
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg",
      anonymous:
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/anonymous.png",
      "microsoft.com":
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/microsoft.svg",
      "yahoo.com":
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/yahoo.svg",
      "apple.com":
        "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/apple.png",
      saml: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/saml.svg",
      oidc: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/oidc.svg",
    },
    lg: {
      "google.com": "#ffffff",
      "github.com": "#333333",
      "facebook.com": "#3b5998",
      "twitter.com": "#55acee",
      password: "#db4437",
      phone: "#02bd7e",
      anonymous: "#f4b400",
      "microsoft.com": "#2F2F2F",
      "yahoo.com": "#720E9E",
      "apple.com": "#000000",
      saml: "#007bff",
      oidc: "#007bff",
    },
    ng: {
      "google.com": "Google",
      "github.com": "GitHub",
      "facebook.com": "Facebook",
      "twitter.com": "Twitter",
      password: "Password",
      phone: "Phone",
      anonymous: "Guest",
      "microsoft.com": "Microsoft",
      "yahoo.com": "Yahoo",
      "apple.com": "Apple",
    },
  };
  function Zh(a, b, c) {
    we.call(this, a, b);
    for (var d in c) this[d] = c[d];
  }
  x(Zh, we);
  function L(a, b, c, d, e) {
    jg.call(this, c);
    this.nf = a;
    this.mf = b;
    this.Kc = !1;
    this.Rc = d || null;
    this.Pa = this.Da = null;
    this.Bb = Xa(Yh);
    Za(this.Bb, e || {});
  }
  x(L, jg);
  k = L.prototype;
  k.td = function () {
    var a = Ag(this.nf, this.mf, this.Bb, this.zb());
    tg(a);
    this.f = a;
  };
  k.j = function () {
    L.Z.j.call(this);
    Uh(M(this), new Zh("pageEnter", M(this), { pageId: this.Rc }));
    if (this.Je() && this.Bb.P) {
      var a = this.Bb.P;
      I(this, this.Je(), function () {
        a();
      });
    }
    if (this.Ie() && this.Bb.O) {
      var b = this.Bb.O;
      I(this, this.Ie(), function () {
        b();
      });
    }
  };
  k.Rb = function () {
    Uh(M(this), new Zh("pageExit", M(this), { pageId: this.Rc }));
    L.Z.Rb.call(this);
  };
  k.g = function () {
    window.clearTimeout(this.Da);
    this.mf = this.nf = this.Da = null;
    this.Kc = !1;
    this.Pa = null;
    vg(this.fa());
    L.Z.g.call(this);
  };
  function $h(a) {
    a.Kc = !0;
    var b = Ud(a.fa(), "firebaseui-use-spinner");
    a.Da = window.setTimeout(function () {
      a.fa() &&
        null === a.Pa &&
        ((a.Pa = Ag(kh, { $c: b }, null, a.zb())),
        a.fa().appendChild(a.Pa),
        tg(a.Pa));
    }, 500);
  }
  k.X = function (a, b, c, d) {
    function e() {
      if (f.isDisposed()) return null;
      f.Kc = !1;
      window.clearTimeout(f.Da);
      f.Da = null;
      f.Pa && (vg(f.Pa), ke(f.Pa), (f.Pa = null));
    }
    var f = this;
    if (f.Kc) return null;
    $h(f);
    return a.apply(null, b).then(c, d).then(e, e);
  };
  function M(a) {
    return a.fa().parentElement || a.fa().parentNode;
  }
  function ai(a, b, c) {
    ng(a, b, function () {
      c.focus();
    });
  }
  function bi(a, b, c) {
    ng(a, b, function () {
      c();
    });
  }
  v(L.prototype, {
    D: function (a) {
      mh.call(this);
      var b = Ag(gh, { message: a }, null, this.zb());
      this.fa().appendChild(b);
      I(this, oh.call(this), function () {
        ke(b);
      });
    },
    Zh: mh,
    bi: nh,
    ai: oh,
    Ib: function (a, b) {
      a = Ag(ih, { Wb: a, message: b }, null, this.zb());
      xg.call(this, a);
    },
    ca: yg,
    xg: zg,
    di: function () {
      return this.s("firebaseui-tos");
    },
    Je: function () {
      return this.s("firebaseui-tos-link");
    },
    Ie: function () {
      return this.s("firebaseui-pp-link");
    },
    ei: function () {
      return this.s("firebaseui-tos-list");
    },
  });
  function ci(a, b) {
    a = a || {};
    D(
      null == a.email || "string" === typeof a.email,
      "email",
      a.email,
      "null|string|undefined"
    );
    var c = D(
        null == a.hb || "boolean" === typeof a.hb,
        "displayCancelButton",
        a.hb,
        "boolean|null|undefined"
      ),
      d = D(
        null == a.da || "boolean" === typeof a.da,
        "displayFullTosPpMessage",
        a.da,
        "boolean|null|undefined"
      );
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-in"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u3067\u30ed\u30b0\u30a4\u30f3</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' +
      (Wg(a) +
        '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        (c ? dh(null) : "") +
        Xg(null) +
        '</div></div><div class="firebaseui-card-footer">' +
        (d ? fh(b) : eh(b)) +
        "</div></form></div>");
    return C(a);
  }
  function di(a, b) {
    a = a || {};
    D(
      null == a.email || "string" === typeof a.email,
      "email",
      a.email,
      "null|string|undefined"
    );
    var c = D(
      null == a.da || "boolean" === typeof a.da,
      "displayFullTosPpMessage",
      a.da,
      "boolean|null|undefined"
    );
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-in"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3' +
      ('</h1></div><div class="firebaseui-card-content">' +
        Wg(a) +
        bh() +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
        ch() +
        '</div><div class="firebaseui-form-actions">' +
        Yg() +
        '</div></div><div class="firebaseui-card-footer">' +
        (c ? fh(b) : eh(b)) +
        "</div></form></div>");
    return C(a);
  }
  function ei(a, b) {
    a = a || {};
    D(
      null == a.email || "string" === typeof a.email,
      "email",
      a.email,
      "null|string|undefined"
    );
    var c = D(
      null == a.Rd || "boolean" === typeof a.Rd,
      "requireDisplayName",
      a.Rd,
      "boolean|null|undefined"
    );
    D(
      null == a.name || "string" === typeof a.name,
      "name",
      a.name,
      "null|string|undefined"
    );
    var d = D(
        null == a.eb || "boolean" === typeof a.eb,
        "allowCancel",
        a.eb,
        "boolean|null|undefined"
      ),
      e = D(
        null == a.da || "boolean" === typeof a.da,
        "displayFullTosPpMessage",
        a.da,
        "boolean|null|undefined"
      ),
      f = '</h1></div><div class="firebaseui-card-content">' + Wg(a);
    c
      ? ((a = a || {}),
        (a = D(
          null == a.name || "string" === typeof a.name,
          "name",
          a.name,
          "null|string|undefined"
        )),
        (a =
          '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="name">\u3042\u306a\u305f\u306e\u540d\u524d</label><input type="text" name="name" autocomplete="name" class="mdl-textfield__input firebaseui-input firebaseui-id-name" value="' +
          (rd(null != a ? a : "") +
            '"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-name-error"></p></div>')),
        (a = C(a)))
      : (a = "");
    b =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-up"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u4f5c\u6210' +
      (f +
        a +
        ah(null) +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        (d ? dh(null) : "") +
        Zg() +
        '</div></div><div class="firebaseui-card-footer">' +
        (e ? fh(b) : eh(b)) +
        "</div></form></div>");
    return C(b);
  }
  function fi(a, b) {
    a = a || {};
    D(
      null == a.email || "string" === typeof a.email,
      "email",
      a.email,
      "null|string|undefined"
    );
    var c = D(
      null == a.eb || "boolean" === typeof a.eb,
      "allowCancel",
      a.eb,
      "boolean|null|undefined"
    );
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-recovery"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u5fa9\u5143</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u3053\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306b\u9001\u4fe1\u3055\u308c\u305f\u3001\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u518d\u8a2d\u5b9a\u65b9\u6cd5\u3092\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044</p>' +
      (Wg(a) +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        (c ? dh(null) : ""));
    a += Xg({ label: "\u9001\u4fe1" });
    a +=
      '</div></div><div class="firebaseui-card-footer">' +
      eh(b) +
      "</div></form></div>";
    return C(a);
  }
  function gi(a, b) {
    var c = D("string" === typeof a.email, "email", a.email, "string");
    a = D(
      null == a.l || "boolean" === typeof a.l,
      "allowContinue",
      a.l,
      "boolean|null|undefined"
    );
    var d =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-recovery-email-sent"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u3092\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
    c =
      "<strong>" +
      (B(c) +
        "</strong> \u306b\u9001\u4fe1\u3055\u308c\u305f\u624b\u9806\u306b\u6cbf\u3063\u3066\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u5fa9\u5143\u3057\u307e\u3059");
    d = d + c + '</p></div><div class="firebaseui-card-actions">';
    a &&
      ((d =
        d +
        '<div class="firebaseui-form-actions">' +
        Xg({ label: "\u5b8c\u4e86" })),
      (d += "</div>"));
    d += '</div><div class="firebaseui-card-footer">' + eh(b) + "</div></div>";
    return C(d);
  }
  function hi(a, b) {
    return C(
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-callback"><div class="firebaseui-callback-indicator-container">' +
        kh(null, b) +
        "</div></div>"
    );
  }
  function ii(a, b) {
    return C(
      '<div class="firebaseui-container firebaseui-id-page-spinner">' +
        kh({ $c: !0 }, b) +
        "</div>"
    );
  }
  function ji() {
    return C(
      '<div class="firebaseui-container firebaseui-id-page-blank firebaseui-use-spinner"></div>'
    );
  }
  function ki(a, b) {
    var c = D("string" === typeof a.email, "email", a.email, "string");
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-sent"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3\u30e1\u30fc\u30eb\u3092\u9001\u4fe1\u3057\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><div class="firebaseui-email-sent"></div><p class="firebaseui-text">';
    c =
      "\u8a73\u7d30\u306a\u8aac\u660e\u3092\u8a18\u8f09\u3057\u305f\u30ed\u30b0\u30a4\u30f3\u30e1\u30fc\u30eb\u3092 <strong>" +
      (B(c) +
        "</strong> \u306b\u9001\u4fe1\u3057\u307e\u3057\u305f\u3002\u30e1\u30fc\u30eb\u3092\u78ba\u8a8d\u3057\u3066\u30ed\u30b0\u30a4\u30f3\u3092\u5b8c\u4e86\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
    a += c;
    c = C(
      '<a class="firebaseui-link firebaseui-id-trouble-getting-email-link" href="javascript:void(0)">\u30e1\u30fc\u30eb\u304c\u53d7\u4fe1\u3067\u304d\u306a\u3044\u5834\u5408</a>'
    );
    a =
      a +
      ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
        c +
        '</div><div class="firebaseui-form-actions">') +
      dh({ label: "\u623b\u308b" });
    a +=
      '</div></div><div class="firebaseui-card-footer">' +
      eh(b) +
      "</div></form></div>";
    return C(a);
  }
  function li(a, b) {
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-not-received"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u304c\u53d7\u4fe1\u3067\u304d\u306a\u3044\u5834\u5408</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u4ee5\u4e0b\u306e\u4e00\u822c\u7684\u306a\u89e3\u6c7a\u65b9\u6cd5\u3092\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002<ul><li>\u30e1\u30fc\u30eb\u304c\u30b9\u30d1\u30e0\u306b\u5206\u985e\u3055\u308c\u305f\u308a\u30d5\u30a3\u30eb\u30bf\u3055\u308c\u305f\u308a\u3057\u3066\u3044\u306a\u3044\u304b\u78ba\u8a8d\u3059\u308b\u3002</li><li>\u30a4\u30f3\u30bf\u30fc\u30cd\u30c3\u30c8\u306e\u63a5\u7d9a\u3092\u78ba\u8a8d\u3059\u308b\u3002</li><li>\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306e\u30b9\u30da\u30eb\u306b\u8aa4\u308a\u304c\u306a\u3044\u304b\u78ba\u8a8d\u3059\u308b\u3002</li><li>\u53d7\u4fe1\u30c8\u30ec\u30a4\u306e\u5bb9\u91cf\u4e0d\u8db3\u3084\u3001\u8a2d\u5b9a\u95a2\u9023\u306e\u305d\u306e\u4ed6\u306e\u554f\u984c\u304c\u306a\u3044\u304b\u78ba\u8a8d\u3059\u308b\u3002</li></ul></p><p class="firebaseui-text">\u4e0a\u8a18\u306e\u624b\u9806\u3067\u89e3\u6c7a\u3057\u306a\u304b\u3063\u305f\u5834\u5408\u306f\u30e1\u30fc\u30eb\u3092\u518d\u9001\u4fe1\u3067\u304d\u307e\u3059\u3002\u30e1\u30fc\u30eb\u3092\u518d\u9001\u4fe1\u3059\u308b\u3068\u3001\u524d\u56de\u306e\u30e1\u30fc\u30eb\u306b\u8a18\u8f09\u3055\u308c\u305f\u30ea\u30f3\u30af\u306f\u7121\u52b9\u306b\u306a\u308a\u307e\u3059\u3002</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
      (C(
        '<a class="firebaseui-link firebaseui-id-resend-email-link" href="javascript:void(0)">\u518d\u9001\u4fe1</a>'
      ) +
        '</div><div class="firebaseui-form-actions">');
    a += dh({ label: "\u623b\u308b" });
    a +=
      '</div></div><div class="firebaseui-card-footer">' +
      eh(b) +
      "</div></form></div>";
    return C(a);
  }
  function mi(a, b) {
    a = a || {};
    D(
      null == a.email || "string" === typeof a.email,
      "email",
      a.email,
      "null|string|undefined"
    );
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-confirmation"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u306e\u78ba\u8a8d</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u30e1\u30fc\u30eb\u3092\u78ba\u8a8d\u3057\u3066\u30ed\u30b0\u30a4\u30f3\u3092\u5b8c\u4e86\u3057\u3066\u304f\u3060\u3055\u3044</p><div class="firebaseui-relative-wrapper">' +
      (Wg(a) +
        '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        dh(null) +
        Xg(null) +
        '</div></div><div class="firebaseui-card-footer">' +
        eh(b) +
        "</div></form></div>");
    return C(a);
  }
  function ni() {
    var a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-different-device-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u65b0\u3057\u3044\u30c7\u30d0\u30a4\u30b9\u307e\u305f\u306f\u30d6\u30e9\u30a6\u30b6\u304c\u691c\u51fa\u3055\u308c\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u30ed\u30b0\u30a4\u30f3 \u30d7\u30ed\u30bb\u30b9\u3092\u958b\u59cb\u3057\u305f\u3068\u304d\u3068\u540c\u3058\u30c7\u30d0\u30a4\u30b9\u307e\u305f\u306f\u30d6\u30e9\u30a6\u30b6\u3092\u4f7f\u7528\u3057\u3066\u30ea\u30f3\u30af\u3092\u958b\u3044\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
      dh({ label: "\u9589\u3058\u308b" });
    return C(a + "</div></div></div>");
  }
  function oi() {
    var a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-anonymous-user-mismatch"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30bb\u30c3\u30b7\u30e7\u30f3\u304c\u7d42\u4e86\u3057\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u3053\u306e\u30ed\u30b0\u30a4\u30f3 \u30ea\u30af\u30a8\u30b9\u30c8\u306b\u95a2\u9023\u4ed8\u3051\u3089\u308c\u305f\u30bb\u30c3\u30b7\u30e7\u30f3\u306e\u6709\u52b9\u671f\u9650\u304c\u5207\u308c\u3066\u3044\u308b\u304b\u3001\u30af\u30ea\u30a2\u3055\u308c\u3066\u3044\u307e\u3059\u3002</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
      dh({ label: "\u9589\u3058\u308b" });
    return C(a + "</div></div></div>");
  }
  function pi(a, b) {
    var c = D("string" === typeof a.email, "email", a.email, "string");
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u3059\u3067\u306b\u304a\u6301\u3061\u3067\u3059</h2><p class="firebaseui-text">';
    c =
      "\u3059\u3067\u306b <strong>" +
      (B(c) +
        "</strong> \u3092\u4f7f\u7528\u3057\u3066\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u3044\u307e\u3059\u3002\u3053\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
    a =
      a +
      c +
      ("</p>" +
        bh() +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
        ch() +
        '</div><div class="firebaseui-form-actions">' +
        Yg() +
        '</div></div><div class="firebaseui-card-footer">' +
        eh(b) +
        "</div></form></div>");
    return C(a);
  }
  function qi(a, b) {
    var c = D("string" === typeof a.email, "email", a.email, "string");
    D(
      null == a.F || t(a.F),
      "providerConfig",
      a.F,
      "null|undefined|{providerId: (null|string|undefined), providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}"
    );
    var d = "";
    a = "" + lh(a, b);
    d +=
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u3059\u3067\u306b\u304a\u6301\u3061\u3067\u3059</h2><p class="firebaseui-text firebaseui-text-justify">';
    c =
      "<strong>" +
      (B(c) +
        ("</strong> \u306f\u3059\u3067\u306b\u4f7f\u7528\u3055\u308c\u3066\u3044\u307e\u3059\u3002\u4ee5\u4e0b\u306e\u30e1\u30fc\u30eb\u30ea\u30f3\u30af\u3092\u4f7f\u7528\u3057\u3066\u30ed\u30b0\u30a4\u30f3\u3059\u308b\u3068\u3001<strong>" +
          (B(a) +
            ("</strong> \u30a2\u30ab\u30a6\u30f3\u30c8\u3092 <strong>" +
              (B(c) +
                "</strong> \u306b\u63a5\u7d9a\u3067\u304d\u307e\u3059\u3002")))));
    d = d + c + '<p class="firebaseui-text firebaseui-text-justify">';
    c =
      "\u3053\u306e\u30d5\u30ed\u30fc\u3067 " +
      (B(a) +
        " \u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u3053\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306b\u6b63\u5e38\u306b\u63a5\u7d9a\u3059\u308b\u306b\u306f\u3001\u540c\u3058\u30c7\u30d0\u30a4\u30b9\u307e\u305f\u306f\u30d6\u30e9\u30a6\u30b6\u3067\u30ea\u30f3\u30af\u3092\u958b\u304f\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002");
    d =
      d +
      c +
      ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        Yg() +
        '</div></div><div class="firebaseui-card-footer">' +
        eh(b) +
        "</div></form></div>");
    return C(d);
  }
  function ri(a, b) {
    a = a || {};
    D(
      null == a.F || t(a.F),
      "providerConfig",
      a.F,
      "null|undefined|{providerId: (null|string|undefined), providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}"
    );
    var c = "";
    a = "" + lh(a, b);
    c +=
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-linking-different-device"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text firebaseui-text-justify">';
    var d =
      "\u5143\u3005\u306f <strong>" +
      (B(a) +
        "</strong> \u3092\u30e1\u30fc\u30eb \u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u63a5\u7d9a\u3057\u3088\u3046\u3068\u3057\u307e\u3057\u305f\u304c\u3001\u3053\u306e\u30d7\u30ed\u30d0\u30a4\u30c0\u306b\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u3044\u306a\u3044\u30c7\u30d0\u30a4\u30b9\u3067\u30ea\u30f3\u30af\u304c\u958b\u304b\u308c\u307e\u3057\u305f\u3002");
    c = c + d + '</p><p class="firebaseui-text firebaseui-text-justify">';
    a =
      "<strong>" +
      (B(a) +
        "</strong> \u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u63a5\u7d9a\u3059\u308b\u5834\u5408\u306f\u3001\u30ed\u30b0\u30a4\u30f3\u3092\u958b\u59cb\u3057\u305f\u30c7\u30d0\u30a4\u30b9\u3067\u30ea\u30f3\u30af\u3092\u958b\u3044\u3066\u304f\u3060\u3055\u3044\u3002\u5143\u306e\u30d7\u30ed\u30d0\u30a4\u30c0\u306b\u63a5\u7d9a\u3057\u306a\u3044\u5834\u5408\u306f\u3001\u3053\u306e\u30c7\u30d0\u30a4\u30b9\u3067 [\u7d9a\u884c] \u3092\u30bf\u30c3\u30d7\u3057\u3066\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
    c =
      c +
      a +
      ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        $g() +
        '</div></div><div class="firebaseui-card-footer">' +
        eh(b) +
        "</div></form></div>");
    return C(c);
  }
  function si(a, b) {
    var c = D("string" === typeof a.email, "email", a.email, "string");
    D(
      null == a.F || t(a.F),
      "providerConfig",
      a.F,
      "null|undefined|{providerId: (null|string|undefined), providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}"
    );
    var d = "";
    a = "" + lh(a, b);
    d +=
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-federated-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u3059\u3067\u306b\u304a\u6301\u3061\u3067\u3059</h2><p class="firebaseui-text">';
    c =
      "<strong>" +
      (B(c) +
        ("</strong> \u3092\u3059\u3067\u306b\u4f7f\u7528\u3057\u3066\u3044\u307e\u3059\u3002" +
          (B(a) +
            " \u3067\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u7d9a\u884c\u3057\u3066\u304f\u3060\u3055\u3044\u3002")));
    d =
      d +
      c +
      '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
      Xg({ label: "" + a + " \u3067\u30ed\u30b0\u30a4\u30f3" });
    d +=
      '</div></div><div class="firebaseui-card-footer">' +
      eh(b) +
      "</div></form></div>";
    return C(d);
  }
  function ti(a, b) {
    var c = D("string" === typeof a.email, "email", a.email, "string");
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unsupported-provider"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
    c =
      "\u3053\u306e\u30c7\u30d0\u30a4\u30b9\u3067 <strong>" +
      (B(c) +
        "</strong> \u306b\u3088\u308b\u30ed\u30b0\u30a4\u30f3\u3092\u7d9a\u884c\u3059\u308b\u306b\u306f\u3001\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u5fa9\u5143\u3059\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002");
    a =
      a +
      c +
      ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        dh(null));
    a += Xg({ label: "\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u5fa9\u5143" });
    a +=
      '</div></div><div class="firebaseui-card-footer">' +
      eh(b) +
      "</div></form></div>";
    return C(a);
  }
  function ui(a) {
    var b = D("string" === typeof a.email, "email", a.email, "string");
    var c =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u518d\u8a2d\u5b9a</h1></div><div class="firebaseui-card-content">';
    b =
      '<p class="firebaseui-text">\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9: <strong>' +
      (B(b) + "</strong></p>");
    var d = { label: "\u65b0\u3057\u3044\u30d1\u30b9\u30ef\u30fc\u30c9" },
      e;
    for (e in a) e in d || (d[e] = a[e]);
    c = c + b + ah(d);
    c +=
      '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
      Zg() +
      "</div></div></form></div>";
    return C(c);
  }
  function vi(a) {
    a = a || {};
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u5909\u66f4\u3057\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u65b0\u3057\u3044\u30d1\u30b9\u30ef\u30fc\u30c9\u3067\u30ed\u30b0\u30a4\u30f3\u3067\u304d\u308b\u3088\u3046\u306b\u306a\u308a\u307e\u3057\u305f</p></div><div class="firebaseui-card-actions">' +
      ((D(
        null == a.l || "boolean" === typeof a.l,
        "allowContinue",
        a.l,
        "boolean|null|undefined"
      )
        ? '<div class="firebaseui-form-actions">' + $g() + "</div>"
        : "") +
        "</div></div>");
    return C(a);
  }
  function wi(a) {
    a = a || {};
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u518d\u8a2d\u5b9a\u3092\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u518d\u8a2d\u5b9a\u306e\u30ea\u30af\u30a8\u30b9\u30c8\u306e\u671f\u9650\u304c\u5207\u308c\u305f\u304b\u3001\u30ea\u30f3\u30af\u304c\u3059\u3067\u306b\u4f7f\u7528\u3055\u308c\u3066\u3044\u307e\u3059</p></div><div class="firebaseui-card-actions">' +
      ((D(
        null == a.l || "boolean" === typeof a.l,
        "allowContinue",
        a.l,
        "boolean|null|undefined"
      )
        ? '<div class="firebaseui-form-actions">' + $g() + "</div>"
        : "") +
        "</div></div>");
    return C(a);
  }
  function xi(a) {
    var b = D("string" === typeof a.email, "email", a.email, "string");
    a = D(
      null == a.l || "boolean" === typeof a.l,
      "allowContinue",
      a.l,
      "boolean|null|undefined"
    );
    var c =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-change-revoke-success"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u66f4\u65b0\u3057\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
    b =
      "\u30ed\u30b0\u30a4\u30f3 \u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u304c <strong>" +
      (B(b) + "</strong> \u306b\u623b\u3055\u308c\u307e\u3057\u305f\u3002");
    c =
      c +
      b +
      '</p><p class="firebaseui-text">\u30ed\u30b0\u30a4\u30f3 \u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306e\u5909\u66f4\u3092\u30ea\u30af\u30a8\u30b9\u30c8\u3057\u3066\u3044\u306a\u3044\u5834\u5408\u306f\u3001\u8ab0\u304b\u304c\u3042\u306a\u305f\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u30a2\u30af\u30bb\u30b9\u3057\u3088\u3046\u3068\u3057\u3066\u3044\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002<a class="firebaseui-link firebaseui-id-reset-password-link" href="javascript:void(0)">\u4eca\u3059\u3050\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u5909\u66f4\u3057\u3066\u304f\u3060\u3055\u3044</a>\u3002';
    c +=
      '</p></div><div class="firebaseui-card-actions">' +
      (a ? '<div class="firebaseui-form-actions">' + $g() + "</div>" : "") +
      "</div></form></div>";
    return C(c);
  }
  function yi(a) {
    a = a || {};
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-change-revoke-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u66f4\u65b0\u3067\u304d\u307e\u305b\u3093</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u30ed\u30b0\u30a4\u30f3 \u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5143\u306b\u623b\u3059\u969b\u306b\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002</p><p class="firebaseui-text">\u518d\u5ea6\u8a66\u3057\u3066\u3082\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u518d\u8a2d\u5b9a\u3067\u304d\u306a\u3044\u5834\u5408\u306f\u3001\u7ba1\u7406\u8005\u306b\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002</p></div><div class="firebaseui-card-actions">' +
      ((D(
        null == a.l || "boolean" === typeof a.l,
        "allowContinue",
        a.l,
        "boolean|null|undefined"
      )
        ? '<div class="firebaseui-form-actions">' + $g() + "</div>"
        : "") +
        "</div></div>");
    return C(a);
  }
  function zi(a) {
    a = a || {};
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306f\u78ba\u8a8d\u6e08\u307f\u3067\u3059</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u65b0\u3057\u3044\u30a2\u30ab\u30a6\u30f3\u30c8\u3067\u30ed\u30b0\u30a4\u30f3\u3067\u304d\u308b\u3088\u3046\u306b\u306a\u308a\u307e\u3057\u305f</p></div><div class="firebaseui-card-actions">' +
      ((D(
        null == a.l || "boolean" === typeof a.l,
        "allowContinue",
        a.l,
        "boolean|null|undefined"
      )
        ? '<div class="firebaseui-form-actions">' + $g() + "</div>"
        : "") +
        "</div></div>");
    return C(a);
  }
  function Ai(a) {
    a = a || {};
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u518d\u5ea6\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306e\u78ba\u8a8d\u306e\u30ea\u30af\u30a8\u30b9\u30c8\u306e\u671f\u9650\u304c\u5207\u308c\u305f\u304b\u3001\u30ea\u30f3\u30af\u304c\u3059\u3067\u306b\u4f7f\u7528\u3055\u308c\u3066\u3044\u307e\u3059</p></div><div class="firebaseui-card-actions">' +
      ((D(
        null == a.l || "boolean" === typeof a.l,
        "allowContinue",
        a.l,
        "boolean|null|undefined"
      )
        ? '<div class="firebaseui-form-actions">' + $g() + "</div>"
        : "") +
        "</div></div>");
    return C(a);
  }
  function Bi(a) {
    var b = D("string" === typeof a.email, "email", a.email, "string");
    a = D(
      null == a.l || "boolean" === typeof a.l,
      "allowContinue",
      a.l,
      "boolean|null|undefined"
    );
    var c =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-verify-and-change-email-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306e\u78ba\u8a8d\u3068\u5909\u66f4\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
    b =
      "\u65b0\u3057\u3044\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\uff08<strong>" +
      (B(b) +
        "</strong>\uff09\u3067\u30ed\u30b0\u30a4\u30f3\u3067\u304d\u308b\u3088\u3046\u306b\u306a\u308a\u307e\u3057\u305f\u3002");
    c =
      c +
      b +
      ('</p></div><div class="firebaseui-card-actions">' +
        (a ? '<div class="firebaseui-form-actions">' + $g() + "</div>" : "") +
        "</div></div>");
    return C(c);
  }
  function Ci(a) {
    a = a || {};
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-verify-and-change-email-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u3082\u3046\u4e00\u5ea6\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u66f4\u65b0\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306e\u78ba\u8a8d\u3068\u66f4\u65b0\u306e\u30ea\u30af\u30a8\u30b9\u30c8\u306e\u671f\u9650\u304c\u5207\u308c\u305f\u304b\u3001\u30ea\u30f3\u30af\u304c\u3059\u3067\u306b\u4f7f\u7528\u3055\u308c\u3066\u3044\u307e\u3059\u3002</p></div><div class="firebaseui-card-actions">' +
      ((D(
        null == a.l || "boolean" === typeof a.l,
        "allowContinue",
        a.l,
        "boolean|null|undefined"
      )
        ? '<div class="firebaseui-form-actions">' + $g() + "</div>"
        : "") +
        "</div></div>");
    return C(a);
  }
  function Di(a) {
    var b = D("string" === typeof a.factorId, "factorId", a.factorId, "string"),
      c = D(
        null == a.phoneNumber || "string" === typeof a.phoneNumber,
        "phoneNumber",
        a.phoneNumber,
        "null|string|undefined"
      );
    a = D(
      null == a.l || "boolean" === typeof a.l,
      "allowContinue",
      a.l,
      "boolean|null|undefined"
    );
    var d =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-revert-second-factor-addition-success"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">2 \u3064\u76ee\u306e\u8a8d\u8a3c\u8981\u7d20\u3092\u524a\u9664\u3057\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
    switch (t(b) ? b.toString() : b) {
      case "phone":
        b =
          "<strong>" +
          (B(b) +
            (" " +
              (B(c) +
                "</strong> \u306f 2 \u3064\u76ee\u306e\u8a8d\u8a3c\u624b\u9806\u304b\u3089\u524a\u9664\u3055\u308c\u307e\u3057\u305f\u3002")));
        d += b;
        break;
      default:
        d +=
          "\u30c7\u30d0\u30a4\u30b9\u307e\u305f\u306f\u30a2\u30d7\u30ea\u304c 2 \u3064\u76ee\u306e\u8a8d\u8a3c\u624b\u9806\u304b\u3089\u524a\u9664\u3055\u308c\u307e\u3057\u305f\u3002";
    }
    d =
      d +
      '</p><p class="firebaseui-text">\u3053\u306e\u30c7\u30d0\u30a4\u30b9\u306b\u5fc3\u5f53\u305f\u308a\u304c\u306a\u3044\u5834\u5408\u306f\u3001\u4ed6\u306e\u30e6\u30fc\u30b6\u30fc\u304c\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u30a2\u30af\u30bb\u30b9\u3057\u3088\u3046\u3068\u3057\u3066\u3044\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002<a class="firebaseui-link firebaseui-id-reset-password-link" href="javascript:void(0)">\u4eca\u3059\u3050\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u5909\u66f4\u3059\u308b</a>\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002</p></div><div class="firebaseui-card-actions">' +
      ((a ? '<div class="firebaseui-form-actions">' + $g() + "</div>" : "") +
        "</div></form></div>");
    return C(d);
  }
  function Ei(a) {
    a = a || {};
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-revert-second-factor-addition-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">2 \u3064\u76ee\u306e\u8a8d\u8a3c\u8981\u7d20\u3092\u524a\u9664\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">2 \u3064\u76ee\u306e\u8a8d\u8a3c\u8981\u7d20\u306e\u524a\u9664\u3067\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002</p><p class="firebaseui-text">\u3082\u3046\u4e00\u5ea6\u524a\u9664\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002\u305d\u308c\u3067\u3082\u554f\u984c\u304c\u89e3\u6c7a\u3057\u306a\u3044\u5834\u5408\u306f\u3001\u30b5\u30dd\u30fc\u30c8\u306b\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002</p></div><div class="firebaseui-card-actions">' +
      ((D(
        null == a.l || "boolean" === typeof a.l,
        "allowContinue",
        a.l,
        "boolean|null|undefined"
      )
        ? '<div class="firebaseui-form-actions">' + $g() + "</div>"
        : "") +
        "</div></div>");
    return C(a);
  }
  function Fi(a) {
    var b = D(
      "string" === typeof a.errorMessage,
      "errorMessage",
      a.errorMessage,
      "string"
    );
    a = D(
      null == a.jd || "boolean" === typeof a.jd,
      "allowRetry",
      a.jd,
      "boolean|null|undefined"
    );
    b =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-recoverable-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
      (B(b) +
        '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">');
    a && (b += Xg({ label: "\u518d\u8a66\u884c" }));
    return C(b + "</div></div></div>");
  }
  function Gi(a) {
    a = D(
      "string" === typeof a.errorMessage,
      "errorMessage",
      a.errorMessage,
      "string"
    );
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unrecoverable-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
      (B(a) + "</p></div></div>");
    return C(a);
  }
  function Hi(a, b) {
    var c = D("string" === typeof a.zf, "userEmail", a.zf, "string"),
      d = D("string" === typeof a.df, "pendingEmail", a.df, "string");
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-mismatch"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">';
    c = B(c) + " \u3067\u7d9a\u884c\u3057\u307e\u3059\u304b\uff1f";
    a = a + c + '</h2><p class="firebaseui-text">';
    c =
      "\u6700\u521d\u306f\u3001" +
      (B(d) +
        " \u3067\u306e\u30ed\u30b0\u30a4\u30f3\u3092\u3054\u5e0c\u671b\u3067\u3057\u305f");
    a =
      a +
      c +
      ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        dh(null));
    a += Xg({ label: "\u7d9a\u884c" });
    a +=
      '</div></div><div class="firebaseui-card-footer">' +
      eh(b) +
      "</div></form></div>";
    return C(a);
  }
  function Ii(a, b) {
    a = D(
      Array.isArray(a.ff),
      "providerConfigs",
      a.ff,
      "!Array<{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}>"
    );
    for (
      var c =
          '<div class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-idp-list">',
        d = a.length,
        e = 0;
      e < d;
      e++
    ) {
      var f = { F: a[e] },
        g = b;
      f = f || {};
      var h = D(
        null == f.F || t(f.F),
        "providerConfig",
        f.F,
        "null|undefined|{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}"
      );
      var m = f;
      m = m || {};
      var n = "";
      m = D(
        null == m.F || t(m.F),
        "providerConfig",
        m.F,
        "null|undefined|{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}"
      ).providerId;
      switch (t(m) ? m.toString() : m) {
        case "google.com":
          n += "firebaseui-idp-google";
          break;
        case "github.com":
          n += "firebaseui-idp-github";
          break;
        case "facebook.com":
          n += "firebaseui-idp-facebook";
          break;
        case "twitter.com":
          n += "firebaseui-idp-twitter";
          break;
        case "phone":
          n += "firebaseui-idp-phone";
          break;
        case "anonymous":
          n += "firebaseui-idp-anonymous";
          break;
        case "password":
          n += "firebaseui-idp-password";
          break;
        default:
          n += "firebaseui-idp-generic";
      }
      n =
        '<button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised ' +
        rd(n) +
        ' firebaseui-id-idp-button" data-provider-id="' +
        rd(h.providerId) +
        '" style="background-color:';
      var l = f;
      m = g;
      l = l || {};
      l = D(
        null == l.F || t(l.F),
        "providerConfig",
        l.F,
        "null|undefined|{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}"
      );
      m = m.lg;
      n =
        n +
        rd(
          Dd(
            l.Ob
              ? "" + l.Ob
              : m[l.providerId]
              ? "" + m[l.providerId]
              : 0 == ("" + l.providerId).indexOf("saml.")
              ? "" + m.saml
              : 0 == ("" + l.providerId).indexOf("oidc.")
              ? "" + m.oidc
              : "" + m.password
          )
        ) +
        '"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="';
      l = f;
      m = g;
      l = l || {};
      l = D(
        null == l.F || t(l.F),
        "providerConfig",
        l.F,
        "null|undefined|{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}"
      );
      m = m.mg;
      m = l.Xb
        ? wd(l.Xb)
        : m[l.providerId]
        ? wd(m[l.providerId])
        : 0 == ("" + l.providerId).indexOf("saml.")
        ? wd(m.saml)
        : 0 == ("" + l.providerId).indexOf("oidc.")
        ? wd(m.oidc)
        : wd(m.password);
      m = md(m);
      n = n + rd(Bd(m)) + '"></span>';
      nd(h.providerId, "password")
        ? ((n += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
          h.qa
            ? (n += B(h.qa))
            : h.ja
            ? ((f = B(lh(f, g)) + " \u3067\u30ed\u30b0\u30a4\u30f3"), (n += f))
            : (n += "\u30e1\u30fc\u30eb\u3067\u30ed\u30b0\u30a4\u30f3"),
          (n +=
            '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
          (n = h.ja
            ? n + B(h.ja)
            : n + "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"),
          (n += "</span>"))
        : nd(h.providerId, "phone")
        ? ((n += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
          h.qa
            ? (n += B(h.qa))
            : h.ja
            ? ((f = B(lh(f, g)) + " \u3067\u30ed\u30b0\u30a4\u30f3"), (n += f))
            : (n += "\u96fb\u8a71\u756a\u53f7\u3067\u30ed\u30b0\u30a4\u30f3"),
          (n +=
            '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
          (n = h.ja ? n + B(h.ja) : n + "\u96fb\u8a71\u756a\u53f7"),
          (n += "</span>"))
        : nd(h.providerId, "anonymous")
        ? ((n += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
          h.qa
            ? (n += B(h.qa))
            : h.ja
            ? ((f = B(lh(f, g)) + " \u3067\u30ed\u30b0\u30a4\u30f3"), (n += f))
            : (n += "\u30b2\u30b9\u30c8\u3068\u3057\u3066\u7d9a\u884c"),
          (n +=
            '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
          (n = h.ja ? n + B(h.ja) : n + "\u30b2\u30b9\u30c8"),
          (n += "</span>"))
        : ((n += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
          h.qa
            ? (n += B(h.qa))
            : ((m = B(lh(f, g)) + " \u3067\u30ed\u30b0\u30a4\u30f3"), (n += m)),
          (n +=
            '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">' +
            (h.ja ? B(h.ja) : B(lh(f, g))) +
            "</span>"));
      h = C(n + "</button>");
      c += '<li class="firebaseui-list-item">' + h + "</li>";
    }
    c +=
      '</ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">' +
      fh(b) +
      "</div></div>";
    return C(c);
  }
  function Ji(a, b) {
    a = a || {};
    D(
      null == a.Ma || "string" === typeof a.Ma,
      "nationalNumber",
      a.Ma,
      "null|string|undefined"
    );
    var c = D(
        null == a.ud || "boolean" === typeof a.ud,
        "enableVisibleRecaptcha",
        a.ud,
        "boolean|null|undefined"
      ),
      d = D(
        null == a.hb || "boolean" === typeof a.hb,
        "displayCancelButton",
        a.hb,
        "boolean|null|undefined"
      ),
      e = D(
        null == a.da || "boolean" === typeof a.da,
        "displayFullTosPpMessage",
        a.da,
        "boolean|null|undefined"
      );
    a = a || {};
    a = D(
      null == a.Ma || "string" === typeof a.Ma,
      "nationalNumber",
      a.Ma,
      "null|string|undefined"
    );
    a =
      '<div class="firebaseui-phone-number"><button class="firebaseui-id-country-selector firebaseui-country-selector mdl-button mdl-js-button"><span class="firebaseui-flag firebaseui-country-selector-flag firebaseui-id-country-selector-flag"></span><span class="firebaseui-id-country-selector-code"></span></button><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label firebaseui-textfield firebaseui-phone-input-wrapper"><label class="mdl-textfield__label firebaseui-label" for="phoneNumber">\u96fb\u8a71\u756a\u53f7</label><input type="tel" name="phoneNumber" class="mdl-textfield__input firebaseui-input firebaseui-id-phone-number" value="' +
      (rd(null != a ? a : "") +
        '"></div></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-phone-number-error firebaseui-id-phone-number-error"></p></div>');
    a =
      '</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' +
      C(a);
    c = c
      ? C(
          '<div class="firebaseui-recaptcha-wrapper"><div class="firebaseui-recaptcha-container"></div><div class="firebaseui-error-wrapper firebaseui-recaptcha-error-wrapper"><p class="firebaseui-error firebaseui-hidden firebaseui-id-recaptcha-error"></p></div></div>'
        )
      : "";
    d =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u96fb\u8a71\u756a\u53f7\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044' +
      (a +
        c +
        '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        (d ? dh(null) : ""));
    d += Xg({ label: "\u78ba\u8a8d" });
    e
      ? ((e = b.O),
        (c = '<p class="firebaseui-tos firebaseui-phone-tos">'),
        (c =
          od(b.P) && od(e)
            ? c +
              '[\u78ba\u8a8d] \u3092\u30bf\u30c3\u30d7\u3059\u308b\u3068\u3001<a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">\u5229\u7528\u898f\u7d04</a>\u3068<a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc \u30dd\u30ea\u30b7\u30fc</a>\u306b\u540c\u610f\u3057\u305f\u3053\u3068\u306b\u306a\u308a\u3001SMS \u304c\u9001\u4fe1\u3055\u308c\u307e\u3059\u3002\u30c7\u30fc\u30bf\u901a\u4fe1\u6599\u304c\u304b\u304b\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002'
            : c +
              "[\u78ba\u8a8d] \u3092\u30bf\u30c3\u30d7\u3059\u308b\u3068\u3001SMS \u304c\u9001\u4fe1\u3055\u308c\u307e\u3059\u3002\u30c7\u30fc\u30bf\u901a\u4fe1\u6599\u304c\u304b\u304b\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002"),
        (b = C(c + "</p>")))
      : (b =
          C(
            '<p class="firebaseui-tos firebaseui-phone-sms-notice">[\u78ba\u8a8d] \u3092\u30bf\u30c3\u30d7\u3059\u308b\u3068\u3001SMS \u304c\u9001\u4fe1\u3055\u308c\u307e\u3059\u3002\u30c7\u30fc\u30bf\u901a\u4fe1\u6599\u304c\u304b\u304b\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002</p>'
          ) + eh(b));
    return C(
      d +
        ('</div></div><div class="firebaseui-card-footer">' +
          b +
          "</div></form></div>")
    );
  }
  function Ki(a, b) {
    a = a || {};
    a = D(
      null == a.phoneNumber || "string" === typeof a.phoneNumber,
      "phoneNumber",
      a.phoneNumber,
      "null|string|undefined"
    );
    var c =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-finish"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u96fb\u8a71\u756a\u53f7\u306e\u78ba\u8a8d</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
    var d =
      '<a class="firebaseui-link firebaseui-change-phone-number-link firebaseui-id-change-phone-number-link" href="javascript:void(0)">&lrm;' +
      (B(a) +
        "</a> \u306b\u9001\u4fe1\u3055\u308c\u305f 6 \u6841\u306e\u30b3\u30fc\u30c9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044");
    B(a);
    a = c + d;
    c = C(
      '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="phoneConfirmationCode">6 \u6841\u306e\u30b3\u30fc\u30c9</label><input type="number" name="phoneConfirmationCode" class="mdl-textfield__input firebaseui-input firebaseui-id-phone-confirmation-code"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-phone-confirmation-code-error"></p></div>'
    );
    c =
      a +
      ("</p>" +
        c +
        '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        dh(null));
    a = c += Xg({ label: "\u7d9a\u884c" });
    b =
      '</div></div><div class="firebaseui-card-footer">' +
      eh(b) +
      "</div></form>";
    c = C(
      '<div class="firebaseui-resend-container"><span class="firebaseui-id-resend-countdown"></span><a href="javascript:void(0)" class="firebaseui-id-resend-link firebaseui-hidden firebaseui-link">\u518d\u9001\u4fe1</a></div>'
    );
    return C(a + (b + c + "</div>"));
  }
  function Li() {
    return C(
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-out"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a2\u30a6\u30c8</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">\u30ed\u30b0\u30a2\u30a6\u30c8\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002</p></div></div>'
    );
  }
  function Mi(a, b) {
    a = D(
      Array.isArray(a.pf),
      "tenantConfigs",
      a.pf,
      "!Array<{tenantId: (null|string|undefined), fullLabel: (null|string|undefined), displayName: string, buttonColor: string, iconUrl: string,}>"
    );
    for (
      var c =
          '<div class="firebaseui-container firebaseui-page-select-tenant firebaseui-id-page-select-tenant"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-tenant-list">',
        d = a.length,
        e = 0;
      e < d;
      e++
    ) {
      var f = a[e];
      var g = D(
        t(f),
        "tenantConfig",
        f,
        "{tenantId: (null|string|undefined), fullLabel: (null|string|undefined), displayName: string, buttonColor: string, iconUrl: string,}"
      );
      f =
        '<button class="firebaseui-tenant-button mdl-button mdl-js-button mdl-button--raised firebaseui-tenant-selection-' +
        rd(g.tenantId ? "" + g.tenantId : "top-level-project") +
        ' firebaseui-id-tenant-selection-button"' +
        (g.tenantId ? ' data-tenant-id="' + rd(g.tenantId) + '"' : "") +
        ' style="background-color:' +
        rd(Dd(g.Ob)) +
        '"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="' +
        rd(Bd(g.Xb)) +
        '"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">';
      if (g.qa) f += B(g.qa);
      else {
        var h = B(g.displayName) + " \u306b\u30ed\u30b0\u30a4\u30f3";
        f += h;
      }
      f +=
        '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">';
      g = B(g.displayName);
      f = f + g + "</span></button>";
      f = C(f);
      c += '<li class="firebaseui-list-item">' + f + "</li>";
    }
    c +=
      '</ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">' +
      fh(b) +
      "</div></div>";
    return C(c);
  }
  function Ni(a, b) {
    a =
      '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-provider-match-by-email"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">\u30ed\u30b0\u30a4\u30f3</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' +
      (Wg(null) +
        '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
        Xg(null) +
        '</div></div><div class="firebaseui-card-footer">' +
        fh(b) +
        "</div></form></div>");
    return C(a);
  }
  function Oi(a, b) {
    L.call(this, oi, void 0, b, "anonymousUserMismatch");
    this.cc = a;
  }
  p(Oi, L);
  Oi.prototype.j = function () {
    var a = this;
    I(this, this.G(), function () {
      a.cc();
    });
    this.G().focus();
    L.prototype.j.call(this);
  };
  Oi.prototype.g = function () {
    this.cc = null;
    L.prototype.g.call(this);
  };
  v(Oi.prototype, { G: K });
  function Pi(a) {
    L.call(this, ji, void 0, a, "blank");
  }
  p(Pi, L);
  function Qi(a) {
    L.call(this, hi, void 0, a, "callback");
  }
  p(Qi, L);
  Qi.prototype.X = function (a, b, c, d) {
    return a.apply(null, b).then(c, d);
  };
  function Ri(a, b) {
    L.call(this, ni, void 0, b, "differentDeviceError");
    this.cc = a;
  }
  p(Ri, L);
  Ri.prototype.j = function () {
    var a = this;
    I(this, this.G(), function () {
      a.cc();
    });
    this.G().focus();
    L.prototype.j.call(this);
  };
  Ri.prototype.g = function () {
    this.cc = null;
    L.prototype.g.call(this);
  };
  v(Ri.prototype, { G: K });
  function Si(a, b, c, d) {
    L.call(this, xi, { email: a, l: !!c }, d, "emailChangeRevoke");
    this.fc = b;
    this.ba = c || null;
  }
  p(Si, L);
  Si.prototype.j = function () {
    var a = this;
    I(this, Ti(this), function () {
      a.fc();
    });
    this.ba && (this.u(this.ba), this.B().focus());
    L.prototype.j.call(this);
  };
  Si.prototype.g = function () {
    this.fc = this.ba = null;
    L.prototype.g.call(this);
  };
  function Ti(a) {
    return a.s("firebaseui-id-reset-password-link");
  }
  v(Si.prototype, { B: J, G: K, u: Tg });
  function Ui(a, b) {
    try {
      var c = "number" == typeof a.selectionStart;
    } catch (d) {
      c = !1;
    }
    c
      ? ((a.selectionStart = b), (a.selectionEnd = b))
      : A &&
        !gd("9") &&
        ("textarea" == a.type &&
          (b = a.value.substring(0, b).replace(/(\r\n|\r|\n)/g, "\n").length),
        (a = a.createTextRange()),
        a.collapse(!0),
        a.move("character", b),
        a.select());
  }
  function Vi(a, b, c, d, e, f) {
    L.call(this, mi, { email: c }, f, "emailLinkSignInConfirmation", {
      P: d,
      O: e,
    });
    this.Ba = a;
    this.C = b;
  }
  p(Vi, L);
  Vi.prototype.j = function () {
    this.za(this.Ba);
    this.u(this.Ba, this.C);
    this.Ca();
    L.prototype.j.call(this);
  };
  Vi.prototype.g = function () {
    this.C = this.Ba = null;
    L.prototype.g.call(this);
  };
  Vi.prototype.Ca = function () {
    this.v().focus();
    Ui(this.v(), (this.v().value || "").length);
  };
  v(Vi.prototype, {
    v: Og,
    Ya: Pg,
    za: Qg,
    getEmail: Rg,
    oa: Sg,
    B: J,
    G: K,
    u: Tg,
  });
  function Wi(a, b, c, d, e, f) {
    L.call(this, qi, { email: a, F: b }, f, "emailLinkSignInLinking", {
      P: d,
      O: e,
    });
    this.o = c;
  }
  p(Wi, L);
  Wi.prototype.j = function () {
    this.u(this.o);
    this.B().focus();
    L.prototype.j.call(this);
  };
  Wi.prototype.g = function () {
    this.o = null;
    L.prototype.g.call(this);
  };
  v(Wi.prototype, { B: J, u: Tg });
  function Xi(a, b, c, d, e) {
    L.call(this, ri, { F: a }, e, "emailLinkSignInLinkingDifferentDevice", {
      P: c,
      O: d,
    });
    this.ba = b;
  }
  p(Xi, L);
  Xi.prototype.j = function () {
    this.u(this.ba);
    this.B().focus();
    L.prototype.j.call(this);
  };
  Xi.prototype.g = function () {
    this.ba = null;
    L.prototype.g.call(this);
  };
  v(Xi.prototype, { B: J, u: Tg });
  function Yi(a, b, c, d, e, f) {
    L.call(this, ki, { email: a }, f, "emailLinkSignInSent", { P: d, O: e });
    this.bf = b;
    this.C = c;
  }
  p(Yi, L);
  Yi.prototype.j = function () {
    var a = this;
    I(this, this.G(), function () {
      a.C();
    });
    I(this, this.s("firebaseui-id-trouble-getting-email-link"), function () {
      a.bf();
    });
    this.G().focus();
    L.prototype.j.call(this);
  };
  Yi.prototype.g = function () {
    this.C = this.bf = null;
    L.prototype.g.call(this);
  };
  v(Yi.prototype, { G: K });
  function Zi(a, b, c, d, e, f, g) {
    L.call(this, Hi, { zf: a, df: b }, g, "emailMismatch", { P: e, O: f });
    this.ba = c;
    this.C = d;
  }
  p(Zi, L);
  Zi.prototype.j = function () {
    this.u(this.ba, this.C);
    this.B().focus();
    L.prototype.j.call(this);
  };
  Zi.prototype.g = function () {
    this.C = this.o = null;
    L.prototype.g.call(this);
  };
  v(Zi.prototype, { B: J, G: K, u: Tg });
  function $i(a, b, c, d, e) {
    L.call(this, li, void 0, e, "emailNotReceived", { P: c, O: d });
    this.ec = a;
    this.C = b;
  }
  p($i, L);
  $i.prototype.j = function () {
    var a = this;
    I(this, this.G(), function () {
      a.C();
    });
    I(this, this.Cc(), function () {
      a.ec();
    });
    this.G().focus();
    L.prototype.j.call(this);
  };
  $i.prototype.Cc = function () {
    return this.s("firebaseui-id-resend-email-link");
  };
  $i.prototype.g = function () {
    this.C = this.ec = null;
    L.prototype.g.call(this);
  };
  v($i.prototype, { G: K });
  function aj(a, b, c, d, e, f) {
    L.call(this, si, { email: a, F: b }, f, "federatedLinking", { P: d, O: e });
    this.o = c;
  }
  p(aj, L);
  aj.prototype.j = function () {
    this.u(this.o);
    this.B().focus();
    L.prototype.j.call(this);
  };
  aj.prototype.g = function () {
    this.o = null;
    L.prototype.g.call(this);
  };
  v(aj.prototype, { B: J, u: Tg });
  function N(a, b, c, d, e, f) {
    L.call(this, a, b, d, e || "notice", f);
    this.ba = c || null;
  }
  x(N, L);
  N.prototype.j = function () {
    this.ba && (this.u(this.ba), this.B().focus());
    N.Z.j.call(this);
  };
  N.prototype.g = function () {
    this.ba = null;
    N.Z.g.call(this);
  };
  v(N.prototype, { B: J, G: K, u: Tg });
  function bj(a, b, c, d, e) {
    N.call(this, gi, { email: a, l: !!b }, b, e, "passwordRecoveryEmailSent", {
      P: c,
      O: d,
    });
  }
  x(bj, N);
  function cj(a, b) {
    N.call(this, zi, { l: !!a }, a, b, "emailVerificationSuccess");
  }
  x(cj, N);
  function dj(a, b) {
    N.call(this, Ai, { l: !!a }, a, b, "emailVerificationFailure");
  }
  x(dj, N);
  function ej(a, b, c) {
    N.call(this, Bi, { email: a, l: !!b }, b, c, "verifyAndChangeEmailSuccess");
  }
  x(ej, N);
  function fj(a, b) {
    N.call(this, Ci, { l: !!a }, a, b, "verifyAndChangeEmailFailure");
  }
  x(fj, N);
  function gj(a, b) {
    N.call(this, Ei, { l: !!a }, a, b, "revertSecondFactorAdditionFailure");
  }
  x(gj, N);
  function hj(a) {
    N.call(this, Li, void 0, void 0, a, "signOut");
  }
  x(hj, N);
  function ij(a, b) {
    N.call(this, vi, { l: !!a }, a, b, "passwordResetSuccess");
  }
  x(ij, N);
  function jj(a, b) {
    N.call(this, wi, { l: !!a }, a, b, "passwordResetFailure");
  }
  x(jj, N);
  function kj(a, b) {
    N.call(this, yi, { l: !!a }, a, b, "emailChangeRevokeFailure");
  }
  x(kj, N);
  function lj(a, b, c) {
    N.call(this, Fi, { errorMessage: a, jd: !!b }, b, c, "recoverableError");
  }
  x(lj, N);
  function mj(a, b) {
    N.call(this, Gi, { errorMessage: a }, void 0, b, "unrecoverableError");
  }
  x(mj, N);
  function nj(a, b, c, d, e, f) {
    L.call(this, pi, { email: a }, f, "passwordLinking", { P: d, O: e });
    this.o = b;
    this.Qc = c;
  }
  p(nj, L);
  nj.prototype.j = function () {
    this.Hd();
    this.u(this.o, this.Qc);
    bi(this, this.Ia(), this.o);
    this.Ia().focus();
    L.prototype.j.call(this);
  };
  nj.prototype.g = function () {
    this.o = null;
    L.prototype.g.call(this);
  };
  nj.prototype.oa = function () {
    return E(this.s("firebaseui-id-email"));
  };
  v(nj.prototype, { Ia: zh, zd: Ah, Hd: Bh, qd: Ch, B: J, G: K, u: Tg });
  function oj(a, b, c, d, e, f) {
    L.call(this, fi, { email: c, eb: !!b }, f, "passwordRecovery", {
      P: d,
      O: e,
    });
    this.o = a;
    this.C = b;
  }
  p(oj, L);
  oj.prototype.j = function () {
    this.za();
    this.u(this.o, this.C);
    E(this.v()) || this.v().focus();
    bi(this, this.v(), this.o);
    L.prototype.j.call(this);
  };
  oj.prototype.g = function () {
    this.C = this.o = null;
    L.prototype.g.call(this);
  };
  v(oj.prototype, {
    v: Og,
    Ya: Pg,
    za: Qg,
    getEmail: Rg,
    oa: Sg,
    B: J,
    G: K,
    u: Tg,
  });
  function pj(a, b, c) {
    L.call(this, ui, { email: a }, c, "passwordReset");
    this.o = b;
  }
  p(pj, L);
  pj.prototype.j = function () {
    this.Gd();
    this.u(this.o);
    bi(this, this.ya(), this.o);
    this.ya().focus();
    L.prototype.j.call(this);
  };
  pj.prototype.g = function () {
    this.o = null;
    L.prototype.g.call(this);
  };
  v(pj.prototype, {
    ya: th,
    yd: wh,
    yg: uh,
    Gd: xh,
    pd: yh,
    B: J,
    G: K,
    u: Tg,
  });
  function qj(a, b, c, d, e, f, g) {
    L.call(this, di, { email: c, da: !!f }, g, "passwordSignIn", {
      P: d,
      O: e,
    });
    this.o = a;
    this.Qc = b;
  }
  p(qj, L);
  qj.prototype.j = function () {
    this.za();
    this.Hd();
    this.u(this.o, this.Qc);
    ai(this, this.v(), this.Ia());
    bi(this, this.Ia(), this.o);
    E(this.v()) ? this.Ia().focus() : this.v().focus();
    L.prototype.j.call(this);
  };
  qj.prototype.g = function () {
    this.Qc = this.o = null;
    L.prototype.g.call(this);
  };
  v(qj.prototype, {
    v: Og,
    Ya: Pg,
    za: Qg,
    getEmail: Rg,
    oa: Sg,
    Ia: zh,
    zd: Ah,
    Hd: Bh,
    qd: Ch,
    B: J,
    G: K,
    u: Tg,
  });
  function rj(a, b, c, d, e, f, g, h, m) {
    L.call(
      this,
      ei,
      { email: d, Rd: a, name: e, eb: !!c, da: !!h },
      m,
      "passwordSignUp",
      { P: f, O: g }
    );
    this.o = b;
    this.C = c;
    this.Sd = a;
  }
  p(rj, L);
  rj.prototype.j = function () {
    this.za();
    this.Sd && this.Ig();
    this.Gd();
    this.u(this.o, this.C);
    this.Ca();
    L.prototype.j.call(this);
  };
  rj.prototype.g = function () {
    this.C = this.o = null;
    L.prototype.g.call(this);
  };
  rj.prototype.Ca = function () {
    this.Sd
      ? (ai(this, this.v(), this.Tb()), ai(this, this.Tb(), this.ya()))
      : ai(this, this.v(), this.ya());
    this.o && bi(this, this.ya(), this.o);
    E(this.v())
      ? this.Sd && !E(this.Tb())
        ? this.Tb().focus()
        : this.ya().focus()
      : this.v().focus();
  };
  v(rj.prototype, {
    v: Og,
    Ya: Pg,
    za: Qg,
    getEmail: Rg,
    oa: Sg,
    Tb: rh,
    ci: sh,
    Ig: function () {
      var a = rh.call(this),
        b = sh.call(this);
      mg(this, a, function () {
        sg(b) && (H(a, !0), qg(b));
      });
    },
    eg: function () {
      var a = rh.call(this);
      var b = sh.call(this);
      var c = E(a);
      c = !/^[\s\xa0]*$/.test(null == c ? "" : String(c));
      H(a, c);
      c
        ? (qg(b), (b = !0))
        : (rg(
            b,
            "\u30a2\u30ab\u30a6\u30f3\u30c8\u540d\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044".toString()
          ),
          (b = !1));
      return b ? kb(E(a)) : null;
    },
    ya: th,
    yd: wh,
    yg: uh,
    Gd: xh,
    pd: yh,
    B: J,
    G: K,
    u: Tg,
  });
  function sj(a, b, c, d, e, f, g, h, m) {
    L.call(this, Ki, { phoneNumber: e }, m, "phoneSignInFinish", {
      P: g,
      O: h,
    });
    this.hh = f;
    this.qb = new Rf(1e3);
    this.Ud = f;
    this.Ze = a;
    this.o = b;
    this.C = c;
    this.ec = d;
  }
  p(sj, L);
  sj.prototype.j = function () {
    var a = this;
    this.uf(this.hh);
    Ke(this.qb, "tick", this.Dd, !1, this);
    this.qb.start();
    I(this, this.s("firebaseui-id-change-phone-number-link"), function () {
      a.Ze();
    });
    I(this, this.Cc(), function () {
      a.ec();
    });
    this.Jg(this.o);
    this.u(this.o, this.C);
    this.Ca();
    L.prototype.j.call(this);
  };
  sj.prototype.g = function () {
    this.ec = this.C = this.o = this.Ze = null;
    this.qb.stop();
    Te(this.qb, "tick", this.Dd);
    this.qb = null;
    L.prototype.g.call(this);
  };
  sj.prototype.Dd = function () {
    --this.Ud;
    0 < this.Ud
      ? this.uf(this.Ud)
      : (this.qb.stop(), Te(this.qb, "tick", this.Dd), this.Eg(), this.rh());
  };
  sj.prototype.Ca = function () {
    this.Ad().focus();
  };
  v(sj.prototype, {
    Ad: Dh,
    zg: Eh,
    Jg: function (a) {
      var b = Dh.call(this),
        c = Eh.call(this);
      mg(this, b, function () {
        sg(c) && (H(b, !0), qg(c));
      });
      a &&
        ng(this, b, function () {
          a();
        });
    },
    fg: function () {
      var a = kb(E(Dh.call(this)) || "");
      return /^\d{6}$/.test(a) ? a : null;
    },
    Cg: Rh,
    uf: function (a) {
      var b = Rh.call(this);
      a = (9 < a ? "0:" : "0:0") + a;
      a =
        "" +
        D("string" === typeof a, "timeRemaining", a, "string") +
        " \u5f8c\u306b\u30b3\u30fc\u30c9\u3092\u518d\u9001\u4fe1";
      le(b, a.toString());
    },
    Eg: function () {
      qg(this.Cg());
    },
    Cc: function () {
      return this.s("firebaseui-id-resend-link");
    },
    rh: function () {
      rg(this.Cc());
    },
    B: J,
    G: K,
    u: Tg,
  });
  function tj(a, b, c, d, e, f, g, h, m, n) {
    L.call(
      this,
      Ji,
      { ud: b, Ma: m || null, hb: !!c, da: !!f },
      n,
      "phoneSignInStart",
      { P: d, O: e }
    );
    this.jg = h || null;
    this.rg = b;
    this.o = a;
    this.C = c || null;
    this.Sg = g || null;
  }
  p(tj, L);
  tj.prototype.j = function () {
    this.Kg(this.Sg, this.jg);
    this.u(this.o, this.C || void 0);
    this.Ca();
    L.prototype.j.call(this);
  };
  tj.prototype.g = function () {
    this.C = this.o = null;
    L.prototype.g.call(this);
  };
  tj.prototype.Ca = function () {
    this.rg || ai(this, this.jb(), this.B());
    bi(this, this.B(), this.o);
    this.jb().focus();
    Ui(this.jb(), (this.jb().value || "").length);
  };
  v(tj.prototype, {
    xg: zg,
    jb: Ih,
    He: Kh,
    Kg: function (a, b, c) {
      var d = this,
        e = Ih.call(this),
        f = Jh.call(this),
        g = Kh.call(this),
        h = a || Rd,
        m = h.Qa;
      if (0 == m.length) throw Error("No available countries provided.");
      Lh.call(d, h, b);
      I(this, f, function () {
        Qh.call(d, h);
      });
      mg(this, e, function () {
        sg(g) && (H(e, !0), qg(g));
        var n = kb(E(e) || ""),
          l = Md(this.jc),
          r = h.search(n);
        n = Mh("1-US-0", m);
        r.length &&
          r[0].a != l.a &&
          ((l = r[0]), Nh.call(d, "1" == l.a && n ? "1-US-0" : l.b, h));
      });
      c &&
        ng(this, e, function () {
          c();
        });
    },
    Ag: function (a) {
      var b = kb(E(Ih.call(this)) || "");
      a = a || Rd;
      var c = a.Qa,
        d = Rd.search(b);
      if (d.length && !La(c, d[0]))
        throw (
          (pe(Ih.call(this)),
          Ih.call(this).focus(),
          rg(
            Kh.call(this),
            "\u6307\u5b9a\u3057\u305f\u56fd\u30b3\u30fc\u30c9\u306f\u30b5\u30dd\u30fc\u30c8\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002".toString()
          ),
          Error("The country code provided is not supported."))
        );
      c = Md(this.jc);
      d.length && d[0].a != c.a && Nh.call(this, d[0].b, a);
      d.length && (b = b.substr(d[0].a.length + 1));
      return b ? new Fh(this.jc, b) : null;
    },
    $h: Jh,
    Bg: function () {
      return this.s("firebaseui-recaptcha-container");
    },
    Bd: function () {
      return this.s("firebaseui-id-recaptcha-error");
    },
    B: J,
    G: K,
    u: Tg,
  });
  function uj(a, b, c, d) {
    L.call(this, Ni, void 0, d, "providerMatchByEmail", { P: b, O: c });
    this.Ba = a;
  }
  p(uj, L);
  uj.prototype.j = function () {
    this.za(this.Ba);
    this.u(this.Ba);
    this.Ca();
    L.prototype.j.call(this);
  };
  uj.prototype.g = function () {
    this.Ba = null;
    L.prototype.g.call(this);
  };
  uj.prototype.Ca = function () {
    this.v().focus();
    Ui(this.v(), (this.v().value || "").length);
  };
  v(uj.prototype, { v: Og, Ya: Pg, za: Qg, getEmail: Rg, oa: Sg, B: J, u: Tg });
  function vj(a, b, c, d, e) {
    L.call(this, Ii, { ff: b }, e, "providerSignIn", { P: c, O: d });
    this.$e = a;
  }
  p(vj, L);
  vj.prototype.j = function () {
    this.Hg(this.$e);
    L.prototype.j.call(this);
  };
  vj.prototype.g = function () {
    this.$e = null;
    L.prototype.g.call(this);
  };
  v(vj.prototype, {
    Hg: function (a) {
      function b(g) {
        a(g);
      }
      for (
        var c = this.Bc("firebaseui-id-idp-button"), d = 0;
        d < c.length;
        d++
      ) {
        var e = c[d],
          f = Vg(e, "providerId");
        I(this, e, za(b, f));
      }
    },
  });
  function wj(a, b, c, d, e) {
    L.call(
      this,
      Di,
      { factorId: a, phoneNumber: c || null, l: !!d },
      e,
      "revertSecondFactorAdditionSuccess"
    );
    this.fc = b;
    this.ba = d || null;
  }
  p(wj, L);
  wj.prototype.j = function () {
    var a = this;
    I(this, Ti(this), function () {
      a.fc();
    });
    this.ba && (this.u(this.ba), this.B().focus());
    L.prototype.j.call(this);
  };
  wj.prototype.g = function () {
    this.fc = this.ba = null;
    L.prototype.g.call(this);
  };
  v(wj.prototype, { B: J, G: K, u: Tg });
  function xj(a, b, c, d, e) {
    L.call(this, Mi, { pf: b }, e, "selectTenant", { P: c, O: d });
    this.af = a;
  }
  p(xj, L);
  xj.prototype.j = function () {
    yj(this, this.af);
    L.prototype.j.call(this);
  };
  xj.prototype.g = function () {
    this.af = null;
    L.prototype.g.call(this);
  };
  function yj(a, b) {
    function c(h) {
      b(h);
    }
    for (
      var d = a.Bc("firebaseui-id-tenant-selection-button"), e = 0;
      e < d.length;
      e++
    ) {
      var f = d[e],
        g = Vg(f, "tenantId");
      I(a, f, za(c, g));
    }
  }
  function zj(a, b, c, d, e, f, g) {
    L.call(this, ci, { email: c, hb: !!b, da: !!f }, g, "signIn", {
      P: d,
      O: e,
    });
    this.Ba = a;
    this.C = b;
  }
  p(zj, L);
  zj.prototype.j = function () {
    this.za(this.Ba);
    this.u(this.Ba, this.C || void 0);
    this.Ca();
    L.prototype.j.call(this);
  };
  zj.prototype.g = function () {
    this.C = this.Ba = null;
    L.prototype.g.call(this);
  };
  zj.prototype.Ca = function () {
    this.v().focus();
    Ui(this.v(), (this.v().value || "").length);
  };
  v(zj.prototype, {
    v: Og,
    Ya: Pg,
    za: Qg,
    getEmail: Rg,
    oa: Sg,
    B: J,
    G: K,
    u: Tg,
  });
  function Aj(a) {
    L.call(this, ii, void 0, a, "spinner");
  }
  p(Aj, L);
  function Bj(a, b, c, d, e, f) {
    L.call(this, ti, { email: a }, f, "unsupportedProvider", { P: d, O: e });
    this.o = b;
    this.C = c;
  }
  p(Bj, L);
  Bj.prototype.j = function () {
    this.u(this.o, this.C);
    this.B().focus();
    L.prototype.j.call(this);
  };
  Bj.prototype.g = function () {
    this.C = this.o = null;
    L.prototype.g.call(this);
  };
  v(Bj.prototype, { B: J, G: K, u: Tg });
  function Cj(a) {
    this.V = Fc(a);
  }
  function Dj(a, b) {
    b ? Ec(a.V, P.fd, b) : a.V.removeParameter(P.fd);
  }
  Cj.prototype.Yd = function (a) {
    a ? Ec(this.V, P.gd, a) : this.V.removeParameter(P.gd);
  };
  Cj.prototype.Ub = function () {
    return this.V.U.get(P.gd) || null;
  };
  function Ej(a, b) {
    null !== b ? Ec(a.V, P.dd, b ? "1" : "0") : a.V.removeParameter(P.dd);
  }
  function Fj(a) {
    return a.V.U.get(P.cd) || null;
  }
  function Gj(a, b) {
    b ? Ec(a.V, P.PROVIDER_ID, b) : a.V.removeParameter(P.PROVIDER_ID);
  }
  Cj.prototype.toString = function () {
    return this.V.toString();
  };
  var P = {
    cd: "ui_auid",
    Mh: "apiKey",
    dd: "ui_sd",
    Nf: "mode",
    ie: "oobCode",
    PROVIDER_ID: "ui_pid",
    fd: "ui_sid",
    gd: "tenantId",
  };
  function Hj() {
    this.Ka = {};
  }
  Hj.prototype.define = function (a, b) {
    if (a.toLowerCase() in this.Ka)
      throw Error("Configuration " + a + " has already been defined.");
    this.Ka[a.toLowerCase()] = b;
  };
  Hj.prototype.update = function (a, b) {
    if (!(a.toLowerCase() in this.Ka))
      throw Error("Configuration " + a + " is not defined.");
    this.Ka[a.toLowerCase()] = b;
  };
  Hj.prototype.get = function (a) {
    if (!(a.toLowerCase() in this.Ka))
      throw Error("Configuration " + a + " is not defined.");
    return this.Ka[a.toLowerCase()];
  };
  function Ij(a, b) {
    a = a.get(b);
    if (!a) throw Error("Configuration " + b + " is required.");
    return a;
  }
  function Jj() {
    this.ea = ("undefined" == typeof document ? null : document) || {
      cookie: "",
    };
  }
  k = Jj.prototype;
  k.isEnabled = function () {
    return navigator.cookieEnabled;
  };
  k.set = function (a, b, c) {
    var d = !1;
    if ("object" === typeof c) {
      var e = c.fi;
      d = c.jh || !1;
      var f = c.domain || void 0;
      var g = c.path || void 0;
      var h = c.Xe;
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    this.ea.cookie =
      a +
      "=" +
      b +
      (f ? ";domain=" + f : "") +
      (g ? ";path=" + g : "") +
      (0 > h
        ? ""
        : 0 == h
        ? ";expires=" + new Date(1970, 1, 1).toUTCString()
        : ";expires=" + new Date(Date.now() + 1e3 * h).toUTCString()) +
      (d ? ";secure" : "") +
      (null != e ? ";samesite=" + e : "");
  };
  k.get = function (a, b) {
    for (
      var c = a + "=", d = (this.ea.cookie || "").split(";"), e = 0, f;
      e < d.length;
      e++
    ) {
      f = kb(d[e]);
      if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
      if (f == a) return "";
    }
    return b;
  };
  k.remove = function (a, b, c) {
    var d = this.Wa(a);
    this.set(a, "", { Xe: 0, path: b, domain: c });
    return d;
  };
  k.Ha = function () {
    return Kj(this).keys;
  };
  k.ra = function () {
    return Kj(this).values;
  };
  k.Zb = function () {
    return !this.ea.cookie;
  };
  k.Wa = function (a) {
    return void 0 !== this.get(a);
  };
  k.clear = function () {
    for (var a = Kj(this).keys, b = a.length - 1; 0 <= b; b--)
      this.remove(a[b]);
  };
  function Kj(a) {
    a = (a.ea.cookie || "").split(";");
    for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
      (e = kb(a[f])),
        (d = e.indexOf("=")),
        -1 == d
          ? (b.push(""), c.push(e))
          : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    return { keys: b, values: c };
  }
  var Lj = new Jj();
  function Mj() {}
  function Nj(a, b, c, d) {
    this.Tg = "undefined" !== typeof a && null !== a ? a : -1;
    this.ma = b || null;
    this.pa = c || null;
    this.kh = !!d;
  }
  p(Nj, Mj);
  Nj.prototype.set = function (a, b) {
    Lj.set(a, b, { Xe: this.Tg, path: this.ma, domain: this.pa, jh: this.kh });
  };
  Nj.prototype.get = function (a) {
    return Lj.get(a) || null;
  };
  Nj.prototype.remove = function (a) {
    Lj.remove(a, this.ma, this.pa);
  };
  function Oj(a) {
    this.$b = a;
    this.ha = this.$b.length / 4;
    this.nb = this.ha + 6;
    this.J = [[], [], [], []];
    this.Jb = [[], [], [], []];
    this.ga = Array(Pj * (this.nb + 1));
    for (a = 0; a < this.ha; a++)
      this.ga[a] = [
        this.$b[4 * a],
        this.$b[4 * a + 1],
        this.$b[4 * a + 2],
        this.$b[4 * a + 3],
      ];
    var b = Array(4);
    for (a = this.ha; a < Pj * (this.nb + 1); a++) {
      b[0] = this.ga[a - 1][0];
      b[1] = this.ga[a - 1][1];
      b[2] = this.ga[a - 1][2];
      b[3] = this.ga[a - 1][3];
      if (0 == a % this.ha) {
        var c = b,
          d = c[0];
        c[0] = c[1];
        c[1] = c[2];
        c[2] = c[3];
        c[3] = d;
        Qj(b);
        b[0] ^= Rj[a / this.ha][0];
        b[1] ^= Rj[a / this.ha][1];
        b[2] ^= Rj[a / this.ha][2];
        b[3] ^= Rj[a / this.ha][3];
      } else 6 < this.ha && 4 == a % this.ha && Qj(b);
      this.ga[a] = Array(4);
      this.ga[a][0] = this.ga[a - this.ha][0] ^ b[0];
      this.ga[a][1] = this.ga[a - this.ha][1] ^ b[1];
      this.ga[a][2] = this.ga[a - this.ha][2] ^ b[2];
      this.ga[a][3] = this.ga[a - this.ha][3] ^ b[3];
    }
  }
  Oj.prototype.Df = 16;
  var Pj = Oj.prototype.Df / 4;
  Oj.prototype.encrypt = function (a) {
    Sj(this, a);
    Tj(this, 0);
    for (a = 1; a < this.nb; ++a) {
      Uj(this, Vj);
      Wj(this);
      for (var b = this.J, c = this.Jb[0], d = 0; 4 > d; d++)
        (c[0] = b[0][d]),
          (c[1] = b[1][d]),
          (c[2] = b[2][d]),
          (c[3] = b[3][d]),
          (b[0][d] = Xj[c[0]] ^ Yj[c[1]] ^ c[2] ^ c[3]),
          (b[1][d] = c[0] ^ Xj[c[1]] ^ Yj[c[2]] ^ c[3]),
          (b[2][d] = c[0] ^ c[1] ^ Xj[c[2]] ^ Yj[c[3]]),
          (b[3][d] = Yj[c[0]] ^ c[1] ^ c[2] ^ Xj[c[3]]);
      Tj(this, a);
    }
    Uj(this, Vj);
    Wj(this);
    Tj(this, this.nb);
    return Zj(this);
  };
  Oj.prototype.decrypt = function (a) {
    Sj(this, a);
    Tj(this, this.nb);
    for (a = 1; a < this.nb; ++a) {
      ak(this);
      Uj(this, bk);
      Tj(this, this.nb - a);
      for (var b = this.J, c = this.Jb[0], d = 0; 4 > d; d++)
        (c[0] = b[0][d]),
          (c[1] = b[1][d]),
          (c[2] = b[2][d]),
          (c[3] = b[3][d]),
          (b[0][d] = ck[c[0]] ^ dk[c[1]] ^ ek[c[2]] ^ fk[c[3]]),
          (b[1][d] = fk[c[0]] ^ ck[c[1]] ^ dk[c[2]] ^ ek[c[3]]),
          (b[2][d] = ek[c[0]] ^ fk[c[1]] ^ ck[c[2]] ^ dk[c[3]]),
          (b[3][d] = dk[c[0]] ^ ek[c[1]] ^ fk[c[2]] ^ ck[c[3]]);
    }
    ak(this);
    Uj(this, bk);
    Tj(this, 0);
    return Zj(this);
  };
  function Sj(a, b) {
    for (var c, d = 0; d < Pj; d++)
      for (var e = 0; 4 > e; e++) (c = 4 * e + d), (c = b[c]), (a.J[d][e] = c);
  }
  function Zj(a) {
    for (var b = [], c = 0; c < Pj; c++)
      for (var d = 0; 4 > d; d++) b[4 * d + c] = a.J[c][d];
    return b;
  }
  function Tj(a, b) {
    for (var c = 0; 4 > c; c++)
      for (var d = 0; 4 > d; d++) a.J[c][d] ^= a.ga[4 * b + d][c];
  }
  function Uj(a, b) {
    for (var c = 0; 4 > c; c++)
      for (var d = 0; 4 > d; d++) a.J[c][d] = b[a.J[c][d]];
  }
  function Wj(a) {
    for (var b = 1; 4 > b; b++)
      for (var c = 0; 4 > c; c++) a.Jb[b][c] = a.J[b][c];
    for (b = 1; 4 > b; b++)
      for (c = 0; 4 > c; c++) a.J[b][c] = a.Jb[b][(c + b) % Pj];
  }
  function ak(a) {
    for (var b = 1; 4 > b; b++)
      for (var c = 0; 4 > c; c++) a.Jb[b][(c + b) % Pj] = a.J[b][c];
    for (b = 1; 4 > b; b++) for (c = 0; 4 > c; c++) a.J[b][c] = a.Jb[b][c];
  }
  function Qj(a) {
    a[0] = Vj[a[0]];
    a[1] = Vj[a[1]];
    a[2] = Vj[a[2]];
    a[3] = Vj[a[3]];
  }
  var Vj = [
      99,
      124,
      119,
      123,
      242,
      107,
      111,
      197,
      48,
      1,
      103,
      43,
      254,
      215,
      171,
      118,
      202,
      130,
      201,
      125,
      250,
      89,
      71,
      240,
      173,
      212,
      162,
      175,
      156,
      164,
      114,
      192,
      183,
      253,
      147,
      38,
      54,
      63,
      247,
      204,
      52,
      165,
      229,
      241,
      113,
      216,
      49,
      21,
      4,
      199,
      35,
      195,
      24,
      150,
      5,
      154,
      7,
      18,
      128,
      226,
      235,
      39,
      178,
      117,
      9,
      131,
      44,
      26,
      27,
      110,
      90,
      160,
      82,
      59,
      214,
      179,
      41,
      227,
      47,
      132,
      83,
      209,
      0,
      237,
      32,
      252,
      177,
      91,
      106,
      203,
      190,
      57,
      74,
      76,
      88,
      207,
      208,
      239,
      170,
      251,
      67,
      77,
      51,
      133,
      69,
      249,
      2,
      127,
      80,
      60,
      159,
      168,
      81,
      163,
      64,
      143,
      146,
      157,
      56,
      245,
      188,
      182,
      218,
      33,
      16,
      255,
      243,
      210,
      205,
      12,
      19,
      236,
      95,
      151,
      68,
      23,
      196,
      167,
      126,
      61,
      100,
      93,
      25,
      115,
      96,
      129,
      79,
      220,
      34,
      42,
      144,
      136,
      70,
      238,
      184,
      20,
      222,
      94,
      11,
      219,
      224,
      50,
      58,
      10,
      73,
      6,
      36,
      92,
      194,
      211,
      172,
      98,
      145,
      149,
      228,
      121,
      231,
      200,
      55,
      109,
      141,
      213,
      78,
      169,
      108,
      86,
      244,
      234,
      101,
      122,
      174,
      8,
      186,
      120,
      37,
      46,
      28,
      166,
      180,
      198,
      232,
      221,
      116,
      31,
      75,
      189,
      139,
      138,
      112,
      62,
      181,
      102,
      72,
      3,
      246,
      14,
      97,
      53,
      87,
      185,
      134,
      193,
      29,
      158,
      225,
      248,
      152,
      17,
      105,
      217,
      142,
      148,
      155,
      30,
      135,
      233,
      206,
      85,
      40,
      223,
      140,
      161,
      137,
      13,
      191,
      230,
      66,
      104,
      65,
      153,
      45,
      15,
      176,
      84,
      187,
      22,
    ],
    bk = [
      82,
      9,
      106,
      213,
      48,
      54,
      165,
      56,
      191,
      64,
      163,
      158,
      129,
      243,
      215,
      251,
      124,
      227,
      57,
      130,
      155,
      47,
      255,
      135,
      52,
      142,
      67,
      68,
      196,
      222,
      233,
      203,
      84,
      123,
      148,
      50,
      166,
      194,
      35,
      61,
      238,
      76,
      149,
      11,
      66,
      250,
      195,
      78,
      8,
      46,
      161,
      102,
      40,
      217,
      36,
      178,
      118,
      91,
      162,
      73,
      109,
      139,
      209,
      37,
      114,
      248,
      246,
      100,
      134,
      104,
      152,
      22,
      212,
      164,
      92,
      204,
      93,
      101,
      182,
      146,
      108,
      112,
      72,
      80,
      253,
      237,
      185,
      218,
      94,
      21,
      70,
      87,
      167,
      141,
      157,
      132,
      144,
      216,
      171,
      0,
      140,
      188,
      211,
      10,
      247,
      228,
      88,
      5,
      184,
      179,
      69,
      6,
      208,
      44,
      30,
      143,
      202,
      63,
      15,
      2,
      193,
      175,
      189,
      3,
      1,
      19,
      138,
      107,
      58,
      145,
      17,
      65,
      79,
      103,
      220,
      234,
      151,
      242,
      207,
      206,
      240,
      180,
      230,
      115,
      150,
      172,
      116,
      34,
      231,
      173,
      53,
      133,
      226,
      249,
      55,
      232,
      28,
      117,
      223,
      110,
      71,
      241,
      26,
      113,
      29,
      41,
      197,
      137,
      111,
      183,
      98,
      14,
      170,
      24,
      190,
      27,
      252,
      86,
      62,
      75,
      198,
      210,
      121,
      32,
      154,
      219,
      192,
      254,
      120,
      205,
      90,
      244,
      31,
      221,
      168,
      51,
      136,
      7,
      199,
      49,
      177,
      18,
      16,
      89,
      39,
      128,
      236,
      95,
      96,
      81,
      127,
      169,
      25,
      181,
      74,
      13,
      45,
      229,
      122,
      159,
      147,
      201,
      156,
      239,
      160,
      224,
      59,
      77,
      174,
      42,
      245,
      176,
      200,
      235,
      187,
      60,
      131,
      83,
      153,
      97,
      23,
      43,
      4,
      126,
      186,
      119,
      214,
      38,
      225,
      105,
      20,
      99,
      85,
      33,
      12,
      125,
    ],
    Rj = [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [8, 0, 0, 0],
      [16, 0, 0, 0],
      [32, 0, 0, 0],
      [64, 0, 0, 0],
      [128, 0, 0, 0],
      [27, 0, 0, 0],
      [54, 0, 0, 0],
    ],
    Xj = [
      0,
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18,
      20,
      22,
      24,
      26,
      28,
      30,
      32,
      34,
      36,
      38,
      40,
      42,
      44,
      46,
      48,
      50,
      52,
      54,
      56,
      58,
      60,
      62,
      64,
      66,
      68,
      70,
      72,
      74,
      76,
      78,
      80,
      82,
      84,
      86,
      88,
      90,
      92,
      94,
      96,
      98,
      100,
      102,
      104,
      106,
      108,
      110,
      112,
      114,
      116,
      118,
      120,
      122,
      124,
      126,
      128,
      130,
      132,
      134,
      136,
      138,
      140,
      142,
      144,
      146,
      148,
      150,
      152,
      154,
      156,
      158,
      160,
      162,
      164,
      166,
      168,
      170,
      172,
      174,
      176,
      178,
      180,
      182,
      184,
      186,
      188,
      190,
      192,
      194,
      196,
      198,
      200,
      202,
      204,
      206,
      208,
      210,
      212,
      214,
      216,
      218,
      220,
      222,
      224,
      226,
      228,
      230,
      232,
      234,
      236,
      238,
      240,
      242,
      244,
      246,
      248,
      250,
      252,
      254,
      27,
      25,
      31,
      29,
      19,
      17,
      23,
      21,
      11,
      9,
      15,
      13,
      3,
      1,
      7,
      5,
      59,
      57,
      63,
      61,
      51,
      49,
      55,
      53,
      43,
      41,
      47,
      45,
      35,
      33,
      39,
      37,
      91,
      89,
      95,
      93,
      83,
      81,
      87,
      85,
      75,
      73,
      79,
      77,
      67,
      65,
      71,
      69,
      123,
      121,
      127,
      125,
      115,
      113,
      119,
      117,
      107,
      105,
      111,
      109,
      99,
      97,
      103,
      101,
      155,
      153,
      159,
      157,
      147,
      145,
      151,
      149,
      139,
      137,
      143,
      141,
      131,
      129,
      135,
      133,
      187,
      185,
      191,
      189,
      179,
      177,
      183,
      181,
      171,
      169,
      175,
      173,
      163,
      161,
      167,
      165,
      219,
      217,
      223,
      221,
      211,
      209,
      215,
      213,
      203,
      201,
      207,
      205,
      195,
      193,
      199,
      197,
      251,
      249,
      255,
      253,
      243,
      241,
      247,
      245,
      235,
      233,
      239,
      237,
      227,
      225,
      231,
      229,
    ],
    Yj = [
      0,
      3,
      6,
      5,
      12,
      15,
      10,
      9,
      24,
      27,
      30,
      29,
      20,
      23,
      18,
      17,
      48,
      51,
      54,
      53,
      60,
      63,
      58,
      57,
      40,
      43,
      46,
      45,
      36,
      39,
      34,
      33,
      96,
      99,
      102,
      101,
      108,
      111,
      106,
      105,
      120,
      123,
      126,
      125,
      116,
      119,
      114,
      113,
      80,
      83,
      86,
      85,
      92,
      95,
      90,
      89,
      72,
      75,
      78,
      77,
      68,
      71,
      66,
      65,
      192,
      195,
      198,
      197,
      204,
      207,
      202,
      201,
      216,
      219,
      222,
      221,
      212,
      215,
      210,
      209,
      240,
      243,
      246,
      245,
      252,
      255,
      250,
      249,
      232,
      235,
      238,
      237,
      228,
      231,
      226,
      225,
      160,
      163,
      166,
      165,
      172,
      175,
      170,
      169,
      184,
      187,
      190,
      189,
      180,
      183,
      178,
      177,
      144,
      147,
      150,
      149,
      156,
      159,
      154,
      153,
      136,
      139,
      142,
      141,
      132,
      135,
      130,
      129,
      155,
      152,
      157,
      158,
      151,
      148,
      145,
      146,
      131,
      128,
      133,
      134,
      143,
      140,
      137,
      138,
      171,
      168,
      173,
      174,
      167,
      164,
      161,
      162,
      179,
      176,
      181,
      182,
      191,
      188,
      185,
      186,
      251,
      248,
      253,
      254,
      247,
      244,
      241,
      242,
      227,
      224,
      229,
      230,
      239,
      236,
      233,
      234,
      203,
      200,
      205,
      206,
      199,
      196,
      193,
      194,
      211,
      208,
      213,
      214,
      223,
      220,
      217,
      218,
      91,
      88,
      93,
      94,
      87,
      84,
      81,
      82,
      67,
      64,
      69,
      70,
      79,
      76,
      73,
      74,
      107,
      104,
      109,
      110,
      103,
      100,
      97,
      98,
      115,
      112,
      117,
      118,
      127,
      124,
      121,
      122,
      59,
      56,
      61,
      62,
      55,
      52,
      49,
      50,
      35,
      32,
      37,
      38,
      47,
      44,
      41,
      42,
      11,
      8,
      13,
      14,
      7,
      4,
      1,
      2,
      19,
      16,
      21,
      22,
      31,
      28,
      25,
      26,
    ],
    fk = [
      0,
      9,
      18,
      27,
      36,
      45,
      54,
      63,
      72,
      65,
      90,
      83,
      108,
      101,
      126,
      119,
      144,
      153,
      130,
      139,
      180,
      189,
      166,
      175,
      216,
      209,
      202,
      195,
      252,
      245,
      238,
      231,
      59,
      50,
      41,
      32,
      31,
      22,
      13,
      4,
      115,
      122,
      97,
      104,
      87,
      94,
      69,
      76,
      171,
      162,
      185,
      176,
      143,
      134,
      157,
      148,
      227,
      234,
      241,
      248,
      199,
      206,
      213,
      220,
      118,
      127,
      100,
      109,
      82,
      91,
      64,
      73,
      62,
      55,
      44,
      37,
      26,
      19,
      8,
      1,
      230,
      239,
      244,
      253,
      194,
      203,
      208,
      217,
      174,
      167,
      188,
      181,
      138,
      131,
      152,
      145,
      77,
      68,
      95,
      86,
      105,
      96,
      123,
      114,
      5,
      12,
      23,
      30,
      33,
      40,
      51,
      58,
      221,
      212,
      207,
      198,
      249,
      240,
      235,
      226,
      149,
      156,
      135,
      142,
      177,
      184,
      163,
      170,
      236,
      229,
      254,
      247,
      200,
      193,
      218,
      211,
      164,
      173,
      182,
      191,
      128,
      137,
      146,
      155,
      124,
      117,
      110,
      103,
      88,
      81,
      74,
      67,
      52,
      61,
      38,
      47,
      16,
      25,
      2,
      11,
      215,
      222,
      197,
      204,
      243,
      250,
      225,
      232,
      159,
      150,
      141,
      132,
      187,
      178,
      169,
      160,
      71,
      78,
      85,
      92,
      99,
      106,
      113,
      120,
      15,
      6,
      29,
      20,
      43,
      34,
      57,
      48,
      154,
      147,
      136,
      129,
      190,
      183,
      172,
      165,
      210,
      219,
      192,
      201,
      246,
      255,
      228,
      237,
      10,
      3,
      24,
      17,
      46,
      39,
      60,
      53,
      66,
      75,
      80,
      89,
      102,
      111,
      116,
      125,
      161,
      168,
      179,
      186,
      133,
      140,
      151,
      158,
      233,
      224,
      251,
      242,
      205,
      196,
      223,
      214,
      49,
      56,
      35,
      42,
      21,
      28,
      7,
      14,
      121,
      112,
      107,
      98,
      93,
      84,
      79,
      70,
    ],
    dk = [
      0,
      11,
      22,
      29,
      44,
      39,
      58,
      49,
      88,
      83,
      78,
      69,
      116,
      127,
      98,
      105,
      176,
      187,
      166,
      173,
      156,
      151,
      138,
      129,
      232,
      227,
      254,
      245,
      196,
      207,
      210,
      217,
      123,
      112,
      109,
      102,
      87,
      92,
      65,
      74,
      35,
      40,
      53,
      62,
      15,
      4,
      25,
      18,
      203,
      192,
      221,
      214,
      231,
      236,
      241,
      250,
      147,
      152,
      133,
      142,
      191,
      180,
      169,
      162,
      246,
      253,
      224,
      235,
      218,
      209,
      204,
      199,
      174,
      165,
      184,
      179,
      130,
      137,
      148,
      159,
      70,
      77,
      80,
      91,
      106,
      97,
      124,
      119,
      30,
      21,
      8,
      3,
      50,
      57,
      36,
      47,
      141,
      134,
      155,
      144,
      161,
      170,
      183,
      188,
      213,
      222,
      195,
      200,
      249,
      242,
      239,
      228,
      61,
      54,
      43,
      32,
      17,
      26,
      7,
      12,
      101,
      110,
      115,
      120,
      73,
      66,
      95,
      84,
      247,
      252,
      225,
      234,
      219,
      208,
      205,
      198,
      175,
      164,
      185,
      178,
      131,
      136,
      149,
      158,
      71,
      76,
      81,
      90,
      107,
      96,
      125,
      118,
      31,
      20,
      9,
      2,
      51,
      56,
      37,
      46,
      140,
      135,
      154,
      145,
      160,
      171,
      182,
      189,
      212,
      223,
      194,
      201,
      248,
      243,
      238,
      229,
      60,
      55,
      42,
      33,
      16,
      27,
      6,
      13,
      100,
      111,
      114,
      121,
      72,
      67,
      94,
      85,
      1,
      10,
      23,
      28,
      45,
      38,
      59,
      48,
      89,
      82,
      79,
      68,
      117,
      126,
      99,
      104,
      177,
      186,
      167,
      172,
      157,
      150,
      139,
      128,
      233,
      226,
      255,
      244,
      197,
      206,
      211,
      216,
      122,
      113,
      108,
      103,
      86,
      93,
      64,
      75,
      34,
      41,
      52,
      63,
      14,
      5,
      24,
      19,
      202,
      193,
      220,
      215,
      230,
      237,
      240,
      251,
      146,
      153,
      132,
      143,
      190,
      181,
      168,
      163,
    ],
    ek = [
      0,
      13,
      26,
      23,
      52,
      57,
      46,
      35,
      104,
      101,
      114,
      127,
      92,
      81,
      70,
      75,
      208,
      221,
      202,
      199,
      228,
      233,
      254,
      243,
      184,
      181,
      162,
      175,
      140,
      129,
      150,
      155,
      187,
      182,
      161,
      172,
      143,
      130,
      149,
      152,
      211,
      222,
      201,
      196,
      231,
      234,
      253,
      240,
      107,
      102,
      113,
      124,
      95,
      82,
      69,
      72,
      3,
      14,
      25,
      20,
      55,
      58,
      45,
      32,
      109,
      96,
      119,
      122,
      89,
      84,
      67,
      78,
      5,
      8,
      31,
      18,
      49,
      60,
      43,
      38,
      189,
      176,
      167,
      170,
      137,
      132,
      147,
      158,
      213,
      216,
      207,
      194,
      225,
      236,
      251,
      246,
      214,
      219,
      204,
      193,
      226,
      239,
      248,
      245,
      190,
      179,
      164,
      169,
      138,
      135,
      144,
      157,
      6,
      11,
      28,
      17,
      50,
      63,
      40,
      37,
      110,
      99,
      116,
      121,
      90,
      87,
      64,
      77,
      218,
      215,
      192,
      205,
      238,
      227,
      244,
      249,
      178,
      191,
      168,
      165,
      134,
      139,
      156,
      145,
      10,
      7,
      16,
      29,
      62,
      51,
      36,
      41,
      98,
      111,
      120,
      117,
      86,
      91,
      76,
      65,
      97,
      108,
      123,
      118,
      85,
      88,
      79,
      66,
      9,
      4,
      19,
      30,
      61,
      48,
      39,
      42,
      177,
      188,
      171,
      166,
      133,
      136,
      159,
      146,
      217,
      212,
      195,
      206,
      237,
      224,
      247,
      250,
      183,
      186,
      173,
      160,
      131,
      142,
      153,
      148,
      223,
      210,
      197,
      200,
      235,
      230,
      241,
      252,
      103,
      106,
      125,
      112,
      83,
      94,
      73,
      68,
      15,
      2,
      21,
      24,
      59,
      54,
      33,
      44,
      12,
      1,
      22,
      27,
      56,
      53,
      34,
      47,
      100,
      105,
      126,
      115,
      80,
      93,
      74,
      71,
      220,
      209,
      198,
      203,
      232,
      229,
      242,
      255,
      180,
      185,
      174,
      163,
      128,
      141,
      154,
      151,
    ],
    ck = [
      0,
      14,
      28,
      18,
      56,
      54,
      36,
      42,
      112,
      126,
      108,
      98,
      72,
      70,
      84,
      90,
      224,
      238,
      252,
      242,
      216,
      214,
      196,
      202,
      144,
      158,
      140,
      130,
      168,
      166,
      180,
      186,
      219,
      213,
      199,
      201,
      227,
      237,
      255,
      241,
      171,
      165,
      183,
      185,
      147,
      157,
      143,
      129,
      59,
      53,
      39,
      41,
      3,
      13,
      31,
      17,
      75,
      69,
      87,
      89,
      115,
      125,
      111,
      97,
      173,
      163,
      177,
      191,
      149,
      155,
      137,
      135,
      221,
      211,
      193,
      207,
      229,
      235,
      249,
      247,
      77,
      67,
      81,
      95,
      117,
      123,
      105,
      103,
      61,
      51,
      33,
      47,
      5,
      11,
      25,
      23,
      118,
      120,
      106,
      100,
      78,
      64,
      82,
      92,
      6,
      8,
      26,
      20,
      62,
      48,
      34,
      44,
      150,
      152,
      138,
      132,
      174,
      160,
      178,
      188,
      230,
      232,
      250,
      244,
      222,
      208,
      194,
      204,
      65,
      79,
      93,
      83,
      121,
      119,
      101,
      107,
      49,
      63,
      45,
      35,
      9,
      7,
      21,
      27,
      161,
      175,
      189,
      179,
      153,
      151,
      133,
      139,
      209,
      223,
      205,
      195,
      233,
      231,
      245,
      251,
      154,
      148,
      134,
      136,
      162,
      172,
      190,
      176,
      234,
      228,
      246,
      248,
      210,
      220,
      206,
      192,
      122,
      116,
      102,
      104,
      66,
      76,
      94,
      80,
      10,
      4,
      22,
      24,
      50,
      60,
      46,
      32,
      236,
      226,
      240,
      254,
      212,
      218,
      200,
      198,
      156,
      146,
      128,
      142,
      164,
      170,
      184,
      182,
      12,
      2,
      16,
      30,
      52,
      58,
      40,
      38,
      124,
      114,
      96,
      110,
      68,
      74,
      88,
      86,
      55,
      57,
      43,
      37,
      15,
      1,
      19,
      29,
      71,
      73,
      91,
      85,
      127,
      113,
      99,
      109,
      215,
      217,
      203,
      197,
      239,
      225,
      243,
      253,
      167,
      169,
      187,
      181,
      159,
      145,
      131,
      141,
    ];
  function gk(a) {
    for (var b = [], c = 0, d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      255 < e && ((b[c++] = e & 255), (e >>= 8));
      b[c++] = e;
    }
    return b;
  }
  function hk(a) {
    return Ja(a, function (b) {
      b = b.toString(16);
      return 1 < b.length ? b : "0" + b;
    }).join("");
  }
  function ik(a, b) {
    a = new Oj(jk(a));
    b = gk(b);
    for (var c = Sa(b, 0, 16), d = "", e; c.length; ) {
      e = 16 - c.length;
      for (var f = 0; f < e; f++) c.push(0);
      d += hk(a.encrypt(c));
      c = Sa(b, 0, 16);
    }
    return d;
  }
  function kk(a, b) {
    a = new Oj(jk(a));
    for (var c = [], d = 0; d < b.length; d += 2)
      c.push(parseInt(b.substring(d, d + 2), 16));
    d = Sa(c, 0, 16);
    for (b = ""; d.length; ) {
      d = a.decrypt(d);
      if (8192 >= d.length) d = String.fromCharCode.apply(null, d);
      else {
        for (var e = "", f = 0; f < d.length; f += 8192)
          e += String.fromCharCode.apply(null, Ta(d, f, f + 8192));
        d = e;
      }
      b += d;
      d = Sa(c, 0, 16);
    }
    return b.replace(/(\x00)+$/, "");
  }
  function jk(a) {
    a = gk(a.substring(0, 32));
    for (var b = 32 - a.length, c = 0; c < b; c++) a.push(0);
    return a;
  }
  function lk() {
    try {
      return !(
        !window.opener ||
        !window.opener.location ||
        window.opener.location.hostname !== window.location.hostname ||
        window.opener.location.protocol !== window.location.protocol
      );
    } catch (a) {}
    return !1;
  }
  function mk(a) {
    oe(
      a,
      {
        target:
          window.cordova && window.cordova.InAppBrowser ? "_system" : "_blank",
      },
      void 0
    );
  }
  function nk(a, b) {
    a = t(a) && 1 == a.nodeType ? a : document.querySelector(String(a));
    if (null == a) throw Error(b || "Cannot find element.");
    return a;
  }
  function ok() {
    return window.location.href;
  }
  function pk() {
    var a = null;
    return new F(function (b) {
      "complete" == q.document.readyState
        ? b()
        : ((a = function () {
            b();
          }),
          Le(window, "load", a));
    }).lc(function (b) {
      Te(window, "load", a);
      throw b;
    });
  }
  function qk() {
    for (var a = 32, b = []; 0 < a; )
      b.push(
        "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
          Math.floor(62 * Math.random())
        )
      ),
        a--;
    return b.join("");
  }
  function rk(a, b, c) {
    c = void 0 === c ? {} : c;
    return Object.keys(a)
      .filter(function (d) {
        return b.includes(d);
      })
      .reduce(function (d, e) {
        d[e] = a[e];
        return d;
      }, c);
  } /*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
  function sk(a) {
    var b = tk;
    this.Xc = [];
    this.Ye = b;
    this.ye = a || null;
    this.Vb = this.yb = !1;
    this.Sa = void 0;
    this.Zd = this.Xf = this.ld = !1;
    this.Zc = 0;
    this.S = null;
    this.md = 0;
  }
  sk.prototype.cancel = function (a) {
    if (this.yb) this.Sa instanceof sk && this.Sa.cancel();
    else {
      if (this.S) {
        var b = this.S;
        delete this.S;
        a ? b.cancel(a) : (b.md--, 0 >= b.md && b.cancel());
      }
      this.Ye ? this.Ye.call(this.ye, this) : (this.Zd = !0);
      this.yb || ((a = new uk(this)), vk(this), wk(this, !1, a));
    }
  };
  sk.prototype.ve = function (a, b) {
    this.ld = !1;
    wk(this, a, b);
  };
  function wk(a, b, c) {
    a.yb = !0;
    a.Sa = c;
    a.Vb = !b;
    xk(a);
  }
  function vk(a) {
    if (a.yb) {
      if (!a.Zd) throw new yk(a);
      a.Zd = !1;
    }
  }
  sk.prototype.callback = function (a) {
    vk(this);
    wk(this, !0, a);
  };
  function zk(a, b, c) {
    a.Xc.push([b, c, void 0]);
    a.yb && xk(a);
  }
  sk.prototype.then = function (a, b, c) {
    var d,
      e,
      f = new F(function (g, h) {
        d = g;
        e = h;
      });
    zk(this, d, function (g) {
      g instanceof uk ? f.cancel() : e(g);
    });
    return f.then(a, b, c);
  };
  sk.prototype.$goog_Thenable = !0;
  function Ak(a) {
    return Ka(a.Xc, function (b) {
      return "function" === typeof b[1];
    });
  }
  function xk(a) {
    if (a.Zc && a.yb && Ak(a)) {
      var b = a.Zc,
        c = Bk[b];
      c && (q.clearTimeout(c.lb), delete Bk[b]);
      a.Zc = 0;
    }
    a.S && (a.S.md--, delete a.S);
    b = a.Sa;
    for (var d = (c = !1); a.Xc.length && !a.ld; ) {
      var e = a.Xc.shift(),
        f = e[0],
        g = e[1];
      e = e[2];
      if ((f = a.Vb ? g : f))
        try {
          var h = f.call(e || a.ye, b);
          void 0 !== h &&
            ((a.Vb = a.Vb && (h == b || h instanceof Error)), (a.Sa = b = h));
          if (
            Af(b) ||
            ("function" === typeof q.Promise && b instanceof q.Promise)
          )
            (d = !0), (a.ld = !0);
        } catch (m) {
          (b = m), (a.Vb = !0), Ak(a) || (c = !0);
        }
    }
    a.Sa = b;
    d &&
      ((h = u(a.ve, a, !0)),
      (d = u(a.ve, a, !1)),
      b instanceof sk ? (zk(b, h, d), (b.Xf = !0)) : b.then(h, d));
    c && ((b = new Ck(b)), (Bk[b.lb] = b), (a.Zc = b.lb));
  }
  function yk() {
    Ba.call(this);
  }
  x(yk, Ba);
  yk.prototype.message = "Deferred has already fired";
  yk.prototype.name = "AlreadyCalledError";
  function uk() {
    Ba.call(this);
  }
  x(uk, Ba);
  uk.prototype.message = "Deferred was canceled";
  uk.prototype.name = "CanceledError";
  function Ck(a) {
    this.lb = q.setTimeout(u(this.Dh, this), 0);
    this.tg = a;
  }
  Ck.prototype.Dh = function () {
    delete Bk[this.lb];
    throw this.tg;
  };
  var Bk = {};
  function Dk(a) {
    var b = {},
      c = b.document || document,
      d = hb(a).toString(),
      e = je(document, "SCRIPT"),
      f = { jf: e, sf: void 0 },
      g = new sk(f),
      h = null,
      m = null != b.timeout ? b.timeout : 5e3;
    0 < m &&
      ((h = window.setTimeout(function () {
        Ek(e, !0);
        var n = new Fk(1, "Timeout reached for loading script " + d);
        vk(g);
        wk(g, !1, n);
      }, m)),
      (f.sf = h));
    e.onload = e.onreadystatechange = function () {
      (e.readyState &&
        "loaded" != e.readyState &&
        "complete" != e.readyState) ||
        (Ek(e, b.Yh || !1, h), g.callback(null));
    };
    e.onerror = function () {
      Ek(e, !0, h);
      var n = new Fk(0, "Error while loading script " + d);
      vk(g);
      wk(g, !1, n);
    };
    f = b.attributes || {};
    Za(f, { type: "text/javascript", charset: "UTF-8" });
    fe(e, f);
    Xb(e, a);
    Gk(c).appendChild(e);
    return g;
  }
  function Gk(a) {
    var b = (a || document).getElementsByTagName("HEAD");
    return b && 0 != b.length ? b[0] : a.documentElement;
  }
  function tk() {
    if (this && this.jf) {
      var a = this.jf;
      a && "SCRIPT" == a.tagName && Ek(a, !0, this.sf);
    }
  }
  function Ek(a, b, c) {
    null != c && q.clearTimeout(c);
    a.onload = ta;
    a.onerror = ta;
    a.onreadystatechange = ta;
    b &&
      window.setTimeout(function () {
        ke(a);
      }, 0);
  }
  function Fk(a, b) {
    var c = "Jsloader error (code #" + a + ")";
    b && (c += ": " + b);
    Ba.call(this, c);
    this.code = a;
  }
  x(Fk, Ba);
  function Hk() {
    return (q.google && q.google.accounts && q.google.accounts.id) || null;
  }
  function Ik(a) {
    this.Ab = a || Hk();
    this.Ne = !1;
    this.nd = null;
  }
  Ik.prototype.cancel = function () {
    this.Ab && this.Ne && (this.nd && this.nd(null), this.Ab.cancel());
  };
  Ik.prototype.show = function (a, b) {
    var c = this;
    if (this.Ab && a)
      return (function () {
        c.Ne = !0;
        return new F(function (e) {
          c.nd = e;
          c.Ab.initialize({ client_id: a, callback: e, auto_select: !b });
          c.Ab.prompt();
        });
      })();
    if (a) {
      var d = Jk.xd()
        .load()
        .then(function () {
          c.Ab = Hk();
          return c.show(a, b);
        })
        .lc(function () {
          return null;
        });
      return G(d);
    }
    return G(null);
  };
  ua(Ik);
  var jb = new bb(cb, "https://accounts.google.com/gsi/client");
  function Jk() {
    this.Cb = null;
  }
  Jk.prototype.load = function () {
    var a = this;
    if (this.Cb) return this.Cb;
    var b = ib();
    return Hk()
      ? G()
      : (this.Cb = pk().then(function () {
          if (!Hk())
            return new F(function (c, d) {
              var e = setTimeout(function () {
                a.Cb = null;
                d(Error("Network error!"));
              }, 1e4);
              q.onGoogleLibraryLoad = function () {
                clearTimeout(e);
                c();
              };
              G(Dk(b))
                .then(function () {
                  Hk() && c();
                })
                .lc(function (f) {
                  clearTimeout(e);
                  a.Cb = null;
                  d(f);
                });
            });
        }));
  };
  ua(Jk);
  function Kk(a, b) {
    for (var c = 0; c < a.length; c++)
      if (!La(Lk, a[c]) && ((null !== Mk && a[c] in Mk) || La(b, a[c])))
        return a[c];
    return null;
  }
  var Lk = ["emailLink", "password", "phone"],
    Mk = {
      "facebook.com": "FacebookAuthProvider",
      "github.com": "GithubAuthProvider",
      "google.com": "GoogleAuthProvider",
      password: "EmailAuthProvider",
      "twitter.com": "TwitterAuthProvider",
      phone: "PhoneAuthProvider",
    };
  function Nk(a, b) {
    this.name = a;
    this.value = b;
  }
  Nk.prototype.toString = function () {
    return this.name;
  };
  var Ok = new Nk("OFF", Infinity),
    Pk = new Nk("SEVERE", 1e3),
    Qk = new Nk("WARNING", 900),
    Rk = new Nk("CONFIG", 700);
  function Sk() {
    this.uc = 0;
    this.clear();
  }
  var Tk;
  Sk.prototype.clear = function () {
    this.pe = Array(this.uc);
    this.xe = -1;
    this.Pe = !1;
  };
  function Uk(a, b, c) {
    this.yc = null;
    this.reset(a || Ok, b, c, void 0, void 0);
  }
  Uk.prototype.reset = function (a, b, c, d) {
    this.rf = d || Date.now();
    this.Te = a;
    this.Ug = b;
    this.We = c;
    this.yc = null;
  };
  function Vk(a, b) {
    this.level = null;
    this.Le = [];
    this.parent = (void 0 === b ? null : b) || null;
    this.children = [];
    this.Ve = {
      getName: function () {
        return a;
      },
    };
  }
  function Wk(a) {
    if (a.level) return a.level;
    if (a.parent) return Wk(a.parent);
    Ea("Root logger has no level set.");
    return Ok;
  }
  function Xk(a, b) {
    for (; a; )
      a.Le.forEach(function (c) {
        c(b);
      }),
        (a = a.parent);
  }
  function Yk() {
    this.entries = {};
    var a = new Vk("");
    a.level = Rk;
    this.entries[""] = a;
  }
  var Zk;
  function $k(a, b, c) {
    var d = a.entries[b];
    if (d) return void 0 !== c && (d.level = c), d;
    d = $k(a, b.substr(0, b.lastIndexOf(".")));
    var e = new Vk(b, d);
    a.entries[b] = e;
    d.children.push(e);
    void 0 !== c && (e.level = c);
    return e;
  }
  function al() {
    Zk || (Zk = new Yk());
    return Zk;
  }
  function bl(a, b, c, d) {
    var e;
    if ((e = a))
      if ((e = a && b)) {
        e = b.value;
        var f = a ? Wk($k(al(), a.getName())) : Ok;
        e = e >= f.value;
      }
    if (e) {
      b = b || Ok;
      e = $k(al(), a.getName());
      "function" === typeof c && (c = c());
      Tk || (Tk = new Sk());
      f = Tk;
      a = a.getName();
      if (0 < f.uc) {
        var g = (f.xe + 1) % f.uc;
        f.xe = g;
        f.Pe
          ? ((f = f.pe[g]), f.reset(b, c, a), (a = f))
          : ((f.Pe = g == f.uc - 1), (a = f.pe[g] = new Uk(b, c, a)));
      } else a = new Uk(b, c, a);
      d && (a.yc = d);
      Xk(e, a);
    }
  }
  function cl(a, b) {
    var c = dl;
    c && bl(c, Pk, a, b);
  }
  function el() {
    this.hf = Date.now();
  }
  var fl = null;
  el.prototype.set = function (a) {
    this.hf = a;
  };
  el.prototype.reset = function () {
    this.set(Date.now());
  };
  el.prototype.get = function () {
    return this.hf;
  };
  function gl(a) {
    this.ab = a || "";
    fl || (fl = new el());
    this.Bh = fl;
  }
  k = gl.prototype;
  k.je = !0;
  k.kf = !0;
  k.qh = !0;
  k.oh = !0;
  k.lf = !1;
  k.sh = !1;
  function hl(a) {
    return 10 > a ? "0" + a : String(a);
  }
  function il(a, b) {
    a = (a.rf - b) / 1e3;
    b = a.toFixed(3);
    var c = 0;
    if (1 > a) c = 2;
    else for (; 100 > a; ) c++, (a *= 10);
    for (; 0 < c--; ) b = " " + b;
    return b;
  }
  function jl(a) {
    gl.call(this, a);
  }
  x(jl, gl);
  function kl(a, b) {
    var c = [];
    c.push(a.ab, " ");
    if (a.kf) {
      var d = new Date(b.rf);
      c.push(
        "[",
        hl(d.getFullYear() - 2e3) +
          hl(d.getMonth() + 1) +
          hl(d.getDate()) +
          " " +
          hl(d.getHours()) +
          ":" +
          hl(d.getMinutes()) +
          ":" +
          hl(d.getSeconds()) +
          "." +
          hl(Math.floor(d.getMilliseconds() / 10)),
        "] "
      );
    }
    a.qh && c.push("[", il(b, a.Bh.get()), "s] ");
    a.oh && c.push("[", b.We, "] ");
    a.sh && c.push("[", b.Te.name, "] ");
    c.push(b.Ug);
    a.lf &&
      (b = b.yc) &&
      c.push("\n", b instanceof Error ? b.message : b.toString());
    a.je && c.push("\n");
    return c.join("");
  }
  function ll() {
    this.bh = u(this.Uf, this);
    this.zc = new jl();
    this.zc.kf = !1;
    this.zc.lf = !1;
    this.Oe = this.zc.je = !1;
    this.vg = {};
  }
  ll.prototype.Uf = function (a) {
    function b(f) {
      if (f) {
        if (f.value >= Pk.value) return "error";
        if (f.value >= Qk.value) return "warn";
        if (f.value >= Rk.value) return "log";
      }
      return "debug";
    }
    if (!this.vg[a.We]) {
      var c = kl(this.zc, a),
        d = ml;
      if (d) {
        var e = b(a.Te);
        nl(d, e, c, a.yc);
      }
    }
  };
  var ml = q.console;
  function nl(a, b, c, d) {
    if (a[b]) a[b](c, d || "");
    else a.log(c, d || "");
  }
  var dl = $k(al(), "firebaseui", void 0).Ve,
    ol = new ll();
  if (1 != ol.Oe) {
    var pl = $k(al(), "").Ve,
      ql = ol.bh;
    pl && $k(al(), pl.getName()).Le.push(ql);
    ol.Oe = !0;
  }
  function rl(a) {
    var b = dl;
    b && bl(b, Qk, a, void 0);
  }
  function sl(a, b) {
    this.Ee = a;
    this.wa = b || null;
  }
  sl.prototype.getEmail = function () {
    return this.Ee;
  };
  sl.prototype.Kb = function () {
    return { email: this.Ee, credential: this.wa && this.wa.toJSON() };
  };
  function tl(a) {
    if (a && a.email) {
      var b =
        a.credential && firebase.auth.AuthCredential.fromJSON(a.credential);
      return new sl(a.email, b);
    }
    return null;
  }
  function ul(a, b) {
    this.ig = a;
    this.sg =
      b ||
      function (c) {
        throw c;
      };
    this.verificationId = a.verificationId;
  }
  ul.prototype.confirm = function (a) {
    return G(this.ig.confirm(a)).lc(this.sg);
  };
  function vl(a) {
    this.qf = a || null;
  }
  vl.prototype.Ub = function () {
    return this.qf;
  };
  vl.prototype.Kb = function () {
    return { tenantId: this.qf };
  };
  function wl() {}
  x(wl, Mj);
  wl.prototype.clear = function () {
    var a = ec(this.cb(!0)),
      b = this;
    Ga(a, function (c) {
      b.remove(c);
    });
  };
  function xl(a) {
    this.ua = a;
  }
  x(xl, wl);
  function yl(a) {
    if (!a.ua) return !1;
    try {
      return a.ua.setItem("__sak", "1"), a.ua.removeItem("__sak"), !0;
    } catch (b) {
      return !1;
    }
  }
  k = xl.prototype;
  k.set = function (a, b) {
    try {
      this.ua.setItem(a, b);
    } catch (c) {
      if (0 == this.ua.length) throw "Storage mechanism: Storage disabled";
      throw "Storage mechanism: Quota exceeded";
    }
  };
  k.get = function (a) {
    a = this.ua.getItem(a);
    if ("string" !== typeof a && null !== a)
      throw "Storage mechanism: Invalid value was encountered";
    return a;
  };
  k.remove = function (a) {
    this.ua.removeItem(a);
  };
  k.cb = function (a) {
    var b = 0,
      c = this.ua,
      d = new bc();
    d.next = function () {
      if (b >= c.length) throw ac;
      var e = c.key(b++);
      if (a) return e;
      e = c.getItem(e);
      if ("string" !== typeof e)
        throw "Storage mechanism: Invalid value was encountered";
      return e;
    };
    return d;
  };
  k.clear = function () {
    this.ua.clear();
  };
  k.key = function (a) {
    return this.ua.key(a);
  };
  function zl() {
    var a = null;
    try {
      a = window.localStorage || null;
    } catch (b) {}
    this.ua = a;
  }
  x(zl, xl);
  function Al() {
    var a = null;
    try {
      a = window.sessionStorage || null;
    } catch (b) {}
    this.ua = a;
  }
  x(Al, xl);
  function Bl(a, b) {
    this.bc = a;
    this.ab = b + "::";
  }
  x(Bl, wl);
  Bl.prototype.set = function (a, b) {
    this.bc.set(this.ab + a, b);
  };
  Bl.prototype.get = function (a) {
    return this.bc.get(this.ab + a);
  };
  Bl.prototype.remove = function (a) {
    this.bc.remove(this.ab + a);
  };
  Bl.prototype.cb = function (a) {
    var b = this.bc.cb(!0),
      c = this,
      d = new bc();
    d.next = function () {
      for (var e = b.next(); e.substr(0, c.ab.length) != c.ab; ) e = b.next();
      return a ? e.substr(c.ab.length) : c.bc.get(e);
    };
    return d;
  };
  function Cl(a) {
    var b = [];
    Dl(new El(), a, b);
    return b.join("");
  }
  function El() {
    this.Wc = void 0;
  }
  function Dl(a, b, c) {
    if (null == b) c.push("null");
    else {
      if ("object" == typeof b) {
        if (Array.isArray(b)) {
          var d = b;
          b = d.length;
          c.push("[");
          for (var e = "", f = 0; f < b; f++)
            c.push(e),
              (e = d[f]),
              Dl(a, a.Wc ? a.Wc.call(d, String(f), e) : e, c),
              (e = ",");
          c.push("]");
          return;
        }
        if (b instanceof String || b instanceof Number || b instanceof Boolean)
          b = b.valueOf();
        else {
          c.push("{");
          f = "";
          for (d in b)
            Object.prototype.hasOwnProperty.call(b, d) &&
              ((e = b[d]),
              "function" != typeof e &&
                (c.push(f),
                Fl(d, c),
                c.push(":"),
                Dl(a, a.Wc ? a.Wc.call(b, d, e) : e, c),
                (f = ",")));
          c.push("}");
          return;
        }
      }
      switch (typeof b) {
        case "string":
          Fl(b, c);
          break;
        case "number":
          c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
          break;
        case "boolean":
          c.push(String(b));
          break;
        case "function":
          c.push("null");
          break;
        default:
          throw Error("Unknown type: " + typeof b);
      }
    }
  }
  var Gl = {
      '"': '\\"',
      "\\": "\\\\",
      "/": "\\/",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "\t": "\\t",
      "\x0B": "\\u000b",
    },
    Hl = /\uffff/.test("\uffff")
      ? /[\\"\x00-\x1f\x7f-\uffff]/g
      : /[\\"\x00-\x1f\x7f-\xff]/g;
  function Fl(a, b) {
    b.push(
      '"',
      a.replace(Hl, function (c) {
        var d = Gl[c];
        d ||
          ((d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1)),
          (Gl[c] = d));
        return d;
      }),
      '"'
    );
  }
  function Il(a) {
    this.Oc = a;
  }
  Il.prototype.set = function (a, b) {
    void 0 === b ? this.Oc.remove(a) : this.Oc.set(a, Cl(b));
  };
  Il.prototype.get = function (a) {
    try {
      var b = this.Oc.get(a);
    } catch (c) {
      return;
    }
    if (null !== b)
      try {
        return JSON.parse(b);
      } catch (c) {
        throw "Storage: Invalid value was encountered";
      }
  };
  Il.prototype.remove = function (a) {
    this.Oc.remove(a);
  };
  yl(new zl());
  var Jl,
    Kl = new Al();
  Jl = yl(Kl) ? new Bl(Kl, "firebaseui") : null;
  var Ll = new Il(Jl),
    Ml = { name: "pendingEmailCredential", storage: Ll },
    Nl = { name: "redirectStatus", storage: Ll },
    Ol = { name: "redirectUrl", storage: Ll },
    Pl = { name: "emailForSignIn", storage: new Il(new Nj(3600, "/")) },
    Ql = {
      name: "pendingEncryptedCredential",
      storage: new Il(new Nj(3600, "/")),
    };
  function Rl(a, b) {
    return a.storage.get(b ? a.name + ":" + b : a.name);
  }
  function Sl(a, b) {
    a.storage.remove(b ? a.name + ":" + b : a.name);
  }
  function Tl(a, b, c) {
    a.storage.set(c ? a.name + ":" + c : a.name, b);
  }
  function Ul(a) {
    return Rl(Ol, a) || null;
  }
  function Vl(a) {
    a = Rl(Ml, a) || null;
    return tl(a);
  }
  function Wl(a) {
    Sl(Ml, a);
  }
  function Xl(a, b) {
    Tl(Ml, a.Kb(), b);
  }
  function Yl(a) {
    return (a = Rl(Nl, a) || null) && "undefined" !== typeof a.tenantId
      ? new vl(a.tenantId)
      : null;
  }
  function Zl(a, b) {
    Tl(Nl, a.Kb(), b);
  }
  function $l(a, b) {
    b = Rl(Pl, b);
    var c = null;
    if (b)
      try {
        var d = kk(a, b),
          e = JSON.parse(d);
        c = (e && e.email) || null;
      } catch (f) {}
    return c;
  }
  function am(a, b) {
    b = Rl(Ql, b);
    var c = null;
    if (b)
      try {
        var d = kk(a, b);
        c = JSON.parse(d);
      } catch (e) {}
    return tl(c || null);
  }
  function bm(a, b, c) {
    Tl(Ql, ik(a, JSON.stringify(b.Kb())), c);
  }
  function cm(a, b, c) {
    var d = Error.call(this);
    this.message = d.message;
    "stack" in d && (this.stack = d.stack);
    this.code = "firebaseui/" + a;
    if (!(a = b)) {
      b = this.code;
      a = "";
      b = D("string" === typeof b, "code", b, "string");
      switch (t(b) ? b.toString() : b) {
        case "firebaseui/merge-conflict":
          a +=
            "\u73fe\u5728\u306e\u533f\u540d\u30e6\u30fc\u30b6\u30fc\u3092\u30a2\u30c3\u30d7\u30b0\u30ec\u30fc\u30c9\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u3053\u306e\u8a8d\u8a3c\u60c5\u5831\u306f\u3059\u3067\u306b\u5225\u306e\u975e\u533f\u540d\u30e6\u30fc\u30b6\u30fc \u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u95a2\u9023\u4ed8\u3051\u3089\u308c\u3066\u3044\u307e\u3059\u3002";
          break;
        default:
          a += Jg();
      }
      a = a.toString();
    }
    this.message = a || "";
    this.credential = c || null;
  }
  p(cm, Error);
  cm.prototype.Kb = function () {
    return { code: this.code, message: this.message };
  };
  cm.prototype.toJSON = function () {
    return this.Kb();
  };
  function dm() {
    this.i = new Hj();
    this.i.define("acUiConfig");
    this.i.define("autoUpgradeAnonymousUsers");
    this.i.define("callbacks");
    this.i.define("credentialHelper", "none");
    this.i.define("immediateFederatedRedirect", !1);
    this.i.define("popupMode", !1);
    this.i.define("privacyPolicyUrl");
    this.i.define("queryParameterForSignInSuccessUrl", "signInSuccessUrl");
    this.i.define("queryParameterForWidgetMode", "mode");
    this.i.define("signInFlow");
    this.i.define("signInOptions");
    this.i.define("signInSuccessUrl");
    this.i.define("siteName");
    this.i.define("tosUrl");
    this.i.define("widgetUrl");
  }
  function em(a) {
    var b = !!a.i.get("autoUpgradeAnonymousUsers");
    b &&
      !fm(a) &&
      cl(
        'Missing "signInFailure" callback: "signInFailure" callback needs to be provided when "autoUpgradeAnonymousUsers" is set to true.',
        void 0
      );
    return b;
  }
  function gm(a) {
    a = a.i.get("signInOptions") || [];
    for (var b = [], c = 0; c < a.length; c++) {
      var d = a[c];
      d = t(d) ? d : { provider: d };
      d.provider && b.push(d);
    }
    return b;
  }
  function hm(a, b) {
    a = gm(a);
    for (var c = 0; c < a.length; c++) if (a[c].provider === b) return a[c];
    return null;
  }
  function im(a) {
    return Ja(gm(a), function (b) {
      return b.provider;
    });
  }
  function jm(a, b) {
    a = km(a);
    for (var c = 0; c < a.length; c++) if (a[c].providerId === b) return a[c];
    return null;
  }
  function km(a) {
    return Ja(gm(a), function (b) {
      if (Mk[b.provider] || La(lm, b.provider)) {
        b = {
          providerId: b.provider,
          ja: b.providerName || null,
          qa: b.fullLabel || null,
          Ob: b.buttonColor || null,
          Xb: b.iconUrl ? wb(Bb(b.iconUrl) || Eb) : null,
        };
        for (var c in b) null === b[c] && delete b[c];
        return b;
      }
      return {
        providerId: b.provider,
        ja: b.providerName || null,
        qa: b.fullLabel || null,
        Ob: b.buttonColor || null,
        Xb: b.iconUrl ? wb(Bb(b.iconUrl) || Eb) : null,
        Rg: b.loginHintKey || null,
      };
    });
  }
  function mm(a) {
    var b = hm(a, firebase.auth.GoogleAuthProvider.PROVIDER_ID);
    return b && b.clientId && "googleyolo" === nm(a)
      ? b.clientId || null
      : null;
  }
  function om(a) {
    var b = null;
    Ga(gm(a), function (d) {
      d.provider == firebase.auth.PhoneAuthProvider.PROVIDER_ID &&
        t(d.recaptchaParameters) &&
        !Array.isArray(d.recaptchaParameters) &&
        (b = Xa(d.recaptchaParameters));
    });
    if (b) {
      var c = [];
      Ga(pm, function (d) {
        "undefined" !== typeof b[d] && (c.push(d), delete b[d]);
      });
      c.length &&
        rl(
          'The following provided "recaptchaParameters" keys are not allowed: ' +
            c.join(", ")
        );
    }
    return b;
  }
  function qm(a, b) {
    a = (a = hm(a, b)) && a.scopes;
    return Array.isArray(a) ? a : [];
  }
  function rm(a, b) {
    a = (a = hm(a, b)) && a.customParameters;
    return t(a)
      ? ((a = Xa(a)),
        b === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          delete a.login_hint,
        b === firebase.auth.GithubAuthProvider.PROVIDER_ID && delete a.login,
        a)
      : null;
  }
  function sm(a) {
    a = hm(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID);
    var b = null;
    a && "string" === typeof a.loginHint && (b = Gh(a.loginHint));
    return (a && a.defaultNationalNumber) || (b && b.Ma) || null;
  }
  function tm(a) {
    var b =
      ((a = hm(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID)) &&
        a.defaultCountry) ||
      null;
    b = b && Od(b);
    var c = null;
    a && "string" === typeof a.loginHint && (c = Gh(a.loginHint));
    return (b && b[0]) || (c && Md(c.wc)) || null;
  }
  function um(a) {
    a = hm(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID);
    if (!a) return null;
    var b = a.whitelistedCountries,
      c = a.blacklistedCountries;
    if ("undefined" !== typeof b && (!Array.isArray(b) || 0 == b.length))
      throw Error("WhitelistedCountries must be a non-empty array.");
    if ("undefined" !== typeof c && !Array.isArray(c))
      throw Error("BlacklistedCountries must be an array.");
    if (b && c)
      throw Error(
        "Both whitelistedCountries and blacklistedCountries are provided."
      );
    if (!b && !c) return Nd;
    a = [];
    if (b) {
      c = {};
      for (var d = 0; d < b.length; d++) {
        var e = Pd(b[d]);
        for (var f = 0; f < e.length; f++) c[e[f].b] = e[f];
      }
      for (var g in c) c.hasOwnProperty(g) && a.push(c[g]);
    } else {
      g = {};
      for (b = 0; b < c.length; b++)
        for (e = Pd(c[b]), d = 0; d < e.length; d++) g[e[d].b] = e[d];
      for (e = 0; e < Nd.length; e++)
        (null !== g && Nd[e].b in g) || a.push(Nd[e]);
    }
    return a;
  }
  function vm(a) {
    return Ij(a.i, "queryParameterForWidgetMode");
  }
  dm.prototype.M = function () {
    var a = this.i.get("tosUrl") || null,
      b = this.i.get("privacyPolicyUrl") || null;
    a &&
      !b &&
      rl("Privacy Policy URL is missing, the link will not be displayed.");
    if (a && b) {
      if ("function" === typeof a) return a;
      if ("string" === typeof a)
        return function () {
          mk(a);
        };
    }
    return null;
  };
  dm.prototype.L = function () {
    var a = this.i.get("tosUrl") || null,
      b = this.i.get("privacyPolicyUrl") || null;
    b &&
      !a &&
      rl("Term of Service URL is missing, the link will not be displayed.");
    if (a && b) {
      if ("function" === typeof b) return b;
      if ("string" === typeof b)
        return function () {
          mk(b);
        };
    }
    return null;
  };
  function wm(a) {
    return (a = hm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) &&
      "undefined" !== typeof a.requireDisplayName
      ? !!a.requireDisplayName
      : !0;
  }
  function xm(a) {
    a = hm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID);
    return !(
      !a ||
      a.signInMethod !==
        firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    );
  }
  function ym(a) {
    a = hm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID);
    return !(!a || !a.forceSameDevice);
  }
  function zm(a) {
    if (xm(a)) {
      var b = { url: ok(), handleCodeInApp: !0 };
      (a = hm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) &&
        "function" === typeof a.emailLinkSignIn &&
        Za(b, a.emailLinkSignIn());
      a = b.url;
      var c = ok();
      c instanceof rc || (c = Fc(c));
      a instanceof rc || (a = Fc(a));
      a = c.resolve(a);
      b.url = a.toString();
      return b;
    }
    return null;
  }
  function Am(a) {
    var b = !!a.i.get("immediateFederatedRedirect"),
      c = im(a);
    a = Bm(a);
    return b && 1 == c.length && !La(Lk, c[0]) && "redirect" == a;
  }
  function Bm(a) {
    a = a.i.get("signInFlow");
    for (var b in Cm) if (Cm[b] == a) return Cm[b];
    return "redirect";
  }
  function Dm(a) {
    return Em(a).signInSuccess || null;
  }
  function Fm(a) {
    return Em(a).signInSuccessWithAuthResult || null;
  }
  function fm(a) {
    return Em(a).signInFailure || null;
  }
  function Em(a) {
    return a.i.get("callbacks") || {};
  }
  function nm(a) {
    if (
      "http:" !== (window.location && window.location.protocol) &&
      "https:" !== (window.location && window.location.protocol)
    )
      return "none";
    a = a.i.get("credentialHelper");
    if ("accountchooser.com" === a) return "none";
    for (var b in Gm) if (Gm[b] === a) return Gm[b];
    return "none";
  }
  dm.prototype.Hb = function (a) {
    for (var b in a)
      try {
        this.i.update(b, a[b]);
      } catch (c) {
        cl('Invalid config: "' + b + '"', void 0);
      }
    Zc && this.i.update("popupMode", !1);
    um(this);
  };
  dm.prototype.update = function (a, b) {
    this.i.update(a, b);
    um(this);
  };
  var Gm = { Lh: "accountchooser.com", Oh: "googleyolo", NONE: "none" },
    Cm = { Sh: "popup", Th: "redirect" },
    Hm = {
      Nh: "callback",
      RECOVER_EMAIL: "recoverEmail",
      Uh: "resetPassword",
      REVERT_SECOND_FACTOR_ADDITION: "revertSecondFactorAddition",
      Vh: "select",
      Wh: "signIn",
      VERIFY_AND_CHANGE_EMAIL: "verifyAndChangeEmail",
      VERIFY_EMAIL: "verifyEmail",
    },
    lm = ["anonymous"],
    pm = ["sitekey", "tabindex", "callback", "expired-callback"];
  var Im,
    Jm,
    Km,
    Lm,
    Q = {};
  function R(a, b, c, d) {
    Q[a].apply(null, Array.prototype.slice.call(arguments, 1));
  }
  function Mm(a) {
    return "auth/invalid-credential" === a.code &&
      a.message &&
      -1 !== a.message.indexOf("error=consent_required")
      ? { code: "auth/user-cancelled" }
      : a;
  }
  function Nm(a, b, c, d) {
    function e(g) {
      if (!g.name || "cancel" != g.name) {
        a: {
          var h = g.message;
          try {
            var m = ((JSON.parse(h).error || {}).message || "")
              .toLowerCase()
              .match(/invalid.+(access|id)_token/);
            if (m && m.length) {
              var n = !0;
              break a;
            }
          } catch (l) {}
          n = !1;
        }
        if (n)
          (g = M(b)),
            b.h(),
            S(
              a,
              g,
              void 0,
              "\u30ed\u30b0\u30a4\u30f3 \u30bb\u30c3\u30b7\u30e7\u30f3\u306e\u671f\u9650\u304c\u5207\u308c\u307e\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002".toString()
            );
        else {
          n = (g && g.message) || "";
          if (g.code) {
            if (
              "auth/email-already-in-use" == g.code ||
              "auth/credential-already-in-use" == g.code
            )
              return;
            n = T(g);
          }
          b.D(n);
        }
      }
    }
    Om(a);
    if (d) return Pm(a, c), G();
    if (!c.credential) throw Error("No credential found!");
    if (!a.m().currentUser && !c.user) throw Error("User not logged in.");
    try {
      var f = Qm(a, c);
    } catch (g) {
      return cl(g.code || g.message, g), b.D(g.code || g.message), G();
    }
    c = f
      .then(function (g) {
        Pm(a, g);
      }, e)
      .then(void 0, e);
    U(a, f);
    return G(c);
  }
  function Pm(a, b) {
    if (!b.user) throw Error("No user found");
    var c = Fm(V(a));
    Dm(V(a)) &&
      c &&
      rl(
        "Both signInSuccess and signInSuccessWithAuthResult callbacks are provided. Only signInSuccessWithAuthResult callback will be invoked."
      );
    if (c) {
      c = Fm(V(a));
      var d = Ul(W(a)) || void 0;
      Sl(Ol, W(a));
      var e = !1;
      if (lk()) {
        if (!c || c(b, d)) (e = !0), Yb(window.opener.location, Rm(a, d));
        c || window.close();
      } else if (!c || c(b, d)) (e = !0), Yb(window.location, Rm(a, d));
      e || a.reset();
    } else {
      c = b.user;
      b = b.credential;
      d = Dm(V(a));
      e = Ul(W(a)) || void 0;
      Sl(Ol, W(a));
      var f = !1;
      if (lk()) {
        if (!d || d(c, b, e)) (f = !0), Yb(window.opener.location, Rm(a, e));
        d || window.close();
      } else if (!d || d(c, b, e)) (f = !0), Yb(window.location, Rm(a, e));
      f || a.reset();
    }
  }
  function Rm(a, b) {
    a = b || V(a).i.get("signInSuccessUrl");
    if (!a)
      throw Error(
        "No redirect URL has been found. You must either specify a signInSuccessUrl in the configuration, pass in a redirect URL to the widget URL, or return false from the callback."
      );
    return a;
  }
  function T(a) {
    var b = { code: a.code };
    b = b || {};
    var c = "";
    b = D(
      null == b.code || "string" === typeof b.code,
      "code",
      b.code,
      "null|string|undefined"
    );
    switch (t(b) ? b.toString() : b) {
      case "auth/email-already-in-use":
        c +=
          "\u3053\u306e\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306f\u4ed6\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u3088\u3063\u3066\u3059\u3067\u306b\u4f7f\u7528\u3055\u308c\u3066\u3044\u307e\u3059";
        break;
      case "auth/requires-recent-login":
        c += Mg();
        break;
      case "auth/too-many-requests":
        c +=
          "\u6b63\u3057\u304f\u306a\u3044\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u4f55\u5ea6\u3082\u5165\u529b\u3057\u3066\u3044\u307e\u3059\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002";
        break;
      case "auth/user-cancelled":
        c +=
          "\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306b\u30ed\u30b0\u30a4\u30f3\u3059\u308b\u306b\u306f\u3001\u5fc5\u8981\u306a\u6a29\u9650\u3092\u627f\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044";
        break;
      case "auth/user-not-found":
        c +=
          "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u304c\u65e2\u5b58\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u3068\u4e00\u81f4\u3057\u307e\u305b\u3093";
        break;
      case "auth/user-token-expired":
        c += Mg();
        break;
      case "auth/weak-password":
        c +=
          "6 \u6587\u5b57\u4ee5\u4e0a\u3067\u3001\u6587\u5b57\u3068\u6570\u5b57\u3092\u7d44\u307f\u5408\u308f\u305b\u305f\u5b89\u5168\u306a\u30d1\u30b9\u30ef\u30fc\u30c9\u3092\u8a2d\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044";
        break;
      case "auth/wrong-password":
        c +=
          "\u5165\u529b\u3057\u305f\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3068\u30d1\u30b9\u30ef\u30fc\u30c9\u304c\u4e00\u81f4\u3057\u307e\u305b\u3093";
        break;
      case "auth/network-request-failed":
        c +=
          "\u30cd\u30c3\u30c8\u30ef\u30fc\u30af \u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f";
        break;
      case "auth/invalid-phone-number":
        c += Eg();
        break;
      case "auth/invalid-verification-code":
        c += Gg();
        break;
      case "auth/code-expired":
        c +=
          "\u3053\u306e\u30b3\u30fc\u30c9\u306f\u7121\u52b9\u306b\u306a\u308a\u307e\u3057\u305f";
        break;
      case "auth/expired-action-code":
        c +=
          "\u3053\u306e\u30b3\u30fc\u30c9\u306f\u6709\u52b9\u671f\u9650\u304c\u5207\u308c\u3066\u3044\u307e\u3059\u3002";
        break;
      case "auth/invalid-action-code":
        c +=
          "\u30a2\u30af\u30b7\u30e7\u30f3 \u30b3\u30fc\u30c9\u304c\u7121\u52b9\u3067\u3059\u3002\u3053\u306e\u554f\u984c\u306f\u3001\u30b3\u30fc\u30c9\u306e\u5f62\u5f0f\u304c\u8aa4\u3063\u3066\u3044\u308b\u304b\u671f\u9650\u304c\u5207\u308c\u3066\u3044\u308b\u3001\u307e\u305f\u306f\u30b3\u30fc\u30c9\u304c\u3059\u3067\u306b\u4f7f\u7528\u3055\u308c\u3066\u3044\u308b\u5834\u5408\u306b\u767a\u751f\u3059\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002";
    }
    if ((c = c.toString())) return c;
    try {
      return (
        JSON.parse(a.message),
        cl("Internal error: " + a.message, void 0),
        Jg().toString()
      );
    } catch (d) {
      return a.message;
    }
  }
  function Sm(a, b, c) {
    var d =
      Mk[b] && firebase.auth[Mk[b]]
        ? new firebase.auth[Mk[b]]()
        : 0 == b.indexOf("saml.")
        ? new firebase.auth.SAMLAuthProvider(b)
        : new firebase.auth.OAuthProvider(b);
    if (!d) throw Error("Invalid Firebase Auth provider!");
    var e = qm(V(a), b);
    if (d.addScope) for (var f = 0; f < e.length; f++) d.addScope(e[f]);
    e = rm(V(a), b) || {};
    c &&
      ((a =
        b == firebase.auth.GoogleAuthProvider.PROVIDER_ID
          ? "login_hint"
          : b == firebase.auth.GithubAuthProvider.PROVIDER_ID
          ? "login"
          : (a = jm(V(a), b)) && a.Rg),
      a && (e[a] = c));
    d.setCustomParameters && d.setCustomParameters(e);
    return d;
  }
  function Tm(a, b, c, d) {
    function e() {
      var n = new vl(a.Ub());
      Zl(n, W(a));
      U(
        a,
        b.X(
          u(a.Ah, a),
          [m],
          function () {
            if ("file:" === (window.location && window.location.protocol))
              return U(
                a,
                a.getRedirectResult().then(function (l) {
                  b.h();
                  Sl(Nl, W(a));
                  R("callback", a, h, G(l));
                }, f)
              );
          },
          g
        )
      );
    }
    function f(n) {
      Sl(Nl, W(a));
      if (!n.name || "cancel" != n.name)
        switch (((n = Mm(n)), n.code)) {
          case "auth/popup-blocked":
            e();
            break;
          case "auth/popup-closed-by-user":
          case "auth/cancelled-popup-request":
            break;
          case "auth/credential-already-in-use":
            break;
          case "auth/network-request-failed":
          case "auth/too-many-requests":
          case "auth/user-cancelled":
            b.D(T(n));
            break;
          default:
            b.h(), R("callback", a, h, Gf(n));
        }
    }
    function g(n) {
      Sl(Nl, W(a));
      (n.name && "cancel" == n.name) ||
        (cl("signInWithRedirect: " + n.code, void 0),
        (n = T(n)),
        "blank" == b.Rc && Am(V(a))
          ? (b.h(), R("providerSignIn", a, h, n))
          : b.D(n));
    }
    var h = M(b),
      m = Sm(a, c, d);
    "redirect" == Bm(V(a))
      ? e()
      : U(
          a,
          Um(a, m).then(function (n) {
            b.h();
            R("callback", a, h, G(n));
          }, f)
        );
  }
  function Vm(a, b) {
    U(
      a,
      b.X(
        u(a.wh, a),
        [],
        function (c) {
          b.h();
          return Nm(a, b, c, !0);
        },
        function (c) {
          (c.name && "cancel" == c.name) ||
            (cl("ContinueAsGuest: " + c.code, void 0), (c = T(c)), b.D(c));
        }
      )
    );
  }
  function Wm(a, b, c) {
    function d(f) {
      var g = !1;
      f = b.X(
        u(a.xh, a),
        [f],
        function (h) {
          var m = M(b);
          b.h();
          R("callback", a, m, G(h));
          g = !0;
        },
        function (h) {
          if (!h.name || "cancel" != h.name)
            if (!h || "auth/credential-already-in-use" != h.code)
              if (
                h &&
                "auth/email-already-in-use" == h.code &&
                h.email &&
                h.credential
              ) {
                var m = M(b);
                b.h();
                R("callback", a, m, Gf(h));
              } else (h = T(h)), b.D(h);
        }
      );
      U(a, f);
      return f.then(
        function () {
          return g;
        },
        function () {
          return !1;
        }
      );
    }
    if (c && c.credential && c.clientId === mm(V(a))) {
      if (qm(V(a), firebase.auth.GoogleAuthProvider.PROVIDER_ID).length) {
        try {
          var e = JSON.parse(atob(c.credential.split(".")[1])).email;
        } catch (f) {}
        Tm(a, b, firebase.auth.GoogleAuthProvider.PROVIDER_ID, e);
        return G(!0);
      }
      return d(firebase.auth.GoogleAuthProvider.credential(c.credential));
    }
    c &&
      b.D(
        "\u9078\u629e\u4e2d\u306e\u8a8d\u8a3c\u30d7\u30ed\u30d0\u30a4\u30c0\u306e\u8a8d\u8a3c\u60c5\u5831\u306f\u30b5\u30dd\u30fc\u30c8\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002".toString()
      );
    return G(!1);
  }
  function Xm(a, b) {
    var c = b.oa(),
      d = b.qd();
    if (c)
      if (d) {
        var e = firebase.auth.EmailAuthProvider.credential(c, d);
        U(
          a,
          b.X(
            u(a.yh, a),
            [c, d],
            function (f) {
              return Nm(a, b, {
                user: f.user,
                credential: e,
                operationType: f.operationType,
                additionalUserInfo: f.additionalUserInfo,
              });
            },
            function (f) {
              if (!f.name || "cancel" != f.name)
                switch (f.code) {
                  case "auth/email-already-in-use":
                    break;
                  case "auth/email-exists":
                    H(b.v(), !1);
                    rg(b.Ya(), T(f));
                    break;
                  case "auth/too-many-requests":
                  case "auth/wrong-password":
                    H(b.Ia(), !1);
                    rg(b.zd(), T(f));
                    break;
                  default:
                    cl("verifyPassword: " + f.message, void 0), b.D(T(f));
                }
            }
          )
        );
      } else b.Ia().focus();
    else b.v().focus();
  }
  function Ym(a) {
    a = im(V(a));
    return 1 == a.length && a[0] == firebase.auth.EmailAuthProvider.PROVIDER_ID;
  }
  function Zm(a) {
    a = im(V(a));
    return 1 == a.length && a[0] == firebase.auth.PhoneAuthProvider.PROVIDER_ID;
  }
  function S(a, b, c, d) {
    Ym(a)
      ? d
        ? R("signIn", a, b, c, d)
        : $m(a, b, c)
      : a && Zm(a) && !d
      ? R("phoneSignInStart", a, b)
      : a && Am(V(a)) && !d
      ? R("federatedRedirect", a, b, c)
      : R("providerSignIn", a, b, d, c);
  }
  function an(a, b, c, d) {
    var e = M(b);
    U(
      a,
      b.X(
        u(a.m().fetchSignInMethodsForEmail, a.m()),
        [c],
        function (f) {
          b.h();
          bn(a, e, f, c, d);
        },
        function (f) {
          f = T(f);
          b.D(f);
        }
      )
    );
  }
  function bn(a, b, c, d, e, f) {
    c.length || xm(V(a))
      ? !c.length && xm(V(a))
        ? R("sendEmailLinkForSignIn", a, b, d, function () {
            R("signIn", a, b);
          })
        : La(c, firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
        ? R("passwordSignIn", a, b, d, f)
        : 1 == c.length &&
          c[0] === firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        ? xm(V(a))
          ? R("sendEmailLinkForSignIn", a, b, d, function () {
              R("signIn", a, b);
            })
          : R("unsupportedProvider", a, b, d)
        : (c = Kk(c, im(V(a))))
        ? (Xl(new sl(d), W(a)), R("federatedSignIn", a, b, d, c, e))
        : R("unsupportedProvider", a, b, d)
      : R("passwordSignUp", a, b, d, void 0, void 0, f);
  }
  function cn(a, b, c, d, e, f) {
    var g = M(b);
    U(
      a,
      b.X(
        u(a.sendSignInLinkToEmail, a),
        [c, f],
        function () {
          b.h();
          R("emailLinkSignInSent", a, g, c, d, f);
        },
        e
      )
    );
  }
  function $m(a, b, c) {
    c ? R("prefilledEmailSignIn", a, b, c) : R("signIn", a, b);
  }
  function dn() {
    return pc(ok(), "oobCode");
  }
  function en() {
    var a = pc(ok(), "continueUrl");
    return a
      ? function () {
          Yb(window.location, a);
        }
      : null;
  }
  function fn(a, b, c, d, e) {
    var f = c.pd();
    f &&
      U(
        a,
        c.X(
          u(a.m().confirmPasswordReset, a.m()),
          [d, f],
          function () {
            c.h();
            var g = new ij(e);
            g.render(b);
            X(a, g);
          },
          function (g) {
            gn(a, b, c, g);
          }
        )
      );
  }
  function gn(a, b, c, d) {
    "auth/weak-password" == (d && d.code)
      ? ((a = T(d)), H(c.ya(), !1), rg(c.yd(), a), c.ya().focus())
      : (c && c.h(), (c = new jj()), c.render(b), X(a, c));
  }
  function hn(a, b, c) {
    var d = new Si(c, function () {
      U(
        a,
        d.X(
          u(a.m().sendPasswordResetEmail, a.m()),
          [c],
          function () {
            d.h();
            d = new bj(c, void 0, V(a).M(), V(a).L());
            d.render(b);
            X(a, d);
          },
          function () {
            d.D(Ig().toString());
          }
        )
      );
    });
    d.render(b);
    X(a, d);
  }
  function jn(a, b, c, d) {
    var e = new wj(
      d.factorId,
      function () {
        e.X(
          u(a.m().sendPasswordResetEmail, a.m()),
          [c],
          function () {
            e.h();
            e = new bj(c, void 0, V(a).M(), V(a).L());
            e.render(b);
            X(a, e);
          },
          function () {
            e.D(Ig().toString());
          }
        );
      },
      d.phoneNumber
    );
    e.render(b);
    X(a, e);
  }
  Q.passwordReset = function (a, b, c, d) {
    U(
      a,
      a
        .m()
        .verifyPasswordResetCode(c)
        .then(
          function (e) {
            var f = new pj(e, function () {
              fn(a, b, f, c, d);
            });
            f.render(b);
            X(a, f);
          },
          function () {
            gn(a, b);
          }
        )
    );
  };
  Q.emailChangeRevocation = function (a, b, c) {
    var d = null;
    U(
      a,
      a
        .m()
        .checkActionCode(c)
        .then(function (e) {
          d = e.data.email;
          return a.m().applyActionCode(c);
        })
        .then(
          function () {
            hn(a, b, d);
          },
          function () {
            var e = new kj();
            e.render(b);
            X(a, e);
          }
        )
    );
  };
  Q.emailVerification = function (a, b, c, d) {
    U(
      a,
      a
        .m()
        .applyActionCode(c)
        .then(
          function () {
            var e = new cj(d);
            e.render(b);
            X(a, e);
          },
          function () {
            var e = new dj();
            e.render(b);
            X(a, e);
          }
        )
    );
  };
  Q.revertSecondFactorAddition = function (a, b, c) {
    var d = null,
      e = null;
    U(
      a,
      a
        .m()
        .checkActionCode(c)
        .then(function (f) {
          d = f.data.email;
          e = f.data.multiFactorInfo;
          return a.m().applyActionCode(c);
        })
        .then(
          function () {
            jn(a, b, d, e);
          },
          function () {
            var f = new gj();
            f.render(b);
            X(a, f);
          }
        )
    );
  };
  Q.verifyAndChangeEmail = function (a, b, c, d) {
    var e = null;
    U(
      a,
      a
        .m()
        .checkActionCode(c)
        .then(function (f) {
          e = f.data.email;
          return a.m().applyActionCode(c);
        })
        .then(
          function () {
            var f = new ej(e, d);
            f.render(b);
            X(a, f);
          },
          function () {
            var f = new fj();
            f.render(b);
            X(a, f);
          }
        )
    );
  };
  Q.anonymousUserMismatch = function (a, b) {
    var c = new Oi(function () {
      c.h();
      S(a, b);
    });
    c.render(b);
    X(a, c);
  };
  function kn(a, b, c) {
    if (c.user) {
      var d = {
          user: c.user,
          credential: c.credential,
          operationType: c.operationType,
          additionalUserInfo: c.additionalUserInfo,
        },
        e = Vl(W(a)),
        f = e && e.getEmail();
      if (f && !ln(c.user, f)) mn(a, b, d);
      else {
        var g = e && e.wa;
        g
          ? U(
              a,
              c.user.linkWithCredential(g).then(
                function (h) {
                  d = {
                    user: h.user,
                    credential: g,
                    operationType: h.operationType,
                    additionalUserInfo: h.additionalUserInfo,
                  };
                  nn(a, b, d);
                },
                function (h) {
                  on(a, b, h);
                }
              )
            )
          : nn(a, b, d);
      }
    } else (c = M(b)), b.h(), Wl(W(a)), S(a, c);
  }
  function nn(a, b, c) {
    Wl(W(a));
    Nm(a, b, c);
  }
  function on(a, b, c) {
    var d = M(b);
    Wl(W(a));
    c = T(c);
    b.h();
    S(a, d, void 0, c);
  }
  function pn(a, b, c, d) {
    var e = M(b);
    U(
      a,
      a
        .m()
        .fetchSignInMethodsForEmail(c)
        .then(
          function (f) {
            b.h();
            f.length
              ? La(
                  f,
                  firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
                )
                ? R("passwordLinking", a, e, c)
                : 1 == f.length &&
                  f[0] ===
                    firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
                ? R("emailLinkSignInLinking", a, e, c)
                : (f = Kk(f, im(V(a))))
                ? R("federatedLinking", a, e, c, f, d)
                : (Wl(W(a)), R("unsupportedProvider", a, e, c))
              : (Wl(W(a)), R("passwordRecovery", a, e, c, !1, Kg().toString()));
          },
          function (f) {
            on(a, b, f);
          }
        )
    );
  }
  function mn(a, b, c) {
    var d = M(b);
    U(
      a,
      qn(a).then(
        function () {
          b.h();
          R("emailMismatch", a, d, c);
        },
        function (e) {
          (e.name && "cancel" == e.name) || ((e = T(e.code)), b.D(e));
        }
      )
    );
  }
  function ln(a, b) {
    if (b == a.email) return !0;
    if (a.providerData)
      for (var c = 0; c < a.providerData.length; c++)
        if (b == a.providerData[c].email) return !0;
    return !1;
  }
  Q.callback = function (a, b, c) {
    var d = new Qi();
    d.render(b);
    X(a, d);
    b = c || a.getRedirectResult();
    U(
      a,
      b.then(
        function (e) {
          kn(a, d, e);
        },
        function (e) {
          if (
            (e = Mm(e)) &&
            ("auth/account-exists-with-different-credential" == e.code ||
              "auth/email-already-in-use" == e.code) &&
            e.email &&
            e.credential
          )
            Xl(new sl(e.email, e.credential), W(a)), pn(a, d, e.email);
          else if (e && "auth/user-cancelled" == e.code) {
            var f = Vl(W(a)),
              g = T(e);
            f && f.wa
              ? pn(a, d, f.getEmail(), g)
              : f
              ? an(a, d, f.getEmail(), g)
              : on(a, d, e);
          } else
            (e && "auth/credential-already-in-use" == e.code) ||
              (e &&
              "auth/operation-not-supported-in-this-environment" == e.code &&
              Ym(a)
                ? kn(a, d, { user: null, credential: null })
                : on(a, d, e));
        }
      )
    );
  };
  Q.differentDeviceError = function (a, b) {
    var c = new Ri(function () {
      c.h();
      S(a, b);
    });
    c.render(b);
    X(a, c);
  };
  Q.emailLinkConfirmation = function (a, b, c, d, e, f) {
    var g = new Vi(
      function () {
        var h = g.oa();
        h ? (g.h(), d(a, b, h, c)) : g.v().focus();
      },
      function () {
        g.h();
        S(a, b, e || void 0);
      },
      e || void 0,
      V(a).M(),
      V(a).L()
    );
    g.render(b);
    X(a, g);
    f && g.D(f);
  };
  Q.emailLinkNewDeviceLinking = function (a, b, c, d) {
    var e = new Cj(c);
    c = e.V.U.get(P.PROVIDER_ID) || null;
    Gj(e, null);
    if (c) {
      var f = new Xi(
        jm(V(a), c),
        function () {
          f.h();
          d(a, b, e.toString());
        },
        V(a).M(),
        V(a).L()
      );
      f.render(b);
      X(a, f);
    } else S(a, b);
  };
  function rn(a, b, c, d, e) {
    var f = new Pi(),
      g = new Cj(c),
      h = g.V.U.get(P.ie) || "",
      m = g.V.U.get(P.fd) || "",
      n = "1" === g.V.U.get(P.dd),
      l = Fj(g),
      r = g.V.U.get(P.PROVIDER_ID) || null;
    g = g.Ub();
    a.Yd(g);
    var z = !Rl(Pl, W(a)),
      O = d || $l(m, W(a)),
      Ua = (d = am(m, W(a))) && d.wa;
    r && Ua && Ua.providerId !== r && (Ua = null);
    f.render(b);
    X(a, f);
    U(
      a,
      f.X(
        function () {
          var oa = G(null);
          oa =
            (l && z) || (z && n)
              ? Gf(Error("anonymous-user-not-found"))
              : sn(a, c).then(function (zb) {
                  if (r && !Ua) throw Error("pending-credential-not-found");
                  return zb;
                });
          var ia = null;
          return oa
            .then(function (zb) {
              ia = zb;
              return e ? null : a.m().checkActionCode(h);
            })
            .then(function () {
              return ia;
            });
        },
        [],
        function (oa) {
          O
            ? tn(a, f, O, c, Ua, oa)
            : n
            ? (f.h(), R("differentDeviceError", a, b))
            : (f.h(), R("emailLinkConfirmation", a, b, c, un));
        },
        function (oa) {
          var ia = void 0;
          if (!oa || !oa.name || "cancel" != oa.name)
            switch ((f.h(), oa && oa.message)) {
              case "anonymous-user-not-found":
                R("differentDeviceError", a, b);
                break;
              case "anonymous-user-mismatch":
                R("anonymousUserMismatch", a, b);
                break;
              case "pending-credential-not-found":
                R("emailLinkNewDeviceLinking", a, b, c, vn);
                break;
              default:
                oa && (ia = T(oa)), S(a, b, void 0, ia);
            }
        }
      )
    );
  }
  function un(a, b, c, d) {
    rn(a, b, d, c, !0);
  }
  function vn(a, b, c) {
    rn(a, b, c);
  }
  function tn(a, b, c, d, e, f) {
    var g = M(b);
    b.Ib(
      "mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon",
      "\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u3044\u307e\u3059...".toString()
    );
    var h = null;
    e = (f ? wn(a, f, c, d, e) : a.signInWithEmailLink(c, d, e)).then(
      function (m) {
        Sl(Ql, W(a));
        Sl(Pl, W(a));
        b.ca();
        b.Ib(
          "firebaseui-icon-done",
          "\u30ed\u30b0\u30a4\u30f3\u3057\u307e\u3057\u305f".toString()
        );
        h = setTimeout(function () {
          b.ca();
          Nm(a, b, m, !0);
        }, 1e3);
        U(a, function () {
          b && (b.ca(), b.h());
          clearTimeout(h);
        });
      },
      function (m) {
        b.ca();
        b.h();
        if (!m.name || "cancel" != m.name) {
          var n = T(m);
          "auth/email-already-in-use" == m.code ||
          "auth/credential-already-in-use" == m.code
            ? (Sl(Ql, W(a)), Sl(Pl, W(a)))
            : "auth/invalid-email" == m.code
            ? ((n = "\u6307\u5b9a\u3055\u308c\u305f\u30e1\u30fc\u30eb\u304c\u73fe\u5728\u306e\u30ed\u30b0\u30a4\u30f3 \u30bb\u30c3\u30b7\u30e7\u30f3\u3068\u4e00\u81f4\u3057\u307e\u305b\u3093\u3002".toString()),
              R("emailLinkConfirmation", a, g, d, un, null, n))
            : S(a, g, c, n);
        }
      }
    );
    U(a, e);
  }
  Q.emailLinkSignInCallback = rn;
  function xn(a, b, c, d) {
    var e = M(b);
    cn(
      a,
      b,
      c,
      function () {
        S(a, e, c);
      },
      function (f) {
        if (!f.name || "cancel" != f.name) {
          var g = T(f);
          f && "auth/network-request-failed" == f.code
            ? b.D(g)
            : (b.h(), S(a, e, c, g));
        }
      },
      d
    );
  }
  Q.emailLinkSignInLinking = function (a, b, c) {
    var d = Vl(W(a));
    Wl(W(a));
    if (d) {
      var e = d.wa.providerId,
        f = new Wi(
          c,
          jm(V(a), e),
          function () {
            xn(a, f, c, d);
          },
          V(a).M(),
          V(a).L()
        );
      f.render(b);
      X(a, f);
    } else S(a, b);
  };
  Q.emailLinkSignInSent = function (a, b, c, d, e) {
    var f = new Yi(
      c,
      function () {
        f.h();
        R("emailNotReceived", a, b, c, d, e);
      },
      function () {
        f.h();
        d();
      },
      V(a).M(),
      V(a).L()
    );
    f.render(b);
    X(a, f);
  };
  Q.emailMismatch = function (a, b, c) {
    var d = Vl(W(a));
    if (d) {
      var e = new Zi(
        c.user.email,
        d.getEmail(),
        function () {
          var f = e;
          Wl(W(a));
          Nm(a, f, c);
        },
        function () {
          var f = c.credential.providerId,
            g = M(e);
          e.h();
          d.wa
            ? R("federatedLinking", a, g, d.getEmail(), f)
            : R("federatedSignIn", a, g, d.getEmail(), f);
        },
        V(a).M(),
        V(a).L()
      );
      e.render(b);
      X(a, e);
    } else S(a, b);
  };
  Q.emailNotReceived = function (a, b, c, d, e) {
    var f = new $i(
      function () {
        cn(
          a,
          f,
          c,
          d,
          function (g) {
            g = T(g);
            f.D(g);
          },
          e
        );
      },
      function () {
        f.h();
        S(a, b, c);
      },
      V(a).M(),
      V(a).L()
    );
    f.render(b);
    X(a, f);
  };
  Q.federatedLinking = function (a, b, c, d, e) {
    var f = Vl(W(a));
    if (f && f.wa) {
      var g = new aj(
        c,
        jm(V(a), d),
        function () {
          Tm(a, g, d, c);
        },
        V(a).M(),
        V(a).L()
      );
      g.render(b);
      X(a, g);
      e && g.D(e);
    } else S(a, b);
  };
  Q.federatedRedirect = function (a, b, c) {
    var d = new Pi();
    d.render(b);
    X(a, d);
    b = im(V(a))[0];
    Tm(a, d, b, c);
  };
  Q.federatedSignIn = function (a, b, c, d, e) {
    var f = new aj(
      c,
      jm(V(a), d),
      function () {
        Tm(a, f, d, c);
      },
      V(a).M(),
      V(a).L()
    );
    f.render(b);
    X(a, f);
    e && f.D(e);
  };
  function yn(a, b, c, d) {
    var e = b.qd();
    e
      ? U(
          a,
          b.X(
            u(a.th, a),
            [c, e],
            function (f) {
              f = f.user.linkWithCredential(d).then(function (g) {
                return Nm(a, b, {
                  user: g.user,
                  credential: d,
                  operationType: g.operationType,
                  additionalUserInfo: g.additionalUserInfo,
                });
              });
              U(a, f);
              return f;
            },
            function (f) {
              if (!f.name || "cancel" != f.name)
                switch (f.code) {
                  case "auth/wrong-password":
                    H(b.Ia(), !1);
                    rg(b.zd(), T(f));
                    break;
                  case "auth/too-many-requests":
                    b.D(T(f));
                    break;
                  default:
                    cl("signInWithEmailAndPassword: " + f.message, void 0),
                      b.D(T(f));
                }
            }
          )
        )
      : b.Ia().focus();
  }
  Q.passwordLinking = function (a, b, c) {
    var d = Vl(W(a));
    Wl(W(a));
    var e = d && d.wa;
    if (e) {
      var f = new nj(
        c,
        function () {
          yn(a, f, c, e);
        },
        function () {
          f.h();
          R("passwordRecovery", a, b, c);
        },
        V(a).M(),
        V(a).L()
      );
      f.render(b);
      X(a, f);
    } else S(a, b);
  };
  function zn(a, b) {
    var c = b.oa();
    if (c) {
      var d = M(b);
      U(
        a,
        b.X(
          u(a.m().sendPasswordResetEmail, a.m()),
          [c],
          function () {
            b.h();
            var e = new bj(
              c,
              function () {
                e.h();
                S(a, d);
              },
              V(a).M(),
              V(a).L()
            );
            e.render(d);
            X(a, e);
          },
          function (e) {
            H(b.v(), !1);
            rg(b.Ya(), T(e));
          }
        )
      );
    } else b.v().focus();
  }
  Q.passwordRecovery = function (a, b, c, d, e) {
    var f = new oj(
      function () {
        zn(a, f);
      },
      d
        ? void 0
        : function () {
            f.h();
            S(a, b);
          },
      c,
      V(a).M(),
      V(a).L()
    );
    f.render(b);
    X(a, f);
    e && f.D(e);
  };
  Q.passwordSignIn = function (a, b, c, d) {
    var e = new qj(
      function () {
        Xm(a, e);
      },
      function () {
        var f = e.getEmail();
        e.h();
        R("passwordRecovery", a, b, f);
      },
      c,
      V(a).M(),
      V(a).L(),
      d
    );
    e.render(b);
    X(a, e);
  };
  function An(a, b) {
    var c = wm(V(a)),
      d = b.oa(),
      e = null;
    c && (e = b.eg());
    var f = b.pd();
    if (d) {
      if (c)
        if (e) e = $b(e);
        else {
          b.Tb().focus();
          return;
        }
      if (f) {
        var g = firebase.auth.EmailAuthProvider.credential(d, f);
        U(
          a,
          b.X(
            u(a.uh, a),
            [d, f],
            function (h) {
              var m = {
                user: h.user,
                credential: g,
                operationType: h.operationType,
                additionalUserInfo: h.additionalUserInfo,
              };
              return c
                ? ((h = h.user
                    .updateProfile({ displayName: e })
                    .then(function () {
                      return Nm(a, b, m);
                    })),
                  U(a, h),
                  h)
                : Nm(a, b, m);
            },
            function (h) {
              if (!h.name || "cancel" != h.name) {
                var m = T(h);
                switch (h.code) {
                  case "auth/email-already-in-use":
                    return Bn(a, b, d, h);
                  case "auth/too-many-requests":
                    m = "\u3053\u306e IP \u30a2\u30c9\u30ec\u30b9\u304b\u3089\u591a\u304f\u306e\u30a2\u30ab\u30a6\u30f3\u30c8 \u30ea\u30af\u30a8\u30b9\u30c8\u304c\u9001\u4fe1\u3055\u308c\u3066\u3044\u307e\u3059\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002".toString();
                  case "auth/operation-not-allowed":
                  case "auth/weak-password":
                    H(b.ya(), !1);
                    rg(b.yd(), m);
                    break;
                  default:
                    (h = "setAccountInfo: " + Cl(h)), cl(h, void 0), b.D(m);
                }
              }
            }
          )
        );
      } else b.ya().focus();
    } else b.v().focus();
  }
  function Bn(a, b, c, d) {
    function e() {
      var g = T(d);
      H(b.v(), !1);
      rg(b.Ya(), g);
      b.v().focus();
    }
    var f = a
      .m()
      .fetchSignInMethodsForEmail(c)
      .then(
        function (g) {
          g.length
            ? e()
            : ((g = M(b)),
              b.h(),
              R("passwordRecovery", a, g, c, !1, Kg().toString()));
        },
        function () {
          e();
        }
      );
    U(a, f);
    return f;
  }
  Q.passwordSignUp = function (a, b, c, d, e, f) {
    function g() {
      h.h();
      S(a, b);
    }
    var h = new rj(
      wm(V(a)),
      function () {
        An(a, h);
      },
      e ? void 0 : g,
      c,
      d,
      V(a).M(),
      V(a).L(),
      f
    );
    h.render(b);
    X(a, h);
  };
  function Cn(a, b, c, d) {
    function e(g) {
      b.Ad().focus();
      H(b.Ad(), !1);
      rg(b.zg(), g);
    }
    var f = b.fg();
    f
      ? (b.Ib(
          "mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon",
          Dg().toString()
        ),
        U(
          a,
          b.X(
            u(d.confirm, d),
            [f],
            function (g) {
              b.ca();
              b.Ib(
                "firebaseui-icon-done",
                "\u78ba\u8a8d\u6e08\u307f".toString()
              );
              var h = setTimeout(function () {
                b.ca();
                b.h();
                var m = {
                  user: Dn(a).currentUser,
                  credential: null,
                  operationType: g.operationType,
                  additionalUserInfo: g.additionalUserInfo,
                };
                Nm(a, b, m, !0);
              }, 1e3);
              U(a, function () {
                b && b.ca();
                clearTimeout(h);
              });
            },
            function (g) {
              if (g.name && "cancel" == g.name) b.ca();
              else {
                var h = T(g);
                switch (g.code) {
                  case "auth/credential-already-in-use":
                    b.ca();
                    break;
                  case "auth/code-expired":
                    g = M(b);
                    b.ca();
                    b.h();
                    R("phoneSignInStart", a, g, c, h);
                    break;
                  case "auth/missing-verification-code":
                  case "auth/invalid-verification-code":
                    b.ca();
                    e(h);
                    break;
                  default:
                    b.ca(), b.D(h);
                }
              }
            }
          )
        ))
      : e(Gg().toString());
  }
  Q.phoneSignInFinish = function (a, b, c, d, e, f) {
    var g = new sj(
      function () {
        g.h();
        R("phoneSignInStart", a, b, c);
      },
      function () {
        Cn(a, g, c, e);
      },
      function () {
        g.h();
        S(a, b);
      },
      function () {
        g.h();
        R("phoneSignInStart", a, b, c);
      },
      Hh(c),
      d,
      V(a).M(),
      V(a).L()
    );
    g.render(b);
    X(a, g);
    f && g.D(f);
  };
  function En(a, b, c, d) {
    try {
      var e = b.Ag(Km);
    } catch (f) {
      return;
    }
    e
      ? Im
        ? (b.Ib(
            "mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon",
            Dg().toString()
          ),
          U(
            a,
            b.X(
              u(a.zh, a),
              [Hh(e), c],
              function (f) {
                var g = M(b);
                b.Ib(
                  "firebaseui-icon-done",
                  "\u30b3\u30fc\u30c9\u9001\u4fe1\u5b8c\u4e86".toString()
                );
                var h = setTimeout(function () {
                  b.ca();
                  b.h();
                  R("phoneSignInFinish", a, g, e, 15, f);
                }, 1e3);
                U(a, function () {
                  b && b.ca();
                  clearTimeout(h);
                });
              },
              function (f) {
                b.ca();
                if (!f.name || "cancel" != f.name) {
                  grecaptcha.reset(Lm);
                  Im = null;
                  var g = (f && f.message) || "";
                  if (f.code)
                    switch (f.code) {
                      case "auth/too-many-requests":
                        g = "\u3053\u306e\u96fb\u8a71\u756a\u53f7\u306f\u4f55\u5ea6\u3082\u4f7f\u7528\u3055\u308c\u3066\u3044\u307e\u3059".toString();
                        break;
                      case "auth/invalid-phone-number":
                      case "auth/missing-phone-number":
                        b.jb().focus();
                        rg(b.He(), Eg().toString());
                        return;
                      default:
                        g = T(f);
                    }
                  b.D(g);
                }
              }
            )
          ))
        : Jm
        ? rg(
            b.Bd(),
            "reCAPTCHA \u306b\u3088\u308b\u78ba\u8a8d\u3092\u884c\u3063\u3066\u304f\u3060\u3055\u3044".toString()
          )
        : !Jm && d && b.B().click()
      : (b.jb().focus(), rg(b.He(), Eg().toString()));
  }
  Q.phoneSignInStart = function (a, b, c, d) {
    var e = om(V(a)) || {};
    Im = null;
    Jm = !(e && "invisible" === e.size);
    var f = Zm(a),
      g = tm(V(a)),
      h = f ? sm(V(a)) : null;
    g = (c && c.wc) || (g && g.b) || null;
    c = (c && c.Ma) || h;
    (h = um(V(a))) && Qd(h);
    Km = h ? new Ld(um(V(a))) : Rd;
    var m = new tj(
      function (l) {
        En(a, m, n, !(!l || !l.keyCode));
      },
      Jm,
      f
        ? null
        : function () {
            n.clear();
            m.h();
            S(a, b);
          },
      V(a).M(),
      V(a).L(),
      f,
      Km,
      g,
      c
    );
    m.render(b);
    X(a, m);
    d && m.D(d);
    e.callback = function (l) {
      m.Bd() && qg(m.Bd());
      Im = l;
      Jm || En(a, m, n);
    };
    e["expired-callback"] = function () {
      Im = null;
    };
    var n = new firebase.auth.RecaptchaVerifier(
      Jm ? m.Bg() : m.B(),
      e,
      Dn(a).app
    );
    U(
      a,
      m.X(
        u(n.render, n),
        [],
        function (l) {
          Lm = l;
        },
        function (l) {
          (l.name && "cancel" == l.name) ||
            ((l = T(l)), m.h(), S(a, b, void 0, l));
        }
      )
    );
  };
  Q.prefilledEmailSignIn = function (a, b, c) {
    var d = new Pi();
    d.render(b);
    X(a, d);
    U(
      a,
      d.X(
        u(a.m().fetchSignInMethodsForEmail, a.m()),
        [c],
        function (e) {
          d.h();
          var f = !(!Ym(a) || !Fn(a));
          bn(a, b, e, c, void 0, f);
        },
        function (e) {
          e = T(e);
          d.h();
          R("signIn", a, b, c, e);
        }
      )
    );
  };
  Q.providerSignIn = function (a, b, c, d) {
    var e = new vj(
      function (f) {
        f == firebase.auth.EmailAuthProvider.PROVIDER_ID
          ? (e.h(), $m(a, b, d))
          : f == firebase.auth.PhoneAuthProvider.PROVIDER_ID
          ? (e.h(), R("phoneSignInStart", a, b))
          : "anonymous" == f
          ? Vm(a, e)
          : Tm(a, e, f, d);
        Y(a);
        a.Cd.cancel();
      },
      km(V(a)),
      V(a).M(),
      V(a).L()
    );
    e.render(b);
    X(a, e);
    c && e.D(c);
    Gn(a);
  };
  Q.sendEmailLinkForSignIn = function (a, b, c, d) {
    var e = new Qi();
    e.render(b);
    X(a, e);
    cn(a, e, c, d, function (f) {
      e.h();
      f = T(f);
      R("signIn", a, b, c, f);
    });
  };
  Q.signIn = function (a, b, c, d) {
    var e = Ym(a),
      f = new zj(
        function () {
          var g = f,
            h = g.oa() || "";
          h && an(a, g, h);
        },
        e
          ? null
          : function () {
              f.h();
              S(a, b, c);
            },
        c,
        V(a).M(),
        V(a).L(),
        e
      );
    f.render(b);
    X(a, f);
    d && f.D(d);
  };
  Q.unsupportedProvider = function (a, b, c) {
    var d = new Bj(
      c,
      function () {
        d.h();
        R("passwordRecovery", a, b, c);
      },
      function () {
        d.h();
        S(a, b, c);
      },
      V(a).M(),
      V(a).L()
    );
    d.render(b);
    X(a, d);
  };
  function Hn(a, b) {
    this.ze = !1;
    var c = In(b);
    console.log("a object is", a);
    console.log("b object is", b);
    if (Jn[c])
      throw Error('An AuthUI instance already exists for the key "' + c + '"');
    Jn[c] = this;
    this.va = a;
    this.cf = null;
    this.Kd = !1;
    Kn(this.va);
    this.Na = firebase
      .initializeApp(
        { apiKey: a.app.options.apiKey, authDomain: a.app.options.authDomain },
        a.app.name + "-firebaseui-temp"
      )
      .auth();
    Kn(this.Na);
    this.Na.setPersistence &&
      this.Na.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.Vf = b;
    this.i = new dm();
    this.I = this.ad = this.kb = this.pc = this.Yc = null;
    this.$a = [];
    this.ke = !1;
    this.Cd = Ik.xd();
    this.Xa = this.ic = null;
    this.Af = this.Yb = !1;
  }
  function Kn(a) {
    a &&
      a.INTERNAL &&
      a.INTERNAL.logFramework &&
      a.INTERNAL.logFramework("FirebaseUI-web");
  }
  var Jn = {};
  function In(a) {
    return a || "[DEFAULT]";
  }
  Hn.prototype.getRedirectResult = function () {
    Y(this);
    if (!this.kb) {
      var a = this;
      this.kb = Ln(this, function (b) {
        return b && !Vl(W(a))
          ? G(
              Dn(a)
                .getRedirectResult()
                .then(
                  function (c) {
                    return c;
                  },
                  function (c) {
                    if (
                      c &&
                      "auth/email-already-in-use" == c.code &&
                      c.email &&
                      c.credential
                    )
                      throw c;
                    return Mn(a, c);
                  }
                )
            )
          : G(
              a
                .m()
                .getRedirectResult()
                .then(function (c) {
                  return em(V(a)) && !c.user && a.Xa && !a.Xa.isAnonymous
                    ? Dn(a).getRedirectResult()
                    : c;
                })
            );
      });
    }
    return this.kb;
  };
  function X(a, b) {
    Y(a);
    a.I = b;
  }
  var Nn = null;
  k = Hn.prototype;
  k.m = function () {
    Y(this);
    return this.Na;
  };
  function Dn(a) {
    Y(a);
    return a.va;
  }
  function W(a) {
    Y(a);
    return a.Vf;
  }
  function Fn(a) {
    Y(a);
    return a.Yc ? a.Yc.emailHint : void 0;
  }
  k.Qe = function () {
    Y(this);
    return !!Yl(W(this)) || On(ok());
  };
  function On(a) {
    a = new Cj(a);
    return "signIn" === (a.V.U.get(P.Nf) || null) && !!a.V.U.get(P.ie);
  }
  k.start = function (a, b) {
    Pn(this, a, b);
  };
  function Pn(a, b, c, d) {
    Y(a);
    "undefined" !== typeof a.va.languageCode && (a.cf = a.va.languageCode);
    var e = "ja".replace(/_/g, "-");
    a.va.languageCode = e;
    a.Na.languageCode = e;
    a.Kd = !0;
    "undefined" !== typeof a.va.tenantId && (a.Na.tenantId = a.va.tenantId);
    a.Hb(c);
    a.Yc = d || null;
    var f = q.document;
    a.ic
      ? a.ic.then(function () {
          "complete" == f.readyState
            ? Qn(a, b)
            : Le(window, "load", function () {
                Qn(a, b);
              });
        })
      : "complete" == f.readyState
      ? Qn(a, b)
      : Le(window, "load", function () {
          Qn(a, b);
        });
  }
  function Qn(a, b) {
    var c = nk(b, "Could not find the FirebaseUI widget element on the page.");
    c.setAttribute("lang", "ja".replace(/_/g, "-"));
    if (Nn) {
      var d = Nn;
      Y(d);
      Vl(W(d)) &&
        rl(
          "UI Widget is already rendered on the page and is pending some user interaction. Only one widget instance can be rendered per page. The previous instance has been automatically reset."
        );
      Nn.reset();
    }
    Nn = a;
    a.ad = c;
    Rn(a, c);
    if (yl(new zl()) && yl(new Al())) {
      b = nk(b, "Could not find the FirebaseUI widget element on the page.");
      c = ok();
      d = Ij(V(a).i, "queryParameterForSignInSuccessUrl");
      c = (c = pc(c, d)) ? wb(Bb(c) || Eb) : null;
      a: {
        d = ok();
        var e = vm(V(a));
        d = pc(d, e) || "";
        for (f in Hm)
          if (Hm[f].toLowerCase() == d.toLowerCase()) {
            var f = Hm[f];
            break a;
          }
        f = "callback";
      }
      switch (f) {
        case "callback":
          c && ((f = W(a)), Tl(Ol, c, f));
          a.Qe() ? R("callback", a, b) : S(a, b, Fn(a));
          break;
        case "resetPassword":
          R("passwordReset", a, b, dn(), en());
          break;
        case "recoverEmail":
          R("emailChangeRevocation", a, b, dn());
          break;
        case "revertSecondFactorAddition":
          R("revertSecondFactorAddition", a, b, dn());
          break;
        case "verifyEmail":
          R("emailVerification", a, b, dn(), en());
          break;
        case "verifyAndChangeEmail":
          R("verifyAndChangeEmail", a, b, dn(), en());
          break;
        case "signIn":
          R("emailLinkSignInCallback", a, b, ok());
          Sn();
          break;
        case "select":
          c && ((f = W(a)), Tl(Ol, c, f));
          S(a, b);
          break;
        default:
          throw Error("Unhandled widget operation.");
      }
      b = V(a);
      (b = Em(b).uiShown || null) && b();
    } else
      (b = nk(b, "Could not find the FirebaseUI widget element on the page.")),
        (f = new mj(
          "\u304a\u4f7f\u3044\u306e\u30d6\u30e9\u30a6\u30b6\u306f Web Storage \u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u305b\u3093\u3002\u4ed6\u306e\u30d6\u30e9\u30a6\u30b6\u3067\u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002".toString()
        )),
        f.render(b),
        X(a, f);
    b = a.I && "blank" == a.I.Rc && Am(V(a));
    Yl(W(a)) && !b && ((b = Yl(W(a))), a.Yd(b.Ub()), Sl(Nl, W(a)));
  }
  function Ln(a, b) {
    if (a.Yb) return b(Tn(a));
    U(a, function () {
      a.Yb = !1;
    });
    if (em(V(a))) {
      var c = new F(function (d) {
        U(
          a,
          a.va.onAuthStateChanged(function (e) {
            a.Xa = e;
            a.Yb || ((a.Yb = !0), d(b(Tn(a))));
          })
        );
      });
      U(a, c);
      return c;
    }
    a.Yb = !0;
    return b(null);
  }
  function Tn(a) {
    Y(a);
    return em(V(a)) && a.Xa && a.Xa.isAnonymous ? a.Xa : null;
  }
  function U(a, b) {
    Y(a);
    if (b) {
      a.$a.push(b);
      var c = function () {
        Pa(a.$a, function (d) {
          return d == b;
        });
      };
      "function" != typeof b && b.then(c, c);
    }
  }
  k.pg = function () {
    Y(this);
    this.ke = !0;
  };
  function Un(a) {
    Y(a);
    var b;
    (b = a.ke) ||
      ((a = V(a)),
      (a = rm(a, firebase.auth.GoogleAuthProvider.PROVIDER_ID)),
      (b = !(!a || "select_account" !== a.prompt)));
    return b;
  }
  function Om(a) {
    "undefined" !== typeof a.va.languageCode &&
      a.Kd &&
      ((a.Kd = !1), (a.va.languageCode = a.cf));
  }
  k.Yd = function (a) {
    this.va.tenantId = a;
    this.Na.tenantId = a;
  };
  k.Ub = function () {
    return this.Na.tenantId || null;
  };
  k.reset = function () {
    Y(this);
    var a = this;
    this.ad && this.ad.removeAttribute("lang");
    this.pc && this.pc.unregister();
    Om(this);
    this.Yc = null;
    Sn();
    Sl(Nl, W(this));
    Y(this);
    this.Cd.cancel();
    this.kb = G({ user: null, credential: null });
    Nn == this && (Nn = null);
    this.ad = null;
    for (var b = 0; b < this.$a.length; b++)
      if ("function" == typeof this.$a[b]) this.$a[b]();
      else this.$a[b].cancel && this.$a[b].cancel();
    this.$a = [];
    Wl(W(this));
    this.I && (this.I.h(), (this.I = null));
    this.xc = null;
    this.Na &&
      (this.ic = qn(this).then(
        function () {
          a.ic = null;
        },
        function () {
          a.ic = null;
        }
      ));
  };
  function Rn(a, b) {
    a.xc = null;
    a.pc = new Xh(b);
    a.pc.register();
    Ke(a.pc, "pageEnter", function (c) {
      c = c && c.pageId;
      if (a.xc != c) {
        var d = V(a);
        (d = Em(d).uiChanged || null) && d(a.xc, c);
        a.xc = c;
      }
    });
  }
  k.Hb = function (a) {
    Y(this);
    this.i.Hb(a);
    !this.Af &&
      Dm(V(this)) &&
      (rl(
        "signInSuccess callback is deprecated. Please use signInSuccessWithAuthResult callback instead."
      ),
      (this.Af = !0));
  };
  function V(a) {
    Y(a);
    return a.i;
  }
  k.signIn = function () {
    Y(this);
    var a = V(this),
      b = Ij(a.i, "widgetUrl");
    a = vm(a);
    var c = b.search(oc);
    for (var d = 0, e, f = []; 0 <= (e = nc(b, d, a, c)); )
      f.push(b.substring(d, e)), (d = Math.min(b.indexOf("&", e) + 1 || c, c));
    f.push(b.substr(d));
    b = f.join("").replace(qc, "$1");
    c = "=" + encodeURIComponent("select");
    (a += c)
      ? ((c = b.indexOf("#")),
        0 > c && (c = b.length),
        (d = b.indexOf("?")),
        0 > d || d > c ? ((d = c), (e = "")) : (e = b.substring(d + 1, c)),
        (b = [b.substr(0, d), e, b.substr(c)]),
        (c = b[1]),
        (b[1] = a ? (c ? c + "&" + a : a) : c),
        (c = b[0] + (b[1] ? "?" + b[1] : "") + b[2]))
      : (c = b);
    V(this).i.get("popupMode")
      ? ((a = (window.screen.availHeight - 600) / 2),
        (b = (window.screen.availWidth - 500) / 2),
        (c = c || "about:blank"),
        (a = {
          width: 500,
          height: 600,
          top: 0 < a ? a : 0,
          left: 0 < b ? b : 0,
          location: !0,
          resizable: !0,
          statusbar: !0,
          toolbar: !1,
        }),
        (a.target = a.target || c.target || "google_popup"),
        (a.width = a.width || 690),
        (a.height = a.height || 500),
        (a = oe(c, a)) && a.focus())
      : Yb(window.location, c);
  };
  function Y(a) {
    if (a.ze) throw Error("AuthUI instance is deleted!");
  }
  k.delete = function () {
    var a = this;
    Y(this);
    return this.Na.app.delete().then(function () {
      var b = In(W(a));
      delete Jn[b];
      a.reset();
      a.ze = !0;
    });
  };
  function Gn(a) {
    Y(a);
    try {
      a.Cd.show(mm(V(a)), Un(a)).then(function (b) {
        return a.I ? Wm(a, a.I, b) : !1;
      });
    } catch (b) {}
  }
  k.sendSignInLinkToEmail = function (a, b) {
    Y(this);
    var c = this,
      d = qk();
    if (!xm(V(this)))
      return Gf(
        Error("Email link sign-in should be enabled to trigger email sending.")
      );
    var e = zm(V(this)),
      f = new Cj(e.url);
    Dj(f, d);
    b && b.wa && (bm(d, b, W(this)), Gj(f, b.wa.providerId));
    Ej(f, ym(V(this)));
    return Ln(this, function (g) {
      g && ((g = g.uid) ? Ec(f.V, P.cd, g) : f.V.removeParameter(P.cd));
      e.url = f.toString();
      return c.m().sendSignInLinkToEmail(a, e);
    }).then(
      function () {
        var g = W(c),
          h = {};
        h.email = a;
        Tl(Pl, ik(d, JSON.stringify(h)), g);
      },
      function (g) {
        Sl(Ql, W(c));
        Sl(Pl, W(c));
        throw g;
      }
    );
  };
  function sn(a, b) {
    var c = Fj(new Cj(b));
    if (!c) return G(null);
    b = new F(function (d, e) {
      var f = Dn(a).onAuthStateChanged(function (g) {
        f();
        g && g.isAnonymous && g.uid === c
          ? d(g)
          : g && g.isAnonymous && g.uid !== c
          ? e(Error("anonymous-user-mismatch"))
          : e(Error("anonymous-user-not-found"));
      });
      U(a, f);
    });
    U(a, b);
    return b;
  }
  function wn(a, b, c, d, e) {
    Y(a);
    var f = e || null,
      g = firebase.auth.EmailAuthProvider.credentialWithLink(c, d);
    c = f
      ? a
          .m()
          .signInWithEmailLink(c, d)
          .then(function (h) {
            return h.user.linkWithCredential(f);
          })
          .then(function () {
            return qn(a);
          })
          .then(function () {
            return Mn(a, { code: "auth/email-already-in-use" }, f);
          })
      : a
          .m()
          .fetchSignInMethodsForEmail(c)
          .then(function (h) {
            return h.length
              ? Mn(a, { code: "auth/email-already-in-use" }, g)
              : b.linkWithCredential(g);
          });
    U(a, c);
    return c;
  }
  k.signInWithEmailLink = function (a, b, c) {
    Y(this);
    var d = c || null,
      e,
      f = this;
    a = this.m()
      .signInWithEmailLink(a, b)
      .then(function (g) {
        e = {
          user: g.user,
          credential: null,
          operationType: g.operationType,
          additionalUserInfo: g.additionalUserInfo,
        };
        if (d)
          return g.user.linkWithCredential(d).then(function (h) {
            e = {
              user: h.user,
              credential: d,
              operationType: e.operationType,
              additionalUserInfo: h.additionalUserInfo,
            };
          });
      })
      .then(function () {
        qn(f);
      })
      .then(function () {
        return Dn(f).updateCurrentUser(e.user);
      })
      .then(function () {
        e.user = Dn(f).currentUser;
        return e;
      });
    U(this, a);
    return a;
  };
  function Sn() {
    var a = ok();
    if (On(a)) {
      a = new Cj(a);
      for (var b in P) P.hasOwnProperty(b) && a.V.removeParameter(P[b]);
      b = { state: "signIn", mode: "emailLink", operation: "clear" };
      var c = q.document.title;
      q.history &&
        q.history.replaceState &&
        q.history.replaceState(b, c, a.toString());
    }
  }
  k.yh = function (a, b) {
    Y(this);
    var c = this;
    return this.m()
      .signInWithEmailAndPassword(a, b)
      .then(function (d) {
        return Ln(c, function (e) {
          return e
            ? qn(c).then(function () {
                return Mn(
                  c,
                  { code: "auth/email-already-in-use" },
                  firebase.auth.EmailAuthProvider.credential(a, b)
                );
              })
            : d;
        });
      });
  };
  k.uh = function (a, b) {
    Y(this);
    var c = this;
    return Ln(this, function (d) {
      if (d) {
        var e = firebase.auth.EmailAuthProvider.credential(a, b);
        return d.linkWithCredential(e);
      }
      return c.m().createUserWithEmailAndPassword(a, b);
    });
  };
  k.xh = function (a) {
    Y(this);
    var b = this;
    return Ln(this, function (c) {
      return c
        ? c.linkWithCredential(a).then(
            function (d) {
              return d;
            },
            function (d) {
              if (
                d &&
                "auth/email-already-in-use" == d.code &&
                d.email &&
                d.credential
              )
                throw d;
              return Mn(b, d, a);
            }
          )
        : b.m().signInWithCredential(a);
    });
  };
  function Um(a, b) {
    Y(a);
    return Ln(a, function (c) {
      return c && !Vl(W(a))
        ? c.linkWithPopup(b).then(
            function (d) {
              return d;
            },
            function (d) {
              if (
                d &&
                "auth/email-already-in-use" == d.code &&
                d.email &&
                d.credential
              )
                throw d;
              return Mn(a, d);
            }
          )
        : a.m().signInWithPopup(b);
    });
  }
  k.Ah = function (a) {
    Y(this);
    var b = this,
      c = this.kb;
    this.kb = null;
    return Ln(this, function (d) {
      return d && !Vl(W(b))
        ? d.linkWithRedirect(a)
        : b.m().signInWithRedirect(a);
    }).then(
      function () {},
      function (d) {
        b.kb = c;
        throw d;
      }
    );
  };
  k.zh = function (a, b) {
    Y(this);
    var c = this;
    return Ln(this, function (d) {
      return d
        ? d.linkWithPhoneNumber(a, b).then(function (e) {
            return new ul(e, function (f) {
              if ("auth/credential-already-in-use" == f.code) return Mn(c, f);
              throw f;
            });
          })
        : Dn(c)
            .signInWithPhoneNumber(a, b)
            .then(function (e) {
              return new ul(e);
            });
    });
  };
  k.wh = function () {
    Y(this);
    return Dn(this).signInAnonymously();
  };
  function Qm(a, b) {
    Y(a);
    return Ln(a, function (c) {
      if (a.Xa && !a.Xa.isAnonymous && em(V(a)) && !a.m().currentUser)
        return qn(a).then(function () {
          "password" == b.credential.providerId && (b.credential = null);
          return b;
        });
      if (c)
        return qn(a)
          .then(function () {
            return c.linkWithCredential(b.credential);
          })
          .then(
            function (d) {
              b.user = d.user;
              b.credential = d.credential;
              b.operationType = d.operationType;
              b.additionalUserInfo = d.additionalUserInfo;
              return b;
            },
            function (d) {
              if (
                d &&
                "auth/email-already-in-use" == d.code &&
                d.email &&
                d.credential
              )
                throw d;
              return Mn(a, d, b.credential);
            }
          );
      if (!b.user)
        throw Error(
          'Internal error: An incompatible or outdated version of "firebase.js" may be used.'
        );
      return qn(a)
        .then(function () {
          return Dn(a).updateCurrentUser(b.user);
        })
        .then(function () {
          b.user = Dn(a).currentUser;
          b.operationType = "signIn";
          b.credential &&
            b.credential.providerId &&
            "password" == b.credential.providerId &&
            (b.credential = null);
          return b;
        });
    });
  }
  k.th = function (a, b) {
    Y(this);
    return this.m().signInWithEmailAndPassword(a, b);
  };
  function qn(a) {
    Y(a);
    return a.m().signOut();
  }
  function Mn(a, b, c) {
    Y(a);
    if (
      b &&
      b.code &&
      ("auth/email-already-in-use" == b.code ||
        "auth/credential-already-in-use" == b.code)
    ) {
      var d = fm(V(a));
      return G()
        .then(function () {
          return d(
            new cm("anonymous-upgrade-merge-conflict", null, c || b.credential)
          );
        })
        .then(function () {
          a.I && (a.I.h(), (a.I = null));
          throw b;
        });
    }
    return Gf(b);
  }
  function Vn(a) {
    this.i = new Hj();
    this.i.define("authDomain");
    this.i.define("displayMode", "optionFirst");
    this.i.define("tenants");
    this.i.define("callbacks");
    this.i.define("tosUrl");
    this.i.define("privacyPolicyUrl");
    this.Hb(a);
  }
  Vn.prototype.Hb = function (a) {
    for (var b in a)
      if (a.hasOwnProperty(b))
        try {
          this.i.update(b, a[b]);
        } catch (c) {
          cl('Invalid config: "' + b + '"', void 0);
        }
  };
  function Wn(a) {
    a = a.i.get("displayMode");
    for (var b in Xn) if (Xn[b] === a) return Xn[b];
    return "optionFirst";
  }
  Vn.prototype.M = function () {
    var a = this.i.get("tosUrl") || null,
      b = this.i.get("privacyPolicyUrl") || null;
    a &&
      !b &&
      rl("Privacy Policy URL is missing, the link will not be displayed.");
    if (a && b) {
      if ("function" === typeof a) return a;
      if ("string" === typeof a)
        return function () {
          mk(a);
        };
    }
    return null;
  };
  Vn.prototype.L = function () {
    var a = this.i.get("tosUrl") || null,
      b = this.i.get("privacyPolicyUrl") || null;
    b &&
      !a &&
      rl("Terms of Service URL is missing, the link will not be displayed.");
    if (a && b) {
      if ("function" === typeof b) return b;
      if ("string" === typeof b)
        return function () {
          mk(b);
        };
    }
    return null;
  };
  function Yn(a, b) {
    a = a.i.get("tenants");
    if (!a || (!a.hasOwnProperty(b) && !a.hasOwnProperty("*")))
      throw Error("Invalid tenant configuration!");
  }
  function Zn(a, b, c) {
    a = a.i.get("tenants");
    if (!a) throw Error("Invalid tenant configuration!");
    var d = [];
    a = a[b] || a["*"];
    if (!a)
      return (
        cl(
          "Invalid tenant configuration: " + (b + " is not configured!"),
          void 0
        ),
        d
      );
    b = a.signInOptions;
    if (!b)
      throw Error("Invalid tenant configuration: signInOptions are invalid!");
    b.forEach(function (e) {
      if ("string" === typeof e) d.push(e);
      else if ("string" === typeof e.provider) {
        var f = e.hd;
        f && c
          ? (f instanceof RegExp
              ? f
              : new RegExp("@" + f.replace(".", "\\.") + "$")
            ).test(c) && d.push(e.provider)
          : d.push(e.provider);
      } else
        (e =
          "Invalid tenant configuration: signInOption " +
          (JSON.stringify(e) + " is invalid!")),
          cl(e, void 0);
    });
    return d;
  }
  function $n(a, b, c) {
    a = ao(a, b);
    (b = a.signInOptions) &&
      c &&
      ((b = b.filter(function (d) {
        return "string" === typeof d ? c.includes(d) : c.includes(d.provider);
      })),
      (a.signInOptions = b));
    return a;
  }
  function ao(a, b) {
    var c = bo;
    var d = void 0 === d ? {} : d;
    Yn(a, b);
    a = a.i.get("tenants");
    return rk(a[b] || a["*"], c, d);
  }
  var bo = [
      "immediateFederatedRedirect",
      "privacyPolicyUrl",
      "signInFlow",
      "signInOptions",
      "tosUrl",
    ],
    Xn = { Rh: "optionFirst", Ph: "identifierFirst" };
  function co(a, b) {
    var c = this;
    this.fb = nk(a);
    this.T = {};
    Object.keys(b).forEach(function (d) {
      c.T[d] = new Vn(b[d]);
    });
    this.Re = this.I = this.Da = this.ta = this.rb = this.Ta = null;
    Object.defineProperty(this, "languageCode", {
      get: function () {
        return this.Re;
      },
      set: function (d) {
        this.Re = d || null;
      },
      enumerable: !1,
    });
  }
  k = co.prototype;
  k.lh = function (a, b) {
    var c = this;
    eo(this);
    var d = a.apiKey;
    return new F(function (e, f) {
      if (c.T.hasOwnProperty(d)) {
        var g = Em(c.T[d]).selectTenantUiHidden || null;
        if ("optionFirst" === Wn(c.T[d])) {
          var h = [];
          b.forEach(function (l) {
            l = l || "_";
            var r = c.T[d].i.get("tenants");
            if (!r) throw Error("Invalid tenant configuration!");
            (r = r[l] || r["*"])
              ? (l = {
                  tenantId: "_" !== l ? l : null,
                  qa: r.fullLabel || null,
                  displayName: r.displayName,
                  Xb: r.iconUrl,
                  Ob: r.buttonColor,
                })
              : (cl(
                  "Invalid tenant configuration: " +
                    (l + " is not configured!"),
                  void 0
                ),
                (l = null));
            l && h.push(l);
          });
          var m = function (l) {
            l = { tenantId: l, providerIds: Zn(c.T[d], l || "_") };
            e(l);
          };
          if (1 === h.length) {
            m(h[0].tenantId);
            return;
          }
          c.I = new xj(
            function (l) {
              eo(c);
              g && g();
              m(l);
            },
            h,
            c.T[d].M(),
            c.T[d].L()
          );
        } else
          c.I = new uj(
            function () {
              var l = c.I.oa();
              if (l) {
                for (var r = 0; r < b.length; r++) {
                  var z = Zn(c.T[d], b[r] || "_", l);
                  if (0 !== z.length) {
                    l = { tenantId: b[r], providerIds: z, email: l };
                    eo(c);
                    g && g();
                    e(l);
                    return;
                  }
                }
                c.I.D(Lg({ code: "no-matching-tenant-for-email" }).toString());
              }
            },
            c.T[d].M(),
            c.T[d].L()
          );
        c.I.render(c.fb);
        (f = Em(c.T[d]).selectTenantUiShown || null) && f();
      } else {
        var n = Error("Invalid project configuration: API key is invalid!");
        n.code = "invalid-configuration";
        c.handleError(n);
        f(n);
      }
    });
  };
  k.m = function (a, b) {
    if (!this.T.hasOwnProperty(a))
      throw Error("Invalid project configuration: API key is invalid!");
    var c = b || void 0;
    Yn(this.T[a], b || "_");
    try {
      this.rb = firebase.app(c).auth();
    } catch (e) {
      var d = this.T[a].i.get("authDomain");
      if (!d)
        throw Error("Invalid project configuration: authDomain is required!");
      a = firebase.initializeApp({ apiKey: a, authDomain: d }, c);
      a.auth().tenantId = b;
      this.rb = a.auth();
    }
    return this.rb;
  };
  k.vh = function (a, b) {
    var c = this;
    return new F(function (d, e) {
      function f(r, z) {
        c.Ta = new Hn(a);
        Pn(c.Ta, c.fb, r, z);
      }
      var g = a.app.options.apiKey;
      c.T.hasOwnProperty(g) ||
        e(Error("Invalid project configuration: API key is invalid!"));
      var h = $n(c.T[g], a.tenantId || "_", b && b.providerIds);
      eo(c);
      e = {
        signInSuccessWithAuthResult: function (r) {
          d(r);
          return !1;
        },
      };
      var m = Em(c.T[g]).signInUiShown || null,
        n = !1;
      e.uiChanged = function (r, z) {
        null === r && "callback" === z
          ? ((r = ee("firebaseui-id-page-callback", c.fb)) && qg(r),
            (c.ta = new Aj()),
            c.ta.render(c.fb))
          : n ||
            (null === r && "spinner" === z) ||
            "blank" === z ||
            (c.ta && (c.ta.h(), (c.ta = null)), (n = !0), m && m(a.tenantId));
      };
      h.callbacks = e;
      h.credentialHelper = "none";
      var l;
      b && b.email && (l = { emailHint: b.email });
      c.Ta
        ? c.Ta.delete().then(function () {
            f(h, l);
          })
        : f(h, l);
    });
  };
  k.reset = function () {
    var a = this;
    return G()
      .then(function () {
        a.Ta && a.Ta.delete();
      })
      .then(function () {
        a.Ta = null;
        eo(a);
      });
  };
  k.ph = function () {
    var a = this;
    this.ta ||
      this.Da ||
      (this.Da = window.setTimeout(function () {
        eo(a);
        a.ta = new Aj();
        a.I = a.ta;
        a.ta.render(a.fb);
        a.Da = null;
      }, 500));
  };
  k.Me = function () {
    window.clearTimeout(this.Da);
    this.Da = null;
    this.ta && (this.ta.h(), (this.ta = null));
  };
  k.hg = function () {
    eo(this);
    this.I = new hj();
    this.I.render(this.fb);
    return G();
  };
  function eo(a) {
    a.Ta && a.Ta.reset();
    a.Me();
    a.I && a.I.h();
  }
  k.handleError = function (a) {
    var b = this,
      c = Lg({ code: a.code }).toString() || a.message;
    eo(this);
    var d;
    a.retry &&
      "function" === typeof a.retry &&
      (d = function () {
        b.reset();
        a.retry();
      });
    this.I = new lj(c, d);
    this.I.render(this.fb);
  };
  k.ah = function (a) {
    var b = this;
    return G()
      .then(function () {
        var c = b.rb && b.rb.app.options.apiKey;
        if (!b.T.hasOwnProperty(c))
          throw Error("Invalid project configuration: API key is invalid!");
        Yn(b.T[c], a.tenantId || "_");
        if (!b.rb.currentUser || b.rb.currentUser.uid !== a.uid)
          throw Error(
            "The user being processed does not match the signed in user!"
          );
        return (c = Em(b.T[c]).beforeSignInSuccess || null) ? c(a) : a;
      })
      .then(function (c) {
        if (c.uid !== a.uid) throw Error("User with mismatching UID returned.");
        return c;
      });
  };
  w("firebaseui.auth.FirebaseUiHandler", co);
  w(
    "firebaseui.auth.FirebaseUiHandler.prototype.selectTenant",
    co.prototype.lh
  );
  w("firebaseui.auth.FirebaseUiHandler.prototype.getAuth", co.prototype.m);
  w("firebaseui.auth.FirebaseUiHandler.prototype.startSignIn", co.prototype.vh);
  w("firebaseui.auth.FirebaseUiHandler.prototype.reset", co.prototype.reset);
  w(
    "firebaseui.auth.FirebaseUiHandler.prototype.showProgressBar",
    co.prototype.ph
  );
  w(
    "firebaseui.auth.FirebaseUiHandler.prototype.hideProgressBar",
    co.prototype.Me
  );
  w(
    "firebaseui.auth.FirebaseUiHandler.prototype.completeSignOut",
    co.prototype.hg
  );
  w(
    "firebaseui.auth.FirebaseUiHandler.prototype.handleError",
    co.prototype.handleError
  );
  w("firebaseui.auth.FirebaseUiHandler.prototype.processUser", co.prototype.ah);
  w("firebaseui.auth.AuthUI", Hn);
  w("firebaseui.auth.AuthUI.getInstance", function (a) {
    a = In(a);
    return Jn[a] ? Jn[a] : null;
  });
  w("firebaseui.auth.AuthUI.prototype.disableAutoSignIn", Hn.prototype.pg);
  w("firebaseui.auth.AuthUI.prototype.start", Hn.prototype.start);
  w("firebaseui.auth.AuthUI.prototype.setConfig", Hn.prototype.Hb);
  w("firebaseui.auth.AuthUI.prototype.signIn", Hn.prototype.signIn);
  w("firebaseui.auth.AuthUI.prototype.reset", Hn.prototype.reset);
  w("firebaseui.auth.AuthUI.prototype.delete", Hn.prototype.delete);
  w("firebaseui.auth.AuthUI.prototype.isPendingRedirect", Hn.prototype.Qe);
  w("firebaseui.auth.AuthUIError", cm);
  w("firebaseui.auth.AuthUIError.prototype.toJSON", cm.prototype.toJSON);
  w(
    "firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM",
    "accountchooser.com"
  );
  w("firebaseui.auth.CredentialHelper.GOOGLE_YOLO", "googleyolo");
  w("firebaseui.auth.CredentialHelper.NONE", "none");
  w("firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID", "anonymous");
  F.prototype["catch"] = F.prototype.lc;
  F.prototype["finally"] =
    F.prototype.Ch; /*

 Copyright 2015 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
  var Z = {
    wf: function () {},
    xf: function () {},
    yf: function () {},
    ce: function () {},
    gf: function () {},
    register: function () {},
    De: function () {},
  };
  Z = (function () {
    function a(l, r) {
      for (var z = 0; z < m.length; z++)
        if (m[z].className === l)
          return "undefined" !== typeof r && (m[z] = r), m[z];
      return !1;
    }
    function b(l) {
      l = l.getAttribute("data-upgraded");
      return null === l ? [""] : l.split(",");
    }
    function c(l, r) {
      return -1 !== b(l).indexOf(r);
    }
    function d(l, r, z) {
      if ("CustomEvent" in window && "function" === typeof window.CustomEvent)
        return new CustomEvent(l, { bubbles: r, cancelable: z });
      var O = document.createEvent("Events");
      O.initEvent(l, r, z);
      return O;
    }
    function e(l, r) {
      if ("undefined" === typeof l && "undefined" === typeof r)
        for (l = 0; l < m.length; l++) e(m[l].className, m[l].xa);
      else {
        if ("undefined" === typeof r) {
          var z = a(l);
          z && (r = z.xa);
        }
        r = document.querySelectorAll("." + r);
        for (z = 0; z < r.length; z++) f(r[z], l);
      }
    }
    function f(l, r) {
      if (!("object" === typeof l && l instanceof Element))
        throw Error("Invalid argument provided to upgrade MDL element.");
      var z = d("mdl-componentupgrading", !0, !0);
      l.dispatchEvent(z);
      if (!z.defaultPrevented) {
        z = b(l);
        var O = [];
        if (r) c(l, r) || O.push(a(r));
        else {
          var Ua = l.classList;
          m.forEach(function (Ne) {
            Ua.contains(Ne.xa) &&
              -1 === O.indexOf(Ne) &&
              !c(l, Ne.className) &&
              O.push(Ne);
          });
        }
        r = 0;
        for (var oa = O.length, ia; r < oa; r++) {
          if ((ia = O[r])) {
            z.push(ia.className);
            l.setAttribute("data-upgraded", z.join(","));
            var zb = new ia.gg(l);
            zb.mdlComponentConfigInternal_ = ia;
            n.push(zb);
            for (var Fg = 0, fo = ia.od.length; Fg < fo; Fg++) ia.od[Fg](l);
            ia.tb && (l[ia.className] = zb);
          } else
            throw Error(
              "Unable to find a registered component for the given class."
            );
          ia = d("mdl-componentupgraded", !0, !1);
          l.dispatchEvent(ia);
        }
      }
    }
    function g(l) {
      Array.isArray(l) ||
        (l = l instanceof Element ? [l] : Array.prototype.slice.call(l));
      for (var r = 0, z = l.length, O; r < z; r++)
        (O = l[r]),
          O instanceof HTMLElement &&
            (f(O), 0 < O.children.length && g(O.children));
    }
    function h(l) {
      if (l) {
        n.splice(n.indexOf(l), 1);
        var r = l.f.getAttribute("data-upgraded").split(",");
        r.splice(r.indexOf(l.mdlComponentConfigInternal_.wb), 1);
        l.f.setAttribute("data-upgraded", r.join(","));
        r = d("mdl-componentdowngraded", !0, !1);
        l.f.dispatchEvent(r);
      }
    }
    var m = [],
      n = [];
    return {
      wf: e,
      xf: f,
      yf: g,
      ce: function () {
        for (var l = 0; l < m.length; l++) e(m[l].className);
      },
      gf: function (l, r) {
        (l = a(l)) && l.od.push(r);
      },
      register: function (l) {
        var r = !0;
        if ("undefined" !== typeof l.tb || "undefined" !== typeof l.widget)
          r = l.tb || l.widget;
        var z = {
          gg: l.constructor || l.constructor,
          className: l.wb || l.classAsString,
          xa: l.xa || l.cssClass,
          tb: r,
          od: [],
        };
        m.forEach(function (O) {
          if (O.xa === z.xa)
            throw Error(
              "The provided cssClass has already been registered: " + O.xa
            );
          if (O.className === z.className)
            throw Error("The provided className has already been registered");
        });
        if (
          l.constructor.prototype.hasOwnProperty("mdlComponentConfigInternal_")
        )
          throw Error(
            "MDL component classes must not have mdlComponentConfigInternal_ defined as a property."
          );
        a(l.wb, z) || m.push(z);
      },
      De: function (l) {
        function r(O) {
          n.filter(function (Ua) {
            return Ua.f === O;
          }).forEach(h);
        }
        if (l instanceof Array || l instanceof NodeList)
          for (var z = 0; z < l.length; z++) r(l[z]);
        else if (l instanceof Node) r(l);
        else throw Error("Invalid argument provided to downgrade MDL nodes.");
      },
    };
  })();
  Z.upgradeDom = Z.wf;
  Z.upgradeElement = Z.xf;
  Z.upgradeElements = Z.yf;
  Z.upgradeAllRegistered = Z.ce;
  Z.registerUpgradedCallback = Z.gf;
  Z.register = Z.register;
  Z.downgradeElements = Z.De;
  window.componentHandler = Z;
  window.addEventListener("load", function () {
    "classList" in document.createElement("div") &&
      "querySelector" in document &&
      "addEventListener" in window &&
      Array.prototype.forEach &&
      (document.documentElement.classList.add("mdl-js"), Z.ce());
  });
  (function () {
    function a(b) {
      this.f = b;
      this.init();
    }
    window.MaterialButton = a;
    a.prototype.Oa = {};
    a.prototype.A = {
      Qf: "mdl-js-ripple-effect",
      Pf: "mdl-button__ripple-container",
      Of: "mdl-ripple",
    };
    a.prototype.me = function (b) {
      b && this.f.blur();
    };
    a.prototype.disable = function () {
      this.f.disabled = !0;
    };
    a.prototype.disable = a.prototype.disable;
    a.prototype.enable = function () {
      this.f.disabled = !1;
    };
    a.prototype.enable = a.prototype.enable;
    a.prototype.init = function () {
      if (this.f) {
        if (this.f.classList.contains(this.A.Qf)) {
          var b = document.createElement("span");
          b.classList.add(this.A.Pf);
          this.Td = document.createElement("span");
          this.Td.classList.add(this.A.Of);
          b.appendChild(this.Td);
          this.bg = this.me.bind(this);
          this.Td.addEventListener("mouseup", this.bg);
          this.f.appendChild(b);
        }
        this.ne = this.me.bind(this);
        this.f.addEventListener("mouseup", this.ne);
        this.f.addEventListener("mouseleave", this.ne);
      }
    };
    Z.register({
      constructor: a,
      wb: "MaterialButton",
      xa: "mdl-js-button",
      tb: !0,
    });
  })();
  (function () {
    function a(b) {
      this.f = b;
      this.init();
    }
    window.MaterialProgress = a;
    a.prototype.Oa = {};
    a.prototype.A = { Ff: "mdl-progress__indeterminate" };
    a.prototype.nh = function (b) {
      this.f.classList.contains(this.A.Ff) || (this.ef.style.width = b + "%");
    };
    a.prototype.setProgress = a.prototype.nh;
    a.prototype.mh = function (b) {
      this.qe.style.width = b + "%";
      this.le.style.width = 100 - b + "%";
    };
    a.prototype.setBuffer = a.prototype.mh;
    a.prototype.init = function () {
      if (this.f) {
        var b = document.createElement("div");
        b.className = "progressbar bar bar1";
        this.f.appendChild(b);
        this.ef = b;
        b = document.createElement("div");
        b.className = "bufferbar bar bar2";
        this.f.appendChild(b);
        this.qe = b;
        b = document.createElement("div");
        b.className = "auxbar bar bar3";
        this.f.appendChild(b);
        this.le = b;
        this.ef.style.width = "0%";
        this.qe.style.width = "100%";
        this.le.style.width = "0%";
        this.f.classList.add("is-upgraded");
      }
    };
    Z.register({
      constructor: a,
      wb: "MaterialProgress",
      xa: "mdl-js-progress",
      tb: !0,
    });
  })();
  (function () {
    function a(b) {
      this.f = b;
      this.init();
    }
    window.MaterialSpinner = a;
    a.prototype.Oa = { Kf: 4 };
    a.prototype.A = {
      he: "mdl-spinner__layer",
      ge: "mdl-spinner__circle-clipper",
      If: "mdl-spinner__circle",
      Jf: "mdl-spinner__gap-patch",
      Lf: "mdl-spinner__left",
      Mf: "mdl-spinner__right",
    };
    a.prototype.we = function (b) {
      var c = document.createElement("div");
      c.classList.add(this.A.he);
      c.classList.add(this.A.he + "-" + b);
      b = document.createElement("div");
      b.classList.add(this.A.ge);
      b.classList.add(this.A.Lf);
      var d = document.createElement("div");
      d.classList.add(this.A.Jf);
      var e = document.createElement("div");
      e.classList.add(this.A.ge);
      e.classList.add(this.A.Mf);
      for (var f = [b, d, e], g = 0; g < f.length; g++) {
        var h = document.createElement("div");
        h.classList.add(this.A.If);
        f[g].appendChild(h);
      }
      c.appendChild(b);
      c.appendChild(d);
      c.appendChild(e);
      this.f.appendChild(c);
    };
    a.prototype.createLayer = a.prototype.we;
    a.prototype.stop = function () {
      this.f.classList.remove("is-active");
    };
    a.prototype.stop = a.prototype.stop;
    a.prototype.start = function () {
      this.f.classList.add("is-active");
    };
    a.prototype.start = a.prototype.start;
    a.prototype.init = function () {
      if (this.f) {
        for (var b = 1; b <= this.Oa.Kf; b++) this.we(b);
        this.f.classList.add("is-upgraded");
      }
    };
    Z.register({
      constructor: a,
      wb: "MaterialSpinner",
      xa: "mdl-js-spinner",
      tb: !0,
    });
  })();
  (function () {
    function a(b) {
      this.f = b;
      this.ac = this.Oa.ed;
      this.init();
    }
    window.MaterialTextfield = a;
    a.prototype.Oa = { ed: -1, fe: "maxrows" };
    a.prototype.A = {
      Qh: "mdl-textfield__label",
      Gf: "mdl-textfield__input",
      de: "is-dirty",
      qc: "is-focused",
      ee: "is-disabled",
      rc: "is-invalid",
      Hf: "is-upgraded",
      Ef: "has-placeholder",
    };
    a.prototype.Zg = function (b) {
      var c = b.target.value.split("\n").length;
      13 === b.keyCode && c >= this.ac && b.preventDefault();
    };
    a.prototype.Yg = function () {
      this.f.classList.add(this.A.qc);
    };
    a.prototype.Xg = function () {
      this.f.classList.remove(this.A.qc);
    };
    a.prototype.$g = function () {
      this.Lb();
    };
    a.prototype.Lb = function () {
      this.ue();
      this.checkValidity();
      this.te();
      this.rd();
    };
    a.prototype.ue = function () {
      this.Y.disabled
        ? this.f.classList.add(this.A.ee)
        : this.f.classList.remove(this.A.ee);
    };
    a.prototype.checkDisabled = a.prototype.ue;
    a.prototype.rd = function () {
      this.f.querySelector(":focus")
        ? this.f.classList.add(this.A.qc)
        : this.f.classList.remove(this.A.qc);
    };
    a.prototype.checkFocus = a.prototype.rd;
    a.prototype.checkValidity = function () {
      this.Y.validity &&
        (this.Y.validity.valid
          ? this.f.classList.remove(this.A.rc)
          : this.f.classList.add(this.A.rc));
    };
    a.prototype.checkValidity = a.prototype.checkValidity;
    a.prototype.te = function () {
      this.Y.value && 0 < this.Y.value.length
        ? this.f.classList.add(this.A.de)
        : this.f.classList.remove(this.A.de);
    };
    a.prototype.checkDirty = a.prototype.te;
    a.prototype.disable = function () {
      this.Y.disabled = !0;
      this.Lb();
    };
    a.prototype.disable = a.prototype.disable;
    a.prototype.enable = function () {
      this.Y.disabled = !1;
      this.Lb();
    };
    a.prototype.enable = a.prototype.enable;
    a.prototype.dg = function (b) {
      this.Y.value = b || "";
      this.Lb();
    };
    a.prototype.change = a.prototype.dg;
    a.prototype.init = function () {
      if (this.f && (this.Y = this.f.querySelector("." + this.A.Gf))) {
        this.Y.hasAttribute(this.Oa.fe) &&
          ((this.ac = parseInt(this.Y.getAttribute(this.Oa.fe), 10)),
          isNaN(this.ac) && (this.ac = this.Oa.ed));
        this.Y.hasAttribute("placeholder") && this.f.classList.add(this.A.Ef);
        this.cg = this.Lb.bind(this);
        this.Zf = this.Yg.bind(this);
        this.Yf = this.Xg.bind(this);
        this.ag = this.$g.bind(this);
        this.Y.addEventListener("input", this.cg);
        this.Y.addEventListener("focus", this.Zf);
        this.Y.addEventListener("blur", this.Yf);
        this.Y.addEventListener("reset", this.ag);
        this.ac !== this.Oa.ed &&
          ((this.$f = this.Zg.bind(this)),
          this.Y.addEventListener("keydown", this.$f));
        var b = this.f.classList.contains(this.A.rc);
        this.Lb();
        this.f.classList.add(this.A.Hf);
        b && this.f.classList.add(this.A.rc);
        this.Y.hasAttribute("autofocus") && (this.f.focus(), this.rd());
      }
    };
    Z.register({
      constructor: a,
      wb: "MaterialTextfield",
      xa: "mdl-js-textfield",
      tb: !0,
    });
  })(); /*

 Copyright (c) 2013 The Chromium Authors. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

    * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following disclaimer
 in the documentation and/or other materials provided with the
 distribution.
    * Neither the name of Google Inc. nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
  (function () {
    function a(f) {
      for (; f; ) {
        if ("DIALOG" == f.nodeName.toUpperCase()) return f;
        f = f.parentElement;
      }
      return null;
    }
    function b(f) {
      f && f.blur && f != document.body && f.blur();
    }
    function c(f) {
      this.R = f;
      this.Ld = this.Vc = !1;
      f.hasAttribute("role") || f.setAttribute("role", "dialog");
      f.show = this.show.bind(this);
      f.showModal = this.showModal.bind(this);
      f.close = this.close.bind(this);
      "returnValue" in f || (f.returnValue = "");
      this.Db = this.Db.bind(this);
      "MutationObserver" in window
        ? new MutationObserver(this.Db).observe(f, {
            attributes: !0,
            attributeFilter: ["open"],
          })
        : f.addEventListener("DOMAttrModified", this.Db);
      Object.defineProperty(f, "open", {
        set: this.Wd.bind(this),
        get: f.hasAttribute.bind(f, "open"),
      });
      this.Ua = document.createElement("div");
      this.Ua.className = "backdrop";
      this.sc = this.sc.bind(this);
    }
    var d = window.CustomEvent;
    (d && "object" != typeof d) ||
      ((d = function (f, g) {
        g = g || {};
        var h = document.createEvent("CustomEvent");
        h.initCustomEvent(f, !!g.bubbles, !!g.cancelable, g.detail || null);
        return h;
      }),
      (d.prototype = window.Event.prototype));
    c.prototype = {
      get Ae() {
        return this.R;
      },
      Db: function () {
        !this.Ld ||
          (this.R.hasAttribute("open") && document.body.contains(this.R)) ||
          ((this.Ld = !1),
          (this.R.style.zIndex = ""),
          this.Vc && ((this.R.style.top = ""), (this.Vc = !1)),
          this.Ua.removeEventListener("click", this.sc),
          this.Ua.parentElement && this.Ua.parentElement.removeChild(this.Ua),
          e.Ce.fh(this));
      },
      Wd: function (f) {
        f
          ? this.R.hasAttribute("open") || this.R.setAttribute("open", "")
          : (this.R.removeAttribute("open"), this.Db());
      },
      sc: function (f) {
        var g = document.createEvent("MouseEvents");
        g.initMouseEvent(
          f.type,
          f.bubbles,
          f.cancelable,
          window,
          f.detail,
          f.screenX,
          f.screenY,
          f.clientX,
          f.clientY,
          f.ctrlKey,
          f.altKey,
          f.shiftKey,
          f.metaKey,
          f.button,
          f.relatedTarget
        );
        this.R.dispatchEvent(g);
        f.stopPropagation();
      },
      wg: function () {
        var f = this.R.querySelector("[autofocus]:not([disabled])");
        f ||
          ((f = ["button", "input", "keygen", "select", "textarea"].map(
            function (g) {
              return g + ":not([disabled])";
            }
          )),
          f.push('[tabindex]:not([disabled]):not([tabindex=""])'),
          (f = this.R.querySelector(f.join(", "))));
        b(document.activeElement);
        f && f.focus();
      },
      Ih: function (f, g) {
        this.Ua.style.zIndex = f;
        this.R.style.zIndex = g;
      },
      show: function () {
        this.R.open || (this.Wd(!0), this.wg());
      },
      showModal: function () {
        if (this.R.hasAttribute("open"))
          throw Error(
            "Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally."
          );
        if (!document.body.contains(this.R))
          throw Error(
            "Failed to execute 'showModal' on dialog: The element is not in a Document."
          );
        if (!e.Ce.dh(this))
          throw Error(
            "Failed to execute 'showModal' on dialog: There are too many open modal dialogs."
          );
        this.show();
        this.Ld = !0;
        e.Vg(this.R) ? (e.gh(this.R), (this.Vc = !0)) : (this.Vc = !1);
        this.Ua.addEventListener("click", this.sc);
        this.R.parentNode.insertBefore(this.Ua, this.R.nextSibling);
      },
      close: function (f) {
        if (!this.R.hasAttribute("open"))
          throw Error(
            "Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed."
          );
        this.Wd(!1);
        void 0 !== f && (this.R.returnValue = f);
        f = new d("close", { bubbles: !1, cancelable: !1 });
        this.R.dispatchEvent(f);
      },
    };
    var e = {
      gh: function (f) {
        var g = document.body.scrollTop || document.documentElement.scrollTop;
        f.style.top =
          Math.max(g, g + (window.innerHeight - f.offsetHeight) / 2) + "px";
      },
      Lg: function (f) {
        for (var g = 0; g < document.styleSheets.length; ++g) {
          var h = document.styleSheets[g],
            m = null;
          try {
            m = h.cssRules;
          } catch (z) {}
          if (m)
            for (h = 0; h < m.length; ++h) {
              var n = m[h],
                l = null;
              try {
                l = document.querySelectorAll(n.selectorText);
              } catch (z) {}
              var r;
              if ((r = l))
                a: {
                  for (r = 0; r < l.length; ++r)
                    if (l[r] == f) {
                      r = !0;
                      break a;
                    }
                  r = !1;
                }
              if (
                r &&
                ((l = n.style.getPropertyValue("top")),
                (n = n.style.getPropertyValue("bottom")),
                (l && "auto" != l) || (n && "auto" != n))
              )
                return !0;
            }
        }
        return !1;
      },
      Vg: function (f) {
        return "absolute" != window.getComputedStyle(f).position ||
          ("auto" != f.style.top && "" != f.style.top) ||
          ("auto" != f.style.bottom && "" != f.style.bottom)
          ? !1
          : !e.Lg(f);
      },
      Ge: function (f) {
        f.showModal &&
          console.warn(
            "This browser already supports <dialog>, the polyfill may not work correctly",
            f
          );
        if ("DIALOG" != f.nodeName.toUpperCase())
          throw Error(
            "Failed to register dialog: The element is not a dialog."
          );
        new c(f);
      },
      eh: function (f) {
        f.showModal || e.Ge(f);
      },
      Ea: function () {
        this.na = [];
        this.hc = document.createElement("div");
        this.hc.className = "_dialog_overlay";
        this.hc.addEventListener("click", function (f) {
          f.stopPropagation();
        });
        this.Gc = this.Gc.bind(this);
        this.Ec = this.Ec.bind(this);
        this.Hc = this.Hc.bind(this);
        this.Bf = 1e5;
        this.Kh = 100150;
      },
    };
    e.Ea.prototype.tf = function () {
      return this.na.length ? this.na[this.na.length - 1].Ae : null;
    };
    e.Ea.prototype.Wf = function () {
      document.body.appendChild(this.hc);
      document.body.addEventListener("focus", this.Ec, !0);
      document.addEventListener("keydown", this.Gc);
      document.addEventListener("DOMNodeRemoved", this.Hc);
    };
    e.Ea.prototype.Hh = function () {
      document.body.removeChild(this.hc);
      document.body.removeEventListener("focus", this.Ec, !0);
      document.removeEventListener("keydown", this.Gc);
      document.removeEventListener("DOMNodeRemoved", this.Hc);
    };
    e.Ea.prototype.vf = function () {
      for (var f = this.Bf, g = 0; g < this.na.length; g++)
        g == this.na.length - 1 && (this.hc.style.zIndex = f++),
          this.na[g].Ih(f++, f++);
    };
    e.Ea.prototype.Ec = function (f) {
      if (a(f.target) != this.tf())
        return f.preventDefault(), f.stopPropagation(), b(f.target), !1;
    };
    e.Ea.prototype.Gc = function (f) {
      if (27 == f.keyCode) {
        f.preventDefault();
        f.stopPropagation();
        f = new d("cancel", { bubbles: !1, cancelable: !0 });
        var g = this.tf();
        g.dispatchEvent(f) && g.close();
      }
    };
    e.Ea.prototype.Hc = function (f) {
      if ("DIALOG" == f.target.nodeName.toUpperCase()) {
        var g = f.target;
        g.open &&
          this.na.some(function (h) {
            if (h.Ae == g) return h.Db(), !0;
          });
      }
    };
    e.Ea.prototype.dh = function (f) {
      if (this.na.length >= (this.Kh - this.Bf) / 2 - 1) return !1;
      this.na.push(f);
      1 == this.na.length && this.Wf();
      this.vf();
      return !0;
    };
    e.Ea.prototype.fh = function (f) {
      f = this.na.indexOf(f);
      -1 != f &&
        (this.na.splice(f, 1), this.vf(), 0 == this.na.length && this.Hh());
    };
    e.Ce = new e.Ea();
    document.addEventListener(
      "submit",
      function (f) {
        var g = f.target;
        if (
          g &&
          g.hasAttribute("method") &&
          "dialog" == g.getAttribute("method").toLowerCase() &&
          (f.preventDefault(), (g = a(f.target)))
        ) {
          var h,
            m = ["BUTTON", "INPUT"];
          [document.activeElement, f.explicitOriginalTarget].some(function (n) {
            if (
              n &&
              n.form == f.target &&
              -1 != m.indexOf(n.nodeName.toUpperCase())
            )
              return (h = n.value), !0;
          });
          g.close(h);
        }
      },
      !0
    );
    e.forceRegisterDialog = e.Ge;
    e.registerDialog = e.eh;
    "function" === typeof define && "amd" in define
      ? define(function () {
          return e;
        })
      : "object" === typeof module && "object" === typeof module.exports
      ? (module.exports = e)
      : (window.dialogPolyfill = e);
  })();
}.call(this));
