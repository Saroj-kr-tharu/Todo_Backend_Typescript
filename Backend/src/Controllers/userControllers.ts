import { Request, Response } from 'express';
import userService from "../Services/userService";

class AuthController { 
   

    async signup(req: Request ,res: Response) {
        try {
            
            
            const {email,username, password} = req?.body;
            const response = await userService.createService({email,username, password});
            
            return res.status(200).json({
                message: "Successfully to Signup",
                success: true,
                data: response,
                err: {},
            });

        } catch (error:any) {
        console.log("Something went wrong in controller level (add role)");
        return res.status(401).json({
            message: "Unable to regiester",
            success: false,
            data: {},
            err: error.message || error,
        });
    }
    }
    
    async signin(req: Request,res: Response) {
        try {
            
            
            const {email, password} = req?.body;
            const response = await userService.loginService({email, password});
            
            return res.status(201).json({
                message: "Successfully to login",
                success: true,
                data: response,
                err: {},
            });

        } catch (error:any) {
        console.log("Something went wrong in controller level (add role)");
        return res.status(401).json({
            message: "Unable to check Role",
            success: false,
            data: {},
            err: error.message || error,
        });
        }
    }

     async veriyToken(req:Request,res:Response) {
        try {
            
            
            const token:any  = req?.headers['x-access-token'] ;
            const response = await userService.verifyToken(token);
            
            return res.status(200).json({
                message: "Successfully to login",
                success: true,
                data: response,
                err: {},
            });

        } catch (error:any) {
            console.log("something went wrong in controller  level  (verifytoken) ")
            return res.status(500).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


}


const authController = new AuthController();

export default  authController;