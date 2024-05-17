// ton-nft-wrapper.ts

import { TonClient } from '@tonclient/core';

interface NFTData {
  index: number;
  collectionAddress: string;
  ownerAddress: string;
  content: string;
}

class TonNFTWrapper {
  private tonClient: TonClient;
  private contractAddress: string;

  constructor(tonClient: TonClient, contractAddress: string) {
    this.tonClient = tonClient;
    this.contractAddress = contractAddress;
  }

  async getNFTData(): Promise<NFTData> {
    const response = await this.tonClient.call({
      address: this.contractAddress,
      method: 'get_nft_data',
      params: {},
    });

    const [init, index, collectionAddress, ownerAddress, content] = response.result;

    return {
      index,
      collectionAddress,
      ownerAddress,
      content,
    };
  }

  async transferOwnership(newOwnerAddress: string, queryId: number): Promise<void> {
    const response = await this.tonClient.send({
      address: this.contractAddress,
      method: 'ecv_internal',
      params: {
        op: 1, // transfer
        query_id: queryId,
        in_msg_body: this.tonClient.encodeMessageBody({
          new_owner_address: newOwnerAddress,
        }),
      },
    });

    if (response.exit_code !== 0) {
      throw new Error(`Transfer ownership failed: ${response.exit_code}`);
    }
  }
}

export { TonNFTWrapper, NFTData };