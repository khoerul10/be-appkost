const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Keamanan = sequelize.define(
      'Keamanan',
      {
        id_keamanan: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false,
          defaultValue: () => uuidv4(),
        },
        keamanan: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bobot: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'keamanan', // Nama tabel di database
        timestamps: false,     // Tidak ada kolom createdAt dan updatedAt
      }
    );
  
    Keamanan.associate = (models) => {
      Keamanan.hasMany(models.Kost, { foreignKey: 'keamanan_id', sourceKey: 'id_keamanan' });
    };
  
    return Keamanan;
  };
  