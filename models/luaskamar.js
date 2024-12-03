module.exports = (sequelize, DataTypes) => {
    const LuasKamar = sequelize.define(
      'LuasKamar',
      {
        id_luas: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
  