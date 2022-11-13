FROM node:14.21
WORKDIR /code
RUN chmod 777 /code
COPY ["package.json","init.sh", "./"]
RUN npm install
# RUN chmod 777 /code
# RUN yarn add hardhat -D
# RUN yarn add dotenv -D
# RUN npm install --save-dev @nomicfoundation/hardhat-toolbox
# RUN npm install --save-dev   "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-chai-matchers@^1.0.0" "@nomiclabs/hardhat-ethers@^2.0.0" "@nomiclabs/hardhat-etherscan@^3.0.0" "chai@^4.2.0" "ethers@^5.4.7" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.0" "@typechain/hardhat@^6.1.2" "typechain@^8.1.0" "@typechain/ethers-v5@^10.1.0" "@ethersproject/abi@^5.4.7" "@ethersproject/providers@^5.4.7"
EXPOSE 3000