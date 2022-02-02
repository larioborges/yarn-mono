const { TABLES } = require('@lario/db-models');

const exampleCharities = [
    {
        id: '428c5293-2e00-493a-9600-21011be05df3',
        slug: 'spca',
        title: 'SPCA',
        name: 'SPCA',
        about: 'The SPCA helps animals',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '51a5463f-b933-4d95-aed9-4931a64c4bb8',
        slug: 'kolisi-foundation',
        title: 'The Siya Kolisi Foundation',
        name: 'Kolisi Foundation',
        about: 'A foundation for siya',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'e31f54ad-3038-4467-a67b-283a34cdb21b',
        slug: 'aids',
        title: 'AIDS Foundation',
        name: 'AIDS Foundation',
        about: 'We fight aids',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'f0badd95-3673-4b38-ba3b-15baee5790a6',
        slug: 'cancer',
        title: 'Cancer Foundation',
        name: 'Cancer Foundation',
        about: 'We fight cancer on a huge level',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const up = async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert(TABLES.CHARITIES, exampleCharities);
};

const down = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete(TABLES.CHARITIES, {
        id: exampleCharities.map((c) => c.id),
    });
};

module.exports = { up, down };
