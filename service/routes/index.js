import servers from './servers';

export default ({ app }) => {
  app.use('/servers', servers);
};
