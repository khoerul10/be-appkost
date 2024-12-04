'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
    await queryInterface.createTable('harga', {
      harga_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      range_harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      min_harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bobot: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

   async down(queryInterface, Sequelize){
    await queryInterface.dropTable('harga');
  },
};
