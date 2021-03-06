import { Router } from 'express';
import redisController from './controllers/redisController';
import chatsController from './controllers/chatsController';
import usersController from './controllers/usersController';
import chatsContentsController from './controllers/chatsContentsController';

const routes = Router();

routes.get('/redis/list', redisController.listAll);
routes.get('/redis/message', redisController.listMessages);
routes.post('/redis/cache', redisController.storeCache);
routes.post('/redis/message', redisController.storeMessage);

routes.get('/chats', chatsController.listChatsByEmail);
routes.post('/chats', chatsController.createNewChat);
routes.delete('/chats/:id', chatsController.deleteChat);

routes.get('/users', usersController.getUserInfo);
routes.post('/users', usersController.createUser);
routes.delete('/users/:email', usersController.deleteChat);

routes.get('/chats/contents', chatsContentsController.getAllMessagesFromChat);
routes.post('/chats/contents', chatsContentsController.addMessageToChat);

export default routes;