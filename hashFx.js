const transactions = [
  "bla bla bla",
  "I just sent 20USD",
  " 20BTC",
  "HELLO",
  `Hello i sent 12USDT`,
  "Hello i sent 12BTC",
];

function getMerkleRoot(array, algoType) {
  if (array.length === 1) return array[0];

  if (array.length % 2 !== 0) {
    array.push(array[array.length - 1]);
  }

  let nextLevel = [];
  for (let i = 0; i < array.length; i += 2) {
    let combined = array[i] + array[i + 1];

    let newHash =
      algoType === "sha256"
        ? ethers.sha256(ethers.toUtf8Bytes(combined))
        : ethers.keccak256(ethers.toUtf8Bytes(combined));

    nextLevel.push(newHash);
  }

  return getMerkleRoot(nextLevel, algoType);
}

async function run() {
  console.log("Starting Transactions:", transactions);

  const shaLeaves = transactions.map((t) =>
    ethers.sha256(ethers.toUtf8Bytes(t)),
  );
  const kecLeaves = transactions.map((t) =>
    ethers.keccak256(ethers.toUtf8Bytes(t)),
  );

  // Calculate
  const shaRoot = getMerkleRoot(shaLeaves, "sha256");
  const kecRoot = getMerkleRoot(kecLeaves, "keccak256");

  console.log("SHA-256 Root:", shaRoot);
  console.log("Keccak-256 Root:", kecRoot);

  // Display on screen 
  document.body.innerHTML += `<p><strong>SHA-256:</strong> ${shaRoot}</p>`;
  document.body.innerHTML += `<p><strong>Keccak-256:</strong> ${kecRoot}</p>`;
}

run();
