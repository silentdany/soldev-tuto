import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import * as Web3 from "@solana/web3.js";
import { Center, Box, Heading } from "@chakra-ui/react";

import { AppBar } from "../components/NavBar";
import AddressForm from "../components/AddressForm";
import { PingButton } from "../components/PingButton";
import { SendSolForm } from "../components/SendSolForm";

import styles from "../styles/Home.module.css";
import { MovieForm } from "../components/MovieList/Form";
import { MovieList } from "../components/MovieList/MovieList";
import { StudentForm } from "../components/StudentIntroList/Form";
import { StudentIntroList } from "../components/StudentIntroList/StudentIntrolList";

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
        <Divider />
        <Center>
          <Box>
            <Heading as="h1" size="l" color="white" ml={4} mt={8}>
              Add a review
            </Heading>
            <MovieForm />
            <Heading as="h1" size="l" color="white" ml={4} mt={8}>
              Existing Reviews
            </Heading>
            <MovieList />
          </Box>
        </Center>
        <Divider />
        <Center>
          <Box>
            <Heading as="h1" size="l" color="white" ml={4} mt={8}>
              Introduce Yourself!
            </Heading>
            <StudentForm />
            <Heading as="h1" size="l" color="white" ml={4} mt={8}>
              Meet the Students!
            </Heading>
            <StudentIntroList />
          </Box>
        </Center>
      </div>
    </div>
  );
};

export default Home;
