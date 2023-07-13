import mongoose from "mongoose";
import config from 'config';
import Logger from'./logger'

async function connect(){
const dbUri=config.get<string>('dbUri')

try{
    await mongoose
    .connect(dbUri)
    Logger.info("Connect to db");

}
catch(error){
    Logger.error("Could not connect to db");
    process.exit(1);

}
    
}

export default connect