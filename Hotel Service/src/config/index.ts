import dotenv from 'dotenv';
type Serveconfig ={
    PORT:number
    REDIS_PORT?: number,
    REDIS_HOST?: string,
    ROOM_CRON: string,
}

type DBConfig = {
    DB_HOST: string,
    DB_USER: string,
    DB_PASSWORD: string,
    DB_NAME: string
}

function loadenv(){
    dotenv.config();
    console.log("Env variables loaded")
}

loadenv();

export const serverconfig:Serveconfig={
    PORT:Number(process.env.PORT)||3001,
    REDIS_PORT:Number(process.env.REDIS_PORT)||6379,
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    ROOM_CRON: process.env.ROOM_CRON || '0 0 * * *'
}

export const dbConfig: DBConfig = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_NAME: process.env.DB_NAME || 'test_db'
};