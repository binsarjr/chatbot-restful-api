import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Chatbot } from '../../Chatbot'

interface IConversation {
    locale: string
    utterance: string
    answer: string
    intent: string
}

export default async function (
    server: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (err?: Error) => void
) {
    server.get<{
        Querystring: IConversation
    }>('/', async (request, reply) => {
        Chatbot().nlp!.addLanguage(request.query.locale)
        Chatbot().nlp!.addDocument(
            request.query.locale,
            request.query.utterance,
            request.query.intent
        )
        Chatbot().nlp!.addAnswer(
            request.query.locale,
            request.query.intent,
            request.query.answer
        )

        Chatbot().ev.emit('train', null)
        reply.send({message:'processing, please wait'})
    })
    next()
}
