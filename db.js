//DataBase Connection

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/User",{
    useNewUrlParser:true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
    console.log(`Database Connection successful`);
}).catch((e)=>{
    console.log(`No connection`);
})


