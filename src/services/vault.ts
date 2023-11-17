import { ethers } from 'ethers';
import { ICollateral, IContract } from '../types';
import Addresses from '../contracts/addresses/base.json';
import { Contract } from '../libs/contract';

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
      Addresses.VAULT,
      collateralAddress,
      ownerAddress
    );
    const depositedCollateral = Number(
      ethers.formatUnits(vaultData.depositedCollateral)
    );
    const availableCollateral = await contract.getMaxWithdrawable(
      Addresses.VAULT,
      collateralAddress,
      ownerAddress
    );
    const availablexNGN = await contract.getMaxBorrowable(
      Addresses.VAULT,
      collateralAddress,
      ownerAddress
    );
    const healthFactor = await contract.checkHealthFactor(
      Addresses.VAULT,
      collateralAddress,
      ownerAddress
    );
    let healthState;

    if (healthFactor < 1) {
      healthState = 'Unsafe - Vault is Dangerous';
    } else {
      healthState = 'Safe - Vault is Safe';
    }

    const price = '999';
    const collateralValue = depositedCollateral * Number(price);

    const currentColalteralRatio =
      Number(ethers.formatUnits(vaultData.borrowedAmount)) /
      collateralValue /
      (100 / 1);

    return {
      depositedCollateral: depositedCollateral,
      collateralLocked:
        depositedCollateral - Number(ethers.formatUnits(availableCollateral)),
      borrowedAmount: ethers.formatUnits(vaultData.borrowedAmount),
      accruedFees: ethers.formatUnits(vaultData.accruedFees),
      currentCollateralRatio: currentColalteralRatio,
      healthFactor: healthState,
      availableCollateral: ethers.formatUnits(availableCollateral),
      availablexNGN: ethers.formatUnits(availablexNGN),
      currentRate: ethers.formatUnits(vaultData.lastTotalAccumulatedRate),
    };
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};

const collateralizeVault = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  contract: IContract
) => {
  let collateralAddress;
  if (collateral == ICollateral.USDC) {
    collateralAddress = Addresses.USDC;
  }
  try {
    const res = await contract.depositCollateral(
      collateralAddress,
      owner,
      ethers.toBigInt(amount)
    );
    return res;
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};
const withdrawCollateral = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  contract: IContract
) => {
  let collateralAddress;
  if (collateral == ICollateral.USDC) {
    collateralAddress = Addresses.USDC;
  }
  try {
    const res = await contract.withdrawCollateral(
      collateralAddress,
      owner,
      ethers.toBigInt(amount)
    );
    return res;
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};
const mintCurrency = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  recipient: string,
  contract: IContract
) => {
  let collateralAddress;
  if (collateral == ICollateral.USDC) {
    collateralAddress = Addresses.USDC;
  }
  try {
    const res = await contract.mintCurrency(
      collateralAddress,
      owner,
      recipient,
      ethers.toBigInt(amount)
    );
    return res;
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};

const burnCurrency = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  contract: IContract
) => {
  let collateralAddress;
  if (collateral == ICollateral.USDC) {
    collateralAddress = Addresses.USDC;
  }
  try {
    const res = await contract.burnCurrency(collateralAddress, owner, amount);
    return res;
  } catch (e) {
    const message = await ErrorMessage(e);
    return message;
  }
};

export {
  getVaultInfo,
  collateralizeVault,
  withdrawCollateral,
  mintCurrency,
  burnCurrency,
};
