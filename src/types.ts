import { ethers } from 'ethers';
import { DescentClass } from '.';

export type IContract = ethers.Contract;

export type ISigner = ethers.JsonRpcSigner | ethers.Wallet;
export type IProvider = ethers.Provider | ethers.JsonRpcProvider | ethers.BrowserProvider;
export type IDescentClass = DescentClass;

export type IContractFactory = ethers.ContractFactory;

export enum ICollateral {
  USDC = 'USDC',
}
export enum IMode {
  https = 'https',
  browser = 'browser',
  simulation = 'simulation',
}
