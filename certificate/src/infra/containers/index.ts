import { IRabbitMQ } from '../../queues/interfaces'
import { consumeQueues } from '../../queues/queues'
import { RabbitMQ } from '../../queues/rabbitmq'
import { GenerateCertificateService } from '../../services/generate-certificate'

const rabbitMQ = new RabbitMQ() as IRabbitMQ
consumeQueues(rabbitMQ)
const generateCertificateService = new GenerateCertificateService(rabbitMQ)
export { generateCertificateService }