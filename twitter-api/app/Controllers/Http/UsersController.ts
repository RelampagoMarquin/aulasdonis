import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    async index ({  }: HttpContextContract) {
        const usuarios = await User.query()
            .orderBy('created_at', 'desc')
        return usuarios
    }

    async delete ({ params }: HttpContextContract) {
        try {
            const usuario = await User.findOrFail(params.id)
            await usuario.delete()
            return{
                success: true
            }
        } catch (e) {
            return{
                success: false,
                error: e
                }
        }
    }

    /**
     * Método que armazena os dados do formulário de cadastro
     * @param param0 
     */
    async store ({ request}: HttpContextContract) {
        const dados = request.only(['nome','login','papel','senha'])
        try {
            await User.create(dados)
            return{
                success: true
            }
            // comandos para testar os dados
            // console.log(dados)
            // console.log(request.all())
        } catch (e) {
            return{
            success: false,
            error: e
            }
        }
    }

    /**
     * Armazena as alterações do formulário no BD
     * @param param0 
     */
    async update ({ params, request}: HttpContextContract) {
        const usuario = await User.findOrFail(params.id)
        usuario.merge(request.only(['nome','login','papel']))
        if (request.input('senha')) {
            console.log('entrou neste if: '+request.input('senha'))
            usuario.senha = request.input('senha')
        }
        try {
            await usuario.save()
            return{
                success: true
            }
        } catch (e) {
            return{
                success: false,
                error: e
                }
        }
    }
}
