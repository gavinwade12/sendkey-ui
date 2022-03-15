import { UserModel } from '../models/UserModel'

export class CreateUserResponse {
    success: boolean
    errors: string[]
    user: UserModel

    constructor (success: boolean, errors: string[], user: UserModel) {
      this.success = success
      this.errors = errors
      this.user = user
    }
}
