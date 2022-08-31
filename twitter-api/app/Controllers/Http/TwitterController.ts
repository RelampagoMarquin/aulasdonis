import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Friend from 'App/Models/Friend'
import Post from 'App/Models/Post'
//import User from 'App/Models/User'

export default class TwitterController {
    async index({ response, auth }: HttpContextContract) {
        if (auth.use('api').user != null) {
            const posts = await Post
                .query()
                .withScopes((scopes) => scopes.timeLineOfUser(auth.use('api').user))
                .withScopes((scopes) => scopes.notDeleted())
                .preload('user')
                .preload('comments', (a) => {
                    a.preload('user')
                    a.withScopes((scope) => scope.notDeleted())
                })
                const r = posts.map(u => u.serialize({
                    fields: {
                        omit: ['password']
                      }
                }))
            return response.ok(r)
        } else { return response.unauthorized('tá fazendo o quê aqui') }
    }

    async store({ request, response, auth, }: HttpContextContract) {
        if (auth.use('api').user != null) {
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
        } else { return response.unauthorized('tá fazendo o quê aqui') }
    }

    async delete({ response, params }: HttpContextContract) {
        try {
            const post = await Post.findOrFail(params.id)
            post.isDeleted = true
            await post.save()
            return response.ok(post)
        } catch (e) {
            return response.badRequest(e)
        }
    }

    async deleteComment({ response, params }: HttpContextContract) {
        try {
            const comment = await Comment.findOrFail(params.id)
            comment.isDeleted = true
            await comment.save()
            return response.ok(comment)
        } catch (e) {
            return response.badRequest(e)
        }
    }

    async storeComment({ response, params, request, auth }: HttpContextContract) {

        if (auth.use('api').user != null) {
            try {
                const data = {
                    userId: auth.use('api').user?.id,
                    postId: params.id,
                    comment: request.input('comment')
                }
                const comment = await Comment.create(data)
                return response.created(comment)
            } catch (e) {
                return response.badRequest(e)
            }
        } else { return response.unauthorized('tá fazendo o quê aqui') }
    }

    async follow({ response, params, auth }: HttpContextContract) {
        if (auth.use('api').user != null) {
            try {
                const userIdA = await auth.use('api').user?.id
                const t1 = await Friend.query().orWhere({ userId1: params.id, userId2: userIdA })
                    .orWhere({ userId2: params.id, userId1: userIdA })
                if ((t1.length == 0) && (userIdA != Number(params.id))) {
                    const friend = await Friend.create({
                        userId1: userIdA,
                        userId2: params.id
                    })
                    return response.ok(friend)
                }
            }
            catch (e) {
                return response.badRequest(e)
            }
        } else { return response.unauthorized('tá fazendo o quê aqui') }
    }

    async unFollow({ response, params, auth }: HttpContextContract) {
        if (auth.use('api').user != null) {
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
                return response.ok(true)
            }
            catch (e) {
                return response.badRequest(e)
            }
        } else { return response.unauthorized('tá fazendo o quê aqui') }
    }

    // async search({ request, response, auth}: HttpContextContract) {
    //     if (auth.use('api').user != null) {
    //     const pesquisa = request.input('login')
    //     const usuarios = await User.query()
    //         .orWhereILike('login', '%' + pesquisa + '%')
    //         .orWhereILike('nome', '%' + pesquisa + '%')
    //     const r = usuarios.map(u => u.serialize({
    //         fields: {
    //             omit: ['senha', 'password']
    //           }
    //     }))
    //     return response.ok(r)
    // } else { return response.unauthorized('tá fazendo o quê aqui') }
    // }

    // async users({ auth, response }: HttpContextContract) {
    //     if (auth.use('api').user != null) {
    //     const id = await auth.use('api').user?.id
    //     const usuarios = await User.query().orderBy('nome', 'asc')
    //         .whereNot('id', id)
    //         const r = usuarios.map(u => u.serialize({
    //             fields: {
    //                 omit: ['senha', 'password']
    //               }
    //         }))
    //         return response.ok(r)
    //     } else { return response.unauthorized('tá fazendo o quê aqui') }
    // }
}
