import jwt, { SignOptions } from 'jsonwebtoken';
import serverConfig from "../config/server-config";


interface dataInfo  {
  password:string, email:string, id:number
}

class JWT {
  async createToken(data: dataInfo, time = '20m'): Promise<string> {
    try {
     
      
      const token = jwt.sign(
        { data }, 
        serverConfig.PRIVATEJWT as string, 
        {
          expiresIn: time,
        } as SignOptions
      );

      return token;
    } catch (error: any) {
      console.log("Something went wrong in service layer (creating the token)");
      throw error;
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
     
    
      const response = jwt.verify(token, serverConfig.PRIVATEJWT as string);
      if (!response) throw { error: "Invalid Token" };

      return response;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        console.log("Token has expired");
        throw { error: "TokenExpiredError", message: "Token has expired" };
      } else {
        console.log("Something went wrong in service layer (verify token)");
        throw error;
      }
    }
  }
}

const jwt_helper = new JWT();

export default jwt_helper ;

