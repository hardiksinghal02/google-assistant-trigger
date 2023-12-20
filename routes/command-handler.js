const express = require("express")

const router = express.Router()
const assistant = require("../configs/google-assistant-config")
const assistantController = require("../controllers/google-assistant-controller")

router.post("/trigger", async (req, res, next) => {

    var response = new Map()
    
    console.log(req.body.command)

    if(req.body.command == undefined) {
        res.send("ERROR")
    }

    const command = req.body.command

    // console.log(assistant)

    await assistantController(command, res)

    // res.send(response)
})

module.exports = router