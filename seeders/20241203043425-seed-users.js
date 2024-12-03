'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const userPassword = await bcrypt.hash('password123', 12); // Password terenkripsi
    const adminPassword = await bcrypt.hash('admpassword', 12);

    await queryInterface.bulkInsert('users', [
      {
        user_id: uuidv4(),
        username: 'user',
        password: userPassword,
        email: 'user@example.com',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
        phone: '081234567890',
        address: 'Jl. Contoh Alamat No. 1',
        status: 'active',
      },
      {
        user_id: uuidv4(),
        username: 'admin',
        password: adminPassword,
        email: 'admin@example.com',
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
        phone: '081987654321',
        address: 'Jl. Admin Contoh No. 2',
        status: 'active',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
