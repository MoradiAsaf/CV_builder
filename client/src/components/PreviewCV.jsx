import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  Box,
  Divider,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { useCV } from "../context/CVContext";

function PreviewCV() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cvRef = useRef(null);
  const navigate = useNavigate();
  const {
    setPersonalDetails,
    setSummary,
    setEducation,
    setSkills,
    setExperiences,
  } = useCV();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/cv");
        setCvData(res.data.cvData);
      } catch (err) {
        console.error("Error fetching CV:", err);
        setError("Failed to load CV data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, []);

  const handleDownloadPDF = () => {
    const element = cvRef.current;
    const fileName = cvData?.personalDetails?.fullName
      ? `${cvData.personalDetails.fullName} - CV.pdf`
      : "CV.pdf";
    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleEdit = () => {
    if (!cvData) return;
    setPersonalDetails(cvData.personalDetails || { fullName: "", phone: "", email: "" });
    setSummary(cvData.summary || "");
    setEducation(cvData.education || { institution: "", degree: "", years: "" });
    setSkills(cvData.skills || []);
    setExperiences(cvData.experiences || []);
    navigate("/editor");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!cvData) {
    return (
      <Typography align="center" sx={{ mt: 4 }} color="text.secondary">
        No CV data found. Please fill in your details in the Editor first.
      </Typography>
    );
  }

  const { personalDetails, summary, education, skills, experiences } = cvData;

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Edit CV
        </Button>
      </Box>

      <Box ref={cvRef} sx={{ p: 3 }}>
      {/* Header - Personal Details */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h3" fontWeight="bold">
          {personalDetails?.fullName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mt: 1,
          }}
        >
          {personalDetails?.email && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">{personalDetails.email}</Typography>
            </Box>
          )}
          {personalDetails?.phone && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2">{personalDetails.phone}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Summary */}
      {summary && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Professional Summary
          </Typography>
          <Typography variant="body1">{summary}</Typography>
        </Box>
      )}

      {/* Work Experience */}
      {experiences?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Work Experience
          </Typography>
          {experiences.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6">
                {exp.role} — {exp.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.dates}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {exp.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {(education?.institution || education?.degree) && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Education
          </Typography>
          <Typography variant="h6">{education.institution}</Typography>
          <Typography variant="body1">{education.degree}</Typography>
          <Typography variant="body2" color="text.secondary">
            {education.years}
          </Typography>
        </Box>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill, index) => (
              <Chip key={index} label={skill} color="primary" />
            ))}
          </Box>
        </Box>
      )}
      </Box>
    </Paper>
  );
}

export default PreviewCV;
