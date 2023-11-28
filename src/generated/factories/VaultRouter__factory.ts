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
import type { VaultRouter, VaultRouterInterface } from "../VaultRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "parameterIndex",
        type: "uint256",
      },
    ],
    name: "MisMatchedInputsLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "contract Vault[]",
        name: "_vaultContracts",
        type: "address[]",
      },
      {
        internalType: "enum VaultRouter.Operations[]",
        name: "_operations",
        type: "uint8[]",
      },
      {
        internalType: "contract ERC20[]",
        name: "_collateralTokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_tos",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "multiInteract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061070b806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063b54fb88e14610030575b600080fd5b61004361003e366004610534565b610045565b005b8887811461006e57604051638aa3abdb60e01b8152600160048201526024015b60405180910390fd5b80861461009157604051638aa3abdb60e01b815260026004820152602401610065565b8084146100b457604051638aa3abdb60e01b815260036004820152602401610065565b8082146100d657604051638aa3abdb60e01b8152600481810152602401610065565b3360005b828110156104d95760008b8b838181106100f6576100f661063b565b905060200201602081019061010b9190610651565b600381111561011c5761011c610625565b03610205578c8c828181106101335761013361063b565b90506020020160208101906101489190610691565b6001600160a01b031663f970c3b78a8a848181106101685761016861063b565b905060200201602081019061017d9190610691565b848888868181106101905761019061063b565b6040516001600160e01b031960e088901b1681526001600160a01b039586166004820152949093166024850152506020909102013560448201526064015b600060405180830381600087803b1580156101e857600080fd5b505af11580156101fc573d6000803e3d6000fd5b505050506104c9565b60018b8b838181106102195761021961063b565b905060200201602081019061022e9190610651565b600381111561023f5761023f610625565b03610325578c8c828181106102565761025661063b565b905060200201602081019061026b9190610691565b6001600160a01b0316635820ba638a8a8481811061028b5761028b61063b565b90506020020160208101906102a09190610691565b848a8a868181106102b3576102b361063b565b90506020020160208101906102c89190610691565b8989878181106102da576102da61063b565b60405160e088901b6001600160e01b03191681526001600160a01b039687166004820152948616602486015292909416604484015260209091020135606482015260840190506101ce565b60028b8b838181106103395761033961063b565b905060200201602081019061034e9190610651565b600381111561035f5761035f610625565b036103ab578c8c828181106103765761037661063b565b905060200201602081019061038b9190610691565b6001600160a01b03166349a66ca38a8a8481811061028b5761028b61063b565b60038b8b838181106103bf576103bf61063b565b90506020020160208101906103d49190610651565b60038111156103e5576103e5610625565b036104c9578c8c828181106103fc576103fc61063b565b90506020020160208101906104119190610691565b6001600160a01b0316634fa739198a8a848181106104315761043161063b565b90506020020160208101906104469190610691565b848888868181106104595761045961063b565b6040516001600160e01b031960e088901b1681526001600160a01b03958616600482015294909316602485015250602090910201356044820152606401600060405180830381600087803b1580156104b057600080fd5b505af11580156104c4573d6000803e3d6000fd5b505050505b6104d2816106ae565b90506100da565b50505050505050505050505050565b60008083601f8401126104fa57600080fd5b50813567ffffffffffffffff81111561051257600080fd5b6020830191508360208260051b850101111561052d57600080fd5b9250929050565b60008060008060008060008060008060a08b8d03121561055357600080fd5b8a3567ffffffffffffffff8082111561056b57600080fd5b6105778e838f016104e8565b909c509a5060208d013591508082111561059057600080fd5b61059c8e838f016104e8565b909a50985060408d01359150808211156105b557600080fd5b6105c18e838f016104e8565b909850965060608d01359150808211156105da57600080fd5b6105e68e838f016104e8565b909650945060808d01359150808211156105ff57600080fd5b5061060c8d828e016104e8565b915080935050809150509295989b9194979a5092959850565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b60006020828403121561066357600080fd5b81356004811061067257600080fd5b9392505050565b6001600160a01b038116811461068e57600080fd5b50565b6000602082840312156106a357600080fd5b813561067281610679565b6000600182016106ce57634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212209fe799d9e188d3f0ee48f3aefde317ea02eac0fbc29122e84e584eed2c035d5a64736f6c63430008150033";

type VaultRouterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VaultRouterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VaultRouter__factory extends ContractFactory {
  constructor(...args: VaultRouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      VaultRouter & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): VaultRouter__factory {
    return super.connect(runner) as VaultRouter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VaultRouterInterface {
    return new Interface(_abi) as VaultRouterInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): VaultRouter {
    return new Contract(address, _abi, runner) as unknown as VaultRouter;
  }
}