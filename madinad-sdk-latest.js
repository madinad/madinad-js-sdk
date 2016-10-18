// MadInAd SDK
// V2.0.0
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(){var e=[],t,n=document,r=n.documentElement.doScroll,i="DOMContentLoaded",s=(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return s||n.addEventListener(i,t=function(){n.removeEventListener(i,t),s=1;while(t=e.shift())t()}),function(t){s?setTimeout(t,0):e.push(t)}})

var madinadSDK = {
    EVENTS: {
        interstitialClosed: 'interstitial_closed',
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
                type = 50324;
                break;
            case 'FP':
                type = 16511;
                break;
            case 'F2B':
                type = 16281;
                break;
            case 'HP':
                type = 48384;
                break;
            case 'CRL':
                type = 29139;
                break;
            case 'EXB':
                type = 85732;
                break;
            case 'EIB':
                type = 84476;
                break;
            case 'MPLX':
                type = 65817;
                break;
            case 'IARL':
                type = 40709;
                break;
            case 'RFP':
                type = 37277;
                break;
        }
        return type;
    },

    setViewedCampaign: function (campaign) {
        madinadGeneric.set_cookie('viewed_' + campaign.cid, '1');
    },

    preloadBanner: function (source) {
        (new Image).src = source;
    },

    loaded: function () {
        madinadSDK.inbox_btn_visible = false;
        madinadSDK.interstitial_viewed = false;

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
            campaignType,
            head = document.head || document.getElementsByTagName('head')[0],
            genericJS = document.createElement('script'),
            formatJS = document.createElement('script');

        if (!currentCampaign) {
            clearInterval(madinadSDK.interv);
            return;
        }
        genericJS.src = "https://madinad-prod.s3.amazonaws.com/static/madinad-generic.js";
        genericJS.onload = function(){
          head.appendChild(formatJS);
        };
        head.appendChild(genericJS);

        madinadSDK.campaigns_data = campaigns_data;
        madinadSDK.properties.cookie_lifetime = currentCampaign.c_lifetime || 1;

        if (!currentCampaign.fc) {
            madinadSDK.properties.require_fc = false;
        }

        var campaignType = madinadSDK.getCampaignType(currentCampaign);

        clearInterval(madinadSDK.interv);
        formatJS.src = "https://madinad-prod.s3.amazonaws.com/static/" + campaignType + ".js";
    },

    set_user_info: function () {
        this.user_info = {
            "app_uuid": madinadSDK.properties.app_uuid,
        }
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
