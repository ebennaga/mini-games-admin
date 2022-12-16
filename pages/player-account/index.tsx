import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const PlayerAccountContainer = dynamic(() => import('containers/PlayerAccount'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Player Account | Prize Play Admin</title>
                <meta name='description' content='Player Account setting prizeplay admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <PlayerAccountContainer />
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
