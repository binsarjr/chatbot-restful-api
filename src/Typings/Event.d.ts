export type ChatbotEventMap<T> = {
    train: null
    ready: {
        nlp: NLPManager
    }
    addDocument: {
        utterances: string
    }
}

export interface CommonChatbotEventEmitter<Creds> extends EventEmitter {
    on<T extends keyof ChatbotEventMap<Creds>>(
        event: T,
        listener: (arg: ChatbotEventMap<Creds>[T]) => void
    ): this
    off<T extends keyof ChatbotEventMap<Creds>>(
        event: T,
        listener: (arg: ChatbotEventMap<Creds>[T]) => void
    ): this
    removeAllListeners<T extends keyof ChatbotEventMap<Creds>>(event: T): this
    emit<T extends keyof ChatbotEventMap<Creds>>(
        event: T,
        arg: ChatbotEventMap<Creds>[T]
    ): boolean
}

export type ChatbotEventEmitter = CommonChatbotEventEmitter<Creds>
