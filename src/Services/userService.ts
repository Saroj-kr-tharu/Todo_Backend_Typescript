
import usersRepo from '../Repository/userRepo';
import CurdService from './CurdService';

import bcryptHelper from '../utlis/bcrypt_helper';
import jwt_helper from '../utlis/jwtHelps';

interface userInfo  {
  password: string, 
  email:string
}

class UsersService extends CurdService {
  constructor() {
    super(usersRepo);
  }

      async loginService(data: userInfo){
        try {
            const {password, email} = data;
            const infoUser = await usersRepo.getByEmail(email);
            const hashpassword = infoUser?.dataValues?.password;

            const isValid = await bcryptHelper.checkPasswordService(password, hashpassword);
            
            if(!isValid)  
                throw new Error("credentials invalid");

            
            const token = await jwt_helper.createToken({...data, id: infoUser?.dataValues?.id});
            const response = {
                email: data.email,
                id: infoUser?.dataValues?.id,
                role: infoUser?.dataValues?.role,
                username: infoUser?.dataValues?.username,
                jwt: token,
            };
            
            return response;
            

        } catch (error:any ) {
            console.log("something went wrong in service curd level  (create) ")
            throw error;
        }
    }

    async verifyToken(data:string){
        try {
           
            const res = await jwt_helper.verifyToken(data);

             if (!res)
                throw Error(`Token is invalid or Expired` );
            
            const infoUser = await usersRepo.getByEmail(res.data.email);
            const response = {
                email: res.data.email,
                role: infoUser?.dataValues?.role,
                username: infoUser?.dataValues?.username,
                jwt: data,
            }
            
            return response;
            

        } catch (error:any) {
            console.log("something went wrong in service curd level  (verifyToken) ")
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }

            throw new error;
        }
    }


}

const usersService = new UsersService();

export default usersService;