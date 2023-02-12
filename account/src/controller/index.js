const Account = require('../model/account');

const createAccont = async (phoneNumber, accountType, owner) => {
    return new Promise(async(resolve,reject)=>{
        try{
            const accountExists = await Account.findOne({phoneNumber});
            if (!accountExists){
                const result = await Account.create({
                    phoneNumber:phoneNumber,
                    accountType: accountType,
                    owner:owner
                });
                resolve({
                    status: "Successful",
                    message: 'Account created successfully',
                    data: result
                })
            }else{
                resolve({
                    message: "Account already exist"
                })
            }
    
        } catch (err) {
            reject({
                status: true,
                message: `Unable to create Account. Please try again. \n Error: ${err}`
            })
        }
    });
};

const getAccount = async(phoneNumber) =>{
    return new Promise(async(resolve, reject) => {
        try{
            const account = await Account.findOne({phoneNumber});
            if(account){
                resolve({
                    status:"successful",
                    data: account
                });
            }else{
                reject({
                    message: 'Account does not exist'
                });
            }
           
        }catch(err){
            reject({
                message: `Unable to create Account. Please try again. \n Error: ${err}`
            });
        }
    });
};

module.exports = { createAccont, getAccount };
