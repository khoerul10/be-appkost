'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jarak', {
      id_jarak: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      jarak: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      satuan: {
        type: Sequelize.ENUM('meter', 'kilometer'),
        allowNull: true,
      },
      bobot: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jarak');
  },
};
