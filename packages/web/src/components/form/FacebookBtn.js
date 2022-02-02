import React from 'react';
import PropTypes from 'prop-types';

import FacebookIcon from '@mui/icons-material/Facebook';
import Button from '@mui/material/Button';

const facebookAuth = (/*e*/) => {
    console.log('Facebook Auth');
};

export const FacebookBtn = ({ action }) => (
    <Button onClick={facebookAuth} startIcon={<FacebookIcon />} variant="contained">{`${
        action && `${action} with `
    }Facebook`}</Button>
);

FacebookBtn.propTypes = {
    action: PropTypes.string,
};
