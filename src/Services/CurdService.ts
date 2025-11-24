interface Repository{ 
    create(data: any): Promise<any>;
    delete(id: number): Promise<any>;
    getAll(): Promise<any>;
    getByid(id: number): Promise<any>;
    update(id: number, data:any): Promise<any>;
}

class curdService {
    private repo: Repository ;
    
  constructor(repo: Repository) {
    this.repo = repo;
  }

  async createService(data: any): Promise<any>  {
    try {
      const res = await this.repo.create(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (createService)");
      throw error;
    }
  }

  async deleteService(id:number) : Promise<any>  {
    try {
      const result = await this.repo.delete(id);
      return result;
    } catch (error) {
      console.error(
        "Something went wrong in service layer (deleteService):",
        error
      );
    }
  }

  async getAllService(): Promise<any>  {
    try {
      const res = await this.repo.getAll();
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getAllService)");
      throw error;
    }
  }
  
  async getByidService(id: number ): Promise<any> {
    try {
      const res = await this.repo.getByid(id);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getAllService)");
      throw error;
    }
  }

 
  async updateService(id: number , data:any): Promise<any> {
    try {
      const res = await this.repo.update(id, data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (delete service)");
      throw error;
    }
  }


}

export default curdService;