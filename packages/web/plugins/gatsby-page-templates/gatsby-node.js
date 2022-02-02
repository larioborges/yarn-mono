const path = require('path')

exports.onPostBuild = ({ reporter }) => {
	reporter.info('Lario web app build complete')
}

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	await mapProfileTemplates(graphql, createPage);
}

const mapProfileTemplates = async (graphql, createPage) => {
	const profileTemplate = path.resolve('src/templates/Profile.js')
	const result = await graphql(`
    query {
      allProfile {
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

	result.data.allProfile.edges.forEach(edge => {
		createPage({
			path: `/profiles/${edge.node.slug}`,
			component: profileTemplate,
			context: {
				id: edge.node.id,
			},
		});
	});
};
