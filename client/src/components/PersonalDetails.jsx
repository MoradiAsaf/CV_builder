import { useState } from "react";
import { TextField, Typography, Paper, Box } from "@mui/material";
import { useCV } from "../context/CVContext";

function PersonalDetails() {
  const { personalDetails, setPersonalDetails } = useCV();
  const [errors, setErrors] = useState({ phone: "", email: "" });

  const handleChange = (field) => (e) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: e.target.value }));
    if (field === "phone" || field === "email") {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validatePhone = (value) => {
    if (!value) return "";
    const phoneRegex = /^[0-9\-+() ]{7,15}$/;
    return phoneRegex.test(value) ? "" : "Invalid phone number";
  };

  const validateEmail = (value) => {
    if (!value) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Invalid email address";
  };

  const handleBlur = (field) => () => {
    if (field === "phone") {
      setErrors((prev) => ({ ...prev, phone: validatePhone(personalDetails.phone) }));
    } else if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(personalDetails.email) }));
    }
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
          onBlur={handleBlur("phone")}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={personalDetails.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
      </Box>
    </Paper>
  );
}

export default PersonalDetails;
