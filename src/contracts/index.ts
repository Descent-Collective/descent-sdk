import { getContractAddress } from './getContractAddresses';
import { ContractName, SupportedNetwork } from './types';
import type { Signer, Provider, BaseContract, Interface } from 'ethers';
import { Currency, MultiStaticcall, Usdc, Vault, VaultGetters, VaultRouter } from '../generated';

type BaseFactory = {
  readonly abi: object;
  createInterface(): Interface;
  connect(address: string, signerOrProvider: Signer | Provider): BaseContract;
};

export default class ContractManager {
  private contractAddress: any;
  private provider: Provider;

  protected getModule = async (name: string) => {
    const mod = await import(`../generated/factories/${name}__factory`);
    return mod[`${name}__factory`] as BaseFactory;
  };

  constructor(provider: Provider) {
    this.provider = provider;
  }

  private generateContractGetter = <C extends BaseContract>(
    name: ContractName,
  ): ((passedProvider?: any) => Promise<C>) => {
    return async (passedProvider) => {
      const mod = await this.getModule(name);

      const provider = passedProvider || this.provider;

      const inputAddress: any = (getContractAddress(name) || {})[
        provider!.getNetwork()!.chainId!.toString(10)
      ];
      if (!inputAddress) {
        throw new Error(`No address for contract ${name}`);
      }
      return mod.connect(inputAddress, provider) as C;
    };
  };

  public getVaultGetterContract = this.generateContractGetter<VaultGetters>('VaultGetters');
  public getVaultRouterContract = this.generateContractGetter<VaultRouter>('VaultRouter');
  public getVaultContract = this.generateContractGetter<Vault>('Vault');
  public getMultistaticcallContract =
    this.generateContractGetter<MultiStaticcall>('MultiStaticcall');
  public getCurrencyContract = this.generateContractGetter<Currency>('Currency');
  public getUSDCContract = this.generateContractGetter<Usdc>('USDC');
}
