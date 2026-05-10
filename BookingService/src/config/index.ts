import dotenv from 'dotenv';
type Serveconfig ={
    PORT:number
    REDIS_SERVER_URL: string,
    LOCK_TTL: number
    HOTEL_SERVICE_URL: string
}

function loadenv(){
    dotenv.config();
    console.log("Env variables loaded")
}

loadenv();

export const serverconfig:Serveconfig={
    PORT:Number(process.env.PORT)||3001,
    REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || 'redis://localhost:6379',
    LOCK_TTL: Number(process.env.LOCK_TTL) || 5000, // Default to 5 seconds
    HOTEL_SERVICE_URL: process.env.HOTEL_SERVICE_URL || 'http://localhost:3000/api/v1'
}
