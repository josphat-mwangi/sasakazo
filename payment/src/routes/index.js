const express             = require("express");
const get_access_token    = require("../utils/index");
const moment              = require("moment");
const passwordBase64      = require("../utils/base64");
const request             = require("request");
const router              = express.Router();
const dbConn  = require('../config/db');
const { getAllPayments } = require("../controllers/index");





router.get("/get_access_token", get_access_token, (req, res) => {
  res.status(200).json({ access_token: req.access_token });
});


router.post("/send_stk_push", get_access_token, (req, res) => {
  let endpoint_url = process.env.LipaNaMpesaUrl;
  let auth = "Bearer " + req.access_token;
  let shortCode = process.env.shortCode;
  let timeStamp = moment().format("YYYYMMDDHHmmss");
  let Passkey = process.env.passKey;
  let password = passwordBase64(shortCode, Passkey, timeStamp);
  
  request(
    {
      uri: endpoint_url,
      method: "POST",
      headers: {
        Authorization: auth,
      },

      json: {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: req.body.amount,
        PartyA: req.body.phoneNumber, 
        PartyB: shortCode,
        PhoneNumber: req.body.phoneNumber,
        CallBackURL: "https://fe26-41-90-49-51.ngrok.io/pay/callbackurl",
        AccountReference: "SASA KAZI TEST ",
        TransactionDesc: "THIS IS TEST PLEASE"
      }
        
        
    },
    (err, resp, body) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(body);
    }
  );
});

router.post("/callbackurl", async (req, res) => {
  console.log("_________________MPESAWEBHOOK_________________");
  
  
  let checkoutCode = req.body.Body.stkCallback.ResultCode;
  console.log("checkcode", checkoutCode)
  if (checkoutCode === 0) {
    let metadata = req.body.Body.stkCallback.CallbackMetadata.Item;

    function mapMetadata(metadata) {
      return metadata.reduce((result, entry) => {
        result[entry.Name] = entry.Value
        return result
      },{} );
    }
  
    const mappedResult = mapMetadata(metadata);
    console.log("data to save", mappedResult)
    const { Amount, TransactionDate, MpesaReceiptNumber, PhoneNumber } = mappedResult;

    let dataTosave ={
      amount: mappedResult.Amount,
      phoneNumber: mappedResult.PhoneNumber,
      mpesaReceiptNumber: mappedResult.MpesaReceiptNumber,
      transactionDate: mappedResult.TransactionDate
    }

  
    dbConn.query(
      `INSERT INTO paymentlist SET ?`, dataTosave, (err, result) =>{
        if(err){
          res.json({
            status: "error",
            error: err
          })
        }else{
          res.json({
            status: "successfull",
            message: "Payment done successfully"
          })
        }
      }
    )
    
  }else{
    console.log(req.body.Body.stkCallback.ResultDesc)
  }
  
 
});

router.get('/allpayments', getAllPayments)


module.exports = router;
