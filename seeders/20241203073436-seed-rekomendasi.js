'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rekomendasi', [
      {
        id_rekomendasi: 1,
        kost_id: '1',  // Replace with actual kost_id
        user_id: '1',  // Replace with actual user_id
        created_at: new Date(),
      },
      {
        id_rekomendasi: 2,
        kost_id: '3',  // Replace with actual kost_id
        user_id: '2',  // Replace with actual user_id
        created_at: new Date(),
      },
      {
        id_rekomendasi: 3,
        kost_id: '2',  // Replace with actual kost_id
        user_id: '1',  // Replace with actual user_id
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rekomendasi', null, {});
  },
};
