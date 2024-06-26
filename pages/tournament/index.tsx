import dynamic from 'next/dynamic';
import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';

const TournamentsContainer = dynamic(() => import('containers/Tournament'), { ssr: false });

const Page = () => {
    return (
        <div>
            <Head>
                <title>Tournament Admin</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <TournamentsContainer />
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
