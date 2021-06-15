import { Buttons } from "./button";
import { Settings } from "./settings";
import { h } from "./utils";

export const settings = new Settings()

new MutationObserver(function (mutations)
{
    mutations.forEach(function (mutation)
    {
        if(
            settings.getComponent('albumDownload')?.enable &&
            mutation.type == "childList" &&
            mutation.addedNodes.length == 1 &&
            (<HTMLDivElement>mutation.addedNodes[0]).className == "ap_layer"
        )
        {
            Buttons.albumDownlaod(mutation)
            if(
                settings.getComponent('telegram')?.enable &&
                settings.getComponent('telegram')?.prop.channel &&
                settings.getComponent('telegram')?.prop.token
            ) Buttons.albumTelegram(mutation)
            
        }
        if(
            mutation.type == "childList" &&
            mutation.addedNodes.length == 1 &&
            (<HTMLDivElement>mutation.addedNodes[0]).className ==
            "_audio_row__actions audio_row__actions"
        )
        {
            // Кнопка скачать при навадке на песню
            if(settings.getComponent('download')?.enable) Buttons.inlineDownload(mutation)

            // Кнопка Отправить в телеграм канал при навадке на песню
            if(
                settings.getComponent('telegram')?.enable &&
                settings.getComponent('telegram')?.prop.channel &&
                settings.getComponent('telegram')?.prop.token
            )
            Buttons.telegram(mutation)
            

            // Кнопка Копировать название при навoдке на песню
            // РАБОТАЕТ
            if(settings.getComponent('copy')?.enable) Buttons.copy(mutation)
        }
    });
}).observe(document.querySelector("body") as Node, {
    attributes: false,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false,
});
function addSettings ()
{
    const wrap = document.querySelector("#top_profile_menu") as HTMLDivElement
    
    const btn = h('a', {class: ['top_profile_mrow']}, ["ВК музыка"])
    const sep = wrap.querySelector('div.top_profile_sep')
    sep?.after(btn)

    btn.addEventListener('click', () =>
    {
        const wrap = document.querySelector('div#box_layer_wrap') as HTMLDivElement
        const modal = document.querySelector('div#box_layer') as HTMLDivElement
        const box_x_button = h('div', { class:'box_x_button', click: hide})
        const box_title_wrap = h('div', { class: 'box_title_wrap' }, box_x_button)
        const box_body = h('div', { class: 'box_body' })
        const flat_button = h('button',{class:'flat_button', click: hide}, "Сохранить")
        const box_controls = h('div', {class:'box_controls'}, flat_button)
        const box_controls_wrap = h('div', {class:'box_controls_wrap'}, box_controls)
        const box_layout = h('div', {class: 'box_layout'},[box_title_wrap, box_body, box_controls_wrap])
        const popupContainer = h('div', {class:'popup_box_container', css: 'width: 40%;'}, box_layout)
        modal?.append(popupContainer)
        box_title_wrap.innerHTML =  `<div class="box_title_controls"></div><div class="box_title">Насторойки vk_music_script</div>`
        const bg = document.querySelector('div#box_layer_bg') as HTMLDivElement
        bg.style.display = 'flex'
        wrap.style.display = 'flex'
        function hide (event: MouseEvent)
        {
            if((<HTMLDivElement>event.target).id == "box_layer" || (<HTMLDivElement>event.target).classList.contains('box_x_button') || (<HTMLDivElement>event.target).classList.contains('flat_button'))
            {
                bg.style.display = 'none'
                wrap.style.display = 'none'
                popupContainer.remove()
                bg.removeEventListener('click', hide)
                modal.removeEventListener('click', hide)
                flat_button.removeEventListener('click', hide)
                box_x_button.removeEventListener('click', hide)
            }
        }
        bg.addEventListener('click', hide)
        modal.addEventListener('click', hide)
        box_body.append(settings.genSettings())
    })
}
function checkMenu ()
{
    console.log(document.querySelector("#top_profile_menu"));
    if(document.querySelector("#top_profile_menu"))
    {
        addSettings()
        const chat_onl = h('div', { css:'color:#b2b2b2;'}, "0")
        chat_onl.id = "queueCount"
        const chat_onl_cont = h('div', { class: 'chat_onl_cont' }, chat_onl)
        const info = h('a', {class:'chat_tab_wrap'}, chat_onl_cont)
        window.unsafeWindow.Chat.wrap.prepend(info)
    }
}
setTimeout(checkMenu, 700)

