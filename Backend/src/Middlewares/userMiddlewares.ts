import { NextFunction, Request, Response } from 'express';

class UserMiddleware {

   signupAndLogin  (req:Request, res:Response, next: NextFunction) {
      if (!req.body.email || !req.body.password  ) {
        console.log("Something went wrong in auth middleware");
        
        return res.status(400).json({
          data: {},
          message: "Email or Password is missing  ",
          success: false,
        });
      }

      next();
    };
    
   

    verifyToken  (req:Request, res:Response, next: NextFunction)  {
        const token = req?.headers['x-access-token'];
        if (!token ) {
            console.log("token is missing ");
            
            return res.status(401).json({
            data: {},
            message: "Email or Password is missing  ",
            success: false,
            });
        }

      next();
    };

}





const userMiddlewares = new  UserMiddleware()

export default userMiddlewares; 
