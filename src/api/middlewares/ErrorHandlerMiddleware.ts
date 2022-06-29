import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers'
import { Logger, LoggerInterface } from '../../decorators/Logger'
import * as express from 'express'
import { Service } from 'typedi'
import { CommonDTO } from '../controllers/dto/CommonDTO'

@Middleware({ type: 'after' })
@Service()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) {
    }

    public error(error: HttpError, request: express.Request, response: express.Response, next: express.NextFunction): void {
        response.status(error.httpCode || 500)
        this.log.error(`${error[`message`] || ''}${error[`errors`] ? ': ' : ''}${error[`errors`] || []}`)
        this.log.error(error.name, error.stack)
        response.json(new CommonDTO<string>('ERROR', '', `${error[`message`] || ''}${error[`errors`] ? ': ' : ''}${error[`errors`] || []}`))
    }
}
