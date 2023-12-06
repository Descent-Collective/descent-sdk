import { AddressLike, BytesLike, ethers } from 'ethers';
import ContractManager from '../contracts';
import { getContractAddress } from '../contracts/getContractAddresses';
import { VaultGetters__factory } from '../generated';
import { Internal } from '../libs/internal';
import { ICollateral } from '../types';

export type StaticcallStruct = { target: AddressLike; callData: BytesLike };

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
    vaultContractAddress,
    collateralAddress,
    owner,
  ]);

  const getAvailablexNGN = iface.encodeFunctionData('getMaxBorrowable', [
    vaultContractAddress,
    collateralAddress,
    owner,
  ]);

  const getAvailableCollateral = iface.encodeFunctionData('getMaxWithdrawable', [
    vaultContractAddress,
    collateralAddress,
    owner,
  ]);

  const getCollateralRatio = iface.encodeFunctionData('getCollateralRatio', [
    vaultContractAddress,
    collateralAddress,
    owner,
  ]);

  const getHealthFactor = iface.encodeFunctionData('getHealthFactor', [
    vaultContractAddress,
    collateralAddress,
    owner,
  ]);

  const multiCallData: StaticcallStruct[] = [
    {
      target: vaultGettersAddress,
      callData: getVaultData,
    },
    {
      target: vaultGettersAddress,
      callData: getAvailablexNGN,
    },
    {
      target: vaultGettersAddress,
      callData: getAvailableCollateral,
    },
    {
      target: vaultGettersAddress,
      callData: getCollateralRatio,
    },
    {
      target: vaultGettersAddress,
      callData: getHealthFactor,
    },
  ];

  const getVaultInfo = (await contract.getMultistaticcallContract()).multiStaticcall(multiCallData);

  const returnData = (await getVaultInfo).map((item) => item.returnDatum);

  console.log(returnData, 'return Data');

  const fnc = [
    'getVault',
    'getMaxBorrowable',
    'getMaxWithdrawable',
    'getCollateralRatio',
    'getHealthFactor',
  ];

  let formattedReturnData: any = [];
  for (let i = 0; i < fnc.length; i++) {
    const currentFnc = fnc[i];

    formattedReturnData.push(iface.decodeFunctionResult(currentFnc, returnData[i]));
  }

  console.log(formattedReturnData, 'returnData');
  return getVaultInfo;
};

export { getVault };
