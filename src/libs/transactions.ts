import { DescentClass } from '../index';
import { TransactionReceipt, TransactionRequest } from 'ethers';

export interface TransactionCallbacks {
  onReceipt?: (receipt: TransactionReceipt) => void;
  onConfirmation?: (
    confirmationNumber: number,
    receipt: TransactionReceipt | null,
    latestBlockHash?: string,
  ) => void;
}

export class Transaction {
  constructor(private descent: DescentClass) {}

  /**
   * Send transaction and get transaction hash.
   */
  send = async (
    transactionConfig: TransactionRequest,
    transactionCallbacks: TransactionCallbacks = {},
  ): Promise<string> => {
    return new Promise(async (resolve: any, reject) => {
      try {
        const tx = await this.descent.signer.sendTransaction(transactionConfig);
        const hash = tx!.hash;
        const receipt = await tx!.provider.getTransactionReceipt(hash);
        const confirmations = await tx!.confirmations();

        resolve(tx);
        transactionCallbacks.onReceipt && transactionCallbacks.onReceipt(receipt!);
        transactionCallbacks.onConfirmation &&
          transactionCallbacks.onConfirmation(confirmations!, receipt);
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * Get transaction Nonce.
   *
   * @param transactionHash Transaction hash to get nonce.
   */
  getNonce = async (transactionHash: string) => {
    const transaction = await this.descent.signer.provider?.getTransaction(transactionHash);

    return transaction?.nonce;
  };

  /**
   * Get transaction count.
   *
   * @param address Address to get transaction count for.
   * @returns Transaction count for address
   */
  getTransactionCount = async (address: string) => {
    const transactionCount = await this.descent.signer.provider?.getTransactionCount(address);

    return transactionCount;
  };
}
