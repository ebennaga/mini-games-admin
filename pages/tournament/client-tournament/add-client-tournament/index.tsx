import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const AddClientTourContainer = dynamic(() => import('containers/AddClientTour'), { ssr: false });

const Page = () => {
    return (
        <>
            <Head>
                <title>Create Client Tournament | Prize Play Admin</title>
                <meta name='description' content='Create client tournament' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <AddClientTourContainer />
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
