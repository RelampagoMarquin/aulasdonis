/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'TwitterController.index').as('index').middleware('auth')

Route.group(() => {
  Route.get('/', 'UsersController.index')
      .as('usuarios.index')
  Route.post('/', 'UsersController.store')
      .as('usuarios.store')
  Route.put('/:id', 'UsersController.update')
      .where('id', /^[0-9]+$/)
      .as('usuarios.update')
  Route.delete('/:id', 'UsersController.delete')
      .where('id', /^[0-9]+$/)
      .as('usuarios.delete')
}).prefix('/usuario')

Route.group(() => {
  Route.post('/login','AuthController.login').as('auth.login')
  Route.post('/logout','AuthController.logout').as('auth.logout').middleware('auth')
}).prefix('/auth')


Route.group(() => {
    Route.get('/post','TwitterController.index').as('twitter.index')
    Route.post('/post','TwitterController.store').as('twitter.store')
    Route.delete('/post/:id','TwitterController.delete').as('twitter.delete')
    Route.post('/post/:id/comment','TwitterController.storeComment').as('twitter.comment.store')
    Route.delete('/:id/comment','TwitterController.deleteComment').as('twitter.comment.delete')
    Route.post('follow/:id','TwitterController.follow').as('twitter.follow')
    Route.post('unfollow/:id','TwitterController.unFollow').as('twitter.unFollow')
  }).prefix('/twitter').middleware('auth').where('id', /^[0-9]+$/)