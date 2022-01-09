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
          <link rel="icon" href="/rarest/SIZE-57-FAVICON.png" />
        </Head>
        <div className="font-Roboto dark:text-white bg-orange-300 dark:bg-orange-900">
          <Navbar />
          {children}
        </div>
      </main>
    </ThemeProvider>
  );
}

export default Layout;
