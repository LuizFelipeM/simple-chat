import http from "http";

import Websocket from "./services/socketioService";
import chatsService from "./services/chatsService";
import usersService from "./services/usersService";
import redisService from "./services/redisService";
import chatsRepository from "./repositories/chatsRepository";
import usersRepository from "./repositories/usersRepository";
import usersChatsRepository from "./repositories/usersChatsRepository";
import chatsContentsService from "./services/chatsContentsService";
import chatsContentsRepository from "./repositories/chatsContentsRepository";

const usersServ = usersService(usersRepository);
const chatsContentsServ = chatsContentsService(chatsContentsRepository);
const chatsServ = chatsService(usersRepository, chatsRepository, usersChatsRepository);

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