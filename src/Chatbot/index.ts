import PQueue from 'p-queue'
import path from 'path'
import { EventEmitter } from 'stream'
import { ChatbotEventEmitter } from 'Typings/Event'
import { DockStart, NLPManager } from 'Typings/NLPManager'
const { dockStart } = require('@nlpjs/basic')

class ChatBot {
    ev: ChatbotEventEmitter = new EventEmitter()
    nlp?: NLPManager
    filepath = path.join(__dirname, '../../model.nlp')
    private queues = {
        train: new PQueue({ concurrency: 1 })
    }
    async start() {
        const dock: DockStart = await dockStart({ use: ['Basic'] })
        this.nlp = dock.get('nlp')
        this.nlp.load(this.filepath)
        this.ev.emit('ready', { nlp: this.nlp })
        this.ev.on('train', async (_) => {
            this.queues.train.add(() => this.nlp!.train())
            this.queues.train.add(() => this.nlp!.save(this.filepath))
        })
        return this
    }
}

let chatbot: ChatBot
export const Chatbot = () => {
    if (chatbot) return chatbot
    chatbot = new ChatBot()
    chatbot.start()
    return chatbot
}
