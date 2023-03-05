import { Contract } from "ethers";
import { useCallback, useMemo } from "react";

import { Erc20 } from "../utils/abi";

export default function useErc20(erc20Address, signer) {
  const contract = useMemo(() => (new Contract(erc20Address, Erc20, signer)), [erc20Address, signer]);
  const getRetrieveTokenSymbol = useCallback(async () => {
    return await contract._symbol();
  })
  const getRetrieveTokenDecimal = useCallback(async () => {
    return await contract._decimals();
  })
  const getRetrieveTokenBalance = useCallback(async (account) => {
    return await contract.balanceOf(account);
  })
  // const approve = useCallback(async (spender, amount) => {
  //   return await contract.approve(spender, amount)
  // })
  const approve = async (spender, amount) => {
    return await contract.approve(spender, amount)
  };
  return {
    getRetrieveTokenSymbol,
    getRetrieveTokenDecimal,
    getRetrieveTokenBalance,
    approve,
  }
}

