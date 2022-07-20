import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'

export default class TwitterController {
    async index({ view, auth }: HttpContextContract) {
        const posts = await Post
            .query()
            .withScopes((scopes) => scopes.timeLineOfUser(auth.use('web').user))
            .withScopes((scopes) => scopes.notDeleted())
            .preload('user')
            .preload('comments', (a)=>{
                a.preload('user')
                .withScopes((scope) => scope.notDeleted())
            })
        return view.render('twitter/index', {
            posts
        })
    }

    async store({ request, response, auth, session }: HttpContextContract) {
        if (auth.use('web').user != null)
            try {
                const data = {
                    userId: auth.use('web').user?.id,
                    post: request.input('post')
                }
                await Post.create(data)
            } catch (e) {
                session.flash('erro', 'Erro ao cadastrar post')
            }
        return response.redirect().back()
    }

    async delete({ response, params, bouncer }: HttpContextContract) {
        try {
            const post = await Post.findOrFail(params.id)
            await bouncer.authorize('deletePost', post)
            post.isDeleted = true
            await post.save()
        } catch (e) {

        }
        return response.redirect().back()
    }

    async deleteComment({ response, params, bouncer }: HttpContextContract) {
        try {
            const comment = await Comment.findOrFail(params.id)
            await bouncer.authorize('deleteComment', comment)
            comment.isDeleted = true
            await comment.save()
        } catch (e) {

        }
        return response.redirect().back()
    }

    async storeComment({ response, params, request, session, auth }: HttpContextContract) {

        if (auth.use('web').user != null)
            try {
                const data = {
                    userId: auth.use('web').user?.id,
                    postId: params.id,
                    comment: request.input('comment')
                }
                await Comment.create(data)
            } catch (e) {
                session.flash('erro', 'Erro ao cadastrar comment')
            }
        return response.redirect().back()
    }
}
