const bcrypt = require('bcrypt');
const { TABLES } = require('@lario/db-models');

const salt = bcrypt.genSaltSync(15);
const hashedPass = (myPlaintextPassword) => bcrypt.hashSync(myPlaintextPassword, salt);

const exampleAdminUsers = [
    {
        id: '428c5293-2e00-493a-9600-21011be05df3',
        name: 'King',
        surname: 'XoAdmin',
        email: 'kingadmin@xosports.com',
        password: hashedPass('Pa55W0rD'),
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const up = async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert(TABLES.ADMIN_CONSOLE_USERS, exampleAdminUsers);
};

const down = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete(TABLES.ADMIN_CONSOLE_USERS, {
        id: exampleAdminUsers.map((u) => u.id),
    });
};

module.exports = { up, down };
