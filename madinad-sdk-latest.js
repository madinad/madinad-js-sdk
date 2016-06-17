// MadInAd SDK
// V1.2

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
})


var madinadSDK = {
    EVENTS: {
        interstitialClosed: 'interstitial_closed'
    },

    properties: {
        "_base_url": "http://ads.madinad.com", // production
        "app_uuid": "app_uuid", // will be updated with application id

        "find_position": false, // true || false >> used in geo-location features
        "polling_interval": 30000,
        "cookie_lifetime": 30, // default cookie lifetime (days)

        "_api_endpoint": "/api/campaigns/",
        "_analytics_endpoint": "/api/session/",

        "_assets_endpoint": "http://madinad-prod.s3-website-eu-west-1.amazonaws.com/campaign_assets/" // s3 bucket
        //"_assets_endpoint": "./assets/"    // local test assets
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
        return base_url + campaign.cid + '/images/banner.jpg';
    },

    getCampaign: function (campaigns) {
        var campaign,
            i;

        for (i = 0; i < campaigns.length; i++) {
            if (madinadSDK.get_cookie('viewed_' + campaigns[i].cid) !== '1') {
                campaign = campaigns[i];
                break;
            }
        }

        return campaign;
    },

    getCampaignType: function (campaign) {
        var type;

        if (campaign.i && !campaign.hp) {
            type = campaign.b ? 3 : 2;
        }
        else if (campaign.hp) {
            type = 4;
        }
        else {
            type = 1;
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
        // configure from url
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
                // madinadSDK.properties.find_position = true;
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
        var url = madinadSDK.properties._base_url + madinadSDK.properties._api_endpoint + madinadSDK.properties.app_uuid + "/?web_context=" + encodeURI(JSON.stringify(madinadSDK.user_info));
        url += "&callback=madinadSDK.main_callback";
        madinadSDK.jsonp(url);
        madinadSDK.interv = setInterval(function () {
            madinadSDK.jsonp(url);
        }, madinadSDK.properties.polling_interval);
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

        campaignType = madinadSDK.getCampaignType(currentCampaign);

        switch (campaignType) {
            case 1: // simple image
                clearInterval(madinadSDK.interv);
                madinadSDK.render_banner(currentCampaign, campaigns_data.url);
                break;
            case 2: // full-page interstitial
                clearInterval(madinadSDK.interv);
                madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType);
                madinadSDK.setViewedCampaign(currentCampaign);
                break;
            case 3: // full-page interstitial + banner
                madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType);
                madinadSDK.preloadBanner(madinadSDK.buildBannerSource(campaigns_data.url, currentCampaign));
                madinadSDK.addEventListener(madinadSDK.EVENTS.interstitialClosed, function () {
                    madinadSDK.render_banner(currentCampaign, campaigns_data.url);
                });
                madinadSDK.setViewedCampaign(currentCampaign);
                break;
            case 4: // half-page interstitial
                madinadSDK.render_interstitial(currentCampaign, campaigns_data.url, campaignType);
                madinadSDK.setViewedCampaign(currentCampaign);
                break;
        }
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

    },

    render_interstitial: function (campaign_data, base_url, campaign_type) {
        var tmp_offer = campaign_data;
        var modal_tmp = document.getElementById("madinad_modal");
        if (modal_tmp != null) { // if a modal exists remove it to show the other one
            madinadSDK._remove_node("madinad_modal");
        }
        madinadSDK.create_modal(base_url + tmp_offer.cid + "/index.html", campaign_type);
        madinadSDK.post_display_analytics();
        madinadSDK.read_offer(campaign_data.cid);
    },

    post_display_analytics: function () {
        var data = [];
        var tmp_offers = madinadSDK.campaigns_data.c;
        for (var i = 0; i < tmp_offers.length; i++) {
            data[i] = {
                "cid": tmp_offers[i].cid,
                "a": "interstitial"
            };
        }
        var url = madinadSDK.properties._base_url + madinadSDK.properties._analytics_endpoint +
            this.user_info.app_uuid + "/?data=" +
            encodeURI(JSON.stringify(data)) + '&callback=madinadSDK.analytics_callback';
        madinadSDK.jsonp(url);
    },

    analytics_callback: function (msg) {
        console.log(msg);
    },

    send_analytics_event: function (event_name) {
        console.log("Activated analytics script");
        var url = madinadSDK.properties._base_url + madinadSDK.properties._analytics_endpoint + madinadSDK.properties.campaign_uuid + "/?e=" + event_name + "&app_uuid=" + madinadSDK.properties.app_uuid + "&user_id=" + madinadSDK.properties.user_uuid + "&campaign=" + madinadSDK.properties.campaign_uuid;
        var head = document.head;
        var script = document.createElement("script");
        script.setAttribute("src", url);
        head.appendChild(script);
        head.removeChild(script);
    },

    _remove_node: function (id) {
        if (document.getElementById(id))
            document.getElementById(id).parentNode.removeChild(document.getElementById(id));
    },

    read_offer: function (cid) {
        var campaigns = JSON.parse(madinadSDK.get_cookie("track_mdnd"));
        campaigns[cid] = (new Date()).toUTCString();
        madinadSDK.set_cookie("track_mdnd", JSON.stringify(campaigns));
    },

    add_offer: function (offer_inbox, num, title, subtitle, logo, index_url, cid) {
        var title = title;
        var subtitle = subtitle;
        var logo = logo;
        var url = index_url;

        var new_offer = document.createElement("div");
        new_offer.id = "madinad_campaign" + num;
        var campaigns_cookie = JSON.parse(madinadSDK.get_cookie('track_mdnd'));

        if (!campaigns_cookie[cid]) {
            // campaign is unread
            // handle analytics and show interstitial
            console.log("campaign is unread")

            //        var offers = JSON.parse(madinadSDK.get_cookie("offers"));
            //        if(!offers[cid]){ //if offer is unread
            new_offer.style.borderLeft = "5px solid #fb955e";
            //        }
            new_offer.className = "madinad_campaign";
            new_offer.style.marginTop = "0px";
            new_offer.style.paddingBottom = "7px";
            new_offer.style.height = "85px";
            new_offer.style.boxShadow = "0 1px 0 #ccc";
            new_offer.style.borderBottom = "1px solid #ccc";
            new_offer.style.cursor = "pointer";
            new_offer.setAttribute("offer_url", url);
            var arrow = madinadSDK.properties._assets_endpoint + "../static/img/arrow.png";
            new_offer.innerHTML = '<div style="margin-left:auto; margin-right:auto; width: 300px; padding-top: 12px;">' +
                '<div style="float:right; font-size:22px; font-weight:700; margin-top:21px; margin-right: 15px;width:12px;height:21px;background:url(' + arrow + ') center center no-repeat;"></div>' +
                '<img src=' + logo + ' width="70" height="70" style="float: left; border-radius: 5px;">' +
                '<div class="madinad_textbox" style="margin-left:90px;">' +
                '<div class="madinad_title" style="width: 155px;color:#2f3d46;line-height:1.3;font-weight:bold;font-size:13pt;">' + title + '</div>' +
                '<div class="madinad_subtitle" style="color:#2f3d46;font-size: 10pt;line-height: 1.2;margin-top: 5px;">' + subtitle + '</div>' +
                '</div>' +
                '</div>';

            document.getElementById(offer_inbox).appendChild(new_offer);
            new_offer.onclick = function () {
                madinadSDK.read_offer(cid);
                madinadSDK.create_modal(url);
                this.style.borderLeft = ""
            };
        } else {
            // offer is seen before.
            // 1. get current cookie | We already own it as campaigns_cookie
            // 2. get date from current cookie
            for (item in campaigns_cookie) {
                var c_date = item.valueOf();
                var today = new Date();
                today = today.getDate()

                // 3. check if date is a past date or today's

                if (c_date < today) {
                    // 4. if it is a past date, show interstitial and update cookie with today's date
                    console.log("Show interstitial");
                } else {
                    // 5. if it is today's date, do not show again (fc=1 has achieved it's goal)
                    console.log("Frequency cap limit");
                }
            }

        }

    },

    create_modal: function (url, campaign_type) {
        var url_ref = url + '?r=' + madinadSDK.properties.app_uuid;
        var modal = document.createElement("div");
        modal.innerHTML = '<div id="close_modal" style="min-width: 10%; min-height: 10%; z-index:1000; position:absolute; top:0; right:0; cursor:pointer;">' +
            '<img style="width: 100%;" src="http://madinad-prod.s3-website-eu-west-1.amazonaws.com/static/img/close.png" />' +
            '</div>' +
            '<div style="position:relative; height:100%; margin-left:auto; margin-right:auto; overflow:auto; -webkit-overflow-scrolling:touch;">' +
            '<iframe id="modal_iframe" src="' + url_ref + '" style="border: none; border-radius: 5px; overflow:auto; -webkit-overflow-scrolling:touch; display: block; margin-left: auto; margin-right: auto;" width="100%" height="100%"></iframe>' +
            '</div>';
        modal.id = "madinad_modal";
        modal.style.position = "fixed";
        modal.style.top = "0px";
        modal.style.left = "0px";
        modal.style.opacity = 1;
        modal.style.width = "100%";
        // modal.style.height = "100%";
        modal.style.height = (campaign_type == 4) ? "50%" : "100%";
        modal.style.maxHeight = "100%";
        modal.style.zIndex = "10000000";
        // modal.style.backgroundColor = "rgba(51, 51, 51, 0.8)";
        modal.style.backgroundColor = "rgba(211, 211, 211, 0.8)";
        document.getElementsByTagName("body")[0].appendChild(modal);

        var close_btn = document.getElementById("close_modal");
        close_btn.onclick = function () {
            this.parentNode.parentNode.removeChild(modal);
            madinadSDK.fireEvent(madinadSDK.EVENTS.interstitialClosed);
        };
    },

    set_user_info: function () {
        if ((this.properties.find_position) && (typeof this.coords !== 'undefined')) {
            user_lat = this.coords.latitude;
            user_lng = this.coords.longitude;
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
            "lat": user_lat,
            "lng": user_lng,
            "redirected_url": document.referrer || "unknown"
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
    },

};

if ((/iphone|ipod|android|ie|blackberry|ipad|fennec/).test(navigator.userAgent.toLowerCase())) {
    domready(function () {
        madinadSDK.loaded();
    })
}
