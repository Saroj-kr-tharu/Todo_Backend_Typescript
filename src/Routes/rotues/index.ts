
import express, { Request, Response } from 'express';
import taskController from '../../Controllers/taskController';
import authController from '../../Controllers/userControllers';
import userMiddlewares from '../../Middlewares/userMiddlewares';
'../../Controllers/taskController';

import taskMiddlewares from '../../Middlewares/taskMiddlewares';

const router = express.Router();



router.get("/ping", (req:Request, res:Response)    => {
  return res.json({ message: "Auth Server is good to GO" });
});

// auth 
router.post( "/auth/signup",userMiddlewares.signupAndLogin,  authController.signup );
router.post( "/auth/login",userMiddlewares.signupAndLogin, authController.signin );
router.get( "/auth/veriyToken",userMiddlewares.verifyToken,   authController.veriyToken );

// task 
router.post( "/task/add",     taskMiddlewares.create, taskController.create );
router.delete( "/task/delete",taskMiddlewares.delete, taskController.delete );
router.patch(  "/task/update",taskMiddlewares.update,taskController.update );
router.get(  "/tasks",        taskMiddlewares.getAll,taskController.getAll );
router.get(  "/task/getByID", taskMiddlewares.getByid,taskController.getById );



export default router;