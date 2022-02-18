import { config } from 'dotenv'
import fastify from 'fastify'
import fastifyAutoload from 'fastify-autoload'
import path from 'path'
import pino from 'pino'
import { Chatbot } from './Chatbot'

config()

export async function createServer() {
    const server = fastify({
        logger: pino({
            level: process.env.LOG_LEVEL || 'info',
            messageKey: 'message'
        })
    })

    server.register(fastifyAutoload, {
        dir: path.join(__dirname, './routes'),
        routeParams: true
    })

    await server.ready()
    return server
}

export async function startServer() {
    process.on('unhandledRejection', (err) => {
        console.error(err)
        process.exit(1)
    })

    const server = await createServer()
    await server.listen(process.env.API_PORT!)

    for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
            server.close().then((err) => {
                console.log(`close application on ${signal}`)
                process.exit(err ? 1 : 0)
            })
        )
    }
}

if (process.env.NODE_ENV !== 'test') {
    Chatbot()
    startServer()
}
