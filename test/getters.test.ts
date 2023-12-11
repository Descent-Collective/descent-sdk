import { config } from 'dotenv';
import Descent, { DescentClass } from '../src';
import { ICollateral } from '../src/types';

config();

describe('Descent Protocol SDK Test', () => {
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

  it('should get vault data', async () => {
    const response = await descent.getVaultInfo(owner);
    console.log(response);
    expect(response).toBeDefined();
  });
  it('should get a collateral data', async () => {
    const response = await descent.getCollateralInfo();
    console.log(response);
    expect(response).toBeDefined();
  });
  it('should check a vault router status', async () => {
    const response = await descent.getVaultSetupStatus();
    console.log(response);
    expect(response).toBeDefined();
  });
});
