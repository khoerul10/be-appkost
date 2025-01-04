'use strict';

const { v4: uuidv4 } = require('uuid');

function getRandomJenisKost() {
  const jenisKostOptions = ['campur', 'pria', 'wanita'];
  const randomIndex = Math.floor(Math.random() * jenisKostOptions.length);
  return jenisKostOptions[randomIndex];
}

function getHargaId(harga) {
  if (harga >= 1000000 && harga <= 2000000) return 1;
  if (harga >= 700000 && harga <= 999999) return 2;
  if (harga >= 500000 && harga <= 699999) return 3;
  if (harga >= 400000 && harga <= 499999) return 4;
  if (harga >= 0 && harga <= 399999) return 5;
  return null; // Jika harga tidak valid
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kost', [
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost Bu Nurul',
        alamat: 'Jl. Kramat Utara No.33 1, RT.1/RW.4, Kp. Tengah, Kec. Kramat jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13540',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://maps.app.goo.gl/VMopBvQCT4fLYxSC6',
        pemilik: 'Bu Nurul',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 450000,
        harga_id: getHargaId(450000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: 4,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322517/Kost%20Bu%20Nurul.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322543/Kost%20Bu%20Nurul-2.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322550/Kost%20Bu%20Nurul-3.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733322517/Kost%20Bu%20Nurul.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Rumah Kost Venty',
        alamat: '7, Gg. Bangkok No.18, RT.7/RW.10, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://maps.app.goo.gl/26YWjujocMfZSXRL9',
        pemilik: 'Venty',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 300000,
        harga_id: getHargaId(300000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: 3,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322303/Rumah%20Kost%20Venty.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322375/Rumah%20Kost%20Venty-2.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322401/Rumah%20Kost%20Venty-3.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733322303/Rumah%20Kost%20Venty.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Rumah Kost Bu Lastri',
        alamat: 'Jl. Ujung Gedong No.70, Gedong, Kec. Ps. Rebo, Jakarta, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://maps.app.goo.gl/WFhvc2CrVVCDrYVt7',
        pemilik: 'Bu Lastri',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 632000,
        harga_id: getHargaId(632000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: 3,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322201/Rumah%20Kost%20Bu%20Lastri.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733322201/Rumah%20Kost%20Bu%20Lastri.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost Griya Emerald',
        alamat: 'Jl. H. Taiman Ujung No.Kav. B3, RT.4/RW.10, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://maps.app.goo.gl/BouYLWdf2faFw6mN6',
        pemilik: 'Emerald',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 345000,
        harga_id: getHargaId(345000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: 2,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322012/Kost%20Griya%20Emerald.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322034/Kost%20Griya%20Emerald-2.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733322039/Kost%20Griya%20Emerald-3.png'
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733322012/Kost%20Griya%20Emerald.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost Rumah Gedong 17',
        alamat: 'Jl. Ujung Gedong No.17 5, RT.5/RW.12, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13770',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Gedong',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 1200000,
        harga_id: getHargaId(1200000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321868/Kost%20Rumah%20Gedong%2017.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321910/Kost%20Rumah%20Gedong%2017-2.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321945/Kost%20Rumah%20Gedong%2017-3.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733321868/Kost%20Rumah%20Gedong%2017.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost 53 Surilang',
        alamat: 'Jl. Surilang No.53, RT.9/RW.12, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Surilang',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 840000,
        harga_id: getHargaId(840000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321585/Kost%2053%20Surilang.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321653/Kost%2053%20Surilang-3.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321744/Kost%2053%20Surilang-2.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733321585/Kost%2053%20Surilang.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost waru AA',
        alamat: 'Jl. Waru No.44, RT.8/RW.3, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'AA',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 970000,
        harga_id: getHargaId(970000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321475/Kost%20waru%20AA.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733321475/Kost%20waru%20AA.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kosant H. Muksan',
        alamat: 'Jl. Raya Tengah Blok Rukun No.64, RT.2/RW.3, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'H. Muksan',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 300000,
        harga_id: getHargaId(300000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321265/Kosant%20H.%20Muksan.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733321265/Kosant%20H.%20Muksan.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost 58',
        alamat: 'Jl. Raya Tengah No.58 8, RT.2/RW.1, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'apan',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 523000,
        harga_id: getHargaId(523000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321128/kost%2058%202.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733321103/kost%2058.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733321128/kost%2058%202.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Avidanty Kost',
        alamat: 'Jl. Raya Tengah Gg. Rukun No.20 7, RT.2/RW.3, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Avidanty',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 600000,
        harga_id: getHargaId(600000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733320788/Avidanty%20Kost.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733320788/Avidanty%20Kost.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost Putri Hasto',
        alamat: 'Raya 005/03, Gg. Remaja 2 No.18, RT.1 Rt/RW.3, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Hasto',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 760000,
        harga_id: getHargaId(760000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733320716/Kost%20Putri%20Hasto.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733320716/Kost%20Putri%20Hasto.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost Bu Erny',
        alamat: 'Jl. Tengah No.03A, RT.11/RW.10, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Bu Erny',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 830000,
        harga_id: getHargaId(830000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733320575/Kost%20Bu%20Erny.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733320575/Kost%20Bu%20Erny.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kost Bu yana',
        alamat: 'Jl. Tengah No.68, RT.1/RW.12, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Bu yana',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 470000,
        harga_id: getHargaId(470000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733320095/Kost%20Bu%20yana.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733320095/Kost%20Bu%20yana.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: uuidv4(),
        nama_kost: 'Kosan Bude Restu',
        alamat: 'Jalan timur dalam VIII, nomer No.78, RT.11/RW.10, Gedong, Kec. Ps. Rebo, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13760',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Bude Restu',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 580000,
        harga_id: getHargaId(580000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733320303/Kosan%20Bude%20Restu.png',
          'https://res.cloudinary.com/ksarifudin/image/upload/v1733320437/Kosan%20Bude%20Restu%202.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1733320303/Kosan%20Bude%20Restu.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: 1,
        nama_kost: 'Kost Indah Raya',
        alamat: 'Jl. Raya Tengah No.81, Gedong, Jakarta Timur',
        deskripsi: 'Kost nyaman dengan akses mudah ke kampus.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Indah',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 760000,
        harga_id: getHargaId(760000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: 2,
        nama_kost: 'Kost Graha Pahlawan',
        alamat: 'Jl. Pahlawan No.5, Cipayung, Jakarta Timur',
        deskripsi: 'Kost eksklusif, aman dan nyaman dekat Universitas.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Graha',
        no_telp: '082299336978',
        jenis_kost: 'wanita',
        status: 'tidak tersedia',
        harga: 1500000,
        harga_id: getHargaId(1500000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: 3,
        nama_kost: 'Kost Cendana',
        alamat: 'Jl. Cendana No.12, Jatisampurna, Jakarta Timur',
        deskripsi: 'Kost bersih dengan harga terjangkau dan fasilitas lengkap.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Cendana',
        no_telp: '082299336978',
        jenis_kost: 'pria',
        status: 'tersedia',
        harga: 1000000,
        harga_id: getHargaId(1000000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: 4,
        nama_kost: 'Kost Taman Sari',
        alamat: 'Jl. Raya Taman No.7, Cipayung, Jakarta Timur',
        deskripsi: 'Kost asri dengan fasilitas lengkap, cocok untuk mahasiswa.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Sari',
        no_telp: '082299336978',
        jenis_kost: getRandomJenisKost(),
        status: 'tersedia',
        harga: 1300000,
        harga_id: getHargaId(1300000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kost_id: 5,
        nama_kost: 'Kost Elit Pahlawan',
        alamat: 'Jl. Elit Pahlawan No.15, Gedong, Jakarta Timur',
        deskripsi: 'Kost dengan fasilitas elit dan harga terjangkau.',
        maps: 'https://www.google.com/maps?hl=id',
        pemilik: 'Eli',
        no_telp: '082299336978',
        jenis_kost: 'pria',
        status: 'tersedia',
        harga: 1100000,
        harga_id: getHargaId(1100000),
        kebersihan_id: Math.floor(Math.random() * 5) + 1,
        luas_id: Math.floor(Math.random() * 5) + 1,
        fasilitas_id: Math.floor(Math.random() * 5) + 1,
        jarak_id: Math.floor(Math.random() * 5) + 1,
        keamanan_id: Math.floor(Math.random() * 5) + 1,
        photos: JSON.stringify([
          'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        ]),
        thumb_image: 'https://res.cloudinary.com/ksarifudin/image/upload/v1732802747/kost_photos/kost-default.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kost', null, {});
  },
};
