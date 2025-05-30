import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUserSalesAssetIds, fetchSoldAssets } from "../../store/userSalesThunks"; // path to thunks
import { NFTCard } from "../NFTCard";
import { fetchSoldAssets, fetchUserSalesAssetIds } from "../../store/usersale.slice";

export const DashboardOverview = () => {
  const dispatch = useDispatch();
  const { soldAssets, assetIds, loading, error } = useSelector((state) => state.userSales);

  useEffect(() => {
    const loadUserSales = async () => {
      const res = await dispatch(fetchUserSalesAssetIds());
      if (res.payload?.length > 0) {
        dispatch(fetchSoldAssets(res.payload));
      }
    };

    loadUserSales(); // just call it, don't return it
  }, [dispatch]);


  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Your Sales</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {soldAssets.map((asset) => (
            <NFTCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
};
