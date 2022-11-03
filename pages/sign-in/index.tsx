import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/Layout';

const SignInContainer = dynamic(() => import('containers/SignIn'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Sign In | Prize Play Admin</title>
                <meta name='description' content='Sign In as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout isUserInfo={false}>
                <SignInContainer />
            </Layout>
        </>
    );
};

export default Page;
