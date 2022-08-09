import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Papels extends BaseSchema {
  protected tableName = 'papels'

  public async up () {
    this.schema.alterTable('users', (table) => {
      table.enum('papel',['administrador','usuario'])
        .defaultTo('usuario')
        .notNullable()
    })
  }

  public async down () {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('papel')
    })
  }
}
