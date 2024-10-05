import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Web3 } from "web3";
import ABI from "./abi.mjs";

const address = "0x73dB985b46e326B8626d83671B749034171b3d7F";

function App() {
  const [id, setID] = useState(0);
  const [counter, setCounter] = useState(0);
  //initialize web3
  const web3 = new Web3(window.ethereum);

  async function chainID() {
    const chainId = await web3.eth.getChainId();
    setID(Number(chainId));
    console.log(chainId);
  }

  const contract = new web3.eth.Contract(ABI, address);

  async function getCounter() {
    const result = await contract.methods.getCounter().call();
    console.log(Number(result));
    setCounter(Number(result));
  }

  async function increaseCounter() {
    const accountsConnected = await web3.eth.requestAccounts();
    const txReceipt = contract.methods
      .increaseCounter()
      .send({ from: accountsConnected[0] });
    getCounter();
    console.log(txReceipt);
  }
  async function decreaseCounter() {
    const accountsConnected = await web3.eth.requestAccounts();
    const txReceipt = contract.methods
      .decreaseCounter()
      .send({ from: accountsConnected[0] });
    getCounter();
    console.log(txReceipt);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={chainID}>ChainID is {id}</button>
        <button onClick={() => getCounter()}>Counter</button>
        <p>{counter}</p>
      </div>
      <div className="card">
        <button onClick={increaseCounter}>+</button>
        <button onClick={decreaseCounter}>-</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
