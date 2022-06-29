import * as express from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import compression from 'compression'
import { Service } from 'typedi'

@Middleware({ type: 'before' })
@Service()
export class CompressionMiddleware implements ExpressMiddlewareInterface {

    public use(request: express.Request, response: express.Response, next: express.NextFunction): any {
        return compression()(request, response, next)
    }

}
