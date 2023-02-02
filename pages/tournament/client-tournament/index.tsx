import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ClientTournamentsContainer = dynamic(() => import('containers/ClientTournament'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Client Tournament | Prize Play Admin</title>
                <meta name='description' content='Add client tournaments' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <ClientTournamentsContainer />
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
