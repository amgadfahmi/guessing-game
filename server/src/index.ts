import { createServer } from '@config/express';
import { logger } from '@config/logger';
import { GameSpeed } from '@models/index';
import { chat, initialGame, login, start } from '@socket/socketHandler';
import http from 'http';
import * as moduleAlias from 'module-alias';
import { AddressInfo } from 'net';
import { Server } from 'socket.io';

const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : 'build';
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@socket': `${sourcePath}/socket`,
  '@domain': `${sourcePath}/domain`,
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

async function startServer() {
  const app = createServer();

  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port}`);

    const io = new Server(server, { cors: { origin: '*' } });
    const onConnection = (socket) => {
      logger.info('onConnection', socket.id);
      const game = initialGame(GameSpeed['1x']);

      socket.on('login', (payload, callback) => login(payload, callback, socket, game));
      socket.on('start', (payload, callback) => start(payload, callback, socket, game));
      socket.on('message', (payload, callback) => chat(payload, callback, socket));
    };
    io.on('connection', onConnection);
  });

  const signalTraps: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.on(type, () => {
      logger.info(`process.once ${type}`);
    });
  });
}

startServer();
