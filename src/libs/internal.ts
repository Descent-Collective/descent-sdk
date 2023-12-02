import { InterfaceAbi, TransactionRequest, ethers } from 'ethers';
import { DescentClass } from '..';

export interface GetTransactionConfigParams {
  from: NonNullable<TransactionRequest['from']>;
  to: NonNullable<TransactionRequest['to']>;
  data: NonNullable<TransactionRequest['data']>;
  value?: TransactionRequest['value'];
  gasLimit?: TransactionRequest['gasLimit'];
  gasPrice?: TransactionRequest['gasPrice'];
  nonce?: TransactionRequest['nonce'];
  maxPriorityFeePerGas?: TransactionRequest['maxPriorityFeePerGas'];
  maxFeePerGas?: TransactionRequest['maxFeePerGas'];
}

export type EstimateGasParams = {
  abi: InterfaceAbi;
  args: any;
} & Required<Pick<TransactionRequest, 'from' | 'to' | 'value'>>;

export class Internal {
  constructor(private descent: DescentClass) {}

  /**
   * Returns TransactionObject for any calls.
   *
   * Parameter `gasPrice` must be defined in mode `node` and is optional in mode `browser`.
   *
   * Parameter `nonce` only takes effect in mode `node`.
   *
   * @param params.from
   * @param params.to
   * @param params.callData
   * @param params.value (optional)
   * @param params.gasLimit (optional)
   * @param params.gasPrice (optional only for "browser" mode)
   * @param params.nonce (optional) mostly for "node" mode
   * @param params.maxFeePerGas (optional only for "browser" mode)
   * @param params.maxPriorityFeePerGas (optional only for "browser" mode)
   */
  getTransactionConfig = async (params: GetTransactionConfigParams) => {
    if (!params.from) throw new Error("Parameter 'from' is not defined.");
    if (!params.to) throw new Error("Parameter 'to' is not defined.");
    if (!params.data) throw new Error("Parameter 'data' is not defined.");

    const from = params.from;
    const to = params.to;
    const data = params.data !== '0x' ? params.data : '0x';
    const value = params.value ?? 0;
    const gasLimit = params.gasLimit ?? (await this.getGas({ from, to, data, value }));

    const transactionConfig: TransactionRequest = { from, to, data, value, gasLimit };

    if (params.gasPrice) {
      transactionConfig.gasPrice = params.gasPrice;
    }

    if (params.maxFeePerGas) {
      transactionConfig.maxFeePerGas = params.maxFeePerGas;
    }

    if (params.maxPriorityFeePerGas) {
      transactionConfig.maxPriorityFeePerGas = params.maxPriorityFeePerGas;
    }

    if (this.descent.configMode === 'node') {
      if (!(params.maxFeePerGas && params.maxPriorityFeePerGas) && !params.gasPrice) {
        throw new Error(
          "Parameter 'gasPrice' or `maxFeePerGas` and `maxPriorityFeePerGas` must be defined when using mode 'node'.",
        );
      }

      transactionConfig.nonce = params.nonce ?? (await this.getNonce(String(from)));
    } else if (!!params.nonce) {
      transactionConfig.nonce = params.nonce;
    }

    return transactionConfig;
  };

  private getNonce = async (from: string | number) => {
    return await this.descent.signer.provider?.getTransactionCount(String(from));
  };

  private getGas = async (transactionConfig: TransactionRequest) => {
    // @ts-ignore
    return (await this.descent.signer.estimateGas(transactionConfig)) * BigInt(3); // increasing gas cost by 10% for margin
  };

  /**
   * Returns the ABI interface for any Descent Protocol contract.
   */
  getInterface = (abiItems: InterfaceAbi) => {
    const abiItem = new ethers.Interface(abiItems);
    return abiItem;
  };
}
