import { TokenModel } from '../models/TokenModel'

export class RefreshTokenResponse {
    success: boolean
    errors: string[]
    accessToken?: TokenModel

    constructor (success: boolean, errors: string[], accessToken?: TokenModel) {
      this.success = success
      this.errors = errors
      this.accessToken = accessToken
    }
}
