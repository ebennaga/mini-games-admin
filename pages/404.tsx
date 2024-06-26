import Layout from 'components/Layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const NotFoundContainer = dynamic(() => import('containers/NotFound'));

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Prize Play Admin</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <NotFoundContainer />
            </Layout>
        </div>
    );
};

export default Home;
