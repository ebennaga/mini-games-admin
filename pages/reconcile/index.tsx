import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ReconCileContainer = dynamic(() => import('containers/Reconcile'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Reconcile | Prize Play Admin</title>
                <meta name='description' content='Reconcile admin Prize Play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <ReconCileContainer />
            </Layout>
        </>
    );
};

export default Page;
