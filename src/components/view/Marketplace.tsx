import Hero from "../Hero";
import { FaEthereum, FaHeart } from "react-icons/fa";
function MarketItem() {
  return (
    <div
      className="  rounded-md shadow-2xl group flex-1"
      style={{ minWidth: "288px" }}
    >
      <div className="aspect-square rounded-t-md overflow-hidden">
        <img
          className="h-full w-full object-cover object-center rounded-t-md group-hover:scale-105 duration-500"
          src="https://raroin.creabik.com/assets/img/items/item_4.png"
          alt=""
        />
      </div>
      <div className="p-2 space-y-4">
        <div className="flex justify-between">
          <p>#Rajkumar</p>
          <p className="flex flex-rwo  items-center">
            <FaEthereum className="" />
            00.25 ETH
          </p>
        </div>
        <div className="flex justify-between">
          <button className=" px-4 rounded-full btn py-0">Buy</button>
          <FaHeart className="text-lg" />
        </div>
      </div>
    </div>
  );
}
function Marketplace() {
  return (
    <section>
      <div className="container mx-auto px-2">
        <div className=" py-8 border-b border-gray-500">
          <h1 className=" text-xl font-light ">
            <span className="text-base dark:text-gray-200 ">Home</span>
            &#160;&#160;&#160;&#62;&#160;&#160;&#160;Marketplace
          </h1>
        </div>
        <div className="flex flex-row gap-2 flex-wrap py-5">
          <MarketItem />
          <MarketItem />
          <MarketItem />
          <MarketItem />
        </div>
      </div>
    </section>
  );
}

export default Marketplace;
