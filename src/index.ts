import { Eip1193Provider, SigningKey, ethers } from 'ethers';
import { ICollateral, IMode, ISigner } from './types';
import { Signer, Provider } from 'ethers';

import { SupportedNetwork } from './contracts/types';
import ContractManager from './contracts';
import { waitTime } from './libs/utils';
import {
  burnCurrency,
  collateralizeVault,
  getVault,
  mintCurrency,
  withdrawCollateral,
} from './services/vault';
import { Transaction } from './libs/transactions';
import { Internal } from './libs/internal';
import { getContractAddress } from './contracts/getContractAddresses';

export class DescentClass {
  signer: Signer;
  protected provider: Provider;
  private collateral: ICollateral;

  contracts?: ContractManager;
  configMode: IMode | string;
  chainId: string;

  // Extensions
  readonly internal = new Internal(this);
  readonly transaction = new Transaction(this);

  constructor(
    signer: Signer,
    provider: Provider,
    collateral: ICollateral,
    contracts: ContractManager,
    configMode: IMode | string,
    chainId: string,
  ) {
    this.provider = provider;
    this.signer = signer;
    this.collateral = collateral;
    this.contracts = contracts;
    this.configMode = configMode;
    this.chainId = chainId;
  }

  /**
   * @dev Gets a vault detail by it's ID
   * @param ownerAddress Vault ID
   * @returns The Vault information
   */
  public async getVaultInfo() {
    const owner = await this.signer.getAddress();
    const result = await getVault(this.collateral, owner, this.chainId, this.contracts!);

    return result;
  }

  /**
   * @dev borrow xNGN against deposited USDC
   * @param amount amount of xNGN to borrow
   * @returns transaction obj
   */
  public async borrowCurrency(borrowAmount: string) {
    const owner = await this.signer.getAddress();
    const result = await mintCurrency(
      borrowAmount,
      this.collateral,
      owner,
      this.chainId,
      this.transaction,
      this.internal,
      this.contracts!,
    );

    return result;
  }

  /**
   * @dev repay borrowed xNGN for a particular vault
   * @param amount amount of xNGN to repay
   * @returns transaction obj
   */
  public async repayCurrency(amount: string) {
    const owner = await this.signer.getAddress();
    const result = await burnCurrency(
      amount,
      this.collateral,
      owner,
      this.chainId,
      this.transaction,
      this.internal,
      this.contracts!,
    );

    return result;
  }

  /**
   * @dev withdraw usdc for a particular vault
   * @param collateralAmount amount of unlocked collateral to withdraw
   * @returns transaction obj
   */
  public async withdrawCollateral(collateralAmount: string) {
    const owner = await this.signer.getAddress();
    const result = await withdrawCollateral(
      collateralAmount,
      this.collateral,
      owner,
      this.chainId,
      this.transaction,
      this.internal,
      this.contracts!,
    );

    return result;
  }

  /**
   * @dev deposit usdc for a particular vault
   * @param collateralAmount amount of unlocked collateral to withdraw
   * @param ownerAddress owner of the vault which should be the caller
   * @returns transaction obj
   */
  public async depositCollateral(collateralAmount: string) {
    const owner = await this.signer.getAddress();
    const result = await collateralizeVault(
      collateralAmount,
      this.collateral,
      owner,
      this.chainId,
      this.transaction,
      this.internal,
    );

    return result;
  }
}
async function create(
  mode: string,
  options: {
    ethereum?: Eip1193Provider | any;
    rpcUrl?: string;
    privateKey?: any | SigningKey;
    collateral: ICollateral;
  },
) {
  // Validate required options
  if (!options.collateral) {
    throw new Error('Missing required options');
  }
  let provider: any;
  let signer: any;

  if (mode == IMode.https) {
    provider = new ethers.JsonRpcProvider(options?.rpcUrl);

    signer = new ethers.Wallet(options.privateKey, provider);
  }
  if (mode == IMode.browser) {
    provider = new ethers.BrowserProvider(options?.ethereum);
    signer = await provider?.getSigner();
  }
  const chainId = (await provider.getNetwork()).chainId.toString(10);

  if (![chainId].includes(SupportedNetwork.GOERLI)) {
    throw new Error(`chainId '${chainId}' is not supported.`);
  }

  const contracts = new ContractManager(signer);

  const descent = new DescentClass(signer, provider, options.collateral, contracts, mode, chainId);

  // approve router to talk to vault on behalf of user

  const vaultRouter: any = getContractAddress('VaultRouter')[chainId];

  const relyResponse = (await contracts.getVaultContract()).rely(vaultRouter);
  (await relyResponse).wait();

  await waitTime(50);

  return descent;
}

const Descent = {
  create,
};

export default Descent;
