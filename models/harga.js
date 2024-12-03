module.exports = (sequelize, DataTypes) => {
    const Harga = sequelize.define(
      'Harga',
      {
        harga_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        range_harga: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        min_harga: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        max_harga: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bobot: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'harga',
        timestamps: false,
      }
    );
  
    Harga.associate = (models) => {
      Harga.hasMany(models.Kost, { foreignKey: 'harga_id', sourceKey: 'harga_id' });
    };
  
    return Harga;
  };
  