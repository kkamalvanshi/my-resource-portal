// hre is Hardhat Runtime Environment-objection containing functionality that Hardhat exposes when running task, test, or script
// writing npx hardhat in beginning gets object built on the fly with hardhat.config.js

// no import like this required: const hre = require("hardhat")

//get rid of auto importing ether statements


const main = async () => {
    //const [owner, randomPerson] = await hre.ethers.getSigners()
    const resourceContractFactory = await hre.ethers.getContractFactory("ResourcePortal"); //Contract name is Wave Portal, don't change
    // compiles contract(WavePortal.sol) and generates files to work with it under artifact directory
   
    const resourceContract = await resourceContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.01"),
        //says go deploy my contract and fund it with 0.1 ETH-removes ETH from wallet and uses it to fund contract
    });
    //deploying contract

    
    // hardhat creates local ethereum network for this contract
    // after script completes, it destroys the local network
    // refreshing local server (blockchain) every time so it is easy to debug errors
    await resourceContract.deployed();
    // wait until contract is deployed to local blockchain
    // constructor runs when deployed

    console.log("Contract address:", resourceContract.address);
    //console.log("Contract deployed to:", resourceContract.address);
    // once deployed to resourceContract.address, it will give address of deployed contract
    // address is how we find contract on blockchain
    //console.log("Contract deployed by:", owner.address);
    // address of person deploying contract

    //get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        resourceContract.address
    );
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    //declaring resourceCount variable = total number of resources
    //let resourceCount;
    //resourceCount = await resourceContract.getTotalResources(); //defining resourceCount
    //console.log(resourceCount.toNumber());

    //defining variable resourceTxn
    //sending a few waves
    let resourceTxn = await resourceContract.resource("Link 1");
    await resourceTxn.wait();

    //let resourceTxn2 = await resourceContract.resource("Link 2");
    //await resourceTxn2.wait();

    //get contract balance to see what happened
    contractBalance = await hre.ethers.provider.getBalance(resourceContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));
    //tests if contract has 0.1 Balance


    //check if resourceCount changed after doing the resource
    //resourceCount = await resourceContract.getTotalResources();

    //const [_, randomPerson] = await hre.ethers.getSigners();
    //making the website multiplayer by adding extra token and player
    //simulating other people hitting our functions
    //resourceTxn = await resourceContract.connect(randomPerson).resource("Another Link");
    //await resourceTxn.wait();

    //resourceCount = await resourceContract.getTotalResources();
    let allResources = await resourceContract.getAllResources();
    console.log(allResources);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
