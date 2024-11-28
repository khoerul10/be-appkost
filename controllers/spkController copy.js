const { FasilitasModel, KeamananModel, HargaModel, JarakModel } = require('../models');
const KostModel = require('../models/kost');
const LuaskamarModel = require('../models/luaskamar');
const { HTTP_CODES, formatResponse } = require('../utils/responseFormatter');


const getSpkHandler = async (req, res) => {
    try {
        // const { harga_id, id_fasilitas, id_luas, id_jarak, id_keamanan } = req.query; // Mengambil parameter id dari URL
        // const bobotHarga = await HargaModel.findByPk(harga_id);
        // const bobotKeamanan = await KeamananModel.findByPk(id_keamanan);
        // const bobotFasilitas = await FasilitasModel.findByPk(id_fasilitas);
        // const bobotJarak = await FasilitasModel.findByPk(id_jarak);
        // const bobotLuas = await FasilitasModel.findByPk(id_luas);

        // if (!bobotHarga || !bobotFasilitas || !bobotLuas || !bobotJarak  || !bobotKeamanan) {
        //     return res.status(400).json({ message: 'Invalid criteria ID provided' });
        //   }

          const kostData = await KostModel.findAll({include: [
            {
              model: HargaModel,
              as: 'hargaDetail', // Alias yang ditentukan saat membuat relasi
              attributes: ['bobot'], // Kolom yang diambil dari Fasilitas
            },{
              model: FasilitasModel,
              as: 'fasilitasDetail', // Alias yang ditentukan saat membuat relasi
              attributes: ['bobot'], // Kolom yang diambil dari Fasilitas
            },{
              model: JarakModel,
              as: 'jarakDetail', // Alias yang ditentukan saat membuat relasi
              attributes: ['bobot'], // Kolom yang diambil dari Fasilitas
            },{
              model: LuaskamarModel,
              as: 'luaskamarDetail', // Alias yang ditentukan saat membuat relasi
              attributes: ['bobot'], // Kolom yang diambil dari Fasilitas
            },{ 
              model: KeamananModel,
              as: 'keamananDetail', // Alias yang ditentukan saat membuat relasi
              attributes: ['bobot'], // Kolom yang diambil dari Fasilitas
            }
          ],
          attributes: ['nama_kost'], 
          order: [['nama_kost', 'ASC']]
        });

        const hargaArray = kostData.map((kost) => kost.hargaDetail.bobot);
        const fasilitasArray = kostData.map((kost) => kost.fasilitasDetail.bobot);
        const jarakArray = kostData.map((kost) => kost.jarakDetail.bobot);
        const luasArray = kostData.map((kost) => kost.luaskamarDetail.bobot);
        const keamananArray = kostData.map((kost) => kost.keamananDetail.bobot);

        const costHarga =  Math.min(...hargaArray) 
        const benefitFasilitas = Math.max(...fasilitasArray); 
        const costJarak =  Math.min(...jarakArray);
        const benefitLuas=  Math.max(...luasArray);
        const benefitKeamanan=  Math.max(...keamananArray);

        const kostDataWithBobot = kostData.map((kost) => {
          const hargaBobot = kost.hargaDetail?.bobot || 0;
          const fasilitasBobot = kost.fasilitasDetail?.bobot || 0;
          const jarakBobot = kost.jarakDetail?.bobot || 0;
          const luaskamarBobot = kost.luaskamarDetail?.bobot || 0;
          const keamananBobot = kost.keamananDetail?.bobot || 0;

          const nilaiBobotHarga = costHarga / hargaBobot; // cost
          const nilaiBobotFasilitas = fasilitasBobot / benefitFasilitas;  // benefit
          const nilaiBobotJarak = costJarak / jarakBobot; // cost
          const nilaiBobotLuaskamar = luaskamarBobot / benefitLuas; // benefit
          const nilaiBobotKeamanan = keamananBobot / benefitKeamanan; // benefit

          const vector = [30, 25, 10, 20, 15];
          const cek = vector[0] * nilaiBobotHarga + vector[1] * nilaiBobotFasilitas + vector[2] * nilaiBobotJarak + vector[3] * nilaiBobotLuaskamar + vector[4] * nilaiBobotKeamanan;

          return {
              ...kost.toJSON(),
              cek,
              nilaiBobotHarga,
              nilaiBobotFasilitas,
              nilaiBobotJarak,
              nilaiBobotLuaskamar,
              nilaiBobotKeamanan
          };
      });

      const sortedKostDataWithBobot = kostDataWithBobot.sort((a, b) => b.cek - a.cek);


        res.status(HTTP_CODES.SUCCESS.code).json(
            formatResponse(HTTP_CODES.SUCCESS, '', sortedKostDataWithBobot)
        );
    } catch (error) {
        console.error('Error fetching jarak by id:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};

module.exports = { getSpkHandler }