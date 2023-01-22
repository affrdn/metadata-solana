import { findMetadataPda } from "@metaplex-foundation/js";
import { createCreateMetadataAccountV2Instruction, createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";

let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

const mint = new web3.PublicKey('MonNah8XiqRfZ1ehUmmk8WUqa1gWGSQ8JdAABekzT3a');
const publicKey = web3.Keypair.fromSecretKey(
  new Uint8Array(
    [147,105,175,24,53,3,233,197,233,205,19,50,15,246,192,113,65,0,180,236,141,118,22,26,135,154,206,239,172,220,91,30,106,86,55,98,173,125,222,252,115,179,83,66,54,151,31,137,212,6,139,189,47,27,123,123,58,179,192,110,199,54,104,102]
  )
);

async function newTokenMetadata() {
  const metadataPDA = await findMetadataPda(mint);

  const tokenMetaData = {
    name: "Moanlana",
    symbol: "MOAN",
    uri: "https://raw.githubusercontent.com/affrdn/test-solana/main/metadata.json",
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
    name: "Moanlana",
    symbol: "MOAN",
    uri: "https://raw.githubusercontent.com/affrdn/test-solana/main/metadata.json",
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
