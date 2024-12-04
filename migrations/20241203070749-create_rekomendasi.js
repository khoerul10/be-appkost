'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rekomendasi', {
      id_rekomendasi: {
        type: Sequelize.STRING(255),
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4, // Nilai default UUID
      },
      kost_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'kost', // Referensi ke tabel kost
          key: 'kost_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Hapus rekomendasi jika kost terkait dihapus
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', // Referensi ke tabel user
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Hapus rekomendasi jika user terkait dihapus
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Waktu pembuatan
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rekomendasi'); // Rollback tabel rekomendasi
  },
};
