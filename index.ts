import { findMetadataPda } from "@metaplex-foundation/js";
import { createCreateMetadataAccountV2Instruction, createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";

let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

const mint = new web3.PublicKey('mint address');
const publicKey = web3.Keypair.fromSecretKey(
  new Uint8Array(
    // privateKey
  )
);

async function newTokenMetadata() {
  const metadataPDA = await findMetadataPda(mint);

  const tokenMetaData = {
    name: "ExampleLana",
    symbol: "XLANA",
    uri: "Metadata-url",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };
  const metadataTransaction = new web3.Transaction().add(
    createCreateMetadataAccountV2Instruction(
      {
        metadata: metadataPDA,
        mint:mint,
        mintAuthority:publicKey.publicKey,
        payer:publicKey.publicKey,
        updateAuthority:publicKey.publicKey
      },{
        createMetadataAccountArgsV2: {
          data:tokenMetaData,
          isMutable:true,
        },
      }
    )
  );

  const tx = await web3.sendAndConfirmTransaction(
      connection,
      metadataTransaction,
      [publicKey]
  );

  console.log(tx);

}

async function updateTokenMetadata() {
  const metadataPDA = await findMetadataPda(mint);

  const tokenMetaData = {
    name: "Example Lana",
    symbol: "XLANA",
    uri: "metadata-url",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  }
  const updateMetadataTransaction = new web3.Transaction().add(
    createUpdateMetadataAccountV2Instruction(
      {
        metadata:metadataPDA,
        updateAuthority:publicKey.publicKey
      },{
        updateMetadataAccountArgsV2 : {
          data:tokenMetaData, 
          updateAuthority:publicKey.publicKey,
          primarySaleHappened:true,
          isMutable:true
        }
      }
    )
  );

  const tx = await web3.sendAndConfirmTransaction(
    connection,
    updateMetadataTransaction,
    [publicKey]
  );
  
  console.log(tx);

}
// newTokenMetadata();
updateTokenMetadata();
