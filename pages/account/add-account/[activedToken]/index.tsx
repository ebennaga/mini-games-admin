import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';

const Page = () => {
    const router = useRouter();
    const { activedToken } = router.query;
    return (
        <>
            <Head>
                <title>Activation Account | Prize Play Admin</title>
                <meta name='description' content='Sign In as admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout isUserInfo={false}>{activedToken}</Layout>
        </>
    );
};

export default Page;
