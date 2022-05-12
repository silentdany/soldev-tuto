import { FC, useEffect, useState } from "react";
import * as web3 from "@solana/web3.js";

import { StudentIntro } from "../../models/StudentIntro";
import { StudentCard } from "./Card";

const STUDENT_INTRO_PROGRAM_ID = "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf";

export const StudentIntroList: FC = () => {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([]);

  useEffect(() => {
    connection
      .getProgramAccounts(new web3.PublicKey(STUDENT_INTRO_PROGRAM_ID))
      .then(async (accounts) => {
        const studentIntro: StudentIntro[] = accounts.reduce(
          (accum: StudentIntro[], { pubkey, account }) => {
            const studentIntro = StudentIntro.deserialize(account.data);
            if (!studentIntro) {
              return accum;
            }

            return [...accum, studentIntro];
          },
          []
        );
        setStudentIntros(studentIntro);
      });
  }, []);

  return (
    <div>
      {studentIntros.map((studentIntro, i) => (
        <StudentCard key={i} studentIntro={studentIntro} />
      ))}
    </div>
  );
};
