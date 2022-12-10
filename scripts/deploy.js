// const { ethers } = require("ethers");

const deploy = async () => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contact with the account:", deployer.address);

    const platziPunks = await ethers.getContractFactory("PlatziPunks");
    const deployed = await platziPunks.deploy(10000);

    console.log("Platzi Punks is deployed at:", deployed.address);


};

deploy().then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    proccess.exit(1);
});