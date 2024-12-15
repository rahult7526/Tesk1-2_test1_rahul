import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  it("Should deploy the contract", async function () {
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy();
    await lock.deployed();
    expect(await lock.getAddress()).to.not.equal(0);
  });
});
