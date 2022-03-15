export class GenericResponse {
  success: boolean
  statusCode: number
  message: string

  constructor (success: boolean, statusCode: number, message: string) {
    this.success = success
    this.statusCode = statusCode
    this.message = message
  }
}
