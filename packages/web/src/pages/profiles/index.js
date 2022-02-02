import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby-theme-material-ui';

import { AppLayout } from '../../layouts/AppLayout';

const ProfilesPage = () => {
    const { allProfile } = useStaticQuery(graphql`
        query ProfileQuery {
            allProfile {
                nodes {
                    slug
                    title
                    name
                    about
                }
            }
        }
    `);

    return (
        <AppLayout
            title="Public Profiles"
            metaTags={{
                description: 'Public Profiles.',
            }}
            headerContent={<h1>Public Profiles</h1>}
            bodyContent={
                allProfile && (
                    <ol>
                        {allProfile.nodes.map((pp) => (
                            <li key={pp.id}>
                                <Link to={`/profiles/${pp.slug}`}>{pp.name}</Link>
                            </li>
                        ))}
                    </ol>
                )
            }
        />
    );
};

export default ProfilesPage;
