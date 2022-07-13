import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column,
 } from '@ioc:Adonis/Lucid/Orm'

export default class Friend extends BaseModel {
  @column({ isPrimary: true })
  public user_id1: number

  @column({ isPrimary: true })
  public user_id2: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
