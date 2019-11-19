import servers from './servers';

export default server => {
  const { app } = server;
  app.use('/servers', servers(server));
};
