var express = require('express');
var router = express.Router();
const service = require("../services/apod");
const _ = require('lodash')

/* GET home page. */
router.get('/', async(req, res, next) => {
  
  try {
    //index page with today date
    if(!req.query.date){
      const {status, data} = await service.find({date:false})

      //checking data is already present in databse or not
      if(status){
        console.log("data from database")
        res.render('index', {
          data
        })
      }else{
        //if not then fetch from api
        console.log("data from api")
        let records = await service.requestAPI({
          isDate: false
        })

        if (records) {
           //saves api data into database
          const tempRecords = _.cloneDeep(records);
          let imageName = String(records.date)+'.jpg'
          
          if(records.media_type == 'image'){
            await service.downloadImages({
              filename: imageName,
              url:tempRecords
            })
            records.url = '/images/'+String(records.date)+'.jpg'
          }
          
          await service.requestFetch(records)

          res.render('index', {
            data: tempRecords
          })
          
        }

      }

    } else{
      //getting query date from url
      let queryDate = req.query.date
      
      //validate date query
      if(service.validatorDate(queryDate)){
        const {status, data} = await service.find({date:queryDate})

        //checking data is already present in databse or not
        if(status){
          console.log("data from database")
          res.render('index', {
            data
          })
        }else{
          
          //if not then fetch from api
          let records = await service.requestAPI({
            isDate: true,
            getDate: queryDate
          })

          //render html with api data
          if (records) {
             //saves api data into database
          const tempRecords = _.cloneDeep(records);
          let imageName = String(records.date)+'.jpg'

          if(records.media_type == 'image'){
            await service.downloadImages({
              filename: imageName,
              url:tempRecords
            })
            records.url = '/images/'+String(records.date)+'.jpg'
          }

          await service.requestFetch(records)

          res.render('index', {
            data: tempRecords
          })

          }

        }

      } else{
         
        let error = new Error('Date is not valid')
        error.status = 400
        throw error

      }

}
  
} catch (err) { next(err) }});

/* Call When no data in database*/
router.post('/fetch', async (req, res, next) => {
  
  try {
        let data = await service.fetch(req.body);
      
        if (data) {
            res.status(200)
            res.json({ message: "Successfully Saved Into Database"})
        }
  }
  catch (err) {next(err) }
});

module.exports = router;

