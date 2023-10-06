import { ethers } from 'ethers';
import { IContract } from '../types';

const getVaultById = async (vaultId: string | number, contract: IContract) => {
  try {
    const vaultData = await contract.getVaultById(vaultId.toString());

    let vaultState;
    switch (ethers.formatUnits(vaultData[4].vaultState)) {
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

    return {
      lockedCollateral: ethers.formatUnits(vaultData[0].lockedCollateral),
      unlockedCollateral: ethers.formatUnits(vaultData[1].unlockedCollateral),
      normalisedDebt: ethers.formatUnits(vaultData[2].normalisedDebt),
      collateralName: ethers.decodeBytes32String(vaultData[3].normalisedDebt),
      vaultState: vaultState,
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

export { getVaultById, getVaultsForOwner, getAvailablexNGN };
