

import bcrypt from 'bcrypt';
import serverConfig from "../config/server-config";

class Bcrypt_helper_class {
  async checkPasswordService(plainpasword:string, hash:string):Promise<boolean> {
    try {
        const match = bcrypt.compareSync(plainpasword, hash);
        if (!match) throw "Password is not match";
        return match;

    } catch (error) {
      console.log(
        "Something went wrong in bcrypt helper layer (checkPasswordService)"
      );
      throw error;
    }
  }

  async generatePasswordService(password:string):Promise<string> {
    try {
      const hash = bcrypt.hashSync(password, serverConfig.salt);
      return hash;
    } catch (error) {
      console.log(
        "Something went wrong in bcrypt helper layer (generatePasswordService)"
      );
      throw error;
    }
  }
}

const bcryptHelper = new Bcrypt_helper_class();

export default  bcryptHelper;
