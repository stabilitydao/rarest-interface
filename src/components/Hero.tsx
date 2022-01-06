import React from "react";
import { FaEthereum } from "react-icons/fa";
function BidItem() {
  return (
    <div className="relative h-80 text-white  rounded-2xl overflow-hidden hover:-translate-y-2 duration-500">
      <img
        className="object-cover object-center w-full h-full hover:scale-105 duration-500"
        src="https://raroin.creabik.com/assets/img/items/item_4.png"
        alt=""
      />
      <h1 className="absolute left-2 top-2 text-xl">@Rajkumar</h1>
      <div className="absolute flex items-center justify-between left-2 right-2 bottom-4  bg-slate-900 py-3 px-2 rounded-xl">
        <div className="flex items-center">
          <FaEthereum className="text-3xl" />
          <h1>
            Price: <br /> 00.25 ETH
          </h1>
        </div>
        <button className="btn">Place Bid</button>
      </div>
    </div>
  );
}
function Hero() {
  return (
    <section className=" ">
      <div className="container relative mx-auto px-2 pt-20 ">
        <div className="absolute z-0 w-40 sm:w-96 h-96 left-32 bottom-40 lg:bottom-6 rounded-full bg-gradient-to-br from-cyan-800 via-indigo-700 to-pink-700 blur-3xl "></div>
        <div className="absolute z-0 w-40 sm:w-96 h-96 right-32 bottom-6 lg:bottom-6 rounded-full bg-gradient-to-br from-cyan-800 via-indigo-700 to-pink-700 blur-3xl "></div>
        <div className="text-center mb-10">
          <h1 className="text-6xl font-semibold">Discover digital assets</h1>
          <p className="leading-6 pt-6 text-gray-400">
            raroin is a shared liquidity NFT market smart contract
            <br />
            which is used by multiple websites to provide the users
            <br />
            the best possible experience.
          </p>
          <div className="pt-5">
            <button className="btn">View market</button>
          </div>
        </div>

        <div className="p-6 relative shadow-2xl gap-4 dark:bg-cyan-900 bg-white rounded-3xl flex lg:flex-row flex-col justify-around  ">
          <BidItem />
          <BidItem />
          <BidItem />
        </div>
      </div>
    </section>
  );
}

export default Hero;
