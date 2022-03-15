export class GetEntryValueResponse {
  success: boolean
  errors: string[]
  expired: boolean
  value?: string

  constructor (success: boolean, errors: string[], expired: boolean, value?: string) {
    this.success = success
    this.errors = errors
    this.expired = expired
    this.value = value
  }
}
