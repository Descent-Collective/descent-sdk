import { ethers } from 'ethers';
import { ICollateral, IContract } from '../types';
import Addresses from '../contracts/addresses/base.json';

const getVaultInfo = async (
  ownerAddress: string | number,
  collateral: ICollateral,
  contract: IContract
) => {
  let collateralAddress;
  if (collateral == ICollateral.USDC) {
    collateralAddress = Addresses.USDC;
  }

  try {
    const vaultData = await contract.getVaultInfo(
      collateralAddress,
      ownerAddress
    );
    const depositedCollateral = Number(
      ethers.formatUnits(vaultData.depositedCollateral)
    );
    const availableCollateral = await contract.getMaxWithdrawable(
      collateralAddress,
      ownerAddress
    );
    const availablexNGN = await contract.getMaxBorrowable(
      collateralAddress,
      ownerAddress
    );
    const healthFactor = await contract.checkHealthFactor(
      collateralAddress,
      ownerAddress
    );

    return {
      depositedCollateral: depositedCollateral,
      collateralLocked:
        depositedCollateral - Number(ethers.formatUnits(availableCollateral)),
      borrowedAmount: ethers.formatUnits(vaultData.borrowedAmount),
      accruedFees: ethers.formatUnits(vaultData.accruedFees),
      currentCollateralRatio: healthFactor,
      currentLiquidationPrice: '',
      availableCollateral: ethers.formatUnits(availableCollateral),
      availablexNGN: ethers.formatUnits(availablexNGN),
    };
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};

const getVaultsForOwner = async (owner: string, contract: IContract) => {
  try {
    const vaults: any = [];

    const vaultIds: [] = await contract.getVaultsForOwner(owner);
    await Promise.all(
      vaultIds.map(async vaultId => {
        const vault = await contract.getVaultById(vaultId);

        let vaultState;
        switch (ethers.formatUnits(vault[4].vaultState)) {
          case '0':
            vaultState = 'Idle';
            break;
          case '1':
            vaultState = 'Active';
            break;
          default:
            vaultState = 'Inactive';
            break;
        }

        vaults.push({
          vaultId: vaultId,
          lockedCollateral: ethers.formatUnits(vault[0].lockedCollateral),
          unlockedCollateral: ethers.formatUnits(vault[1].unlockedCollateral),
          normalisedDebt: ethers.formatUnits(vault[2].normalisedDebt),
          collateralName: ethers.decodeBytes32String(vault[3].normalisedDebt),
          vaultState: vaultState,
        });
      })
    );
    return vaults;
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};

const getAvailablexNGN = async (owner: string, contract: IContract) => {
  try {
    const availablexNGN = await contract.getAvailableStableToken(owner);
    return Number(ethers.formatUnits(availablexNGN, 18));
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};

const openVault = async (
  owner: string,
  collateralName: string,
  contract: IContract
) => {
  try {
    if (collateralName !== ICollateral.USDC)
      return await ErrorMessage('Collateral type not supported');

    const vaultResponse = await contract.createVault(owner, collateralName);

    const vault = await vaultResponse.wait();
    const vaultId = vault.logs[0].args[0];
    return BigInt(vaultId).toString();
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};

const collateralizeVault = async (
  amount: string,
  vaultId: string,
  owner: string,
  contract: IContract
) => {
  try {
    const res = await contract.join(amount, owner, vaultId);
    return res;
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};

export { getVaultInfo };
