import { ContractName, SupportedNetwork } from './types';

const addresses: Record<ContractName, Partial<Record<SupportedNetwork | string, string>>> = {
  Vault: {
    [SupportedNetwork.GOERLI]: '0xCaC650a8F8E71BDE3d60f0B020A4AA3874974705',
  },
  MultiStaticcall: {
    [SupportedNetwork.GOERLI]: '0xB8747e5cce01AA5a51021989BA11aE33097db485',
  },
  VaultGetters: {
    [SupportedNetwork.GOERLI]: '0x3d35807343CbF4fDb16E42297F2214f62848D032',
  },
  VaultRouter: {
    [SupportedNetwork.GOERLI]: '0xFBD26B871D55ba56B7a780eF1fF243Db7A3E81f4',
  },
  Currency: {
    [SupportedNetwork.GOERLI]: '0xC8A88052006142d7ae0B56452e1f153BF480E341',
  },
  Feed: {
    [SupportedNetwork.GOERLI]: '0xEdC725Db7e54C3C85EB551E859b90489d076a9Ca',
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
