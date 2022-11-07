import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const BannerContainer = dynamic(() => import('containers/Banner'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Banner | Prize Play Admin</title>
                <meta name='description' content='Sign In as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <BannerContainer />
            </Layout>
        </>
    );
};

export default Page;
