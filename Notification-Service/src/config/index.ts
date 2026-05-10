import dotenv from 'dotenv';
type Serveconfig ={
    PORT:number,
    REDIS_PORT?: number,
    REDIS_HOST?: string,
    MAIL_USER?: string,
    MAIL_PASS?: string
}

function loadenv(){
    dotenv.config();
    console.log("Env variables loaded")
}

loadenv();

export const serverconfig:Serveconfig={
    PORT:Number(process.env.PORT)||3001,
    REDIS_PORT: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS
}