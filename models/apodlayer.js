const connection = require("../database/db")
const Apod = require('./schema/apod')

let createConnection = async() => {
    await connection.connect()
}

let model = {}

model.findScript = async(inputs) => {
    let dt = String(inputs.date)
    let response = await Apod.findOne({date: dt}).exec();
    
    if (response) {
        return {
            status: true,
            data: response
        }
    } else {
        return {
            status: false,
            data: null
        }
    }
}

model.insertScript = async(inputs) => {
    let dt = new Date(inputs.date)
    inputs.date = dt.getTime()

    return new Promise((resolve, reject) => {
        const records = new Apod(inputs)
        records.save(function(err){
            if(err){
                reject(err)
            }
            resolve(true)
        })
    })
    
}

createConnection();
module.exports = model
