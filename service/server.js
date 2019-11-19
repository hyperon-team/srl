import express from 'express';
import routes from './routes';
import db from './lib/db';

const server = {
  app: express(),
  config: {
    port: 8000,
  },
  db,
};

const { app, config } = server;

routes(server);

app.listen(config.port, () => {
  console.log(`Server Started on ${config.port} port`);
});
