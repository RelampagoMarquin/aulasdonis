import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Friend from 'App/Models/Friend'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class TwitterController {
    async index({ auth }: HttpContextContract) {
        const posts = await Post
            .query()
            .withScopes((scopes) => scopes.timeLineOfUser(auth.use('api').user))
            .withScopes((scopes) => scopes.notDeleted())
            .preload('user')
            .preload('comments', (a) => {
                a.preload('user')
                a.withScopes((scope) => scope.notDeleted())
            })
        // return view.render('twitter/index', {
        //     posts
        // })
    }

    async store({ request, response, auth, }: HttpContextContract) {
        if (auth.use('api').user != null){
            try {
                const data = {
                    userId: auth.use('api').user?.id,
                    post: request.input('post')
                }
                const post = await Post.create(data)
                return response.created(post)
            } catch (e) {
                return response.badRequest(e)
            }
        } else {return response.unauthorized('tá fazendo o quê aqui')}
    }

    async delete({ response, params }: HttpContextContract) {
        try {
            const post = await Post.findOrFail(params.id)
            // await bouncer.authorize('deletePost', post)
            post.isDeleted = true
            await post.save()
        } catch (e) {

        }
        return response.redirect().back()
    }

    async deleteComment({ response, params}: HttpContextContract) {
        try {
            const comment = await Comment.findOrFail(params.id)
            //await bouncer.authorize('deleteComment', comment)
            comment.isDeleted = true
            await comment.save()
        } catch (e) {

        }
        return response.redirect().back()
    }

    async storeComment({ response, params, request, auth }: HttpContextContract) {

        if (auth.use('api').user != null)
            try {
                const data = {
                    userId: auth.use('api').user?.id,
                    postId: params.id,
                    comment: request.input('comment')
                }
                await Comment.create(data)
            } catch (e) {
                //session.flash('erro', 'Erro ao cadastrar comment')
            }
        return response.redirect().back()
    }

    async follow({ response, params, auth }: HttpContextContract) {
        try {
            const userIdA = await auth.use('api').user?.id
            const t1 = await Friend.query().orWhere({ userId1: params.id, userId2: userIdA })
                .orWhere({ userId2: params.id, userId1: userIdA })
            if ((t1.length == 0) && (userIdA != Number(params.id))) {
                await Friend.create({
                    userId1: userIdA,
                    userId2: params.id
                })
            }
        }
        catch (e) {

        }
        response.redirect().back()
    }

    async unFollow({ response, params, auth }: HttpContextContract) {
        try {
            const userId = await auth.use('api').user?.id
            await Friend.query()
            .orWhere({
              'user_id1': userId,
              'user_id2': params.id
          })
            .orWhere({
            'user_id1': params.id,
            'user_id2': userId
          }).del()
        }
        catch (e) {

        }
        response.redirect().back()
    }

    async search({ request }: HttpContextContract) {
        const pesquisa = request.input('login')
        const usuarios = await User.query()
            .orWhereILike('login', '%' + pesquisa + '%')
            .orWhereILike('nome', '%' + pesquisa + '%')
        // return view.render('twitter/pesquisa', {
        //     usuarios
        // })
    }

    async users({auth }: HttpContextContract) {
        const id = await auth.use('api').user?.id
        const usuarios = await User.query().orderBy('nome', 'asc')
            .whereNot('id', id)

        // return view.render('twitter/pesquisa', {
        //     usuarios
        // })
    }
}
