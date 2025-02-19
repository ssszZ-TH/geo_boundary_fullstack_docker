import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { getAll as getAllDistrict } from "../services/district";

interface typeOfSubDistrictData {
  geo_id: number | null;
  geo_code: string;
  name_en: string;
  name_th: string;
  abbreviation: string | null;
  district_id: number;
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

interface subdistrictModalProps {
  open: boolean;
  onClose: () => void;
  initialDetail: typeOfDistrictData;
  onSubmit: (updatedCountry: typeOfDistrictData) => void;
  openModalFor: string;
}

export default function SubdistrictModal({
  open,
  onClose,
  initialDetail,
  onSubmit,
  openModalFor,
}: subdistrictModalProps) {
  const [DistrictList, setDistrictList] = useState([
    { id: 0, text: "Loading" },
  ]);

  interface typeofBoundary {
    geo_id: number;
    geo_code: string;
    name_en: string;
    abbreviation: string;
    type_id: number;
    name_th: string;
  }

  interface typeOfGetProvince {
    geo_id: number;
    country_id: number;
  }

  interface typeofRawDistrict {
    geo_id: number;
    country_id: number;
    boundary: typeofBoundary;
    get_country: typeOfGetProvince;
  }

  interface optionDistrict {
    id: number;
    text: string;
  }

  const transformDistrict = (
    states: Array<typeofRawDistrict>
  ): Array<optionDistrict> => {
    return states.map((i: typeofRawDistrict) => ({
      id: i.geo_id,
      text: i.boundary.name_en + " - " + i.boundary.name_th,
    }));
  };

  const fetchDistrictList = async () => {
    const provinces = await getAllDistrict();
    setDistrictList(transformDistrict(provinces));
  };

  useEffect(() => {
    fetchDistrictList();
  }, []);

  const [formData, setFormData] = useState<typeOfSubDistrictData>({
    geo_id: null,
    geo_code: "",
    name_en: "",
    name_th: "",
    abbreviation: "",
    district_id: 0,
  });
  useEffect(() => {
    console.log("set modal initialDetail = ", initialDetail);
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="state-select-label">province</InputLabel>
          <Select
            labelId="state-select-label"
            name="district_id"
            value={formData.district_id || ""}
            onChange={handleChange}
          >
            {DistrictList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}
