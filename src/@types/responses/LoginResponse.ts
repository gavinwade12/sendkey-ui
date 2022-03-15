import { TokenModel } from '../models/TokenModel'
import { UserModel } from '../models/UserModel'

export class LoginResponse {
    success: boolean
    errors: string[]
    user?: UserModel
    accessToken?: TokenModel
    refreshToken?: TokenModel

    constructor (success: boolean, errors: string[], user?: UserModel, accessToken?: TokenModel, refreshToken?: TokenModel) {
      this.success = success
      this.errors = errors
      this.user = user
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    }
}
