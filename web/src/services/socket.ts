import socketio from 'socket.io-client';
import IContent from '../interfaces/content';
import Subject from './subject';
import IObserver from '../interfaces/observer';

const socket: SocketIOClient.Socket = socketio('http://localhost:8080', {
  autoConnect: false,
});

const socketMessages = new Subject();
const subToSocketMessages = (Observer: IObserver<any>) => { socketMessages.subscribe(Observer) };

socket.on('message', (data:{ chat_id: Number, content: IContent }) => {
    console.log(data);
    socketMessages.notifyAll(data)
})

function setupWebSocket(){
    disconnect();
    socket.connect();
}

function disconnect(){
    if(socket.connected)
        socket.disconnect();
}

function joinChat(chat_id: Number){
    socket.emit('join_in_room', chat_id)
}

function sendMessage(chat_id: Number, content: IContent){
    socket.emit('message', { chat_id, content })
}

export { setupWebSocket, joinChat, sendMessage, subToSocketMessages }; 