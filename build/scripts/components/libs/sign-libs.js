var t = {
    519: (t, e, r) => {
      function i(t) {
        return (
          (i =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    'function' == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                }),
          i(t)
        );
      }
      r.d(e, { Qr: () => n, Tp: () => s, jZ: () => d, nF: () => z, rG: () => M }), (t = r.hmd(t));
      var n = {},
        s = {};
      function o() {
        (this.i = 0), (this.j = 0), (this.S = []);
      }
      !(function () {
        var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          e = n,
          r = (e.util = {
            rotl: function (t, e) {
              return (t << e) | (t >>> (32 - e));
            },
            rotr: function (t, e) {
              return (t << (32 - e)) | (t >>> e);
            },
            endian: function (t) {
              if (t.constructor == Number)
                return (16711935 & r.rotl(t, 8)) | (4278255360 & r.rotl(t, 24));
              for (var e = 0; e < t.length; e++) t[e] = r.endian(t[e]);
              return t;
            },
            randomBytes: function (t) {
              for (var e = []; t > 0; t--) e.push(Math.floor(256 * Math.random()));
              return e;
            },
            bytesToWords: function (t) {
              for (var e = [], r = 0, i = 0; r < t.length; r++, i += 8)
                e[i >>> 5] |= t[r] << (24 - (i % 32));
              return e;
            },
            wordsToBytes: function (t) {
              for (var e = [], r = 0; r < 32 * t.length; r += 8)
                e.push((t[r >>> 5] >>> (24 - (r % 32))) & 255);
              return e;
            },
            bytesToHex: function (t) {
              for (var e = [], r = 0; r < t.length; r++)
                e.push((t[r] >>> 4).toString(16)), e.push((15 & t[r]).toString(16));
              return e.join('');
            },
            hexToBytes: function (t) {
              for (var e = [], r = 0; r < t.length; r += 2) e.push(parseInt(t.substr(r, 2), 16));
              return e;
            },
            bytesToBase64: function (e) {
              if ('function' == typeof btoa) return btoa(s.bytesToString(e));
              for (var r = [], i = 0; i < e.length; i += 3)
                for (var n = (e[i] << 16) | (e[i + 1] << 8) | e[i + 2], o = 0; o < 4; o++)
                  8 * i + 6 * o <= 8 * e.length
                    ? r.push(t.charAt((n >>> (6 * (3 - o))) & 63))
                    : r.push('=');
              return r.join('');
            },
            base64ToBytes: function (e) {
              if ('function' == typeof atob) return s.stringToBytes(atob(e));
              e = e.replace(/[^A-Z0-9+\/]/gi, '');
              for (var r = [], i = 0, n = 0; i < e.length; n = ++i % 4)
                0 != n &&
                  r.push(
                    ((t.indexOf(e.charAt(i - 1)) & (Math.pow(2, -2 * n + 8) - 1)) << (2 * n)) |
                      (t.indexOf(e.charAt(i)) >>> (6 - 2 * n))
                  );
              return r;
            },
          });
        e.mode = {};
        var i = (e.charenc = {}),
          s =
            ((i.UTF8 = {
              stringToBytes: function (t) {
                t = unescape(encodeURIComponent(t));
                for (var e = [], r = 0; r < t.length; r++) e.push(t.charCodeAt(r));
                return e;
              },
              bytesToString: function (t) {
                return decodeURIComponent(escape(s.bytesToString(t)));
              },
            }),
            (i.Binary = {
              stringToBytes: function (t) {
                for (var e = [], r = 0; r < t.length; r++) e.push(t.charCodeAt(r));
                return e;
              },
              bytesToString: function (t) {
                for (var e = [], r = 0; r < t.length; r++) e.push(String.fromCharCode(t[r]));
                return e.join('');
              },
            }));
      })(),
        (function () {
          var t = n,
            e = t.util,
            r = t.charenc,
            i = r.UTF8,
            s = r.Binary,
            o = [
              1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748,
              2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206,
              2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
              1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
              3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372,
              1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
              3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734,
              506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
              1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
              3329325298,
            ],
            u = (t.SHA256 = function (t, r) {
              var i = e.wordsToBytes(u._sha256(t));
              return r && r.asBytes ? i : r && r.asString ? s.bytesToString(i) : e.bytesToHex(i);
            });
          (u._sha256 = function (t) {
            t.constructor == String && (t = i.stringToBytes(t));
            var r,
              n,
              s,
              u,
              h,
              a,
              f,
              c,
              p,
              l = e.bytesToWords(t),
              F = 8 * t.length,
              y = [
                1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635,
                1541459225,
              ],
              d = [];
            (l[F >> 5] |= 128 << (24 - (F % 32))), (l[15 + (((F + 64) >> 9) << 4)] = F);
            for (var g = 0; g < l.length; g += 16) {
              (r = y[0]),
                (n = y[1]),
                (s = y[2]),
                (u = y[3]),
                (h = y[4]),
                (a = y[5]),
                (f = y[6]),
                (c = y[7]);
              for (var v = 0; v < 64; v++) {
                if (v < 16) d[v] = l[v + g];
                else {
                  var m = d[v - 15],
                    B = d[v - 2],
                    b = ((m << 25) | (m >>> 7)) ^ ((m << 14) | (m >>> 18)) ^ (m >>> 3),
                    T = ((B << 15) | (B >>> 17)) ^ ((B << 13) | (B >>> 19)) ^ (B >>> 10);
                  d[v] = b + (d[v - 7] >>> 0) + T + (d[v - 16] >>> 0);
                }
                var O = (r & n) ^ (r & s) ^ (n & s),
                  A = ((r << 30) | (r >>> 2)) ^ ((r << 19) | (r >>> 13)) ^ ((r << 10) | (r >>> 22));
                (p =
                  (c >>> 0) +
                  (((h << 26) | (h >>> 6)) ^ ((h << 21) | (h >>> 11)) ^ ((h << 7) | (h >>> 25))) +
                  ((h & a) ^ (~h & f)) +
                  o[v] +
                  (d[v] >>> 0)),
                  (c = f),
                  (f = a),
                  (a = h),
                  (h = u + p),
                  (u = s),
                  (s = n),
                  (n = r),
                  (r = p + (A + O));
              }
              (y[0] += r),
                (y[1] += n),
                (y[2] += s),
                (y[3] += u),
                (y[4] += h),
                (y[5] += a),
                (y[6] += f),
                (y[7] += c);
            }
            return y;
          }),
            (u._blocksize = 16);
        })(),
        (function () {
          function t(t, e, r, i) {
            return 0 <= t && t <= 15
              ? e ^ r ^ i
              : 16 <= t && t <= 31
              ? (e & r) | (~e & i)
              : 32 <= t && t <= 47
              ? (e | ~r) ^ i
              : 48 <= t && t <= 63
              ? (e & i) | (r & ~i)
              : 64 <= t && t <= 79
              ? e ^ (r | ~i)
              : 'rmd160_f: j out of range';
          }
          function e(t) {
            return 0 <= t && t <= 15
              ? 0
              : 16 <= t && t <= 31
              ? 1518500249
              : 32 <= t && t <= 47
              ? 1859775393
              : 48 <= t && t <= 63
              ? 2400959708
              : 64 <= t && t <= 79
              ? 2840853838
              : 'rmd160_K1: j out of range';
          }
          function r(t) {
            return 0 <= t && t <= 15
              ? 1352829926
              : 16 <= t && t <= 31
              ? 1548603684
              : 32 <= t && t <= 47
              ? 1836072691
              : 48 <= t && t <= 63
              ? 2053994217
              : 64 <= t && t <= 79
              ? 0
              : 'rmd160_K2: j out of range';
          }
          function i(t, e) {
            var r = (65535 & t) + (65535 & e);
            return (((t >> 16) + (e >> 16) + (r >> 16)) << 16) | (65535 & r);
          }
          function s(t, e) {
            return (t << e) | (t >>> (32 - e));
          }
          var o = n,
            u = o.util,
            h = o.charenc,
            a = h.UTF8,
            f = h.Binary;
          (u.bytesToLWords = function (t) {
            for (var e = Array(t.length >> 2), r = 0; r < e.length; r++) e[r] = 0;
            for (r = 0; r < 8 * t.length; r += 8) e[r >> 5] |= (255 & t[r / 8]) << r % 32;
            return e;
          }),
            (u.lWordsToBytes = function (t) {
              for (var e = [], r = 0; r < 32 * t.length; r += 8)
                e.push((t[r >> 5] >>> r % 32) & 255);
              return e;
            });
          var c = (o.RIPEMD160 = function (t, e) {
            var r = u.lWordsToBytes(c._rmd160(t));
            return e && e.asBytes ? r : e && e.asString ? f.bytesToString(r) : u.bytesToHex(r);
          });
          c._rmd160 = function (n) {
            n.constructor == String && (n = a.stringToBytes(n));
            var o = u.bytesToLWords(n),
              h = 8 * n.length;
            (o[h >> 5] |= 128 << h % 32), (o[14 + (((h + 64) >>> 9) << 4)] = h);
            for (
              var f = 1732584193,
                c = 4023233417,
                d = 2562383102,
                g = 271733878,
                v = 3285377520,
                m = 0;
              m < o.length;
              m += 16
            ) {
              for (
                var B, b = f, T = c, O = d, A = g, E = v, w = f, P = c, I = d, D = g, S = v, _ = 0;
                _ <= 79;
                ++_
              )
                (B = i(b, t(_, T, O, A))),
                  (B = i(B, o[m + p[_]])),
                  (B = i(B, e(_))),
                  (B = i(s(B, F[_]), E)),
                  (b = E),
                  (E = A),
                  (A = s(O, 10)),
                  (O = T),
                  (T = B),
                  (B = i(w, t(79 - _, P, I, D))),
                  (B = i(B, o[m + l[_]])),
                  (B = i(B, r(_))),
                  (B = i(s(B, y[_]), S)),
                  (w = S),
                  (S = D),
                  (D = s(I, 10)),
                  (I = P),
                  (P = B);
              (B = i(c, i(O, D))),
                (c = i(d, i(A, S))),
                (d = i(g, i(E, w))),
                (g = i(v, i(b, P))),
                (v = i(f, i(T, I))),
                (f = B);
            }
            return [f, c, d, g, v];
          };
          var p = [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12,
              0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11,
              10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11,
              6, 15, 13,
            ],
            l = [
              5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14,
              15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4,
              1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14,
              0, 3, 9, 11,
            ],
            F = [
              11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7,
              12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11,
              12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12,
              13, 14, 11, 8, 5, 6,
            ],
            y = [
              8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7,
              7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15,
              5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13,
              6, 5, 15, 13, 11, 11,
            ];
        })(),
        (o.prototype.init = function (t) {
          var e, r, i;
          for (e = 0; e < 256; ++e) this.S[e] = e;
          for (r = 0, e = 0; e < 256; ++e)
            (r = (r + this.S[e] + t[e % t.length]) & 255),
              (i = this.S[e]),
              (this.S[e] = this.S[r]),
              (this.S[r] = i);
          (this.i = 0), (this.j = 0);
        }),
        (o.prototype.next = function () {
          var t;
          return (
            (this.i = (this.i + 1) & 255),
            (this.j = (this.j + this.S[this.i]) & 255),
            (t = this.S[this.i]),
            (this.S[this.i] = this.S[this.j]),
            (this.S[this.j] = t),
            this.S[(t + this.S[this.i]) & 255]
          );
        });
      var u,
        h,
        a,
        f,
        c = 256;
      function p() {
        var t;
        (t = new Date().getTime()),
          (h[a++] ^= 255 & t),
          (h[a++] ^= (t >> 8) & 255),
          (h[a++] ^= (t >> 16) & 255),
          (h[a++] ^= (t >> 24) & 255),
          a >= c && (a -= c);
      }
      function l() {
        if (null == u) {
          for (p(), (u = new o()).init(h), a = 0; a < h.length; ++a) h[a] = 0;
          a = 0;
        }
        return u.next();
      }
      function F() {}
      if (null == h) {
        var y;
        for (h = [], a = 0; a < c; )
          (y = Math.floor(65536 * Math.random())), (h[a++] = y >>> 8), (h[a++] = 255 & y);
        (a = 0), p();
      }
      function d(t, e, r) {
        null != t &&
          ('number' == typeof t
            ? this.fromNumber(t, e, r)
            : null == e && 'string' != typeof t
            ? this.fromString(t, 256)
            : this.fromString(t, e));
      }
      function g() {
        return new d(null);
      }
      function v(t) {
        return w.charAt(t);
      }
      function m(t, e) {
        var r = P[t.charCodeAt(e)];
        return null == r ? -1 : r;
      }
      function B(t) {
        var e = g();
        return e.fromInt(t), e;
      }
      function b(t) {
        var e,
          r = 1;
        return (
          0 != (e = t >>> 16) && ((t = e), (r += 16)),
          0 != (e = t >> 8) && ((t = e), (r += 8)),
          0 != (e = t >> 4) && ((t = e), (r += 4)),
          0 != (e = t >> 2) && ((t = e), (r += 2)),
          0 != (e = t >> 1) && ((t = e), (r += 1)),
          r
        );
      }
      function T(t) {
        this.m = t;
      }
      function O(t) {
        (this.m = t),
          (this.mp = t.invDigit()),
          (this.mpl = 32767 & this.mp),
          (this.mph = this.mp >> 15),
          (this.um = (1 << (t.DB - 15)) - 1),
          (this.mt2 = 2 * t.t);
      }
      (F.prototype.nextBytes = function (t) {
        var e;
        for (e = 0; e < t.length; ++e) t[e] = l();
      }),
        'Microsoft Internet Explorer' == navigator.appName
          ? ((d.prototype.am = function (t, e, r, i, n, s) {
              for (var o = 32767 & e, u = e >> 15; --s >= 0; ) {
                var h = 32767 & this[t],
                  a = this[t++] >> 15,
                  f = u * h + a * o;
                (n =
                  ((h = o * h + ((32767 & f) << 15) + r[i] + (1073741823 & n)) >>> 30) +
                  (f >>> 15) +
                  u * a +
                  (n >>> 30)),
                  (r[i++] = 1073741823 & h);
              }
              return n;
            }),
            (f = 30))
          : 'Netscape' != navigator.appName
          ? ((d.prototype.am = function (t, e, r, i, n, s) {
              for (; --s >= 0; ) {
                var o = e * this[t++] + r[i] + n;
                (n = Math.floor(o / 67108864)), (r[i++] = 67108863 & o);
              }
              return n;
            }),
            (f = 26))
          : ((d.prototype.am = function (t, e, r, i, n, s) {
              for (var o = 16383 & e, u = e >> 14; --s >= 0; ) {
                var h = 16383 & this[t],
                  a = this[t++] >> 14,
                  f = u * h + a * o;
                (n = ((h = o * h + ((16383 & f) << 14) + r[i] + n) >> 28) + (f >> 14) + u * a),
                  (r[i++] = 268435455 & h);
              }
              return n;
            }),
            (f = 28)),
        (d.prototype.DB = f),
        (d.prototype.DM = (1 << f) - 1),
        (d.prototype.DV = 1 << f),
        (d.prototype.FV = Math.pow(2, 52)),
        (d.prototype.F1 = 52 - f),
        (d.prototype.F2 = 2 * f - 52);
      var A,
        E,
        w = '0123456789abcdefghijklmnopqrstuvwxyz',
        P = [];
      for (A = '0'.charCodeAt(0), E = 0; E <= 9; ++E) P[A++] = E;
      for (A = 'a'.charCodeAt(0), E = 10; E < 36; ++E) P[A++] = E;
      for (A = 'A'.charCodeAt(0), E = 10; E < 36; ++E) P[A++] = E;
      function I(t, e) {
        return t & e;
      }
      function D(t, e) {
        return t | e;
      }
      function S(t, e) {
        return t ^ e;
      }
      function _(t, e) {
        return t & ~e;
      }
      function U(t) {
        if (0 == t) return -1;
        var e = 0;
        return (
          !(65535 & t) && ((t >>= 16), (e += 16)),
          !(255 & t) && ((t >>= 8), (e += 8)),
          !(15 & t) && ((t >>= 4), (e += 4)),
          !(3 & t) && ((t >>= 2), (e += 2)),
          !(1 & t) && ++e,
          e
        );
      }
      function C(t) {
        for (var e = 0; 0 != t; ) (t &= t - 1), ++e;
        return e;
      }
      function x() {}
      function H(t) {
        return t;
      }
      function R(t) {
        (this.r2 = g()),
          (this.q3 = g()),
          d.ONE.dlShiftTo(2 * t.t, this.r2),
          (this.mu = this.r2.divide(t)),
          (this.m = t);
      }
      (T.prototype.convert = function (t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
      }),
        (T.prototype.revert = function (t) {
          return t;
        }),
        (T.prototype.reduce = function (t) {
          t.divRemTo(this.m, null, t);
        }),
        (T.prototype.mulTo = function (t, e, r) {
          t.multiplyTo(e, r), this.reduce(r);
        }),
        (T.prototype.sqrTo = function (t, e) {
          t.squareTo(e), this.reduce(e);
        }),
        (O.prototype.convert = function (t) {
          var e = g();
          return (
            t.abs().dlShiftTo(this.m.t, e),
            e.divRemTo(this.m, null, e),
            t.s < 0 && e.compareTo(d.ZERO) > 0 && this.m.subTo(e, e),
            e
          );
        }),
        (O.prototype.revert = function (t) {
          var e = g();
          return t.copyTo(e), this.reduce(e), e;
        }),
        (O.prototype.reduce = function (t) {
          for (; t.t <= this.mt2; ) t[t.t++] = 0;
          for (var e = 0; e < this.m.t; ++e) {
            var r = 32767 & t[e],
              i =
                (r * this.mpl + (((r * this.mph + (t[e] >> 15) * this.mpl) & this.um) << 15)) &
                t.DM;
            for (t[(r = e + this.m.t)] += this.m.am(0, i, t, e, 0, this.m.t); t[r] >= t.DV; )
              (t[r] -= t.DV), t[++r]++;
          }
          t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
        }),
        (O.prototype.mulTo = function (t, e, r) {
          t.multiplyTo(e, r), this.reduce(r);
        }),
        (O.prototype.sqrTo = function (t, e) {
          t.squareTo(e), this.reduce(e);
        }),
        (d.prototype.copyTo = function (t) {
          for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
          (t.t = this.t), (t.s = this.s);
        }),
        (d.prototype.fromInt = function (t) {
          (this.t = 1),
            (this.s = t < 0 ? -1 : 0),
            t > 0 ? (this[0] = t) : t < -1 ? (this[0] = t + DV) : (this.t = 0);
        }),
        (d.prototype.fromString = function (t, e) {
          var r;
          if (16 == e) r = 4;
          else if (8 == e) r = 3;
          else if (256 == e) r = 8;
          else if (2 == e) r = 1;
          else if (32 == e) r = 5;
          else {
            if (4 != e) return void this.fromRadix(t, e);
            r = 2;
          }
          (this.t = 0), (this.s = 0);
          for (var i = t.length, n = !1, s = 0; --i >= 0; ) {
            var o = 8 == r ? 255 & t[i] : m(t, i);
            o < 0
              ? '-' == t.charAt(i) && (n = !0)
              : ((n = !1),
                0 == s
                  ? (this[this.t++] = o)
                  : s + r > this.DB
                  ? ((this[this.t - 1] |= (o & ((1 << (this.DB - s)) - 1)) << s),
                    (this[this.t++] = o >> (this.DB - s)))
                  : (this[this.t - 1] |= o << s),
                (s += r) >= this.DB && (s -= this.DB));
          }
          8 == r &&
            !!(128 & t[0]) &&
            ((this.s = -1), s > 0 && (this[this.t - 1] |= ((1 << (this.DB - s)) - 1) << s)),
            this.clamp(),
            n && d.ZERO.subTo(this, this);
        }),
        (d.prototype.clamp = function () {
          for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t;
        }),
        (d.prototype.dlShiftTo = function (t, e) {
          var r;
          for (r = this.t - 1; r >= 0; --r) e[r + t] = this[r];
          for (r = t - 1; r >= 0; --r) e[r] = 0;
          (e.t = this.t + t), (e.s = this.s);
        }),
        (d.prototype.drShiftTo = function (t, e) {
          for (var r = t; r < this.t; ++r) e[r - t] = this[r];
          (e.t = Math.max(this.t - t, 0)), (e.s = this.s);
        }),
        (d.prototype.lShiftTo = function (t, e) {
          var r,
            i = t % this.DB,
            n = this.DB - i,
            s = (1 << n) - 1,
            o = Math.floor(t / this.DB),
            u = (this.s << i) & this.DM;
          for (r = this.t - 1; r >= 0; --r)
            (e[r + o + 1] = (this[r] >> n) | u), (u = (this[r] & s) << i);
          for (r = o - 1; r >= 0; --r) e[r] = 0;
          (e[o] = u), (e.t = this.t + o + 1), (e.s = this.s), e.clamp();
        }),
        (d.prototype.rShiftTo = function (t, e) {
          e.s = this.s;
          var r = Math.floor(t / this.DB);
          if (r >= this.t) e.t = 0;
          else {
            var i = t % this.DB,
              n = this.DB - i,
              s = (1 << i) - 1;
            e[0] = this[r] >> i;
            for (var o = r + 1; o < this.t; ++o)
              (e[o - r - 1] |= (this[o] & s) << n), (e[o - r] = this[o] >> i);
            i > 0 && (e[this.t - r - 1] |= (this.s & s) << n), (e.t = this.t - r), e.clamp();
          }
        }),
        (d.prototype.subTo = function (t, e) {
          for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n; )
            (i += this[r] - t[r]), (e[r++] = i & this.DM), (i >>= this.DB);
          if (t.t < this.t) {
            for (i -= t.s; r < this.t; ) (i += this[r]), (e[r++] = i & this.DM), (i >>= this.DB);
            i += this.s;
          } else {
            for (i += this.s; r < t.t; ) (i -= t[r]), (e[r++] = i & this.DM), (i >>= this.DB);
            i -= t.s;
          }
          (e.s = i < 0 ? -1 : 0),
            i < -1 ? (e[r++] = this.DV + i) : i > 0 && (e[r++] = i),
            (e.t = r),
            e.clamp();
        }),
        (d.prototype.multiplyTo = function (t, e) {
          var r = this.abs(),
            i = t.abs(),
            n = r.t;
          for (e.t = n + i.t; --n >= 0; ) e[n] = 0;
          for (n = 0; n < i.t; ++n) e[n + r.t] = r.am(0, i[n], e, n, 0, r.t);
          (e.s = 0), e.clamp(), this.s != t.s && d.ZERO.subTo(e, e);
        }),
        (d.prototype.squareTo = function (t) {
          for (var e = this.abs(), r = (t.t = 2 * e.t); --r >= 0; ) t[r] = 0;
          for (r = 0; r < e.t - 1; ++r) {
            var i = e.am(r, e[r], t, 2 * r, 0, 1);
            (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, i, e.t - r - 1)) >= e.DV &&
              ((t[r + e.t] -= e.DV), (t[r + e.t + 1] = 1));
          }
          t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), (t.s = 0), t.clamp();
        }),
        (d.prototype.divRemTo = function (t, e, r) {
          var i = t.abs();
          if (!(i.t <= 0)) {
            var n = this.abs();
            if (n.t < i.t) return null != e && e.fromInt(0), void (null != r && this.copyTo(r));
            null == r && (r = g());
            var s = g(),
              o = this.s,
              u = t.s,
              h = this.DB - b(i[i.t - 1]);
            h > 0 ? (i.lShiftTo(h, s), n.lShiftTo(h, r)) : (i.copyTo(s), n.copyTo(r));
            var a = s.t,
              f = s[a - 1];
            if (0 != f) {
              var c = f * (1 << this.F1) + (a > 1 ? s[a - 2] >> this.F2 : 0),
                p = this.FV / c,
                l = (1 << this.F1) / c,
                F = 1 << this.F2,
                y = r.t,
                v = y - a,
                m = null == e ? g() : e;
              for (
                s.dlShiftTo(v, m),
                  r.compareTo(m) >= 0 && ((r[r.t++] = 1), r.subTo(m, r)),
                  d.ONE.dlShiftTo(a, m),
                  m.subTo(s, s);
                s.t < a;

              )
                s[s.t++] = 0;
              for (; --v >= 0; ) {
                var B = r[--y] == f ? this.DM : Math.floor(r[y] * p + (r[y - 1] + F) * l);
                if ((r[y] += s.am(0, B, r, v, 0, a)) < B)
                  for (s.dlShiftTo(v, m), r.subTo(m, r); r[y] < --B; ) r.subTo(m, r);
              }
              null != e && (r.drShiftTo(a, e), o != u && d.ZERO.subTo(e, e)),
                (r.t = a),
                r.clamp(),
                h > 0 && r.rShiftTo(h, r),
                o < 0 && d.ZERO.subTo(r, r);
            }
          }
        }),
        (d.prototype.invDigit = function () {
          if (this.t < 1) return 0;
          var t = this[0];
          if (!(1 & t)) return 0;
          var e = 3 & t;
          return (e =
            ((e =
              ((e = ((e = (e * (2 - (15 & t) * e)) & 15) * (2 - (255 & t) * e)) & 255) *
                (2 - (((65535 & t) * e) & 65535))) &
              65535) *
              (2 - ((t * e) % this.DV))) %
            this.DV) > 0
            ? this.DV - e
            : -e;
        }),
        (d.prototype.isEven = function () {
          return 0 == (this.t > 0 ? 1 & this[0] : this.s);
        }),
        (d.prototype.exp = function (t, e) {
          if (t > 4294967295 || t < 1) return d.ONE;
          var r = g(),
            i = g(),
            n = e.convert(this),
            s = b(t) - 1;
          for (n.copyTo(r); --s >= 0; )
            if ((e.sqrTo(r, i), (t & (1 << s)) > 0)) e.mulTo(i, n, r);
            else {
              var o = r;
              (r = i), (i = o);
            }
          return e.revert(r);
        }),
        (d.prototype.toString = function (t) {
          if (this.s < 0) return '-' + this.negate().toString(t);
          var e;
          if (16 == t) e = 4;
          else if (8 == t) e = 3;
          else if (2 == t) e = 1;
          else if (32 == t) e = 5;
          else {
            if (4 != t) return this.toRadix(t);
            e = 2;
          }
          var r,
            i = (1 << e) - 1,
            n = !1,
            s = '',
            o = this.t,
            u = this.DB - ((o * this.DB) % e);
          if (o-- > 0)
            for (u < this.DB && (r = this[o] >> u) > 0 && ((n = !0), (s = v(r))); o >= 0; )
              u < e
                ? ((r = (this[o] & ((1 << u) - 1)) << (e - u)),
                  (r |= this[--o] >> (u += this.DB - e)))
                : ((r = (this[o] >> (u -= e)) & i), u <= 0 && ((u += this.DB), --o)),
                r > 0 && (n = !0),
                n && (s += v(r));
          return n ? s : '0';
        }),
        (d.prototype.negate = function () {
          var t = g();
          return d.ZERO.subTo(this, t), t;
        }),
        (d.prototype.abs = function () {
          return this.s < 0 ? this.negate() : this;
        }),
        (d.prototype.compareTo = function (t) {
          var e = this.s - t.s;
          if (0 != e) return e;
          var r = this.t;
          if (0 != (e = r - t.t)) return this.s < 0 ? -e : e;
          for (; --r >= 0; ) if (0 != (e = this[r] - t[r])) return e;
          return 0;
        }),
        (d.prototype.bitLength = function () {
          return this.t <= 0
            ? 0
            : this.DB * (this.t - 1) + b(this[this.t - 1] ^ (this.s & this.DM));
        }),
        (d.prototype.mod = function (t) {
          var e = g();
          return (
            this.abs().divRemTo(t, null, e),
            this.s < 0 && e.compareTo(d.ZERO) > 0 && t.subTo(e, e),
            e
          );
        }),
        (d.prototype.modPowInt = function (t, e) {
          var r;
          return (r = t < 256 || e.isEven() ? new T(e) : new O(e)), this.exp(t, r);
        }),
        (d.ZERO = B(0)),
        (d.ONE = B(1)),
        (x.prototype.convert = H),
        (x.prototype.revert = H),
        (x.prototype.mulTo = function (t, e, r) {
          t.multiplyTo(e, r);
        }),
        (x.prototype.sqrTo = function (t, e) {
          t.squareTo(e);
        }),
        (R.prototype.convert = function (t) {
          if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
          if (t.compareTo(this.m) < 0) return t;
          var e = g();
          return t.copyTo(e), this.reduce(e), e;
        }),
        (R.prototype.revert = function (t) {
          return t;
        }),
        (R.prototype.reduce = function (t) {
          for (
            t.drShiftTo(this.m.t - 1, this.r2),
              t.t > this.m.t + 1 && ((t.t = this.m.t + 1), t.clamp()),
              this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
              this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
            t.compareTo(this.r2) < 0;

          )
            t.dAddOffset(1, this.m.t + 1);
          for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; ) t.subTo(this.m, t);
        }),
        (R.prototype.mulTo = function (t, e, r) {
          t.multiplyTo(e, r), this.reduce(r);
        }),
        (R.prototype.sqrTo = function (t, e) {
          t.squareTo(e), this.reduce(e);
        });
      var q = [
          2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,
          89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179,
          181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277,
          281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389,
          397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
          503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617,
          619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739,
          743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859,
          863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991,
          997,
        ],
        N = (1 << 26) / q[q.length - 1];
      function L(t, e) {
        (this.x = e), (this.q = t);
      }
      function M(t, e, r, i) {
        (this.curve = t),
          (this.x = e),
          (this.y = r),
          (this.z = null == i ? d.ONE : i),
          (this.zinv = null);
      }
      function k(t, e, r) {
        (this.q = t),
          (this.a = this.fromBigInteger(e)),
          (this.b = this.fromBigInteger(r)),
          (this.infinity = new M(this, null, null));
      }
      function K(t, e, r, i) {
        (this.curve = t), (this.g = e), (this.n = r), (this.h = i);
      }
      function V(t) {
        return new d(t, 16);
      }
      function z(t) {
        return 'secp128r1' == t
          ? (function () {
              var t = V('FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF'),
                e = V('FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC'),
                r = V('E87579C11079F43DD824993C2CEE5ED3'),
                i = V('FFFFFFFE0000000075A30D1B9038A115'),
                n = d.ONE,
                s = new k(t, e, r),
                o = s.decodePointHex(
                  '04161FF7528B899B2D0C28607CA52C5B86CF5AC8395BAFEB13C02DA292DDED7A83'
                );
              return new K(s, o, i, n);
            })()
          : 'secp160k1' == t
          ? (function () {
              var t = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73'),
                e = d.ZERO,
                r = V('7'),
                i = V('0100000000000000000001B8FA16DFAB9ACA16B6B3'),
                n = d.ONE,
                s = new k(t, e, r),
                o = s.decodePointHex(
                  '043B4C382CE37AA192A4019E763036F4F5DD4D7EBB938CF935318FDCED6BC28286531733C3F03C4FEE'
                );
              return new K(s, o, i, n);
            })()
          : 'secp160r1' == t
          ? (function () {
              var t = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF'),
                e = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC'),
                r = V('1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45'),
                i = V('0100000000000000000001F4C8F927AED3CA752257'),
                n = d.ONE,
                s = new k(t, e, r),
                o = s.decodePointHex(
                  '044A96B5688EF573284664698968C38BB913CBFC8223A628553168947D59DCC912042351377AC5FB32'
                );
              return new K(s, o, i, n);
            })()
          : 'secp192k1' == t
          ? (function () {
              var t = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37'),
                e = d.ZERO,
                r = V('3'),
                i = V('FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D'),
                n = d.ONE,
                s = new k(t, e, r),
                o = s.decodePointHex(
                  '04DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D'
                );
              return new K(s, o, i, n);
            })()
          : 'secp192r1' == t
          ? (function () {
              var t = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF'),
                e = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC'),
                r = V('64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1'),
                i = V('FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831'),
                n = d.ONE,
                s = new k(t, e, r),
                o = s.decodePointHex(
                  '04188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF101207192B95FFC8DA78631011ED6B24CDD573F977A11E794811'
                );
              return new K(s, o, i, n);
            })()
          : 'secp224r1' == t
          ? (function () {
              var t = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001'),
                e = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE'),
                r = V('B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4'),
                i = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D'),
                n = d.ONE,
                s = new k(t, e, r),
                o = s.decodePointHex(
                  '04B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34'
                );
              return new K(s, o, i, n);
            })()
          : 'secp256k1' == t
          ? (function () {
              var t = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F'),
                e = d.ZERO,
                r = V('7'),
                i = V('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141'),
                n = d.ONE,
                s = new k(t, e, r),
                o = s.decodePointHex(
                  '0479BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8'
                );
              return new K(s, o, i, n);
            })()
          : 'secp256r1' == t
          ? (function () {
              var t = V('FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF'),
                e = V('FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC'),
                r = V('5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B'),
                i = V('FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551'),
                n = d.ONE,
                s = new k(t, e, r),
                o = s.decodePointHex(
                  '046B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C2964FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5'
                );
              return new K(s, o, i, n);
            })()
          : null;
      }
      (d.prototype.chunkSize = function (t) {
        return Math.floor((Math.LN2 * this.DB) / Math.log(t));
      }),
        (d.prototype.toRadix = function (t) {
          if ((null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36)) return '0';
          var e = this.chunkSize(t),
            r = Math.pow(t, e),
            i = B(r),
            n = g(),
            s = g(),
            o = '';
          for (this.divRemTo(i, n, s); n.signum() > 0; )
            (o = (r + s.intValue()).toString(t).substr(1) + o), n.divRemTo(i, n, s);
          return s.intValue().toString(t) + o;
        }),
        (d.prototype.fromRadix = function (t, e) {
          this.fromInt(0), null == e && (e = 10);
          for (
            var r = this.chunkSize(e), i = Math.pow(e, r), n = !1, s = 0, o = 0, u = 0;
            u < t.length;
            ++u
          ) {
            var h = m(t, u);
            h < 0
              ? '-' == t.charAt(u) && 0 == this.signum() && (n = !0)
              : ((o = e * o + h),
                ++s >= r && (this.dMultiply(i), this.dAddOffset(o, 0), (s = 0), (o = 0)));
          }
          s > 0 && (this.dMultiply(Math.pow(e, s)), this.dAddOffset(o, 0)),
            n && d.ZERO.subTo(this, this);
        }),
        (d.prototype.fromNumber = function (t, e, r) {
          if ('number' == typeof e)
            if (t < 2) this.fromInt(1);
            else
              for (
                this.fromNumber(t, r),
                  this.testBit(t - 1) || this.bitwiseTo(d.ONE.shiftLeft(t - 1), D, this),
                  this.isEven() && this.dAddOffset(1, 0);
                !this.isProbablePrime(e);

              )
                this.dAddOffset(2, 0),
                  this.bitLength() > t && this.subTo(d.ONE.shiftLeft(t - 1), this);
          else {
            var i = [],
              n = 7 & t;
            (i.length = 1 + (t >> 3)),
              e.nextBytes(i),
              n > 0 ? (i[0] &= (1 << n) - 1) : (i[0] = 0),
              this.fromString(i, 256);
          }
        }),
        (d.prototype.bitwiseTo = function (t, e, r) {
          var i,
            n,
            s = Math.min(t.t, this.t);
          for (i = 0; i < s; ++i) r[i] = e(this[i], t[i]);
          if (t.t < this.t) {
            for (n = t.s & this.DM, i = s; i < this.t; ++i) r[i] = e(this[i], n);
            r.t = this.t;
          } else {
            for (n = this.s & this.DM, i = s; i < t.t; ++i) r[i] = e(n, t[i]);
            r.t = t.t;
          }
          (r.s = e(this.s, t.s)), r.clamp();
        }),
        (d.prototype.changeBit = function (t, e) {
          var r = d.ONE.shiftLeft(t);
          return this.bitwiseTo(r, e, r), r;
        }),
        (d.prototype.addTo = function (t, e) {
          for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n; )
            (i += this[r] + t[r]), (e[r++] = i & this.DM), (i >>= this.DB);
          if (t.t < this.t) {
            for (i += t.s; r < this.t; ) (i += this[r]), (e[r++] = i & this.DM), (i >>= this.DB);
            i += this.s;
          } else {
            for (i += this.s; r < t.t; ) (i += t[r]), (e[r++] = i & this.DM), (i >>= this.DB);
            i += t.s;
          }
          (e.s = i < 0 ? -1 : 0),
            i > 0 ? (e[r++] = i) : i < -1 && (e[r++] = this.DV + i),
            (e.t = r),
            e.clamp();
        }),
        (d.prototype.dMultiply = function (t) {
          (this[this.t] = this.am(0, t - 1, this, 0, 0, this.t)), ++this.t, this.clamp();
        }),
        (d.prototype.dAddOffset = function (t, e) {
          if (0 != t) {
            for (; this.t <= e; ) this[this.t++] = 0;
            for (this[e] += t; this[e] >= this.DV; )
              (this[e] -= this.DV), ++e >= this.t && (this[this.t++] = 0), ++this[e];
          }
        }),
        (d.prototype.multiplyLowerTo = function (t, e, r) {
          var i,
            n = Math.min(this.t + t.t, e);
          for (r.s = 0, r.t = n; n > 0; ) r[--n] = 0;
          for (i = r.t - this.t; n < i; ++n) r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
          for (i = Math.min(t.t, e); n < i; ++n) this.am(0, t[n], r, n, 0, e - n);
          r.clamp();
        }),
        (d.prototype.multiplyUpperTo = function (t, e, r) {
          --e;
          var i = (r.t = this.t + t.t - e);
          for (r.s = 0; --i >= 0; ) r[i] = 0;
          for (i = Math.max(e - this.t, 0); i < t.t; ++i)
            r[this.t + i - e] = this.am(e - i, t[i], r, 0, 0, this.t + i - e);
          r.clamp(), r.drShiftTo(1, r);
        }),
        (d.prototype.modInt = function (t) {
          if (t <= 0) return 0;
          var e = this.DV % t,
            r = this.s < 0 ? t - 1 : 0;
          if (this.t > 0)
            if (0 == e) r = this[0] % t;
            else for (var i = this.t - 1; i >= 0; --i) r = (e * r + this[i]) % t;
          return r;
        }),
        (d.prototype.millerRabin = function (t) {
          var e = this.subtract(d.ONE),
            r = e.getLowestSetBit();
          if (r <= 0) return !1;
          var i = e.shiftRight(r);
          (t = (t + 1) >> 1) > q.length && (t = q.length);
          for (var n = g(), s = 0; s < t; ++s) {
            n.fromInt(q[Math.floor(Math.random() * q.length)]);
            var o = n.modPow(i, this);
            if (0 != o.compareTo(d.ONE) && 0 != o.compareTo(e)) {
              for (var u = 1; u++ < r && 0 != o.compareTo(e); )
                if (0 == (o = o.modPowInt(2, this)).compareTo(d.ONE)) return !1;
              if (0 != o.compareTo(e)) return !1;
            }
          }
          return !0;
        }),
        (d.prototype.clone = function () {
          var t = g();
          return this.copyTo(t), t;
        }),
        (d.prototype.intValue = function () {
          if (this.s < 0) {
            if (1 == this.t) return this[0] - this.DV;
            if (0 == this.t) return -1;
          } else {
            if (1 == this.t) return this[0];
            if (0 == this.t) return 0;
          }
          return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
        }),
        (d.prototype.byteValue = function () {
          return 0 == this.t ? this.s : (this[0] << 24) >> 24;
        }),
        (d.prototype.shortValue = function () {
          return 0 == this.t ? this.s : (this[0] << 16) >> 16;
        }),
        (d.prototype.signum = function () {
          return this.s < 0 ? -1 : this.t <= 0 || (1 == this.t && this[0] <= 0) ? 0 : 1;
        }),
        (d.prototype.toByteArray = function () {
          var t = this.t,
            e = [];
          e[0] = this.s;
          var r,
            i = this.DB - ((t * this.DB) % 8),
            n = 0;
          if (t-- > 0)
            for (
              i < this.DB &&
              (r = this[t] >> i) != (this.s & this.DM) >> i &&
              (e[n++] = r | (this.s << (this.DB - i)));
              t >= 0;

            )
              i < 8
                ? ((r = (this[t] & ((1 << i) - 1)) << (8 - i)),
                  (r |= this[--t] >> (i += this.DB - 8)))
                : ((r = (this[t] >> (i -= 8)) & 255), i <= 0 && ((i += this.DB), --t)),
                !!(128 & r) && (r |= -256),
                0 == n && (128 & this.s) != (128 & r) && ++n,
                (n > 0 || r != this.s) && (e[n++] = r);
          return e;
        }),
        (d.prototype.equals = function (t) {
          return 0 == this.compareTo(t);
        }),
        (d.prototype.min = function (t) {
          return this.compareTo(t) < 0 ? this : t;
        }),
        (d.prototype.max = function (t) {
          return this.compareTo(t) > 0 ? this : t;
        }),
        (d.prototype.and = function (t) {
          var e = g();
          return this.bitwiseTo(t, I, e), e;
        }),
        (d.prototype.or = function (t) {
          var e = g();
          return this.bitwiseTo(t, D, e), e;
        }),
        (d.prototype.xor = function (t) {
          var e = g();
          return this.bitwiseTo(t, S, e), e;
        }),
        (d.prototype.andNot = function (t) {
          var e = g();
          return this.bitwiseTo(t, _, e), e;
        }),
        (d.prototype.not = function () {
          for (var t = g(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
          return (t.t = this.t), (t.s = ~this.s), t;
        }),
        (d.prototype.shiftLeft = function (t) {
          var e = g();
          return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
        }),
        (d.prototype.shiftRight = function (t) {
          var e = g();
          return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
        }),
        (d.prototype.getLowestSetBit = function () {
          for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + U(this[t]);
          return this.s < 0 ? this.t * this.DB : -1;
        }),
        (d.prototype.bitCount = function () {
          for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += C(this[r] ^ e);
          return t;
        }),
        (d.prototype.testBit = function (t) {
          var e = Math.floor(t / this.DB);
          return e >= this.t ? 0 != this.s : !!(this[e] & (1 << t % this.DB));
        }),
        (d.prototype.setBit = function (t) {
          return this.changeBit(t, D);
        }),
        (d.prototype.clearBit = function (t) {
          return this.changeBit(t, _);
        }),
        (d.prototype.flipBit = function (t) {
          return this.changeBit(t, S);
        }),
        (d.prototype.add = function (t) {
          var e = g();
          return this.addTo(t, e), e;
        }),
        (d.prototype.subtract = function (t) {
          var e = g();
          return this.subTo(t, e), e;
        }),
        (d.prototype.multiply = function (t) {
          var e = g();
          return this.multiplyTo(t, e), e;
        }),
        (d.prototype.divide = function (t) {
          var e = g();
          return this.divRemTo(t, e, null), e;
        }),
        (d.prototype.remainder = function (t) {
          var e = g();
          return this.divRemTo(t, null, e), e;
        }),
        (d.prototype.divideAndRemainder = function (t) {
          var e = g(),
            r = g();
          return this.divRemTo(t, e, r), [e, r];
        }),
        (d.prototype.modPow = function (t, e) {
          var r,
            i,
            n = t.bitLength(),
            s = B(1);
          if (n <= 0) return s;
          (r = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6),
            (i = n < 8 ? new T(e) : e.isEven() ? new R(e) : new O(e));
          var o = [],
            u = 3,
            h = r - 1,
            a = (1 << r) - 1;
          if (((o[1] = i.convert(this)), r > 1)) {
            var f = g();
            for (i.sqrTo(o[1], f); u <= a; ) (o[u] = g()), i.mulTo(f, o[u - 2], o[u]), (u += 2);
          }
          var c,
            p,
            l = t.t - 1,
            F = !0,
            y = g();
          for (n = b(t[l]) - 1; l >= 0; ) {
            for (
              n >= h
                ? (c = (t[l] >> (n - h)) & a)
                : ((c = (t[l] & ((1 << (n + 1)) - 1)) << (h - n)),
                  l > 0 && (c |= t[l - 1] >> (this.DB + n - h))),
                u = r;
              !(1 & c);

            )
              (c >>= 1), --u;
            if (((n -= u) < 0 && ((n += this.DB), --l), F)) o[c].copyTo(s), (F = !1);
            else {
              for (; u > 1; ) i.sqrTo(s, y), i.sqrTo(y, s), (u -= 2);
              u > 0 ? i.sqrTo(s, y) : ((p = s), (s = y), (y = p)), i.mulTo(y, o[c], s);
            }
            for (; l >= 0 && !(t[l] & (1 << n)); )
              i.sqrTo(s, y), (p = s), (s = y), (y = p), --n < 0 && ((n = this.DB - 1), --l);
          }
          return i.revert(s);
        }),
        (d.prototype.modInverse = function (t) {
          var e = t.isEven();
          if ((this.isEven() && e) || 0 == t.signum()) return d.ZERO;
          for (
            var r = t.clone(), i = this.clone(), n = B(1), s = B(0), o = B(0), u = B(1);
            0 != r.signum();

          ) {
            for (; r.isEven(); )
              r.rShiftTo(1, r),
                e
                  ? ((n.isEven() && s.isEven()) || (n.addTo(this, n), s.subTo(t, s)),
                    n.rShiftTo(1, n))
                  : s.isEven() || s.subTo(t, s),
                s.rShiftTo(1, s);
            for (; i.isEven(); )
              i.rShiftTo(1, i),
                e
                  ? ((o.isEven() && u.isEven()) || (o.addTo(this, o), u.subTo(t, u)),
                    o.rShiftTo(1, o))
                  : u.isEven() || u.subTo(t, u),
                u.rShiftTo(1, u);
            r.compareTo(i) >= 0
              ? (r.subTo(i, r), e && n.subTo(o, n), s.subTo(u, s))
              : (i.subTo(r, i), e && o.subTo(n, o), u.subTo(s, u));
          }
          return 0 != i.compareTo(d.ONE)
            ? d.ZERO
            : u.compareTo(t) >= 0
            ? u.subtract(t)
            : u.signum() < 0
            ? (u.addTo(t, u), u.signum() < 0 ? u.add(t) : u)
            : u;
        }),
        (d.prototype.pow = function (t) {
          return this.exp(t, new x());
        }),
        (d.prototype.gcd = function (t) {
          var e = this.s < 0 ? this.negate() : this.clone(),
            r = t.s < 0 ? t.negate() : t.clone();
          if (e.compareTo(r) < 0) {
            var i = e;
            (e = r), (r = i);
          }
          var n = e.getLowestSetBit(),
            s = r.getLowestSetBit();
          if (s < 0) return e;
          for (n < s && (s = n), s > 0 && (e.rShiftTo(s, e), r.rShiftTo(s, r)); e.signum() > 0; )
            (n = e.getLowestSetBit()) > 0 && e.rShiftTo(n, e),
              (n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r),
              e.compareTo(r) >= 0
                ? (e.subTo(r, e), e.rShiftTo(1, e))
                : (r.subTo(e, r), r.rShiftTo(1, r));
          return s > 0 && r.lShiftTo(s, r), r;
        }),
        (d.prototype.isProbablePrime = function (t) {
          var e,
            r = this.abs();
          if (1 == r.t && r[0] <= q[q.length - 1]) {
            for (e = 0; e < q.length; ++e) if (r[0] == q[e]) return !0;
            return !1;
          }
          if (r.isEven()) return !1;
          for (e = 1; e < q.length; ) {
            for (var i = q[e], n = e + 1; n < q.length && i < N; ) i *= q[n++];
            for (i = r.modInt(i); e < n; ) if (i % q[e++] == 0) return !1;
          }
          return r.millerRabin(t);
        }),
        (d.prototype.square = function () {
          var t = g();
          return this.squareTo(t), t;
        }),
        (L.prototype.equals = function (t) {
          return t == this || (this.q.equals(t.q) && this.x.equals(t.x));
        }),
        (L.prototype.toBigInteger = function () {
          return this.x;
        }),
        (L.prototype.negate = function () {
          return new L(this.q, this.x.negate().mod(this.q));
        }),
        (L.prototype.add = function (t) {
          return new L(this.q, this.x.add(t.toBigInteger()).mod(this.q));
        }),
        (L.prototype.subtract = function (t) {
          return new L(this.q, this.x.subtract(t.toBigInteger()).mod(this.q));
        }),
        (L.prototype.multiply = function (t) {
          return new L(this.q, this.x.multiply(t.toBigInteger()).mod(this.q));
        }),
        (L.prototype.square = function () {
          return new L(this.q, this.x.square().mod(this.q));
        }),
        (L.prototype.divide = function (t) {
          return new L(this.q, this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q));
        }),
        (M.prototype.getX = function () {
          return (
            null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q)),
            this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
          );
        }),
        (M.prototype.getY = function () {
          return (
            null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q)),
            this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
          );
        }),
        (M.prototype.equals = function (t) {
          return (
            t == this ||
            (this.isInfinity()
              ? t.isInfinity()
              : t.isInfinity()
              ? this.isInfinity()
              : !!t.y
                  .toBigInteger()
                  .multiply(this.z)
                  .subtract(this.y.toBigInteger().multiply(t.z))
                  .mod(this.curve.q)
                  .equals(d.ZERO) &&
                t.x
                  .toBigInteger()
                  .multiply(this.z)
                  .subtract(this.x.toBigInteger().multiply(t.z))
                  .mod(this.curve.q)
                  .equals(d.ZERO))
          );
        }),
        (M.prototype.isInfinity = function () {
          return (
            (null == this.x && null == this.y) ||
            (this.z.equals(d.ZERO) && !this.y.toBigInteger().equals(d.ZERO))
          );
        }),
        (M.prototype.negate = function () {
          return new M(this.curve, this.x, this.y.negate(), this.z);
        }),
        (M.prototype.add = function (t) {
          if (this.isInfinity()) return t;
          if (t.isInfinity()) return this;
          var e = t.y
              .toBigInteger()
              .multiply(this.z)
              .subtract(this.y.toBigInteger().multiply(t.z))
              .mod(this.curve.q),
            r = t.x
              .toBigInteger()
              .multiply(this.z)
              .subtract(this.x.toBigInteger().multiply(t.z))
              .mod(this.curve.q);
          if (d.ZERO.equals(r)) return d.ZERO.equals(e) ? this.twice() : this.curve.getInfinity();
          var i = new d('3'),
            n = this.x.toBigInteger(),
            s = this.y.toBigInteger(),
            o = (t.x.toBigInteger(), t.y.toBigInteger(), r.square()),
            u = o.multiply(r),
            h = n.multiply(o),
            a = e.square().multiply(this.z),
            f = a.subtract(h.shiftLeft(1)).multiply(t.z).subtract(u).multiply(r).mod(this.curve.q),
            c = h
              .multiply(i)
              .multiply(e)
              .subtract(s.multiply(u))
              .subtract(a.multiply(e))
              .multiply(t.z)
              .add(e.multiply(u))
              .mod(this.curve.q),
            p = u.multiply(this.z).multiply(t.z).mod(this.curve.q);
          return new M(this.curve, this.curve.fromBigInteger(f), this.curve.fromBigInteger(c), p);
        }),
        (M.prototype.twice = function () {
          if (this.isInfinity()) return this;
          if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
          var t = new d('3'),
            e = this.x.toBigInteger(),
            r = this.y.toBigInteger(),
            i = r.multiply(this.z),
            n = i.multiply(r).mod(this.curve.q),
            s = this.curve.a.toBigInteger(),
            o = e.square().multiply(t);
          d.ZERO.equals(s) || (o = o.add(this.z.square().multiply(s)));
          var u = (o = o.mod(this.curve.q))
              .square()
              .subtract(e.shiftLeft(3).multiply(n))
              .shiftLeft(1)
              .multiply(i)
              .mod(this.curve.q),
            h = o
              .multiply(t)
              .multiply(e)
              .subtract(n.shiftLeft(1))
              .shiftLeft(2)
              .multiply(n)
              .subtract(o.square().multiply(o))
              .mod(this.curve.q),
            a = i.square().multiply(i).shiftLeft(3).mod(this.curve.q);
          return new M(this.curve, this.curve.fromBigInteger(u), this.curve.fromBigInteger(h), a);
        }),
        (M.prototype.multiply = function (t) {
          if (this.isInfinity()) return this;
          if (0 == t.signum()) return this.curve.getInfinity();
          var e,
            r = t,
            i = r.multiply(new d('3')),
            n = this.negate(),
            s = this;
          for (e = i.bitLength() - 2; e > 0; --e) {
            s = s.twice();
            var o = i.testBit(e);
            o != r.testBit(e) && (s = s.add(o ? this : n));
          }
          return s;
        }),
        (M.prototype.multiplyTwo = function (t, e, r) {
          var i;
          i = t.bitLength() > r.bitLength() ? t.bitLength() - 1 : r.bitLength() - 1;
          for (var n = this.curve.getInfinity(), s = this.add(e); i >= 0; )
            (n = n.twice()),
              t.testBit(i)
                ? (n = r.testBit(i) ? n.add(s) : n.add(this))
                : r.testBit(i) && (n = n.add(e)),
              --i;
          return n;
        }),
        (k.prototype.getQ = function () {
          return this.q;
        }),
        (k.prototype.getA = function () {
          return this.a;
        }),
        (k.prototype.getB = function () {
          return this.b;
        }),
        (k.prototype.equals = function (t) {
          return t == this || (this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b));
        }),
        (k.prototype.getInfinity = function () {
          return this.infinity;
        }),
        (k.prototype.fromBigInteger = function (t) {
          return new L(this.q, t);
        }),
        (k.prototype.decodePointHex = function (t) {
          switch (parseInt(t.substr(0, 2), 16)) {
            case 0:
              return this.infinity;
            case 2:
            case 3:
            default:
              return null;
            case 4:
            case 6:
            case 7:
              var e = (t.length - 2) / 2,
                r = t.substr(2, e),
                i = t.substr(e + 2, e);
              return new M(
                this,
                this.fromBigInteger(new d(r, 16)),
                this.fromBigInteger(new d(i, 16))
              );
          }
        }),
        (K.prototype.getCurve = function () {
          return this.curve;
        }),
        (K.prototype.getG = function () {
          return this.g;
        }),
        (K.prototype.getN = function () {
          return this.n;
        }),
        (K.prototype.getH = function () {
          return this.h;
        });
      var Z = function () {};
      for (var j in ((Z.prototype.on = function (t, e, r) {
        r || (r = this),
          this._listeners || (this._listeners = {}),
          this._listeners[t] || (this._listeners[t] = []),
          this._unbinders || (this._unbinders = {}),
          this._unbinders[t] || (this._unbinders[t] = []),
          this._unbinders[t].push(e),
          this._listeners[t].push(function (t) {
            e.apply(r, [t]);
          });
      }),
      (Z.prototype.trigger = function (t, e) {
        if (
          (void 0 === e && (e = {}), this._listeners || (this._listeners = {}), this._listeners[t])
        )
          for (var r = this._listeners[t].length; r--; ) this._listeners[t][r](e);
      }),
      (Z.prototype.removeListener = function (t, e) {
        if ((this._unbinders || (this._unbinders = {}), this._unbinders[t]))
          for (var r = this._unbinders[t].length; r--; )
            this._unbinders[t][r] === e &&
              (this._unbinders[t].splice(r, 1), this._listeners[t].splice(r, 1));
      }),
      (Z.augment = function (t) {
        for (var e in Z.prototype) t[e] || (t[e] = Z.prototype[e]);
      }),
      (function (e) {
        var r = e;
        'object' != i(t) && (r.EventEmitter = Z);
      })('object' == i(t) ? t.exports : (window.Bitcoin = {})),
      (d.valueOf = B),
      (d.prototype.toByteArrayUnsigned = function () {
        var t = this.abs().toByteArray();
        return t.length
          ? (0 == t[0] && (t = t.slice(1)),
            t.map(function (t) {
              return t < 0 ? t + 256 : t;
            }))
          : t;
      }),
      (d.fromByteArrayUnsigned = function (t) {
        return t.length ? (128 & t[0] ? new d([0].concat(t)) : new d(t)) : t.valueOf(0);
      }),
      (d.prototype.toByteArraySigned = function () {
        var t = this.abs().toByteArrayUnsigned();
        return (
          this.compareTo(d.ZERO) < 0
            ? 128 & t[0]
              ? t.unshift(128)
              : (t[0] |= 128)
            : 128 & t[0] && t.unshift(0),
          t
        );
      }),
      (d.fromByteArraySigned = function (t) {
        return 128 & t[0]
          ? ((t[0] &= 127), d.fromByteArrayUnsigned(t).negate())
          : d.fromByteArrayUnsigned(t);
      }),
      (s.Util = {
        isArray:
          Array.isArray ||
          function (t) {
            return '[object Array]' === Object.prototype.toString.call(t);
          },
        makeFilledArray: function (t, e) {
          for (var r = [], i = 0; i < t; ) r[i++] = e;
          return r;
        },
        numToVarInt: function (t) {
          return t < 253
            ? [t]
            : t <= 65536
            ? [253, t >>> 8, 255 & t]
            : t <= 1
            ? [254].concat(n.util.wordsToBytes([t]))
            : [255].concat(n.util.wordsToBytes([t >>> 32, t]));
        },
        valueToBigInt: function (t) {
          return t instanceof d ? t : d.fromByteArrayUnsigned(t);
        },
        formatValue: function (t) {
          for (
            var e = this.valueToBigInt(t).toString(),
              r = e.length > 8 ? e.substr(0, e.length - 8) : '0',
              i = e.length > 8 ? e.substr(e.length - 8) : e;
            i.length < 8;

          )
            i = '0' + i;
          for (i = i.replace(/0*$/, ''); i.length < 2; ) i += '0';
          return r + '.' + i;
        },
        parseValue: function (t) {
          for (var e = t.split('.'), r = e[0], i = e[1] || '0'; i.length < 8; ) i += '0';
          i = i.replace(/^0+/g, '');
          var n = d.valueOf(parseInt(r));
          return (n = n.multiply(d.valueOf(1e8))).add(d.valueOf(parseInt(i)));
        },
        sha256ripe160: function (t) {
          return n.RIPEMD160(n.SHA256(t, { asBytes: !0 }), { asBytes: !0 });
        },
      }),
      n.util))
        n.util.hasOwnProperty(j) && (s.Util[j] = n.util[j]);
      function G(t, e) {
        var r = t.toByteArrayUnsigned();
        if (e < r.length) r = r.slice(r.length - e);
        else for (; e > r.length; ) r.unshift(0);
        return r;
      }
      !(function (t) {
        t.Base58 = {
          alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
          validRegex: /^[1-9A-HJ-NP-Za-km-z]+$/,
          base: d.valueOf(58),
          encode: function (t) {
            for (var r = d.fromByteArrayUnsigned(t), i = []; r.compareTo(e.base) >= 0; ) {
              var n = r.mod(e.base);
              i.unshift(e.alphabet[n.intValue()]), (r = r.subtract(n).divide(e.base));
            }
            i.unshift(e.alphabet[r.intValue()]);
            for (var s = 0; s < t.length && 0 == t[s]; s++) i.unshift(e.alphabet[0]);
            return i.join('');
          },
          decode: function (t) {
            for (var r = d.valueOf(0), i = 0, n = t.length - 1; n >= 0; n--) {
              var s = e.alphabet.indexOf(t[n]);
              if (s < 0) throw 'Invalid character';
              (r = r.add(d.valueOf(s).multiply(e.base.pow(t.length - 1 - n)))),
                '1' == t[n] ? i++ : (i = 0);
            }
            for (var o = r.toByteArrayUnsigned(); i-- > 0; ) o.unshift(0);
            return o;
          },
        };
        var e = t.Base58;
      })(void 0 !== s ? s : t.exports),
        (s.Address = function (t) {
          'string' == typeof t && (t = s.Address.decodeString(t)),
            (this.hash = t),
            (this.version = 0);
        }),
        (s.Address.prototype.toString = function () {
          var t = this.hash.slice(0);
          t.unshift(this.version);
          var e = n.SHA256(n.SHA256(t, { asBytes: !0 }), { asBytes: !0 }),
            r = t.concat(e.slice(0, 4));
          return s.Base58.encode(r);
        }),
        (s.Address.prototype.getHashBase64 = function () {
          return n.util.bytesToBase64(this.hash);
        }),
        (s.Address.decodeString = function (t) {
          var e = s.Base58.decode(t),
            r = e.slice(0, 21),
            i = n.SHA256(n.SHA256(r, { asBytes: !0 }), { asBytes: !0 });
          if (i[0] != e[21] || i[1] != e[22] || i[2] != e[23] || i[3] != e[24])
            throw 'Checksum validation failed!';
          var o = r.shift();
          if (0 != o) throw 'Version ' + o + ' not supported!';
          return r;
        }),
        (L.prototype.getByteLength = function () {
          return Math.floor((this.toBigInteger().bitLength() + 7) / 8);
        }),
        (M.prototype.getEncoded = function (t) {
          var e = this.getX().toBigInteger(),
            r = this.getY().toBigInteger(),
            i = G(e, 32);
          return (
            t
              ? r.isEven()
                ? i.unshift(2)
                : i.unshift(3)
              : (i.unshift(4), (i = i.concat(G(r, 32)))),
            i
          );
        }),
        (M.decodeFrom = function (t, e) {
          e[0];
          var r = e.length - 1,
            i = e.slice(1, 1 + r / 2),
            n = e.slice(1 + r / 2, 1 + r);
          i.unshift(0), n.unshift(0);
          var s = new d(i),
            o = new d(n);
          return new M(t, t.fromBigInteger(s), t.fromBigInteger(o));
        }),
        (M.prototype.add2D = function (t) {
          if (this.isInfinity()) return t;
          if (t.isInfinity()) return this;
          if (this.x.equals(t.x))
            return this.y.equals(t.y) ? this.twice() : this.curve.getInfinity();
          var e = t.x.subtract(this.x),
            r = t.y.subtract(this.y).divide(e),
            i = r.square().subtract(this.x).subtract(t.x),
            n = r.multiply(this.x.subtract(i)).subtract(this.y);
          return new M(this.curve, i, n);
        }),
        (M.prototype.twice2D = function () {
          if (this.isInfinity()) return this;
          if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
          var t = this.curve.fromBigInteger(d.valueOf(2)),
            e = this.curve.fromBigInteger(d.valueOf(3)),
            r = this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(t)),
            i = r.square().subtract(this.x.multiply(t)),
            n = r.multiply(this.x.subtract(i)).subtract(this.y);
          return new M(this.curve, i, n);
        }),
        (M.prototype.multiply2D = function (t) {
          if (this.isInfinity()) return this;
          if (0 == t.signum()) return this.curve.getInfinity();
          var e,
            r = t,
            i = r.multiply(new d('3')),
            n = this.negate(),
            s = this;
          for (e = i.bitLength() - 2; e > 0; --e) {
            s = s.twice();
            var o = i.testBit(e);
            o != r.testBit(e) && (s = s.add2D(o ? this : n));
          }
          return s;
        }),
        (M.prototype.isOnCurve = function () {
          var t = this.getX().toBigInteger(),
            e = this.getY().toBigInteger(),
            r = this.curve.getA().toBigInteger(),
            i = this.curve.getB().toBigInteger(),
            n = this.curve.getQ(),
            s = e.multiply(e).mod(n),
            o = t.multiply(t).multiply(t).add(r.multiply(t)).add(i).mod(n);
          return s.equals(o);
        }),
        (M.prototype.toString = function () {
          return (
            '(' +
            this.getX().toBigInteger().toString() +
            ',' +
            this.getY().toBigInteger().toString() +
            ')'
          );
        }),
        (M.prototype.validate = function () {
          var t = this.curve.getQ();
          if (this.isInfinity()) throw new Error('Point is at infinity.');
          var e = this.getX().toBigInteger(),
            r = this.getY().toBigInteger();
          if (e.compareTo(d.ONE) < 0 || e.compareTo(t.subtract(d.ONE)) > 0)
            throw new Error('x coordinate out of bounds');
          if (r.compareTo(d.ONE) < 0 || r.compareTo(t.subtract(d.ONE)) > 0)
            throw new Error('y coordinate out of bounds');
          if (!this.isOnCurve()) throw new Error('Point is not on the curve.');
          if (this.multiply(t).isInfinity())
            throw new Error('Point is not a scalar multiple of G.');
          return !0;
        }),
        (s.ECDSA = (function () {
          var t = z('secp256k1'),
            e = new F(),
            r = null,
            o = {
              getBigRandom: function (t) {
                return new d(t.bitLength(), e).mod(t.subtract(d.ONE)).add(d.ONE);
              },
              sign: function (e, r) {
                var i = r,
                  n = t.getN(),
                  s = d.fromByteArrayUnsigned(e);
                do {
                  var u = o.getBigRandom(n),
                    h = t.getG().multiply(u).getX().toBigInteger().mod(n);
                } while (h.compareTo(d.ZERO) <= 0);
                var a = u
                  .modInverse(n)
                  .multiply(s.add(i.multiply(h)))
                  .mod(n);
                return o.serializeSig(h, a);
              },
              verify: function (e, r, n) {
                var u, h, a;
                if (s.Util.isArray(r)) {
                  var f = o.parseSig(r);
                  (u = f.r), (h = f.s);
                } else {
                  if ('object' != i(r) || !r.r || !r.s) throw 'Invalid value for signature';
                  (u = r.r), (h = r.s);
                }
                if (n instanceof M) a = n;
                else {
                  if (!s.Util.isArray(n))
                    throw 'Invalid format for pubkey value, must be byte array or ECPointFp';
                  a = M.decodeFrom(t.getCurve(), n);
                }
                var c = d.fromByteArrayUnsigned(e);
                return o.verifyRaw(c, u, h, a);
              },
              verifyRaw: function (e, r, i, n) {
                var s = t.getN(),
                  o = t.getG();
                if (r.compareTo(d.ONE) < 0 || r.compareTo(s) >= 0) return !1;
                if (i.compareTo(d.ONE) < 0 || i.compareTo(s) >= 0) return !1;
                var u = i.modInverse(s),
                  h = e.multiply(u).mod(s),
                  a = r.multiply(u).mod(s);
                return o.multiply(h).add(n.multiply(a)).getX().toBigInteger().mod(s).equals(r);
              },
              serializeSig: function (t, e) {
                var r = t.toByteArraySigned(),
                  i = e.toByteArraySigned(),
                  n = [];
                return (
                  n.push(2),
                  n.push(r.length),
                  (n = n.concat(r)).push(2),
                  n.push(i.length),
                  (n = n.concat(i)).unshift(n.length),
                  n.unshift(48),
                  n
                );
              },
              parseSig: function (t) {
                var e;
                if (48 != t[0]) throw new Error('Signature not a valid DERSequence');
                if (2 != t[(e = 2)])
                  throw new Error('First element in signature must be a DERInteger');
                var r = t.slice(e + 2, e + 2 + t[e + 1]);
                if (2 != t[(e += 2 + t[e + 1])])
                  throw new Error('Second element in signature must be a DERInteger');
                var i = t.slice(e + 2, e + 2 + t[e + 1]);
                return (
                  (e += 2 + t[e + 1]),
                  { r: d.fromByteArrayUnsigned(r), s: d.fromByteArrayUnsigned(i) }
                );
              },
              parseSigCompact: function (e) {
                if (65 !== e.length) throw 'Signature has the wrong length';
                var r = e[0] - 27;
                if (r < 0 || r > 7) throw 'Invalid signature type';
                var i = t.getN();
                return {
                  r: d.fromByteArrayUnsigned(e.slice(1, 33)).mod(i),
                  s: d.fromByteArrayUnsigned(e.slice(33, 65)).mod(i),
                  i: r,
                };
              },
              recoverPubKey: function (e, i, u, h) {
                var a = 1 & (h &= 3),
                  f = h >> 1,
                  c = t.getN(),
                  p = t.getG(),
                  l = t.getCurve(),
                  F = l.getQ(),
                  y = l.getA().toBigInteger(),
                  g = l.getB().toBigInteger();
                r || (r = F.add(d.ONE).divide(d.valueOf(4)));
                var v = f ? e.add(c) : e,
                  m = v.multiply(v).multiply(v).add(y.multiply(v)).add(g).mod(F).modPow(r, F),
                  B = (m.isEven(), (m.isEven() ? !a : a) ? m : F.subtract(m)),
                  b = new M(l, l.fromBigInteger(v), l.fromBigInteger(B));
                b.validate();
                var T = d.fromByteArrayUnsigned(u),
                  O = d.ZERO.subtract(T).mod(c),
                  A = e.modInverse(c),
                  E = (function (t, e, r, i) {
                    for (
                      var n = Math.max(e.bitLength(), i.bitLength()),
                        s = t.add2D(r),
                        o = t.curve.getInfinity(),
                        u = n - 1;
                      u >= 0;
                      --u
                    )
                      ((o = o.twice2D()).z = d.ONE),
                        e.testBit(u)
                          ? (o = i.testBit(u) ? o.add2D(s) : o.add2D(t))
                          : i.testBit(u) && (o = o.add2D(r));
                    return o;
                  })(b, i, p, O).multiply(A);
                if (
                  (console.log(
                    'G.x: ',
                    n.util.bytesToHex(p.x.toBigInteger().toByteArrayUnsigned())
                  ),
                  console.log('G.y: ', n.util.bytesToHex(p.y.toBigInteger().toByteArrayUnsigned())),
                  console.log('s: ', n.util.bytesToHex(A.toByteArrayUnsigned())),
                  console.log('Q.x: ', n.util.bytesToHex(E.x.toBigInteger().toByteArrayUnsigned())),
                  console.log('Q.y: ', n.util.bytesToHex(E.y.toBigInteger().toByteArrayUnsigned())),
                  E.validate(),
                  !o.verifyRaw(T, e, i, E))
                )
                  throw 'Pubkey recovery unsuccessful';
                var w = new s.ECKey();
                return (w.pub = E), w;
              },
              calcPubkeyRecoveryParam: function (t, e, r, i) {
                for (var n = 0; n < 4; n++)
                  try {
                    if (s.ECDSA.recoverPubKey(e, r, i, n).getBitcoinAddress().toString() == t)
                      return n;
                  } catch (t) {}
                throw 'Unable to find valid recovery factor';
              },
            };
          return o;
        })()),
        (s.ECKey = (function () {
          var t = s.ECDSA,
            e = z('secp256k1'),
            r =
              (new F(),
              function (i) {
                if (i)
                  i instanceof d
                    ? (this.priv = i)
                    : s.Util.isArray(i)
                    ? (this.priv = d.fromByteArrayUnsigned(i))
                    : 'string' == typeof i &&
                      (51 == i.length && '5' == i[0]
                        ? (this.priv = d.fromByteArrayUnsigned(r.decodeString(i)))
                        : (this.priv = d.fromByteArrayUnsigned(n.util.base64ToBytes(i))));
                else {
                  var o = e.getN();
                  this.priv = t.getBigRandom(o);
                }
                this.compressed = !!r.compressByDefault;
              });
          return (
            (r.compressByDefault = !1),
            (r.prototype.setCompressed = function (t) {
              this.compressed = !!t;
            }),
            (r.prototype.getPub = function () {
              return this.getPubPoint().getEncoded(this.compressed);
            }),
            (r.prototype.getPubPoint = function () {
              return this.pub || (this.pub = e.getG().multiply(this.priv)), this.pub;
            }),
            (r.prototype.getPubKeyHash = function () {
              return this.pubKeyHash
                ? this.pubKeyHash
                : (this.pubKeyHash = s.Util.sha256ripe160(this.getPub()));
            }),
            (r.prototype.getBitcoinAddress = function () {
              var t = this.getPubKeyHash();
              return new s.Address(t);
            }),
            (r.prototype.getExportedPrivateKey = function () {
              for (var t = this.priv.toByteArrayUnsigned(); t.length < 32; ) t.unshift(0);
              t.unshift(128);
              var e = n.SHA256(n.SHA256(t, { asBytes: !0 }), { asBytes: !0 }),
                r = t.concat(e.slice(0, 4));
              return s.Base58.encode(r);
            }),
            (r.prototype.setPub = function (t) {
              this.pub = M.decodeFrom(e.getCurve(), t);
            }),
            (r.prototype.toString = function (t) {
              return 'base64' === t
                ? n.util.bytesToBase64(this.priv.toByteArrayUnsigned())
                : n.util.bytesToHex(this.priv.toByteArrayUnsigned());
            }),
            (r.prototype.sign = function (e) {
              return t.sign(e, this.priv);
            }),
            (r.prototype.verify = function (e, r) {
              return t.verify(e, r, this.getPub());
            }),
            (r.decodeString = function (t) {
              var e = s.Base58.decode(t),
                r = e.slice(0, 33),
                i = n.SHA256(n.SHA256(r, { asBytes: !0 }), { asBytes: !0 });
              if (i[0] != e[33] || i[1] != e[34] || i[2] != e[35] || i[3] != e[36])
                throw 'Checksum validation failed!';
              var o = r.shift();
              if (128 != o) throw 'Version ' + o + ' not supported!';
              return r;
            }),
            r
          );
        })()),
        (function () {
          var t = (s.Opcode = function (t) {
            this.code = t;
          });
          for (var e in ((t.prototype.toString = function () {
            return t.reverseMap[this.code];
          }),
          (t.map = {
            OP_0: 0,
            OP_FALSE: 0,
            OP_PUSHDATA1: 76,
            OP_PUSHDATA2: 77,
            OP_PUSHDATA4: 78,
            OP_1NEGATE: 79,
            OP_RESERVED: 80,
            OP_1: 81,
            OP_TRUE: 81,
            OP_2: 82,
            OP_3: 83,
            OP_4: 84,
            OP_5: 85,
            OP_6: 86,
            OP_7: 87,
            OP_8: 88,
            OP_9: 89,
            OP_10: 90,
            OP_11: 91,
            OP_12: 92,
            OP_13: 93,
            OP_14: 94,
            OP_15: 95,
            OP_16: 96,
            OP_NOP: 97,
            OP_VER: 98,
            OP_IF: 99,
            OP_NOTIF: 100,
            OP_VERIF: 101,
            OP_VERNOTIF: 102,
            OP_ELSE: 103,
            OP_ENDIF: 104,
            OP_VERIFY: 105,
            OP_RETURN: 106,
            OP_TOALTSTACK: 107,
            OP_FROMALTSTACK: 108,
            OP_2DROP: 109,
            OP_2DUP: 110,
            OP_3DUP: 111,
            OP_2OVER: 112,
            OP_2ROT: 113,
            OP_2SWAP: 114,
            OP_IFDUP: 115,
            OP_DEPTH: 116,
            OP_DROP: 117,
            OP_DUP: 118,
            OP_NIP: 119,
            OP_OVER: 120,
            OP_PICK: 121,
            OP_ROLL: 122,
            OP_ROT: 123,
            OP_SWAP: 124,
            OP_TUCK: 125,
            OP_CAT: 126,
            OP_SUBSTR: 127,
            OP_LEFT: 128,
            OP_RIGHT: 129,
            OP_SIZE: 130,
            OP_INVERT: 131,
            OP_AND: 132,
            OP_OR: 133,
            OP_XOR: 134,
            OP_EQUAL: 135,
            OP_EQUALVERIFY: 136,
            OP_RESERVED1: 137,
            OP_RESERVED2: 138,
            OP_1ADD: 139,
            OP_1SUB: 140,
            OP_2MUL: 141,
            OP_2DIV: 142,
            OP_NEGATE: 143,
            OP_ABS: 144,
            OP_NOT: 145,
            OP_0NOTEQUAL: 146,
            OP_ADD: 147,
            OP_SUB: 148,
            OP_MUL: 149,
            OP_DIV: 150,
            OP_MOD: 151,
            OP_LSHIFT: 152,
            OP_RSHIFT: 153,
            OP_BOOLAND: 154,
            OP_BOOLOR: 155,
            OP_NUMEQUAL: 156,
            OP_NUMEQUALVERIFY: 157,
            OP_NUMNOTEQUAL: 158,
            OP_LESSTHAN: 159,
            OP_GREATERTHAN: 160,
            OP_LESSTHANOREQUAL: 161,
            OP_GREATERTHANOREQUAL: 162,
            OP_MIN: 163,
            OP_MAX: 164,
            OP_WITHIN: 165,
            OP_RIPEMD160: 166,
            OP_SHA1: 167,
            OP_SHA256: 168,
            OP_HASH160: 169,
            OP_HASH256: 170,
            OP_CODESEPARATOR: 171,
            OP_CHECKSIG: 172,
            OP_CHECKSIGVERIFY: 173,
            OP_CHECKMULTISIG: 174,
            OP_CHECKMULTISIGVERIFY: 175,
            OP_NOP1: 176,
            OP_NOP2: 177,
            OP_NOP3: 178,
            OP_NOP4: 179,
            OP_NOP5: 180,
            OP_NOP6: 181,
            OP_NOP7: 182,
            OP_NOP8: 183,
            OP_NOP9: 184,
            OP_NOP10: 185,
            OP_PUBKEYHASH: 253,
            OP_PUBKEY: 254,
            OP_INVALIDOPCODE: 255,
          }),
          (t.reverseMap = []),
          t.map))
            t.reverseMap[t.map[e]] = e;
        })(),
        (function () {
          var t = s.Opcode;
          for (var e in t.map) W(e, t.map[e]);
          var r = (s.Script = function (t) {
            if (t)
              if ('string' == typeof t) this.buffer = n.util.base64ToBytes(t);
              else if (s.Util.isArray(t)) this.buffer = t;
              else {
                if (!(t instanceof r)) throw new Error('Invalid script');
                this.buffer = t.buffer;
              }
            else this.buffer = [];
            this.parse();
          });
          (r.prototype.parse = function () {
            function t(t) {
              e.chunks.push(e.buffer.slice(r, r + t)), (r += t);
            }
            var e = this;
            this.chunks = [];
            for (var r = 0; r < this.buffer.length; ) {
              var i = this.buffer[r++];
              i >= 240 && (i = (i << 8) | this.buffer[r++]),
                i > 0 && i < OP_PUSHDATA1
                  ? t(i)
                  : i == OP_PUSHDATA1
                  ? t(this.buffer[r++])
                  : i == OP_PUSHDATA2
                  ? t((this.buffer[r++] << 8) | this.buffer[r++])
                  : i == OP_PUSHDATA4
                  ? t(
                      (this.buffer[r++] << 24) |
                        (this.buffer[r++] << 16) |
                        (this.buffer[r++] << 8) |
                        this.buffer[r++]
                    )
                  : this.chunks.push(i);
            }
          }),
            (r.prototype.getOutType = function () {
              return this.chunks[this.chunks.length - 1] == OP_CHECKMULTISIG &&
                this.chunks[this.chunks.length - 2] <= 3
                ? 'Multisig'
                : 5 == this.chunks.length &&
                  this.chunks[0] == OP_DUP &&
                  this.chunks[1] == OP_HASH160 &&
                  this.chunks[3] == OP_EQUALVERIFY &&
                  this.chunks[4] == OP_CHECKSIG
                ? 'Address'
                : 2 == this.chunks.length && this.chunks[1] == OP_CHECKSIG
                ? 'Pubkey'
                : 'Strange';
            }),
            (r.prototype.simpleOutHash = function () {
              switch (this.getOutType()) {
                case 'Address':
                  return this.chunks[2];
                case 'Pubkey':
                  return s.Util.sha256ripe160(this.chunks[0]);
                default:
                  throw new Error('Encountered non-standard scriptPubKey');
              }
            }),
            (r.prototype.simpleOutPubKeyHash = r.prototype.simpleOutHash),
            (r.prototype.getInType = function () {
              return 1 == this.chunks.length && s.Util.isArray(this.chunks[0])
                ? 'Pubkey'
                : 2 == this.chunks.length &&
                  s.Util.isArray(this.chunks[0]) &&
                  s.Util.isArray(this.chunks[1])
                ? 'Address'
                : 'Strange';
            }),
            (r.prototype.simpleInPubKey = function () {
              switch (this.getInType()) {
                case 'Address':
                  return this.chunks[1];
                case 'Pubkey':
                  throw new Error('Script does not contain pubkey.');
                default:
                  throw new Error('Encountered non-standard scriptSig');
              }
            }),
            (r.prototype.simpleInHash = function () {
              return s.Util.sha256ripe160(this.simpleInPubKey());
            }),
            (r.prototype.simpleInPubKeyHash = r.prototype.simpleInHash),
            (r.prototype.writeOp = function (t) {
              this.buffer.push(t), this.chunks.push(t);
            }),
            (r.prototype.writeBytes = function (t) {
              t.length < OP_PUSHDATA1
                ? this.buffer.push(t.length)
                : t.length <= 255
                ? (this.buffer.push(OP_PUSHDATA1), this.buffer.push(t.length))
                : t.length <= 65535
                ? (this.buffer.push(OP_PUSHDATA2),
                  this.buffer.push(255 & t.length),
                  this.buffer.push((t.length >>> 8) & 255))
                : (this.buffer.push(OP_PUSHDATA4),
                  this.buffer.push(255 & t.length),
                  this.buffer.push((t.length >>> 8) & 255),
                  this.buffer.push((t.length >>> 16) & 255),
                  this.buffer.push((t.length >>> 24) & 255)),
                (this.buffer = this.buffer.concat(t)),
                this.chunks.push(t);
            }),
            (r.createOutputScript = function (t) {
              var e = new r();
              return (
                e.writeOp(OP_DUP),
                e.writeOp(OP_HASH160),
                e.writeBytes(t.hash),
                e.writeOp(OP_EQUALVERIFY),
                e.writeOp(OP_CHECKSIG),
                e
              );
            }),
            (r.prototype.extractAddresses = function (t) {
              switch (this.getOutType()) {
                case 'Address':
                  return t.push(new Address(this.chunks[2])), 1;
                case 'Pubkey':
                  return t.push(new Address(Util.sha256ripe160(this.chunks[0]))), 1;
                case 'Multisig':
                  for (var e = 1; e < this.chunks.length - 2; ++e)
                    t.push(new Address(Util.sha256ripe160(this.chunks[e])));
                  return this.chunks[0] - OP_1 + 1;
                default:
                  throw new Error('Encountered non-standard scriptPubKey');
              }
            }),
            (r.createMultiSigOutputScript = function (t, e) {
              var r = new s.Script();
              r.writeOp(OP_1 + t - 1);
              for (var i = 0; i < e.length; ++i) r.writeBytes(e[i]);
              return r.writeOp(OP_1 + e.length - 1), r.writeOp(OP_CHECKMULTISIG), r;
            }),
            (r.createInputScript = function (t, e) {
              var i = new r();
              return i.writeBytes(t), i.writeBytes(e), i;
            }),
            (r.prototype.clone = function () {
              return new r(this.buffer);
            });
        })(),
        (function () {
          var t = s.Script,
            e = (s.Transaction = function (t) {
              if (
                ((this.version = 1),
                (this.lock_time = 0),
                (this.ins = []),
                (this.outs = []),
                (this.timestamp = null),
                (this.block = null),
                t)
              ) {
                if (
                  (t.hash && (this.hash = t.hash),
                  t.version && (this.version = t.version),
                  t.lock_time && (this.lock_time = t.lock_time),
                  t.ins && t.ins.length)
                )
                  for (var e = 0; e < t.ins.length; e++) this.addInput(new r(t.ins[e]));
                if (t.outs && t.outs.length)
                  for (e = 0; e < t.outs.length; e++) this.addOutput(new i(t.outs[e]));
                t.timestamp && (this.timestamp = t.timestamp), t.block && (this.block = t.block);
              }
            });
          (e.objectify = function (t) {
            for (var r = [], i = 0; i < t.length; i++) r.push(new e(t[i]));
            return r;
          }),
            (e.prototype.addInput = function (t, e) {
              arguments[0] instanceof r
                ? this.ins.push(arguments[0])
                : this.ins.push(
                    new r({
                      outpoint: { hash: t.hash, index: e },
                      script: new s.Script(),
                      sequence: 4294967295,
                    })
                  );
            }),
            (e.prototype.addOutput = function (e, r) {
              if (arguments[0] instanceof i) this.outs.push(arguments[0]);
              else {
                if (r instanceof d)
                  for (r = r.toByteArrayUnsigned().reverse(); r.length < 8; ) r.push(0);
                else s.Util.isArray(r);
                this.outs.push(new i({ value: r, script: t.createOutputScript(e) }));
              }
            }),
            (e.prototype.serialize = function () {
              var t = [];
              t = (t = t.concat(n.util.wordsToBytes([parseInt(this.version)]).reverse())).concat(
                s.Util.numToVarInt(this.ins.length)
              );
              for (var e = 0; e < this.ins.length; e++) {
                var r = this.ins[e];
                t = (t = t.concat(n.util.base64ToBytes(r.outpoint.hash))).concat(
                  n.util.wordsToBytes([parseInt(r.outpoint.index)]).reverse()
                );
                var i = r.script.buffer;
                t = (t = (t = t.concat(s.Util.numToVarInt(i.length))).concat(i)).concat(
                  n.util.wordsToBytes([parseInt(r.sequence)]).reverse()
                );
              }
              for (
                t = t.concat(s.Util.numToVarInt(this.outs.length)), e = 0;
                e < this.outs.length;
                e++
              ) {
                var o = this.outs[e];
                (t = t.concat(o.value)),
                  (i = o.script.buffer),
                  (t = (t = t.concat(s.Util.numToVarInt(i.length))).concat(i));
              }
              return t.concat(n.util.wordsToBytes([parseInt(this.lock_time)]).reverse());
            }),
            (e.prototype.hashTransactionForSignature = function (e, r, i) {
              for (var s = this.clone(), o = 0; o < s.ins.length; o++) s.ins[o].script = new t();
              if (((s.ins[r].script = e), 2 == (31 & i)))
                for (s.outs = [], o = 0; o < s.ins.length; o++) o != r && (s.ins[o].sequence = 0);
              80 & i && (s.ins = [s.ins[r]]);
              var u = s.serialize();
              u = u.concat(n.util.wordsToBytes([parseInt(i)]).reverse());
              var h = n.SHA256(u, { asBytes: !0 });
              return n.SHA256(h, { asBytes: !0 });
            }),
            (e.prototype.getHash = function () {
              var t = this.serialize();
              return n.SHA256(n.SHA256(t, { asBytes: !0 }), { asBytes: !0 });
            }),
            (e.prototype.clone = function () {
              var t = new e();
              (t.version = this.version), (t.lock_time = this.lock_time);
              for (var r = 0; r < this.ins.length; r++) {
                var i = this.ins[r].clone();
                t.addInput(i);
              }
              for (r = 0; r < this.outs.length; r++) {
                var n = this.outs[r].clone();
                t.addOutput(n);
              }
              return t;
            }),
            (e.prototype.analyze = function (t) {
              if (t instanceof s.Wallet) {
                for (
                  var e = !0, r = !0, i = null, n = null, o = null, u = this.outs.length - 1;
                  u >= 0;
                  u--
                ) {
                  var h = this.outs[u].script.simpleOutPubKeyHash();
                  t.hasHash(h) ? (n = h) : (r = !1), (i = h);
                }
                for (u = this.ins.length - 1; u >= 0; u--)
                  if (((o = this.ins[u].script.simpleInPubKeyHash()), !t.hasHash(o))) {
                    e = !1;
                    break;
                  }
                var a = this.calcImpact(t),
                  f = {};
                return (
                  (f.impact = a),
                  a.sign > 0 && a.value.compareTo(d.ZERO) > 0
                    ? ((f.type = 'recv'), (f.addr = new s.Address(n)))
                    : e && r
                    ? (f.type = 'self')
                    : e
                    ? ((f.type = 'sent'), (f.addr = new s.Address(i)))
                    : (f.type = 'other'),
                  f
                );
              }
              return null;
            }),
            (e.prototype.getDescription = function (t) {
              var e = this.analyze(t);
              if (!e) return '';
              switch (e.type) {
                case 'recv':
                  return 'Received with ' + e.addr;
                case 'sent':
                  return 'Payment to ' + e.addr;
                case 'self':
                  return 'Payment to yourself';
                default:
                  return '';
              }
            }),
            (e.prototype.getTotalOutValue = function () {
              for (var t = d.ZERO, e = 0; e < this.outs.length; e++) {
                var r = this.outs[e];
                t = t.add(s.Util.valueToBigInt(r.value));
              }
              return t;
            }),
            (e.prototype.getTotalValue = e.prototype.getTotalOutValue),
            (e.prototype.calcImpact = function (t) {
              if (t instanceof s.Wallet) {
                for (var e = d.ZERO, r = 0; r < this.outs.length; r++) {
                  var i = this.outs[r],
                    o = n.util.bytesToBase64(i.script.simpleOutPubKeyHash());
                  t.hasHash(o) && (e = e.add(s.Util.valueToBigInt(i.value)));
                }
                var u = d.ZERO;
                for (r = 0; r < this.ins.length; r++) {
                  var h = this.ins[r];
                  if (((o = n.util.bytesToBase64(h.script.simpleInPubKeyHash())), t.hasHash(o))) {
                    var a = t.txIndex[h.outpoint.hash];
                    a && (u = u.add(s.Util.valueToBigInt(a.outs[h.outpoint.index].value)));
                  }
                }
                return e.compareTo(u) >= 0
                  ? { sign: 1, value: e.subtract(u) }
                  : { sign: -1, value: u.subtract(e) };
              }
              return d.ZERO;
            });
          var r = (s.TransactionIn = function (e) {
            (this.outpoint = e.outpoint),
              e.script instanceof t ? (this.script = e.script) : (this.script = new t(e.script)),
              (this.sequence = e.sequence);
          });
          r.prototype.clone = function () {
            return new r({
              outpoint: { hash: this.outpoint.hash, index: this.outpoint.index },
              script: this.script.clone(),
              sequence: this.sequence,
            });
          };
          var i = (s.TransactionOut = function (e) {
            if (
              (e.script instanceof t ? (this.script = e.script) : (this.script = new t(e.script)),
              s.Util.isArray(e.value))
            )
              this.value = e.value;
            else if ('string' == typeof e.value) {
              for (var r = new d(e.value, 10).toString(16); r.length < 16; ) r = '0' + r;
              this.value = n.util.hexToBytes(r);
            }
          });
          i.prototype.clone = function () {
            return new i({ script: this.script.clone(), value: this.value.slice(0) });
          };
        })(),
        (s.Wallet = (function () {
          var t = s.Script,
            e = s.TransactionIn,
            r = s.TransactionOut,
            i = function () {
              var t = [];
              (this.addressHashes = []),
                (this.txIndex = {}),
                (this.unspentOuts = []),
                (this.addressPointer = 0),
                (this.addKey = function (e, r) {
                  e instanceof s.ECKey || (e = new s.ECKey(e)),
                    t.push(e),
                    r && ('string' == typeof r && (r = n.util.base64ToBytes(r)), e.setPub(r)),
                    this.addressHashes.push(e.getBitcoinAddress().getHashBase64());
                }),
                (this.addKeys = function (t, e) {
                  var r;
                  if (
                    ('string' == typeof t && (t = t.split(',')),
                    'string' == typeof e && (e = e.split(',')),
                    Array.isArray(e) && t.length == e.length)
                  )
                    for (r = 0; r < t.length; r++) this.addKey(t[r], e[r]);
                  else for (r = 0; r < t.length; r++) this.addKey(t[r]);
                }),
                (this.getKeys = function () {
                  for (var e = [], r = 0; r < t.length; r++) e.push(t[r].toString('base64'));
                  return e;
                }),
                (this.getPubKeys = function () {
                  for (var e = [], r = 0; r < t.length; r++)
                    e.push(n.util.bytesToBase64(t[r].getPub()));
                  return e;
                }),
                (this.clear = function () {
                  t = [];
                }),
                (this.getLength = function () {
                  return t.length;
                }),
                (this.getAllAddresses = function () {
                  for (var e = [], r = 0; r < t.length; r++) e.push(t[r].getBitcoinAddress());
                  return e;
                }),
                (this.getCurAddress = function () {
                  return t[this.addressPointer] ? t[this.addressPointer].getBitcoinAddress() : null;
                }),
                (this.getNextAddress = function () {
                  return (
                    this.addressPointer++,
                    t[this.addressPointer] || this.generateAddress(),
                    t[this.addressPointer].getBitcoinAddress()
                  );
                }),
                (this.signWithKey = function (e, r) {
                  e = n.util.bytesToBase64(e);
                  for (var i = 0; i < this.addressHashes.length; i++)
                    if (this.addressHashes[i] == e) return t[i].sign(r);
                  throw new Error('Missing key for signature');
                }),
                (this.getPubKeyFromHash = function (e) {
                  e = n.util.bytesToBase64(e);
                  for (var r = 0; r < this.addressHashes.length; r++)
                    if (this.addressHashes[r] == e) return t[r].getPub();
                  throw new Error('Hash unknown');
                });
            };
          return (
            (i.prototype.generateAddress = function () {
              this.addKey(new s.ECKey());
            }),
            (i.prototype.process = function (t) {
              if (!this.txIndex[t.hash]) {
                var i, o, u;
                for (i = 0; i < t.outs.length; i++) {
                  var h = new r(t.outs[i]);
                  for (
                    u = n.util.bytesToBase64(h.script.simpleOutPubKeyHash()), o = 0;
                    o < this.addressHashes.length;
                    o++
                  )
                    if (this.addressHashes[o] === u) {
                      this.unspentOuts.push({ tx: t, index: i, out: h });
                      break;
                    }
                }
                for (i = 0; i < t.ins.length; i++) {
                  var a = new e(t.ins[i]),
                    f = a.script.simpleInPubKey();
                  for (
                    u = n.util.bytesToBase64(s.Util.sha256ripe160(f)), o = 0;
                    o < this.addressHashes.length;
                    o++
                  )
                    if (this.addressHashes[o] === u) {
                      for (var c = 0; c < this.unspentOuts.length; c++)
                        a.outpoint.hash == this.unspentOuts[c].tx.hash &&
                          a.outpoint.index == this.unspentOuts[c].index &&
                          this.unspentOuts.splice(c, 1);
                      break;
                    }
                }
                this.txIndex[t.hash] = t;
              }
            }),
            (i.prototype.getBalance = function () {
              for (var t = d.valueOf(0), e = 0; e < this.unspentOuts.length; e++) {
                var r = this.unspentOuts[e].out;
                t = t.add(s.Util.valueToBigInt(r.value));
              }
              return t;
            }),
            (i.prototype.createSend = function (e, r, i) {
              var n,
                o = [],
                u = r.add(i),
                h = d.ZERO;
              for (
                n = 0;
                n < this.unspentOuts.length &&
                (o.push(this.unspentOuts[n]),
                !(
                  (h = h.add(s.Util.valueToBigInt(this.unspentOuts[n].out.value))).compareTo(u) >= 0
                ));
                n++
              );
              if (h.compareTo(u) < 0) throw new Error('Insufficient funds.');
              var a = h.subtract(u),
                f = new s.Transaction();
              for (n = 0; n < o.length; n++) f.addInput(o[n].tx, o[n].index);
              for (
                f.addOutput(e, r),
                  a.compareTo(d.ZERO) > 0 && f.addOutput(this.getNextAddress(), a),
                  n = 0;
                n < f.ins.length;
                n++
              ) {
                var c = f.hashTransactionForSignature(o[n].out.script, n, 1),
                  p = o[n].out.script.simpleOutPubKeyHash(),
                  l = this.signWithKey(p, c);
                l.push(parseInt(1, 10)),
                  (f.ins[n].script = t.createInputScript(l, this.getPubKeyFromHash(p)));
              }
              return f;
            }),
            (i.prototype.clearTransactions = function () {
              (this.txIndex = {}), (this.unspentOuts = []);
            }),
            (i.prototype.hasHash = function (t) {
              s.Util.isArray(t) && (t = n.util.bytesToBase64(t));
              for (var e = 0; e < this.addressHashes.length; e++)
                if (this.addressHashes[e] === t) return !0;
              return !1;
            }),
            i
          );
        })());
      var Q = function () {
        (this.txs = []), (this.txIndex = {});
      };
      function W(t, e) {
        return 'var ' + t + ' = ' + e + ';';
      }
      Z.augment(Q.prototype),
        (Q.prototype.addTransaction = function (t) {
          this.addTransactionNoUpdate(t), $(this).trigger('update');
        }),
        (Q.prototype.addTransactionNoUpdate = function (t) {
          this.txIndex[t.hash] || (this.txs.push(new s.Transaction(t)), (this.txIndex[t.hash] = t));
        }),
        (Q.prototype.removeTransaction = function (t) {
          this.removeTransactionNoUpdate(t), $(this).trigger('update');
        }),
        (Q.prototype.removeTransactionNoUpdate = function (t) {
          if (this.txIndex[t]) {
            for (var e = 0, r = this.txs.length; e < r; e++)
              if (this.txs[e].hash == t) {
                this.txs.splice(e, 1);
                break;
              }
            delete this.txIndex[t];
          }
        }),
        (Q.prototype.loadTransactions = function (t) {
          for (var e = 0; e < t.length; e++) this.addTransactionNoUpdate(t[e]);
          $(this).trigger('update');
        }),
        (Q.prototype.getTransactions = function () {
          return this.txs;
        }),
        (Q.prototype.clear = function () {
          (this.txs = []), (this.txIndex = {}), $(this).trigger('update');
        });
    },
  },
  e = {};
function r(i) {
  var n = e[i];
  if (void 0 !== n) return n.exports;
  var s = (e[i] = { id: i, loaded: !1, exports: {} });
  return t[i](s, s.exports, r), (s.loaded = !0), s.exports;
}
(r.d = (t, e) => {
  for (var i in e)
    r.o(e, i) && !r.o(t, i) && Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
}),
  (r.hmd = (t) => (
    (t = Object.create(t)).children || (t.children = []),
    Object.defineProperty(t, 'exports', {
      enumerable: !0,
      set: () => {
        throw new Error(
          'ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' +
            t.id
        );
      },
    }),
    t
  )),
  (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
  (r.r = (t) => {
    'undefined' != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
      Object.defineProperty(t, '__esModule', { value: !0 });
  });
var i = {};
function n(t, ...e) {
  if (
    !(
      (r = t) instanceof Uint8Array ||
      (null != r && 'object' == typeof r && 'Uint8Array' === r.constructor.name)
    )
  )
    throw new Error('Uint8Array expected');
  var r;
  if (e.length > 0 && !e.includes(t.length))
    throw new Error(`Uint8Array expected of length ${e}, not of length=${t.length}`);
}
function s(t, e = !0) {
  if (t.destroyed) throw new Error('Hash instance has been destroyed');
  if (e && t.finished) throw new Error('Hash#digest() has already been called');
}
r.r(i), r.d(i, { decode: () => T, decodeRaw: () => B, encode: () => O, encodeRaw: () => b });
const o = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
  u = (t, e) => (t << (32 - e)) | (t >>> e);
function h(t) {
  return (
    'string' == typeof t &&
      (t = (function (t) {
        if ('string' != typeof t) throw new Error('utf8ToBytes expected string, got ' + typeof t);
        return new Uint8Array(new TextEncoder().encode(t));
      })(t)),
    n(t),
    t
  );
}
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
class a {
  clone() {
    return this._cloneInto();
  }
}
function f(t) {
  const e = (e) => t().update(h(e)).digest(),
    r = t();
  return (e.outputLen = r.outputLen), (e.blockLen = r.blockLen), (e.create = () => t()), e;
}
const c = (t, e, r) => (t & e) ^ (t & r) ^ (e & r);
class p extends a {
  constructor(t, e, r, i) {
    super(),
      (this.blockLen = t),
      (this.outputLen = e),
      (this.padOffset = r),
      (this.isLE = i),
      (this.finished = !1),
      (this.length = 0),
      (this.pos = 0),
      (this.destroyed = !1),
      (this.buffer = new Uint8Array(t)),
      (this.view = o(this.buffer));
  }
  update(t) {
    s(this);
    const { view: e, buffer: r, blockLen: i } = this,
      n = (t = h(t)).length;
    for (let s = 0; s < n; ) {
      const u = Math.min(i - this.pos, n - s);
      if (u !== i)
        r.set(t.subarray(s, s + u), this.pos),
          (this.pos += u),
          (s += u),
          this.pos === i && (this.process(e, 0), (this.pos = 0));
      else {
        const e = o(t);
        for (; i <= n - s; s += i) this.process(e, s);
      }
    }
    return (this.length += t.length), this.roundClean(), this;
  }
  digestInto(t) {
    s(this),
      (function (t, e) {
        n(t);
        const r = e.outputLen;
        if (t.length < r)
          throw new Error(`digestInto() expects output buffer of length at least ${r}`);
      })(t, this),
      (this.finished = !0);
    const { buffer: e, view: r, blockLen: i, isLE: u } = this;
    let { pos: h } = this;
    (e[h++] = 128),
      this.buffer.subarray(h).fill(0),
      this.padOffset > i - h && (this.process(r, 0), (h = 0));
    for (let t = h; t < i; t++) e[t] = 0;
    !(function (t, e, r, i) {
      if ('function' == typeof t.setBigUint64) return t.setBigUint64(e, r, i);
      const n = BigInt(32),
        s = BigInt(4294967295),
        o = Number((r >> n) & s),
        u = Number(r & s),
        h = i ? 4 : 0,
        a = i ? 0 : 4;
      t.setUint32(e + h, o, i), t.setUint32(e + a, u, i);
    })(r, i - 8, BigInt(8 * this.length), u),
      this.process(r, 0);
    const a = o(t),
      f = this.outputLen;
    if (f % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
    const c = f / 4,
      p = this.get();
    if (c > p.length) throw new Error('_sha2: outputLen bigger than state');
    for (let t = 0; t < c; t++) a.setUint32(4 * t, p[t], u);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: i, finished: n, destroyed: s, pos: o } = this;
    return (
      (t.length = i), (t.pos = o), (t.finished = n), (t.destroyed = s), i % e && t.buffer.set(r), t
    );
  }
}
const l = new Uint32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221,
    3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580,
    3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
    666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
    2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
    1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
  ]),
  F = new Uint32Array([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225,
  ]),
  y = new Uint32Array(64);
class d extends p {
  constructor() {
    super(64, 32, 8, !1),
      (this.A = 0 | F[0]),
      (this.B = 0 | F[1]),
      (this.C = 0 | F[2]),
      (this.D = 0 | F[3]),
      (this.E = 0 | F[4]),
      (this.F = 0 | F[5]),
      (this.G = 0 | F[6]),
      (this.H = 0 | F[7]);
  }
  get() {
    const { A: t, B: e, C: r, D: i, E: n, F: s, G: o, H: u } = this;
    return [t, e, r, i, n, s, o, u];
  }
  set(t, e, r, i, n, s, o, u) {
    (this.A = 0 | t),
      (this.B = 0 | e),
      (this.C = 0 | r),
      (this.D = 0 | i),
      (this.E = 0 | n),
      (this.F = 0 | s),
      (this.G = 0 | o),
      (this.H = 0 | u);
  }
  process(t, e) {
    for (let r = 0; r < 16; r++, e += 4) y[r] = t.getUint32(e, !1);
    for (let t = 16; t < 64; t++) {
      const e = y[t - 15],
        r = y[t - 2],
        i = u(e, 7) ^ u(e, 18) ^ (e >>> 3),
        n = u(r, 17) ^ u(r, 19) ^ (r >>> 10);
      y[t] = (n + y[t - 7] + i + y[t - 16]) | 0;
    }
    let { A: r, B: i, C: n, D: s, E: o, F: h, G: a, H: f } = this;
    for (let t = 0; t < 64; t++) {
      const e =
          (f + (u(o, 6) ^ u(o, 11) ^ u(o, 25)) + (((p = o) & h) ^ (~p & a)) + l[t] + y[t]) | 0,
        F = ((u(r, 2) ^ u(r, 13) ^ u(r, 22)) + c(r, i, n)) | 0;
      (f = a), (a = h), (h = o), (o = (s + e) | 0), (s = n), (n = i), (i = r), (r = (e + F) | 0);
    }
    var p;
    (r = (r + this.A) | 0),
      (i = (i + this.B) | 0),
      (n = (n + this.C) | 0),
      (s = (s + this.D) | 0),
      (o = (o + this.E) | 0),
      (h = (h + this.F) | 0),
      (a = (a + this.G) | 0),
      (f = (f + this.H) | 0),
      this.set(r, i, n, s, o, h, a, f);
  }
  roundClean() {
    y.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const g = f(() => new d()),
  v = (function (t) {
    if (t.length >= 255) throw new TypeError('Alphabet too long');
    const e = new Uint8Array(256);
    for (let t = 0; t < e.length; t++) e[t] = 255;
    for (let r = 0; r < t.length; r++) {
      const i = t.charAt(r),
        n = i.charCodeAt(0);
      if (255 !== e[n]) throw new TypeError(i + ' is ambiguous');
      e[n] = r;
    }
    const r = t.length,
      i = t.charAt(0),
      n = Math.log(r) / Math.log(256),
      s = Math.log(256) / Math.log(r);
    function o(t) {
      if ('string' != typeof t) throw new TypeError('Expected String');
      if (0 === t.length) return new Uint8Array();
      let s = 0,
        o = 0,
        u = 0;
      for (; t[s] === i; ) o++, s++;
      const h = ((t.length - s) * n + 1) >>> 0,
        a = new Uint8Array(h);
      for (; t[s]; ) {
        let i = e[t.charCodeAt(s)];
        if (255 === i) return;
        let n = 0;
        for (let t = h - 1; (0 !== i || n < u) && -1 !== t; t--, n++)
          (i += (r * a[t]) >>> 0), (a[t] = i % 256 >>> 0), (i = (i / 256) >>> 0);
        if (0 !== i) throw new Error('Non-zero carry');
        (u = n), s++;
      }
      let f = h - u;
      for (; f !== h && 0 === a[f]; ) f++;
      const c = new Uint8Array(o + (h - f));
      let p = o;
      for (; f !== h; ) c[p++] = a[f++];
      return c;
    }
    return {
      encode: function (e) {
        if (
          (e instanceof Uint8Array ||
            (ArrayBuffer.isView(e)
              ? (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength))
              : Array.isArray(e) && (e = Uint8Array.from(e))),
          !(e instanceof Uint8Array))
        )
          throw new TypeError('Expected Uint8Array');
        if (0 === e.length) return '';
        let n = 0,
          o = 0,
          u = 0;
        const h = e.length;
        for (; u !== h && 0 === e[u]; ) u++, n++;
        const a = ((h - u) * s + 1) >>> 0,
          f = new Uint8Array(a);
        for (; u !== h; ) {
          let t = e[u],
            i = 0;
          for (let e = a - 1; (0 !== t || i < o) && -1 !== e; e--, i++)
            (t += (256 * f[e]) >>> 0), (f[e] = t % r >>> 0), (t = (t / r) >>> 0);
          if (0 !== t) throw new Error('Non-zero carry');
          (o = i), u++;
        }
        let c = a - o;
        for (; c !== a && 0 === f[c]; ) c++;
        let p = i.repeat(n);
        for (; c < a; ++c) p += t.charAt(f[c]);
        return p;
      },
      decodeUnsafe: o,
      decode: function (t) {
        const e = o(t);
        if (e) return e;
        throw new Error('Non-base' + r + ' character');
      },
    };
  })('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'),
  m = (function (t) {
    function e(e) {
      var r = e.slice(0, -4),
        i = e.slice(-4),
        n = t(r);
      if (!((i[0] ^ n[0]) | (i[1] ^ n[1]) | (i[2] ^ n[2]) | (i[3] ^ n[3]))) return r;
    }
    return {
      encode: function (e) {
        var r = Uint8Array.from(e),
          i = t(r),
          n = r.length + 4,
          s = new Uint8Array(n);
        return s.set(r, 0), s.set(i.subarray(0, 4), r.length), v.encode(s);
      },
      decode: function (t) {
        var r = e(v.decode(t));
        if (null == r) throw new Error('Invalid checksum');
        return r;
      },
      decodeUnsafe: function (t) {
        var r = v.decodeUnsafe(t);
        if (null != r) return e(r);
      },
    };
  })(function (t) {
    return g(g(t));
  });
function B(t, e) {
  if (void 0 !== e && t[0] !== e) throw new Error('Invalid network version');
  if (33 === t.length) return { version: t[0], privateKey: t.slice(1, 33), compressed: !1 };
  if (34 !== t.length) throw new Error('Invalid WIF length');
  if (1 !== t[33]) throw new Error('Invalid compression flag');
  return { version: t[0], privateKey: t.slice(1, 33), compressed: !0 };
}
function b(t, e, r) {
  if (32 !== e.length) throw new TypeError('Invalid privateKey length');
  var i = new Uint8Array(r ? 34 : 33);
  return new DataView(i.buffer).setUint8(0, t), i.set(e, 1), r && (i[33] = 1), i;
}
function T(t, e) {
  return B(m.decode(t), e);
}
function O(t) {
  return m.encode(b(t.version, t.privateKey, t.compressed));
}
var A = r(519);
function E(t) {
  var e = A.Qr.charenc.UTF8.stringToBytes(t);
  return (function (t) {
    if (t < 253) return [t];
    if (t <= 65535) return [253, 255 & t, t >>> 8];
    if (t <= 4294967295) return [254, 255 & t, (t >>> 8) & 255, (t >>> 16) & 255, t >>> 24];
    throw 'message too large';
  })(e.length).concat(e);
}
function w(t) {
  var e = E('Bitcoin Signed Message:\n').concat(E(t));
  return A.Qr.SHA256(A.Qr.SHA256(e, { asBytes: !0 }), { asBytes: !0 });
}
function P(t, e, r) {
  try {
    var i = A.Qr.util.base64ToBytes(t);
  } catch (t) {
    return !1;
  }
  if (65 != i.length) return !1;
  var n = A.jZ.fromByteArrayUnsigned(i.slice(1, 33)),
    s = A.jZ.fromByteArrayUnsigned(i.slice(33, 65)),
    o = !1,
    u = i[0];
  if (u < 27 || u >= 35) return !1;
  u >= 31 && ((o = !0), (u -= 4));
  var h = A.jZ.valueOf(u - 27),
    a = (0, A.nF)('secp256k1'),
    f = a.getCurve(),
    c = f.getA().toBigInteger(),
    p = f.getB().toBigInteger(),
    l = f.getQ(),
    F = a.getG(),
    y = a.getN(),
    d = n.add(y.multiply(h.divide(A.jZ.valueOf(2)))),
    g = d
      .multiply(d)
      .multiply(d)
      .add(c.multiply(d))
      .add(p)
      .mod(l)
      .modPow(l.add(A.jZ.ONE).divide(A.jZ.valueOf(4)), l),
    v = g.subtract(h).isEven() ? g : l.subtract(g),
    m = new A.rG(f, f.fromBigInteger(d), f.fromBigInteger(v)),
    B = A.jZ.fromByteArrayUnsigned(w(e)).negate().mod(y),
    b = n.modInverse(y),
    T = m.multiply(s).add(F.multiply(B)).multiply(b).getEncoded(o),
    O = new A.Tp.Address(A.Tp.Util.sha256ripe160(T));
  return (O.version = r || 0), O.toString();
}

const sign_message = function (t, e, r, i) {
  if (!t) return !1;
  var n = t.sign(w(e)),
    s = new A.Tp.Address(t.getPubKeyHash());
  s.version = i || 0;
  var o = A.Tp.ECDSA.parseSig(n),
    u = [0];
  u = (u = u.concat(o.r.toByteArrayUnsigned())).concat(o.s.toByteArrayUnsigned());
  for (var h = 0; h < 4; h++) {
    var a = 27 + h;
    r && (a += 4), (u[0] = a);
    var f = A.Qr.util.bytesToBase64(u);
    if (P(f, e, i) == s) return f;
  }
  return !1;
};
const wif = i;
const Bitcoin = s;
const verify_message = P;

export { wif, sign_message, verify_message };
