const { Op } = require('sequelize');
const { HTTP_CODES, formatResponse } = require('../utils/responseFormatter');
const db = require('../models');

const getSpkHandler = async (req, res) => {
    try {
        // Ambil bobot dari request body
        const { harga, fasilitas, luas, jarak, keamanan } = req.query; // Mengambil parameter id dari URL

        // Fetch data kost beserta relasinya
        const kostData = await db.Kost.findAll({
            include: [
                {
                    model: db.Harga,
                    as: 'hargaDetail',
                    attributes: ['bobot'],
                },
                {
                    model: db.Fasilitas,
                    as: 'fasilitasDetail',
                    attributes: ['bobot'],
                },
                {
                    model: db.Jarak,
                    as: 'jarakDetail',
                    attributes: ['bobot'],
                },
                {
                    model: db.LuasKamar,
                    as: 'luaskamarDetail',
                    attributes: ['bobot'],
                },
                {
                    model: db.Keamanan,
                    as: 'keamananDetail',
                    attributes: ['bobot'],
                },
            ],
        });

        // Ambil bobot dari data kost
        const hargaArray = kostData.map((kost) => kost.hargaDetail.bobot);
        const fasilitasArray = kostData.map((kost) => kost.fasilitasDetail.bobot);
        const jarakArray = kostData.map((kost) => kost.jarakDetail.bobot);
        const luasArray = kostData.map((kost) => kost.luaskamarDetail.bobot);
        const keamananArray = kostData.map((kost) => kost.keamananDetail.bobot);

        // Hitung nilai cost dan benefit
        const costHarga = Math.min(...hargaArray);
        const benefitFasilitas = Math.max(...fasilitasArray);
        const costJarak = Math.min(...jarakArray);
        const benefitLuas = Math.max(...luasArray);
        const benefitKeamanan = Math.max(...keamananArray);

        // Perhitungan nilai bobot setiap kost
        const kostDataWithBobot = kostData.map((kost) => {
            const hargaBobot = kost.hargaDetail?.bobot || 0;
            const fasilitasBobot = kost.fasilitasDetail?.bobot || 0;
            const jarakBobot = kost.jarakDetail?.bobot || 0;
            const luaskamarBobot = kost.luaskamarDetail?.bobot || 0;
            const keamananBobot = kost.keamananDetail?.bobot || 0;

            const nilaiBobotHarga = costHarga / hargaBobot; // cost
            const nilaiBobotFasilitas = fasilitasBobot / benefitFasilitas; // benefit
            const nilaiBobotJarak = costJarak / jarakBobot; // cost
            const nilaiBobotLuaskamar = luaskamarBobot / benefitLuas; // benefit
            const nilaiBobotKeamanan = keamananBobot / benefitKeamanan; // benefit

            const nilai = {
                harga: parseFloat(harga) || 0,
                fasilitas: parseFloat(fasilitas) || 0,
                luas: parseFloat(luas) || 0,
                jarak: parseFloat(jarak) || 0,
                keamanan: parseFloat(keamanan) || 0
            };

            // Hitung total nilai input
            const totalInput = nilai.harga + nilai.fasilitas + nilai.luas + nilai.jarak + nilai.keamanan;

            if (totalInput === 0) {
                return res.status(400).json({ message: "Semua nilai tidak boleh 0." });
            }

            // Normalisasi nilai agar total menjadi 100
            const normalisasi = {};
            Object.keys(nilai).forEach((key) => {
                normalisasi[key] = (nilai[key] / totalInput) * 100;
            });
            const totalNormalisasi = Object.values(normalisasi).reduce((sum, value) => sum + value, 0);

            const cek = 
                normalisasi.harga * nilaiBobotHarga + 
                normalisasi.fasilitas * nilaiBobotFasilitas + 
                normalisasi.luas * nilaiBobotJarak + 
                normalisasi.jarak * nilaiBobotLuaskamar + 
                normalisasi.keamanan * nilaiBobotKeamanan;

            return {
                ...kost.toJSON(),
                vector_original: { ...nilai, total: totalInput },
                vector_normalized: { ...normalisasi, totalNormalisasi },
                nilaiBobotHarga,
                nilaiBobotFasilitas,
                nilaiBobotJarak,
                nilaiBobotLuaskamar,
                nilaiBobotKeamanan,
                presentase: cek,
            };
        });

        // // Sum of cek values
        // const totalCek = kostDataWithBobot.reduce((total, kost) => total + kost.cek, 0);

        // const data = kostDataWithBobot.map((kost) => {
        //     const normalisCek =  (kost.cek / totalCek) * 100;

        //     return {
        //         ...kost,
        //         totalCek,
        //         normalisCek,
        //     };
        // });

        // Urutkan hasil berdasarkan nilai 'cek'
        const sortedKostDataWithBobot = kostDataWithBobot.sort((a, b) => b.presentase - a.presentase);

        res.status(HTTP_CODES.SUCCESS.code).json(
            formatResponse(HTTP_CODES.SUCCESS, '', sortedKostDataWithBobot)
        );
    } catch (error) {
        console.error('Error fetching :', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
    }
};


// const getSpkHandler = async (req, res) => {
//     try {
//         // Ambil bobot dari request body
//         const { harga_id, id_fasilitas, id_luas, id_jarak, id_keamanan } = req.query; // Mengambil parameter id dari URL

//         // Mengambil bobot dari setiap model berdasarkan ID
//         const hargaData = await db.Harga.findOne({
//           where: { harga_id },
//         });
//         const bobotHarga = hargaData ? hargaData.bobot : 0;
//         const bobotFasilitas = (await db.Fasilitas.findByPk(id_fasilitas))?.bobot || 0;
//         const bobotJarak = (await db.Jarak.findByPk(id_jarak))?.bobot || 0;
//         const bobotLuas = (await db.LuasKamar.findByPk(id_luas))?.bobot || 0;
//         const bobotKeamanan = (await db.Keamanan.findByPk(id_keamanan))?.bobot || 0;


//         const vector = [bobotHarga, bobotFasilitas, bobotJarak, bobotLuas, bobotKeamanan];

//         // Validasi input
//         console.log('hargaData.min_harga', hargaData.min_harga)
//         console.log('hargaData.max_harga', hargaData.max_harga)
//         console.log('harga_id', harga_id)

//         // Fetch data kost beserta relasinya
//         const kostData = await db.Kost.findAll({
//           // hapus where jika tidak filter range harga
//            where: {
//                 // harga: {
//                 //     [Op.gte]: hargaData.min_harga, // Harga harus >= min_harga
//                 //     [Op.lte]: hargaData.max_harga, // Harga harus <= max_harga
//                 // },
//                 harga_id: hargaData.harga_id
//             },
//             include: [
//                 {
//                     model: db.Harga,
//                     as: 'hargaDetail',
//                     attributes: ['bobot'],
//                 },
//                 {
//                     model: db.Fasilitas,
//                     as: 'fasilitasDetail',
//                     attributes: ['bobot'],
//                 },
//                 {
//                     model: db.Jarak,
//                     as: 'jarakDetail',
//                     attributes: ['bobot'],
//                 },
//                 {
//                     model: db.LuasKamar,
//                     as: 'luaskamarDetail',
//                     attributes: ['bobot'],
//                 },
//                 {
//                     model: db.Keamanan,
//                     as: 'keamananDetail',
//                     attributes: ['bobot'],
//                 },
//             ],
//             // attributes: ['nama_kost'],
//             order: [['nama_kost', 'ASC']],
//         });

//         // Ambil bobot dari data kost
//         const hargaArray = kostData.map((kost) => kost.hargaDetail.bobot);
//         const fasilitasArray = kostData.map((kost) => kost.fasilitasDetail.bobot);
//         const jarakArray = kostData.map((kost) => kost.jarakDetail.bobot);
//         const luasArray = kostData.map((kost) => kost.luaskamarDetail.bobot);
//         const keamananArray = kostData.map((kost) => kost.keamananDetail.bobot);

//         // Hitung nilai cost dan benefit
//         const costHarga = Math.min(...hargaArray);
//         const benefitFasilitas = Math.max(...fasilitasArray);
//         const costJarak = Math.min(...jarakArray);
//         const benefitLuas = Math.max(...luasArray);
//         const benefitKeamanan = Math.max(...keamananArray);

//         // Perhitungan nilai bobot setiap kost
//         const kostDataWithBobot = kostData.map((kost) => {
//             const hargaBobot = kost.hargaDetail?.bobot || 0;
//             const fasilitasBobot = kost.fasilitasDetail?.bobot || 0;
//             const jarakBobot = kost.jarakDetail?.bobot || 0;
//             const luaskamarBobot = kost.luaskamarDetail?.bobot || 0;
//             const keamananBobot = kost.keamananDetail?.bobot || 0;

//             const nilaiBobotHarga = costHarga / hargaBobot; // cost
//             const nilaiBobotFasilitas = fasilitasBobot / benefitFasilitas; // benefit
//             const nilaiBobotJarak = costJarak / jarakBobot; // cost
//             const nilaiBobotLuaskamar = luaskamarBobot / benefitLuas; // benefit
//             const nilaiBobotKeamanan = keamananBobot / benefitKeamanan; // benefit

//             const cek =
//                 Number(vector[0]) * nilaiBobotHarga +
//                 Number(vector[1]) * nilaiBobotFasilitas +
//                 Number(vector[2]) * nilaiBobotJarak +
//                 Number(vector[3]) * nilaiBobotLuaskamar +
//                 Number(vector[4]) * nilaiBobotKeamanan;


//             return {
//                 ...kost.toJSON(),
//                 cek,
//                 nilaiBobotHarga,
//                 nilaiBobotFasilitas,
//                 nilaiBobotJarak,
//                 nilaiBobotLuaskamar,
//                 nilaiBobotKeamanan,
//             };
//         });

//         // Urutkan hasil berdasarkan nilai 'cek'
//         const sortedKostDataWithBobot = kostDataWithBobot.sort((a, b) => b.cek - a.cek);

//         res.status(HTTP_CODES.SUCCESS.code).json(
//             formatResponse(HTTP_CODES.SUCCESS, '', sortedKostDataWithBobot)
//         );
//     } catch (error) {
//         console.error('Error fetching jarak by id:', error);
//         return res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
//     }
// };

// const getSpkHandler = async (req, res) => {
//     try {
//         // Ambil bobot dari request body
//         const { harga_id, id_fasilitas, id_luas, id_jarak, id_keamanan } = req.query; // Mengambil parameter id dari URL

//         // Mengambil bobot dari setiap model berdasarkan ID
//         // const hargaData = await db.Harga.findOne({
//         //   where: {
//         //       min_harga: { [Op.lte]: harga }, // harga_input harus lebih besar atau sama dengan min_harga
//         //       max_harga: { [Op.gte]: harga }, // harga_input harus lebih kecil atau sama dengan max_harga
//         //   },
//         // });
//         // const bobotHarga = hargaData ? hargaData.bobot : 0;
//         const bobotHarga = (await db.Harga.findByPk(harga_id))?.bobot || 0;
//         const bobotFasilitas = (await db.Fasilitas.findByPk(id_fasilitas))?.bobot || 0;
//         const bobotJarak = (await db.Jarak.findByPk(id_jarak))?.bobot || 0;
//         const bobotLuas = (await db.LuasKamar.findByPk(id_luas))?.bobot || 0;
//         const bobotKeamanan = (await db.Keamanan.findByPk(id_keamanan))?.bobot || 0;


//         const vector = [bobotHarga, bobotFasilitas, bobotJarak, bobotLuas, bobotKeamanan];


//         // Fetch data kost beserta relasinya
//         const kostData = await db.Kost.findAll({
//           // hapus where jika tidak filter range harga
//         //    where: {
//         //         harga: {
//         //             [Op.gte]: hargaData.min_harga, // Harga harus >= min_harga
//         //             [Op.lte]: hargaData.max_harga, // Harga harus <= max_harga
//         //         },
//         //     },
//             include: [
//                 {
//                     model: db.Harga,
//                     as: 'hargaDetail',
//                     attributes: ['bobot'],
//                 },
//                 {
//                     model: db.Fasilitas,
//                     as: 'fasilitasDetail',
//                     attributes: ['bobot'],
//                 },
//                 {
//                     model: db.Jarak,
//                     as: 'jarakDetail',
//                     attributes: ['bobot'],
//                 },
//                 {
//                     model: db.LuasKamar,
//                     as: 'luaskamarDetail',
//                     attributes: ['bobot'],
//                 },
//                 {
//                     model: db.Keamanan,
//                     as: 'keamananDetail',
//                     attributes: ['bobot'],
//                 },
//             ],
//             // attributes: ['nama_kost'],
//             order: [['nama_kost', 'ASC']],
//         });

//         // Ambil bobot dari data kost
//         const hargaArray = kostData.map((kost) => kost.hargaDetail.bobot);
//         const fasilitasArray = kostData.map((kost) => kost.fasilitasDetail.bobot);
//         const jarakArray = kostData.map((kost) => kost.jarakDetail.bobot);
//         const luasArray = kostData.map((kost) => kost.luaskamarDetail.bobot);
//         const keamananArray = kostData.map((kost) => kost.keamananDetail.bobot);

//         // Hitung nilai cost dan benefit
//         const costHarga = Math.min(...hargaArray);
//         const benefitFasilitas = Math.max(...fasilitasArray);
//         const costJarak = Math.min(...jarakArray);
//         const benefitLuas = Math.max(...luasArray);
//         const benefitKeamanan = Math.max(...keamananArray);

//         // Perhitungan nilai bobot setiap kost
//         const kostDataWithBobot = kostData.map((kost) => {
//             const hargaBobot = kost.hargaDetail?.bobot || 0;
//             const fasilitasBobot = kost.fasilitasDetail?.bobot || 0;
//             const jarakBobot = kost.jarakDetail?.bobot || 0;
//             const luaskamarBobot = kost.luaskamarDetail?.bobot || 0;
//             const keamananBobot = kost.keamananDetail?.bobot || 0;

//             const nilaiBobotHarga = costHarga / hargaBobot; // cost
//             const nilaiBobotFasilitas = fasilitasBobot / benefitFasilitas; // benefit
//             const nilaiBobotJarak = costJarak / jarakBobot; // cost
//             const nilaiBobotLuaskamar = luaskamarBobot / benefitLuas; // benefit
//             const nilaiBobotKeamanan = keamananBobot / benefitKeamanan; // benefit

//             const cek =
//                 Number(vector[0]) * nilaiBobotHarga +
//                 Number(vector[1]) * nilaiBobotFasilitas +
//                 Number(vector[2]) * nilaiBobotJarak +
//                 Number(vector[3]) * nilaiBobotLuaskamar +
//                 Number(vector[4]) * nilaiBobotKeamanan;


//             return {
//                 ...kost.toJSON(),
//                 cek,
//                 nilaiBobotHarga,
//                 nilaiBobotFasilitas,
//                 nilaiBobotJarak,
//                 nilaiBobotLuaskamar,
//                 nilaiBobotKeamanan,
//             };
//         });

//         // Urutkan hasil berdasarkan nilai 'cek'
//         // const sortedKostDataWithBobot = kostDataWithBobot.sort((a, b) => b.cek - a.cek);
//         const top3KostDataWithBobot = kostDataWithBobot.slice(0, 3);

//         res.status(HTTP_CODES.SUCCESS.code).json(
//             formatResponse(HTTP_CODES.SUCCESS, '', top3KostDataWithBobot)
//         );
//     } catch (error) {
//         console.error('Error fetching jarak by id:', error);
//         return res.status(500).json({ message: 'Terjadi kesalahan server.', error: error.message });
//     }
// };

module.exports = { getSpkHandler };
