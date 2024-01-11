import {
  AddressLike,
  BytesLike,
  Signer,
  ethers,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from 'ethers';
import { getContractAddress } from '../contracts/getContractAddresses';
import {
  Currency__factory,
  MultiStaticcall__factory,
  USDC__factory,
  VaultGetters__factory,
  Vault__factory,
} from '../generated';
import { Internal } from '../libs/internal';
import { ICollateral, IContract, ISigner } from '../types';
import { Contract } from '../contracts';
import { Transaction } from '../libs/transactions';

export type StaticcallStruct = { target: AddressLike; callData: BytesLike };

const approveCollateralToken = async (
  collateral: ICollateral,
  owner: string,
  amount: string,
  chainId: string,
  internal: Internal,
  transaction: Transaction,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultAddress: any = getContractAddress('Vault')[chainId];
  const _amount = parseUnits(amount, 6);

  // build transaction object
  let iface = internal.getInterface(USDC__factory.abi);
  const data = iface.encodeFunctionData('approve', [vaultAddress, _amount]);

  const txConfig = await internal.getTransactionConfig({
    from: owner,
    to: collateralAddress,
    data: data,
  });

  const result = await transaction.send(txConfig, {});
  return result;
};

const approveCurrencyToken = async (
  owner: string,
  amount: string,
  chainId: string,
  internal: Internal,
  transaction: Transaction,
) => {
  const currnecyAddress: any = getContractAddress('Currency')[chainId];
  const vaultAddress: any = getContractAddress('Vault')[chainId];
  const _amount = parseEther(amount);

  // build transaction object
  let iface = internal.getInterface(Currency__factory.abi);
  const data = iface.encodeFunctionData('approve', [vaultAddress, _amount]);

  const txConfig = await internal.getTransactionConfig({
    from: owner,
    to: currnecyAddress,
    data: data,
  });

  const result = await transaction.send(txConfig, {});
  return result;
};

const getCurrencyTokenBalance = async (owner: string, chainId: string, signer: Signer) => {
  const currencyContractAddress: any = getContractAddress('Currency')[chainId];

  const currencyContract = Contract(currencyContractAddress, Currency__factory.abi, signer);
  const balance = await currencyContract.balanceOf(owner);
  const formattedBalance = formatEther(balance);
  return formattedBalance;
};

const getCollateralTokenBalance = async (
  collateral: ICollateral,
  owner: string,
  chainId: string,
  signer: Signer,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];

  const collateralContract = Contract(collateralAddress, USDC__factory.abi, signer);
  const balance = await collateralContract.balanceOf(owner);
  const formattedBalance = formatUnits(balance, 6);
  return formattedBalance;
};

const getCollateralTokenAllowance = async (
  collateral: ICollateral,
  owner: string,
  chainId: string,
  signer: Signer,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultAddress: any = getContractAddress('Vault')[chainId];

  const collateralContract = Contract(collateralAddress, USDC__factory.abi, signer);
  const allowance = await collateralContract.allowance(owner, vaultAddress);
  const formattedAllowance = formatUnits(allowance, 6);
  return formattedAllowance;
};
export {
  getCollateralTokenBalance,
  getCurrencyTokenBalance,
  getCollateralTokenAllowance,
  approveCollateralToken,
  approveCurrencyToken,
};
