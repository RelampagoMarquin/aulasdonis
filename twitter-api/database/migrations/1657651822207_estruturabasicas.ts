import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up () {
    this.schema.createTable('posts', (table) => {
      table.increments('id')
      table.integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      table.string('post', 255).notNullable()
      table.boolean('is_deleted').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at')
      table.datetime('updated_at')
    })

    this.schema.createTable('comments', (table) => {
      table.increments('id')
      table.integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      table.integer('post_id')
      .unsigned()
      .references('posts.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      table.string('comment', 255).notNullable()
      table.boolean('is_deleted').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at')
      table.datetime('updated_at')
    })

    this.schema.createTable('friends', (table) => {
      table.integer('user_id1')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      table.integer('user_id2')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      table.primary(['user_id1', 'user_id2'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at')
      table.datetime('updated_at')
    })
  }

  

  public async down () {
    this.schema.dropTable('friends')
    this.schema.dropTable('comments')
    this.schema.dropTable('posts')
  }
}
