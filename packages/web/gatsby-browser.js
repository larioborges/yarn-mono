import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import './src/scss/browser-reset.scss';
import './src/scss/font-styling.scss';

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

export const wrapRootElement = ({ element }) => {
    return (
        <React.Fragment>
            <CssBaseline />
            {element}
        </React.Fragment>
    );
};
