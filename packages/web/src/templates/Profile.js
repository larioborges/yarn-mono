import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { AppLayout } from '../layouts/AppLayout';

const Profile = ({ data }) => {
    const { profile } = data;

    return (
        <AppLayout
            title={profile.title}
            metaTags={{
                description: 'Public Profile.',
            }}
            headerContent={<h1>{profile.name}</h1>}
            bodyContent={<p>{profile.about}</p>}
        />
    );
};

Profile.propTypes = {
    data: PropTypes.exact({
        profile: PropTypes.exact({
            title: PropTypes.string,
            name: PropTypes.string,
            about: PropTypes.string,
        }),
    }),
};

export const query = graphql`
    query MyQuery($id: String) {
        profile(id: { eq: $id }) {
            title
            name
            about
        }
    }
`;

export default Profile;
