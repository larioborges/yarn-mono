import * as React from 'react';

import { AuthLayout } from '../../layouts/AuthLayout';
import { AuthPageAside } from '../../components/users/AuthPageAside';
import { SignupPageForm } from '../../components/users/SignupPageForm';

const SignupPage = () => {
    return (
        <AuthLayout
            title="Signup - XOSports"
            metaTags={{
                description: 'login bla bla',
            }}
            asideContent={<AuthPageAside />}
            mainContent={<SignupPageForm />}
        />
    );
};

export default SignupPage;
