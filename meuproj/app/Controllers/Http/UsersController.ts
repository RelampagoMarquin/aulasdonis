import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    async index ({view} : HttpContextContract){
        const usuarios = await User.query().orderBy('created_at', 'desc')
        return view.render('usuarios/index', {
            usuarios
        })
    }
    /**
     * Busca e deleta
     * @param param0 
     */
    async create ({view, session} : HttpContextContract){
        const usuario = session.flashMessages.get('usuario') || {}
        return view.render('usuarios/create', {
            usuario
        })
    }
    /**
     * Renderiza o formulário de cadastro
     * @param param0 
     */
    async delete ({ params, response } : HttpContextContract){
        try{
            const usuario = await User.findOrFail(params.id)
            await usuario.delete()
        }catch(e){

        }
        return response.redirect().toRoute('usuario.index')
    }
    /**
     * Guardar os dados do cadastro BD
     * @param param0 
     */
    async  store({ request, response, session} : HttpContextContract){
        const dados = request.only(['login', 'senha', 'nome'])
        try {
            await User.create(dados)
            return response.redirect().toRoute('usuario.index')
        } catch (e) {
            session.flash('erro', 'Erro ao cadastrar usuário')
            session.flash('usuario', dados)
            return response.redirect().toRoute('usuario.create')
        }
        
    }
   /**
     * Exibe o formulário de alteração, e chama o processo de busca novamente
     * @param param0 
     */ 
    async  edit({params, view} : HttpContextContract){
        const usuario = await User.findOrFail(params.id)
        usuario.senha = ''
        return view.render('usuarios/edit', {
            usuario
        })
    }
    /**
     * Armazena as alterações do formulário para o BD, também chama o processo de busca e de salvamento
     * @param param0 
     */
    async  update({params, request, response} : HttpContextContract){
        const usuario = await User.findOrFail(params.id)
        usuario.merge(request.only(['login', 'nome']))
        if (request.input('senha') != ''){
            usuario.senha = request.input('senha')
        }
        try {
            await usuario.save()
        } catch(e){

        }

        return response.redirect().toRoute('usuario.index')
    }
}
