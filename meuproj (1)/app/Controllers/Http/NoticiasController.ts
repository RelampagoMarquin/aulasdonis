import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Noticia from 'App/Models/Noticia'

export default class NoticiasController {
    async index ({view} : HttpContextContract){
        const noticias = await Noticia.query().orderBy('created_at', 'desc')
        return view.render('noticias/index', {
            noticias
        })
    }
    /**
     * Busca e deleta
     * @param param0 
     */
    async create ({view, session} : HttpContextContract){
        const noticia = session.flashMessages.get('noticia') || {}
        return view.render('noticias/create', {
            noticia
        })
    }
    /**
     * Renderiza o formulário de cadastro
     * @param param0 
     */
    async delete ({ params, response } : HttpContextContract){
        try{
            const noticia = await Noticia.findOrFail(params.id)
            await noticia.delete()
        }catch(e){

        }
        return response.redirect().toRoute('noticia.index')
    }
    /**
     * Guardar os dados do cadastro BD
     * @param param0 
     */
    async  store({ request, response, session} : HttpContextContract){
        const dados = request.only(['titulo', 'conteudo', 'chamada'])
        try {
            await Noticia.create(dados)
            return response.redirect().toRoute('noticia.index')
        } catch (e) {
            session.flash('erro', 'Erro ao cadastrar notícia')
            session.flash('noticia', dados)
            return response.redirect().toRoute('noticia.create')
        }
        
    }
   /**
     * Exibe o formulário de alteração, e chama o processo de busca novamente
     * @param param0 
     */ 
    async  edit({params, view} : HttpContextContract){
        const noticia = await Noticia.findOrFail(params.id)
        return view.render('noticias/edit', {
            noticia
        })
    }
    /**
     * Armazena as alterações do formulário para o BD, também chama o processo de busca e de salvamento
     * @param param0 
     */
    async  update({params, request, response} : HttpContextContract){
        const noticia = await Noticia.findOrFail(params.id)
        noticia.merge(request.only(['titulo', 'conteudo', 'chamada']))
        try {
            await noticia.save()
        } catch(e){

        }

        return response.redirect().toRoute('noticia.index')
    }

}
    