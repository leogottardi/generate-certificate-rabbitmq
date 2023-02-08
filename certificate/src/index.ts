import { ConsumeMessage } from 'amqplib'
import { generateCertificateService } from './infra/containers'
import { RabbitMQ } from './queues/rabbitmq'
import { startQueues } from './queues/queues'

async function run() {
    const rabbitmq = new RabbitMQ()
    await startQueues(rabbitmq)
    await rabbitmq.consumeQueue('generate_certificate', async (message: ConsumeMessage | null) => {
        if (!message) return
        const msg = JSON.parse(message.content.toString())
        const certificate = generateCertificateService.handler(msg)
        rabbitmq.channel?.ack(message)
        rabbitmq.sendToQueue(
            'confirm_certificate',
            JSON.stringify(certificate)
        )
    })
}

run()