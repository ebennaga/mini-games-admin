import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyles styles={{ body: { margin: '0 auto !important', color: 'rgba(0, 0, 0, 0.87) !important' } }} />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
