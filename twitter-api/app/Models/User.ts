import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column, 
  beforeSave, 
  computed,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Post from './Post'
import Friend from './Friend'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public login: string

  @column()
  public senha: string

  @column()
  public papel: 'administrador' | 'usuario'

  @computed()
  public get password() {
    return this.senha
  }

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @manyToMany(() => User)
  public friends: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.senha) {
      user.senha = await Hash.make(user.senha)
    }
  }

  public async hasFriend(user: User){
    const t1 = await Friend.query()
      .orWhere({
        'user_id1': this.id,
        'user_id2': user.id
    })
      .orWhere({
      'user_id1': user.id,
      'user_id2': this.id
    })
    
    if(t1.length > 0){
      return true
    }else{
      return false
    }
  }
}
