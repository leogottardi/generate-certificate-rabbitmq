import { ConsumeMessage } from 'amqplib'
import { IRabbitMQ } from './interfaces'

export async function consumeQueues(rabbitMQ: IRabbitMQ) {
    await rabbitMQ.start()
    await rabbitMQ.assertExchange('api_exchange', 'direct')
    await rabbitMQ.assertQueue('generate_certificate')
    await rabbitMQ.bindQueue('generate_certificate', 'api_exchange', 'generate_certificate')
    await rabbitMQ.assertQueue('confirm_certificate')
    await rabbitMQ.bindQueue('confirm_certificate', 'api_exchange', 'confirm_certificate')
    await rabbitMQ.consumeQueue('confirm_certificate', (message: ConsumeMessage) => {
        if (!message) return
        const parsedMessage = JSON.parse(message.content.toString())
        console.log("Certificate generated!")
        console.log({ certificate: parsedMessage })
        rabbitMQ.channel?.ack(message)
    })
}