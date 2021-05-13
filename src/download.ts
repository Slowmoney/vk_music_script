import { settings } from "."
import { musicHash } from "./musicHash"
import { AudioData } from "./vk"
import ID3Writer from 'browser-id3-writer';
import { IPrepareAudioTags } from "./types";
export namespace Download
{
    async function getCover(cover:string) {
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
    function reload_audio(t:HTMLDivElement, ids?:any) {
		ids = (ids && !t) ? ids : (() => { let a = window.unsafeWindow.AudioUtils.getAudioFromEl(t, !0); return a.fullId + '_' + a.actionHash + '_' + a.urlHash })()
		return new Promise<AudioData[]>((resolve, reject) => {
			try {

				window.unsafeWindow.ajax.post<AudioData[]>(
					settings.getText('URL_AUDIO'),
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
    export function vk_get(t:HTMLDivElement) {
        reload_audio(t).then((e) =>
        {
			download(musicHash.vk_decode_url(e[0][2]), t, musicHash.getTags(t,e[0]));
		});
    }
    
    async function download(url:string, t:HTMLDivElement, tags:IPrepareAudioTags = { album: "", artist: "", title: "", cover: { data: "", description: "" } }) {
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
                        start (controller)
                        {
                            
							response.body&&readMusic(response.body.getReader(), loaded, total, buffer, controller, div, t, async (buffer) => {
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
    async function readMusic(reader:ReadableStreamDefaultReader<Uint8Array>, loaded:number, total:number, buffer: Uint8Array, controller: ReadableStreamController<Uint8Array>, div: HTMLDivElement, t: HTMLDivElement, onDone:(buffer: any) => Promise<void> = async () => { }) {
		reader
			.read()
			.then(async ({ done, value }) => {
				if (done) {
					controller.close();
					onDone(buffer);
					return buffer;
                }
                if (value!==undefined) {
                    buffer.set(value, loaded);
                    loaded += value.byteLength;
                }
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
}