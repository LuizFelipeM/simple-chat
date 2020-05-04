import http from "http";

import Websocket from "./services/socketioService";
import chatService from "./services/chatService";
import userService from "./services/userService";
import redisService from "./services/redisService";
import chatsRepository from "./repositories/chatsRepository";
import usersRepository from "./repositories/usersRepository";

const chatServ = chatService(chatsRepository);
const userServ = userService(usersRepository);

function Bootstrapper(
    server: http.Server
): void {
    
    Websocket(
        server,
        redisService,
        chatServ
    );    
}

export { Bootstrapper, chatServ, userServ }