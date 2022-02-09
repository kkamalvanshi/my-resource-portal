// SPDX-License-Identifier: UNLICENSED
// used to identify the license

//later, make same project but to get funny videos

pragma solidity ^0.8.0;
// choosing version 0.8.0 of the Solidity Compiler, nothing lower

import "hardhat/console.sol";
// helps do console logs and helps debug smart contracts

contract ResourcePortal {
    // updated contract to store resources
    uint256 totalResources; //private variable

    //seed helps generate random number
    uint256 private seed;

    event NewResource(address indexed from, uint256 timestamp, string message);
    
    //struct: custom datatype where we can customize what we want to hold in it
    struct Resource {
        address waver; //address of user who waved
        string message;
        uint256 timestamp;
    }

    Resource[] resources;


    //associating address with number. Storing address with last time user waved at us
    mapping(address => uint256) public lastWavedAt;

    constructor() payable{
        console.log("Yo yo, I am a smart contract");

        //setting initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }



    //functions available on the public blockchain since function has public keyword

    //function syntax in solidity
    //added totalResources variable automatically initialized to 0
    //_message is what user sends from frontend
    function resource(string memory _message) public {

        //make sure current time stamp is 15 minutes bigger than last time
        require(lastWavedAt[msg.sender] + 15 seconds < block.timestamp, "Wait 15m");

        //update current timestamp we have for user
        lastWavedAt[msg.sender] = block.timestamp;

        totalResources += 1;
        console.log("%s has sent a resource w/ message %s", msg.sender, _message);
        //msg.sender is wallet address of person who called the function
        //we know who called the function
        resources.push(Resource(msg.sender, _message, block.timestamp));


        seed = (block.difficulty + block.timestamp + seed) % 100;
        //block.difficulty tells miners how hard block will be to mine transactions
        //block.timestamp-timestamp block is being processed
        if (seed <= 5) {
            console.log("%s won!", msg.sender);


            //seed has less than 5 percent chance to win
            uint256 prizeAmount = 0.0001 ether;

            //address(this).balance is is balance of the contract
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}(""); //where we send money
            require(success, "Failed to withdraw money from contract.");
            //require checks to see if some condition is true otherwise, cancel the transaction
        }

        //calling constructer NewResource
        emit NewResource(msg.sender, block.timestamp, _message);
    
    }

    //function getAllWaves returns struct array, resources
    //makes it easier to retrieve from website
    function getAllResources() public view returns (Resource[] memory) {
        return resources;
    }

    function getTotalResources() public view returns (uint256) {
        //console.log("We have %d total resources!", totalResources);
        return totalResources;
    }
}
