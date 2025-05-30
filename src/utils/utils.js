import { ethers } from "ethers";
import { getContract } from "../store/etherslice";
import SparkMD5 from "spark-md5";
const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

export const fetchMetadata = async (tokenURI) => {
    try {
      const metadataURL = tokenURI.replace("ipfs://", IPFS_GATEWAY);
      const metadata = await fetch(metadataURL).then((res) => res.json());
  
      if (!metadata)  return  ""
  
      return {
        category: metadata.category || "Unknown",
        name: metadata.name || "Unnamed",
        description: metadata.description || "No description available",
        file: metadata.file || "",
      };
    } catch (error) {
      console.error("Error fetching metadata:", error);
      throw error;
    }
  };
  

  export const fetchImage = (file) => {
    if (typeof file === "string") {
      return file.replace("ipfs://", IPFS_GATEWAY);
    }
    return "";
  };


  export const fetchAssetByIndex = async (assetId) => {
    try {
      const contract = await getContract(false);
      const asset = await contract.assets(assetId);
  
      // if (!asset.isListed) throw new Error(`Asset ${assetId} is not listed.`);
  
      const tokenURI = await contract.tokenURI(assetId);
      const metadata = await fetchMetadata(tokenURI);
      const imageUrl = fetchImage(metadata.file);
  
      return {
        id: assetId.toString(),
        seller: ethers.getAddress(asset.seller),
        metadataURI: tokenURI,
        price: ethers.formatEther(asset.price),
        isListed: asset.isListed,
        timestamp: asset.timestamp.toString(),
        category: metadata.category,
        name: metadata.name,
        description: metadata.description,
        image: imageUrl,
      };
    } catch (error) {
      console.error(`Error fetching asset ${assetId}:`, error);
      throw error; // Throw error instead of using `rejectWithValue`
    }
  };


  export const fetchImageHash = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return SparkMD5.ArrayBuffer.hash(buffer);
  } catch (err) {
    console.error("Failed to hash image from IPFS:", err);
    return null;
  }
};
  