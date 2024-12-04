const bcrypt = require('bcrypt')
module.exports = {
  up: async (migration_interface) => {
    const hashPassword = await bcrypt.hash('root', 5)
    await migration_interface.bulkInsert('Users', [
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
  down: async (migration_interface) => {
    await migration_interface.bulkDelete('Users', {}, {});
  },
};