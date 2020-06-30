import { Server } from "http";
import socketio from "socket.io";

import room from "./roomService";

import IChatService from "./interfaces/IChatsService";
import ICacheService from "./interfaces/ICacheService";
import IUsersService from "./interfaces/IUsersService";
import { ChatsContentsDto } from "../interfaces/Dtos/ChatsContentsDto";

let io: socketio.Server
let _cacheService: ICacheService
let _chatService: IChatService
let _userService: IUsersService

const Websocket = (
    server: Server,
    cacheService: ICacheService,
    chatService: IChatService,
    userService: IUsersService
) => {
    io = socketio(server)

    _cacheService = cacheService
    _chatService = chatService
    _userService = userService

    setup()
}

function setup(): void {
    io.on('connection', socket => {
        io.on('disconnect', () => console.log(`Socket ${socket.id} disconnected`));

        handleConnection(socket);

        socket.on('message', (message: ChatsContentsDto) => {
            console.log('message', message)

            io.to(room.roomName(message.chat_id)).emit('message', message)
            _cacheService.setMessage(message)
        })
    })
}

async function handleConnection(socket: socketio.Socket) {
    const email = socket.handshake?.query?.email
    const password = socket.handshake?.query?.password

    const user = await _userService.getUserInformationByEmail(email)
    
    const scoketId = socket.id

    const oldSocketId = await _cacheService.getDataByField('users', email)
    
    const oldConnection = io.clients().connected
    oldConnection[oldSocketId]?.disconnect()

    
    _cacheService.setData('users', email, scoketId)
    socket.emit('userInfo', { id: user.id, name: user.name })
    
    const chatList = await _chatService.getChatListByUserId(user.id)

    chatList.forEach(chat => {
        socket.join(room.roomName(chat.id), (err: any) => { if(err) console.error(err) })
        _cacheService.getAllMessages(chat.id)
            .then(messages => socket.emit('messagesOnChat', chat.id, messages))
    })
    socket.emit('chatList', chatList)
    //socket.emit('message', message));
}

export default Websocket;