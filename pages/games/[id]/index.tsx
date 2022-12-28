import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const GameDetailContainer = dynamic(() => import('containers/GameDetail'), { ssr: false });

const Page = () => {
    return (
        <>
            <Head>
                <title>Game Detail | Prize Play Admin</title>
                <meta name='description' content='Detail games in prize play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <GameDetailContainer />
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
