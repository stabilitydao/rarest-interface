import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { RiWallet3Line } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { injected } from '@/src/connectors';
import { useWeb3React } from '@web3-react/core';
function Navbar() {
    const { activate, active, account, library } = useWeb3React();
    const [Sidebar, setSidebar] = useState<boolean>(false);
    const [Mounted, setMounted] = useState<boolean>(false);
    const { setTheme, systemTheme, theme } = useTheme();
    const [activeRoute, setactiveRoute] = useState<string>('');
    const { pathname } = useRouter();
    useEffect(() => {
        setactiveRoute(pathname);
    }, [pathname]);
    useEffect(() => {
        setMounted(true);
    }, []);
    async function handleWalletConnect() {
        try {
            await activate(injected, undefined, true);
        } catch (err) {
            console.log(err);
        }
    }
    const themeChanger = () => {
        if (!Mounted) return null;
        const currentTheme = theme === 'system' ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <SunIcon
                    className="w-9 h-9 p-1  rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-pink-500 text-white"
                    role="button"
                    onClick={() => {
                        setTheme('light');
                    }}
                />
            );
        } else {
            return (
                <MoonIcon
                    className="w-9 h-9 p-1  rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-pink-500 text-white"
                    role="button"
                    onClick={() => {
                        setTheme('dark');
                    }}
                />
            );
        }
    };
    return (
        <nav className=" dark:bg-cyan-900 bg-white border-b border-gray-500 sticky top-0 z-10">
            <div className="flex flex-row h-20 items-center justify-between px-2 container mx-auto">
                <h1 className="text-3xl">Rarest</h1>
                <ul className="gap-x-6 text-lg font-normal hidden lg:flex">
                    <li>
                        <Link href="/marketplace">
                            <a>Marketplace</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>Collections</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/owned">
                            <a>Owned</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile">
                            <a>Profile</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/createitem">
                            <a>CreateItem</a>
                        </Link>
                    </li>
                </ul>
                <div className=" flex-row gap-x-1 hidden lg:flex p-1 border hover:border-gray-500 hover:bg-white dark:bg-slate-900  rounded-lg">
                    <FiSearch className="text-3xl font-light p-1 text-black dark:text-white  rounded-full" />
                    <input
                        type="text"
                        className="bg-transparent outline-none text-cyan-900 dark:text-white"
                    />
                </div>
                <GiHamburgerMenu
                    className="text-2xl cursor-pointer lg:hidden"
                    onClick={() => {
                        setSidebar(!Sidebar);
                    }}
                />
                <div className=" flex-row gap-x-2 items-center hidden lg:flex">
                    <button
                        className="flex items-center gap-x-1 btn"
                        onClick={handleWalletConnect}
                    >
                        <RiWallet3Line />
                        {active ? (
                            <span>
                                {account?.slice(0, -36)}...
                                {account?.substring(38)}
                            </span>
                        ) : (
                            'Connect Wallet'
                        )}
                    </button>
                    {themeChanger()}
                </div>
            </div>

            <div
                className={`${
                    Sidebar ? 'left-0 ' : '-left-64'
                } w-64 fixed bottom-0 bg-white dark:bg-slate-900 text-cyan-900 dark:text-white top-0 z-30 space-y-10 duration-500`}
            >
                <h1 className="text-3xl ">Rarest</h1>
                <ul className="">
                    <li className="">
                        <Link href="/marketplace">
                            <a
                                className={`p-4 block ${
                                    activeRoute === '/marketplace'
                                        ? 'bg-gradient-to-br text-white  from-sky-400 via-indigo-500 to-pink-500'
                                        : ''
                                }`}
                            >
                                Marketplace
                            </a>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/">
                            <a
                                className={`p-4 block  ${
                                    activeRoute === '/collection'
                                        ? 'bg-gradient-to-br text-white  from-sky-400 via-indigo-500 to-pink-500'
                                        : ''
                                }`}
                            >
                                Collections
                            </a>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/">
                            <a
                                className={`p-4 block  ${
                                    activeRoute === '/owned'
                                        ? 'bg-gradient-to-br text-white  from-sky-400 via-indigo-500 to-pink-500'
                                        : ''
                                }`}
                            >
                                Owned
                            </a>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/">
                            <a
                                className={`p-4 block ${
                                    activeRoute === '/profile'
                                        ? 'bg-gradient-to-br text-white  from-sky-400 via-indigo-500 to-pink-500'
                                        : ''
                                }`}
                            >
                                Profile
                            </a>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/">
                            <a
                                className={`p-4 block ${
                                    activeRoute === '/createitem'
                                        ? 'bg-gradient-to-br text-white  from-sky-400 via-indigo-500 to-pink-500'
                                        : ''
                                }`}
                            >
                                CreateItem
                            </a>
                        </Link>
                    </li>
                </ul>
                <div className=" flex-row gap-x-1 flex p-1 border hover:border-gray-500 hover:bg-white dark:bg-slate-900  rounded-lg">
                    <FiSearch className="text-3xl font-light p-1 text-black dark:text-white  rounded-full" />
                    <input
                        type="text"
                        className="bg-transparent outline-none text-cyan-900 dark:text-white"
                    />
                </div>
                <div className=" flex-row gap-x-2 items-center justify-center flex">
                    <button
                        className="flex items-center gap-x-1 btn"
                        onClick={handleWalletConnect}
                    >
                        <RiWallet3Line />
                        Connect Wallet
                    </button>
                    {themeChanger()}
                </div>
            </div>

            {Sidebar && (
                <div
                    className=" bg-gray-900 opacity-75 inset-0 z-20 fixed lg:hidden"
                    onClick={() => {
                        setSidebar(false);
                    }}
                ></div>
            )}
        </nav>
    );
}

export default Navbar;
