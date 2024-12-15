const { expect } = require("chai");

describe("SmartWallet Contract", function () {
  let SmartWallet;
  let smartWallet;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    SmartWallet = await ethers.getContractFactory("SmartWallet");
    smartWallet = await SmartWallet.deploy();
  });

  it("should deploy the contract successfully", async function () {
    expect(await smartWallet.address).to.be.properAddress;
  });

  it("should allow the owner to deposit funds", async function () {
    const depositAmount = ethers.utils.parseEther("1"); // 1 ETH
    await owner.sendTransaction({
      to: smartWallet.address,
      value: depositAmount,
    });

    const balance = await ethers.provider.getBalance(smartWallet.address);
    expect(balance).to.equal(depositAmount);
  });

  it("should allow the owner to withdraw funds", async function () {
    const depositAmount = ethers.utils.parseEther("1"); // 1 ETH
    await owner.sendTransaction({
      to: smartWallet.address,
      value: depositAmount,
    });

    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);

    const tx = await smartWallet.withdraw(depositAmount);
    await tx.wait();

    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);

    expect(finalOwnerBalance).to.be.above(initialOwnerBalance);
  });
});
