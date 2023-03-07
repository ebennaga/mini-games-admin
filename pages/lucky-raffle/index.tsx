import Layout from 'components/Layout';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// eslint-disable-next-line no-unused-vars
const LuckyRaffleContainer = dynamic(() => import('containers/LuckyRaffle'));

const Home = () => {
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

Home.getPageProps = async () => {
    return {
        protectedRoute: true
    };
};

export default Home;
