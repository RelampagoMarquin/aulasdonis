import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column, 
  belongsTo,
  BelongsTo

} from '@ioc:Adonis/Lucid/Orm'
import Noticia from './Noticia'
import User from './User'

export default class NoticiaComentario extends BaseModel {
  public static table = 'noticia_comentarios'

  @column({ isPrimary: true })
  public id: number

  @column()
  public comentario: string

  @column()
  public noticiaId: number

  @column()
  public userId: number

  @belongsTo(() => Noticia)
  public noticia: BelongsTo<typeof Noticia>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
