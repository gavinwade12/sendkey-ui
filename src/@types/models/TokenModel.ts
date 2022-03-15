export class TokenModel {
    token: string
    expires: number

    constructor (token: string, expires: number) {
      this.token = token
      this.expires = expires
    }
}
