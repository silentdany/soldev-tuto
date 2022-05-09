import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";

export const SendSolForm: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [txSig, setTxSig] = useState("");

  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const sendSol = (event: any) => {
    event.preventDefault();

    if (!connection || !publicKey) {
      return;
    }

    const transaction = new web3.Transaction();
    const recipientPubKey = new web3.PublicKey(event.target.recipient.value);

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: event.target.amount.value * web3.LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolInstruction);
    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig);
    });
  };

  return (
    <div>
      {publicKey ? (
        <form onSubmit={sendSol} className={styles.form}>
          <label htmlFor="amount">Amount (in SOL) to send:</label>
          <input
            id="amount"
            type="text"
            className={styles.formField}
            placeholder="e.g. 0.1"
            required
          />
          <br />
          <label htmlFor="recipient">Send SOL to:</label>
          <input
            id="recipient"
            type="text"
            className={styles.formField}
            placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
            required
          />
          <button type="submit" className={styles.formButton}>
            Send
          </button>
        </form>
      ) : (
        <p>Please connect your wallet</p>
      )}
      {txSig && (
        <div>
          <a
            href={link()}
            target="_blank"
            rel="noreferrer"
            title="Solana Explorer"
          >
            View transaction
          </a>
        </div>
      )}
    </div>
  );
};
