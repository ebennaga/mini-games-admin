import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const AddBannerContainer = dynamic(() => import('containers/AddBanner'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Add Banner | Prize Play Admin</title>
                <meta name='description' content='Sign In as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <AddBannerContainer />
            </Layout>
        </>
    );
};

export default Page;
