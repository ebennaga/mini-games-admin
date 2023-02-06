import dynamic from 'next/dynamic';
import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';

const ClientAccountContainer = dynamic(() => import('containers/ClientAccount'), { ssr: false });

const Page = () => {
    return (
        <div>
            <Head>
                <title>Client Account | Prizeplay Admin</title>
                <meta name='description' content='Sign in as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <ClientAccountContainer />
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
