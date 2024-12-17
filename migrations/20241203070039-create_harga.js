'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
    await queryInterface.createTable('harga', {
      harga_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      range_harga: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
