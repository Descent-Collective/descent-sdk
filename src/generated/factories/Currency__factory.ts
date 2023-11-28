/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { Currency, CurrencyInterface } from "../Currency";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string",
      },
    ],
    name: "StringTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "Permit2AllowanceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "permit2Enabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "recoverToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "setMinterRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "updatePermit2Allowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101606040523480156200001257600080fd5b50604051620025653803806200256583398101604081905262000035916200034e565b6040805180820190915260018152603160f81b6020820152819081908482600462000061838262000447565b50600562000070828262000447565b5062000082915083905060066200014e565b61012052620000938160076200014e565b61014052815160208084019190912060e052815190820120610100524660a0526200012160e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506200013860003362000187565b50506009805460ff19166001179055506200056d565b60006020835110156200016e57620001668362000235565b905062000181565b816200017b848262000447565b5060ff90505b92915050565b6000828152602081815260408083206001600160a01b038516845290915281205460ff166200022c576000838152602081815260408083206001600160a01b03861684529091529020805460ff19166001179055620001e33390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a450600162000181565b50600062000181565b600080829050601f815111156200026c578260405163305a27a960e01b815260040162000263919062000513565b60405180910390fd5b8051620002798262000548565b179392505050565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620002b45781810151838201526020016200029a565b50506000910152565b600082601f830112620002cf57600080fd5b81516001600160401b0380821115620002ec57620002ec62000281565b604051601f8301601f19908116603f0116810190828211818310171562000317576200031762000281565b816040528381528660208588010111156200033157600080fd5b6200034484602083016020890162000297565b9695505050505050565b600080604083850312156200036257600080fd5b82516001600160401b03808211156200037a57600080fd5b6200038886838701620002bd565b935060208501519150808211156200039f57600080fd5b50620003ae85828601620002bd565b9150509250929050565b600181811c90821680620003cd57607f821691505b602082108103620003ee57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200044257600081815260208120601f850160051c810160208610156200041d5750805b601f850160051c820191505b818110156200043e5782815560010162000429565b5050505b505050565b81516001600160401b0381111562000463576200046362000281565b6200047b81620004748454620003b8565b84620003f4565b602080601f831160018114620004b357600084156200049a5750858301515b600019600386901b1c1916600185901b1785556200043e565b600085815260208120601f198616915b82811015620004e457888601518255948401946001909101908401620004c3565b5085821015620005035787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60208152600082518060208401526200053481604085016020870162000297565b601f01601f19169190910160400192915050565b80516020808301519190811015620003ee5760001960209190910360031b1b16919050565b60805160a05160c05160e051610100516101205161014051611f9d620005c860003960006110e9015260006110bc01526000610f4901526000610f2101526000610e7c01526000610ea601526000610ed00152611f9d6000f3fe608060405234801561001057600080fd5b50600436106101b95760003560e01c8063705e6a5b116100f95780639dc29fac11610097578063d505accf11610071578063d505accf146103f4578063d547741f14610407578063dd62ed3e1461041a578063feaea5861461042d57600080fd5b80639dc29fac146103c6578063a217fddf146103d9578063a9059cbb146103e157600080fd5b806384b0196e116100d357806384b0196e1461034c57806391d1485414610367578063945d1229146103ab57806395d89b41146103be57600080fd5b8063705e6a5b146102f057806370a08231146103035780637ecebe001461033957600080fd5b80632f2ff15d1161016657806336568abe1161014057806336568abe14610282578063407c48b41461029557806340c10f19146102a25780636afdd850146102b557600080fd5b80632f2ff15d14610256578063313ce5671461026b5780633644e5151461027a57600080fd5b806318160ddd1161019757806318160ddd1461020e57806323b872dd14610220578063248a9ca31461023357600080fd5b806301ffc9a7146101be57806306fdde03146101e6578063095ea7b3146101fb575b600080fd5b6101d16101cc366004611b48565b610440565b60405190151581526020015b60405180910390f35b6101ee6104d9565b6040516101dd9190611bf8565b6101d1610209366004611c2d565b61056b565b6003545b6040519081526020016101dd565b6101d161022e366004611c59565b610583565b610212610241366004611c9a565b60009081526020819052604090206001015490565b610269610264366004611cb3565b6105a9565b005b604051601281526020016101dd565b6102126105d4565b610269610290366004611cb3565b6105e3565b6009546101d19060ff1681565b6101d16102b0366004611c2d565b610641565b6102cb6e22d473030f116ddee9f6b43ac78ba381565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101dd565b6102696102fe366004611cf1565b610677565b610212610311366004611d0e565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604090205490565b610212610347366004611d0e565b6106e9565b610354610714565b6040516101dd9796959493929190611d2b565b6101d1610375366004611cb3565b60009182526020828152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b6102696103b9366004611d0e565b610776565b6101ee6107ab565b6101d16103d4366004611c2d565b6107ba565b610212600081565b6101d16103ef366004611c2d565b6107f0565b610269610402366004611dea565b6107fe565b610269610415366004611cb3565b6109b0565b610212610428366004611e61565b6109d5565b61026961043b366004611e61565b610a71565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b0000000000000000000000000000000000000000000000000000000014806104d357507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600480546104e890611e8f565b80601f016020809104026020016040519081016040528092919081815260200182805461051490611e8f565b80156105615780601f1061053657610100808354040283529160200191610561565b820191906000526020600020905b81548152906001019060200180831161054457829003601f168201915b5050505050905090565b600033610579818585610bfd565b5060019392505050565b600033610591858285610c0a565b61059c858585610cae565b60019150505b9392505050565b6000828152602081905260409020600101546105c481610d59565b6105ce8383610d66565b50505050565b60006105de610e62565b905090565b73ffffffffffffffffffffffffffffffffffffffff81163314610632576040517f6697b23200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61063c8282610f9a565b505050565b60007fcfd53186d792f1ec9d0679afc2dc3ffc86fc31fe1e0f342b838eb6c3eade62b361066d81610d59565b6105798484611055565b600061068281610d59565b60405182151581527f383d8f27281deff0ab982f76ad2feac76f0cb5d922008a4642d8765c748591329060200160405180910390a150600980547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600860205260408120546104d3565b6000606080600080600060606107286110b5565b6107306110e2565b604080516000808252602082019092527f0f000000000000000000000000000000000000000000000000000000000000009b939a50919850469750309650945092509050565b600061078181610d59565b61063c7fcfd53186d792f1ec9d0679afc2dc3ffc86fc31fe1e0f342b838eb6c3eade62b383610d66565b6060600580546104e890611e8f565b60007fcfd53186d792f1ec9d0679afc2dc3ffc86fc31fe1e0f342b838eb6c3eade62b36107e681610d59565b610579848461110f565b600033610579818585610cae565b83421115610840576040517f62791302000000000000000000000000000000000000000000000000000000008152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c988888861089a8c73ffffffffffffffffffffffffffffffffffffffff16600090815260086020526040902080546001810190915590565b60408051602081019690965273ffffffffffffffffffffffffffffffffffffffff94851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006109028261116b565b90506000610912828787876111b3565b90508973ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610999576040517f4b800e4600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff80831660048301528b166024820152604401610837565b6109a48a8a8a610bfd565b50505050505050505050565b6000828152602081905260409020600101546109cb81610d59565b6105ce8383610f9a565b600073ffffffffffffffffffffffffffffffffffffffff82166e22d473030f116ddee9f6b43ac78ba3148015610a0d575060095460ff165b15610a3957507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6104d3565b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600260209081526040808320938616835292905220546105a2565b6000610a7c81610d59565b73ffffffffffffffffffffffffffffffffffffffff831615610b33576040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015261063c908490849073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa158015610b0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2e9190611ee2565b6111e1565b60008273ffffffffffffffffffffffffffffffffffffffff164760405160006040518083038185875af1925050503d8060008114610b8d576040519150601f19603f3d011682016040523d82523d6000602084013e610b92565b606091505b50509050806105ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f7769746864726177206661696c656400000000000000000000000000000000006044820152606401610837565b61063c838383600161126e565b6000610c1684846109d5565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146105ce5781811015610c9f576040517ffb8f41b200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff841660048201526024810182905260448101839052606401610837565b6105ce8484848403600061126e565b73ffffffffffffffffffffffffffffffffffffffff8316610cfe576040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260006004820152602401610837565b73ffffffffffffffffffffffffffffffffffffffff8216610d4e576040517fec442f0500000000000000000000000000000000000000000000000000000000815260006004820152602401610837565b61063c8383836113b6565b610d638133611561565b50565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915281205460ff16610e5a5760008381526020818152604080832073ffffffffffffffffffffffffffffffffffffffff86168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055610df83390565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45060016104d3565b5060006104d3565b60003073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016148015610ec857507f000000000000000000000000000000000000000000000000000000000000000046145b15610ef257507f000000000000000000000000000000000000000000000000000000000000000090565b6105de604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915281205460ff1615610e5a5760008381526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8616808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45060016104d3565b73ffffffffffffffffffffffffffffffffffffffff82166110a5576040517fec442f0500000000000000000000000000000000000000000000000000000000815260006004820152602401610837565b6110b1600083836113b6565b5050565b60606105de7f000000000000000000000000000000000000000000000000000000000000000060066115e7565b60606105de7f000000000000000000000000000000000000000000000000000000000000000060076115e7565b73ffffffffffffffffffffffffffffffffffffffff821661115f576040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260006004820152602401610837565b6110b1826000836113b6565b60006104d3611178610e62565b836040517f19010000000000000000000000000000000000000000000000000000000000008152600281019290925260228201526042902090565b6000806000806111c588888888611692565b9250925092506111d5828261178c565b50909695505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905261063c908490611890565b73ffffffffffffffffffffffffffffffffffffffff84166112be576040517fe602df0500000000000000000000000000000000000000000000000000000000815260006004820152602401610837565b73ffffffffffffffffffffffffffffffffffffffff831661130e576040517f94280d6200000000000000000000000000000000000000000000000000000000815260006004820152602401610837565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260026020908152604080832093871683529290522082905580156105ce578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516113a891815260200190565b60405180910390a350505050565b73ffffffffffffffffffffffffffffffffffffffff83166113ee5780600360008282546113e39190611efb565b909155506114a09050565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604090205481811015611474576040517fe450d38c00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff851660048201526024810182905260448101839052606401610837565b73ffffffffffffffffffffffffffffffffffffffff841660009081526001602052604090209082900390555b73ffffffffffffffffffffffffffffffffffffffff82166114c9576003805482900390556114f5565b73ffffffffffffffffffffffffffffffffffffffff821660009081526001602052604090208054820190555b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161155491815260200190565b60405180910390a3505050565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff166110b1576040517fe2517d3f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8216600482015260248101839052604401610837565b606060ff8314611601576115fa83611926565b90506104d3565b81805461160d90611e8f565b80601f016020809104026020016040519081016040528092919081815260200182805461163990611e8f565b80156116865780601f1061165b57610100808354040283529160200191611686565b820191906000526020600020905b81548152906001019060200180831161166957829003601f168201915b505050505090506104d3565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08411156116cd5750600091506003905082611782565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015611721573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811661177857506000925060019150829050611782565b9250600091508190505b9450945094915050565b60008260038111156117a0576117a0611f35565b036117a9575050565b60018260038111156117bd576117bd611f35565b036117f4576040517ff645eedf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600282600381111561180857611808611f35565b03611842576040517ffce698f700000000000000000000000000000000000000000000000000000000815260048101829052602401610837565b600382600381111561185657611856611f35565b036110b1576040517fd78bce0c00000000000000000000000000000000000000000000000000000000815260048101829052602401610837565b60006118b273ffffffffffffffffffffffffffffffffffffffff841683611965565b905080516000141580156118d75750808060200190518101906118d59190611f64565b155b1561063c576040517f5274afe700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84166004820152602401610837565b6060600061193383611973565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b60606105a2838360006119b4565b600060ff8216601f8111156104d3576040517fb3512b0c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6060814710156119f2576040517fcd786059000000000000000000000000000000000000000000000000000000008152306004820152602401610837565b6000808573ffffffffffffffffffffffffffffffffffffffff168486604051611a1b9190611f81565b60006040518083038185875af1925050503d8060008114611a58576040519150601f19603f3d011682016040523d82523d6000602084013e611a5d565b606091505b5091509150611a6d868383611a77565b9695505050505050565b606082611a8c57611a8782611b06565b6105a2565b8151158015611ab0575073ffffffffffffffffffffffffffffffffffffffff84163b155b15611aff576040517f9996b31500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85166004820152602401610837565b50806105a2565b805115611b165780518082602001fd5b6040517f1425ea4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060208284031215611b5a57600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146105a257600080fd5b60005b83811015611ba5578181015183820152602001611b8d565b50506000910152565b60008151808452611bc6816020860160208601611b8a565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006105a26020830184611bae565b73ffffffffffffffffffffffffffffffffffffffff81168114610d6357600080fd5b60008060408385031215611c4057600080fd5b8235611c4b81611c0b565b946020939093013593505050565b600080600060608486031215611c6e57600080fd5b8335611c7981611c0b565b92506020840135611c8981611c0b565b929592945050506040919091013590565b600060208284031215611cac57600080fd5b5035919050565b60008060408385031215611cc657600080fd5b823591506020830135611cd881611c0b565b809150509250929050565b8015158114610d6357600080fd5b600060208284031215611d0357600080fd5b81356105a281611ce3565b600060208284031215611d2057600080fd5b81356105a281611c0b565b7fff00000000000000000000000000000000000000000000000000000000000000881681526000602060e081840152611d6760e084018a611bae565b8381036040850152611d79818a611bae565b6060850189905273ffffffffffffffffffffffffffffffffffffffff8816608086015260a0850187905284810360c0860152855180825283870192509083019060005b81811015611dd857835183529284019291840191600101611dbc565b50909c9b505050505050505050505050565b600080600080600080600060e0888a031215611e0557600080fd5b8735611e1081611c0b565b96506020880135611e2081611c0b565b95506040880135945060608801359350608088013560ff81168114611e4457600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215611e7457600080fd5b8235611e7f81611c0b565b91506020830135611cd881611c0b565b600181811c90821680611ea357607f821691505b602082108103611edc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b600060208284031215611ef457600080fd5b5051919050565b808201808211156104d3577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060208284031215611f7657600080fd5b81516105a281611ce3565b60008251611f93818460208701611b8a565b919091019291505056";

type CurrencyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CurrencyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Currency__factory extends ContractFactory {
  constructor(...args: CurrencyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _name: string,
    _symbol: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  override deploy(
    _name: string,
    _symbol: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_name, _symbol, overrides || {}) as Promise<
      Currency & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Currency__factory {
    return super.connect(runner) as Currency__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CurrencyInterface {
    return new Interface(_abi) as CurrencyInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Currency {
    return new Contract(address, _abi, runner) as unknown as Currency;
  }
}