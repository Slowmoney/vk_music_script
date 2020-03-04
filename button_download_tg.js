new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.type == "childList" && mutation.addedNodes.length == 1 && mutation.addedNodes[0].className == "_audio_row__actions audio_row__actions") {
            var button = document.createElement("button");
            button.onclick= function(){vk_get(this.parentNode.parentNode.parentNode);return cancelEvent(event);}; 
            button.className = "audio_row__action";
            button.style = "background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cG9seWdvbiBmaWxsPSIjMDEwMTAxIiBwb2ludHM9IjIzLjEsMzQuMSA1MS41LDYxLjcgODAsMzQuMSA4MS41LDM1IDUxLjUsNjQuMSAyMS41LDM1IDIzLjEsMzQuMSAiLz48L3N2Zz4=);"
            mutation.addedNodes[0].prepend(button);
            var button_tg = document.createElement("button");
            button_tg.onclick= function(){vk_to_tg(this.parentNode.parentNode.parentNode);return cancelEvent(event);}; 
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
async function put_tg(url, e,t) {
    console.log(url);
    let div = document.createElement("div");
    div.style = "background-color: #d48f8a;width: 100%;position: absolute;    border-radius: 4px;height: "+t.offsetHeight+"px;";
    t.parentElement.prepend(div);
    fetch(url)
        .then(response => {

            let rer = new Response([response]);
            console.log(rer);
            console.log(rer.arrayBuffer());
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
                                formData.append("audio", blob,  e[4] + " - " + e[3] + ".mp3");
                                formData.append("performer", e[4]);
                                formData.append("title", e[3]);
                                var request = new XMLHttpRequest();
                                request.open("POST", "https://api.telegram.org//sendAudio?chat_id=@detoxification");
                                request.send(formData);
                                return buffer;
                            }
                            buffer.set(value, loaded);
                            loaded += value.byteLength;
                            div.style = "background-color: #a6c7e8;    border-radius: 4px;position: absolute;width:" + (loaded / total) * 100 + "%;height: "+t.offsetHeight+"px;";
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
            console.log(response);
            console.log(response.arrayBuffer());
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
        console.log([e, vk_pl(e[2]),t]);

        download(vk_pl(e[2]), e[4] + " - " + e[3] + ".mp3",t);
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
        console.log([e, vk_pl(e[2]),t]);

        put_tg(vk_pl(e[2]), e ,t);
    });
}
function vk_pl(u) {

    rs = s(u).replace('/index.m3u8', '.mp3');
    rs = rs.split('/');
    if (rs.length == 8) {
        delete rs[5];
    } else {
        delete rs[4];
    }
    return rs.join('/');

}
async function download(url, filename,t) {
    var div = document.createElement("div");
    div.style = "background-color: #f443364d;width: 100%;position: absolute;    border-radius: 4px;height: "+t.offsetHeight+"px;";
    t.parentElement.prepend(div);
    fetch(url)
        .then(response => {
            let rer = new Response([response]);
            console.log(rer);
            console.log(rer.arrayBuffer());
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
                                var b = new Blob([buffer], { type: "audio/mp3" }); console.log(b.size);
                                var a = document.createElement("a");
                                a.href = URL.createObjectURL(b);
                                a.setAttribute("download", filename);
                                a.click();

                                return buffer;
                            }
                            buffer.set(value, loaded);

                            loaded += value.byteLength;
                            console.warn((loaded / total) * 100);
                            div.style = "background-color: #c3d0dd;    border-radius: 4px;position: absolute;width:" + (loaded / total) * 100 + "%;height: "+t.offsetHeight+"px;";
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