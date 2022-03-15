import { EntryModel } from '@/@types/models/EntryModel'
import { CreateEntryRequest } from '@/@types/requests/CreateEntryRequest'
import { CreateEntryResponse } from '@/@types/responses/CreateEntryResponse'
import { GenericResponse } from '@/@types/responses/GenericResponse'
import { GetEntryValueResponse } from '@/@types/responses/GetEntryValueResponse'
import { AppConfig } from '@/app.config'
import authorizedFetch from '@/authorizedFetch'
import { STORAGE_CONSTANTS } from '@/constants/storage.constants'
import { UsersService } from './users.service'

export class EntriesService {
  private appConfig: AppConfig
  private authorizedFetch: (input: string | Request, init?: RequestInit) => Promise<Response>

  constructor (usersService: UsersService) {
    this.appConfig = new AppConfig()
    this.authorizedFetch = authorizedFetch(usersService)
  }

  public createEntry (request: CreateEntryRequest): Promise<CreateEntryResponse> {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }

    return this.authorizedFetch(this.appConfig.apiUrl + '/entries', opts).then(response => {
      return response.json()
    }).then(json => {
      return json as CreateEntryResponse
    })
  }

  public getEntries (): Promise<EntryModel[] | GenericResponse> {
    const userId = JSON.parse(localStorage.getItem(STORAGE_CONSTANTS.user) ?? '{}').id ?? ''
    const url = this.appConfig.apiUrl + `/users/${userId}/entries`

    let isError = false
    return this.authorizedFetch(url).then(response => {
      isError = response.status !== 200
      return response.json()
    }).then(json => {
      return isError
        ? json as GenericResponse
        : json as EntryModel[]
    })
  }

  public getEntry (id: string, nonce: string): Promise<EntryModel | GenericResponse> {
    let isError = false
    return this.authorizedFetch(this.appConfig.apiUrl + `/entries/${id}?nonce=${nonce}`).then(response => {
      isError = response.status !== 200
      return response.json()
    }).then(json => {
      return isError
        ? json as GenericResponse
        : json as EntryModel
    })
  }

  public getEntryValue (id: string, nonce: string, secret: string): Promise<GetEntryValueResponse> {
    const queryString = `nonce=${nonce}&secret=${secret}`
    const url = this.appConfig.apiUrl + `/entries/${id}/value?${queryString}`

    return this.authorizedFetch(url).then(response => {
      return response.json()
    }).then(json => {
      return json as GetEntryValueResponse
    })
  }
}
