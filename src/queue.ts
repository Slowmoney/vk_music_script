import { Download } from './download';
import { musicHash } from './musicHash';

export namespace Queue
{
    type QueueRecord = { data: AudioData, state: "done" | "failed" | "inprogress", type: "telegram" | "idle" }
    const inLoad:Promise<boolean>[] = []
    let isStart = false;
    export const all: QueueRecord[] = []
    export function add (data: AudioData[], type: QueueRecord["type"])
    {
        all.push(...data.map(e => ({ data: e, state: "inprogress", type } as QueueRecord)))
        const counter = document.querySelector('div#queueCount')
        counter&&(counter.innerHTML = Queue.all.filter(e=>e.state=="inprogress").length.toString())
    }
    export async function start ()
    {
        if(isStart) return false
        const counter = document.querySelector('div#queueCount')
        console.time("Start");
        isStart = true;
        for(let index = 0; index < all.length; index++)
        {
            console.log(index, inLoad.length);
            if(all[index].state == "done") continue;
            try
            {
                if(inLoad.length >= 10) await Promise.race(inLoad);
                const func: (url: string, tags?: IPrepareAudioTags) => Promise<boolean> = all[index].type == "idle"?Download.downloadSave: Download.downloadTelegram
                const promise = func(musicHash.vk_decode_url(all[index].data[2]), musicHash.getTags(all[index].data))
                inLoad.push(promise)
                promise.then(e =>
                {
                    all[index].state = "done"
                    const i = inLoad.findIndex(e => e == promise)
                    inLoad.splice(i, 1);
                    counter&&(counter.innerHTML = Queue.all.filter(e=>e.state=="inprogress").length.toString())
                }).catch(e =>
                {
                    console.log(e);
                    all[index].state = "failed"
                })
                
            } catch(error)
            {
                console.log(error, all[index], index);
                all[index].state = "failed"
            }
        }
        console.log(inLoad);
        
        await Promise.all(inLoad);
        isStart = false
        console.log(all);
        console.log(all.some(e=>e.state == "inprogress"));
        console.log(all.some(e => e.state == "failed"));
        console.timeEnd("Start");
        counter&&(counter.innerHTML = Queue.all.filter(e=>e.state=="inprogress").length.toString())
        return true
    }
}