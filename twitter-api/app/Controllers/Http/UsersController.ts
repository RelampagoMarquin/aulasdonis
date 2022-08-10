import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    async index ({ response }: HttpContextContract) {
        const usuarios = await User.query()
            .orderBy('created_at', 'desc')
        const r = usuarios.map(u => u.serialize({
            fields: {
                omit: ['senha', 'password']
              }
        }))
        return response.ok(r)
        //return usuarios
    }

    async delete ({ params, response }: HttpContextContract) {
        const usuario = await User.findOrFail(params.id)
        try {
            await usuario.delete()
            return response.ok(usuario)
        } catch (e) {
            return response.badRequest(e)
        }
    }

    /**
     * Método que armazena os dados do formulário de cadastro
     * @param param0 
     */
    async store ({ request, response }: HttpContextContract) {
        const dados = request.only(['nome','login','papel','senha'])
        try {
            const usuario = await User.create(dados)
            return response.ok(usuario) 
            // comandos para testar os dados
            // console.log(dados)
            // console.log(request.all())
        } catch (e) {
            return response.badRequest(e)
        }
    }

    /**
     * Armazena as alterações do formulário no BD
     * @param param0 
     */
    async update ({ params, request, response}: HttpContextContract) {
        const usuario = await User.findOrFail(params.id)
        usuario.merge(request.only(['nome','login','papel']))
        if (request.input('senha')) {
            console.log('entrou neste if: '+request.input('senha'))
            usuario.senha = request.input('senha')
        }
        try {
            await usuario.save()
            return response.ok(usuario)
        } catch (e) {
            return response.badRequest(e)
        }
    }
}
