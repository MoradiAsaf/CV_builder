import { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "axios";

function ExperienceForm({ onSave }) {
  const [draft, setDraft] = useState({
    role: "",
    company: "",
    dates: "",
    description: "",
  });
  const [improving, setImproving] = useState(false);

  const handleChange = (field) => (e) => {
    setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImprove = async () => {
    if (!draft.description.trim()) return;
    setImproving(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/improve-experience",
        {
          role: draft.role,
          company: draft.company,
          description: draft.description,
        }
      );
      setDraft((prev) => ({
        ...prev,
        role: res.data.improvedRole || prev.role,
        description: res.data.improvedDescription,
      }));
    } catch (error) {
      console.error("Error improving experience:", error);
      alert("Failed to improve experience. Please try again.");
    } finally {
      setImproving(false);
    }
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={improving ? <CircularProgress size={20} /> : <AutoFixHighIcon />}
            onClick={handleImprove}
            disabled={improving || !draft.description.trim()}
          >
            {improving ? "Improving..." : "Improve with AI"}
          </Button>
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
