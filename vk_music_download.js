javascript: !(function () {
    if (window._A_A_A_A_) {


    }
    var vk_m_url;
    async function download(url, filename) {
        console.log(url);
        var div = document.createElement("div");
        div.style = "background-color: #f443364d;width: 100%;height: 88%;position: absolute;    border-radius: 4px;";
        getAudioPlayer().subscribers[24].context.firstElementChild.prepend(div);
        let response = fetch(url)
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


                                    console.log(buffer);
                                    var b = new Blob([buffer]); console.log(b.size);
                                    var a = document.createElement("a");
                                    a.href = URL.createObjectURL(b);
                                    a.setAttribute("download", filename);
                                    a.click();

                                    return buffer;
                                }
                                console.log(value);
                                buffer.set(value, loaded);
                                console.log(buffer);
                                loaded += value.byteLength;
                                console.log({ loaded, total });
                                div.style = "background-color: #c3d0dd;    border-radius: 4px;height: 88%;position: absolute;width:" + (loaded / total) * 100 + "%;";
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

    window._A_A_A_A_ = true;
    var _Audio_prototype_play = Audio.prototype.play;
    console.log(Audio.prototype.play);
    var _PrevAudio = null;
    var div = document.createElement('div');
   
    var style = document.createElement("style");
    console.log(style);
    style.innerText = "area:hover {text-decoration-line: underline;}";
   
    div.style =
        'position:fixed;left:0;bottom:0;right:auto;bottom:auto;z-index:2000000000;border:1px solid black;background:#FAFAFA;color:black';
    var a = document.createElement('area');
    a.appendChild(document.createTextNode('?'));
    a.style =
        'display:block;color:inherit;padding:.1em;max-height:1.2em;line-height:1.2em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;cursor:copy;';
    a.id = "link";

    div.appendChild(a);
    div.appendChild(style);
    var audioPlacement = document.createElement('div');
    div.appendChild(audioPlacement);
    var input = document.createElement('input');

    input.onfocus = function () {
        input.select();
        try {
            var successful = document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    };

    var radio = document.createElement('input');
    radio.type = "radio";
    div.appendChild(radio);
    div.appendChild(input);
    div.appendChild(down);
    Audio.prototype.play = function () {
        document.body.appendChild(div);
        if (_PrevAudio && _PrevAudio.parentNode) {
            _PrevAudio.parentNode.removeChild(_PrevAudio);
        }
        _PrevAudio = this;
        console.log(_PrevAudio);
        audioPlacement.appendChild(_PrevAudio);
        _PrevAudio.setAttribute('style', 'display:block!important');
        _PrevAudio.setAttribute('controls', 'controls');
        a.style.width = _PrevAudio.clientWidth + 'px';
        input.style.width = _PrevAudio.clientWidth + 'px';
        input.style.background = '#fafafa';

        a.firstChild.data = "";

        input.value = '';
        document.getElementById('link').onclick = function (d) {
            console.log(vk_m_url);
            download(vk_m_url, _PrevAudio.download);
        };

        setTimeout(getTitle, 100);

        return _Audio_prototype_play.apply(this, arguments);
    };
    var getText = function (el, txt) {
        txt = txt || [];
        for (var i = 0; i < el.childNodes.length; i++) {
            switch (el.childNodes[i].nodeType) {
                case Node.ELEMENT_NODE:
                    getText(el.childNodes[i], txt);
                    break;
                case Node.TEXT_NODE:
                    txt.push(el.childNodes[i].data);
                    break;
            }
        }
        return txt.join('');
    };
    var getTitleFromElements = function (artistSelector, titleSelector) {
        var p = document.querySelector(artistSelector);
        if (p) {
            p = getText(p)
                .replace(/^\s*[-–]\s*|\s*[-–]\s*$/g, '')
                .trim();
        }
        var t = document.querySelector(titleSelector);
        if (t) {
            t = getText(t)
                .replace(/^\s*[-–]\s*|\s*[-–]\s*$/g, '')
                .trim();
        }
        return (p ? p : 'Unknown Artist') + ' - ' + (t ? t : 'Unknown Song');
    };
    var getTitle = function () {

        vk_m_url = s(getAudioPlayer()._currentAudio[2]).replace('/index.m3u8', '.mp3');
        console.log(getAudioPlayer());
        console.log(vk_m_url);
        vk_m_url = vk_m_url.split('/');
        if (vk_m_url.length == 8) {
            delete vk_m_url[5];
        } else {
            delete vk_m_url[4];
        }
        vk_m_url = vk_m_url.join('/');
        console.log(a);

        a.firstChild.data = "Завантажити";

        console.log(vk_m_url);
        console.log(window.id);
        console.log(id);
        var title = 'Unknown Artist - Unknown Song';
        if (/(\.|^)yandex\.ru$/.test(document.location.host)) {
            title = getTitleFromElements(
                '.player-controls__track-container .track__artists',
                '.player-controls__track-container .track__title',
            );
        } else if (/(\.|^)vk\.com$/.test(document.location.host)) {
            title = getTitleFromElements('.audio_page_player_title_performer', '.audio_page_player_title_song');
        } else if (/(\.|^)ok\.ru$/.test(document.location.host)) {
            title = getTitleFromElements('.mus_player_artist', '.mus_player_song');
        } else if (/(\.|^)zvooq\.com$/.test(document.location.host)) {
            title = getTitleFromElements('.topPanelTimeline-intitleArtist', '.topPanelTimeline-intitleRelease');
        } else if (/(\.|^)karaoke\.ru$/.test(document.location.host)) {
            title = getTitleFromElements(
                '.player-karaoke-ru-copyrights-artists, .select-song .player-song-authors',
                '.player-karaoke-ru-copyrights-title, .select-song .player-song-title',
            );
            title += ' (караоке)';
        } else if (/(\.|^)itunes\.apple\.com$/.test(document.location.host)) {
            title = getTitleFromElements(
                '.is-now-playing .bordered-list__subtitle, .product-hero-gutter .t-hero-headline',
                '.is-now-playing .bordered-list__title, .product-hero-gutter .is-active .table__row__name',
            );
        }


        input.value = '+p ' + title;
        if (radio.checked) {
            try {
                var successful = document.execCommand('copy');
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        }
        _PrevAudio.download = a.download = title + '.mp3';
    };
})();
