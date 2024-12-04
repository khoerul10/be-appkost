'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('harga', [
      {
        harga_id: 1,
        range_harga: 1000000,
        min_harga: 1000000,
        max_harga: 2000000,
        bobot: 1,  // Bobot 1 (terendah)
      },
      {
        harga_id: 2,
        range_harga: 1000000,
        min_harga: 700000,
        max_harga: 999999,
        bobot: 2,  // Bobot 2
      },
      {
        harga_id: 3,
        range_harga: 700000,
        min_harga: 500000,
        max_harga: 699999,
        bobot: 3,  // Bobot 3 (sedang)
      },
      {
        harga_id: 4,
        range_harga: 4,
        min_harga: 400000,
        max_harga: 499999,
        bobot: 4,  // Bobot 4
      },
      {
        harga_id: 5,
        range_harga: 5,
        min_harga: 0,
        max_harga: 399999,
        bobot: 5,  // Bobot 5 (tertinggi)
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('harga', null, {});
  },
};
