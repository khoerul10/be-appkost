const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Jarak = sequelize.define(
      'Jarak',
      {
        id_jarak: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false,
          defaultValue: () => uuidv4(),
        },
        jarak: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        satuan: {
          type: DataTypes.ENUM('meter', 'kilometer'),
          allowNull: true,
        },
        bobot: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'jarak', // Nama tabel di database
        timestamps: false, // Tidak ada kolom createdAt dan updatedAt
      }
    );
  
    Jarak.associate = (models) => {
      Jarak.hasMany(models.Kost, { foreignKey: 'jarak_id', sourceKey: 'id_jarak' });
    };
  
    return Jarak;
  };
  