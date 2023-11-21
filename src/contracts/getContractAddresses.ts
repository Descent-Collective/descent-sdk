import { ContractName, SupportedNetworkId } from './types';

const addresses: Record<ContractName, Partial<Record<SupportedNetworkId, string>> | string> = {
  Vault: {
    '84531': '0x70cd9e416a943cF20887194bC4b1359F226f6530',
  },
  MultiStaticcall: {
    '84531': '0x7F46a4944F9C3ecF4Ea622364132b3fE9aBa1015',
  },
  VaultGetters: {
    '84531': '0xd870EbcfD3bA3652533d303847E55291336072e5',
  },
  VaultRouters: {
    '84531': '0xEd78389a73Bd77c0A54f5DAcBA2beADbed27A9EC',
  },
  Currency: {
    '84531': '0xB958E73F2132793e7707B12789C6F1a0a457049A',
  },
  USDC: {
    '84531': '0xF175520C52418dfE19C8098071a252da48Cd1C19',
  },
};

export const getContractAddress = (contractName: ContractName) => {
  try {
    return typeof addresses[contractName] === 'string' && addresses[contractName];
  } catch {
    throw new Error(`No address for contract ${contractName}`);
  }
};
