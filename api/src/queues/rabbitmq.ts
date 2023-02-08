import { Channel, connect, Connection } from 'amqplib'
import { IRabbitMQ } from './interfaces'

export class RabbitMQ implements IRabbitMQ {
    connection?: Connection
    channel?: Channel

    async start() {
        this.connection = await connect('amqp://localhost')
        this.channel = await this.connection.createChannel()
    }

    async assertExchange(exchange: string, type: string) {
        if (!this.channel) throw new Error("Channel not created")
        await this.channel.assertExchange(exchange, type)
    }

    async assertQueue(queue: string) {
        if (!this.channel) throw new Error("Channel not created")
        await this.channel.assertQueue(queue)
    }

    async bindQueue(queue: string, exchange: string, routing_key: string) {
        if (!this.channel) throw new Error("Channel not created")
        await this.channel.bindQueue(queue, exchange, routing_key)
    }

    async consumeQueue(queue: string, callback: any) {
        if (!this.channel) throw new Error("Channel not created")
        this.channel.consume(queue, callback)
    }

    async sendToQueue(queue: string, message: string) {
        if (!this.channel) throw new Error("Channel not created")
        this.channel.sendToQueue(queue, Buffer.from(message))
    }
}

export async function rabbitMQ(): Promise<any> {
    const rabbitMQ = new RabbitMQ()
    await rabbitMQ.start()
    await rabbitMQ.assertExchange('api_exchange', 'direct')
    await rabbitMQ.assertQueue('generate_certificate')
    await rabbitMQ.bindQueue('generate_certificate', 'api_exchange', 'generate_certificate')
    await rabbitMQ.assertQueue('confirm_certificate')
    await rabbitMQ.bindQueue('confirm_certificate', 'api_exchange', 'confirm_certificate')
    await rabbitMQ.channel?.consume('confirm_certificate', (message) => {
        if (!message) return
        console.log(JSON.parse(message.content.toString()))
        rabbitMQ.channel?.ack(message)
    })
    return rabbitMQ.channel
}