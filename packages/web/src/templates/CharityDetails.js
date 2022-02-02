import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { AppLayout } from '../layouts/AppLayout';

const CharityDetails = ({ data }) => {
    const { charity } = data;

    return (
        <AppLayout
            title={charity.title}
            metaTags={{
                description: 'Charities page for XO Sports.',
            }}
            headerContent={<h1>{charity.name}</h1>}
            bodyContent={<p>{charity.about}</p>}
        />
    );
};

CharityDetails.propTypes = {
    data: PropTypes.exact({
        charity: PropTypes.exact({
            title: PropTypes.string,
            name: PropTypes.string,
            about: PropTypes.string,
        }),
    }),
};

export const query = graphql`
    query MyQuery($id: String) {
        charity(id: { eq: $id }) {
            title
            name
            about
        }
    }
`;

export default CharityDetails;
