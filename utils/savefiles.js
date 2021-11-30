const fs = require('fs')  
const axios = require('axios')
const path = require('path')

let saveFiles = {}

saveFiles.downloadImage = async (inputs) => {  
  const url = inputs.tempRecords
  const location = path.join('./public/images/', String(inputs.filename))
  const writer = fs.createWriteStream(location)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve(true))
    writer.on('error', reject(false))
  })
}

module.exports = saveFiles