'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users_projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Users',
                    },
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            project_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'Projects',
                    },
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users_projects');
    },
};
