import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const AddGamesContainer = dynamic(() => import('containers/AddGame'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Add Game | Prize Play Admin</title>
                <meta name='description' content='Add game prize play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <AddGamesContainer />
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
