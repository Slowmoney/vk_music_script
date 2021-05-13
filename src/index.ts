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
        }
        if(
            mutation.type == "childList" &&
            mutation.addedNodes.length == 1 &&
            (<HTMLDivElement>mutation.addedNodes[0]).className ==
            "_audio_row__actions audio_row__actions"
        )
        {
            console.log(mutation.addedNodes);
            
            // Кнопка скачать при навадке на песню
            if(settings.getComponent('download')?.enable) Buttons.inlineDownload(mutation)
            
            // Кнопка Отправить в телеграм канал при навадке на песню
            if(
                settings.getComponent('telegram')?.enable &&
                settings.getComponent('telegram')?.prop.channel &&
                settings.getComponent('telegram')?.prop.token
            )
            {
                
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
