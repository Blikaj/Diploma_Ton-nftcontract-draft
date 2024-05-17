import { AccountAddress, toNano, TonClient } from "ton";
import { Main } from "../wrappers/Main";

describe("Main", () => {
  let client: TonClient;
  let address: AccountAddress;
  let main: Main;

  beforeAll(async () => {
    client = new TonClient({
      network: {
        server_address: "net.ton.dev",
      },
    });

    const abi = await client.getAbi("agitem.fc");
    const deployedAddress = (await client.deploy("agitem.fc", {}, abi)).address;
    address = AccountAddress.parse(deployedAddress);
    main = new Main(client, address);
  });

  it("should get NFT data", async () => {
    const nftData = await main.getNftData();
    expect(nftData).toBeDefined();
  });

  it("should transfer ownership", async () => {
    const newOwnerAddress = AccountAddress.parse("0:<new_owner_address>");
    const forwardAmount = toNano("0.1");
    const responseDestination = AccountAddress.parse("0:<response_destination>");

    await main.transferOwnership(newOwnerAddress, forwardAmount, responseDestination);
  });
});