import { config } from 'dotenv';
import Descent, { DescentClass } from '../src';
import { ICollateral } from '../src/types';
import { approveUSDC, approvexNGN, getxNGNBalance, waitTime } from '../src/libs/utils';
import { Signer, ethers } from 'ethers';

config();

describe('Descent Protocol SDK Test', () => {
  let descent: DescentClass;
  let owner = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c';
  let vault = '0xE2386C5eF4deC9d5815C60168e36c7153ba00D0C';
  let rpcUrl = 'https://goerli.base.org';

  let signer: Signer;

  beforeAll(async () => {
    descent = await Descent.create('https', {
      rpcUrl: rpcUrl,
      privateKey: process.env.PRIVATE_KEY,
      collateral: 'USDC',
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
    const response = await descent.depositCollateral('100');

    await waitTime(60);
    expect(response).not.toBeNull;
  }, 500000);

  it('should withdraw usdc from a vault', async () => {
    const response = await descent.withdrawCollateral('50');
    await waitTime(60);
    expect(response).not.toBeNull;
  }, 200000);

  it('should mint xNGN from a vault to an address', async () => {
    const response = await descent.borrowCurrency('10000');

    await waitTime(60);
    expect(response).not.toBeNull;
  }, 200000);

  it('should payback xNGN', async () => {
    const response = await descent.repayCurrency('9000');

    await waitTime(60);
    expect(response).not.toBeNull;
  }, 200000);
});
