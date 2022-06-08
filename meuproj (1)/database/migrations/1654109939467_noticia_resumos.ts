import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NoticiaResumos extends BaseSchema {

  public async up () {
    this.schema.alterTable('noticias', (table) => {
      table.string('chamada')
    })
  }

  public async down () {
    this.schema.alterTable('noticias', (table) => {
      table.dropColumn('chamada')
    })
  }
}
