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
     * Renderiza o formulário de cadastro
     * @param param0 
     */
    async create ({view, session, bouncer} : HttpContextContract){
        bouncer.authorize('noticiaCreate')     
        const noticia = session.flashMessages.get('noticia') || {}
        return view.render('noticias/create', {
            noticia
        })
    }
    /**
     * Busca e deleta
     * @param param0 
     */
    async delete ({ params, response, bouncer } : HttpContextContract){
        try{
            bouncer.authorize('noticiaDelete')
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
    async  store({ request, response, session, bouncer} : HttpContextContract){
        bouncer.authorize('noticiaCreate')  
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
    async  edit({params, view, bouncer} : HttpContextContract){
        try {
            bouncer.authorize('noticiaUpdate')
            const noticia = await Noticia.findOrFail(params.id)
            return view.render('noticias/edit', {
            noticia
        })
        } catch (e) {
            console.log('O ERRO É:')
            console.log(e)
        }
        
    }
    /**
     * Armazena as alterações do formulário para o BD, também chama o processo de busca e de salvamento
     * @param param0 
     */
    async  update({params, request, response, bouncer} : HttpContextContract){
        bouncer.authorize('noticiaUpdate')
        const noticia = await Noticia.findOrFail(params.id)
        noticia.merge(request.only(['titulo', 'conteudo', 'chamada']))
        try {
            await noticia.save()
        } catch(e){

        }

        return response.redirect().toRoute('noticia.index')
    }

    async  view({view, params, response} : HttpContextContract){
        const noticia = await Noticia.query().preload('comentarios').where('id', params.id).first()
        if (noticia) {
            return view.render('noticias/view', {
                noticia
            })
        } else {
            return response.redirect().back()
        }
    }

    async  createComment({ response, params, request, auth} : HttpContextContract){
        
        const noticia = await Noticia.findOrFail(params.id)
        const comentario ={
            ...request.only(['comentario']),
            userId:auth.use('web').user?.id
        }
        await noticia.related('comentarios').create(comentario)
        return response.redirect().back()
    }

}
    