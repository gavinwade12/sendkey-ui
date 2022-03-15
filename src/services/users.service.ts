import { AppConfig } from '@/app.config'
import { CreateUserRequest } from '@/@types/requests/CreateUserRequest'
import { CreateUserResponse } from '@/@types/responses/CreateUserResponse'
import { LoginResponse } from '@/@types/responses/LoginResponse'
import { STORAGE_CONSTANTS } from '@/constants/storage.constants'
import { RefreshTokenResponse } from '@/@types/responses/RefreshTokenResponse'

export class UsersService {
    private appConfig: AppConfig

    constructor () {
      this.appConfig = new AppConfig()
    }

    public async createUser (request: CreateUserRequest): Promise<CreateUserResponse> {
      const opts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      }

      return fetch(this.appConfig.apiUrl + '/users', opts).then(res => {
        return res.json()
      }).then(json => {
        return json as CreateUserResponse
      })
    }

    public async login (email: string, password: string): Promise<LoginResponse> {
      const opts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      }

      return fetch(this.appConfig.apiUrl + '/login', opts).then(res => {
        return res.json()
      }).then(json => {
        const loginResponse = json as LoginResponse

        localStorage.setItem(STORAGE_CONSTANTS.user, JSON.stringify(loginResponse.user))
        localStorage.setItem(STORAGE_CONSTANTS.accessToken, JSON.stringify(loginResponse.accessToken))
        localStorage.setItem(STORAGE_CONSTANTS.refreshToken, JSON.stringify(loginResponse.refreshToken))

        return loginResponse
      })
    }

    public async refreshToken (): Promise<RefreshTokenResponse> {
      let refreshToken: string
      let userId: string

      try {
        refreshToken = JSON.parse(localStorage.getItem(STORAGE_CONSTANTS.refreshToken) ?? '').token
        userId = JSON.parse(localStorage.getItem(STORAGE_CONSTANTS.user) ?? '').id
      } catch (error) {
        return Promise.reject(error)
      }

      const opts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken,
          userId
        })
      }

      return fetch(this.appConfig.apiUrl + '/token', opts).then(res => {
        return res.json()
      }).then(json => {
        const response = json as RefreshTokenResponse
        if (response.success) {
          localStorage.setItem(STORAGE_CONSTANTS.accessToken, JSON.stringify(response.accessToken))
        } else {
          localStorage.clear()
        }

        return response
      })
    }
}
