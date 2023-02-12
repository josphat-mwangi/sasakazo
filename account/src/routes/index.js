const express = require('express');
const router = express.Router();
const { getAccount, createAccont, transfer } = require('../controller/index');
const request             = require("request");




router.post('/', async(req, res)=>{
    let number = req.body.phoneNumber;
    let accountType = req.body.accountType;

    request(
        {
          uri: 'http://127.0.0.1:4000/customer/user',
          method: "POST",
          json: { number }
        },
        async(err, resp, body) => {
          if (err) {
            console.log(err);
          }
          const owner =body.data._id
          let data = await createAccont(number,accountType,owner);

          request.put("http://127.0.0.1:4000/customer/update",
            {
                json: data.data
            },
            async(err, resp, body) =>{
                if (err){
                    console.log(err)
                }
                res.json(body)

            }
          )
        }
    );

});

router.get('/all', async(req, res)=>{
    await getAccount(req.body.phoneNumber)
});


router.post('/transfer', async(req, res)=>{
    await transfer()
})
    


module.exports = router;
