
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import dbConfig from './config.json';

dotenv.config()

interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    use_env_variable?: string;
}

export function getConfig(environment: string): DatabaseConfig {
    const config = (dbConfig as any)[environment];
    if (!config) {
        throw new Error(`No configuration found for environment: ${environment}`);
    }
    return config;
}

export default { 
    PORT  : process.env.PORT,
    salt: bcrypt.genSaltSync(10),
    PRIVATEJWT: process.env.PRIVATEJWT as string,
    FORTEND_URL: process.env.FORTEND_URL as string,
    
}