const User = require("../model/User");

const getUser = async(userId) =>{
    return new Promise(async(resolve, reject) => {
        try{
            const user = await User.findOne({ userId });
            if(user){
                resolve({
                    status:"successful",
                    data: user
                });
            }else{
                reject({
                    message: 'user does not exist'
                });
            }
        }catch(err){
            reject({
                message: err
            });
        }
    });
};

const createUser = async(data)=>{
    return new Promise(async(resolve, reject) => {
        try{
            let { username, phoneNumber } = data
            const userExists = await User.findOne({phoneNumber});
            if (!userExists){
                const result = await User.create({
                   username,
                   phoneNumber
                });
                resolve({
                    status: "Successful",
                    message: 'User created successfully',
                    data: result
                })
            }else{
                resolve({
                    message: "Users already exist"
                })
            }
        }catch(err){
            reject(err)
        }
    });
};

const updateUser = (data) =>{
    return new Promise(async(resolve, reject) => {
     
        try{
            const updateuser = await User.findById({_id: data.owner});
            updateuser.accounts.push(data)
           
            resolve({
                status: "successful",
                data: updateuser
            })
        }catch(err){
            reject(err)
        }
    });
};

module.exports = { createUser, getUser, updateUser }
