import { randomUUID } from 'crypto'

interface IGenerateCertificateIn {
    name: string
    email: string
    cpf: string
}

interface IGenerateCertificateOut {
    name: string
    email: string
    cpf: string
    certificate: string
    created_at: Date
}

export class GenerateCertificateService {
    handler(params: IGenerateCertificateIn): IGenerateCertificateOut {
        return {
            ...params,
            certificate: randomUUID(),
            created_at: new Date()
        }
    }
}