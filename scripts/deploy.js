// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const NFT = await hre.ethers.getContractFactory("NFT");
  // const nft = await NFT.deploy();
  // await nft.deployed();
  // console.log("nft deployed to:", nft.address);
  
  const BEP20Token = await hre.ethers.getContractFactory("BEP20Token");
  const bEP20Token = await BEP20Token.deploy();
  await bEP20Token.deployed();
  console.log("BEP20Mine deployed to:", bEP20Token.address);

  const InfinityDao = await hre.ethers.getContractFactory("InfinityDAO");
  const infinityDao = await InfinityDao.deploy(bEP20Token.address);
  await infinityDao.deployed();
  console.log("infinityDao deployed to:", infinityDao.address);

  // await hre.run("verify:verify", {
  //   address: infinityDao.address,
  //   contract: "InfinityDao.sol:InfinityDao",
  // });

  // export const busdaddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56"
  let config = `  
  export const infinitydaoaddress = "${infinityDao.address}"
  export const busdaddress = "${bEP20Token.address}"
  `
  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
