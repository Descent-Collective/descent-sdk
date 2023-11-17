import { ContractName, SupportedNetworkId } from './types';

const addresses: Record<
  ContractName,
  Partial<Record<SupportedNetworkId, string>> | string
> = {
  Vault: {
    '84531': '0xeAb261C2021Af0e3AC9D716C6b7BaDAd73caCfff',
  },
  MultiStaticcall: {
    '84531': '0x5d0583Ef20884C0b175046d515Ec227200C12C89',
  },
  VaultGetters: {
    '84531': '0x18196CCaA8C2844c82B40a8bDCa27349C7466280',
  },
  VaultRouters: {
    '84531': '0x94D80B2EA3cda86bF350DD7860e1171701F284c8',
  },
  Currency: {
    '84531': '0x774843f6Baa4AAE62F026a8aF3c1C6FF3e55Ca39',
  },
  USDC: {
    '84531': '0xF175520C52418dfE19C8098071a252da48Cd1C19',
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
