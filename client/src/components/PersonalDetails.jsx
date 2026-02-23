import { TextField, Typography, Paper, Box } from "@mui/material";
import { useCV } from "../context/CVContext";

function PersonalDetails() {
  const { personalDetails, setPersonalDetails } = useCV();

  const handleChange = (field) => (e) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Full Name"
          value={personalDetails.fullName}
          onChange={handleChange("fullName")}
          fullWidth
        />
        <TextField
          label="Phone"
          value={personalDetails.phone}
          onChange={handleChange("phone")}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={personalDetails.email}
          onChange={handleChange("email")}
          fullWidth
        />
      </Box>
    </Paper>
  );
}

export default PersonalDetails;
