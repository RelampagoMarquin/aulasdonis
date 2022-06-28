import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NoticiaComentarios extends BaseSchema {
  protected tableName = 'noticia_comentarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('comentario')
      table.integer('noticia_id')
        .unsigned()
        .references('noticias.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.datetime('created_at')
      table.datetime('updated_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
