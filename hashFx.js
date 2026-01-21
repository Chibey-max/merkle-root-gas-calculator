// 1. Our "Local" Data (No JSON file needed!)
const transactions = [
  "Jason sent 10NGN",
  "Alex sent 10NGN",
  "Richard sent 10NGN",
  "Jay sent 10NGN",
  `Hello i sent 12n`,
  "hello i sent 12NGN",
];

// 2. The Merkle Logic
function getMerkleRoot(array, algoType) {
  // Base case: if we are at the top of the pyramid
  if (array.length === 1) return array[0];

  // If odd, duplicate the last item
  if (array.length % 2 !== 0) {
    array.push(array[array.length - 1]);
  }

  let nextLevel = [];
  for (let i = 0; i < array.length; i += 2) {
    // Combine pairs
    let combined = array[i] + array[i + 1];

    // Hash them using ethers
    let newHash =
      algoType === "sha256"
        ? ethers.sha256(ethers.toUtf8Bytes(combined))
        : ethers.keccak256(ethers.toUtf8Bytes(combined));

    nextLevel.push(newHash);
  }

  return getMerkleRoot(nextLevel, algoType);
}

// 3. Running the code when the page loads
async function run() {
  console.log("Starting Transactions:", transactions);

  // Turn strings into initial hashes (Leaves)
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
