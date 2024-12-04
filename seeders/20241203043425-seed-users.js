'use strict';

// const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultPassword = await bcrypt.hash('password1', 12); // Password terenkripsi

    await queryInterface.bulkInsert('users', [
      {
        // user_id: uuidv4(),
        user_id: 1,
        username: 'user',
        password: defaultPassword,
        email: 'user@example.com',
        role: 'user',
        phone: '081234567890',
        address: 'Jl. Contoh Alamat No. 1',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // user_id: uuidv4(),
        user_id: 2,
        username: 'admin',
        password: defaultPassword,
        email: 'admin@example.com',
        role: 'admin',
        phone: '081987654321',
        address: 'Jl. Admin Contoh No. 2',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
