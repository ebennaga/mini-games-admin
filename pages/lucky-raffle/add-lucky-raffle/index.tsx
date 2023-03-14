import Layout from 'components/Layout';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const AddLuckyRaffleContainer = dynamic(() => import('containers/AddLuckyRaffle'));

const Page = () => {
    return (
        <div>
            <Head>
                <title>Add Lucky Raffle | Prize Play Admin</title>
                <meta name='description' content='Play to earn' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <AddLuckyRaffleContainer />
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
