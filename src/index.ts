import { Eip1193Provider, SigningKey, ethers } from 'ethers';
import { ICollateral, IContract, IMode, ISigner } from './types';
import { Signer, Provider } from 'ethers';

import { SupportedNetwork } from './contracts/types';
import { waitTime } from './libs/utils';
import {
  burnCurrency,
  collateralizeVault,
  mintCurrency,
  setupVault,
  withdrawCollateral,
} from './services/vault';
import { Transaction } from './libs/transactions';
import { Internal } from './libs/internal';
import { getContractAddress } from './contracts/getContractAddresses';
import { checkVaultSetupStatus, getCollateralData, getVault } from './services/getters';
import {
  approveCollateralToken,
  approveCurrencyToken,
  getCollateralTokenBalance,
  getCurrencyTokenBalance,
  getCollateralTokenAllowance,
} from './services/utility';

export class DescentClass {
  signer: Signer;
  protected provider: Provider;
  private collateral: ICollateral;

  configMode: IMode | string;
  chainId: string;

  // Extensions
  readonly internal = new Internal(this);
  readonly transaction = new Transaction(this);

  constructor(
    signer: Signer,
    provider: Provider,
    collateral: ICollateral,
    configMode: IMode | string,
    chainId: string,
  ) {
    this.provider = provider;
    this.signer = signer;
    this.collateral = collateral;
    this.configMode = configMode;
    this.chainId = chainId;
  }

  /**
   * @dev Gets a vault detail by it's ID
   * @param ownerAddress Vault owner
   * @returns The Vault information
   */
  public async getVaultInfo(ownerAddress: string) {
    const result = await getVault(
      this.collateral,
      ownerAddress,
      this.chainId,
      this.internal,
      this.signer,
    );

    return result;
  }

  /**
   * @dev Gets the information of collateral initialized in `create()`
   * @returns The collateral information
   */
  public async getCollateralInfo() {
    const result = await getCollateralData(this.collateral, this.chainId, this.signer);

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
      this.signer,
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
      this.signer,
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
      this.signer,
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

  /**
   * @dev initializes a vault for a an address
   * @returns transaction obj
   */
  public async setupVault() {
    const owner = await this.signer.getAddress();
    const result = await setupVault(owner, this.chainId, this.transaction, this.internal);

    return result;
  }

  /**
   * @dev Check if a vault has been initialized
   * @returns boolean
   */
  public async getVaultSetupStatus() {
    const owner = await this.signer.getAddress();
    const result = await checkVaultSetupStatus(owner, this.chainId, this.signer);

    return result;
  }
  // UTILITY HELPER FUNCTIONS FUNCTIONS
  /**
   * @dev gets the collateral token balance of an address
   * @param owner address of the owner
   * @returns balance
   */
  public async getCollateralTokenBalance(owner: string) {
    const result = await getCollateralTokenBalance(
      this.collateral,
      owner,
      this.chainId,
      this.signer,
    );

    return result;
  }

  /**
   * @dev approve the vault to take a certain amount of collateral
   * @param amount amount of allowance
   * @returns tx object
   */
  public async approveCollateral(amount: string) {
    const owner = await this.signer.getAddress();
    const result = await approveCollateralToken(
      this.collateral,
      owner,
      amount,
      this.chainId,
      this.internal,
      this.transaction,
    );

    return result;
  }

  /**
   * @dev approve the vault to take a certain amount of collateral
   * @param amount amount of allowance
   * @returns tx object
   */
  public async collateralTokenAllowance(approver: string) {
    const result = await getCollateralTokenAllowance(
      this.collateral,
      approver,
      this.chainId,
      this.signer,
    );

    return result;
  }

  /**
   * @dev gets the xNGN balalnce of an address
   * @param owner address of the owner
   * @returns balance
   */
  public async getxNGNBalance(owner: string) {
    const result = await getCurrencyTokenBalance(owner, this.chainId, this.signer);

    return result;
  }

  /**
   * @dev approve the vault to take a certain amount of xNGN
   * @param amount amount of allowance
   * @returns tx object
   */
  public async approvexNGN(amount: string) {
    const owner = await this.signer.getAddress();
    const result = await approveCurrencyToken(
      owner,
      amount,
      this.chainId,
      this.internal,
      this.transaction,
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
  const supportedNetworks = [SupportedNetwork.BASE_GOERLI, SupportedNetwork.BASE_SEPOLIA];

  // Validate required options
  if (!options.collateral) {
    throw new Error('Missing required options');
  }
  let provider: any;
  let signer: any;

  if (mode == 'https') {
    provider = new ethers.JsonRpcProvider(options?.rpcUrl);

    signer = new ethers.Wallet(options.privateKey, provider);
  }
  if (mode == 'browser') {
    provider = new ethers.BrowserProvider(options?.ethereum);
    signer = await provider?.getSigner();
  }
  const chainId = (await provider.getNetwork()).chainId.toString(10);

  if (!supportedNetworks.includes(chainId)) {
    throw new Error(`chainId '${chainId}' is not supported.`);
  }

  const descent = new DescentClass(signer, provider, options.collateral, mode, chainId);

  return descent;
}

const Descent = {
  create,
};

export default Descent;
