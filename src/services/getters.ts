import { AddressLike, BytesLike, Signer, ethers } from 'ethers';
import { getContractAddress } from '../contracts/getContractAddresses';
import { MultiStaticcall__factory, VaultGetters__factory, Vault__factory } from '../generated';
import { Internal } from '../libs/internal';
import { ICollateral, IContract, ISigner } from '../types';
import { Contract } from '../contracts';

export type StaticcallStruct = { target: AddressLike; callData: BytesLike };

const getVault = async (
  collateral: ICollateral,
  owner: string,
  chainId: string,
  internal: Internal,
  signer: Signer,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];
  const vaultGettersAddress: any = getContractAddress('VaultGetters')[chainId];
  const multiStaticcallAddress: any = getContractAddress('MultiStaticcall')[chainId];

  const multiStaticcallContract = Contract(
    multiStaticcallAddress,
    MultiStaticcall__factory.abi,
    signer,
  );

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

  const getVaultInfo = await multiStaticcallContract.multiStaticcall(multiCallData);

  const returnData = (await getVaultInfo).map((item) => item.returnDatum);

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
  const depositedCollateral = formattedReturnData[0][0];
  const borrowedAmount = formattedReturnData[0][1];
  const _accruedFees = formattedReturnData[0][2];

  const borrowableAmount = formattedReturnData[1];
  const withdrawableCollateral = formattedReturnData[2];
  const collateralRatio = formattedReturnData[3];
  const healthFactor = formattedReturnData[4];

  return {
    healthFactor: healthFactor ? 'Safe' : 'Unsafe',
    depositedCollateral: ethers.formatUnits(depositedCollateral.toString(), 6),
    collateralLocked:
      Number(ethers.formatUnits(depositedCollateral.toString(), 6)) -
      Number(ethers.formatUnits(withdrawableCollateral.toString(), 6)),
    borrowedAmount: ethers.formatUnits(borrowedAmount.toString(), 18),
    accruedFees: ethers.formatUnits(_accruedFees.toString(), 18),
    currentCollateralRatio: `${ethers.formatUnits(collateralRatio.toString(), 16)}%`,
    availableCollateral: ethers.formatUnits(withdrawableCollateral.toString(), 6),
    availablexNGN: ethers.formatUnits(borrowableAmount.toString(), 18),
  };
};

const checkVaultSetupStatus = async (owner: string, chainId: string, signer: Signer) => {
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];
  const vaultRouterAddress: any = getContractAddress('VaultRouter')[chainId];

  const vaultContract = Contract(vaultContractAddress, Vault__factory.abi, signer);

  const getVaultSetupStatus = await vaultContract.relyMapping(owner, vaultRouterAddress);

  return getVaultSetupStatus;
};

const getCollateralData = async (collateral: ICollateral, chainId: string, signer: Signer) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];
  const vaultGetterAddress: any = getContractAddress('VaultGetters')[chainId];

  const vaultGetterContract = Contract(vaultGetterAddress, VaultGetters__factory.abi, signer);

  const getCollateralInfo = await vaultGetterContract.getCollateralInfo(
    vaultContractAddress,
    collateralAddress,
  );

  const returnData = (await getCollateralInfo).map((item) => item);

  return {
    totalDepositedCollateral: ethers.formatUnits(returnData[0].toString(), 6),
    totalBorrowedAmount: ethers.formatUnits(returnData[1].toString(), 18),
    liquidationThreshold: `${ethers.formatUnits(returnData[2].toString(), 16)}%`,
    debtCeiling: ethers.formatUnits(returnData[3].toString(), 18),
    rate: ethers.formatUnits(returnData[4].toString(), 6),
    minDeposit: ethers.formatUnits(returnData[5].toString(), 18),
    collateralPrice: ethers.formatUnits(returnData[6].toString(), 6),
  };
};
export { getVault, getCollateralData, checkVaultSetupStatus };
