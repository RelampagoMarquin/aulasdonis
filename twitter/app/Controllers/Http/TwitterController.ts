import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class TwitterController {
    async index({view}:HttpContextContract){
        return view.render('twitter/index')
    }

    async store({request, response, auth, session}:HttpContextContract){
        if(auth.use('web').user != null)
        try {
            const data ={
                userId:auth.use('web').user?.id,
                post: request.input('post')
            }
            await Post.create(data)
        } catch (e) {
            session.flash('erro','Erro ao cadastrar post')
        }
        return response.redirect().back()
    }
}
