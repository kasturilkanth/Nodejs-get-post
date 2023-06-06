const express=require('express');
const app=express()
app.use(express.json())

const port=3000;

const checkValidInput=(req,res,next)=>{
    const{num1,num2}=req.body
    if(num1>upperLimit||num2>upperLimit){
        return res.status(400).send({status:"Error",message:"overflow!"})
    }
    if(num1<lowerLimit||num2>lowerLimit){
        return res.status(400).send({status:"Error",message:"underflow!"})
    }
    if(typeof num1!=="number" || typeof num2!=="number"){
        return res.status(400).send({status:"Error",message:"invallid data type"})
    }
    next()
}
app.use(checkValidInput)

const setPrecision=(num,precision)=>{
    const factor=Math.pow(10,precision)
    const result=Math.pow(num*factor)/factor
    return result
}
const upperLimit=1000000
const lowerLimit=-1000000


app.post('/add',(req,res)=>{
const {num1,num2}=req.body
res.status(200).send({
    status:"sucess",
    message:"the sum of two numbers",
    sum:setPrecision(num1+num2,2)
})
})

app.listen(port,()=>{
    console.log("server started on port",port)
})