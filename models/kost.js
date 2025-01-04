const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Kost = sequelize.define(
    'Kost',
    {
      kost_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4(),
      },
      nama_kost: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      no_telp: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pemilik: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      maps: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      jenis_kost: {
        type: DataTypes.ENUM('pria', 'wanita', 'campur'),
        allowNull: true,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('tersedia', 'tidak tersedia'),
        allowNull: true,
      },
      photos: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      harga_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'harga', // Nama tabel harga
          key: 'harga_id',
        },
      },
      luas_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'luaskamar', // Nama tabel kost
          key: 'id_luas',
        },
      },
      fasilitas_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'fasilitas', // Nama tabel kost
          key: 'id_fasilitas',
        },
      },
      jarak_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'jarak', // Nama tabel kost
          key: 'id_jarak',
        },
      },
      keamanan_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'keamanan', // Nama tabel kost
          key: 'id_keamanan',
        },
      },
      thumb_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'kost',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Kost.associate = (models) => {
    Kost.belongsTo(models.Harga, { foreignKey: 'harga_id', as: 'hargaDetail' });
    Kost.belongsTo(models.Fasilitas, { foreignKey: 'fasilitas_id', as: 'fasilitasDetail' });
    Kost.belongsTo(models.LuasKamar, { foreignKey: 'luas_id', as: 'luaskamarDetail' });
    Kost.belongsTo(models.Jarak, { foreignKey: 'jarak_id', as: 'jarakDetail' });
    Kost.belongsTo(models.Keamanan, { foreignKey: 'keamanan_id', as: 'keamananDetail' });
    Kost.hasMany(models.Rekomendasi, { foreignKey: 'kost_id', sourceKey: 'kost_id' });
  };

  return Kost;
};
