import { createContext, useContext, useState } from "react";

const CVContext = createContext();

export function CVProvider({ children }) {
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const [summary, setSummary] = useState("");

  const [education, setEducation] = useState({
    institution: "",
    degree: "",
    years: "",
  });

  const [skills, setSkills] = useState([]);

  const [experiences, setExperiences] = useState([]);

  const value = {
    personalDetails,
    setPersonalDetails,
    summary,
    setSummary,
    education,
    setEducation,
    skills,
    setSkills,
    experiences,
    setExperiences,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
}

export function useCV() {
  return useContext(CVContext);
}
