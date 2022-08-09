import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column,
 } from '@ioc:Adonis/Lucid/Orm'

export default class Friend extends BaseModel {
  @column({ isPrimary: true })
  public userId1: number

  @column({ isPrimary: true })
  public userId2: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
