'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ownerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      propertyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalUnits: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      filledUnits: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vacantUnits: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      occupancyRate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      lastMaintenanceDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    await queryInterface.createTable('FinancialRecords', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Properties',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      income: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      expenses: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      netProfit: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FinancialRecords');
    await queryInterface.dropTable('Properties');
  }
};
