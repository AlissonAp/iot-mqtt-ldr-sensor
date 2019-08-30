const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    ambiente : Number,
    processId : String,
    ligado : Boolean
},
{
    timestamps : true
})

module.exports = mongoose.model('Room' , RoomSchema);