/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface VaultRouterInterface extends Interface {
  getFunction(nameOrSignature: "multiInteract"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "multiInteract",
    values: [
      AddressLike[],
      BigNumberish[],
      AddressLike[],
      AddressLike[],
      BigNumberish[]
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "multiInteract",
    data: BytesLike
  ): Result;
}

export interface VaultRouter extends BaseContract {
  connect(runner?: ContractRunner | null): VaultRouter;
  waitForDeployment(): Promise<this>;

  interface: VaultRouterInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  multiInteract: TypedContractMethod<
    [
      _vaultContracts: AddressLike[],
      _operations: BigNumberish[],
      _collateralTokens: AddressLike[],
      _tos: AddressLike[],
      _amounts: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "multiInteract"
  ): TypedContractMethod<
    [
      _vaultContracts: AddressLike[],
      _operations: BigNumberish[],
      _collateralTokens: AddressLike[],
      _tos: AddressLike[],
      _amounts: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;

  filters: {};
}
