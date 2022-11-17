import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalStyles, Slide } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement
} from 'chart.js';
import useAuthReducer from 'hooks/useAuthReducer';
import { wrapper } from 'redux/store';
import Router from 'next/router';
import { SnackbarProvider } from 'notistack';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);

function MyApp({ Component, pageProps }: AppProps) {
    const { user } = useAuthReducer();
    return (
        <>
            {' '}
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                TransitionComponent={Slide}
            >
                <GlobalStyles styles={{ body: { margin: '0 auto !important', color: 'rgba(0, 0, 0, 0.87) !important' } }} />
                <Component userData={user} {...pageProps} />
            </SnackbarProvider>
        </>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }: any) => {
    let pageProps: any = { protectedRoute: false };

    const reduxState = store.getState();
    const userData = reduxState?.webpage?.user?.user?.api_token;
    if (Component?.getPageProps) {
        pageProps = await Component?.getPageProps(ctx);
        if (!userData && pageProps?.protectedRoute) {
            if (ctx.res) {
                // On the server, we'll use an HTTP response to
                // redirect with the status code of our choice.
                // 307 is for temporary redirects.
                ctx.res.writeHead(302, { Location: '/sign-in' });
                ctx.res.end();
            } else {
                // On the client, we'll use the Router-object
                // from the 'next/router' module.
                Router.push('/sign-in');
            }
        }
    }

    // if login page && userData
    if (ctx.pathname === '/sign-in' && userData) {
        if (ctx.res) {
            ctx.res.writeHead(302, { Location: '/' });
            ctx.res.end();
        } else {
            Router.push('/');
        }
    }

    return {
        pageProps,
        userData
    };
});
export default wrapper.withRedux(MyApp);
