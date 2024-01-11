import { config } from 'dotenv';
import Descent, { DescentClass } from '../src';
import { ICollateral } from '../src/types';
import { waitTime } from '../src/libs/utils';

config();

describe('Descent Protocol Utility Test', () => {
  let descent: DescentClass;
  let owner = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c';
  let rpcUrl = 'https://goerli.base.org';

  beforeAll(async () => {
    descent = await Descent.create('https', {
      rpcUrl: rpcUrl,
      privateKey: process.env.PRIVATE_KEY,
      collateral: 'USDC',
    });
  }, 200000);

  it('should get collateral token balance', async () => {
    const response = await descent.getCollateralTokenBalance(owner);
    console.log(response);
    expect(response).toBeDefined();
  });
  it('should approve a collateral token', async () => {
    const response = await descent.approveCollateral('100');
    console.log(response);
    expect(response).toBeDefined();
  });
  it('should get xNGN balance', async () => {
    const response = await descent.getxNGNBalance(owner);
    console.log(response);
    expect(response).toBeDefined();
  });
  it('should approve xNGN', async () => {
    await waitTime(30);
    const response = await descent.approvexNGN('100');
    console.log(response);
    expect(response).toBeDefined();
  }, 2000000);

  it('should check for token allowance on vault', async () => {
    const response = await descent.collateralTokenAllowance(owner);
    console.log(response);

    expect(response).toBeDefined();
  });
});
