import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby-theme-material-ui';

import { AppLayout } from '../../layouts/AppLayout';

const CharitiesPage = () => {
    const { allCharity } = useStaticQuery(graphql`
        query CharitiesQuery {
            allCharity {
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
            title="Charities"
            metaTags={{
                description: 'Charities page for XO Sports.',
            }}
            headerContent={<h1>Charities</h1>}
            bodyContent={
                allCharity && (
                    <ol>
                        {allCharity.nodes.map((charity) => (
                            <li key={charity.id}>
                                <Link to={`/charities/${charity.slug}`}>{charity.name}</Link>
                            </li>
                        ))}
                    </ol>
                )
            }
        />
    );
};

export default CharitiesPage;
