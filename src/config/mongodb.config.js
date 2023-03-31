const mongoose = require('mongoose')
require('dotenv').config()

exports.connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MONGODB: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}