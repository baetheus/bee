!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).faunadb = e();
  }
})(function () {
  return (function r(e, t, n) {
    function o(a, s) {
      if (!t[a]) {
        if (!e[a]) {
          var u = "function" == typeof require && require;
          if (!s && u) return u(a, !0);
          if (i) return i(a, !0);
          var l = new Error("Cannot find module '" + a + "'");
          throw ((l.code = "MODULE_NOT_FOUND"), l);
        }
        var c = (t[a] = { exports: {} });
        e[a][0].call(
          c.exports,
          function (t) {
            return o(e[a][1][t] || t);
          },
          c,
          c.exports,
          r,
          e,
          t,
          n
        );
      }
      return t[a].exports;
    }
    for (
      var i = "function" == typeof require && require, a = 0;
      a < n.length;
      a++
    )
      o(n[a]);
    return o;
  })(
    {
      1: [
        function (e, t, r) {
          t.exports = {
            Client: e("./src/Client"),
            Expr: e("./src/Expr"),
            PageHelper: e("./src/PageHelper"),
            RequestResult: e("./src/RequestResult"),
            clientLogger: e("./src/clientLogger"),
            errors: e("./src/errors"),
            values: e("./src/values"),
            query: e("./src/query"),
          };
        },
        {
          "./src/Client": 50,
          "./src/Expr": 51,
          "./src/PageHelper": 52,
          "./src/RequestResult": 53,
          "./src/clientLogger": 56,
          "./src/errors": 57,
          "./src/query": 58,
          "./src/values": 59,
        },
      ],
      2: [
        function (e, t, r) {
          "use strict";
          (r.byteLength = function byteLength(e) {
            var t = getLens(e),
              r = t[0],
              n = t[1];
            return (3 * (r + n)) / 4 - n;
          }),
            (r.toByteArray = function toByteArray(e) {
              var t,
                r,
                n = getLens(e),
                o = n[0],
                s = n[1],
                u = new a(
                  (function _byteLength(e, t, r) {
                    return (3 * (t + r)) / 4 - r;
                  })(0, o, s)
                ),
                l = 0,
                c = s > 0 ? o - 4 : o;
              for (r = 0; r < c; r += 4)
                (t =
                  (i[e.charCodeAt(r)] << 18) |
                  (i[e.charCodeAt(r + 1)] << 12) |
                  (i[e.charCodeAt(r + 2)] << 6) |
                  i[e.charCodeAt(r + 3)]),
                  (u[l++] = (t >> 16) & 255),
                  (u[l++] = (t >> 8) & 255),
                  (u[l++] = 255 & t);
              2 === s &&
                ((t =
                  (i[e.charCodeAt(r)] << 2) | (i[e.charCodeAt(r + 1)] >> 4)),
                (u[l++] = 255 & t));
              1 === s &&
                ((t =
                  (i[e.charCodeAt(r)] << 10) |
                  (i[e.charCodeAt(r + 1)] << 4) |
                  (i[e.charCodeAt(r + 2)] >> 2)),
                (u[l++] = (t >> 8) & 255),
                (u[l++] = 255 & t));
              return u;
            }),
            (r.fromByteArray = function fromByteArray(e) {
              for (
                var t, r = e.length, i = r % 3, a = [], o = 0, s = r - i;
                o < s;
                o += 16383
              )
                a.push(encodeChunk(e, o, o + 16383 > s ? s : o + 16383));
              1 === i
                ? ((t = e[r - 1]), a.push(n[t >> 2] + n[(t << 4) & 63] + "=="))
                : 2 === i &&
                  ((t = (e[r - 2] << 8) + e[r - 1]),
                  a.push(
                    n[t >> 10] + n[(t >> 4) & 63] + n[(t << 2) & 63] + "="
                  ));
              return a.join("");
            });
          for (
            var n = [],
              i = [],
              a = "undefined" != typeof Uint8Array ? Uint8Array : Array,
              o =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              s = 0,
              u = o.length;
            s < u;
            ++s
          )
            (n[s] = o[s]), (i[o.charCodeAt(s)] = s);
          function getLens(e) {
            var t = e.length;
            if (t % 4 > 0)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var r = e.indexOf("=");
            return -1 === r && (r = t), [r, r === t ? 0 : 4 - (r % 4)];
          }
          function encodeChunk(e, t, r) {
            for (var i, a, o = [], s = t; s < r; s += 3)
              (i =
                ((e[s] << 16) & 16711680) +
                ((e[s + 1] << 8) & 65280) +
                (255 & e[s + 2])),
                o.push(
                  n[((a = i) >> 18) & 63] +
                    n[(a >> 12) & 63] +
                    n[(a >> 6) & 63] +
                    n[63 & a]
                );
            return o.join("");
          }
          (i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63);
        },
        {},
      ],
      3: [function (e, t, r) {}, {}],
      4: [
        function (e, t, r) {
          t.exports = function _btoa(e) {
            return btoa(e);
          };
        },
        {},
      ],
      5: [
        function (e, t, r) {
          (function (t) {
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <https://feross.org>
             * @license  MIT
             */
            "use strict";
            var n = e("base64-js"),
              i = e("ieee754"),
              a =
                "function" == typeof Symbol && "function" == typeof Symbol.for
                  ? Symbol.for("nodejs.util.inspect.custom")
                  : null;
            (r.Buffer = t),
              (r.SlowBuffer = function SlowBuffer(e) {
                +e != e && (e = 0);
                return t.alloc(+e);
              }),
              (r.INSPECT_MAX_BYTES = 50);
            var o = 2147483647;
            function createBuffer(e) {
              if (e > o)
                throw new RangeError(
                  'The value "' + e + '" is invalid for option "size"'
                );
              var r = new Uint8Array(e);
              return Object.setPrototypeOf(r, t.prototype), r;
            }
            function t(e, t, r) {
              if ("number" == typeof e) {
                if ("string" == typeof t)
                  throw new TypeError(
                    'The "string" argument must be of type string. Received type number'
                  );
                return allocUnsafe(e);
              }
              return from(e, t, r);
            }
            function from(e, r, n) {
              if ("string" == typeof e)
                return (function fromString(e, r) {
                  ("string" == typeof r && "" !== r) || (r = "utf8");
                  if (!t.isEncoding(r))
                    throw new TypeError("Unknown encoding: " + r);
                  var n = 0 | byteLength(e, r),
                    i = createBuffer(n),
                    a = i.write(e, r);
                  a !== n && (i = i.slice(0, a));
                  return i;
                })(e, r);
              if (ArrayBuffer.isView(e)) return fromArrayLike(e);
              if (null == e)
                throw new TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof e
                );
              if (
                isInstance(e, ArrayBuffer) ||
                (e && isInstance(e.buffer, ArrayBuffer))
              )
                return fromArrayBuffer(e, r, n);
              if (
                "undefined" != typeof SharedArrayBuffer &&
                (isInstance(e, SharedArrayBuffer) ||
                  (e && isInstance(e.buffer, SharedArrayBuffer)))
              )
                return fromArrayBuffer(e, r, n);
              if ("number" == typeof e)
                throw new TypeError(
                  'The "value" argument must not be of type number. Received type number'
                );
              var i = e.valueOf && e.valueOf();
              if (null != i && i !== e) return t.from(i, r, n);
              var a = (function fromObject(e) {
                if (t.isBuffer(e)) {
                  var r = 0 | checked(e.length),
                    n = createBuffer(r);
                  return 0 === n.length ? n : (e.copy(n, 0, 0, r), n);
                }
                if (void 0 !== e.length)
                  return "number" != typeof e.length || numberIsNaN(e.length)
                    ? createBuffer(0)
                    : fromArrayLike(e);
                if ("Buffer" === e.type && Array.isArray(e.data))
                  return fromArrayLike(e.data);
              })(e);
              if (a) return a;
              if (
                "undefined" != typeof Symbol &&
                null != Symbol.toPrimitive &&
                "function" == typeof e[Symbol.toPrimitive]
              )
                return t.from(e[Symbol.toPrimitive]("string"), r, n);
              throw new TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof e
              );
            }
            function assertSize(e) {
              if ("number" != typeof e)
                throw new TypeError('"size" argument must be of type number');
              if (e < 0)
                throw new RangeError(
                  'The value "' + e + '" is invalid for option "size"'
                );
            }
            function allocUnsafe(e) {
              return assertSize(e), createBuffer(e < 0 ? 0 : 0 | checked(e));
            }
            function fromArrayLike(e) {
              for (
                var t = e.length < 0 ? 0 : 0 | checked(e.length),
                  r = createBuffer(t),
                  n = 0;
                n < t;
                n += 1
              )
                r[n] = 255 & e[n];
              return r;
            }
            function fromArrayBuffer(e, r, n) {
              if (r < 0 || e.byteLength < r)
                throw new RangeError('"offset" is outside of buffer bounds');
              if (e.byteLength < r + (n || 0))
                throw new RangeError('"length" is outside of buffer bounds');
              var i;
              return (
                (i =
                  void 0 === r && void 0 === n
                    ? new Uint8Array(e)
                    : void 0 === n
                    ? new Uint8Array(e, r)
                    : new Uint8Array(e, r, n)),
                Object.setPrototypeOf(i, t.prototype),
                i
              );
            }
            function checked(e) {
              if (e >= o)
                throw new RangeError(
                  "Attempt to allocate Buffer larger than maximum size: 0x" +
                    o.toString(16) +
                    " bytes"
                );
              return 0 | e;
            }
            function byteLength(e, r) {
              if (t.isBuffer(e)) return e.length;
              if (ArrayBuffer.isView(e) || isInstance(e, ArrayBuffer))
                return e.byteLength;
              if ("string" != typeof e)
                throw new TypeError(
                  'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                    typeof e
                );
              var n = e.length,
                i = arguments.length > 2 && !0 === arguments[2];
              if (!i && 0 === n) return 0;
              for (var a = !1; ; )
                switch (r) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return n;
                  case "utf8":
                  case "utf-8":
                    return utf8ToBytes(e).length;
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * n;
                  case "hex":
                    return n >>> 1;
                  case "base64":
                    return base64ToBytes(e).length;
                  default:
                    if (a) return i ? -1 : utf8ToBytes(e).length;
                    (r = ("" + r).toLowerCase()), (a = !0);
                }
            }
            function slowToString(e, t, r) {
              var n = !1;
              if (((void 0 === t || t < 0) && (t = 0), t > this.length))
                return "";
              if (
                ((void 0 === r || r > this.length) && (r = this.length), r <= 0)
              )
                return "";
              if ((r >>>= 0) <= (t >>>= 0)) return "";
              for (e || (e = "utf8"); ; )
                switch (e) {
                  case "hex":
                    return hexSlice(this, t, r);
                  case "utf8":
                  case "utf-8":
                    return utf8Slice(this, t, r);
                  case "ascii":
                    return asciiSlice(this, t, r);
                  case "latin1":
                  case "binary":
                    return latin1Slice(this, t, r);
                  case "base64":
                    return base64Slice(this, t, r);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return utf16leSlice(this, t, r);
                  default:
                    if (n) throw new TypeError("Unknown encoding: " + e);
                    (e = (e + "").toLowerCase()), (n = !0);
                }
            }
            function swap(e, t, r) {
              var n = e[t];
              (e[t] = e[r]), (e[r] = n);
            }
            function bidirectionalIndexOf(e, r, n, i, a) {
              if (0 === e.length) return -1;
              if (
                ("string" == typeof n
                  ? ((i = n), (n = 0))
                  : n > 2147483647
                  ? (n = 2147483647)
                  : n < -2147483648 && (n = -2147483648),
                numberIsNaN((n = +n)) && (n = a ? 0 : e.length - 1),
                n < 0 && (n = e.length + n),
                n >= e.length)
              ) {
                if (a) return -1;
                n = e.length - 1;
              } else if (n < 0) {
                if (!a) return -1;
                n = 0;
              }
              if (("string" == typeof r && (r = t.from(r, i)), t.isBuffer(r)))
                return 0 === r.length ? -1 : arrayIndexOf(e, r, n, i, a);
              if ("number" == typeof r)
                return (
                  (r &= 255),
                  "function" == typeof Uint8Array.prototype.indexOf
                    ? a
                      ? Uint8Array.prototype.indexOf.call(e, r, n)
                      : Uint8Array.prototype.lastIndexOf.call(e, r, n)
                    : arrayIndexOf(e, [r], n, i, a)
                );
              throw new TypeError("val must be string, number or Buffer");
            }
            function arrayIndexOf(e, t, r, n, i) {
              var a,
                o = 1,
                s = e.length,
                u = t.length;
              if (
                void 0 !== n &&
                ("ucs2" === (n = String(n).toLowerCase()) ||
                  "ucs-2" === n ||
                  "utf16le" === n ||
                  "utf-16le" === n)
              ) {
                if (e.length < 2 || t.length < 2) return -1;
                (o = 2), (s /= 2), (u /= 2), (r /= 2);
              }
              function read(e, t) {
                return 1 === o ? e[t] : e.readUInt16BE(t * o);
              }
              if (i) {
                var l = -1;
                for (a = r; a < s; a++)
                  if (read(e, a) === read(t, -1 === l ? 0 : a - l)) {
                    if ((-1 === l && (l = a), a - l + 1 === u)) return l * o;
                  } else -1 !== l && (a -= a - l), (l = -1);
              } else
                for (r + u > s && (r = s - u), a = r; a >= 0; a--) {
                  for (var c = !0, f = 0; f < u; f++)
                    if (read(e, a + f) !== read(t, f)) {
                      c = !1;
                      break;
                    }
                  if (c) return a;
                }
              return -1;
            }
            function hexWrite(e, t, r, n) {
              r = Number(r) || 0;
              var i = e.length - r;
              n ? (n = Number(n)) > i && (n = i) : (n = i);
              var a = t.length;
              n > a / 2 && (n = a / 2);
              for (var o = 0; o < n; ++o) {
                var s = parseInt(t.substr(2 * o, 2), 16);
                if (numberIsNaN(s)) return o;
                e[r + o] = s;
              }
              return o;
            }
            function utf8Write(e, t, r, n) {
              return blitBuffer(utf8ToBytes(t, e.length - r), e, r, n);
            }
            function asciiWrite(e, t, r, n) {
              return blitBuffer(
                (function asciiToBytes(e) {
                  for (var t = [], r = 0; r < e.length; ++r)
                    t.push(255 & e.charCodeAt(r));
                  return t;
                })(t),
                e,
                r,
                n
              );
            }
            function latin1Write(e, t, r, n) {
              return asciiWrite(e, t, r, n);
            }
            function base64Write(e, t, r, n) {
              return blitBuffer(base64ToBytes(t), e, r, n);
            }
            function ucs2Write(e, t, r, n) {
              return blitBuffer(
                (function utf16leToBytes(e, t) {
                  for (
                    var r, n, i, a = [], o = 0;
                    o < e.length && !((t -= 2) < 0);
                    ++o
                  )
                    (r = e.charCodeAt(o)),
                      (n = r >> 8),
                      (i = r % 256),
                      a.push(i),
                      a.push(n);
                  return a;
                })(t, e.length - r),
                e,
                r,
                n
              );
            }
            function base64Slice(e, t, r) {
              return 0 === t && r === e.length
                ? n.fromByteArray(e)
                : n.fromByteArray(e.slice(t, r));
            }
            function utf8Slice(e, t, r) {
              r = Math.min(e.length, r);
              for (var n = [], i = t; i < r; ) {
                var a,
                  o,
                  u,
                  l,
                  c = e[i],
                  f = null,
                  h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                if (i + h <= r)
                  switch (h) {
                    case 1:
                      c < 128 && (f = c);
                      break;
                    case 2:
                      128 == (192 & (a = e[i + 1])) &&
                        (l = ((31 & c) << 6) | (63 & a)) > 127 &&
                        (f = l);
                      break;
                    case 3:
                      (a = e[i + 1]),
                        (o = e[i + 2]),
                        128 == (192 & a) &&
                          128 == (192 & o) &&
                          (l = ((15 & c) << 12) | ((63 & a) << 6) | (63 & o)) >
                            2047 &&
                          (l < 55296 || l > 57343) &&
                          (f = l);
                      break;
                    case 4:
                      (a = e[i + 1]),
                        (o = e[i + 2]),
                        (u = e[i + 3]),
                        128 == (192 & a) &&
                          128 == (192 & o) &&
                          128 == (192 & u) &&
                          (l =
                            ((15 & c) << 18) |
                            ((63 & a) << 12) |
                            ((63 & o) << 6) |
                            (63 & u)) > 65535 &&
                          l < 1114112 &&
                          (f = l);
                  }
                null === f
                  ? ((f = 65533), (h = 1))
                  : f > 65535 &&
                    ((f -= 65536),
                    n.push(((f >>> 10) & 1023) | 55296),
                    (f = 56320 | (1023 & f))),
                  n.push(f),
                  (i += h);
              }
              return (function decodeCodePointsArray(e) {
                var t = e.length;
                if (t <= s) return String.fromCharCode.apply(String, e);
                var r = "",
                  n = 0;
                for (; n < t; )
                  r += String.fromCharCode.apply(String, e.slice(n, (n += s)));
                return r;
              })(n);
            }
            (r.kMaxLength = o),
              (t.TYPED_ARRAY_SUPPORT = (function typedArraySupport() {
                try {
                  var e = new Uint8Array(1),
                    t = {
                      foo: function () {
                        return 42;
                      },
                    };
                  return (
                    Object.setPrototypeOf(t, Uint8Array.prototype),
                    Object.setPrototypeOf(e, t),
                    42 === e.foo()
                  );
                } catch (e) {
                  return !1;
                }
              })()),
              t.TYPED_ARRAY_SUPPORT ||
                "undefined" == typeof console ||
                "function" != typeof console.error ||
                console.error(
                  "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
                ),
              Object.defineProperty(t.prototype, "parent", {
                enumerable: !0,
                get: function () {
                  if (t.isBuffer(this)) return this.buffer;
                },
              }),
              Object.defineProperty(t.prototype, "offset", {
                enumerable: !0,
                get: function () {
                  if (t.isBuffer(this)) return this.byteOffset;
                },
              }),
              "undefined" != typeof Symbol &&
                null != Symbol.species &&
                t[Symbol.species] === t &&
                Object.defineProperty(t, Symbol.species, {
                  value: null,
                  configurable: !0,
                  enumerable: !1,
                  writable: !1,
                }),
              (t.poolSize = 8192),
              (t.from = function (e, t, r) {
                return from(e, t, r);
              }),
              Object.setPrototypeOf(t.prototype, Uint8Array.prototype),
              Object.setPrototypeOf(t, Uint8Array),
              (t.alloc = function (e, t, r) {
                return (function alloc(e, t, r) {
                  return (
                    assertSize(e),
                    e <= 0
                      ? createBuffer(e)
                      : void 0 !== t
                      ? "string" == typeof r
                        ? createBuffer(e).fill(t, r)
                        : createBuffer(e).fill(t)
                      : createBuffer(e)
                  );
                })(e, t, r);
              }),
              (t.allocUnsafe = function (e) {
                return allocUnsafe(e);
              }),
              (t.allocUnsafeSlow = function (e) {
                return allocUnsafe(e);
              }),
              (t.isBuffer = function isBuffer(e) {
                return null != e && !0 === e._isBuffer && e !== t.prototype;
              }),
              (t.compare = function compare(e, r) {
                if (
                  (isInstance(e, Uint8Array) &&
                    (e = t.from(e, e.offset, e.byteLength)),
                  isInstance(r, Uint8Array) &&
                    (r = t.from(r, r.offset, r.byteLength)),
                  !t.isBuffer(e) || !t.isBuffer(r))
                )
                  throw new TypeError(
                    'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                  );
                if (e === r) return 0;
                for (
                  var n = e.length, i = r.length, a = 0, o = Math.min(n, i);
                  a < o;
                  ++a
                )
                  if (e[a] !== r[a]) {
                    (n = e[a]), (i = r[a]);
                    break;
                  }
                return n < i ? -1 : i < n ? 1 : 0;
              }),
              (t.isEncoding = function isEncoding(e) {
                switch (String(e).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;
                  default:
                    return !1;
                }
              }),
              (t.concat = function concat(e, r) {
                if (!Array.isArray(e))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                if (0 === e.length) return t.alloc(0);
                var n;
                if (void 0 === r)
                  for (r = 0, n = 0; n < e.length; ++n) r += e[n].length;
                var i = t.allocUnsafe(r),
                  a = 0;
                for (n = 0; n < e.length; ++n) {
                  var o = e[n];
                  if (
                    (isInstance(o, Uint8Array) && (o = t.from(o)),
                    !t.isBuffer(o))
                  )
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  o.copy(i, a), (a += o.length);
                }
                return i;
              }),
              (t.byteLength = byteLength),
              (t.prototype._isBuffer = !0),
              (t.prototype.swap16 = function swap16() {
                var e = this.length;
                if (e % 2 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 16-bits"
                  );
                for (var t = 0; t < e; t += 2) swap(this, t, t + 1);
                return this;
              }),
              (t.prototype.swap32 = function swap32() {
                var e = this.length;
                if (e % 4 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 32-bits"
                  );
                for (var t = 0; t < e; t += 4)
                  swap(this, t, t + 3), swap(this, t + 1, t + 2);
                return this;
              }),
              (t.prototype.swap64 = function swap64() {
                var e = this.length;
                if (e % 8 != 0)
                  throw new RangeError(
                    "Buffer size must be a multiple of 64-bits"
                  );
                for (var t = 0; t < e; t += 8)
                  swap(this, t, t + 7),
                    swap(this, t + 1, t + 6),
                    swap(this, t + 2, t + 5),
                    swap(this, t + 3, t + 4);
                return this;
              }),
              (t.prototype.toString = function toString() {
                var e = this.length;
                return 0 === e
                  ? ""
                  : 0 === arguments.length
                  ? utf8Slice(this, 0, e)
                  : slowToString.apply(this, arguments);
              }),
              (t.prototype.toLocaleString = t.prototype.toString),
              (t.prototype.equals = function equals(e) {
                if (!t.isBuffer(e))
                  throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === t.compare(this, e);
              }),
              (t.prototype.inspect = function inspect() {
                var e = "",
                  t = r.INSPECT_MAX_BYTES;
                return (
                  (e = this.toString("hex", 0, t)
                    .replace(/(.{2})/g, "$1 ")
                    .trim()),
                  this.length > t && (e += " ... "),
                  "<Buffer " + e + ">"
                );
              }),
              a && (t.prototype[a] = t.prototype.inspect),
              (t.prototype.compare = function compare(e, r, n, i, a) {
                if (
                  (isInstance(e, Uint8Array) &&
                    (e = t.from(e, e.offset, e.byteLength)),
                  !t.isBuffer(e))
                )
                  throw new TypeError(
                    'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                      typeof e
                  );
                if (
                  (void 0 === r && (r = 0),
                  void 0 === n && (n = e ? e.length : 0),
                  void 0 === i && (i = 0),
                  void 0 === a && (a = this.length),
                  r < 0 || n > e.length || i < 0 || a > this.length)
                )
                  throw new RangeError("out of range index");
                if (i >= a && r >= n) return 0;
                if (i >= a) return -1;
                if (r >= n) return 1;
                if (this === e) return 0;
                for (
                  var o = (a >>>= 0) - (i >>>= 0),
                    s = (n >>>= 0) - (r >>>= 0),
                    u = Math.min(o, s),
                    l = this.slice(i, a),
                    c = e.slice(r, n),
                    f = 0;
                  f < u;
                  ++f
                )
                  if (l[f] !== c[f]) {
                    (o = l[f]), (s = c[f]);
                    break;
                  }
                return o < s ? -1 : s < o ? 1 : 0;
              }),
              (t.prototype.includes = function includes(e, t, r) {
                return -1 !== this.indexOf(e, t, r);
              }),
              (t.prototype.indexOf = function indexOf(e, t, r) {
                return bidirectionalIndexOf(this, e, t, r, !0);
              }),
              (t.prototype.lastIndexOf = function lastIndexOf(e, t, r) {
                return bidirectionalIndexOf(this, e, t, r, !1);
              }),
              (t.prototype.write = function write(e, t, r, n) {
                if (void 0 === t) (n = "utf8"), (r = this.length), (t = 0);
                else if (void 0 === r && "string" == typeof t)
                  (n = t), (r = this.length), (t = 0);
                else {
                  if (!isFinite(t))
                    throw new Error(
                      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                    );
                  (t >>>= 0),
                    isFinite(r)
                      ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                      : ((n = r), (r = void 0));
                }
                var i = this.length - t;
                if (
                  ((void 0 === r || r > i) && (r = i),
                  (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
                )
                  throw new RangeError(
                    "Attempt to write outside buffer bounds"
                  );
                n || (n = "utf8");
                for (var a = !1; ; )
                  switch (n) {
                    case "hex":
                      return hexWrite(this, e, t, r);
                    case "utf8":
                    case "utf-8":
                      return utf8Write(this, e, t, r);
                    case "ascii":
                      return asciiWrite(this, e, t, r);
                    case "latin1":
                    case "binary":
                      return latin1Write(this, e, t, r);
                    case "base64":
                      return base64Write(this, e, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return ucs2Write(this, e, t, r);
                    default:
                      if (a) throw new TypeError("Unknown encoding: " + n);
                      (n = ("" + n).toLowerCase()), (a = !0);
                  }
              }),
              (t.prototype.toJSON = function toJSON() {
                return {
                  type: "Buffer",
                  data: Array.prototype.slice.call(this._arr || this, 0),
                };
              });
            var s = 4096;
            function asciiSlice(e, t, r) {
              var n = "";
              r = Math.min(e.length, r);
              for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
              return n;
            }
            function latin1Slice(e, t, r) {
              var n = "";
              r = Math.min(e.length, r);
              for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
              return n;
            }
            function hexSlice(e, t, r) {
              var n = e.length;
              (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
              for (var i = "", a = t; a < r; ++a) i += l[e[a]];
              return i;
            }
            function utf16leSlice(e, t, r) {
              for (var n = e.slice(t, r), i = "", a = 0; a < n.length; a += 2)
                i += String.fromCharCode(n[a] + 256 * n[a + 1]);
              return i;
            }
            function checkOffset(e, t, r) {
              if (e % 1 != 0 || e < 0)
                throw new RangeError("offset is not uint");
              if (e + t > r)
                throw new RangeError("Trying to access beyond buffer length");
            }
            function checkInt(e, r, n, i, a, o) {
              if (!t.isBuffer(e))
                throw new TypeError(
                  '"buffer" argument must be a Buffer instance'
                );
              if (r > a || r < o)
                throw new RangeError('"value" argument is out of bounds');
              if (n + i > e.length) throw new RangeError("Index out of range");
            }
            function checkIEEE754(e, t, r, n, i, a) {
              if (r + n > e.length) throw new RangeError("Index out of range");
              if (r < 0) throw new RangeError("Index out of range");
            }
            function writeFloat(e, t, r, n, a) {
              return (
                (t = +t),
                (r >>>= 0),
                a || checkIEEE754(e, 0, r, 4),
                i.write(e, t, r, n, 23, 4),
                r + 4
              );
            }
            function writeDouble(e, t, r, n, a) {
              return (
                (t = +t),
                (r >>>= 0),
                a || checkIEEE754(e, 0, r, 8),
                i.write(e, t, r, n, 52, 8),
                r + 8
              );
            }
            (t.prototype.slice = function slice(e, r) {
              var n = this.length;
              (e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
                (r = void 0 === r ? n : ~~r) < 0
                  ? (r += n) < 0 && (r = 0)
                  : r > n && (r = n),
                r < e && (r = e);
              var i = this.subarray(e, r);
              return Object.setPrototypeOf(i, t.prototype), i;
            }),
              (t.prototype.readUIntLE = function readUIntLE(e, t, r) {
                (e >>>= 0), (t >>>= 0), r || checkOffset(e, t, this.length);
                for (var n = this[e], i = 1, a = 0; ++a < t && (i *= 256); )
                  n += this[e + a] * i;
                return n;
              }),
              (t.prototype.readUIntBE = function readUIntBE(e, t, r) {
                (e >>>= 0), (t >>>= 0), r || checkOffset(e, t, this.length);
                for (var n = this[e + --t], i = 1; t > 0 && (i *= 256); )
                  n += this[e + --t] * i;
                return n;
              }),
              (t.prototype.readUInt8 = function readUInt8(e, t) {
                return (e >>>= 0), t || checkOffset(e, 1, this.length), this[e];
              }),
              (t.prototype.readUInt16LE = function readUInt16LE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 2, this.length),
                  this[e] | (this[e + 1] << 8)
                );
              }),
              (t.prototype.readUInt16BE = function readUInt16BE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 2, this.length),
                  (this[e] << 8) | this[e + 1]
                );
              }),
              (t.prototype.readUInt32LE = function readUInt32LE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 4, this.length),
                  (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                    16777216 * this[e + 3]
                );
              }),
              (t.prototype.readUInt32BE = function readUInt32BE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 4, this.length),
                  16777216 * this[e] +
                    ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
                );
              }),
              (t.prototype.readIntLE = function readIntLE(e, t, r) {
                (e >>>= 0), (t >>>= 0), r || checkOffset(e, t, this.length);
                for (var n = this[e], i = 1, a = 0; ++a < t && (i *= 256); )
                  n += this[e + a] * i;
                return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n;
              }),
              (t.prototype.readIntBE = function readIntBE(e, t, r) {
                (e >>>= 0), (t >>>= 0), r || checkOffset(e, t, this.length);
                for (var n = t, i = 1, a = this[e + --n]; n > 0 && (i *= 256); )
                  a += this[e + --n] * i;
                return a >= (i *= 128) && (a -= Math.pow(2, 8 * t)), a;
              }),
              (t.prototype.readInt8 = function readInt8(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 1, this.length),
                  128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                );
              }),
              (t.prototype.readInt16LE = function readInt16LE(e, t) {
                (e >>>= 0), t || checkOffset(e, 2, this.length);
                var r = this[e] | (this[e + 1] << 8);
                return 32768 & r ? 4294901760 | r : r;
              }),
              (t.prototype.readInt16BE = function readInt16BE(e, t) {
                (e >>>= 0), t || checkOffset(e, 2, this.length);
                var r = this[e + 1] | (this[e] << 8);
                return 32768 & r ? 4294901760 | r : r;
              }),
              (t.prototype.readInt32LE = function readInt32LE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 4, this.length),
                  this[e] |
                    (this[e + 1] << 8) |
                    (this[e + 2] << 16) |
                    (this[e + 3] << 24)
                );
              }),
              (t.prototype.readInt32BE = function readInt32BE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 4, this.length),
                  (this[e] << 24) |
                    (this[e + 1] << 16) |
                    (this[e + 2] << 8) |
                    this[e + 3]
                );
              }),
              (t.prototype.readFloatLE = function readFloatLE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 4, this.length),
                  i.read(this, e, !0, 23, 4)
                );
              }),
              (t.prototype.readFloatBE = function readFloatBE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 4, this.length),
                  i.read(this, e, !1, 23, 4)
                );
              }),
              (t.prototype.readDoubleLE = function readDoubleLE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 8, this.length),
                  i.read(this, e, !0, 52, 8)
                );
              }),
              (t.prototype.readDoubleBE = function readDoubleBE(e, t) {
                return (
                  (e >>>= 0),
                  t || checkOffset(e, 8, this.length),
                  i.read(this, e, !1, 52, 8)
                );
              }),
              (t.prototype.writeUIntLE = function writeUIntLE(e, t, r, n) {
                ((e = +e), (t >>>= 0), (r >>>= 0), n) ||
                  checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var i = 1,
                  a = 0;
                for (this[t] = 255 & e; ++a < r && (i *= 256); )
                  this[t + a] = (e / i) & 255;
                return t + r;
              }),
              (t.prototype.writeUIntBE = function writeUIntBE(e, t, r, n) {
                ((e = +e), (t >>>= 0), (r >>>= 0), n) ||
                  checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                var i = r - 1,
                  a = 1;
                for (this[t + i] = 255 & e; --i >= 0 && (a *= 256); )
                  this[t + i] = (e / a) & 255;
                return t + r;
              }),
              (t.prototype.writeUInt8 = function writeUInt8(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 1, 255, 0),
                  (this[t] = 255 & e),
                  t + 1
                );
              }),
              (t.prototype.writeUInt16LE = function writeUInt16LE(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 2, 65535, 0),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  t + 2
                );
              }),
              (t.prototype.writeUInt16BE = function writeUInt16BE(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 2, 65535, 0),
                  (this[t] = e >>> 8),
                  (this[t + 1] = 255 & e),
                  t + 2
                );
              }),
              (t.prototype.writeUInt32LE = function writeUInt32LE(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 4, 4294967295, 0),
                  (this[t + 3] = e >>> 24),
                  (this[t + 2] = e >>> 16),
                  (this[t + 1] = e >>> 8),
                  (this[t] = 255 & e),
                  t + 4
                );
              }),
              (t.prototype.writeUInt32BE = function writeUInt32BE(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 4, 4294967295, 0),
                  (this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e),
                  t + 4
                );
              }),
              (t.prototype.writeIntLE = function writeIntLE(e, t, r, n) {
                if (((e = +e), (t >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * r - 1);
                  checkInt(this, e, t, r, i - 1, -i);
                }
                var a = 0,
                  o = 1,
                  s = 0;
                for (this[t] = 255 & e; ++a < r && (o *= 256); )
                  e < 0 && 0 === s && 0 !== this[t + a - 1] && (s = 1),
                    (this[t + a] = (((e / o) >> 0) - s) & 255);
                return t + r;
              }),
              (t.prototype.writeIntBE = function writeIntBE(e, t, r, n) {
                if (((e = +e), (t >>>= 0), !n)) {
                  var i = Math.pow(2, 8 * r - 1);
                  checkInt(this, e, t, r, i - 1, -i);
                }
                var a = r - 1,
                  o = 1,
                  s = 0;
                for (this[t + a] = 255 & e; --a >= 0 && (o *= 256); )
                  e < 0 && 0 === s && 0 !== this[t + a + 1] && (s = 1),
                    (this[t + a] = (((e / o) >> 0) - s) & 255);
                return t + r;
              }),
              (t.prototype.writeInt8 = function writeInt8(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 1, 127, -128),
                  e < 0 && (e = 255 + e + 1),
                  (this[t] = 255 & e),
                  t + 1
                );
              }),
              (t.prototype.writeInt16LE = function writeInt16LE(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 2, 32767, -32768),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  t + 2
                );
              }),
              (t.prototype.writeInt16BE = function writeInt16BE(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 2, 32767, -32768),
                  (this[t] = e >>> 8),
                  (this[t + 1] = 255 & e),
                  t + 2
                );
              }),
              (t.prototype.writeInt32LE = function writeInt32LE(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 4, 2147483647, -2147483648),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  (this[t + 2] = e >>> 16),
                  (this[t + 3] = e >>> 24),
                  t + 4
                );
              }),
              (t.prototype.writeInt32BE = function writeInt32BE(e, t, r) {
                return (
                  (e = +e),
                  (t >>>= 0),
                  r || checkInt(this, e, t, 4, 2147483647, -2147483648),
                  e < 0 && (e = 4294967295 + e + 1),
                  (this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e),
                  t + 4
                );
              }),
              (t.prototype.writeFloatLE = function writeFloatLE(e, t, r) {
                return writeFloat(this, e, t, !0, r);
              }),
              (t.prototype.writeFloatBE = function writeFloatBE(e, t, r) {
                return writeFloat(this, e, t, !1, r);
              }),
              (t.prototype.writeDoubleLE = function writeDoubleLE(e, t, r) {
                return writeDouble(this, e, t, !0, r);
              }),
              (t.prototype.writeDoubleBE = function writeDoubleBE(e, t, r) {
                return writeDouble(this, e, t, !1, r);
              }),
              (t.prototype.copy = function copy(e, r, n, i) {
                if (!t.isBuffer(e))
                  throw new TypeError("argument should be a Buffer");
                if (
                  (n || (n = 0),
                  i || 0 === i || (i = this.length),
                  r >= e.length && (r = e.length),
                  r || (r = 0),
                  i > 0 && i < n && (i = n),
                  i === n)
                )
                  return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (r < 0) throw new RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length)
                  throw new RangeError("Index out of range");
                if (i < 0) throw new RangeError("sourceEnd out of bounds");
                i > this.length && (i = this.length),
                  e.length - r < i - n && (i = e.length - r + n);
                var a = i - n;
                if (
                  this === e &&
                  "function" == typeof Uint8Array.prototype.copyWithin
                )
                  this.copyWithin(r, n, i);
                else if (this === e && n < r && r < i)
                  for (var o = a - 1; o >= 0; --o) e[o + r] = this[o + n];
                else Uint8Array.prototype.set.call(e, this.subarray(n, i), r);
                return a;
              }),
              (t.prototype.fill = function fill(e, r, n, i) {
                if ("string" == typeof e) {
                  if (
                    ("string" == typeof r
                      ? ((i = r), (r = 0), (n = this.length))
                      : "string" == typeof n && ((i = n), (n = this.length)),
                    void 0 !== i && "string" != typeof i)
                  )
                    throw new TypeError("encoding must be a string");
                  if ("string" == typeof i && !t.isEncoding(i))
                    throw new TypeError("Unknown encoding: " + i);
                  if (1 === e.length) {
                    var a = e.charCodeAt(0);
                    (("utf8" === i && a < 128) || "latin1" === i) && (e = a);
                  }
                } else
                  "number" == typeof e
                    ? (e &= 255)
                    : "boolean" == typeof e && (e = Number(e));
                if (r < 0 || this.length < r || this.length < n)
                  throw new RangeError("Out of range index");
                if (n <= r) return this;
                var o;
                if (
                  ((r >>>= 0),
                  (n = void 0 === n ? this.length : n >>> 0),
                  e || (e = 0),
                  "number" == typeof e)
                )
                  for (o = r; o < n; ++o) this[o] = e;
                else {
                  var s = t.isBuffer(e) ? e : t.from(e, i),
                    u = s.length;
                  if (0 === u)
                    throw new TypeError(
                      'The value "' + e + '" is invalid for argument "value"'
                    );
                  for (o = 0; o < n - r; ++o) this[o + r] = s[o % u];
                }
                return this;
              });
            var u = /[^+/0-9A-Za-z-_]/g;
            function utf8ToBytes(e, t) {
              var r;
              t = t || 1 / 0;
              for (var n = e.length, i = null, a = [], o = 0; o < n; ++o) {
                if ((r = e.charCodeAt(o)) > 55295 && r < 57344) {
                  if (!i) {
                    if (r > 56319) {
                      (t -= 3) > -1 && a.push(239, 191, 189);
                      continue;
                    }
                    if (o + 1 === n) {
                      (t -= 3) > -1 && a.push(239, 191, 189);
                      continue;
                    }
                    i = r;
                    continue;
                  }
                  if (r < 56320) {
                    (t -= 3) > -1 && a.push(239, 191, 189), (i = r);
                    continue;
                  }
                  r = 65536 + (((i - 55296) << 10) | (r - 56320));
                } else i && (t -= 3) > -1 && a.push(239, 191, 189);
                if (((i = null), r < 128)) {
                  if ((t -= 1) < 0) break;
                  a.push(r);
                } else if (r < 2048) {
                  if ((t -= 2) < 0) break;
                  a.push((r >> 6) | 192, (63 & r) | 128);
                } else if (r < 65536) {
                  if ((t -= 3) < 0) break;
                  a.push(
                    (r >> 12) | 224,
                    ((r >> 6) & 63) | 128,
                    (63 & r) | 128
                  );
                } else {
                  if (!(r < 1114112)) throw new Error("Invalid code point");
                  if ((t -= 4) < 0) break;
                  a.push(
                    (r >> 18) | 240,
                    ((r >> 12) & 63) | 128,
                    ((r >> 6) & 63) | 128,
                    (63 & r) | 128
                  );
                }
              }
              return a;
            }
            function base64ToBytes(e) {
              return n.toByteArray(
                (function base64clean(e) {
                  if (
                    (e = (e = e.split("=")[0]).trim().replace(u, "")).length < 2
                  )
                    return "";
                  for (; e.length % 4 != 0; ) e += "=";
                  return e;
                })(e)
              );
            }
            function blitBuffer(e, t, r, n) {
              for (
                var i = 0;
                i < n && !(i + r >= t.length || i >= e.length);
                ++i
              )
                t[i + r] = e[i];
              return i;
            }
            function isInstance(e, t) {
              return (
                e instanceof t ||
                (null != e &&
                  null != e.constructor &&
                  null != e.constructor.name &&
                  e.constructor.name === t.name)
              );
            }
            function numberIsNaN(e) {
              return e != e;
            }
            var l = (function () {
              for (var e = new Array(256), t = 0; t < 16; ++t)
                for (var r = 16 * t, n = 0; n < 16; ++n)
                  e[r + n] = "0123456789abcdef"[t] + "0123456789abcdef"[n];
              return e;
            })();
          }.call(this, e("buffer").Buffer));
        },
        { "base64-js": 2, buffer: 5, ieee754: 11 },
      ],
      6: [
        function (e, t, r) {
          t.exports = {
            100: "Continue",
            101: "Switching Protocols",
            102: "Processing",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            207: "Multi-Status",
            208: "Already Reported",
            226: "IM Used",
            300: "Multiple Choices",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            307: "Temporary Redirect",
            308: "Permanent Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Payload Too Large",
            414: "URI Too Long",
            415: "Unsupported Media Type",
            416: "Range Not Satisfiable",
            417: "Expectation Failed",
            418: "I'm a teapot",
            421: "Misdirected Request",
            422: "Unprocessable Entity",
            423: "Locked",
            424: "Failed Dependency",
            425: "Unordered Collection",
            426: "Upgrade Required",
            428: "Precondition Required",
            429: "Too Many Requests",
            431: "Request Header Fields Too Large",
            451: "Unavailable For Legal Reasons",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported",
            506: "Variant Also Negotiates",
            507: "Insufficient Storage",
            508: "Loop Detected",
            509: "Bandwidth Limit Exceeded",
            510: "Not Extended",
            511: "Network Authentication Required",
          };
        },
        {},
      ],
      7: [
        function (e, t, r) {
          var n = (function (e) {
            function F() {
              (this.fetch = !1), (this.DOMException = e.DOMException);
            }
            return (F.prototype = e), new F();
          })("undefined" != typeof self ? self : this);
          !(function (e) {
            !(function (t) {
              var r = {
                searchParams: "URLSearchParams" in e,
                iterable: "Symbol" in e && "iterator" in Symbol,
                blob:
                  "FileReader" in e &&
                  "Blob" in e &&
                  (function () {
                    try {
                      return new Blob(), !0;
                    } catch (e) {
                      return !1;
                    }
                  })(),
                formData: "FormData" in e,
                arrayBuffer: "ArrayBuffer" in e,
              };
              if (r.arrayBuffer)
                var n = [
                    "[object Int8Array]",
                    "[object Uint8Array]",
                    "[object Uint8ClampedArray]",
                    "[object Int16Array]",
                    "[object Uint16Array]",
                    "[object Int32Array]",
                    "[object Uint32Array]",
                    "[object Float32Array]",
                    "[object Float64Array]",
                  ],
                  i =
                    ArrayBuffer.isView ||
                    function (e) {
                      return (
                        e && n.indexOf(Object.prototype.toString.call(e)) > -1
                      );
                    };
              function normalizeName(e) {
                if (
                  ("string" != typeof e && (e = String(e)),
                  /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))
                )
                  throw new TypeError("Invalid character in header field name");
                return e.toLowerCase();
              }
              function normalizeValue(e) {
                return "string" != typeof e && (e = String(e)), e;
              }
              function iteratorFor(e) {
                var t = {
                  next: function () {
                    var t = e.shift();
                    return { done: void 0 === t, value: t };
                  },
                };
                return (
                  r.iterable &&
                    (t[Symbol.iterator] = function () {
                      return t;
                    }),
                  t
                );
              }
              function Headers(e) {
                (this.map = {}),
                  e instanceof Headers
                    ? e.forEach(function (e, t) {
                        this.append(t, e);
                      }, this)
                    : Array.isArray(e)
                    ? e.forEach(function (e) {
                        this.append(e[0], e[1]);
                      }, this)
                    : e &&
                      Object.getOwnPropertyNames(e).forEach(function (t) {
                        this.append(t, e[t]);
                      }, this);
              }
              function consumed(e) {
                if (e.bodyUsed)
                  return Promise.reject(new TypeError("Already read"));
                e.bodyUsed = !0;
              }
              function fileReaderReady(e) {
                return new Promise(function (t, r) {
                  (e.onload = function () {
                    t(e.result);
                  }),
                    (e.onerror = function () {
                      r(e.error);
                    });
                });
              }
              function readBlobAsArrayBuffer(e) {
                var t = new FileReader(),
                  r = fileReaderReady(t);
                return t.readAsArrayBuffer(e), r;
              }
              function bufferClone(e) {
                if (e.slice) return e.slice(0);
                var t = new Uint8Array(e.byteLength);
                return t.set(new Uint8Array(e)), t.buffer;
              }
              function Body() {
                return (
                  (this.bodyUsed = !1),
                  (this._initBody = function (e) {
                    (this._bodyInit = e),
                      e
                        ? "string" == typeof e
                          ? (this._bodyText = e)
                          : r.blob && Blob.prototype.isPrototypeOf(e)
                          ? (this._bodyBlob = e)
                          : r.formData && FormData.prototype.isPrototypeOf(e)
                          ? (this._bodyFormData = e)
                          : r.searchParams &&
                            URLSearchParams.prototype.isPrototypeOf(e)
                          ? (this._bodyText = e.toString())
                          : r.arrayBuffer &&
                            r.blob &&
                            (function isDataView(e) {
                              return e && DataView.prototype.isPrototypeOf(e);
                            })(e)
                          ? ((this._bodyArrayBuffer = bufferClone(e.buffer)),
                            (this._bodyInit = new Blob([
                              this._bodyArrayBuffer,
                            ])))
                          : r.arrayBuffer &&
                            (ArrayBuffer.prototype.isPrototypeOf(e) || i(e))
                          ? (this._bodyArrayBuffer = bufferClone(e))
                          : (this._bodyText = e = Object.prototype.toString.call(
                              e
                            ))
                        : (this._bodyText = ""),
                      this.headers.get("content-type") ||
                        ("string" == typeof e
                          ? this.headers.set(
                              "content-type",
                              "text/plain;charset=UTF-8"
                            )
                          : this._bodyBlob && this._bodyBlob.type
                          ? this.headers.set(
                              "content-type",
                              this._bodyBlob.type
                            )
                          : r.searchParams &&
                            URLSearchParams.prototype.isPrototypeOf(e) &&
                            this.headers.set(
                              "content-type",
                              "application/x-www-form-urlencoded;charset=UTF-8"
                            ));
                  }),
                  r.blob &&
                    ((this.blob = function () {
                      var e = consumed(this);
                      if (e) return e;
                      if (this._bodyBlob)
                        return Promise.resolve(this._bodyBlob);
                      if (this._bodyArrayBuffer)
                        return Promise.resolve(
                          new Blob([this._bodyArrayBuffer])
                        );
                      if (this._bodyFormData)
                        throw new Error("could not read FormData body as blob");
                      return Promise.resolve(new Blob([this._bodyText]));
                    }),
                    (this.arrayBuffer = function () {
                      return this._bodyArrayBuffer
                        ? consumed(this) ||
                            Promise.resolve(this._bodyArrayBuffer)
                        : this.blob().then(readBlobAsArrayBuffer);
                    })),
                  (this.text = function () {
                    var e = consumed(this);
                    if (e) return e;
                    if (this._bodyBlob)
                      return (function readBlobAsText(e) {
                        var t = new FileReader(),
                          r = fileReaderReady(t);
                        return t.readAsText(e), r;
                      })(this._bodyBlob);
                    if (this._bodyArrayBuffer)
                      return Promise.resolve(
                        (function readArrayBufferAsText(e) {
                          for (
                            var t = new Uint8Array(e),
                              r = new Array(t.length),
                              n = 0;
                            n < t.length;
                            n++
                          )
                            r[n] = String.fromCharCode(t[n]);
                          return r.join("");
                        })(this._bodyArrayBuffer)
                      );
                    if (this._bodyFormData)
                      throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText);
                  }),
                  r.formData &&
                    (this.formData = function () {
                      return this.text().then(decode);
                    }),
                  (this.json = function () {
                    return this.text().then(JSON.parse);
                  }),
                  this
                );
              }
              (Headers.prototype.append = function (e, t) {
                (e = normalizeName(e)), (t = normalizeValue(t));
                var r = this.map[e];
                this.map[e] = r ? r + ", " + t : t;
              }),
                (Headers.prototype.delete = function (e) {
                  delete this.map[normalizeName(e)];
                }),
                (Headers.prototype.get = function (e) {
                  return (
                    (e = normalizeName(e)), this.has(e) ? this.map[e] : null
                  );
                }),
                (Headers.prototype.has = function (e) {
                  return this.map.hasOwnProperty(normalizeName(e));
                }),
                (Headers.prototype.set = function (e, t) {
                  this.map[normalizeName(e)] = normalizeValue(t);
                }),
                (Headers.prototype.forEach = function (e, t) {
                  for (var r in this.map)
                    this.map.hasOwnProperty(r) &&
                      e.call(t, this.map[r], r, this);
                }),
                (Headers.prototype.keys = function () {
                  var e = [];
                  return (
                    this.forEach(function (t, r) {
                      e.push(r);
                    }),
                    iteratorFor(e)
                  );
                }),
                (Headers.prototype.values = function () {
                  var e = [];
                  return (
                    this.forEach(function (t) {
                      e.push(t);
                    }),
                    iteratorFor(e)
                  );
                }),
                (Headers.prototype.entries = function () {
                  var e = [];
                  return (
                    this.forEach(function (t, r) {
                      e.push([r, t]);
                    }),
                    iteratorFor(e)
                  );
                }),
                r.iterable &&
                  (Headers.prototype[Symbol.iterator] =
                    Headers.prototype.entries);
              var a = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
              function Request(e, t) {
                var r = (t = t || {}).body;
                if (e instanceof Request) {
                  if (e.bodyUsed) throw new TypeError("Already read");
                  (this.url = e.url),
                    (this.credentials = e.credentials),
                    t.headers || (this.headers = new Headers(e.headers)),
                    (this.method = e.method),
                    (this.mode = e.mode),
                    (this.signal = e.signal),
                    r ||
                      null == e._bodyInit ||
                      ((r = e._bodyInit), (e.bodyUsed = !0));
                } else this.url = String(e);
                if (
                  ((this.credentials =
                    t.credentials || this.credentials || "same-origin"),
                  (!t.headers && this.headers) ||
                    (this.headers = new Headers(t.headers)),
                  (this.method = (function normalizeMethod(e) {
                    var t = e.toUpperCase();
                    return a.indexOf(t) > -1 ? t : e;
                  })(t.method || this.method || "GET")),
                  (this.mode = t.mode || this.mode || null),
                  (this.signal = t.signal || this.signal),
                  (this.referrer = null),
                  ("GET" === this.method || "HEAD" === this.method) && r)
                )
                  throw new TypeError(
                    "Body not allowed for GET or HEAD requests"
                  );
                this._initBody(r);
              }
              function decode(e) {
                var t = new FormData();
                return (
                  e
                    .trim()
                    .split("&")
                    .forEach(function (e) {
                      if (e) {
                        var r = e.split("="),
                          n = r.shift().replace(/\+/g, " "),
                          i = r.join("=").replace(/\+/g, " ");
                        t.append(decodeURIComponent(n), decodeURIComponent(i));
                      }
                    }),
                  t
                );
              }
              function Response(e, t) {
                t || (t = {}),
                  (this.type = "default"),
                  (this.status = void 0 === t.status ? 200 : t.status),
                  (this.ok = this.status >= 200 && this.status < 300),
                  (this.statusText = "statusText" in t ? t.statusText : "OK"),
                  (this.headers = new Headers(t.headers)),
                  (this.url = t.url || ""),
                  this._initBody(e);
              }
              (Request.prototype.clone = function () {
                return new Request(this, { body: this._bodyInit });
              }),
                Body.call(Request.prototype),
                Body.call(Response.prototype),
                (Response.prototype.clone = function () {
                  return new Response(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new Headers(this.headers),
                    url: this.url,
                  });
                }),
                (Response.error = function () {
                  var e = new Response(null, { status: 0, statusText: "" });
                  return (e.type = "error"), e;
                });
              var o = [301, 302, 303, 307, 308];
              (Response.redirect = function (e, t) {
                if (-1 === o.indexOf(t))
                  throw new RangeError("Invalid status code");
                return new Response(null, {
                  status: t,
                  headers: { location: e },
                });
              }),
                (t.DOMException = e.DOMException);
              try {
                new t.DOMException();
              } catch (e) {
                (t.DOMException = function (e, t) {
                  (this.message = e), (this.name = t);
                  var r = Error(e);
                  this.stack = r.stack;
                }),
                  (t.DOMException.prototype = Object.create(Error.prototype)),
                  (t.DOMException.prototype.constructor = t.DOMException);
              }
              function fetch(e, n) {
                return new Promise(function (i, a) {
                  var o = new Request(e, n);
                  if (o.signal && o.signal.aborted)
                    return a(new t.DOMException("Aborted", "AbortError"));
                  var s = new XMLHttpRequest();
                  function abortXhr() {
                    s.abort();
                  }
                  (s.onload = function () {
                    var e,
                      t,
                      r = {
                        status: s.status,
                        statusText: s.statusText,
                        headers:
                          ((e = s.getAllResponseHeaders() || ""),
                          (t = new Headers()),
                          e
                            .replace(/\r?\n[\t ]+/g, " ")
                            .split(/\r?\n/)
                            .forEach(function (e) {
                              var r = e.split(":"),
                                n = r.shift().trim();
                              if (n) {
                                var i = r.join(":").trim();
                                t.append(n, i);
                              }
                            }),
                          t),
                      };
                    r.url =
                      "responseURL" in s
                        ? s.responseURL
                        : r.headers.get("X-Request-URL");
                    var n = "response" in s ? s.response : s.responseText;
                    i(new Response(n, r));
                  }),
                    (s.onerror = function () {
                      a(new TypeError("Network request failed"));
                    }),
                    (s.ontimeout = function () {
                      a(new TypeError("Network request failed"));
                    }),
                    (s.onabort = function () {
                      a(new t.DOMException("Aborted", "AbortError"));
                    }),
                    s.open(o.method, o.url, !0),
                    "include" === o.credentials
                      ? (s.withCredentials = !0)
                      : "omit" === o.credentials && (s.withCredentials = !1),
                    "responseType" in s && r.blob && (s.responseType = "blob"),
                    o.headers.forEach(function (e, t) {
                      s.setRequestHeader(t, e);
                    }),
                    o.signal &&
                      (o.signal.addEventListener("abort", abortXhr),
                      (s.onreadystatechange = function () {
                        4 === s.readyState &&
                          o.signal.removeEventListener("abort", abortXhr);
                      })),
                    s.send(void 0 === o._bodyInit ? null : o._bodyInit);
                });
              }
              (fetch.polyfill = !0),
                e.fetch ||
                  ((e.fetch = fetch),
                  (e.Headers = Headers),
                  (e.Request = Request),
                  (e.Response = Response)),
                (t.Headers = Headers),
                (t.Request = Request),
                (t.Response = Response),
                (t.fetch = fetch);
            })({});
          })(n),
            delete n.fetch.polyfill,
            ((r = n.fetch).default = n.fetch),
            (r.fetch = n.fetch),
            (r.Headers = n.Headers),
            (r.Request = n.Request),
            (r.Response = n.Response),
            (t.exports = r);
        },
        {},
      ],
      8: [
        function (e, t, r) {
          var n =
              Object.create ||
              function objectCreatePolyfill(e) {
                var F = function () {};
                return (F.prototype = e), new F();
              },
            i =
              Object.keys ||
              function objectKeysPolyfill(e) {
                var t = [];
                for (var r in e)
                  Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
                return r;
              },
            a =
              Function.prototype.bind ||
              function functionBindPolyfill(e) {
                var t = this;
                return function () {
                  return t.apply(e, arguments);
                };
              };
          function EventEmitter() {
            (this._events &&
              Object.prototype.hasOwnProperty.call(this, "_events")) ||
              ((this._events = n(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }
          (t.exports = EventEmitter),
            (EventEmitter.EventEmitter = EventEmitter),
            (EventEmitter.prototype._events = void 0),
            (EventEmitter.prototype._maxListeners = void 0);
          var o,
            s = 10;
          try {
            var u = {};
            Object.defineProperty &&
              Object.defineProperty(u, "x", { value: 0 }),
              (o = 0 === u.x);
          } catch (e) {
            o = !1;
          }
          function $getMaxListeners(e) {
            return void 0 === e._maxListeners
              ? EventEmitter.defaultMaxListeners
              : e._maxListeners;
          }
          function emitNone(e, t, r) {
            if (t) e.call(r);
            else
              for (var n = e.length, i = arrayClone(e, n), a = 0; a < n; ++a)
                i[a].call(r);
          }
          function emitOne(e, t, r, n) {
            if (t) e.call(r, n);
            else
              for (var i = e.length, a = arrayClone(e, i), o = 0; o < i; ++o)
                a[o].call(r, n);
          }
          function emitTwo(e, t, r, n, i) {
            if (t) e.call(r, n, i);
            else
              for (var a = e.length, o = arrayClone(e, a), s = 0; s < a; ++s)
                o[s].call(r, n, i);
          }
          function emitThree(e, t, r, n, i, a) {
            if (t) e.call(r, n, i, a);
            else
              for (var o = e.length, s = arrayClone(e, o), u = 0; u < o; ++u)
                s[u].call(r, n, i, a);
          }
          function emitMany(e, t, r, n) {
            if (t) e.apply(r, n);
            else
              for (var i = e.length, a = arrayClone(e, i), o = 0; o < i; ++o)
                a[o].apply(r, n);
          }
          function _addListener(e, t, r, i) {
            var a, o, s;
            if ("function" != typeof r)
              throw new TypeError('"listener" argument must be a function');
            if (
              ((o = e._events)
                ? (o.newListener &&
                    (e.emit("newListener", t, r.listener ? r.listener : r),
                    (o = e._events)),
                  (s = o[t]))
                : ((o = e._events = n(null)), (e._eventsCount = 0)),
              s)
            ) {
              if (
                ("function" == typeof s
                  ? (s = o[t] = i ? [r, s] : [s, r])
                  : i
                  ? s.unshift(r)
                  : s.push(r),
                !s.warned && (a = $getMaxListeners(e)) && a > 0 && s.length > a)
              ) {
                s.warned = !0;
                var u = new Error(
                  "Possible EventEmitter memory leak detected. " +
                    s.length +
                    ' "' +
                    String(t) +
                    '" listeners added. Use emitter.setMaxListeners() to increase limit.'
                );
                (u.name = "MaxListenersExceededWarning"),
                  (u.emitter = e),
                  (u.type = t),
                  (u.count = s.length),
                  "object" == typeof console &&
                    console.warn &&
                    console.warn("%s: %s", u.name, u.message);
              }
            } else (s = o[t] = r), ++e._eventsCount;
            return e;
          }
          function onceWrapper() {
            if (!this.fired)
              switch (
                (this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                arguments.length)
              ) {
                case 0:
                  return this.listener.call(this.target);
                case 1:
                  return this.listener.call(this.target, arguments[0]);
                case 2:
                  return this.listener.call(
                    this.target,
                    arguments[0],
                    arguments[1]
                  );
                case 3:
                  return this.listener.call(
                    this.target,
                    arguments[0],
                    arguments[1],
                    arguments[2]
                  );
                default:
                  for (
                    var e = new Array(arguments.length), t = 0;
                    t < e.length;
                    ++t
                  )
                    e[t] = arguments[t];
                  this.listener.apply(this.target, e);
              }
          }
          function _onceWrap(e, t, r) {
            var n = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: r,
              },
              i = a.call(onceWrapper, n);
            return (i.listener = r), (n.wrapFn = i), i;
          }
          function _listeners(e, t, r) {
            var n = e._events;
            if (!n) return [];
            var i = n[t];
            return i
              ? "function" == typeof i
                ? r
                  ? [i.listener || i]
                  : [i]
                : r
                ? (function unwrapListeners(e) {
                    for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                      t[r] = e[r].listener || e[r];
                    return t;
                  })(i)
                : arrayClone(i, i.length)
              : [];
          }
          function listenerCount(e) {
            var t = this._events;
            if (t) {
              var r = t[e];
              if ("function" == typeof r) return 1;
              if (r) return r.length;
            }
            return 0;
          }
          function arrayClone(e, t) {
            for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
            return r;
          }
          o
            ? Object.defineProperty(EventEmitter, "defaultMaxListeners", {
                enumerable: !0,
                get: function () {
                  return s;
                },
                set: function (e) {
                  if ("number" != typeof e || e < 0 || e != e)
                    throw new TypeError(
                      '"defaultMaxListeners" must be a positive number'
                    );
                  s = e;
                },
              })
            : (EventEmitter.defaultMaxListeners = s),
            (EventEmitter.prototype.setMaxListeners = function setMaxListeners(
              e
            ) {
              if ("number" != typeof e || e < 0 || isNaN(e))
                throw new TypeError('"n" argument must be a positive number');
              return (this._maxListeners = e), this;
            }),
            (EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
              return $getMaxListeners(this);
            }),
            (EventEmitter.prototype.emit = function emit(e) {
              var t,
                r,
                n,
                i,
                a,
                o,
                s = "error" === e;
              if ((o = this._events)) s = s && null == o.error;
              else if (!s) return !1;
              if (s) {
                if (
                  (arguments.length > 1 && (t = arguments[1]),
                  t instanceof Error)
                )
                  throw t;
                var u = new Error('Unhandled "error" event. (' + t + ")");
                throw ((u.context = t), u);
              }
              if (!(r = o[e])) return !1;
              var l = "function" == typeof r;
              switch ((n = arguments.length)) {
                case 1:
                  emitNone(r, l, this);
                  break;
                case 2:
                  emitOne(r, l, this, arguments[1]);
                  break;
                case 3:
                  emitTwo(r, l, this, arguments[1], arguments[2]);
                  break;
                case 4:
                  emitThree(
                    r,
                    l,
                    this,
                    arguments[1],
                    arguments[2],
                    arguments[3]
                  );
                  break;
                default:
                  for (i = new Array(n - 1), a = 1; a < n; a++)
                    i[a - 1] = arguments[a];
                  emitMany(r, l, this, i);
              }
              return !0;
            }),
            (EventEmitter.prototype.addListener = function addListener(e, t) {
              return _addListener(this, e, t, !1);
            }),
            (EventEmitter.prototype.on = EventEmitter.prototype.addListener),
            (EventEmitter.prototype.prependListener = function prependListener(
              e,
              t
            ) {
              return _addListener(this, e, t, !0);
            }),
            (EventEmitter.prototype.once = function once(e, t) {
              if ("function" != typeof t)
                throw new TypeError('"listener" argument must be a function');
              return this.on(e, _onceWrap(this, e, t)), this;
            }),
            (EventEmitter.prototype.prependOnceListener = function prependOnceListener(
              e,
              t
            ) {
              if ("function" != typeof t)
                throw new TypeError('"listener" argument must be a function');
              return this.prependListener(e, _onceWrap(this, e, t)), this;
            }),
            (EventEmitter.prototype.removeListener = function removeListener(
              e,
              t
            ) {
              var r, i, a, o, s;
              if ("function" != typeof t)
                throw new TypeError('"listener" argument must be a function');
              if (!(i = this._events)) return this;
              if (!(r = i[e])) return this;
              if (r === t || r.listener === t)
                0 == --this._eventsCount
                  ? (this._events = n(null))
                  : (delete i[e],
                    i.removeListener &&
                      this.emit("removeListener", e, r.listener || t));
              else if ("function" != typeof r) {
                for (a = -1, o = r.length - 1; o >= 0; o--)
                  if (r[o] === t || r[o].listener === t) {
                    (s = r[o].listener), (a = o);
                    break;
                  }
                if (a < 0) return this;
                0 === a
                  ? r.shift()
                  : (function spliceOne(e, t) {
                      for (
                        var r = t, n = r + 1, i = e.length;
                        n < i;
                        r += 1, n += 1
                      )
                        e[r] = e[n];
                      e.pop();
                    })(r, a),
                  1 === r.length && (i[e] = r[0]),
                  i.removeListener && this.emit("removeListener", e, s || t);
              }
              return this;
            }),
            (EventEmitter.prototype.removeAllListeners = function removeAllListeners(
              e
            ) {
              var t, r, a;
              if (!(r = this._events)) return this;
              if (!r.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = n(null)), (this._eventsCount = 0))
                    : r[e] &&
                      (0 == --this._eventsCount
                        ? (this._events = n(null))
                        : delete r[e]),
                  this
                );
              if (0 === arguments.length) {
                var o,
                  s = i(r);
                for (a = 0; a < s.length; ++a)
                  "removeListener" !== (o = s[a]) && this.removeAllListeners(o);
                return (
                  this.removeAllListeners("removeListener"),
                  (this._events = n(null)),
                  (this._eventsCount = 0),
                  this
                );
              }
              if ("function" == typeof (t = r[e])) this.removeListener(e, t);
              else if (t)
                for (a = t.length - 1; a >= 0; a--)
                  this.removeListener(e, t[a]);
              return this;
            }),
            (EventEmitter.prototype.listeners = function listeners(e) {
              return _listeners(this, e, !0);
            }),
            (EventEmitter.prototype.rawListeners = function rawListeners(e) {
              return _listeners(this, e, !1);
            }),
            (EventEmitter.listenerCount = function (e, t) {
              return "function" == typeof e.listenerCount
                ? e.listenerCount(t)
                : listenerCount.call(e, t);
            }),
            (EventEmitter.prototype.listenerCount = listenerCount),
            (EventEmitter.prototype.eventNames = function eventNames() {
              return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
            });
        },
        {},
      ],
      9: [
        function (e, t, r) {
          "use strict";
          t.exports = function annotate(e) {
            if ("function" != typeof e)
              throw new Error(
                "Could not parse function signature for injection dependencies: Object is not a function"
              );
            if (!e.length) return [];
            var t =
              /^()\(?([^)=]*)\)? *=>/.exec(e + "") ||
              /^[^(]+([^ \(]*) *\(([^\)]*)\)/.exec(e + "");
            if (!t)
              throw new Error(
                "Could not parse function signature for injection dependencies: " +
                  e
              );
            var r = t[2]
              .replace(/\/\*[\S\s]*?\*\//g, " ")
              .replace(/\/\/.*/g, " ");
            function groupSubArguments(e, t, r) {
              return (
                t +
                r
                  .split(",")
                  .map(function (e) {
                    return e && e.trim();
                  })
                  .filter(Boolean)
                  .join("@")
              );
            }
            return (r = (r = r.replace(
              /(\{)([^}]*)\}/g,
              groupSubArguments
            )).replace(/(\[)([^}]*)\]/g, groupSubArguments))
              .split(",")
              .map(function (e) {
                return e && e.trim();
              })
              .map(function (e) {
                return "{" === e[0]
                  ? e.substring(1).split("@")
                  : "[" === e[0]
                  ? { items: e.substring(1).split("@") }
                  : e;
              })
              .filter(Boolean);
          };
        },
        {},
      ],
      10: [
        function (e, t, r) {
          var n = e("http"),
            i = e("url"),
            a = t.exports;
          for (var o in n) n.hasOwnProperty(o) && (a[o] = n[o]);
          function validateParams(e) {
            if (
              ("string" == typeof e && (e = i.parse(e)),
              e.protocol || (e.protocol = "https:"),
              "https:" !== e.protocol)
            )
              throw new Error(
                'Protocol "' + e.protocol + '" not supported. Expected "https:"'
              );
            return e;
          }
          (a.request = function (e, t) {
            return (e = validateParams(e)), n.request.call(this, e, t);
          }),
            (a.get = function (e, t) {
              return (e = validateParams(e)), n.get.call(this, e, t);
            });
        },
        { http: 22, url: 43 },
      ],
      11: [
        function (e, t, r) {
          (r.read = function (e, t, r, n, i) {
            var a,
              o,
              s = 8 * i - n - 1,
              u = (1 << s) - 1,
              l = u >> 1,
              c = -7,
              f = r ? i - 1 : 0,
              h = r ? -1 : 1,
              p = e[t + f];
            for (
              f += h, a = p & ((1 << -c) - 1), p >>= -c, c += s;
              c > 0;
              a = 256 * a + e[t + f], f += h, c -= 8
            );
            for (
              o = a & ((1 << -c) - 1), a >>= -c, c += n;
              c > 0;
              o = 256 * o + e[t + f], f += h, c -= 8
            );
            if (0 === a) a = 1 - l;
            else {
              if (a === u) return o ? NaN : (1 / 0) * (p ? -1 : 1);
              (o += Math.pow(2, n)), (a -= l);
            }
            return (p ? -1 : 1) * o * Math.pow(2, a - n);
          }),
            (r.write = function (e, t, r, n, i, a) {
              var o,
                s,
                u,
                l = 8 * a - i - 1,
                c = (1 << l) - 1,
                f = c >> 1,
                h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = n ? 0 : a - 1,
                d = n ? 1 : -1,
                y = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
              for (
                t = Math.abs(t),
                  isNaN(t) || t === 1 / 0
                    ? ((s = isNaN(t) ? 1 : 0), (o = c))
                    : ((o = Math.floor(Math.log(t) / Math.LN2)),
                      t * (u = Math.pow(2, -o)) < 1 && (o--, (u *= 2)),
                      (t += o + f >= 1 ? h / u : h * Math.pow(2, 1 - f)) * u >=
                        2 && (o++, (u /= 2)),
                      o + f >= c
                        ? ((s = 0), (o = c))
                        : o + f >= 1
                        ? ((s = (t * u - 1) * Math.pow(2, i)), (o += f))
                        : ((s = t * Math.pow(2, f - 1) * Math.pow(2, i)),
                          (o = 0)));
                i >= 8;
                e[r + p] = 255 & s, p += d, s /= 256, i -= 8
              );
              for (
                o = (o << i) | s, l += i;
                l > 0;
                e[r + p] = 255 & o, p += d, o /= 256, l -= 8
              );
              e[r + p - d] |= 128 * y;
            });
        },
        {},
      ],
      12: [
        function (e, t, r) {
          "function" == typeof Object.create
            ? (t.exports = function inherits(e, t) {
                t &&
                  ((e.super_ = t),
                  (e.prototype = Object.create(t.prototype, {
                    constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })));
              })
            : (t.exports = function inherits(e, t) {
                if (t) {
                  e.super_ = t;
                  var TempCtor = function () {};
                  (TempCtor.prototype = t.prototype),
                    (e.prototype = new TempCtor()),
                    (e.prototype.constructor = e);
                }
              });
        },
        {},
      ],
      13: [
        function (e, t, r) {
          /*
object-assign
(c) Sindre Sorhus
@license MIT
*/
          "use strict";
          var n = Object.getOwnPropertySymbols,
            i = Object.prototype.hasOwnProperty,
            a = Object.prototype.propertyIsEnumerable;
          function toObject(e) {
            if (null == e)
              throw new TypeError(
                "Object.assign cannot be called with null or undefined"
              );
            return Object(e);
          }
          t.exports = (function shouldUseNative() {
            try {
              if (!Object.assign) return !1;
              var e = new String("abc");
              if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
                return !1;
              for (var t = {}, r = 0; r < 10; r++)
                t["_" + String.fromCharCode(r)] = r;
              if (
                "0123456789" !==
                Object.getOwnPropertyNames(t)
                  .map(function (e) {
                    return t[e];
                  })
                  .join("")
              )
                return !1;
              var n = {};
              return (
                "abcdefghijklmnopqrst".split("").forEach(function (e) {
                  n[e] = e;
                }),
                "abcdefghijklmnopqrst" ===
                  Object.keys(Object.assign({}, n)).join("")
              );
            } catch (e) {
              return !1;
            }
          })()
            ? Object.assign
            : function (e, t) {
                for (
                  var r, o, s = toObject(e), u = 1;
                  u < arguments.length;
                  u++
                ) {
                  for (var l in (r = Object(arguments[u])))
                    i.call(r, l) && (s[l] = r[l]);
                  if (n) {
                    o = n(r);
                    for (var c = 0; c < o.length; c++)
                      a.call(r, o[c]) && (s[o[c]] = r[o[c]]);
                  }
                }
                return s;
              };
        },
        {},
      ],
      14: [
        function (e, t, r) {
          var n,
            i,
            a = (t.exports = {});
          function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
          }
          function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
          }
          function runTimeout(e) {
            if (n === setTimeout) return setTimeout(e, 0);
            if ((n === defaultSetTimout || !n) && setTimeout)
              return (n = setTimeout), setTimeout(e, 0);
            try {
              return n(e, 0);
            } catch (t) {
              try {
                return n.call(null, e, 0);
              } catch (t) {
                return n.call(this, e, 0);
              }
            }
          }
          !(function () {
            try {
              n =
                "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
              n = defaultSetTimout;
            }
            try {
              i =
                "function" == typeof clearTimeout
                  ? clearTimeout
                  : defaultClearTimeout;
            } catch (e) {
              i = defaultClearTimeout;
            }
          })();
          var o,
            s = [],
            u = !1,
            l = -1;
          function cleanUpNextTick() {
            u &&
              o &&
              ((u = !1),
              o.length ? (s = o.concat(s)) : (l = -1),
              s.length && drainQueue());
          }
          function drainQueue() {
            if (!u) {
              var e = runTimeout(cleanUpNextTick);
              u = !0;
              for (var t = s.length; t; ) {
                for (o = s, s = []; ++l < t; ) o && o[l].run();
                (l = -1), (t = s.length);
              }
              (o = null),
                (u = !1),
                (function runClearTimeout(e) {
                  if (i === clearTimeout) return clearTimeout(e);
                  if ((i === defaultClearTimeout || !i) && clearTimeout)
                    return (i = clearTimeout), clearTimeout(e);
                  try {
                    return i(e);
                  } catch (t) {
                    try {
                      return i.call(null, e);
                    } catch (t) {
                      return i.call(this, e);
                    }
                  }
                })(e);
            }
          }
          function Item(e, t) {
            (this.fun = e), (this.array = t);
          }
          function noop() {}
          (a.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var r = 1; r < arguments.length; r++)
                t[r - 1] = arguments[r];
            s.push(new Item(e, t)),
              1 !== s.length || u || runTimeout(drainQueue);
          }),
            (Item.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (a.title = "browser"),
            (a.browser = !0),
            (a.env = {}),
            (a.argv = []),
            (a.version = ""),
            (a.versions = {}),
            (a.on = noop),
            (a.addListener = noop),
            (a.once = noop),
            (a.off = noop),
            (a.removeListener = noop),
            (a.removeAllListeners = noop),
            (a.emit = noop),
            (a.prependListener = noop),
            (a.prependOnceListener = noop),
            (a.listeners = function (e) {
              return [];
            }),
            (a.binding = function (e) {
              throw new Error("process.binding is not supported");
            }),
            (a.cwd = function () {
              return "/";
            }),
            (a.chdir = function (e) {
              throw new Error("process.chdir is not supported");
            }),
            (a.umask = function () {
              return 0;
            });
        },
        {},
      ],
      15: [
        function (e, t, r) {
          (function (e) {
            !(function (n) {
              var i = "object" == typeof r && r && !r.nodeType && r,
                a = "object" == typeof t && t && !t.nodeType && t,
                o = "object" == typeof e && e;
              (o.global !== o && o.window !== o && o.self !== o) || (n = o);
              var s,
                u,
                l = 2147483647,
                c = 36,
                f = 1,
                h = 26,
                p = 38,
                d = 700,
                y = 72,
                m = 128,
                w = "-",
                b = /^xn--/,
                g = /[^\x20-\x7E]/,
                v = /[\x2E\u3002\uFF0E\uFF61]/g,
                _ = {
                  overflow: "Overflow: input needs wider integers to process",
                  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                  "invalid-input": "Invalid input",
                },
                E = c - f,
                x = Math.floor,
                T = String.fromCharCode;
              function error(e) {
                throw new RangeError(_[e]);
              }
              function map(e, t) {
                for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
                return n;
              }
              function mapDomain(e, t) {
                var r = e.split("@"),
                  n = "";
                return (
                  r.length > 1 && ((n = r[0] + "@"), (e = r[1])),
                  n + map((e = e.replace(v, ".")).split("."), t).join(".")
                );
              }
              function ucs2decode(e) {
                for (var t, r, n = [], i = 0, a = e.length; i < a; )
                  (t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < a
                    ? 56320 == (64512 & (r = e.charCodeAt(i++)))
                      ? n.push(((1023 & t) << 10) + (1023 & r) + 65536)
                      : (n.push(t), i--)
                    : n.push(t);
                return n;
              }
              function ucs2encode(e) {
                return map(e, function (e) {
                  var t = "";
                  return (
                    e > 65535 &&
                      ((t += T((((e -= 65536) >>> 10) & 1023) | 55296)),
                      (e = 56320 | (1023 & e))),
                    (t += T(e))
                  );
                }).join("");
              }
              function digitToBasic(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
              }
              function adapt(e, t, r) {
                var n = 0;
                for (
                  e = r ? x(e / d) : e >> 1, e += x(e / t);
                  e > (E * h) >> 1;
                  n += c
                )
                  e = x(e / E);
                return x(n + ((E + 1) * e) / (e + p));
              }
              function decode(e) {
                var t,
                  r,
                  n,
                  i,
                  a,
                  o,
                  s,
                  u,
                  p,
                  d,
                  b,
                  g = [],
                  v = e.length,
                  _ = 0,
                  E = m,
                  T = y;
                for ((r = e.lastIndexOf(w)) < 0 && (r = 0), n = 0; n < r; ++n)
                  e.charCodeAt(n) >= 128 && error("not-basic"),
                    g.push(e.charCodeAt(n));
                for (i = r > 0 ? r + 1 : 0; i < v; ) {
                  for (
                    a = _, o = 1, s = c;
                    i >= v && error("invalid-input"),
                      ((u =
                        (b = e.charCodeAt(i++)) - 48 < 10
                          ? b - 22
                          : b - 65 < 26
                          ? b - 65
                          : b - 97 < 26
                          ? b - 97
                          : c) >= c ||
                        u > x((l - _) / o)) &&
                        error("overflow"),
                      (_ += u * o),
                      !(u < (p = s <= T ? f : s >= T + h ? h : s - T));
                    s += c
                  )
                    o > x(l / (d = c - p)) && error("overflow"), (o *= d);
                  (T = adapt(_ - a, (t = g.length + 1), 0 == a)),
                    x(_ / t) > l - E && error("overflow"),
                    (E += x(_ / t)),
                    (_ %= t),
                    g.splice(_++, 0, E);
                }
                return ucs2encode(g);
              }
              function encode(e) {
                var t,
                  r,
                  n,
                  i,
                  a,
                  o,
                  s,
                  u,
                  p,
                  d,
                  b,
                  g,
                  v,
                  _,
                  E,
                  S = [];
                for (
                  g = (e = ucs2decode(e)).length, t = m, r = 0, a = y, o = 0;
                  o < g;
                  ++o
                )
                  (b = e[o]) < 128 && S.push(T(b));
                for (n = i = S.length, i && S.push(w); n < g; ) {
                  for (s = l, o = 0; o < g; ++o)
                    (b = e[o]) >= t && b < s && (s = b);
                  for (
                    s - t > x((l - r) / (v = n + 1)) && error("overflow"),
                      r += (s - t) * v,
                      t = s,
                      o = 0;
                    o < g;
                    ++o
                  )
                    if (
                      ((b = e[o]) < t && ++r > l && error("overflow"), b == t)
                    ) {
                      for (
                        u = r, p = c;
                        !(u < (d = p <= a ? f : p >= a + h ? h : p - a));
                        p += c
                      )
                        (E = u - d),
                          (_ = c - d),
                          S.push(T(digitToBasic(d + (E % _), 0))),
                          (u = x(E / _));
                      S.push(T(digitToBasic(u, 0))),
                        (a = adapt(r, v, n == i)),
                        (r = 0),
                        ++n;
                    }
                  ++r, ++t;
                }
                return S.join("");
              }
              if (
                ((s = {
                  version: "1.4.1",
                  ucs2: { decode: ucs2decode, encode: ucs2encode },
                  decode: decode,
                  encode: encode,
                  toASCII: function toASCII(e) {
                    return mapDomain(e, function (e) {
                      return g.test(e) ? "xn--" + encode(e) : e;
                    });
                  },
                  toUnicode: function toUnicode(e) {
                    return mapDomain(e, function (e) {
                      return b.test(e) ? decode(e.slice(4).toLowerCase()) : e;
                    });
                  },
                }),
                i && a)
              )
                if (t.exports == i) a.exports = s;
                else for (u in s) s.hasOwnProperty(u) && (i[u] = s[u]);
              else n.punycode = s;
            })(this);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      16: [
        function (e, t, r) {
          "use strict";
          function hasOwnProperty(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
          t.exports = function (e, t, r, i) {
            (t = t || "&"), (r = r || "=");
            var a = {};
            if ("string" != typeof e || 0 === e.length) return a;
            var o = /\+/g;
            e = e.split(t);
            var s = 1e3;
            i && "number" == typeof i.maxKeys && (s = i.maxKeys);
            var u = e.length;
            s > 0 && u > s && (u = s);
            for (var l = 0; l < u; ++l) {
              var c,
                f,
                h,
                p,
                d = e[l].replace(o, "%20"),
                y = d.indexOf(r);
              y >= 0
                ? ((c = d.substr(0, y)), (f = d.substr(y + 1)))
                : ((c = d), (f = "")),
                (h = decodeURIComponent(c)),
                (p = decodeURIComponent(f)),
                hasOwnProperty(a, h)
                  ? n(a[h])
                    ? a[h].push(p)
                    : (a[h] = [a[h], p])
                  : (a[h] = p);
            }
            return a;
          };
          var n =
            Array.isArray ||
            function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            };
        },
        {},
      ],
      17: [
        function (e, t, r) {
          "use strict";
          var stringifyPrimitive = function (e) {
            switch (typeof e) {
              case "string":
                return e;
              case "boolean":
                return e ? "true" : "false";
              case "number":
                return isFinite(e) ? e : "";
              default:
                return "";
            }
          };
          t.exports = function (e, t, r, a) {
            return (
              (t = t || "&"),
              (r = r || "="),
              null === e && (e = void 0),
              "object" == typeof e
                ? map(i(e), function (i) {
                    var a = encodeURIComponent(stringifyPrimitive(i)) + r;
                    return n(e[i])
                      ? map(e[i], function (e) {
                          return a + encodeURIComponent(stringifyPrimitive(e));
                        }).join(t)
                      : a + encodeURIComponent(stringifyPrimitive(e[i]));
                  }).join(t)
                : a
                ? encodeURIComponent(stringifyPrimitive(a)) +
                  r +
                  encodeURIComponent(stringifyPrimitive(e))
                : ""
            );
          };
          var n =
            Array.isArray ||
            function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            };
          function map(e, t) {
            if (e.map) return e.map(t);
            for (var r = [], n = 0; n < e.length; n++) r.push(t(e[n], n));
            return r;
          }
          var i =
            Object.keys ||
            function (e) {
              var t = [];
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
              return t;
            };
        },
        {},
      ],
      18: [
        function (e, t, r) {
          "use strict";
          (r.decode = r.parse = e("./decode")),
            (r.encode = r.stringify = e("./encode"));
        },
        { "./decode": 16, "./encode": 17 },
      ],
      19: [
        function (e, t, r) {
          "use strict";
          var n,
            i = Object.prototype.hasOwnProperty;
          function decode(e) {
            try {
              return decodeURIComponent(e.replace(/\+/g, " "));
            } catch (e) {
              return null;
            }
          }
          (r.stringify = function querystringify(e, t) {
            t = t || "";
            var r,
              a,
              o = [];
            for (a in ("string" != typeof t && (t = "?"), e))
              if (i.call(e, a)) {
                if (
                  ((r = e[a]) ||
                    (null !== r && r !== n && !isNaN(r)) ||
                    (r = ""),
                  (a = encodeURIComponent(a)),
                  (r = encodeURIComponent(r)),
                  null === a || null === r)
                )
                  continue;
                o.push(a + "=" + r);
              }
            return o.length ? t + o.join("&") : "";
          }),
            (r.parse = function querystring(e) {
              for (
                var t, r = /([^=?&]+)=?([^&]*)/g, n = {};
                (t = r.exec(e));

              ) {
                var i = decode(t[1]),
                  a = decode(t[2]);
                null === i || null === a || i in n || (n[i] = a);
              }
              return n;
            });
        },
        {},
      ],
      20: [
        function (e, t, r) {
          "use strict";
          t.exports = function required(e, t) {
            if (((t = t.split(":")[0]), !(e = +e))) return !1;
            switch (t) {
              case "http":
              case "ws":
                return 80 !== e;
              case "https":
              case "wss":
                return 443 !== e;
              case "ftp":
                return 21 !== e;
              case "gopher":
                return 70 !== e;
              case "file":
                return !1;
            }
            return 0 !== e;
          };
        },
        {},
      ],
      21: [
        function (e, t, r) {
          var n = e("buffer"),
            i = n.Buffer;
          function copyProps(e, t) {
            for (var r in e) t[r] = e[r];
          }
          function SafeBuffer(e, t, r) {
            return i(e, t, r);
          }
          i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
            ? (t.exports = n)
            : (copyProps(n, r), (r.Buffer = SafeBuffer)),
            (SafeBuffer.prototype = Object.create(i.prototype)),
            copyProps(i, SafeBuffer),
            (SafeBuffer.from = function (e, t, r) {
              if ("number" == typeof e)
                throw new TypeError("Argument must not be a number");
              return i(e, t, r);
            }),
            (SafeBuffer.alloc = function (e, t, r) {
              if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
              var n = i(e);
              return (
                void 0 !== t
                  ? "string" == typeof r
                    ? n.fill(t, r)
                    : n.fill(t)
                  : n.fill(0),
                n
              );
            }),
            (SafeBuffer.allocUnsafe = function (e) {
              if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
              return i(e);
            }),
            (SafeBuffer.allocUnsafeSlow = function (e) {
              if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
              return n.SlowBuffer(e);
            });
        },
        { buffer: 5 },
      ],
      22: [
        function (e, t, r) {
          (function (t) {
            var n = e("./lib/request"),
              i = e("./lib/response"),
              a = e("xtend"),
              o = e("builtin-status-codes"),
              s = e("url"),
              u = r;
            (u.request = function (e, r) {
              e = "string" == typeof e ? s.parse(e) : a(e);
              var i =
                  -1 === t.location.protocol.search(/^https?:$/) ? "http:" : "",
                o = e.protocol || i,
                u = e.hostname || e.host,
                l = e.port,
                c = e.path || "/";
              u && -1 !== u.indexOf(":") && (u = "[" + u + "]"),
                (e.url = (u ? o + "//" + u : "") + (l ? ":" + l : "") + c),
                (e.method = (e.method || "GET").toUpperCase()),
                (e.headers = e.headers || {});
              var f = new n(e);
              return r && f.on("response", r), f;
            }),
              (u.get = function get(e, t) {
                var r = u.request(e, t);
                return r.end(), r;
              }),
              (u.ClientRequest = n),
              (u.IncomingMessage = i.IncomingMessage),
              (u.Agent = function () {}),
              (u.Agent.defaultMaxSockets = 4),
              (u.globalAgent = new u.Agent()),
              (u.STATUS_CODES = o),
              (u.METHODS = [
                "CHECKOUT",
                "CONNECT",
                "COPY",
                "DELETE",
                "GET",
                "HEAD",
                "LOCK",
                "M-SEARCH",
                "MERGE",
                "MKACTIVITY",
                "MKCOL",
                "MOVE",
                "NOTIFY",
                "OPTIONS",
                "PATCH",
                "POST",
                "PROPFIND",
                "PROPPATCH",
                "PURGE",
                "PUT",
                "REPORT",
                "SEARCH",
                "SUBSCRIBE",
                "TRACE",
                "UNLOCK",
                "UNSUBSCRIBE",
              ]);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "./lib/request": 24,
          "./lib/response": 25,
          "builtin-status-codes": 6,
          url: 43,
          xtend: 49,
        },
      ],
      23: [
        function (e, t, r) {
          (function (e) {
            var t;
            function getXHR() {
              if (void 0 !== t) return t;
              if (e.XMLHttpRequest) {
                t = new e.XMLHttpRequest();
                try {
                  t.open("GET", e.XDomainRequest ? "/" : "https://example.com");
                } catch (e) {
                  t = null;
                }
              } else t = null;
              return t;
            }
            function checkTypeSupport(e) {
              var t = getXHR();
              if (!t) return !1;
              try {
                return (t.responseType = e), t.responseType === e;
              } catch (e) {}
              return !1;
            }
            function isFunction(e) {
              return "function" == typeof e;
            }
            (r.fetch = isFunction(e.fetch) && isFunction(e.ReadableStream)),
              (r.writableStream = isFunction(e.WritableStream)),
              (r.abortController = isFunction(e.AbortController)),
              (r.arraybuffer = r.fetch || checkTypeSupport("arraybuffer")),
              (r.msstream = !r.fetch && checkTypeSupport("ms-stream")),
              (r.mozchunkedarraybuffer =
                !r.fetch && checkTypeSupport("moz-chunked-arraybuffer")),
              (r.overrideMimeType =
                r.fetch ||
                (!!getXHR() && isFunction(getXHR().overrideMimeType))),
              (t = null);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      24: [
        function (e, t, r) {
          (function (r, n, i) {
            var a = e("./capability"),
              o = e("inherits"),
              s = e("./response"),
              u = e("readable-stream"),
              l = s.IncomingMessage,
              c = s.readyStates;
            var f = (t.exports = function (e) {
              var t,
                r = this;
              u.Writable.call(r),
                (r._opts = e),
                (r._body = []),
                (r._headers = {}),
                e.auth &&
                  r.setHeader(
                    "Authorization",
                    "Basic " + i.from(e.auth).toString("base64")
                  ),
                Object.keys(e.headers).forEach(function (t) {
                  r.setHeader(t, e.headers[t]);
                });
              var n = !0;
              if (
                "disable-fetch" === e.mode ||
                ("requestTimeout" in e && !a.abortController)
              )
                (n = !1), (t = !0);
              else if ("prefer-streaming" === e.mode) t = !1;
              else if ("allow-wrong-content-type" === e.mode)
                t = !a.overrideMimeType;
              else {
                if (e.mode && "default" !== e.mode && "prefer-fast" !== e.mode)
                  throw new Error("Invalid value for opts.mode");
                t = !0;
              }
              (r._mode = (function decideMode(e, t) {
                return a.fetch && t
                  ? "fetch"
                  : a.mozchunkedarraybuffer
                  ? "moz-chunked-arraybuffer"
                  : a.msstream
                  ? "ms-stream"
                  : a.arraybuffer && e
                  ? "arraybuffer"
                  : "text";
              })(t, n)),
                (r._fetchTimer = null),
                r.on("finish", function () {
                  r._onFinish();
                });
            });
            o(f, u.Writable),
              (f.prototype.setHeader = function (e, t) {
                var r = e.toLowerCase();
                -1 === h.indexOf(r) &&
                  (this._headers[r] = { name: e, value: t });
              }),
              (f.prototype.getHeader = function (e) {
                var t = this._headers[e.toLowerCase()];
                return t ? t.value : null;
              }),
              (f.prototype.removeHeader = function (e) {
                delete this._headers[e.toLowerCase()];
              }),
              (f.prototype._onFinish = function () {
                var e = this;
                if (!e._destroyed) {
                  var t = e._opts,
                    i = e._headers,
                    o = null;
                  "GET" !== t.method &&
                    "HEAD" !== t.method &&
                    (o = new Blob(e._body, {
                      type: (i["content-type"] || {}).value || "",
                    }));
                  var s = [];
                  if (
                    (Object.keys(i).forEach(function (e) {
                      var t = i[e].name,
                        r = i[e].value;
                      Array.isArray(r)
                        ? r.forEach(function (e) {
                            s.push([t, e]);
                          })
                        : s.push([t, r]);
                    }),
                    "fetch" === e._mode)
                  ) {
                    var u = null;
                    if (a.abortController) {
                      var l = new AbortController();
                      (u = l.signal),
                        (e._fetchAbortController = l),
                        "requestTimeout" in t &&
                          0 !== t.requestTimeout &&
                          (e._fetchTimer = n.setTimeout(function () {
                            e.emit("requestTimeout"),
                              e._fetchAbortController &&
                                e._fetchAbortController.abort();
                          }, t.requestTimeout));
                    }
                    n.fetch(e._opts.url, {
                      method: e._opts.method,
                      headers: s,
                      body: o || void 0,
                      mode: "cors",
                      credentials: t.withCredentials
                        ? "include"
                        : "same-origin",
                      signal: u,
                    }).then(
                      function (t) {
                        (e._fetchResponse = t), e._connect();
                      },
                      function (t) {
                        n.clearTimeout(e._fetchTimer),
                          e._destroyed || e.emit("error", t);
                      }
                    );
                  } else {
                    var f = (e._xhr = new n.XMLHttpRequest());
                    try {
                      f.open(e._opts.method, e._opts.url, !0);
                    } catch (t) {
                      return void r.nextTick(function () {
                        e.emit("error", t);
                      });
                    }
                    "responseType" in f && (f.responseType = e._mode),
                      "withCredentials" in f &&
                        (f.withCredentials = !!t.withCredentials),
                      "text" === e._mode &&
                        "overrideMimeType" in f &&
                        f.overrideMimeType(
                          "text/plain; charset=x-user-defined"
                        ),
                      "requestTimeout" in t &&
                        ((f.timeout = t.requestTimeout),
                        (f.ontimeout = function () {
                          e.emit("requestTimeout");
                        })),
                      s.forEach(function (e) {
                        f.setRequestHeader(e[0], e[1]);
                      }),
                      (e._response = null),
                      (f.onreadystatechange = function () {
                        switch (f.readyState) {
                          case c.LOADING:
                          case c.DONE:
                            e._onXHRProgress();
                        }
                      }),
                      "moz-chunked-arraybuffer" === e._mode &&
                        (f.onprogress = function () {
                          e._onXHRProgress();
                        }),
                      (f.onerror = function () {
                        e._destroyed || e.emit("error", new Error("XHR error"));
                      });
                    try {
                      f.send(o);
                    } catch (t) {
                      return void r.nextTick(function () {
                        e.emit("error", t);
                      });
                    }
                  }
                }
              }),
              (f.prototype._onXHRProgress = function () {
                (function statusValid(e) {
                  try {
                    var t = e.status;
                    return null !== t && 0 !== t;
                  } catch (e) {
                    return !1;
                  }
                })(this._xhr) &&
                  !this._destroyed &&
                  (this._response || this._connect(),
                  this._response._onXHRProgress());
              }),
              (f.prototype._connect = function () {
                var e = this;
                e._destroyed ||
                  ((e._response = new l(
                    e._xhr,
                    e._fetchResponse,
                    e._mode,
                    e._fetchTimer
                  )),
                  e._response.on("error", function (t) {
                    e.emit("error", t);
                  }),
                  e.emit("response", e._response));
              }),
              (f.prototype._write = function (e, t, r) {
                this._body.push(e), r();
              }),
              (f.prototype.abort = f.prototype.destroy = function () {
                (this._destroyed = !0),
                  n.clearTimeout(this._fetchTimer),
                  this._response && (this._response._destroyed = !0),
                  this._xhr
                    ? this._xhr.abort()
                    : this._fetchAbortController &&
                      this._fetchAbortController.abort();
              }),
              (f.prototype.end = function (e, t, r) {
                "function" == typeof e && ((r = e), (e = void 0)),
                  u.Writable.prototype.end.call(this, e, t, r);
              }),
              (f.prototype.flushHeaders = function () {}),
              (f.prototype.setTimeout = function () {}),
              (f.prototype.setNoDelay = function () {}),
              (f.prototype.setSocketKeepAlive = function () {});
            var h = [
              "accept-charset",
              "accept-encoding",
              "access-control-request-headers",
              "access-control-request-method",
              "connection",
              "content-length",
              "cookie",
              "cookie2",
              "date",
              "dnt",
              "expect",
              "host",
              "keep-alive",
              "origin",
              "referer",
              "te",
              "trailer",
              "transfer-encoding",
              "upgrade",
              "via",
            ];
          }.call(
            this,
            e("_process"),
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {},
            e("buffer").Buffer
          ));
        },
        {
          "./capability": 23,
          "./response": 25,
          _process: 14,
          buffer: 5,
          inherits: 12,
          "readable-stream": 40,
        },
      ],
      25: [
        function (e, t, r) {
          (function (t, n, i) {
            var a = e("./capability"),
              o = e("inherits"),
              s = e("readable-stream"),
              u = (r.readyStates = {
                UNSENT: 0,
                OPENED: 1,
                HEADERS_RECEIVED: 2,
                LOADING: 3,
                DONE: 4,
              }),
              l = (r.IncomingMessage = function (e, r, o, u) {
                var l = this;
                if (
                  (s.Readable.call(l),
                  (l._mode = o),
                  (l.headers = {}),
                  (l.rawHeaders = []),
                  (l.trailers = {}),
                  (l.rawTrailers = []),
                  l.on("end", function () {
                    t.nextTick(function () {
                      l.emit("close");
                    });
                  }),
                  "fetch" === o)
                ) {
                  if (
                    ((l._fetchResponse = r),
                    (l.url = r.url),
                    (l.statusCode = r.status),
                    (l.statusMessage = r.statusText),
                    r.headers.forEach(function (e, t) {
                      (l.headers[t.toLowerCase()] = e), l.rawHeaders.push(t, e);
                    }),
                    a.writableStream)
                  ) {
                    var c = new WritableStream({
                      write: function (e) {
                        return new Promise(function (t, r) {
                          l._destroyed
                            ? r()
                            : l.push(i.from(e))
                            ? t()
                            : (l._resumeFetch = t);
                        });
                      },
                      close: function () {
                        n.clearTimeout(u), l._destroyed || l.push(null);
                      },
                      abort: function (e) {
                        l._destroyed || l.emit("error", e);
                      },
                    });
                    try {
                      return void r.body.pipeTo(c).catch(function (e) {
                        n.clearTimeout(u), l._destroyed || l.emit("error", e);
                      });
                    } catch (e) {}
                  }
                  var f = r.body.getReader();
                  !(function read() {
                    f.read()
                      .then(function (e) {
                        if (!l._destroyed) {
                          if (e.done)
                            return n.clearTimeout(u), void l.push(null);
                          l.push(i.from(e.value)), read();
                        }
                      })
                      .catch(function (e) {
                        n.clearTimeout(u), l._destroyed || l.emit("error", e);
                      });
                  })();
                } else {
                  if (
                    ((l._xhr = e),
                    (l._pos = 0),
                    (l.url = e.responseURL),
                    (l.statusCode = e.status),
                    (l.statusMessage = e.statusText),
                    e
                      .getAllResponseHeaders()
                      .split(/\r?\n/)
                      .forEach(function (e) {
                        var t = e.match(/^([^:]+):\s*(.*)/);
                        if (t) {
                          var r = t[1].toLowerCase();
                          "set-cookie" === r
                            ? (void 0 === l.headers[r] && (l.headers[r] = []),
                              l.headers[r].push(t[2]))
                            : void 0 !== l.headers[r]
                            ? (l.headers[r] += ", " + t[2])
                            : (l.headers[r] = t[2]),
                            l.rawHeaders.push(t[1], t[2]);
                        }
                      }),
                    (l._charset = "x-user-defined"),
                    !a.overrideMimeType)
                  ) {
                    var h = l.rawHeaders["mime-type"];
                    if (h) {
                      var p = h.match(/;\s*charset=([^;])(;|$)/);
                      p && (l._charset = p[1].toLowerCase());
                    }
                    l._charset || (l._charset = "utf-8");
                  }
                }
              });
            o(l, s.Readable),
              (l.prototype._read = function () {
                var e = this._resumeFetch;
                e && ((this._resumeFetch = null), e());
              }),
              (l.prototype._onXHRProgress = function () {
                var e = this,
                  t = e._xhr,
                  r = null;
                switch (e._mode) {
                  case "text":
                    if ((r = t.responseText).length > e._pos) {
                      var a = r.substr(e._pos);
                      if ("x-user-defined" === e._charset) {
                        for (
                          var o = i.alloc(a.length), s = 0;
                          s < a.length;
                          s++
                        )
                          o[s] = 255 & a.charCodeAt(s);
                        e.push(o);
                      } else e.push(a, e._charset);
                      e._pos = r.length;
                    }
                    break;
                  case "arraybuffer":
                    if (t.readyState !== u.DONE || !t.response) break;
                    (r = t.response), e.push(i.from(new Uint8Array(r)));
                    break;
                  case "moz-chunked-arraybuffer":
                    if (((r = t.response), t.readyState !== u.LOADING || !r))
                      break;
                    e.push(i.from(new Uint8Array(r)));
                    break;
                  case "ms-stream":
                    if (((r = t.response), t.readyState !== u.LOADING)) break;
                    var l = new n.MSStreamReader();
                    (l.onprogress = function () {
                      l.result.byteLength > e._pos &&
                        (e.push(i.from(new Uint8Array(l.result.slice(e._pos)))),
                        (e._pos = l.result.byteLength));
                    }),
                      (l.onload = function () {
                        e.push(null);
                      }),
                      l.readAsArrayBuffer(r);
                }
                e._xhr.readyState === u.DONE &&
                  "ms-stream" !== e._mode &&
                  e.push(null);
              });
          }.call(
            this,
            e("_process"),
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {},
            e("buffer").Buffer
          ));
        },
        {
          "./capability": 23,
          _process: 14,
          buffer: 5,
          inherits: 12,
          "readable-stream": 40,
        },
      ],
      26: [
        function (e, t, r) {
          "use strict";
          var n = {};
          function createErrorType(e, t, r) {
            r || (r = Error);
            var i = (function (e) {
              function NodeError(r, n, i) {
                return (
                  e.call(
                    this,
                    (function getMessage(e, r, n) {
                      return "string" == typeof t ? t : t(e, r, n);
                    })(r, n, i)
                  ) || this
                );
              }
              return (
                (function _inheritsLoose(e, t) {
                  (e.prototype = Object.create(t.prototype)),
                    (e.prototype.constructor = e),
                    (e.__proto__ = t);
                })(NodeError, e),
                NodeError
              );
            })(r);
            (i.prototype.name = r.name), (i.prototype.code = e), (n[e] = i);
          }
          function oneOf(e, t) {
            if (Array.isArray(e)) {
              var r = e.length;
              return (
                (e = e.map(function (e) {
                  return String(e);
                })),
                r > 2
                  ? "one of "
                      .concat(t, " ")
                      .concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1]
                  : 2 === r
                  ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1])
                  : "of ".concat(t, " ").concat(e[0])
              );
            }
            return "of ".concat(t, " ").concat(String(e));
          }
          createErrorType(
            "ERR_INVALID_OPT_VALUE",
            function (e, t) {
              return 'The value "' + t + '" is invalid for option "' + e + '"';
            },
            TypeError
          ),
            createErrorType(
              "ERR_INVALID_ARG_TYPE",
              function (e, t, r) {
                var n, i;
                if (
                  ("string" == typeof t &&
                  (function startsWith(e, t, r) {
                    return e.substr(!r || r < 0 ? 0 : +r, t.length) === t;
                  })(t, "not ")
                    ? ((n = "must not be"), (t = t.replace(/^not /, "")))
                    : (n = "must be"),
                  (function endsWith(e, t, r) {
                    return (
                      (void 0 === r || r > e.length) && (r = e.length),
                      e.substring(r - t.length, r) === t
                    );
                  })(e, " argument"))
                )
                  i = "The "
                    .concat(e, " ")
                    .concat(n, " ")
                    .concat(oneOf(t, "type"));
                else {
                  var a = (function includes(e, t, r) {
                    return (
                      "number" != typeof r && (r = 0),
                      !(r + t.length > e.length) && -1 !== e.indexOf(t, r)
                    );
                  })(e, ".")
                    ? "property"
                    : "argument";
                  i = 'The "'
                    .concat(e, '" ')
                    .concat(a, " ")
                    .concat(n, " ")
                    .concat(oneOf(t, "type"));
                }
                return (i += ". Received type ".concat(typeof r));
              },
              TypeError
            ),
            createErrorType(
              "ERR_STREAM_PUSH_AFTER_EOF",
              "stream.push() after EOF"
            ),
            createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
              return "The " + e + " method is not implemented";
            }),
            createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
            createErrorType("ERR_STREAM_DESTROYED", function (e) {
              return "Cannot call " + e + " after a stream was destroyed";
            }),
            createErrorType(
              "ERR_MULTIPLE_CALLBACK",
              "Callback called multiple times"
            ),
            createErrorType(
              "ERR_STREAM_CANNOT_PIPE",
              "Cannot pipe, not readable"
            ),
            createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end"),
            createErrorType(
              "ERR_STREAM_NULL_VALUES",
              "May not write null values to stream",
              TypeError
            ),
            createErrorType(
              "ERR_UNKNOWN_ENCODING",
              function (e) {
                return "Unknown encoding: " + e;
              },
              TypeError
            ),
            createErrorType(
              "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
              "stream.unshift() after end event"
            ),
            (t.exports.codes = n);
        },
        {},
      ],
      27: [
        function (e, t, r) {
          (function (r) {
            "use strict";
            var n =
              Object.keys ||
              function (e) {
                var t = [];
                for (var r in e) t.push(r);
                return t;
              };
            t.exports = Duplex;
            var i = e("./_stream_readable"),
              a = e("./_stream_writable");
            e("inherits")(Duplex, i);
            for (var o = n(a.prototype), s = 0; s < o.length; s++) {
              var u = o[s];
              Duplex.prototype[u] || (Duplex.prototype[u] = a.prototype[u]);
            }
            function Duplex(e) {
              if (!(this instanceof Duplex)) return new Duplex(e);
              i.call(this, e),
                a.call(this, e),
                (this.allowHalfOpen = !0),
                e &&
                  (!1 === e.readable && (this.readable = !1),
                  !1 === e.writable && (this.writable = !1),
                  !1 === e.allowHalfOpen &&
                    ((this.allowHalfOpen = !1), this.once("end", onend)));
            }
            function onend() {
              this._writableState.ended || r.nextTick(onEndNT, this);
            }
            function onEndNT(e) {
              e.end();
            }
            Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
              enumerable: !1,
              get: function get() {
                return this._writableState.highWaterMark;
              },
            }),
              Object.defineProperty(Duplex.prototype, "writableBuffer", {
                enumerable: !1,
                get: function get() {
                  return this._writableState && this._writableState.getBuffer();
                },
              }),
              Object.defineProperty(Duplex.prototype, "writableLength", {
                enumerable: !1,
                get: function get() {
                  return this._writableState.length;
                },
              }),
              Object.defineProperty(Duplex.prototype, "destroyed", {
                enumerable: !1,
                get: function get() {
                  return (
                    void 0 !== this._readableState &&
                    void 0 !== this._writableState &&
                    this._readableState.destroyed &&
                    this._writableState.destroyed
                  );
                },
                set: function set(e) {
                  void 0 !== this._readableState &&
                    void 0 !== this._writableState &&
                    ((this._readableState.destroyed = e),
                    (this._writableState.destroyed = e));
                },
              });
          }.call(this, e("_process")));
        },
        {
          "./_stream_readable": 29,
          "./_stream_writable": 31,
          _process: 14,
          inherits: 12,
        },
      ],
      28: [
        function (e, t, r) {
          "use strict";
          t.exports = PassThrough;
          var n = e("./_stream_transform");
          function PassThrough(e) {
            if (!(this instanceof PassThrough)) return new PassThrough(e);
            n.call(this, e);
          }
          e("inherits")(PassThrough, n),
            (PassThrough.prototype._transform = function (e, t, r) {
              r(null, e);
            });
        },
        { "./_stream_transform": 30, inherits: 12 },
      ],
      29: [
        function (e, t, r) {
          (function (r, n) {
            "use strict";
            var i;
            (t.exports = Readable), (Readable.ReadableState = ReadableState);
            e("events").EventEmitter;
            var a = function EElistenerCount(e, t) {
                return e.listeners(t).length;
              },
              o = e("./internal/streams/stream"),
              s = e("buffer").Buffer,
              u = n.Uint8Array || function () {};
            var l,
              c = e("util");
            l = c && c.debuglog ? c.debuglog("stream") : function debug() {};
            var f,
              h,
              p,
              d = e("./internal/streams/buffer_list"),
              y = e("./internal/streams/destroy"),
              m = e("./internal/streams/state").getHighWaterMark,
              w = e("../errors").codes,
              b = w.ERR_INVALID_ARG_TYPE,
              g = w.ERR_STREAM_PUSH_AFTER_EOF,
              v = w.ERR_METHOD_NOT_IMPLEMENTED,
              _ = w.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
            e("inherits")(Readable, o);
            var E = y.errorOrDestroy,
              x = ["error", "close", "destroy", "pause", "resume"];
            function ReadableState(t, r, n) {
              (i = i || e("./_stream_duplex")),
                (t = t || {}),
                "boolean" != typeof n && (n = r instanceof i),
                (this.objectMode = !!t.objectMode),
                n &&
                  (this.objectMode = this.objectMode || !!t.readableObjectMode),
                (this.highWaterMark = m(this, t, "readableHighWaterMark", n)),
                (this.buffer = new d()),
                (this.length = 0),
                (this.pipes = null),
                (this.pipesCount = 0),
                (this.flowing = null),
                (this.ended = !1),
                (this.endEmitted = !1),
                (this.reading = !1),
                (this.sync = !0),
                (this.needReadable = !1),
                (this.emittedReadable = !1),
                (this.readableListening = !1),
                (this.resumeScheduled = !1),
                (this.paused = !0),
                (this.emitClose = !1 !== t.emitClose),
                (this.autoDestroy = !!t.autoDestroy),
                (this.destroyed = !1),
                (this.defaultEncoding = t.defaultEncoding || "utf8"),
                (this.awaitDrain = 0),
                (this.readingMore = !1),
                (this.decoder = null),
                (this.encoding = null),
                t.encoding &&
                  (f || (f = e("string_decoder/").StringDecoder),
                  (this.decoder = new f(t.encoding)),
                  (this.encoding = t.encoding));
            }
            function Readable(t) {
              if (
                ((i = i || e("./_stream_duplex")), !(this instanceof Readable))
              )
                return new Readable(t);
              var r = this instanceof i;
              (this._readableState = new ReadableState(t, this, r)),
                (this.readable = !0),
                t &&
                  ("function" == typeof t.read && (this._read = t.read),
                  "function" == typeof t.destroy &&
                    (this._destroy = t.destroy)),
                o.call(this);
            }
            function readableAddChunk(e, t, r, n, i) {
              l("readableAddChunk", t);
              var a,
                o = e._readableState;
              if (null === t)
                (o.reading = !1),
                  (function onEofChunk(e, t) {
                    if ((l("onEofChunk"), t.ended)) return;
                    if (t.decoder) {
                      var r = t.decoder.end();
                      r &&
                        r.length &&
                        (t.buffer.push(r),
                        (t.length += t.objectMode ? 1 : r.length));
                    }
                    (t.ended = !0),
                      t.sync
                        ? emitReadable(e)
                        : ((t.needReadable = !1),
                          t.emittedReadable ||
                            ((t.emittedReadable = !0), emitReadable_(e)));
                  })(e, o);
              else if (
                (i ||
                  (a = (function chunkInvalid(e, t) {
                    var r;
                    (function _isUint8Array(e) {
                      return s.isBuffer(e) || e instanceof u;
                    })(t) ||
                      "string" == typeof t ||
                      void 0 === t ||
                      e.objectMode ||
                      (r = new b(
                        "chunk",
                        ["string", "Buffer", "Uint8Array"],
                        t
                      ));
                    return r;
                  })(o, t)),
                a)
              )
                E(e, a);
              else if (o.objectMode || (t && t.length > 0))
                if (
                  ("string" == typeof t ||
                    o.objectMode ||
                    Object.getPrototypeOf(t) === s.prototype ||
                    (t = (function _uint8ArrayToBuffer(e) {
                      return s.from(e);
                    })(t)),
                  n)
                )
                  o.endEmitted ? E(e, new _()) : addChunk(e, o, t, !0);
                else if (o.ended) E(e, new g());
                else {
                  if (o.destroyed) return !1;
                  (o.reading = !1),
                    o.decoder && !r
                      ? ((t = o.decoder.write(t)),
                        o.objectMode || 0 !== t.length
                          ? addChunk(e, o, t, !1)
                          : maybeReadMore(e, o))
                      : addChunk(e, o, t, !1);
                }
              else n || ((o.reading = !1), maybeReadMore(e, o));
              return !o.ended && (o.length < o.highWaterMark || 0 === o.length);
            }
            function addChunk(e, t, r, n) {
              t.flowing && 0 === t.length && !t.sync
                ? ((t.awaitDrain = 0), e.emit("data", r))
                : ((t.length += t.objectMode ? 1 : r.length),
                  n ? t.buffer.unshift(r) : t.buffer.push(r),
                  t.needReadable && emitReadable(e)),
                maybeReadMore(e, t);
            }
            Object.defineProperty(Readable.prototype, "destroyed", {
              enumerable: !1,
              get: function get() {
                return (
                  void 0 !== this._readableState &&
                  this._readableState.destroyed
                );
              },
              set: function set(e) {
                this._readableState && (this._readableState.destroyed = e);
              },
            }),
              (Readable.prototype.destroy = y.destroy),
              (Readable.prototype._undestroy = y.undestroy),
              (Readable.prototype._destroy = function (e, t) {
                t(e);
              }),
              (Readable.prototype.push = function (e, t) {
                var r,
                  n = this._readableState;
                return (
                  n.objectMode
                    ? (r = !0)
                    : "string" == typeof e &&
                      ((t = t || n.defaultEncoding) !== n.encoding &&
                        ((e = s.from(e, t)), (t = "")),
                      (r = !0)),
                  readableAddChunk(this, e, t, !1, r)
                );
              }),
              (Readable.prototype.unshift = function (e) {
                return readableAddChunk(this, e, null, !0, !1);
              }),
              (Readable.prototype.isPaused = function () {
                return !1 === this._readableState.flowing;
              }),
              (Readable.prototype.setEncoding = function (t) {
                f || (f = e("string_decoder/").StringDecoder);
                var r = new f(t);
                (this._readableState.decoder = r),
                  (this._readableState.encoding = this._readableState.decoder.encoding);
                for (
                  var n = this._readableState.buffer.head, i = "";
                  null !== n;

                )
                  (i += r.write(n.data)), (n = n.next);
                return (
                  this._readableState.buffer.clear(),
                  "" !== i && this._readableState.buffer.push(i),
                  (this._readableState.length = i.length),
                  this
                );
              });
            var T = 1073741824;
            function howMuchToRead(e, t) {
              return e <= 0 || (0 === t.length && t.ended)
                ? 0
                : t.objectMode
                ? 1
                : e != e
                ? t.flowing && t.length
                  ? t.buffer.head.data.length
                  : t.length
                : (e > t.highWaterMark &&
                    (t.highWaterMark = (function computeNewHighWaterMark(e) {
                      return (
                        e >= T
                          ? (e = T)
                          : (e--,
                            (e |= e >>> 1),
                            (e |= e >>> 2),
                            (e |= e >>> 4),
                            (e |= e >>> 8),
                            (e |= e >>> 16),
                            e++),
                        e
                      );
                    })(e)),
                  e <= t.length
                    ? e
                    : t.ended
                    ? t.length
                    : ((t.needReadable = !0), 0));
            }
            function emitReadable(e) {
              var t = e._readableState;
              l("emitReadable", t.needReadable, t.emittedReadable),
                (t.needReadable = !1),
                t.emittedReadable ||
                  (l("emitReadable", t.flowing),
                  (t.emittedReadable = !0),
                  r.nextTick(emitReadable_, e));
            }
            function emitReadable_(e) {
              var t = e._readableState;
              l("emitReadable_", t.destroyed, t.length, t.ended),
                t.destroyed ||
                  (!t.length && !t.ended) ||
                  (e.emit("readable"), (t.emittedReadable = !1)),
                (t.needReadable =
                  !t.flowing && !t.ended && t.length <= t.highWaterMark),
                flow(e);
            }
            function maybeReadMore(e, t) {
              t.readingMore ||
                ((t.readingMore = !0), r.nextTick(maybeReadMore_, e, t));
            }
            function maybeReadMore_(e, t) {
              for (
                ;
                !t.reading &&
                !t.ended &&
                (t.length < t.highWaterMark || (t.flowing && 0 === t.length));

              ) {
                var r = t.length;
                if ((l("maybeReadMore read 0"), e.read(0), r === t.length))
                  break;
              }
              t.readingMore = !1;
            }
            function updateReadableListening(e) {
              var t = e._readableState;
              (t.readableListening = e.listenerCount("readable") > 0),
                t.resumeScheduled && !t.paused
                  ? (t.flowing = !0)
                  : e.listenerCount("data") > 0 && e.resume();
            }
            function nReadingNextTick(e) {
              l("readable nexttick read 0"), e.read(0);
            }
            function resume_(e, t) {
              l("resume", t.reading),
                t.reading || e.read(0),
                (t.resumeScheduled = !1),
                e.emit("resume"),
                flow(e),
                t.flowing && !t.reading && e.read(0);
            }
            function flow(e) {
              var t = e._readableState;
              for (l("flow", t.flowing); t.flowing && null !== e.read(); );
            }
            function fromList(e, t) {
              return 0 === t.length
                ? null
                : (t.objectMode
                    ? (r = t.buffer.shift())
                    : !e || e >= t.length
                    ? ((r = t.decoder
                        ? t.buffer.join("")
                        : 1 === t.buffer.length
                        ? t.buffer.first()
                        : t.buffer.concat(t.length)),
                      t.buffer.clear())
                    : (r = t.buffer.consume(e, t.decoder)),
                  r);
              var r;
            }
            function endReadable(e) {
              var t = e._readableState;
              l("endReadable", t.endEmitted),
                t.endEmitted ||
                  ((t.ended = !0), r.nextTick(endReadableNT, t, e));
            }
            function endReadableNT(e, t) {
              if (
                (l("endReadableNT", e.endEmitted, e.length),
                !e.endEmitted &&
                  0 === e.length &&
                  ((e.endEmitted = !0),
                  (t.readable = !1),
                  t.emit("end"),
                  e.autoDestroy))
              ) {
                var r = t._writableState;
                (!r || (r.autoDestroy && r.finished)) && t.destroy();
              }
            }
            function indexOf(e, t) {
              for (var r = 0, n = e.length; r < n; r++)
                if (e[r] === t) return r;
              return -1;
            }
            (Readable.prototype.read = function (e) {
              l("read", e), (e = parseInt(e, 10));
              var t = this._readableState,
                r = e;
              if (
                (0 !== e && (t.emittedReadable = !1),
                0 === e &&
                  t.needReadable &&
                  ((0 !== t.highWaterMark
                    ? t.length >= t.highWaterMark
                    : t.length > 0) ||
                    t.ended))
              )
                return (
                  l("read: emitReadable", t.length, t.ended),
                  0 === t.length && t.ended
                    ? endReadable(this)
                    : emitReadable(this),
                  null
                );
              if (0 === (e = howMuchToRead(e, t)) && t.ended)
                return 0 === t.length && endReadable(this), null;
              var n,
                i = t.needReadable;
              return (
                l("need readable", i),
                (0 === t.length || t.length - e < t.highWaterMark) &&
                  l("length less than watermark", (i = !0)),
                t.ended || t.reading
                  ? l("reading or ended", (i = !1))
                  : i &&
                    (l("do read"),
                    (t.reading = !0),
                    (t.sync = !0),
                    0 === t.length && (t.needReadable = !0),
                    this._read(t.highWaterMark),
                    (t.sync = !1),
                    t.reading || (e = howMuchToRead(r, t))),
                null === (n = e > 0 ? fromList(e, t) : null)
                  ? ((t.needReadable = t.length <= t.highWaterMark), (e = 0))
                  : ((t.length -= e), (t.awaitDrain = 0)),
                0 === t.length &&
                  (t.ended || (t.needReadable = !0),
                  r !== e && t.ended && endReadable(this)),
                null !== n && this.emit("data", n),
                n
              );
            }),
              (Readable.prototype._read = function (e) {
                E(this, new v("_read()"));
              }),
              (Readable.prototype.pipe = function (e, t) {
                var n = this,
                  i = this._readableState;
                switch (i.pipesCount) {
                  case 0:
                    i.pipes = e;
                    break;
                  case 1:
                    i.pipes = [i.pipes, e];
                    break;
                  default:
                    i.pipes.push(e);
                }
                (i.pipesCount += 1),
                  l("pipe count=%d opts=%j", i.pipesCount, t);
                var o =
                  (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr
                    ? onend
                    : unpipe;
                function onunpipe(t, r) {
                  l("onunpipe"),
                    t === n &&
                      r &&
                      !1 === r.hasUnpiped &&
                      ((r.hasUnpiped = !0),
                      (function cleanup() {
                        l("cleanup"),
                          e.removeListener("close", onclose),
                          e.removeListener("finish", onfinish),
                          e.removeListener("drain", s),
                          e.removeListener("error", onerror),
                          e.removeListener("unpipe", onunpipe),
                          n.removeListener("end", onend),
                          n.removeListener("end", unpipe),
                          n.removeListener("data", ondata),
                          (u = !0),
                          !i.awaitDrain ||
                            (e._writableState && !e._writableState.needDrain) ||
                            s();
                      })());
                }
                function onend() {
                  l("onend"), e.end();
                }
                i.endEmitted ? r.nextTick(o) : n.once("end", o),
                  e.on("unpipe", onunpipe);
                var s = (function pipeOnDrain(e) {
                  return function pipeOnDrainFunctionResult() {
                    var t = e._readableState;
                    l("pipeOnDrain", t.awaitDrain),
                      t.awaitDrain && t.awaitDrain--,
                      0 === t.awaitDrain &&
                        a(e, "data") &&
                        ((t.flowing = !0), flow(e));
                  };
                })(n);
                e.on("drain", s);
                var u = !1;
                function ondata(t) {
                  l("ondata");
                  var r = e.write(t);
                  l("dest.write", r),
                    !1 === r &&
                      (((1 === i.pipesCount && i.pipes === e) ||
                        (i.pipesCount > 1 && -1 !== indexOf(i.pipes, e))) &&
                        !u &&
                        (l("false write response, pause", i.awaitDrain),
                        i.awaitDrain++),
                      n.pause());
                }
                function onerror(t) {
                  l("onerror", t),
                    unpipe(),
                    e.removeListener("error", onerror),
                    0 === a(e, "error") && E(e, t);
                }
                function onclose() {
                  e.removeListener("finish", onfinish), unpipe();
                }
                function onfinish() {
                  l("onfinish"), e.removeListener("close", onclose), unpipe();
                }
                function unpipe() {
                  l("unpipe"), n.unpipe(e);
                }
                return (
                  n.on("data", ondata),
                  (function prependListener(e, t, r) {
                    if ("function" == typeof e.prependListener)
                      return e.prependListener(t, r);
                    e._events && e._events[t]
                      ? Array.isArray(e._events[t])
                        ? e._events[t].unshift(r)
                        : (e._events[t] = [r, e._events[t]])
                      : e.on(t, r);
                  })(e, "error", onerror),
                  e.once("close", onclose),
                  e.once("finish", onfinish),
                  e.emit("pipe", n),
                  i.flowing || (l("pipe resume"), n.resume()),
                  e
                );
              }),
              (Readable.prototype.unpipe = function (e) {
                var t = this._readableState,
                  r = { hasUnpiped: !1 };
                if (0 === t.pipesCount) return this;
                if (1 === t.pipesCount)
                  return e && e !== t.pipes
                    ? this
                    : (e || (e = t.pipes),
                      (t.pipes = null),
                      (t.pipesCount = 0),
                      (t.flowing = !1),
                      e && e.emit("unpipe", this, r),
                      this);
                if (!e) {
                  var n = t.pipes,
                    i = t.pipesCount;
                  (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
                  for (var a = 0; a < i; a++)
                    n[a].emit("unpipe", this, { hasUnpiped: !1 });
                  return this;
                }
                var o = indexOf(t.pipes, e);
                return -1 === o
                  ? this
                  : (t.pipes.splice(o, 1),
                    (t.pipesCount -= 1),
                    1 === t.pipesCount && (t.pipes = t.pipes[0]),
                    e.emit("unpipe", this, r),
                    this);
              }),
              (Readable.prototype.on = function (e, t) {
                var n = o.prototype.on.call(this, e, t),
                  i = this._readableState;
                return (
                  "data" === e
                    ? ((i.readableListening =
                        this.listenerCount("readable") > 0),
                      !1 !== i.flowing && this.resume())
                    : "readable" === e &&
                      (i.endEmitted ||
                        i.readableListening ||
                        ((i.readableListening = i.needReadable = !0),
                        (i.flowing = !1),
                        (i.emittedReadable = !1),
                        l("on readable", i.length, i.reading),
                        i.length
                          ? emitReadable(this)
                          : i.reading || r.nextTick(nReadingNextTick, this))),
                  n
                );
              }),
              (Readable.prototype.addListener = Readable.prototype.on),
              (Readable.prototype.removeListener = function (e, t) {
                var n = o.prototype.removeListener.call(this, e, t);
                return (
                  "readable" === e && r.nextTick(updateReadableListening, this),
                  n
                );
              }),
              (Readable.prototype.removeAllListeners = function (e) {
                var t = o.prototype.removeAllListeners.apply(this, arguments);
                return (
                  ("readable" !== e && void 0 !== e) ||
                    r.nextTick(updateReadableListening, this),
                  t
                );
              }),
              (Readable.prototype.resume = function () {
                var e = this._readableState;
                return (
                  e.flowing ||
                    (l("resume"),
                    (e.flowing = !e.readableListening),
                    (function resume(e, t) {
                      t.resumeScheduled ||
                        ((t.resumeScheduled = !0), r.nextTick(resume_, e, t));
                    })(this, e)),
                  (e.paused = !1),
                  this
                );
              }),
              (Readable.prototype.pause = function () {
                return (
                  l("call pause flowing=%j", this._readableState.flowing),
                  !1 !== this._readableState.flowing &&
                    (l("pause"),
                    (this._readableState.flowing = !1),
                    this.emit("pause")),
                  (this._readableState.paused = !0),
                  this
                );
              }),
              (Readable.prototype.wrap = function (e) {
                var t = this,
                  r = this._readableState,
                  n = !1;
                for (var i in (e.on("end", function () {
                  if ((l("wrapped end"), r.decoder && !r.ended)) {
                    var e = r.decoder.end();
                    e && e.length && t.push(e);
                  }
                  t.push(null);
                }),
                e.on("data", function (i) {
                  (l("wrapped data"),
                  r.decoder && (i = r.decoder.write(i)),
                  r.objectMode && null == i) ||
                    ((r.objectMode || (i && i.length)) &&
                      (t.push(i) || ((n = !0), e.pause())));
                }),
                e))
                  void 0 === this[i] &&
                    "function" == typeof e[i] &&
                    (this[i] = (function methodWrap(t) {
                      return function methodWrapReturnFunction() {
                        return e[t].apply(e, arguments);
                      };
                    })(i));
                for (var a = 0; a < x.length; a++)
                  e.on(x[a], this.emit.bind(this, x[a]));
                return (
                  (this._read = function (t) {
                    l("wrapped _read", t), n && ((n = !1), e.resume());
                  }),
                  this
                );
              }),
              "function" == typeof Symbol &&
                (Readable.prototype[Symbol.asyncIterator] = function () {
                  return (
                    void 0 === h &&
                      (h = e("./internal/streams/async_iterator")),
                    h(this)
                  );
                }),
              Object.defineProperty(
                Readable.prototype,
                "readableHighWaterMark",
                {
                  enumerable: !1,
                  get: function get() {
                    return this._readableState.highWaterMark;
                  },
                }
              ),
              Object.defineProperty(Readable.prototype, "readableBuffer", {
                enumerable: !1,
                get: function get() {
                  return this._readableState && this._readableState.buffer;
                },
              }),
              Object.defineProperty(Readable.prototype, "readableFlowing", {
                enumerable: !1,
                get: function get() {
                  return this._readableState.flowing;
                },
                set: function set(e) {
                  this._readableState && (this._readableState.flowing = e);
                },
              }),
              (Readable._fromList = fromList),
              Object.defineProperty(Readable.prototype, "readableLength", {
                enumerable: !1,
                get: function get() {
                  return this._readableState.length;
                },
              }),
              "function" == typeof Symbol &&
                (Readable.from = function (t, r) {
                  return (
                    void 0 === p && (p = e("./internal/streams/from")),
                    p(Readable, t, r)
                  );
                });
          }.call(
            this,
            e("_process"),
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "../errors": 26,
          "./_stream_duplex": 27,
          "./internal/streams/async_iterator": 32,
          "./internal/streams/buffer_list": 33,
          "./internal/streams/destroy": 34,
          "./internal/streams/from": 36,
          "./internal/streams/state": 38,
          "./internal/streams/stream": 39,
          _process: 14,
          buffer: 5,
          events: 8,
          inherits: 12,
          "string_decoder/": 41,
          util: 3,
        },
      ],
      30: [
        function (e, t, r) {
          "use strict";
          t.exports = Transform;
          var n = e("../errors").codes,
            i = n.ERR_METHOD_NOT_IMPLEMENTED,
            a = n.ERR_MULTIPLE_CALLBACK,
            o = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
            s = n.ERR_TRANSFORM_WITH_LENGTH_0,
            u = e("./_stream_duplex");
          function afterTransform(e, t) {
            var r = this._transformState;
            r.transforming = !1;
            var n = r.writecb;
            if (null === n) return this.emit("error", new a());
            (r.writechunk = null),
              (r.writecb = null),
              null != t && this.push(t),
              n(e);
            var i = this._readableState;
            (i.reading = !1),
              (i.needReadable || i.length < i.highWaterMark) &&
                this._read(i.highWaterMark);
          }
          function Transform(e) {
            if (!(this instanceof Transform)) return new Transform(e);
            u.call(this, e),
              (this._transformState = {
                afterTransform: afterTransform.bind(this),
                needTransform: !1,
                transforming: !1,
                writecb: null,
                writechunk: null,
                writeencoding: null,
              }),
              (this._readableState.needReadable = !0),
              (this._readableState.sync = !1),
              e &&
                ("function" == typeof e.transform &&
                  (this._transform = e.transform),
                "function" == typeof e.flush && (this._flush = e.flush)),
              this.on("prefinish", prefinish);
          }
          function prefinish() {
            var e = this;
            "function" != typeof this._flush || this._readableState.destroyed
              ? done(this, null, null)
              : this._flush(function (t, r) {
                  done(e, t, r);
                });
          }
          function done(e, t, r) {
            if (t) return e.emit("error", t);
            if ((null != r && e.push(r), e._writableState.length))
              throw new s();
            if (e._transformState.transforming) throw new o();
            return e.push(null);
          }
          e("inherits")(Transform, u),
            (Transform.prototype.push = function (e, t) {
              return (
                (this._transformState.needTransform = !1),
                u.prototype.push.call(this, e, t)
              );
            }),
            (Transform.prototype._transform = function (e, t, r) {
              r(new i("_transform()"));
            }),
            (Transform.prototype._write = function (e, t, r) {
              var n = this._transformState;
              if (
                ((n.writecb = r),
                (n.writechunk = e),
                (n.writeencoding = t),
                !n.transforming)
              ) {
                var i = this._readableState;
                (n.needTransform ||
                  i.needReadable ||
                  i.length < i.highWaterMark) &&
                  this._read(i.highWaterMark);
              }
            }),
            (Transform.prototype._read = function (e) {
              var t = this._transformState;
              null === t.writechunk || t.transforming
                ? (t.needTransform = !0)
                : ((t.transforming = !0),
                  this._transform(
                    t.writechunk,
                    t.writeencoding,
                    t.afterTransform
                  ));
            }),
            (Transform.prototype._destroy = function (e, t) {
              u.prototype._destroy.call(this, e, function (e) {
                t(e);
              });
            });
        },
        { "../errors": 26, "./_stream_duplex": 27, inherits: 12 },
      ],
      31: [
        function (e, t, r) {
          (function (r, n) {
            "use strict";
            function CorkedRequest(e) {
              var t = this;
              (this.next = null),
                (this.entry = null),
                (this.finish = function () {
                  !(function onCorkedFinish(e, t, r) {
                    var n = e.entry;
                    e.entry = null;
                    for (; n; ) {
                      var i = n.callback;
                      t.pendingcb--, i(r), (n = n.next);
                    }
                    t.corkedRequestsFree.next = e;
                  })(t, e);
                });
            }
            var i;
            (t.exports = Writable), (Writable.WritableState = WritableState);
            var a = { deprecate: e("util-deprecate") },
              o = e("./internal/streams/stream"),
              s = e("buffer").Buffer,
              u = n.Uint8Array || function () {};
            var l,
              c = e("./internal/streams/destroy"),
              f = e("./internal/streams/state").getHighWaterMark,
              h = e("../errors").codes,
              p = h.ERR_INVALID_ARG_TYPE,
              d = h.ERR_METHOD_NOT_IMPLEMENTED,
              y = h.ERR_MULTIPLE_CALLBACK,
              m = h.ERR_STREAM_CANNOT_PIPE,
              w = h.ERR_STREAM_DESTROYED,
              b = h.ERR_STREAM_NULL_VALUES,
              g = h.ERR_STREAM_WRITE_AFTER_END,
              v = h.ERR_UNKNOWN_ENCODING,
              _ = c.errorOrDestroy;
            function nop() {}
            function WritableState(t, n, a) {
              (i = i || e("./_stream_duplex")),
                (t = t || {}),
                "boolean" != typeof a && (a = n instanceof i),
                (this.objectMode = !!t.objectMode),
                a &&
                  (this.objectMode = this.objectMode || !!t.writableObjectMode),
                (this.highWaterMark = f(this, t, "writableHighWaterMark", a)),
                (this.finalCalled = !1),
                (this.needDrain = !1),
                (this.ending = !1),
                (this.ended = !1),
                (this.finished = !1),
                (this.destroyed = !1);
              var o = !1 === t.decodeStrings;
              (this.decodeStrings = !o),
                (this.defaultEncoding = t.defaultEncoding || "utf8"),
                (this.length = 0),
                (this.writing = !1),
                (this.corked = 0),
                (this.sync = !0),
                (this.bufferProcessing = !1),
                (this.onwrite = function (e) {
                  !(function onwrite(e, t) {
                    var n = e._writableState,
                      i = n.sync,
                      a = n.writecb;
                    if ("function" != typeof a) throw new y();
                    if (
                      ((function onwriteStateUpdate(e) {
                        (e.writing = !1),
                          (e.writecb = null),
                          (e.length -= e.writelen),
                          (e.writelen = 0);
                      })(n),
                      t)
                    )
                      !(function onwriteError(e, t, n, i, a) {
                        --t.pendingcb,
                          n
                            ? (r.nextTick(a, i),
                              r.nextTick(finishMaybe, e, t),
                              (e._writableState.errorEmitted = !0),
                              _(e, i))
                            : (a(i),
                              (e._writableState.errorEmitted = !0),
                              _(e, i),
                              finishMaybe(e, t));
                      })(e, n, i, t, a);
                    else {
                      var o = needFinish(n) || e.destroyed;
                      o ||
                        n.corked ||
                        n.bufferProcessing ||
                        !n.bufferedRequest ||
                        clearBuffer(e, n),
                        i
                          ? r.nextTick(afterWrite, e, n, o, a)
                          : afterWrite(e, n, o, a);
                    }
                  })(n, e);
                }),
                (this.writecb = null),
                (this.writelen = 0),
                (this.bufferedRequest = null),
                (this.lastBufferedRequest = null),
                (this.pendingcb = 0),
                (this.prefinished = !1),
                (this.errorEmitted = !1),
                (this.emitClose = !1 !== t.emitClose),
                (this.autoDestroy = !!t.autoDestroy),
                (this.bufferedRequestCount = 0),
                (this.corkedRequestsFree = new CorkedRequest(this));
            }
            function Writable(t) {
              var r = this instanceof (i = i || e("./_stream_duplex"));
              if (!r && !l.call(Writable, this)) return new Writable(t);
              (this._writableState = new WritableState(t, this, r)),
                (this.writable = !0),
                t &&
                  ("function" == typeof t.write && (this._write = t.write),
                  "function" == typeof t.writev && (this._writev = t.writev),
                  "function" == typeof t.destroy && (this._destroy = t.destroy),
                  "function" == typeof t.final && (this._final = t.final)),
                o.call(this);
            }
            function doWrite(e, t, r, n, i, a, o) {
              (t.writelen = n),
                (t.writecb = o),
                (t.writing = !0),
                (t.sync = !0),
                t.destroyed
                  ? t.onwrite(new w("write"))
                  : r
                  ? e._writev(i, t.onwrite)
                  : e._write(i, a, t.onwrite),
                (t.sync = !1);
            }
            function afterWrite(e, t, r, n) {
              r ||
                (function onwriteDrain(e, t) {
                  0 === t.length &&
                    t.needDrain &&
                    ((t.needDrain = !1), e.emit("drain"));
                })(e, t),
                t.pendingcb--,
                n(),
                finishMaybe(e, t);
            }
            function clearBuffer(e, t) {
              t.bufferProcessing = !0;
              var r = t.bufferedRequest;
              if (e._writev && r && r.next) {
                var n = t.bufferedRequestCount,
                  i = new Array(n),
                  a = t.corkedRequestsFree;
                a.entry = r;
                for (var o = 0, s = !0; r; )
                  (i[o] = r), r.isBuf || (s = !1), (r = r.next), (o += 1);
                (i.allBuffers = s),
                  doWrite(e, t, !0, t.length, i, "", a.finish),
                  t.pendingcb++,
                  (t.lastBufferedRequest = null),
                  a.next
                    ? ((t.corkedRequestsFree = a.next), (a.next = null))
                    : (t.corkedRequestsFree = new CorkedRequest(t)),
                  (t.bufferedRequestCount = 0);
              } else {
                for (; r; ) {
                  var u = r.chunk,
                    l = r.encoding,
                    c = r.callback;
                  if (
                    (doWrite(e, t, !1, t.objectMode ? 1 : u.length, u, l, c),
                    (r = r.next),
                    t.bufferedRequestCount--,
                    t.writing)
                  )
                    break;
                }
                null === r && (t.lastBufferedRequest = null);
              }
              (t.bufferedRequest = r), (t.bufferProcessing = !1);
            }
            function needFinish(e) {
              return (
                e.ending &&
                0 === e.length &&
                null === e.bufferedRequest &&
                !e.finished &&
                !e.writing
              );
            }
            function callFinal(e, t) {
              e._final(function (r) {
                t.pendingcb--,
                  r && _(e, r),
                  (t.prefinished = !0),
                  e.emit("prefinish"),
                  finishMaybe(e, t);
              });
            }
            function finishMaybe(e, t) {
              var n = needFinish(t);
              if (
                n &&
                ((function prefinish(e, t) {
                  t.prefinished ||
                    t.finalCalled ||
                    ("function" != typeof e._final || t.destroyed
                      ? ((t.prefinished = !0), e.emit("prefinish"))
                      : (t.pendingcb++,
                        (t.finalCalled = !0),
                        r.nextTick(callFinal, e, t)));
                })(e, t),
                0 === t.pendingcb &&
                  ((t.finished = !0), e.emit("finish"), t.autoDestroy))
              ) {
                var i = e._readableState;
                (!i || (i.autoDestroy && i.endEmitted)) && e.destroy();
              }
              return n;
            }
            e("inherits")(Writable, o),
              (WritableState.prototype.getBuffer = function getBuffer() {
                for (var e = this.bufferedRequest, t = []; e; )
                  t.push(e), (e = e.next);
                return t;
              }),
              (function () {
                try {
                  Object.defineProperty(WritableState.prototype, "buffer", {
                    get: a.deprecate(
                      function writableStateBufferGetter() {
                        return this.getBuffer();
                      },
                      "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
                      "DEP0003"
                    ),
                  });
                } catch (e) {}
              })(),
              "function" == typeof Symbol &&
              Symbol.hasInstance &&
              "function" == typeof Function.prototype[Symbol.hasInstance]
                ? ((l = Function.prototype[Symbol.hasInstance]),
                  Object.defineProperty(Writable, Symbol.hasInstance, {
                    value: function value(e) {
                      return (
                        !!l.call(this, e) ||
                        (this === Writable &&
                          e &&
                          e._writableState instanceof WritableState)
                      );
                    },
                  }))
                : (l = function realHasInstance(e) {
                    return e instanceof this;
                  }),
              (Writable.prototype.pipe = function () {
                _(this, new m());
              }),
              (Writable.prototype.write = function (e, t, n) {
                var i = this._writableState,
                  a = !1,
                  o =
                    !i.objectMode &&
                    (function _isUint8Array(e) {
                      return s.isBuffer(e) || e instanceof u;
                    })(e);
                return (
                  o &&
                    !s.isBuffer(e) &&
                    (e = (function _uint8ArrayToBuffer(e) {
                      return s.from(e);
                    })(e)),
                  "function" == typeof t && ((n = t), (t = null)),
                  o ? (t = "buffer") : t || (t = i.defaultEncoding),
                  "function" != typeof n && (n = nop),
                  i.ending
                    ? (function writeAfterEnd(e, t) {
                        var n = new g();
                        _(e, n), r.nextTick(t, n);
                      })(this, n)
                    : (o ||
                        (function validChunk(e, t, n, i) {
                          var a;
                          return (
                            null === n
                              ? (a = new b())
                              : "string" == typeof n ||
                                t.objectMode ||
                                (a = new p("chunk", ["string", "Buffer"], n)),
                            !a || (_(e, a), r.nextTick(i, a), !1)
                          );
                        })(this, i, e, n)) &&
                      (i.pendingcb++,
                      (a = (function writeOrBuffer(e, t, r, n, i, a) {
                        if (!r) {
                          var o = (function decodeChunk(e, t, r) {
                            e.objectMode ||
                              !1 === e.decodeStrings ||
                              "string" != typeof t ||
                              (t = s.from(t, r));
                            return t;
                          })(t, n, i);
                          n !== o && ((r = !0), (i = "buffer"), (n = o));
                        }
                        var u = t.objectMode ? 1 : n.length;
                        t.length += u;
                        var l = t.length < t.highWaterMark;
                        l || (t.needDrain = !0);
                        if (t.writing || t.corked) {
                          var c = t.lastBufferedRequest;
                          (t.lastBufferedRequest = {
                            chunk: n,
                            encoding: i,
                            isBuf: r,
                            callback: a,
                            next: null,
                          }),
                            c
                              ? (c.next = t.lastBufferedRequest)
                              : (t.bufferedRequest = t.lastBufferedRequest),
                            (t.bufferedRequestCount += 1);
                        } else doWrite(e, t, !1, u, n, i, a);
                        return l;
                      })(this, i, o, e, t, n))),
                  a
                );
              }),
              (Writable.prototype.cork = function () {
                this._writableState.corked++;
              }),
              (Writable.prototype.uncork = function () {
                var e = this._writableState;
                e.corked &&
                  (e.corked--,
                  e.writing ||
                    e.corked ||
                    e.bufferProcessing ||
                    !e.bufferedRequest ||
                    clearBuffer(this, e));
              }),
              (Writable.prototype.setDefaultEncoding = function setDefaultEncoding(
                e
              ) {
                if (
                  ("string" == typeof e && (e = e.toLowerCase()),
                  !(
                    [
                      "hex",
                      "utf8",
                      "utf-8",
                      "ascii",
                      "binary",
                      "base64",
                      "ucs2",
                      "ucs-2",
                      "utf16le",
                      "utf-16le",
                      "raw",
                    ].indexOf((e + "").toLowerCase()) > -1
                  ))
                )
                  throw new v(e);
                return (this._writableState.defaultEncoding = e), this;
              }),
              Object.defineProperty(Writable.prototype, "writableBuffer", {
                enumerable: !1,
                get: function get() {
                  return this._writableState && this._writableState.getBuffer();
                },
              }),
              Object.defineProperty(
                Writable.prototype,
                "writableHighWaterMark",
                {
                  enumerable: !1,
                  get: function get() {
                    return this._writableState.highWaterMark;
                  },
                }
              ),
              (Writable.prototype._write = function (e, t, r) {
                r(new d("_write()"));
              }),
              (Writable.prototype._writev = null),
              (Writable.prototype.end = function (e, t, n) {
                var i = this._writableState;
                return (
                  "function" == typeof e
                    ? ((n = e), (e = null), (t = null))
                    : "function" == typeof t && ((n = t), (t = null)),
                  null != e && this.write(e, t),
                  i.corked && ((i.corked = 1), this.uncork()),
                  i.ending ||
                    (function endWritable(e, t, n) {
                      (t.ending = !0),
                        finishMaybe(e, t),
                        n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                      (t.ended = !0), (e.writable = !1);
                    })(this, i, n),
                  this
                );
              }),
              Object.defineProperty(Writable.prototype, "writableLength", {
                enumerable: !1,
                get: function get() {
                  return this._writableState.length;
                },
              }),
              Object.defineProperty(Writable.prototype, "destroyed", {
                enumerable: !1,
                get: function get() {
                  return (
                    void 0 !== this._writableState &&
                    this._writableState.destroyed
                  );
                },
                set: function set(e) {
                  this._writableState && (this._writableState.destroyed = e);
                },
              }),
              (Writable.prototype.destroy = c.destroy),
              (Writable.prototype._undestroy = c.undestroy),
              (Writable.prototype._destroy = function (e, t) {
                t(e);
              });
          }.call(
            this,
            e("_process"),
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {
          "../errors": 26,
          "./_stream_duplex": 27,
          "./internal/streams/destroy": 34,
          "./internal/streams/state": 38,
          "./internal/streams/stream": 39,
          _process: 14,
          buffer: 5,
          inherits: 12,
          "util-deprecate": 45,
        },
      ],
      32: [
        function (e, t, r) {
          (function (r) {
            "use strict";
            var n;
            function _defineProperty(e, t, r) {
              return (
                t in e
                  ? Object.defineProperty(e, t, {
                      value: r,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (e[t] = r),
                e
              );
            }
            var i = e("./end-of-stream"),
              a = Symbol("lastResolve"),
              o = Symbol("lastReject"),
              s = Symbol("error"),
              u = Symbol("ended"),
              l = Symbol("lastPromise"),
              c = Symbol("handlePromise"),
              f = Symbol("stream");
            function createIterResult(e, t) {
              return { value: e, done: t };
            }
            function readAndResolve(e) {
              var t = e[a];
              if (null !== t) {
                var r = e[f].read();
                null !== r &&
                  ((e[l] = null),
                  (e[a] = null),
                  (e[o] = null),
                  t(createIterResult(r, !1)));
              }
            }
            function onReadable(e) {
              r.nextTick(readAndResolve, e);
            }
            var h = Object.getPrototypeOf(function () {}),
              p = Object.setPrototypeOf(
                (_defineProperty(
                  (n = {
                    get stream() {
                      return this[f];
                    },
                    next: function next() {
                      var e = this,
                        t = this[s];
                      if (null !== t) return Promise.reject(t);
                      if (this[u])
                        return Promise.resolve(createIterResult(void 0, !0));
                      if (this[f].destroyed)
                        return new Promise(function (t, n) {
                          r.nextTick(function () {
                            e[s] ? n(e[s]) : t(createIterResult(void 0, !0));
                          });
                        });
                      var n,
                        i = this[l];
                      if (i)
                        n = new Promise(
                          (function wrapForNext(e, t) {
                            return function (r, n) {
                              e.then(function () {
                                t[u]
                                  ? r(createIterResult(void 0, !0))
                                  : t[c](r, n);
                              }, n);
                            };
                          })(i, this)
                        );
                      else {
                        var a = this[f].read();
                        if (null !== a)
                          return Promise.resolve(createIterResult(a, !1));
                        n = new Promise(this[c]);
                      }
                      return (this[l] = n), n;
                    },
                  }),
                  Symbol.asyncIterator,
                  function () {
                    return this;
                  }
                ),
                _defineProperty(n, "return", function _return() {
                  var e = this;
                  return new Promise(function (t, r) {
                    e[f].destroy(null, function (e) {
                      e ? r(e) : t(createIterResult(void 0, !0));
                    });
                  });
                }),
                n),
                h
              );
            t.exports = function createReadableStreamAsyncIterator(e) {
              var t,
                r = Object.create(
                  p,
                  (_defineProperty((t = {}), f, { value: e, writable: !0 }),
                  _defineProperty(t, a, { value: null, writable: !0 }),
                  _defineProperty(t, o, { value: null, writable: !0 }),
                  _defineProperty(t, s, { value: null, writable: !0 }),
                  _defineProperty(t, u, {
                    value: e._readableState.endEmitted,
                    writable: !0,
                  }),
                  _defineProperty(t, c, {
                    value: function value(e, t) {
                      var n = r[f].read();
                      n
                        ? ((r[l] = null),
                          (r[a] = null),
                          (r[o] = null),
                          e(createIterResult(n, !1)))
                        : ((r[a] = e), (r[o] = t));
                    },
                    writable: !0,
                  }),
                  t)
                );
              return (
                (r[l] = null),
                i(e, function (e) {
                  if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                    var t = r[o];
                    return (
                      null !== t &&
                        ((r[l] = null), (r[a] = null), (r[o] = null), t(e)),
                      void (r[s] = e)
                    );
                  }
                  var n = r[a];
                  null !== n &&
                    ((r[l] = null),
                    (r[a] = null),
                    (r[o] = null),
                    n(createIterResult(void 0, !0))),
                    (r[u] = !0);
                }),
                e.on("readable", onReadable.bind(null, r)),
                r
              );
            };
          }.call(this, e("_process")));
        },
        { "./end-of-stream": 35, _process: 14 },
      ],
      33: [
        function (e, t, r) {
          "use strict";
          function ownKeys(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var n = Object.getOwnPropertySymbols(e);
              t &&
                (n = n.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                r.push.apply(r, n);
            }
            return r;
          }
          function _defineProperty(e, t, r) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = r),
              e
            );
          }
          function _defineProperties(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          var n = e("buffer").Buffer,
            i = e("util").inspect,
            a = (i && i.custom) || "inspect";
          t.exports = (function () {
            function BufferList() {
              !(function _classCallCheck(e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, BufferList),
                (this.head = null),
                (this.tail = null),
                (this.length = 0);
            }
            return (
              (function _createClass(e, t, r) {
                return (
                  t && _defineProperties(e.prototype, t),
                  r && _defineProperties(e, r),
                  e
                );
              })(BufferList, [
                {
                  key: "push",
                  value: function push(e) {
                    var t = { data: e, next: null };
                    this.length > 0 ? (this.tail.next = t) : (this.head = t),
                      (this.tail = t),
                      ++this.length;
                  },
                },
                {
                  key: "unshift",
                  value: function unshift(e) {
                    var t = { data: e, next: this.head };
                    0 === this.length && (this.tail = t),
                      (this.head = t),
                      ++this.length;
                  },
                },
                {
                  key: "shift",
                  value: function shift() {
                    if (0 !== this.length) {
                      var e = this.head.data;
                      return (
                        1 === this.length
                          ? (this.head = this.tail = null)
                          : (this.head = this.head.next),
                        --this.length,
                        e
                      );
                    }
                  },
                },
                {
                  key: "clear",
                  value: function clear() {
                    (this.head = this.tail = null), (this.length = 0);
                  },
                },
                {
                  key: "join",
                  value: function join(e) {
                    if (0 === this.length) return "";
                    for (var t = this.head, r = "" + t.data; (t = t.next); )
                      r += e + t.data;
                    return r;
                  },
                },
                {
                  key: "concat",
                  value: function concat(e) {
                    if (0 === this.length) return n.alloc(0);
                    for (
                      var t,
                        r,
                        i,
                        a = n.allocUnsafe(e >>> 0),
                        o = this.head,
                        s = 0;
                      o;

                    )
                      (t = o.data),
                        (r = a),
                        (i = s),
                        n.prototype.copy.call(t, r, i),
                        (s += o.data.length),
                        (o = o.next);
                    return a;
                  },
                },
                {
                  key: "consume",
                  value: function consume(e, t) {
                    var r;
                    return (
                      e < this.head.data.length
                        ? ((r = this.head.data.slice(0, e)),
                          (this.head.data = this.head.data.slice(e)))
                        : (r =
                            e === this.head.data.length
                              ? this.shift()
                              : t
                              ? this._getString(e)
                              : this._getBuffer(e)),
                      r
                    );
                  },
                },
                {
                  key: "first",
                  value: function first() {
                    return this.head.data;
                  },
                },
                {
                  key: "_getString",
                  value: function _getString(e) {
                    var t = this.head,
                      r = 1,
                      n = t.data;
                    for (e -= n.length; (t = t.next); ) {
                      var i = t.data,
                        a = e > i.length ? i.length : e;
                      if (
                        (a === i.length ? (n += i) : (n += i.slice(0, e)),
                        0 === (e -= a))
                      ) {
                        a === i.length
                          ? (++r,
                            t.next
                              ? (this.head = t.next)
                              : (this.head = this.tail = null))
                          : ((this.head = t), (t.data = i.slice(a)));
                        break;
                      }
                      ++r;
                    }
                    return (this.length -= r), n;
                  },
                },
                {
                  key: "_getBuffer",
                  value: function _getBuffer(e) {
                    var t = n.allocUnsafe(e),
                      r = this.head,
                      i = 1;
                    for (r.data.copy(t), e -= r.data.length; (r = r.next); ) {
                      var a = r.data,
                        o = e > a.length ? a.length : e;
                      if ((a.copy(t, t.length - e, 0, o), 0 === (e -= o))) {
                        o === a.length
                          ? (++i,
                            r.next
                              ? (this.head = r.next)
                              : (this.head = this.tail = null))
                          : ((this.head = r), (r.data = a.slice(o)));
                        break;
                      }
                      ++i;
                    }
                    return (this.length -= i), t;
                  },
                },
                {
                  key: a,
                  value: function value(e, t) {
                    return i(
                      this,
                      (function _objectSpread(e) {
                        for (var t = 1; t < arguments.length; t++) {
                          var r = null != arguments[t] ? arguments[t] : {};
                          t % 2
                            ? ownKeys(Object(r), !0).forEach(function (t) {
                                _defineProperty(e, t, r[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(
                                e,
                                Object.getOwnPropertyDescriptors(r)
                              )
                            : ownKeys(Object(r)).forEach(function (t) {
                                Object.defineProperty(
                                  e,
                                  t,
                                  Object.getOwnPropertyDescriptor(r, t)
                                );
                              });
                        }
                        return e;
                      })({}, t, { depth: 0, customInspect: !1 })
                    );
                  },
                },
              ]),
              BufferList
            );
          })();
        },
        { buffer: 5, util: 3 },
      ],
      34: [
        function (e, t, r) {
          (function (e) {
            "use strict";
            function emitErrorAndCloseNT(e, t) {
              emitErrorNT(e, t), emitCloseNT(e);
            }
            function emitCloseNT(e) {
              (e._writableState && !e._writableState.emitClose) ||
                (e._readableState && !e._readableState.emitClose) ||
                e.emit("close");
            }
            function emitErrorNT(e, t) {
              e.emit("error", t);
            }
            t.exports = {
              destroy: function destroy(t, r) {
                var n = this,
                  i = this._readableState && this._readableState.destroyed,
                  a = this._writableState && this._writableState.destroyed;
                return i || a
                  ? (r
                      ? r(t)
                      : t &&
                        (this._writableState
                          ? this._writableState.errorEmitted ||
                            ((this._writableState.errorEmitted = !0),
                            e.nextTick(emitErrorNT, this, t))
                          : e.nextTick(emitErrorNT, this, t)),
                    this)
                  : (this._readableState &&
                      (this._readableState.destroyed = !0),
                    this._writableState && (this._writableState.destroyed = !0),
                    this._destroy(t || null, function (t) {
                      !r && t
                        ? n._writableState
                          ? n._writableState.errorEmitted
                            ? e.nextTick(emitCloseNT, n)
                            : ((n._writableState.errorEmitted = !0),
                              e.nextTick(emitErrorAndCloseNT, n, t))
                          : e.nextTick(emitErrorAndCloseNT, n, t)
                        : r
                        ? (e.nextTick(emitCloseNT, n), r(t))
                        : e.nextTick(emitCloseNT, n);
                    }),
                    this);
              },
              undestroy: function undestroy() {
                this._readableState &&
                  ((this._readableState.destroyed = !1),
                  (this._readableState.reading = !1),
                  (this._readableState.ended = !1),
                  (this._readableState.endEmitted = !1)),
                  this._writableState &&
                    ((this._writableState.destroyed = !1),
                    (this._writableState.ended = !1),
                    (this._writableState.ending = !1),
                    (this._writableState.finalCalled = !1),
                    (this._writableState.prefinished = !1),
                    (this._writableState.finished = !1),
                    (this._writableState.errorEmitted = !1));
              },
              errorOrDestroy: function errorOrDestroy(e, t) {
                var r = e._readableState,
                  n = e._writableState;
                (r && r.autoDestroy) || (n && n.autoDestroy)
                  ? e.destroy(t)
                  : e.emit("error", t);
              },
            };
          }.call(this, e("_process")));
        },
        { _process: 14 },
      ],
      35: [
        function (e, t, r) {
          "use strict";
          var n = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
          function noop() {}
          t.exports = function eos(e, t, r) {
            if ("function" == typeof t) return eos(e, null, t);
            t || (t = {}),
              (r = (function once(e) {
                var t = !1;
                return function () {
                  if (!t) {
                    t = !0;
                    for (
                      var r = arguments.length, n = new Array(r), i = 0;
                      i < r;
                      i++
                    )
                      n[i] = arguments[i];
                    e.apply(this, n);
                  }
                };
              })(r || noop));
            var i = t.readable || (!1 !== t.readable && e.readable),
              a = t.writable || (!1 !== t.writable && e.writable),
              o = function onlegacyfinish() {
                e.writable || u();
              },
              s = e._writableState && e._writableState.finished,
              u = function onfinish() {
                (a = !1), (s = !0), i || r.call(e);
              },
              l = e._readableState && e._readableState.endEmitted,
              c = function onend() {
                (i = !1), (l = !0), a || r.call(e);
              },
              f = function onerror(t) {
                r.call(e, t);
              },
              h = function onclose() {
                var t;
                return i && !l
                  ? ((e._readableState && e._readableState.ended) ||
                      (t = new n()),
                    r.call(e, t))
                  : a && !s
                  ? ((e._writableState && e._writableState.ended) ||
                      (t = new n()),
                    r.call(e, t))
                  : void 0;
              },
              p = function onrequest() {
                e.req.on("finish", u);
              };
            return (
              !(function isRequest(e) {
                return e.setHeader && "function" == typeof e.abort;
              })(e)
                ? a && !e._writableState && (e.on("end", o), e.on("close", o))
                : (e.on("complete", u),
                  e.on("abort", h),
                  e.req ? p() : e.on("request", p)),
              e.on("end", c),
              e.on("finish", u),
              !1 !== t.error && e.on("error", f),
              e.on("close", h),
              function () {
                e.removeListener("complete", u),
                  e.removeListener("abort", h),
                  e.removeListener("request", p),
                  e.req && e.req.removeListener("finish", u),
                  e.removeListener("end", o),
                  e.removeListener("close", o),
                  e.removeListener("finish", u),
                  e.removeListener("end", c),
                  e.removeListener("error", f),
                  e.removeListener("close", h);
              }
            );
          };
        },
        { "../../../errors": 26 },
      ],
      36: [
        function (e, t, r) {
          t.exports = function () {
            throw new Error("Readable.from is not available in the browser");
          };
        },
        {},
      ],
      37: [
        function (e, t, r) {
          "use strict";
          var n;
          var i = e("../../../errors").codes,
            a = i.ERR_MISSING_ARGS,
            o = i.ERR_STREAM_DESTROYED;
          function noop(e) {
            if (e) throw e;
          }
          function call(e) {
            e();
          }
          function pipe(e, t) {
            return e.pipe(t);
          }
          t.exports = function pipeline() {
            for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++)
              r[i] = arguments[i];
            var s,
              u = (function popCallback(e) {
                return e.length
                  ? "function" != typeof e[e.length - 1]
                    ? noop
                    : e.pop()
                  : noop;
              })(r);
            if ((Array.isArray(r[0]) && (r = r[0]), r.length < 2))
              throw new a("streams");
            var l = r.map(function (t, i) {
              var a = i < r.length - 1;
              return (function destroyer(t, r, i, a) {
                a = (function once(e) {
                  var t = !1;
                  return function () {
                    t || ((t = !0), e.apply(void 0, arguments));
                  };
                })(a);
                var s = !1;
                t.on("close", function () {
                  s = !0;
                }),
                  void 0 === n && (n = e("./end-of-stream")),
                  n(t, { readable: r, writable: i }, function (e) {
                    if (e) return a(e);
                    (s = !0), a();
                  });
                var u = !1;
                return function (e) {
                  if (!s && !u)
                    return (
                      (u = !0),
                      (function isRequest(e) {
                        return e.setHeader && "function" == typeof e.abort;
                      })(t)
                        ? t.abort()
                        : "function" == typeof t.destroy
                        ? t.destroy()
                        : void a(e || new o("pipe"))
                    );
                };
              })(t, a, i > 0, function (e) {
                s || (s = e),
                  e && l.forEach(call),
                  a || (l.forEach(call), u(s));
              });
            });
            return r.reduce(pipe);
          };
        },
        { "../../../errors": 26, "./end-of-stream": 35 },
      ],
      38: [
        function (e, t, r) {
          "use strict";
          var n = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
          t.exports = {
            getHighWaterMark: function getHighWaterMark(e, t, r, i) {
              var a = (function highWaterMarkFrom(e, t, r) {
                return null != e.highWaterMark
                  ? e.highWaterMark
                  : t
                  ? e[r]
                  : null;
              })(t, i, r);
              if (null != a) {
                if (!isFinite(a) || Math.floor(a) !== a || a < 0)
                  throw new n(i ? r : "highWaterMark", a);
                return Math.floor(a);
              }
              return e.objectMode ? 16 : 16384;
            },
          };
        },
        { "../../../errors": 26 },
      ],
      39: [
        function (e, t, r) {
          t.exports = e("events").EventEmitter;
        },
        { events: 8 },
      ],
      40: [
        function (e, t, r) {
          ((r = t.exports = e("./lib/_stream_readable.js")).Stream = r),
            (r.Readable = r),
            (r.Writable = e("./lib/_stream_writable.js")),
            (r.Duplex = e("./lib/_stream_duplex.js")),
            (r.Transform = e("./lib/_stream_transform.js")),
            (r.PassThrough = e("./lib/_stream_passthrough.js")),
            (r.finished = e("./lib/internal/streams/end-of-stream.js")),
            (r.pipeline = e("./lib/internal/streams/pipeline.js"));
        },
        {
          "./lib/_stream_duplex.js": 27,
          "./lib/_stream_passthrough.js": 28,
          "./lib/_stream_readable.js": 29,
          "./lib/_stream_transform.js": 30,
          "./lib/_stream_writable.js": 31,
          "./lib/internal/streams/end-of-stream.js": 35,
          "./lib/internal/streams/pipeline.js": 37,
        },
      ],
      41: [
        function (e, t, r) {
          "use strict";
          var n = e("safe-buffer").Buffer,
            i =
              n.isEncoding ||
              function (e) {
                switch ((e = "" + e) && e.toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                  case "raw":
                    return !0;
                  default:
                    return !1;
                }
              };
          function StringDecoder(e) {
            var t;
            switch (
              ((this.encoding = (function normalizeEncoding(e) {
                var t = (function _normalizeEncoding(e) {
                  if (!e) return "utf8";
                  for (var t; ; )
                    switch (e) {
                      case "utf8":
                      case "utf-8":
                        return "utf8";
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return "utf16le";
                      case "latin1":
                      case "binary":
                        return "latin1";
                      case "base64":
                      case "ascii":
                      case "hex":
                        return e;
                      default:
                        if (t) return;
                        (e = ("" + e).toLowerCase()), (t = !0);
                    }
                })(e);
                if ("string" != typeof t && (n.isEncoding === i || !i(e)))
                  throw new Error("Unknown encoding: " + e);
                return t || e;
              })(e)),
              this.encoding)
            ) {
              case "utf16le":
                (this.text = utf16Text), (this.end = utf16End), (t = 4);
                break;
              case "utf8":
                (this.fillLast = utf8FillLast), (t = 4);
                break;
              case "base64":
                (this.text = base64Text), (this.end = base64End), (t = 3);
                break;
              default:
                return (this.write = simpleWrite), void (this.end = simpleEnd);
            }
            (this.lastNeed = 0),
              (this.lastTotal = 0),
              (this.lastChar = n.allocUnsafe(t));
          }
          function utf8CheckByte(e) {
            return e <= 127
              ? 0
              : e >> 5 == 6
              ? 2
              : e >> 4 == 14
              ? 3
              : e >> 3 == 30
              ? 4
              : e >> 6 == 2
              ? -1
              : -2;
          }
          function utf8FillLast(e) {
            var t = this.lastTotal - this.lastNeed,
              r = (function utf8CheckExtraBytes(e, t, r) {
                if (128 != (192 & t[0])) return (e.lastNeed = 0), "�";
                if (e.lastNeed > 1 && t.length > 1) {
                  if (128 != (192 & t[1])) return (e.lastNeed = 1), "�";
                  if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2]))
                    return (e.lastNeed = 2), "�";
                }
              })(this, e);
            return void 0 !== r
              ? r
              : this.lastNeed <= e.length
              ? (e.copy(this.lastChar, t, 0, this.lastNeed),
                this.lastChar.toString(this.encoding, 0, this.lastTotal))
              : (e.copy(this.lastChar, t, 0, e.length),
                void (this.lastNeed -= e.length));
          }
          function utf16Text(e, t) {
            if ((e.length - t) % 2 == 0) {
              var r = e.toString("utf16le", t);
              if (r) {
                var n = r.charCodeAt(r.length - 1);
                if (n >= 55296 && n <= 56319)
                  return (
                    (this.lastNeed = 2),
                    (this.lastTotal = 4),
                    (this.lastChar[0] = e[e.length - 2]),
                    (this.lastChar[1] = e[e.length - 1]),
                    r.slice(0, -1)
                  );
              }
              return r;
            }
            return (
              (this.lastNeed = 1),
              (this.lastTotal = 2),
              (this.lastChar[0] = e[e.length - 1]),
              e.toString("utf16le", t, e.length - 1)
            );
          }
          function utf16End(e) {
            var t = e && e.length ? this.write(e) : "";
            if (this.lastNeed) {
              var r = this.lastTotal - this.lastNeed;
              return t + this.lastChar.toString("utf16le", 0, r);
            }
            return t;
          }
          function base64Text(e, t) {
            var r = (e.length - t) % 3;
            return 0 === r
              ? e.toString("base64", t)
              : ((this.lastNeed = 3 - r),
                (this.lastTotal = 3),
                1 === r
                  ? (this.lastChar[0] = e[e.length - 1])
                  : ((this.lastChar[0] = e[e.length - 2]),
                    (this.lastChar[1] = e[e.length - 1])),
                e.toString("base64", t, e.length - r));
          }
          function base64End(e) {
            var t = e && e.length ? this.write(e) : "";
            return this.lastNeed
              ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
              : t;
          }
          function simpleWrite(e) {
            return e.toString(this.encoding);
          }
          function simpleEnd(e) {
            return e && e.length ? this.write(e) : "";
          }
          (r.StringDecoder = StringDecoder),
            (StringDecoder.prototype.write = function (e) {
              if (0 === e.length) return "";
              var t, r;
              if (this.lastNeed) {
                if (void 0 === (t = this.fillLast(e))) return "";
                (r = this.lastNeed), (this.lastNeed = 0);
              } else r = 0;
              return r < e.length
                ? t
                  ? t + this.text(e, r)
                  : this.text(e, r)
                : t || "";
            }),
            (StringDecoder.prototype.end = function utf8End(e) {
              var t = e && e.length ? this.write(e) : "";
              return this.lastNeed ? t + "�" : t;
            }),
            (StringDecoder.prototype.text = function utf8Text(e, t) {
              var r = (function utf8CheckIncomplete(e, t, r) {
                var n = t.length - 1;
                if (n < r) return 0;
                var i = utf8CheckByte(t[n]);
                if (i >= 0) return i > 0 && (e.lastNeed = i - 1), i;
                if (--n < r || -2 === i) return 0;
                if ((i = utf8CheckByte(t[n])) >= 0)
                  return i > 0 && (e.lastNeed = i - 2), i;
                if (--n < r || -2 === i) return 0;
                if ((i = utf8CheckByte(t[n])) >= 0)
                  return i > 0 && (2 === i ? (i = 0) : (e.lastNeed = i - 3)), i;
                return 0;
              })(this, e, t);
              if (!this.lastNeed) return e.toString("utf8", t);
              this.lastTotal = r;
              var n = e.length - (r - this.lastNeed);
              return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n);
            }),
            (StringDecoder.prototype.fillLast = function (e) {
              if (this.lastNeed <= e.length)
                return (
                  e.copy(
                    this.lastChar,
                    this.lastTotal - this.lastNeed,
                    0,
                    this.lastNeed
                  ),
                  this.lastChar.toString(this.encoding, 0, this.lastTotal)
                );
              e.copy(
                this.lastChar,
                this.lastTotal - this.lastNeed,
                0,
                e.length
              ),
                (this.lastNeed -= e.length);
            });
        },
        { "safe-buffer": 21 },
      ],
      42: [
        function (e, t, r) {
          (function (r) {
            "use strict";
            var n = e("requires-port"),
              i = e("querystringify"),
              a = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
              o = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
              s = new RegExp(
                "^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+"
              );
            function trimLeft(e) {
              return (e || "").toString().replace(s, "");
            }
            var u = [
                ["#", "hash"],
                ["?", "query"],
                function sanitize(e) {
                  return e.replace("\\", "/");
                },
                ["/", "pathname"],
                ["@", "auth", 1],
                [NaN, "host", void 0, 1, 1],
                [/:(\d+)$/, "port", void 0, 1],
                [NaN, "hostname", void 0, 1, 1],
              ],
              l = { hash: 1, query: 1 };
            function lolcation(e) {
              var t,
                n =
                  ("undefined" != typeof window
                    ? window
                    : void 0 !== r
                    ? r
                    : "undefined" != typeof self
                    ? self
                    : {}
                  ).location || {},
                i = {},
                o = typeof (e = e || n);
              if ("blob:" === e.protocol) i = new Url(unescape(e.pathname), {});
              else if ("string" === o)
                for (t in ((i = new Url(e, {})), l)) delete i[t];
              else if ("object" === o) {
                for (t in e) t in l || (i[t] = e[t]);
                void 0 === i.slashes && (i.slashes = a.test(e.href));
              }
              return i;
            }
            function extractProtocol(e) {
              e = trimLeft(e);
              var t = o.exec(e);
              return {
                protocol: t[1] ? t[1].toLowerCase() : "",
                slashes: !!t[2],
                rest: t[3],
              };
            }
            function Url(e, t, r) {
              if (((e = trimLeft(e)), !(this instanceof Url)))
                return new Url(e, t, r);
              var a,
                o,
                s,
                l,
                c,
                f,
                h = u.slice(),
                p = typeof t,
                d = this,
                y = 0;
              for (
                "object" !== p && "string" !== p && ((r = t), (t = null)),
                  r && "function" != typeof r && (r = i.parse),
                  t = lolcation(t),
                  a = !(o = extractProtocol(e || "")).protocol && !o.slashes,
                  d.slashes = o.slashes || (a && t.slashes),
                  d.protocol = o.protocol || t.protocol || "",
                  e = o.rest,
                  o.slashes || (h[3] = [/(.*)/, "pathname"]);
                y < h.length;
                y++
              )
                "function" != typeof (l = h[y])
                  ? ((s = l[0]),
                    (f = l[1]),
                    s != s
                      ? (d[f] = e)
                      : "string" == typeof s
                      ? ~(c = e.indexOf(s)) &&
                        ("number" == typeof l[2]
                          ? ((d[f] = e.slice(0, c)), (e = e.slice(c + l[2])))
                          : ((d[f] = e.slice(c)), (e = e.slice(0, c))))
                      : (c = s.exec(e)) &&
                        ((d[f] = c[1]), (e = e.slice(0, c.index))),
                    (d[f] = d[f] || (a && l[3] && t[f]) || ""),
                    l[4] && (d[f] = d[f].toLowerCase()))
                  : (e = l(e));
              r && (d.query = r(d.query)),
                a &&
                  t.slashes &&
                  "/" !== d.pathname.charAt(0) &&
                  ("" !== d.pathname || "" !== t.pathname) &&
                  (d.pathname = (function resolve(e, t) {
                    if ("" === e) return t;
                    for (
                      var r = (t || "/")
                          .split("/")
                          .slice(0, -1)
                          .concat(e.split("/")),
                        n = r.length,
                        i = r[n - 1],
                        a = !1,
                        o = 0;
                      n--;

                    )
                      "." === r[n]
                        ? r.splice(n, 1)
                        : ".." === r[n]
                        ? (r.splice(n, 1), o++)
                        : o && (0 === n && (a = !0), r.splice(n, 1), o--);
                    return (
                      a && r.unshift(""),
                      ("." !== i && ".." !== i) || r.push(""),
                      r.join("/")
                    );
                  })(d.pathname, t.pathname)),
                n(d.port, d.protocol) || ((d.host = d.hostname), (d.port = "")),
                (d.username = d.password = ""),
                d.auth &&
                  ((l = d.auth.split(":")),
                  (d.username = l[0] || ""),
                  (d.password = l[1] || "")),
                (d.origin =
                  d.protocol && d.host && "file:" !== d.protocol
                    ? d.protocol + "//" + d.host
                    : "null"),
                (d.href = d.toString());
            }
            (Url.prototype = {
              set: function set(e, t, r) {
                var a = this;
                switch (e) {
                  case "query":
                    "string" == typeof t && t.length && (t = (r || i.parse)(t)),
                      (a[e] = t);
                    break;
                  case "port":
                    (a[e] = t),
                      n(t, a.protocol)
                        ? t && (a.host = a.hostname + ":" + t)
                        : ((a.host = a.hostname), (a[e] = ""));
                    break;
                  case "hostname":
                    (a[e] = t), a.port && (t += ":" + a.port), (a.host = t);
                    break;
                  case "host":
                    (a[e] = t),
                      /:\d+$/.test(t)
                        ? ((t = t.split(":")),
                          (a.port = t.pop()),
                          (a.hostname = t.join(":")))
                        : ((a.hostname = t), (a.port = ""));
                    break;
                  case "protocol":
                    (a.protocol = t.toLowerCase()), (a.slashes = !r);
                    break;
                  case "pathname":
                  case "hash":
                    if (t) {
                      var o = "pathname" === e ? "/" : "#";
                      a[e] = t.charAt(0) !== o ? o + t : t;
                    } else a[e] = t;
                    break;
                  default:
                    a[e] = t;
                }
                for (var s = 0; s < u.length; s++) {
                  var l = u[s];
                  l[4] && (a[l[1]] = a[l[1]].toLowerCase());
                }
                return (
                  (a.origin =
                    a.protocol && a.host && "file:" !== a.protocol
                      ? a.protocol + "//" + a.host
                      : "null"),
                  (a.href = a.toString()),
                  a
                );
              },
              toString: function toString(e) {
                (e && "function" == typeof e) || (e = i.stringify);
                var t,
                  r = this,
                  n = r.protocol;
                n && ":" !== n.charAt(n.length - 1) && (n += ":");
                var a = n + (r.slashes ? "//" : "");
                return (
                  r.username &&
                    ((a += r.username),
                    r.password && (a += ":" + r.password),
                    (a += "@")),
                  (a += r.host + r.pathname),
                  (t = "object" == typeof r.query ? e(r.query) : r.query) &&
                    (a += "?" !== t.charAt(0) ? "?" + t : t),
                  r.hash && (a += r.hash),
                  a
                );
              },
            }),
              (Url.extractProtocol = extractProtocol),
              (Url.location = lolcation),
              (Url.trimLeft = trimLeft),
              (Url.qs = i),
              (t.exports = Url);
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        { querystringify: 19, "requires-port": 20 },
      ],
      43: [
        function (e, t, r) {
          "use strict";
          var n = e("punycode"),
            i = e("./util");
          function Url() {
            (this.protocol = null),
              (this.slashes = null),
              (this.auth = null),
              (this.host = null),
              (this.port = null),
              (this.hostname = null),
              (this.hash = null),
              (this.search = null),
              (this.query = null),
              (this.pathname = null),
              (this.path = null),
              (this.href = null);
          }
          (r.parse = urlParse),
            (r.resolve = function urlResolve(e, t) {
              return urlParse(e, !1, !0).resolve(t);
            }),
            (r.resolveObject = function urlResolveObject(e, t) {
              return e ? urlParse(e, !1, !0).resolveObject(t) : t;
            }),
            (r.format = function urlFormat(e) {
              i.isString(e) && (e = urlParse(e));
              return e instanceof Url
                ? e.format()
                : Url.prototype.format.call(e);
            }),
            (r.Url = Url);
          var a = /^([a-z0-9.+-]+:)/i,
            o = /:[0-9]*$/,
            s = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
            u = ["{", "}", "|", "\\", "^", "`"].concat([
              "<",
              ">",
              '"',
              "`",
              " ",
              "\r",
              "\n",
              "\t",
            ]),
            l = ["'"].concat(u),
            c = ["%", "/", "?", ";", "#"].concat(l),
            f = ["/", "?", "#"],
            h = /^[+a-z0-9A-Z_-]{0,63}$/,
            p = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            d = { javascript: !0, "javascript:": !0 },
            y = { javascript: !0, "javascript:": !0 },
            m = {
              http: !0,
              https: !0,
              ftp: !0,
              gopher: !0,
              file: !0,
              "http:": !0,
              "https:": !0,
              "ftp:": !0,
              "gopher:": !0,
              "file:": !0,
            },
            w = e("querystring");
          function urlParse(e, t, r) {
            if (e && i.isObject(e) && e instanceof Url) return e;
            var n = new Url();
            return n.parse(e, t, r), n;
          }
          (Url.prototype.parse = function (e, t, r) {
            if (!i.isString(e))
              throw new TypeError(
                "Parameter 'url' must be a string, not " + typeof e
              );
            var o = e.indexOf("?"),
              u = -1 !== o && o < e.indexOf("#") ? "?" : "#",
              b = e.split(u);
            b[0] = b[0].replace(/\\/g, "/");
            var g = (e = b.join(u));
            if (((g = g.trim()), !r && 1 === e.split("#").length)) {
              var v = s.exec(g);
              if (v)
                return (
                  (this.path = g),
                  (this.href = g),
                  (this.pathname = v[1]),
                  v[2]
                    ? ((this.search = v[2]),
                      (this.query = t
                        ? w.parse(this.search.substr(1))
                        : this.search.substr(1)))
                    : t && ((this.search = ""), (this.query = {})),
                  this
                );
            }
            var _ = a.exec(g);
            if (_) {
              var E = (_ = _[0]).toLowerCase();
              (this.protocol = E), (g = g.substr(_.length));
            }
            if (r || _ || g.match(/^\/\/[^@\/]+@[^@\/]+/)) {
              var x = "//" === g.substr(0, 2);
              !x || (_ && y[_]) || ((g = g.substr(2)), (this.slashes = !0));
            }
            if (!y[_] && (x || (_ && !m[_]))) {
              for (var T, S, R = -1, A = 0; A < f.length; A++) {
                -1 !== (O = g.indexOf(f[A])) && (-1 === R || O < R) && (R = O);
              }
              -1 !==
                (S = -1 === R ? g.lastIndexOf("@") : g.lastIndexOf("@", R)) &&
                ((T = g.slice(0, S)),
                (g = g.slice(S + 1)),
                (this.auth = decodeURIComponent(T))),
                (R = -1);
              for (A = 0; A < c.length; A++) {
                var O;
                -1 !== (O = g.indexOf(c[A])) && (-1 === R || O < R) && (R = O);
              }
              -1 === R && (R = g.length),
                (this.host = g.slice(0, R)),
                (g = g.slice(R)),
                this.parseHost(),
                (this.hostname = this.hostname || "");
              var C =
                "[" === this.hostname[0] &&
                "]" === this.hostname[this.hostname.length - 1];
              if (!C)
                for (
                  var I = this.hostname.split(/\./), L = ((A = 0), I.length);
                  A < L;
                  A++
                ) {
                  var k = I[A];
                  if (k && !k.match(h)) {
                    for (var B = "", N = 0, j = k.length; N < j; N++)
                      k.charCodeAt(N) > 127 ? (B += "x") : (B += k[N]);
                    if (!B.match(h)) {
                      var P = I.slice(0, A),
                        D = I.slice(A + 1),
                        M = k.match(p);
                      M && (P.push(M[1]), D.unshift(M[2])),
                        D.length && (g = "/" + D.join(".") + g),
                        (this.hostname = P.join("."));
                      break;
                    }
                  }
                }
              this.hostname.length > 255
                ? (this.hostname = "")
                : (this.hostname = this.hostname.toLowerCase()),
                C || (this.hostname = n.toASCII(this.hostname));
              var U = this.port ? ":" + this.port : "",
                F = this.hostname || "";
              (this.host = F + U),
                (this.href += this.host),
                C &&
                  ((this.hostname = this.hostname.substr(
                    1,
                    this.hostname.length - 2
                  )),
                  "/" !== g[0] && (g = "/" + g));
            }
            if (!d[E])
              for (A = 0, L = l.length; A < L; A++) {
                var q = l[A];
                if (-1 !== g.indexOf(q)) {
                  var H = encodeURIComponent(q);
                  H === q && (H = escape(q)), (g = g.split(q).join(H));
                }
              }
            var W = g.indexOf("#");
            -1 !== W && ((this.hash = g.substr(W)), (g = g.slice(0, W)));
            var z = g.indexOf("?");
            if (
              (-1 !== z
                ? ((this.search = g.substr(z)),
                  (this.query = g.substr(z + 1)),
                  t && (this.query = w.parse(this.query)),
                  (g = g.slice(0, z)))
                : t && ((this.search = ""), (this.query = {})),
              g && (this.pathname = g),
              m[E] && this.hostname && !this.pathname && (this.pathname = "/"),
              this.pathname || this.search)
            ) {
              U = this.pathname || "";
              var V = this.search || "";
              this.path = U + V;
            }
            return (this.href = this.format()), this;
          }),
            (Url.prototype.format = function () {
              var e = this.auth || "";
              e &&
                ((e = (e = encodeURIComponent(e)).replace(/%3A/i, ":")),
                (e += "@"));
              var t = this.protocol || "",
                r = this.pathname || "",
                n = this.hash || "",
                a = !1,
                o = "";
              this.host
                ? (a = e + this.host)
                : this.hostname &&
                  ((a =
                    e +
                    (-1 === this.hostname.indexOf(":")
                      ? this.hostname
                      : "[" + this.hostname + "]")),
                  this.port && (a += ":" + this.port)),
                this.query &&
                  i.isObject(this.query) &&
                  Object.keys(this.query).length &&
                  (o = w.stringify(this.query));
              var s = this.search || (o && "?" + o) || "";
              return (
                t && ":" !== t.substr(-1) && (t += ":"),
                this.slashes || ((!t || m[t]) && !1 !== a)
                  ? ((a = "//" + (a || "")),
                    r && "/" !== r.charAt(0) && (r = "/" + r))
                  : a || (a = ""),
                n && "#" !== n.charAt(0) && (n = "#" + n),
                s && "?" !== s.charAt(0) && (s = "?" + s),
                t +
                  a +
                  (r = r.replace(/[?#]/g, function (e) {
                    return encodeURIComponent(e);
                  })) +
                  (s = s.replace("#", "%23")) +
                  n
              );
            }),
            (Url.prototype.resolve = function (e) {
              return this.resolveObject(urlParse(e, !1, !0)).format();
            }),
            (Url.prototype.resolveObject = function (e) {
              if (i.isString(e)) {
                var t = new Url();
                t.parse(e, !1, !0), (e = t);
              }
              for (
                var r = new Url(), n = Object.keys(this), a = 0;
                a < n.length;
                a++
              ) {
                var o = n[a];
                r[o] = this[o];
              }
              if (((r.hash = e.hash), "" === e.href))
                return (r.href = r.format()), r;
              if (e.slashes && !e.protocol) {
                for (var s = Object.keys(e), u = 0; u < s.length; u++) {
                  var l = s[u];
                  "protocol" !== l && (r[l] = e[l]);
                }
                return (
                  m[r.protocol] &&
                    r.hostname &&
                    !r.pathname &&
                    (r.path = r.pathname = "/"),
                  (r.href = r.format()),
                  r
                );
              }
              if (e.protocol && e.protocol !== r.protocol) {
                if (!m[e.protocol]) {
                  for (var c = Object.keys(e), f = 0; f < c.length; f++) {
                    var h = c[f];
                    r[h] = e[h];
                  }
                  return (r.href = r.format()), r;
                }
                if (((r.protocol = e.protocol), e.host || y[e.protocol]))
                  r.pathname = e.pathname;
                else {
                  for (
                    var p = (e.pathname || "").split("/");
                    p.length && !(e.host = p.shift());

                  );
                  e.host || (e.host = ""),
                    e.hostname || (e.hostname = ""),
                    "" !== p[0] && p.unshift(""),
                    p.length < 2 && p.unshift(""),
                    (r.pathname = p.join("/"));
                }
                if (
                  ((r.search = e.search),
                  (r.query = e.query),
                  (r.host = e.host || ""),
                  (r.auth = e.auth),
                  (r.hostname = e.hostname || e.host),
                  (r.port = e.port),
                  r.pathname || r.search)
                ) {
                  var d = r.pathname || "",
                    w = r.search || "";
                  r.path = d + w;
                }
                return (
                  (r.slashes = r.slashes || e.slashes), (r.href = r.format()), r
                );
              }
              var b = r.pathname && "/" === r.pathname.charAt(0),
                g = e.host || (e.pathname && "/" === e.pathname.charAt(0)),
                v = g || b || (r.host && e.pathname),
                _ = v,
                E = (r.pathname && r.pathname.split("/")) || [],
                x =
                  ((p = (e.pathname && e.pathname.split("/")) || []),
                  r.protocol && !m[r.protocol]);
              if (
                (x &&
                  ((r.hostname = ""),
                  (r.port = null),
                  r.host && ("" === E[0] ? (E[0] = r.host) : E.unshift(r.host)),
                  (r.host = ""),
                  e.protocol &&
                    ((e.hostname = null),
                    (e.port = null),
                    e.host &&
                      ("" === p[0] ? (p[0] = e.host) : p.unshift(e.host)),
                    (e.host = null)),
                  (v = v && ("" === p[0] || "" === E[0]))),
                g)
              )
                (r.host = e.host || "" === e.host ? e.host : r.host),
                  (r.hostname =
                    e.hostname || "" === e.hostname ? e.hostname : r.hostname),
                  (r.search = e.search),
                  (r.query = e.query),
                  (E = p);
              else if (p.length)
                E || (E = []),
                  E.pop(),
                  (E = E.concat(p)),
                  (r.search = e.search),
                  (r.query = e.query);
              else if (!i.isNullOrUndefined(e.search)) {
                if (x)
                  (r.hostname = r.host = E.shift()),
                    (O =
                      !!(r.host && r.host.indexOf("@") > 0) &&
                      r.host.split("@")) &&
                      ((r.auth = O.shift()), (r.host = r.hostname = O.shift()));
                return (
                  (r.search = e.search),
                  (r.query = e.query),
                  (i.isNull(r.pathname) && i.isNull(r.search)) ||
                    (r.path =
                      (r.pathname ? r.pathname : "") +
                      (r.search ? r.search : "")),
                  (r.href = r.format()),
                  r
                );
              }
              if (!E.length)
                return (
                  (r.pathname = null),
                  r.search ? (r.path = "/" + r.search) : (r.path = null),
                  (r.href = r.format()),
                  r
                );
              for (
                var T = E.slice(-1)[0],
                  S =
                    ((r.host || e.host || E.length > 1) &&
                      ("." === T || ".." === T)) ||
                    "" === T,
                  R = 0,
                  A = E.length;
                A >= 0;
                A--
              )
                "." === (T = E[A])
                  ? E.splice(A, 1)
                  : ".." === T
                  ? (E.splice(A, 1), R++)
                  : R && (E.splice(A, 1), R--);
              if (!v && !_) for (; R--; R) E.unshift("..");
              !v ||
                "" === E[0] ||
                (E[0] && "/" === E[0].charAt(0)) ||
                E.unshift(""),
                S && "/" !== E.join("/").substr(-1) && E.push("");
              var O,
                C = "" === E[0] || (E[0] && "/" === E[0].charAt(0));
              x &&
                ((r.hostname = r.host = C ? "" : E.length ? E.shift() : ""),
                (O =
                  !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) &&
                  ((r.auth = O.shift()), (r.host = r.hostname = O.shift())));
              return (
                (v = v || (r.host && E.length)) && !C && E.unshift(""),
                E.length
                  ? (r.pathname = E.join("/"))
                  : ((r.pathname = null), (r.path = null)),
                (i.isNull(r.pathname) && i.isNull(r.search)) ||
                  (r.path =
                    (r.pathname ? r.pathname : "") +
                    (r.search ? r.search : "")),
                (r.auth = e.auth || r.auth),
                (r.slashes = r.slashes || e.slashes),
                (r.href = r.format()),
                r
              );
            }),
            (Url.prototype.parseHost = function () {
              var e = this.host,
                t = o.exec(e);
              t &&
                (":" !== (t = t[0]) && (this.port = t.substr(1)),
                (e = e.substr(0, e.length - t.length))),
                e && (this.hostname = e);
            });
        },
        { "./util": 44, punycode: 15, querystring: 18 },
      ],
      44: [
        function (e, t, r) {
          "use strict";
          t.exports = {
            isString: function (e) {
              return "string" == typeof e;
            },
            isObject: function (e) {
              return "object" == typeof e && null !== e;
            },
            isNull: function (e) {
              return null === e;
            },
            isNullOrUndefined: function (e) {
              return null == e;
            },
          };
        },
        {},
      ],
      45: [
        function (e, t, r) {
          (function (e) {
            function config(t) {
              try {
                if (!e.localStorage) return !1;
              } catch (e) {
                return !1;
              }
              var r = e.localStorage[t];
              return null != r && "true" === String(r).toLowerCase();
            }
            t.exports = function deprecate(e, t) {
              if (config("noDeprecation")) return e;
              var r = !1;
              return function deprecated() {
                if (!r) {
                  if (config("throwDeprecation")) throw new Error(t);
                  config("traceDeprecation")
                    ? console.trace(t)
                    : console.warn(t),
                    (r = !0);
                }
                return e.apply(this, arguments);
              };
            };
          }.call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        {},
      ],
      46: [
        function (e, t, r) {
          "function" == typeof Object.create
            ? (t.exports = function inherits(e, t) {
                (e.super_ = t),
                  (e.prototype = Object.create(t.prototype, {
                    constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  }));
              })
            : (t.exports = function inherits(e, t) {
                e.super_ = t;
                var TempCtor = function () {};
                (TempCtor.prototype = t.prototype),
                  (e.prototype = new TempCtor()),
                  (e.prototype.constructor = e);
              });
        },
        {},
      ],
      47: [
        function (e, t, r) {
          t.exports = function isBuffer(e) {
            return (
              e &&
              "object" == typeof e &&
              "function" == typeof e.copy &&
              "function" == typeof e.fill &&
              "function" == typeof e.readUInt8
            );
          };
        },
        {},
      ],
      48: [
        function (e, t, r) {
          (function (t, n) {
            var i = /%[sdj%]/g;
            (r.format = function (e) {
              if (!isString(e)) {
                for (var t = [], r = 0; r < arguments.length; r++)
                  t.push(inspect(arguments[r]));
                return t.join(" ");
              }
              r = 1;
              for (
                var n = arguments,
                  a = n.length,
                  o = String(e).replace(i, function (e) {
                    if ("%%" === e) return "%";
                    if (r >= a) return e;
                    switch (e) {
                      case "%s":
                        return String(n[r++]);
                      case "%d":
                        return Number(n[r++]);
                      case "%j":
                        try {
                          return JSON.stringify(n[r++]);
                        } catch (e) {
                          return "[Circular]";
                        }
                      default:
                        return e;
                    }
                  }),
                  s = n[r];
                r < a;
                s = n[++r]
              )
                isNull(s) || !isObject(s)
                  ? (o += " " + s)
                  : (o += " " + inspect(s));
              return o;
            }),
              (r.deprecate = function (e, i) {
                if (isUndefined(n.process))
                  return function () {
                    return r.deprecate(e, i).apply(this, arguments);
                  };
                if (!0 === t.noDeprecation) return e;
                var a = !1;
                return function deprecated() {
                  if (!a) {
                    if (t.throwDeprecation) throw new Error(i);
                    t.traceDeprecation ? console.trace(i) : console.error(i),
                      (a = !0);
                  }
                  return e.apply(this, arguments);
                };
              });
            var a,
              o = {};
            function inspect(e, t) {
              var n = { seen: [], stylize: stylizeNoColor };
              return (
                arguments.length >= 3 && (n.depth = arguments[2]),
                arguments.length >= 4 && (n.colors = arguments[3]),
                isBoolean(t) ? (n.showHidden = t) : t && r._extend(n, t),
                isUndefined(n.showHidden) && (n.showHidden = !1),
                isUndefined(n.depth) && (n.depth = 2),
                isUndefined(n.colors) && (n.colors = !1),
                isUndefined(n.customInspect) && (n.customInspect = !0),
                n.colors && (n.stylize = stylizeWithColor),
                formatValue(n, e, n.depth)
              );
            }
            function stylizeWithColor(e, t) {
              var r = inspect.styles[t];
              return r
                ? "[" +
                    inspect.colors[r][0] +
                    "m" +
                    e +
                    "[" +
                    inspect.colors[r][1] +
                    "m"
                : e;
            }
            function stylizeNoColor(e, t) {
              return e;
            }
            function formatValue(e, t, n) {
              if (
                e.customInspect &&
                t &&
                isFunction(t.inspect) &&
                t.inspect !== r.inspect &&
                (!t.constructor || t.constructor.prototype !== t)
              ) {
                var i = t.inspect(n, e);
                return isString(i) || (i = formatValue(e, i, n)), i;
              }
              var a = (function formatPrimitive(e, t) {
                if (isUndefined(t)) return e.stylize("undefined", "undefined");
                if (isString(t)) {
                  var r =
                    "'" +
                    JSON.stringify(t)
                      .replace(/^"|"$/g, "")
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"') +
                    "'";
                  return e.stylize(r, "string");
                }
                if (isNumber(t)) return e.stylize("" + t, "number");
                if (isBoolean(t)) return e.stylize("" + t, "boolean");
                if (isNull(t)) return e.stylize("null", "null");
              })(e, t);
              if (a) return a;
              var o = Object.keys(t),
                s = (function arrayToHash(e) {
                  var t = {};
                  return (
                    e.forEach(function (e, r) {
                      t[e] = !0;
                    }),
                    t
                  );
                })(o);
              if (
                (e.showHidden && (o = Object.getOwnPropertyNames(t)),
                isError(t) &&
                  (o.indexOf("message") >= 0 || o.indexOf("description") >= 0))
              )
                return formatError(t);
              if (0 === o.length) {
                if (isFunction(t)) {
                  var u = t.name ? ": " + t.name : "";
                  return e.stylize("[Function" + u + "]", "special");
                }
                if (isRegExp(t))
                  return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                if (isDate(t))
                  return e.stylize(Date.prototype.toString.call(t), "date");
                if (isError(t)) return formatError(t);
              }
              var l,
                c = "",
                f = !1,
                h = ["{", "}"];
              (isArray(t) && ((f = !0), (h = ["[", "]"])), isFunction(t)) &&
                (c = " [Function" + (t.name ? ": " + t.name : "") + "]");
              return (
                isRegExp(t) && (c = " " + RegExp.prototype.toString.call(t)),
                isDate(t) && (c = " " + Date.prototype.toUTCString.call(t)),
                isError(t) && (c = " " + formatError(t)),
                0 !== o.length || (f && 0 != t.length)
                  ? n < 0
                    ? isRegExp(t)
                      ? e.stylize(RegExp.prototype.toString.call(t), "regexp")
                      : e.stylize("[Object]", "special")
                    : (e.seen.push(t),
                      (l = f
                        ? (function formatArray(e, t, r, n, i) {
                            for (var a = [], o = 0, s = t.length; o < s; ++o)
                              hasOwnProperty(t, String(o))
                                ? a.push(
                                    formatProperty(e, t, r, n, String(o), !0)
                                  )
                                : a.push("");
                            return (
                              i.forEach(function (i) {
                                i.match(/^\d+$/) ||
                                  a.push(formatProperty(e, t, r, n, i, !0));
                              }),
                              a
                            );
                          })(e, t, n, s, o)
                        : o.map(function (r) {
                            return formatProperty(e, t, n, s, r, f);
                          })),
                      e.seen.pop(),
                      (function reduceToSingleString(e, t, r) {
                        if (
                          e.reduce(function (e, t) {
                            return (
                              t.indexOf("\n") >= 0 && 0,
                              e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                            );
                          }, 0) > 60
                        )
                          return (
                            r[0] +
                            ("" === t ? "" : t + "\n ") +
                            " " +
                            e.join(",\n  ") +
                            " " +
                            r[1]
                          );
                        return r[0] + t + " " + e.join(", ") + " " + r[1];
                      })(l, c, h))
                  : h[0] + c + h[1]
              );
            }
            function formatError(e) {
              return "[" + Error.prototype.toString.call(e) + "]";
            }
            function formatProperty(e, t, r, n, i, a) {
              var o, s, u;
              if (
                ((u = Object.getOwnPropertyDescriptor(t, i) || { value: t[i] })
                  .get
                  ? (s = u.set
                      ? e.stylize("[Getter/Setter]", "special")
                      : e.stylize("[Getter]", "special"))
                  : u.set && (s = e.stylize("[Setter]", "special")),
                hasOwnProperty(n, i) || (o = "[" + i + "]"),
                s ||
                  (e.seen.indexOf(u.value) < 0
                    ? (s = isNull(r)
                        ? formatValue(e, u.value, null)
                        : formatValue(e, u.value, r - 1)).indexOf("\n") > -1 &&
                      (s = a
                        ? s
                            .split("\n")
                            .map(function (e) {
                              return "  " + e;
                            })
                            .join("\n")
                            .substr(2)
                        : "\n" +
                          s
                            .split("\n")
                            .map(function (e) {
                              return "   " + e;
                            })
                            .join("\n"))
                    : (s = e.stylize("[Circular]", "special"))),
                isUndefined(o))
              ) {
                if (a && i.match(/^\d+$/)) return s;
                (o = JSON.stringify("" + i)).match(
                  /^"([a-zA-Z_][a-zA-Z_0-9]*)"$/
                )
                  ? ((o = o.substr(1, o.length - 2)),
                    (o = e.stylize(o, "name")))
                  : ((o = o
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"')
                      .replace(/(^"|"$)/g, "'")),
                    (o = e.stylize(o, "string")));
              }
              return o + ": " + s;
            }
            function isArray(e) {
              return Array.isArray(e);
            }
            function isBoolean(e) {
              return "boolean" == typeof e;
            }
            function isNull(e) {
              return null === e;
            }
            function isNumber(e) {
              return "number" == typeof e;
            }
            function isString(e) {
              return "string" == typeof e;
            }
            function isUndefined(e) {
              return void 0 === e;
            }
            function isRegExp(e) {
              return isObject(e) && "[object RegExp]" === objectToString(e);
            }
            function isObject(e) {
              return "object" == typeof e && null !== e;
            }
            function isDate(e) {
              return isObject(e) && "[object Date]" === objectToString(e);
            }
            function isError(e) {
              return (
                isObject(e) &&
                ("[object Error]" === objectToString(e) || e instanceof Error)
              );
            }
            function isFunction(e) {
              return "function" == typeof e;
            }
            function objectToString(e) {
              return Object.prototype.toString.call(e);
            }
            function pad(e) {
              return e < 10 ? "0" + e.toString(10) : e.toString(10);
            }
            (r.debuglog = function (e) {
              if (
                (isUndefined(a) && (a = t.env.NODE_DEBUG || ""),
                (e = e.toUpperCase()),
                !o[e])
              )
                if (new RegExp("\\b" + e + "\\b", "i").test(a)) {
                  var n = t.pid;
                  o[e] = function () {
                    var t = r.format.apply(r, arguments);
                    console.error("%s %d: %s", e, n, t);
                  };
                } else o[e] = function () {};
              return o[e];
            }),
              (r.inspect = inspect),
              (inspect.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39],
              }),
              (inspect.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red",
              }),
              (r.isArray = isArray),
              (r.isBoolean = isBoolean),
              (r.isNull = isNull),
              (r.isNullOrUndefined = function isNullOrUndefined(e) {
                return null == e;
              }),
              (r.isNumber = isNumber),
              (r.isString = isString),
              (r.isSymbol = function isSymbol(e) {
                return "symbol" == typeof e;
              }),
              (r.isUndefined = isUndefined),
              (r.isRegExp = isRegExp),
              (r.isObject = isObject),
              (r.isDate = isDate),
              (r.isError = isError),
              (r.isFunction = isFunction),
              (r.isPrimitive = function isPrimitive(e) {
                return (
                  null === e ||
                  "boolean" == typeof e ||
                  "number" == typeof e ||
                  "string" == typeof e ||
                  "symbol" == typeof e ||
                  void 0 === e
                );
              }),
              (r.isBuffer = e("./support/isBuffer"));
            var s = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            function timestamp() {
              var e = new Date(),
                t = [
                  pad(e.getHours()),
                  pad(e.getMinutes()),
                  pad(e.getSeconds()),
                ].join(":");
              return [e.getDate(), s[e.getMonth()], t].join(" ");
            }
            function hasOwnProperty(e, t) {
              return Object.prototype.hasOwnProperty.call(e, t);
            }
            (r.log = function () {
              console.log("%s - %s", timestamp(), r.format.apply(r, arguments));
            }),
              (r.inherits = e("inherits")),
              (r._extend = function (e, t) {
                if (!t || !isObject(t)) return e;
                for (var r = Object.keys(t), n = r.length; n--; )
                  e[r[n]] = t[r[n]];
                return e;
              });
          }.call(
            this,
            e("_process"),
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          ));
        },
        { "./support/isBuffer": 47, _process: 14, inherits: 46 },
      ],
      49: [
        function (e, t, r) {
          t.exports = function extend() {
            for (var e = {}, t = 0; t < arguments.length; t++) {
              var r = arguments[t];
              for (var i in r) n.call(r, i) && (e[i] = r[i]);
            }
            return e;
          };
          var n = Object.prototype.hasOwnProperty;
        },
        {},
      ],
      50: [
        function (e, t, r) {
          "use strict";
          var n = e("btoa-lite"),
            i = e("./errors"),
            a = e("./query"),
            o = e("./values"),
            s = e("./_json"),
            u = e("./RequestResult"),
            l = e("./_util"),
            c = e("./PageHelper"),
            f = e("url-parse");
          function Client(t) {
            var r = "undefined" == typeof window,
              n = l.applyDefaults(t, {
                domain: "db.fauna.com",
                scheme: "https",
                port: null,
                secret: null,
                timeout: 60,
                observer: null,
                keepAlive: !0,
                headers: {},
                fetch: void 0,
                queryTimeout: null,
              }),
              i = "https" === n.scheme;
            null === n.port && (n.port = i ? 443 : 80),
              (this._baseUrl = n.scheme + "://" + n.domain + ":" + n.port),
              (this._timeout = Math.floor(1e3 * n.timeout)),
              (this._secret = n.secret),
              (this._observer = n.observer),
              (this._lastSeen = null),
              (this._headers = n.headers),
              (this._fetch = n.fetch || e("cross-fetch")),
              (this._queryTimeout = n.queryTimeout),
              r &&
                n.keepAlive &&
                (this._keepAliveEnabledAgent = new (e(
                  i ? "https" : "http"
                ).Agent)({ keepAlive: !0 }));
          }
          function defaults(e, t) {
            return void 0 === e ? t : e;
          }
          function secretHeader(e) {
            return "Basic " + n(e + ":");
          }
          (Client.prototype.query = function (e, t) {
            return this._execute("POST", "", a.wrap(e), null, t);
          }),
            (Client.prototype.paginate = function (e, t, r) {
              return (
                (t = defaults(t, {})),
                (r = defaults(r, {})),
                new c(this, e, t, r)
              );
            }),
            (Client.prototype.ping = function (e, t) {
              return this._execute("GET", "ping", null, {
                scope: e,
                timeout: t,
              });
            }),
            (Client.prototype.getLastTxnTime = function () {
              return this._lastSeen;
            }),
            (Client.prototype.syncLastTxnTime = function (e) {
              (null == this._lastSeen || this._lastSeen < e) &&
                (this._lastSeen = e);
            }),
            (Client.prototype._execute = function (e, t, r, n, a) {
              (n = defaults(n, null)),
                t instanceof o.Ref && (t = t.value),
                null !== n && (n = l.removeUndefinedValues(n));
              var c = Date.now(),
                f = this,
                h =
                  ["GET", "HEAD"].indexOf(e) >= 0 ? void 0 : JSON.stringify(r);
              return this._performRequest(e, t, h, n, a).then(function (a) {
                var o = Date.now(),
                  l = a.text,
                  p = s.parseJSON(l),
                  d = new u(
                    e,
                    t,
                    n,
                    h,
                    r,
                    l,
                    p,
                    a.status,
                    (function responseHeadersAsObject(e) {
                      let t = {};
                      for (const [r, n] of e.headers.entries()) t[r] = n;
                      return t;
                    })(a),
                    c,
                    o
                  );
                return (
                  a.headers.has("x-txn-time") &&
                    f.syncLastTxnTime(
                      parseInt(a.headers.get("x-txn-time"), 10)
                    ),
                  null != f._observer && f._observer(d, f),
                  i.FaunaHTTPError.raiseForStatusCode(d),
                  p.resource
                );
              });
            }),
            (Client.prototype._performRequest = function (e, t, r, n, i) {
              var a = f(this._baseUrl);
              a.set("pathname", t), a.set("query", n);
              var o = (i = defaults(i, {})).secret || this._secret,
                s = this._queryTimeout;
              return (
                i && i.queryTimeout && (s = i.queryTimeout),
                this._fetch(a.href, {
                  agent: this._keepAliveEnabledAgent,
                  body: r,
                  headers: l.removeNullAndUndefinedValues({
                    ...this._headers,
                    Authorization: o && secretHeader(o),
                    "X-FaunaDB-API-Version": "2.7",
                    "X-Fauna-Driver": "Javascript",
                    "X-Last-Seen-Txn": this._lastSeen,
                    "X-Query-Timeout": s,
                  }),
                  method: e,
                  timeout: this._timeout,
                }).then(function (e) {
                  return e.text().then(function (t) {
                    return (e.text = t), e;
                  });
                })
              );
            }),
            (t.exports = Client);
        },
        {
          "./PageHelper": 52,
          "./RequestResult": 53,
          "./_json": 54,
          "./_util": 55,
          "./errors": 57,
          "./query": 58,
          "./values": 59,
          "btoa-lite": 4,
          "cross-fetch": 7,
          http: 22,
          https: 10,
          "url-parse": 42,
        },
      ],
      51: [
        function (e, t, r) {
          "use strict";
          function Expr(e) {
            this.raw = e;
          }
          Expr.prototype.toJSON = function () {
            return this.raw;
          };
          var n = [
              "Do",
              "Call",
              "Union",
              "Intersection",
              "Difference",
              "Equals",
              "Add",
              "BitAnd",
              "BitOr",
              "BitXor",
              "Divide",
              "Max",
              "Min",
              "Modulo",
              "Multiply",
              "Subtract",
              "LT",
              "LTE",
              "GT",
              "GTE",
              "And",
              "Or",
            ],
            i = {
              is_nonempty: "is_non_empty",
              lt: "LT",
              lte: "LTE",
              gt: "GT",
              gte: "GTE",
            },
            exprToString = function (e, t) {
              if (e instanceof Expr) {
                if ("value" in e) return e.toString();
                e = e.raw;
              }
              var r = typeof e;
              if ("string" === r) return JSON.stringify(e);
              if ("symbol" === r || "number" === r || "boolean" === r)
                return e.toString();
              if ("undefined" === r) return "undefined";
              if (null === e) return "null";
              var printObject = function (e) {
                  return (
                    "{" +
                    Object.keys(e)
                      .map(function (t) {
                        return t + ": " + exprToString(e[t]);
                      })
                      .join(", ") +
                    "}"
                  );
                },
                printArray = function (e, t) {
                  return e
                    .map(function (e) {
                      return t(e);
                    })
                    .join(", ");
                };
              if (Array.isArray(e)) {
                var a = printArray(e, exprToString);
                return -1 != n.indexOf(t) ? a : "[" + a + "]";
              }
              if ("let" in e && "in" in e) {
                return (
                  "Let(" +
                  (Array.isArray(e.let)
                    ? "[" + printArray(e.let, printObject) + "]"
                    : printObject(e.let)) +
                  ", " +
                  exprToString(e.in) +
                  ")"
                );
              }
              if ("object" in e) return printObject(e.object);
              var o = Object.keys(e),
                s = o[0];
              s in i && (s = i[s]),
                (s = s
                  .split("_")
                  .map(function (e) {
                    return e.charAt(0).toUpperCase() + e.slice(1);
                  })
                  .join(""));
              var u = o.map(function (t) {
                var r = e[t];
                return exprToString(r, s);
              });
              return (
                ["filter", "map", "foreach"].some(function (t) {
                  return t in e;
                }) && u.reverse(),
                (u = u.join(", ")),
                s + "(" + u + ")"
              );
            };
          (Expr.toString = exprToString), (t.exports = Expr);
        },
        {},
      ],
      52: [
        function (e, t, r) {
          "use strict";
          var n = e("./query"),
            i = e("object-assign");
          function PageHelper(e, t, r, n) {
            void 0 === r && (r = {}),
              void 0 === n && (n = {}),
              (this.reverse = !1),
              (this.params = {}),
              (this.before = void 0),
              (this.after = void 0),
              i(this.params, r);
            var a = this.params.cursor || this.params;
            "before" in a
              ? ((this.before = a.before), delete a.before)
              : "after" in a && ((this.after = a.after), delete a.after),
              (this.options = {}),
              i(this.options, n),
              (this.client = e),
              (this.set = t),
              (this._faunaFunctions = []);
          }
          (PageHelper.prototype.map = function (e) {
            var t = this._clone();
            return (
              t._faunaFunctions.push(function (t) {
                return n.Map(t, e);
              }),
              t
            );
          }),
            (PageHelper.prototype.filter = function (e) {
              var t = this._clone();
              return (
                t._faunaFunctions.push(function (t) {
                  return n.Filter(t, e);
                }),
                t
              );
            }),
            (PageHelper.prototype.each = function (e) {
              return this._retrieveNextPage(this.after, !1).then(
                this._consumePages(e, !1)
              );
            }),
            (PageHelper.prototype.eachReverse = function (e) {
              return this._retrieveNextPage(this.before, !0).then(
                this._consumePages(e, !0)
              );
            }),
            (PageHelper.prototype.previousPage = function () {
              return this._retrieveNextPage(this.before, !0).then(
                this._adjustCursors.bind(this)
              );
            }),
            (PageHelper.prototype.nextPage = function () {
              return this._retrieveNextPage(this.after, !1).then(
                this._adjustCursors.bind(this)
              );
            }),
            (PageHelper.prototype._adjustCursors = function (e) {
              return (
                void 0 !== e.after && (this.after = e.after),
                void 0 !== e.before && (this.before = e.before),
                e.data
              );
            }),
            (PageHelper.prototype._consumePages = function (e, t) {
              var r = this;
              return function (n) {
                var i,
                  a = [];
                return (
                  n.data.forEach(function (e) {
                    e.document && (e.instance = e.document),
                      e.value &&
                        e.value.document &&
                        (e.value.instance = e.value.document),
                      a.push(e);
                  }),
                  e(a),
                  void 0 !== (i = t ? n.before : n.after)
                    ? r._retrieveNextPage(i, t).then(r._consumePages(e, t))
                    : Promise.resolve()
                );
              };
            }),
            (PageHelper.prototype._retrieveNextPage = function (e, t) {
              var r = {};
              i(r, this.params);
              var a = r.cursor || r;
              void 0 !== e
                ? t
                  ? (a.before = e)
                  : (a.after = e)
                : t && (a.before = null);
              var o = n.Paginate(this.set, r);
              return (
                this._faunaFunctions.length > 0 &&
                  this._faunaFunctions.forEach(function (e) {
                    o = e(o);
                  }),
                this.client.query(o, this.options)
              );
            }),
            (PageHelper.prototype._clone = function () {
              return Object.create(PageHelper.prototype, {
                client: { value: this.client },
                set: { value: this.set },
                _faunaFunctions: { value: this._faunaFunctions },
                before: { value: this.before },
                after: { value: this.after },
              });
            }),
            (t.exports = PageHelper);
        },
        { "./query": 58, "object-assign": 13 },
      ],
      53: [
        function (e, t, r) {
          "use strict";
          function RequestResult(e, t, r, n, i, a, o, s, u, l, c) {
            (this.method = e),
              (this.path = t),
              (this.query = r),
              (this.requestRaw = n),
              (this.requestContent = i),
              (this.responseRaw = a),
              (this.responseContent = o),
              (this.statusCode = s),
              (this.responseHeaders = u),
              (this.startTime = l),
              (this.endTime = c);
          }
          Object.defineProperty(RequestResult.prototype, "timeTaken", {
            get: function () {
              return this.endTime - this.startTime;
            },
          }),
            (t.exports = RequestResult);
        },
        {},
      ],
      54: [
        function (e, t, r) {
          "use strict";
          var n = e("./values");
          function json_parse(e, t) {
            if ("object" != typeof t || null === t) return t;
            if ("@ref" in t) {
              var r = t["@ref"];
              if (!("collection" in r || "database" in r))
                return n.Native.fromName(r.id);
              var i = json_parse("collection", r.collection),
                a = json_parse("database", r.database);
              return new n.Ref(r.id, i, a);
            }
            return "@obj" in t
              ? t["@obj"]
              : "@set" in t
              ? new n.SetRef(t["@set"])
              : "@ts" in t
              ? new n.FaunaTime(t["@ts"])
              : "@date" in t
              ? new n.FaunaDate(t["@date"])
              : "@bytes" in t
              ? new n.Bytes(t["@bytes"])
              : "@query" in t
              ? new n.Query(t["@query"])
              : t;
          }
          t.exports = {
            toJSON: function toJSON(e, t) {
              return (t = void 0 !== t && t)
                ? JSON.stringify(e, null, "  ")
                : JSON.stringify(e);
            },
            parseJSON: function parseJSON(e) {
              return JSON.parse(e, json_parse);
            },
          };
        },
        { "./values": 59 },
      ],
      55: [
        function (e, t, r) {
          "use strict";
          t.exports = {
            applyDefaults: function applyDefaults(e, t) {
              var r = {};
              for (var n in e) {
                if (!(n in t)) throw new Error("No such option " + n);
                r[n] = e[n];
              }
              for (var i in t) i in r || (r[i] = t[i]);
              return r;
            },
            removeNullAndUndefinedValues: function removeNullAndUndefinedValues(
              e
            ) {
              var t = {};
              for (var r in e) {
                var n = e[r];
                null != n && (t[r] = n);
              }
              return t;
            },
            removeUndefinedValues: function removeUndefinedValues(e) {
              var t = {};
              for (var r in e) {
                var n = e[r];
                void 0 !== n && (t[r] = n);
              }
              return t;
            },
          };
        },
        {},
      ],
      56: [
        function (e, t, r) {
          "use strict";
          var n = e("./_json");
          function showRequestResult(e) {
            var t = e.query,
              r = e.method,
              n = e.path,
              i = e.requestContent,
              a = e.responseHeaders,
              o = e.responseContent,
              s = e.statusCode,
              u = e.timeTaken,
              l = "";
            function log(e) {
              l += e;
            }
            return (
              log(
                "Fauna " +
                  r +
                  " /" +
                  n +
                  (function _queryString(e) {
                    if (null == e) return "";
                    var t = Object.keys(e);
                    if (0 === t.length) return "";
                    return (
                      "?" +
                      t
                        .map(function (t) {
                          return t + "=" + e[t];
                        })
                        .join("&")
                    );
                  })(t) +
                  "\n"
              ),
              null != i && log("  Request JSON: " + _showJSON(i) + "\n"),
              log("  Response headers: " + _showJSON(a) + "\n"),
              log("  Response JSON: " + _showJSON(o) + "\n"),
              log("  Response (" + s + "): Network latency " + u + "ms\n"),
              l
            );
          }
          function _showJSON(e) {
            return (function _indent(e) {
              return e.split("\n").join("\n  ");
            })(n.toJSON(e, !0));
          }
          t.exports = {
            logger: function logger(e) {
              return function (t, r) {
                return e(showRequestResult(t), r);
              };
            },
            showRequestResult: showRequestResult,
          };
        },
        { "./_json": 54 },
      ],
      57: [
        function (e, t, r) {
          "use strict";
          var n = e("util");
          function FaunaError(e, t) {
            Error.call(this), (this.name = e), (this.message = t);
          }
          function InvalidValue(e) {
            FaunaError.call(this, "InvalidValue", e);
          }
          function InvalidArity(e, t, r, n) {
            const i = `${n} function requires ${(function messageForArity(
                e,
                t
              ) {
                return null === t
                  ? "at least " + e
                  : null === e
                  ? "up to " + t
                  : e === t
                  ? e
                  : "from " + e + " to " + t;
              })(e, t)} argument(s) but ${r} were given`,
              a = (function logDocumentationLink(e) {
                return `For more info, see the docs: https://docs.fauna.com/fauna/current/api/fql/functions/${e.toLowerCase()}`;
              })(n);
            FaunaError.call(this, "InvalidArity", `${i}\n${a}`),
              (this.min = e),
              (this.max = t),
              (this.actual = r);
          }
          function FaunaHTTPError(e, t) {
            var r = t.responseContent.errors,
              n = 0 === r.length ? '(empty "errors")' : r[0].code;
            FaunaError.call(this, e, n), (this.requestResult = t);
          }
          function BadRequest(e) {
            FaunaHTTPError.call(this, "BadRequest", e);
          }
          function Unauthorized(e) {
            FaunaHTTPError.call(this, "Unauthorized", e);
          }
          function PermissionDenied(e) {
            FaunaHTTPError.call(this, "PermissionDenied", e);
          }
          function NotFound(e) {
            FaunaHTTPError.call(this, "NotFound", e);
          }
          function MethodNotAllowed(e) {
            FaunaHTTPError.call(this, "MethodNotAllowed", e);
          }
          function InternalError(e) {
            FaunaHTTPError.call(this, "InternalError", e);
          }
          function UnavailableError(e) {
            FaunaHTTPError.call(this, "UnavailableError", e);
          }
          n.inherits(FaunaError, Error),
            n.inherits(InvalidValue, FaunaError),
            n.inherits(InvalidArity, FaunaError),
            n.inherits(FaunaHTTPError, FaunaError),
            (FaunaHTTPError.prototype.errors = function () {
              return this.requestResult.responseContent.errors;
            }),
            (FaunaHTTPError.raiseForStatusCode = function (e) {
              var t = e.statusCode;
              if (t < 200 || t >= 300)
                switch (t) {
                  case 400:
                    throw new BadRequest(e);
                  case 401:
                    throw new Unauthorized(e);
                  case 403:
                    throw new PermissionDenied(e);
                  case 404:
                    throw new NotFound(e);
                  case 405:
                    throw new MethodNotAllowed(e);
                  case 500:
                    throw new InternalError(e);
                  case 503:
                    throw new UnavailableError(e);
                  default:
                    throw new FaunaHTTPError("UnknownError", e);
                }
            }),
            n.inherits(BadRequest, FaunaHTTPError),
            n.inherits(Unauthorized, FaunaHTTPError),
            n.inherits(PermissionDenied, FaunaHTTPError),
            n.inherits(NotFound, FaunaHTTPError),
            n.inherits(MethodNotAllowed, FaunaHTTPError),
            n.inherits(InternalError, FaunaHTTPError),
            n.inherits(UnavailableError, FaunaHTTPError),
            (t.exports = {
              FaunaHTTPError: FaunaHTTPError,
              InvalidValue: InvalidValue,
              InvalidArity: InvalidArity,
              BadRequest: BadRequest,
              Unauthorized: Unauthorized,
              PermissionDenied: PermissionDenied,
              NotFound: NotFound,
              MethodNotAllowed: MethodNotAllowed,
              InternalError: InternalError,
              UnavailableError: UnavailableError,
            });
        },
        { util: 48 },
      ],
      58: [
        function (e, t, r) {
          "use strict";
          var n = e("fn-annotate"),
            i = e("util-deprecate"),
            a = e("./Expr"),
            o = e("./errors"),
            s = e("./values"),
            u = e("object-assign");
          function Var(e) {
            return arity.exact(1, arguments, Var.name), new a({ var: wrap(e) });
          }
          var objectFunction = function (e) {
            return (
              arity.exact(1, arguments, objectFunction.name),
              new a({ object: wrapValues(e) })
            );
          };
          function Lambda() {
            switch (
              (arity.between(1, 2, arguments, Lambda.name), arguments.length)
            ) {
              case 1:
                var e = arguments[0];
                if ("function" == typeof e)
                  return (function _lambdaFunc(e) {
                    var t = n(e);
                    switch (t.length) {
                      case 0:
                        throw new o.InvalidValue(
                          "Provided Function must take at least 1 argument."
                        );
                      case 1:
                        return _lambdaExpr(t[0], e(Var(t[0])));
                      default:
                        return _lambdaExpr(
                          t,
                          e.apply(
                            null,
                            t.map(function (e) {
                              return Var(e);
                            })
                          )
                        );
                    }
                  })(e);
                if (e instanceof a) return e;
                throw new o.InvalidValue(
                  "Lambda function takes either a Function or an Expr."
                );
              case 2:
                return _lambdaExpr(arguments[0], arguments[1]);
            }
          }
          function _lambdaExpr(e, t) {
            return new a({ lambda: wrap(e), expr: wrap(t) });
          }
          function arity(e, t, r, n) {
            if ((null !== e && r.length < e) || (null !== t && r.length > t))
              throw new o.InvalidArity(e, t, r.length, n);
          }
          function params(e, t) {
            for (var r in t) {
              var n = t[r];
              null !== n && (e[r] = n);
            }
            return e;
          }
          function varargs(e) {
            var t = Array.isArray(e) ? e : Array.prototype.slice.call(e);
            return 1 === e.length ? e[0] : t;
          }
          function argsToArray(e) {
            var t = [];
            return t.push.apply(t, e), t;
          }
          function defaults(e, t) {
            return void 0 === e ? t : e;
          }
          function wrap(e) {
            return (
              arity.exact(1, arguments, wrap.name),
              null === e
                ? null
                : e instanceof a
                ? e
                : "symbol" == typeof e
                ? e.toString().replace(/Symbol\((.*)\)/, function (e, t) {
                    return t;
                  })
                : "function" == typeof e
                ? Lambda(e)
                : Array.isArray(e)
                ? new a(
                    e.map(function (e) {
                      return wrap(e);
                    })
                  )
                : e instanceof Uint8Array || e instanceof ArrayBuffer
                ? new s.Bytes(e)
                : "object" == typeof e
                ? new a({ object: wrapValues(e) })
                : e
            );
          }
          function wrapValues(e) {
            if (null !== e) {
              var t = {};
              return (
                Object.keys(e).forEach(function (r) {
                  t[r] = wrap(e[r]);
                }),
                t
              );
            }
            return null;
          }
          (arity.exact = function (e, t, r) {
            arity(e, e, t, r);
          }),
            (arity.max = function (e, t, r) {
              arity(null, e, t, r);
            }),
            (arity.min = function (e, t, r) {
              arity(e, null, t, r);
            }),
            (arity.between = function (e, t, r, n) {
              arity(e, t, r, n);
            }),
            (t.exports = {
              Ref: function Ref() {
                switch (
                  (arity.between(1, 2, arguments, Ref.name), arguments.length)
                ) {
                  case 1:
                    return new a({ "@ref": wrap(arguments[0]) });
                  case 2:
                    return new a({
                      ref: wrap(arguments[0]),
                      id: wrap(arguments[1]),
                    });
                }
              },
              Bytes: function Bytes(e) {
                return arity.exact(1, arguments, Bytes.name), new s.Bytes(e);
              },
              Abort: function Abort(e) {
                return (
                  arity.exact(1, arguments, Abort.name),
                  new a({ abort: wrap(e) })
                );
              },
              At: function At(e, t) {
                return (
                  arity.exact(2, arguments, At.name),
                  new a({ at: wrap(e), expr: wrap(t) })
                );
              },
              Let: function Let(e, t) {
                arity.exact(2, arguments, Let.name);
                var r = [];
                if (
                  ((r = Array.isArray(e)
                    ? e.map(function (e) {
                        return wrapValues(e);
                      })
                    : Object.keys(e).map(function (t) {
                        var r = {};
                        return (r[t] = wrap(e[t])), r;
                      })),
                  "function" == typeof t)
                )
                  if (Array.isArray(e)) {
                    var n = [];
                    e.forEach(function (e) {
                      Object.keys(e).forEach(function (e) {
                        n.push(Var(e));
                      });
                    }),
                      (t = t.apply(null, n));
                  } else
                    t = t.apply(
                      null,
                      Object.keys(e).map(function (e) {
                        return Var(e);
                      })
                    );
                return new a({ let: r, in: wrap(t) });
              },
              Var: Var,
              If: function If(e, t, r) {
                return (
                  arity.exact(3, arguments, If.name),
                  new a({ if: wrap(e), then: wrap(t), else: wrap(r) })
                );
              },
              Do: function Do() {
                arity.min(1, arguments, Do.name);
                var e = argsToArray(arguments);
                return new a({ do: wrap(e) });
              },
              Object: objectFunction,
              Lambda: Lambda,
              Call: function Call(e) {
                arity.min(1, arguments, Call.name);
                var t = argsToArray(arguments);
                return (
                  t.shift(),
                  new a({ call: wrap(e), arguments: wrap(varargs(t)) })
                );
              },
              Query: function Query(e) {
                return (
                  arity.exact(1, arguments, Query.name),
                  new a({ query: wrap(e) })
                );
              },
              Map: function Map(e, t) {
                return (
                  arity.exact(2, arguments, Map.name),
                  new a({ map: wrap(t), collection: wrap(e) })
                );
              },
              Foreach: function Foreach(e, t) {
                return (
                  arity.exact(2, arguments, Foreach.name),
                  new a({ foreach: wrap(t), collection: wrap(e) })
                );
              },
              Filter: function Filter(e, t) {
                return (
                  arity.exact(2, arguments, Filter.name),
                  new a({ filter: wrap(t), collection: wrap(e) })
                );
              },
              Take: function Take(e, t) {
                return (
                  arity.exact(2, arguments, Take.name),
                  new a({ take: wrap(e), collection: wrap(t) })
                );
              },
              Drop: function Drop(e, t) {
                return (
                  arity.exact(2, arguments, Drop.name),
                  new a({ drop: wrap(e), collection: wrap(t) })
                );
              },
              Prepend: function Prepend(e, t) {
                return (
                  arity.exact(2, arguments, Prepend.name),
                  new a({ prepend: wrap(e), collection: wrap(t) })
                );
              },
              Append: function Append(e, t) {
                return (
                  arity.exact(2, arguments, Append.name),
                  new a({ append: wrap(e), collection: wrap(t) })
                );
              },
              IsEmpty: function IsEmpty(e) {
                return (
                  arity.exact(1, arguments, IsEmpty.name),
                  new a({ is_empty: wrap(e) })
                );
              },
              IsNonEmpty: function IsNonEmpty(e) {
                return (
                  arity.exact(1, arguments, IsNonEmpty.name),
                  new a({ is_nonempty: wrap(e) })
                );
              },
              IsNumber: function IsNumber(e) {
                return (
                  arity.exact(1, arguments, IsNumber.name),
                  new a({ is_number: wrap(e) })
                );
              },
              IsDouble: function IsDouble(e) {
                return (
                  arity.exact(1, arguments, IsDouble.name),
                  new a({ is_double: wrap(e) })
                );
              },
              IsInteger: function IsInteger(e) {
                return (
                  arity.exact(1, arguments, IsInteger.name),
                  new a({ is_integer: wrap(e) })
                );
              },
              IsBoolean: function IsBoolean(e) {
                return (
                  arity.exact(1, arguments, IsBoolean.name),
                  new a({ is_boolean: wrap(e) })
                );
              },
              IsNull: function IsNull(e) {
                return (
                  arity.exact(1, arguments, IsNull.name),
                  new a({ is_null: wrap(e) })
                );
              },
              IsBytes: function IsBytes(e) {
                return (
                  arity.exact(1, arguments, IsBytes.name),
                  new a({ is_bytes: wrap(e) })
                );
              },
              IsTimestamp: function IsTimestamp(e) {
                return (
                  arity.exact(1, arguments, IsTimestamp.name),
                  new a({ is_timestamp: wrap(e) })
                );
              },
              IsDate: function IsDate(e) {
                return (
                  arity.exact(1, arguments, IsDate.name),
                  new a({ is_date: wrap(e) })
                );
              },
              IsString: function IsString(e) {
                return (
                  arity.exact(1, arguments, IsString.name),
                  new a({ is_string: wrap(e) })
                );
              },
              IsArray: function IsArray(e) {
                return (
                  arity.exact(1, arguments, IsArray.name),
                  new a({ is_array: wrap(e) })
                );
              },
              IsObject: function IsObject(e) {
                return (
                  arity.exact(1, arguments, IsObject.name),
                  new a({ is_object: wrap(e) })
                );
              },
              IsRef: function IsRef(e) {
                return (
                  arity.exact(1, arguments, IsRef.name),
                  new a({ is_ref: wrap(e) })
                );
              },
              IsSet: function IsSet(e) {
                return (
                  arity.exact(1, arguments, IsSet.name),
                  new a({ is_set: wrap(e) })
                );
              },
              IsDoc: function IsDoc(e) {
                return (
                  arity.exact(1, arguments, IsDoc.name),
                  new a({ is_doc: wrap(e) })
                );
              },
              IsLambda: function IsLambda(e) {
                return (
                  arity.exact(1, arguments, IsLambda.name),
                  new a({ is_lambda: wrap(e) })
                );
              },
              IsCollection: function IsCollection(e) {
                return (
                  arity.exact(1, arguments, IsCollection.name),
                  new a({ is_collection: wrap(e) })
                );
              },
              IsDatabase: function IsDatabase(e) {
                return (
                  arity.exact(1, arguments, IsDatabase.name),
                  new a({ is_database: wrap(e) })
                );
              },
              IsIndex: function IsIndex(e) {
                return (
                  arity.exact(1, arguments, IsIndex.name),
                  new a({ is_index: wrap(e) })
                );
              },
              IsFunction: function IsFunction(e) {
                return (
                  arity.exact(1, arguments, IsFunction.name),
                  new a({ is_function: wrap(e) })
                );
              },
              IsKey: function IsKey(e) {
                return (
                  arity.exact(1, arguments, IsKey.name),
                  new a({ is_key: wrap(e) })
                );
              },
              IsToken: function IsToken(e) {
                return (
                  arity.exact(1, arguments, IsToken.name),
                  new a({ is_token: wrap(e) })
                );
              },
              IsCredentials: function IsCredentials(e) {
                return (
                  arity.exact(1, arguments, IsCredentials.name),
                  new a({ is_credentials: wrap(e) })
                );
              },
              IsRole: function IsRole(e) {
                return (
                  arity.exact(1, arguments, IsRole.name),
                  new a({ is_role: wrap(e) })
                );
              },
              Get: function Get(e, t) {
                return (
                  arity.between(1, 2, arguments, Get.name),
                  (t = defaults(t, null)),
                  new a(params({ get: wrap(e) }, { ts: wrap(t) }))
                );
              },
              KeyFromSecret: function KeyFromSecret(e) {
                return (
                  arity.exact(1, arguments, KeyFromSecret.name),
                  new a({ key_from_secret: wrap(e) })
                );
              },
              Reduce: function Reduce(e, t, r) {
                return (
                  arity.exact(3, arguments, Reduce.name),
                  new a({
                    reduce: wrap(e),
                    initial: wrap(t),
                    collection: wrap(r),
                  })
                );
              },
              Paginate: function Paginate(e, t) {
                return (
                  arity.between(1, 2, arguments, Paginate.name),
                  (t = defaults(t, {})),
                  new a(u({ paginate: wrap(e) }, wrapValues(t)))
                );
              },
              Exists: function Exists(e, t) {
                return (
                  arity.between(1, 2, arguments, Exists.name),
                  (t = defaults(t, null)),
                  new a(params({ exists: wrap(e) }, { ts: wrap(t) }))
                );
              },
              Create: function Create(e, t) {
                return (
                  arity.between(1, 2, arguments, Create.name),
                  new a({ create: wrap(e), params: wrap(t) })
                );
              },
              Update: function Update(e, t) {
                return (
                  arity.exact(2, arguments, Update.name),
                  new a({ update: wrap(e), params: wrap(t) })
                );
              },
              Replace: function Replace(e, t) {
                return (
                  arity.exact(2, arguments, Replace.name),
                  new a({ replace: wrap(e), params: wrap(t) })
                );
              },
              Delete: function Delete(e) {
                return (
                  arity.exact(1, arguments, Delete.name),
                  new a({ delete: wrap(e) })
                );
              },
              Insert: function Insert(e, t, r, n) {
                return (
                  arity.exact(4, arguments, Insert.name),
                  new a({
                    insert: wrap(e),
                    ts: wrap(t),
                    action: wrap(r),
                    params: wrap(n),
                  })
                );
              },
              Remove: function Remove(e, t, r) {
                return (
                  arity.exact(3, arguments, Remove.name),
                  new a({ remove: wrap(e), ts: wrap(t), action: wrap(r) })
                );
              },
              CreateClass: i(function CreateClass(e) {
                return (
                  arity.exact(1, arguments, CreateClass.name),
                  new a({ create_class: wrap(e) })
                );
              }, "CreateClass() is deprecated, use CreateCollection() instead"),
              CreateCollection: function CreateCollection(e) {
                return (
                  arity.exact(1, arguments, CreateCollection.name),
                  new a({ create_collection: wrap(e) })
                );
              },
              CreateDatabase: function CreateDatabase(e) {
                return (
                  arity.exact(1, arguments, CreateDatabase.name),
                  new a({ create_database: wrap(e) })
                );
              },
              CreateIndex: function CreateIndex(e) {
                return (
                  arity.exact(1, arguments, CreateIndex.name),
                  new a({ create_index: wrap(e) })
                );
              },
              CreateKey: function CreateKey(e) {
                return (
                  arity.exact(1, arguments, CreateKey.name),
                  new a({ create_key: wrap(e) })
                );
              },
              CreateFunction: function CreateFunction(e) {
                return (
                  arity.exact(1, arguments, CreateFunction.name),
                  new a({ create_function: wrap(e) })
                );
              },
              CreateRole: function CreateRole(e) {
                return (
                  arity.exact(1, arguments, CreateRole.name),
                  new a({ create_role: wrap(e) })
                );
              },
              Singleton: function Singleton(e) {
                return (
                  arity.exact(1, arguments, Singleton.name),
                  new a({ singleton: wrap(e) })
                );
              },
              Events: function Events(e) {
                return (
                  arity.exact(1, arguments, Events.name),
                  new a({ events: wrap(e) })
                );
              },
              Match: function Match(e) {
                arity.min(1, arguments, Match.name);
                var t = argsToArray(arguments);
                return (
                  t.shift(), new a({ match: wrap(e), terms: wrap(varargs(t)) })
                );
              },
              Union: function Union() {
                return (
                  arity.min(1, arguments, Union.name),
                  new a({ union: wrap(varargs(arguments)) })
                );
              },
              Merge: function Merge(e, t, r) {
                return (
                  arity.between(2, 3, arguments, Merge.name),
                  new a(
                    params(
                      { merge: wrap(e), with: wrap(t) },
                      { lambda: wrap(r) }
                    )
                  )
                );
              },
              Intersection: function Intersection() {
                return (
                  arity.min(1, arguments, Intersection.name),
                  new a({ intersection: wrap(varargs(arguments)) })
                );
              },
              Difference: function Difference() {
                return (
                  arity.min(1, arguments, Difference.name),
                  new a({ difference: wrap(varargs(arguments)) })
                );
              },
              Distinct: function Distinct(e) {
                return (
                  arity.exact(1, arguments, Distinct.name),
                  new a({ distinct: wrap(e) })
                );
              },
              Join: function Join(e, t) {
                return (
                  arity.exact(2, arguments, Join.name),
                  new a({ join: wrap(e), with: wrap(t) })
                );
              },
              Range: function Range(e, t, r) {
                return (
                  arity.exact(3, arguments, Range.name),
                  new a({ range: wrap(e), from: wrap(t), to: wrap(r) })
                );
              },
              Login: function Login(e, t) {
                return (
                  arity.exact(2, arguments, Login.name),
                  new a({ login: wrap(e), params: wrap(t) })
                );
              },
              Logout: function Logout(e) {
                return (
                  arity.exact(1, arguments, Logout.name),
                  new a({ logout: wrap(e) })
                );
              },
              Identify: function Identify(e, t) {
                return (
                  arity.exact(2, arguments, Identify.name),
                  new a({ identify: wrap(e), password: wrap(t) })
                );
              },
              Identity: function Identity() {
                return (
                  arity.exact(0, arguments, Identity.name),
                  new a({ identity: null })
                );
              },
              HasIdentity: function HasIdentity() {
                return (
                  arity.exact(0, arguments, HasIdentity.name),
                  new a({ has_identity: null })
                );
              },
              Concat: function Concat(e, t) {
                return (
                  arity.min(1, arguments, Concat.name),
                  (t = defaults(t, null)),
                  new a(params({ concat: wrap(e) }, { separator: wrap(t) }))
                );
              },
              Casefold: function Casefold(e, t) {
                return (
                  arity.min(1, arguments, Casefold.name),
                  new a(params({ casefold: wrap(e) }, { normalizer: wrap(t) }))
                );
              },
              ContainsStr: function ContainsStr(e, t) {
                return (
                  arity.exact(2, arguments, ContainsStr.name),
                  new a({ containsstr: wrap(e), search: wrap(t) })
                );
              },
              ContainsStrRegex: function ContainsStrRegex(e, t) {
                return (
                  arity.exact(2, arguments, ContainsStrRegex.name),
                  new a({ containsstrregex: wrap(e), pattern: wrap(t) })
                );
              },
              StartsWith: function StartsWith(e, t) {
                return (
                  arity.exact(2, arguments, StartsWith.name),
                  new a({ startswith: wrap(e), search: wrap(t) })
                );
              },
              EndsWith: function EndsWith(e, t) {
                return (
                  arity.exact(2, arguments, EndsWith.name),
                  new a({ endswith: wrap(e), search: wrap(t) })
                );
              },
              FindStr: function FindStr(e, t, r) {
                return (
                  arity.between(2, 3, arguments, FindStr.name),
                  (r = defaults(r, null)),
                  new a(
                    params(
                      { findstr: wrap(e), find: wrap(t) },
                      { start: wrap(r) }
                    )
                  )
                );
              },
              FindStrRegex: function FindStrRegex(e, t, r, n) {
                return (
                  arity.between(2, 4, arguments, FindStrRegex.name),
                  (r = defaults(r, null)),
                  new a(
                    params(
                      { findstrregex: wrap(e), pattern: wrap(t) },
                      { start: wrap(r), num_results: wrap(n) }
                    )
                  )
                );
              },
              Length: function Length(e) {
                return (
                  arity.exact(1, arguments, Length.name),
                  new a({ length: wrap(e) })
                );
              },
              LowerCase: function LowerCase(e) {
                return (
                  arity.exact(1, arguments, LowerCase.name),
                  new a({ lowercase: wrap(e) })
                );
              },
              LTrim: function LTrim(e) {
                return (
                  arity.exact(1, arguments, LTrim.name),
                  new a({ ltrim: wrap(e) })
                );
              },
              NGram: function NGram(e, t, r) {
                return (
                  arity.between(1, 3, arguments, NGram.name),
                  (t = defaults(t, null)),
                  (r = defaults(r, null)),
                  new a(
                    params({ ngram: wrap(e) }, { min: wrap(t), max: wrap(r) })
                  )
                );
              },
              Repeat: function Repeat(e, t) {
                return (
                  arity.between(1, 2, arguments, Repeat.name),
                  (t = defaults(t, null)),
                  new a(params({ repeat: wrap(e) }, { number: wrap(t) }))
                );
              },
              ReplaceStr: function ReplaceStr(e, t, r) {
                return (
                  arity.exact(3, arguments, ReplaceStr.name),
                  new a({
                    replacestr: wrap(e),
                    find: wrap(t),
                    replace: wrap(r),
                  })
                );
              },
              ReplaceStrRegex: function ReplaceStrRegex(e, t, r, n) {
                return (
                  arity.between(3, 4, arguments, ReplaceStrRegex.name),
                  (n = defaults(n, null)),
                  new a(
                    params(
                      {
                        replacestrregex: wrap(e),
                        pattern: wrap(t),
                        replace: wrap(r),
                      },
                      { first: wrap(n) }
                    )
                  )
                );
              },
              RegexEscape: function RegexEscape(e) {
                return (
                  arity.exact(1, arguments, RegexEscape.name),
                  new a({ regexescape: wrap(e) })
                );
              },
              RTrim: function RTrim(e) {
                return (
                  arity.exact(1, arguments, RTrim.name),
                  new a({ rtrim: wrap(e) })
                );
              },
              Space: function Space(e) {
                return (
                  arity.exact(1, arguments, Space.name),
                  new a({ space: wrap(e) })
                );
              },
              SubString: function SubString(e, t, r) {
                return (
                  arity.between(1, 3, arguments, SubString.name),
                  (t = defaults(t, null)),
                  (r = defaults(r, null)),
                  new a(
                    params(
                      { substring: wrap(e) },
                      { start: wrap(t), length: wrap(r) }
                    )
                  )
                );
              },
              TitleCase: function TitleCase(e) {
                return (
                  arity.exact(1, arguments, TitleCase.name),
                  new a({ titlecase: wrap(e) })
                );
              },
              Trim: function Trim(e) {
                return (
                  arity.exact(1, arguments, Trim.name), new a({ trim: wrap(e) })
                );
              },
              UpperCase: function UpperCase(e) {
                return (
                  arity.exact(1, arguments, UpperCase.name),
                  new a({ uppercase: wrap(e) })
                );
              },
              Format: function Format(e) {
                arity.min(1, arguments, Format.name);
                var t = argsToArray(arguments);
                return (
                  t.shift(),
                  new a({ format: wrap(e), values: wrap(varargs(t)) })
                );
              },
              Time: function Time(e) {
                return (
                  arity.exact(1, arguments, Time.name), new a({ time: wrap(e) })
                );
              },
              TimeAdd: function TimeAdd(e, t, r) {
                return (
                  arity.exact(3, arguments, TimeAdd.name),
                  new a({ time_add: wrap(e), offset: wrap(t), unit: wrap(r) })
                );
              },
              TimeSubtract: function TimeSubtract(e, t, r) {
                return (
                  arity.exact(3, arguments, TimeSubtract.name),
                  new a({
                    time_subtract: wrap(e),
                    offset: wrap(t),
                    unit: wrap(r),
                  })
                );
              },
              TimeDiff: function TimeDiff(e, t, r) {
                return (
                  arity.exact(3, arguments, TimeDiff.name),
                  new a({ time_diff: wrap(e), other: wrap(t), unit: wrap(r) })
                );
              },
              Epoch: function Epoch(e, t) {
                return (
                  arity.exact(2, arguments, Epoch.name),
                  new a({ epoch: wrap(e), unit: wrap(t) })
                );
              },
              Date: function Date(e) {
                return (
                  arity.exact(1, arguments, Date.name), new a({ date: wrap(e) })
                );
              },
              Now: function Now() {
                return (
                  arity.exact(0, arguments, Now.name),
                  new a({ now: wrap(null) })
                );
              },
              NextId: i(function NextId() {
                return (
                  arity.exact(0, arguments, NextId.name),
                  new a({ next_id: null })
                );
              }, "NextId() is deprecated, use NewId() instead"),
              NewId: function NewId() {
                return (
                  arity.exact(0, arguments, NewId.name), new a({ new_id: null })
                );
              },
              Database: function Database(e, t) {
                switch (
                  (arity.between(1, 2, arguments, Database.name),
                  arguments.length)
                ) {
                  case 1:
                    return new a({ database: wrap(e) });
                  case 2:
                    return new a({ database: wrap(e), scope: wrap(t) });
                }
              },
              Index: function Index(e, t) {
                switch (
                  (arity.between(1, 2, arguments, Index.name), arguments.length)
                ) {
                  case 1:
                    return new a({ index: wrap(e) });
                  case 2:
                    return new a({ index: wrap(e), scope: wrap(t) });
                }
              },
              Class: i(function Class(e, t) {
                switch (
                  (arity.between(1, 2, arguments, Class.name), arguments.length)
                ) {
                  case 1:
                    return new a({ class: wrap(e) });
                  case 2:
                    return new a({ class: wrap(e), scope: wrap(t) });
                }
              }, "Class() is deprecated, use Collection() instead"),
              Collection: function Collection(e, t) {
                switch (
                  (arity.between(1, 2, arguments, Collection.name),
                  arguments.length)
                ) {
                  case 1:
                    return new a({ collection: wrap(e) });
                  case 2:
                    return new a({ collection: wrap(e), scope: wrap(t) });
                }
              },
              Function: function FunctionFn(e, t) {
                switch (
                  (arity.between(1, 2, arguments, FunctionFn.name),
                  arguments.length)
                ) {
                  case 1:
                    return new a({ function: wrap(e) });
                  case 2:
                    return new a({ function: wrap(e), scope: wrap(t) });
                }
              },
              Role: function Role(e, t) {
                return (
                  arity.between(1, 2, arguments, Role.name),
                  (t = defaults(t, null)),
                  new a(params({ role: wrap(e) }, { scope: wrap(t) }))
                );
              },
              Classes: i(function Classes(e) {
                return (
                  arity.max(1, arguments, Classes.name),
                  (e = defaults(e, null)),
                  new a({ classes: wrap(e) })
                );
              }, "Classes() is deprecated, use Collections() instead"),
              Collections: function Collections(e) {
                return (
                  arity.max(1, arguments, Collections.name),
                  (e = defaults(e, null)),
                  new a({ collections: wrap(e) })
                );
              },
              Databases: function Databases(e) {
                return (
                  arity.max(1, arguments, Databases.name),
                  (e = defaults(e, null)),
                  new a({ databases: wrap(e) })
                );
              },
              Indexes: function Indexes(e) {
                return (
                  arity.max(1, arguments, Indexes.name),
                  (e = defaults(e, null)),
                  new a({ indexes: wrap(e) })
                );
              },
              Functions: function Functions(e) {
                return (
                  arity.max(1, arguments, Functions.name),
                  (e = defaults(e, null)),
                  new a({ functions: wrap(e) })
                );
              },
              Roles: function Roles(e) {
                return (
                  arity.max(1, arguments, Roles.name),
                  (e = defaults(e, null)),
                  new a({ roles: wrap(e) })
                );
              },
              Keys: function Keys(e) {
                return (
                  arity.max(1, arguments, Keys.name),
                  (e = defaults(e, null)),
                  new a({ keys: wrap(e) })
                );
              },
              Tokens: function Tokens(e) {
                return (
                  arity.max(1, arguments, Tokens.name),
                  (e = defaults(e, null)),
                  new a({ tokens: wrap(e) })
                );
              },
              Credentials: function Credentials(e) {
                return (
                  arity.max(1, arguments, Credentials.name),
                  (e = defaults(e, null)),
                  new a({ credentials: wrap(e) })
                );
              },
              Equals: function Equals() {
                return (
                  arity.min(1, arguments, Equals.name),
                  new a({ equals: wrap(varargs(arguments)) })
                );
              },
              Contains: function Contains(e, t) {
                return (
                  arity.exact(2, arguments, Contains.name),
                  new a({ contains: wrap(e), in: wrap(t) })
                );
              },
              Select: function Select(e, t, r) {
                arity.between(2, 3, arguments, Select.name);
                var n = { select: wrap(e), from: wrap(t) };
                return void 0 !== r && (n.default = wrap(r)), new a(n);
              },
              SelectAll: i(function SelectAll(e, t) {
                return (
                  arity.exact(2, arguments, SelectAll.name),
                  new a({ select_all: wrap(e), from: wrap(t) })
                );
              }, "SelectAll() is deprecated. Avoid use."),
              Abs: function Abs(e) {
                return (
                  arity.exact(1, arguments, Abs.name), new a({ abs: wrap(e) })
                );
              },
              Add: function Add() {
                return (
                  arity.min(1, arguments, Add.name),
                  new a({ add: wrap(varargs(arguments)) })
                );
              },
              BitAnd: function BitAnd() {
                return (
                  arity.min(1, arguments, BitAnd.name),
                  new a({ bitand: wrap(varargs(arguments)) })
                );
              },
              BitNot: function BitNot(e) {
                return (
                  arity.exact(1, arguments, BitNot.name),
                  new a({ bitnot: wrap(e) })
                );
              },
              BitOr: function BitOr() {
                return (
                  arity.min(1, arguments, BitOr.name),
                  new a({ bitor: wrap(varargs(arguments)) })
                );
              },
              BitXor: function BitXor() {
                return (
                  arity.min(1, arguments, BitXor.name),
                  new a({ bitxor: wrap(varargs(arguments)) })
                );
              },
              Ceil: function Ceil(e) {
                return (
                  arity.exact(1, arguments, Ceil.name), new a({ ceil: wrap(e) })
                );
              },
              Divide: function Divide() {
                return (
                  arity.min(1, arguments, Divide.name),
                  new a({ divide: wrap(varargs(arguments)) })
                );
              },
              Floor: function Floor(e) {
                return (
                  arity.exact(1, arguments, Floor.name),
                  new a({ floor: wrap(e) })
                );
              },
              Max: function Max() {
                return (
                  arity.min(1, arguments, Max.name),
                  new a({ max: wrap(varargs(arguments)) })
                );
              },
              Min: function Min() {
                return (
                  arity.min(1, arguments, Min.name),
                  new a({ min: wrap(varargs(arguments)) })
                );
              },
              Modulo: function Modulo() {
                return (
                  arity.min(1, arguments, Modulo.name),
                  new a({ modulo: wrap(varargs(arguments)) })
                );
              },
              Multiply: function Multiply() {
                return (
                  arity.min(1, arguments, Multiply.name),
                  new a({ multiply: wrap(varargs(arguments)) })
                );
              },
              Round: function Round(e, t) {
                return (
                  arity.min(1, arguments, Round.name),
                  (t = defaults(t, null)),
                  new a(params({ round: wrap(e) }, { precision: wrap(t) }))
                );
              },
              Subtract: function Subtract() {
                return (
                  arity.min(1, arguments, Subtract.name),
                  new a({ subtract: wrap(varargs(arguments)) })
                );
              },
              Sign: function Sign(e) {
                return (
                  arity.exact(1, arguments, Sign.name), new a({ sign: wrap(e) })
                );
              },
              Sqrt: function Sqrt(e) {
                return (
                  arity.exact(1, arguments, Sqrt.name), new a({ sqrt: wrap(e) })
                );
              },
              Trunc: function Trunc(e, t) {
                return (
                  arity.min(1, arguments, Trunc.name),
                  (t = defaults(t, null)),
                  new a(params({ trunc: wrap(e) }, { precision: wrap(t) }))
                );
              },
              Count: function Count(e) {
                return (
                  arity.exact(1, arguments, Count.name),
                  new a({ count: wrap(e) })
                );
              },
              Sum: function Sum(e) {
                return (
                  arity.exact(1, arguments, Sum.name), new a({ sum: wrap(e) })
                );
              },
              Mean: function Mean(e) {
                return (
                  arity.exact(1, arguments, Mean.name), new a({ mean: wrap(e) })
                );
              },
              Any: function Any(e) {
                return (
                  arity.exact(1, arguments, Any.name), new a({ any: wrap(e) })
                );
              },
              All: function All(e) {
                return (
                  arity.exact(1, arguments, All.name), new a({ all: wrap(e) })
                );
              },
              Acos: function Acos(e) {
                return (
                  arity.exact(1, arguments, Acos.name), new a({ acos: wrap(e) })
                );
              },
              Asin: function Asin(e) {
                return (
                  arity.exact(1, arguments, Asin.name), new a({ asin: wrap(e) })
                );
              },
              Atan: function Atan(e) {
                return (
                  arity.exact(1, arguments, Atan.name), new a({ atan: wrap(e) })
                );
              },
              Cos: function Cos(e) {
                return (
                  arity.exact(1, arguments, Cos.name), new a({ cos: wrap(e) })
                );
              },
              Cosh: function Cosh(e) {
                return (
                  arity.exact(1, arguments, Cosh.name), new a({ cosh: wrap(e) })
                );
              },
              Degrees: function Degrees(e) {
                return (
                  arity.exact(1, arguments, Degrees.name),
                  new a({ degrees: wrap(e) })
                );
              },
              Exp: function Exp(e) {
                return (
                  arity.exact(1, arguments, Exp.name), new a({ exp: wrap(e) })
                );
              },
              Hypot: function Hypot(e, t) {
                return (
                  arity.min(1, arguments, Hypot.name),
                  (t = defaults(t, null)),
                  new a(params({ hypot: wrap(e) }, { b: wrap(t) }))
                );
              },
              Ln: function Ln(e) {
                return (
                  arity.exact(1, arguments, Ln.name), new a({ ln: wrap(e) })
                );
              },
              Log: function Log(e) {
                return (
                  arity.exact(1, arguments, Log.name), new a({ log: wrap(e) })
                );
              },
              Pow: function Pow(e, t) {
                return (
                  arity.min(1, arguments, Pow.name),
                  (t = defaults(t, null)),
                  new a(params({ pow: wrap(e) }, { exp: wrap(t) }))
                );
              },
              Radians: function Radians(e) {
                return (
                  arity.exact(1, arguments, Radians.name),
                  new a({ radians: wrap(e) })
                );
              },
              Sin: function Sin(e) {
                return (
                  arity.exact(1, arguments, Sin.name), new a({ sin: wrap(e) })
                );
              },
              Sinh: function Sinh(e) {
                return (
                  arity.exact(1, arguments, Sinh.name), new a({ sinh: wrap(e) })
                );
              },
              Tan: function Tan(e) {
                return (
                  arity.exact(1, arguments, Tan.name), new a({ tan: wrap(e) })
                );
              },
              Tanh: function Tanh(e) {
                return (
                  arity.exact(1, arguments, Tanh.name), new a({ tanh: wrap(e) })
                );
              },
              LT: function LT() {
                return (
                  arity.min(1, arguments, LT.name),
                  new a({ lt: wrap(varargs(arguments)) })
                );
              },
              LTE: function LTE() {
                return (
                  arity.min(1, arguments, LTE.name),
                  new a({ lte: wrap(varargs(arguments)) })
                );
              },
              GT: function GT() {
                return (
                  arity.min(1, arguments, GT.name),
                  new a({ gt: wrap(varargs(arguments)) })
                );
              },
              GTE: function GTE() {
                return (
                  arity.min(1, arguments, GTE.name),
                  new a({ gte: wrap(varargs(arguments)) })
                );
              },
              And: function And() {
                return (
                  arity.min(1, arguments, And.name),
                  new a({ and: wrap(varargs(arguments)) })
                );
              },
              Or: function Or() {
                return (
                  arity.min(1, arguments, Or.name),
                  new a({ or: wrap(varargs(arguments)) })
                );
              },
              Not: function Not(e) {
                return (
                  arity.exact(1, arguments, Not.name), new a({ not: wrap(e) })
                );
              },
              ToString: function ToString(e) {
                return (
                  arity.exact(1, arguments, ToString.name),
                  new a({ to_string: wrap(e) })
                );
              },
              ToNumber: function ToNumber(e) {
                return (
                  arity.exact(1, arguments, ToNumber.name),
                  new a({ to_number: wrap(e) })
                );
              },
              ToObject: function ToObject(e) {
                return (
                  arity.exact(1, arguments, ToObject.name),
                  new a({ to_object: wrap(e) })
                );
              },
              ToArray: function ToArray(e) {
                return (
                  arity.exact(1, arguments, ToArray.name),
                  new a({ to_array: wrap(e) })
                );
              },
              ToDouble: function ToDouble(e) {
                return (
                  arity.exact(1, arguments, ToDouble.name),
                  new a({ to_double: wrap(e) })
                );
              },
              ToInteger: function ToInteger(e) {
                return (
                  arity.exact(1, arguments, ToInteger.name),
                  new a({ to_integer: wrap(e) })
                );
              },
              ToTime: function ToTime(e) {
                return (
                  arity.exact(1, arguments, ToTime.name),
                  new a({ to_time: wrap(e) })
                );
              },
              ToSeconds: function ToSeconds(e) {
                return (
                  arity.exact(1, arguments, ToSeconds.name),
                  new a({ to_seconds: wrap(e) })
                );
              },
              ToMicros: function ToMicros(e) {
                return (
                  arity.exact(1, arguments, ToMicros.name),
                  new a({ to_micros: wrap(e) })
                );
              },
              ToMillis: function ToMillis(e) {
                return (
                  arity.exact(1, arguments, ToMillis.name),
                  new a({ to_millis: wrap(e) })
                );
              },
              DayOfMonth: function DayOfMonth(e) {
                return (
                  arity.exact(1, arguments, DayOfMonth.name),
                  new a({ day_of_month: wrap(e) })
                );
              },
              DayOfWeek: function DayOfWeek(e) {
                return (
                  arity.exact(1, arguments, DayOfWeek.name),
                  new a({ day_of_week: wrap(e) })
                );
              },
              DayOfYear: function DayOfYear(e) {
                return (
                  arity.exact(1, arguments, DayOfYear.name),
                  new a({ day_of_year: wrap(e) })
                );
              },
              Second: function Second(e) {
                return (
                  arity.exact(1, arguments, Second.name),
                  new a({ second: wrap(e) })
                );
              },
              Minute: function Minute(e) {
                return (
                  arity.exact(1, arguments, Minute.name),
                  new a({ minute: wrap(e) })
                );
              },
              Hour: function Hour(e) {
                return (
                  arity.exact(1, arguments, Hour.name), new a({ hour: wrap(e) })
                );
              },
              Month: function Month(e) {
                return (
                  arity.exact(1, arguments, Month.name),
                  new a({ month: wrap(e) })
                );
              },
              Year: function Year(e) {
                return (
                  arity.exact(1, arguments, Year.name), new a({ year: wrap(e) })
                );
              },
              ToDate: function ToDate(e) {
                return (
                  arity.exact(1, arguments, ToDate.name),
                  new a({ to_date: wrap(e) })
                );
              },
              MoveDatabase: function MoveDatabase(e, t) {
                return (
                  arity.exact(2, arguments, MoveDatabase.name),
                  new a({ move_database: wrap(e), to: wrap(t) })
                );
              },
              Documents: function Documents(e) {
                return (
                  arity.exact(1, arguments, Documents.name),
                  new a({ documents: wrap(e) })
                );
              },
              wrap: wrap,
            });
        },
        {
          "./Expr": 51,
          "./errors": 57,
          "./values": 59,
          "fn-annotate": 9,
          "object-assign": 13,
          "util-deprecate": 45,
        },
      ],
      59: [
        function (e, t, r) {
          "use strict";
          var n = e("base64-js"),
            i = e("util-deprecate"),
            a = e("./errors"),
            o = e("./Expr"),
            s = e("util"),
            u = s && s.inspect && s.inspect.custom,
            l = (s && s.inspect) || JSON.stringify;
          function Value() {}
          function Ref(e, t, r) {
            if (!e) throw new a.InvalidValue("id cannot be null or undefined");
            (this.value = { id: e }),
              t && (this.value.collection = t),
              r && (this.value.database = r);
          }
          s.inherits(Value, o),
            s.inherits(Ref, Value),
            Object.defineProperty(Ref.prototype, "collection", {
              get: function () {
                return this.value.collection;
              },
            }),
            Object.defineProperty(Ref.prototype, "class", {
              get: i(function () {
                return this.value.collection;
              }, "class is deprecated, use collection instead"),
            }),
            Object.defineProperty(Ref.prototype, "database", {
              get: function () {
                return this.value.database;
              },
            }),
            Object.defineProperty(Ref.prototype, "id", {
              get: function () {
                return this.value.id;
              },
            }),
            (Ref.prototype.toJSON = function () {
              return { "@ref": this.value };
            }),
            wrapToString(Ref, function () {
              var e = {
                  collections: "Collection",
                  databases: "Database",
                  indexes: "Index",
                  functions: "Function",
                  roles: "Role",
                },
                toString = function (t) {
                  if (void 0 === t.collection) {
                    var r = void 0 !== t.database ? t.database.toString() : "";
                    return (
                      t.id.charAt(0).toUpperCase() +
                      t.id.slice(1) +
                      "(" +
                      r +
                      ")"
                    );
                  }
                  var n = e[t.collection.id];
                  if (void 0 !== n) {
                    r =
                      void 0 !== t.database ? ", " + t.database.toString() : "";
                    return n + '("' + t.id + '"' + r + ")";
                  }
                  return "Ref(" + toString(t.collection) + ', "' + t.id + '")';
                };
              return toString(this);
            }),
            (Ref.prototype.valueOf = function () {
              return this.value;
            }),
            (Ref.prototype.equals = function (e) {
              return (
                e instanceof Ref &&
                this.id === e.id &&
                ((void 0 === this.collection && void 0 === e.collection) ||
                  this.collection.equals(e.collection)) &&
                ((void 0 === this.database && void 0 === e.database) ||
                  this.database.equals(e.database))
              );
            });
          var c = {
            COLLECTIONS: new Ref("collections"),
            INDEXES: new Ref("indexes"),
            DATABASES: new Ref("databases"),
            FUNCTIONS: new Ref("functions"),
            ROLES: new Ref("roles"),
            KEYS: new Ref("keys"),
          };
          function SetRef(e) {
            this.value = e;
          }
          function FaunaTime(e) {
            if (e instanceof Date) e = e.toISOString();
            else if ("Z" !== e.charAt(e.length - 1))
              throw new a.InvalidValue(
                "Only allowed timezone is 'Z', got: " + e
              );
            this.value = e;
          }
          function FaunaDate(e) {
            e instanceof Date && (e = e.toISOString().slice(0, 10)),
              (this.value = e);
          }
          function Bytes(e) {
            if (e instanceof ArrayBuffer) this.value = new Uint8Array(e);
            else if ("string" == typeof e) this.value = n.toByteArray(e);
            else {
              if (!(e instanceof Uint8Array))
                throw new a.InvalidValue(
                  "Bytes type expect argument to be either Uint8Array|ArrayBuffer|string, got: " +
                    l(e)
                );
              this.value = e;
            }
          }
          function Query(e) {
            this.value = e;
          }
          function wrapToString(e, t) {
            (e.prototype.toString = t),
              (e.prototype.inspect = t),
              u && (e.prototype[u] = t);
          }
          (c.fromName = function (e) {
            switch (e) {
              case "collections":
                return c.COLLECTIONS;
              case "indexes":
                return c.INDEXES;
              case "databases":
                return c.DATABASES;
              case "functions":
                return c.FUNCTIONS;
              case "roles":
                return c.ROLES;
              case "keys":
                return c.KEYS;
            }
            return new Ref(e);
          }),
            s.inherits(SetRef, Value),
            wrapToString(SetRef, function () {
              return o.toString(this.value);
            }),
            (SetRef.prototype.toJSON = function () {
              return { "@set": this.value };
            }),
            s.inherits(FaunaTime, Value),
            Object.defineProperty(FaunaTime.prototype, "date", {
              get: function () {
                return new Date(this.value);
              },
            }),
            wrapToString(FaunaTime, function () {
              return 'Time("' + this.value + '")';
            }),
            (FaunaTime.prototype.toJSON = function () {
              return { "@ts": this.value };
            }),
            s.inherits(FaunaDate, Value),
            Object.defineProperty(FaunaDate.prototype, "date", {
              get: function () {
                return new Date(this.value);
              },
            }),
            wrapToString(FaunaDate, function () {
              return 'Date("' + this.value + '")';
            }),
            (FaunaDate.prototype.toJSON = function () {
              return { "@date": this.value };
            }),
            s.inherits(Bytes, Value),
            wrapToString(Bytes, function () {
              return 'Bytes("' + n.fromByteArray(this.value) + '")';
            }),
            (Bytes.prototype.toJSON = function () {
              return { "@bytes": n.fromByteArray(this.value) };
            }),
            s.inherits(Query, Value),
            wrapToString(Query, function () {
              return "Query(" + o.toString(this.value) + ")";
            }),
            (Query.prototype.toJSON = function () {
              return { "@query": this.value };
            }),
            (t.exports = {
              Value: Value,
              Ref: Ref,
              Native: c,
              SetRef: SetRef,
              FaunaTime: FaunaTime,
              FaunaDate: FaunaDate,
              Bytes: Bytes,
              Query: Query,
            });
        },
        {
          "./Expr": 51,
          "./errors": 57,
          "base64-js": 2,
          util: 48,
          "util-deprecate": 45,
        },
      ],
    },
    {},
    [1]
  )(1);
});
