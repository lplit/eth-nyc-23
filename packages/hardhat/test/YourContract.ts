// Import the required libraries
import { expect } from "chai";
import { ethers } from "hardhat";

// Use describe to group your tests
describe("Crowdfunding", function () {
  it.skip("Should deploy YourContract", async function () {
    // Get the ContractFactory and Signers here.
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy();
    
    await crowdfunding.deployed();
    
    // Test that the address of yourContract is not empty
    expect(crowdfunding.address).to.not.equal(ethers.constants.AddressZero);
  });
});