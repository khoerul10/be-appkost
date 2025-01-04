'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kost', {
      kost_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      nama_kost: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      pemilik: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      no_telp: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      maps: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      jenis_kost: {
        type: Sequelize.ENUM('pria', 'wanita', 'campur'),
        allowNull: true,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('tersedia', 'tidak tersedia'),
        allowNull: true,
      },
      harga_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'harga',
          key: 'harga_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      kebersihan_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'kebersihan',
          key: 'id_kebersihan',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      luas_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'luaskamar',
          key: 'id_luas',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      fasilitas_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'fasilitas',
          key: 'id_fasilitas',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      jarak_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'jarak',
          key: 'id_jarak',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      keamanan_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'keamanan',
          key: 'id_keamanan',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      photos: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      thumb_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kost');
  },
};
