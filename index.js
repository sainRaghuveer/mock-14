const express = require('express');
const cors=require('cors');
const { connection } = require('./configs/db');
const { router } = require('./routes/user.account.route');
require('dotenv').config();

const app=express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Masai Bank Database Backend ...!!!");
});

app.use("/user", router);


app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected toMasai Bank Database");
    }catch(err){
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
});