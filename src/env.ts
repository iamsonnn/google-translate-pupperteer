import * as dotenv from 'dotenv'
import * as path from 'path'

import * as pkg from '../package.json'
import {getOsEnv, getOsEnvOptional, getPath, normalizePort, toBool} from './lib/env'

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? '.dev' : '')}`) })

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: '',
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        banner: true,
        dirs: {
            controllers: [getPath('src/api/controllers/**/*Controller.ts')],
            middlewares: [getPath('src/api/middlewares/**/*Middleware.ts')]
        },
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
}
