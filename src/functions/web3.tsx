import Web3 from "web3";

function WEB3() {
  return new Web3(
    new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/f89b8f00bbdb483bac37924a489bd352`
    )
  );
}
export default WEB3;
