import { Eip1193Provider, SigningKey, ethers } from 'ethers';
import { ICollateral, IMode, ISigner } from './types';
import { Signer, Provider } from 'ethers';

import { SupportedNetwork } from './contracts/types';
import ganache from 'ganache';
import ContractManager from './contracts';
import { createError, depositUSDCFromUnlockedAddress, waitTime } from './libs/utils';
import { collateralizeVault, mintCurrency, withdrawCollateral } from './services/vault';
import { Transaction } from './libs/transactions';
import { Internal } from './libs/internal';
import { Vault__factory } from './generated/factories';
import { getContractAddress } from './contracts/getContractAddresses';

// TODO: Use nonce manager globally
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
  public async getVaultInfo(ownerAddress: string) {}

  public async borrowCurrency(borrowAmount: string) {
    const owner = await this.signer.getAddress();
    const result = await mintCurrency(
      borrowAmount,
      this.collateral,
      owner,
      this.chainId,
      this.transaction,
      this.internal,
    );

    return result;
  }

  /**
   * @dev repay borrowed xNGN for a particular vault
   * @param amount amount of xNGN to repay
   * @param vaultID vault id to repay xNGN for
   * @returns vaultDebt
   */
  public async repayCurrency(amount: string, ownerAddress: string) {}

  /**
   * @dev withdraw usdc for a particular vault
   * @param collateralAmount amount of unlocked collateral to withdraw
   * @param vaultID vault id to withdraw usdc from
   * @returns unlockedCollateral
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
   * @returns transactionReceipt
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
