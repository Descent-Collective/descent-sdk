import { ContractName, SupportedNetwork } from './types';

const addresses: Record<ContractName, Partial<Record<SupportedNetwork, string>>> = {
  Vault: {
    [SupportedNetwork.GOERLI]: '0xc93d667F5381CF2E41722829DF14E016bBb33A6A',
  },
  MultiStaticcall: {
    [SupportedNetwork.GOERLI]: '0xb78A27F2fC100380F074846D79809142C9FA99B9',
  },
  VaultGetters: {
    [SupportedNetwork.GOERLI]: '0xDae34bf80b03a4F77Cd12679b8414088ea9cc5A2',
  },
  VaultRouters: {
    [SupportedNetwork.GOERLI]: '0xe2f47eBEA1942AFCa1F5dC432b86B6b6259E70dC',
  },
  Currency: {
    [SupportedNetwork.GOERLI]: '0xED68D8380ED16ad69b861aDFae3Bf8fF75Acc25f',
  },
  USDC: {
    [SupportedNetwork.GOERLI]: '0xF175520C52418dfE19C8098071a252da48Cd1C19',
  },
};

export const getContractAddress = (contractName: ContractName) => {
  try {
    return typeof addresses[contractName] === 'string' && addresses[contractName];
  } catch {
    throw new Error(`No address for contract ${contractName}`);
  }
};
