const mongoose = require("mongoose")
require('dotenv').config()
const url = 'mongodb+srv://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@test.fqnyu.mongodb.net/quantiply?retryWrites=true&w=majority'

let connection = {}
connection.connect = async() => {
    try {
     await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (err) {
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    }
}

module.exports = connection
