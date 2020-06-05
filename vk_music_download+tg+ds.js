// ==UserScript==
// @name Vk music downloader tg playlist discord
// @description:ru Кнопки для скачивания музыки
// @namespace Slowmoney
// @version     05.06.2020
// @include     http://vk.com/*
// @include     https://vk.com/*
// @run-at      document-end
// @grant       GM_xmlhttpRequest
// @grant       GM_download
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest

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

	const SETTINGS = {
		btn: {
			telegram: true,
			copy: false,
			download: true,
			topdownload: true,
		},
	};

	const TELEGRAMBOTTOKEN = 'bot629439163:AAE6iHZVIYXR1CW7PwK-8hHthuZmdna3weo';
	const TELEGRAMCHANEL = '@detoxification';
	const ICON_LOAD =
		'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cG9seWdvbiBmaWxsPSIjMDEwMTAxIiBwb2ludHM9IjIzLjEsMzQuMSA1MS41LDYxLjcgODAsMzQuMSA4MS41LDM1IDUxLjUsNjQuMSAyMS41LDM1IDIzLjEsMzQuMSAiLz48L3N2Zz4=';
	const ICON_TELEGRAM =
		'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+PHBhdGggaWQ9InRlbGVncmFtLTEiIGQ9Ik0xOC4zODQsMjIuNzc5YzAuMzIyLDAuMjI4IDAuNzM3LDAuMjg1IDEuMTA3LDAuMTQ1YzAuMzcsLTAuMTQxIDAuNjQyLC0wLjQ1NyAwLjcyNCwtMC44NGMwLjg2OSwtNC4wODQgMi45NzcsLTE0LjQyMSAzLjc2OCwtMTguMTM2YzAuMDYsLTAuMjggLTAuMDQsLTAuNTcxIC0wLjI2LC0wLjc1OGMtMC4yMiwtMC4xODcgLTAuNTI1LC0wLjI0MSAtMC43OTcsLTAuMTRjLTQuMTkzLDEuNTUyIC0xNy4xMDYsNi4zOTcgLTIyLjM4NCw4LjM1Yy0wLjMzNSwwLjEyNCAtMC41NTMsMC40NDYgLTAuNTQyLDAuNzk5YzAuMDEyLDAuMzU0IDAuMjUsMC42NjEgMC41OTMsMC43NjRjMi4zNjcsMC43MDggNS40NzQsMS42OTMgNS40NzQsMS42OTNjMCwwIDEuNDUyLDQuMzg1IDIuMjA5LDYuNjE1YzAuMDk1LDAuMjggMC4zMTQsMC41IDAuNjAzLDAuNTc2YzAuMjg4LDAuMDc1IDAuNTk2LC0wLjAwNCAwLjgxMSwtMC4yMDdjMS4yMTYsLTEuMTQ4IDMuMDk2LC0yLjkyMyAzLjA5NiwtMi45MjNjMCwwIDMuNTcyLDIuNjE5IDUuNTk4LDQuMDYyWm0tMTEuMDEsLTguNjc3bDEuNjc5LDUuNTM4bDAuMzczLC0zLjUwN2MwLDAgNi40ODcsLTUuODUxIDEwLjE4NSwtOS4xODZjMC4xMDgsLTAuMDk4IDAuMTIzLC0wLjI2MiAwLjAzMywtMC4zNzdjLTAuMDg5LC0wLjExNSAtMC4yNTMsLTAuMTQyIC0wLjM3NiwtMC4wNjRjLTQuMjg2LDIuNzM3IC0xMS44OTQsNy41OTYgLTExLjg5NCw3LjU5NloiLz48L3N2Zz4=';
	const ICON_COPY =
		'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA2NCA2NCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IlRleHQtZmlsZXMiPg0KCTxwYXRoIGQ9Ik01My45NzkxNDg5LDkuMTQyOTAwNUg1MC4wMTA4NDljLTAuMDgyNjk4OCwwLTAuMTU2MjAwNCwwLjAyODM5OTUtMC4yMzMxMDA5LDAuMDQ2OTk5OVY1LjAyMjgNCgkJQzQ5Ljc3Nzc0ODEsMi4yNTMsNDcuNDczMTQ4MywwLDQ0LjYzOTg0NjgsMGgtMzQuNDIyNTk2QzcuMzgzOTUxNywwLDUuMDc5MzUxOSwyLjI1Myw1LjA3OTM1MTksNS4wMjI4djQ2Ljg0MzI5OTkNCgkJYzAsMi43Njk3OTgzLDIuMzA0NTk5OCw1LjAyMjgwMDQsNS4xMzc4OTk5LDUuMDIyODAwNGg2LjAzNjcwMDJ2Mi4yNjc4OTg2QzE2LjI1Mzk1Miw2MS44Mjc0MDAyLDE4LjQ3MDI1MTEsNjQsMjEuMTk1NDUxNyw2NA0KCQloMzIuNzgzNjk5YzIuNzI1MjAwNywwLDQuOTQxNDk3OC0yLjE3MjU5OTgsNC45NDE0OTc4LTQuODQzMjAwN1YxMy45ODYxMDAyDQoJCUM1OC45MjA2NDY3LDExLjMxNTUwMDMsNTYuNzA0MzQ5NSw5LjE0MjkwMDUsNTMuOTc5MTQ4OSw5LjE0MjkwMDV6IE03LjExMTA1MTYsNTEuODY2MTAwM1Y1LjAyMjgNCgkJYzAtMS42NDg3OTk5LDEuMzkzODk5OS0yLjk5MDk5OTksMy4xMDYyMDAyLTIuOTkwOTk5OWgzNC40MjI1OTZjMS43MTIzMDMyLDAsMy4xMDYyMDEyLDEuMzQyMiwzLjEwNjIwMTIsMi45OTA5OTk5djQ2Ljg0MzI5OTkNCgkJYzAsMS42NDg3OTk5LTEuMzkzODk4LDIuOTkxMTAwMy0zLjEwNjIwMTIsMi45OTExMDAzaC0zNC40MjI1OTZDOC41MDQ5NTE1LDU0Ljg1NzIwMDYsNy4xMTEwNTE2LDUzLjUxNDkwMDIsNy4xMTEwNTE2LDUxLjg2NjEwMDN6DQoJCSBNNTYuODg4ODQ3NCw1OS4xNTY3OTkzYzAsMS41NTA2MDItMS4zMDU1LDIuODExNTAwNS0yLjkwOTY5ODUsMi44MTE1MDA1aC0zMi43ODM2OTkNCgkJYy0xLjYwNDIwMDQsMC0yLjkwOTc5OTYtMS4yNjA4OTg2LTIuOTA5Nzk5Ni0yLjgxMTUwMDV2LTIuMjY3ODk4NmgyNi4zNTQxOTQ2DQoJCWMyLjgzMzMwMTUsMCw1LjEzNzkwMTMtMi4yNTMwMDIyLDUuMTM3OTAxMy01LjAyMjgwMDRWMTEuMTI3NTk5N2MwLjA3NjkwMDUsMC4wMTg2MDA1LDAuMTUwNDAyMSwwLjA0Njk5OTksMC4yMzMxMDA5LDAuMDQ2OTk5OQ0KCQloMy45NjgyOTk5YzEuNjA0MTk4NSwwLDIuOTA5Njk4NSwxLjI2MDkwMDUsMi45MDk2OTg1LDIuODExNTAwNVY1OS4xNTY3OTkzeiIvPg0KCTxwYXRoIGQ9Ik0zOC42MDMxNDk0LDEzLjIwNjM5OTlIMTYuMjUzOTUyYy0wLjU2MTUwMDUsMC0xLjAxNTkwMDYsMC40NTQyOTk5LTEuMDE1OTAwNiwxLjAxNTgwMDUNCgkJYzAsMC41NjE1OTk3LDAuNDU0NDAwMSwxLjAxNTg5OTcsMS4wMTU5MDA2LDEuMDE1ODk5N2gyMi4zNDkxOTc0YzAuNTYxNTAwNSwwLDEuMDE1ODk5Ny0wLjQ1NDI5OTksMS4wMTU4OTk3LTEuMDE1ODk5Nw0KCQlDMzkuNjE5MDQ5MSwxMy42NjA2OTk4LDM5LjE2NDY1LDEzLjIwNjM5OTksMzguNjAzMTQ5NCwxMy4yMDYzOTk5eiIvPg0KCTxwYXRoIGQ9Ik0zOC42MDMxNDk0LDIxLjMzMzQwMDdIMTYuMjUzOTUyYy0wLjU2MTUwMDUsMC0xLjAxNTkwMDYsMC40NTQyOTk5LTEuMDE1OTAwNiwxLjAxNTc5ODYNCgkJYzAsMC41NjE1MDA1LDAuNDU0NDAwMSwxLjAxNTkwMTYsMS4wMTU5MDA2LDEuMDE1OTAxNmgyMi4zNDkxOTc0YzAuNTYxNTAwNSwwLDEuMDE1ODk5Ny0wLjQ1NDQwMSwxLjAxNTg5OTctMS4wMTU5MDE2DQoJCUMzOS42MTkwNDkxLDIxLjc4NzcwMDcsMzkuMTY0NjUsMjEuMzMzNDAwNywzOC42MDMxNDk0LDIxLjMzMzQwMDd6Ii8+DQoJPHBhdGggZD0iTTM4LjYwMzE0OTQsMjkuNDYwMzAwNEgxNi4yNTM5NTJjLTAuNTYxNTAwNSwwLTEuMDE1OTAwNiwwLjQ1NDM5OTEtMS4wMTU5MDA2LDEuMDE1ODk5Nw0KCQlzMC40NTQ0MDAxLDEuMDE1ODk5NywxLjAxNTkwMDYsMS4wMTU4OTk3aDIyLjM0OTE5NzRjMC41NjE1MDA1LDAsMS4wMTU4OTk3LTAuNDU0Mzk5MSwxLjAxNTg5OTctMS4wMTU4OTk3DQoJCVMzOS4xNjQ2NSwyOS40NjAzMDA0LDM4LjYwMzE0OTQsMjkuNDYwMzAwNHoiLz4NCgk8cGF0aCBkPSJNMjguNDQ0NDQ4NSwzNy41ODcyOTkzSDE2LjI1Mzk1MmMtMC41NjE1MDA1LDAtMS4wMTU5MDA2LDAuNDU0Mzk5MS0xLjAxNTkwMDYsMS4wMTU4OTk3DQoJCXMwLjQ1NDQwMDEsMS4wMTU4OTk3LDEuMDE1OTAwNiwxLjAxNTg5OTdoMTIuMTkwNDk2NGMwLjU2MTUwMjUsMCwxLjAxNTgwMDUtMC40NTQzOTkxLDEuMDE1ODAwNS0xLjAxNTg5OTcNCgkJUzI5LjAwNTk1MDksMzcuNTg3Mjk5MywyOC40NDQ0NDg1LDM3LjU4NzI5OTN6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==';

	const CLASSNAME_BTN_INLINE = 'audio_row__action';
	const CLASSNAME_BTN_LOAD = 'ui_actions_menu_item';

	const TEXT_LOAD = 'Скачать';
	const TEXT_PUTTELEGRAM = 'Отправить в телеграм';
	const TEXT_COPY = 'Скопировать название';

	const URL_AUDIO = 'al_audio.php';

	//Script Start
	new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (
				mutation.type == 'childList' &&
				mutation.addedNodes.length == 1 &&
				mutation.addedNodes[0].className == 'ap_layer' &&
				SETTINGS.btn.topdownload
			) {
				// Кнопка скачать в верхней части музыки
				let div = document.createElement('div');
				div.onclick = function () {
					return vk_playlist_download(this);
				};
				div.className = CLASSNAME_BTN_LOAD;
				let el =
					mutation.addedNodes[0].children[0].lastElementChild.firstElementChild.children[0].children[2]
						.children[2].lastElementChild.lastElementChild;
				div.innerHTML = TEXT_LOAD;
				el.prepend(div);
			}
			if (
				mutation.type == 'childList' &&
				mutation.addedNodes.length == 1 &&
				mutation.addedNodes[0].className == '_audio_row__actions audio_row__actions'
			) {
				// Кнопка скачать при навадке на песню
				let button = document.createElement('button');
				button.onclick = function () {
					vk_get(this.parentNode.parentNode.parentNode);
					return cancelEvent(event);
				};
				button.onmouseover = function () {
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
				button.className = CLASSNAME_BTN_INLINE;
				button.style = 'background-image: url(' + ICON_LOAD + ');';
				mutation.addedNodes[0].prepend(button);
				// Кнопка Отправить в телеграм канал при навадке на песню
				if (SETTINGS.btn.telegram) {
					let button_tg = document.createElement('button');
					button_tg.onclick = function () {
						vk_to_tg(this.parentNode.parentNode.parentNode);
						return cancelEvent(event);
					};
					button_tg.onmouseover = function () {
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
					button_tg.className = CLASSNAME_BTN_INLINE;
					button_tg.style = 'background-image: url(' + ICON_TELEGRAM + ');';
					mutation.addedNodes[0].prepend(button_tg);
				}

				// Кнопка Копировать название при навадке на песню
				// НЕ РАБОТАЕТ
				if (SETTINGS.btn.copy) {
					let button_ds = document.createElement('button');
					button_ds.onclick = function () {
						let input = document.createElement('input');
						input.value = 'test';
						input.select();
						input.setSelectionRange(0, 99999);
						console.dir(input);
						try {
							let successful = document.execCommand('copy');
						} catch (err) {
							console.error('Oops, unable to copy');
						}
						return cancelEvent(event);
					};
					button_ds.onmouseover = function () {
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
					button_ds.className = CLASSNAME_BTN_INLINE;
					button_ds.style = 'background-image: url(' + ICON_COPY + ')';
					mutation.addedNodes[0].prepend(button_ds);
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
	// Кнопка Скачать
	try {
		if (SETTINGS.btn.download) {
			let div = document.createElement('div');
			div.onclick = function () {
				vk_playlist_download(this);
			};
			div.className = CLASSNAME_BTN_LOAD;
			let el = document.querySelector('.ActionsMenu__inner');
			div.innerHTML = TEXT_LOAD;
			el.prepend(div);
		}
    } catch (e) {}
    
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
				vk_url_array_playlist_get(t._list, row);
			}
		});
    }
	/**
     *
     *
     * @param {Array} a
     * @param {HTMLElement} row
     */
    function vk_url_array_playlist_get(a, row) {
		console.log(a);
		let n = 10;
		for (let offset = 0; offset < a.length; offset += n) {
			let str = '';
			for (let i = offset; i < offset + n; i++) {
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
				} catch (error) {}
			}
			console.log(str.slice(0, -1));
			new Promise((resolve) => {
				try {
					ajax.post(
						URL_AUDIO,
					{
							act: 'reload_audio',
							ids: str.slice(0, -1),
						},
						{
							onDone: (i) => {
								resolve(i);
							},
						}
					);
				} catch (err) {}
			}).then((e) => {
				try {
					e.forEach((t, i) => {
						download(
							vk_decode_url(t[2]),
							t[4] + ' - ' + t[3] + '.mp3',
							row[i + offset].children[0].querySelector('.audio_row__inner')
						);
					});
				} catch (error) {}
			});
		}
    }
	/**
     *
     *
     * @param {string} url
     * @param {string} e
     * @param {HTMLElement} t
     */
    async function put_tg(url, e, t) {
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
							const reader = response.body.getReader();
							read();
							function read() {
								reader
									.read()
									.then(({done, value}) => {
										if (done) {
											controller.close();
											let b = new Blob([buffer]);
											let formData = new FormData();
											let blob = new Blob([b], {type: 'audio/mp3'});
											formData.append('audio', blob, e[4] + ' - ' + e[3] + '.mp3');
											formData.append('performer', e[4]);
											formData.append('title', e[3]);
											let request = new XMLHttpRequest();
											request.open(
												'POST',
												'https://api.telegram.org/' +
													TELEGRAMBOTTOKEN +
													'/sendAudio?chat_id=' +
													TELEGRAMCHANEL
											);
											request.send(formData);
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
										read();
									})
									.catch((error) => {
										console.error(error);
										controller.error(error);
									});
							}
						},
					})
				);
			})
			.catch((error) => {
				console.error(error);
			});
    }
    
	/**
     *
     *
     * @param {HTMLElement} t
     */
    function vk_get(t) {
		new Promise((resolve) => {
			try {
				let a = AudioUtils.getAudioFromEl(t, !0);
				ajax.post(
					URL_AUDIO,
					{
						act: 'reload_audio',
						ids: a.fullId + '_' + a.actionHash + '_' + a.urlHash,
					},
					{
						onDone: (i) => {
							resolve(i[0]);
						},
					}
				);
			} catch (err) {}
		}).then((e) => {
			console.log([e, vk_decode_url(e[2]), t]);
			download(vk_decode_url(e[2]), e[4] + ' - ' + e[3] + '.mp3', t);
		});
    }
    
	/**
     *
     *
     * @param {HTMLElement} t
     */
    function vk_to_tg(t) {
		new Promise((resolve) => {
			try {
				let a = AudioUtils.getAudioFromEl(t, !0);
				ajax.post(
					URL_AUDIO,
					{
						act: 'reload_audio',
						ids: a.fullId + '_' + a.actionHash + '_' + a.urlHash,
					},
					{
						onDone: (i) => {
							resolve(i[0]);
						},
					}
				);
			} catch (err) {}
		}).then((e) => {
			put_tg(vk_decode_url(e[2]), e, t);
		});
    }
	/**
     *
     *
     * @param {string} u
     * @returns
     */
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
	/**
     *
     *
     * @param {string} url
     * @param {string} filename
     * @param {HTMLElement} t
     */
    async function download(url, filename, t) {
		let div = document.createElement('div');
		try {
			div.style =
				'background-color: #f443364d;width: 100%;box-shadow: 0px 0px 2px 0px #797979;position: absolute;    border-radius: 4px;height: ' +
				t.offsetHeight +
				'px;';
			t.parentElement.prepend(div);
		} catch (error) {}
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
							const reader = response.body.getReader();
							read();
							function read() {
								reader
									.read()
									.then(({done, value}) => {
										if (done) {
											controller.close();
											let b = new Blob([buffer], {type: 'audio/mp3'});
											let a = document.createElement('a');
											a.href = URL.createObjectURL(b);
											a.setAttribute('download', filename);
											a.click();
											return buffer;
										}
										buffer.set(value, loaded);
										loaded += value.byteLength;
										try {
											div.style =
												'background-color: #c3d0dd;box-shadow: 0px 0px 2px 0px #797979; border-radius: 4px;position: absolute;width:' +
												(loaded / total) * 100 +
												'%;height: ' +
												t.offsetHeight +
												'px;';
										} catch (error) {}
										read();
									})
									.catch((error) => {
										console.error(error);
										controller.error(error);
									});
							}
						},
					})
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	let id = vk.id;
	let n = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=',
		i = {
			v: function (e) {
				return e.split('').reverse().join('');
			},
			r: function (e, t) {
				e = e.split('');
				for (let i, o = n + n, s = e.length; s--; ) (i = o.indexOf(e[s])), ~i && (e[s] = o.substr(i - t, 1));
				return e.join('');
			},
			s: function (e, t) {
				let n = e.length;
				if (n) {
					let i = r(e, t),
						o = 0;
					for (e = e.split(''); ++o < n; ) e[o] = e.splice(i[n - 1 - o], 1, e[o])[0];
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
			for (let s, r, l = n.length; l--; ) {
				if (((r = n[l].split(String.fromCharCode(11))), (s = r.splice(0, 1, t)[0]), !i[s])) return e;
				t = i[s].apply(null, r);
			}
			if (t && 'http' === t.substr(0, 4)) return t;
		}
		return e;
	}
	function vk_a(e) {
		if (!e || e.length % 4 == 1) return !1;
		for (var t, i, o = 0, s = 0, a = ''; (i = e.charAt(s++)); )
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
			for (t = Math.abs(t); o--; ) (t = ((n * (o + 1)) ^ (t + o)) % n), (i[o] = t);
		}
		return i;
	}
})(window);
