import { Buttons } from "./button";
import { musicHash } from "./musicHash";
import { Settings } from "./settings";

export const settings = new Settings()

console.log("lals", musicHash.vk.id, window.vk);
/* musicHash.vk_decode_url("ssadasd"); */

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
            )
            {
                Buttons.albumTelegram(mutation)
            }
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
            {
                Buttons.telegram(mutation)
            }

            // Кнопка Копировать название при навoдке на песню
            // РАБОТАЕТ
            if(settings.getComponent('copy')?.enable)
            {
                Buttons.copy(mutation)
            }
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
    const btn = document.createElement('a');
    btn.classList.add('top_profile_mrow')
    btn.text = "ВК музыка"
    const sep = wrap.querySelector('div.top_profile_sep')
    sep?.after(btn)
    console.log(wrap.classList, wrap.classList.contains("shown"));

    btn.addEventListener('click', () =>
    {
        const wrap = document.querySelector('div#box_layer_wrap') as HTMLDivElement
        const modal = document.querySelector('div#box_layer') as HTMLDivElement

        const popupContainer = document.createElement('div')
        popupContainer.classList.add('popup_box_container')
        popupContainer.style.cssText = 'width: 40%;'
        modal?.append(popupContainer)

        const box_layout = document.createElement('div');
        box_layout.classList.add('box_layout');
        popupContainer.append(box_layout);

        const box_title_wrap = document.createElement('div')
        box_title_wrap.classList.add('box_title_wrap')
        box_layout.append(box_title_wrap)

        box_title_wrap.innerHTML = `<div class="box_title_controls"></div><div class="box_title">Насторойки vk_music_script</div>`

        const box_x_button = document.createElement('div')
        box_x_button.classList.add('box_x_button')
        box_title_wrap.prepend(box_x_button)
        box_x_button.addEventListener('click', hide)

        const box_body = document.createElement('div')
        box_body.classList.add('box_body')
        box_layout.append(box_body)

        const box_controls_wrap = document.createElement('div')
        box_controls_wrap.classList.add('box_controls_wrap')
        box_layout.append(box_controls_wrap)
        
        const box_controls = document.createElement('div')
        box_controls.classList.add('box_controls')
        box_controls_wrap.append(box_controls)

        const flat_button = document.createElement('button')
        flat_button.textContent = "Сохранить"
        flat_button.classList.add('flat_button')
        flat_button.addEventListener('click', hide)
        box_controls.append(flat_button)

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
    }
    clearInterval(interval)
}
let interval = setInterval(checkMenu, 100)

