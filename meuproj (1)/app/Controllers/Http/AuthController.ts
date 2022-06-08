import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    async index ({view}:HttpContextContract){
        return view.render('auth/login')
    }
    
    async login ({request, auth, response, session} : HttpContextContract){
        try {
            const login = request.input('login')
            const senha = request.input('senha')

            await auth.use('web').attempt(login, senha)

            return response.redirect().toRoute('noticia.index')

        } catch (error) {
            session.flash('erro', 'Login ou senha inválidos')
            return response.redirect().back()

        }
    }

    async logaout ({auth, response} : HttpContextContract){
        await auth.use('web').logout()
        return response.redirect('auth.login')
    }
}
