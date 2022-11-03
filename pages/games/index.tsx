import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const GamesContainer = dynamic(() => import('containers/Games'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Games | Prize Play Admin</title>
                <meta name='description' content='Setting games in prize play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <GamesContainer />
            </Layout>
        </>
    );
};

export default Page;
