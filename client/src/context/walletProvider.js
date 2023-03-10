import { createContext, useContext, ReactNode, useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import toast from "react-hot-toast";
import { dev } from "../utils/log";
import { DEFAULT_CONTEXT_FUNCTION } from "./common";
// import { BLOCKCHAIN } from "../utils/enums";

// interface EthConnectionProps {
//   provider: ethers.providers.Web3Provider | null
//   signer: ethers.Signer | null
//   signerAddr: string
//   progress: boolean
//   error: boolean
//   connectWallet: () => void
//   disconnectWallet: () => void
//   isConnected: boolean
// }

export const WalletConnectionContext = createContext({
  provider: null,
  signer: null,
  signerAddr: "",
  progress: false,
  error: false,
  connectWallet: DEFAULT_CONTEXT_FUNCTION,
  disconnectWallet: DEFAULT_CONTEXT_FUNCTION,
  isConnected: false
});

export const WalletConnectionProvider = ({ defaultNetwork, children }) => {

  // WEB3
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signerAddr, setSignerAddr] = useState("");
  const [network, setNetwork] = useState(defaultNetwork);
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState(false);
  const [web3Modal] = useState(
    () =>
      new Web3Modal({
        network,
        cacheProvider: true, // very important
        providerOptions: {}
      })
  );

  // Function to start setup
  const setup = useCallback(async (typeOfSetup) => {
    if (typeOfSetup === "connect" || typeOfSetup === "change") { // Handle connecting wallet and contracts
      if (!("ethereum" in window && !!window.ethereum.request)) {
        toast({
          title: "METAMASK NOT FOUND",
          description: "Please install the Metamask extension to continue.",
          status: "error"
        });
      } else {
        try {
          setProgress(true);
          setError(false);

          const [newSignerAddr] = await window.ethereum.request({ method: "eth_requestAccounts" });
          setSignerAddr(newSignerAddr);

          const newProvider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(newProvider);

          const newSigner = newProvider.getSigner();
          setSigner(newSigner);

          toast({
            title: typeOfSetup === "change" ? "ACCOUNT CHANGED" : "WALLET CONNECTED",
            description: typeOfSetup === "change" ? "Switched to another account!" : "Your wallet is connected.",
            status: typeOfSetup === "change" ? "info" : "success"
          });
          dev.log(typeOfSetup === "change" ? "ACCOUNT CHANGED!" : "WALLET CONNECTED");

        } catch (e) {
          setError(true);
          dev.error("ERROR WHILE SETTING UP WALLET", e);
          toast({
            title: "CONNECTION ERROR",
            description: "Your wallet could not be connected! Try again.",
            status: "error"
          });
        } finally {
          setProgress(false);
        }
      }
    } else {
      setProvider(null);
      setSigner(null);
      setSignerAddr("");
      toast({
        title: "WALLET DISCONNECTED",
        description: "Your wallet is now disconnected!",
        status: "warning"
      });
      dev.log("WALLET DISCONNECTED");
    }

  }, [toast])

  // Function that the Connect button will invoke
  const connectWallet = useCallback(async () => {
    try {
      setProgress(true);
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const network = await library.getNetwork();
      console.log('network', network)
      const userAddress = await library.getSigner().getAddress();
      setSignerAddr(userAddress);
      // await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (e) {
      if (e.message === "User rejected the request.") {
        toast({
          title: "REQUEST REJECTED",
          description: "You must accept the connection request!",
          status: "error"
        });
      }
    } finally {
      setProgress(false);
    }
  }, [])

  const disconnectWallet = useCallback(async () => {
    try {
      setProgress(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (e) {
      if (e.message === "User rejected the request.") {
        toast({
          title: "REQUEST REJECTED",
          description: "You must accept the connection request!",
          status: "error"
        });
      }
    } finally {
      setProgress(false);
    }
  }, [])

  // Setup provider and signer update listener
  useEffect(() => {
    const handleAccountChange = async () => {
      const [newSignerAddr] = await window.ethereum?.request({ method: "eth_accounts" });

      if (newSignerAddr !== signerAddr) {
        if (!!newSignerAddr && newSignerAddr !== "") { // New account was selected
          await setup(signerAddr !== "" ? "change" : "connect");

        } else if (!newSignerAddr || newSignerAddr === "") { // All accounts disconnected
          await setup("disconnect");
        }
      }
    }
    window.ethereum?.on("accountsChanged", handleAccountChange);
    return () => { window.ethereum?.removeListener("accountsChanged", handleAccountChange) };
  }, [signerAddr])

  // Handle wallet pre-connection on page load if wallet is already connected
  useEffect(() => {
    (async () => {
      if ("ethereum" in window) {
        const [newSignerAddr] = await window.ethereum?.request({ method: "eth_accounts" });
        if (!!newSignerAddr && newSignerAddr !== "") { // If wallet is pre-connected
          await setup("connect");
        }
      }
    })()
  }, [])

  return (
    <WalletConnectionContext.Provider
      value={{
        provider,
        signer,
        signerAddr,
        progress,
        error,
        connectWallet,
        disconnectWallet,
        isConnected: signerAddr !== ""
      }}>
      {children}
    </WalletConnectionContext.Provider>
  )
}

export const useWalletConnection = () => useContext(WalletConnectionContext);