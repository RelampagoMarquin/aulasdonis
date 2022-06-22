import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

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
  public get password(){
    return this.senha
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //o before save força a execução antes de salvar
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.senha) {
      user.senha = await Hash.make(user.senha)
    }
  }
}
