const KostModel = require('./kost');
const FasilitasModel = require('./fasilitas');
const JarakModel = require('./jarak');
const KeamananModel = require('./keamanan');
const HargaModel = require('./harga');

// Definisikan relasi setelah semua model diimpor
KostModel.belongsTo(FasilitasModel, { foreignKey: 'fasilitas_id', as: 'fasilitasDetail' });
KostModel.belongsTo(JarakModel, { foreignKey: 'jarak_id', as: 'jarakDetail' });
KostModel.belongsTo(KeamananModel, { foreignKey: 'keamanan_id', as: 'keamananDetail' });
KostModel.belongsTo(HargaModel, { foreignKey: 'harga_id', as: 'hargaDetail' });

FasilitasModel.hasMany(KostModel, { foreignKey: 'fasilitas_id', sourceKey: 'id_fasilitas' });
JarakModel.hasMany(KostModel, { foreignKey: 'jarak_id', sourceKey: 'id_jarak' });
KeamananModel.hasMany(KostModel, { foreignKey: 'keamanan_id', sourceKey: 'id_keamanan' });
HargaModel.hasMany(KostModel, { foreignKey: 'harga_id', sourceKey: 'harga_id' });

module.exports = {
  KostModel,
  FasilitasModel,
  JarakModel,
  KeamananModel,
  HargaModel,
};
