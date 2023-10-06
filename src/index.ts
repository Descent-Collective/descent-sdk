import { Eip1193Provider, Signer, SigningKey, ethers } from 'ethers';
import { ICollateral, IContract, INetwork, IProvider, ISigner } from './types';
import { Contract } from './libs/contract';
import Addresses from './contracts/addresses/base.json';
import abis from './contracts/abis';
import {
  getAvailablexNGN,
  getVaultById,
  getVaultsForOwner,
  openVault,
} from './services/vault';

export class DescentClass {
  protected signer: ISigner;
  protected provider: IProvider;
  private vaultContract: IContract;
  private usdcAdapterContract: IContract;
  private xNGNAdapterContract: IContract;

  constructor(signer: ISigner, provider: IProvider) {
    this.provider = provider;
    this.signer = signer;
    this.vaultContract = Contract(
      Addresses.COREVAULT,
      abis.CoreVaultAbi,
      this.signer
    );
    this.usdcAdapterContract = Contract(
      Addresses.USDCAdapter,
      abis.USDCAdapterAbi,
      this.signer
    );
    this.xNGNAdapterContract = Contract(
      Addresses.xNGNAdapter,
      abis.xNGNAdapterAbi,
      this.signer
    );
  }

  /**
   * @dev Gets a vault detail by it's ID
   * @param vaultId Vault ID
   * @returns The Vault information
   */
  public async getVault(vaultId: string) {
    const vault = await getVaultById(vaultId, this.vaultContract);
    return vault;
  }

  /**
   * @dev Gets all the vaults associated with an address
   * @param ownerAddress Vault owner address
   * @returns List of vaults
   */
  public async getVaultsByOwner(ownerAddress: string) {
    const vaults = await getVaultsForOwner(ownerAddress, this.vaultContract);

    return vaults;
  }

  /**
   * @dev Gets the amount of xNGN available for an owner to mint
   * @param ownerAddress Owner of the vault
   * @returns Amount of xNGN available
   */
  public async getTotalxNGNAvailableForOwner(ownerAddress: string) {
    const availablexNGN = await getAvailablexNGN(
      ownerAddress,
      this.vaultContract
    );
    return availablexNGN;
  }

  /**
   * @dev Creates a new vault
   * @param ownerAddress Owner of the vault
   * @param collateralName name of the collateral to be created for vault
   * @returns vault Id
   */
  public async createVault(ownerAddress: string, collateralName: ICollateral) {
    const vaultId = await openVault(
      ownerAddress,
      collateralName,
      this.vaultContract
    );
    return vaultId;
  }

  /**
   * @dev lock usdc for a particular vault
   * @param collateralAmount amount of collateral to lock for vault
   * @param vaultID vault id to lock usdc for
   * @returns lockedCollateral
   */
  public async lockUSDC(collateralAmount: string | number, vaultID: string) {}

  /**
   * @dev mint available xNGN a particular vault
   * @param amount amount of xNGN to mint
   * @param vaultID vault id to mint xNGN for
   * @returns available xNGN
   */
  public async mintAvailablexNGN(amount: string | number, vaultID: string) {}

  /**
   * @dev repay borrowed xNGN for a particular vault
   * @param amount amount of xNGN to repay
   * @param vaultID vault id to repay xNGN for
   * @returns vaultDebt
   */
  public async repayxNGN(amount: string | number, vaultID: string) {}

  /**
   * @dev withdraw usdc for a particular vault
   * @param collateralAmount amount of unlocked collateral to withdraw
   * @param vaultID vault id to withdraw usdc from
   * @returns unlockedCollateral
   */
  public async withdrawUSDC(
    collateralAmount: string | number,
    vaultID: string
  ) {}

  /**
   * @dev Creates a new vault and lock usdc in one transaction
   * @param collateralName name of the collateral to be created for vault
   * @param collateralAmount amount of collateral to lock for vault
   * @returns vault Id
   */
  public async createVaultandLockUSDC(
    collateralName: ICollateral,
    collateralAmount: string | number
  ) {}

  /**
   * @dev Creates a new vault, lock usdc and mint xNGN in one transaction
   * @param collateralName name of the collateral to be created for vault
   * @param collateralAmount amount of collateral to lock for vault
   * @returns vault Id, locked usdc & minted xngn
   */
  public async createVaultLockUSDCandMintxNGN(
    collateralName: ICollateral,
    collateralAmount: string | number
  ) {}
}

async function create(
  requestType: INetwork,
  options: {
    ethereum?: Eip1193Provider | any;
    rpcUrl?: string;
    privateKey?: any | SigningKey;
  }
) {
  try {
    let provider: any;
    let signer: any;
    if (requestType == INetwork.https) {
      provider = new ethers.AbstractProvider(options?.rpcUrl);
      signer = new ethers.Wallet(options.privateKey, provider);
    } else if (requestType == INetwork.browser) {
      provider = new ethers.BrowserProvider(options?.ethereum);
      signer = await provider.getSigner();
    }

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
