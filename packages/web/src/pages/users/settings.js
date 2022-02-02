import React from 'react';

import { AppLayout } from '../../layouts/AppLayout';

const SettingsPage = () => {
    return (
        <AppLayout
            title="Settings"
            metaTags={{
                description: 'Settings.',
            }}
            headerContent={<h1>Settings</h1>}
            bodyContent={<p>I AM SETTINGS SCREEN</p>}
        />
    );
};

export default SettingsPage;
