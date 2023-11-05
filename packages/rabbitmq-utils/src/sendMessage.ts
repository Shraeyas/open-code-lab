import amqp from "amqplib";
export const sendMessage = async (message: any): Promise<void> => {
    try {
        console.log(process.env.RABBITMQ_URL)
        const connection = await amqp.connect(process.env.RABBITMQ_URL!);

        const channel = await connection.createChannel();
        const queueName: string = "test_queue"//process.env.RABBITMQ_QUEUE_NAME!;
        console.log(process.env.RABBITMQ_QUEUE_NAME!)
        await channel.assertQueue(queueName, { durable: false });
        const messageString: string = JSON.stringify(message);
        channel.sendToQueue(queueName, Buffer.from(messageString));
        console.log('Message sent:', messageString);
        await channel.close();
        await connection.close();
    }
    catch (error) {
        console.error('Error:', error);
    }
}