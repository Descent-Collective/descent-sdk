import { config } from 'dotenv';
import Descent, { DescentClass } from '../src';
import { ICollateral } from '../src/types';
import { approveUSDC } from '../src/libs/utils';
import { ethers } from 'ethers';

config();

describe('Descent Protocol SDK Test', () => {
  let descent: DescentClass;
  let owner = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c';
  let rpcUrl = 'https://goerli.base.org';

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

    await approveUSDC(owner, '100000000', signer);

    const response = await descent.depositCollateral('100');

    console.log(response, 'from test');
  });
});
