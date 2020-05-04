import cors from 'cors';
import http from 'http';
import express from 'express';

import routes from './routes';
import { Bootstrapper } from './bootstrapper';

const app = express();

const server = new http.Server(app);

Bootstrapper(server);

app.use(cors());
app.use(express.json());

app.use(routes);

server.listen(process.env.PORT);