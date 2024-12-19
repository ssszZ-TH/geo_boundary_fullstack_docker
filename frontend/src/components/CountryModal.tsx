import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface typeOfCountryData {
  geo_id: number;
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

// ข้อมูลสำหรับ dropdown
const typeOptions = [
  { id: 1, text: "Country" },
  { id: 2, text: "Province" },
  { id: 3, text: "State" },
  { id: 4, text: "City" },
  { id: 5, text: "County" },
  { id: 6, text: "Postal Code" },
  { id: 7, text: "Territory" },
  { id: 8, text: "Sales Territory" },
  { id: 9, text: "Service Territory" },
  { id: 10, text: "Region" },
  { id: 12, text: "County City" },
];

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

const CountryModal: React.FC<CountryModalProps> = ({
  open,
  onClose,
  initialDetail,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CountryData>(initialDetail);

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

        {/* Dropdown for Type ID */}
        {/* <FormControl fullWidth margin="normal">
          <InputLabel id="type-id-label">Type ID</InputLabel>
          <Select
            labelId="type-id-label"
            name="type_id"
            value={formData.type_id}
            onChange={handleChange}
            label="Type ID"
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.text}
              </MenuItem>
            ))}
            
          </Select>
        </FormControl> */}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CountryModal;
