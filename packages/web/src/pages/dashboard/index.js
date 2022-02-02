import React from 'react';
import { AppLayout } from '../../layouts/AppLayout';

const DashboardPage = () => {
    return (
        <AppLayout
            title="Dashboard"
            metaTags={{
                description: 'Lario - Dashboard',
            }}
            headerContent={<h1>Dashboard</h1>}
            bodyContent={<h1>This is the Dashboard - coming soon</h1>}
        />
    );
};

export default DashboardPage;
