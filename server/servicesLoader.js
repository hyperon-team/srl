import fs from 'fs'
import utils from './utils'

const defaultConfig = {
  name: null
}

export default (server) => {
  const {app} = server
  let services = {}
  fs.readdirSync('services').forEach(sn => {
    import('./services/' + sn).then(service => {
      service = new service.default(server)
      //console.log('service', service)
      
      if(!service.config) {
        service.config = defaultConfig
        service.config.name = sn.split('.')[0]
        services[sn.split('.')[0]] = service
      } else {
        services[service.config.name ? service.config.name : service.config.key ? service.config.key : sn.split('.')[0]] = service
      }
    

      for(let sname in services) {
        let service = services[sname]
        app.get(`/get/${sname}`, (req, res) => {
          service.resolvers.get(req.query.filter ? req.query.filter : null)
          res.send('AOAOAOA')
          res.end()
        })
        app.post(`/add/${sname}`, (req, res) => {
          if(!req.body.data) {
            try {
              utils.genWebErr(res, 'data undefined')
              res.end()
              return
            } catch(e) {

            }
          }
          service.resolvers.add(!req.body.data)
          res.end()
        })

        app.put(`/set/${sname}`, (req, res) => {
          if(!req.body.data || !req.query.entryId) {
            try {
              !req.body.data ? utils.genWebErr(res, 'data undefined') : !req.query.entryId ? utils.genWebErr(res, 'entryId undefined') : null
              res.end()
              return
            } catch(e) {}
          }
          service.resolvers.set(req.query('entryId'), req.body.data)
          res.end()
        })
        app.delete(`/del/${sname}`, (req, res) => {
          if(!req.query.entryId) {
            try { 
              utils.genWebErr(res, 'entryId undefined')
              res.end()
              return
            }
            catch(e) {}
          }
          service.resolvers.del(req.query.entryId)
          res.end()
        })
      }
    })
  })

  
}