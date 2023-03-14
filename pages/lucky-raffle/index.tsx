import Layout from 'components/Layout';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const LuckyRaffleContainer = dynamic(() => import('containers/LuckyRaffle'));

const Page = () => {
    return (
        <div>
            <Head>
                <title>Lucky Raffle | Prize Play Admin</title>
                <meta name='description' content='Play to earn' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <LuckyRaffleContainer />
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
