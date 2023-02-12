const dbConn  = require('../config/db');

const getAllPayments = (req, res) =>{
    dbConn.query("SELECT * FROM paymentlist", (err, data, fields)=>{   if(err) console.log(err)
        res.status(200).json({
            status: "success",
            data: data
        })
    })
};

module.exports = { getAllPayments };