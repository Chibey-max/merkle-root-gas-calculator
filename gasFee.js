"use strict";
const provider = new ethers.JsonRpcProvider("https://ethereum.publicnode.com");

async function calculateMyFees() {
    try{
  const myTransaction = {
    to: "0x826BDD3Db3688C48577705382E6A5a9D25b6A366",
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

} catch(error){
console.log(`Error:`,error.message);
}
}

calculateMyFees();
