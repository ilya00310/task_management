const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const hashPassword = await bcrypt.hash('root', 10);

    await queryInterface.bulkInsert('Users', [
      {
        password: hashPassword,
        email: 'emailAdmin@.com',
        username: 'Ilya',
        role: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};