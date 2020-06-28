import IChats from "../interfaces/IChats";

type UserState = {
  id: number
  name: string
  email: string
  token: string
  chatList: IChats[]
}

export default UserState