import { Request, Response } from 'express';
import taskService from "../Services/taskService";


interface taskInfo  {
 user_id:number,
 title:string,
 description:string,
 priority:string,  
 due_date:string
}

class TaskController { 
   

    async create(req: Request ,res: Response) {
        try {
            
            
            const data:taskInfo = req?.body;
            const response = await taskService.createService(data);
            
            return res.status(200).json({
                message: "Successfully to created",
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
    
    async delete(req: Request,res: Response) {
        try {
            
            
            const {id} = req?.query;
            const response = await taskService.deleteService(Number(id));
            
            return res.status(201).json({
                message: "Successfully delete",
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

    async update(req:Request,res:Response) {
        try {
            
            const data = req?.body;
            const {id} = req?.query;

            const response = await taskService.updateService(Number(id) , data);
            
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

    async getAll(req:Request,res:Response) {
        try {
            
           
            const data = req?.query.userId; 
            const response = await taskService.getAllTaskByUserService(Number(data));
            
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

    async getById(req:Request,res:Response) {
        try {
            
           
            const {id, userId} = req?.query;
            const response = await taskService.getByIdTaskByUserIdService(Number(id),Number(userId));
            
            return res.status(200).json({
                message: "Successfully to getById",
                success: true,
                data: response,
                err: {},
            });

        } catch (error:any) {
            console.log("something went wrong in controller  level  (getById) ")
            return res.status(500).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


}


const taskController = new TaskController();

export default  taskController;