export class UserModel {
    id!:string
  name!: string
  email!: string
  password!: string
  address?: string
  isAdmin!:boolean;
  token!:string
}
