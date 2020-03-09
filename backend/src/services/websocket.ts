import socketio from 'socket.io'
import http from 'http'

let io: socketio.Server;

export const setupWebSocket = (server: http.Server) => {
    io = socketio(server);

    io.on('connection', (socket: socketio.Socket) => {

        io.on('disconnect', (socket: socketio.Socket) => {
            console.log("Socket desconectado", socket.id)
        })

        const roomPrefix = 'chat_';

        socket.on('join_in_room', (chat_id) => {
            if(!Object.values(socket.rooms)[0].includes(roomPrefix))
                socket.leaveAll();

            const chat_room = roomPrefix + chat_id;

            socket.join(chat_room, (err: any) => {
                if(err)
                    throw err;
            })
        })

        socket.on('message', (data: { 
            chat_id: number, 
            content: {
                email: string,
                message: string,
                timstamp: string
            }
        }) => {
            io.to(roomPrefix + data.chat_id).emit('message', data);
        })

    })
}