const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
        min: 6,
        max: 255,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    accounts:[
        {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: 'account'
            
        }
    ]
},
    { timestamps: true}
);



module.exports = mongoose.model('customers', userSchema)