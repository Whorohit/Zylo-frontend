import axios from "axios";

const PINATA_API_KEY = "da869560451f370ce464";
const PINATA_SECRET_KEY = "0d32157840ec436842cabb450f9af486dd948524c11c43c6df965903320563a3";

// Upload file & metadata in a single flow
export const uploadToIPFS = async (file, metadata) => {
  const fileUploadUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const metadataUploadUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  // 1️⃣ Upload the file to IPFS
  const formData = new FormData();
  formData.append("file", file);

  const fileResponse = await axios.post(fileUploadUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_KEY,
    },
  });

  const fileCID = `ipfs://${fileResponse.data.IpfsHash}`;

  // 2️⃣ Attach the fileCID to metadata
  const metadataWithFile = {
    ...metadata,
    file: fileCID, // Store the file IPFS hash in metadata
  };

  // 3️⃣ Upload the metadata to IPFS
  const metadataResponse = await axios.post(metadataUploadUrl, metadataWithFile, {
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_KEY,
    },
  });

  return `ipfs://${metadataResponse.data.IpfsHash}`; // Return the final metadata URI
};
