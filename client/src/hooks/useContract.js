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

  const getBalance = useCallback(async () => {
    if (!contract) return;
    return await contract.getBalance(signerAddr);
  })
  const deposit = useCallback(async (amount) => {
    if (!contract) return;
    return await contract.deposit(amount, { gasLimit: 150000 })
  }, [contract, signerAddr])
  const withdraw = useCallback(async (amount) => {
    if (!contract) return;
    return await contract.withdraw(amount)
  }, [contract, signerAddr])

  return {
    getBalance,
    deposit,
    withdraw
  }
}