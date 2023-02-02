import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ProductPrizesContainer = dynamic(() => import('containers/ProductPrizes'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Product Prize | Prize Play Admin</title>
                <meta name='description' content='Sign In as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <ProductPrizesContainer />
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
