import { FaEthereum, FaHeart } from 'react-icons/fa';
import WEB3 from '@/src/functions/web3';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Market from '@/src/abis/Market.json';
import NFT from '@/src/abis/NFT.json';
import { nftmarketaddress } from '@/src/config/';
import axios from 'axios';

interface item {
    name: string;
    image: string;
    price: string;
    address: string;
    itemId: number;
    status: number;
}

function MarketItem({ name, image, price, address, itemId, status }: item) {
    const { active, library, account } = useWeb3React();
    const web3 = WEB3();
    const useWeb3 = active ? library : web3;
    async function handleCancel() {
        if (active) {
            try {
                const marketContract = new useWeb3.eth.Contract(
                    Market,
                    nftmarketaddress
                );
                await marketContract.methods
                    .cancelMarketItem(address, itemId)
                    .send({ from: account });
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div
            className="  rounded-md shadow-2xl group flex-1"
            style={{ maxWidth: '288px' }}
        >
            <div className="aspect-square rounded-t-md overflow-hidden">
                <img
                    className="h-full w-full object-cover object-center rounded-t-md group-hover:scale-105 duration-500"
                    src={image}
                    alt=""
                />
            </div>
            <div className="p-2 space-y-4">
                <div className="flex justify-between">
                    <p>{name}</p>
                    {(function () {
                        if (status == 0) {
                            return (
                                <p className="bg-green-500 px-1 rounded-full text-white">
                                    Active
                                </p>
                            );
                        } else if (status == 1) {
                            return (
                                <p className="bg-indigo-500 px-1 rounded-full text-white">
                                    Sold
                                </p>
                            );
                        } else {
                            return (
                                <p className="bg-red-500 px-1 rounded-full text-white">
                                    Cancelled
                                </p>
                            );
                        }
                    })()}
                </div>
                <div className="flex justify-between">
                    {status != 1 && status != 2 && (
                        <button
                            className=" px-4 rounded-full btn py-0"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                    <FaHeart className="text-lg ml-auto" />
                </div>
            </div>
        </div>
    );
}
function Owned() {
    const [Items, setItems] = useState<any[]>([]);
    const { active, library, account } = useWeb3React();
    const web3 = WEB3();
    const useWeb3 = active ? library : web3;
    useEffect(() => {
        if (active) {
            const marketContract = new useWeb3.eth.Contract(
                Market,
                nftmarketaddress
            );
            marketContract.methods
                .fetchItemsCreated(account)
                .call()
                .then((result: any) => {
                    Promise.all(
                        result.map(async (resultItem: any) => {
                            const tokenContract = new useWeb3.eth.Contract(
                                NFT,
                                resultItem.nftContract
                            );
                            try {
                                const tokenUri = await tokenContract.methods
                                    .tokenURI(resultItem.tokenId)
                                    .call();
                                const metaData = await axios.get(tokenUri);
                                const item = {
                                    name: metaData.data.name,
                                    image: metaData.data.image,
                                    price: useWeb3.utils.fromWei(
                                        resultItem.price.toString(),
                                        'ether'
                                    ),
                                    address: resultItem.nftContract,
                                    itemId: resultItem.itemId,
                                    status: resultItem.status
                                };
                                return item;
                            } catch (err) {
                                console.log(err);
                            }
                        })
                    ).then((items) => {
                        setItems(items);
                    });
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <section>
            <div className="container mx-auto px-2">
                <div className=" py-8 border-b border-gray-500">
                    <h1 className=" text-xl font-light ">
                        <span className="text-base dark:text-gray-200 ">
                            Home
                        </span>
                        &#160;&#160;&#160;&#62;&#160;&#160;&#160;Profile
                    </h1>
                </div>
                {active ? (
                    Items.length !== 0 ? (
                        <div className="flex flex-row gap-2 flex-wrap py-5">
                            {Items?.map((item, index) => {
                                return <MarketItem key={index} {...item} />;
                            })}
                        </div>
                    ) : (
                        <h1>YOU HAVEN"T CREATED ANY NFT</h1>
                    )
                ) : (
                    <h1>
                        PLEASE CONNECT <br /> TO WALLET
                    </h1>
                )}
            </div>
        </section>
    );
}

export default Owned;
