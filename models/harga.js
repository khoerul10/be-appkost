const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Harga = sequelize.define(
      'Harga',
      {
        harga_id: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false,
          defaultValue: () => uuidv4(),
        },
        range_harga: {
          type: DataTypes.INTEGER,
          allowNull: true,
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
  