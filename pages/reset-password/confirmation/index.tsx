import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const ResetPasswordConfirmationContainer = dynamic(() => import('containers/ResetPasswordConfirmation'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Sign Up | Prize Play Admin</title>
                <meta name='description' content='Confirmation Account to be admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout isUserInfo={false}>
                <ResetPasswordConfirmationContainer />
            </Layout>
        </>
    );
};

export default Page;
