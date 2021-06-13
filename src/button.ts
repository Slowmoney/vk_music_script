import { settings } from ".";
import { Download } from "./download";
import { musicHash } from "./musicHash";
import { Queue } from "./queue";
function* chunks<T extends any[]> (arr: T, n: number): Generator<AudioData[], void, unknown>
{
    for(let i = 0; i < arr.length; i += n)
    {
        yield arr.slice(i, i + n);
    }
}
function sleep (timeout: number)
{
    return new Promise<void>((r) => setTimeout(r, timeout))
}
export namespace Buttons
{
    export function inlineDownload (mutation: MutationRecord)
    {
        let btn_dwnl = document.createElement("button");
        btn_dwnl.addEventListener('click', async function (ev)
        {
            ev.stopPropagation()
            ev.preventDefault()
            ev.stopImmediatePropagation()
            console.dir(this);
            let node = (<HTMLButtonElement>this).parentNode

            if(!node) return
            node = node.parentNode
            console.log(node);

            if(node && node.parentElement)
            {
                const div = node.parentElement.parentElement?.parentElement as HTMLDivElement
                const audio = window.unsafeWindow.AudioUtils.getAudioFromEl(div, !!0);
                try
                {
                    const reloaded = await Download.reload_playlist([audio])
                    Queue.add(reloaded, "idle");
                    Queue.start();
                } catch(error)
                {
                    console.log(error);
                }
            }

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
        btn_dwnl.addEventListener("click", function ()
        {
            const playlistContainer = window.unsafeWindow.audioPlaylistLayerWrap.querySelector<HTMLDivElement>("._audio_pl")
            const [_, ownerId, albumId] = (<string>(playlistContainer?.dataset.playlistId)).split("_")
            const accessHash = <string>playlistContainer?.dataset.accessHash
            const playlist = window.unsafeWindow.getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, +ownerId, +albumId, accessHash, false)
            playlist.loadAll(async playlist =>
            {
                console.log(playlist._list);
                const reloaded = (await Download.reload_playlist(playlist._list));
                Queue.add(reloaded, 'idle');
                Queue.start()
            })
        })
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

            return window.unsafeWindow.cancelEvent();
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
        btn_copy.style.cssText = "background-image: url(" + settings.getComponent('copy')?.icon + ")";
        (<HTMLDivElement>mutation.addedNodes[0]).prepend(btn_copy);
    }

    export function telegram (mutation: MutationRecord)
    {
        let btn_tg = document.createElement("button");

        btn_tg.addEventListener('click', async function (ev)
        {
            ev.stopPropagation()
            ev.preventDefault()
            ev.stopImmediatePropagation()
            console.dir(this);
            let node = (<HTMLButtonElement>this).parentNode

            if(!node) return
            node = node.parentNode
            console.log(node);

            if(node && node.parentElement)
            {
                const div = node.parentElement.parentElement?.parentElement as HTMLDivElement
                const audio = window.unsafeWindow.AudioUtils.getAudioFromEl(div, !!0);
                try
                {
                    const reloaded = await Download.reload_playlist([audio])
                    Queue.add(reloaded, "telegram");
                    Queue.start();
                } catch(error)
                {
                    console.log(error);
                }
            }

            return window.unsafeWindow.cancelEvent();
        })
        btn_tg.addEventListener('mouseover', function ()
        {
            let u = {
                text: () => settings.getText('TEXT_PUTTELEGRAM'),
                black: 1,
                shift: [7, 4, 0],
                needLeft: !0,
                forcetodown: undefined,
                noZIndex: !0,
            };
            window.unsafeWindow.showTooltip(this, u);
        })
        btn_tg.className = settings.getText('CLASSNAME_BTN_INLINE');
        btn_tg.style.cssText = "background-image: url(" + settings.getComponent('telegram')?.icon + ");";
        (<HTMLDivElement>mutation.addedNodes[0]).prepend(btn_tg);
    }
    export function albumTelegram (mutation: MutationRecord)
    {
        // Кнопка скачать в верхней части музыки
        let btn_dwnl = document.createElement("div");
        btn_dwnl.addEventListener("click", function ()
        {
            const playlistContainer = window.unsafeWindow.audioPlaylistLayerWrap.querySelector<HTMLDivElement>("._audio_pl")
            const [_, ownerId, albumId] = (<string>(playlistContainer?.dataset.playlistId)).split("_")
            const accessHash = <string>playlistContainer?.dataset.accessHash
            const playlist = window.unsafeWindow.getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, +ownerId, +albumId, accessHash, false)
            playlist.loadAll(async playlist =>
            {
                console.log(playlist._list);
                const reloaded = (await Download.reload_playlist(playlist._list));
                Queue.add(reloaded, 'telegram');
                Queue.start()
            })
        })
        btn_dwnl.className = settings.getText('CLASSNAME_BTN_LOAD');
        let el = (<HTMLDivElement>mutation.addedNodes[0]).querySelector<HTMLDivElement>('.ui_actions_menu._ui_menu')
        btn_dwnl.innerHTML = settings.getText('TEXT_PUTTELEGRAM');
        if(el) el.prepend(btn_dwnl);
    }
}