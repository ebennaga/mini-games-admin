import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const AddRoleContainer = dynamic(() => import('containers/AddRole'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Add Roles | Prize Play Admin</title>
                <meta name='description' content='Add User Roles Prize Play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <AddRoleContainer />
            </Layout>
        </>
    );
};

Page.getPageProps = async () => {
    return {
        protectedRoute: true
    };
};

export default Page;
