# Online Code Execution

View this in action: [opencodelab.in](http://opencodelab.in/)

### Local development setup with docker:
&nbsp; &nbsp; - Copy .env.example to .env\
&nbsp; &nbsp; - Install docker desktop on your machine\
&nbsp; &nbsp; - Run the following:\
&nbsp; &nbsp; - ```docker compose up -d```

&nbsp; &nbsp; The above commands should start a PostgreSQL, pgAdmin and RabbitMQ instance inside docker.

&nbsp; &nbsp; To start the development server, run the following commands:\
&nbsp; &nbsp; - ```yarn install```\
&nbsp; &nbsp; - ```yarn dev```


## What's inside?

This turborepo includes the following apps:

- `web`: Full stack web application built using Next JS
- `executor`: Online judge server which accepts code execution requests from a RabbitMQ and run them inside an isolated environment using Docker
