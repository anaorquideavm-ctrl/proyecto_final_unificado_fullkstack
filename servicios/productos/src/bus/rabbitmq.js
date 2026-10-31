const amqp = require('amqplib');

async function escucharEventos() {
  try {
    const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertExchange('eventos_auth', 'topic', { durable: true });
    const q = await channel.assertQueue('auth_productos_queue', { exclusive: false });
    await channel.bindQueue(q.queue, 'eventos_auth', 'usuario.creado');

    channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        const evento = JSON.stringify(JSON.parse(msg.content.toString()));
        console.log(`[RabbitMQ Consumer] Evento 'usuario.creado' procesado en Productos:`, evento);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log('RabbitMQ Consumer a la espera de conexión...');
  }
}

module.exports = { escucharEventos };
