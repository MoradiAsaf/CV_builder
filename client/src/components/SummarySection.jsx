import { useState } from "react";
import {
  TextField,
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "axios";
import { useCV } from "../context/CVContext";

function SummarySection() {
  const { summary, setSummary } = useCV();
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    if (!summary.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/improve-summary", {
        summary,
      });
      setSummary(res.data.improvedText);
    } catch (error) {
      console.error("Error improving summary:", error);
      alert("Failed to improve summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Professional Summary
      </Typography>
      <TextField
        label="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          startIcon={loading ? <CircularProgress size={20} /> : <AutoFixHighIcon />}
          onClick={handleImprove}
          disabled={loading || !summary.trim()}
        >
          {loading ? "Improving..." : "Improve with AI"}
        </Button>
      </Box>
    </Paper>
  );
}

export default SummarySection;
