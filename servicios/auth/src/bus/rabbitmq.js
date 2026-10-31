const amqp = require('amqplib');

let connection, channel;

async function conectar() {
  try {
    const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    connection = await amqp.connect(rabbitUrl);
    channel = await connection.createChannel();
    await channel.assertExchange('eventos_auth', 'topic', { durable: true });
  } catch (error) {
    console.log('RabbitMQ en modo demostración local');
  }
}

async function publicarEvento(routingKey, data) {
  if (!channel) await conectar();
  if (channel) {
    channel.publish('eventos_auth', routingKey, Buffer.from(JSON.stringify(data)));
    console.log(`[RabbitMQ] Evento publicado: ${routingKey}`);
  }
}

module.exports = { publicarEvento };
