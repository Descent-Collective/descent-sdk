import { config } from 'dotenv';
import Descent, { DescentClass } from '../src';
import { ICollateral } from '../src/types';
import {
  approveUSDC,
  approvexNGN,
  getxNGNBalance,
  setMinterRole,
  updateTestPrice,
  waitTime,
} from '../src/libs/utils';
import { Signer, ethers } from 'ethers';

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
  }, 200000);

  it('should get vault data', async () => {
    const response = await descent.getVaultInfo(owner);
  });
});
