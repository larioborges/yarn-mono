import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './FormError.scss';

const getClass = (size) => {
    let errClass = 'form-error-msg';
    if (size === 'large') {
        errClass += ' large';
    }
    return errClass;
};

export const FormError = ({ error, size = 'default' }) => (
    <Fragment>
        <p className={getClass(size)}>{error}</p>
    </Fragment>
);

FormError.propTypes = {
    error: PropTypes.string,
    size: PropTypes.oneOf(['large', 'default']),
};
