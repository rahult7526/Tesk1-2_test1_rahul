// const { expect } = require("chai");

// describe("MyContract", function () {
//   let contract;

//   beforeEach(async function () {
//     const MyContract = await ethers.getContractFactory("MyContract");
//     contract = await MyContract.deploy();
//   });

//   it("Should set and get the value correctly", async function () {
//     await contract.set(42);
//     expect(await contract.get()).to.equal(42);
//   });
// });
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StBLS Contract", function () {
    let BLS;
    let StBLS;
    let bls;
    let stBLS;
    let owner;
    let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // Deploy BLS Token
        BLS = await ethers.getContractFactory("BLS");
        bls = await BLS.deploy();

        // Deploy StBLS Token with the address of deployed BLS token
        StBLS = await ethers.getContractFactory("StBLS");
        stBLS = await StBLS.deploy(bls.address);
    });

    it("Should deploy BLS token and StBLS token", async function () {
        expect(await bls.name()).to.equal("Blume Liquid Staking");
        expect(await stBLS.name()).to.equal("Staked Blume Liquid Staking");
    });

    it("Should allow users to stake BLS tokens", async function () {
        // Mint BLS tokens to addr1
        await bls.mint(addr1.address, ethers.utils.parseUnits("1000", 18));
        
        // Approve the StBLS contract to transfer BLS tokens
        await bls.connect(addr1).approve(stBLS.address, ethers.utils.parseUnits("500", 18));

        // Stake 500 BLS tokens
        await stBLS.connect(addr1).stake(ethers.utils.parseUnits("500", 18));

        expect(await stBLS.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("500", 18));
    });

    it("Should allow users to unstake BLS tokens", async function () {
        // Mint BLS tokens and approve staking
        await bls.mint(addr1.address, ethers.utils.parseUnits("1000", 18));
        await bls.connect(addr1).approve(stBLS.address, ethers.utils.parseUnits("500", 18));

        // Stake tokens
        await stBLS.connect(addr1).stake(ethers.utils.parseUnits("500", 18));

        // Unstake 500 BLS tokens
        await stBLS.connect(addr1).unstake(ethers.utils.parseUnits("500", 18));

        expect(await stBLS.balanceOf(addr1.address)).to.equal(0);
    });

    it("Should revert unstake if balance is insufficient", async function () {
        await expect(stBLS.connect(addr1).unstake(ethers.utils.parseUnits("100", 18)))
            .to.be.revertedWith("Insufficient stBLS balance");
    });
});
