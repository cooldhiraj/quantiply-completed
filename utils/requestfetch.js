const axios = require('axios')
const url = 'http://localhost:3000/fetch'

let requestFetch = {}

//api to call post request to save api data into database
requestFetch.save= async (inputs) => {
    try {
        if(inputs){
            const response = await axios.post(url, inputs);
            return response.data
        }else{
            let error = new Error('No data in post body to save into database')
            error.status = 500
            throw error
        }
    } catch (err) {
        let error = new Error(err)
        error.status = 500
        throw error
    }     
}

module.exports = requestFetch