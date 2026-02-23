import { useState, useRef } from "react";
import {
  TextField,
  Typography,
  Paper,
  Box,
  Button,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCV } from "../context/CVContext";

function SkillsSection() {
  const { skills, setSkills } = useCV();
  const [newSkill, setNewSkill] = useState("");
  const inputRef = useRef(null);

  const handleAdd = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    setSkills((prev) => [...prev, trimmed]);
    setNewSkill("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleDelete = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          label="Add a skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          size="small"
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!newSkill.trim()}
          sx={{ minWidth: "auto", px: 2 }}
        >
          <AddIcon />
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleDelete(index)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Paper>
  );
}

export default SkillsSection;
