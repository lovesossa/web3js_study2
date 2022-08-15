**https://docs.google.com/document/d/1fpm8Ss5ZwN9sCi8Xj26q7-vdultOlzPyat1U3cOaxgg/edit#heading=h.3g0hbyopqpz2**
**Заметки:**

npm i -D hardhat
npm i web3
npm i @openzeppelin/contracts
npm i -D dotenv
npm i @nomicfoundation/hardhat-toolbox
npm i @nomiclabs/hardhat-etherscan
-----------
npx hardhat clean
npx hardhat compile
-----
начислить себе ETH - https://rinkebyfaucet.com http://joxi.ru/4AkdvROtjZBwdr

1. npx hardhat run scripts/deployTestNFT.js --network rinkeby
2. получаем id контракта
3. идем на etherscan https://rinkeby.etherscan.io, вставляем поиск id
5. npx hardhat verify --network rinkeby 0xEE1D29166643102cAc3A8c25d14279EEE0DfA87D(id контракта)
6. перезагрузить страницу на etherscan
7. подключиться к кошельку на котором есть деньги, на него будут поступать средства http://joxi.ru/DmB6njECq31qxm
8. включить публичный минт http://joxi.ru/BA0gMl4H16K152, оплатить газ