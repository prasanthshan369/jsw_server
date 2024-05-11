const router=require('express').Router()
const deviceRouter=require('./devices')
router.use('/device',deviceRouter)
module.exports=router