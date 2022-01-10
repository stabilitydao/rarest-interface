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
    id: number;
}
function MarketItem({ name, image, price, address, id }: item) {
    const { active, library, account } = useWeb3React();
    const web3 = WEB3();
    const useWeb3 = active ? library : web3;
    async function handleBuy() {
        if (active) {
            const marketContract = new useWeb3.eth.Contract(
                Market,
                nftmarketaddress
            );
            try {
                await marketContract.methods
                    .createMarketSale(address, id)
                    .send({
                        from: account,
                        value: useWeb3.utils.toWei(price, 'ether')
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('PLEASE CONNECT TO WALLET');
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
                    <p className="flex flex-rwo  items-center">
                        <FaEthereum className="" />
                        {price} ETH
                    </p>
                </div>
                <div className="flex justify-between">
                    <button
                        className=" px-4 rounded-full btn py-0"
                        onClick={handleBuy}
                    >
                        Buy
                    </button>
                    <FaHeart className="text-lg" />
                </div>
            </div>
        </div>
    );
}
function Marketplace() {
    const [Items, setItems] = useState<any[]>([]);
    const { active, library } = useWeb3React();
    const web3 = WEB3();
    const useWeb3 = active ? library : web3;
    useEffect(() => {
        const marketContract = new useWeb3.eth.Contract(
            Market,
            nftmarketaddress
        );
        const data = marketContract.methods
            .fetchMarketItems()
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
                                id: resultItem.itemId
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
    }, []);
    return (
        <section>
            <div className="container mx-auto px-2">
                <div className=" py-8 border-b border-gray-500">
                    <h1 className=" text-xl font-light ">
                        <span className="text-base dark:text-gray-200 ">
                            Home
                        </span>
                        &#160;&#160;&#160;&#62;&#160;&#160;&#160;Marketplace
                    </h1>
                </div>
                <div className="flex flex-row gap-2 flex-wrap py-5">
                    {/* {Items?.map((item, index) => {
                        return <MarketItem key={index} {...item} />;
                    })} */}
                </div>
            </div>
        </section>
    );
}

export default Marketplace;
