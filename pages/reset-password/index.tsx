import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ResetPasswordContainer = dynamic(() => import('containers/ResetPassword'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Sign Up | Prize Play Admin</title>
                <meta name='description' content='Sign Up to be admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <ResetPasswordContainer />
            </Layout>
        </>
    );
};

export default Page;
