(()=>{"use strict";Object.defineProperty(navigator,"brave",{enumerable:!1,configurable:!0,writable:!1,value:Object.freeze({isBrave:()=>new Promise((e=>e(!0)))})})})(),window.__firefox__.includeOnce("FullscreenHelper",(function(e){let t=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled),n=void 0!==HTMLVideoElement.prototype.webkitEnterFullscreen;t||!n||/mobile/i.test(navigator.userAgent)||(HTMLElement.prototype.requestFullscreen=e((function(){if(void 0!==this.webkitRequestFullscreen)return this.webkitRequestFullscreen(),!0;if(void 0!==this.webkitEnterFullscreen)return this.webkitEnterFullscreen(),!0;var e=this.querySelector("video");return void 0!==e&&(e.webkitEnterFullscreen(),!0)})),Object.defineProperty(document,"fullscreenEnabled",{get:function(){return!0}}),Object.defineProperty(document.documentElement,"fullscreenEnabled",{get:function(){return!0}}))})),(()=>{"use strict";Object.defineProperty(navigator,"globalPrivacyControl",{enumerable:!1,configurable:!1,writable:!1,value:!0})})(),(()=>{"use strict";window.__firefox__.includeOnce("PrintScript",(function(e){window.print=e((function(){e.postNativeMessage("printScriptHandler",{securityToken:SECURITY_TOKEN})}))}))})();