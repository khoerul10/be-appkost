'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('keamanan', [
      {
        id_keamanan: 1,
        keamanan: 'Keamanan 24 Jam',
        bobot: '5',  // Bobot tertinggi, menggambarkan tingkat keamanan terbaik
      },
      {
        id_keamanan: 2,
        keamanan: 'Keamanan dengan CCTV',
        bobot: '4',  // Bobot tinggi, tingkat keamanan cukup baik
      },
      {
        id_keamanan: 3,
        keamanan: 'Keamanan dengan Sistem Kunci Ganda',
        bobot: '3',  // Bobot sedang, sistem keamanan standar
      },
      {
        id_keamanan: 4,
        keamanan: 'Keamanan dengan Pagar Pembatas',
        bobot: '2',  // Bobot rendah, tingkat keamanan dasar
      },
      {
        id_keamanan: 5,
        keamanan: 'Keamanan Minimal',
        bobot: '1',  // Bobot terendah, tingkat keamanan minim
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('keamanan', null, {});
  },
};
