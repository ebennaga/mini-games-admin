import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import dynamic from 'next/dynamic';

const ActiveAccountContainer = dynamic(() => import('containers/ActiveAccount'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Activation Account | Prize Play Admin</title>
                <meta name='description' content='Sign In as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout isUserInfo={false}>
                <ActiveAccountContainer />
            </Layout>
        </>
    );
};

export default Page;
