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
import { getAllCountries as getAllProvince } from "../services/province";

interface typeOfDistrictData {
  geo_id: number | null;
  geo_code: string;
  name_en: string;
  name_th: string;
  abbreviation: string | null;
  province_id: number;
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

interface districtModalProps {
  open: boolean;
  onClose: () => void;
  initialDetail: typeOfDistrictData;
  onSubmit: (updatedCountry: typeOfDistrictData) => void;
  openModalFor: string;
}

function DistrictModal({
  open,
  onClose,
  initialDetail,
  onSubmit,
  openModalFor,
}: districtModalProps) {
  const [ProvinceList, setProvinceList] = useState([
    { id: 0, text: "Loading" },
  ]);

  interface optionProvince {
    id: number;
    text: string;
  }

  interface typeofBoundary {
    geo_id: number;
    geo_code: string;
    name_en: string;
    abbreviation: string;
    type_id: number;
    name_th: string;
  }

  interface typeofGetCountry {
    geo_id: number;
  }

  interface typeofRawProvince {
    geo_id: number;
    country_id: number;
    boundary: typeofBoundary;
    get_country: typeofGetCountry;
  }

  const transformProvince = (
    states: Array<typeofRawProvince>
  ): Array<optionProvince> => {
    return states.map((i: typeofRawProvince) => ({
      id: i.geo_id,
      text: i.boundary.name_en + " - " + i.boundary.name_th,
    }));
  };

  const fetchStateList = async () => {
    const provinces = await getAllProvince();
    setProvinceList(transformProvince(provinces));
  };

  useEffect(() => {
    fetchStateList();
  }, []);

  const [formData, setFormData] = useState<typeOfDistrictData>({
    geo_id: null,
    geo_code: "",
    name_en: "",
    name_th: "",
    abbreviation: "",
    province_id: 0,
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
            name="province_id"
            value={formData.province_id || ""}
            onChange={handleChange}
          >
            {ProvinceList.map((item) => (
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

export default DistrictModal;
