import { ContractName, SupportedNetwork } from './types';

const addresses: Record<ContractName, Partial<Record<SupportedNetwork | string, string>>> = {
  Vault: {
    [SupportedNetwork.GOERLI]: '0xE2386C5eF4deC9d5815C60168e36c7153ba00D0C',
  },
  MultiStaticcall: {
    [SupportedNetwork.GOERLI]: '0x16d8d245188f80081CC1B55Cd662fe37C26953D3',
  },
  VaultGetters: {
    [SupportedNetwork.GOERLI]: '0x7e2A9d40F4A580cef62D542beF3a7Cf38A13a76A',
  },
  VaultRouter: {
    [SupportedNetwork.GOERLI]: '0x3B5137c6f458AfC8Ef02D18Edb213e678e314C54',
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
