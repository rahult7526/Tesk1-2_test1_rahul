const { ethers } = require("hardhat");

async function main() {
  // Replace with your Sepolia account address
  const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  // Get the balance of the address
  const balance = await ethers.provider.getBalance(address);

  // Convert the balance from wei to ether
  console.log("Balance:", ethers.utils.formatEther(balance), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
