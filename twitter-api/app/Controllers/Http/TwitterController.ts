import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Friend from 'App/Models/Friend'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class TwitterController {
    async index({ view, auth }: HttpContextContract) {
        const posts = await Post
            .query()
            .withScopes((scopes) => scopes.timeLineOfUser(auth.use('web').user))
            .withScopes((scopes) => scopes.notDeleted())
            .preload('user')
            .preload('comments', (a) => {
                a.preload('user')
                a.withScopes((scope) => scope.notDeleted())
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

    async follow({ response, params, auth }: HttpContextContract) {
        try {
            const userIdA = await auth.use('web').user?.id
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
            const userId = await auth.use('web').user?.id
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

    async search({ view, request }: HttpContextContract) {
        const pesquisa = request.input('login')
        const usuarios = await User.query()
            .orWhereILike('login', '%' + pesquisa + '%')
            .orWhereILike('nome', '%' + pesquisa + '%')
        return view.render('twitter/pesquisa', {
            usuarios
        })
    }

    async users({ view, auth }: HttpContextContract) {
        const id = await auth.use('web').user?.id
        const usuarios = await User.query().orderBy('nome', 'asc')
            .whereNot('id', id)

        return view.render('twitter/pesquisa', {
            usuarios
        })
    }
}
