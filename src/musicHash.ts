import { AudioData } from "./vk";

export namespace musicHash
{
    export const vk = {
        get id ()
        {
            if (!window.unsafeWindow.vk) {
                return 0
            }
            return window.unsafeWindow.vk.id
        }
    }
    const n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=";
    const op = {
        v: function (e: any)
        {
            return e.split("").reverse().join("");
        },
        r: function (e: any, t: any)
        {
            e = e.split("");
            for(let i, o = n + n, s = e.length; s--;)
                (i = o.indexOf(e[s])), ~i && (e[s] = o.substr(i - t, 1));
            return e.join("");
        },
        s: function (e: any, t: any)
        {
            let n = e.length;
            if(n)
            {
                let i = r(e, t),
                    o = 0;
                for(e = e.split(""); ++o < n;)
                    e[o] = e.splice(i[n - 1 - o], 1, e[o])[0];
                e = e.join("");
            }
            return e;
        },
        i: function (e: any, t: any)
        {
            return op.s(e, t ^ vk.id);
        },
        x: function (e: any, t: any)
        {
            let n: any = [];
            return (
                (t = t.charCodeAt(0)),
                window.each(e.split(""), function (e, i)
                {
                    n.push(String.fromCharCode(i.charCodeAt(0) ^ t));
                }),
                n.join("")
            );
        },
    };
    function o() {
          return window.wbopen && ~(window.open + '').indexOf('wbopen');
    }
    function s (e: any)
    {
        if(!o() && ~e.indexOf("audio_api_unavailable"))
        {
            let t = e.split("?extra=")[1].split("#"),
                n: any = "" === t[1] ? "" : vk_a(t[1]);
            if(((t = vk_a(t[0])), "string" != typeof n || !t)) return e;
            n = n ? n.split(String.fromCharCode(9)) : [];
            for(let s: keyof typeof op, r: any, l = n.length; l--;)
            {
                if(
                    ((r = n[l].split(String.fromCharCode(11))),
                        (s = r.splice(0, 1, t)[0]),
                        !op[s])
                )
                    return e;
                t = op[s].apply(null, r);
            }
            if(t && "http" === t.substr(0, 4)) return t;
        }
        return e;
    }
    function vk_a (e: any)
    {
        if(!e || e.length % 4 == 1) return !1;
        for(var t: any, i, o = 0, s = 0, a = ""; (i = e.charAt(s++));)
            (i = n.indexOf(i)),
                ~i &&
                ((t = o % 4 ? 64 * t + i : i), o++ % 4) &&
                (a += String.fromCharCode(255 & (t >> ((-2 * o) & 6))));
        return a;
    }
    function r (e: any, t: any)
    {
        let n = e.length,
            i = [];
        if(n)
        {
            let o = n;
            for(t = Math.abs(t); o--;)
                (t = ((n * (o + 1)) ^ (t + o)) % n), (i[o] = t);
        }
        return i;
    }
    export function vk_decode_url (u: string)
    {
        const rs:string = s(u).replace("/index.m3u8", ".mp3");
        const path = rs.split("/");
        if(path.length == 8) delete path[5];
        else delete path[4];
        return path.join("/");
    }
    export function hashList (a: any[], offset: number)
    {
        let str = "";
        for(let i = offset; i < offset + 10; i++)
        {
            try
            {
                let hashes = a[i][13].split("/");
                let fullId = a[i][15].content_id;
                let actionHash = hashes[2];
                let urlHash = hashes[5];
                str += fullId + "_" + actionHash + "_" + urlHash + ",";
                if(!urlHash)
                {
                    console.log("cont ", urlHash);
                    continue;
                }
            } catch(error) { }
        }
        return str;
    }
    export function getTags (t: HTMLDivElement, audioD:AudioData):IPrepareAudioTags
    {
        const ap_layer = document.querySelector<HTMLDivElement>('.ap_layer_wrap')
        let coverContainer: HTMLDivElement | null = null
        let albumContainer: HTMLSpanElement | null = null
        if(ap_layer)
        {
            if (!(!ap_layer.style.display||ap_layer.style.display=="none")) {
                console.log();
                let el = document.querySelector<HTMLDivElement>('div.audio_pl_snippet__cover.audio_pl__cover')
                coverContainer = el
                let mainTitleEl = document.querySelector<HTMLSpanElement>('span.audio_pl_snippet_info_maintitle')
                albumContainer = mainTitleEl
            }
        }
		let coverUrl = (() => {let c = audioD[14].split(","); return c[c.length - 1];})()
		if (coverContainer && coverContainer.style.backgroundImage) 
			coverUrl = coverContainer.style.backgroundImage.slice(5, -2)
		let album = albumContainer ? albumContainer.textContent : audioD[16]
		let artist = decodeHTML(audioD[4])
		let title = decodeHTML(audioD[3])
		return { album: album, artist: artist, title: title, cover: { data: coverUrl, description: "front" } } as IPrepareAudioTags
	}
    function decodeHTML(str:string) {
		const x = document.createElement('span')
		return x.innerHTML = str.replace(/<br\s*\/?>/gim, "\n"),x.innerText
	}
}
