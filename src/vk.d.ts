export type AudioData = [
    number,
    number,
    string,
    string,
    string,
    number,
    number,
    number,
    string,
    number,
    number,
    string,
    string,
    string,
    string,
    {
        duration: number,
        content_id: string,
        puid22: number,
        account_age_type: number,
        _SITEID: number,
        vk_id: number,
        ver: number
    },
    string,
    string,
    string,
    boolean,
    string,
    number,
    number,
    true,
    string,
    boolean
]

declare class AudioPlaylist
{
    static TYPE_CURRENT:string;
    static TYPE_PLAYLIST:string;
    static TYPE_MY:string;
    static TYPE_ALBUM:string;
    static TYPE_TEMP:string;
    static TYPE_RECOM:string;
    static TYPE_SEARCH:string;
    static TYPE_FEED:string;
    static TYPE_LIVE:string;
    static TYPE_WALL:string;
    static TYPE_RECENT:string;
}


declare class AudioPlayer
{
    getPlaylist:(type:string,ownerId:number,albumId:number,accessHash:string)=>AudioPlaylist
}

