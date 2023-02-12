const express = require('express');
const cors = require("cors");
require("dotenv").config({path:__dirname+'/.env'});
const bodyparser = require("body-parser");
const payments = require("./routes/index");


const main = () =>{
    const app = express();
    app.use(cors());
    app.use(bodyparser.json());
    app.use(express.json());
    app.use(bodyparser.urlencoded({ extended:true }));
    app.use(express.urlencoded({ extended:false }));

    app.use("/pay", payments);


    app.listen(process.env.PORT, ()=>{
        console.log(`server running ${process.env.PORT}`)
    });

};

main();