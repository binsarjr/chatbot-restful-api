export interface Classifications {
    intent: string
    score: number
}

export interface NLPProcess {
    locale: string
    utterance: string
    settings: any
    languageGuessed: boolean
    localeIso2: string
    language: string
    nluAnswer: {
        classifications: Classifications[]
        entities: any
        explanation: any
    }
    classifications: Classifications[]
    intent: string
    score: number
    domain: string
    entities: []
    sourceEntities: []
    answers: { answer: string; opts: any }[]
    answer: string
    actions: []
    sentiment: {
        score: number
        numWords: number
        numHits: number
        average: number
        type: any
        locale: string
        vote: string
    }
}

export interface NLPManager {
    addLanguage(...locales: string[]): void
    removeLanguage(...locales: string[]): void
    addDocument(locale: string, utterance: string, intent: string): void
    removeDocument(locale: string, utterance: string, intent: string): void
    getRulesByName(locale: string, name: string): void
    addNerRule(locale: string, name: string, type: string, rule: string): void
    removeNerRule(locale: string, name: string, rule: string): void
    assignDomain(locale: string, intent: string, domain: string): void
    getIntentDomain(locale: string, intent: string): void
    getDomains(): string
    addAnswer(
        locale: string,
        intent: string,
        answer: string,
        opts?: string
    ): void
    removeAnswer(
        locale: string,
        intent: string,
        answer: string,
        opts?: string
    ): void
    findAllAnswers(locale: string, intent: string): void
    addCorpora(...names: string[]): Promise<void>
    train(): Promise<void>
    process(
        locale: string,
        utterance: string,
        srcContext?: object,
        settings?: object
    ): Promise<NLPProcess>
    load(srcFilename: string): Promise<boolean>
    save(srcFilename: string, minified?: boolean): Promise<void>
}

export interface DockStart {
    get: (name: string) => NLPManager
}
