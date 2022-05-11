import { FC, useEffect, useState } from "react";
import { StudentIntro } from "../../models/StudentIntro";
import { StudentCard } from "./Card";

const STUDENT_INTRO_PROGRAM_ID = "HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf";

export const StudentIntroList: FC = () => {
  const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([]);

  useEffect(() => {
    setStudentIntros(StudentIntro.mocks);
  }, []);

  return (
    <div>
      {studentIntros.map((studentIntro, i) => (
        <StudentCard key={i} studentIntro={studentIntro} />
      ))}
    </div>
  );
};
