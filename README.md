# merkle-root-gas-calculator
Check out my documentation on Hack.MD
https://hackmd.io/@5V8YretiQ7GIXYsAK1IZ2g/SyU7EIRS-g

Logical Flow of this function

The function calculateMyFees() follows a structured try...catch block to handle potential network errors:

*Fetch Fee Data: Calls provider.getFeeData() to get the current market price of gas.

*Estimate Gas Units: Calls provider.estimateGas(myTransaction). This simulates the transaction to see how many "units" of gas it will consume (typically 21,000 for a simple transfer).

*Calculate Total: Multiplies the units by the price.

*Format and Display: Converts the raw numbers (Wei) into human-readable formats (Gwei and ETH).