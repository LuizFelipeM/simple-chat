import Message from "./Message"

type ChatContent = {
  name: string,
  description: string,
  img_url: string,
  messages: Message[]
}

export default ChatContent