
interface Window
{
    vk: IVk
    each: (t: string[], callback: (e: any, i: string) => any) => void
    showTooltip:(i:GlobalEventHandlers,u:{
        text: () => string;
        black: number;
        shift: number[];
        needLeft: boolean;
        forcetodown: undefined;
        noZIndex: boolean;
    }) => void
    AudioUtils: IAudioUtils
    cancelEvent:()=>void
}

interface IVk
{
    id:number
}

interface IAudioUtils
{
    
}