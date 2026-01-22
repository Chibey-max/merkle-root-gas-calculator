"use strict";
import SHA256 from "crypto-js/sha256.js";
import SHA3 from "crypto-js/sha3.js";

function createHash(data, algorithm) {
  if (algorithm === "sha256") {
    return SHA256(data).toString();
  } else if (algorithm === "keccak256") {
    return SHA3(data, { outputLength: 256 }).toString();
  }
}

function getMerkleRoot(transactionList, algo) {
  let currentLevel = transactionList.map((tx) => createHash(tx, algo));

  // Hash 
  console.log("Leaf hashes:");
  transactionList.forEach((tx, idx) => {
    console.log(`  [${idx}] ${tx} -> ${currentLevel[idx]}`);
  });

  while (currentLevel.length > 1) {
    if (currentLevel.length % 2 !== 0) {
      currentLevel.push(currentLevel[currentLevel.length - 1]);
    }

    let nextLevel = [];

    for (let i = 0; i < currentLevel.length; i += 2) {
      let left = currentLevel[i];
      let right = currentLevel[i + 1];

      let parentHash = createHash(left + right, algo);
      nextLevel.push(parentHash);
    }

    currentLevel = nextLevel;
  }

  return currentLevel[0];
}

const transactions = ["Sent 50USD", "1C", " Sent 1200NGN", "2000USDT"];

console.log("Transactions:", transactions);
console.log("-----------------------------------------");

const shaRoot = getMerkleRoot(transactions, "sha256");
console.log("SHA-256 Merkle Root:", shaRoot);

const keccakRoot = getMerkleRoot(transactions, "keccak256");
console.log("Keccak-256 Merkle Root:", keccakRoot);
