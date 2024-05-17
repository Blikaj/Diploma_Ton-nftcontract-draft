import { TonClient, Cell, beginCell, endCell, AccountAddress, toNano, Slice, TonClient4 } from "ton";
import { Agitem } from "../contracts/agitem";

export class Main {
  private client: TonClient4;
  private agitem: Agitem;
  private address: AccountAddress;

  constructor(client: TonClient4, address: AccountAddress) {
    this.client = client;
    this.address = address;
    this.agitem = new Agitem(this.client, this.address);
  }

  async getNftData(): Promise<[number, number, Slice, Slice, Cell]> {
    return await this.agitem.get_nft_data();
  }

  async transferOwnership(
    newOwnerAddress: AccountAddress,
    forwardAmount: bigint,
    responseDestination: AccountAddress
  ): Promise<void> {
    const queryId = Math.floor(Math.random() * 1000000);
    const payload = beginCell()
      .storeUint(4, 32) // op::transfer()
      .storeUint(queryId, 64)
      .storeAddress(newOwnerAddress)
      .storeCoins(forwardAmount)
      .storeAddress(responseDestination)
      .endCell();

    await this.agitem.transfer_ownership(payload);
  }
}