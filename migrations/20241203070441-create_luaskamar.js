'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('luaskamar', {
      id_luas: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      panjang: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lebar: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      luas: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bobot: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('luaskamar');
  },
};
