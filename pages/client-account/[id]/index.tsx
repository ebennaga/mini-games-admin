import dynamic from 'next/dynamic';
import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';

const EditClientAccountContainer = dynamic(() => import('containers/EditClientAccount'), { ssr: false });

const Page = () => {
    return (
        <div>
            <Head>
                <title>Detail Client Account</title>
                <meta name='description' content='Detail Client Account' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <EditClientAccountContainer />
            </Layout>
        </div>
    );
};

Page.getPageProps = async () => {
    return {
        protectedRoute: true
    };
};

export default Page;
