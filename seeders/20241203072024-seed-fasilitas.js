'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fasilitas', [
      {
        id_fasilitas: 1,
        fasilitas: JSON.stringify(['Kasur', 'Lemari', 'Air', 'Meja', 'Kursi', 'TV', 'AC']), // Convert array to JSON string
        bobot: '1',
      },
      {
        id_fasilitas: 2,
        fasilitas: JSON.stringify(['kasur', 'lemari', 'Air', 'meja', 'ac']), // Convert array to JSON string
        bobot: '2',
      },
      {
        id_fasilitas: 3,
        fasilitas: JSON.stringify(['kasur', 'lemari', 'kipas angin', 'Air', 'meja']), // Convert array to JSON string
        bobot: '3',
      },
      {
        id_fasilitas: 4,
        fasilitas: JSON.stringify([ 'kasur', 'lemari', 'kipas angin']), // Convert array to JSON string
        bobot: '4',
      },
      {
        id_fasilitas: 5,
        fasilitas: JSON.stringify([ 'kasur', 'lemari']), // Convert array to JSON string
        bobot: '5',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fasilitas', null, {});
  },
};
