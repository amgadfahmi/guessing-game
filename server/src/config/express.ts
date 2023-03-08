import cors from 'cors';
import express from 'express';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    cors({
      origin: '*',
    }),
  );

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.get('/test', (_req, res) => {
    res.sendFile('test-report.html', { root: './' });
  });

  return app;
};

export { createServer };
