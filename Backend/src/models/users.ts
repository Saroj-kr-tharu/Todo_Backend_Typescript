import { DataTypes, Model, Sequelize } from 'sequelize';

import bcrypt from 'bcrypt';
import serverConfig from '../config/server-config';

interface UsersAttributes {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UsersCreationAttributes extends Omit<UsersAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
      Users.hasMany(models.Tasks, {
        foreignKey: 'user_id',
        as: 'tasks'
      });

  }
}

export default (sequelize: Sequelize) => {
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique:true
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
   
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: true,
  });

   Users.beforeCreate((user) => {
    const hash = bcrypt.hashSync(user.password, serverConfig.salt);
    user.password = hash;
  });
  
  return Users;
};

export { Users, UsersAttributes, UsersCreationAttributes };
