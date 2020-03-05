// ==UserScript==
// @name Vk music downloader tg playlist
// @namespace Slowmoney
// @version     0.0
// @include     http://*
// @include     https://*
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// @connect     vk.com
// @connect     vk.me
// @connect     userapi.com
// @connect     vkuseraudio.net
// @connect     vkuservideo.net
// @connect     vk-cdn.net
// ==/UserScript==
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }
    if (w.self != w.top) {
        return;
    }
    new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type == "childList" && mutation.addedNodes.length == 1 && mutation.addedNodes[0].className == "ap_layer") {
                var div = document.createElement("div");
                div.onclick = function () { return vk_playlist_download(this); };
                div.className = "ui_actions_menu_item";
                let el = mutation.addedNodes[0].children[0].lastElementChild.firstElementChild.children[0].children[2].children[2].lastElementChild.lastElementChild;
                div.innerHTML = "Скачать";
                el.prepend(div);
            }
            if (mutation.type == "childList" && mutation.addedNodes.length == 1 && mutation.addedNodes[0].className == "_audio_row__actions audio_row__actions") {
                var button = document.createElement("button");
                button.onclick = function () { vk_get(this.parentNode.parentNode.parentNode); return cancelEvent(event); };
                button.onmouseover = function () {
                    var u = {
                        text: () => "Скачать",
                        black: 1,
                        shift: [7, 4, 0],
                        needLeft: !0,
                        forcetodown: undefined,
                        noZIndex: !0,
                    };
                    showTooltip(this, u);
                };
                button.className = "audio_row__action";
                button.style = "background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cG9seWdvbiBmaWxsPSIjMDEwMTAxIiBwb2ludHM9IjIzLjEsMzQuMSA1MS41LDYxLjcgODAsMzQuMSA4MS41LDM1IDUxLjUsNjQuMSAyMS41LDM1IDIzLjEsMzQuMSAiLz48L3N2Zz4=);"
                mutation.addedNodes[0].prepend(button);

                var button_tg = document.createElement("button");
                button_tg.onclick = function () { vk_to_tg(this.parentNode.parentNode.parentNode); return cancelEvent(event); };
                button_tg.onmouseover = function () {
                    var u = {
                        text: () => "Отправить в канал",
                        black: 1,
                        shift: [7, 4, 0],
                        needLeft: !0,
                        forcetodown: undefined,
                        noZIndex: !0,
                    };
                    showTooltip(this, u);
                };
                button_tg.className = "audio_row__action";
                button_tg.style = "background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+PHBhdGggaWQ9InRlbGVncmFtLTEiIGQ9Ik0xOC4zODQsMjIuNzc5YzAuMzIyLDAuMjI4IDAuNzM3LDAuMjg1IDEuMTA3LDAuMTQ1YzAuMzcsLTAuMTQxIDAuNjQyLC0wLjQ1NyAwLjcyNCwtMC44NGMwLjg2OSwtNC4wODQgMi45NzcsLTE0LjQyMSAzLjc2OCwtMTguMTM2YzAuMDYsLTAuMjggLTAuMDQsLTAuNTcxIC0wLjI2LC0wLjc1OGMtMC4yMiwtMC4xODcgLTAuNTI1LC0wLjI0MSAtMC43OTcsLTAuMTRjLTQuMTkzLDEuNTUyIC0xNy4xMDYsNi4zOTcgLTIyLjM4NCw4LjM1Yy0wLjMzNSwwLjEyNCAtMC41NTMsMC40NDYgLTAuNTQyLDAuNzk5YzAuMDEyLDAuMzU0IDAuMjUsMC42NjEgMC41OTMsMC43NjRjMi4zNjcsMC43MDggNS40NzQsMS42OTMgNS40NzQsMS42OTNjMCwwIDEuNDUyLDQuMzg1IDIuMjA5LDYuNjE1YzAuMDk1LDAuMjggMC4zMTQsMC41IDAuNjAzLDAuNTc2YzAuMjg4LDAuMDc1IDAuNTk2LC0wLjAwNCAwLjgxMSwtMC4yMDdjMS4yMTYsLTEuMTQ4IDMuMDk2LC0yLjkyMyAzLjA5NiwtMi45MjNjMCwwIDMuNTcyLDIuNjE5IDUuNTk4LDQuMDYyWm0tMTEuMDEsLTguNjc3bDEuNjc5LDUuNTM4bDAuMzczLC0zLjUwN2MwLDAgNi40ODcsLTUuODUxIDEwLjE4NSwtOS4xODZjMC4xMDgsLTAuMDk4IDAuMTIzLC0wLjI2MiAwLjAzMywtMC4zNzdjLTAuMDg5LC0wLjExNSAtMC4yNTMsLTAuMTQyIC0wLjM3NiwtMC4wNjRjLTQuMjg2LDIuNzM3IC0xMS44OTQsNy41OTYgLTExLjg5NCw3LjU5NloiLz48L3N2Zz4=);"
                mutation.addedNodes[0].prepend(button_tg);
            }
        });
    }).observe(document.querySelector("body"), {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
    });
    function vk_playlist_download(t) {
        let row = t.parentElement.offsetParent.offsetParent.nextElementSibling.children[2].children;
        let playlist_id = row[0].offsetParent.querySelector("._audio_pl").dataset.playlistId.split("_");

        getAudioPlayer()._playlists.forEach((t) => {
            if (t._type == playlist_id[0] && t._ownerId == playlist_id[1] && t._albumId == playlist_id[2]) {
                vk_url_array_playlist_get(t._list, row);
            }
        });

    }
    function vk_url_array_playlist_get(a, row) {

        var n = 10;
        for (let offset = 0; offset < a.length; offset += n) {
            
            let str = "";
            for (let i = offset; i < offset + n; i++) {
               
                try {
                    let hashes = a[i][13].split("/");
                    let fullId = a[i][15].content_id;
                    let actionHash = hashes[2];
                    let urlHash = hashes[5];
                    str += fullId + '_' + actionHash + '_' + urlHash + ',';
                    if (!urlHash) { continue; }
                } catch (error) {
                }
            }

            new Promise((resolve) => {
                try {

                    ajax.post('al_audio.php',
                        {
                            act: 'reload_audio', ids: str.slice(0, -1)
                        },
                        {
                            onDone: (i) => {
                                resolve(i);
                            }
                        });
                } catch (err) { }
            }).then(e => {
               
                try {
                    e.forEach((t, i) => {
                        console.log(i);
                        download(vk_decode_url(t[2]), t[4] + " - " + t[3] + ".mp3", row[i + offset].children[0].querySelector(".audio_row__inner"));
                    });
                } catch (error) {
                }
            });
        }
    }
    async function put_tg(url, e, t) {

        let div = document.createElement("div");
        div.style = "background-color: #d48f8a;width: 100%;position: absolute;    border-radius: 4px;height: " + t.offsetHeight + "px;";
        t.parentElement.prepend(div);
        fetch(url)
            .then(response => {

                let rer = new Response([response]);

                if (!response.ok) {
                    throw Error(response.status + ' ' + response.statusText)
                }

                if (!response.body) {
                    throw Error('ReadableStream not yet supported in this browser.')
                }

                const contentLength = response.headers.get('content-length');
                if (!contentLength) {
                    throw Error('Content-Length response header unavailable');
                }
                const total = parseInt(contentLength, 10);
                let loaded = 0;
                let buffer = new Uint8Array(total);
                return new Response(new ReadableStream({

                    start(controller) {
                        const reader = response.body.getReader();

                        read();
                        function read() {
                            reader.read().then(({ done, value }) => {
                                if (done) {
                                    controller.close();
                                    var b = new Blob([buffer]);
                                    var formData = new FormData();
                                    var blob = new Blob([b], { type: "audio/mp3" });
                                    formData.append("audio", blob, e[4] + " - " + e[3] + ".mp3");
                                    formData.append("performer", e[4]);
                                    formData.append("title", e[3]);
                                    var request = new XMLHttpRequest();
                                    request.open("POST", "");
                                    request.send(formData);
                                    return buffer;
                                }
                                buffer.set(value, loaded);
                                loaded += value.byteLength;
                                div.style = "background-color: #a6c7e8;    border-radius: 4px;position: absolute;width:" + (loaded / total) * 100 + "%;height: " + t.offsetHeight + "px;";
                                read();
                            })
                                .catch(error => {
                                    console.error(error);
                                    controller.error(error)
                                })
                        }
                    }

                })
                );

            }).then(response => {
                
            })
            .catch(error => {
                console.error(error);

            });
    }
    function vk_get(t) {
        new Promise((resolve) => {
            try {
                var a = AudioUtils.getAudioFromEl(t, !0);
                ajax.post('al_audio.php',
                    {
                        act: 'reload_audio', ids: a.fullId + '_' + a.actionHash + '_' + a.urlHash
                    },
                    {
                        onDone: (i) => {
                            resolve(i[0]);
                        }
                    });
            } catch (err) { }
        }).then(e => {
            console.log([e, vk_decode_url(e[2]), t]);

            download(vk_decode_url(e[2]), e[4] + " - " + e[3] + ".mp3", t);
        });
    }
    function vk_to_tg(t) {
        new Promise((resolve) => {
            try {
                var a = AudioUtils.getAudioFromEl(t, !0);
                ajax.post('al_audio.php',
                    {
                        act: 'reload_audio', ids: a.fullId + '_' + a.actionHash + '_' + a.urlHash
                    },
                    {
                        onDone: (i) => {
                            resolve(i[0]);
                        }
                    });
            } catch (err) { }
        }).then(e => {


            put_tg(vk_decode_url(e[2]), e, t);
        });
    }
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
    async function download(url, filename, t) {
        var div = document.createElement("div");
        try {
            div.style = "background-color: #f443364d;width: 100%;box-shadow: 0px 0px 2px 0px #797979;position: absolute;    border-radius: 4px;height: " + t.offsetHeight + "px;";
            t.parentElement.prepend(div);

        } catch (error) {

        }

        fetch(url)
            .then(response => {
                let rer = new Response([response]);
                
                if (!response.ok) {
                    throw Error(response.status + ' ' + response.statusText)
                }
                if (!response.body) {
                    throw Error('ReadableStream not yet supported in this browser.')
                }
                const contentLength = response.headers.get('content-length');
                if (!contentLength) {
                    throw Error('Content-Length response header unavailable');
                }
                const total = parseInt(contentLength, 10);
                let loaded = 0;
                let buffer = new Uint8Array(total);
                return new Response(new ReadableStream({

                    start(controller) {
                        const reader = response.body.getReader();

                        read();
                        function read() {
                            reader.read().then(({ done, value }) => {
                                if (done) {
                                    controller.close();
                                    var b = new Blob([buffer], { type: "audio/mp3" });
                                    var a = document.createElement("a");
                                    a.href = URL.createObjectURL(b);
                                    a.setAttribute("download", filename);
                                    a.click();
                                    
                                    return buffer;
                                }
                                buffer.set(value, loaded);

                                loaded += value.byteLength;

                                try {
                                    div.style = "background-color: #c3d0dd;box-shadow: 0px 0px 2px 0px #797979; border-radius: 4px;position: absolute;width:" + (loaded / total) * 100 + "%;height: " + t.offsetHeight + "px;";
                                } catch (error) {

                                }

                                read();
                            })
                                .catch(error => {
                                    console.error(error);
                                    controller.error(error)
                                })
                        }
                    }

                })
                );

            })
            .catch(error => {
                console.error(error);

            });
    }
    var id = vk.id;
    var n = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=',
        i = {
            v: function (e) {
                return e
                    .split('')
                    .reverse()
                    .join('');
            },
            r: function (e, t) {
                e = e.split('');
                for (var i, o = n + n, s = e.length; s--;) (i = o.indexOf(e[s])), ~i && (e[s] = o.substr(i - t, 1));
                return e.join('');
            },
            s: function (e, t) {
                var n = e.length;
                if (n) {
                    var i = r(e, t),
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
                var n = [];
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
            var t = e.split('?extra=')[1].split('#'),
                n = '' === t[1] ? '' : vk_a(t[1]);
            if (((t = vk_a(t[0])), 'string' != typeof n || !t)) return e;
            n = n ? n.split(String.fromCharCode(9)) : [];
            for (var s, r, l = n.length; l--;) {
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
                ~i && ((t = o % 4 ? 64 * t + i : i), o++ % 4) && (a += String.fromCharCode(255 & (t >> ((-2 * o) & 6))));
        return a;
    }
    function r(e, t) {
        var n = e.length,
            i = [];
        if (n) {
            var o = n;
            for (t = Math.abs(t); o--;) (t = ((n * (o + 1)) ^ (t + o)) % n), (i[o] = t);
        }
        return i;
    }
})(window);