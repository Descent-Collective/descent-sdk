/**
 * @dev Fuction to set an error message
 * @param message Error object
 * @returns The error message
 */

import { Signer, ethers } from 'ethers';
import ContractManager from '../contracts';
import { Transaction } from './transactions';
import { Internal } from './internal';
import { getContractAddress } from '../contracts/getContractAddresses';
import { USDC__factory } from '../generated';

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

const approveUSDC = async (
  spender: string,
  amount: string,
  signer: Signer,
  transaction: Transaction,
  internal: Internal,
) => {
  const contract = new ContractManager(signer);

  const chainId = (await signer?.provider?.getNetwork())?.chainId.toString();

  const owner = await signer.getAddress();

  // build transaction object
  const to: any = getContractAddress('USDC')[chainId!];
  let iface = internal.getInterface(USDC__factory.abi);
  const data = iface.encodeFunctionData('approve', [spender, amount]);

  const txConfig = await internal.getTransactionConfig({
    from: owner,
    to,
    data: data,
  });

  await transaction.send(txConfig, {});

  const allowance = (await contract.getUSDCContract()).allowance(owner, spender);
  await waitTime(50);
};

const waitTime = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const updateTestPrice = async (signer: Signer) => {
  const chainId = (await signer?.provider?.getNetwork())?.chainId.toString();

  const collateralAddress: any = getContractAddress('USDC')[chainId!];
  const feedContractAddress: any = getContractAddress('Feed')[chainId!];
  const contract = new ContractManager(signer);

  await (await contract.getVaultContract()).updateFeedContract(feedContractAddress);

  await waitTime(50);

  const price = BigInt(1100) * BigInt(1e6);

  const priceUpdate = (await contract.getFeedContract()).mockUpdatePrice(collateralAddress, price);
  (await priceUpdate).wait();

  await waitTime(50);
};

export { createError, depositUSDCFromUnlockedAddress, approveUSDC, waitTime, updateTestPrice };
