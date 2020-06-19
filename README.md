# [install](https://raw.githubusercontent.com/Slowmoney/vk_music_script/master/vk_music_download.user.js)
# Основные возможности
Штука для Download музыки из vk.com
И так же можно скачивать челые альбомы
Можно постить музыку в TG прям из вк

## Установка

Для Хрома

##### Установка:



1. Meddle monkey или чёт другое
2. Создаём new script
3. ctrl+c из button_download+tg+вы.js ctrl+v в new script

## Настройки

```js
...
const SETTINGS = {
		btn: {
			telegram: true, // кнопка постера в TG  
			copy: false, //DEV!!! кнопка копирования название
			download: true, // кнопка загрузки в строке с песней
			topdownload: true, // кнопка загрузки полного альбома
		},
    };
...
```



### roadmap
1. сделать копирование название по кнопке с префиксами для ботов в дискорде 