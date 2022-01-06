import Head from "next/head";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <main className="">
        <Head>
          <title>Rarest</title>
          <meta name="description" content="Nft marketplace" />
          <link rel="icon" href=".png" />
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
