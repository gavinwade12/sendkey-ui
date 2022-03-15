export class CreateEntryRequest {
  name: string
  sendToEmail: string
  value: string
  duration: number
  secret: string

  constructor (name: string, sendToEmail: string, value: string, duration: number, secret: string) {
    this.name = name
    this.sendToEmail = sendToEmail
    this.value = value
    this.duration = duration
    this.secret = secret
  }
}
