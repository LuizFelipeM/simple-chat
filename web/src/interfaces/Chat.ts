import Message from "./Message";

export default interface Chat {
  id: number,
  name: string,
  description: string,
  img_url: string,
  messages: Message[]
}