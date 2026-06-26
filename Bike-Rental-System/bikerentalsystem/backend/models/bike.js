const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bikeSchema= new Schema({
    name:String,
    color:String,
    image:String,
    pricePerDay:Number,  
    isBooked: { type: Boolean, default: false } 
},{timestamps:true,collection:'bikes'});

module.exports=mongoose.model('Bike',bikeSchema);

