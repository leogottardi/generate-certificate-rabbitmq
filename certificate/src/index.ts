import { ConsumeMessage } from 'amqplib'
import { rabbitMQ } from './rabbitmq'
import { randomUUID } from 'crypto'
async function run() {
    const rabbitmq = await rabbitMQ()
    await rabbitmq.consume('generate_certificate', async (message: ConsumeMessage | null) => {
        if (!message) return
        const msg = JSON.parse(message.content.toString())
        const certificate = {
            certificate: randomUUID(),
            ...msg
        }
        rabbitmq.ack(message)
        rabbitmq.sendToQueue(
            'confirm_certificate',
            Buffer.from(
                JSON.stringify({
                    ...certificate
                })
            )
        )
    })
}

run()