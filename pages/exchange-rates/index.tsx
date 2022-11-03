import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ExchangeRatesContainer = dynamic(() => import('containers/ExchangeRates'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Exchange | Prize Play Admin</title>
                <meta name='description' content='Sign In as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <ExchangeRatesContainer />
            </Layout>
        </>
    );
};

export default Page;
