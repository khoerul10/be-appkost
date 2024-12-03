const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Rekomendasi = sequelize.define(
    'Rekomendasi',
    {
      id_rekomendasi: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        defaultValue: () => uuidv4(), // Untuk menghasilkan UUID secara otomatis
      },
      kost_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'kost', // Nama tabel kost
          key: 'kost_id',
        },
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'user', // Nama tabel user
          key: 'user_id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Mencatat waktu pembuatan entri
      },
    },
    {
      tableName: 'rekomendasi',
      timestamps: false, // Tidak menggunakan timestamps otomatis (createdAt, updatedAt)
    }
  );

  Rekomendasi.associate = (models) => {
    Rekomendasi.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Rekomendasi.belongsTo(models.Kost, { foreignKey: 'kost_id', as: 'kost' });
  };

  return Rekomendasi;
};
