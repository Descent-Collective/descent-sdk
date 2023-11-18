import { ethers } from 'ethers';

export type IContract = ethers.Contract;

export type ISigner = ethers.JsonRpcSigner | ethers.Wallet;
export type IProvider = ethers.Provider | ethers.JsonRpcProvider | ethers.BrowserProvider;

export type IContractFactory = ethers.ContractFactory;

export enum ICollateral {
  USDC = 'USDC',
}
export enum INetwork {
  https = 'https',
  browser = 'browser',
}
