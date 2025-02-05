import Web3 from "web3";

let web3;
const arr = window.location.href.split("/");
const hostname = arr[0] + "//" + arr[2];

const headers = {
  "Access-Control-Allow-Origin": hostname,
};
//console.log(hostname);
const provider = new Web3.providers.HttpProvider(
  "https://eth-goerli.g.alchemy.com/v2/OhaELp2XHF4F4Yl-GGBUvaeUWPsXLv48",
  headers
);
web3 = new Web3(provider);

export default web3;

// REACT_APP_CONTRACT_PRIVATE_KEY="9f94794beb1b094dfa4dd85f1190703500e5179fe4b53767dcfc785eaa4620b0"
// "https://eth-goerli.g.alchemy.com/v2/OhaELp2XHF4F4Yl-GGBUvaeUWPsXLv48"
// "https://goerli.infura.io/v3/c8d980f0042848f5b4962de0c27bd18b"