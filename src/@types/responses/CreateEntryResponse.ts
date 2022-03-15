import { EntryModel } from '../models/EntryModel'

export class CreateEntryResponse {
  success: boolean
  errors: string[]
  entry?: EntryModel

  constructor (success: boolean, errors: string[], entry?: EntryModel) {
    this.success = success
    this.errors = errors
    this.entry = entry
  }
}
