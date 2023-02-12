const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser } = require('../controller/index');
const User = require("../model/User");



router.post('/', async(req, res)=>{
    let data = req.body;
    console.log("datas", data)
    let result = await createUser(data);
    res.json(result)
});

router.post('/user', async(req, res)=>{
    let _phoneNumber = req.body.phoneNumber;
    let user = User.find({_phoneNumber})

    if(user){
        data=await getUser(user._id);
        res.json(data)
        
    }else{
        res.json({
            message: "User does not exist"
        })
    }
    
});

router.put('/update', async(req, res)=>{
    console.log("ndio nafika")
    let data = req.body;
    console.log("update data", data)
    let result = await updateUser(data);
    res.json(result)
})


module.exports = router;