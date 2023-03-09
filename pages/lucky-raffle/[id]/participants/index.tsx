import Layout from 'components/Layout';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const ViewAllParticipantContainer = dynamic(() => import('containers/ViewAllParticipant'));

const Page = () => {
    return (
        <div>
            <Head>
                <title>View All Participant | Prize Play Admin</title>
                <meta name='description' content='Play to earn' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <ViewAllParticipantContainer />
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
