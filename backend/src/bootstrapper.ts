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
const cacheServ = redisService(chatsContentsRepository);

function Bootstrapper(
    server: http.Server
): void {
    
    Websocket(
        server,
        cacheServ,
        chatsServ
    );    
}

export { Bootstrapper, chatsServ, usersServ, chatsContentsServ, cacheServ }