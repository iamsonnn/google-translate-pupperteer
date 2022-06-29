import {MicroframeworkLoader, MicroframeworkSettings} from 'microframework-w3tec'
import {Application} from 'express'
import {createExpressServer} from 'routing-controllers'
import {env} from '../env'

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp: Application = createExpressServer({
            cors: true,
            classTransformer: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            controllers: env.app.dirs.controllers,
            middlewares: env.app.dirs.middlewares
        })

        if (!env.isTest) {
            const server = expressApp.listen(env.app.port)
            settings.setData('express_server', server)
        }
        settings.setData('express_app', expressApp)
    }
}
