const { increaseTo } = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time");
const { expect } = require("chai");

describe('PlatziPunk Contract', () => {
    const setup = async ({ maxSupply = 1000 } = {}) => {
        const [owner] = await ethers.getSigners();
        const PlatziPunks = await ethers.getContractFactory("PlatziPunks");
        const deployed = await PlatziPunks.deploy(maxSupply);

        return {
            owner,
            deployed,
        };
    };
    describe('Deployment', () => {
        it("Sets max supply to passed param", async () => {
            const maxSupply = 10000;

            const { deployed } = await setup({ maxSupply });

            const returnedMaxSupply = await deployed.maxSupply();
            expect(maxSupply).to.equal(returnedMaxSupply);

        });
    });

    describe("Minting", () => {
        it("Mints a new token and assigns to owner", async() =>{
            
            const { owner, deployed } = await setup();
            await deployed.mint();
            const ownerOfMinted = await deployed.ownerOf(0);
            expect(ownerOfMinted).to.equal(owner.address);
        });

        it("has a minting limit", async () => {
            const maxSupply = 2;

            const { deployed } = await setup({
                maxSupply,
            });
            //Mint all
            await Promise.all(new Array(2).fill().map(() => deployed.mint()));

            //test last minting
            await expect(deployed.mint()).to.be.revertedWith(
                "No platziPunks left :("
            );
        });
    }); 
    
    describe("TokenURI", () => {
        it("returns valid metadata", async () => {
            const { deployed } = await setup();

            await deployed.mint();
            const tokenURI = await await deployed.tokenURI(0);
            const stringifiedTokeURI = await tokenURI.toString();
            const [, base64JSON]= stringifiedTokeURI.split(
                "data:application/json;base64,"
            );
            const stringifiedMetadata = await Buffer.from(
                base64JSON,
                "base64"
            ).toString("ascii");
            const metadata = JSON.parse(stringifiedMetadata);

            expect(metadata).to.have.all.keys("name", "description","image");            
        });
    });
});
