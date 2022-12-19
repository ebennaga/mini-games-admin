import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const EditBannerContainer = dynamic(() => import('containers/EditBanner'));

const Page = () => {
    return (
        <div>
            <Head>
                <title>Edit Banner</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <EditBannerContainer />
            </Layout>
        </div>
    );
};

export default Page;
