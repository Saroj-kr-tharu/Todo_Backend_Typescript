import { CreateOptions, DestroyOptions, Model, ModelStatic, UpdateOptions, WhereOptions } from 'sequelize';

class CURDRepo <T extends Model<any, any > > {
 private model:ModelStatic<T> ;
    
  constructor(model: ModelStatic<T> ) {
    this.model = model;
  }

  async create(data:any, options?: CreateOptions): Promise<T> {
    try {
      const res = await this.model.create(data, options);
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }

  async update(id: number, data: any, options?: Omit<UpdateOptions, 'where'>): Promise<[affectedCount: number]> {
    try {
      const res = await this.model.update(data, {
        where: {
          id: id as any,
        },
        ...options,
      });

      return [res[0]];
    } catch (error) {
      console.log("Something went wrong in Repo level (update)");
      throw error;
    }
  }

  async delete(id:number, options?:  Omit<DestroyOptions, 'where'>): Promise<number> {
    try {
      const res = await this.model.destroy({
        where: {
          id: id ,
        } as WhereOptions<any>,
        ...options
      });

      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (delete) ");
      throw error;
    }
  }

  async getAll(): Promise<T []>  {
    try {
      const user = await this.model.findAll();

      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (getAll) ");
      throw error;
    }
  }

  async getByid(id: number): Promise<T | null> {
    try {
      const user = await this.model.findOne({
        where: { id } as WhereOptions<any>,
      });

      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (getAll) ");
      throw error;
    }
  }

}


export default CURDRepo;