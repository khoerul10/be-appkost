'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kebersihan', [
      {
        id_kebersihan: 1,
        kebersihan: 'Dibersihkan setiap hari oleh petugas.',
        bobot: '1',
      },
      {
        id_kebersihan: 2,
        kebersihan: 'Dibersihkan setiap dua hari sekali.',
        bobot: '2',
      },
      {
        id_kebersihan: 3,
        kebersihan: 'Dibersihkan seminggu sekali.',
        bobot: '3',
      },
      {
        id_kebersihan: 4,
        kebersihan: 'Dibersihkan jika diminta penghuni.',
        bobot: '4',
      },
      {
        id_kebersihan: 5,
        kebersihan: 'Tidak ada petugas kebersihan, penghuni membersihkan sendiri.',
        bobot: '5',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kebersihan', null, {});
  },
};
