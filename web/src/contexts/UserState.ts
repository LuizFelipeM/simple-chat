import Chat from "../interfaces/Chat";

type UserState = {
  id: number
  name: string
  email: string
  token: string
  chatList: Chat[]
}

export default UserState