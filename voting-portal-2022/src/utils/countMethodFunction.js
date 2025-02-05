import election from "../ethereum/election";
import web3 from "../ethereum/webThree";
import { publicKey, privateKey, contractAddress } from "../constants";
import { encryptFunction } from "./encryption";

import { Transaction } from "@ethereumjs/tx";
import Common, { Chain } from "@ethereumjs/common";

export const countVotes = async () => {
  const counts = await election.methods.voterCount().call();
  console.log(counts);
};

const getTransactionCount = (votes, voterId) => {
  return new Promise((resolve, reject) => {
    const functionAbi = election.methods.store(voterId, votes).encodeABI();
    const common = new Common({ 
      chain: Chain.Goerli
    });
    web3.eth.getTransactionCount(publicKey, function (err, nonce) {
      var details = {
        from: publicKey,
        nonce: nonce,
        gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
        gasLimit: 500000,
        to: contractAddress,
        value: 0,
        data: functionAbi,
      };

      var tx = Transaction.fromTxData(details, { common });
      const signedTx = tx.sign(Buffer.from(privateKey, "hex"));
      var serializedTx = signedTx.serialize();

      web3.eth
        .sendSignedTransaction("0x" + serializedTx.toString("hex"))
        .on("receipt", (data) => resolve(data))
        .on("error", (err) => reject(err));
    });

  });
};

export const methodFunction = async (unEncryptedVotes, voterId) => {
  // const votes = "1,2,32,67";
  //const voterId = "93472";

  const votes = encryptFunction(unEncryptedVotes);
  //console.log("encrypted votes", votes);
  const data = await getTransactionCount(votes, voterId);
  // console.log(data);
  return data;
};
