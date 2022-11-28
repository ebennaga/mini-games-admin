import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import dynamic from 'next/dynamic';

const EditPrizeContainer = dynamic(() => import('containers/AddPrize'));

const Page = () => {
    return (
        <>
            <Head>
                <title>Edit Prizes | Prize Play Admin</title>
                <meta name='description' content='Add Product Prize Prize Play' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <EditPrizeContainer statusEdit />
            </Layout>
        </>
    );
};

export default Page;
