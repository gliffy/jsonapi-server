'use strict'
const swagger = module.exports = { }

const router = require('../router.js')
const swaggerGenerator = require('../swagger')
const jsonApi = require('../../')

swagger.register = () => {
  if (!jsonApi._apiConfig.swagger) return

  router.bindRoute({
    verb: 'get',
    path: 'swagger.json'
  }, (request, resourceConfig, res) => {
    const { originalReq: { host, protocol } } = request
    const serviceInstance = { host, protocol }
    const key = `${protocol}://${host}`
    swagger._cache = swagger._cache || {}
    if (!swagger._cache[key]) {
      swagger._cache[key] = swaggerGenerator.generateDocumentation(serviceInstance)
    }

    return res.json(swagger._cache[key])
  })
}
