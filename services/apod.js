const dbLayer = require("../models/apodlayer")
const requestAPI = require("../utils/requestapi")
const requestFetch = require("../utils/requestfetch")
const saveFiles = require('../utils/savefiles')

let apod = {}

apod.find = async(inputs) => {

    if(!inputs.date){
        const d = new Date()
        let year = d.getFullYear()
        let month = d.getMonth()+1
        let date = d.getDate()

        //converting default date into timestamp
        let _tempDate = year+'-'+month+'-'+date
        const dt = new Date(_tempDate)
        inputs.date = dt.getTime()
        
        let data = await dbLayer.findScript(inputs)
        return data;
    }
    
    //converting requested api date into timestamp
    const dt = new Date(inputs.date)
    inputs.date = dt.getTime()
    let data = await dbLayer.findScript(inputs)
    return data;
     
}

apod.requestAPI = async(query) => {

    try{
        let data = await requestAPI.api(query)
        return data;
    }catch(err){
        let error = new Error(err)
        error.status = 500
        throw error
    }
    
}

apod.requestFetch = async(inputs) => {

    try{
        let data = await requestFetch.save(inputs)
        return data;
    }catch(err){
        let error = new Error(err)
        error.status = 500
        throw error
    }
    
}

apod.fetch = async(inputs) => {
    let data = await dbLayer.insertScript(inputs);
    return data;
}

apod.validatorDate = (queryDate) => {
    const d = new Date(queryDate)
    
    if(!isNaN(d.getTime())){
        return true
    }

    return false
}

apod.downloadImages = async (inputs) => {
try{
    return await saveFiles.downloadImage(inputs)
}catch(err){
    let error = new Error("Error in downloading images")
    error.status = 400
    throw error
}
}
module.exports = apod