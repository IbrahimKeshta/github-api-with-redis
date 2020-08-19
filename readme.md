# Github search and caching in redis

This project is using github API to search for users, repositories and issues then caching the result in Redis for two hours, and using redis as a middleware to not request the same data again.

### Tech

It uses a number of open source projects to work properly:

* [node.js] 
* [NPM]
* [Expressjs]
* [Redis]
* [babel]
* [Jest] - for testing
* [superTest] - for API testing
* [swagger] - API documentation

### Installation

It requires [Node.js] v10+ to run. and [NPM] as you package manager

After cloning project.

Install the dependencies and devDependencies and start the server.

Open your favorite Terminal and run these commands.

```sh
$ cd github-api-with-redis
$ npm install -d
$ cp .env.example .env
```
Edit .env file and add PORT, REDIS_PORT

**NOTE: github search API is limited requests for unauthorized requests if you want to use more quota you have to generate [OAuth token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) and add it to .env file with key GITHUB_TOKEN**

Now lets magic happen
```
$ npm start
```
Everything runs fine? Greate!

### Testing
To run test script 
```
$ npm run test
```

### Development

Want an API Documentation? YAY! There is a documentation using [Swagger]

- Open your browser and you can find it with URL {DOMAIN}/api-docs

**EX:** if project runs on the default port 3000 localhost:3000/api-docs

and we are done. 😄

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [NPM]: <https://www.npmjs.com/>
   [superTest]: <https://www.npmjs.com/package/supertest>
   [expressjs]: <http://expressjs.com>
   [Jest]: <https://jestjs.io/>
   [Redis]: <https://redis.io/>
   [babel]: <https://babeljs.io/>
   [swagger]: <https://swagger.io/>
