import { useMemo, useCallback } from 'react';
import { BigNumber, BigNumberish, Contract, ethers } from "ethers";

import { Invest } from '../utils/abi';
import { contractAddress } from '../utils'
import { useWalletConnection } from "../context/walletProvider";

export default function useContract() {
  const { signer, signerAddr, provider } = useWalletConnection();
  const contract = useMemo(() => (
    !!signer && !!provider ? new Contract(contractAddress, Invest, signer) : null
    ), [signer]);
    
    const getBalance = useCallback(async (tokenAddress) => {
      if (!contract) return;
      return await contract.getBalance(tokenAddress);
    }, [contract, signerAddr])
    const getBalanceBnb = useCallback(async () => {
      if (!contract) return;
      return await contract.getBalanceBnb();
    }, [contract, signerAddr])
    const deposit = useCallback(async (amount, tokenAddress) => {
      console.log(signer);
    if (!contract) return;
    //console.log(contract.getSi)
    return await contract.deposit(amount, tokenAddress, {gasLimit: 150000})
  }, [contract, signerAddr])

  const depositBnb = useCallback(async (amount, tokenAddress) => {
    if (!contract) return;
    return await contract.depositBnb( { value: ethers.utils.parseEther(amount), gasLimit: 150000 })
  }, [contract, signerAddr])

  const withdraw = useCallback(async (amount, tokenAddress, native) => {
    if (!contract) return;
    return await contract.withdraw(amount, tokenAddress, native)
  }, [contract, signerAddr])

  return {
    getBalance,
    deposit,
    withdraw,
    depositBnb,
    getBalanceBnb
  }
}