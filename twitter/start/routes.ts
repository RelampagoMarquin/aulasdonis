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
  Route.get('/create', 'UsersController.create')
      .as('usuarios.create')
  Route.post('/create', 'UsersController.store')
      .as('usuarios.store')
  Route.get('/:id/edit', 'UsersController.edit')
      .where('id', /^[0-9]+$/)
      .as('usuarios.edit')
  Route.post('/:id/edit', 'UsersController.update')
      .where('id', /^[0-9]+$/)
      .as('usuarios.update')
  Route.get('/:id/delete', 'UsersController.delete')
      .where('id', /^[0-9]+$/)
      .as('usuarios.delete')
}).prefix('/usuario')

Route.group(() => {
  Route.get('/login','AuthController.index').as('auth.index')
  Route.post('/login','AuthController.login').as('auth.login')
  Route.get('/logout','AuthController.logout').as('auth.logout').middleware('auth')
}).prefix('/auth')


Route.group(() => {
    Route.post('/post','TwitterController.store').as('twitter.store')
    Route.get('/:id/delete','TwitterController.delete').as('twitter.delete')
    Route.post('/:id/comment','TwitterController.storeComment').as('twitter.comment.store')
    Route.get('/:id/comment/delete','TwitterController.deleteComment').as('twitter.comment.delete')
    Route.get('/follow/:id','TwitterController.follow').as('twitter.follow')
    Route.get('/search/:login','TwitterController.search').as('twitter.search')
    Route.get('/users','TwitterController.users').as('twitter.users')
  }).prefix('/twitter').middleware('auth').where('id', /^[0-9]+$/)