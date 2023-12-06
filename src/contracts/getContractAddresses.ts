import { ContractName, SupportedNetwork } from './types';

const addresses: Record<ContractName, Partial<Record<SupportedNetwork | string, string>>> = {
  Vault: {
    [SupportedNetwork.GOERLI]: '0xE2386C5eF4deC9d5815C60168e36c7153ba00D0C',
  },
  MultiStaticcall: {
    [SupportedNetwork.GOERLI]: '0x7E04A2380bF7F024Da53e60686f2e0608E987768',
  },
  VaultGetters: {
    [SupportedNetwork.GOERLI]: '0x3d8255F39C2DC306C05d2b503e74CCea1fD9F430',
  },
  VaultRouter: {
    [SupportedNetwork.GOERLI]: '0x2d4D7b224294573d02076cea252CbBD8156A4465',
  },
  Currency: {
    [SupportedNetwork.GOERLI]: '0xee2bDAE7896910c49BeA25106B9f8e9f4B671c82',
  },
  Feed: {
    [SupportedNetwork.GOERLI]: '0x970066EE55DF2134D1b52451afb49034AE5Fa29a',
  },
  USDC: {
    [SupportedNetwork.GOERLI]: '0xF175520C52418dfE19C8098071a252da48Cd1C19',
  },
};

export const getContractAddress = (contractName: ContractName) => {
  try {
    return addresses[contractName];
  } catch {
    throw new Error(`No address for contract ${contractName}`);
  }
};
