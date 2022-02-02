const axios = require('axios');

const PROFILE_NODE_TYPE = `Profile`;

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
}) => {
    const { createNode } = actions

    try {
        const response = await axios.get(`${process.env.GATSBY_API_BASE_URL}/profiles`);    
        response.data.forEach(pp =>
            createNode({
                ...pp,
                id: createNodeId(`${PROFILE_NODE_TYPE}-${pp.id}`),
                parent: null,
                children: [],
                internal: {
                    type: PROFILE_NODE_TYPE,
                    content: JSON.stringify(pp),
                    contentDigest: createContentDigest(pp),
                },
            })
        )
        return;
    } catch (err) {
        console.log(err);
    }
};
