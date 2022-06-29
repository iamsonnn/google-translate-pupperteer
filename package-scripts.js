/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const {series, rimraf,} = require('nps-utils')

module.exports = {
    scripts: {
        default: 'nps start',
        /**
         * Starts the builded app from the dist directory.
         */
        start: {
            script: 'cross-env NODE_ENV=production node dist/app.js',
            description: 'Starts the builded app',
        },
        /**
         * Serves the current app and watches for changes to restart it
         */
        serve: {
            inspector: {
                script: 'nodemon --watch src --watch .env --inspect',
                description: 'Serves the current app and watches for changes to restart it, you may attach inspector to it.'
            },
            script: 'nodemon --watch src --watch .env',
            description: 'Serves the current app and watches for changes to restart it'
        },
        /**
         * Setup of the development environment
         */
        setup: {
            script: 'yarn install',
            description: 'Setup`s the development environment(yarn & database)'
        },
        /**
         * Creates the needed configuration files
         */
        config: {
            script: series(
                runFast('./commands/tsconfig.ts'),
            ),
            hiddenFromHelp: true
        },
        /**
         * Builds the app into the dist directory
         */
        build: {
            script: series(
                'nps config',
                'nps lint',
                'nps clean.dist',
                'nps transpile',
                'nps copy',
                'nps copy.tmp',
                'nps clean.tmp',
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Runs TSLint over your project
         */
        lint: {
            script: tslint(`./src/**/*.ts`),
            hiddenFromHelp: true
        },
        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `tsc --project ./tsconfig.build.json`,
            hiddenFromHelp: true
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(
                    `nps clean.dist`
                ),
                description: 'Deletes the ./dist folder'
            },
            dist: {
                script: rimraf('./dist'),
                hiddenFromHelp: true
            },
            tmp: {
                script: rimraf('./.tmp'),
                hiddenFromHelp: true
            }
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            default: {
                script: series(
                    `nps copy.public`
                ),
                hiddenFromHelp: true
            },
            public: {
                script: copy(
                    './src/public/*',
                    './dist'
                ),
                hiddenFromHelp: true
            },
            tmp: {
                script: copyDir(
                    './.tmp/src',
                    './dist'
                ),
                hiddenFromHelp: true
            }
        },
    }
}

function copy(source, target) {
    return `copyfiles --up 1 ${source} ${target}`
}

function copyDir(source, target) {
    return `ncp ${source} ${target}`
}

function run(path) {
    return `ts-node ${path}`
}

function runFast(path) {
    return `ts-node --transpile-only ${path}`
}

function tslint(path) {
    return `tslint -c ./tslint.json ${path} --format stylish`
}
