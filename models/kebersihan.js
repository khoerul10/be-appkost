const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Kebersihan = sequelize.define(
      'Kebersihan',
      {
        id_kebersihan: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false,
          defaultValue: () => uuidv4(),
        },
        kebersihan: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bobot: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'kebersihan',
        timestamps: false,
      }
    );
  
    Kebersihan.associate = (models) => {
      Kebersihan.hasMany(models.Kost, { foreignKey: 'kebersihan_id', sourceKey: 'id_kebersihan' });
    };
  
    return Kebersihan;
  };
  