import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import WEB3 from '@/src/functions/web3';
import { useRouter } from 'next/router';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { nftmarketaddress, nftaddress } from '@/src/config/';
import Market from '@/src/abis/Market.json';
import NFT from '@/src/abis/NFT.json';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
interface form {
    name: string;
    description: string;
    price: any;
}
function Owned() {
    const router = useRouter();
    const [fileUrl, setFileUrl] = useState<string>('');
    const [formInput, updateFormInput] = useState<form>({
        name: '',
        description: '',
        price: 0
    });
    const web3 = WEB3();
    const { active, account, library } = useWeb3React();
    const useWeb3 = active ? library : web3;
    async function handleInput(e: any) {
        const file = e.target.files[0];
        try {
            const added = await client.add(file, {
                progress: (prog) => console.log(`received: ${prog}`)
            });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setFileUrl(url);
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }
    async function createMarket() {
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) return;
        const data = JSON.stringify({
            name,
            description,
            image: fileUrl
        });
        try {
            const added = await client.add(data);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            createitem(url);
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }

    async function createitem(url: string) {
        if (!active) return;
        console.log('WORKING');
        const nftContract = new useWeb3.eth.Contract(NFT, nftaddress);
        const marketContract = new useWeb3.eth.Contract(
            Market,
            nftmarketaddress
        );
        try {
            const res = await nftContract.methods
                .createToken(url.toString())
                .send({ from: account });
            const tokenId = res.events.Transfer.returnValues.tokenId;
            const price = useWeb3.utils.toWei(formInput.price, 'ether');
            const listingPrice = await marketContract.methods
                .getListingPrice()
                .call();
            await marketContract.methods
                .createMarketItem(nftaddress, tokenId, price)
                .send({ from: account, value: listingPrice });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section>
            <div className="container mx-auto px-2">
                <div className=" py-8 border-b border-gray-500">
                    <h1 className=" text-xl font-light ">
                        <span className="text-base dark:text-gray-200 ">
                            Home
                        </span>
                        &#160;&#160;&#160;&#62;&#160;&#160;&#160;Create Item
                    </h1>
                </div>

                <section className="max-w-4xl p-6 mx-auto rounded-md shadow-2xl ">
                    <h2 className="text-lg font-semibold  capitalize ">
                        Create Item
                    </h2>

                    <form>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-200"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    onChange={(e) =>
                                        updateFormInput({
                                            ...formInput,
                                            name: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-200"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    onChange={(e) =>
                                        updateFormInput({
                                            ...formInput,
                                            description: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-200"
                                    htmlFor="price"
                                >
                                    Price
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    onChange={(e) =>
                                        updateFormInput({
                                            ...formInput,
                                            price: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-200"
                                    htmlFor="file"
                                >
                                    Select
                                </label>
                                <input
                                    id="file"
                                    type="file"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    onChange={handleInput}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                type="button"
                                onClick={createMarket}
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    );
}

export default Owned;
