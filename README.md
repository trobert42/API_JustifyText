# API_JustifyText
A simple REST API on Node.JS that justifies a text passed as a parameter.

# Project Description
This app implements a REST API using Node.JS/Typescript, it consists of two endpoints: /api/token and /api/justify.
To obtain access to the /api/justify endpoint, a token must be acquired by sending a POST request to /api/token with a JSON body containing the email address. Once authenticated, sending a POST request with text content to /api/justify will return the justified text. The justification algorithm is custom-built.

A daily rate limit of 80,000 words is enforced, and the length of each justified text line is limited to 80 characters.

The app covers aspects such as authentication, algorithm implementation, string manipulation, Node.js environment setup (including routes, controllers, and middlewares), database management, error handling, deployment of the API, and Dockerization.


![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)


## Structure
Here's the structure of the project directory
```
API_JustifyText/
├── docker-compose.yml
├── .env
├── README.md
└── api/
    ├── src/
    │   ├── controllers/
    │   ├── db/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── utils/
    │   ├── server.ts
    │   └── folder
    ├── tests/
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    └── jest.config.js
```


# Usage 
To use this API, you can follow these steps:
1. Obtain a unique Token by sending a POST request to http://[]/api/token with a JSON body:
   ``` bash
   curl --request POST \
    --url 'http://localhost:3000/api/token/?email=test%40example.com' \
    --header 'Content-Type: application/json' \
    --data '{
	    "email":"test@example.com"
           }'
   ```
2. Make a POST request with the header "Authorization" and with the value "Bearer ${YOUR_TOKEN}" to http://[]/api/justify with a plain/text body as Content-Type for getting your text justified. Here's the cURL command:
   ``` bash
   curl -X POST \
   -H "Authorization: Bearer YOUR_TOKEN" \
   -H "Content-Type: text/plain" \
   -d "THE TEXT YOU WANT TO BE JUSTIFIED" \
   http://localhost:3000/api/justify
   ```


# How run locally the project 
## Prerequisites
You'll need to have docker-compose, please refer to the [official Docker documentation](https://docs.docker.com/compose/install/) to install it.

## Installation
If you want to run locally this project on your computer, you can clone this repo:
1. Clone the repo
  ``` bash
  git clone https://github.com/trobert42/API_JustifyText.git
  cd API_JustifyText/
  ```
2. Set the environment .env
  ``` bash
  POSTGRES_USER='your_username'
  POSTGRES_PASSWORD='your_pwd'
  JWT_SECRET='your_secret'
  ```
3. Build and run the containers with docker-compose
  ``` bash
  docker-compose up -d --build
  ```

## How to run tests with Jest
I did not yet implemented all the tests. Stay tuned, i'll work on it. 


# 💬 Notes
## Difficulties
What was really challenging is for me to apply the right methods to handle the whole project. My formation is based on self-taught so every informations come from forums, videos, articles on the internet. Sometimes, some informations are pretty old or deprecated because tools are updated meanwhile or there are just better ones today. 

I used Nest.Js before and this framework is a bit different for the structure project process compared to this one. But i manage to find some logic on how i should structure the folders/files and keep it simple. 

One thing that was unknown to me is the sql environment, i used Prisma as a ORM before and for this little assessment, with no use of ORM tools, i had to look for sql commands to access values in my db. Thankfully, i just needed to retrieve data or updates some of it, so nothing really complex.

I find the justifyText algorithm very vague. Even on these online websites that justifies your text, it does not give everytime the same output. At first i had a problem with the ‘\n’ character because i didn't manage it. I realized a working algorithm but i know there are better and optimal ways to do it.

An another thing i don’t have are the good practices for the commits and git managing. I dont know when i have to commit or how i should write my message so its professional.

## What was easier
For the final project of my web school common core, I focused on authentication and API integration, so this task didn't feel new to me. I was already familiar with the Backend/Docker environment, and there's a lot of documentation available.

I enjoyed working on this small project, although I did spend a bit too much time on the text justification algorithm. Nonetheless, I was able to learn more about AWS and unit testing, which are new technologies to me. 


# Documentation
If you want to follow how i managed the project throrough the days, here's my [notion's page](https://sparkly-printer-981.notion.site/c7d86bf786e44e2cb2723107e43e54aa?v=9a7da235870644f7a6031717d4ab01ee&pvs=4) about this project

### Nodejs project init 
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
- https://www.youtube.com/watch?v=H9M02of22z4

### Online justify text tools
- https://onlinetexttools.com/justify-text
- https://texttools.org/justify-text
- https://texttools.io/justify-text

### Nodejs Middleware
- https://expressjs.com/en/guide/using-middleware.html
- https://www.turing.com/kb/building-middleware-for-node-js

### Others tools (pool, node-cron)
- https://stackoverflow.com/questions/23271250/how-do-i-check-content-type-using-expressjs
- https://medium.com/@amr258144/connection-pooling-in-node-js-ea4421c72dc
- https://node-postgres.com/apis/pool
- https://www.npmjs.com/package//node-cron

### Deployment with AWS
- https://docs.aws.amazon.com/fr_fr/iot/latest/developerguide/creating-a-virtual-thing.html
- https://medium.com/@rajani103/deploying-nodejs-app-on-aws-ec2-instance-step-by-step-1b00f807cdce

### Jest for Test
- https://jestjs.io/docs/getting-started
- https://dev.to/nathan_sheryak/how-to-test-a-typescript-express-api-with-jest-for-dummies-like-me-4epd
