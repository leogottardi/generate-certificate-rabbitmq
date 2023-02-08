import { IRabbitMQ } from '../queues/interfaces';

interface IGenerateCertificateIn {
    name: string
    email: string
    cpf: string
}

const GENERATE_CERTIFICATE_QUEUE = 'generate_certificate'

export class GenerateCertificateService {
    constructor(private readonly rabbitMQ: IRabbitMQ) { }

    async handler({ name, email, cpf }: IGenerateCertificateIn): Promise<void> {
        await this.rabbitMQ.sendToQueue(
            GENERATE_CERTIFICATE_QUEUE,
            JSON.stringify({ name, email, cpf })
        )
    }
}