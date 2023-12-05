import ContractManager from '../contracts';
import { getContractAddress } from '../contracts/getContractAddresses';
import { VaultGetters__factory } from '../generated';
import { Internal } from '../libs/internal';
import { ICollateral } from '../types';

const getVault = async (
  collateral: ICollateral,
  owner: string,
  chainId: string,
  contract: ContractManager,
  internal: Internal,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];
  const vaultGettersAddress: any = getContractAddress('VaultGetters')[chainId];

  /**TODO: 
     * Should return the following:
      healthFactor,
      depositedCollateral,
      collateralLocked: depositedCollateral - Number(ethers.formatUnits(availableCollateral)),
      borrowedAmount: ethers.formatUnits(vaultData.borrowedAmount),
      accruedFees: ethers.formatUnits(vaultData.accruedFees),
      currentCollateralRatio: currentCollateralRatio,
      availableCollateral: ethers.formatUnits(availableCollateral),
      availablexNGN: ethers.formatUnits(availablexNGN),
     * */

  // encode data
  let iface = internal.getInterface(VaultGetters__factory.abi);
  const getVaultData = iface.encodeFunctionData('getVault', [
    [vaultContractAddress],
    [collateralAddress],
    [owner],
  ]);

  const getAvailablexNGN = iface.encodeFunctionData('getMaxBorrowable', [
    [vaultContractAddress],
    [collateralAddress],
    [owner],
  ]);

  const getAvailableCollateral = iface.encodeFunctionData('getMaxWithdrawable', [
    [vaultContractAddress],
    [collateralAddress],
    [owner],
  ]);

  const getCollateralRatio = iface.encodeFunctionData('getCollateralRatio', [
    [vaultContractAddress],
    [collateralAddress],
    [owner],
  ]);

  const getHealthFactor = iface.encodeFunctionData('getCollateralRatio', [
    [vaultContractAddress],
    [collateralAddress],
    [owner],
  ]);
  const multiCallData = [
    {
      vaultGettersAddress,
      getVaultData,
    },
    {
      vaultGettersAddress,
      getAvailablexNGN,
    },
    {
      vaultGettersAddress,
      getAvailableCollateral,
    },
    {
      vaultGettersAddress,
      getCollateralRatio,
    },
    {
      vaultGettersAddress,
      getHealthFactor,
    },
  ];

  const getVaultInfo = (await contract.getMultistaticcallContract()).multiStaticcall([
    {
      vaultGettersAddress,
      getHealthFactor,
    },
  ]);

  return getVaultInfo;
};

export { getVault };
