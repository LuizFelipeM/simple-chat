import express from 'express'

import cors from 'cors'
import http from 'http'

import routes from './routes'
import { setupWebSocket } from './services/websocket'

const PORT = 8080

const app = express();
const server = new http.Server(app);

setupWebSocket(server);

app.use(cors())
app.use(express.json())

app.use(routes)

server.listen(PORT);