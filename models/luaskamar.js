const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const LuasKamar = sequelize.define(
      'LuasKamar',
      {
        id_luas: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false,
          defaultValue: () => uuidv4(),
        },
        panjang: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        lebar: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        luas: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        bobot: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: 'luaskamar',
        timestamps: false, // Tidak ada kolom createdAt dan updatedAt
      }
    );
  
    LuasKamar.associate = (models) => {
      LuasKamar.hasMany(models.Kost, { foreignKey: 'luas_id', sourceKey: 'id_luas' });
    };
  
    return LuasKamar;
  };
  