const express=require('express')
require('dotenv').config()
const app=express()
const cors=require('cors')
require('./config')
app.use(express.json())
app.use(cors())
const router=require('./routes')
app.use('/',router)

app.get('/',(req,res)=>{
    res.send('its working')
})
 app.listen(process.env.PORT,()=>{
    console.log('server is up and running on port : ',process.env.PORT);
 })