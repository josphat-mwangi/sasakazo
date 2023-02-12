const mongoose = require("mongoose");

exports.connect = async () => {
    // connect to DB
    mongoose.set('strictQuery', false);
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    const mongodbUri = process.env.DBURI;
    await mongoose.connect(mongodbUri, mongoOptions);
    const conn = mongoose.connection;
    conn.on('error', console.error.bind(console, 'connection error:'));
};