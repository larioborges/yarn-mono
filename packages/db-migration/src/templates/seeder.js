const exampleSeedData = [
    { id: 'put hard coded uuid here', name: 'Alice' },
    { id: 'put hard coded uuid here', name: 'Bob' },
];

const up = async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('exampleTable', exampleSeedData);
};

const down = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('exampleTable', { id: exampleSeedData.map((u) => u.id) });
};

module.exports = { up, down };
