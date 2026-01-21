

import bodyParser from 'body-parser';
import express from 'express';
import serverConfig from './config/server-config';

import appRoutes from './Routes/index';
const cors = require("cors");


const serverSetupAndStart = async () => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

   app.use(
    cors({
        origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        const allowedOrigins = [serverConfig.FORTEND_URL];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
        },
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
    })
    );
    
    
    app.use("/api", appRoutes)

    app.listen(serverConfig.PORT, async () => {
        console.log(` Backend server start at ${serverConfig.PORT}`)
    })

}

serverSetupAndStart()