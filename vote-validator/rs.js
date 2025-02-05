const BlindSignature = require('blind-signatures');

const Bob = {
  key: BlindSignature.keyGeneration({ b: 2048 }), // b: key-length
  blinded: null,
  unblinded: null,
  message: null,
};

const Alice = {
  message: 'Hello Chaum!',
  N: null,
  E: null,
  r: null,
  signed: null,
  unblinded: null,
};

// Alice wants Bob to sign a message without revealing it's contents.
// Bob can later verify he did sign the message

console.log('Message:', Alice.message);

// Alice gets N and E variables from Bob's key
Alice.N = Bob.key.keyPair.n.toString();
Alice.E = Bob.key.keyPair.e.toString();

const { blinded, r } = BlindSignature.blind({
  message: Alice.message,
  N: Alice.N,
  E: Alice.E,
}); // Alice blinds message
Alice.r = r;
console.log("Blinded",blinded,r);

// Alice sends blinded to Bob
Bob.blinded = blinded;

const signed = BlindSignature.sign({
  blinded: Bob.blinded,
  key: Bob.key,
}); // Bob signs blinded message
console.log(signed)

// Bob sends signed to Alice
Alice.signed = signed;

const unblinded = BlindSignature.unblind({
  signed: Alice.signed,
  N: Alice.N,
  r: Alice.r,
}); // Alice unblinds
Alice.unblinded = unblinded;
console.log("Ununblinded")

// Alice verifies
const result = BlindSignature.verify({
  unblinded: Alice.unblinded,
  N: Alice.N,
  E: Alice.E,
  message: Alice.message,
});
console.log(result)
