var _scq = _scq || [];
_scq.push(['setMerchantId', '176D6D323C382FC2']);
_scq.push(['setServerUrl', 'http://recommender.predict.emarsys.cn']);
'use strict';

var ScarabArrays = function() {
  var forEach = function(array, fn, scope) {
    if (Array.prototype.forEach) {
      return array.forEach(fn, scope);
    }
    for(var i = 0, len = array.length; i < len; ++i) {
      fn.call(scope, array[i], i, this);
    }
  };

  var map = function(array, projectionFunction) {
    if (Array.prototype.map) {
      return array.map(projectionFunction);
    }
    var results = [];
    forEach(array, function(itemInArray) {
        results.push(projectionFunction(itemInArray));
    });
    return results;
  };

  var filter = function(array, predicateFunction) {
    if (Array.prototype.filter) {
      return array.filter(predicateFunction);
    }
    var results = [];
    forEach(array, function(itemInArray) {
      if (predicateFunction(itemInArray)) {
        results.push(itemInArray);
      }
    });
    return results;
  };

  return {
    forEach: forEach,
    map: map,
    filter: filter
  };
}();

var ScarabUtil = function() {

  var prettyPrice = function(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  };

  var redirect = function(link, merchant, item, feature, cohort) {
    return 'http://recommender.scarabresearch.com/merchants/' + merchant + '/?v=' +
                  encodeURIComponent('i:' + item + ',t:' + feature + ',c:' + cohort) +
                  '&redirect_to=' + encodeURIComponent(link);
  };

  var sc_params = function(link, feature, cohort) {
    return appendParams(link, {sc_feature: feature, sc_cohort: cohort});
  };

  var addTrackingParams = function(SC, params) {
    return merge(params, {sc_feature: SC.recommender.f, sc_cohort: SC.cohort});
  };

  // Section 4 in RFC 2396 (http://www.ietf.org/rfc/rfc2396.txt) says that
  // fragment ids should be the last part of urls
  var appendParams = function(uri, params) {
    var paramsArray = [];
    for (var name in params) {
      if (params.hasOwnProperty(name)) {
        paramsArray.push({n: name, v: params[name]});
      }
    }
    if (paramsArray.length === 0) return uri;
    var paramsString = ScarabArrays.map(
      paramsArray.sort(function (a, b) {
        return a.n.localeCompare(b.n);
      }),
      function(p) {
        return p.n + '=' + encodeURIComponent(p.v);
      }
    ).join('&');
    var fragmentIndex = uri.indexOf('#');
    var fragment = '';
    if (fragmentIndex >= 0) {
      fragment = uri.substring(fragmentIndex);
      uri = uri.substring(0, fragmentIndex);
    }
    var sep = uri.indexOf('?') >= 0 ? '&' : '?';
    return uri + sep + paramsString + fragment;
  };

  var parseQueryString = function(myWindow) {
    var query_string = {};
    myWindow = myWindow || window;
    if (!myWindow || !myWindow.location || !myWindow.location.search ||
        myWindow.location.search === "") {
      return query_string;
    }
    var query = myWindow.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (pair.length !== 2) continue;
      var paramValue = decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = paramValue;
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]], paramValue ];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(paramValue);
      }
    }
    return query_string;
  };

  /**
   * Gets a cookie, if it exists returns it's value or empty array otherwise
   */
  var getCookie = function(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for ( var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
              c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
            var value = decodeURIComponent(c.substring(nameEQ.length, c.length));
            try {
              return JSON.parse(value);
            } catch(e) {
              return eval(value);
            }
          }
      }
      return [];
  };

  var topDomainToCookie = function(domain) {
    if (domain === 'localhost') {
      return '';
    }
    var td = getTopDomain(domain);
    return 'domain=' + td;
  };

  var getTopDomain = function(domain) {
    var ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (ipPattern.test(domain)) {
        return domain;
    }
    var dparts = domain.split(".");
    var l = dparts.length;
    var partsToKeep = Math.min(l, 2);
    // handle *.co.uk, *.co.jp, *.com.tk, etc domains
    if (l > 2 && ('co' === dparts[l - 2] || 'com' === dparts[l - 2])) {
      partsToKeep = 3;
    }
    return '.' + dparts.slice(l-partsToKeep).join('.');
  };

  /**
   * merges two or more objects. the later one overwrites the previous object
   *
   * @return
   */
  var merge = function() {
    var i, l = arguments.length, result = {}, o, k;
    for (i = 0; i < l; i++) {
      o = arguments[i];
      if (o) {
        for (k in o) {
          if (o.hasOwnProperty(k)) {
            result[k] = o[k];
          }
        }
      }
    }

    return result;
  };

  // MDN polyfill
  var indexOf = function(array, searchElement, fromIndex) {
    if (Array.prototype.indexOf) {
      return array.indexOf(searchElement, fromIndex);
    }
    var k;
    if (array == null) {
      throw new TypeError('"this" is null or not defined');
    }
    var O = Object(array);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };

  // You-Dont-Know-JS polyfill
  var isNaN;
  if (!Number.isNaN) {
    isNaN = function(n) {
        return n !== n;
    };
  } else {
    isNaN = Number.isNaN;
  }


  var indexOfItem = function(array, needle, id) {
    var i, l;
    if (!array || (array && !array.length)) {
      return -1;
    }
    l = array.length;
    for (i = 0; i < l; i++) {
      if (typeof needle === "string") {
        if (typeof array[i] !== 'undefined' && array[i][id] === needle) {
          return i;
        }
      } else {
        if (typeof array[i] !== 'undefined' && needle.equal(array[i])) {
          return i;
        }
      }
    }
    return -1;
  };

  /**
   * Returns the deep copy of the source object. Usage: var target =
   * deepCopy(source);
   *
   * Code copied from
   * http://javascript.about.com/od/objectorientedjavascript/a/oop17.htm
   */
  var deepCopy = function(source, target) {
    target = target || {};
    for (var i in source) {
      if (source[i] !== null && typeof source[i] === 'object') {
        target[i] = (source[i].constructor === Array) ? [] : {};
        deepCopy(source[i], target[i]);
      } else {
        target[i] = source[i];
      }
    }
    return target;
  };

  /**
   * augment a constructor functions prototype with other functions first
   * param is the constructor function second and subsequent params are the
   * interface functions
   */
  var augment = function() {
    var i, l = arguments.length, f, cf = arguments[0];
    for (i = 1; i < l; i++) {
      f = arguments[i];
      f.call(cf.prototype);
    }
  };

  var bind = function(fn, context) {
    return function() {
      var f = fn, c = context;
      f.apply(c, arguments);
    };
  };

  var trim = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  };

  var playQueue = function(publicAPI, queue) {
    var Queue = function(queue) {
      if (!(queue instanceof Array)) {
        if (queue instanceof Queue) return;
        throw new SyntaxError('Scarab Queue is not an array');
      }
      for (var i = 0; i < queue.length; ++i) {
        this.push(queue[i]);
      }
    };
    Queue.prototype.push = function() {
      for (var i = 0; i < arguments.length; ++i) {
        var commandArray = arguments[i];
        if (!(commandArray instanceof Array) && commandArray.length > 0) {
          throw new SyntaxError('command should be a non-empty array: ' + commandArray);
        }
        var command = commandArray[0];
        var params = [];
        for (var j = 1; j < commandArray.length; ++j) {
          params.push(commandArray[j]);
        }
        if (publicAPI.hasOwnProperty(command)) {
          publicAPI[command].apply(null, params);
        } else {
          throw new SyntaxError('unknown command: ' + command);
        }
      }
    };
    return new Queue(queue);
  };


  var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
f)).finalize(b)}}});var s=p.algo={};return p}(Math);
(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();

  var sha1 = function(s) {
    return CryptoJS.SHA1(s).toString(CryptoJS.enc.Hex);
  };

  var staticResource = function(path) {
    return ('https:' === document.location.protocol ? 'https://recommender' : 'http://cdn') + '.scarabresearch.com/static' + path;
  };

  return {
    prettyPrice: prettyPrice,
    redirect: redirect,
    sc_params: sc_params,
    addTrackingParams: addTrackingParams,
    appendParams: appendParams,
    getCookie: getCookie,
    topDomainToCookie: topDomainToCookie,
    getTopDomain: getTopDomain,
    redirectWithScParams: function(link, merchant, item, feature, cohort) {
      return redirect(sc_params(link, feature, cohort), merchant, item, feature, cohort);
    },
    parseQueryString: parseQueryString,
    merge: merge,
    isNaN: isNaN,
    indexOf: indexOf,
    indexOfItem: indexOfItem,
    deepCopy: deepCopy,
    augment: augment,
    bind: bind,
    sha1: sha1,
    trim: trim,
    isArray: isArray,
    playQueue: playQueue,
    inspectorSrc: staticResource('/inspector/scarab-inspector.min.js'),
    discoverySrc: staticResource('/discovery/scarab-discovery.js'),
    assistantSrc: staticResource('/assistant/scarab-assistant.js'),
    script: {},
    loader: function(src, id, cb) {
      if (document.getElementById(id)) {
        cb(ScarabUtil.script[id]);
        return;
      }
      ScarabUtil.script = ScarabUtil.script || {};

      var callback = function(module){
        if (!cb || !module) {
          return
        }
        var cbTemp = cb;
        cb = null;
        cbTemp(module);
      };
      ScarabUtil.scriptCb = ScarabUtil.scriptCb || {};
      ScarabUtil.scriptCb[id] = callback;

      var js = document.createElement('script');
      js.id = id;
      js.src = src
      var fs = document.getElementsByTagName('script')[0];

      var ieLoadBugFix = function(scriptElement, callback) {
        if (ScarabUtil.script[id]) {
            return;
        }
        if (scriptElement.readyState === 'loaded' || scriptElement.readyState === 'completed') {
            callback();
        } else {
            setTimeout(function() {
                ieLoadBugFix(scriptElement, callback);
            }, 100);
        }
      }
      js.onload = function(){
        callback(ScarabUtil.script[id]);
      };
      ieLoadBugFix(js, function(){
        callback(ScarabUtil.script[id]);
      });

      fs.parentNode.insertBefore(js, fs);
    }
  };
}();
'use strict';

var ScarabModule = function(win, config) {
    var STRINGS = {
        VIEWCOOKIE : 'scarab.mayViewed',
        ADDCOOKIE : 'scarab.mayAdd',
        VISITORCOOKIE : 'scarab.visitor',
        PROFILECOOKIE : 'scarab.profile'
    }, SERIALIZE = {
        // These are properties of Transaction objects.
        // Make sure these are arrays.
        'v' : 'views',
        'ai' : 'addedItems',
        'ca' : 'cart',
        'co' : 'checkouts',
        'k' : 'keywords',
        'q' : 'searchTerm',
        'vc' : 'category',
        'cp' : 'compactProducts',
        'lang': 'language',
        'az': 'availabilityZone'
    }, EVENT = {
        'addView' : 2,
        'checkAddedItem' : 3,
        'addAddedItem' : 4,
        'addCartItem' : 5,
        'setCart' : 6,
        'addCheckoutItem' : 7,
        'setPurchase': 8,
        'commit' : 9
    }, FEATURETRIGGERS = {
        'RELATED': {
            trigger: 'view',
            validate: function(tr){ return tr.views && tr.views.length > 0;}
        },
        'ALSO_BOUGHT': {
            trigger: 'view',
            validate: function(tr){ return tr.views && tr.views.length > 0;}
        },
        'CART': {
            trigger: 'cart',
            validate: function(tr){ return tr.cart && tr.cart.length > 0 || tr.cart && tr.cart.v > 0;}
        }
    };

    if (ScarabUtil.inspector) {
        ScarabUtil.inspector.FEATURETRIGGERS = FEATURETRIGGERS;
    }

    // doT.js
    // (c) 2011, Laura Doktorova
    // https://github.com/olado/doT
    //
    // doT is an extraction and slight modification of an excellent
    // templating function from jQote2.js (jQuery plugin) by aefxx
    // (http://aefxx.com/jquery-plugins/jqote2/).
    //
    // Modifications:
    // 1. nodejs support
    // 2. allow for custom template markers
    // 3. only allow direct invocation of the compiled function
    //
    // Licensed under the MIT license.

    var doT = (function() {
        var doT = {
            version : '0.1.0'
        };

        doT.templateSettings = {
            begin : '{{',
            end : '}}',
            varname : 'it'
        };

        doT.template = function(tmpl, conf) {
            conf = conf || doT.templateSettings;
            var str = '', tb = conf.begin, te = conf.end, m, l, arr = tmpl
                    .replace(
                            /\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g,
                            '').split(tb).join(te + '\x1b').split(te);

            l = arr.length;
            for (m = 0; m < l; m++) {
                str += arr[m].charAt(0) !== '\x1b' ? "out+='"
                        + arr[m].replace(/(\\|["'])/g, '\\$1') + "'"
                        : (arr[m].charAt(1) === '=' ? ';out+=('
                                + arr[m].substr(2) + ');'
                                : (arr[m].charAt(1) === '!' ? ';out+=('
                                        + arr[m].substr(2)
                                        + ").toString().replace(/&(?!\\w+;)/g, '&#38;').split('<').join('&#60;').split('>').join('&#62;').split('"
                                        + '"' + "').join('&#34;').split(" + '"'
                                        + "'" + '"' + ").join('&#39;');"
                                        : ';' + arr[m].substr(1)));
            }

            str = 'try{'
                    + ('var out="";' + str + ';return out;').split("out+='';")
                            .join('').split('var out="";out+=')
                            .join('var out=')
                    + '} catch(e){e.type="TemplateExecutionError";e.args=arguments;e.template=arguments.callee.toString();'
                    + 'throw new SyntaxError("Error in Scarab template.");}';

            try {
                return new Function(conf.varname, str);
            } catch (e) {
                if (window.console && console.warn) {
                    console.warn('Could not create a template function: ' + str, e);
                }
                throw new SyntaxError('Error in Scarab template.');
            }
        };

        return doT;
    }());
    doT.templateSettings = {
        begin : '{{',
        end : '}}',
        varname : 'SC'
    };

    var w = win || window,
        config = config || {},
        sessionId,
        visitorId,
        customerId,
        profile,
        emailHash,
        trafficSource,
        fields,
        merchantId,
        testMode,
        debugMode,
        serverUrl,
        trackedFeature,
        trackedCohort,
        forcedCohort,
        transactions = {},
        transactionCounter = 0,
        transactionListeners = [],
        products = {},
        features = [],
        beforeRendering = null,
        afterRendering = null,
        skipRendering = false;

    var addEvent = function(o, name, fn, ctx) {
        if (!o) {
            return;
        }
        var evl;
        if (o.addEventListener) {
            evl = ScarabUtil.bind(fn, ctx);
            o.addEventListener(name, evl, false);
        } else if (o.attachEvent) {
            evl = ScarabUtil.bind(fn, ctx);
            o.attachEvent('on' + name, evl);
        }
        return evl;
    };

    var ISerializable = (function() {
        var serialize = function() {
            var s = [], i, sp = this.serializableProperties, l = sp.length, cp;

            for (i = 0; i < l; i++) {
                cp = sp[i];
                if (this.hasOwnProperty(cp) && (this[cp] || this[cp] === 0)) {
                    s.push(cp + ':' + this[cp]);
                }
            }
            return s.join(',');
        };

        return function() {
            this.serialize = serialize;
        };
    }());

    var IComparable = (function() {
        var equal = function(other) {
            return this.compare(other);
        };

        return function() {
            this.equal = equal;
        };
    }());

    var IMergable = (function() {

        var merge = function() {
            var i, l = arguments.length, co, prop;

            for (i = 0; i < l; i++) {
                co = arguments[i];
                for (prop in co) {
                    if (co.hasOwnProperty(prop)) {
                        this[prop] = co[prop];
                    }
                }
            }
        };

        return function() {
            this.merge = merge;
        };
    }());

    var Item = function(config) {
        // IMPORTANT!
        // this URL encoding is just a way of escaping special characters in the
        // item ID (comma, pipe, colon)
        // recserver will url-decode this part of the string
        this.i = encodeURIComponent(config.i + '') || null; // itemId
        this.t = config.t || null; // tracking code (feature id)
        this.p = config.p === 0 ? 0 : (config.p || null); // price
        this.q = config.q || null; // quantity
        this.c = config.c || null; // cohort
    };
    ScarabUtil.augment(Item, ISerializable, IComparable, IMergable);
    Item.prototype.serializableProperties = [ 'i', 't', 'p', 'q', 'c' ];
    Item.prototype.compare = function(otherItem) {
        return this.i === otherItem.i;
    };

    var Feature = function(config) {
        this.f = config.f || null; // feature
        this.l = config.l || null; // limit
        this.o = (typeof config.o === 'undefined') ? null : config.o; // offset
        // allow special characters in trigger
        this.t = config.t ? encodeURIComponent(config.t) : null;
        this.hasMore = false; // true if there are more items form this feature
        this.cohort = '';
        this.merchants = [];
        this.containerId = config.containerId || null;
        this.parent = this.containerId ? document.getElementById(this.containerId) : null;
        this.template = config.template || null; // template
        this.pages = config.pages || []; // loaded pages
        this.currentPage = null; // current page
        this.attachedListeners = config.attachedListeners || false;
        this.transaction = null;
        this.pi = null;
        this.cust = config.cust || null;
        this.requestSent = false;
    };
    ScarabUtil.augment(Feature, ISerializable, IComparable);
    Feature.prototype.serializableProperties = [ 'f', 'l', 'o', 't', 'cust' ];
    Feature.prototype.compare = function(otherItem) {
        return this.f === otherItem.f;
    };
    Feature.prototype.getProducts = function() {
        var i, l = this.pages.length, result = [], page;
        for (i = 0; i < l; i++) {
            page = this.pages[i];
            result = result.concat(page.products);
        }

        return result;
    };
    Feature.prototype.purgePagesCache = function() {
        this.pages = [];
        this.currentPage = null;
    };
    var findProductsMSIE = function(root) {
        var productIds = [];
        if (typeof (root.getAttribute) !== 'undefined') {
            var dataitem = root.getAttribute('data-scarabitem');
            if (dataitem) {
                productIds.push(dataitem);
            }
        }
        if (root.childNodes.length === 0) {
            return productIds;
        }
        for ( var i = 0; i < root.childNodes.length; ++i) {
            var subresult = findProductsMSIE(root.childNodes[i]);
            productIds = productIds.concat(subresult);
        }
        return productIds;
    };
    Feature.prototype.findProducts = function() {
        if (typeof (NodeFilter) === 'undefined') {
            return findProductsMSIE(this.parent);
        }
        var walker = document.createTreeWalker(this.parent,
                NodeFilter.SHOW_ELEMENT, null, false), productIds = [], el, dataitem;
        do {
            el = walker.currentNode;
            dataitem = el.getAttribute('data-scarabitem');
            if (dataitem) {
                productIds.push(dataitem);
            }
        } while (walker.nextNode());
        return productIds;
    };
    Feature.prototype.setProducts = function(pi) {
        this.pi = pi;
    };
    Feature.prototype.setPage = function(page) {
        var that = this;
        this.parent = document.getElementById(this.containerId);

        if (!this.parent && window.console && console.error) {
            console.error('container not found: "' + this.containerId + '"');
        }

        var renderCallback = function(SC, skipScarabRendering) {
            return that.render(SC, skipScarabRendering);
        };
        var SC;
        this.currentPage = page;
        SC = this.getDataForRendering();
        if (beforeRendering) {
            beforeRendering(SC);
        }
        if (this.successCallback) {
            try {
                this.successCallback(SC, renderCallback);
            } catch (e) {
                if (window.console && console.warn) {
                    console.warn('Error in successCallback.', e);
                }
            }
        } else if (!skipRendering) {
            publicInterface.invokeRendering(SC, renderCallback);
        }
        this.attachListeners();
        if (afterRendering) {
            afterRendering(SC);
        }
    };
    Feature.prototype.addPage = function(page) {
        this.pages.push(page);
        this.setPage(page);
    };
    Feature.prototype.previousPage = function() {
        var index = ScarabUtil.indexOfItem(this.pages, this.currentPage);
        if (index > 0) {
            this.setPage(this.pages[index - 1]);
        }
    };
    Feature.prototype.nextPage = function() {
        var index = ScarabUtil.indexOfItem(this.pages, this.currentPage);
        if (index !== -1) {
            if (index < this.pages.length - 1) {
                this.setPage(this.pages[index + 1]);
            } else if (this.hasMore) {
                this.o += this.l;
                publicInterface.setCohortId(this.cohort);
                this.requestSent = false;
                this.transaction.sendRequest();
            }
        }
    };
    Feature.prototype.getDataForRendering = function() {
        var SC = {};
        SC.page = ScarabUtil.deepCopy(this.currentPage);
        SC.topic = this.topicLabel;
        SC.recommender = {};
        SC.recommender.f = this.f;
        SC.recommender.limit = this.l;
        SC.recommender.container = this.parent;
        SC.cohort = this.cohort;
        SC.merchants = this.merchants;
        return SC;
    };
    var getElementsByClassName = function(container, button) {
        if (container.getElementsByClassName) {
            return container.getElementsByClassName(button);
        }
        var all = container.getElementsByTagName('*');
        var ret = [];
        for (var i = 0; i < all.length; i++) {
            if (all[i].className === button) {
                ret.push(all[i]);
            }
        }
        return ret;
    };
    var disableButton = function(container, button) {
        var buttons = getElementsByClassName(container, button);
        for ( var i = 0; i < buttons.length; ++i) {
            var className = buttons[i].className;
            buttons[i].className = className + ' scarab-disabled-button';
        }
    };
    Feature.prototype.render = function(SC, skipScarabRendering) {
        var el = this.parent;
        if (typeof (this.template) === 'function' && !skipScarabRendering) {
            if (!el) {
                throw 'DOM element "' + this.containerId + '" not found "';
            }
            if (el !== document.getElementById(el.id)) {
                // Oooops, probably they threw out 'el', and replaced it with a
                // new element with the same id!
                el = document.getElementById(el.id);
                this.parent = el;
                this.attachedListeners = false;
            }
            el.innerHTML = this.template(SC);
            var index = ScarabUtil.indexOfItem(this.pages, this.currentPage);
            if (index === 0) {
                disableButton(el, 'scarab-prev');
            }
            if (index === this.pages.length - 1 && !this.hasMore) {
                disableButton(el, 'scarab-next');
            }
        }
    };
    Feature.prototype.attachListeners = function() {
        if (this.attachedListeners) {
            return;
        }
        this.attachedListeners = true;
        clearOldFeatureListeners(this);
        var el = this.parent;
        this.elistener = addEvent(el, 'click', this.eventListener, this);
    };

    Feature.prototype.eventListener = function(e) {
        var element = e.srcElement || e.target, cssClass, classes = [], i, l, dataitem;
        do {
            dataitem = element.getAttribute('data-scarabitem');
            if (dataitem) {
                return Feature.eventsHandlers['scarab-item'].call(this,
                        dataitem, this.f, this.cohort);
            }
            cssClass = element.className;
            classes = cssClass.split(' ');
            l = classes.length;
            for (i = 0; i < l; i++) {
                if (classes[i] in Feature.eventsHandlers) {
                    return Feature.eventsHandlers[classes[i]].call(this, element);
                }
            }
            element = element.parentNode;
        } while (element !== this.parent);
        return true;
    };
    Feature.eventsHandlers = {
        'scarab-item' : function(productId, feature, cohort) {
            publicInterface.itemClick(productId, feature, cohort);
        },
        'scarab-prev' : function(element) {
            this.previousPage();
        },
        'scarab-next' : function(element) {
            this.nextPage();
        }
    };

    if (ScarabUtil.inspector) {
        ScarabUtil.inspector.trackObjectFunctions('Feature', Feature.prototype);
    }

    var Page = function(config) {
        this.products = [];
    };
    ScarabUtil.augment(Page, IComparable);
    Page.prototype.compare = function(otherItem) {
        return otherItem === this;
    };
    Page.prototype.addProduct = function(product) {
        this.products.push(product);
    };
    Page.prototype.removeProduct = function(productId) {
    };

    var OrderedItemEventQueue = function(transaction) {
        this.isPlaying = false;
        this.tick = null;
        this.events = [];
        this.transaction = transaction;
        this.playcounter = 0;
    };
    OrderedItemEventQueue.prototype.add = function(event) {
        this.events.push(event);
        this.events.sort(this.compareEvent);
    };
    OrderedItemEventQueue.prototype.compareEvent = function(a, b) {
        if (a.item && b.item && a.item.i && b.item.i && a.item.i !== b.item.i) {
            return a.item.i < b.item.i ? -1 : 1;
        } else {
            return (EVENT[a.event] < EVENT[b.event]) ? -1 : 1;
        }
    };
    OrderedItemEventQueue.prototype.shouldSend = function() {
        return (this.events.length > 1
                || this.events[0].event !== 'commit'
                || this.events[0].forceSend
                || customerId
                || emailHash
                || trafficSource
                || this.transaction.features.length > 0
                || this.transaction.keywords && this.transaction.keywords.length > 0
                || (this.transaction.searchTerm && this.transaction.searchTerm.length > 0)
                || (this.transaction.category && this.transaction.category.length > 0)
                || (this.transaction.errors && this.transaction.errors.length > 0));
    };
    OrderedItemEventQueue.prototype._play = function() {
        var transaction = this.transaction, e;
        this.isPlaying = true;

        if (!this.shouldSend()) {
            this.clear();
        }
        while (this.events.length) {
            e = this.events.shift();
            transaction.eventHandlers[e.event].call(transaction, e.item);
        }
        this.isPlaying = false;
    };

    OrderedItemEventQueue.prototype.play = function(immediate) {
        if (this.isPlaying) {
            return true;
        }

        if (this.tick) {
            w.clearTimeout(this.tick);
        }

        if (immediate) {
            this._play();
        } else {
            this.tick = w.setTimeout(ScarabUtil.bind(this._play, this), 100);
        }

    };
    OrderedItemEventQueue.prototype.clear = function() {
        this.events = [];
    };

    /**
     * Serialize a list of tracking codes into a cookie
     */
    var serializeCookie = function(name, collection) {
        var key, serializedPairs, serializedObjects, i, cookieValue = '[';

        /*
         * Serialize tracking code list: Array of itemId - tracking code pairs,
         * eg: [{itemId: "i1", featureId: "RELATED"}, {..}, ...]
         */
        serializedObjects = [];

        for (i = 0; i < collection.length; i++) {
            serializedPairs = [];
            for (key in collection[i]) {
                if (collection[i].hasOwnProperty(key)
                        && (collection[i][key] || collection[i][key] === 0)) {
                    serializedPairs.push('"' + key + '":"' + collection[i][key] + '"');
                }
            }
            if (serializedPairs.length) {
                serializedObjects.push('{' + serializedPairs.join(',') + '}');
            }
        }
        if (serializedObjects.length) {
            cookieValue += serializedObjects.join(',');
        }
        cookieValue += ']';

        /*
         * Save the serialized list into a cookie named 'name' The created
         * cookie expires, when the browser closed
         */
        document.cookie = name + '=' + encodeURIComponent(cookieValue) + '; path=/;' + ScarabUtil.topDomainToCookie(document.domain);
    };

    var findInCookie = function(cname, item) {
        var c = ScarabUtil.getCookie(cname), i, l = c.length;

        for (i = 0; i < l; i++) {
            if (i in c && item.equal(c[i])) {
                return c[i];
            }
        }
        return null;
    };

    var removeFromCookie = function(cname, item) {
        var c = ScarabUtil.getCookie(cname), i = ScarabUtil.indexOfItem(c, item);
        if (i > -1) {
            c.splice(i, 1);
        }
        serializeCookie(cname, c);
    };

    var addCookie = function(cname, item) {
        var c = ScarabUtil.getCookie(cname), i = ScarabUtil.indexOfItem(c, item);
        if (c.length > 9) {
            c.shift();
        }
        if (i === -1) {
            c.push(item);
            serializeCookie(cname, c);
        }
    };

    var Transaction = function(id) {
        this.name = getTrnName(id);
        this.views = null;
        this.addedItems = null;
        this.cart = null;
        this.features = [];
        this.productIds = [];
        this.checkouts = null;
        this.orderId = '';
        this.callbackName = '';
        this.events = new OrderedItemEventQueue(this);
        this.keywords = null;
        this.searchTerm = null;
        this.category = null;
        this.exclude = [];
        this.compactProducts = ['1'];
        this.id = id;
        this.errors = null;
        this.language = null;
        this.availabilityZone = null;
    };

    Transaction.prototype = {
        eventHandlers : {
            addView : function(viewedItem) {
                this.views = this.views || [];
                var v = findInCookie(STRINGS.VIEWCOOKIE, viewedItem);
                if (v) {
                    viewedItem.merge(v);
                    removeFromCookie(STRINGS.VIEWCOOKIE, viewedItem);
                }
                if (trackedFeature) {
                    viewedItem.t = trackedFeature;
                }
                if (trackedCohort) {
                    viewedItem.c = trackedCohort;
                }
                this.views.push(viewedItem);
                addCookie(STRINGS.ADDCOOKIE, viewedItem);
            },
            checkAddedItem : function(addedItem) {
                var v = findInCookie(STRINGS.VIEWCOOKIE, addedItem);
                if (v) {
                    this.addView(addedItem);
                }
            },
            addAddedItem : function(addedItem) {
                this.addedItems = this.addedItems || [];
                var a = findInCookie(STRINGS.ADDCOOKIE, addedItem);
                if (a) {
                    addedItem.merge(a);
                    removeFromCookie(STRINGS.ADDCOOKIE, addedItem);
                }
                this.addedItems.push(addedItem);
            },
            addCartItem : function(cartItem) {
                this.cart = this.cart || [];
                if (this.cart.v > 0) {
                    if (window.console && console.warn) {
                        console.warn('Do not mix the deprecated "cartItem" and the prefered "cart" calls.');
                    }
                    return;
                }
                this.cart.push(cartItem);
            },
            setCart : function(cart){
                this.cart = cart;
                this.cart.v = 1;
            },
            addCheckoutItem : function(checkoutItem) {
                this.checkouts = this.checkouts || [];
                this.checkouts.push(checkoutItem);
            },
            setPurchase: function(conf){
                this.checkouts = conf.items;
                if (conf.orderId){
                    this.orderId = conf.orderId;
                }
            },
            commit : function() {
                var that = this;
                ScarabArrays.forEach(transactionListeners, function(listener) {
                    listener(that);
                });
                this.sendRequest();
                start();
            }
        },
        highlightFeatures : function() {
            if (!debugMode) {
                return;
            }
            for (var i = 0; i < features.length; ++i) {
                var label = document.createElement('span');
                label.innerHTML = features[i].f;
                label.style.background = 'red';
                features[i].parent.appendChild(label);
                features[i].parent.style.border = '5px solid red';
            }

        },
        setOrderId : function(orderId) {
            this.orderId = orderId;
        },
        addView : function(viewedItem) {
            this.events.add({
                item : viewedItem,
                event : 'addView'
            });
        },
        addAddedItem : function(addedItem) {
            this.events.add({
                item : addedItem,
                event : 'checkAddedItem'
            });
            this.events.add({
                item : addedItem,
                event : 'addAddedItem'
            });
        },
        addCartItem : function(cartItem) {
            this.events.add({
                item : cartItem,
                event : 'addCartItem'
            });
        },
        setCart : function(cart){
            for (var i = 0, l = cart.length; i < l; i++){
                this.events.add({
                    item : cart[i],
                    event : 'checkAddedItem'
                });
            }
            this.events.add({
                item: cart,
                event: 'setCart'
            });
        },
        addCheckoutItem : function(checkoutItem) {
            this.events.add({
                item : checkoutItem,
                event : 'addCheckoutItem'
            });
        },
        setPurchase: function(conf){
            this.events.add({
                item: conf,
                event: 'setPurchase'
            });
        },
        addKeyword : function(keyword) {
            this.keywords = this.keywords || [];
            this.keywords.push(keyword);
        },
        addSearchTerm : function(searchTerm) {
            this.searchTerm = this.searchTerm || [];
            this.searchTerm.push(searchTerm);
        },
        addCategory : function(category) {
            this.category = this.category || [];
            this.category.push(category);
        },
        addExcludeRule : function(e) {
            this.exclude.push(e);
        },
        setAvailabilityZone: function(az) {
            this.availabilityZone = [az];
        },
        setLanguage: function(lang) {
            this.language = [lang];
        },
        error : function(err) {
            this.errors = this.errors || [];
            this.errors.push(err);
            if (window.console && console.error) {
                console.error(err);
            }
        },
        go : function(immediate, forceSend) {
            this.time = new Date().getTime();
            if (this.id > 1 && Math.abs(transactions[getTrnName(this.id)].time - transactions[getTrnName(this.id-1)].time) < 500) {
                this.error({t: 'MULTIPLE_CALL', c: 'go', m: 'Multiple calls of go command'});
            }

            var hasViews = function(events) {
                for (var i = 0; i < events.length; ++i) {
                    if (events[i].event === 'addView') {
                        return true;
                    }
                }
                return false;
            };
            if (trackedFeature && trackedCohort && !hasViews(this.events.events)) {
                publicInterface.view('scarab/click',0,0,trackedFeature,trackedCohort);
            }
            this.events.add({
                item : null,
                event : 'commit',
                forceSend : forceSend
            });
            this.events.play(immediate);
        },
        registerFeature : function(feature) {
            feature.transaction = this;
            this.features.push(feature);
        },
        serializeList : function(list) {
            var i, l = list.length, o = [];
            for (i = 0; i < l; i++) {
                if (list[i].serialize) {
                    o.push(list[i].serialize());
                } else {
                    o.push(list[i]);
                }
            }
            return o.join('|');
        },
        serializeContext : function() {
            var i, list, slist = [];

            var unsentFeatures = ScarabArrays.filter(this.features, function(feature) { return !feature.requestSent; });
            if (unsentFeatures.length > 0) {
                slist.push('f=' + encodeURIComponent(this.serializeList(unsentFeatures)));
            }

            var tr = this;
            ScarabArrays.forEach(unsentFeatures, function(feature) {
                feature.requestSent = true;
                for (var key in FEATURETRIGGERS){
                    if (!feature.t && feature.f && feature.f.indexOf(key) === 0){
                        var ft = FEATURETRIGGERS[key];
                        if (ft && typeof ft.validate === 'function' && !ft.validate(tr)) {
                            //tr.error('no "' + ft.trigger + '" trigger for "' + feature.f + '" feature.');
                        }
                    }
                }
            });

            for (i in SERIALIZE) {
                if (SERIALIZE.hasOwnProperty(i)) {
                    list = this[SERIALIZE[i]];
                    if (SERIALIZE[i] === 'cart' && list && list.v && list.v > 0) {
                        slist.push('cv=' + list.v);
                    }
                    if (list === null){
                        // do nothing
                    } else if (list.length === 0) {
                        slist.push(i + '=');
                    } else if (list.length > 0) {
                        slist.push(i + '=' +
                                encodeURIComponent(this.serializeList(list)));
                    }
                }
            }

            for (i = 0; i < this.features.length; i++) {
                if (this.features[i].pi && this.features[i].pi.length > 0) {
                    list = Array.prototype.concat([ this.features[i].f ],
                            this.features[i].pi);
                    slist.push('pi=' +
                            encodeURIComponent(this.serializeList(list)));
                }
            }

            if (sessionId) {
                slist.push('s=' + encodeURIComponent(sessionId));
            }
            if (visitorId) {
                slist.push('vi=' + encodeURIComponent(visitorId));
            }
            if (profile) {
                slist.push('p=' + encodeURIComponent(profile));
            }
            if (customerId) {
                slist.push('ci=' + encodeURIComponent(customerId));
            }
            if (emailHash) {
                slist.push('eh=' + encodeURIComponent(emailHash));
            }

            if (trafficSource && /^email_/.test(trafficSource)) {
                var campaignId = trafficSource.replace(/^email_/, '');
                slist.push('campid=' + encodeURIComponent(campaignId));
            }

            if (fields) {
                slist.push('fields=' + encodeURIComponent(this.serializeList(fields)));
            }

            if (this.exclude.length > 0) {
                try {
                    slist.push('ex=' + encodeURIComponent(JSON.stringify(this.exclude)));
                } catch (e) {
                }
            }

            if (forcedCohort) {
                slist.push('fc=' + encodeURIComponent(forcedCohort));
            }
            if (this.orderId) {
                slist.push('oi=' + encodeURIComponent(this.orderId));
            }

            if (getTestMode()) {
                slist.push('test=true');
            }
            if (debugMode) {
                slist.push('debug=' + debugMode);
            }
            if (document.referrer) {
                slist.push('prev_url=' + encodeURIComponent(document.referrer));
            }
            if (this.errors) {
                var errorParam = '';
                try {
                    errorParam = JSON.stringify(this.errors);
                } catch (e) {
                    var a = [];
                    for (var i = 0, l = this.errors.length; i < l; i++) {
                        a.push('{"t":"' + this.errors[i].t + '","c":"' + this.errors[i].c + '","m":"' + this.errors[i].m + '"}');
                    }
                    errorParam = '[' + a.join(',') + ']';
                }
                slist.push('error=' + encodeURIComponent(errorParam));
            }

            return slist.join('&');
        },
        checkRequest : function() {
            return true;
        },
        getHost : function() {
            if (getServerUrl()) {
                return getServerUrl() + '/merchants/';
            }
            var proto = document.location.protocol;
            if (proto === 'file:') {
                proto = 'http:';
            }
            return proto + '//recommender.scarabresearch.com/merchants/';
        },
        generateUrl : function() {

            if (!this.checkRequest()) {
                return false;
            }

            var context = this.serializeContext();
            if (context.length) {
                context += '&';
            }
            var url = this.getHost() + getMerchantId() + '/?' +
                context + 'callback=' +
                this.callbackName;

            return url;
        },
        sendRequest : function() {
            var url = this.generateUrl();
            var jsonpStem = config.jsonpStem || 'scarab-jsonp';
            if (this.callbackName === '') {
                var i = new Image();
                i.src = url;
            } else {
                var s = document.createElement('script');
                s.src = url;
                s.id = jsonpStem + '-' + this.callbackName;
                s.type = 'text/javascript';
                s.charset = 'UTF-8';
                document.getElementsByTagName('head')[0].appendChild(s);
            }
        },

        findFeature : function(feature) {
            if (!this.features || this.features.length === 0) {
                return null;
            }

            for (var i = 0, l = this.features.length; i < l; i++) {
                if (this.features[i].f === feature) {
                    return this.features[i];
                }
            }
            return null;
        },


        callback : function(data) {
            if (data.trace) {
                if (window.console && console.log) {
                    console.log('SCARAB SERVER: ' + data.trace);
                }
            }
            if (data.schema && data.products) {
                for (var productId in data.products) {
                    var newProd = {};
                    for (var j = 0; j < data.schema.length; j++) {
                        newProd[data.schema[j]] = data.products[productId][j];
                    }
                    data.products[productId] = newProd;
                }
            }
            if (data.products) {
                products = ScarabUtil.merge(products, data.products);
            }
            if (data.features) {
                for (var feature in data.features) {
                    if (data.features.hasOwnProperty(feature)) {
                        var currentFeature = this.findFeature(feature);
                        if (currentFeature) {
                            var items = data.features[feature].items;
                            var newPage = new Page();
                            for (var i = 0; i < items.length; i++) {
                                var product = ScarabUtil.merge(items[i], products[items[i].id]);
                                product.trackingCode = feature;
                                newPage.addProduct(product);
                            }

                            currentFeature.hasMore = data.features[feature].hasMore;
                            currentFeature.topicLabel = data.features[feature].topicLabel;
                            currentFeature.cohort = data.cohort;
                            currentFeature.merchants = data.features[feature].merchants;
                            currentFeature.addPage(newPage);
                        }
                    }
                }
            }
            this.highlightFeatures();

            var expiration = new Date();
            expiration.setFullYear(expiration.getFullYear() + 1);

            var vis = data.visitor;
            if (vis) {
                setVisitorId(vis);
                document.cookie = STRINGS.VISITORCOOKIE + '=' + encodeURIComponent('"' + vis + '"') + '; expires=' + expiration.toUTCString() + '; path=/; ' + ScarabUtil.topDomainToCookie(document.domain);
            }

            var prof = data.profile;
            if (prof) {
                setProfile(prof);
                document.cookie = STRINGS.PROFILECOOKIE + '=' + encodeURIComponent('"' + prof + '"') + '; expires=' + expiration.toUTCString() + '; path=/; ' + ScarabUtil.topDomainToCookie(document.domain);
            }
        }
    };

    if (ScarabUtil.inspector) {
        ScarabUtil.inspector.trackObjectFunctions('Transaction', Transaction.prototype);
        ScarabUtil.inspector.trackObjectFunctions('EventHandlers', Transaction.prototype.eventHandlers);
    }

    /*var prevErrorHandler = window.onerror;
    window.onerror = function myErrorHandler(eMsg, url, lineNumber, column, eObject) {
        if (eObject && eObject.stack && eObject.stack.indexOf('scarab-v2.js') > -1) {
            console.error(eMsg + ' @' + url + ', in line ' + lineNumber + (typeof column !== 'undefined' ? ', in column: ' + column : '') + (eObject && eObject.stack ? ', stack: ' + eObject.stack : '') );
        }

    if (prevErrorHandler) {
      return prevErrorHandler(errorMsg, url, lineNumber, column, errorObject);
    }
    return false;
    }*/


    var addFeature = function(featureObject) {
        features.push(featureObject);
        return featureObject;
    };

    var getTrnName = function(id) {
        return 'tx' + (typeof id === 'undefined' ? transactionCounter : id);
    };

    /*
     * Setters and Getters
     */

    var setMerchantId = function(mid) {
        merchantId = mid;
    };

    var getMerchantId = function() {
        if (merchantId) {
            return merchantId;
        }
        var apiTag = document.getElementById('scarab-js-api');
        if (apiTag && apiTag.src) {
            merchantId = apiTag.src.substring(apiTag.src.indexOf('/js/') +
                    '/js/'.length);
            if (merchantId.indexOf('/') !== -1) {
                merchantId = merchantId.substr(0, merchantId.indexOf('/'));
            }
        }
        return merchantId;
    };

    var setSessionId = function(sid) {
        sessionId = sid;
    };

    var setVisitorId = function(vid) {
        visitorId = vid;
    };

    var setCustomerId = function(cid) {
        if (!cid) {
            return;
        }
        customerId = cid;
    };

    var setProfile = function(prof) {
        profile = prof;
    };

    var setEmail = function(email) {
        var tr = getCurrentTransaction();
        if (!isValid(tr, 'setEmail', email, 'email', 'string')) {
            return;
        }
        setEmailHash(ScarabUtil.sha1(ScarabUtil.trim(email).toLowerCase()).substring(0,16) + '1');
    };

    var setEmailHash = function(eh) {
        emailHash = eh;
    };

    var setFields = function(fs) {
        fields = fs;
    };

    var setTestMode = function(tm) {
        testMode = tm;
    };

    var getTestMode = function() {
        return testMode;
    };

    var setServerUrl = function(url) {
        serverUrl = url;
    };

    var getServerUrl = function() {
        return serverUrl;
    };

    var setForcedCohort = function(cohortId) {
        forcedCohort = cohortId;
    };

    var getCurrentTransaction = function() {
        var trn = getTrnName();
        if (trn in transactions) {
            return transactions[trn];
        }
        return null;
    };

    var clearOldFeatureListeners = function(feat) {
        for(var trkey in transactions) {
            var tr= transactions[trkey];
            for (var fkey in tr.features) {
                var f = tr.features[fkey];
                if (f !== feat && f.attachedListeners && f.containerId === feat.containerId){
                    if (f.parent && f.parent.addEventListener && f.elistener) {
                        f.parent.removeEventListener('click', f.elistener);
                        f.elistener = null;
                    } else if (f.parent && f.parent.attachEvent && f.elistener) {
                        f.parent.detachEvent('click', f.elistener);
                        f.elistener = null;
                    }
                }
            }
        }
    };

    /**
     * begin
     */
    var start = function() {
        transactionCounter++;
        transactions[getTrnName()] = new Transaction(transactionCounter);
    };

    /**
     * commit
     */
    var go = function(delayed, forceSend) {
        var trn = getTrnName(),
            ctr = transactions[trn],
            callbackName = 'cb_' + (config.jsonpStem || '') + trn;
        Scarab[callbackName] = function(data) {
            transactions[trn].callback(data);
        };
        ctr.callbackName = 'Scarab.' + callbackName;
        ctr.go(!delayed, forceSend);
        return ctr;
    };

    var myFeature = function(featureName, elementId) {
        if (!document.getElementById(elementId)) {
            throw new ReferenceError('Error in Scarab.myFeature() call: element "' + elementId + '" does not exist.');
        }
        var tr = getCurrentTransaction(), feature = addFeature(new Feature({
            f : featureName,
            containerId : elementId,
            attachedListeners : true,
            cust : 1
        }));
        feature.attachListeners();
        feature.setProducts(feature.findProducts());
        tr.registerFeature(feature);
    };

    var init = function() {
        var qs = ScarabUtil.parseQueryString(w);
        trackedFeature = qs.sc_feature;
        trackedCohort = qs.sc_cohort;
        customerId = qs.sc_customer;
        debugMode = qs.sc_debug;
        trafficSource = qs.sc_src;
        emailHash = qs.sc_eh;

        var vis = ScarabUtil.getCookie(STRINGS.VISITORCOOKIE);
        if (vis && vis.length > 0) {
            setVisitorId(vis);
        }
        var prof = ScarabUtil.getCookie(STRINGS.PROFILECOOKIE);
        if (prof && prof.length > 0) {
            setProfile(prof);
        }
    };

    init();

    start();

    var isValid = function(transaction, command, value, valueName, shouldBe, canBe) {
        var valueType = ScarabUtil.isArray(value) ? 'array' : (value === null ? 'null' : typeof value);
        valueName = valueName || '';
        if (typeof shouldBe === 'string') {
            shouldBe = [shouldBe];
        } else {
            shouldBe = shouldBe || [];
        }
        if (typeof canBe === 'string') {
            canBe = [canBe];
        } else {
            canBe = canBe || [];
        }
        if (ScarabUtil.indexOf(shouldBe, valueType) !== -1) {
            if (valueType === 'string' && ScarabUtil.trim(value) === '') {
                if (transaction) {
                    transaction.error({t: 'INVALID_ARG', c: command, m: 'Invalid argument in ' + command + ': ' + valueName + ' should not be an empty string'});
                }
                return false;
            }
            if (valueType === 'number' && ScarabUtil.isNaN(value)) {
                if (transaction) {
                    transaction.error({t: 'INVALID_ARG', c: command, m: 'Invalid argument in ' + command + ': ' + valueName + ' should not be a NaN'});
                }
                return false;
            }
            return true;
        }
        if (ScarabUtil.indexOf(canBe, valueType) !== -1) {
            if (transaction) {
                transaction.error({t: 'INVALID_ARG', c: command, m: 'Invalid argument in ' + command + ': ' + valueName + ' should be a ' + shouldBe.join(' or ') + ', not a ' + valueType});
            }
            return true;
        }
        if (valueType === 'undefined') {
            if (transaction) {
                transaction.error({t: 'MISSING_ARG', c: command, m: 'Missing argument in ' + command + ': ' + valueName});
            }
        } else {
            if (transaction) {
                transaction.error({t: 'INVALID_ARG', c: command, m: 'Invalid argument in ' + command + ': ' + valueName + ' should be a ' + shouldBe.join(' or ')});
            }
        }
        return false;
    };

    var publicInterface = {
        defaultTemplate : '<![CDATA[ {{ if(SC.page.products.length) { }}<div class="scarab-itemlist"><div class="scarab-prev">◀</div>{{ for(var i=0;i<SC.page.products.length;i++) { }}<span data-scarabitem="{{= SC.page.products[i].id }}" class="scarab-item"><a href="{{= SC.page.products[i].link }}"><img src="{{= SC.page.products[i].image }}">{{= SC.page.products[i].title }}</a></span>{{ } }}<div class="scarab-next">▶</div></div>{{ } }} ]]>',
        testMode : function() {
            setTestMode(true);
        },
        setMerchantId : setMerchantId,
        // TODO: remove this from public API
        setSessionId : setSessionId,
        // TODO: remove this from public API
        setVisitorId : setVisitorId,
        setCustomerId : setCustomerId,
        setEmail : setEmail,
        email : setEmail,
        setFields : setFields,
        setCohortId : setForcedCohort,
        availabilityZone : function(az) {
            var tr = getCurrentTransaction();
            tr.setAvailabilityZone(az);
        },
        language : function(lang) {
            var tr = getCurrentTransaction();
            tr.setLanguage(lang);
        },
        setOrderId : function(orderId) {
            var tr = getCurrentTransaction();
            tr.setOrderId(orderId);
        },
        addKeyword : function(keyword) {
            var tr = getCurrentTransaction();
            tr.addKeyword(keyword);
        },
        searchTerm : function(searchTerm) {
            var tr = getCurrentTransaction();
            tr.addSearchTerm(searchTerm);
        },
        category : function(category) {
            var tr = getCurrentTransaction();
            tr.addCategory(category);
        },

        view : function(itemId, quantity, price, feature, cohort) {
            var tr = getCurrentTransaction();
            if ( tr.views && tr.views.length > 0) {
                tr.error({t: 'MULTIPLE_CALL', c: 'view', m: 'Multiple call of view command'});
            }
            if (isValid(tr, 'view', itemId, 'itemId', ['string', 'number'])) {
                tr.addView(new Item({
                      i : itemId,
                      p : price,
                      q : quantity,
                      t : feature,
                      c : cohort
                }));
            }
        },
        /* deprecated */
        addToCart : function(itemId, quantity, price) {
            var tr = getCurrentTransaction();
            tr.addAddedItem(new Item({
                i : itemId,
                p : price,
                q : quantity
            }));
        },
        /* deprecated */
        cartItem : function(itemId, quantity, price) {
            var tr = getCurrentTransaction();
            tr.addCartItem(new Item({
                i : itemId,
                p : price,
                q : quantity
            }));
        },
        cart : function(cartItems) {
            var tr = getCurrentTransaction();
            if (tr.cart) {
                tr.error({t: 'MULTIPLE_CALL', c: 'cart', m: 'Multiple call of cart command'});
            }
            if (!isValid(tr, 'cart', cartItems, 'cartItems', 'array')) {
                return;
            }
            var c = [];
            for (var i = 0, l = cartItems.length; i < l; i++) {
                if (!isValid(tr, 'cart', cartItems[i].item, 'item', ['string', 'number'])) {
                    return;
                }
                isValid(tr, 'cart', cartItems[i].price, 'price', 'number', 'string');
                isValid(tr, 'cart', cartItems[i].quantity, 'quantity', 'number', 'string');
                c.push(new Item({
                    i: cartItems[i].item,
                    p: cartItems[i].price,
                    q: cartItems[i].quantity
                }));
            }
            tr.setCart(c);
        },
        checkOut : function(itemId, quantity, price) {
            var tr = getCurrentTransaction();
            tr.addCheckoutItem(new Item({
                i : itemId,
                p : price,
                q : quantity
            }));
        },
        purchase: function(conf){
            var tr = getCurrentTransaction();
            if (tr.cart) {
                tr.error({t: 'MULTIPLE_CALL', c: 'purchase', m: 'Multiple call of purchase command'});
            }
            if (!isValid(tr, 'purchase', conf, 'config', 'object') ||
                !isValid(tr, 'purchase', conf.items, 'items', 'array')) {
                return;
            }
            var config = {};
            for (var key in conf){
                if (key === 'orderId') {
                    if (isValid(tr, 'purchase', conf.orderId, 'orderId', ['string', 'number'])){
                        config.orderId = conf.orderId;
                    }
                } else if (key === 'items') {
                    if (conf.items.length === 0) {
                        tr.error({t: 'MISSING_ARG', c: 'purchase', m: 'Missing argument in purchase: items is an empty array'});
                        return;
                    }
                    config.items = [];
                    for (var i = 0, l = conf.items.length; i < l; i++) {
                        if (!isValid(tr, 'purchase', conf.items[i].item, 'item', ['string', 'number']) ||
                            !isValid(tr, 'purchase', conf.items[i].price, 'price', 'number', ['string', 'undefined', 'null']) ||
                            !isValid(tr, 'purchase', conf.items[i].quantity, 'quantity', 'number', ['string', 'undefined','null'])) {
                            return;
                        }
                        config.items.push(new Item({
                            i: conf.items[i].item,
                            p: conf.items[i].price,
                            q: conf.items[i].quantity
                        }));
                    }
                } else {
                    if (window.console && console.warn) {
                        console.warn('unknown property in purchase', key);
                    }
                }
            }
            tr.setPurchase(config);
        },
        include: function(field, rule, value) {
            publicInterface.exclude(field, rule, value, true);
        },
        exclude : function(field, rule, value, negate) {
            if (typeof value === 'undefined') {
                value = rule;
                rule = 'is';
            }

            var RULES = {
              'is': 'IS',
              'has': 'HAS',
              'in': 'IN',
              'overlaps': 'OVERLAPS',
              'is not': 'IS',
              'has not': 'HAS',
              'not in': 'IN'
            };

            if (typeof RULES[rule] === 'undefined') {
                throw new Error('unknown exclude rule: ' + rule);
            }

            if (rule.indexOf('not') !== -1) {
                negate = true;
            }

            if (typeof value !== 'string') {
                value = value.join('|');
            }

            var tr = getCurrentTransaction();
            negate = negate || false;
            tr.addExcludeRule({f:field, r: RULES[rule], v: value, n: negate});
        },
        updateTemplate : function(feature, newTemplate) {
            var tr = getCurrentTransaction();
            var f = tr.findFeature(feature);
            if (f) {
                f.template = doT.template(newTemplate);
            }
        },
        recommend : function(conf, element, limit, template, baselineRecs, successCallback, trigger) {
            var feature = conf;
            if (typeof conf === 'object' && conf !== null) {
                feature = conf.logic;
                element = conf.containerId;
                limit = conf.limit;
                if (conf.templateStr) {
                    template = conf.templateStr;
                } else if (conf.templateId){
                    var te = document.getElementById(conf.templateId);
                    if (te === null) {
                        throw new ReferenceError('Template element does not exist: ' + conf.templateId);
                    }
                    template = te.innerHTML;
                } else {
                    template = publicInterface.defaultTemplate;
                }
                baselineRecs = conf.baseline;
                successCallback = conf.success;
                trigger = conf.trigger;
            }
            var tr = getCurrentTransaction();
            if (!isValid(tr, 'recommend', feature, 'logic', 'string')) {
                return;
            }
            isValid(tr, 'recommend', element, 'containerId', 'string');
            var f = tr.findFeature(feature);
            if (!f) {
                f = new Feature(
                        {
                            f : feature,
                            o : conf.offset || 0,
                            l : parseInt(limit, 10) || 5,
                            t : trigger,
                            containerId : element,
                            template : doT.template(template || publicInterface.defaultTemplate),
                            pages : []
                        });
                if (baselineRecs) {
                    f.setProducts(baselineRecs);
                }
                addFeature(f);
                f.successCallback = successCallback;
            }
            f.requestSent = false;
            f.purgePagesCache();
            tr.registerFeature(f);
            return f;
        },
        // Deprecated - use recommend successCallback
        invokeRendering : function(SC, renderCallback) {
            renderCallback(SC);
        },
        // Deprecated - use recommend successCallback
        beforeRenderingAsync: function(callback) {
            publicInterface.invokeRendering = callback;
        },
        // Deprecated - use recommend successCallback
        beforeRendering: function(callback) {
            if (callback && typeof(callback) === 'function') {
                beforeRendering = callback;
            }
        },
        // Deprecated - use recommend successCallback
        afterRendering: function(callback) {
            if (callback && typeof(callback) === 'function') {
                afterRendering = callback;
            }
        },
        // Deprecated - use recommend successCallback
        skipRendering: function() {
            skipRendering = true;
        },
        itemClick : function(itemId, feature, cohort) {
            addCookie(STRINGS.VIEWCOOKIE, new Item({
                i : itemId,
                t : feature,
                c : cohort
            }));
        },
        myFeature : myFeature,
        go : function(forceSend) {
            go(false, forceSend);
        },
        goAsync : function(forceSend) {
            go(true, forceSend);
        },
        setServerUrl : function(serverUrl) {
            setServerUrl(serverUrl);
        },
        addTransactionListener : function(callback) {
            if (callback && typeof(callback) === 'function') {
                transactionListeners.push(callback);
                for (var i = 1; i < transactionCounter; i++) {
                    callback(transactions[getTrnName(i)]);
                }
            }
        },
        removeTransactionListener : function(callback) {
            if (callback && typeof(callback) === 'function') {
                var index = transactionListeners.indexOf(callback);
                if (index > -1) {
                    transactionListeners.splice(index, 1);
                }
            }
        },
        discovery : function(config) {
            ScarabUtil.loader(ScarabUtil.discoverySrc, 'scarab-discovery', function(discovery){
                discovery.go(config);
            });
        },
        assistant : function(config) {
            config.merchantId = getMerchantId();
            ScarabUtil.loader(ScarabUtil.assistantSrc, 'scarab-assistant', function(assistant){
                assistant.go(config);
            });
        }
    };
    if (ScarabUtil.inspector){
        ScarabUtil.inspector.trackObjectFunctions('ScarabModule',publicInterface);
    }
    return publicInterface;
};

var _scq = _scq || [];
var ScarabQueue = ScarabQueue || [];
var Scarab = Scarab || null;

(function() {
    var initScarab = function() {
        Scarab = Scarab || ScarabModule(window);
        _scq = ScarabUtil.playQueue(Scarab, _scq);
        ScarabQueue = ScarabUtil.playQueue(Scarab, ScarabQueue);
    };

    try {
        var myDate = new Date();
        myDate.setMinutes(myDate.getMinutes() + 30);
        if (window.location.hash.indexOf('sc_inspector') > -1 ) {
            document.cookie = 'sc_inspector=true;expires=' + myDate + ';path=/';
        }
        if (ScarabUtil.getCookie('sc_inspector') === true) {
            ScarabUtil.loader(ScarabUtil.inspectorSrc, 'scarab-inspector', function() {
                initScarab();
            });
        } else {
            initScarab();
        }
        if (window.location.hash.indexOf('sc_assistant') > -1) {
            document.cookie = 'sc_assistant=true;expires=' + myDate + ';path=/';
        }
    } catch(e) {
        if (window.console && console.error) {
            console.error('error during scarab initialization: ', e);
        }
        initScarab();
    }
})();
