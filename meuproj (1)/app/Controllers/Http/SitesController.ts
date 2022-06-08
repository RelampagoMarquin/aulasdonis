import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Noticia from 'App/Models/Noticia'

export default class SitesController {
    async index ({ view }: HttpContextContract){

        const users = [
            {id: 1, nome: 'João', email: 'joaoceninha@gmail.com', idade: 45},
            {id: 2, nome: 'Charlote', email: 'lotedecha@gmail.com', idade: 35},
            {id: 3, nome: 'AJ', email: 'aj18645@gmail.com', idade: 47}
        ]

        return view.render('site/index', {
            titulo: 'Fazer uma pagina melhor que a minha é facil, quero ver fazer pior',
            users
        })
    }

    async create ({view} : HttpContextContract){
        const noticia = new Noticia()
        noticia.titulo = 'Meu título'
        noticia.conteudo = 'Meu conteúdo'
        await noticia.save()
    }
}
