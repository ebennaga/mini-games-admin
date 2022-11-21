import Layout from 'components/Layout';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const ParticipantTournamentContainer = dynamic(() => import('containers/ParticipantTournament'));

const ParticipantTournament = () => {
    return (
        <div>
            <Head>
                <title>Participant Tournament | Prize Play Admin</title>
                <meta name='description' content='Dashboard Participant Tournament Prize Play Admin' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <ParticipantTournamentContainer />
            </Layout>
        </div>
    );
};

ParticipantTournament.getPageProps = async () => {
    return {
        protectedRoute: true
    };
};

export default ParticipantTournament;
