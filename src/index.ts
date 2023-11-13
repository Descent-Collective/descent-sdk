import { Eip1193Provider, SigningKey, ethers } from 'ethers';
import { ICollateral, IContract, INetwork, IProvider, ISigner } from './types';
import { Contract } from './libs/contract';
import Addresses from './contracts/addresses/base.json';
import abis from './contracts/abis';
import { getVaultInfo } from './services/vault';

export class DescentClass {
  protected signer: ISigner;
  protected provider: IProvider;
  private vaultContract: IContract;
  private collateral: ICollateral;

  constructor(signer: ISigner, provider: IProvider, collateral: ICollateral) {
    this.provider = provider;
    this.signer = signer;
    this.collateral = collateral;
    this.vaultContract = Contract(
      Addresses.VAULT,
      abis.CoreVaultAbi,
      this.signer
    );
  }

  /**
   * @dev Gets a vault detail by it's ID
   * @param vaultId Vault ID
   * @returns The Vault information
   */
  public async getVaultInfo(vaultAddress: string) {
    const vault = await getVaultInfo(
      vaultAddress,
      this.collateral,
      this.vaultContract
    );
    return vault;
  }

  /**
   * @dev Gets the amount of xNGN available for an owner to mint
   * @param ownerAddress Owner of the vault
   * @returns Amount of xNGN available
   */
  public async getTotalxNGNAvailableToMint(ownerAddress: string) {
    const availablexNGN = await getAvailablexNGN(
      ownerAddress,
      this.vaultContract
    );
    return availablexNGN;
  }

  public async getTotalWithdrawableCollateral(ownerAddress: string) {}

  public async depositCollateral(
    collateralAmount: string | number,
    ownerAddress: string
  ) {}

  /**
   * @dev mint available xNGN a particular vault
   * @param amount amount of xNGN to mint
   * @param vaultID vault id to mint xNGN for
   * @returns available xNGN
   */
  public async mintAvailablexNGN(
    amount: string | number,
    ownerAddress: string
  ) {}

  /**
   * @dev repay borrowed xNGN for a particular vault
   * @param amount amount of xNGN to repay
   * @param vaultID vault id to repay xNGN for
   * @returns vaultDebt
   */
  public async repayxNGN(amount: string | number, ownerAddress: string) {}

  /**
   * @dev withdraw usdc for a particular vault
   * @param collateralAmount amount of unlocked collateral to withdraw
   * @param vaultID vault id to withdraw usdc from
   * @returns unlockedCollateral
   */
  public async withdrawCollateral(
    collateralAmount: string | number,
    ownerAddress: string
  ) {}
}
async function create(
  requestType: INetwork,
  options: {
    ethereum?: Eip1193Provider | any;
    rpcUrl?: string;
    privateKey?: any | SigningKey;
    collateral: ICollateral;
  }
) {
  try {
    let provider: any;
    let signer: any;
    if (requestType == INetwork.https) {
      provider = new ethers.AbstractProvider(options?.rpcUrl);
      signer = new ethers.Wallet(options.privateKey, provider);
    }
    if (requestType == INetwork.browser) {
      provider = new ethers.BrowserProvider(options?.ethereum);
      signer = await provider.getSigner();
    }

    const descent = new DescentClass(signer, provider, options.collateral);
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
