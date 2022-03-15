import { STORAGE_CONSTANTS } from './constants/storage.constants'
import { UsersService } from './services/users.service'

export default function authorizedFetch (usersService: UsersService, accessToken?: string) {
  accessToken = accessToken ?? ''
  if (accessToken === '') {
    try {
      accessToken = JSON.parse(localStorage.getItem(STORAGE_CONSTANTS.accessToken) ?? '{}').token ?? ''
    } catch (error) {}
  }

  return function (input: Request | string, init?: RequestInit): Promise<Response> {
    if (!init) {
      init = {} as RequestInit
    }

    const headers = new Headers(init.headers ?? {})
    headers.append('Authorization', `Bearer ${accessToken}`)
    init.headers = headers

    return fetch(input, init).then(response => {
      if (response.status !== 401) {
        return response
      }

      return usersService.refreshToken().then(refreshResponse => {
        if (!refreshResponse.success) {
          console.error(refreshResponse.errors)
          return response
        }

        accessToken = refreshResponse.accessToken?.token ?? ''
        headers.set('Authorization', `Bearer ${accessToken}`)
        return fetch(input, init)
      })
    })
  }
}
