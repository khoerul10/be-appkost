// Kode Status Respons
const HTTP_CODES = {
    SUCCESS: {
        code: "200",
        message: "Request berhasil diproses"
    },
    CREATED: {
        code: "201",
        message: "Data berhasil ditambahkan"
    },
    BAD_REQUEST: {
        code: "400",
        message: "Permintaan tidak valid"
    },
    UNAUTHORIZED: {
        code: "401",
        message: "Akses ditolak, otentikasi gagal"
    },
    FORBIDDEN: {
        code: "403",
        message: "Tidak memiliki izin untuk mengakses"
    },
    NOT_FOUND: {
        code: "404",
        message: "Data tidak ditemukan"
    },
    INTERNAL_SERVER_ERROR: {
        code: "500",
        message: "Terjadi kesalahan pada server"
    },
    SERVICE_UNAVAILABLE: {
        code: "503",
        message: "Layanan tidak tersedia"
    }
};

// Membantu untuk mengembalikan response dengan format yang konsisten
const formatResponse = (responseCode, customMessage = '', customData = {}) => {
    const response = {
        code: responseCode.code,
        message: customMessage || responseCode.message,  // Menggunakan customMessage jika ada
        data: customData || {}  // Menggunakan customData jika ada, jika tidak, kosongkan objek
    };

    // Menambahkan metaData jika customData memiliki panjang lebih dari 0
    if (Array.isArray(customData) && customData.length !== 0) {
        response.metaData = {
            totalData : customData.length
        }
    }

    return response;
};

module.exports = { HTTP_CODES, formatResponse };
