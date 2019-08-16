const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema(
    {
        name:{
            type:String
        }
,
        
        email:{
            type:String
        },
        
        password:{
            type:String
        },
        
        message:{
            type:String
        },
        imglink:{
            type:String
        }
    },
    );
 module.exports = mongoose.model('user',user);
