import { config } from 'dotenv';
import Descent, { DescentClass } from '../src';
import { ICollateral } from '../src/types';
import { approveUSDC } from '../src/libs/utils';
import { ethers } from 'ethers';

config();

describe('Descent Protocol SDK Test', () => {
  let descent: DescentClass;
  let owner = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c';
  let vault = '0xCaC650a8F8E71BDE3d60f0B020A4AA3874974705';
  let rpcUrl = 'https://goerli.base.org';
  const waitTime = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

  beforeAll(async () => {
    descent = await Descent.create('https', {
      rpcUrl: rpcUrl,
      privateKey: process.env.PRIVATE_KEY,
      collateral: ICollateral.USDC,
    });
  });

  it('should deposit usdc into a vault', async () => {
    // approve 100 usdc
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    await approveUSDC(vault, '100000000', signer, descent.transaction, descent.internal);

    const response = await descent.depositCollateral('100');
    await waitTime(60);
    expect(response).not.toBeNull;
  });

  it('should withdraw usdc from a vault', async () => {
    const response = await descent.withdrawCollateral('50');

    console.log(response, 'response');
    await waitTime(60);
    expect(response).not.toBeNull;
  });
});