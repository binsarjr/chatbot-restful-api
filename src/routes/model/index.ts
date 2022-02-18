import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { readFileSync } from 'fs'
import { Chatbot } from '../../Chatbot'

export default async function (
    server: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (err?: Error) => void
) {
    server.get('/', async (request, reply) => {
        const data = readFileSync(Chatbot().filepath)
        reply.header('Content-Disposition', 'attachment; filename=model.nlp')
        reply.send(data)
    })
    next()
}
