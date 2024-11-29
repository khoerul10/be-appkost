const KostModel = require('./kost');
const FasilitasModel = require('./fasilitas');
const JarakModel = require('./jarak');
const KeamananModel = require('./keamanan');
const HargaModel = require('./harga');
const LuaskamarModel = require('./luaskamar');
const RekomendasiModel = require('./rekomendasi');
const UserModel = require('./user');

// Definisikan relasi setelah semua model diimpor
KostModel.belongsTo(HargaModel, { foreignKey: 'harga_id', as: 'hargaDetail' });
KostModel.belongsTo(FasilitasModel, { foreignKey: 'fasilitas_id', as: 'fasilitasDetail' });
KostModel.belongsTo(LuaskamarModel, { foreignKey: 'luas_id', as: 'luaskamarDetail' });
KostModel.belongsTo(JarakModel, { foreignKey: 'jarak_id', as: 'jarakDetail' });
KostModel.belongsTo(KeamananModel, { foreignKey: 'keamanan_id', as: 'keamananDetail' });

HargaModel.hasMany(KostModel, { foreignKey: 'harga_id', sourceKey: 'harga_id' });
FasilitasModel.hasMany(KostModel, { foreignKey: 'fasilitas_id', sourceKey: 'id_fasilitas' });
LuaskamarModel.hasMany(KostModel, { foreignKey: 'luas_id', sourceKey: 'id_luas' });
JarakModel.hasMany(KostModel, { foreignKey: 'jarak_id', sourceKey: 'id_jarak' });
KeamananModel.hasMany(KostModel, { foreignKey: 'keamanan_id', sourceKey: 'id_keamanan' });

RekomendasiModel.belongsTo(KostModel, { foreignKey: 'kost_id', as: 'kost' });
RekomendasiModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

UserModel.hasMany(RekomendasiModel, { foreignKey: 'user_id', sourceKey: 'user_id' });
KostModel.hasMany(RekomendasiModel, { foreignKey: 'kost_id', sourceKey: 'kost_id' });

module.exports = {
  KostModel,
  FasilitasModel,
  JarakModel,
  KeamananModel,
  HargaModel,
};
