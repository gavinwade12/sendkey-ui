export class EntryModel {
  id: string
  sentByUserId: string
  sentToEmail: string
  invalidAttempts: number
  createdAtUtc: string
  expiresAtUtc: string

  constructor (id: string, sentByUserId: string, sentToEmail: string, invalidAttempts: number, createdAtUtc: string, expiresAtUtc: string) {
    this.id = id
    this.sentByUserId = sentByUserId
    this.sentToEmail = sentToEmail
    this.invalidAttempts = invalidAttempts
    this.createdAtUtc = createdAtUtc
    this.expiresAtUtc = expiresAtUtc
  }
}
