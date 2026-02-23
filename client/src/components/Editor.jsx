import { useState } from "react";
import { Typography, Button, Box, Alert, Snackbar } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { useCV } from "../context/CVContext";
import PersonalDetails from "./PersonalDetails";
import SummarySection from "./SummarySection";
import EducationForm from "./EducationForm";
import SkillsSection from "./SkillsSection";
import ExperienceList from "./ExperienceList";

function Editor() {
  const { personalDetails, summary, education, skills, experiences } = useCV();
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSaveCV = async () => {
    setSaving(true);
    try {
      const cvData = {
        personalDetails,
        summary,
        education,
        skills,
        experiences,
      };
      await axios.post("http://localhost:3001/api/cv/save", { cvData });
      setSnackbar({ open: true, message: "CV saved successfully!", severity: "success" });
    } catch (error) {
      console.error("Error saving CV:", error);
      setSnackbar({ open: true, message: "Failed to save CV. Please try again.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Edit Your CV
      </Typography>

      <PersonalDetails />
      <SummarySection />
      <EducationForm />
      <SkillsSection />
      <ExperienceList />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSaveCV}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save CV"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Editor;
