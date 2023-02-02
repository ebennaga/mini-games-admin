import dynamic from 'next/dynamic';
import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';

const EditBlogsContainer = dynamic(() => import('containers/EditBlogs'), { ssr: false });

const Page = () => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <EditBlogsContainer />
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
