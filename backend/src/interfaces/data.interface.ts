interface IUserLogin{
    name: string,
    email: string,
    encrypted: string
}

interface IUserChat{
    email: string,
    chat_id: number
}

interface IMessages{
    chat_id: number,
    content: IMessagesContent
}

interface IMessagesContent{
    chat: [
        {
            email: string,
            message: string,
            timestamp: string
        }
    ]
}

export { IUserLogin, IUserChat, IMessages }