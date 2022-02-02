import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export const PageHead = ({ title, metaTags }) => {
    return (
        <Helmet>
            <title>{title ? title : 'XO Sports'}</title>

            {metaTags &&
                Object.keys(metaTags).map((key) => (
                    <meta key={key} name={key} content={metaTags[key]} />
                ))}
        </Helmet>
    );
};

PageHead.propTypes = {
    title: PropTypes.string,
    metaTags: PropTypes.object,
};
