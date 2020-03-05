import { Router } from 'express';
import userController from './controllers/users.controller';
import userChatsController from './controllers/userChats.controller';
import chatController from './controllers/chats.controller';
import messagesController from './controllers/messages.controller';
import withAuth from './controllers/utils/authMiddleware';

/**
 * App Bootstrapper
 */

 const user = new userController();
 const chat = new chatController();
 const userChats = new userChatsController();
 const messages = new messagesController();

const routes: Router = Router()

// User Routes
routes.get('/users', [user.listUser, user.findUser] )
routes.post('/users/auth', user.authUser)
routes.post('/users', user.createUser)
// routes.put('/users', userController.update)
// routes.delete('/users', userController.destroy)

// User Chats
routes.get('/users/chats', [withAuth, userChats.list, userChats.find] )
routes.post('/users/chats', [withAuth, userChats.create])
// routes.put('/users/chats', userChats.update)
// routes.delete('/users/chats', userChats.remove)

// Chats Routes
routes.get('/chats', [withAuth, chat.list, chat.find] )
routes.post('/chats', [withAuth, chat.create])
// routes.put('/chats', chat.update)
// routes.delete('/chats', chat.remove)

// Messages Routes
routes.get('/chats/messages', [withAuth, messages.list, messages.find] )
routes.post('/chats/messages', [withAuth, messages.create])
routes.patch('/chats/messages', [withAuth, messages.update])
// routes.delete('/chats/messages', messages.remoev)

export default routes;