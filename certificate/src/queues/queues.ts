import { IRabbitMQ } from './interfaces'

export async function startQueues(rabbitMQ: IRabbitMQ) {
    await rabbitMQ.start()
    await rabbitMQ.assertExchange('api_exchange', 'direct')
    await rabbitMQ.assertQueue('generate_certificate')
    await rabbitMQ.bindQueue('generate_certificate', 'api_exchange', 'generate_certificate')
    await rabbitMQ.assertQueue('confirm_certificate')
    await rabbitMQ.bindQueue('confirm_certificate', 'api_exchange', 'confirm_certificate')
}