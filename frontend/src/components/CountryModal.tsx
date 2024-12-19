import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

interface typeOfCountryData {
  geo_id: number | null;
  geo_code: string;
  name: string;
  abbreviation: string | null;
  type_id: number; // เปลี่ยนเป็น number หรือ string ตามที่คุณต้องการ
}

interface CountryModalProps {
  open: boolean;
  onClose: () => void;
  initialDetail: typeOfCountryData;
  onSubmit: (updatedCountry: typeOfCountryData) => void;
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

function CountryModal({
  open,
  onClose,
  initialDetail,
  onSubmit,
}: CountryModalProps) {
  const [formData, setFormData] = useState<typeOfCountryData>(initialDetail);

  // ใช้ useEffect เพื่ออัปเดต formData เมื่อ initialDetail เปลี่ยน
  useEffect(() => {
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

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Detail
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
          name="name"
          value={formData.name}
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
