import { ContractName, SupportedNetwork } from './types';

const addresses: Record<ContractName, Partial<Record<SupportedNetwork | string, string>>> = {
  Vault: {
    [SupportedNetwork.BASE_GOERLI]: '0xE2386C5eF4deC9d5815C60168e36c7153ba00D0C',
    [SupportedNetwork.BASE_SEPOLIA]: '0x18196CCaA8C2844c82B40a8bDCa27349C7466280',
  },
  MultiStaticcall: {
    [SupportedNetwork.BASE_GOERLI]: '0x5226c32C94acdd44743FC5c376582d6782FA7592',
    [SupportedNetwork.BASE_SEPOLIA]: '0x53D0ec27F7221535e72C11BA85BA1a1De34298c5',
  },
  VaultGetters: {
    [SupportedNetwork.BASE_GOERLI]: '0x63642E2E49922DA2095cFDB0781cFf01a0d69786',
    [SupportedNetwork.BASE_SEPOLIA]: '0x50fC21F951Bc42421815e104d21C5f094da9e70C',
  },
  VaultRouter: {
    [SupportedNetwork.BASE_GOERLI]: '0x7FCF3897429Af4e5f3A397330AD638D819e53328',
    [SupportedNetwork.BASE_SEPOLIA]: '0x7F46a4944F9C3ecF4Ea622364132b3fE9aBa1015',
  },
  Currency: {
    [SupportedNetwork.BASE_GOERLI]: '0xee2bDAE7896910c49BeA25106B9f8e9f4B671c82',
    [SupportedNetwork.BASE_SEPOLIA]: '0x5d0583Ef20884C0b175046d515Ec227200C12C89',
  },
  Feed: {
    [SupportedNetwork.BASE_GOERLI]: '0x970066EE55DF2134D1b52451afb49034AE5Fa29a',
    [SupportedNetwork.BASE_SEPOLIA]: '0x94D80B2EA3cda86bF350DD7860e1171701F284c8',
  },
  USDC: {
    [SupportedNetwork.BASE_GOERLI]: '0xF175520C52418dfE19C8098071a252da48Cd1C19',
    [SupportedNetwork.BASE_SEPOLIA]: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  },
  Rate: {
    [SupportedNetwork.BASE_SEPOLIA]: '0x774843f6Baa4AAE62F026a8aF3c1C6FF3e55Ca39',
  },
};

export const getContractAddress = (
  contractName: ContractName,
  network: SupportedNetwork | string,
) => {
  try {
    const contractAddresses = addresses[contractName];

    if (!contractAddresses) {
      throw new Error(`No addresses defined for contract ${contractName}`);
    }

    const address = contractAddresses[network];

    if (!address) {
      throw new Error(`No address defined for network ${network} for contract ${contractName}`);
    }

    return address;
  } catch (error) {
    throw new Error(`Error getting contract address: ${error.message}`);
  }
};
