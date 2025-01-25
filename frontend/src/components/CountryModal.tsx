import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

interface typeOfCountryData {
  geo_id: number | null;
  geo_code: string;
  name_en: string;
  name_th: string;
  abbreviation: string | null;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface CountryModalProps {
  open: boolean;
  onClose: () => void;
  initialDetail: typeOfCountryData;
  onSubmit: (updatedCountry: typeOfCountryData) => void;
  openModalFor: string;
}

function CountryModal({
  open,
  onClose,
  initialDetail,
  onSubmit,
  openModalFor,
}: CountryModalProps) {
  const [formData, setFormData] = useState<typeOfCountryData>({
    geo_id: null,
    geo_code: "",
    name_en: "",
    name_th: "",
    abbreviation: "",
  });

  // ใช้ useEffect เพื่ออัปเดต formData เมื่อ initialDetail เปลี่ยน
  useEffect(() => {
    // ตรวจสอบว่า initialDetail มีข้อมูลที่จะใช้
    console.log("set form initialDetail = ", initialDetail);
    setFormData(initialDetail);
  }, [initialDetail]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  useEffect(() => {
    console.log("openModalFor = ", openModalFor);
  }, [openModalFor]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Details
        </Typography>
        <TextField
          label="Geo Code"
          name="geo_code"
          value={formData.geo_code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="name_en"
          value={formData.name_en}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="ชื่อ"
          name="name_th"
          value={formData.name_th}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Abbreviation"
          name="abbreviation"
          value={formData.abbreviation || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}

export default CountryModal;
