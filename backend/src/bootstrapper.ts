import http from "http";

import Websocket from "./services/socketioService";
import chatService from "./services/chatService";
import userService from "./services/userService";
import redisService from "./services/redisService";
import chatsRepository from "./repositories/chatsRepository";
import usersRepository from "./repositories/usersRepository";
import usersChatsRepository from "./repositories/usersChatsRepository";
import chatContentService from "./services/chatContentService";
import chatsContentsRepository from "./repositories/chatsContentsRepository";

const usersServ = userService(usersRepository);
const chatsContentsServ = chatContentService(chatsContentsRepository);
const chatsServ = chatService(usersRepository, chatsRepository, usersChatsRepository);

function Bootstrapper(
    server: http.Server
): void {
    
    Websocket(
        server,
        redisService,
        chatsServ
    );    
}

export { Bootstrapper, chatsServ as chatServ, usersServ as userServ, chatsContentsServ as chatContentServ }