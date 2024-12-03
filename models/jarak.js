module.exports = (sequelize, DataTypes) => {
    const Jarak = sequelize.define(
      'Jarak',
      {
        id_jarak: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        jarak: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
  