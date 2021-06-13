const SETTINGS = {
    copy: {// кнопка копирования название
        enable: true,//true/false включить выключить кнопке
        prepend: "!p ",// при копировании вставлять перед
        icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2E0YWFiNSIgZD0iTTE5LDIxSDhWN0gxOU0xOSw1SDhBMiwyIDAgMCwwIDYsN1YyMUEyLDIgMCAwLDAgOCwyM0gxOUEyLDIgMCAwLDAgMjEsMjFWN0EyLDIgMCAwLDAgMTksNU0xNiwxSDRBMiwyIDAgMCwwIDIsM1YxN0g0VjNIMTZWMVoiIC8+PC9zdmc+',
        // иконка для любителей нестандартного
    },
    telegram: {// кнопка постера в TG  
        enable: true,//true/false включить выключить кнопке
        token: "", // token бота в телеграмме
        channel: "", // имя канала (chat_id)
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNhNGFhYjUiIGQ9Im05LjQxNyAxNS4xODEtLjM5NyA1LjU4NGMuNTY4IDAgLjgxNC0uMjQ0IDEuMTA5LS41MzdsMi42NjMtMi41NDUgNS41MTggNC4wNDFjMS4wMTIuNTY0IDEuNzI1LjI2NyAxLjk5OC0uOTMxbDMuNjIyLTE2Ljk3Mi4wMDEtLjAwMWMuMzIxLTEuNDk2LS41NDEtMi4wODEtMS41MjctMS43MTRsLTIxLjI5IDguMTUxYy0xLjQ1My41NjQtMS40MzEgMS4zNzQtLjI0NyAxLjc0MWw1LjQ0MyAxLjY5MyAxMi42NDMtNy45MTFjLjU5NS0uMzk0IDEuMTM2LS4xNzYuNjkxLjIxOHoiLz48L3N2Zz4='
        // иконка для любителей нестандартного
    },
    download: {// кнопка загрузки в строке с песней
        enable: true,//true/false включить выключить кнопке
        icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2E0YWFiNSIgZD0iTTE5LjkyLDEyLjA4TDEyLDIwTDQuMDgsMTIuMDhMNS41LDEwLjY3TDExLDE2LjE3VjJIMTNWMTYuMTdMMTguNSwxMC42NkwxOS45MiwxMi4wOE0xMiwyMEgyVjIySDIyVjIwSDEyWiIgLz48L3N2Zz4='
        // иконка для любителей нестандартного
    },
    albumDownload: {// кнопка загрузки полного альбома
        enable: true,//true/false включить выключить кнопке
    }
};

type TextName = "CLASSNAME_BTN_INLINE" | 'CLASSNAME_BTN_LOAD' | 'TEXT_LOAD' | 'TEXT_PUTTELEGRAM' | 'TEXT_COPY' | 'URL_AUDIO'
type ComponentName = 'copy'|'telegram'|'download'|'albumDownload'

interface Component<T = any>
{
    name: ComponentName
    icon?:string
    enable: boolean
    prop?:T
}

export class Settings
{
    private texts = new Map<TextName, string>()
    private components = new Map<ComponentName,Component>()
    constructor()
    {
        
        this.texts.set('CLASSNAME_BTN_INLINE','audio_row__action')
        this.texts.set('CLASSNAME_BTN_LOAD','ui_actions_menu_item')
        this.texts.set('TEXT_LOAD','Скачать')
        this.texts.set('TEXT_PUTTELEGRAM','Отправить в телеграм')
        this.texts.set('TEXT_COPY','Скопировать название')
        this.texts.set('URL_AUDIO', 'al_audio.php')

        console.log(GM_getValue('albumDownload'));
        
        this.components.set('albumDownload', !GM_getValue('albumDownload')?{ name: "albumDownload", enable: true }:GM_getValue('albumDownload'))
        this.components.set('copy', !GM_getValue('copy')?<Component<{prepend:string}>>{ name: "copy", enable: true, icon: SETTINGS.copy.icon, prop:{prepend:'!p '} }: GM_getValue('copy'))
        this.components.set('download', !GM_getValue('download')?{ name: "download", enable: true, icon:SETTINGS.download.icon }: GM_getValue('download'))
        this.components.set('telegram', !GM_getValue('telegram')?<Component<{token:string}>>{ name: "telegram", enable: true, icon:SETTINGS.telegram.icon, prop:{token:'', channel: ""} }:GM_getValue('telegram'))

        this.components.forEach(e =>
        {
            if(!GM_getValue(e.name)) GM_setValue(e.name, e)
        })
    }
    getText (key:TextName)
    {
        return this.texts.get(key)??''
    }
    getComponent<T = any>(key:ComponentName):Component<T> | undefined
    {
        return this.components.get(key)
    }
    genSettings ()
    {
        const wrap = document.createElement('div')
        this.components.forEach(e =>
        {
            const row = document.createElement('div')
            const title = document.createElement('div')
            title.classList.add('subheader')
            title.textContent = e.name
            row.append(title)
            const checkbox = document.createElement('input')
            checkbox.classList.add('checkbox')
            checkbox.checked = e.enable
            e.enable && checkbox.classList.add('on')
            checkbox.addEventListener('click', () =>
            {
                if (!checkbox.classList.contains('on')) checkbox.classList.add('on')
                else checkbox.classList.remove('on')
                e.enable = checkbox.classList.contains('on')
                const component = this.components.get(e.name)
                if (component) component.enable = e.enable;
                GM_setValue(e.name, component)
            })
            checkbox.type = "checkbox"
            title.append(checkbox)
            for (const key in e.prop) {
                if (Object.prototype.hasOwnProperty.call(e.prop, key)) {
                    const element = e.prop[key];
                    console.log(element, key);
                    const wrap = document.createElement('div')
                    wrap.textContent = key
                    
                    const input = document.createElement('input')
                    input.value = element
                    input.classList.add('dark','ape_pl_input')
                    wrap.append(input)
                    row.append(wrap)
                    const component = this.components.get(e.name)
                    input.addEventListener('input', function(eve){
                        e.prop[key] = this.value
                        if(component) component.prop = e.prop;
                        GM_setValue(e.name, component)
                    })
                }
            }
            row.append(document.createElement('hr'))
            wrap.append(row)
        })
        return wrap
    }
}

