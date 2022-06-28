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

Route.get('/', 'SitesController.index').as('index')

//Route.get('/noticia/cadastrar', 'SitesController.create')
Route.group(() => {
    Route.get('/', 'NoticiasController.index').as('noticia.index')
    Route.get('/create', 'NoticiasController.create').as('noticia.create')
    Route.post('/create', 'NoticiasController.store').as('noticia.store')
    Route.get('/:id/edit', 'NoticiasController.edit').where('id', /^[0-9]+$/).as('noticia.edit')
    Route.post('/:id/edit', 'NoticiasController.update').where('id', /^[0-9]+$/).as('noticia.update')
    Route.get('/:id/delete', 'NoticiasController.delete').where('id', /^[0-9]+$/).as('noticia.delete')
    Route.get('/:id/view', 'NoticiasController.view').where('id', /^[0-9]+$/).as('noticia.view')
    Route.post('/:id/comment', 'NoticiasController.createComment').where('id', /^[0-9]+$/).as('noticia.comment')
}).prefix('/noticia').middleware('auth')

Route.group(() => {
    Route.get('/', 'UsersController.index').as('usuario.index')
    Route.get('/create', 'UsersController.create').as('usuario.create')
    Route.post('/create', 'UsersController.store').as('usuario.store')
    Route.get('/:id/edit', 'UsersController.edit').where('id', /^[0-9]+$/).as('usuario.edit')
    Route.post('/:id/edit', 'UsersController.update').where('id', /^[0-9]+$/).as('usuario.update')
    Route.get('/:id/delete', 'UsersController.delete').where('id', /^[0-9]+$/).as('usuario.delete')
}).prefix('/usuario').middleware('auth') ///o middware restringe a esta logado


Route.group(() => {
    Route.get('/login', 'AuthController.index').as('auth.index')
    Route.post('/login', 'AuthController.login').as('auth.login')
    Route.get('/logout', 'AuthController.logout').as('auth.logout').middleware('auth')
}).prefix('/auth')