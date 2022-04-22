const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
let RedisStore = require("connect-redis")(sessions)

var app = express()
var httpr = http.createServer(app)
httpr.listen(3002, () => {console.log('its okey')})

const Redis = require("ioredis")
let redisClient = new Redis()

app.use(sessions({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
}))

app.get('/test', (request, response)=>{
    request.session.userid = 'token2'
    response.send({success: true, token: request.session})
})

app.get('/get', (request, response) =>{
    console.log(request.session)
    response.send({token: request.session})
})