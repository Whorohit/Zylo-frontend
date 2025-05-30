// src/components/TransactionHistoryWrapper.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUserTransactions } from "../redux/userTransactionsSlice";
import { TransactionHistory } from "./TransactionHistory";
import { fetchUserTransactions } from "../../store/history.slice";

const TransactionHistoryWrapper = () => {
    const dispatch = useDispatch();
    const walletAddress  = useSelector((state) => state?.auth?.user?.walletAddress);
    const { transactions, loading, error } = useSelector((state) => state.userTransactions);

    useEffect(() => {
        if (walletAddress) {
            dispatch(fetchUserTransactions(walletAddress));
        }
    }, [dispatch, walletAddress]);

    if (!walletAddress) return <p>Please connect your wallet.</p>;
    if (loading) return <> <p>Loading transactions...</p> </>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return <TransactionHistory transactions={transactions} />;
};

export default TransactionHistoryWrapper;
