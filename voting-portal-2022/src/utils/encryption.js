import { JSEncrypt } from "js-encrypt";

import { notBlockChainKey } from "../constants";

export const encryptFunction = (vote) => {
  console.log("Vote   ",vote);
  const publicEncKey = notBlockChainKey;
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicEncKey);
  var encrypted = encrypt.encrypt(vote);
  console.log("Encrypted Vote  ",encrypted);
  return encrypted;
};
