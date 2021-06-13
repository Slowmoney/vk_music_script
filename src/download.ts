import { settings } from "."
import { musicHash } from "./musicHash"

import ID3Writer from 'browser-id3-writer';
export namespace Download
{
    async function getCover (cover: string)
    {
        try
        {
            if(typeof (cover) == "string")
            {
                let res = await fetch(cover)
                return await res.arrayBuffer()
            } else
            {
                return cover
            }
        } catch(error)
        {
            return ""
        }
    }
    function save (tags: IPrepareAudioTags)
    {
        return (cb: (value: boolean | PromiseLike<boolean>) => void) =>
        {
            return async (buffer: Uint8Array) =>
            {
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
                cb(true);
            }

        }
    }
    function sendTelegram (tags: IPrepareAudioTags)
    {
        return (cb: (value: boolean | PromiseLike<boolean>) => void) =>
        {
            return async (buffer: Uint8Array) =>
            {
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
                    settings.getComponent("telegram")?.prop.token +
                    '/sendAudio?chat_id=' +
                    settings.getComponent("telegram")?.prop.channel
                );
                request.send(formData);
                request.onload = function () {
                    cb(true);
                };
            }
        }
    }
    export function downloadSave (url: string, tags: IPrepareAudioTags = { album: "", artist: "", title: "", cover: { data: "", description: "" } })
    {
        return download(url, save(tags))
    }
    export function downloadTelegram (url: string, tags: IPrepareAudioTags = { album: "", artist: "", title: "", cover: { data: "", description: "" } })
    {
        return download(url, sendTelegram(tags))
    }
    function download (url: string, onDone: (cb: (value: boolean | PromiseLike<boolean>) => void) => (buffer: Uint8Array) => Promise<void>)
    {
        return new Promise<boolean>(async (reject, resolve) =>
        {
            try
            {
                const response = await fetch(url, { cache: "no-cache" })
                if(!response.ok)
                {
                    throw Error(response.status + ' ' + response.statusText);
                }
                if(!response.body)
                {
                    throw Error('ReadableStream not yet supported in this browser.');
                }
                const contentLength = response.headers.get('content-length');
                if(!contentLength)
                {
                    throw Error('Content-Length response header unavailable');
                }
                const total = parseInt(contentLength, 10);
                let loaded = 0;
                const buffer = new Uint8Array(total);
                return new Response(
                    new ReadableStream({
                        start (controller)
                        {
                            response.body && readMusic(response.body.getReader(), loaded, total, buffer, controller, onDone(reject))
                        },
                    })
                );
            } catch(error)
            {
                resolve(error)
            }
        })

    }
    async function readMusic (reader: ReadableStreamDefaultReader<Uint8Array>, loaded: number, total: number, buffer: Uint8Array, controller: ReadableStreamController<Uint8Array>, onDone: (buffer: Uint8Array) => Promise<void> = async () => { })
    {
        reader
            .read()
            .then(async ({ done, value }) =>
            {
                if(done)
                {
                    controller.close();
                    onDone(buffer);
                    return buffer;
                }
                if(value !== undefined) buffer.set(value, loaded), loaded += value.byteLength;

                await readMusic(reader, loaded, total, buffer, controller, onDone);
            })
            .catch((error) =>
            {
                console.error(error);
                controller.error(error);
            });
    }
    export async function reload_playlist (data: AudioData[])
    {
        const player = window.unsafeWindow.getAudioPlayer()
        const ids = data.map(e =>
        {
            let hashs = e[13].split("/")
            return window.unsafeWindow.AudioUtils.getAudioFullId(e) + '_' + hashs[2] + '_' + hashs[5]
        });
        const SIZE = 10;
        const res = ids.reduce<string[][]>((p, c) =>
        {
            if(p[p.length - 1].length == SIZE) p.push([]);
            p[p.length - 1].push(c);
            return p;
        }, [[]]);
        return (await Promise.all(res.map(e => player.fetchAudioUrls(e)))).reduce<AudioData[]>((acc, val) => acc.concat(val), []);
    }
}
