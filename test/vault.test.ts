import { config } from 'dotenv';
import Descent, { DescentClass } from '../src';
import { ICollateral } from '../src/types';
import { approveUSDC, getxNGNBalance, updateTestPrice, waitTime } from '../src/libs/utils';
import { ethers } from 'ethers';

config();

describe('Descent Protocol SDK Test', () => {
  let descent: DescentClass;
  let owner = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c';
  let vault = '0xCaC650a8F8E71BDE3d60f0B020A4AA3874974705';
  let rpcUrl = 'https://goerli.base.org';

  let signer;

  beforeAll(async () => {
    descent = await Descent.create('https', {
      rpcUrl: rpcUrl,
      privateKey: process.env.PRIVATE_KEY,
      collateral: ICollateral.USDC,
    });

    // approve 100 usdc
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  }, 120000);

  it('should deposit usdc into a vault', async () => {
    // approve 100 usdc
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    await approveUSDC(vault, '100000000', signer, descent.transaction, descent.internal);

    await updateTestPrice(signer);

    const response = await descent.depositCollateral('100');

    waitTime(60);
    expect(response).not.toBeNull;
  }, 200000);

  it('should withdraw usdc from a vault', async () => {
    const response = await descent.withdrawCollateral('50');

    console.log(response, 'response');
    waitTime(60);
    expect(response).not.toBeNull;
  }, 80000);

  it('should mint xNGN from a vault to an address', async () => {
    const balanceBeforeBorrow = await getxNGNBalance(owner, signer);

    const response = await descent.borrowCurrency('10000');
    const balanceAfterBorrow = await getxNGNBalance(owner, signer);

    expect(balanceAfterBorrow).toBeGreaterThan(balanceBeforeBorrow);

    waitTime(60);
    expect(response).not.toBeNull;
  }, 80000);
});
