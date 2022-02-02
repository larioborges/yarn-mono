import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'gatsby-theme-material-ui';

import {
    setLoginEmail,
    setLoginPassword,
    submitLogin,
} from '@lario/redux/src/slices/users/login';

import {
    selectEmailAddress,
    selectEmailAddressError,
    selectPassword,
    selectPasswordError,
    selectLoginSubmitEnabled,
    selectLoginInputDisabled,
    selectSubmitError,
} from '@lario/redux/src/selectors/users/login';

import Button from '@mui/material/Button';
import { FormError } from '../form/FormError';
import TextField from '@mui/material/TextField';

export const LoginPageForm = () => {
    const dispatch = useDispatch();

    const {
        emailAddress,
        emailAddressError,
        password,
        passwordError,
        loginSubmitEnabled,
        loginInputDisabled,
        submitError,
    } = useSelector(
        createStructuredSelector({
            emailAddress: selectEmailAddress,
            emailAddressError: selectEmailAddressError,
            password: selectPassword,
            passwordError: selectPasswordError,
            loginSubmitEnabled: selectLoginSubmitEnabled,
            loginInputDisabled: selectLoginInputDisabled,
            submitError: selectSubmitError,
        }),
    );

    return (
        <div className="login-page-form">
            <p>
                Don&apos;t have an account yet? <Link to="/users/signup">Sign Up</Link>
            </p>

            <h1>Welcome back</h1>
            <h3>Please Sign In!</h3>

            <TextField
                label="Email Address"
                type="email"
                value={emailAddress}
                helperText={emailAddressError}
                error={emailAddressError}
                onChange={(e) => dispatch(setLoginEmail(e.target.value))}
                disabled={loginInputDisabled}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                helperText={passwordError}
                error={passwordError}
                onChange={(e) => dispatch(setLoginPassword(e.target.value))}
                disabled={loginInputDisabled}
                fullWidth
                margin="normal"
            />

            <Link to="/users/forgotPassword" />

            <Button
                onClick={() => dispatch(submitLogin())}
                disabled={!loginSubmitEnabled}
                color="primary"
            >
                Sign In
            </Button>

            {submitError && <FormError size="large" error={submitError} />}
        </div>
    );
};
