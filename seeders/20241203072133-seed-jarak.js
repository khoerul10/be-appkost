'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jarak', [
      {
        id_jarak: 1,
        jarak: 250,  // Jarak dalam satuan kilometer (misalnya)
        bobot: '5',  // Bobot 1 (terendah)
      },
      {
        id_jarak: 2,
        jarak: 500,
        bobot: '4',  // Bobot 2
      },
      {
        id_jarak: 3,
        jarak: 1,
        bobot: '3',  // Bobot 3 (sedang)
      },
      {
        id_jarak: 4,
        jarak: 3,
        bobot: '2',  // Bobot 4
      },
      {
        id_jarak: 5,
        jarak: 5,
        bobot: '1',  // Bobot 5 (tertinggi)
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jarak', null, {});
  },
};
