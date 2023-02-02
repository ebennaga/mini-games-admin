import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ExchangeRatesDetailContainer = dynamic(() => import('containers/ExchangeRatesDetail'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Exchange Rate Detail | Prize Play Admin</title>
                <meta name='description' content='Update Exchange Rate' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <ExchangeRatesDetailContainer />
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
