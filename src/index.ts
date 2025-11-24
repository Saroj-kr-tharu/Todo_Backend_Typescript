

import bodyParser from 'body-parser'
import express from 'express'
import serverConfig from './config/server-config'

import appRoutes from './Routes/index'

const serverSetupAndStart = async () => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

   
    
    
    app.use("/api", appRoutes)

    app.listen(serverConfig.PORT, async () => {
        console.log(` Backend server start at ${serverConfig.PORT}`)
    })

}

serverSetupAndStart()