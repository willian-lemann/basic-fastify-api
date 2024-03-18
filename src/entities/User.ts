export class User {
   id?: string
   name: string
   password: string
   email: string

   constructor(
      id: string,
      email: string,
      password: string,
      name: string
   ) {
      this.email = email
      this.id = id
      this.name = name
      this.password = password
   }



}