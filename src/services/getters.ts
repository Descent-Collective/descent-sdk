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
  const collateralAddress: any = getContractAddress(collateral, chainId);
  const vaultContractAddress: any = getContractAddress('Vault', chainId);
  const vaultGettersAddress: any = getContractAddress('VaultGetters', chainId);
  const multiStaticcallAddress: any = getContractAddress('MultiStaticcall', chainId);

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
    depositedCollateral: depositedCollateral,
    collateralLocked: BigInt(depositedCollateral) - BigInt(withdrawableCollateral),
    borrowedAmount: borrowedAmount,
    accruedFees: _accruedFees,
    currentCollateralRatio: collateralRatio[0],
    availableCollateral: withdrawableCollateral[0],
    availablexNGN: borrowableAmount[0],
  };
};

const checkVaultSetupStatus = async (owner: string, chainId: string, signer: Signer) => {
  const vaultContractAddress: any = getContractAddress('Vault', chainId);
  const vaultRouterAddress: any = getContractAddress('VaultRouter', chainId);

  const vaultContract = Contract(vaultContractAddress, Vault__factory.abi, signer);

  const getVaultSetupStatus = await vaultContract.relyMapping(owner, vaultRouterAddress);

  return getVaultSetupStatus;
};

const getCollateralData = async (collateral: ICollateral, chainId: string, signer: Signer) => {
  const collateralAddress: any = getContractAddress(collateral, chainId);
  const vaultContractAddress: any = getContractAddress('Vault', chainId);
  const vaultGetterAddress: any = getContractAddress('VaultGetters', chainId);

  const vaultGetterContract = Contract(vaultGetterAddress, VaultGetters__factory.abi, signer);

  const getCollateralInfo = await vaultGetterContract.getCollateralInfo(
    vaultContractAddress,
    collateralAddress,
  );

  const returnData = (await getCollateralInfo).map((item) => item);

  return {
    totalDepositedCollateral: returnData[0],
    totalBorrowedAmount: returnData[1],
    liquidationThreshold: returnData[2],
    debtCeiling: returnData[3],
    rate: returnData[4],
    minDeposit: returnData[5],
    collateralPrice: returnData[6],
  };
};
export { getVault, getCollateralData, checkVaultSetupStatus };
