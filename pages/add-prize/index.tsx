import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const AddPrizeContainer = dynamic(() => import('containers/AddPrize'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Add Prize | Prize Play Admin</title>
                <meta name='description' content='Sign In as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <AddPrizeContainer />
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
