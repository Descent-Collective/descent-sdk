import { getContractAddress } from './getContractAddresses';
import { ContractName, SupportedNetwork } from './types';
import type { Signer, Provider, BaseContract, Interface } from 'ethers';
import {
  Currency,
  Feed,
  MultiStaticcall,
  USDC,
  Vault,
  VaultGetters,
  VaultRouter,
} from '../generated';

type BaseFactory = {
  readonly abi: object;
  createInterface(): Interface;
  connect(address: string, signerOrProvider: Signer | Provider): BaseContract;
};

export default class ContractManager {
  private signerOrProvider: Signer | Provider;

  constructor(signerOrProvider: Signer | Provider) {
    this.signerOrProvider = signerOrProvider;
  }

  private generateContractGetter = <C extends BaseContract>(
    name: ContractName,
  ): ((passedProvider?: any) => Promise<C>) => {
    return async (passedProvider) => {
      const mod = await import(`../generated/factories/${name}__factory`);

      let chainId;
      let inputAddress;
      chainId = (await this.signerOrProvider.provider!.getNetwork()).chainId.toString(10);

      inputAddress = (getContractAddress(name) || {})[chainId];

      if (!inputAddress) {
        throw new Error(`No address for contract ${name}`);
      }
      return mod[`${name}__factory`]?.connect(inputAddress, this.signerOrProvider);
    };
  };

  public getVaultGetterContract = this.generateContractGetter<VaultGetters>('VaultGetters');
  public getVaultRouterContract = this.generateContractGetter<VaultRouter>('VaultRouter');
  public getVaultContract = this.generateContractGetter<Vault>('Vault');
  public getMultistaticcallContract =
    this.generateContractGetter<MultiStaticcall>('MultiStaticcall');
  public getCurrencyContract = this.generateContractGetter<Currency>('Currency');
  public getUSDCContract = this.generateContractGetter<USDC>('USDC');
  public getFeedContract = this.generateContractGetter<Feed>('Feed');
}
