// async function main() {
//     const [deployer] = await ethers.getSigners();
  
//     console.log("Deploying contracts with the account:", deployer.address);
  
//     const MyContract = await ethers.getContractFactory("MyContract");
//     const contract = await MyContract.deploy();
//     console.log("MyContract deployed to:", contract.address);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
  
// async function main() {
//     const [deployer] = await ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);
  
//     const BLS = await ethers.getContractFactory("BLS");
//     const bls = await BLS.deploy();
//     console.log("BLS Token deployed to:", bls.address);
// }
  
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
  
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy BLS token
    const BLS = await ethers.getContractFactory("BLS");
    const bls = await BLS.deploy();
    console.log("BLS Token deployed to:", bls.address);

    // Deploy StBLS contract and pass BLS address to its constructor
    const StBLS = await ethers.getContractFactory("StBLS");
    const stBLS = await StBLS.deploy(bls.address);
    console.log("StBLS (Staked BLS) contract deployed to:", stBLS.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
