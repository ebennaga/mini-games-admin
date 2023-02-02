import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const RolesContainer = dynamic(() => import('containers/Roles'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Setting Roles | Prize Play Admin</title>
                <meta name='description' content='Setting User Roles Prize Play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <RolesContainer />
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
