var madinadGeneric = {
  post_display_analytics: function (is_secondary, is_click) {
      var data = [];
      var campaigns = madinadSDK.campaigns_data.c;
      if (!is_click) { // If event is not click
        for (var i = 0; i < campaigns.length; i++) {
            data[i] = {
                "cid": campaigns[i].cid
            };
            if (is_secondary) {
                data[i]["type"] = "secondary";
            }
        }
        var url = madinadSDK.properties._base_url + madinadSDK.properties._sessions_endpoint +
            madinadSDK.user_info.app_uuid + "/?data=" +
            encodeURI(JSON.stringify(data)) + '&callback=madinadSDK.analytics_callback';
        madinadSDK.jsonp(url);
      } else { // If event is banner/inbox/hp click
        var c = madinadSDK.getCampaign(madinadSDK.campaigns_data.c);
        var url = madinadSDK.properties._base_url + madinadSDK.properties._sessions_endpoint +
            madinadSDK.user_info.app_uuid + "/?e=click" + "&app_uuid=" + madinadSDK.user_info.app_uuid + "&campaign=" + c.cid;
        madinadSDK.jsonp(url);
      }
  },

  _remove_node: function (id) {
      if (document.getElementById(id))
          document.getElementById(id).parentNode.removeChild(document.getElementById(id));
  },

  jsonObjToParams: function (json) {
      // http://stackoverflow.com/questions/14525178/is-there-any-native-function-to-convert-json-to-url-parameters
      return '?' +
          Object.keys(json).map(function (key) {
              return encodeURIComponent(key) + '=' +
                  encodeURIComponent(json[key]);
          }).join('&');
  },

  render_interstitial: function (campaign_data, base_url, campaign_type, is_secondary) {
      var c = campaign_data;
      var modal_tmp = document.getElementById("madinad_modal");
      if (modal_tmp != null) { // if a modal exists remove it to show the other one
          madinadSDK._remove_node("madinad_modal");
      }
      madinadGeneric.create_modal(
          c.cid,
          base_url + c.cid + "/index.html",
          campaign_type,
          campaign_data.custom_close_btn,
          c.auto_close_timeout
      );

      madinadGeneric.post_display_analytics(is_secondary);
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

  render_hp: function (campaign, base_url, auto_close) {
      var half_page,
          hpNode = document.getElementById('madinad_halfpage'),
          destinationURL = campaign.url,
          imageSource = madinadGeneric.buildBannerSource(base_url, campaign)
          ;

      var css = '@media all and (orientation: landscape) {'
              + '#close_modal {position: fixed !important;}'
              + '#madinad_banner_image {width: 70% !important;}'
              + '#madinad_solid_bg {background: #000 !important; position: fixed !important; top: 0 !important; bottom: 0 !important; left: 0 !important; right: 0 !important;}'
              + '#madinad_heading {text-align: center !important;}'
              + '}',
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet) {
          style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css));
      }
      head.appendChild(style);

      if (hpNode != null) {
          madinadGeneric._remove_node('madinad_halfpage');
      }

      hpNode = document.createElement('div');
      hpNode.innerHTML = '<div id="close_modal" style="min-width: 10%; min-height: 10%; z-index:1000; position:absolute; top:0; right:0; cursor:pointer;">' +
      '<img style="position:absolute; top:0; right:0;" src="https://madinad-prod.s3.amazonaws.com/static/img/close.png" />' +
      '</div>' +
      '<div id="madinad_solid_bg"></div>' +
      '<div style="position:relative; width:100%; margin-left:auto; margin-right:auto; overflow:auto; -webkit-overflow-scrolling:touch;">' +
      '<a href="' + destinationURL + '" target="_blank">' +
      '<h1 id="madinad_heading" style="margin: 0;"><img id="madinad_banner_image" style="width: 100%;" src="' + imageSource + '" /></h1>' +
      '</a>' +
      '</div>';

      hpNode.id = 'madinad_halfpage';
      hpNode.style.position = 'fixed';
      hpNode.style.bottom = '-8px';
      hpNode.style.left = '0px';
      hpNode.style.opacity = 1;
      hpNode.style.width = '100%';
      hpNode.style.maxWidth = '100%';
      hpNode.style.textAlign = 'center';
      hpNode.style.zIndex = '10000000';
      hpNode.style.backgroundColor = 'transparent';
      document.body.appendChild(hpNode);

      document.getElementById("madinad_banner_image").onclick = function() {
        madinadGeneric.post_display_analytics(false, true);
      }

      // setTimeout(function () {
      //     var node = document.getElementById('madinad_banner_image');
      //     document.body.style.marginBottom = '-' + node.height + 'px';
      // });
      madinadGeneric.post_display_analytics(false);

      var close_btn = document.getElementById("close_modal");
      if (auto_close) {
          var time_in_mil = auto_close * 1000;
          setTimeout(function () {   //calls click event after a certain time
              hpNode.remove();
          }, time_in_mil);
      }
      close_btn.onclick = function () {
          this.parentNode.parentNode.removeChild(hpNode);
          madinadSDK.fireEvent(madinadSDK.EVENTS.interstitialClosed);
      };
  },


  render_banner: function (campaign, base_url) {
      var banner,
          bannerNode = document.getElementById('madinad_banner'),
          destinationURL = campaign.url,
          imageSource = madinadGeneric.buildBannerSource(base_url, campaign)
          ;

      var css = '@media all and (orientation: landscape) {'
              + '#madinad_banner{display:none;}'
              + '}',
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet) {
          style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css));
      }
      head.appendChild(style);

      if (bannerNode != null) {
          madinadSDK._remove_node('madinad_banner');
      }

      bannerNode = document.createElement('div');
      bannerNode.innerHTML = '<a href="' + destinationURL + '" target="_blank">' +
          '<img id="madinad_banner_image" style="width: 100%;" src="' + imageSource + '" />' +
          '</a>'
      ;
      bannerNode.id = 'madinad_banner';
      bannerNode.style.position = 'fixed';
      bannerNode.style.top = '0px';
      bannerNode.style.left = '0px';
      bannerNode.style.opacity = 1;
      // bannerNode.style.height = '12%';
      bannerNode.style.width = '100%';
      bannerNode.style.maxWidth = '100%';
      bannerNode.style.textAlign = 'center';
      bannerNode.style.zIndex = '10000000';
      bannerNode.style.backgroundColor = 'rgba(211, 211, 211, 0.8)';
      document.body.appendChild(bannerNode);

      bannerNode.onclick = function() {
        madinadGeneric.post_display_analytics(false, true);
      }

      setTimeout(function () {
          var node = document.getElementById('madinad_banner_image');
          document.body.style.marginBottom = node.height + 'px';
      });

      madinadGeneric.post_display_analytics(false);
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
      inboxNode.style.right = '10px';
      inboxNode.style.opacity = 1;
      inboxNode.style.height = '70px';
      inboxNode.style.width = '70px';
      inboxNode.style.borderRadius = '50%';
      inboxNode.style.maxWidth = '50px';
      inboxNode.style.textAlign = 'center';
      inboxNode.style.zIndex = '10000000';
      inboxNode.style.backgroundColor = 'transparent';
      document.body.appendChild(inboxNode);

      madinadGeneric.post_display_analytics(false);
      // setTimeout(function () {
      //     var node = document.getElementById('madinad_banner_image');
      //     document.body.style.marginBottom = node.height + 'px';
      // });
  },

  render_parallax: function (campaign) {
      var parallaxNode = document.getElementById('madinad_advertisement'),
          destinationURL = campaign.url;

      var css = '#madinad_advertisement{width:100%;height:150px;position:relative;margin-top:17px;margin-bottom:5px;margin-left:auto;margin-right:auto;border-bottom:2px solid #000000;background-color:#000000;}' +
              '#madinad_divabs{width:100%;height:100%;position:absolute;top:0;left:0;clip:rect(auto,auto,auto,auto);}' +
              '#madinad_destination{z-index:11;width:100%;height:100%;position:absolute;top:0;left:0;display:block;cursor:pointer;background-color:white;opacity:0;filter:alpha(opacity=0);}' +
              '#madinad_divfix{width:398px;height:100%;position:fixed;top:0px;-moz-transform:translateZ(0);-webkit-transform:translateZ(0);-ms-transform:translateZ(0);-o-transform:translateZ(0);transform:translateZ(0);margin:0 auto;}' +
              '#madinad_image{width:100%;height:905px;border:none;position:absolute;bottom:0;left:0;-moz-transform:translateZ(0);-webkit-transform:translateZ(0);-ms-transform:translateZ(0);-o-transform:translateZ(0);transform:translateZ(0); top: -89px;}' +
              '#madinad_addiv{position:absolute;left:0;bottom:150px;width:100%;text-align:center;font-family: Arial,sans-serif;background-color:#000000;font-size:12px;color:#ffffff}',
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet) {
          style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css));
      }

      head.appendChild(style);

      // if (parallaxNode != null) {
      //     madinadSDK._remove_node('madinad_advertisement');
      // }

      var parallaxNode = document.createElement('div');
      parallaxNode.id = 'madinad_advertisement';

      parallaxNode.innerHTML = '<div id="madinad_divabs">' +
          '<div id="madinad_divfix">' +
          '<img id="madinad_image" src="' + campaign.image + '">' +
          '</div>' +
          '</div>' +
          '<a id="madinad_destination" href="' + destinationURL + '" target="_blank"></a>' +
          '<span id="madinad_addiv">Madinad Advertisement</span>';

      document.body.appendChild(parallaxNode);

      parallaxNode.onclick = function() {
        madinadGeneric.post_display_analytics(false, true);
      }

      window.addEventListener("scroll", check_if_visible);

      function check_if_visible () {
        if (madinadGeneric.isScrolledIntoView(parallaxNode)) {
          madinadGeneric.post_display_analytics(false);
          window.removeEventListener("scroll", check_if_visible);
        }
      }
  },

  isScrolledIntoView: function (el) {
      var elemTop = el.getBoundingClientRect().top;
      var elemBottom = el.getBoundingClientRect().bottom;

      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      return isVisible;
  },

  render_inarticle: function (campaign) {
      var inarticleNode = document.getElementById('madinad_advertisement'),
          destinationURL = campaign.url;

      var css = '#madinad_advertisement { display: block; box-sizing: border-box; border: 2px solid black; }'
              + '#madinad_advertisement span { display: block; color: white; text-align: center; width: 100%; background-color: black; }'
              + '#madinad_advertisement a { display: block; width: 100%;}'
              + '#madinad_advertisement img {width:100%;height:100%;}',
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

      style.type = 'text/css';
      if (style.styleSheet) {
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
          + '<a href="' + destinationURL + '" target="_blank">'
          + '<img src="' + campaign.image + '">'
          + '</a>';

      document.body.appendChild(inarticleNode);

      inarticleNode.onclick = function() {
        madinadGeneric.post_display_analytics(false, true);
      }

      window.addEventListener("scroll", check_if_visible);

      function check_if_visible () {
        if (madinadGeneric.isScrolledIntoView(inarticleNode)) {
          madinadGeneric.post_display_analytics(false);
          window.removeEventListener("scroll", check_if_visible);
        }
      }
  },


  setViewedCampaign: function (campaign) {
      madinadGeneric.set_cookie('viewed_' + campaign.cid, '1');
  },

  preloadBanner: function (source) {
      (new Image).src = source;
  },

  buildBannerSource: function (base_url, campaign) {
      return base_url + campaign.cid + '/banner.jpg';
  },

  buildInboxSource: function (base_url, campaign) {
      return base_url + campaign.cid + '/bubble.jpg';
  },

  set_cookie: function (name, value, exp_days) {
      var lifetime = exp_days || madinadSDK.properties.cookie_lifetime;
      var exp_date = new Date();
      exp_date.setDate(exp_date.getDate() + lifetime);
      var c_value = escape(value) + "; expires=" + exp_date.toUTCString() + "; path=/";
      document.cookie = name + "=" + c_value;
  }

}
