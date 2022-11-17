import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ChangePassword = dynamic(() => import('containers/ChangePassword'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Change Password | Prize Play Admin</title>
                <meta name='description' content='Confirmation Account to be admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout isUserInfo={false}>
                <ChangePassword />
            </Layout>
        </>
    );
};

export default Page;
