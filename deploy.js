const main = async () => {
    //const [deployer] = await hre.ethers.getSigners();
    //const accountBalance = await deployer.getBalance();

    //console.log("Deploying contracts with account: ", deployer.address);
    //console.log("Account balance: ", accountBalance.toString());

    const resourceContractFactory = await hre.ethers.getContractFactory("ResourcePortal");
    const resourceContract = await resourceContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    await resourceContract.deployed();

    console.log("ResourcePortal address: ", resourceContract.address)
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
