import { ethers } from 'ethers';
import { ISigner } from '../types';

import { getContractAddress } from './getContractAddresses';
import { ContractName, SupportedNetwork } from './types';

export default class ContractManager {
  private contractAddress: string;
  public signer: ISigner;

  constructor(
    public contractName: ContractName,
    signer: ISigner,
    public chainId: SupportedNetwork,
  ) {
    this.contractName = contractName;
    this.chainId = chainId;
    this.contractAddress = (getContractAddress(contractName) || {})[chainId] || '';
    if (!this.contractAddress) {
      throw new Error(`No address for contract ${contractName}`);
    }
    new ethers.Contract(this.contractAddress, abi, this.signer);
  }
    
}
