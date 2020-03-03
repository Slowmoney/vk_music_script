// ==UserScript==
// @name Vk music downlaod tg
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
  var vk_m_url;
  async function download(url, filename) {
      console.log(url);
      var div = document.createElement("div");
      try {
          div.style = "background-color: #f443364d;width: 100%;position: absolute;    border-radius: 4px;height:" + getAudioPlayer()._currentPlayingRows[0].offsetHeight + "px;";
          getAudioPlayer()._currentPlayingRows[0].children[0].prepend(div);
          console.log(getAudioPlayer());
      } catch (error) {
          console.log(error);
      }
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
                              try {
                                  div.style = "background-color: #c3d0dd;    border-radius: 4px;position: absolute;width:" + (loaded / total) * 100 + "%;height:" + getAudioPlayer()._currentPlayingRows[0].children[0].offsetHeight + "px;";
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
  async function put_tg(url, filename) {
      console.log(url);
      var div = document.createElement("div");
      try {
          div.style = "background-color: #f443364d;width: 100%;position: absolute;    border-radius: 4px;height:" + getAudioPlayer()._currentPlayingRows[0].offsetHeight + "px;";
          getAudioPlayer()._currentPlayingRows[0].children[0].prepend(div);
          console.log(getAudioPlayer());
      } catch (error) {
          console.log(error);
      }
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
                                  var b = new Blob([buffer]);
                                  var formData = new FormData();
                                  var blob = new Blob([b], { type: "audio/mp3" });
                                  formData.append("audio", blob, filename);
                                  formData.append("performer", title[0]);
                                  formData.append("title", title[1]);
                                  var request = new XMLHttpRequest();
                                  request.open("POST", "https://api.telegram.org/bot629439163:AAE6iHZVIYXR1CW7PwK-8hHthuZmdna3weo/sendAudio?chat_id=@detoxification");
                                  request.send(formData);
                                  return buffer;
                              }
                              buffer.set(value, loaded);
                              loaded += value.byteLength;
                              try {
                                  div.style = "background-color: #2196f340;    border-radius: 4px;position: absolute;width:" + (loaded / total) * 100 + "%;height:" + getAudioPlayer()._currentPlayingRows[0].children[0].offsetHeight + "px;";
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
  var _Audio_prototype_play = Audio.prototype.play;
  var _PrevAudio = null;
  var div = document.createElement('div');
  var down = document.createElement('div');
  var style = document.createElement("style");


  style.innerText = "area:hover {text-decoration-line: underline;}";

  down.innerText = 'PUT to TG';
  down.id = 'down';
  down.style = "color: rgb(200, 214, 229);border: none;background-color: rgb(74, 118, 168);height: 38px;font-size: medium;padding-left: 0.2em;text-overflow: ellipsis;cursor:copy;";
  var input = document.createElement('input');

  input.style = "height:38px;font-size: medium;padding-left: 0.2em;    text-overflow: ellipsis;";
  div.style =
      `position:fixed;left:0;bottom:0;right:auto;height: 80px;bottom:0;z-index:2000000;border:1px solid white;padding: 12px;background:#4A76A8;
  color:#C8D6E5;margin-left:50px;margin-bottom:25px;
  display: flex;cursor:copy;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius:3px;`;

  var a = document.createElement("area");
  a.appendChild(document.createTextNode("?"));
  a.style =
      `display:block;font-size: medium;color:inherit;padding: 0.3em 1em;
  max-height:1.2em;line-height:1.2em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;cursor:copy;
  border: none;`;
  a.id = "link";
  var input = document.createElement("input");
  input.style =
      `color: #C8D6E5;
  border: none;
  cursor: copy;
  background-color: #4A76A8;
  height: 38px;
  font-size: medium;
  padding-left: 0.2em;
  text-overflow: ellipsis;`;

  div.appendChild(a);
  window.document.getElementsByTagName('head')[0].appendChild(style);
  div.appendChild(input);
  div.appendChild(down);
  input.onfocus = function () {
      input.select();
      try {
          var successful = document.execCommand('copy');
      } catch (err) {
          console.error('Oops, unable to copy');
      }
  };
  var bt = document.createElement("button"); 
let d = document.createElement("div");
d.className = "top_audio_player_btn_icon";
bt.className = "top_audio_player_btn top_audio_player_play _top_audio_player_play";
d.style = "background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cG9seWdvbiBmaWxsPSIjMDEwMTAxIiBwb2ludHM9IjIzLjEsMzQuMSA1MS41LDYxLjcgODAsMzQuMSA4MS41LDM1IDUxLjUsNjQuMSAyMS41LDM1IDIzLjEsMzQuMSAiLz48L3N2Zz4=\");";
bt.prepend(d);
document.getElementById("top_audio_player").prepend(bt);

  Audio.prototype.play = function () {
      document.body.appendChild(div);
      if (_PrevAudio && _PrevAudio.parentNode) {
          _PrevAudio.parentNode.removeChild(_PrevAudio);
      }
      _PrevAudio = this;
      console.log(_PrevAudio);
      document.getElementById('link').onclick = function (d) {
          console.log(vk_m_url);
          download(vk_m_url, _PrevAudio.download);
      };
      document.getElementById('down').onclick = function (d) {
          console.log(vk_m_url);
          put_tg(vk_m_url, _PrevAudio.download);
      };
      bt.onclick = function(e){download(vk_m_url, _PrevAudio.download);}
      setTimeout(getTitle, 100);
      return _Audio_prototype_play.apply(this, arguments);
  };
  var title;
  var getTitle = function () {
      let p = getAudioPlayer();
      vk_m_url = s(p._currentAudio[2]).replace('/index.m3u8', '.mp3');
      console.log(p);
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
      title = [p._currentAudio[4], p._currentAudio[3]];
      input.value = '+p ' + title[0] + " " + title[1];
      _PrevAudio.download = a.download = title[0] + " " + title[1] + '.mp3';
  }; 
})(window);