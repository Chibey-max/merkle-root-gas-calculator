import { ethers } from "ethers";

// 1. Connect to the Ethereum Network (The "World Computer")
const provider = new ethers.JsonRpcProvider("https://cloudflare-eth.com");

async function calculateMyFees() {
  // 2. Define a simple transaction (Sending some ETH)
  const myTransaction = {
    to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    value: ethers.parseEther("0.01"),
  };

  // 3. Get the "Gas Price" (How much 1 unit of work costs right now)
  const feeData = await provider.getFeeData();
  const currentPrice = feeData.gasPrice;

  // 4. Get the "Gas Limit" (How many units of work this specific task needs)
  const unitsNeeded = await provider.estimateGas(myTransaction);

  // 5. The Math: Units * Price
  const totalFeeInWei = unitsNeeded * currentPrice;

  // 6. Turn the result into a human-readable number (ETH)
  const finalAmount = ethers.formatEther(totalFeeInWei);

  console.log(`Work needed: ${unitsNeeded} units`);
  console.log(
    `Price per unit: ${ethers.formatUnits(currentPrice, "gwei")} Gwei`,
  );
  console.log(`Total you will pay: ${finalAmount} ETH`);
}

calculateMyFees();
