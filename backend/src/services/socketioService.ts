import { Server } from "http";
import socketio from "socket.io";

import room from "./roomService";

import IMessageDto from "./interfaces/IMessageDto";
import IChatService from "./interfaces/IChatService";
import ICacheService from "./interfaces/ICacheService";

let io: socketio.Server;
let _cacheService: ICacheService;
let _chatService: IChatService;

const Websocket = (
    server: Server,
    cacheService: ICacheService,
    chatService: IChatService
) => {
    io = socketio(server);

    _cacheService = cacheService;
    _chatService = chatService;

    setup();
}

function setup(): void {
    io.on('connection', (socket: socketio.Socket) => {
        io.on('disconnect', () => console.log(`Socket ${socket.id} disconnected`));

        handleConnection(socket);

        socket.on('message', (message: IMessageDto) => {
            io.to(room.roomName(message.chat_id)).emit('message', message);
            _cacheService.setMessage(message);
        });
    })
}

async function handleConnection(socket: socketio.Socket) {
    const email = socket.request?._query?.email;
    const scoketId = socket.id;

    const chatList = await _chatService.getChatListByUserEmail(email);

    _cacheService.setData('users', email, scoketId);
    socket.emit('chat_list', chatList);
}

export default Websocket;