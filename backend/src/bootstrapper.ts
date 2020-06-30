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

function Bootstrapper(server: http.Server): void {
    
    cacheMessages()
        .then(() => 
            Websocket(
                server,
                cacheServ,
                chatsServ,
                usersServ
            )
        )

    // setInterval(async () => {
    //     const ids = (await chatsServ.getAllChatsId()).map(id => id.id)
    //     const messages = await cacheServ.getAllMessagesByChat(ids)

    //     for await (const teste of messages) { // TODO - MELHORAR ISSO AQUI
    //         for (const key in teste  ) {
    //             if (teste.hasOwnProperty(key)) {
    //                 const val = teste[key].map(a => {
    //                     const val = JSON.parse(a)
    //                     delete val.user_name

    //                     return val
    //                 })

    //                 chatsContentsRepository.addMessagesToChats(val)
    //             }
    //         }
    //     }
    // }, 300000)
}

async function cacheMessages() {
    const chatIds = await chatsServ.getAllChatsId()

    chatIds.forEach(async chat => {
        const messages = await chatsContentsServ.getMessagesFromChat(chat.id)

        for (const message of messages)
            cacheServ.setMessage(message)
    })
}

export {
    Bootstrapper,
    chatsServ,
    usersServ,
    chatsContentsServ,
    cacheServ
}