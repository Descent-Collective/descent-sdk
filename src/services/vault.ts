import { ethers } from 'ethers';
import { IContract } from '../types';

const getVaultById = async (vaultId: string | number, contract: IContract) => {
  try {
    const vaultData = await contract.getVaultById(vaultId.toString());

    let vaultState;
    if (ethers.formatUnits(vaultData[4].vaultState) == '0') {
      vaultState = 'Idle';
    } else if (ethers.formatUnits(vaultData[4].vaultState) == '1') {
      vaultState = 'Active';
    } else {
      vaultState = 'Inactive';
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

export { getVaultById };
