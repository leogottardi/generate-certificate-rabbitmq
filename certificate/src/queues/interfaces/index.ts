import { Channel, Connection } from 'amqplib'

export interface IRabbitMQ {
    connection?: Connection
    channel?: Channel
    start(): Promise<void>
    assertExchange(exchange: string, type: string): Promise<void>
    assertQueue(queue: string): Promise<void>
    bindQueue(queue: string, exchange: string, routing_key: string): Promise<void>
    consumeQueue(queue: string, callback: any): Promise<void>
    sendToQueue(queue: string, message: string): Promise<void>
}