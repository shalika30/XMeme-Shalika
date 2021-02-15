const mongoose = require("mongoose");
const toJson=require("meanie-mongoose-to-json");

//Creating A New Schema
const userSchema= new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },
    url: {
        type: String,
        required : true,
    },
    caption : {
        type: String,
        required : true,
    }

});

userSchema.plugin(toJson);

module.exports = mongoose.model("User", userSchema);