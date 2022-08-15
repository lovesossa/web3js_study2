import './App.css';
import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers'; // модуль для работы c Web3
import TestNFT from 'contracts/TestNFT.sol/TestNFT.json'; // наш сбилженый контракт

function App() {
  const [accounts, setAccounts] = useState([]); // массив подключенных кошельков
  const [mintAmount, setMintAmount] = useState(1); // количество едениц оплаты(возможно товара)

  const TestNFTContractAdress = "0xEE1D29166643102cAc3A8c25d14279EEE0DfA87D"; // Адрес контракта взят из rinkeby etherscan

  const handleConnectAccount = async () => {
    if (!window.ethereum) return;

    const res = await window.ethereum.request({ // запрашиваем id кошелька
      method: "eth_requestAccounts",
    });

    setAccounts(res);

    window.ethereum.on('accountsChanged', (accountsArray) => { // обновляем текущий кошелек, если юзер его изменил (в данном случае нет необходимости)
      setAccounts(accountsArray);
    });
  };

  const handleMint = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum); // подключаемся к сети
    const signer = provider.getSigner(); // получаем данные для подписи контракта
    const contract = new ethers.Contract(TestNFTContractAdress, TestNFT.abi, signer); // инициализируем контракт

    try {
      const response = await contract.mint(BigNumber.from(mintAmount), { // функция mint содержится в нашем контракте, она может называться как угодно. в нее мы передаем количество оплат, и стоимость в value
        value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
      });
      console.log(response); //!
    } catch (error) {
      console.log(error.message); //!
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div className="App">
       <div>
        {!accounts[0]
          && <button type="button" onClick={handleConnectAccount}>Connect account</button>}
       </div>
      {accounts[0] ? (
        <>
          <div>
            <button type="button" onClick={handleDecrement}>-</button>
            <p>Amount: {mintAmount}</p>
            <button type="button" onClick={handleIncrement}>+</button>
          </div>
          <div>
          <br />
          <button type="button" onClick={handleMint}>Mint</button>
          </div>
        </>
      ) : (
        <div><p>You must be connected</p></div>
      )}
    </div>
  );
}

export default App;
