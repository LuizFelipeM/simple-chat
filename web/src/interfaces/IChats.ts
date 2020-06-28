import Message from "./Message";

export default interface IChats {
  id: number,
  name: string,
  description: string,
  img_url: string,
  messages: Message[]
}