declare interface Window
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
    cancelEvent: () => void
    ajax: IAjax
    audioPlaylistLayerWrap: HTMLDivElement;
    
}

interface IVk
{
    id:number
}
interface IAjax
{
    post:<T = any>(url:string,payload:any, handlers:{ onDone: (i:T) => any})=>any
}

interface IAudioUtils
{
     getAudioFromEl:(el:HTMLDivElement, state:boolean)=> IVkAudio
}

interface IPrepareAudioTags
{
    album: string
    artist: string
    title: string
    cover:
    {
        data: string,
        description: string
    }
}
interface IVkAudio{
    id: number,
    owner_id: number,
    ownerId: number,
    fullId: string,
    title: string,
    subTitle: string,
    performer: string,
    mainArtists: {id: string, name: string }[],
    featArtists: string,
    authorLink: string,
    duration: number,
    lyrics: number,
    url: string,
    flags: number,
    context: string,
    extra: [],
    accessKey: string,
    addHash: string,
    editHash: string,
    actionHash: string,
    deleteHash: string,
    replaceHash: string,
    urlHash: string,
    restoreHash: string,
    canEdit: boolean,
    canDelete: boolean,
    isLongPerformer: number,
    canAdd: boolean,
    coverUrl_s: string,
    coverUrl_p: string,
    isClaimed: boolean,
    isExplicit: boolean,
    isUMA: boolean,
    isReplaceable: boolean,
    album: [
        number,
        number,
        string
    ],
    albumId: number,
    albumPart: number,
    trackCode: string,
    restrictionStatus: number,
    chartInfo: boolean,
    isDeleted: boolean,
    isCurrent: true,
    isPlaying: boolean,
    isFromCurrentPlaylist: boolean,
    isNumeric: boolean,
    isWithCovers: boolean,
    withInlinePlayer: boolean,
    isInSnippet: boolean,
    isInEditBox: boolean,
    isInRecomsBlock: boolean,
    isInFastChat: boolean,
    isInAttach: boolean,
    isSetClaimed: boolean,
    isPodcastListSnippet: boolean,
    isCurrentAlbumSnippet: boolean
}

