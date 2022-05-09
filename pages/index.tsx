import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import AddressForm from "../components/AddressForm";
import * as Web3 from "@solana/web3.js";
import { PingButton } from "../components/PingButton";
import { AppBar } from "../components/NavBar";
import WalletContextProvider from "../components/WalletContextProvider";
import Head from "next/head";
import { SendSolForm } from "../components/SendSolForm";

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [executable, setExecutable] = useState(false);

  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address);
      const key = new Web3.PublicKey(address);
      const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
      connection.getBalance(key).then((balance) => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL);
      });
      connection.getAccountInfo(key).then((accountInfo) => {
        accountInfo?.executable && setExecutable(true);
      });
    } catch (error) {
      setAddress("");
      setBalance(0);
      setExecutable(false);
      alert(error);
    }
  };

  const Divider = () => {
    return <hr className={styles.divider} />;
  };

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <p>Start Your Solana Journey</p>
          <Divider />
          <AddressForm handler={addressSubmittedHandler} />
          <p>{`Address: ${address}`}</p>
          <p>{`Balance: ${balance} SOL`}</p>
          <p>{`Executable: ${executable ? "yep" : "nope"}`}</p>
          <Divider />
          <PingButton />
          <Divider />
          <SendSolForm />
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
