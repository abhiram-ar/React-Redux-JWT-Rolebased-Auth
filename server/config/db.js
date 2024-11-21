const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log(`Database connected: ${connect.connection.host} ${connect.connection.name}`);
    }catch(error){
        console.log(`error while connecting to database`);
        console.log(error);
    }
}

//default export
module.exports = connectDB