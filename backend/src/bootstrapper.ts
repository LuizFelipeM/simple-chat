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
import { json } from "express";

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
    )

    setInterval(async () => {
        const ids = (await chatsServ.getAllChatsId()).map(id => id.id)
        const messages = await cacheServ.getAllMessagesByChat(ids)

        const convertedMessages = []

        for await (const teste of messages) {
            for (const key in teste  ) {
                if (teste.hasOwnProperty(key)) {
                    // console.log("chat_content:", { chat_id, user_id, message, message_sent_at })

                    const val = teste[key].map(a => {
                        const val = JSON.parse(a)
                        delete val.user_name

                        return val
                    })

                    chatsContentsRepository.addMessagesToChats(val)
                }
            }
        }
    }, 300000)
}

export {
    Bootstrapper,
    chatsServ,
    usersServ,
    chatsContentsServ,
    cacheServ
}