import { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from 'next-themes';
import { useWeb3React } from '@web3-react/core';
import { injected } from '@/src/connectors/';
function Layout({ children }: { children: React.ReactNode }) {
    const { active, activate } = useWeb3React();
    useEffect(() => {
        activate(injected, undefined, true)
            .then()
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <main className="">
                <Head>
                    <title>Rarest</title>
                    <meta name="description" content="Nft marketplace" />
                    <link rel="icon" href="/rarest/SIZE-57-FAVICON.png" />
                </Head>
                <div className="font-Roboto text-cyan-900 dark:text-white bg-white dark:bg-slate-900">
                    <Navbar />
                    {children}
                </div>
            </main>
        </ThemeProvider>
    );
}

export default Layout;
