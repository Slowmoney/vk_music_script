// ==UserScript==
// @name Vk music downloader
// @description:ru Кнопки для скачивания музыки
// @namespace Slowmoney
// @version     23.08.2020.22.42
// @downloadUrl   https://raw.githubusercontent.com/Slowmoney/vk_music_script/master/vk_music_download.user.js
// @updateUrl     https://raw.githubusercontent.com/Slowmoney/vk_music_script/master/vk_music_download.meta.js
// @match       *://vkontakte.ru/*
// @match       *://*.vkontakte.ru/*
// @match       *://vk.com/*
// @match       *://*.vk.com/*
// @match       *://userapi.com/*
// @match       *://*.userapi.com/*
// @match       *://vk.me/*
// @match       *://*.vk.me/*
// @match       *://*.vkuseraudio.net/*
// @match       *://*.vkuservideo.net/*
// @connect     vkontakte.ru
// @connect     vk.com
// @connect     userapi.com
// @connect     vk.me
// @connect     vkuseraudio.net
// @connect     vkuservideo.net
// @run-at       document-body
// @grant        unsafeWindow
// ==/UserScript==
(function (window, undefined) {
	let w;
	if (typeof unsafeWindow != undefined) {
		w = unsafeWindow;
	} else {
		w = window;
	}
	if (w.self != w.top) {
		return;
	}
	console.log("load");
	
	//ID3 модуль теггера
	!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).ID3Writer = t() }(this, function () { "use strict"; function a(e) { return String(e).split("").map(function (e) { return e.charCodeAt(0) }) } function o(e) { return new Uint8Array(a(e)) } function u(e) { var t = new Uint8Array(2 * e.length); return new Uint16Array(t.buffer).set(a(e)), t } return function () { var e = t.prototype; function t(e) { if (!(e && "object" == typeof e && "byteLength" in e)) throw new Error("First argument should be an instance of ArrayBuffer or Buffer"); this.arrayBuffer = e, this.padding = 4096, this.frames = [], this.url = "" } return e._setIntegerFrame = function (e, t) { var a = parseInt(t, 10); this.frames.push({ name: e, value: a, size: 11 + a.toString().length }) }, e._setStringFrame = function (e, t) { var a = t.toString(); this.frames.push({ name: e, value: a, size: 13 + 2 * a.length }) }, e._setPictureFrame = function (e, t, a, r) { var n, s, i, c = function (e) { if (!e || !e.length) return null; if (255 === e[0] && 216 === e[1] && 255 === e[2]) return "image/jpeg"; if (137 === e[0] && 80 === e[1] && 78 === e[2] && 71 === e[3]) return "image/png"; if (71 === e[0] && 73 === e[1] && 70 === e[2]) return "image/gif"; if (87 === e[8] && 69 === e[9] && 66 === e[10] && 80 === e[11]) return "image/webp"; var t = 73 === e[0] && 73 === e[1] && 42 === e[2] && 0 === e[3], a = 77 === e[0] && 77 === e[1] && 0 === e[2] && 42 === e[3]; return t || a ? "image/tiff" : 66 === e[0] && 77 === e[1] ? "image/bmp" : 0 === e[0] && 0 === e[1] && 1 === e[2] && 0 === e[3] ? "image/x-icon" : null }(new Uint8Array(t)), o = a.toString(); if (!c) throw new Error("Unknown picture MIME type"); a || (r = !1), this.frames.push({ name: "APIC", value: t, pictureType: e, mimeType: c, useUnicodeEncoding: r, description: o, size: (n = t.byteLength, s = c.length, i = o.length, 11 + s + 1 + 1 + (r ? 2 + 2 * (i + 1) : i + 1) + n) }) }, e._setLyricsFrame = function (e, t, a) { var r, n, s = e.split("").map(function (e) { return e.charCodeAt(0) }), i = t.toString(), c = a.toString(); this.frames.push({ name: "USLT", value: c, language: s, description: i, size: (r = i.length, n = c.length, 16 + 2 * r + 2 + 2 + 2 * n) }) }, e._setCommentFrame = function (e, t, a) { var r, n, s = e.split("").map(function (e) { return e.charCodeAt(0) }), i = t.toString(), c = a.toString(); this.frames.push({ name: "COMM", value: c, language: s, description: i, size: (r = i.length, n = c.length, 16 + 2 * r + 2 + 2 + 2 * n) }) }, e._setPrivateFrame = function (e, t) { var a, r, n = e.toString(); this.frames.push({ name: "PRIV", value: t, id: n, size: (a = n.length, r = t.byteLength, 10 + a + 1 + r) }) }, e._setUserStringFrame = function (e, t) { var a, r, n = e.toString(), s = t.toString(); this.frames.push({ name: "TXXX", description: n, value: s, size: (a = n.length, r = s.length, 13 + 2 * a + 2 + 2 + 2 * r) }) }, e._setUrlLinkFrame = function (e, t) { var a = t.toString(); this.frames.push({ name: e, value: a, size: 10 + a.length }) }, e.setFrame = function (e, t) { switch (e) { case "TPE1": case "TCOM": case "TCON": if (!Array.isArray(t)) throw new Error(e + " frame value should be an array of strings"); var a = "TCON" === e ? ";" : "/", r = t.join(a); this._setStringFrame(e, r); break; case "TLAN": case "TIT1": case "TIT2": case "TIT3": case "TALB": case "TPE2": case "TPE3": case "TPE4": case "TRCK": case "TPOS": case "TMED": case "TPUB": case "TCOP": case "TKEY": case "TEXT": case "TSRC": this._setStringFrame(e, t); break; case "TBPM": case "TLEN": case "TDAT": case "TYER": this._setIntegerFrame(e, t); break; case "USLT": if (t.language = t.language || "eng", !("object" == typeof t && "description" in t && "lyrics" in t)) throw new Error("USLT frame value should be an object with keys description and lyrics"); if (t.language && !t.language.match(/[a-z]{3}/i)) throw new Error("Language must be coded following the ISO 639-2 standards"); this._setLyricsFrame(t.language, t.description, t.lyrics); break; case "APIC": if (!("object" == typeof t && "type" in t && "data" in t && "description" in t)) throw new Error("APIC frame value should be an object with keys type, data and description"); if (t.type < 0 || 20 < t.type) throw new Error("Incorrect APIC frame picture type"); this._setPictureFrame(t.type, t.data, t.description, !!t.useUnicodeEncoding); break; case "TXXX": if (!("object" == typeof t && "description" in t && "value" in t)) throw new Error("TXXX frame value should be an object with keys description and value"); this._setUserStringFrame(t.description, t.value); break; case "WCOM": case "WCOP": case "WOAF": case "WOAR": case "WOAS": case "WORS": case "WPAY": case "WPUB": this._setUrlLinkFrame(e, t); break; case "COMM": if (t.language = t.language || "eng", !("object" == typeof t && "description" in t && "text" in t)) throw new Error("COMM frame value should be an object with keys description and text"); if (t.language && !t.language.match(/[a-z]{3}/i)) throw new Error("Language must be coded following the ISO 639-2 standards"); this._setCommentFrame(t.language, t.description, t.text); break; case "PRIV": if (!("object" == typeof t && "id" in t && "data" in t)) throw new Error("PRIV frame value should be an object with keys id and data"); this._setPrivateFrame(t.id, t.data); break; default: throw new Error("Unsupported frame " + e) }return this }, e.removeTag = function () { if (!(this.arrayBuffer.byteLength < 10)) { var e, t, a = new Uint8Array(this.arrayBuffer), r = a[3], n = ((e = [a[6], a[7], a[8], a[9]])[0] << 21) + (e[1] << 14) + (e[2] << 7) + e[3] + 10; if (!(73 !== (t = a)[0] || 68 !== t[1] || 51 !== t[2] || r < 2 || 4 < r)) this.arrayBuffer = new Uint8Array(a.subarray(n)).buffer } }, e.addTag = function () { this.removeTag(); var e, t, r = [255, 254], a = 10 + this.frames.reduce(function (e, t) { return e + t.size }, 0) + this.padding, n = new ArrayBuffer(this.arrayBuffer.byteLength + a), s = new Uint8Array(n), i = 0, c = []; return c = [73, 68, 51, 3], s.set(c, i), i += c.length, i++, i++, c = [(e = a - 10) >>> 21 & (t = 127), e >>> 14 & t, e >>> 7 & t, e & t], s.set(c, i), i += c.length, this.frames.forEach(function (e) { var t, a; switch (c = o(e.name), s.set(c, i), i += c.length, t = e.size - 10, c = [t >>> 24 & (a = 255), t >>> 16 & a, t >>> 8 & a, t & a], s.set(c, i), i += c.length, i += 2, e.name) { case "WCOM": case "WCOP": case "WOAF": case "WOAR": case "WOAS": case "WORS": case "WPAY": case "WPUB": c = o(e.value), s.set(c, i), i += c.length; break; case "TPE1": case "TCOM": case "TCON": case "TLAN": case "TIT1": case "TIT2": case "TIT3": case "TALB": case "TPE2": case "TPE3": case "TPE4": case "TRCK": case "TPOS": case "TKEY": case "TMED": case "TPUB": case "TCOP": case "TEXT": case "TSRC": c = [1].concat(r), s.set(c, i), i += c.length, c = u(e.value), s.set(c, i), i += c.length; break; case "TXXX": case "USLT": case "COMM": c = [1], "USLT" !== e.name && "COMM" !== e.name || (c = c.concat(e.language)), c = c.concat(r), s.set(c, i), i += c.length, c = u(e.description), s.set(c, i), i += c.length, c = [0, 0].concat(r), s.set(c, i), i += c.length, c = u(e.value), s.set(c, i), i += c.length; break; case "TBPM": case "TLEN": case "TDAT": case "TYER": i++, c = o(e.value), s.set(c, i), i += c.length; break; case "PRIV": c = o(e.id), s.set(c, i), i += c.length, i++, s.set(new Uint8Array(e.value), i), i += e.value.byteLength; break; case "APIC": c = [e.useUnicodeEncoding ? 1 : 0], s.set(c, i), i += c.length, c = o(e.mimeType), s.set(c, i), i += c.length, c = [0, e.pictureType], s.set(c, i), i += c.length, e.useUnicodeEncoding ? (c = [].concat(r), s.set(c, i), i += c.length, c = u(e.description), s.set(c, i), i += c.length, i += 2) : (c = o(e.description), s.set(c, i), i += c.length, i++), s.set(new Uint8Array(e.value), i), i += e.value.byteLength } }), i += this.padding, s.set(new Uint8Array(this.arrayBuffer), i), this.arrayBuffer = n }, e.getBlob = function () { return new Blob([this.arrayBuffer], { type: "audio/mpeg" }) }, e.getURL = function () { return this.url || (this.url = URL.createObjectURL(this.getBlob())), this.url }, e.revokeURL = function () { URL.revokeObjectURL(this.url) }, t }() });

	const SETTINGS = {
		copy: {// кнопка копирования название
			enable: true,//true/false включить выключить кнопке
			prepend: "!p ",// при копировании вставлять перед
			icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2E0YWFiNSIgZD0iTTE5LDIxSDhWN0gxOU0xOSw1SDhBMiwyIDAgMCwwIDYsN1YyMUEyLDIgMCAwLDAgOCwyM0gxOUEyLDIgMCAwLDAgMjEsMjFWN0EyLDIgMCAwLDAgMTksNU0xNiwxSDRBMiwyIDAgMCwwIDIsM1YxN0g0VjNIMTZWMVoiIC8+PC9zdmc+',
			// иконка для любителей нестандартного
		},
		telegram: {// кнопка постера в TG  
			enable: true,//true/false включить выключить кнопке
			token: "629439163:AAE6iHZVIYXR1CW7PwK-8hHthuZmdna3weo", // token бота в телеграмме
			channel: "@detoxification", // инмя канала (chat_id)
			icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNhNGFhYjUiIGQ9Im05LjQxNyAxNS4xODEtLjM5NyA1LjU4NGMuNTY4IDAgLjgxNC0uMjQ0IDEuMTA5LS41MzdsMi42NjMtMi41NDUgNS41MTggNC4wNDFjMS4wMTIuNTY0IDEuNzI1LjI2NyAxLjk5OC0uOTMxbDMuNjIyLTE2Ljk3Mi4wMDEtLjAwMWMuMzIxLTEuNDk2LS41NDEtMi4wODEtMS41MjctMS43MTRsLTIxLjI5IDguMTUxYy0xLjQ1My41NjQtMS40MzEgMS4zNzQtLjI0NyAxLjc0MWw1LjQ0MyAxLjY5MyAxMi42NDMtNy45MTFjLjU5NS0uMzk0IDEuMTM2LS4xNzYuNjkxLjIxOHoiLz48L3N2Zz4='
			// иконка для любителей нестандартного
		},
		download: {// кнопка загрузки в строке с песней
			enable: true,//true/false включить выключить кнопке
			icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2E0YWFiNSIgZD0iTTE5LjkyLDEyLjA4TDEyLDIwTDQuMDgsMTIuMDhMNS41LDEwLjY3TDExLDE2LjE3VjJIMTNWMTYuMTdMMTguNSwxMC42NkwxOS45MiwxMi4wOE0xMiwyMEgyVjIySDIyVjIwSDEyWiIgLz48L3N2Zz4='
			// иконка для любителей нестандартного
		},
		albumDownload: {// кнопка загрузки полного альбома
			enable: true,//true/false включить выключить кнопке
		}
	};

	const CLASSNAME_BTN_INLINE = 'audio_row__action';
	const CLASSNAME_BTN_LOAD = 'ui_actions_menu_item';

	const TEXT_LOAD = 'Скачать';
	const TEXT_PUTTELEGRAM = 'Отправить в телеграм';
	const TEXT_COPY = 'Скопировать название';

	const URL_AUDIO = 'al_audio.php';

	//Script Start
	//button 
	new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (
				SETTINGS.albumDownload.enable&&mutation.type == 'childList' &&
				mutation.addedNodes.length == 1 &&
				mutation.addedNodes[0].className == 'ap_layer' 
				
			) {
				// Кнопка скачать в верхней части музыки
				let btn_dwnl = document.createElement('div');
				btn_dwnl.onclick = function () {
					return vk_playlist_download(this);
				};
				btn_dwnl.className = CLASSNAME_BTN_LOAD;
				let el =
					mutation.addedNodes[0].children[0].lastElementChild.firstElementChild.children[0].children[2]
						.children[2].lastElementChild.lastElementChild;
				btn_dwnl.innerHTML = TEXT_LOAD;
				el.prepend(btn_dwnl);
			}
			if (
				mutation.type == 'childList' &&
				mutation.addedNodes.length == 1 &&
				mutation.addedNodes[0].className == '_audio_row__actions audio_row__actions'
			) {
				// Кнопка скачать при навадке на песню
				if (SETTINGS.download.enable) {


					let btn_dwnl = document.createElement('button');
					btn_dwnl.onclick = function () {
						vk_get(this.parentNode.parentNode.parentNode);
						return cancelEvent(event);
					};
					btn_dwnl.onmouseover = function () {
						let u = {
							text: () => TEXT_LOAD,
							black: 1,
							shift: [7, 4, 0],
							needLeft: !0,
							forcetodown: undefined,
							noZIndex: !0,
						};
						showTooltip(this, u);
					};
					btn_dwnl.className = CLASSNAME_BTN_INLINE;
					btn_dwnl.style = 'background-image: url(' + SETTINGS.download.icon + ');';
					mutation.addedNodes[0].append(btn_dwnl);
				}
				// Кнопка Отправить в телеграм канал при навадке на песню
				if (SETTINGS.telegram.enable && SETTINGS.telegram.channel && SETTINGS.telegram.token) {
					let btn_tg = document.createElement('button');
					btn_tg.onclick = function () {
						vk_to_tg(this.parentNode.parentNode.parentNode);
						return cancelEvent(event);
					};
					btn_tg.onmouseover = function () {
						let u = {
							text: () => TEXT_PUTTELEGRAM,
							black: 1,
							shift: [7, 4, 0],
							needLeft: !0,
							forcetodown: undefined,
							noZIndex: !0,
						};
						showTooltip(this, u);
					};
					btn_tg.className = CLASSNAME_BTN_INLINE;
					btn_tg.style = 'background-image: url(' + SETTINGS.telegram.icon + ');';
					mutation.addedNodes[0].prepend(btn_tg);
				}

				// Кнопка Копировать название при навадке на песню
				// РАБОТАЕТ
				if (SETTINGS.copy.enable) {
					let btn_copy = document.createElement('button');
					btn_copy.onclick = function () {
						navigator.permissions.query({ name: "clipboard-write" }).then(result => {
							if (result.state == "granted" || result.state == "prompt") {
								let t = AudioUtils.getAudioFromEl(this.parentNode.parentNode.parentNode, !0)
								navigator.clipboard.writeText(SETTINGS.copy.prepend + t.performer + " - " + t.title)
							}
						});

						return cancelEvent(event);
					};
					btn_copy.onmouseover = function () {
						let u = {
							text: () => TEXT_COPY,
							black: 1,
							shift: [7, 4, 0],
							needLeft: !0,
							forcetodown: undefined,
							noZIndex: !0,
						};
						showTooltip(this, u);
					};
					btn_copy.className = CLASSNAME_BTN_INLINE;
					btn_copy.style = 'background-image: url(' + SETTINGS.copy.icon + ')';
					mutation.addedNodes[0].prepend(btn_copy);
				}
			}
		});
	}).observe(document.querySelector('body'), {
		attributes: true,
		characterData: true,
		childList: true,
		subtree: true,
		attributeOldValue: false,
		characterDataOldValue: false,
	});
	//download 
	async function telegram(url = "", t, tags = { album: "", artist: "", title: "", cover: { data: "", description: "" } }) {
		let div = document.createElement('div');
		div.style =
			'background-color: #d48f8a;width: 100%;position: absolute;    border-radius: 4px;height: ' +
			t.offsetHeight +
			'px;';
		t.parentElement.prepend(div);
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.status + ' ' + response.statusText);
				}
				if (!response.body) {
					throw Error('ReadableStream not yet supported in this browser.');
				}
				const contentLength = response.headers.get('content-length');
				if (!contentLength) {
					throw Error('Content-Length response header unavailable');
				}
				const total = parseInt(contentLength, 10);
				let loaded = 0;
				let buffer = new Uint8Array(total);

				return new Response(
					new ReadableStream({
						start(controller) {
							readMusic(response.body.getReader(), loaded, total, buffer, controller, div, t, async (ret) => {
								const writer = new ID3Writer(ret);
								tags.title && writer.setFrame('TIT2', tags.title)
								tags.artist && writer.setFrame('TPE1', [tags.artist])
								tags.album && writer.setFrame('TALB', tags.album);
								tags.cover.data && tags.cover.description && writer.setFrame('APIC', {
									type: 3,
									data: await getCover(tags.cover.data),
									description: tags.cover.description
								})
								writer.addTag();
								let b = new Blob([writer.arrayBuffer]);
								let formData = new FormData();
								let blob = new Blob([b], { type: 'audio/mp3' });
								formData.append('audio', blob, tags.artist + ' - ' + tags.title + '.mp3');
								formData.append('performer', tags.artist);
								formData.append('title', tags.title);
								let request = new XMLHttpRequest();
								request.open(
									'POST',
									'https://api.telegram.org/bot' +
									SETTINGS.telegram.token +
									'/sendAudio?chat_id=' +
									SETTINGS.telegram.channel
								);
								request.send(formData);
							})
						},
					})
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	async function download(url, t, tags = { album: "", artist: "", title: "", cover: { data: "", description: "" } }) {
		let div = document.createElement('div');
		try {
			div.style =
				'background-color: #f443364d;width: 100%;box-shadow: 0px 0px 2px 0px #797979;position: absolute;    border-radius: 4px;height: ' +
				t.offsetHeight +
				'px;';
			t.parentElement.prepend(div);
		} catch (error) { }
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.status + ' ' + response.statusText);
				}
				if (!response.body) {
					throw Error('ReadableStream not yet supported in this browser.');
				}
				const contentLength = response.headers.get('content-length');
				if (!contentLength) {
					throw Error('Content-Length response header unavailable');
				}
				const total = parseInt(contentLength, 10);
				let loaded = 0;
				let buffer = new Uint8Array(total);
				return new Response(
					new ReadableStream({
						start(controller) {
							readMusic(response.body.getReader(), loaded, total, buffer, controller, div, t, async (buffer) => {
								const writer = new ID3Writer(buffer);
								tags.title && writer.setFrame('TIT2', tags.title)
								tags.artist && writer.setFrame('TPE1', [tags.artist])
								tags.album && writer.setFrame('TALB', tags.album);
								tags.cover.data && tags.cover.description && writer.setFrame('APIC', {
									type: 3,
									data: await getCover(tags.cover.data),
									description: tags.cover.description
								})
								writer.addTag();
								let b = new Blob([writer.arrayBuffer], { type: 'audio/mp3' });
								let a = document.createElement('a');
								a.href = URL.createObjectURL(b);
								a.setAttribute('download', tags.artist + ' - ' + tags.title + '.mp3');
								a.click();
							})
						},
					})
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	//prepare to download
	function vk_playlist_download() {
		let row = document.querySelectorAll('.audio_pl_snippet__list');
		let playlist_id = [];
		if (row.length == 0) {
			row = document.querySelectorAll('.AudioPlaylistSnippet__list ')[0].children;
			let z = getAudioPlayer()._playlists[0];
			playlist_id.push(z._type);
			playlist_id.push(z._ownerId.toString());
			playlist_id.push(z._albumId.toString());
		} else {
			row = row[0].children;
			playlist_id = row[0].offsetParent.querySelector('._audio_pl').dataset.playlistId.split('_');
		}
		console.log(playlist_id);
		getAudioPlayer()._playlists.forEach((t, i) => {
			if (t._type == playlist_id[0] && t._ownerId == playlist_id[1] && t._albumId == playlist_id[2]) {
				vk_url_array_playlist_get(t, row);
			}
		});
	}
	function vk_url_array_playlist_get(playlistData, row) {
		let a = playlistData._list;
		console.log(a);

		for (let offset = 0; offset < a.length; offset += 10) {
			let str = hashList(a, offset).slice(0, -1);
			console.log(str);
			reload_audio(0, str).then(async (e) => {
				let coverData = playlistData._coverUrl;
				if (playlistData._coverUrl && !playlistData._isOfficial) {
					coverData = getCover(coverData)
				}
				try {
					e.forEach((t, i) => {
						if (!playlistData._isOfficial) {
							let c = t[14].split(",")
							coverData = c[c.length - 1];
						}
						let artist = decodeHTML(t[4])
						let title = decodeHTML(t[3])
						let album = playlistData._title
						download(
							vk_decode_url(t[2]),
							row[i + offset].children[0].querySelector('.audio_row__inner'),
							{ album: album, artist: artist, title: title, cover: { data: coverData, description: "front" } }
						);
					});
				} catch (e) { }
			});
		}
	}
	function vk_get(t) {
		reload_audio(t).then((e) => {
			download(vk_decode_url(e[0][2]), t, getTags(t,e[0]));
		});
	}
	function vk_to_tg(t) {
		reload_audio(t).then((e) => {
			telegram(vk_decode_url(e[0][2]), t, getTags(t, e[0]));
		});
	}
	//tagger
	function getTags(t,audioD) {
		let coverContainer = t.offsetParent.offsetParent.querySelector(".audio_pl__cover");
		let coverUrl = (() => {let c = audioD[14].split(","); return c[c.length - 1];})()
		if (coverContainer && coverContainer.style.backgroundImage) {
			coverUrl = coverContainer.style.backgroundImage.slice(5, -2)
		};
		let albumContainer = t.offsetParent.offsetParent.querySelector(".audio_pl_snippet_info_maintitle");
		let album = albumContainer ? albumContainer.textContent : audioD[16]
		let artist = decodeHTML(audioD[4])
		let title = decodeHTML(audioD[3])
		return { album: album, artist: artist, title: title, cover: { data: coverUrl, description: "front" } }
	}
	//decode html symbols
	function decodeHTML(t) {
		let x = document.createElement('span')
		return x.innerHTML = t.replace(/<br\s*\/?>/gim, "\n"),x.innerText
	}
	//file reader
	async function readMusic(reader, loaded, total, buffer, controller, div, t, onDone = () => { }) {
		reader
			.read()
			.then(async ({ done, value }) => {
				if (done) {
					controller.close();
					onDone(buffer);
					return buffer;
				}
				buffer.set(value, loaded);
				loaded += value.byteLength;
				div.style =
					'background-color: #a6c7e8;    border-radius: 4px;position: absolute;width:' +
					(loaded / total) * 100 +
					'%;height: ' +
					t.offsetHeight +
					'px;';
				await readMusic(reader, loaded, total, buffer, controller, div, t, onDone);
			})
			.catch((error) => {
				console.error(error);
				controller.error(error);
			});
	}
	//network function
	function reload_audio(t, ids) {
		ids = (ids && !t) ? ids : (() => { let a = AudioUtils.getAudioFromEl(t, !0); return a.fullId + '_' + a.actionHash + '_' + a.urlHash })()
		return new Promise((resolve, reject) => {
			try {

				ajax.post(
					URL_AUDIO,
					{
						act: 'reload_audio',
						ids: ids,
					},
					{
						onDone: (i) => {
							resolve(i);
						},
					}
				);
			} catch (err) { reject(err) }
		})
	}
	async function getCover(cover) {
		try {
			if (typeof (cover) == "string") {
				let res = await fetch(cover)
				return await res.arrayBuffer()
			} else {
				return cover
			}
		} catch (error) {
			return ""
		}


	}
	//vk_decode_url
	function vk_decode_url(u) {
		rs = s(u).replace('/index.m3u8', '.mp3');
		rs = rs.split('/');
		if (rs.length == 8) {
			delete rs[5];
		} else {
			delete rs[4];
		}
		return rs.join('/');
	}	
	function hashList(a, offset) {
		let str = '';
		for (let i = offset; i < offset + 10; i++) {
			try {
				let hashes = a[i][13].split('/');
				let fullId = a[i][15].content_id;
				let actionHash = hashes[2];
				let urlHash = hashes[5];
				str += fullId + '_' + actionHash + '_' + urlHash + ',';
				if (!urlHash) {
					console.log('cont ', urlHash);
					continue;
				}
			} catch (error) { }
		}
		return str;
	}
	let id = vk.id;
	let n = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=',
		i = {
			v: function (e) {
				return e.split('').reverse().join('');
			},
			r: function (e, t) {
				e = e.split('');
				for (let i, o = n + n, s = e.length; s--;) (i = o.indexOf(e[s])), ~i && (e[s] = o.substr(i - t, 1));
				return e.join('');
			},
			s: function (e, t) {
				let n = e.length;
				if (n) {
					let i = r(e, t),
						o = 0;
					for (e = e.split(''); ++o < n;) e[o] = e.splice(i[n - 1 - o], 1, e[o])[0];
					e = e.join('');
				}
				return e;
			},
			i: function (e, t) {
				return i.s(e, t ^ id);
			},
			x: function (e, t) {
				let n = [];
				return (
					(t = t.charCodeAt(0)),
					each(e.split(''), function (e, i) {
						n.push(String.fromCharCode(i.charCodeAt(0) ^ t));
					}),
					n.join('')
				);
			},
		};
	function o() {
		return window.wbopen && ~(window.open + '').indexOf('wbopen');
	}
	function s(e) {
		if (!o() && ~e.indexOf('audio_api_unavailable')) {
			let t = e.split('?extra=')[1].split('#'),
				n = '' === t[1] ? '' : vk_a(t[1]);
			if (((t = vk_a(t[0])), 'string' != typeof n || !t)) return e;
			n = n ? n.split(String.fromCharCode(9)) : [];
			for (let s, r, l = n.length; l--;) {
				if (((r = n[l].split(String.fromCharCode(11))), (s = r.splice(0, 1, t)[0]), !i[s])) return e;
				t = i[s].apply(null, r);
			}
			if (t && 'http' === t.substr(0, 4)) return t;
		}
		return e;
	}
	function vk_a(e) {
		if (!e || e.length % 4 == 1) return !1;
		for (var t, i, o = 0, s = 0, a = ''; (i = e.charAt(s++));)
			(i = n.indexOf(i)),
				~i &&
				((t = o % 4 ? 64 * t + i : i), o++ % 4) &&
				(a += String.fromCharCode(255 & (t >> ((-2 * o) & 6))));
		return a;
	}
	function r(e, t) {
		let n = e.length,
			i = [];
		if (n) {
			let o = n;
			for (t = Math.abs(t); o--;) (t = ((n * (o + 1)) ^ (t + o)) % n), (i[o] = t);
		}
		return i;
	}
})(window);
