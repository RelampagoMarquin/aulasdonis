import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Noticias extends BaseSchema {
  protected tableName = 'noticias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('titulo', 255).notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at').comment('Campo automatica com a data de criação')
      table.datetime('updated_at').comment('Campo automatica com a data de utualização')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
