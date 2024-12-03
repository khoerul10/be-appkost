module.exports = (sequelize, DataTypes) => {
    const Fasilitas = sequelize.define(
      'Fasilitas',
      {
        id_fasilitas: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        fasilitas: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bobot: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'fasilitas',
        timestamps: false,
      }
    );
  
    Fasilitas.associate = (models) => {
      Fasilitas.hasMany(models.Kost, { foreignKey: 'fasilitas_id', sourceKey: 'id_fasilitas' });
    };
  
    return Fasilitas;
  };
  