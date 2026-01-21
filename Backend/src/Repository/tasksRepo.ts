

import { WhereOptions } from "sequelize";
import db from "../models/index";
import CURDRepo from './CurdRepo';

class TasksRepo extends CURDRepo<typeof db.Tasks> {
  constructor() {
    super(db.Tasks);
  }

   async getAllUser(user_id:number): Promise< []>  {
      try {
        const user = await db.Tasks.findAll(
          {where: { user_id } as WhereOptions<any>,}
        );
  
        return user;
      } catch (error) {
        console.log("Something went wrong in Repo level (getAll) ");
        throw error;
      }
    }
  
    async getByUserid(id: number, user_id:number): Promise<[]> {
      try {
        const user = await db.Tasks.findOne({
          where: { id, user_id } as WhereOptions<any>,
        });
  
        return user;
      } catch (error) {
        console.log("Something went wrong in Repo level (getAll) ");
        throw error;
      }
    }


}

const tasksRepo = new TasksRepo();

export default tasksRepo;