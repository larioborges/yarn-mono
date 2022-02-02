import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'gatsby-theme-material-ui';

import {
    setSignupFirstName,
    setSignupLastName,
    setSignupEmail,
    setSignupPassword,
    toggleAgreeToTerms,
    submitSignup,
} from '@lario/redux/src/slices/users/signup';

import {
    selectFirstName,
    selectFirstNameError,
    selectLastName,
    selectLastNameError,
    selectEmailAddress,
    selectEmailAddressError,
    selectPassword,
    selectPasswordError,
    selectSignupSubmitEnabled,
    selectSignupInputDisabled,
    selectAgreeToTerms,
    selectSubmitError,
} from '@lario/redux/src/selectors/users/signup';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormError } from '../form/FormError';
import TextField from '@mui/material/TextField';

export const SignupPageForm = () => {
    const dispatch = useDispatch();

    const {
        firstName,
        firstNameError,
        lastName,
        lastNameError,
        emailAddress,
        emailAddressError,
        password,
        passwordError,
        signupSubmitEnabled,
        signupInputDisabled,
        agreeToTerms,
        submitError,
    } = useSelector(
        createStructuredSelector({
            firstName: selectFirstName,
            firstNameError: selectFirstNameError,
            lastName: selectLastName,
            lastNameError: selectLastNameError,
            emailAddress: selectEmailAddress,
            emailAddressError: selectEmailAddressError,
            password: selectPassword,
            passwordError: selectPasswordError,
            signupSubmitEnabled: selectSignupSubmitEnabled,
            signupInputDisabled: selectSignupInputDisabled,
            agreeToTerms: selectAgreeToTerms,
            submitError: selectSubmitError,
        }),
    );

    return (
        <div className="signup-page-form">
            <p className="already-have-account">
                Already have an account? <Link to="/users/login">Sign In</Link>
            </p>

            <div className="form-content">
                <h1>Welcome to Lario's App</h1>
                <h3>Please Register!</h3>

                <TextField
                    label="First Name"
                    value={firstName}
                    helperText={firstNameError}
                    error={firstNameError}
                    onChange={(e) => dispatch(setSignupFirstName(e.target.value))}
                    disabled={signupInputDisabled}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    helperText={lastNameError}
                    error={lastNameError}
                    onChange={(e) => dispatch(setSignupLastName(e.target.value))}
                    disabled={signupInputDisabled}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email Address"
                    type="email"
                    value={emailAddress}
                    helperText={emailAddressError}
                    error={emailAddressError}
                    onChange={(e) => dispatch(setSignupEmail(e.target.value))}
                    disabled={signupInputDisabled}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Create Password"
                    type="password"
                    value={password}
                    helperText={passwordError}
                    error={passwordError}
                    onChange={(e) => dispatch(setSignupPassword(e.target.value))}
                    disabled={signupInputDisabled}
                    fullWidth
                    margin="normal"
                />

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="terms"
                                onChange={() => dispatch(toggleAgreeToTerms())}
                                checked={agreeToTerms}
                            />
                        }
                        label="I agree to terms &amp; conditions"
                    />
                </div>

                <Button
                    variant="contained"
                    onClick={() => dispatch(submitSignup())}
                    disabled={!signupSubmitEnabled}
                    color="primary"
                >
                    Create Account
                </Button>

                {submitError && <FormError size="large" error={submitError} />}
            </div>
        </div>
    );
};
