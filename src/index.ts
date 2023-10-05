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
  public createVault(ownerAddress: string, collateralName: ICollateral) {}
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
