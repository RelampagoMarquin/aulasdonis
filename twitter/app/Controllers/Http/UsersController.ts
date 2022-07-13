import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    async index ({ view }: HttpContextContract) {
        const usuarios = await User.query()
            .orderBy('created_at', 'desc')

        return view.render('usuarios/index',{
            usuarios
        })
    }

    async delete ({ params, response }: HttpContextContract) {
        try {
            const usuario = await User.findOrFail(params.id)
            await usuario.delete()
        } catch (e) {
            
        }

        return response.redirect().toRoute('usuarios.index')
    }

    /**
     * Método para exibir o formulário de cadastro
     * @param param0 
     */
    async create ({ view, session }: HttpContextContract) {
        const usuario = session.flashMessages.get('usuario') || {}
        return view.render('usuarios/create', {
            usuario
        })
    }

    /**
     * Método que armazena os dados do formulário de cadastro
     * @param param0 
     */
    async store ({ request, response, session }: HttpContextContract) {
        const dados = request.only(['nome','login','papel','senha'])
        try {
            await User.create(dados)
            return response.redirect().toRoute('usuarios.index')
        } catch (e) {
            session.flash('erro','Erro ao cadastrar usuário')
            session.flash('usuario',dados)
            return response.redirect().toRoute('usuarios.create')
        }
    }

    /**
     * Exibe o formulário de alteração
     * @param param0 
     */
    async edit ({ params, view }: HttpContextContract) {
        const usuario = await User.findOrFail(params.id)
        usuario.senha = ''
        return view.render('usuarios/edit', {
            usuario
        })
    }

    /**
     * Armazena as alterações do formulário no BD
     * @param param0 
     */
    async update ({ params, request, response }: HttpContextContract) {
        const usuario = await User.findOrFail(params.id)
        usuario.merge(request.only(['nome','login','papel']))
        if (request.input('senha')) {
            console.log('entrou neste if: '+request.input('senha'))
            usuario.senha = request.input('senha')
        }
        try {
            await usuario.save()
        } catch (e) {
            console.log(e)
        }

        return response.redirect().toRoute('usuarios.index')
    }
}
