import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAssetByIndex, getContract, purchaseAsset } from "../store/etherslice";
import { useThemeStore } from '../store/useThemeStore';
import { NFTDetails } from "../components/purchase/NFTDetails";
import { PurchaseOptions } from "../components/purchase/PurchaseOptions";
import { NFTCarousel } from "../components/NFTCarousel";
import {ethers} from 'ethers'
export const Purchase = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedAsset, loading } = useSelector((state) => state.marketplace);
  // const handlePurchase = (nft) => {
  //   if (!nft || !nft.id || !nft.price) {
  //     console.error("Invalid NFT data:", nft);
  //     return;
  //   }
    
  // const assetId = nft.id.toString();
  // const price = nft.price.toString();

  // console.log("✅ Dispatching purchase with:", { assetId, price });
  // dispatch(purchaseAsset(assetId, price ));
  // };
  const handlePurchase = async (nft) => {
    if (!nft || !nft.id || !nft.price) {
      console.error("❌ Invalid NFT data:", nft);
      // toast.error("Invalid NFT data!");
      return;
    }
     try {
      dispatch(purchaseAsset(nft))
     } catch (error) {
       console.log(error);
       
     }

    // try {
    //   const contract = await getContract(true); // Ensure "true" for write permissions
    //   const priceInWei = ethers.parseEther(nft.price);

    //   console.log(`🚀 Purchasing NFT ${nft.id} for ${nft.price} ETH...`);
    //   const tx = await contract.purchase([nft.id], { value: priceInWei });

    //   console.log("⌛ Waiting for transaction confirmation...");
    //   await tx.wait();

    //   console.log(`✅ NFT ${nft.id} purchased successfully!`);
    //   // toast.success(`🎉 Successfully purchased NFT #${nft.id}`);
    // } catch (error) {
    //   console.error("❌ Purchase failed:", error);
    //   // toast.error(`Purchase failed: ${error.reason || error.message}`);
    // }
  };
  const isDarkMode = useThemeStore((state) => state.isDarkMode);


  useEffect(() => {
    if (id) {
      dispatch(fetchAssetByIndex(id));
    }
  }, [id, dispatch]);

  return (
    <div
      className={`min-h-screen py-12 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div
              className={`relative rounded-2xl overflow-hidden shadow-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              {loading ? (
                <Skeleton height={500} width="100%" />
              ) : (
                <img
                  src={selectedAsset?.image}
                  alt={selectedAsset?.name}
                  className="w-full h-[500px] object-cover"
                />
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {loading ? (
              <>
                <Skeleton height={40} width="60%" />
                <Skeleton count={3} />
                <Skeleton height={50} width="80%" />
              </>
            ) : (
              <>
                <NFTDetails nft={selectedAsset} />
                <PurchaseOptions nft={selectedAsset} onPurchase={handlePurchase} />

              </>
            )}
          </div>
        </div>

        {/* Similar NFTs Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">
            {loading ? <Skeleton width={200} /> : "Similar NFTs"}
          </h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} height={250} />
              ))}
            </div>
          ) : (
            <NFTCarousel nfts={[]} /> // You can modify this to show related NFTs later
          )}
        </div>
      </div>
    </div>
  );
};
