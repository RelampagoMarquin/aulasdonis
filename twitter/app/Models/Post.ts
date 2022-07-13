import { DateTime } from 'luxon'
import { 
  BaseModel, 
  belongsTo, 
  BelongsTo, 
  column, 
  HasMany, 
  hasMany
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Comment from './Comment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public userId: number

  @column()
  public post: string

  @column()
  public isDeleted: boolean
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
