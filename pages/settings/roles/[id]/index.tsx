import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import dynamic from 'next/dynamic';

const EditRoleContainer = dynamic(() => import('containers/EditRole'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Edit Roles | Prize Play Admin</title>
                <meta name='description' content='Add User Roles Prize Play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <EditRoleContainer />
            </Layout>
        </>
    );
};

export default Page;
