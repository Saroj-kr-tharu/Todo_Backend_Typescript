
import taskRepo from '../Repository/tasksRepo';
import CurdService from './CurdService';

class TasksService extends CurdService {
  constructor() {
    super(taskRepo);
  }

  async getAllTaskByUserService( user_id:number ): Promise<any> {
    try {
      const res = await taskRepo.getAllUser(user_id);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getAllTaskByUserService)");
      throw error;
    }
  }

  async getByIdTaskByUserIdService(id:number ,user_id:number ): Promise<any> {
    try {
      const res = await taskRepo.getByUserid(id, user_id);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getAllTaskByUserService)");
      throw error;
    }
  }


}

const taskService = new TasksService();

export default taskService;