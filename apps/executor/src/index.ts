import _ from "lodash";
import { execute } from "./execute";
import { connect } from "@code-ide/rabbitmq-utils";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
const consumeMessages = async () => {
  try {
    let connection = await connect();
    const channel = await connection.createChannel();
    const queue = "test_queue"; // process.env.RABBITMQ_QUEUE_NAME!;
    await channel.assertQueue(queue, { durable: false });
    console.log("Waiting for messages...");
    channel.consume(queue, async (message) => {
      const messageContent = _.get(message, "content", null);
      if (message && messageContent) {
        const messageString = messageContent.toString();
        let receivedMessage = JSON.parse(messageString);
        console.log({ receivedMessage });
        const { executionId } = receivedMessage;
        const executionResultDB = await prismaClient.executionResult.create({
          data: {
            execution_id: executionId,
            status: "Queued",
          },
        });

        try {
          const executionResult = await execute(
            receivedMessage.src,
            receivedMessage.lang,
            receivedMessage.timeout || "5",
            receivedMessage.input || "",
            receivedMessage.expectedOutput || "",
          );
          let { message, info, time, memory, output, verdict } =
            executionResult;
          console.log({ message, info, time, memory, output, verdict });
          await prismaClient.executionResult.update({
            where: {
              id: executionResultDB.id,
            },
            data: {
              output: output,
              verdict: message,
              status: "Done",
            },
          });
        } catch (e) {
          console.log("Error in execution: ", e);
        }
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};
consumeMessages().catch(console.error);
