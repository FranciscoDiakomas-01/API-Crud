import express from 'express'
import bodyParser from 'body-parser'
const server = express()


const port = process.env.PORT || 8000
import { Routes } from './routes/userRoute.js'

server.use(bodyParser.urlencoded({extended:true}))
server.use(express.json())
server.use("/user",Routes)

server.listen(port,(err)=>{

    if(err){
        throw new Error(err)
    }

    console.log("Server running")

})