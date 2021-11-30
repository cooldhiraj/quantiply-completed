const axios = require('axios')
require('dotenv').config()

const url = process.env.API_URL+process.env.API_KEY

let requestAPI = {}

requestAPI.api= async (inputs) => {
    try {

        if(!inputs.isDate){
            const response = await axios.get(url);
            return response.data
        }
        const response = await axios.get(url+'&date='+inputs.getDate);

        return response.data
    } catch (err) {
        let error = new Error(err)
        error.status = 400
        throw error
    }     
}

module.exports = requestAPI