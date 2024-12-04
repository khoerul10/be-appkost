'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('luaskamar', [
      {
        id_luas: 1,
        panjang: 5,
        lebar: 6,
        luas: 30,  // 5 * 4
        bobot: '5',  // Bobot untuk kamar ukuran kecil
      },
      {
        id_luas: 2,
        panjang: 5,
        lebar: 5,
        luas: 25,  // 6 * 5
        bobot: '4',  // Bobot untuk kamar ukuran sedang
      },
      {
        id_luas: 3,
        panjang: 4,
        lebar: 5,
        luas: 20,  // 7 * 6
        bobot: '3',  // Bobot untuk kamar ukuran lebih besar
      },
      {
        id_luas: 4,
        panjang: 3,
        lebar: 5,
        luas: 15,  // 8 * 6
        bobot: '2',  // Bobot untuk kamar ukuran besar
      },
      {
        id_luas: 5,
        panjang: 3,
        lebar: 3,
        luas: 9,  // 10 * 8
        bobot: '1',  // Bobot untuk kamar sangat besar
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('luaskamar', null, {});
  },
};
