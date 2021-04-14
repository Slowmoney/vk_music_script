import { musicHash } from "./musicHash";

const SETTINGS = {
    copy: {// кнопка копирования название
        enable: true,//true/false включить выключить кнопке
        prepend: "!p ",// при копировании вставлять перед
        icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2E0YWFiNSIgZD0iTTE5LDIxSDhWN0gxOU0xOSw1SDhBMiwyIDAgMCwwIDYsN1YyMUEyLDIgMCAwLDAgOCwyM0gxOUEyLDIgMCAwLDAgMjEsMjFWN0EyLDIgMCAwLDAgMTksNU0xNiwxSDRBMiwyIDAgMCwwIDIsM1YxN0g0VjNIMTZWMVoiIC8+PC9zdmc+',
        // иконка для любителей нестандартного
    },
    telegram: {// кнопка постера в TG  
        enable: true,//true/false включить выключить кнопке
        token: "", // token бота в телеграмме
        channel: "", // имя канала (chat_id)
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

console.log("lals", musicHash.vk.id, window.vk);
/* musicHash.vk_decode_url("ssadasd"); */

new MutationObserver(function (mutations)
{
    mutations.forEach(function (mutation)
    {
        if(
            SETTINGS.albumDownload.enable &&
            mutation.type == "childList" &&
            mutation.addedNodes.length == 1 &&
            (<HTMLDivElement>mutation.addedNodes[0]).className == "ap_layer"
        )
        {

            // Кнопка скачать в верхней части музыки
            let btn_dwnl = document.createElement("div");
            btn_dwnl.onclick = function ()
            {
                return vk_playlist_download(this);
            };
            btn_dwnl.className = CLASSNAME_BTN_LOAD;
            console.dir();
            
            let el = (<HTMLDivElement>mutation.addedNodes[0]).querySelector<HTMLDivElement>('.ui_actions_menu._ui_menu')
            btn_dwnl.innerHTML = TEXT_LOAD;
            if (el) {
                el.prepend(btn_dwnl);
            }
        }
        if(
            mutation.type == "childList" &&
            mutation.addedNodes.length == 1 &&
            (<HTMLDivElement>mutation.addedNodes[0]).className ==
            "_audio_row__actions audio_row__actions"
        )
        {
            console.log(mutation.addedNodes);
            
            // Кнопка скачать при навадке на песню
            if(SETTINGS.download.enable)
            {
                let btn_dwnl = document.createElement("button");
                btn_dwnl.onclick = function ()
                {
                    vk_get(this.parentNode.parentNode.parentNode);
                    return window.cancelEvent(event);
                };
                btn_dwnl.onmouseover = function ()
                {
                    let u = {
                        text: () => TEXT_LOAD,
                        black: 1,
                        shift: [7, 4, 0],
                        needLeft: !0,
                        forcetodown: undefined,
                        noZIndex: !0,
                    };
                    window.showTooltip(this, u);
                };
                btn_dwnl.className = CLASSNAME_BTN_INLINE;
                btn_dwnl.style =
                    "background-image: url(" + SETTINGS.download.icon + ");";
                mutation.addedNodes[0].append(btn_dwnl);
            }
            // Кнопка Отправить в телеграм канал при навадке на песню
            if(
                SETTINGS.telegram.enable &&
                SETTINGS.telegram.channel &&
                SETTINGS.telegram.token
            )
            {
                let btn_tg = document.createElement("button");
                btn_tg.onclick = function ()
                {
                    vk_to_tg(this.parentNode.parentNode.parentNode);
                    return window.cancelEvent(event);
                };
                btn_tg.onmouseover = function ()
                {
                    let u = {
                        text: () => TEXT_PUTTELEGRAM,
                        black: 1,
                        shift: [7, 4, 0],
                        needLeft: !0,
                        forcetodown: undefined,
                        noZIndex: !0,
                    };
                    window.showTooltip(this, u);
                };
                btn_tg.className = CLASSNAME_BTN_INLINE;
                btn_tg.style = "background-image: url(" + SETTINGS.telegram.icon + ");";
                mutation.addedNodes[0].prepend(btn_tg);
            }

            // Кнопка Копировать название при навадке на песню
            // РАБОТАЕТ
            if(SETTINGS.copy.enable)
            {
                let btn_copy = document.createElement("button");
                btn_copy.onclick = function ()
                {
                    navigator.permissions
                        .query({ name: "clipboard-write" })
                        .then((result) =>
                        {
                            if(result.state == "granted" || result.state == "prompt")
                            {
                                let t = window.AudioUtils.getAudioFromEl(
                                    this.parentNode.parentNode.parentNode,
                                    !0
                                );
                                navigator.clipboard.writeText(
                                    SETTINGS.copy.prepend + t.performer + " - " + t.title
                                );
                            }
                        });

                    return window.cancelEvent(event);
                };
                btn_copy.onmouseover = function ()
                {
                    let u = {
                        text: () => TEXT_COPY,
                        black: 1,
                        shift: [7, 4, 0],
                        needLeft: !0,
                        forcetodown: undefined,
                        noZIndex: !0,
                    };
                    window.showTooltip(this, u);
                };
                btn_copy.className = CLASSNAME_BTN_INLINE;
                btn_copy.style = "background-image: url(" + SETTINGS.copy.icon + ")";
                (<HTMLDivElement>mutation.addedNodes[0]).prepend(btn_copy);
            }
        }
    });
}).observe(document.querySelector("body") as Node, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false,
});
