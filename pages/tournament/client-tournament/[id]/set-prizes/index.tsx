import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const SetPrizesContainer = dynamic(() => import('containers/SetPrizes'), { ssr: false });

const Page = () => {
    return (
        <>
            <Head>
                <title>Client Tournament Detail | Prize Play Admin</title>
                <meta name='description' content='Detail client tournament' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <SetPrizesContainer />
            </Layout>
        </>
    );
};

export default Page;
