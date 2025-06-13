const mongoose = require('mongoose')

const TokenAgentSchema = new mongoose.Schema({
    refreshToken:{
        type:String,
        required:true
    },
    ip:{
        type:String,
        required: true
    },
    userAgent:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        default:true
    },
    agent:{
        type:mongoose.Schema.ObjectId,
        ref:'Agent',
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Token' , TokenAgentSchema)