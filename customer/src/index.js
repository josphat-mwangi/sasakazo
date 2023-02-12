const express = require("express");
const cors = require("cors");
require("dotenv").config({path:__dirname+'/.env'});
const bodyparser = require("body-parser");
const db = require("./config/database");
const userRoute = require('./routes/index')


const main = async() =>{
    const app = express();
    app.use(cors());
    app.use(bodyparser.json());
    app.use(express.json());
    app.use(bodyparser.urlencoded({ extended:true }));
    app.use(express.urlencoded({ extended:false }));

    app.get("/", (req, res)=>{
        res.send("hello world")
    })

    app.use("/customer", userRoute)
   
    console.log("port", process.env.PORT)
    app.listen(process.env.PORT, async () => {
        console.log(`Server Running ${process.env.PORT}`), await db.connect();
    });
};

main();






