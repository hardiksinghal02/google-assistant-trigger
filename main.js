const http = require("http");

const express = require("express");
const bodyParser = require("body-parser")

const app = express();


const commandRouter = require("./routes/command-handler")
app.use(bodyParser.urlencoded({extended: false}))


app.use(commandRouter)

const server = http.createServer(app)

server.listen(3000)
