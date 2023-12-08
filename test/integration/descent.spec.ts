import { config } from 'dotenv';
import Descent from '../../dist';
import { ICollateral, IDescentClass } from '../../dist/types';

config();

describe('Descent Protocol SDK Test', () => {
  let descent: IDescentClass;
  let owner = '0x459D7FB72ac3dFB0666227B30F25A424A5583E9c';
  let rpcUrl = 'https://goerli.base.org';

  beforeAll(async () => {
    descent = await Descent.create('https', {
      rpcUrl: rpcUrl,
      privateKey: process.env.PRIVATE_KEY,
      collateral: ICollateral.USDC,
    });
  }, 200000);
  it('should test initialization of Descent', async () => {
    expect(descent).toBeDefined();
  });

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
});
