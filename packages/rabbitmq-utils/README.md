# RabbitMQ Utils

- `sendMessage` contains a function to connect to the RabbitMQ server and enqueue a message in the messaging queue

## Usage

```ts
import { sendMessage } from "@elitecode/rabbit-utils";

await sendMessage({ src, lang, timeout, input, expectedOutput, executionId });
```

The arguments are as defined below:

- `src`: Source code
- `lang`: Execution language
- `timeout`: Timeout for running the code
- `input`: input to be given through stdin
- `expectedOutput`: Output expected from the program
- `executionId`: Execution ID obtained by adding the execution details to MongoDB

## Development

You can run `yarn dx` to spin up a RabbitMQ instance if you have docker running on your machine.
