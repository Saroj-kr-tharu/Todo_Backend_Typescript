import { DataTypes, Model, Sequelize } from 'sequelize';

type statusType = 'pending' | 'inProgress' | 'completed';
type priorityType = 'low' | 'medium' | 'high';

interface TasksAttributes {
  id: number;
  user_id?: number;
  title?: string;
  description?: string;
  status?: statusType;
  priority?: priorityType;
  due_date?: string;
}

class Tasks extends Model<TasksAttributes> implements TasksAttributes {
  public id!: number;
  public user_id!: number;
  public title!: string;
  public description!: string;
  public status!: statusType;
  public priority!: priorityType;
  public due_date!: string;

  static associate(models: any) {
    // define association here
     Tasks.belongsTo(models.Users, {
        foreignKey: 'user_id', 
        as: 'user'
      })
      

  }
}

export default (sequelize: Sequelize) => {
  Tasks.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
            model: 'Users', 
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT' 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'inProgress', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Tasks',
    tableName: 'tasks',
    timestamps: true,
  });
  return Tasks;
};