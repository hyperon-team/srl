import express from 'express'
import routes from './routes.js'

global.server = {
  app: express(),
  config: {
    port: 8000,
  }
}

const {app, config} = global.server

routes(global.server)

app.listen(config.port, () => {
  console.log(`Server Started on ${config.port} port`)
})