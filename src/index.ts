import { ethers } from 'ethers';
import { IContract, IProvider, ISigner } from './types';
import { Contract } from './libs/contract';
import Addresses from './contracts/addresses/base.json';
import abis from './contracts/abis';

export class DescentClass {
  protected signer: ISigner;
  protected provider: IProvider;
  private vaultContract?: IContract;
  private usdcAdapterContract?: IContract;
  private xNGNAdapterContract?: IContract;

  constructor(signer: ISigner, provider: IProvider) {
    this.provider = provider;
    this.signer = signer;
    this.vaultContract = Contract(
      Addresses.COREVAULT,
      abis.CoreVaultAbi,
      signer
    );
    this.usdcAdapterContract = Contract(
      Addresses.USDCAdapter,
      abis.USDCAdapterAbi,
      signer
    );
    this.xNGNAdapterContract = Contract(
      Addresses.xNGNAdapter,
      abis.xNGNAdapterAbi,
      signer
    );
  }
}

async function create(rpcUrl: string, privateKey: string) {
  try {
    const provider = new ethers.AbstractProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    const descent = new DescentClass(signer, provider);
    return descent;
  } catch (e) {
    const error = ErrorMessage(e);

    return error;
  }
}

const Descent = {
  create,
};

export default Descent;
