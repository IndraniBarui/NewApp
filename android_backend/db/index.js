import mongoose from "mongoose";

const uri = 'mongodb://127.0.0.1:27017/my_db';

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Db is connected!!")
}).catch(err =>{
    console.log('could not connect :', err.message)
})