import web3 from "./webThree.js";

const instance = new web3.eth.Contract(
  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voterId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "votes",
          "type": "string"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "voterCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "voterList",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "0xd9145CCE52D386f254917e481eB44e9943F39138"
);

export default instance;