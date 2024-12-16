'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jarak', [
      {
        id_jarak: 1,
        jarak: 250,  // Jarak dalam satuan kilometer (misalnya)
        satuan: 'meter',
        bobot: '5',  // Bobot 1 (terendah)
      },
      {
        id_jarak: 2,
        jarak: 500,
        satuan: 'meter',
        bobot: '4',  // Bobot 2
      },
      {
        id_jarak: 3,
        jarak: 1,
        satuan: 'kilometer',
        bobot: '3',  // Bobot 3 (sedang)
      },
      {
        id_jarak: 4,
        jarak: 3,
        satuan: 'kilometer',
        bobot: '2',  // Bobot 4
      },
      {
        id_jarak: 5,
        jarak: 5,
        satuan: 'kilometer',
        bobot: '1',  // Bobot 5 (tertinggi)
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jarak', null, {});
  },
};
