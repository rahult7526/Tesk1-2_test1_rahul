require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/0bab49e3e4ba4a8dacb49277e917e004",
      accounts: [`ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`],
    },
  },
  etherscan: {
    apiKey: "X1NPTHJVXPFAGXSZVWJD5C94I21XR3H67K",
  },
};
