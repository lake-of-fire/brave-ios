(()=>{var t={327:(t,e,n)=>{const{makeUrlAbsolute:r,parseUrl:o}=n(898);function s(t){return t.replace(/www[a-zA-Z0-9]*\./,"").replace(".co.",".").split(".").slice(0,-1).join(" ")}function i(t){return(e,n)=>{let r,o=0;for(let n=0;n<t.rules.length;n++){const[s,i]=t.rules[n],a=Array.from(e.querySelectorAll(s));if(a.length)for(const e of a){let s=t.rules.length-n;if(t.scorers)for(const n of t.scorers){const t=n(e,s);t&&(s=t)}s>o&&(o=s,r=i(e))}}if(!r&&t.defaultValue&&(r=t.defaultValue(n)),r){if(t.processors)for(const e of t.processors)r=e(r,n);return r.trim&&(r=r.trim()),r}}}const a={description:{rules:[['meta[property="og:description"]',t=>t.getAttribute("content")],['meta[name="description" i]',t=>t.getAttribute("content")]]},icon:{rules:[['link[rel="apple-touch-icon"]',t=>t.getAttribute("href")],['link[rel="apple-touch-icon-precomposed"]',t=>t.getAttribute("href")],['link[rel="icon" i]',t=>t.getAttribute("href")],['link[rel="fluid-icon"]',t=>t.getAttribute("href")],['link[rel="shortcut icon"]',t=>t.getAttribute("href")],['link[rel="Shortcut Icon"]',t=>t.getAttribute("href")],['link[rel="mask-icon"]',t=>t.getAttribute("href")]],scorers:[(t,e)=>{const n=t.getAttribute("sizes");if(n){const t=n.match(/\d+/g);if(t)return t[0]}}],defaultValue:t=>"favicon.ico",processors:[(t,e)=>r(e.url,t)]},image:{rules:[['meta[property="og:image:secure_url"]',t=>t.getAttribute("content")],['meta[property="og:image:url"]',t=>t.getAttribute("content")],['meta[property="og:image"]',t=>t.getAttribute("content")],['meta[name="twitter:image"]',t=>t.getAttribute("content")],['meta[property="twitter:image"]',t=>t.getAttribute("content")],['meta[name="thumbnail"]',t=>t.getAttribute("content")]],processors:[(t,e)=>r(e.url,t)]},keywords:{rules:[['meta[name="keywords" i]',t=>t.getAttribute("content")]],processors:[(t,e)=>t.split(",").map((t=>t.trim()))]},title:{rules:[['meta[property="og:title"]',t=>t.getAttribute("content")],['meta[name="twitter:title"]',t=>t.getAttribute("content")],['meta[property="twitter:title"]',t=>t.getAttribute("content")],['meta[name="hdl"]',t=>t.getAttribute("content")],["title",t=>t.text]]},language:{rules:[["html[lang]",t=>t.getAttribute("lang")],['meta[name="language" i]',t=>t.getAttribute("content")]],processors:[(t,e)=>t.split("-")[0]]},type:{rules:[['meta[property="og:type"]',t=>t.getAttribute("content")]]},url:{rules:[["a.amp-canurl",t=>t.getAttribute("href")],['link[rel="canonical"]',t=>t.getAttribute("href")],['meta[property="og:url"]',t=>t.getAttribute("content")]],defaultValue:t=>t.url,processors:[(t,e)=>r(e.url,t)]},provider:{rules:[['meta[property="og:site_name"]',t=>t.getAttribute("content")]],defaultValue:t=>s(o(t.url))}};t.exports={buildRuleSet:i,getMetadata:function(t,e,n){const r={},o={url:e},s=n||a;return Object.keys(s).map((e=>{const n=i(s[e]);r[e]=n(t,o)})),r},getProvider:s,metadataRuleSets:a}},898:(t,e,n)=>{if(void 0!==n.g.URL)t.exports={makeUrlAbsolute:(t,e)=>new URL(e,t).href,parseUrl:t=>new URL(t).host};else{const e=n(575);t.exports={makeUrlAbsolute:(t,n)=>null===e.parse(n).host?e.resolve(t,n):n,parseUrl:t=>e.parse(t).hostname}}},971:function(t,e,n){var r;t=n.nmd(t),function(o){e&&e.nodeType,t&&t.nodeType;var s="object"==typeof n.g&&n.g;s.global!==s&&s.window!==s&&s.self;var i,a=2147483647,l=36,h=/^xn--/,c=/[^\x20-\x7E]/,u=/[\x2E\u3002\uFF0E\uFF61]/g,f={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},p=Math.floor,m=String.fromCharCode;function d(t){throw RangeError(f[t])}function g(t,e){for(var n=t.length,r=[];n--;)r[n]=e(t[n]);return r}function b(t,e){var n=t.split("@"),r="";return n.length>1&&(r=n[0]+"@",t=n[1]),r+g((t=t.replace(u,".")).split("."),e).join(".")}function v(t){for(var e,n,r=[],o=0,s=t.length;o<s;)(e=t.charCodeAt(o++))>=55296&&e<=56319&&o<s?56320==(64512&(n=t.charCodeAt(o++)))?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--):r.push(e);return r}function y(t){return g(t,(function(t){var e="";return t>65535&&(e+=m((t-=65536)>>>10&1023|55296),t=56320|1023&t),e+=m(t)})).join("")}function w(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function x(t,e,n){var r=0;for(t=n?p(t/700):t>>1,t+=p(t/e);t>455;r+=l)t=p(t/35);return p(r+36*t/(t+38))}function A(t){var e,n,r,o,s,i,h,c,u,f,m,g=[],b=t.length,v=0,w=128,A=72;for((n=t.lastIndexOf("-"))<0&&(n=0),r=0;r<n;++r)t.charCodeAt(r)>=128&&d("not-basic"),g.push(t.charCodeAt(r));for(o=n>0?n+1:0;o<b;){for(s=v,i=1,h=l;o>=b&&d("invalid-input"),((c=(m=t.charCodeAt(o++))-48<10?m-22:m-65<26?m-65:m-97<26?m-97:l)>=l||c>p((a-v)/i))&&d("overflow"),v+=c*i,!(c<(u=h<=A?1:h>=A+26?26:h-A));h+=l)i>p(a/(f=l-u))&&d("overflow"),i*=f;A=x(v-s,e=g.length+1,0==s),p(v/e)>a-w&&d("overflow"),w+=p(v/e),v%=e,g.splice(v++,0,w)}return y(g)}function j(t){var e,n,r,o,s,i,h,c,u,f,g,b,y,A,j,O=[];for(b=(t=v(t)).length,e=128,n=0,s=72,i=0;i<b;++i)(g=t[i])<128&&O.push(m(g));for(r=o=O.length,o&&O.push("-");r<b;){for(h=a,i=0;i<b;++i)(g=t[i])>=e&&g<h&&(h=g);for(h-e>p((a-n)/(y=r+1))&&d("overflow"),n+=(h-e)*y,e=h,i=0;i<b;++i)if((g=t[i])<e&&++n>a&&d("overflow"),g==e){for(c=n,u=l;!(c<(f=u<=s?1:u>=s+26?26:u-s));u+=l)j=c-f,A=l-f,O.push(m(w(f+j%A,0))),c=p(j/A);O.push(m(w(c,0))),s=x(n,y,r==o),n=0,++r}++n,++e}return O.join("")}i={version:"1.3.2",ucs2:{decode:v,encode:y},decode:A,encode:j,toASCII:function(t){return b(t,(function(t){return c.test(t)?"xn--"+j(t):t}))},toUnicode:function(t){return b(t,(function(t){return h.test(t)?A(t.slice(4).toLowerCase()):t}))}},void 0===(r=function(){return i}.call(e,n,e,t))||(t.exports=r)}()},587:t=>{"use strict";function e(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t,n,r,o){n=n||"&",r=r||"=";var s={};if("string"!=typeof t||0===t.length)return s;var i=/\+/g;t=t.split(n);var a=1e3;o&&"number"==typeof o.maxKeys&&(a=o.maxKeys);var l=t.length;a>0&&l>a&&(l=a);for(var h=0;h<l;++h){var c,u,f,p,m=t[h].replace(i,"%20"),d=m.indexOf(r);d>=0?(c=m.substr(0,d),u=m.substr(d+1)):(c=m,u=""),f=decodeURIComponent(c),p=decodeURIComponent(u),e(s,f)?Array.isArray(s[f])?s[f].push(p):s[f]=[s[f],p]:s[f]=p}return s}},361:t=>{"use strict";var e=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,n,r,o){return n=n||"&",r=r||"=",null===t&&(t=void 0),"object"==typeof t?Object.keys(t).map((function(o){var s=encodeURIComponent(e(o))+r;return Array.isArray(t[o])?t[o].map((function(t){return s+encodeURIComponent(e(t))})).join(n):s+encodeURIComponent(e(t[o]))})).join(n):o?encodeURIComponent(e(o))+r+encodeURIComponent(e(t)):""}},673:(t,e,n)=>{"use strict";e.decode=e.parse=n(587),e.encode=e.stringify=n(361)},575:(t,e,n)=>{"use strict";var r=n(971),o=n(502);function s(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}e.parse=y,e.resolve=function(t,e){return y(t,!1,!0).resolve(e)},e.resolveObject=function(t,e){return t?y(t,!1,!0).resolveObject(e):e},e.format=function(t){o.isString(t)&&(t=y(t));return t instanceof s?t.format():s.prototype.format.call(t)},e.Url=s;var i=/^([a-z0-9.+-]+:)/i,a=/:[0-9]*$/,l=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,h=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),c=["'"].concat(h),u=["%","/","?",";","#"].concat(c),f=["/","?","#"],p=/^[+a-z0-9A-Z_-]{0,63}$/,m=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,d={javascript:!0,"javascript:":!0},g={javascript:!0,"javascript:":!0},b={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},v=n(673);function y(t,e,n){if(t&&o.isObject(t)&&t instanceof s)return t;var r=new s;return r.parse(t,e,n),r}s.prototype.parse=function(t,e,n){if(!o.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var s=t.indexOf("?"),a=-1!==s&&s<t.indexOf("#")?"?":"#",h=t.split(a);h[0]=h[0].replace(/\\/g,"/");var y=t=h.join(a);if(y=y.trim(),!n&&1===t.split("#").length){var w=l.exec(y);if(w)return this.path=y,this.href=y,this.pathname=w[1],w[2]?(this.search=w[2],this.query=e?v.parse(this.search.substr(1)):this.search.substr(1)):e&&(this.search="",this.query={}),this}var x=i.exec(y);if(x){var A=(x=x[0]).toLowerCase();this.protocol=A,y=y.substr(x.length)}if(n||x||y.match(/^\/\/[^@\/]+@[^@\/]+/)){var j="//"===y.substr(0,2);!j||x&&g[x]||(y=y.substr(2),this.slashes=!0)}if(!g[x]&&(j||x&&!b[x])){for(var O,k,C=-1,_=0;_<f.length;_++){-1!==(I=y.indexOf(f[_]))&&(-1===C||I<C)&&(C=I)}-1!==(k=-1===C?y.lastIndexOf("@"):y.lastIndexOf("@",C))&&(O=y.slice(0,k),y=y.slice(k+1),this.auth=decodeURIComponent(O)),C=-1;for(_=0;_<u.length;_++){var I;-1!==(I=y.indexOf(u[_]))&&(-1===C||I<C)&&(C=I)}-1===C&&(C=y.length),this.host=y.slice(0,C),y=y.slice(C),this.parseHost(),this.hostname=this.hostname||"";var R="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!R)for(var T=this.hostname.split(/\./),U=(_=0,T.length);_<U;_++){var N=T[_];if(N&&!N.match(p)){for(var q="",E=0,S=N.length;E<S;E++)N.charCodeAt(E)>127?q+="x":q+=N[E];if(!q.match(p)){var H=T.slice(0,_),P=T.slice(_+1),F=N.match(m);F&&(H.push(F[1]),P.unshift(F[2])),P.length&&(y="/"+P.join(".")+y),this.hostname=H.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),R||(this.hostname=r.toASCII(this.hostname));var M=this.port?":"+this.port:"",L=this.hostname||"";this.host=L+M,this.href+=this.host,R&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==y[0]&&(y="/"+y))}if(!d[A])for(_=0,U=c.length;_<U;_++){var $=c[_];if(-1!==y.indexOf($)){var z=encodeURIComponent($);z===$&&(z=escape($)),y=y.split($).join(z)}}var V=y.indexOf("#");-1!==V&&(this.hash=y.substr(V),y=y.slice(0,V));var K=y.indexOf("?");if(-1!==K?(this.search=y.substr(K),this.query=y.substr(K+1),e&&(this.query=v.parse(this.query)),y=y.slice(0,K)):e&&(this.search="",this.query={}),y&&(this.pathname=y),b[A]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){M=this.pathname||"";var W=this.search||"";this.path=M+W}return this.href=this.format(),this},s.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var e=this.protocol||"",n=this.pathname||"",r=this.hash||"",s=!1,i="";this.host?s=t+this.host:this.hostname&&(s=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(s+=":"+this.port)),this.query&&o.isObject(this.query)&&Object.keys(this.query).length&&(i=v.stringify(this.query));var a=this.search||i&&"?"+i||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||b[e])&&!1!==s?(s="//"+(s||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):s||(s=""),r&&"#"!==r.charAt(0)&&(r="#"+r),a&&"?"!==a.charAt(0)&&(a="?"+a),e+s+(n=n.replace(/[?#]/g,(function(t){return encodeURIComponent(t)})))+(a=a.replace("#","%23"))+r},s.prototype.resolve=function(t){return this.resolveObject(y(t,!1,!0)).format()},s.prototype.resolveObject=function(t){if(o.isString(t)){var e=new s;e.parse(t,!1,!0),t=e}for(var n=new s,r=Object.keys(this),i=0;i<r.length;i++){var a=r[i];n[a]=this[a]}if(n.hash=t.hash,""===t.href)return n.href=n.format(),n;if(t.slashes&&!t.protocol){for(var l=Object.keys(t),h=0;h<l.length;h++){var c=l[h];"protocol"!==c&&(n[c]=t[c])}return b[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(t.protocol&&t.protocol!==n.protocol){if(!b[t.protocol]){for(var u=Object.keys(t),f=0;f<u.length;f++){var p=u[f];n[p]=t[p]}return n.href=n.format(),n}if(n.protocol=t.protocol,t.host||g[t.protocol])n.pathname=t.pathname;else{for(var m=(t.pathname||"").split("/");m.length&&!(t.host=m.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==m[0]&&m.unshift(""),m.length<2&&m.unshift(""),n.pathname=m.join("/")}if(n.search=t.search,n.query=t.query,n.host=t.host||"",n.auth=t.auth,n.hostname=t.hostname||t.host,n.port=t.port,n.pathname||n.search){var d=n.pathname||"",v=n.search||"";n.path=d+v}return n.slashes=n.slashes||t.slashes,n.href=n.format(),n}var y=n.pathname&&"/"===n.pathname.charAt(0),w=t.host||t.pathname&&"/"===t.pathname.charAt(0),x=w||y||n.host&&t.pathname,A=x,j=n.pathname&&n.pathname.split("/")||[],O=(m=t.pathname&&t.pathname.split("/")||[],n.protocol&&!b[n.protocol]);if(O&&(n.hostname="",n.port=null,n.host&&(""===j[0]?j[0]=n.host:j.unshift(n.host)),n.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===m[0]?m[0]=t.host:m.unshift(t.host)),t.host=null),x=x&&(""===m[0]||""===j[0])),w)n.host=t.host||""===t.host?t.host:n.host,n.hostname=t.hostname||""===t.hostname?t.hostname:n.hostname,n.search=t.search,n.query=t.query,j=m;else if(m.length)j||(j=[]),j.pop(),j=j.concat(m),n.search=t.search,n.query=t.query;else if(!o.isNullOrUndefined(t.search)){if(O)n.hostname=n.host=j.shift(),(R=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=R.shift(),n.host=n.hostname=R.shift());return n.search=t.search,n.query=t.query,o.isNull(n.pathname)&&o.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!j.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var k=j.slice(-1)[0],C=(n.host||t.host||j.length>1)&&("."===k||".."===k)||""===k,_=0,I=j.length;I>=0;I--)"."===(k=j[I])?j.splice(I,1):".."===k?(j.splice(I,1),_++):_&&(j.splice(I,1),_--);if(!x&&!A)for(;_--;_)j.unshift("..");!x||""===j[0]||j[0]&&"/"===j[0].charAt(0)||j.unshift(""),C&&"/"!==j.join("/").substr(-1)&&j.push("");var R,T=""===j[0]||j[0]&&"/"===j[0].charAt(0);O&&(n.hostname=n.host=T?"":j.length?j.shift():"",(R=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=R.shift(),n.host=n.hostname=R.shift()));return(x=x||n.host&&j.length)&&!T&&j.unshift(""),j.length?n.pathname=j.join("/"):(n.pathname=null,n.path=null),o.isNull(n.pathname)&&o.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=t.auth||n.auth,n.slashes=n.slashes||t.slashes,n.href=n.format(),n},s.prototype.parseHost=function(){var t=this.host,e=a.exec(t);e&&(":"!==(e=e[0])&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},502:t=>{"use strict";t.exports={isString:function(t){return"string"==typeof t},isObject:function(t){return"object"==typeof t&&null!==t},isNull:function(t){return null===t},isNullOrUndefined:function(t){return null==t}}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var s=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.loaded=!0,s.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{"use strict";Object.defineProperty(window.__firefox__,"searchQueryForField",{enumerable:!1,configurable:!1,writable:!1,value:function(){var t=document.activeElement;if("input"!==t.tagName.toLowerCase())return null;var e=t.form;if(!e||"get"!=e.method.toLowerCase())return null;var n=e.getElementsByTagName("input"),r=(n=Array.prototype.slice.call(n,0)).map((function(e){return e.name==t.name?[e.name,"{searchTerms}"].join("="):[e.name,e.value].map(encodeURIComponent).join("=")})),o=e.getElementsByTagName("select"),s=(o=Array.prototype.slice.call(o,0)).map((function(t){return[t.name,t.options[t.selectedIndex].value].map(encodeURIComponent).join("=")}));return r=r.concat(s),e.action?[e.action,r.join("&")].join("?"):null}})})(),(()=>{"use strict";const t="__firefox__find-highlight",e="__firefox__find-highlight-active",n=`.${t} {\n  color: #000;\n  background-color: #ffde49;\n  border-radius: 1px;\n  box-shadow: 0 0 0 2px #ffde49;\n  transition: all 100ms ease 100ms;\n}\n.${t}.${e} {\n  background-color: #f19750;\n  box-shadow: 0 0 0 4px #f19750,0 1px 3px 3px rgba(0,0,0,.75);\n}`;var r="",o=null,s=null,i=-1,a=document.createElement("span");a.className=t;var l=document.createElement("style");function h(){s&&(i=(i+s.length+1)%s.length,u())}function c(){if(!s)return;let t,e=s;for(let n=0,r=e.length;n<r;n++)t=e[n],f(t);null,s=null,i=-1}function u(){l.parentNode||document.body.appendChild(l);let n=document.querySelector("."+e);if(n&&(n.className=t),!s)return;let r=s[i];r?(r.className=t+" "+e,function(t,e){let n,r=t.getBoundingClientRect(),o=p(r.left+window.scrollX-window.innerWidth/2,0,document.body.scrollWidth),s=p(40+r.top+window.scrollY-window.innerHeight/2,0,document.body.scrollHeight),i=window.scrollX,a=window.scrollY,l=o-i,h=s-a;function c(t){n||(n=t);let r=t-n,o=Math.min(r/e,1),s=i+l*o,u=a+h*o;window.scrollTo(s,u),r<e&&requestAnimationFrame(c)}requestAnimationFrame(c)}(r,100),webkit.messageHandlers.findInPageHandler.postMessage({securityToken:SECURITY_TOKEN,data:{currentResult:i+1}})):webkit.messageHandlers.findInPageHandler.postMessage({securityToken:SECURITY_TOKEN,data:{currentResult:0}})}function f(t){let e=t.parentNode;if(e){for(;t.firstChild;)e.insertBefore(t.firstChild,t);t.remove(),e.normalize()}}function p(t,e,n){return Math.max(e,Math.min(t,n))}function m(){this.cancelled=!1,this.completed=!1}l.innerHTML=n,m.prototype.constructor=m,m.prototype.cancel=function(){this.cancelled=!0,"function"==typeof this.oncancelled&&this.oncancelled()},m.prototype.complete=function(){this.completed=!0,"function"==typeof this.oncompleted&&(this.cancelled||this.oncompleted())},Object.defineProperty(window.__firefox__,"find",{enumerable:!1,configurable:!1,writable:!1,value:function(t){let e=t.trim(),n=e?t.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"):e;if(n===r)return;if(o&&o.cancel(),c(),r=n,!n)return void webkit.messageHandlers.findInPageHandler.postMessage({securityToken:SECURITY_TOKEN,data:{currentResult:0,totalResults:0}});let l=new RegExp("("+n+")","gi");o=function(t,e){let n=[],r=[],o=!1,s=function(t){let e=new m,n=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,!1),r=setTimeout((function(){(function(t,e,n){return new Promise((function(r,o){function s(){let o;for(let s=0;s<n;s++)if(o=t(),!o||!1===e(o))return void r();setTimeout(s,0)}setTimeout(s,0)}))})((function(){return n.nextNode()}),(function(n){return!e.cancelled&&(t(n),!0)}),100).then((function(){e.complete()}))}),50);return e.oncancelled=function(){clearTimeout(r)},e}((function(i){if(!function(t){let e=t.parentElement;return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}(i))return;let l,h=i.textContent,c=0,u=document.createDocumentFragment(),f=!1;for(;l=t.exec(h);){let e=l[0];if(l.index>0){let t=h.substring(c,l.index);u.appendChild(document.createTextNode(t))}let n=a.cloneNode(!1);if(n.textContent=e,u.appendChild(n),r.push(n),c=t.lastIndex,f=!0,r.length>500){o=!0;break}}if(f){if(c<h.length){let t=h.substring(c,h.length);u.appendChild(document.createTextNode(t))}n.push({originalNode:i,replacementFragment:u})}o&&(s.cancel(),e(n,r))}));return s.oncompleted=function(){e(n,r)},s}(l,(function(t,e){let n;for(let e=0,r=t.length;e<r;e++)n=t[e],n.originalNode.replaceWith(n.replacementFragment);o=null,t,s=e,i=-1;let r=e.length;webkit.messageHandlers.findInPageHandler.postMessage({securityToken:SECURITY_TOKEN,data:{totalResults:r}}),h()}))}}),Object.defineProperty(window.__firefox__,"findNext",{enumerable:!1,configurable:!1,writable:!1,value:h}),Object.defineProperty(window.__firefox__,"findPrevious",{enumerable:!1,configurable:!1,writable:!1,value:function(){s&&(i=(i+s.length-1)%s.length,u())}}),Object.defineProperty(window.__firefox__,"findDone",{enumerable:!1,configurable:!1,writable:!1,value:function(){l.remove(),c(),r=""}})})(),(()=>{"use strict";const{getMetadata:t,metadataRuleSets:e}=n(327);Object.defineProperty(window.__firefox__,"metadata",{enumerable:!1,configurable:!1,writable:!1,value:Object.freeze(new function(){this.getMetadata=function(){const n=e;n.icon.defaultValue=()=>"",n.icon.rules=[['link[rel="icon" i]',t=>t.getAttribute("href")],['link[rel="fluid-icon"]',t=>t.getAttribute("href")],['link[rel="shortcut icon"]',t=>t.getAttribute("href")],['link[rel="Shortcut Icon"]',t=>t.getAttribute("href")]],n.search={rules:[['link[type="application/opensearchdescription+xml"]',t=>({title:t.title,href:t.href})]]},n.largeIcon={rules:[['link[rel="apple-touch-icon"]',t=>t.getAttribute("href")],['link[rel="apple-touch-icon-precomposed"]',t=>t.getAttribute("href")]],defaultValue:null,scorers:[(t,e)=>{const n=t.getAttribute("sizes");if(n){const t=n.match(/\d+/g);if(t){const e=t.reduce(((t,e)=>t*e));return 1-Math.abs(e-32400)/32400}}return.01}],processors:n.icon.processors};const r=t(window.document,document.URL,n);return r.feeds=function(){const t=window.document.querySelectorAll('link[type="application/rss+xml"], link[type="application/atom+xml"], link[rel="alternate"][type="application/json"]');return Array.from(t).map((t=>({href:t.href,title:t.title})))}(),r}}(t))})})()})();