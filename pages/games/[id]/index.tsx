import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const GameDetailContainer = dynamic(() => import('containers/GameDetail'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Game Detail | Prize Play Admin</title>
                <meta name='description' content='Setting games in prize play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <GameDetailContainer />
            </Layout>
        </>
    );
};

export default Page;
