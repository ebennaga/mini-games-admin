import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const RedemptionContainer = dynamic(() => import('containers/Redemption'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Redemption| Prize Play Admin</title>
                <meta name='description' content='Add client tournaments' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <RedemptionContainer />
            </Layout>
        </>
    );
};

export default Page;
