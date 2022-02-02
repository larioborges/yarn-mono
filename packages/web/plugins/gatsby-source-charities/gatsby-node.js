const axios = require('axios');

const CHARITY_NODE_TYPE = `Charity`;

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
}) => {
    const { createNode } = actions

    try {
        const response = await axios.get(`${process.env.GATSBY_API_BASE_URL}/charities`);    
        response.data.forEach(charity =>
            createNode({
                ...charity,
                id: createNodeId(`${CHARITY_NODE_TYPE}-${charity.id}`),
                parent: null,
                children: [],
                internal: {
                    type: CHARITY_NODE_TYPE,
                    content: JSON.stringify(charity),
                    contentDigest: createContentDigest(charity),
                },
            })
        )
        return;
    } catch (err) {
        console.log(err);
    }
};
