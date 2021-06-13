declare interface Window
{
    vk: IVk
    each: (t: string[], callback: (e: any, i: string) => any) => void
    showTooltip: (i: GlobalEventHandlers, u: {
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
    getAudioPlayer: () => AudioPlayer;
    Chat: IChat
}

interface IVk
{
    id: number
}
interface IAjax
{
    post: <T = any>(url: string, payload: any, handlers: { onDone: (i: T) => any }) => any
}

interface IAudioUtils
{
    getAudioFromEl: <T extends boolean>(el: HTMLDivElement, state: T) => T extends true ? IVkAudio : AudioData
    getAudioFullId: (data: AudioData) => string
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
interface IVkAudio
{
    id: number,
    owner_id: number,
    ownerId: number,
    fullId: string,
    title: string,
    subTitle: string,
    performer: string,
    mainArtists: { id: string, name: string }[],
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

type AudioData = [
    id: number,
    owner_id: number,
    url: string,
    title: string,
    performer: string,
    duration: number,
    albumId: number,
    _: number,
    _: string,
    _: number,
    _: number,
    _: string,
    _: string,
    hashs: string,
    coverUrl: string,
    _: string,
    _: string,
]

declare class AudioPlaylist
{
    static TYPE_CURRENT: string;
    static TYPE_PLAYLIST: string;
    static TYPE_MY: string;
    static TYPE_ALBUM: string;
    static TYPE_TEMP: string;
    static TYPE_RECOM: string;
    static TYPE_SEARCH: string;
    static TYPE_FEED: string;
    static TYPE_LIVE: string;
    static TYPE_WALL: string;
    static TYPE_RECENT: string;
    loadAll: (cb?: (pl: AudioPlaylist) => void) => void
    _accessHash: string
    _addClasses: string
    _albumId: number
    _authorHref: string
    _authorLine: string
    _authorName: string
    _blockId: boolean
    _context: string
    _coverUrl: string
    _description: string
    _editHash: string
    _followHash: string
    _fromId: number
    _gridCovers: string
    _hasMore: number
    _infoLine1: string
    _infoLine2: string
    _isBlocked: boolean
    _isFakeId: boolean
    _isFollowed: true
    _isOfficial: number
    _lastUpdated: number
    _list: AudioData[]
    _listens: string
    _nextOffset: number
    _noDiscover: null
    _ownerId: number
    _rawDescription: string
    _subTitle: null
    _title: string
    _titleLang: number
    _totalCount: number
    _totalCountHash: string
    _type: string
}

declare class AudioPlayer
{
    fetchAudioUrls: (ids: string[]) => Promise<AudioData>
    getPlaylist: (type: string, ownerId: number, albumId: number, accessHash: string, ss?: boolean) => AudioPlaylist

}


declare module 'browser-id3-writer' {
    interface ID3Frames
    {
        TIT2: string
        TPE1: [artist: string]
        TALB: string
        APIC: {
            type: number,
            data: ArrayBuffer|string,
            description:string
        }
    }
    class ID3Writer
    {
        arrayBuffer:ArrayBuffer
        constructor(buffer: Uint8Array);
        setFrame<T extends keyof ID3Frames> (name: T, data: ID3Frames[T]): void
        addTag():void
    }
    export = ID3Writer;
}

interface IChat
{
    wrap: HTMLDivElement
}
