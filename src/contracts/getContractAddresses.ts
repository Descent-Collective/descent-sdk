import { ContractName, SupportedNetwork } from './types';

const addresses: Record<ContractName, Partial<Record<SupportedNetwork | string, string>>> = {
  Vault: {
    [SupportedNetwork.GOERLI]: '0xE2386C5eF4deC9d5815C60168e36c7153ba00D0C',
  },
  MultiStaticcall: {
    [SupportedNetwork.GOERLI]: '0x5226c32C94acdd44743FC5c376582d6782FA7592',
  },
  VaultGetters: {
    [SupportedNetwork.GOERLI]: '0x63642E2E49922DA2095cFDB0781cFf01a0d69786',
  },
  VaultRouter: {
    [SupportedNetwork.GOERLI]: '0x7FCF3897429Af4e5f3A397330AD638D819e53328',
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
