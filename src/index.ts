import { ethers } from 'ethers';
import { ICollateral, IContract, IProvider, ISigner } from './types';
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
  public getVault(vaultId: string) {}

  /**
   * @dev Gets all the vaults associated with an address
   * @param ownerAddress Vault owner address
   * @returns List of vaults
   */
  public getVaultsByOwner(ownerAddress: string) {}

  /**
   * @dev Gets all the vault Ids tied to an address
   * @param ownerAddress Vault owner address
   * @returns List of vault IDs
   */
  public getVaultIDs(ownerAddress: string) {}

  /**
   * @dev Gets the amount of xNGN available for an owner to mint
   * @param ownerAddress Owner of the vault
   * @returns Amount of xNGN available
   */
  public getTotalxNGNAvailableForOwner(ownerAddress: string) {}

  /**
   * @dev Creates a new vault
   * @param ownerAddress Owner of the vault
   * @param collateralName name of the collateral to be created for vault
   * @returns vault Id
   */
  public createVault(collateralName: ICollateral) {}

  /**
   * @dev lock usdc for a particular vault
   * @param collateralAmount amount of collateral to lock for vault
   * @param vaultID vault id to lock usdc for
   * @returns lockedCollateral
   */
  public lockUSDC(collateralAmount: string | number, vaultID: string) {}

  /**
   * @dev mint available xNGN a particular vault
   * @param amount amount of xNGN to mint
   * @param vaultID vault id to mint xNGN for
   * @returns available xNGN
   */
  public mintAvailablexNGN(amount: string | number, vaultID: string) {}

  /**
   * @dev repay borrowed xNGN for a particular vault
   * @param amount amount of xNGN to repay
   * @param vaultID vault id to repay xNGN for
   * @returns vaultDebt
   */
  public repayxNGN(amount: string | number, vaultID: string) {}

  /**
   * @dev withdraw usdc for a particular vault
   * @param collateralAmount amount of unlocked collateral to withdraw
   * @param vaultID vault id to withdraw usdc from
   * @returns unlockedCollateral
   */
  public withdrawUSDC(collateralAmount: string | number, vaultID: string) {}

  /**
   * @dev Creates a new vault and lock usdc in one transaction
   * @param collateralName name of the collateral to be created for vault
   * @param collateralAmount amount of collateral to lock for vault
   * @returns vault Id
   */
  public createVaultandLockUSDC(
    collateralName: ICollateral,
    collateralAmount: string | number
  ) {}

  /**
   * @dev Creates a new vault, lock usdc and mint xNGN in one transaction
   * @param collateralName name of the collateral to be created for vault
   * @param collateralAmount amount of collateral to lock for vault
   * @returns vault Id, locked usdc & minted xngn
   */
  public createVaultLockUSDCandMintxNGN(
    collateralName: ICollateral,
    collateralAmount: string | number
  ) {}
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
