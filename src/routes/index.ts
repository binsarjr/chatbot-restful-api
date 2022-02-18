import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function (
    server: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (err?: Error) => void
) {
    server.get('/', async (request, reply) => {
        reply.send({ hello: 'world' })
    })
    next()
}
