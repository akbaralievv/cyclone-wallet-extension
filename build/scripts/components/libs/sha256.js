const t =
    (t) =>
    async (r, { outputFormat: e = 'hex' } = {}) => {
      'string' == typeof r && (r = new globalThis.TextEncoder().encode(r));
      const n = await globalThis.crypto.subtle.digest(t, r);
      return 'hex' === e
        ? ((t) => {
            const r = new DataView(t);
            let e = '';
            for (let t = 0; t < r.byteLength; t += 4)
              e += r.getUint32(t).toString(16).padStart(8, '0');
            return e;
          })(n)
        : n;
    },
  r = (t('SHA-1'), t('SHA-256'));
function e(t) {
  return (
    (e =
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
    e(t)
  );
}
function n() {
  n = function () {
    return r;
  };
  var t,
    r = {},
    o = Object.prototype,
    i = o.hasOwnProperty,
    a =
      Object.defineProperty ||
      function (t, r, e) {
        t[r] = e.value;
      },
    c = 'function' == typeof Symbol ? Symbol : {},
    u = c.iterator || '@@iterator',
    f = c.asyncIterator || '@@asyncIterator',
    l = c.toStringTag || '@@toStringTag';
  function h(t, r, e) {
    return (
      Object.defineProperty(t, r, { value: e, enumerable: !0, configurable: !0, writable: !0 }),
      t[r]
    );
  }
  try {
    h({}, '');
  } catch (t) {
    h = function (t, r, e) {
      return (t[r] = e);
    };
  }
  function s(t, r, e, n) {
    var o = r && r.prototype instanceof w ? r : w,
      i = Object.create(o.prototype),
      c = new N(n || []);
    return a(i, '_invoke', { value: k(t, e, c) }), i;
  }
  function p(t, r, e) {
    try {
      return { type: 'normal', arg: t.call(r, e) };
    } catch (t) {
      return { type: 'throw', arg: t };
    }
  }
  r.wrap = s;
  var y = 'suspendedStart',
    v = 'suspendedYield',
    g = 'executing',
    d = 'completed',
    m = {};
  function w() {}
  function b() {}
  function x() {}
  var L = {};
  h(L, u, function () {
    return this;
  });
  var E = Object.getPrototypeOf,
    S = E && E(E(A([])));
  S && S !== o && i.call(S, u) && (L = S);
  var _ = (x.prototype = w.prototype = Object.create(L));
  function O(t) {
    ['next', 'throw', 'return'].forEach(function (r) {
      h(t, r, function (t) {
        return this._invoke(r, t);
      });
    });
  }
  function j(t, r) {
    function n(o, a, c, u) {
      var f = p(t[o], t, a);
      if ('throw' !== f.type) {
        var l = f.arg,
          h = l.value;
        return h && 'object' == e(h) && i.call(h, '__await')
          ? r.resolve(h.__await).then(
              function (t) {
                n('next', t, c, u);
              },
              function (t) {
                n('throw', t, c, u);
              }
            )
          : r.resolve(h).then(
              function (t) {
                (l.value = t), c(l);
              },
              function (t) {
                return n('throw', t, c, u);
              }
            );
      }
      u(f.arg);
    }
    var o;
    a(this, '_invoke', {
      value: function (t, e) {
        function i() {
          return new r(function (r, o) {
            n(t, e, r, o);
          });
        }
        return (o = o ? o.then(i, i) : i());
      },
    });
  }
  function k(r, e, n) {
    var o = y;
    return function (i, a) {
      if (o === g) throw Error('Generator is already running');
      if (o === d) {
        if ('throw' === i) throw a;
        return { value: t, done: !0 };
      }
      for (n.method = i, n.arg = a; ; ) {
        var c = n.delegate;
        if (c) {
          var u = P(c, n);
          if (u) {
            if (u === m) continue;
            return u;
          }
        }
        if ('next' === n.method) n.sent = n._sent = n.arg;
        else if ('throw' === n.method) {
          if (o === y) throw ((o = d), n.arg);
          n.dispatchException(n.arg);
        } else 'return' === n.method && n.abrupt('return', n.arg);
        o = g;
        var f = p(r, e, n);
        if ('normal' === f.type) {
          if (((o = n.done ? d : v), f.arg === m)) continue;
          return { value: f.arg, done: n.done };
        }
        'throw' === f.type && ((o = d), (n.method = 'throw'), (n.arg = f.arg));
      }
    };
  }
  function P(r, e) {
    var n = e.method,
      o = r.iterator[n];
    if (o === t)
      return (
        (e.delegate = null),
        ('throw' === n &&
          r.iterator.return &&
          ((e.method = 'return'), (e.arg = t), P(r, e), 'throw' === e.method)) ||
          ('return' !== n &&
            ((e.method = 'throw'),
            (e.arg = new TypeError("The iterator does not provide a '" + n + "' method")))),
        m
      );
    var i = p(o, r.iterator, e.arg);
    if ('throw' === i.type) return (e.method = 'throw'), (e.arg = i.arg), (e.delegate = null), m;
    var a = i.arg;
    return a
      ? a.done
        ? ((e[r.resultName] = a.value),
          (e.next = r.nextLoc),
          'return' !== e.method && ((e.method = 'next'), (e.arg = t)),
          (e.delegate = null),
          m)
        : a
      : ((e.method = 'throw'),
        (e.arg = new TypeError('iterator result is not an object')),
        (e.delegate = null),
        m);
  }
  function T(t) {
    var r = { tryLoc: t[0] };
    1 in t && (r.catchLoc = t[1]),
      2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
      this.tryEntries.push(r);
  }
  function G(t) {
    var r = t.completion || {};
    (r.type = 'normal'), delete r.arg, (t.completion = r);
  }
  function N(t) {
    (this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(T, this), this.reset(!0);
  }
  function A(r) {
    if (r || '' === r) {
      var n = r[u];
      if (n) return n.call(r);
      if ('function' == typeof r.next) return r;
      if (!isNaN(r.length)) {
        var o = -1,
          a = function e() {
            for (; ++o < r.length; ) if (i.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
            return (e.value = t), (e.done = !0), e;
          };
        return (a.next = a);
      }
    }
    throw new TypeError(e(r) + ' is not iterable');
  }
  return (
    (b.prototype = x),
    a(_, 'constructor', { value: x, configurable: !0 }),
    a(x, 'constructor', { value: b, configurable: !0 }),
    (b.displayName = h(x, l, 'GeneratorFunction')),
    (r.isGeneratorFunction = function (t) {
      var r = 'function' == typeof t && t.constructor;
      return !!r && (r === b || 'GeneratorFunction' === (r.displayName || r.name));
    }),
    (r.mark = function (t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, x)
          : ((t.__proto__ = x), h(t, l, 'GeneratorFunction')),
        (t.prototype = Object.create(_)),
        t
      );
    }),
    (r.awrap = function (t) {
      return { __await: t };
    }),
    O(j.prototype),
    h(j.prototype, f, function () {
      return this;
    }),
    (r.AsyncIterator = j),
    (r.async = function (t, e, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new j(s(t, e, n, o), i);
      return r.isGeneratorFunction(e)
        ? a
        : a.next().then(function (t) {
            return t.done ? t.value : a.next();
          });
    }),
    O(_),
    h(_, l, 'Generator'),
    h(_, u, function () {
      return this;
    }),
    h(_, 'toString', function () {
      return '[object Generator]';
    }),
    (r.keys = function (t) {
      var r = Object(t),
        e = [];
      for (var n in r) e.push(n);
      return (
        e.reverse(),
        function t() {
          for (; e.length; ) {
            var n = e.pop();
            if (n in r) return (t.value = n), (t.done = !1), t;
          }
          return (t.done = !0), t;
        }
      );
    }),
    (r.values = A),
    (N.prototype = {
      constructor: N,
      reset: function (r) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = t),
          (this.done = !1),
          (this.delegate = null),
          (this.method = 'next'),
          (this.arg = t),
          this.tryEntries.forEach(G),
          !r)
        )
          for (var e in this)
            't' === e.charAt(0) && i.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ('throw' === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (r) {
        if (this.done) throw r;
        var e = this;
        function n(n, o) {
          return (
            (c.type = 'throw'),
            (c.arg = r),
            (e.next = n),
            o && ((e.method = 'next'), (e.arg = t)),
            !!o
          );
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var a = this.tryEntries[o],
            c = a.completion;
          if ('root' === a.tryLoc) return n('end');
          if (a.tryLoc <= this.prev) {
            var u = i.call(a, 'catchLoc'),
              f = i.call(a, 'finallyLoc');
            if (u && f) {
              if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
              if (this.prev < a.finallyLoc) return n(a.finallyLoc);
            } else if (u) {
              if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
            } else {
              if (!f) throw Error('try statement without catch or finally');
              if (this.prev < a.finallyLoc) return n(a.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, r) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n.tryLoc <= this.prev && i.call(n, 'finallyLoc') && this.prev < n.finallyLoc) {
            var o = n;
            break;
          }
        }
        o &&
          ('break' === t || 'continue' === t) &&
          o.tryLoc <= r &&
          r <= o.finallyLoc &&
          (o = null);
        var a = o ? o.completion : {};
        return (
          (a.type = t),
          (a.arg = r),
          o ? ((this.method = 'next'), (this.next = o.finallyLoc), m) : this.complete(a)
        );
      },
      complete: function (t, r) {
        if ('throw' === t.type) throw t.arg;
        return (
          'break' === t.type || 'continue' === t.type
            ? (this.next = t.arg)
            : 'return' === t.type
            ? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
            : 'normal' === t.type && r && (this.next = r),
          m
        );
      },
      finish: function (t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var e = this.tryEntries[r];
          if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), G(e), m;
        }
      },
      catch: function (t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var e = this.tryEntries[r];
          if (e.tryLoc === t) {
            var n = e.completion;
            if ('throw' === n.type) {
              var o = n.arg;
              G(e);
            }
            return o;
          }
        }
        throw Error('illegal catch attempt');
      },
      delegateYield: function (r, e, n) {
        return (
          (this.delegate = { iterator: A(r), resultName: e, nextLoc: n }),
          'next' === this.method && (this.arg = t),
          m
        );
      },
    }),
    r
  );
}
function o(t, r, e, n, o, i, a) {
  try {
    var c = t[i](a),
      u = c.value;
  } catch (t) {
    return void e(t);
  }
  c.done ? r(u) : Promise.resolve(u).then(n, o);
}
t('SHA-384'), t('SHA-512');
const sha256 = r;
export { sha256 };
