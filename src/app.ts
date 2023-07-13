
import express from 'express';
import config from 'config';
import  Logger  from './Utils/logger';
import connect from './Utils/connect';
import router from './routes';

const app=express();
const port=config.get<number>("port")
app.use(express.json())


app.listen(port,async()=>{
    Logger.info(`server is running http//localhost:${port}`);
   await connect() 
   router(app);
})
