import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NoticiaConteudos extends BaseSchema {

  public async up () {
    this.schema.alterTable('noticias', (table) => {
      table.text('conteudo')
    })
  }

  public async down () {
    this.schema.alterTable('noticias', (table) => {
      table.dropColumn('conteudo')
    })
  }
}
