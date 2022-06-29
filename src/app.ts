import 'reflect-metadata'
import { Logger } from './lib/logger'
import { bootstrapMicroframework } from 'microframework-w3tec'
import { banner } from './lib/banner'
import { winstonLoader } from './loaders/winstonLoader'
import { iocLoader } from './loaders/iocLoader'
import { expressLoader } from './loaders/expressLoader'

const log = new Logger(__filename)
bootstrapMicroframework({
    loaders: [
        winstonLoader,
        iocLoader,
        expressLoader
    ]
})
    .then(() => banner(log))
    .catch(error => log.error('Application is crashed: ' + error))
