const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        amount: {
            type: mongoose.Decimal128,
            required: true,
            default: 0.00
        },
        accountType:{
            type: String,
            enum : ['credit', 'debit'],
            default: 'credit',
            required: true
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customers',
            required: true
        }

    },
    { timestamps: true }
);
module.exports = mongoose.model('account', accountSchema);
