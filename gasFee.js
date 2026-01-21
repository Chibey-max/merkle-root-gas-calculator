import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://cloudflare-eth.com");

async function calculateMyFees() {
  const myTransaction = {
    to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    value: ethers.parseEther("0.01"),
  };

  const feeData = await provider.getFeeData();
  const currentPrice = feeData.gasPrice;

  const unitsNeeded = await provider.estimateGas(myTransaction);

  const totalFeeInWei = unitsNeeded * currentPrice;

  const finalAmount = ethers.formatEther(totalFeeInWei);

  console.log(`Work needed: ${unitsNeeded} units`);
  console.log(
    `Price per unit: ${ethers.formatUnits(currentPrice, "gwei")} Gwei`,
  );
  console.log(`Total you will pay: ${finalAmount} ETH`);
}

calculateMyFees();
