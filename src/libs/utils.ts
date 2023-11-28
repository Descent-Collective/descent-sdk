/**
 * @dev Fuction to set an error message
 * @param message Error object
 * @returns The error message
 */

import { ethers } from 'ethers';
import ContractManager from '../contracts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createError = (message?: any) => {
  const defaultMsg =
    message && typeof message === 'string'
      ? message
      : 'Something went wrong. Please try again later.';

  const contractErrorMessage =
    message?.error?.body && JSON.parse(message?.error?.body)?.error?.message;

  const systemMessage = message?.errorArgs?.[0];

  const contractRevertErrorMessage =
    message?.error?.error?.body && JSON.parse(message?.error?.error?.body)?.error?.message;

  return new Error(
    contractErrorMessage || contractRevertErrorMessage || systemMessage || defaultMsg,
  );
};

const depositUSDCFromUnlockedAddress = (
  recipient: string,
  unlockedAddress: string,
  contract: ContractManager,
) => {};

const approveUSDC = async (spender: string, amount: string, rpcUrl: string) => {
  console.log(rpcUrl, 'rpc');
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const _amount = ethers.formatEther(amount);

  const contract = new ContractManager(provider);
  (await contract.getUSDCContract()!).approve(spender, _amount);
};

export { createError, depositUSDCFromUnlockedAddress, approveUSDC };
