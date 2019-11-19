import express from 'express'
import bodyParser from 'body-parser'
import services from './servicesLoader'


const server = {
  app: express(),
  config: {
    port: 8000,
  }
}

const {app, config} = server


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


///////////////////////////
services(server)
///////////////////////////

app._router.stack.forEach(r => {
  r.route ? console.debug('router',r.route.path) : null
})

app.listen(config.port, () => {
  console.log(`Server Started on ${config.port} port`)
})