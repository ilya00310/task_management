module.exports = {
  up: async (migration_interface) => {
    await migration_interface.bulkInsert('Users', [
      {
        password: 'root',
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
