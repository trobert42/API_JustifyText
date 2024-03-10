# API_JustifyText
A simple REST API on Node.JS that justifies a text passed as a parameter.

# Project Description
This app implements a REST API using Node.JS/Typescript, it consists of two endpoints: /api/token and /api/justify.
To obtain access to the /api/justify endpoint, a token must be acquired by sending a POST request to /api/token with a JSON body containing the email address. Once authenticated, sending a POST request with text content to /api/justify will return the justified text. The justification algorithm is custom-built.

A daily rate limit of 80,000 words is enforced, and the length of each justified text line is limited to 80 characters.

The app covers aspects such as authentication, algorithm implementation, string manipulation, Node.js environment setup (including routes, controllers, and middlewares), database management, error handling, and Dockerization.

# Structure
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
    --url 'http://localhost:3000/api/token/?email=toto%40tata.com' \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/8.6.1' \
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

# How to run the test
I did not yet implemented all the tests. Stay tuned, i'll work on it. 

# Tools
<img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white">
<img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-316192.svg?logo=postgresql&logoColor=white">
NodeJS | Express | PostgreSQL | JsonWebToken | Docker and docker-compose | Git | Github

# Difficulties
What was really challenging is for me to apply the right methods to handle the whole project. My formation is based on self-taught so every informations come from forums, videos, articles on the internet. Sometimes, some informations are pretty old or deprecated because tools are updated meanwhile or there are just better ones today. 

I used Nest.Js before and this framework is a bit different for structuring project process compared to this one. But i manage to find some logic on how i should structure the folders/files. 

One thing that was unknown to me is the sql environment, i used Prisma as a ORM before and for this little assessment, with no use of ORM tools, i had to look for sql commands to access values in my db. Thankfully, i just needed to retrieve data or updates some of it, so nothing really complex.

I find the justifyText algorithm very vague. Even on these online websites that justifies your text, it does not give everytime the same output. At first i had a problem with the ‘\n’ character because i didn't manage it. I realized a working algorithm but i know there are better and optimal ways to do it.

An another thing i don’t have are the good practices for the commits and git managing. I dont know when i have to commit or how i should write my message so its professional.

# What was easier
For the final project of my web school common core, I focused on authentication and API integration, so this task didn't feel unfamiliar to me. I was already familiar with the Backend/Docker environment, and there's a lot of documentation available.


# 💬
I enjoyed working on this small project, although I did spend a bit too much time on the text justification algorithm. Nonetheless, I was able to learn more about AWS and unit testing, which are new technologies to me.

# Documentation
If you want to follow how i managed the project by days, here's my notion's page about this project:
