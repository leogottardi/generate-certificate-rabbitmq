import { Channel, connect, Connection, ConsumeMessage } from 'amqplib'

export class RabbitMQ {
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

    async bindQueue(queue: string, exchange: string) {
        if (!this.channel) throw new Error("Channel not created")
        await this.channel.bindQueue(queue, exchange, queue)
    }

    async consumeQueue(queue: string, callback: any) {
        this.channel?.consume(queue, callback)
    }
}

export async function rabbitMQ(): Promise<Channel> {
    const rabbitMQ = new RabbitMQ()
    await rabbitMQ.start()
    await rabbitMQ.assertExchange('api_exchange', 'direct')
    await rabbitMQ.assertQueue('generate_certificate')
    await rabbitMQ.bindQueue('generate_certificate', 'api_exchange')
    await rabbitMQ.assertQueue('confirm_certificate')
    await rabbitMQ.bindQueue('confirm_certificate', 'api_exchange')
    return rabbitMQ.channel as Channel
}