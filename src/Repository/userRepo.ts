

import db from "../models/index";
import CURDRepo from './CurdRepo';

class UsersRepo extends CURDRepo<typeof db.Users> {
  constructor() {
    super(db.Users);
  }

  async getByEmail (email:string):Promise<any> { 
        try {
            const res = await db.Users.findOne({
                where: {email},
            });
            return res; 
        } catch (error) {
            console.log("something went wrong in  user Repo curd level (getByEmail) ")
            throw error;
        }
    }


}

const usersRepo = new UsersRepo();

export default usersRepo;