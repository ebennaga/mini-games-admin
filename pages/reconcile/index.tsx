import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ReconCileContainer = dynamic(() => import('containers/Reconcile'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Sign Up | Prize Play Admin</title>
                <meta name='description' content='Sign Up to be admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <ReconCileContainer />
            </Layout>
        </>
    );
};

export default Page;
