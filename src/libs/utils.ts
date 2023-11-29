/**
 * @dev Fuction to set an error message
 * @param message Error object
 * @returns The error message
 */

import { Signer, ethers } from 'ethers';
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

const approveUSDC = async (spender: string, amount: string, signer: Signer) => {
  const contract = new ContractManager(signer);

  (await contract.getUSDCContract()!).approve(spender, amount);

  const owner = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c';

  const allowance = (await contract.getUSDCContract()).allowance(owner, spender);
  console.log(await allowance);
};

export { createError, depositUSDCFromUnlockedAddress, approveUSDC };
