import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Chatbot } from '../../Chatbot'

interface IConversation {
    locale: string
    text: string
}

export default async function (
    server: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (err?: Error) => void
) {
    server.get<{
        Querystring: IConversation
    }>('/', async (request, reply) => {
        const response = await Chatbot().nlp?.process(
            request.query.locale,
            request.query.text
        )
        let result = {
            success: Boolean(response!.score > 0.8),
            data: response,
            note: 'by default, the score is must more then 0.8 to be true response, but u can anything what you want'
        }

        reply.send(result)
    })
    next()
}
