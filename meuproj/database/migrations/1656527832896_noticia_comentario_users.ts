import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NoticiaComentarioUsers extends BaseSchema {

  public async up () {
    this.schema.alterTable('noticia_comentarios', (table) => {
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable('noticia_comentarios', (table) => {
      table.dropColumn('user_id')
    })
  }
}
