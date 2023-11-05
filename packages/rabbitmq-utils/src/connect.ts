import amqp from "amqplib";
export const connect = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL!);
  return connection;
};
