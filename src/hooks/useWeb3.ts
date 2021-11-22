import Web3 from "web3";
import { useEffect, useState } from "react";

const useWeb3 = () => {
  const [web3State, setWeb3State] = useState(null);

  const initWeb3 = async () => {
    let web3;
    if ((window as any).ethereum) {
      web3 = new Web3((window as any).ethereum);
      try {
        // Request account access if needed
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        // Accounts now exposed
        setWeb3State(web3);
      } catch (error) {
        console.log(error);
      }
    }
    // Legacy dapp browsers...
    else if ((window as any).web3) {
      // Use Mist/MetaMask's provider.
      web3 = (window as any).web3;
      setWeb3State(web3);
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      web3 = new Web3(provider);
      setWeb3State(web3);
    }
  };

  useEffect(() => {
    initWeb3();
  }, []);

  return web3State;
};

export default useWeb3;
