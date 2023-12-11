import {
  ethers,
  BigNumberish,
  AddressLike,
  formatUnits,
  NonceManager,
  parseUnits,
  parseEther,
  formatEther,
  Signer,
} from 'ethers';
import { ICollateral, IContract } from '../types';
import { Transaction } from '../libs/transactions';
import { getContractAddress } from '../contracts/getContractAddresses';
import { Internal } from '../libs/internal';
import {
  Currency__factory,
  VaultGetters__factory,
  VaultRouter__factory,
  Vault__factory,
} from '../generated/factories';
import { getxNGNBalance } from '../libs/utils';
import { Contract } from '../contracts';

export enum VaultHealthFactor {
  UNSAFE = 'UNSAFE',
  SAFE = 'SAFE',
}
export enum VaultOperations {
  DepositCollateral = 0,
  WithdrawCollateral = 1,
  MintCurrency = 2,
  BurnCurrency = 3,
}
const setupVault = async (
  owner: string,
  chainId: string,
  transaction: Transaction,
  internal: Internal,
) => {
  const vaultRouterAddress: any = getContractAddress('VaultRouter')[chainId];

  // build transaction object
  const to: any = getContractAddress('Vault')[chainId];
  let iface = internal.getInterface(Vault__factory.abi);
  const data = iface.encodeFunctionData('rely', [vaultRouterAddress]);

  const txConfig = await internal.getTransactionConfig({
    from: owner,
    to,
    data: data,
  });

  const relyResult = await transaction.send(txConfig, {});

  return relyResult;
};

const collateralizeVault = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  chainId: string,
  transaction: Transaction,
  internal: Internal,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];

  const _amount = BigInt(amount) * BigInt(1e6);

  // build transaction object
  const to: any = getContractAddress('VaultRouter')[chainId];
  let iface = internal.getInterface(VaultRouter__factory.abi);
  const data = iface.encodeFunctionData('multiInteract', [
    [vaultContractAddress],
    [VaultOperations.DepositCollateral],
    [collateralAddress],
    [ethers.ZeroAddress],
    [_amount],
  ]);

  const txConfig = await internal.getTransactionConfig({
    from: owner,
    to,
    data: data,
  });

  const depositResResult = await transaction.send(txConfig, {});

  return depositResResult;
};
const withdrawCollateral = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  chainId: string,
  transaction: Transaction,
  internal: Internal,
  signer: Signer,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];
  const vaultGetterAddress: any = getContractAddress('VaultGetters')[chainId];

  const vaultGetterContract = Contract(vaultGetterAddress, VaultGetters__factory.abi, signer);

  const _amount = BigInt(amount) * BigInt(1e6);

  const to: any = getContractAddress('VaultRouter')[chainId];
  let iface = internal.getInterface(VaultRouter__factory.abi);

  const maxWithdrawable = await vaultGetterContract.getMaxWithdrawable(
    vaultContractAddress,
    collateralAddress,
    owner,
  );

  const formattedMaxWithdrawable = formatUnits((await maxWithdrawable).toString(), 6);

  if (Number(amount) > Number(formattedMaxWithdrawable.toString())) {
    throw new Error(' Withdrawal amount is more than available collateral balance');
  }

  // build transaction object
  const data = iface.encodeFunctionData('multiInteract', [
    [vaultContractAddress],
    [VaultOperations.WithdrawCollateral],
    [collateralAddress],
    [owner],
    [_amount],
  ]);
  const txConfig = await internal.getTransactionConfig({
    from: owner,
    to,
    data: data,
  });

  const withdrawResResult = await transaction.send(txConfig, {});

  return withdrawResResult;
};
const mintCurrency = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  chainId: string,
  transaction: Transaction,
  internal: Internal,
  signer: Signer,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];
  const vaultGetterAddress: any = getContractAddress('VaultGetters')[chainId];

  const vaultGetterContract = Contract(vaultGetterAddress, VaultGetters__factory.abi, signer);

  const _amount = BigInt(amount) * BigInt(1e18);

  const maxBorrowable = await vaultGetterContract.getMaxBorrowable(
    vaultContractAddress,
    collateralAddress,
    owner,
  );

  const formattedmaxBorrowable = formatEther((await maxBorrowable).toString());

  if (Number(amount) > Number(formattedmaxBorrowable)) {
    throw new Error(' Borrow amount is more than available currency borrowable');
  }

  // build transaction object
  const to: any = getContractAddress('VaultRouter')[chainId];
  let iface = internal.getInterface(VaultRouter__factory.abi);
  const data = iface.encodeFunctionData('multiInteract', [
    [vaultContractAddress],
    [VaultOperations.MintCurrency],
    [collateralAddress],
    [owner],
    [_amount],
  ]);
  const txConfig = await internal.getTransactionConfig({
    from: owner,
    to,
    data: data,
  });

  const mintResResult = await transaction.send(txConfig, {});

  return mintResResult;
};

const burnCurrency = async (
  amount: string,
  collateral: ICollateral,
  owner: string,
  chainId: string,
  transaction: Transaction,
  internal: Internal,
  signer: Signer,
) => {
  const collateralAddress: any = getContractAddress(collateral)[chainId];
  const vaultContractAddress: any = getContractAddress('Vault')[chainId];

  const currencyContractAddress: any = getContractAddress('Currency')[chainId];

  const currencyContract = Contract(currencyContractAddress, Currency__factory.abi, signer);

  const _amount = BigInt(amount) * BigInt(1e18);

  const balance = await currencyContract.balanceOf(owner);

  const formattedBalance = await formatEther(balance.toString());

  if (Number(amount) > Number(formattedBalance.toString())) {
    throw new Error('Payback xNGN: Insufficient funds');
  }

  // build transaction object
  const to: any = getContractAddress('VaultRouter')[chainId];
  let iface = internal.getInterface(VaultRouter__factory.abi);
  const data = iface.encodeFunctionData('multiInteract', [
    [vaultContractAddress],
    [VaultOperations.BurnCurrency],
    [collateralAddress],
    [owner],
    [_amount],
  ]);
  const txConfig = await internal.getTransactionConfig({
    from: owner,
    to,
    data: data,
  });

  const burnResult = await transaction.send(txConfig, {});

  return burnResult;
};

export { collateralizeVault, withdrawCollateral, mintCurrency, burnCurrency, setupVault };
