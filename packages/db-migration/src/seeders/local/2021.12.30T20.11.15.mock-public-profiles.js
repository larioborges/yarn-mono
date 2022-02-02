const { TABLES } = require('@lario/db-models');

const examplePublicProfiles = [
    {
        id: '428c5293-2e00-493a-9600-21011be05df3',
        slug: 'nelson-mandela',
        title: 'Nelson Mandela',
        name: 'Nelson Mandela',
        about: 'South African struggle hero and icon',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '51a5463f-b933-4d95-aed9-4931a64c4bb8',
        slug: 'einstein',
        title: 'Albert Einstein',
        name: 'Albert Einstein',
        about: 'Mad amazing scientist',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'e31f54ad-3038-4467-a67b-283a34cdb21b',
        slug: 'michael-jordan',
        title: 'Michael Jordan',
        name: 'Michael Jordan',
        about: 'The best basketball player ever!',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const up = async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert(TABLES.PROFILES, examplePublicProfiles);
};

const down = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete(TABLES.PROFILES, {
        id: examplePublicProfiles.map((c) => c.id),
    });
};

module.exports = { up, down };
