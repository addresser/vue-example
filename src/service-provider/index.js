import injector from 'vue-inject'

import constants from './constants'
import services from './services'

for (let constantName in constants) {
  injector.constant(constantName, constants[constantName])
}

for (let serviceName in services) {
  injector.service(
    serviceName,
    services[serviceName].dependencies,
    services[serviceName].service
  )
}

export default injector
