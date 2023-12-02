import { ethers, BigNumberish, AddressLike } from 'ethers';
import { ICollateral, IContract } from '../types';
import ContractManager from '../contracts';
import { Transaction } from '../libs/transactions';
import { getContractAddress } from '../contracts/getContractAddresses';
import { createError } from '../libs/utils';
import { Internal } from '../libs/internal';
import { Vault__factory } from '../generated/factories';

export enum VaultHealthFactor {
  UNSAFE = 'UNSAFE',
  SAFE = 'SAFE',
}
export enum VaultOperations {
  DepositCollateral = 'DepositCollateral',
  WithdrawCollateral = 'WithdrawCollateral',
  MintCurrency = 'MintCurrency',
  BurnCurrency = 'BurnCurrency',
}

// const getVaultInfo = async (
//   ownerAddress: string | number,
//   collateral: ICollateral,
//   contract: IContract,
// ) => {
//   let collateralAddress;
//   if (collateral == ICollateral.USDC) {
//     collateralAddress = Addresses.USDC;
//   }

//   try {
//     // FIXME: Refactor with MultiStaticcall
//     const vaultData = await contract.getVaultInfo(Addresses.VAULT, collateralAddress, ownerAddress);
//     const depositedCollateral = Number(ethers.formatUnits(vaultData.depositedCollateral));
//     const availableCollateral = await contract.getMaxWithdrawable(
//       Addresses.VAULT,
//       collateralAddress,
//       ownerAddress,
//     );
//     const availablexNGN = await contract.getMaxBorrowable(
//       Addresses.VAULT,
//       collateralAddress,
//       ownerAddress,
//     );
//     const healthFactorCheck = await contract.checkHealthFactor(
//       Addresses.VAULT,
//       collateralAddress,
//       ownerAddress,
//     );

//     const healthFactor =
//       healthFactorCheck < 1 //
//         ? VaultHealthFactor.UNSAFE // Unsafe - Vault is Dangerous
//         : VaultHealthFactor.SAFE; // Safe - Vault is Safe

//     const price = '999';
//     const collateralValue = depositedCollateral * Number(price);

//     const currentCollateralRatio =
//       Number(ethers.formatUnits(vaultData.borrowedAmount)) / collateralValue / (100 / 1);

//     return {
//       healthFactor,
//       depositedCollateral,
//       collateralLocked: depositedCollateral - Number(ethers.formatUnits(availableCollateral)),
//       borrowedAmount: ethers.formatUnits(vaultData.borrowedAmount),
//       accruedFees: ethers.formatUnits(vaultData.accruedFees),
//       currentCollateralRatio: currentCollateralRatio,
//       availableCollateral: ethers.formatUnits(availableCollateral),
//       availablexNGN: ethers.formatUnits(availablexNGN),
//       currentRate: ethers.formatUnits(vaultData.lastTotalAccumulatedRate),
//     };
//   } catch (e) {
//     const message = createError(e);
//     return message;
//   }
// };

const collateralizeVault = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  contract: ContractManager,
  chainId: string,
  transaction: Transaction,
  internal: Internal,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];

  const operation = 'DepositCollateral';
  const _amount = ethers.formatEther(amount);

  try {
    const depositRes = (await contract.getVaultRouterContract()!).multiInteract(
      [vaultContractAddress],
      [operation],
      [collateralAddress],
      [],
      [_amount],
    );

    const depositResResult = (await depositRes).wait();

    console.log(depositResResult);

    return depositResResult;
  } catch (e) {
    console.log(e, 'main error');
    const message = createError(e);
    return message;
  }
};
// const withdrawCollateral = async (
//   amount: string,
//   collateral: ICollateral,
//   owner: string,
//   contract: IContract,
// ) => {
//   let collateralAddress;
//   if (collateral == ICollateral.USDC) {
//     collateralAddress = Addresses.USDC;
//   }
//   try {
//     const res = await contract.withdrawCollateral(
//       collateralAddress,
//       owner,
//       ethers.toBigInt(amount),
//     );
//     return res;
//   } catch (e) {
//     const message = createError(e);
//     return message;
//   }
// };
// const mintCurrency = async (
//   amount: string,
//   collateral: ICollateral,
//   owner: string,
//   recipient: string,
//   contract: IContract,
// ) => {
//   let collateralAddress;
//   if (collateral == ICollateral.USDC) {
//     collateralAddress = Addresses.USDC;
//   }
//   try {
//     const res = await contract.mintCurrency(
//       collateralAddress,
//       owner,
//       recipient,
//       ethers.toBigInt(amount),
//     );
//     return res;
//   } catch (e) {
//     const message = createError(e);
//     return message;
//   }
// };

// const burnCurrency = async (
//   amount: string,
//   collateral: ICollateral,
//   owner: string,
//   contract: IContract,
// ) => {
//   let collateralAddress;
//   if (collateral == ICollateral.USDC) {
//     collateralAddress = Addresses.USDC;
//   }
//   try {
//     const res = await contract.burnCurrency(collateralAddress, owner, amount);
//     return res;
//   } catch (e) {
//     const message = createError(e);
//     return message;
//   }
// };

export { collateralizeVault };
