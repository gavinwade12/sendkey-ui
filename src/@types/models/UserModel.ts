export class UserModel {
    id: string
    firstName: string
    lastName: string
    email: string
    createdAtUtc: number

    constructor (id: string, firstName: string, lastName: string, email: string, createdAtUtc: number) {
      this.id = id
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      this.createdAtUtc = createdAtUtc
    }
}
