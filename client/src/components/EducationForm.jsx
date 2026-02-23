import { TextField, Typography, Paper, Box } from "@mui/material";
import { useCV } from "../context/CVContext";

function EducationForm() {
  const { education, setEducation } = useCV();

  const handleChange = (field) => (e) => {
    setEducation((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Institution"
          value={education.institution}
          onChange={handleChange("institution")}
          fullWidth
        />
        <TextField
          label="Degree"
          value={education.degree}
          onChange={handleChange("degree")}
          fullWidth
        />
        <TextField
          label="Years"
          value={education.years}
          onChange={handleChange("years")}
          placeholder="e.g. 2018-2022"
          fullWidth
        />
      </Box>
    </Paper>
  );
}

export default EducationForm;
