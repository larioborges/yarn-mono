const path = require('path')

exports.onPostBuild = ({ reporter }) => {
	reporter.info('XO Sports build complete')
}

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	await mapCharityTemplates(graphql, createPage);
}

const mapCharityTemplates = async (graphql, createPage) => {
	const charityDetailsTemplate = path.resolve('src/templates/CharityDetails.js')
	const result = await graphql(`
    query {
      allCharity {
        edges {
          node {
            id
            slug
            title
            name
            about
          }
        }
      }
    }
  	`);

	result.data.allCharity.edges.forEach(edge => {
		createPage({
			path: `/charities/${edge.node.slug}`,
			component: charityDetailsTemplate,
			context: {
				id: edge.node.id,
			},
		});
	});
};
