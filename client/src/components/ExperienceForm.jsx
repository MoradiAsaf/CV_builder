import { useState } from "react";
import { TextField, Typography, Box, Button, Paper } from "@mui/material";

function ExperienceForm({ onSave }) {
  const [draft, setDraft] = useState({
    role: "",
    company: "",
    dates: "",
    description: "",
  });

  const handleChange = (field) => (e) => {
    setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!draft.role.trim() || !draft.company.trim()) return;
    onSave(draft);
    setDraft({ role: "", company: "", dates: "", description: "" });
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: "#fafafa" }}>
      <Typography variant="subtitle1" gutterBottom>
        Add New Experience
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Role"
          value={draft.role}
          onChange={handleChange("role")}
          size="small"
          fullWidth
        />
        <TextField
          label="Company"
          value={draft.company}
          onChange={handleChange("company")}
          size="small"
          fullWidth
        />
        <TextField
          label="Dates"
          value={draft.dates}
          onChange={handleChange("dates")}
          placeholder="e.g. 2020-2023"
          size="small"
          fullWidth
        />
        <TextField
          label="Description"
          value={draft.description}
          onChange={handleChange("description")}
          multiline
          rows={3}
          size="small"
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!draft.role.trim() || !draft.company.trim()}
          >
            Save Experience
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ExperienceForm;
