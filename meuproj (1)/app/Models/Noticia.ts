import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Noticia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo:string
  
  @column()
  public conteudo: string

  @column()
  public chamada: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
