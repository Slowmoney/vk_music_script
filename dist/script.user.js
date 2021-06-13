// ==UserScript==
// @name Vk music downloader
// @version 14.06.2021.02.06
// @match *://*.vk.com/*
// @grant GM_setValue
// @grant GM_getValue
// @run-at document-body
// ==/UserScript==

(()=>{var e={362:function(e){e.exports=function(){"use strict";function e(e){return String(e).split("").map((function(e){return e.charCodeAt(0)}))}function t(t){return new Uint8Array(e(t))}function n(t){var n=new Uint8Array(2*t.length);return new Uint16Array(n.buffer).set(e(t)),n}return function(){var e=a.prototype;function a(e){if(!e||"object"!=typeof e||!("byteLength"in e))throw new Error("First argument should be an instance of ArrayBuffer or Buffer");this.arrayBuffer=e,this.padding=4096,this.frames=[],this.url=""}return e._setIntegerFrame=function(e,t){var n=parseInt(t,10);this.frames.push({name:e,value:n,size:11+n.toString().length})},e._setStringFrame=function(e,t){var n=t.toString();this.frames.push({name:e,value:n,size:13+2*n.length})},e._setPictureFrame=function(e,t,n,a){var o,i,r,s=function(e){if(!e||!e.length)return null;if(255===e[0]&&216===e[1]&&255===e[2])return"image/jpeg";if(137===e[0]&&80===e[1]&&78===e[2]&&71===e[3])return"image/png";if(71===e[0]&&73===e[1]&&70===e[2])return"image/gif";if(87===e[8]&&69===e[9]&&66===e[10]&&80===e[11])return"image/webp";var t=73===e[0]&&73===e[1]&&42===e[2]&&0===e[3],n=77===e[0]&&77===e[1]&&0===e[2]&&42===e[3];return t||n?"image/tiff":66===e[0]&&77===e[1]?"image/bmp":0===e[0]&&0===e[1]&&1===e[2]&&0===e[3]?"image/x-icon":null}(new Uint8Array(t)),l=n.toString();if(!s)throw new Error("Unknown picture MIME type");n||(a=!1),this.frames.push({name:"APIC",value:t,pictureType:e,mimeType:s,useUnicodeEncoding:a,description:l,size:(o=t.byteLength,i=s.length,r=l.length,11+i+1+1+(a?2+2*(r+1):r+1)+o)})},e._setLyricsFrame=function(e,t,n){var a,o,i=e.split("").map((function(e){return e.charCodeAt(0)})),r=t.toString(),s=n.toString();this.frames.push({name:"USLT",value:s,language:i,description:r,size:(a=r.length,o=s.length,16+2*a+2+2+2*o)})},e._setCommentFrame=function(e,t,n){var a,o,i=e.split("").map((function(e){return e.charCodeAt(0)})),r=t.toString(),s=n.toString();this.frames.push({name:"COMM",value:s,language:i,description:r,size:(a=r.length,o=s.length,16+2*a+2+2+2*o)})},e._setPrivateFrame=function(e,t){var n,a,o=e.toString();this.frames.push({name:"PRIV",value:t,id:o,size:(n=o.length,a=t.byteLength,10+n+1+a)})},e._setUserStringFrame=function(e,t){var n,a,o=e.toString(),i=t.toString();this.frames.push({name:"TXXX",description:o,value:i,size:(n=o.length,a=i.length,13+2*n+2+2+2*a)})},e._setUrlLinkFrame=function(e,t){var n=t.toString();this.frames.push({name:e,value:n,size:10+n.length})},e.setFrame=function(e,t){switch(e){case"TPE1":case"TCOM":case"TCON":if(!Array.isArray(t))throw new Error(e+" frame value should be an array of strings");var n="TCON"===e?";":"/",a=t.join(n);this._setStringFrame(e,a);break;case"TLAN":case"TIT1":case"TIT2":case"TIT3":case"TALB":case"TPE2":case"TPE3":case"TPE4":case"TRCK":case"TPOS":case"TMED":case"TPUB":case"TCOP":case"TKEY":case"TEXT":case"TSRC":this._setStringFrame(e,t);break;case"TBPM":case"TLEN":case"TDAT":case"TYER":this._setIntegerFrame(e,t);break;case"USLT":if(t.language=t.language||"eng","object"!=typeof t||!("description"in t)||!("lyrics"in t))throw new Error("USLT frame value should be an object with keys description and lyrics");if(t.language&&!t.language.match(/[a-z]{3}/i))throw new Error("Language must be coded following the ISO 639-2 standards");this._setLyricsFrame(t.language,t.description,t.lyrics);break;case"APIC":if(!("object"==typeof t&&"type"in t&&"data"in t&&"description"in t))throw new Error("APIC frame value should be an object with keys type, data and description");if(t.type<0||20<t.type)throw new Error("Incorrect APIC frame picture type");this._setPictureFrame(t.type,t.data,t.description,!!t.useUnicodeEncoding);break;case"TXXX":if("object"!=typeof t||!("description"in t)||!("value"in t))throw new Error("TXXX frame value should be an object with keys description and value");this._setUserStringFrame(t.description,t.value);break;case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":this._setUrlLinkFrame(e,t);break;case"COMM":if(t.language=t.language||"eng","object"!=typeof t||!("description"in t)||!("text"in t))throw new Error("COMM frame value should be an object with keys description and text");if(t.language&&!t.language.match(/[a-z]{3}/i))throw new Error("Language must be coded following the ISO 639-2 standards");this._setCommentFrame(t.language,t.description,t.text);break;case"PRIV":if("object"!=typeof t||!("id"in t)||!("data"in t))throw new Error("PRIV frame value should be an object with keys id and data");this._setPrivateFrame(t.id,t.data);break;default:throw new Error("Unsupported frame "+e)}return this},e.removeTag=function(){if(!(this.arrayBuffer.byteLength<10)){var e,t,n=new Uint8Array(this.arrayBuffer),a=n[3],o=((e=[n[6],n[7],n[8],n[9]])[0]<<21)+(e[1]<<14)+(e[2]<<7)+e[3]+10;73!==(t=n)[0]||68!==t[1]||51!==t[2]||a<2||4<a||(this.arrayBuffer=new Uint8Array(n.subarray(o)).buffer)}},e.addTag=function(){this.removeTag();var e,a=[255,254],o=10+this.frames.reduce((function(e,t){return e+t.size}),0)+this.padding,i=new ArrayBuffer(this.arrayBuffer.byteLength+o),r=new Uint8Array(i),s=0,l=[];return l=[73,68,51,3],r.set(l,s),s+=l.length,s++,s++,l=[(e=o-10)>>>21&127,e>>>14&127,e>>>7&127,127&e],r.set(l,s),s+=l.length,this.frames.forEach((function(e){var o;switch(l=t(e.name),r.set(l,s),s+=l.length,o=e.size-10,l=[o>>>24&255,o>>>16&255,o>>>8&255,255&o],r.set(l,s),s+=l.length,s+=2,e.name){case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":l=t(e.value),r.set(l,s),s+=l.length;break;case"TPE1":case"TCOM":case"TCON":case"TLAN":case"TIT1":case"TIT2":case"TIT3":case"TALB":case"TPE2":case"TPE3":case"TPE4":case"TRCK":case"TPOS":case"TKEY":case"TMED":case"TPUB":case"TCOP":case"TEXT":case"TSRC":l=[1].concat(a),r.set(l,s),s+=l.length,l=n(e.value),r.set(l,s),s+=l.length;break;case"TXXX":case"USLT":case"COMM":l=[1],"USLT"!==e.name&&"COMM"!==e.name||(l=l.concat(e.language)),l=l.concat(a),r.set(l,s),s+=l.length,l=n(e.description),r.set(l,s),s+=l.length,l=[0,0].concat(a),r.set(l,s),s+=l.length,l=n(e.value),r.set(l,s),s+=l.length;break;case"TBPM":case"TLEN":case"TDAT":case"TYER":s++,l=t(e.value),r.set(l,s),s+=l.length;break;case"PRIV":l=t(e.id),r.set(l,s),s+=l.length,s++,r.set(new Uint8Array(e.value),s),s+=e.value.byteLength;break;case"APIC":l=[e.useUnicodeEncoding?1:0],r.set(l,s),s+=l.length,l=t(e.mimeType),r.set(l,s),s+=l.length,l=[0,e.pictureType],r.set(l,s),s+=l.length,e.useUnicodeEncoding?(l=[].concat(a),r.set(l,s),s+=l.length,l=n(e.description),r.set(l,s),s+=l.length,s+=2):(l=t(e.description),r.set(l,s),s+=l.length,s++),r.set(new Uint8Array(e.value),s),s+=e.value.byteLength}})),s+=this.padding,r.set(new Uint8Array(this.arrayBuffer),s),this.arrayBuffer=i},e.getBlob=function(){return new Blob([this.arrayBuffer],{type:"audio/mpeg"})},e.getURL=function(){return this.url||(this.url=URL.createObjectURL(this.getBlob())),this.url},e.revokeURL=function(){URL.revokeObjectURL(this.url)},a}()}()}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};(()=>{"use strict";n.d(a,{X:()=>u});var e,t,o,i,r=n(362),s=n.n(r);!function(e){async function t(e){try{if("string"==typeof e){let t=await fetch(e);return await t.arrayBuffer()}return e}catch(e){return""}}function n(e,t){return new Promise((async(n,o)=>{try{const o=await fetch(e,{cache:"no-cache"});if(!o.ok)throw Error(o.status+" "+o.statusText);if(!o.body)throw Error("ReadableStream not yet supported in this browser.");const i=o.headers.get("content-length");if(!i)throw Error("Content-Length response header unavailable");const r=parseInt(i,10);let s=0;const l=new Uint8Array(r);return new Response(new ReadableStream({start(e){o.body&&a(o.body.getReader(),s,r,l,e,t(n))}}))}catch(e){o(e)}}))}async function a(e,t,n,o,i,r=(async()=>{})){e.read().then((async({done:s,value:l})=>{if(s)return i.close(),r(o),o;void 0!==l&&(o.set(l,t),t+=l.byteLength),await a(e,t,n,o,i,r)})).catch((e=>{console.error(e),i.error(e)}))}e.downloadSave=function(e,a={album:"",artist:"",title:"",cover:{data:"",description:""}}){return n(e,function(e){return n=>async a=>{const o=new(s())(a);e.title&&o.setFrame("TIT2",e.title),e.artist&&o.setFrame("TPE1",[e.artist]),e.album&&o.setFrame("TALB",e.album),e.cover.data&&e.cover.description&&o.setFrame("APIC",{type:3,data:await t(e.cover.data),description:e.cover.description}),o.addTag();let i=new Blob([o.arrayBuffer],{type:"audio/mp3"}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.setAttribute("download",e.artist+" - "+e.title+".mp3"),r.click(),n(!0)}}(a))},e.downloadTelegram=function(e,a={album:"",artist:"",title:"",cover:{data:"",description:""}}){return n(e,function(e){return n=>async a=>{var o,i;const r=new(s())(a);e.title&&r.setFrame("TIT2",e.title),e.artist&&r.setFrame("TPE1",[e.artist]),e.album&&r.setFrame("TALB",e.album),e.cover.data&&e.cover.description&&r.setFrame("APIC",{type:3,data:await t(e.cover.data),description:e.cover.description}),r.addTag();let l=new Blob([r.arrayBuffer]),c=new FormData,d=new Blob([l],{type:"audio/mp3"});c.append("audio",d,e.artist+" - "+e.title+".mp3"),c.append("performer",e.artist),c.append("title",e.title);let p=new XMLHttpRequest;p.open("POST","https://api.telegram.org/bot"+(null===(o=u.getComponent("telegram"))||void 0===o?void 0:o.prop.token)+"/sendAudio?chat_id="+(null===(i=u.getComponent("telegram"))||void 0===i?void 0:i.prop.channel)),p.send(c),p.onload=function(){n(!0)}}}(a))},e.reload_playlist=async function(e){const t=window.unsafeWindow.getAudioPlayer(),n=e.map((e=>{let t=e[13].split("/");return window.unsafeWindow.AudioUtils.getAudioFullId(e)+"_"+t[2]+"_"+t[5]})).reduce(((e,t)=>(10==e[e.length-1].length&&e.push([]),e[e.length-1].push(t),e)),[[]]);return(await Promise.all(n.map((e=>t.fetchAudioUrls(e))))).reduce(((e,t)=>e.concat(t)),[])}}(e||(e={})),function(e){e.vk={get id(){return window.unsafeWindow.vk?window.unsafeWindow.vk.id:0}};const t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",n={v:function(e){return e.split("").reverse().join("")},r:function(e,n){e=e.split("");for(let a,o=t+t,i=e.length;i--;)a=o.indexOf(e[i]),~a&&(e[i]=o.substr(a-n,1));return e.join("")},s:function(e,t){let n=e.length;if(n){let a=function(e,t){let n=e.length,a=[];if(n){let e=n;for(t=Math.abs(t);e--;)t=(n*(e+1)^t+e)%n,a[e]=t}return a}(e,t),o=0;for(e=e.split("");++o<n;)e[o]=e.splice(a[n-1-o],1,e[o])[0];e=e.join("")}return e},i:function(t,a){return n.s(t,a^e.vk.id)},x:function(e,t){let n=[];return t=t.charCodeAt(0),window.each(e.split(""),(function(e,a){n.push(String.fromCharCode(a.charCodeAt(0)^t))})),n.join("")}};function a(e){if(!e||e.length%4==1)return!1;for(var n,a,o=0,i=0,r="";a=e.charAt(i++);)~(a=t.indexOf(a))&&(n=o%4?64*n+a:a,o++%4)&&(r+=String.fromCharCode(255&n>>(-2*o&6)));return r}function o(e){const t=document.createElement("span");return t.innerHTML=e.replace(/<br\s*\/?>/gim,"\n"),t.innerText}e.vk_decode_url=function(e){const t=function(e){if((!window.wbopen||!~(window.open+"").indexOf("wbopen"))&&~e.indexOf("audio_api_unavailable")){let t=e.split("?extra=")[1].split("#"),o=""===t[1]?"":a(t[1]);if(t=a(t[0]),"string"!=typeof o||!t)return e;o=o?o.split(String.fromCharCode(9)):[];for(let a,i,r=o.length;r--;){if(i=o[r].split(String.fromCharCode(11)),a=i.splice(0,1,t)[0],!n[a])return e;t=n[a].apply(null,i)}if(t&&"http"===t.substr(0,4))return t}return e}(e).replace("/index.m3u8",".mp3").split("/");return 8==t.length?delete t[5]:delete t[4],t.join("/")},e.hashList=function(e,t){let n="";for(let a=t;a<t+10;a++)try{let t=e[a][13].split("/"),o=e[a][15].content_id,i=t[2],r=t[5];if(n+=o+"_"+i+"_"+r+",",!r){console.log("cont ",r);continue}}catch(e){}return n},e.getTags=function(e){const t=document.querySelector(".ap_layer_wrap");let n=null,a=null;t&&t.style.display&&"none"!=t.style.display&&(console.log(),n=document.querySelector("div.audio_pl_snippet__cover.audio_pl__cover"),a=document.querySelector("span.audio_pl_snippet_info_maintitle"));let i=(()=>{let t=e[14].split(",");return t[t.length-1]})();return n&&n.style.backgroundImage&&(i=n.style.backgroundImage.slice(5,-2)),{album:a?a.textContent:e[16],artist:o(e[4]),title:o(e[3]),cover:{data:i,description:"front"}}}}(t||(t={})),function(n){const a=[];let o=!1;n.all=[],n.add=function(e,t){n.all.push(...e.map((e=>({data:e,state:"inprogress",type:t}))));const a=document.querySelector("div#queueCount");a&&(a.innerHTML=n.all.filter((e=>"inprogress"==e.state)).length.toString())},n.start=async function(){if(o)return!1;const i=document.querySelector("div#queueCount");console.time("Start"),o=!0;for(let o=0;o<n.all.length;o++)if(console.log(o,a.length),"done"!=n.all[o].state)try{a.length>=10&&await Promise.race(a);const r=("idle"==n.all[o].type?e.downloadSave:e.downloadTelegram)(t.vk_decode_url(n.all[o].data[2]),t.getTags(n.all[o].data));a.push(r),r.then((e=>{n.all[o].state="done";const t=a.findIndex((e=>e==r));a.splice(t,1),i&&(i.innerHTML=n.all.filter((e=>"inprogress"==e.state)).length.toString())})).catch((e=>{console.log(e),n.all[o].state="failed"}))}catch(e){console.log(e,n.all[o],o),n.all[o].state="failed"}return console.log(a),await Promise.all(a),o=!1,console.log(n.all),console.log(n.all.some((e=>"inprogress"==e.state))),console.log(n.all.some((e=>"failed"==e.state))),console.timeEnd("Start"),i&&(i.innerHTML=n.all.filter((e=>"inprogress"==e.state)).length.toString()),!0}}(o||(o={})),function(t){t.inlineDownload=function(t){var n;let a=document.createElement("button");a.addEventListener("click",(async function(t){var n;t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation(),console.dir(this);let a=this.parentNode;if(a){if(a=a.parentNode,console.log(a),a&&a.parentElement){const t=null===(n=a.parentElement.parentElement)||void 0===n?void 0:n.parentElement,i=window.unsafeWindow.AudioUtils.getAudioFromEl(t,!1);try{const t=await e.reload_playlist([i]);o.add(t,"idle"),o.start()}catch(e){console.log(e)}}return window.unsafeWindow.cancelEvent()}})),a.addEventListener("mouseover",(function(){let e={text:()=>u.getText("TEXT_LOAD"),black:1,shift:[7,4,0],needLeft:!0,forcetodown:void 0,noZIndex:!0};window.unsafeWindow.showTooltip(this,e)})),a.className=u.getText("CLASSNAME_BTN_INLINE"),a.style.cssText="background-image: url("+(null===(n=u.getComponent("download"))||void 0===n?void 0:n.icon)+");",t.addedNodes[0].append(a)},t.albumDownlaod=function(t){let n=document.createElement("div");n.addEventListener("click",(function(){const t=window.unsafeWindow.audioPlaylistLayerWrap.querySelector("._audio_pl"),[n,a,i]=(null==t?void 0:t.dataset.playlistId).split("_"),r=null==t?void 0:t.dataset.accessHash;window.unsafeWindow.getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST,+a,+i,r,!1).loadAll((async t=>{console.log(t._list);const n=await e.reload_playlist(t._list);o.add(n,"idle"),o.start()}))})),n.className=u.getText("CLASSNAME_BTN_LOAD");let a=t.addedNodes[0].querySelector(".ui_actions_menu._ui_menu");n.innerHTML=u.getText("TEXT_LOAD"),a&&a.prepend(n)},t.copy=function(e){var t;let n=document.createElement("button");n.onclick=function(){return navigator.permissions.query({name:"clipboard-write"}).then((e=>{var t;if("granted"==e.state||"prompt"==e.state){let e=this.parentNode;if(!e)return;if(e=e.parentNode,!e)return;let n=window.unsafeWindow.AudioUtils.getAudioFromEl(e.parentNode,!0);navigator.clipboard.writeText((null===(t=u.getComponent("copy"))||void 0===t?void 0:t.prop.prepend)+n.performer+" - "+n.title)}})),window.unsafeWindow.cancelEvent()},n.onmouseover=function(){let e={text:()=>u.getText("TEXT_COPY"),black:1,shift:[7,4,0],needLeft:!0,forcetodown:void 0,noZIndex:!0};window.unsafeWindow.showTooltip(this,e)},n.className=u.getText("CLASSNAME_BTN_INLINE"),n.style.cssText="background-image: url("+(null===(t=u.getComponent("copy"))||void 0===t?void 0:t.icon)+")",e.addedNodes[0].prepend(n)},t.telegram=function(t){var n;let a=document.createElement("button");a.addEventListener("click",(async function(t){var n;t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation(),console.dir(this);let a=this.parentNode;if(a){if(a=a.parentNode,console.log(a),a&&a.parentElement){const t=null===(n=a.parentElement.parentElement)||void 0===n?void 0:n.parentElement,i=window.unsafeWindow.AudioUtils.getAudioFromEl(t,!1);try{const t=await e.reload_playlist([i]);o.add(t,"telegram"),o.start()}catch(e){console.log(e)}}return window.unsafeWindow.cancelEvent()}})),a.addEventListener("mouseover",(function(){let e={text:()=>u.getText("TEXT_PUTTELEGRAM"),black:1,shift:[7,4,0],needLeft:!0,forcetodown:void 0,noZIndex:!0};window.unsafeWindow.showTooltip(this,e)})),a.className=u.getText("CLASSNAME_BTN_INLINE"),a.style.cssText="background-image: url("+(null===(n=u.getComponent("telegram"))||void 0===n?void 0:n.icon)+");",t.addedNodes[0].prepend(a)},t.albumTelegram=function(t){let n=document.createElement("div");n.addEventListener("click",(function(){const t=window.unsafeWindow.audioPlaylistLayerWrap.querySelector("._audio_pl"),[n,a,i]=(null==t?void 0:t.dataset.playlistId).split("_"),r=null==t?void 0:t.dataset.accessHash;window.unsafeWindow.getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST,+a,+i,r,!1).loadAll((async t=>{console.log(t._list);const n=await e.reload_playlist(t._list);o.add(n,"telegram"),o.start()}))})),n.className=u.getText("CLASSNAME_BTN_LOAD");let a=t.addedNodes[0].querySelector(".ui_actions_menu._ui_menu");n.innerHTML=u.getText("TEXT_PUTTELEGRAM"),a&&a.prepend(n)}}(i||(i={}));const l="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2E0YWFiNSIgZD0iTTE5LDIxSDhWN0gxOU0xOSw1SDhBMiwyIDAgMCwwIDYsN1YyMUEyLDIgMCAwLDAgOCwyM0gxOUEyLDIgMCAwLDAgMjEsMjFWN0EyLDIgMCAwLDAgMTksNU0xNiwxSDRBMiwyIDAgMCwwIDIsM1YxN0g0VjNIMTZWMVoiIC8+PC9zdmc+",c="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNhNGFhYjUiIGQ9Im05LjQxNyAxNS4xODEtLjM5NyA1LjU4NGMuNTY4IDAgLjgxNC0uMjQ0IDEuMTA5LS41MzdsMi42NjMtMi41NDUgNS41MTggNC4wNDFjMS4wMTIuNTY0IDEuNzI1LjI2NyAxLjk5OC0uOTMxbDMuNjIyLTE2Ljk3Mi4wMDEtLjAwMWMuMzIxLTEuNDk2LS41NDEtMi4wODEtMS41MjctMS43MTRsLTIxLjI5IDguMTUxYy0xLjQ1My41NjQtMS40MzEgMS4zNzQtLjI0NyAxLjc0MWw1LjQ0MyAxLjY5MyAxMi42NDMtNy45MTFjLjU5NS0uMzk0IDEuMTM2LS4xNzYuNjkxLjIxOHoiLz48L3N2Zz4=",d="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2E0YWFiNSIgZD0iTTE5LjkyLDEyLjA4TDEyLDIwTDQuMDgsMTIuMDhMNS41LDEwLjY3TDExLDE2LjE3VjJIMTNWMTYuMTdMMTguNSwxMC42NkwxOS45MiwxMi4wOE0xMiwyMEgyVjIySDIyVjIwSDEyWiIgLz48L3N2Zz4=",u=new class{constructor(){this.texts=new Map,this.components=new Map,this.texts.set("CLASSNAME_BTN_INLINE","audio_row__action"),this.texts.set("CLASSNAME_BTN_LOAD","ui_actions_menu_item"),this.texts.set("TEXT_LOAD","Скачать"),this.texts.set("TEXT_PUTTELEGRAM","Отправить в телеграм"),this.texts.set("TEXT_COPY","Скопировать название"),this.texts.set("URL_AUDIO","al_audio.php"),console.log(GM_getValue("albumDownload")),this.components.set("albumDownload",GM_getValue("albumDownload")?GM_getValue("albumDownload"):{name:"albumDownload",enable:!0}),this.components.set("copy",GM_getValue("copy")?GM_getValue("copy"):{name:"copy",enable:!0,icon:l,prop:{prepend:"!p "}}),this.components.set("download",GM_getValue("download")?GM_getValue("download"):{name:"download",enable:!0,icon:d}),this.components.set("telegram",GM_getValue("telegram")?GM_getValue("telegram"):{name:"telegram",enable:!0,icon:c,prop:{token:"",channel:""}}),this.components.forEach((e=>{GM_getValue(e.name)||GM_setValue(e.name,e)}))}getText(e){var t;return null!==(t=this.texts.get(e))&&void 0!==t?t:""}getComponent(e){return this.components.get(e)}genSettings(){const e=document.createElement("div");return this.components.forEach((t=>{const n=document.createElement("div"),a=document.createElement("div");a.classList.add("subheader"),a.textContent=t.name,n.append(a);const o=document.createElement("input");o.classList.add("checkbox"),o.checked=t.enable,t.enable&&o.classList.add("on"),o.addEventListener("click",(()=>{o.classList.contains("on")?o.classList.remove("on"):o.classList.add("on"),t.enable=o.classList.contains("on");const e=this.components.get(t.name);e&&(e.enable=t.enable),GM_setValue(t.name,e)})),o.type="checkbox",o.style.marginRight="15px",a.prepend(o);for(const e in t.prop)if(Object.prototype.hasOwnProperty.call(t.prop,e)){const a=t.prop[e];console.log(a,e);const o=document.createElement("div");o.textContent=e;const i=document.createElement("input");i.value=a,i.style.marginLeft="15px",i.classList.add("dark","ape_pl_input"),o.append(i),n.append(o);const r=this.components.get(t.name);i.addEventListener("input",(function(n){t.prop[e]=this.value,r&&(r.prop=t.prop),GM_setValue(t.name,r)}))}n.append(document.createElement("hr")),e.append(n)})),e}};new MutationObserver((function(e){e.forEach((function(e){var t,n,a,o,r,s,l,c,d;(null===(t=u.getComponent("albumDownload"))||void 0===t?void 0:t.enable)&&"childList"==e.type&&1==e.addedNodes.length&&"ap_layer"==e.addedNodes[0].className&&(i.albumDownlaod(e),(null===(n=u.getComponent("telegram"))||void 0===n?void 0:n.enable)&&(null===(a=u.getComponent("telegram"))||void 0===a?void 0:a.prop.channel)&&(null===(o=u.getComponent("telegram"))||void 0===o?void 0:o.prop.token)&&i.albumTelegram(e)),"childList"==e.type&&1==e.addedNodes.length&&"_audio_row__actions audio_row__actions"==e.addedNodes[0].className&&((null===(r=u.getComponent("download"))||void 0===r?void 0:r.enable)&&i.inlineDownload(e),(null===(s=u.getComponent("telegram"))||void 0===s?void 0:s.enable)&&(null===(l=u.getComponent("telegram"))||void 0===l?void 0:l.prop.channel)&&(null===(c=u.getComponent("telegram"))||void 0===c?void 0:c.prop.token)&&i.telegram(e),(null===(d=u.getComponent("copy"))||void 0===d?void 0:d.enable)&&i.copy(e))}))})).observe(document.querySelector("body"),{attributes:!1,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!1,characterDataOldValue:!1});let p=setInterval((function(){if(console.log(document.querySelector("#top_profile_menu")),document.querySelector("#top_profile_menu")){!function(){const e=document.querySelector("#top_profile_menu"),t=document.createElement("a");t.classList.add("top_profile_mrow"),t.text="ВК музыка";const n=e.querySelector("div.top_profile_sep");null==n||n.after(t),console.log(e.classList,e.classList.contains("shown")),t.addEventListener("click",(()=>{const e=document.querySelector("div#box_layer_wrap"),t=document.querySelector("div#box_layer"),n=document.createElement("div");n.classList.add("popup_box_container"),n.style.cssText="width: 40%;",null==t||t.append(n);const a=document.createElement("div");a.classList.add("box_layout"),n.append(a);const o=document.createElement("div");o.classList.add("box_title_wrap"),a.append(o),o.innerHTML='<div class="box_title_controls"></div><div class="box_title">Насторойки vk_music_script</div>';const i=document.createElement("div");i.classList.add("box_x_button"),o.prepend(i),i.addEventListener("click",p);const r=document.createElement("div");r.classList.add("box_body"),a.append(r);const s=document.createElement("div");s.classList.add("box_controls_wrap"),a.append(s);const l=document.createElement("div");l.classList.add("box_controls"),s.append(l);const c=document.createElement("button");c.textContent="Сохранить",c.classList.add("flat_button"),c.addEventListener("click",p),l.append(c);const d=document.querySelector("div#box_layer_bg");function p(a){("box_layer"==a.target.id||a.target.classList.contains("box_x_button")||a.target.classList.contains("flat_button"))&&(d.style.display="none",e.style.display="none",n.remove(),d.removeEventListener("click",p),t.removeEventListener("click",p),c.removeEventListener("click",p),i.removeEventListener("click",p))}d.style.display="flex",e.style.display="flex",d.addEventListener("click",p),t.addEventListener("click",p),r.append(u.genSettings())}))}();const e=document.createElement("a");e.classList.add("chat_tab_wrap"),window.unsafeWindow.Chat.wrap.prepend(e);const t=document.createElement("div");t.classList.add("chat_onl_cont"),e.append(t);const n=document.createElement("div");n.style.color="#b2b2b2",t.append(n),n.id="queueCount",n.innerHTML="0"}clearInterval(p)}),100)})()})();