import { ContractName, SupportedNetworkId } from './types';

const addresses: Record<
  ContractName,
  Partial<Record<SupportedNetworkId, string>> | string
> = {
  Vault: {
    '84531': '',
  },
  MultiStaticcall: {
    '84531': '',
  },
  VaultGetters: {
    '84531': '',
  },
  VaultRouters: {
    '84531': '',
  },
  Currency: {
    '84531': '',
  },
  USDC: {
    '84531': '',
  },
};

export const getContractAddress = (contractName: ContractName) => {
  try {
    return (
      typeof addresses[contractName] === 'string' && addresses[contractName]
    );
  } catch {
    throw new Error(`No address for contract ${contractName}`);
  }
};
