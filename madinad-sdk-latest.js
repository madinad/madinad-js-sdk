// MadInAd SDK
// V1.2.4

//https://github.com/relay/anim
var anim = function (h) {
    h = function (a, e, f, b) {
        var g, d, c = [], j = function (a) {
            if (a = c.shift())a[1] ? h.apply(this, a).anim(j) : 0 < a[0] ? setTimeout(j, 1E3 * a[0]) : (a[0](), j())
        };
        a.charAt && (a = document.getElementById(a));
        if (0 < a || !a)e = {}, f = 0, j(c = [[a || 0]]);
        q(e, {padding: 0, margin: 0, border: "Width"}, [l, m, n, p]);
        q(e, {borderRadius: "Radius"}, [l + p, l + m, n + m, n + p]);
        ++r;
        for (g in e)d = e[g], !d.to && 0 !== d.to && (d = e[g] = {to: d}), h.defs(d, a, g, b);
        h.iter(e, 1E3 * f, j);
        return {
            anim: function () {
                c.push([].slice.call(arguments));
                return this
            }
        }
    };
    var l = "Top", m = "Right", n = "Bottom", p = "Left", r = 1, q = function (a, e, f, b, g, d, c) {
        for (b in a)if (b in e) {
            c = a[b];
            for (g = 0; d = f[g]; g++)a[b.replace(e[b], "") + d + (e[b] || "")] = {
                to: 0 === c.to ? c.to : c.to || c,
                fr: c.fr,
                e: c.e
            };
            delete a[b]
        }
    }, s = function (w, a) {
        return w["webkitR" + a] || w["mozR" + a] || w["msR" + a] || w["r" + a] || w["oR" + a]
    }(window, "equestAnimationFrame");
    h.defs = function (a, e, f, b, g) {
        g = e.style;
        a.a = f;
        a.n = e;
        a.s = f in g ? g : e;
        a.e = a.e || b;
        a.fr = a.fr || (0 === a.fr ? 0 : a.s == e ? e[f] : (window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle)[f]);
        a.u = (/\d(\D+)$/.exec(a.to) || /\d(\D+)$/.exec(a.fr) || [0, 0])[1];
        a.fn = /color/i.test(f) ? h.fx.color : h.fx[f] || h.fx._;
        a.mx = "anim_" + f;
        e[a.mx] = a.mxv = r;
        e[a.mx] != a.mxv && (a.mxv = null)
    };
    h.iter = function (a, e, f) {
        var b, g, d, c, h, k = +new Date + e;
        b = function (l) {
            g = k - (l || (new Date).getTime());
            if (50 > g) {
                for (d in a)d = a[d], d.p = 1, d.fn(d, d.n, d.to, d.fr, d.a, d.e);
                f && f()
            } else {
                g /= e;
                for (d in a) {
                    d = a[d];
                    if (d.n[d.mx] != d.mxv)return;
                    h = d.e;
                    c = g;
                    "lin" == h ? c = 1 - c : "ease" == h ? (c = 2 * (0.5 - c), c = 1 - (c * c * c - 3 * c + 2) / 4) : "ease-in" == h ? (c = 1 - c, c *= c * c) : c = 1 - c * c * c;
                    d.p = c;
                    d.fn(d, d.n, d.to, d.fr, d.a, d.e)
                }
                s ? s(b) : setTimeout(b, 20, 0)
            }
        };
        b()
    };
    h.fx = {
        _: function (a, e, f, b, g) {
            b = parseFloat(b) || 0;
            f = parseFloat(f) || 0;
            a.s[g] = (1 <= a.p ? f : a.p * (f - b) + b) + a.u
        }, width: function (a, e, f, b, g, d) {
            0 <= a._fr || (a._fr = !isNaN(b = parseFloat(b)) ? b : "width" == g ? e.clientWidth : e.clientHeight);
            h.fx._(a, e, f, a._fr, g, d)
        }, opacity: function (a, e, f, b, g) {
            if (isNaN(b = b || a._fr))b = e.style, b.zoom = 1, b = a._fr = (/alpha\(opacity=(\d+)\b/i.exec(b.filter) || {})[1] / 100 || 1;
            b *= 1;
            f = a.p * (f - b) + b;
            e = e.style;
            g in e ? e[g] = f : e.filter = 1 <= f ? "" : "alpha(" + g + "=" + Math.round(100 * f) + ")"
        }, color: function (a, e, f, b, g, d, c, j) {
            a.ok || (f = a.to = h.toRGBA(f), b = a.fr = h.toRGBA(b), 0 == f[3] && (f = [].concat(b), f[3] = 0), 0 == b[3] && (b = [].concat(f), b[3] = 0), a.ok = 1);
            j = [0, 0, 0, a.p * (f[3] - b[3]) + 1 * b[3]];
            for (c = 2; 0 <= c; c--)j[c] = Math.round(a.p * (f[c] - b[c]) + 1 * b[c]);
            (1 <= j[3] || h.rgbaIE) && j.pop();
            try {
                a.s[g] = (3 < j.length ? "rgba(" : "rgb(") + j.join(",") + ")"
            } catch (k) {
                h.rgbaIE = 1
            }
        }
    };
    h.fx.height = h.fx.width;
    h.RGBA = /#(.)(.)(.)\b|#(..)(..)(..)\b|(\d+)%,(\d+)%,(\d+)%(?:,([\d\.]+))?|(\d+),(\d+),(\d+)(?:,([\d\.]+))?\b/;
    h.toRGBA = function (a, e) {
        e = [0, 0, 0, 0];
        a.replace(/\s/g, "").replace(h.RGBA, function (a, b, g, d, c, h, k, l, m, n, p, q, r, s, t) {
            k = [b + b || c, g + g || h, d + d || k];
            b = [l, m, n];
            for (a = 0; 3 > a; a++)k[a] = parseInt(k[a], 16), b[a] = Math.round(2.55 * b[a]);
            e = [k[0] || b[0] || q || 0, k[1] || b[1] || r || 0, k[2] || b[2] || s || 0, p || t || 1]
        });
        return e
    };
    return h
}();

!function (e, t) {
    typeof module != "undefined" ? module.exports = t() : typeof define == "function" && typeof define.amd == "object" ? define(t) : this[e] = t()
}("domready", function (e) {
    function p(e) {
        h = 1;
        while (e = t.shift())e()
    }

    var t = [], n, r = !1, i = document, s = i.documentElement, o = s.doScroll, u = "DOMContentLoaded", a = "addEventListener", f = "onreadystatechange", l = "readyState", c = o ? /^loaded|^c/ : /^loaded|c/, h = c.test(i[l]);
    return i[a] && i[a](u, n = function () {
        i.removeEventListener(u, n, r), p()
    }, r), o && i.attachEvent(f, n = function () {
        /^c/.test(i[l]) && (i.detachEvent(f, n), p())
    }), e = o ? function (n) {
        self != top ? h ? n() : t.push(n) : function () {
            try {
                s.doScroll("left")
            } catch (t) {
                return setTimeout(function () {
                    e(n)
                }, 50)
            }
            n()
        }()
    } : function (e) {
        h ? e() : t.push(e)
    }
});
/**
 * UAParser.js v0.7.10
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2015 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 & MIT
 */
(function (e, t) {
    "use strict";
    var n = "0.7.10", r = "", i = "?", s = "function", o = "undefined", u = "object", a = "string", f = "major", l = "model", c = "name", h = "type", p = "vendor", d = "version", v = "architecture", m = "console", g = "mobile", y = "tablet", b = "smarttv", w = "wearable", E = "embedded", S = {
        extend: function (e, t) {
            for (var n in t)"browser cpu device engine os".indexOf(n) !== -1 && t[n].length % 2 === 0 && (e[n] = t[n].concat(e[n]));
            return e
        }, has: function (e, t) {
            return typeof e == "string" ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !1
        }, lowerize: function (e) {
            return e.toLowerCase()
        }, major: function (e) {
            return typeof e === a ? e.split(".")[0] : t
        }
    }, x = {
        rgx: function () {
            var e, n = 0, r, i, a, f, l, c, h = arguments;
            while (n < h.length && !l) {
                var p = h[n], d = h[n + 1];
                if (typeof e === o) {
                    e = {};
                    for (a in d)d.hasOwnProperty(a) && (f = d[a], typeof f === u ? e[f[0]] = t : e[f] = t)
                }
                r = i = 0;
                while (r < p.length && !l) {
                    l = p[r++].exec(this.getUA());
                    if (!!l)for (a = 0; a < d.length; a++)c = l[++i], f = d[a], typeof f === u && f.length > 0 ? f.length == 2 ? typeof f[1] == s ? e[f[0]] = f[1].call(this, c) : e[f[0]] = f[1] : f.length == 3 ? typeof f[1] === s && (!f[1].exec || !f[1].test) ? e[f[0]] = c ? f[1].call(this, c, f[2]) : t : e[f[0]] = c ? c.replace(f[1], f[2]) : t : f.length == 4 && (e[f[0]] = c ? f[3].call(this, c.replace(f[1], f[2])) : t) : e[f] = c ? c : t
                }
                n += 2
            }
            return e
        }, str: function (e, n) {
            for (var r in n)if (typeof n[r] === u && n[r].length > 0) {
                for (var s = 0; s < n[r].length; s++)if (S.has(n[r][s], e))return r === i ? t : r
            } else if (S.has(n[r], e))return r === i ? t : r;
            return e
        }
    }, T = {
        browser: {
            oldsafari: {
                version: {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }
            }
        },
        device: {
            amazon: {model: {"Fire Phone": ["SD", "KF"]}},
            sprint: {model: {"Evo Shift 4G": "7373KT"}, vendor: {HTC: "APA", Sprint: "Sprint"}}
        },
        os: {
            windows: {
                version: {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: ["NT 5.1", "NT 5.2"],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: ["NT 6.4", "NT 10.0"],
                    RT: "ARM"
                }
            }
        }
    }, N = {
        browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [c, d], [/\s(opr)\/([\w\.]+)/i], [[c, "Opera"], d], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i], [c, d], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [[c, "IE"], d], [/(edge)\/((\d+)?[\w\.]+)/i], [c, d], [/(yabrowser)\/([\w\.]+)/i], [[c, "Yandex"], d], [/(comodo_dragon)\/([\w\.]+)/i], [[c, /_/g, " "], d], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(qqbrowser)[\/\s]?([\w\.]+)/i], [c, d], [/(uc\s?browser)[\/\s]?([\w\.]+)/i, /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i, /JUC.+(ucweb)[\/\s]?([\w\.]+)/i], [[c, "UCBrowser"], d], [/(dolfin)\/([\w\.]+)/i], [[c, "Dolphin"], d], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[c, "Chrome"], d], [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i], [d, [c, "MIUI Browser"]], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i], [d, [c, "Android Browser"]], [/FBAV\/([\w\.]+);/i], [d, [c, "Facebook"]], [/fxios\/([\w\.-]+)/i], [d, [c, "Firefox"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [d, [c, "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [d, c], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [c, [d, x.str, T.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], [c, d], [/(navigator|netscape)\/([\w\.-]+)/i], [[c, "Netscape"], d], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [c, d]],
        cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[v, "amd64"]], [/(ia32(?=;))/i], [[v, S.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[v, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[v, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[v, /ower/, "", S.lowerize]], [/(sun4\w)[;\)]/i], [[v, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [[v, S.lowerize]]],
        device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [l, p, [h, y]], [/applecoremedia\/[\w\.]+ \((ipad)/], [l, [p, "Apple"], [h, y]], [/(apple\s{0,1}tv)/i], [[l, "Apple TV"], [p, "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [p, l, [h, y]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], [l, [p, "Amazon"], [h, y]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i], [[l, x.str, T.device.amazon.model], [p, "Amazon"], [h, g]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [l, p, [h, g]], [/\((ip[honed|\s\w*]+);/i], [l, [p, "Apple"], [h, g]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [p, l, [h, g]], [/\(bb10;\s(\w+)/i], [l, [p, "BlackBerry"], [h, g]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i], [l, [p, "Asus"], [h, y]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[p, "Sony"], [l, "Xperia Tablet"], [h, y]], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i], [[p, "Sony"], [l, "Xperia Phone"], [h, g]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [p, l, [h, m]], [/android.+;\s(shield)\sbuild/i], [l, [p, "Nvidia"], [h, m]], [/(playstation\s[34portablevi]+)/i], [l, [p, "Sony"], [h, m]], [/(sprint\s(\w+))/i], [[p, x.str, T.device.sprint.vendor], [l, x.str, T.device.sprint.model], [h, g]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [p, l, [h, y]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [p, [l, /_/g, " "], [h, g]], [/(nexus\s9)/i], [l, [p, "HTC"], [h, y]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [l, [p, "Microsoft"], [h, m]], [/(kin\.[onetw]{3})/i], [[l, /\./g, " "], [p, "Microsoft"], [h, g]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s[6])/i], [l, [p, "Motorola"], [h, g]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [l, [p, "Motorola"], [h, y]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[p, "Samsung"], l, [h, y]], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[p, "Samsung"], l, [h, g]], [/(samsung);smarttv/i], [p, l, [h, b]], [/\(dtv[\);].+(aquos)/i], [l, [p, "Sharp"], [h, b]], [/sie-(\w+)*/i], [l, [p, "Siemens"], [h, g]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[p, "Nokia"], l, [h, g]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], [l, [p, "Acer"], [h, y]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[p, "LG"], l, [h, y]], [/(lg) netcast\.tv/i], [p, l, [h, b]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i], [l, [p, "LG"], [h, g]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [l, [p, "Lenovo"], [h, y]], [/linux;.+((jolla));/i], [p, l, [h, g]], [/((pebble))app\/[\d\.]+\s/i], [p, l, [h, w]], [/android.+;\s(glass)\s\d/i], [l, [p, "Google"], [h, w]], [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i], [[l, /_/g, " "], [p, "Xiaomi"], [h, g]], [/\s(tablet)[;\/\s]/i, /\s(mobile)[;\/\s]/i], [[h, S.lowerize], p, l]],
        engine: [[/windows.+\sedge\/([\w\.]+)/i], [d, [c, "EdgeHTML"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [c, d], [/rv\:([\w\.]+).*(gecko)/i], [d, c]],
        os: [[/microsoft\s(windows)\s(vista|xp)/i], [c, d], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [c, [d, x.str, T.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[c, "Windows"], [d, x.str, T.os.windows.version]], [/\((bb)(10);/i], [[c, "BlackBerry"], d], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i], [c, d], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[c, "Symbian"], d], [/\((series40);/i], [c], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[c, "Firefox OS"], d], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [c, d], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[c, "Chromium OS"], d], [/(sunos)\s?([\w\.]+\d)*/i], [[c, "Solaris"], d], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [c, d], [/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i], [[c, "iOS"], [d, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i], [[c, "Mac OS"], [d, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i], [c, d]]
    }, C = function (t, n) {
        if (this instanceof C) {
            var i = t || (e && e.navigator && e.navigator.userAgent ? e.navigator.userAgent : r), s = n ? S.extend(N, n) : N;
            return this.getBrowser = function () {
                var e = x.rgx.apply(this, s.browser);
                return e.major = S.major(e.version), e
            }, this.getCPU = function () {
                return x.rgx.apply(this, s.cpu)
            }, this.getDevice = function () {
                return x.rgx.apply(this, s.device)
            }, this.getEngine = function () {
                return x.rgx.apply(this, s.engine)
            }, this.getOS = function () {
                return x.rgx.apply(this, s.os)
            }, this.getResult = function () {
                return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU()
                }
            }, this.getUA = function () {
                return i
            }, this.setUA = function (e) {
                return i = e, this
            }, this.setUA(i), this
        }
        return (new C(t, n)).getResult()
    };
    C.VERSION = n, C.BROWSER = {NAME: c, MAJOR: f, VERSION: d}, C.CPU = {ARCHITECTURE: v}, C.DEVICE = {
        MODEL: l,
        VENDOR: p,
        TYPE: h,
        CONSOLE: m,
        MOBILE: g,
        SMARTTV: b,
        TABLET: y,
        WEARABLE: w,
        EMBEDDED: E
    }, C.ENGINE = {NAME: c, VERSION: d}, C.OS = {
        NAME: c,
        VERSION: d
    }, typeof exports !== o ? (typeof module !== o && module.exports && (exports = module.exports = C), exports.UAParser = C) : typeof define === s && define.amd ? define(function () {
        return C
    }) : e.UAParser = C;
    var k = e.jQuery || e.Zepto;
    if (typeof k !== o) {
        var L = new C;
        k.ua = L.getResult(), k.ua.get = function () {
            return L.getUA()
        }, k.ua.set = function (e) {
            L.setUA(e);
            var t = L.getResult();
            for (var n in t)k.ua[n] = t[n]
        }
    }
})(typeof window == "object" ? window : this);

// Ifvisible
(function(){!function(a,b){return"function"==typeof define&&define.amd?define(function(){return b()}):"object"==typeof exports?module.exports=b():a.ifvisible=b()}(this,function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;return i={},c=document,k=!1,l="active",g=6e4,f=!1,b=function(){var a,b,c,d,e,f,g;return a=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},e=function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()},f={},c="__ceGUID",b=function(a,b,d){return a[c]=void 0,a[c]||(a[c]="ifvisible.object.event.identifier"),f[a[c]]||(f[a[c]]={}),f[a[c]][b]||(f[a[c]][b]=[]),f[a[c]][b].push(d)},d=function(a,b,d){var e,g,h,i,j;if(a[c]&&f[a[c]]&&f[a[c]][b]){for(i=f[a[c]][b],j=[],g=0,h=i.length;g<h;g++)e=i[g],j.push(e(d||{}));return j}},g=function(a,b,d){var e,g,h,i,j;if(d){if(a[c]&&f[a[c]]&&f[a[c]][b])for(j=f[a[c]][b],g=h=0,i=j.length;h<i;g=++h)if(e=j[g],e===d)return f[a[c]][b].splice(g,1),e}else if(a[c]&&f[a[c]]&&f[a[c]][b])return delete f[a[c]][b]},{add:b,remove:g,fire:d}}(),a=function(){var a;return a=!1,function(b,c,d){return a||(a=b.addEventListener?function(a,b,c){return a.addEventListener(b,c,!1)}:b.attachEvent?function(a,b,c){return a.attachEvent("on"+b,c,!1)}:function(a,b,c){return a["on"+b]=c}),a(b,c,d)}}(),d=function(a,b){var d;return c.createEventObject?a.fireEvent("on"+b,d):(d=c.createEvent("HTMLEvents"),d.initEvent(b,!0,!0),!a.dispatchEvent(d))},h=function(){var a,b,d,e,f;for(e=void 0,f=3,d=c.createElement("div"),a=d.getElementsByTagName("i"),b=function(){return d.innerHTML="<!--[if gt IE "+ ++f+"]><i></i><![endif]-->",a[0]};b(););return f>4?f:e}(),e=!1,n=void 0,"undefined"!=typeof c.hidden?(e="hidden",n="visibilitychange"):"undefined"!=typeof c.mozHidden?(e="mozHidden",n="mozvisibilitychange"):"undefined"!=typeof c.msHidden?(e="msHidden",n="msvisibilitychange"):"undefined"!=typeof c.webkitHidden&&(e="webkitHidden",n="webkitvisibilitychange"),m=function(){var b,d;return b=[],d=function(){return b.map(clearTimeout),"active"!==l&&i.wakeup(),f=+new Date,b.push(setTimeout(function(){if("active"===l)return i.idle()},g))},d(),a(c,"mousemove",d),a(c,"keyup",d),a(c,"touchstart",d),a(window,"scroll",d),i.focus(d),i.wakeup(d)},j=function(){var b;return!!k||(e===!1?(b="blur",h<9&&(b="focusout"),a(window,b,function(){return i.blur()}),a(window,"focus",function(){return i.focus()})):a(c,n,function(){return c[e]?i.blur():i.focus()},!1),k=!0,m())},i={setIdleDuration:function(a){return g=1e3*a},getIdleDuration:function(){return g},getIdleInfo:function(){var a,b;return a=+new Date,b={},"idle"===l?(b.isIdle=!0,b.idleFor=a-f,b.timeLeft=0,b.timeLeftPer=100):(b.isIdle=!1,b.idleFor=a-f,b.timeLeft=f+g-a,b.timeLeftPer=(100-100*b.timeLeft/g).toFixed(2)),b},focus:function(a){return"function"==typeof a?this.on("focus",a):(l="active",b.fire(this,"focus"),b.fire(this,"wakeup"),b.fire(this,"statusChanged",{status:l})),this},blur:function(a){return"function"==typeof a?this.on("blur",a):(l="hidden",b.fire(this,"blur"),b.fire(this,"idle"),b.fire(this,"statusChanged",{status:l})),this},idle:function(a){return"function"==typeof a?this.on("idle",a):(l="idle",b.fire(this,"idle"),b.fire(this,"statusChanged",{status:l})),this},wakeup:function(a){return"function"==typeof a?this.on("wakeup",a):(l="active",b.fire(this,"wakeup"),b.fire(this,"statusChanged",{status:l})),this},on:function(a,c){return j(),b.add(this,a,c),this},off:function(a,c){return j(),b.remove(this,a,c),this},onEvery:function(a,b){var c,d;return j(),c=!1,b&&(d=setInterval(function(){if("active"===l&&c===!1)return b()},1e3*a)),{stop:function(){return clearInterval(d)},pause:function(){return c=!0},resume:function(){return c=!1},code:d,callback:b}},now:function(a){return j(),l===(a||"active")}}})}).call(this);
// Timeme.js
(function(){!function(e,t){return"undefined"!=typeof module&&module.exports?module.exports=t(require("ifvisible.js")):"function"==typeof define&&define.amd?void define(["ifvisible"],function(i){return e.TimeMe=t(i)}):e.TimeMe=t(e.ifvisible)}(this,function(e){var t={startStopTimes:{},idleTimeout:60,currentPageName:"default-page-name",getIfVisibleHandle:function(){if("object"==typeof e)return e;throw"undefined"!=typeof console&&console.log("Required dependency (ifvisible.js) not found.  Make sure it has been included."),{name:"MissingDependencyException",message:"Required dependency (ifvisible.js) not found.  Make sure it has been included."}},startTimer:function(){var e=t.currentPageName;if(void 0===t.startStopTimes[e])t.startStopTimes[e]=[];else{var i=t.startStopTimes[e],n=i[i.length-1];if(void 0!==n&&void 0===n.stopTime)return}t.startStopTimes[e].push({startTime:new Date,stopTime:void 0})},stopTimer:function(){var e=t.currentPageName,i=t.startStopTimes[e];void 0!==i&&0!==i.length&&void 0===i[i.length-1].stopTime&&(i[i.length-1].stopTime=new Date)},getTimeOnCurrentPageInSeconds:function(){return t.getTimeOnPageInSeconds(t.currentPageName)},getTimeOnPageInSeconds:function(e){var i=0,n=t.startStopTimes[e];if(void 0!==n){for(var o=0,r=0;r<n.length;r++){var s=n[r].startTime,a=n[r].stopTime;void 0===a&&(a=new Date);var d=a-s;o+=d/1e3}return i=Number(o)}},getTimeOnAllPagesInSeconds:function(){for(var e=[],i=Object.keys(t.startStopTimes),n=0;n<i.length;n++){var o=i[n],r=t.getTimeOnPageInSeconds(o);e.push({pageName:o,timeOnPage:r})}return e},setIdleDurationInSeconds:function(e){var i=parseFloat(e);if(isNaN(i)!==!1)throw{name:"InvalidDurationException",message:"An invalid duration time ("+e+") was provided."};t.getIfVisibleHandle().setIdleDuration(i),t.idleTimeout=i},setCurrentPageName:function(e){t.currentPageName=e},resetRecordedPageTime:function(e){delete t.startStopTimes[e]},resetAllRecordedPageTimes:function(){for(var e=Object.keys(t.startStopTimes),i=0;i<e.length;i++)t.resetRecordedPageTime(e[i])},listenForVisibilityEvents:function(){t.getIfVisibleHandle().on("blur",function(){t.stopTimer()}),t.getIfVisibleHandle().on("focus",function(){t.startTimer()}),t.getIfVisibleHandle().on("idle",function(){t.idleTimeout>0&&t.stopTimer()}),t.getIfVisibleHandle().on("wakeup",function(){t.idleTimeout>0&&t.startTimer()})},initialize:function(){t.listenForVisibilityEvents(),t.startTimer()}};return t})}).call(this);


var madinadSDK = {
    EVENTS: {
        interstitialClosed: 'interstitial_closed',
        bannerClicked: 'bannerClicked'
    },

    properties: {
        "_base_url": "https://ads.madinad.com", // production

        "app_uuid": "app_uuid", // will be updated with application id
        "find_position": false,
        "polling_interval": 30000,
        "cookie_lifetime": 1, // cookie lifetime defaults to 1 (days)
        "require_fc": true, // required fc=1 for request

        "_api_endpoint": "/api/campaigns/",
        "_sessions_endpoint": "/api/session/",
        // todo: deprecated
        // "_assets_endpoint": "https://madinad-prod.s3.amazonaws.com/campaign_assets/" // s3 bucket
    },

    addEventListener: function (name, callback) {
        if (!this._events) {
            this._events = {};
        }
        if (!this._events[name]) {
            this._events[name] = [];
        }

        this._events[name].push(callback);
    },

    fireEvent: function (name) {
        var callbacks,
            i;

        if (!this._events || !this._events[name]) {
            return;
        }

        callbacks = this._events[name];

        for (i = 0; i < callbacks.length; i++) {
            callbacks[i]();
        }
    },

    buildBannerSource: function (base_url, campaign) {
        return base_url + campaign.cid + '/banner.jpg';
    },

    buildInboxSource: function (base_url, campaign) {
        return base_url + campaign.cid + '/bubble.jpg';
    },

    getCampaign: function (campaigns) {
        var campaign, i;
        for (i = 0; i < campaigns.length; i++) {
            if (campaigns[i].fc) {
                if (madinadSDK.get_cookie('viewed_' + campaigns[i].cid) !== '1') {
                    campaign = campaigns[i];
                    break;
                }
            } else {
                campaign = campaigns[i];
                break;
            }
        }
        return campaign;
    },

    getCampaignType: function (campaign) {
        // campaign types:
        // 1. simple banner
        // 2. full page interstitial
        // 3. full-page interstitial + banner (fulltobanner)
        // 4. half-page interstitial
        // 5. carousel full page interstitial
        // 6. expandable banner
        // 7. expandable inbox
        // 8. mobile parallax
        // 9. in-article

        var type;
        switch (campaign.adf) {
            case 'B':
                type = 1;
                break;
            case 'FP':
                type = 2;
                break;
            case 'F2B':
                type = 3;
                break;
            case 'HP':
                type = 4;
                break;
            case 'CRL':
                type = 5;
                break;
            case 'EXB':
                type = 6;
                break;
            case 'EIB':
                type = 7;
                break;
            case 'MPLX':
                type = 8;
                break;
            case 'IARL':
                type = 9;
                break;
        }
        return type;
    },

    setViewedCampaign: function (campaign) {
        madinadSDK.set_cookie('viewed_' + campaign.cid, '1');
    },

    preloadBanner: function (source) {
        (new Image).src = source;
    },

    loaded: function () {
        madinadSDK.inbox_btn_visible = false;
        madinadSDK.interstitial_viewd = false;

        TimeMe.setIdleDurationInSeconds(30);
        TimeMe.setCurrentPageName("my-home-page");
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var ss = scripts[i].src;
            if (ss && ((ss.indexOf("madinadsdk") != -1) || (ss.indexOf("websdk") != -1))) {
                if (ss.indexOf("&fp=") == -1) {
                    madinadSDK.properties.app_uuid = ss.substring(ss.indexOf("?a=") + 3, ss.length);
                } else {
                    madinadSDK.properties.app_uuid = ss.substring(ss.indexOf("?a=") + 3, ss.indexOf("&fp="));
                }

                madinadSDK.properties.find_position = ss.substring(ss.indexOf("&fp=") + 4, ss.length);
                madinadSDK.properties.find_position = (madinadSDK.properties.find_position == "true");
            }
        }
        var check_pos = false;
        if (this.properties.find_position && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                check_pos = true;
                madinadSDK.coords = position.coords || position.coordinate || position;
                madinadSDK.communicate();
            }, function () {
                check_pos = true;
                madinadSDK.communicate();
            }, {timeout: 8000});
        } else {
            check_pos = true;
            this.communicate();
        }

        if (check_pos == false) { //if everything fails end up here
            madinadSDK.communicate();
        }

        /// ga - madinad traffic
        //  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        //  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        //  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        //  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        //
        //  ga('create', 'UA-78714241-1', 'auto');
        //  ga('send', 'pageview');

    },

    communicate: function () {
        this.set_user_info();
        var url = madinadSDK.properties._base_url + madinadSDK.properties._api_endpoint + madinadSDK.properties.app_uuid + "/?madinad_ctx=" + encodeURI(JSON.stringify(madinadSDK.user_info));
        url += "&callback=madinadSDK.main_callback";
        madinadSDK.jsonp(url);
        // madinadSDK.interv = setInterval(function () {
        //     madinadSDK.jsonp(url);
        // }, madinadSDK.properties.polling_interval);
    },

    jsonp: function (url) {
        var head = document.head;
        var script = document.createElement("script");
        script.setAttribute("src", url);
        head.appendChild(script);
        head.removeChild(script);
    },

    main_callback: function (campaigns_data) {
        var currentCampaign = madinadSDK.getCampaign(campaigns_data.c),
            campaignType;

        if (!currentCampaign) {
            clearInterval(madinadSDK.interv);
            return;
        }

        madinadSDK.campaigns_data = campaigns_data;
        madinadSDK.properties.cookie_lifetime = currentCampaign.c_lifetime || 1;

        if (!currentCampaign.fc) {
            madinadSDK.properties.require_fc = false;
        }

        campaignType = madinadSDK.getCampaignType(currentCampaign);

        switch (campaignType) {
            case 1: // simple banner
                clearInterval(madinadSDK.interv);
                madinadSDK.render_banner(currentCampaign, campaigns_data.url);
                TimeMe.initialize();
                break;
            case 2: // full-page interstitial
                clearInterval(madinadSDK.interv);
                madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType);
                TimeMe.initialize();
                if (madinadSDK.properties.require_fc) {
                    madinadSDK.setViewedCampaign(currentCampaign);
                }
                break;
            case 3: // full-page interstitial + banner
                madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType);
                madinadSDK.preloadBanner(madinadSDK.buildBannerSource(campaigns_data.url, currentCampaign));
                TimeMe.initialize();
                madinadSDK.addEventListener(madinadSDK.EVENTS.interstitialClosed, function () {
                    madinadSDK.render_banner(currentCampaign, campaigns_data.url);
                });
                if (madinadSDK.properties.require_fc) {
                    madinadSDK.setViewedCampaign(currentCampaign);
                }
                break;
            case 4: // half-page interstitial
                madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType);
                TimeMe.initialize();
                if (madinadSDK.properties.require_fc) {
                    madinadSDK.setViewedCampaign(currentCampaign);
                }
                break;
            case 5:
                // carousel
                clearInterval(madinadSDK.interv);
                madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType);
                TimeMe.initialize();
                if (madinadSDK.properties.require_fc) {
                    madinadSDK.setViewedCampaign(currentCampaign);
                }
                break;
            case 6:
                // Expandable
                clearInterval(madinadSDK.interv);
                madinadSDK.render_banner(currentCampaign, campaigns_data.url);
                var banner = document.getElementById("madinad_banner");
                banner.innerHTML = '<img id="madinad_banner_image" style="height: 100%;" src="' + madinadSDK.buildBannerSource(campaigns_data.url, currentCampaign) + '" />';
                banner.onclick = function () {
                  banner.style.display = "none";
                  if (!document.getElementById("madinad_modal")) {
                    madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType, true);
                    var close_btn = document.getElementById("close_modal");
                    close_btn.onclick = function () {
                        document.getElementById("madinad_modal").style.display = "none";
                        banner.style.display = "block";
                    };
                  } else {
                    document.getElementById("madinad_modal").style.display = "block";
                  }
                };
                break;
            case 7:
                // Expandable Inbox
                clearInterval(madinadSDK.interv);
                madinadSDK.render_inbox(currentCampaign, campaigns_data.url);
                var inbox = document.getElementById("madinad_inbox");
                inbox.innerHTML = '<img id="madinad_banner_image" style="height: 100%; border-radius:50%;" src="' + madinadSDK.buildInboxSource(campaigns_data.url, currentCampaign) + '" />';
                inbox.onclick = function () {
                  inbox.style.display = "none";
                  if (!document.getElementById("madinad_modal")) {
                    madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType, true);
                    var close_btn = document.getElementById("close_modal");
                    close_btn.onclick = function () {
                        document.getElementById("madinad_modal").style.display = "none";
                        inbox.style.display = "block";
                    };
                  } else {
                    document.getElementById("madinad_modal").style.display = "block";
                  }
                };
                break;
             case 8:
                 // mobile parallax
                  clearInterval(madinadSDK.interv);
                  madinadSDK.render_parallax(currentCampaign);
                break;
             case 9:
                 // in-article
                  clearInterval(madinadSDK.interv);
                  madinadSDK.render_inarticle(currentCampaign);
                break;
        }
    },

    render_parallax: function (campaign) {
      var parallaxNode = document.getElementById('madinad_parallax'),
          destinationURL = campaign.url;

      var css = '#madinad_parallax{width:100%;height:150px;position:relative;margin-top:17px;margin-bottom:5px;margin-left:auto;margin-right:auto;border-bottom:2px solid #000000;background-color:#000000;}' +
      '#madinad_divabs{width:100%;height:100%;position:absolute;top:0;left:0;clip:rect(auto,auto,auto,auto);}' +
      '#madinad_destination{z-index:11;width:100%;height:100%;position:absolute;top:0;left:0;display:block;cursor:pointer;background-color:white;opacity:0;filter:alpha(opacity=0);}' +
      '#madinad_divfix{width:398px;height:100%;position:fixed;top:0px;-moz-transform:translateZ(0);-webkit-transform:translateZ(0);-ms-transform:translateZ(0);-o-transform:translateZ(0);transform:translateZ(0);margin:0 auto;}' +
      '#madinad_image{width:100%;height:905px;border:none;position:absolute;bottom:0;left:0;-moz-transform:translateZ(0);-webkit-transform:translateZ(0);-ms-transform:translateZ(0);-o-transform:translateZ(0);transform:translateZ(0); top: -89px;}' +
      '#madinad_addiv{position:absolute;left:0;bottom:150px;width:100%;text-align:center;font-family: Arial,sans-serif;background-color:#000000;font-size:12px;color:#ffffff}',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      head.appendChild(style);

      if (parallaxNode != null) {
          madinadSDK._remove_node('madinad_parallax');
      }
      parallaxNode = document.createElement('div');
      parallaxNode.id = 'madinad_parallax';

      parallaxNode.innerHTML = '<div id="madinad_divabs">' +
          '<div id="madinad_divfix">' +
              '<img id="madinad_image" src="' + campaign.image + '">' +
          '</div>' +
      '</div>' +
      '<a id="madinad_destination" href="' + destinationURL + '" target="_blank"></a>' +
      '<span id="madinad_addiv">Madinad Advertisement</span>';

      document.body.appendChild(parallaxNode);
    },

    render_inarticle: function(campaign) {
      var inarticleNode = document.getElementById('madinad_advertisement'),
          destinationURL = campaign.url;

      var css = '#madinad_advertisement { display: block; box-sizing: border-box; border: 2px solid black; }'
      	+ '#madinad_advertisement span { display: block; color: white; text-align: center; width: 100%; background-color: black; }'
      	+ '#madinad_advertisement a { display: block; width: 100%;}'
      	+ '#madinad_advertisement img {width:100%;height:100%;}',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      head.appendChild(style);

      if (inarticleNode != null) {
          madinadSDK._remove_node('madinad_advertisement');
      }
      inarticleNode = document.createElement('div');
      inarticleNode.id = 'madinad_advertisement';

      inarticleNode.innerHTML = '<span>Madinad Advertisement</span>'
      	+ '<a href="' + destinationURL + '">'
      	+	'<img src="' + campaign.image + '">'
      	+ '</a>';

      document.body.appendChild(inarticleNode);
    },

    render_inbox: function (campaign) {
        var inbox,
            inboxNode = document.getElementById('madinad_inbox'),
            destinationURL = campaign.url;

        if (inboxNode != null) {
            madinadSDK._remove_node('madinad_inbox');
        }

        inboxNode = document.createElement('div');
        inboxNode.id = 'madinad_inbox';
        inboxNode.style.position = 'fixed';
        inboxNode.style.top = '40px';
        inboxNode.style.right = '-5px';
        inboxNode.style.opacity = 1;
        inboxNode.style.height = '50px';
        inboxNode.style.width = '50px';
        inboxNode.style.borderRadius = '50%';
        inboxNode.style.maxWidth = '50px';
        inboxNode.style.textAlign = 'center';
        inboxNode.style.zIndex = '10000000';
        inboxNode.style.backgroundColor = 'transparent';
        document.body.appendChild(inboxNode);

        madinadSDK.post_display_analytics(false);
        // setTimeout(function () {
        //     var node = document.getElementById('madinad_banner_image');
        //     document.body.style.marginBottom = node.height + 'px';
        // });
    },

    render_banner: function (campaign, base_url) {
        var banner,
            bannerNode = document.getElementById('madinad_banner'),
            destinationURL = campaign.url,
            imageSource = madinadSDK.buildBannerSource(base_url, campaign)
            ;

        if (bannerNode != null) {
            madinadSDK._remove_node('madinad_banner');
        }

        bannerNode = document.createElement('div');
        bannerNode.innerHTML = '<a href="' + destinationURL + '" target="_blank">' +
            '<img id="madinad_banner_image" style="height: 100%;" src="' + imageSource + '" />' +
            '</a>'
        ;
        bannerNode.id = 'madinad_banner';
        bannerNode.style.position = 'fixed';
        bannerNode.style.bottom = '0px';
        bannerNode.style.left = '0px';
        bannerNode.style.opacity = 1;
        bannerNode.style.height = '12%';
        bannerNode.style.width = '100%';
        bannerNode.style.maxWidth = '100%';
        bannerNode.style.textAlign = 'center';
        bannerNode.style.zIndex = '10000000';
        bannerNode.style.backgroundColor = 'rgba(211, 211, 211, 0.8)';
        document.body.appendChild(bannerNode);

        setTimeout(function () {
            var node = document.getElementById('madinad_banner_image');
            document.body.style.marginBottom = node.height + 'px';
        });
        madinadSDK.post_display_analytics(false);
    },

    render_interstitial: function (campaign_data, base_url, campaign_type, is_secondary) {
        var c = campaign_data;
        var modal_tmp = document.getElementById("madinad_modal");
        if (modal_tmp != null) { // if a modal exists remove it to show the other one
            madinadSDK._remove_node("madinad_modal");
        }
        madinadSDK.create_modal(
            c.cid,
            base_url + c.cid + "/index.html",
            campaign_type,
            campaign_data.custom_close_btn,
            c.auto_close_timeout
        );

        madinadSDK.post_display_analytics(is_secondary);
    },

    post_display_analytics: function (is_secondary) {
        var data = [];
        var campaigns = madinadSDK.campaigns_data.c;
        for (var i = 0; i < campaigns.length; i++) {
            data[i] = {
                "cid": campaigns[i].cid
            };
            if (is_secondary) {
              data[i]["type"] = "secondary";
            }
        }
        var url = madinadSDK.properties._base_url + madinadSDK.properties._sessions_endpoint +
            this.user_info.app_uuid + "/?data=" +
            encodeURI(JSON.stringify(data)) + '&callback=madinadSDK.analytics_callback';
        madinadSDK.jsonp(url);
    },

    jsonObjToParams: function (json) {
        // http://stackoverflow.com/questions/14525178/is-there-any-native-function-to-convert-json-to-url-parameters
        return '?' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    },

    addTrackingImg: function () {
        // experimental
        var img = document.createElement("img");
        var req_args = this.jsonObjToParams(this.user_info);
        img.src = "will be given" + url_params;
        img.width = 1;
        img.height = 1;
        document.getElementsByTagName("body")[0].appendChild(img);
    },

    send_device_details: function() {
        // todo: place in here device profiling code
    },



    _remove_node: function (id) {
        if (document.getElementById(id))
            document.getElementById(id).parentNode.removeChild(document.getElementById(id));
    },

    create_modal: function (cid, url, campaign_type, custom_close_btn, auto_close) {
        var url_ref = url + '?r=' + madinadSDK.properties.app_uuid;
        var modal = document.createElement("div");
        if (!custom_close_btn) {
            modal.innerHTML = '<div id="close_modal" style="min-width: 10%; min-height: 10%; z-index:1000; position:absolute; top:0; right:0; cursor:pointer;">' +
                '<img style="width: 100%;" src="https://madinad-prod.s3.amazonaws.com/static/img/close.png" />' +
                '</div>' +
                '<div style="position:relative; height:100%; margin-left:auto; margin-right:auto; overflow:auto; -webkit-overflow-scrolling:touch;">' +
                '<iframe id="modal_iframe" src="' + url_ref + '" style="border: none; border-radius: 5px; overflow:auto; -webkit-overflow-scrolling:touch; display: block; margin-left: auto; margin-right: auto;" width="100%" height="100%"></iframe>' +
                '</div>';
        } else {
            modal.innerHTML = '<div id="close_modal" style="min-width: 10%; min-height: 10%; z-index:1000; position:absolute; top:0; right:0; cursor:pointer;">' +
                '<img style="width: 100%;" src="https://madinad-prod.s3.amazonaws.com/campaign_assets/' + cid + '/close.png" />' +
                '</div>' +
                '<div style="position:relative; height:100%; margin-left:auto; margin-right:auto; overflow:auto; -webkit-overflow-scrolling:touch;">' +
                '<iframe id="modal_iframe" src="' + url_ref + '" style="border: none; border-radius: 5px; overflow:auto; -webkit-overflow-scrolling:touch; display: block; margin-left: auto; margin-right: auto;" width="100%" height="100%"></iframe>' +
                '</div>';
        }
        modal.id = "madinad_modal";
        modal.style.position = "fixed";
        modal.style.top = "0px";
        modal.style.left = "0px";
        modal.style.opacity = 1;
        modal.style.width = "100%";
        modal.style.height = "100%";
        // modal.style.height = (campaign_type == 4) ? "50%" : "100%";
        modal.style.maxHeight = "100%";
        modal.style.zIndex = "10000000";
        modal.style.backgroundColor = "transparent";
        document.getElementsByTagName("body")[0].appendChild(modal);
        // window.location = dest_url;

        var close_btn = document.getElementById("close_modal");
        if (auto_close) {
            var time_in_mil = auto_close * 1000;
            setTimeout(function () {   //calls click event after a certain time
                document.getElementById("madinad_modal").remove();
            }, time_in_mil);
        }
        close_btn.onclick = function () {
            this.parentNode.parentNode.removeChild(modal);
            madinadSDK.fireEvent(madinadSDK.EVENTS.interstitialClosed);
        };
    },

    findGeo: function () {
        if (!navigator.geolocation) {
            return;
        }

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            return {
                "latitude": latitude,
                "longitude": longitude
            };
        }

        function error() {
            return "error";
        }

        navigator.geolocation.getCurrentPosition(success, error);
    },

    set_user_info: function () {
      var parser = new UAParser();
      var device = parser.getDevice();
      var browser = parser.getBrowser();
      var user_location = madinadSDK.findGeo();
      var os = parser.getOS();
      if ((this.properties.find_position) && (typeof this.coords !== 'undefined')) {
          // user_lat = this.coords.latitude;
          // user_lng = this.coords.longitude;
          user_lat = user_location["latitude"];
          user_lng = user_location["longitude"];
      }
      else if ((this.properties.find_position) && (typeof this.coords === 'undefined')) {
          user_lat = "unknown";
          user_lng = "unknown";
      }
      else {
          user_lat = "user_position/false";
          user_lng = "user_position/false";
      }
      this.user_info = {
          "app_uuid": madinadSDK.properties.app_uuid,
          "device": (device.vendor + " " + device.model).toLowerCase(),
          "device_type": device.type,
          "device_os": (os.name).toLowerCase(),
          "device_os_version": os.version,
          "device_browser": (browser.name).toLowerCase(),
          "screen_width": window.screen.width,
          "screen_height": window.screen.height,
          "redirect_url": document.referrer,
          "latitude": user_lat,
          "longitude": user_lng
      }
    },

    set_cookie: function (name, value, exp_days) {
        var lifetime = exp_days || madinadSDK.properties.cookie_lifetime;
        var exp_date = new Date();
        exp_date.setDate(exp_date.getDate() + lifetime);
        var c_value = escape(value) + "; expires=" + exp_date.toUTCString() + "; path=/";
        document.cookie = name + "=" + c_value;
    },

    get_cookie: function (cookie_name) {
        var cookie_data = document.cookie;
        var coookie_data_start = cookie_data.indexOf(" " + cookie_name + "=");
        if (coookie_data_start == -1) {
            coookie_data_start = cookie_data.indexOf(cookie_name + "=");
        }
        if (coookie_data_start == -1) {
            cookie_data = "{}"; // cookie data was empty, so init it
        }
        else {
            coookie_data_start = cookie_data.indexOf("=", coookie_data_start) + 1;
            var cookie_data_end = cookie_data.indexOf(";", coookie_data_start);
            if (cookie_data_end == -1) {
                cookie_data_end = cookie_data.length;
            }
            cookie_data = unescape(cookie_data.substring(coookie_data_start, cookie_data_end));
        }
        return cookie_data;
    }

};

if ((/iphone|ipod|android|ie|blackberry|ipad|fennec/).test(navigator.userAgent.toLowerCase())) {
    domready(function () {
        madinadSDK.loaded();
    })
}
