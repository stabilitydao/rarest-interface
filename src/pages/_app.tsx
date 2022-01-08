import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

function MyApp({ Component, pageProps }: AppProps) {
    function getLibrary(provider: any) {
        return new Web3(provider);
    }
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Web3ReactProvider>
    );
}
export default MyApp;
