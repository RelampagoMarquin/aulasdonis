import { DateTime } from 'luxon'
import { 
  BaseModel, 
  belongsTo, 
  BelongsTo, 
  column, 
  HasMany, 
  hasMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Comment from './Comment'
import Friend from './Friend'

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

  public static notDeleted = scope((query) => {
    query.where('is_deleted', false)
  })

  public static timeLineOfUser = scope((query, user: User) => {
    const queryIds1 = Friend.query()
      .select('user_id1')
      .where('user_id2', user.id)

    const queryIds2 = Friend.query()
      .select('user_id2')
      .where((builder) => {
        builder.orWhere('user_id', 'in', queryIds1)
        builder.orWhere('user_id', 'in', queryIds2)
        builder.orWhere('user_id', user.id)
      })
    query.orderBy('id', 'desc')
  })
}
