const mongoose = require("mongoose")
const Schema = mongoose.Schema

let schema = {
    "copyright": {
        type: String,
    },
    "date": {
        type: String,
    },
    "explanation": {
        type: String,
    },
    "hdurl": {
        type: String,
    },
    "media_type": {
        type: String,
    },
    "service_version": {
        type: String,
    },
    "title": {
        type: String,
    },
    "url": {
        type: String,
    }
}

let apodSchema = new Schema(schema, { collection: "apod", timestamps: true })
const Apod = mongoose.model("Apod", apodSchema)

module.exports = Apod
