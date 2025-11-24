import { NextFunction, Request, Response } from 'express';
 

class TaskMiddlewares { 

    create  (req:Request, res:Response, next: NextFunction) {
            if (!req.body.title || !req.body.user_id  ) {
                console.log("Something went wrong in auth middleware");
                
                return res.status(400).json({
                data: {},
                message: "Email or Password is missing  ",
                success: false,
                });
            }

            next();
        };

        delete  (req:Request, res:Response, next: NextFunction) {
            if (!req.query.id ) {
                console.log("id is missing in task middleware");
                
                return res.status(400).json({
                data: {},
                message: "id  is missing  ",
                success: false,
                });
            }

            next();
        };

        getByid  (req:Request, res:Response, next: NextFunction) {
            if (!req.query.id  || !req.query.userId) {
                console.log("id is missing in task middleware");
                
                return res.status(400).json({
                data: {},
                message: "id  is missing  ",
                success: false,
                });
            }

            next();
        };

        getAll  (req:Request, res:Response, next: NextFunction) {
            if  (!req.query.userId) {
                console.log("id is missing in task middleware");
                
                return res.status(400).json({
                data: {},
                message: "id  is missing  ",
                success: false,
                });
            }

            next();
        };


        update  (req:Request, res:Response, next: NextFunction) {
            if (!req.query.id || !req.body ) {
                console.log("id or body  is missing in task middleware");
                
                return res.status(400).json({
                data: {},
                message: "id or body is missing  ",
                success: false,
                });
            }

            next();
        };


        getAllBYUserId  (req:Request, res:Response, next: NextFunction) {
            if (!req.query.id || !req.query.userId ) {
                console.log("id or body  is missing in task middleware");
                
                return res.status(400).json({
                data: {},
                message: "id or body is missing  ",
                success: false,
                });
            }

            next();
        };
        

    

}

   

const taskMiddlewares = new TaskMiddlewares();


export default taskMiddlewares ;
