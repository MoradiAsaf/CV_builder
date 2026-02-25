import { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "axios";
import { useCV } from "../context/CVContext";
import ExperienceForm from "./ExperienceForm";

function ExperienceList() {
  const { experiences, setExperiences } = useCV();
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleAddExperience = (experience) => {
    setExperiences((prev) => [...prev, experience]);
  };

  const handleDelete = (index) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImprove = async (index) => {
    const exp = experiences[index];
    setLoadingIndex(index);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/improve-experience",
        {
          role: exp.role,
          company: exp.company,
          description: exp.description,
        }
      );
      setExperiences((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                role: res.data.improvedRole || item.role,
                description: res.data.improvedDescription,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error improving experience:", error);
      alert("Failed to improve experience. Please try again.");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>

      {experiences.map((exp, index) => (
        <Card key={index} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exp.role} at {exp.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {exp.dates}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {exp.description}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => handleImprove(index)}
                  disabled={loadingIndex === index}
                  title="Improve with AI"
                >
                  {loadingIndex === index ? (
                    <CircularProgress size={20} />
                  ) : (
                    <AutoFixHighIcon />
                  )}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      <ExperienceForm onSave={handleAddExperience} />
    </Paper>
  );
}

export default ExperienceList;
