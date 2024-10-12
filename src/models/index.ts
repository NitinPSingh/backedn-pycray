import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();


const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT as any || 'postgres',
  }
);

class Property extends Model {}
Property.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalUnits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  filledUnits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vacantUnits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  occupancyRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lastMaintenanceDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Property',
});

class FinancialRecord extends Model {}
FinancialRecord.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  income: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expenses: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  netProfit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'FinancialRecord',
});

Property.hasMany(FinancialRecord, {
    foreignKey: 'propertyId',
  });
  FinancialRecord.belongsTo(Property, {
    foreignKey: 'propertyId',
  });
  

export { sequelize, Property, FinancialRecord };