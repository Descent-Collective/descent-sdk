import { ethers } from 'ethers';
import { ISigner } from '../types';

/**
 * This is a contract object that is used to interact with the smart contract.
 * @param {string} provider - The provider to use for the contract.
 * @param {string} contractAddress - The address of the contract.
 * @param {array} abi - The abi of the contract.
 */

export const Contract = (
  contractAddress: string,
  abi: Array<any>,
  signer: ISigner
) => {
  return new ethers.Contract(contractAddress, abi, signer);
};
