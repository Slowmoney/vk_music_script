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
    function reload_audio(t, ids) {
		ids = (ids && !t) ? ids : (() => { let a = AudioUtils.getAudioFromEl(t, !0); return a.fullId + '_' + a.actionHash + '_' + a.urlHash })()
		return new Promise((resolve, reject) => {
			try {

				ajax.post(
					URL_AUDIO,
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
    async function readMusic(reader, loaded, total, buffer, controller, div, t, onDone = () => { }) {
		reader
			.read()
			.then(async ({ done, value }) => {
				if (done) {
					controller.close();
					onDone(buffer);
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
				await readMusic(reader, loaded, total, buffer, controller, div, t, onDone);
			})
			.catch((error) => {
				console.error(error);
				controller.error(error);
			});
	}
}