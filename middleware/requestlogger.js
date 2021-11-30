const fs = require('fs');

let requestLogger = (req, res, next) => {

    let logMessage = "" + new Date().toDateString() + " " + req.method + " " + req.url + "\n"; 
    fs.appendFile('./logs/RequestLogger.log', logMessage , (err) => {
        if (err) return next(err);
    });
    next();

}

module.exports = requestLogger;