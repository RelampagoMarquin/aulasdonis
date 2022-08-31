/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Redis from '@ioc:Adonis/Addons/Redis'



Redis.subscribe('cozinha:pedido', (pedido: string) => {
    console.log('Chegou o seguinte pedido: ')
    console.log(pedido)
})