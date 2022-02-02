import React from 'react';

import { AuthLayout } from '../../layouts/AuthLayout';
import { AuthPageAside } from '../../components/users/AuthPageAside';
import { LoginPageForm } from '../../components/users/LoginPageForm';

const LoginPage = () => {
    return (
        <AuthLayout
            title="Login - XOSports"
            metaTags={{
                description: 'login bla bla',
            }}
            asideContent={<AuthPageAside />}
            mainContent={<LoginPageForm />}
        />
    );
};

export default LoginPage;
