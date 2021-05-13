import { settings } from ".";
import { Download } from "./download";

export namespace Buttons
{
    export function inlineDownload (mutation: MutationRecord)
    {
        let btn_dwnl = document.createElement("button");
        btn_dwnl.addEventListener('click', function ()
        {
            let node = (<HTMLButtonElement>this).parentNode
            if(!node) return
            node = node.parentNode
            if(node && node.parentElement) Download.vk_get(node.parentElement as HTMLDivElement);
            return window.unsafeWindow.cancelEvent();
        })
        btn_dwnl.addEventListener('mouseover', function ()
        {
            let u = {
                text: () => settings.getText('TEXT_LOAD'),
                black: 1,
                shift: [7, 4, 0],
                needLeft: !0,
                forcetodown: undefined,
                noZIndex: !0,
            };
            window.unsafeWindow.showTooltip(this, u);
        })
        btn_dwnl.className = settings.getText('CLASSNAME_BTN_INLINE');
        btn_dwnl.style.cssText = "background-image: url(" + settings.getComponent('download')?.icon + ");";
        (<HTMLDivElement>mutation.addedNodes[0]).append(btn_dwnl);
    }
    export function albumDownlaod (mutation: MutationRecord)
    {
        // Кнопка скачать в верхней части музыки
        let btn_dwnl = document.createElement("div");
        btn_dwnl.onclick = function ()
        {
            console.log(this);
           // window.unsafeWindow.getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST,-2000762277,9762277,"23b92a7585ae083124")
            return vk_playlist_download(this);
        };
        btn_dwnl.className = settings.getText('CLASSNAME_BTN_LOAD');
        let el = (<HTMLDivElement>mutation.addedNodes[0]).querySelector<HTMLDivElement>('.ui_actions_menu._ui_menu')
        btn_dwnl.innerHTML = settings.getText('TEXT_LOAD');
        if(el) el.prepend(btn_dwnl);
    }
    export function copy (mutation: MutationRecord)
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
                        let node = (<HTMLDivElement>this).parentNode
                        if(!node) return
                        node = node.parentNode
                        if(!node) return
                        let audio = window.unsafeWindow.AudioUtils.getAudioFromEl(
                            (<HTMLDivElement>node.parentNode),
                            !0
                        );
                        navigator.clipboard.writeText(
                            settings.getComponent('copy')?.prop.prepend + audio.performer + " - " + audio.title
                        );
                    }
                });

            return window.unsafeWindow.cancelEvent(event);
        };
        btn_copy.onmouseover = function ()
        {
            let u = {
                text: () => settings.getText('TEXT_COPY'),
                black: 1,
                shift: [7, 4, 0],
                needLeft: !0,
                forcetodown: undefined,
                noZIndex: !0,
            };
            window.unsafeWindow.showTooltip(this, u);
        };
        btn_copy.className = settings.getText('CLASSNAME_BTN_INLINE');
        btn_copy.style = "background-image: url(" + settings.getComponent('copy')?.icon + ")";
        (<HTMLDivElement>mutation.addedNodes[0]).prepend(btn_copy);
    }

    export function telegram (mutation: MutationRecord)
    {
        let btn_tg = document.createElement("button");
        btn_tg.onclick = function ()
        {
            vk_to_tg(this.parentNode.parentNode.parentNode);
            return window.unsafeWindow.cancelEvent(event);
        };
        btn_tg.onmouseover = function ()
        {
            let u = {
                text: () => settings.getText('TEXT_PUTTELEGRAM'),
                black: 1,
                shift: [7, 4, 0],
                needLeft: !0,
                forcetodown: undefined,
                noZIndex: !0,
            };
            window.showTooltip(this, u);
        };
        btn_tg.className = settings.getText('CLASSNAME_BTN_INLINE');
        btn_tg.style = "background-image: url(" + settings.getComponent('telegram')?.icon + ");";
        (<HTMLDivElement>mutation.addedNodes[0]).prepend(btn_tg);
    }
}