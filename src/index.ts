import { Eip1193Provider, SigningKey, ethers } from 'ethers';
import { ICollateral, IContract, IMode, IProvider, ISigner } from './types';
import { Contract } from './libs/contract';
import abis from './contracts/abis';
import {
  burnCurrency,
  collateralizeVault,
  getVaultInfo,
  mintCurrency,
  withdrawCollateral,
} from './services/vault';
import { SupportedNetwork } from './contracts/types';
import ganache from 'ganache';

export class DescentClass {
  protected signer: ISigner;
  protected provider: IProvider;
  private collateral: ICollateral;

  constructor(signer: ISigner, provider: IProvider, collateral: ICollateral) {
    this.provider = provider;
    this.signer = signer;
    this.collateral = collateral;

    this.provider.getNetwork().then((network) => {
      const chainId = network.chainId.toString(10);
      if (![chainId].includes(SupportedNetwork.GOERLI)) {
        throw new Error(`chainId '${chainId}' is not supported.`);
      }
    });
  }

  /**
   * @dev Gets a vault detail by it's ID
   * @param ownerAddress Vault ID
   * @returns The Vault information
   */
  public async getVaultInfo(ownerAddress: string) {}

  public async borrowCurrency(amount: string, ownerAddress: string, recipientAddress: string) {}

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
  public async withdrawCollateral(collateralAmount: string, ownerAddress: string) {}

  /**
   * @dev deposit usdc for a particular vault
   * @param collateralAmount amount of unlocked collateral to withdraw
   * @param vaultID vault id to withdraw usdc from
   * @returns unlockedCollateral
   */
  public async depositCollateral(collateralAmount: string, ownerAddress: string) {}
}
async function create(
  mode: IMode,
  options: {
    ethereum?: Eip1193Provider | any;
    rpcUrl?: string;
    privateKey?: any | SigningKey;
    collateral: ICollateral;
  },
) {
  const unlockedAddress = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c';
  try {
    // Validate required options
    if (!options.collateral) {
      throw new Error('Missing required options');
    }
    let provider: any;
    let signer: any;
    if (mode == IMode.https) {
      provider = new ethers.AbstractProvider(options?.rpcUrl);
      signer = new ethers.Wallet(options.privateKey, provider);
    }
    if (mode == IMode.browser) {
      provider = new ethers.BrowserProvider(options?.ethereum);
      signer = await provider.getSigner();
    }
    if (mode == IMode.simulation) {
      // fork the current network connected to and unlock wallet
      const ganacheOptions = {
        fork: { url: options.rpcUrl },
        wallet: { unlockedAccounts: [unlockedAddress] },
      };
      provider = new ethers.BrowserProvider(ganache.provider(ganacheOptions));

      // get account information
      const accounts = await provider.getSigner();
      const account = accounts[0];

      // transfer usdc to index account
      await depositUSDCFromUnlockedAddress(account, unlockedAddress);
    }

    const descent = new DescentClass(signer, provider, options.collateral);
    return descent;
  } catch (e) {
    const error = createError(e);

    return error;
  }
}

const Descent = {
  create,
};

export default Descent;
