import React from 'react';
import PropTypes from 'prop-types';

import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';

const googleAuth = (/*e*/) => {
    console.log('Google Auth');
};

export const GoogleBtn = ({ action }) => (
    <Button onClick={googleAuth} startIcon={<GoogleIcon />} variant="contained">{`${
        action && `${action} with `
    }Google`}</Button>
);

GoogleBtn.propTypes = {
    action: PropTypes.string,
};
