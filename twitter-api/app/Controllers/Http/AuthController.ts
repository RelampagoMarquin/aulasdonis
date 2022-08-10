import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

    async index ({ response }: HttpContextContract) {
        
    }

    async login ({ request, auth, response}: HttpContextContract) {
        try {
            const login = request.input('login')
            const senha = request.input('senha')
            const token = await auth.use('api').attempt(login, senha, {
                expiresIn: '30mins'
            })

            return token

        } catch (e) {
            return response.unauthorized('Invalid credentials')
        }
    }

    async logout ({ auth, response }: HttpContextContract) {
        await auth.use('api').revoke()
        return {
            revoked:true
        }
    }
}
